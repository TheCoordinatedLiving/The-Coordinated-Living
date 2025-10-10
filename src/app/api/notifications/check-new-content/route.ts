import { NextRequest, NextResponse } from 'next/server';
import { notificationStorage } from '@/lib/notificationStorage';
import webpush from 'web-push';

// Configure web-push with VAPID keys
webpush.setVapidDetails(
  'mailto:your-email@example.com', // This can be any email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Checking for new content...');
    
    // Get all active subscriptions
    const subscriptions = notificationStorage.getAllSubscriptions();
    console.log(`📱 Found ${subscriptions.length} active subscriptions`);
    
    if (subscriptions.length === 0) {
      return NextResponse.json({ 
        message: 'No active subscriptions found',
        subscriptions: 0 
      });
    }

    // Check for new posts
    const postsResponse = await fetch(`${request.nextUrl.origin}/api/airtable/posts`);
    const postsData = await postsResponse.json();
    
    // Check for new guides
    const guidesResponse = await fetch(`${request.nextUrl.origin}/api/airtable/guides`);
    const guidesData = await guidesResponse.json();
    
    // Determine if there's new content
    const hasNewPosts = postsData.posts && postsData.posts.length > 0;
    const hasNewGuides = guidesData.guides && guidesData.guides.length > 0;
    
    if (!hasNewPosts && !hasNewGuides) {
      return NextResponse.json({ 
        message: 'No new content found',
        posts: postsData.posts?.length || 0,
        guides: guidesData.guides?.length || 0
      });
    }

    // Create notification payload
    let notificationTitle = '';
    let notificationBody = '';
    
    if (hasNewPosts && hasNewGuides) {
      notificationTitle = 'New Content Available! 📚';
      notificationBody = `Check out ${postsData.posts.length} new posts and ${guidesData.guides.length} new guides!`;
    } else if (hasNewPosts) {
      notificationTitle = 'New Posts Available! 📝';
      notificationBody = `${postsData.posts.length} new posts are waiting for you!`;
    } else if (hasNewGuides) {
      notificationTitle = 'New Guides Available! 📖';
      notificationBody = `${guidesData.guides.length} new guides are ready to read!`;
    }

    const payload = JSON.stringify({
      title: notificationTitle,
      body: notificationBody,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'new-content',
      data: {
        url: request.nextUrl.origin
      },
      actions: [
        {
          action: 'open',
          title: 'Read Now'
        }
      ]
    });

    // Send push notifications to all subscribers
    const results = await Promise.allSettled(
      subscriptions.map(async (subscription) => {
        try {
          await webpush.sendNotification(subscription, payload);
          console.log('✅ Push notification sent successfully');
          return { success: true, endpoint: subscription.endpoint };
        } catch (error: unknown) {
          console.error('❌ Failed to send push notification:', error);
          
          // Remove invalid subscriptions
          if (error.statusCode === 410 || error.statusCode === 404) {
            notificationStorage.removeSubscription(subscription.endpoint);
            console.log('🗑️ Removed invalid subscription');
          }
          
          return { 
            success: false, 
            endpoint: subscription.endpoint, 
            error: error.message 
          };
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;

    console.log(`📊 Push notification results: ${successful} successful, ${failed} failed`);

    return NextResponse.json({
      message: 'Push notifications sent',
      notification: {
        title: notificationTitle,
        body: notificationBody
      },
      results: {
        total: subscriptions.length,
        successful,
        failed
      },
      content: {
        posts: postsData.posts?.length || 0,
        guides: guidesData.guides?.length || 0
      }
    });

  } catch (error: unknown) {
    console.error('❌ Error checking for new content:', error);
    return NextResponse.json(
      { error: 'Failed to check for new content', details: error.message },
      { status: 500 }
    );
  }
}

// Allow POST requests for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}
