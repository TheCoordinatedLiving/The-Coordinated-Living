"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import Image from 'next/image';

export default function JoinChannelPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [animations, setAnimations] = useState({
    infoJoinChannel: null,
    linkJoinChannel: null,
    loveJoin: null
  });

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
