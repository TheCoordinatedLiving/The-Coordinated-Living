import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrUpdateSubscriber } from '@/lib/airtable';
import { createOrUpdateSubscription } from '@/lib/airtable-subscriptions';

/**
 * Maps Paystack plan information to Airtable subscription package values
 * Returns "3 months" or "12 months" based on plan interval, name, or metadata
 */
interface PaystackPlan {
  plan_code?: string;
  interval?: string;
  name?: string;
  description?: string;
}

interface PaystackMetadata {
  custom_fields?: Array<{
    variable_name: string;
    value: string;
  }>;
}

function mapPlanToSubscriptionPackage(plan: PaystackPlan | null | undefined, metadata?: PaystackMetadata): string {
  // Check metadata first for explicit package selection
  if (metadata?.custom_fields) {
    const packageField = metadata.custom_fields.find(
      (f: { variable_name: string }) => f.variable_name === 'subscription_package' || f.variable_name === 'package'
    );
    if (packageField?.value) {
      const packageValue = String(packageField.value).toLowerCase();
      if (packageValue.includes('3') || packageValue.includes('three')) {
        return '3 months';
      }
      if (packageValue.includes('12') || packageValue.includes('twelve') || packageValue.includes('year')) {
        return '12 months';
      }
    }
  }

  // Check plan interval
  if (plan?.interval === 'yearly' || plan?.interval === 'annually') {
    return '12 months';
  }

  // Check plan name or description for duration indicators
  const planName = String(plan?.name || '').toLowerCase();
  const planDescription = String(plan?.description || '').toLowerCase();
  const combinedText = `${planName} ${planDescription}`;

  // Check for 12 months indicators
  if (combinedText.includes('12') || combinedText.includes('twelve') || combinedText.includes('year')) {
    return '12 months';
  }

  // Check for 3 months indicators
  if (combinedText.includes('3') || combinedText.includes('three') || combinedText.includes('quarter')) {
    return '3 months';
  }

  // If interval is monthly, default to 3 months (assuming most monthly plans are 3-month packages)
  // You can adjust this logic based on your actual plan structure
  if (plan?.interval === 'monthly') {
    // Check plan code for hints
    const planCode = String(plan?.plan_code || '').toLowerCase();
    if (planCode.includes('12') || planCode.includes('year')) {
      return '12 months';
    }
    // Default monthly to 3 months if no other indicators found
    return '3 months';
  }

  // Default fallback - you may want to adjust this
  return '3 months';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!signature) {
      console.error('No Paystack signature found');
      return NextResponse.json(
        { status: false, message: 'No signature provided' },
        { status: 400 }
      );
    }

    // Get Paystack secret key from environment variables
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY is not set in environment variables');
      return NextResponse.json(
        { status: false, message: 'Webhook configuration error' },
        { status: 500 }
      );
    }

    // Verify the signature
    const hash = crypto
      .createHmac('sha512', paystackSecretKey)
      .update(body, 'utf8')
      .digest('hex');

    if (hash !== signature) {
      console.error('Invalid Paystack signature');
      return NextResponse.json(
        { status: false, message: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    // Handle successful payment
    if (event.event === 'charge.success') {
      const { data } = event;
      
      // Check if this is a donation or channel payment
      const metadata = data.metadata?.custom_fields || [];
      const paymentTypeField = metadata.find((f: { variable_name: string }) => f.variable_name === 'payment_type');
      const phoneNumberField = metadata.find((f: { variable_name: string }) => f.variable_name === 'phone_number');
      const fullNameField = metadata.find((f: { variable_name: string }) => f.variable_name === 'full_name');
      const paymentType = paymentTypeField?.value || data.metadata?.payment_type || 'channel';
      
      console.log('Payment successful:', {
        reference: data.reference,
        amount: data.amount,
        email: data.customer.email,
        status: data.status,
        paymentType: paymentType
      });

      // Sync transaction to Airtable - create both subscriber and subscription records
      try {
        const subscriberData = {
          'Email': data.customer?.email || '',
          'Phone Number': phoneNumberField?.value || data.customer?.phone || '',
          'Full Name': fullNameField?.value || 
            `${data.customer?.first_name || ''} ${data.customer?.last_name || ''}`.trim() || '',
          'Transaction Reference': data.reference,
          'Amount': data.amount / 100, // Convert from kobo to currency unit
          'Currency': data.currency || 'GHS',
          'Status': data.status,
          'Payment Type': paymentType,
          'Paid At': data.paid_at || data.created_at,
          'Subscription Code': data.plan?.plan_code || '',
          'Plan Code': data.plan?.plan_code || '',
          'Customer Code': data.customer?.customer_code || '',
          'Created At': data.created_at,
        };

        // Create/update subscriber record
        const subscriberResult = await createOrUpdateSubscriber(subscriberData);
        
        // If this is a subscription payment, also create a subscription record
        if (data.plan?.plan_code && subscriberResult?.id) {
          // Map plan to subscription package (3 months or 12 months)
          const subscriptionPackage = mapPlanToSubscriptionPackage(data.plan, data.metadata);
          
          console.log('Plan data:', {
            plan_code: data.plan?.plan_code,
            interval: data.plan?.interval,
            name: data.plan?.name,
            description: data.plan?.description,
            mapped_package: subscriptionPackage
          });
          
          // Calculate expiration date based on subscription package
          const expirationDate = new Date();
          if (subscriptionPackage === '12 months') {
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
          } else {
            // Default to 3 months (90 days)
            expirationDate.setMonth(expirationDate.getMonth() + 3);
          }
          
          try {
            await createOrUpdateSubscription({
              'Name': `${subscriberData['Full Name']} - ${data.plan.plan_code}`,
              'Email': data.customer?.email || '',
              'Whatsapp Number': phoneNumberField?.value || data.customer?.phone || '',
              'Subscription Package': subscriptionPackage,
              'Amount Paid': data.amount / 100,
              'Expiration Date': expirationDate.toISOString(),
            }, subscriberResult.id);
            
            console.log('Subscription record created in Airtable with package:', subscriptionPackage);
          } catch (subscriptionError) {
            console.error('Error creating subscription with package:', subscriptionPackage, subscriptionError);
            // Try again without the package field to see if that's the issue
            try {
              await createOrUpdateSubscription({
                'Name': `${subscriberData['Full Name']} - ${data.plan.plan_code}`,
                'Email': data.customer?.email || '',
                'Whatsapp Number': phoneNumberField?.value || data.customer?.phone || '',
                'Amount Paid': data.amount / 100,
                'Expiration Date': expirationDate.toISOString(),
              }, subscriberResult.id);
              console.log('Subscription created without package field - package value may be invalid');
            } catch (retryError) {
              console.error('Error creating subscription even without package:', retryError);
              throw retryError;
            }
          }
        }
        
        console.log('Transaction synced to Airtable:', data.reference);
      } catch (error) {
        console.error('Error syncing transaction to Airtable:', error);
        // Don't fail the webhook if Airtable sync fails
      }

      // Handle donation-specific logic
      if (paymentType === 'Pour into my cup') {
        console.log('Donation processed:', {
          amount: data.amount,
          email: data.customer.email,
          reference: data.reference
        });

        // Here you can add donation-specific logic:
        // - Send donation confirmation email
        // - Update donation records
        // - Send thank you message
        // - Track donation analytics
      } else {
        // Handle channel payment logic
        console.log('Channel payment processed:', {
          amount: data.amount,
          email: data.customer.email,
          reference: data.reference
        });

        // Here you can add channel-specific logic:
        // - Grant channel access
        // - Send channel invitation
        // - Update user status
      }
      
      return NextResponse.json({ status: true, message: 'Webhook processed successfully' });
    }


    // Handle failed payments
    if (event.event === 'charge.failed') {
      const { data } = event;
      
      console.log('Payment failed:', {
        reference: data.reference,
        amount: data.amount,
        email: data.customer.email,
        status: data.status,
        gateway_response: data.gateway_response
      });

      // Sync failed transaction to Airtable (for record keeping)
      try {
        const metadata = data.metadata?.custom_fields || [];
        const phoneNumberField = metadata.find((f: { variable_name: string }) => f.variable_name === 'phone_number');
        const fullNameField = metadata.find((f: { variable_name: string }) => f.variable_name === 'full_name');
        const paymentTypeField = metadata.find((f: { variable_name: string }) => f.variable_name === 'payment_type');

        const subscriberData = {
          'Email': data.customer?.email || '',
          'Phone Number': phoneNumberField?.value || data.customer?.phone || '',
          'Full Name': fullNameField?.value || 
            `${data.customer?.first_name || ''} ${data.customer?.last_name || ''}`.trim() || '',
          'Transaction Reference': data.reference,
          'Amount': data.amount / 100, // Convert from kobo to currency unit
          'Currency': data.currency || 'GHS',
          'Status': data.status,
          'Payment Type': paymentTypeField?.value || 'Unknown',
          'Paid At': data.created_at, // Use created_at for failed payments
          'Subscription Code': '',
          'Plan Code': '',
          'Customer Code': data.customer?.customer_code || '',
          'Created At': data.created_at,
        };

        await createOrUpdateSubscriber(subscriberData);
        console.log('Failed transaction synced to Airtable:', data.reference);
      } catch (error) {
        console.error('Error syncing failed transaction to Airtable:', error);
        // Don't fail the webhook if Airtable sync fails
      }

      // Here you can add failed payment logic:
      // - Send payment failure notification
      // - Retry payment logic
      // - Update payment status
      
      return NextResponse.json({ status: true, message: 'Failed payment processed' });
    }

    // Handle subscription events
    if (event.event === 'subscription.create') {
      const { data } = event;
      
      console.log('Subscription created:', {
        subscription_code: data.subscription_code,
        customer_email: data.customer.email,
        plan_code: data.plan.plan_code,
        status: data.status
      });

      // Sync subscription to Airtable - create both subscriber and subscription records
      try {
        const subscriberData = {
          'Email': data.customer?.email || '',
          'Phone Number': data.customer?.phone || data.customer?.international_format_phone || '',
          'Full Name': `${data.customer?.first_name || ''} ${data.customer?.last_name || ''}`.trim() || '',
          'Transaction Reference': data.subscription_code,
          'Amount': data.amount / 100, // Convert from kobo to currency unit
          'Currency': data.plan?.currency || 'GHS',
          'Status': data.status,
          'Payment Type': 'Subscription',
          'Paid At': data.next_payment_date || data.created_at,
          'Subscription Code': data.subscription_code,
          'Plan Code': data.plan?.plan_code || '',
          'Customer Code': data.customer?.customer_code || '',
          'Created At': data.created_at,
        };

        // Create/update subscriber record
        const subscriberResult = await createOrUpdateSubscriber(subscriberData);
        
        // Create subscription record
        if (subscriberResult?.id) {
          // Map plan to subscription package (3 months or 12 months)
          const subscriptionPackage = mapPlanToSubscriptionPackage(data.plan, data.metadata);
          
          console.log('Subscription.create - Plan data:', {
            plan_code: data.plan?.plan_code,
            interval: data.plan?.interval,
            name: data.plan?.name,
            description: data.plan?.description,
            mapped_package: subscriptionPackage
          });
          
          // Calculate expiration date based on subscription package
          const expirationDate = new Date();
          if (subscriptionPackage === '12 months') {
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
          } else {
            // Default to 3 months (90 days)
            expirationDate.setMonth(expirationDate.getMonth() + 3);
          }
          
          try {
            await createOrUpdateSubscription({
              'Name': `${subscriberData['Full Name']} - ${data.plan?.plan_code || 'Subscription'}`,
              'Email': data.customer?.email || '',
              'Whatsapp Number': data.customer?.phone || data.customer?.international_format_phone || '',
              'Subscription Package': subscriptionPackage,
              'Amount Paid': data.amount / 100,
              'Expiration Date': expirationDate.toISOString(),
            }, subscriberResult.id);
            
            console.log('Subscription record created in Airtable with package:', subscriptionPackage);
          } catch (subscriptionError) {
            console.error('Error creating subscription with package:', subscriptionPackage, subscriptionError);
            // Try again without the package field to see if that's the issue
            try {
              await createOrUpdateSubscription({
                'Name': `${subscriberData['Full Name']} - ${data.plan?.plan_code || 'Subscription'}`,
                'Email': data.customer?.email || '',
                'Whatsapp Number': data.customer?.phone || data.customer?.international_format_phone || '',
                'Amount Paid': data.amount / 100,
                'Expiration Date': expirationDate.toISOString(),
              }, subscriberResult.id);
              console.log('Subscription created without package field - package value may be invalid');
            } catch (retryError) {
              console.error('Error creating subscription even without package:', retryError);
              throw retryError;
            }
          }
        }
        
        console.log('Subscription synced to Airtable:', data.subscription_code);
      } catch (error) {
        console.error('Error syncing subscription to Airtable:', error);
        // Don't fail the webhook if Airtable sync fails
      }

      // Here you can add subscription creation logic:
      // - Send welcome email
      // - Grant channel access
      // - Update user subscription status
      
      return NextResponse.json({ status: true, message: 'Subscription created successfully' });
    }

    if (event.event === 'subscription.disable') {
      const { data } = event;
      
      console.log('Subscription disabled:', {
        subscription_code: data.subscription_code,
        customer_email: data.customer.email,
        status: data.status
      });

      // Update subscription status in Airtable
      try {
        const subscriberData = {
          'Email': data.customer?.email || '',
          'Phone Number': data.customer?.phone || data.customer?.international_format_phone || '',
          'Full Name': `${data.customer?.first_name || ''} ${data.customer?.last_name || ''}`.trim() || '',
          'Transaction Reference': data.subscription_code,
          'Amount': data.amount / 100, // Convert from kobo to currency unit
          'Currency': data.plan?.currency || 'GHS',
          'Status': data.status, // This will be 'cancelled' or 'disabled'
          'Payment Type': 'Subscription',
          'Paid At': data.next_payment_date || data.created_at,
          'Subscription Code': data.subscription_code,
          'Plan Code': data.plan?.plan_code || '',
          'Customer Code': data.customer?.customer_code || '',
          'Created At': data.created_at,
        };

        await createOrUpdateSubscriber(subscriberData);
        console.log('Subscription status updated in Airtable:', data.subscription_code);
      } catch (error) {
        console.error('Error updating subscription in Airtable:', error);
        // Don't fail the webhook if Airtable sync fails
      }

      // Here you can add subscription disable logic:
      // - Revoke channel access
      // - Send cancellation email
      // - Update user subscription status
      
      return NextResponse.json({ status: true, message: 'Subscription disabled successfully' });
    }

    // Handle other events if needed
    console.log('Paystack webhook event:', event.event);
    
    return NextResponse.json({ status: true, message: 'Webhook received' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { status: false, message: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
