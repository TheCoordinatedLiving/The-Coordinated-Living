import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, amount, interval } = await request.json();

    if (!name || !amount || !interval) {
      return NextResponse.json(
        { status: false, message: 'Name, amount, and interval are required' },
        { status: 400 }
      );
    }

    // Get Paystack secret key from environment variables
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY is not set in environment variables');
      return NextResponse.json(
        { status: false, message: 'Payment service configuration error' },
        { status: 500 }
      );
    }

    // Create plan with Paystack
    const paystackResponse = await fetch('https://api.paystack.co/plan', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        amount: amount, // Amount in kobo
        interval: interval, // 'monthly', 'yearly', etc.
        currency: 'GHS',
        description: `Coordinated Living - ${name}`,
        send_invoices: true,
        send_sms: true,
        hosted_page: false,
        hosted_page_url: '',
        hosted_page_summary: '',
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://coordinated-living.vercel.app'}/payment-success?type=subscription`
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      console.error('Paystack plan creation error:', paystackData);
      return NextResponse.json(
        { status: false, message: paystackData.message || 'Failed to create plan' },
        { status: paystackResponse.status }
      );
    }

    return NextResponse.json(paystackData);
  } catch (error) {
    console.error('Plan creation error:', error);
    return NextResponse.json(
      { status: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
