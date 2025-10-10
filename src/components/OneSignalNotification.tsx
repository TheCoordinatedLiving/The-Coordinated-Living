'use client';

import { useOneSignal } from '@/hooks/useOneSignal';
import { useState } from 'react';

interface OneSignalNotificationProps {
  className?: string;
}

export const OneSignalNotification = ({ className = '' }: OneSignalNotificationProps) => {
  const { 
    isSupported, 
    isInitialized, 
    isSubscribed, 
    isLoading, 
    error, 
    subscribe, 
    unsubscribe, 
    sendTestNotification 
  } = useOneSignal();
  
  const [testResult, setTestResult] = useState<{ message: string } | null>(null);

  const handleSubscribe = async () => {
    const success = await subscribe();
    if (success) {
      console.log('Successfully subscribed to OneSignal notifications');
    }
  };

  const handleUnsubscribe = async () => {
    const success = await unsubscribe();
    if (success) {
      console.log('Successfully unsubscribed from OneSignal notifications');
    }
  };

  const handleTestNotification = async () => {
    const result = await sendTestNotification();
    setTestResult(result);
  };

  if (!isSupported) {
    return (
      <div className={`bg-gray-100 border border-gray-300 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          🔔 Push Notifications
        </h3>
        <p className="text-gray-600">
          Push notifications are not supported in this browser.
        </p>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          🔔 Push Notifications
        </h3>
        <p className="text-yellow-700">
          Initializing OneSignal...
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        🔔 Get Notified
      </h3>
      
      <p className="text-gray-600 mb-4">
        Stay updated with the latest content from Coordinated Living. 
        Get instant notifications when new posts and guides are published.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {testResult && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-green-700 text-sm">
            <strong>Test Result:</strong> {testResult.message}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {!isSubscribed ? (
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enabling Notifications...
              </>
            ) : (
              'Enable Notifications'
            )}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm font-medium">
                ✅ You&apos;re subscribed to notifications!
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleTestNotification}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Test Notification
              </button>
              
              <button
                onClick={handleUnsubscribe}
                disabled={isLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Unsubscribe
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Powered by OneSignal • 
          <a 
            href="https://www.thecoordinatedliving.com/privacy" 
            className="text-blue-600 hover:text-blue-800 ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};
