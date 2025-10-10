import { useState, useEffect, useCallback } from 'react';

// VAPID key conversion function from web.dev codelab
const urlB64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

interface NotificationState {
  isSupported: boolean;
  isEnabled: boolean;
  isLoading: boolean;
  error: string | null;
  permission: NotificationPermission;
}

export const useWebDevNotifications = () => {
  const [state, setState] = useState<NotificationState>({
    isSupported: false,
    isEnabled: false,
    isLoading: false,
    error: null,
    permission: 'default'
  });

  // Check support on mount
  useEffect(() => {
    const checkSupport = () => {
      const isSupported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
      setState(prev => ({ 
        ...prev, 
        isSupported,
        permission: Notification.permission
      }));
    };

    checkSupport();
  }, []);

  // Enable notifications (following web.dev codelab approach)
  const enableNotifications = useCallback(async () => {
    if (!state.isSupported) {
      setState(prev => ({ ...prev, error: 'Notifications are not supported in this browser' }));
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log('Requesting notification permission...');
      
      // Request permission - this should trigger the browser modal
      const permission = await Notification.requestPermission();
      console.log('Notification permission result:', permission);

      if (permission !== 'granted') {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: `Notification permission ${permission}`,
          permission,
          isEnabled: false
        }));
        return false;
      }

      // Register service worker
      console.log('Registering service worker...');
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('Service Worker registered:', registration);

      // Wait for service worker to be ready
      const readyRegistration = await navigator.serviceWorker.ready;
      console.log('Service Worker is ready:', readyRegistration);

      // Check if already subscribed
      const existingSubscription = await readyRegistration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log('User is already subscribed:', existingSubscription);
        setState(prev => ({ 
          ...prev, 
          isEnabled: true, 
          isLoading: false, 
          permission: 'granted' 
        }));
        return true;
      }

      // Create new subscription
      console.log('Creating new push subscription...');
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        throw new Error('VAPID public key not configured');
      }

      const subscription = await readyRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(vapidKey)
      });
      console.log('Push subscription created:', subscription);

      // Send subscription to server
      console.log('Sending subscription to server...');
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      });

      if (!response.ok) {
        throw new Error('Failed to send subscription to server');
      }

      console.log('Subscription sent to server successfully');

      setState(prev => ({ 
        ...prev, 
        isEnabled: true, 
        isLoading: false, 
        permission: 'granted' 
      }));

      return true;

    } catch (error) {
      console.error('Error enabling notifications:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        isEnabled: false 
      }));
      return false;
    }
  }, [state.isSupported]);

  // Disable notifications
  const disableNotifications = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          // Send unsubscribe request to server
          await fetch('/api/notifications/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ endpoint: subscription.endpoint, action: 'unsubscribe' })
          });

          // Unsubscribe from push manager
          const unsubscribed = await subscription.unsubscribe();
          if (unsubscribed) {
            console.log('Successfully unsubscribed from push notifications');
          }
        }
      }

      setState(prev => ({ 
        ...prev, 
        isEnabled: false, 
        permission: 'default' 
      }));

    } catch (error) {
      console.error('Error disabling notifications:', error);
    }
  }, []);

  return {
    ...state,
    enableNotifications,
    disableNotifications
  };
};
