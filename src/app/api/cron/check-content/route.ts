// CRON JOB COMMENTED OUT - NO LONGER NEEDED
import { NextRequest, NextResponse } from 'next/server';

// Disabled cron job - returns 404
export async function GET(request: NextRequest) {
  return NextResponse.json({ error: 'Cron job disabled' }, { status: 404 });
}

// Original code commented out below:
// import { fetchPosts, fetchGuides, AirtablePost, AirtableGuide } from '@/lib/airtable';
// import { sendNotification } from '@/lib/onesignal';

// // Store the last known content state
// let lastContentState = {
//   posts: new Set<string>(),
//   guides: new Set<string>(),
//   lastChecked: new Date()
// };

// export async function GET(request: NextRequest) {
//   try {
//     console.log('🕐 Cron job triggered - checking for new content...');
    
//     // Verify this is a legitimate cron request
//     const authHeader = request.headers.get('authorization');
//     if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//       console.log('❌ Unauthorized cron request');
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     console.log('📱 Checking for OneSignal subscribers...');

//     // Fetch current content
//     const [posts, guides] = await Promise.all([
//       fetchPosts(),
//       fetchGuides()
//     ]);

//     // Create current content state
//     const currentPosts = new Set(posts.map(post => post.id));
//     const currentGuides = new Set(guides.map(guide => guide.id));

//     // Check for new content
//     const newPosts = [...currentPosts].filter(id => !lastContentState.posts.has(id));
//     const newGuides = [...currentGuides].filter(id => !lastContentState.guides.has(id));

//     console.log(`📊 Content check results: ${newPosts.length} new posts, ${newGuides.length} new guides`);

//     // Update last known state
//     lastContentState = {
//       posts: currentPosts,
//       guides: currentGuides,
//       lastChecked: new Date()
//     };

//     // If there's new content, send notifications
//     if (newPosts.length > 0 || newGuides.length > 0) {
//       await sendContentNotifications(newPosts, newGuides, posts, guides);
//     }

//     return NextResponse.json({
//       success: true,
//       newPosts: newPosts.length,
//       newGuides: newGuides.length,
//       lastChecked: lastContentState.lastChecked,
//       message: newPosts.length > 0 || newGuides.length > 0 
//         ? 'New content detected and notifications sent' 
//         : 'No new content'
//     });

//   } catch (error) {
//     console.error('❌ Error in cron job:', error);
//     return NextResponse.json(
//       { error: 'Failed to check content', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }

// async function sendContentNotifications(
//   newPostIds: string[], 
//   newGuideIds: string[], 
//   allPosts: AirtablePost[], 
//   allGuides: AirtableGuide[]
// ) {
//   try {
//     // Get details of new content
//     const newPosts = allPosts.filter(post => newPostIds.includes(post.id));
//     const newGuides = allGuides.filter(guide => newGuideIds.includes(guide.id));

//     // Send notifications for new posts
//     for (const post of newPosts) {
//       await sendNotification(
//         'New Post Available! 📝',
//         post.fields.Title || 'Check out the latest post',
//         `https://www.thecoordinatedliving.com/post/${post.id}`
//       );
//     }

//     // Send notifications for new guides
//     for (const guide of newGuides) {
//       await sendNotification(
//         'New Guide Available! 📖',
//         guide.fields.Title || 'Check out the latest guide',
//         'https://www.thecoordinatedliving.com/guides-mobile'
//       );
//     }

//     console.log(`✅ Sent OneSignal notifications for ${newPosts.length} new posts and ${newGuides.length} new guides`);

//   } catch (error) {
//     console.error('❌ Error sending OneSignal content notifications:', error);
//   }
// }