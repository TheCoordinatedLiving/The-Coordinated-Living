import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateSubscriber } from '@/lib/airtable';

/**
 * Test endpoint to simulate subscription payments and sync to Airtable
 * This simulates:
 * 1. Initial subscription payment (new subscriber)
 * 2. Renewal payment (existing subscriber with overdue subscription)
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scenario = 'initial' } = body; // 'initial' or 'renewal'

    // Simulate initial subscription payment
    if (scenario === 'initial') {
      const dummySubscriptionData = {
        'Email': `test.subscriber.${Date.now()}@example.com`,
        'Phone Number': '+233541234567',
        'Full Name': 'Test Subscriber',
        'Transaction Reference': `SUB_${Date.now()}`,
        'Amount': 100.00, // 100 GHS
        'Currency': 'GHS',
        'Status': 'success',
        'Payment Type': 'Subscription',
        'Paid At': new Date().toISOString(),
        'Subscription Code': `SUB_${Date.now()}`,
        'Plan Code': 'PLN_test_monthly',
        'Customer Code': `CUS_${Date.now()}`,
        'Created At': new Date().toISOString(),
      };

      try {
        const result = await createOrUpdateSubscriber(dummySubscriptionData);
        return NextResponse.json({
          status: true,
          message: 'Initial subscription payment simulated and synced to Airtable',
          scenario: 'initial',
          data: {
            subscriber: result,
            dummyData: dummySubscriptionData,
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

    // Simulate renewal payment (overdue subscription)
    if (scenario === 'renewal') {
      // First, create a subscriber that would be "overdue"
      const existingSubscriberData = {
        'Email': `renewal.test.${Date.now()}@example.com`,
        'Phone Number': '+233549876543',
        'Full Name': 'Renewal Test User',
        'Transaction Reference': `SUB_RENEW_${Date.now()}`,
        'Amount': 100.00, // 100 GHS
        'Currency': 'GHS',
        'Status': 'success',
        'Payment Type': 'Subscription',
        'Paid At': new Date().toISOString(),
        'Subscription Code': `SUB_RENEW_${Date.now()}`,
        'Plan Code': 'PLN_test_monthly',
        'Customer Code': `CUS_RENEW_${Date.now()}`,
        'Created At': new Date().toISOString(),
      };

      try {
        // Create the subscriber first
        await createOrUpdateSubscriber(existingSubscriberData);

        // Wait a moment, then simulate renewal payment
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate renewal payment (same subscriber, new transaction)
        const renewalData = {
          ...existingSubscriberData,
          'Transaction Reference': `RENEW_${Date.now()}`,
          'Paid At': new Date().toISOString(),
          'Status': 'success',
          'Amount': 100.00,
        };

        const renewalResult = await createOrUpdateSubscriber(renewalData);

        return NextResponse.json({
          status: true,
          message: 'Renewal payment simulated and synced to Airtable',
          scenario: 'renewal',
          data: {
            originalSubscriber: existingSubscriberData,
            renewalPayment: renewalResult,
            dummyData: renewalData,
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
    console.error('Test subscription error:', error);
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

// GET endpoint to test with query parameters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const scenario = searchParams.get('scenario') || 'initial';

    // Simulate initial subscription payment
    if (scenario === 'initial') {
      const dummySubscriptionData = {
        'Email': `test.subscriber.${Date.now()}@example.com`,
        'Phone Number': '+233541234567',
        'Full Name': 'Test Subscriber',
        'Transaction Reference': `SUB_${Date.now()}`,
        'Amount': 100.00,
        'Currency': 'GHS',
        'Status': 'success',
        'Payment Type': 'Subscription',
        'Paid At': new Date().toISOString(),
        'Subscription Code': `SUB_${Date.now()}`,
        'Plan Code': 'PLN_test_monthly',
        'Customer Code': `CUS_${Date.now()}`,
        'Created At': new Date().toISOString(),
      };

      try {
        const result = await createOrUpdateSubscriber(dummySubscriptionData);
        return NextResponse.json({
          status: true,
          message: 'Initial subscription payment simulated and synced to Airtable',
          scenario: 'initial',
          data: {
            subscriber: result,
            dummyData: dummySubscriptionData,
          },
        });
      } catch (error) {
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

    // Simulate renewal payment
    if (scenario === 'renewal') {
      const email = `renewal.test.${Date.now()}@example.com`;
      
      // Create initial subscriber
      const existingSubscriberData = {
        'Email': email,
        'Phone Number': '+233549876543',
        'Full Name': 'Renewal Test User',
        'Transaction Reference': `SUB_RENEW_${Date.now()}`,
        'Amount': 100.00,
        'Currency': 'GHS',
        'Status': 'success',
        'Payment Type': 'Subscription',
        'Paid At': new Date().toISOString(),
        'Subscription Code': `SUB_RENEW_${Date.now()}`,
        'Plan Code': 'PLN_test_monthly',
        'Customer Code': `CUS_RENEW_${Date.now()}`,
        'Created At': new Date().toISOString(),
      };

      try {
        await createOrUpdateSubscriber(existingSubscriberData);
        
        // Simulate renewal payment
        const renewalData = {
          ...existingSubscriberData,
          'Transaction Reference': `RENEW_${Date.now()}`,
          'Paid At': new Date().toISOString(),
          'Status': 'success',
        };

        const renewalResult = await createOrUpdateSubscriber(renewalData);

        return NextResponse.json({
          status: true,
          message: 'Renewal payment simulated and synced to Airtable',
          scenario: 'renewal',
          data: {
            originalSubscriber: existingSubscriberData,
            renewalPayment: renewalResult,
            dummyData: renewalData,
          },
        });
      } catch (error) {
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
    console.error('Test subscription error:', error);
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

