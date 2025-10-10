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
    const { title, body, url, type } = await request.json();

    if (!title || !body) {
      return NextResponse.json(
        { error: 'Title and body are required' },
        { status: 400 }
      );
    }

    // Default notification payload
    const payload = JSON.stringify({
      title: title,
      body: body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: type || 'new-content',
      url: url || '/',
      requireInteraction: false,
      actions: [
        {
          action: 'open',
          title: 'Read Now'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    });

    // Get all subscriptions
    const subscriptions = notificationStorage.getAllSubscriptions();
    
    if (subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No subscribers to send notifications to',
        stats: {
          total: 0,
          successful: 0,
          failed: 0
        }
      });
    }

    // Send notifications to all subscribers
    const sendPromises = subscriptions.map(async (subscription, index) => {
      try {
        await webpush.sendNotification(subscription, payload);
        console.log(`Notification sent to subscription ${index + 1}`);
        return { success: true, index };
      } catch (error: unknown) {
        console.error(`Failed to send notification to subscription ${index + 1}:`, error);
        
        // Remove invalid subscriptions
        if (error && typeof error === 'object' && 'statusCode' in error) {
          const statusCode = (error as { statusCode: number }).statusCode;
          if (statusCode === 410 || statusCode === 404) {
            notificationStorage.removeSubscription(subscription.endpoint);
            console.log(`Removed invalid subscription ${index + 1}`);
          }
        }
        
        return { success: false, index, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    });

    const results = await Promise.allSettled(sendPromises);
    
    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length;
    
    const failed = results.length - successful;

    console.log(`Notification sending completed: ${successful} successful, ${failed} failed`);

    return NextResponse.json({
      success: true,
      message: `Notifications sent to ${successful} subscribers`,
      stats: {
        total: subscriptions.length,
        successful,
        failed
      }
    });

  } catch (error: unknown) {
    console.error('Error sending notifications:', error);
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}

// Test endpoint to send a sample notification
export async function GET() {
  try {
    const testPayload = JSON.stringify({
      title: 'Test Notification',
      body: 'This is a test notification from Coordinated Living',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'test',
      url: '/',
      requireInteraction: false
    });

    const subscriptions = notificationStorage.getAllSubscriptions();
    
    if (subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No subscribers to send test notification to',
        totalSubscriptions: 0
      });
    }

    const sendPromises = subscriptions.map(async (subscription, index) => {
      try {
        await webpush.sendNotification(subscription, testPayload);
        return { success: true, index };
      } catch (error: unknown) {
        return { success: false, index, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    });

    const results = await Promise.allSettled(sendPromises);
    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length;

    return NextResponse.json({
      success: true,
      message: `Test notification sent to ${successful} subscribers`,
      totalSubscriptions: subscriptions.length
    });

  } catch (error: unknown) {
    console.error('Error sending test notification:', error);
    return NextResponse.json(
      { error: 'Failed to send test notification' },
      { status: 500 }
    );
  }
}
