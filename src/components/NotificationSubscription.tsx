import React, { useState } from 'react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

interface NotificationSubscriptionProps {
  className?: string;
  variant?: 'button' | 'card' | 'inline';
}

export default function NotificationSubscription({ 
  className = '', 
  variant = 'button' 
}: NotificationSubscriptionProps) {
  const {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    error,
    subscribe,
    unsubscribe,
    sendTestNotification
  } = usePushNotifications();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = async () => {
    const success = await subscribe();
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleUnsubscribe = async () => {
    await unsubscribe();
  };


  // Don't render if not supported
  if (!isSupported) {
    return null;
  }

  // Button variant
  if (variant === 'button') {
    return (
      <div className={`relative ${className}`}>
        {isSubscribed ? (
          <button
            onClick={handleUnsubscribe}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <span className="text-lg">🔔</span>
            <span className="text-sm font-medium">
              {isLoading ? 'Unsubscribing...' : 'Notifications On'}
            </span>
          </button>
        ) : (
          <button
            onClick={handleSubscribe}
            disabled={isLoading || permission === 'denied'}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <span className="text-lg">🔔</span>
            <span className="text-sm font-medium">
              {isLoading ? 'Subscribing...' : 'Get Notified'}
            </span>
          </button>
        )}

        {showSuccess && (
          <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-green-500 text-white text-sm rounded-lg shadow-lg z-10">
            ✅ You&apos;ll now get notified of new posts!
          </div>
        )}

        {error && (
          <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-red-500 text-white text-sm rounded-lg shadow-lg z-10">
            ❌ {error}
          </div>
        )}

        {permission === 'denied' && (
          <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-yellow-500 text-white text-sm rounded-lg shadow-lg z-10">
            ⚠️ Notifications blocked. Enable in browser settings.
          </div>
        )}
      </div>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">🔔</span>
          <h3 className="text-lg font-semibold text-gray-900">
            Stay Updated
          </h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          Get notified instantly when new posts and guides are published.
        </p>

        {isSubscribed ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-green-600">
              <span>✅</span>
              <span className="text-sm font-medium">You&apos;re subscribed to notifications</span>
            </div>
            <button
              onClick={handleUnsubscribe}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
            </button>
          </div>
        ) : (
          <button
            onClick={handleSubscribe}
            disabled={isLoading || permission === 'denied'}
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Subscribing...' : 'Enable Notifications'}
          </button>
        )}

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">❌ {error}</p>
          </div>
        )}

        {permission === 'denied' && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-600 text-sm">
              ⚠️ Notifications are blocked. Please enable them in your browser settings.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Inline variant
  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <span className="text-lg">🔔</span>
      {isSubscribed ? (
        <span className="text-sm text-green-600 font-medium">
          Notifications enabled
        </span>
      ) : (
        <button
          onClick={handleSubscribe}
          disabled={isLoading || permission === 'denied'}
          className="text-sm text-blue-500 hover:text-blue-600 underline disabled:opacity-50"
        >
          {isLoading ? 'Subscribing...' : 'Enable notifications'}
        </button>
      )}
    </div>
  );
}
