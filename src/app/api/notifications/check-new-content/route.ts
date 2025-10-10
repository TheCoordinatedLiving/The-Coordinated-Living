import { NextRequest, NextResponse } from 'next/server';
import { sendNotification } from '@/lib/onesignal';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Checking for new content...');

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

    // Send notification via OneSignal
    const result = await sendNotification(
      notificationTitle,
      notificationBody,
      request.nextUrl.origin
    );

    console.log('✅ OneSignal notification sent:', result);

    return NextResponse.json({
      message: 'OneSignal notifications sent',
      notification: {
        title: notificationTitle,
        body: notificationBody
      },
      result: result,
      content: {
        posts: postsData.posts?.length || 0,
        guides: guidesData.guides?.length || 0
      }
    });

  } catch (error: unknown) {
    console.error('❌ Error checking for new content:', error);
    return NextResponse.json(
      { error: 'Failed to check for new content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Allow POST requests for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}
