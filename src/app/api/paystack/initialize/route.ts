import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, phoneNumber, amount, type = 'channel', paymentType = 'regular' } = await request.json();

    // For mobile money payments, email is not required
    if (paymentType === 'momo') {
      if (!phoneNumber || !amount) {
        return NextResponse.json(
          { status: false, message: 'Phone number and amount are required' },
          { status: 400 }
        );
      }
    } else {
      // For regular payments, email is required
      if (!email || !amount) {
        return NextResponse.json(
          { status: false, message: 'Email and amount are required' },
          { status: 400 }
        );
      }

      // Validate email format only for regular payments
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { status: false, message: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Validate phone number format (supports Ghana format starting with 0 and international format starting with +)
    if (phoneNumber && phoneNumber.trim() !== '') {
      const phoneRegex = /^(\+[1-9][\d]{7,14}|0[0-9]{8,9})$/;
      if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
        return NextResponse.json(
          { status: false, message: 'Invalid phone number format' },
          { status: 400 }
        );
      }
    }

    // Get Paystack secret key from environment variables or use test key
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY ;
    
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY is not set in environment variables');
      return NextResponse.json(
        { status: false, message: 'Payment service configuration error' },
        { status: 500 }
      );
    }

    // Initialize Paystack transaction
    const callbackUrl = type === 'donation' 
      ? `${process.env.NEXT_PUBLIC_BASE_URL || 'https://coordinated-living.vercel.app'}/donation-success`
      : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://coordinated-living.vercel.app'}/payment-success?type=${type}`;
    console.log('API: Generating callback URL:', callbackUrl);
    console.log('API: Payment type:', type);
    
    // For mobile money payments, use phone number as email or generate a temporary email
    const paystackEmail = paymentType === 'momo' 
      ? `${phoneNumber.replace(/\s/g, '')}@mobile.money` 
      : email;

    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: paystackEmail,
        amount: amount, // Amount in kobo
        currency: 'GHS',
        callback_url: callbackUrl,
        metadata: {
          custom_fields: [
            {
              display_name: "Payment Type",
              variable_name: "payment_type",
              value: type === 'donation' ? 'Pour into my cup' : 'Join Channel'
            },
            {
              display_name: "Payment Method",
              variable_name: "payment_method",
              value: paymentType === 'momo' ? 'Mobile Money' : 'Card'
            },
            ...(phoneNumber && phoneNumber.trim() !== '' ? [{
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: phoneNumber
            }] : [])
          ]
        }
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      console.error('Paystack API error:', paystackData);
      return NextResponse.json(
        { status: false, message: paystackData.message || 'Failed to initialize payment' },
        { status: paystackResponse.status }
      );
    }

    return NextResponse.json(paystackData);
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { status: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
