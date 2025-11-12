import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, phoneNumber, fullName, planCode } = await request.json();

    if (!email || !planCode) {
      return NextResponse.json(
        { status: false, message: 'Email and plan code are required' },
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

    // Validate phone number format (Ghana format) - only if provided
    if (phoneNumber && phoneNumber.trim() !== '') {
      const phoneRegex = /^(\+233|0)[0-9]{9}$/;
      if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
        return NextResponse.json(
          { status: false, message: 'Invalid phone number format. Please use Ghana format (e.g., 0548838479)' },
          { status: 400 }
        );
      }
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

    // Initialize subscription with Paystack
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.thecoordinatedliving.com'}/payment-success?type=subscription`;
    
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        amount: 0, // For subscription, amount is handled by the plan
        currency: 'GHS',
        callback_url: callbackUrl,
        plan: planCode,
        metadata: {
          custom_fields: [
            {
              display_name: "Payment Type",
              variable_name: "payment_type",
              value: "Join Community Subscription"
            },
            {
              display_name: "Plan Code",
              variable_name: "plan_code",
              value: planCode
            },
            ...(fullName && fullName.trim() !== '' ? [{
              display_name: "Full Name",
              variable_name: "full_name",
              value: fullName
            }] : []),
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
      console.error('Paystack subscription initialization error:', paystackData);
      return NextResponse.json(
        { status: false, message: paystackData.message || 'Failed to initialize subscription' },
        { status: paystackResponse.status }
      );
    }

    return NextResponse.json(paystackData);
  } catch (error) {
    console.error('Subscription initialization error:', error);
    return NextResponse.json(
      { status: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
