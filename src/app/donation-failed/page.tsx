'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function DonationFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate page in
    if (pageRef.current) {
      gsap.set(pageRef.current, { opacity: 0, y: 20 });
      gsap.to(pageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    }
  }, []);

  const handleClose = () => {
    if (pageRef.current) {
      gsap.to(pageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          router.push('/?skipLoader=true');
        }
      });
    }
  };

  const handleRetry = () => {
    router.push('/donation-mobile');
  };

  const handleContactSupport = () => {
    // You can implement contact support functionality here
    // For now, we'll just show an alert
    alert('Please contact support at support@coordinated-living.com for assistance with your donation.');
  };

  const getErrorMessage = () => {
    const error = searchParams.get('error');
    switch (error) {
      case 'insufficient_funds':
        return 'Your account has insufficient funds for this transaction.';
      case 'card_declined':
        return 'Your card was declined. Please try a different payment method.';
      case 'expired_card':
        return 'Your card has expired. Please use a different card.';
      case 'network_error':
        return 'Network error occurred. Please check your internet connection and try again.';
      default:
        return 'We couldn\'t process your donation. Please try again or contact support if the issue persists.';
    }
  };

  return (
    <div 
      ref={pageRef}
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: '#2F4C6C' }}
    >
      {/* Header */}
      <div className="flex justify-start items-center p-4 pt-8">
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 
          className="text-3xl font-bold mb-4 leading-tight"
          style={{ 
            fontFamily: 'Amita, cursive',
            color: 'white'
          }}
        >
          Donation Failed
        </h1>

        {/* Error Message */}
        <p 
          className="text-white text-base leading-relaxed mb-8"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          {getErrorMessage()}
        </p>

        {/* Troubleshooting Tips */}
        <div 
          className="bg-white bg-opacity-10 rounded-2xl p-6 mb-8 w-full max-w-sm"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          <h3 className="text-white font-medium mb-3">Troubleshooting Tips:</h3>
          <ul className="text-white text-sm text-left space-y-2 opacity-80">
            <li>• Check your internet connection</li>
            <li>• Verify your card details</li>
            <li>• Ensure sufficient funds</li>
            <li>• Try a different payment method</li>
            <li>• Contact your bank if issues persist</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 w-full max-w-xs">
          <button
            onClick={handleRetry}
            className="w-full py-4 px-6 rounded-full font-medium text-base transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: 'white',
              color: '#2F4C6C',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            Try Again
          </button>
          
          <button
            onClick={handleContactSupport}
            className="w-full py-3 px-6 rounded-full font-medium text-base transition-all duration-200 hover:opacity-80 border-2 border-white text-white"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Contact Support
          </button>
          
          <button
            onClick={handleClose}
            className="w-full py-3 px-6 rounded-full font-medium text-base transition-all duration-200 hover:opacity-80 text-white opacity-60"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Go Home
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8">
          <p 
            className="text-white text-xs opacity-60"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Need immediate help? Email us at support@coordinated-living.com
          </p>
        </div>
      </div>
    </div>
  );
}
