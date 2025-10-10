import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { subscription } = await request.json();

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription object is required' },
        { status: 400 }
      );
    }

    // OneSignal handles subscription management automatically
    // This endpoint is kept for compatibility but OneSignal manages subscriptions
    console.log('OneSignal subscription received:', subscription);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to OneSignal notifications',
      note: 'OneSignal manages subscriptions automatically'
    });

  } catch (error) {
    console.error('Error with OneSignal subscription:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'OneSignal subscription endpoint',
    note: 'OneSignal manages subscriptions automatically',
    appId: process.env.ONESIGNAL_APP_ID
  });
}
