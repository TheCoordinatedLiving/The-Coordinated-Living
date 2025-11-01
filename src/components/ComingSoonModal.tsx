"use client";

import { useEffect } from 'react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export default function ComingSoonModal({ isOpen, onClose, featureName }: ComingSoonModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 transform transition-all duration-300"
        style={{
          backgroundColor: '#FFFFFF',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2F4C6C' }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#2F4C6C' }}>
            Coming Soon!
          </h2>

          {/* Feature-specific message */}
          {featureName === 'Join Our Community' && (
            <p className="text-sm text-gray-500 mb-6">
              We&apos;re setting up our exclusive WhatsApp community. You&apos;ll be able to join our community soon!
            </p>
          )}

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
            style={{ backgroundColor: '#2F4C6C' }}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
