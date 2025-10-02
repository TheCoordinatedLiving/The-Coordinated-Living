"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export default function ComingSoonModal({ isOpen, onClose, featureName }: ComingSoonModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
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
        className={`relative bg-white rounded-2xl p-8 mx-4 max-w-md w-full transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2F4C6C' }}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {featureName} is currently being prepared for launch. We're working hard to bring you this amazing feature very soon!
          </p>

          {/* Feature-specific message */}
          {featureName === 'Pour Into My Cup' && (
            <p className="text-sm text-gray-500 mb-6">
              Thank you for your interest in supporting our platform. Payment processing will be available shortly.
            </p>
          )}
          
          {featureName === 'Join Our Channels' && (
            <p className="text-sm text-gray-500 mb-6">
              We're setting up our exclusive WhatsApp channels. You'll be able to join our community soon!
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
