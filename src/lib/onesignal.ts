import { OneSignal } from 'onesignal-ngx';

// OneSignal configuration
export const ONESIGNAL_CONFIG = {
  appId: '9e0ff598-168f-4e83-979f-c6e19991d297', // Your OneSignal App ID
  apiKey: process.env.ONESIGNAL_REST_API_KEY || '', // Your REST API Key
  baseUrl: 'https://onesignal.com/api/v1'
};

// Initialize OneSignal
export const initializeOneSignal = () => {
  if (typeof window !== 'undefined') {
    // Initialize OneSignal in the browser
    OneSignal.init({
      appId: ONESIGNAL_CONFIG.appId,
      allowLocalhostAsSecureOrigin: true, // For development
      autoResubscribe: true,
      autoRegister: false, // We'll handle registration manually
      notifyButton: {
        enable: false, // We'll use our own UI
      },
      promptOptions: {
        slidedown: {
          enabled: true,
          autoPrompt: false, // We'll trigger manually
          timeDelay: 0,
          pageViews: 0,
          actionMessage: "We'd like to show you notifications for the latest updates.",
          acceptButton: "Allow",
          cancelButton: "No Thanks"
        }
      }
    });
  }
};

// Check if OneSignal is supported
export const isOneSignalSupported = (): boolean => {
  return typeof window !== 'undefined' && 'OneSignal' in window;
};

// Subscribe user to notifications
export const subscribeToNotifications = async (): Promise<boolean> => {
  if (!isOneSignalSupported()) {
    console.error('OneSignal is not supported in this browser');
    return false;
  }

  try {
    // Show the permission prompt
    await OneSignal.showNativePrompt();
    
    // Get the user ID
    const userId = await OneSignal.getUserId();
    
    if (userId) {
      console.log('Successfully subscribed to OneSignal notifications:', userId);
      return true;
    } else {
      console.log('User did not grant permission for notifications');
      return false;
    }
  } catch (error) {
    console.error('Error subscribing to OneSignal notifications:', error);
    return false;
  }
};

// Unsubscribe user from notifications
export const unsubscribeFromNotifications = async (): Promise<boolean> => {
  if (!isOneSignalSupported()) {
    return false;
  }

  try {
    await OneSignal.setSubscription(false);
    console.log('Successfully unsubscribed from OneSignal notifications');
    return true;
  } catch (error) {
    console.error('Error unsubscribing from OneSignal notifications:', error);
    return false;
  }
};

// Check if user is subscribed
export const isUserSubscribed = async (): Promise<boolean> => {
  if (!isOneSignalSupported()) {
    return false;
  }

  try {
    const isSubscribed = await OneSignal.getSubscription();
    return isSubscribed;
  } catch (error) {
    console.error('Error checking OneSignal subscription status:', error);
    return false;
  }
};

// Get user ID
export const getOneSignalUserId = async (): Promise<string | null> => {
  if (!isOneSignalSupported()) {
    return null;
  }

  try {
    const userId = await OneSignal.getUserId();
    return userId;
  } catch (error) {
    console.error('Error getting OneSignal user ID:', error);
    return null;
  }
};

// Send notification via OneSignal REST API
export const sendNotification = async (title: string, body: string, url?: string, userIds?: string[]) => {
  if (!ONESIGNAL_CONFIG.apiKey) {
    throw new Error('OneSignal REST API key is not configured');
  }

  const notification = {
    app_id: ONESIGNAL_CONFIG.appId,
    headings: { en: title },
    contents: { en: body },
    url: url || 'https://www.thecoordinatedliving.com',
    chrome_web_icon: 'https://www.thecoordinatedliving.com/favicon.ico',
    chrome_web_badge: 'https://www.thecoordinatedliving.com/favicon.ico',
    included_segments: userIds ? undefined : ['Subscribed Users'],
    include_player_ids: userIds || undefined,
    web_buttons: [
      {
        id: 'read-now',
        text: 'Read Now',
        url: url || 'https://www.thecoordinatedliving.com'
      }
    ]
  };

  const response = await fetch(`${ONESIGNAL_CONFIG.baseUrl}/notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${ONESIGNAL_CONFIG.apiKey}`
    },
    body: JSON.stringify(notification)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OneSignal API error: ${errorData.errors?.join(', ') || 'Unknown error'}`);
  }

  return await response.json();
};
