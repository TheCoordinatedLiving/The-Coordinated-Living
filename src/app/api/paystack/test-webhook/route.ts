import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateSubscriber } from '@/lib/airtable';

/**
 * Test endpoint to simulate Paystack webhook events for subscriptions
 * This simulates the actual webhook payload structure from Paystack
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scenario = 'initial' } = body;

    // Simulate initial subscription payment (subscription.create event)
    if (scenario === 'initial') {
      const timestamp = Date.now();
      const email = `new.subscriber.${timestamp}@example.com`;
      
      // Simulate Paystack subscription.create webhook payload
      const webhookPayload = {
        event: 'subscription.create',
        data: {
          customer: {
            id: 1000000 + Math.floor(Math.random() * 1000000),
            first_name: 'John',
            last_name: 'Doe',
            email: email,
            customer_code: `CUS_${timestamp}`,
            phone: '+233541234567',
            international_format_phone: '+233541234567',
          },
          plan: {
            id: 12345,
            name: 'Coordinated Living Monthly',
            plan_code: 'PLN_test_monthly',
            amount: 10000, // 100 GHS in kobo
            interval: 'monthly',
            currency: 'GHS',
          },
          subscription_code: `SUB_${timestamp}`,
          email_token: `email_token_${timestamp}`,
          amount: 10000, // 100 GHS in kobo
          status: 'active',
          next_payment_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
        },
      };

      // Transform to Airtable format (same as webhook handler)
      const subscriberData = {
        'Email': webhookPayload.data.customer.email,
        'Phone Number': webhookPayload.data.customer.phone || webhookPayload.data.customer.international_format_phone || '',
        'Full Name': `${webhookPayload.data.customer.first_name || ''} ${webhookPayload.data.customer.last_name || ''}`.trim() || '',
        'Transaction Reference': webhookPayload.data.subscription_code,
        'Amount': webhookPayload.data.amount / 100, // Convert from kobo
        'Currency': webhookPayload.data.plan.currency,
        'Status': webhookPayload.data.status,
        'Payment Type': 'Subscription',
        'Paid At': webhookPayload.data.next_payment_date || webhookPayload.data.created_at,
        'Subscription Code': webhookPayload.data.subscription_code,
        'Plan Code': webhookPayload.data.plan.plan_code,
        'Customer Code': webhookPayload.data.customer.customer_code,
        'Created At': webhookPayload.data.created_at,
      };

      try {
        const result = await createOrUpdateSubscriber(subscriberData);
        return NextResponse.json({
          status: true,
          message: 'Initial subscription payment simulated and synced to Airtable',
          scenario: 'initial',
          webhookEvent: 'subscription.create',
          data: {
            subscriber: result,
            webhookPayload: webhookPayload,
            airtableData: subscriberData,
          },
        });
      } catch (error) {
        console.error('Error syncing initial subscription:', error);
        return NextResponse.json(
          {
            status: false,
            message: 'Failed to sync initial subscription',
            error: error instanceof Error ? error.message : 'Unknown error',
          },
          { status: 500 }
        );
      }
    }

    // Simulate renewal payment (charge.success event for subscription)
    if (scenario === 'renewal') {
      const timestamp = Date.now();
      const email = `renewal.user.${timestamp}@example.com`;
      const subscriptionCode = `SUB_RENEW_${timestamp}`;
      
      // Simulate Paystack charge.success webhook payload for subscription renewal
      const webhookPayload = {
        event: 'charge.success',
        data: {
          id: 2000000 + Math.floor(Math.random() * 1000000),
          domain: 'test',
          status: 'success',
          reference: `RENEW_${timestamp}`,
          amount: 10000, // 100 GHS in kobo
          message: 'Successful',
          gateway_response: 'Successful',
          paid_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          channel: 'card',
          currency: 'GHS',
          customer: {
            id: 1000000 + Math.floor(Math.random() * 1000000),
            first_name: 'Jane',
            last_name: 'Smith',
            email: email,
            customer_code: `CUS_RENEW_${timestamp}`,
            phone: '+233549876543',
            international_format_phone: '+233549876543',
          },
          plan: {
            id: 12345,
            name: 'Coordinated Living Monthly',
            plan_code: 'PLN_test_monthly',
            amount: 10000,
            interval: 'monthly',
            currency: 'GHS',
          },
          metadata: {
            custom_fields: [
              {
                display_name: 'Payment Type',
                variable_name: 'payment_type',
                value: 'Subscription Renewal',
              },
              {
                display_name: 'Phone Number',
                variable_name: 'phone_number',
                value: '+233549876543',
              },
              {
                display_name: 'Full Name',
                variable_name: 'full_name',
                value: 'Jane Smith',
              },
            ],
          },
        },
      };

      // Transform to Airtable format (same as webhook handler)
      const metadata = webhookPayload.data.metadata?.custom_fields || [];
      const phoneNumberField = metadata.find((f: any) => f.variable_name === 'phone_number');
      const fullNameField = metadata.find((f: any) => f.variable_name === 'full_name');
      const paymentTypeField = metadata.find((f: any) => f.variable_name === 'payment_type');

      const subscriberData = {
        'Email': webhookPayload.data.customer.email,
        'Phone Number': phoneNumberField?.value || webhookPayload.data.customer.phone || '',
        'Full Name': fullNameField?.value || 
          `${webhookPayload.data.customer.first_name || ''} ${webhookPayload.data.customer.last_name || ''}`.trim() || '',
        'Transaction Reference': webhookPayload.data.reference,
        'Amount': webhookPayload.data.amount / 100, // Convert from kobo
        'Currency': webhookPayload.data.currency,
        'Status': webhookPayload.data.status,
        'Payment Type': paymentTypeField?.value || 'Subscription',
        'Paid At': webhookPayload.data.paid_at || webhookPayload.data.created_at,
        'Subscription Code': subscriptionCode,
        'Plan Code': webhookPayload.data.plan?.plan_code || '',
        'Customer Code': webhookPayload.data.customer.customer_code,
        'Created At': webhookPayload.data.created_at,
      };

      try {
        const result = await createOrUpdateSubscriber(subscriberData);
        return NextResponse.json({
          status: true,
          message: 'Renewal payment simulated and synced to Airtable',
          scenario: 'renewal',
          webhookEvent: 'charge.success',
          data: {
            subscriber: result,
            webhookPayload: webhookPayload,
            airtableData: subscriberData,
          },
        });
      } catch (error) {
        console.error('Error syncing renewal payment:', error);
        return NextResponse.json(
          {
            status: false,
            message: 'Failed to sync renewal payment',
            error: error instanceof Error ? error.message : 'Unknown error',
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { status: false, message: 'Invalid scenario. Use "initial" or "renewal"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Test webhook error:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for easy testing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const scenario = searchParams.get('scenario') || 'initial';
  
  // Create a POST request body
  const mockRequest = {
    json: async () => ({ scenario }),
  } as NextRequest;

  return POST(mockRequest);
}

