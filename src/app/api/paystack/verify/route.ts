import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json(
        { status: false, message: 'Reference is required' },
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

    // Verify transaction with Paystack
    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      console.error('Paystack verification error:', paystackData);
      return NextResponse.json(
        { status: false, message: paystackData.message || 'Failed to verify payment' },
        { status: paystackResponse.status }
      );
    }

    return NextResponse.json(paystackData);
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { status: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
