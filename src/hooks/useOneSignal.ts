import { useState, useEffect, useCallback } from 'react';
import { 
  initializeOneSignal, 
  subscribeToNotifications, 
  unsubscribeFromNotifications, 
  isUserSubscribed, 
  getOneSignalUserId,
  isOneSignalSupported 
} from '@/lib/onesignal';

interface OneSignalState {
  isSupported: boolean;
  isInitialized: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  error: string | null;
  userId: string | null;
}

export const useOneSignal = () => {
  const [state, setState] = useState<OneSignalState>({
    isSupported: false,
    isInitialized: false,
    isSubscribed: false,
    isLoading: false,
    error: null,
    userId: null
  });

  // Initialize OneSignal and check support
  useEffect(() => {
    const initialize = async () => {
      const supported = isOneSignalSupported();
      
      if (supported) {
        try {
          initializeOneSignal();
          
          // Wait a bit for initialization
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check subscription status
          const subscribed = await isUserSubscribed();
          const userId = await getOneSignalUserId();
          
          setState(prev => ({
            ...prev,
            isSupported: true,
            isInitialized: true,
            isSubscribed: subscribed,
            userId
          }));
        } catch (error) {
          console.error('Error initializing OneSignal:', error);
          setState(prev => ({
            ...prev,
            isSupported: true,
            isInitialized: false,
            error: error instanceof Error ? error.message : 'Failed to initialize OneSignal'
          }));
        }
      } else {
        setState(prev => ({
          ...prev,
          isSupported: false,
          error: 'OneSignal is not supported in this browser'
        }));
      }
    };

    initialize();
  }, []);

  // Subscribe to notifications
  const subscribe = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported || !state.isInitialized) {
      setState(prev => ({ 
        ...prev, 
        error: 'OneSignal is not supported or not initialized' 
      }));
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const success = await subscribeToNotifications();
      
      if (success) {
        const userId = await getOneSignalUserId();
        setState(prev => ({
          ...prev,
          isSubscribed: true,
          isLoading: false,
          userId
        }));
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to subscribe to notifications'
        }));
        return false;
      }
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to subscribe to notifications'
      }));
      return false;
    }
  }, [state.isSupported, state.isInitialized]);

  // Unsubscribe from notifications
  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported || !state.isInitialized) {
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const success = await unsubscribeFromNotifications();
      
      if (success) {
        setState(prev => ({
          ...prev,
          isSubscribed: false,
          isLoading: false,
          userId: null
        }));
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to unsubscribe from notifications'
        }));
        return false;
      }
    } catch (error) {
      console.error('Error unsubscribing from notifications:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to unsubscribe from notifications'
      }));
      return false;
    }
  }, [state.isSupported, state.isInitialized]);

  // Send test notification
  const sendTestNotification = useCallback(async () => {
    try {
      const response = await fetch('/api/notifications/onesignal-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Test Notification from OneSignal! 🎉',
          body: 'If you can see this, OneSignal is working perfectly!',
          url: 'https://www.thecoordinatedliving.com'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send test notification');
      }

      const result = await response.json();
      console.log('Test notification result:', result);
      return result;
    } catch (error) {
      console.error('Error sending test notification:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to send test notification'
      }));
      return null;
    }
  }, []);

  return {
    ...state,
    subscribe,
    unsubscribe,
    sendTestNotification
  };
};
