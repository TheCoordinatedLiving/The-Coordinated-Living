'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const GuidesMobilePage = () => {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  
  // Guide data
  const guides = [
    { id: 1, title: "Guide 1", description: "Brief description of the first guide content and what it covers" },
    { id: 2, title: "Guide 2", description: "Brief description of the second guide content and what it covers" },
    { id: 3, title: "Guide 3", description: "Brief description of the third guide content and what it covers" },
    { id: 4, title: "Guide 4", description: "Brief description of the fourth guide content and what it covers" }
  ];

  useEffect(() => {
    if (pageRef.current) {
      // Set initial state
      gsap.set(pageRef.current, { opacity: 0, y: 20 });
      
      // Animate in
      gsap.to(pageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    }
  }, []);

  useEffect(() => {
    if (showBottomSheet) {
      showBottomSheetAnimation();
    }
  }, [showBottomSheet]);

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
    } else {
      router.push('/?skipLoader=true');
    }
  };

  const showBottomSheetAnimation = () => {
    if (bottomSheetRef.current && backdropRef.current) {
      // Set initial state
      gsap.set(bottomSheetRef.current, { y: '100%' });
      gsap.set(backdropRef.current, { opacity: 0 });
      
      // Animate in
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(bottomSheetRef.current, {
        y: 0,
        duration: 0.4,
        ease: 'power3.out'
      });
    }
  };

  const hideBottomSheetAnimation = () => {
    if (bottomSheetRef.current && backdropRef.current) {
      // Animate out
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
      
      gsap.to(bottomSheetRef.current, {
        y: '100%',
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          setShowBottomSheet(false);
        }
      });
    } else {
      setShowBottomSheet(false);
    }
  };

  // Swipe handling
  const handleSwipeLeft = () => {
    setCurrentGuideIndex((prev) => (prev + 1) % guides.length);
  };

  const handleSwipeRight = () => {
    setCurrentGuideIndex((prev) => (prev - 1 + guides.length) % guides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
          handleSwipeLeft(); // Swipe left to go to next guide
        } else {
          handleSwipeRight(); // Swipe right to go to previous guide
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div 
      ref={pageRef}
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: '#2481C2' }}
    >
      {/* Header with Close Button */}
      <div className="flex items-center justify-between p-4 pt-8">
        <button
          onClick={handleClose}
          className="flex items-center justify-center transition-all duration-200 hover:opacity-70 active:scale-95"
        >
          <svg 
            className="w-8 h-8 text-white" 
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
        
        <div className="flex-1"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pt-8 pb-8">
        <div className="max-w-sm mx-auto flex flex-col h-full">
          {/* Title */}
          <h1 className="text-white text-2xl leading-tight mb-6" style={{ fontFamily: 'Amita, cursive' }}>
            Practical Guides For Your Journey
          </h1>
          
          {/* Content */}
          <p className="text-white text-base leading-relaxed mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Explore these resources to experience His abounding grace as you navigate specific scenes of life and grow in faith.
          </p>
          
          {/* Button */}
          <div className="mt-auto">
            <button 
              onClick={() => setShowBottomSheet(true)}
              className="w-full bg-white text-[#2481C2] font-semibold py-4 px-6 rounded-full transition-all duration-200 hover:bg-opacity-90 active:scale-95"
            >
              View Our Guides
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      {showBottomSheet && (
        <div className="fixed inset-0 z-50 flex items-end">
          {/* Backdrop */}
          <div 
            ref={backdropRef}
            className="absolute inset-0 bg-black bg-opacity-20"
            onClick={hideBottomSheetAnimation}
          />
          
          {/* Bottom Sheet Content */}
          <div 
            ref={bottomSheetRef}
            className="relative w-full rounded-t-3xl p-8 h-[98vh] overflow-y-auto" 
            style={{ backgroundColor: '#2481C2' }}
          >
            {/* Handle */}
            <div className="flex justify-center mb-4">
              <button 
                onClick={hideBottomSheetAnimation}
                className="w-12 h-1 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-200"
              ></button>
            </div>
            
            {/* Close Button */}
            <button
              onClick={hideBottomSheetAnimation}
              className="absolute top-4 right-4 p-2"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Content Placeholder */}
            <div className="pt-4">
              <h2 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Amita, cursive' }}>Available Guides</h2>
              
              {/* Guide Card */}
              <div className="mb-6">
                {/* Image Card */}
                <div className="mb-4 relative" onTouchStart={handleTouchStart}>
                  <div className="aspect-[4/5] rounded-xl overflow-hidden">
                    <img 
                      src="/guides-bottomsheet.png" 
                      alt="Guide Card" 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Logo - Top Left */}
                    <div className="absolute top-4 left-4">
                      <img 
                        src="/guide-bottom-logo.svg" 
                        alt="Logo" 
                        className="w-16 h-16"
                      />
                    </div>
                    
                    {/* Title and Description - Bottom Left */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-lg font-semibold mb-2" style={{ fontFamily: 'Amita, cursive' }}>
                        {guides[currentGuideIndex].title}
                      </h3>
                      <p className="text-white text-sm opacity-90" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {guides[currentGuideIndex].description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Page Identifier Circles - Centered */}
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-2">
                    {guides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentGuideIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentGuideIndex 
                            ? 'bg-white' 
                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
                
                {/* Download Button - Centered */}
                <div className="flex justify-center">
                  <button className="bg-white text-[#2481C2] px-20 py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-200">
                    Download This Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidesMobilePage;
