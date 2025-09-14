"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import infoJoinChannelAnimation from '/public/info-join-channgel.json';
import linkJoinChannelAnimation from '/public/link-join-channel.json';
import loveJoinAnimation from '/public/love-join.json';

export default function JoinChannelPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    router.push('/?skipLoader=true');
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
          <img 
            src="/join-channel-mobile-logo.svg" 
            alt="Channel Logo" 
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
              <Lottie 
                animationData={infoJoinChannelAnimation}
                loop={true}
                autoplay={true}
                style={{ width: 40, height: 40 }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg font-bold mb-2">About the Channel</h3>
              <p className="text-white text-sm opacity-90 leading-relaxed">
                Join our WhatsApp channel for uplifting, faith-based guidance.
              </p>
            </div>
          </div>

          {/* How to Join */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
              <Lottie 
                animationData={linkJoinChannelAnimation}
                loop={true}
                autoplay={true}
                style={{ width: 40, height: 40 }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg font-bold mb-2">How to Join</h3>
              <p className="text-white text-sm opacity-90 leading-relaxed">
                Tap the button below and follow the prompt to subscribe. You can leave anytime.
              </p>
            </div>
          </div>

          {/* What You'll Get */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
              <Lottie 
                animationData={loveJoinAnimation}
                loop={true}
                autoplay={true}
                style={{ width: 40, height: 40 }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg font-bold mb-2">What You&apos;ll Get</h3>
              <p className="text-white text-sm opacity-90 leading-relaxed">
                Weekly encouragement, prayer prompts, and resources to help you grow in Christ.
              </p>
            </div>
          </div>
        </div>
        
        {/* Join Our Channel Button */}
        <div className="w-full max-w-md mt-8">
          <button
            className="w-full py-4 px-6 rounded-full text-white font-bold text-lg transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#2481C2' }}
            onClick={() => {
              // Add WhatsApp link functionality here
              console.log('Join channel clicked');
            }}
          >
            Join Our Channel
          </button>
        </div>
        
        {/* Page content will be added here */}
      </div>
    </div>
  );
}
