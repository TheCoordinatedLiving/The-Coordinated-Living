// CRON JOB COMMENTED OUT - NO LONGER NEEDED
// import { NextResponse } from 'next/server';
// import { fetchPosts, fetchGuides, AirtablePost, AirtableGuide } from '@/lib/airtable';

// // Store the last known content state
// let lastContentState = {
//   posts: new Set<string>(),
//   guides: new Set<string>(),
//   lastChecked: new Date()
// };

// export async function GET() {
//   try {
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
//     console.error('Error checking content:', error);
//     return NextResponse.json(
//       { error: 'Failed to check content' },
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
//       await sendNotification({
//         title: 'New Post Available!',
//         body: post.fields.Title || 'Check out the latest post',
//         url: `/post/${post.id}`,
//         type: 'new-post'
//       });
//     }

//     // Send notifications for new guides
//     for (const guide of newGuides) {
//       await sendNotification({
//         title: 'New Guide Available!',
//         body: guide.fields.Title || 'Check out the latest guide',
//         url: '/guides-mobile',
//         type: 'new-guide'
//       });
//     }

//     console.log(`Sent notifications for ${newPosts.length} new posts and ${newGuides.length} new guides`);

//   } catch (error) {
//     console.error('Error sending content notifications:', error);
//   }
// }

// async function sendNotification({ title, body, url, type }: {
//   title: string;
//   body: string;
//   url: string;
//   type: string;
// }) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/send`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         title,
//         body,
//         url,
//         type
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to send notification: ${response.statusText}`);
//     }

//     const result = await response.json();
//     console.log('Notification sent successfully:', result);

//   } catch (error) {
//     console.error('Error sending notification:', error);
//   }
// }