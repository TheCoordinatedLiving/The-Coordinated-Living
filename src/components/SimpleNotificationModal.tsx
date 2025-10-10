import React, { useEffect, useRef } from 'react';
import { useWebDevNotifications } from '@/hooks/useWebDevNotifications';
import { gsap } from 'gsap';

interface SimpleNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SimpleNotificationModal({ isOpen, onClose }: SimpleNotificationModalProps) {
  const {
    isSupported,
    permission,
    isEnabled,
    isLoading,
    error,
    enableNotifications,
  } = useWebDevNotifications();

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Animate modal in
      gsap.to(backdropRef.current, { opacity: 0.3, duration: 0.3, ease: "power2.out" });
      gsap.to(modalRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.2)" });
    } else {
      // Animate modal out
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
      gsap.to(modalRef.current, { opacity: 0, scale: 0.9, y: 20, duration: 0.2, ease: "power2.in" });
    }
  }, [isOpen]);

  const handleEnableNotifications = async () => {
    console.log('🔔 User clicked Enable Notifications button');
    console.log('Current permission before request:', Notification.permission);
    
    const success = await enableNotifications();
    console.log('Enable notifications result:', success);
    
    if (success) {
      // Close modal after successful enable
      setTimeout(() => {
        onClose();
      }, 1000); // Give time to see the success notification
    }
  };

  const handleMaybeLater = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-lg"
        style={{ opacity: 0 }}
        onClick={handleMaybeLater}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center backdrop-blur-xl border border-white border-opacity-40"
        style={{ 
          backgroundColor: 'rgba(47, 76, 108, 0.7)', 
          opacity: 0, 
          transform: 'scale(0.9) translateY(20px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Amita, serif' }}>
          Stay Updated! 🔔
        </h2>
        <p className="text-sm text-gray-200 mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Get notified instantly when new posts and guides are added, even when you&apos;re not on our site!
        </p>

        {error && (
          <p className="text-red-300 text-xs mb-4">{error}</p>
        )}

        {permission === 'denied' && (
          <p className="text-red-300 text-xs mb-4">
            Notifications are blocked. Please enable them in your browser settings.
          </p>
        )}

        {isEnabled ? (
          <div className="flex flex-col items-center">
            <svg className="w-10 h-10 text-green-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-green-400 text-sm font-medium">Push notifications enabled!</p>
            <p className="text-gray-300 text-xs mt-2">You&apos;ll get instant notifications even when you&apos;re away from our site.</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleEnableNotifications}
              disabled={isLoading || permission === 'denied' || !isSupported}
              className="bg-white text-[#2F4C6C] px-5 py-2 rounded-full font-bold text-sm transition-colors duration-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enabling...' : 'Enable Notifications'}
            </button>
            <button
              onClick={handleMaybeLater}
              disabled={isLoading}
              className="text-gray-300 text-sm hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Maybe Later
            </button>
          </div>
        )}

        {!isSupported && (
          <p className="text-yellow-300 text-xs mt-4">
            Your browser doesn&apos;t support notifications.
          </p>
        )}
      </div>
    </div>
  );
}
