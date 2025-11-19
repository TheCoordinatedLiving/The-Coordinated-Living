import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrUpdateSubscriber, getAirtableBase, createOrUpdateDonation } from '@/lib/airtable';
import { AirtableSubscription } from '@/lib/airtable';
import { sendDonationConfirmationEmail } from '@/lib/email';

// Explicitly set runtime to Node.js (required for crypto and other Node.js APIs)
export const runtime = 'nodejs';

// Disable body parsing limits for webhooks
export const maxDuration = 30;

/**
 * Maps Paystack plan information to Airtable subscription package values
 * Returns "1 month", "3 months", or "6 months" based on plan interval, name, or metadata
 * Default is "1 month" if no indicators are found
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
      (f) => f.variable_name === 'subscription_package' || f.variable_name === 'package'
    );
    if (packageField?.value) {
      const packageValue = String(packageField.value).toLowerCase();
      // Check for 6 months first (most specific)
      if (packageValue.includes('6') || packageValue.includes('six')) {
        return '6 months';
      }
      // Check for 3 months
      if (packageValue.includes('3') || packageValue.includes('three')) {
        return '3 months';
      }
      // Check for 1 month
      if (packageValue.includes('1') || packageValue.includes('one')) {
        return '1 month';
      }
    }
  }

  // Check plan name or description for duration indicators
  const planName = String(plan?.name || '').toLowerCase();
  const planDescription = String(plan?.description || '').toLowerCase();
  const combinedText = `${planName} ${planDescription}`;

  // Check for 6 months indicators (most specific, check first)
  if (combinedText.includes('6') || combinedText.includes('six')) {
    return '6 months';
  }

  // Check for 3 months indicators
  if (combinedText.includes('3') || combinedText.includes('three') || combinedText.includes('quarter')) {
    return '3 months';
  }

  // Check for 1 month indicators
  if (combinedText.includes('1 month') || combinedText.includes('one month')) {
    return '1 month';
  }

  // If interval is monthly, check plan code for hints
  if (plan?.interval === 'monthly') {
    const planCode = String(plan?.plan_code || '').toLowerCase();
    // Check for 6 months
    if (planCode.includes('6') || planCode.includes('six')) {
      return '6 months';
    }
    // Check for 3 months
    if (planCode.includes('3') || planCode.includes('three')) {
      return '3 months';
    }
    // Check for 1 month
    if (planCode.includes('1') || planCode.includes('one')) {
      return '1 month';
    }
    // Default monthly to 1 month if no other indicators found
    return '1 month';
  }

  // Default fallback - changed from 3 months to 1 month
  return '1 month';
}

/**
 * Create or update a subscription record in Airtable
 */
