import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import Airtable from 'airtable';

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
      const paymentType = data.metadata?.payment_type || 'channel';
      
      console.log('Payment successful:', {
        reference: data.reference,
        amount: data.amount,
        email: data.customer.email,
        status: data.status,
        paymentType: paymentType
      });

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

        // Send donation confirmation email and update Airtable
        try {
          await Promise.all([
            sendDonationEmail(data),
            updateAirtableDonation(data)
          ]);
          console.log('Donation email sent and Airtable updated successfully');
        } catch (error) {
          console.error('Error processing donation:', error);
          // Don't fail the webhook if email/Airtable fails
          // The payment was successful, so we still return success
        }
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
