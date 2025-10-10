import React, { useState } from 'react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

interface NotificationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPermissionModal({ isOpen, onClose }: NotificationPermissionModalProps) {
  const {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    error,
    subscribe,
    unsubscribe
  } = usePushNotifications();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = async () => {
    const success = await subscribe();
    if (success) {
      setShowSuccess(true);
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const handleDecline = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleDecline}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔔</span>
            <h2 className="text-xl font-semibold text-gray-900">
              Stay Updated
            </h2>
          </div>
          <button
            onClick={handleDecline}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6">
          {showSuccess ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                You're all set!
              </h3>
              <p className="text-gray-600">
                You'll now receive notifications when new posts and guides are published.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Get Notified of New Content
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Stay updated with instant notifications when new posts and guides are published. 
                  No spam, just the content you care about.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">❌ {error}</p>
                </div>
              )}

              {permission === 'denied' && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-600 text-sm">
                    ⚠️ Notifications are blocked. Please enable them in your browser settings to receive updates.
                  </p>
                </div>
              )}

              {!isSupported && (
                <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    ℹ️ Push notifications are not supported in this browser.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Footer */}
        {!showSuccess && (
          <div className="px-6 py-4 border-t border-gray-200 flex space-x-3">
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Maybe Later
            </button>
            <button
              onClick={handleSubscribe}
              disabled={isLoading || !isSupported || permission === 'denied'}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enabling...' : 'Enable Notifications'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
