import { useEffect, useCallback } from 'react';
import { useSimpleNotifications } from './useSimpleNotifications';

export const useContentNotifications = () => {
  const { sendNotification, isEnabled } = useSimpleNotifications();

  // Check for new content when the component mounts (for immediate feedback)
  const checkForNewContent = useCallback(async () => {
    if (!isEnabled) {
      console.log('Push notifications enabled - content will be checked server-side');
      return;
    }

    try {
      console.log('Checking for new content on page load...');
      
      // Get the last check time from localStorage
      const lastCheck = localStorage.getItem('last-content-check');
      const now = new Date().toISOString();
      
      // Check posts
      const postsResponse = await fetch('/api/airtable/posts');
      const postsData = await postsResponse.json();
      
      // Check guides
      const guidesResponse = await fetch('/api/airtable/guides');
      const guidesData = await guidesResponse.json();
      
      // Find new content (simplified - just check if there are any posts/guides)
      const hasNewPosts = postsData.posts && postsData.posts.length > 0;
      const hasNewGuides = guidesData.guides && guidesData.guides.length > 0;
      
      if (hasNewPosts || hasNewGuides) {
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
        
        // Only send notification if we haven't checked recently (avoid spam)
        if (!lastCheck || (new Date(now).getTime() - new Date(lastCheck).getTime()) > 60000) { // 1 minute cooldown
          sendNotification(notificationTitle, notificationBody, '/');
          console.log('New content notification sent:', notificationTitle);
        }
      }
      
      // Update last check time
      localStorage.setItem('last-content-check', now);
      
    } catch (error) {
      console.error('Error checking for new content:', error);
    }
  }, [isEnabled, sendNotification]);

  // Check for new content when the hook is used (for immediate feedback on page load)
  useEffect(() => {
    // Small delay to let the page load
    const timer = setTimeout(() => {
      checkForNewContent();
    }, 2000);

    return () => clearTimeout(timer);
  }, [checkForNewContent]);

  return {
    checkForNewContent
  };
};
