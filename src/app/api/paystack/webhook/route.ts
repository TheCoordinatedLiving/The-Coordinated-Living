import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrUpdateSubscriber, getAirtableBase, createOrUpdateDonation } from '@/lib/airtable';
import { AirtableSubscription } from '@/lib/airtable';
import { sendDonationConfirmationEmail } from '@/lib/email';

/**
 * Maps Paystack plan information to Airtable subscription package values
 * Returns "3 months" or "6 months" based on plan interval, name, or metadata
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
      if (packageValue.includes('3') || packageValue.includes('three')) {
        return '3 months';
      }
      if (packageValue.includes('6') || packageValue.includes('six')) {
        return '6 months';
      }
    }
  }

  // Check plan name or description for duration indicators
  const planName = String(plan?.name || '').toLowerCase();
  const planDescription = String(plan?.description || '').toLowerCase();
  const combinedText = `${planName} ${planDescription}`;

  // Check for 6 months indicators
  if (combinedText.includes('6') || combinedText.includes('six')) {
    return '6 months';
  }

  // Check for 3 months indicators
  if (combinedText.includes('3') || combinedText.includes('three') || combinedText.includes('quarter')) {
    return '3 months';
  }

  // If interval is monthly, default to 3 months
  if (plan?.interval === 'monthly') {
    // Check plan code for hints
    const planCode = String(plan?.plan_code || '').toLowerCase();
    if (planCode.includes('6') || planCode.includes('six')) {
      return '6 months';
    }
    // Default monthly to 3 months if no other indicators found
    return '3 months';
  }

  // Default fallback
  return '3 months';
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

    // Subscription Package (single select) - "3 months" or "6 months"
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

        // Create/update subscriber record
        const subscriberResult = await createOrUpdateSubscriber(subscriberData);

        // If this is a subscription payment, also create a subscription record
        if (data.plan?.plan_code && subscriberResult?.id) {
          // Map plan to subscription package (3 months or 6 months)
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
          } else {
            // Default to 3 months
            expirationDate.setMonth(expirationDate.getMonth() + 3);
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

      // Handle donation-specific logic
      // Extract payment type from metadata custom_fields
      const customFields = data.metadata?.custom_fields || [];
      const paymentTypeField = customFields.find((field: any) => 
        field.variable_name === 'payment_type'
      );
      const actualPaymentType = paymentTypeField?.value || paymentType;
      
      if (actualPaymentType === 'Pour into my cup') {
        console.log('Donation processed:', {
          amount: data.amount,
          email: data.customer.email,
          reference: data.reference
        });

        // Sync donation to Airtable Donations table
        try {
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

          await createOrUpdateDonation(donationData);
          console.log('Donation synced to Airtable Donations table:', data.reference);
        } catch (error) {
          console.error('Error syncing donation to Airtable:', error);
          // Don't fail the webhook if donation sync fails
        }

        // Send donation confirmation email if user provided an email
        const donorEmail = data.customer?.email;
        if (donorEmail) {
          try {
            const emailResult = await sendDonationConfirmationEmail(
              donorEmail,
              data.amount / 100, // Convert from kobo to currency unit
              data.currency || 'GHS',
              data.reference
            );

            if (emailResult.success) {
              console.log('Donation confirmation email sent to:', donorEmail);
            } else {
              console.error('Failed to send donation confirmation email:', emailResult.error);
              // Don't fail the webhook if email fails
            }
          } catch (emailError) {
            console.error('Error sending donation confirmation email:', emailError);
            // Don't fail the webhook if email fails
          }
        } else {
          console.log('No email provided for donation, skipping confirmation email');
        }
      } else {
        // Handle channel payment logic
        console.log('Channel payment processed:', {
          amount: data.amount,
          email: data.customer.email,
          reference: data.reference
        });
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
          // Map plan to subscription package (3 months or 6 months)
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
          } else {
            // Default to 3 months
            expirationDate.setMonth(expirationDate.getMonth() + 3);
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

// Helper function to send donation confirmation email
async function sendDonationEmail(data: any) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set in environment variables');
      throw new Error('Email service not configured');
    }

    const resend = new Resend(resendApiKey);
    
    // Extract email from customer data
    // Handle mobile money emails (temp emails)
    const customerEmail = data.customer?.email || '';
    const isTempEmail = customerEmail.includes('@mobile.money') || customerEmail.includes('@coordinated-living.gh');
    
    // Extract phone number from metadata if available
    const customFields = data.metadata?.custom_fields || [];
    const phoneField = customFields.find((field: any) => 
      field.variable_name === 'phone_number'
    );
    const phoneNumber = phoneField?.value || '';
    
    // Format amount (amount is in kobo/smallest currency unit)
    const amount = (data.amount / 100).toFixed(2);
    const currency = data.currency || 'GHS';
    const currencySymbols: { [key: string]: string } = {
      'GHS': '₵',
      'NGN': '₦',
      'ZAR': 'R',
      'KES': 'KSh',
      'USD': '$'
    };
    const symbol = currencySymbols[currency] || currency;
    
    // Only send email if it's a real email address
    if (isTempEmail && !phoneNumber) {
      console.log('Skipping email send - temp email and no phone number');
      return;
    }
    
    // Use phone number email or customer email
    const recipientEmail = isTempEmail && phoneNumber 
      ? phoneNumber.replace(/\s/g, '') + '@coordinated-living.gh' // This won't work, need real email
      : customerEmail;
    
    // If it's still a temp email, we can't send to it
    if (recipientEmail.includes('@mobile.money') || recipientEmail.includes('@coordinated-living.gh')) {
      console.log('Skipping email send - no valid email address');
      return;
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'letstalk@thecoordinatedliving.com',
      to: recipientEmail,
      subject: 'Thank You for Your Donation - The Coordinated Living',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #5C3262;">Thank You for Your Generous Donation</h2>
          <p>Dear Supporter,</p>
          <p>We are deeply grateful for your donation of <strong>${symbol}${amount} ${currency}</strong> to The Coordinated Living platform.</p>
          <p>Your support helps us continue this work in a sustainable way, and we are truly grateful to have you as part of this journey.</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Transaction Reference:</strong> ${data.reference}</p>
            <p style="margin: 5px 0 0 0;"><strong>Amount:</strong> ${symbol}${amount} ${currency}</p>
            <p style="margin: 5px 0 0 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <p>Thank you for pouring into this platform. Your kindness makes a difference.</p>
          <p>With gratitude,<br>The Coordinated Living Team</p>
        </div>
      `,
      text: `Thank You for Your Generous Donation\n\nDear Supporter,\n\nWe are deeply grateful for your donation of ${symbol}${amount} ${currency} to The Coordinated Living platform.\n\nYour support helps us continue this work in a sustainable way, and we are truly grateful to have you as part of this journey.\n\nTransaction Reference: ${data.reference}\nAmount: ${symbol}${amount} ${currency}\nDate: ${new Date().toLocaleDateString()}\n\nThank you for pouring into this platform. Your kindness makes a difference.\n\nWith gratitude,\nThe Coordinated Living Team`,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw error;
    }

    console.log('Donation confirmation email sent successfully:', emailData?.id);
  } catch (error) {
    console.error('Error sending donation email:', error);
    throw error;
  }
}

// Helper function to update Airtable with donation record
async function updateAirtableDonation(data: any) {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      console.error('Airtable API key or Base ID not found in environment variables');
      throw new Error('Airtable not configured');
    }

    const base = new Airtable({ apiKey }).base(baseId);
    
    // Extract data from payment
    const amount = data.amount / 100; // Convert from kobo to main currency unit
    const currency = data.currency || 'GHS';
    const customerEmail = data.customer?.email || '';
    const reference = data.reference;
    
    // Extract phone number from metadata if available
    const customFields = data.metadata?.custom_fields || [];
    const phoneField = customFields.find((field: any) => 
      field.variable_name === 'phone_number'
    );
    const phoneNumber = phoneField?.value || '';
    
    // Extract payment method
    const paymentMethodField = customFields.find((field: any) => 
      field.variable_name === 'payment_method'
    );
    const paymentMethod = paymentMethodField?.value || 'Card';

    // Create donation record in Airtable
    // Assuming table name is "Donations" - adjust if different
    const donationRecord = {
      'Reference': reference,
      'Amount': amount,
      'Currency': currency,
      'Email': customerEmail.includes('@mobile.money') || customerEmail.includes('@coordinated-living.gh') ? '' : customerEmail,
      'Phone Number': phoneNumber || '',
      'Payment Method': paymentMethod,
      'Date': new Date().toISOString(),
      'Status': 'Success'
    };

    await base('Donations').create([{ fields: donationRecord }]);
    console.log('Donation record created in Airtable:', reference);
  } catch (error) {
    console.error('Error updating Airtable donation:', error);
    throw error;
  }
}
