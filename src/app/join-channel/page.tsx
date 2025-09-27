"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import Image from 'next/image';
import EmailInputModal from '@/components/EmailInputModal';
import Toast from '@/components/Toast';

export default function JoinChannelPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showMobileMoneyModal, setShowMobileMoneyModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });
  const [animations, setAnimations] = useState({
    infoJoinChannel: null,
    linkJoinChannel: null,
    loveJoin: null
  });

  // Payment configuration
  const PAYMENT_AMOUNT = 100; // 100 GHS

  useEffect(() => {
    // Load Lottie animations
    const loadAnimations = async () => {
      try {
        const [infoResponse, linkResponse, loveResponse] = await Promise.all([
          fetch('/info-join-channgel.json'),
          fetch('/link-join-channel.json'),
          fetch('/love-join.json')
        ]);

        const [infoData, linkData, loveData] = await Promise.all([
          infoResponse.json(),
          linkResponse.json(),
          loveResponse.json()
        ]);

        setAnimations({
          infoJoinChannel: infoData,
          linkJoinChannel: linkData,
          loveJoin: loveData
        });
      } catch (error) {
        console.error('Error loading animations:', error);
      }
    };

    loadAnimations();
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    router.push('/?skipLoader=true');
  };

  const handleJoinChannelClick = () => {
    setShowEmailModal(true);
  };

  const handleMobileMoneyClick = () => {
    setShowMobileMoneyModal(true);
  };

// const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY  || 'sk_test_e85988fa08e6452ebc108c7cf0f8aef6f206ca51';

  const handleEmailSubmit = async (email: string, phoneNumber: string) => {
    try {
      // Call our API endpoint to initialize Paystack subscription
      const response = await fetch('/api/paystack/subscription/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          phoneNumber: phoneNumber,
          planCode: 'PLN_mic7hyck7v0dfxk' // Your actual Paystack plan code
        }),
      });

      const data = await response.json();

      if (data.status && data.data.authorization_url) {
        // Redirect to Paystack checkout
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error(data.message || 'Failed to initialize subscription');
      }
    } catch (error) {
      console.error('Subscription initialization error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize subscription. Please try again.';
      setToast({
        message: errorMessage,
        type: 'error',
        isVisible: true
      });
    }
  };

  const handleEmailModalClose = () => {
    setShowEmailModal(false);
  };

  const handleMobileMoneyModalClose = () => {
    setShowMobileMoneyModal(false);
  };

  const handleMobileMoneySubmit = async (email: string, phoneNumber: string) => {
    try {
      // Call the normal transaction API for mobile money (supports MoMo)
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          phoneNumber: phoneNumber,
          amount: (PAYMENT_AMOUNT * 100).toString(), // Convert to kobo
          type: 'channel'
        }),
      });

      const data = await response.json();

      if (data.status && data.data.authorization_url) {
        // Store channel payment data for success page
        const channelData = {
          amount: PAYMENT_AMOUNT,
          email: email,
          phoneNumber: phoneNumber
        };
        sessionStorage.setItem('channelData', JSON.stringify(channelData));
        sessionStorage.setItem('cameFromChannel', 'true');
        
        // Also store in localStorage as backup
        localStorage.setItem('channelData', JSON.stringify(channelData));
        localStorage.setItem('cameFromChannel', 'true');
        
        // Redirect to Paystack checkout
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error(data.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('Mobile money payment error:', error);
      setToast({
        message: error instanceof Error ? error.message : 'Failed to process payment. Please try again.',
        type: 'error',
        isVisible: true
      });
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: '#2F4C6C' }}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 left-6 z-10 w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
        aria-label="Close"
      >
        <svg 
          className="w-6 h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-start min-h-screen px-6 pt-16">
        {/* Circular Logo */}
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
          style={{ backgroundColor: '#2481C2' }}
        >
          <Image 
            src="/join-channel-mobile-logo.svg" 
            alt="Channel Logo" 
            width={64}
            height={64}
            className="w-16 h-16 animate-spin"
            style={{ animationDuration: '3s' }}
          />
        </div>
        
        {/* Title */}
        <h1 className="text-white text-2xl font-bold text-center mb-8 leading-tight">
          Deep Dive & Exclusive Teachings
        </h1>
        
        {/* Information Sections */}
        <div className="w-full max-w-md space-y-6">
          {/* About the Channel */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
              {animations.infoJoinChannel && (
                <Lottie 
                  animationData={animations.infoJoinChannel}
                  loop={true}
                  autoplay={true}
                  style={{ width: 40, height: 40 }}
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg font-bold mb-2">About the Channel</h3>
              <p className="text-white text-sm opacity-90 leading-relaxed">
                Join our Paid WhatsApp channel for in-depth exploration of God&apos;s Word and its application to the complexities of life.
              </p>
            </div>
          </div>

          {/* How to Join */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
              {animations.linkJoinChannel && (
                <Lottie 
                  animationData={animations.linkJoinChannel}
                  loop={true}
                  autoplay={true}
                  style={{ width: 40, height: 40 }}
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg font-bold mb-2">How to Join</h3>
              <p className="text-white text-sm opacity-90 leading-relaxed">
                Tap the button below and follow the prompt to subscribe.
              </p>
            </div>
          </div>

          {/* What You'll Get */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
              {animations.loveJoin && (
                <Lottie 
                  animationData={animations.loveJoin}
                  loop={true}
                  autoplay={true}
                  style={{ width: 40, height: 40 }}
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg font-bold mb-2">What You&apos;ll Get</h3>
              <p className="text-white text-sm opacity-90 leading-relaxed">
                Weekly encouragement, prayer prompts, and video resources to help cultivate an intimate relationship with the Lord.
              </p>
            </div>
          </div>
        </div>
        
        {/* Join Our Channel Button */}
        <div className="w-full max-w-md mt-8">
          <button
            className="w-full py-4 px-6 rounded-full font-bold text-lg transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#FFFFFF', color: '#2F4C6C' }}
            onClick={handleJoinChannelClick}
          >
            GHS {PAYMENT_AMOUNT}
          </button>
          
          {/* Pay with Mobile Money Link */}
          <div className="text-center mt-4">
            <button
              onClick={handleMobileMoneyClick}
              className="text-white hover:text-gray-200 underline transition-colors text-sm"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Pay with Mobile Money
            </button>
          </div>
        </div>
        
        {/* Page content will be added here */}
      </div>

      {/* Email Input Modal */}
      <EmailInputModal
        isOpen={showEmailModal}
        onClose={handleEmailModalClose}
        onEmailSubmit={handleEmailSubmit}
        amount={PAYMENT_AMOUNT}
      />

      {/* Mobile Money Modal */}
      <EmailInputModal
        isOpen={showMobileMoneyModal}
        onClose={handleMobileMoneyModalClose}
        onEmailSubmit={handleMobileMoneySubmit}
        amount={PAYMENT_AMOUNT}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
}
