import { NextRequest, NextResponse } from 'next/server';
import { fetchPosts, fetchGuides, AirtablePost, AirtableGuide } from '@/lib/airtable';
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

// Store the last known content state
let lastContentState = {
  posts: new Set<string>(),
  guides: new Set<string>(),
  lastChecked: new Date()
};

export async function GET(request: NextRequest) {
  try {
    console.log('🕐 Cron job triggered - checking for new content...');
    
    // Verify this is a legitimate cron request
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log('❌ Unauthorized cron request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all active subscriptions
    const subscriptions = notificationStorage.getAllSubscriptions();
    console.log(`📱 Found ${subscriptions.length} active subscriptions`);
    
    if (subscriptions.length === 0) {
      console.log('ℹ️ No active subscriptions found');
      return NextResponse.json({ 
        message: 'No active subscriptions found',
        subscriptions: 0 
      });
    }

    // Fetch current content
    const [posts, guides] = await Promise.all([
      fetchPosts(),
      fetchGuides()
    ]);

    // Create current content state
    const currentPosts = new Set(posts.map(post => post.id));
    const currentGuides = new Set(guides.map(guide => guide.id));

    // Check for new content
    const newPosts = [...currentPosts].filter(id => !lastContentState.posts.has(id));
    const newGuides = [...currentGuides].filter(id => !lastContentState.guides.has(id));

    console.log(`📊 Content check results: ${newPosts.length} new posts, ${newGuides.length} new guides`);

    // Update last known state
    lastContentState = {
      posts: currentPosts,
      guides: currentGuides,
      lastChecked: new Date()
    };

    // If there's new content, send notifications
    if (newPosts.length > 0 || newGuides.length > 0) {
      await sendContentNotifications(newPosts, newGuides, posts, guides);
    }

    return NextResponse.json({
      success: true,
      newPosts: newPosts.length,
      newGuides: newGuides.length,
      lastChecked: lastContentState.lastChecked,
      subscriptions: subscriptions.length,
      message: newPosts.length > 0 || newGuides.length > 0 
        ? 'New content detected and notifications sent' 
        : 'No new content'
    });

  } catch (error) {
    console.error('❌ Error in cron job:', error);
    return NextResponse.json(
      { error: 'Failed to check content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function sendContentNotifications(
  newPostIds: string[], 
  newGuideIds: string[], 
  allPosts: AirtablePost[], 
  allGuides: AirtableGuide[]
) {
  try {
    // Get details of new content
    const newPosts = allPosts.filter(post => newPostIds.includes(post.id));
    const newGuides = allGuides.filter(guide => newGuideIds.includes(guide.id));

    // Get all subscriptions
    const subscriptions = notificationStorage.getAllSubscriptions();

    // Send notifications for new posts
    for (const post of newPosts) {
      await sendNotification({
        title: 'New Post Available! 📝',
        body: post.fields.Title || 'Check out the latest post',
        url: `/post/${post.id}`,
        type: 'new-post',
        subscriptions
      });
    }

    // Send notifications for new guides
    for (const guide of newGuides) {
      await sendNotification({
        title: 'New Guide Available! 📖',
        body: guide.fields.Title || 'Check out the latest guide',
        url: '/guides-mobile',
        type: 'new-guide',
        subscriptions
      });
    }

    console.log(`✅ Sent notifications for ${newPosts.length} new posts and ${newGuides.length} new guides`);

  } catch (error) {
    console.error('❌ Error sending content notifications:', error);
  }
}

async function sendNotification({ title, body, url, type, subscriptions }: {
  title: string;
  body: string;
  url: string;
  type: string;
  subscriptions: webpush.PushSubscription[];
}) {
  try {
    const payload = JSON.stringify({
      title: title,
      body: body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: type,
      url: url,
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

    // Send notifications to all subscribers
    const sendPromises = subscriptions.map(async (subscription) => {
      try {
        await webpush.sendNotification(subscription, payload);
        console.log(`✅ Notification sent successfully to subscription`);
        return { success: true, subscription: subscription.endpoint };
      } catch (error) {
        console.error(`❌ Failed to send notification:`, error);
        return { success: false, subscription: subscription.endpoint, error };
      }
    });

    const results = await Promise.all(sendPromises);
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`📊 Notification results: ${successful} successful, ${failed} failed`);

  } catch (error) {
    console.error('❌ Error in sendNotification:', error);
  }
}
