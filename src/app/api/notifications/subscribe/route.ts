import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';
import { notificationStorage } from '@/lib/notificationStorage';

// Configure web-push with VAPID keys
const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  privateKey: process.env.VAPID_PRIVATE_KEY || ''
};

if (vapidKeys.publicKey && vapidKeys.privateKey) {
  webpush.setVapidDetails(
    'mailto:letstalk@thecoordinatedliving.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
}

export async function POST(request: NextRequest) {
  try {
    const { subscription } = await request.json();

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription object is required' },
        { status: 400 }
      );
    }

    // Validate subscription object
    if (!subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        { error: 'Invalid subscription object' },
        { status: 400 }
      );
    }

    // Add subscription to storage
    notificationStorage.addSubscription({
      ...subscription,
      subscribedAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to notifications',
      subscriptionCount: notificationStorage.getSubscriptionCount()
    });

  } catch (error) {
    console.error('Error subscribing to notifications:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to notifications' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    subscriptionCount: notificationStorage.getSubscriptionCount(),
    publicKey: vapidKeys.publicKey
  });
}
