import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, amount } = await request.json();

    if (!email || !amount) {
      return NextResponse.json(
        { status: false, message: 'Email and amount are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { status: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get Paystack secret key from environment variables or use test key
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY || 'sk_test_e85988fa08e6452ebc108c7cf0f8aef6f206ca51';
    
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY is not set in environment variables');
      return NextResponse.json(
        { status: false, message: 'Payment service configuration error' },
        { status: 500 }
      );
    }

    // Initialize Paystack transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        amount: amount, // Amount in kobo
        currency: 'GHS',
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://coordinated-living.vercel.app'}/payment-success`,
        metadata: {
          custom_fields: [
            {
              display_name: "Payment For",
              variable_name: "payment_for",
              value: "Join Channel"
            }
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