async function createOrUpdateSubscription(
  subscriptionData: AirtableSubscription['fields'],
  subscriberRecordId?: string
): Promise<AirtableSubscription | null> {
  try {
    const airtableBase = getAirtableBase();
    if (!airtableBase) {
      throw new Error('Airtable not configured - missing API key or Base ID');
    }

    // Helper to format dates for Airtable
    const formatDate = (dateValue: string | Date): string => {
      if (!dateValue) return '';
      const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    };

    const cleanFields: Record<string, unknown> = {};

    // Name
    if (subscriptionData['Name']) {
      cleanFields['Name'] = String(subscriptionData['Name']).trim();
    }

    // Subscriber - link to Subscribers table
    if (subscriberRecordId) {
      cleanFields['Subscriber'] = [subscriberRecordId];
    } else if (subscriptionData['Subscriber']) {
      cleanFields['Subscriber'] = subscriptionData['Subscriber'];
    }

    // Email
    if (subscriptionData['Email']) {
      cleanFields['Email'] = String(subscriptionData['Email']).trim();
    }

    // Whatsapp Number
    if (subscriptionData['Whatsapp Number']) {
      cleanFields['Whatsapp Number'] = String(subscriptionData['Whatsapp Number']).trim();
    }

    // Subscription Package (single select) - "1 month", "3 months", or "6 months"
    if (subscriptionData['Subscription Package'] && String(subscriptionData['Subscription Package']).trim()) {
      const packageValue = String(subscriptionData['Subscription Package']).trim();
      console.log('Setting Subscription Package to:', packageValue);
      cleanFields['Subscription Package'] = packageValue;
    }

    // Amount Paid
    if (subscriptionData['Amount Paid'] !== undefined && subscriptionData['Amount Paid'] !== null) {
      const numValue = typeof subscriptionData['Amount Paid'] === 'number'
        ? subscriptionData['Amount Paid']
        : parseFloat(String(subscriptionData['Amount Paid']));
      if (!isNaN(numValue)) {
        cleanFields['Amount Paid'] = numValue;
      }
    }

    // Expiration Date
    if (subscriptionData['Expiration Date']) {
      cleanFields['Expiration Date'] = formatDate(subscriptionData['Expiration Date']);
    }

    // Create subscription record
    const newRecord = await airtableBase('Subscriptions').create([
      {
        fields: cleanFields as unknown as Record<string, string | number | string[] | undefined>,
      },
    ]);

    const subscriptionId = newRecord[0].id;
    const subscription = {
      id: subscriptionId,
      fields: newRecord[0].fields as AirtableSubscription['fields'],
    };

    // Update the subscriber record to include this subscription
    if (subscriberRecordId) {
      try {
        const subscriberRecord = await airtableBase('Subscribers').find(subscriberRecordId);
        const existingSubscriptions = (subscriberRecord.fields['Subscriptions'] as string[]) || [];

        if (!existingSubscriptions.includes(subscriptionId)) {
          const updatedSubscriptions = [...existingSubscriptions, subscriptionId];

          await airtableBase('Subscribers').update([
            {
              id: subscriberRecordId,
              fields: {
                'Subscriptions': updatedSubscriptions,
              },
            },
          ]);

          console.log(`Linked subscription ${subscriptionId} to subscriber ${subscriberRecordId}`);
        }
      } catch (updateError) {
        console.error('Error updating subscriber with subscription link:', updateError);
      }
    }

    return subscription;
  } catch (error) {
    console.error('Error creating/updating subscription:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  // Log webhook received (for debugging production issues)
  console.log('=== WEBHOOK RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request method:', request.method);
  console.log('Request URL:', request.url);
  console.log('Environment check - PAYSTACK_SECRET_KEY exists:', !!process.env.PAYSTACK_SECRET_KEY);
  console.log('Environment check - RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
  console.log('Environment check - AIRTABLE_API_KEY exists:', !!process.env.AIRTABLE_API_KEY);
  console.log('Environment check - AIRTABLE_BASE_ID exists:', !!process.env.AIRTABLE_BASE_ID);
  
  try {
    // Read raw body for signature verification
    const body = await request.text();
    console.log('Body length:', body.length);
    console.log('Body preview (first 200 chars):', body.substring(0, 200));
    
    const signature = request.headers.get('x-paystack-signature');
    console.log('Signature header present:', !!signature);

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
    console.log('Webhook event type:', event.event);
    console.log('Webhook event reference:', event.data?.reference);

    // Handle successful payment
    if (event.event === 'charge.success') {
      const { data } = event;
      
      // Check if this is a donation or channel payment
      // Paystack metadata can be in different formats, so check both
      const metadata = data.metadata?.custom_fields || [];
      const paymentTypeField = metadata.find((f: { variable_name: string }) => f.variable_name === 'payment_type');
      const phoneNumberField = metadata.find((f: { variable_name: string }) => f.variable_name === 'phone_number');
      const fullNameField = metadata.find((f: { variable_name: string }) => f.variable_name === 'full_name');
      
      // Try multiple ways to get payment_type
      let paymentType = paymentTypeField?.value;
      if (!paymentType && data.metadata?.payment_type) {
        paymentType = data.metadata.payment_type;
      }
      if (!paymentType) {
        // Check if it's in the metadata object directly
        paymentType = data.metadata?.payment_type || 'channel';
      }
      
      // Final fallback
      paymentType = paymentType || 'channel';
      
      console.log('Payment successful:', {
        reference: data.reference,
        amount: data.amount,
        email: data.customer.email,
        status: data.status,
        paymentType: paymentType,
        metadata: JSON.stringify(data.metadata),
        custom_fields: JSON.stringify(metadata),
        paymentTypeField: paymentTypeField ? JSON.stringify(paymentTypeField) : 'NOT FOUND'
      });

      // Check for donation payment type FIRST (case-insensitive and flexible matching)
      // Donations should ONLY go to Donations table, NOT Subscribers table
      // Check for various donation indicators
      const paymentTypeLower = paymentType ? String(paymentType).toLowerCase().trim() : '';
      const hasPlanCode = !!data.plan?.plan_code;
      
      // Check if it's a donation based on payment type
      let isDonation = paymentTypeLower && (
        paymentTypeLower.includes('donation') ||
        paymentTypeLower.includes('pour into my cup') ||
        paymentTypeLower.includes('pour into') ||
        paymentType === 'Pour into my cup' ||
        paymentType === 'donation' ||
        paymentType === 'Donation'
      );
      
      // Additional safeguard: If there's no plan code and payment type suggests donation, treat as donation
      // This helps catch cases where metadata might not be parsed correctly
      if (!isDonation && !hasPlanCode && paymentTypeLower) {
        // If payment type contains "pour" or "donation" keywords, it's likely a donation
        if (paymentTypeLower.includes('pour') || paymentTypeLower.includes('donation')) {
          isDonation = true;
          console.log('⚠️ Donation detected via fallback check (no plan code + donation keywords)');
        }
      }
      
      // CRITICAL: Additional check - if payment type is missing but there's no plan code,
      // and the callback URL suggests it's a donation, treat as donation
      if (!isDonation && !hasPlanCode && !paymentTypeLower) {
        // Check the callback URL or other indicators
        const callbackUrl = data.authorization?.callback_url || '';
        if (callbackUrl.includes('donation-success')) {
          isDonation = true;
          console.log('⚠️ Donation detected via callback URL check');
        }
      }
      
      console.log('Payment type check:', {
        paymentType: paymentType,
        paymentTypeLower: paymentTypeLower,
        hasPlanCode: hasPlanCode,
        isDonation: isDonation,
        willProcessDonation: isDonation,
        metadataKeys: Object.keys(data.metadata || {}),
        customFieldsCount: metadata.length
      });
      
      // Handle donations - ONLY sync to Donations table, skip Subscribers table
      if (isDonation) {
        console.log('=== DONATION DETECTED ===');
        console.log('Donation processed:', {
          amount: data.amount,
          email: data.customer.email,
          reference: data.reference,
          paymentType: paymentType
        });

        // Sync donation to Airtable Donations table
        try {
          console.log('Attempting to sync donation to Airtable...');
          console.log('Airtable base check:', !!getAirtableBase());
          
          // Get payment date from transaction
          const paymentDate = data.paid_at || data.paidAt || data.created_at;
          // Format date as YYYY-MM-DD for Airtable
          const formattedDate = paymentDate ? new Date(paymentDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

          const donationData = {
            'Email': data.customer?.email || undefined,
            'Phone Number': phoneNumberField?.value || data.customer?.phone || undefined,
            'Amount': data.amount / 100, // Convert from kobo to currency unit
            'Payment Date': formattedDate,
            'payment': data.reference, // Transaction reference (for logging)
          };

          console.log('Donation data to sync:', JSON.stringify(donationData, null, 2));
          const donationResult = await createOrUpdateDonation(donationData);
          console.log('Donation synced to Airtable Donations table successfully:', data.reference);
          console.log('Airtable record ID:', donationResult?.id);
        } catch (error) {
          console.error('Error syncing donation to Airtable:', error);
          console.error('Error details:', error instanceof Error ? error.message : JSON.stringify(error));
          console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
          // Don't fail the webhook if donation sync fails
        }

        // Send donation confirmation email if user provided an email
        const donorEmail = data.customer?.email;
        console.log('Donor email check:', donorEmail ? `Email provided: ${donorEmail}` : 'No email provided');
        
        if (donorEmail) {
          // Check if it's a temp email (mobile money)
          const isTempEmail = donorEmail.includes('@mobile.money') || donorEmail.includes('@coordinated-living.gh') || donorEmail.includes('temp-');
          
          if (isTempEmail) {
            console.log('Skipping email send - temp email detected:', donorEmail);
          } else {
            try {
              console.log('Attempting to send donation confirmation email to:', donorEmail);
              console.log('RESEND_API_KEY check:', !!process.env.RESEND_API_KEY);
              
              const emailResult = await sendDonationConfirmationEmail(
                donorEmail,
                data.amount / 100, // Convert from kobo to currency unit
                data.currency || 'GHS',
                data.reference
              );

              if (emailResult.success) {
                console.log('✅ Donation confirmation email sent successfully to:', donorEmail);
                console.log('Email message ID:', emailResult.messageId);
              } else {
                console.error('❌ Failed to send donation confirmation email:', emailResult.error);
                // Don't fail the webhook if email fails
              }
            } catch (emailError) {
              console.error('❌ Error sending donation confirmation email:', emailError);
              console.error('Email error details:', emailError instanceof Error ? emailError.message : JSON.stringify(emailError));
              console.error('Email error stack:', emailError instanceof Error ? emailError.stack : 'No stack trace');
              // Don't fail the webhook if email fails
            }
          }
        } else {
          console.log('No email provided for donation, skipping confirmation email');
        }
        
        // Donations are complete - return early, don't create subscriber records
        console.log('=== WEBHOOK PROCESSING COMPLETE (DONATION) ===');
        console.log('✅ Donation processed - NO subscriber record created');
        return NextResponse.json({ status: true, message: 'Donation processed successfully' });
      }
      
      // Handle non-donation payments (channel/subscription payments)
      // These should create Subscriber and Subscription records
      console.log('Processing channel/subscription payment (not a donation)');
      console.log('⚠️ This payment will create a subscriber record');
      
      // FINAL SAFEGUARD: Double-check this is NOT a donation before creating subscriber
      // If payment type is still unclear but has no plan code, be more cautious
      if (!hasPlanCode && !paymentTypeLower.includes('join') && !paymentTypeLower.includes('community') && !paymentTypeLower.includes('subscription')) {
        console.warn('⚠️ WARNING: Payment has no plan code and unclear payment type. Re-checking for donation...');
        // If we can't clearly identify it as a subscription, don't create subscriber
        // This prevents donations from accidentally becoming subscribers
        if (paymentType === 'channel' || paymentType === 'Unknown' || !paymentType) {
          console.error('❌ BLOCKED: Payment type is unclear and has no plan code. NOT creating subscriber to prevent donation from being added.');
          return NextResponse.json({ 
            status: true, 
            message: 'Payment received but type unclear - no subscriber created' 
          });
        }
      }
      
      // Sync transaction to Airtable - create both subscriber and subscription records
      try {
        const subscriberData = {
          'Email': data.customer?.email || '',
          'Phone Number': phoneNumberField?.value || data.customer?.phone || '',
          'Full Name': fullNameField?.value ||
            `${data.customer?.first_name || ''} ${data.customer?.last_name || ''}`.trim() || '',
          'Transaction Reference': data.reference,
          'Amount': data.amount / 100,
          'Currency': data.currency || 'GHS',
          'Status': data.status,
          'Payment Type': paymentType,
          'Paid At': data.paid_at || data.created_at,
          'Subscription Code': data.plan?.plan_code || '',
          'Plan Code': data.plan?.plan_code || '',
          'Customer Code': data.customer?.customer_code || '',
          'Created At': data.created_at,
        };

        // Create/update subscriber record (only for non-donations)
        const subscriberResult = await createOrUpdateSubscriber(subscriberData);

        // CRITICAL: Double-check this is NOT a donation before creating subscription
        // Even if we reached here, verify one more time
        const finalPaymentTypeCheck = paymentTypeLower || '';
        const isDefinitelyDonation = finalPaymentTypeCheck && (
          finalPaymentTypeCheck.includes('donation') ||
          finalPaymentTypeCheck.includes('pour into my cup') ||
          finalPaymentTypeCheck.includes('pour into') ||
          finalPaymentTypeCheck.includes('pour')
        );
        
        if (isDefinitelyDonation) {
          console.error('❌ BLOCKED: Donation detected in subscription creation path. NOT creating subscription record.');
          console.log('=== WEBHOOK PROCESSING COMPLETE (DONATION BLOCKED) ===');
          return NextResponse.json({ 
            status: true, 
            message: 'Donation detected - subscription creation blocked' 
          });
        }

        // If this is a subscription payment, also create a subscription record
        // ONLY create subscription if there's a plan code AND it's not a donation
        if (data.plan?.plan_code && subscriberResult?.id && !isDefinitelyDonation) {
          // Map plan to subscription package (1 month, 3 months, or 6 months)
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
          if (subscriptionPackage === '6 months') {
            expirationDate.setMonth(expirationDate.getMonth() + 6);
          } else if (subscriptionPackage === '3 months') {
            expirationDate.setMonth(expirationDate.getMonth() + 3);
          } else {
            // Default to 1 month
            expirationDate.setMonth(expirationDate.getMonth() + 1);
          }

          await createOrUpdateSubscription({
            'Name': `${subscriberData['Full Name']} - ${data.plan.plan_code}`,
            'Email': data.customer?.email || '',
            'Whatsapp Number': phoneNumberField?.value || data.customer?.phone || '',
            'Subscription Package': subscriptionPackage,
            'Amount Paid': data.amount / 100,
            'Expiration Date': expirationDate.toISOString(),
          }, subscriberResult.id);

          console.log('Subscription record created in Airtable with package:', subscriptionPackage);
        }

        console.log('Transaction synced to Airtable:', data.reference);
      } catch (error) {
        console.error('Error syncing transaction to Airtable:', error);
        // Don't fail the webhook if Airtable sync fails
      }
      
      console.log('=== WEBHOOK PROCESSING COMPLETE ===');
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

      // Sync subscription to Airtable
      try {
        const subscriberData = {
          'Email': data.customer?.email || '',
          'Phone Number': data.customer?.phone || data.customer?.international_format_phone || '',
          'Full Name': `${data.customer?.first_name || ''} ${data.customer?.last_name || ''}`.trim() || '',
          'Transaction Reference': data.subscription_code,
          'Amount': data.amount / 100,
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
          // Map plan to subscription package (1 month, 3 months, or 6 months)
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
          if (subscriptionPackage === '6 months') {
            expirationDate.setMonth(expirationDate.getMonth() + 6);
          } else if (subscriptionPackage === '3 months') {
            expirationDate.setMonth(expirationDate.getMonth() + 3);
          } else {
            // Default to 1 month
            expirationDate.setMonth(expirationDate.getMonth() + 1);
          }

          await createOrUpdateSubscription({
            'Name': `${subscriberData['Full Name']} - ${data.plan?.plan_code || 'Subscription'}`,
            'Email': data.customer?.email || '',
            'Whatsapp Number': data.customer?.phone || data.customer?.international_format_phone || '',
            'Subscription Package': subscriptionPackage,
            'Amount Paid': data.amount / 100,
            'Expiration Date': expirationDate.toISOString(),
          }, subscriberResult.id);

          console.log('Subscription record created in Airtable with package:', subscriptionPackage);
        }

        console.log('Subscription synced to Airtable:', data.subscription_code);
      } catch (error) {
        console.error('Error syncing subscription to Airtable:', error);
        // Don't fail the webhook if Airtable sync fails
      }
      
      return NextResponse.json({ status: true, message: 'Subscription created successfully' });
    }

    if (event.event === 'subscription.disable') {
      const { data } = event;
      
      console.log('Subscription disabled:', {
        subscription_code: data.subscription_code,
        customer_email: data.customer.email,
        status: data.status
      });

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
