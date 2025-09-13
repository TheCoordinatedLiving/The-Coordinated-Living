"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import clickAnimation from '../../../public/click-animation.json';

export default function PostMobilePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Prevent background scrolling when bottom sheet is open
    if (showBottomSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showBottomSheet]);

  const handleClose = () => {
    router.push('/?skipLoader=true');
  };

  const handlePageClick = () => {
    setShowBottomSheet(true);
  };

  const handleSwipeLeft = () => {
    setCurrentPostIndex((prev) => (prev + 1) % 3); // Assuming 3 posts
  };

  const handleSwipeRight = () => {
    setCurrentPostIndex((prev) => (prev - 1 + 3) % 3); // Assuming 3 posts
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: '#2481C2' }}
      onClick={handlePageClick}
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
      
      {/* Logo */}
      <div className="absolute top-28 left-6">
        <img 
          src="/new-post-logo-modal.svg" 
          alt="The Coordinated Living" 
          className="w-32 h-auto"
        />
      </div>
      
      {/* Post Content */}
      <div className="px-6 pt-48 pb-8">
        <div className="max-w-md mx-auto">
          <div className="text-white text-sm leading-relaxed space-y-4">
            <p>
              &ldquo;A thousand times I failed, still your mercy remains, should I stumble out here still I&apos;m caught in your grace.&rdquo; This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today.
            </p>
            
            <p>
              For years, I pursued other paths, pouring tireless effort into fields he hadn&apos;t called me to, only to find no lasting fruit. That rollercoaster of emotions, the unpleasant experiences, the endless accusations and judgments thrown around – they&apos;re hallmarks of a mind out of alignment.
            </p>
            
            <p>
              Want to know the root cause? It&apos;s simply a lack of trust in the Father. No matter how you rationalize it, we constantly try to force a fit where there isn&apos;t one.
            </p>
            
            <p>
              But in Christ, we step into the true identity the Father created for us. This identity comes with specific tasks, assignments, and responsibilities, all of which we are perfectly equipped for. It&apos;s there we discover an unexplainable peace, joy, and confidence.
            </p>
            
            <p>
              When we align ourselves with God&apos;s purpose for our lives, we find a peace that surpasses all understanding. This isn&apos;t about perfection – it&apos;s about walking in the identity He has given us, trusting that He has equipped us for every good work.
            </p>
          </div>
        </div>
        
        {/* Click Animation */}
        <div className="flex justify-center mt-8">
          <Lottie
            animationData={clickAnimation}
            loop={true}
            autoplay={true}
            style={{ width: 60, height: 60 }}
          />
        </div>
      </div>

      {/* Bottom Sheet Overlay */}
      {showBottomSheet && (
        <div className="fixed inset-0 z-50">
          {/* Background Overlay */}
          <div 
            className="absolute inset-0"
            onClick={() => setShowBottomSheet(false)}
          />
          
          {/* Bottom Sheet */}
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl transform transition-transform duration-300 ease-out h-[85vh] flex flex-col" style={{ backgroundColor: '#2F4C6C' }}>
            {/* Title and Close Button */}
            <div className="flex justify-between items-center pt-4 pb-2 flex-shrink-0 px-6">
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Amita' }}>Posts</h2>
              <button
                onClick={() => setShowBottomSheet(false)}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
                aria-label="Close"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
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
            </div>
            
            {/* Content */}
            <div className="px-6 pb-8 flex-1 flex flex-col">
              
              {/* Current Post */}
              <div className="flex-1 flex flex-col">
                <div 
                  className="rounded-2xl overflow-hidden flex-1 flex flex-col"
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    const startX = touch.clientX;
                    
                    const handleTouchEnd = (e: TouchEvent) => {
                      const touch = e.changedTouches[0];
                      const endX = touch.clientX;
                      const diff = startX - endX;
                      
                      if (Math.abs(diff) > 50) { // Minimum swipe distance
                        if (diff > 0) {
                          handleSwipeLeft(); // Swipe left to go to next
                        } else {
                          handleSwipeRight(); // Swipe right to go to previous
                        }
                      }
                      
                      document.removeEventListener('touchend', handleTouchEnd);
                    };
                    
                    document.addEventListener('touchend', handleTouchEnd);
                  }}
                >
                  <img 
                    src="/new-post-mobile-card.png" 
                    alt="Post Image" 
                    className="w-full rounded-xl object-cover"
                    style={{ height: '60vh' }}
                  />
                  
                  {/* Pagination Dots */}
                  <div className="flex justify-center space-x-1 px-4 pt-4">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPostIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          currentPostIndex === index ? 'bg-white' : 'bg-white bg-opacity-30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Read Button */}
                  <div className="px-4 pb-4 pt-4">
                    <button className="w-full bg-white py-3 px-4 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200" style={{ color: '#2F4C6C' }}>
                      Read This Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
