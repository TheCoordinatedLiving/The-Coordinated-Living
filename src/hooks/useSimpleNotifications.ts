import { useState, useEffect, useCallback } from 'react';

interface NotificationState {
  isSupported: boolean;
  permission: NotificationPermission;
  isEnabled: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useSimpleNotifications = () => {
  const [state, setState] = useState<NotificationState>({
    isSupported: false,
    permission: 'default',
    isEnabled: false,
    isLoading: false,
    error: null
  });

  // Check if notifications are supported
  useEffect(() => {
    const checkSupport = () => {
      const isSupported = 'Notification' in window;
      const permission = isSupported ? Notification.permission : 'denied';

      setState(prev => ({
        ...prev,
        isSupported,
        permission,
        isEnabled: permission === 'granted'
      }));
    };

    checkSupport();
  }, []);

  // Enable notifications (true push notifications)
  const enableNotifications = useCallback(async () => {
    if (!state.isSupported) {
      setState(prev => ({ ...prev, error: 'Notifications are not supported in this browser' }));
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log('Current notification permission:', Notification.permission);
      console.log('Requesting notification permission...');
      
      // Check if permission is already granted
      if (Notification.permission === 'granted') {
        console.log('Permission already granted');
        setState(prev => ({ 
          ...prev, 
          isEnabled: true, 
          isLoading: false, 
          permission: 'granted' 
        }));
        return true;
      }
      
      // Check if we're in a secure context (HTTPS or localhost)
      if (!window.isSecureContext) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: 'Notifications require a secure context (HTTPS)' 
        }));
        return false;
      }
      
      // Request permission - this should trigger the browser modal
      console.log('Requesting notification permission...');
      const permission = await Notification.requestPermission();
      console.log('Notification permission result:', permission);
      console.log('Current permission status:', Notification.permission);

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

      // Register service worker for push notifications
      console.log('Registering service worker...');
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('Service Worker registered:', registration);

      // Wait for service worker to be ready
      const readyRegistration = await navigator.serviceWorker.ready;
      console.log('Service Worker is ready:', readyRegistration);

      // Check if service worker is actually active
      if (!readyRegistration.active) {
        throw new Error('Service Worker is not active');
      }
      console.log('Service Worker is active:', readyRegistration.active);

      // Create push subscription
      console.log('Creating push subscription...');
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        throw new Error('VAPID public key not configured');
      }

      // Convert VAPID key to Uint8Array
      const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
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

      const applicationServerKey = urlBase64ToUint8Array(vapidKey);
      console.log('VAPID key converted:', applicationServerKey);

      const subscription = await readyRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });
      console.log('Push subscription created:', subscription);

      // Send subscription to server
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subscription })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save subscription on server');
      }

      // Send a test notification to confirm it works
      const testNotification = new Notification('Push Notifications Enabled! 🔔', {
        body: 'You\'ll now receive notifications even when you\'re not on our site!',
        icon: '/favicon.ico',
        tag: 'notification-enabled'
      });

      testNotification.onclick = () => {
        testNotification.close();
      };

      setState(prev => ({ 
        ...prev, 
        isEnabled: true, 
        isLoading: false, 
        permission: 'granted' 
      }));
      return true;
    } catch (err: unknown) {
      console.error('Failed to enable notifications:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to enable notifications',
        isLoading: false,
        isEnabled: false
      }));
      return false;
    }
  }, [state.isSupported]);

  // Disable notifications
  const disableNotifications = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isEnabled: false,
      permission: 'default'
    }));
  }, []);

  // Send a notification (for when new content is available)
  const sendNotification = useCallback((title: string, body: string, url?: string) => {
    if (!state.isEnabled || state.permission !== 'granted') {
      console.log('Notifications not enabled, cannot send notification');
      return false;
    }

    try {
      // Check if we're in a secure context and notifications are supported
      if (!('Notification' in window)) {
        console.error('Notifications not supported');
        return false;
      }

      // Check if we're in a secure context
      if (!window.isSecureContext) {
        console.error('Notifications require a secure context (HTTPS)');
        return false;
      }

      // Check if Notification constructor is available
      if (typeof Notification === 'undefined') {
        console.error('Notification constructor not available');
        return false;
      }

      const notification = new Notification(title, {
        body: body,
        icon: '/favicon.ico',
        tag: 'new-content',
        data: { url: url || '/' }
      });

      notification.onclick = () => {
        notification.close();
        if (url) {
          window.open(url, '_blank');
        }
      };

      return true;
    } catch (error) {
      console.error('Failed to send notification:', error);
      // If it's the illegal constructor error, provide a helpful message
      if (error instanceof Error && error.message.includes('illegal constructor')) {
        console.error('Notification constructor error - this may be due to browser restrictions or context issues');
      }
      return false;
    }
  }, [state.isEnabled, state.permission]);

  return {
    ...state,
    enableNotifications,
    disableNotifications,
    sendNotification
  };
};
