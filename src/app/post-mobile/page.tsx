"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import { getAllPosts, Post } from '@/lib/posts';


export default function PostMobilePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [showFullPost, setShowFullPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  // Refs for animations
  const pageRef = useRef<HTMLDivElement>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const fullPostRef = useRef<HTMLDivElement>(null);
  
  // Get actual posts data
  const posts = getAllPosts();

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
    
    // Fetch the lottie animation data
    fetch('/new-click-mobile.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  useEffect(() => {
    if (showBottomSheet) {
      showBottomSheetAnimation();
    }
  }, [showBottomSheet]);

  const handleClose = () => {
    router.push('/?skipLoader=true');
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
    setCurrentPostIndex((prev) => (prev + 1) % posts.length);
  };

  const handleSwipeRight = () => {
    setCurrentPostIndex((prev) => (prev - 1 + posts.length) % posts.length);
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
          handleSwipeLeft(); // Swipe left to go to next post
        } else {
          handleSwipeRight(); // Swipe right to go to previous post
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handlePageClick = () => {
    setShowBottomSheet(true);
  };

  const handleReadPost = () => {
    const currentPost = posts[currentPostIndex];
    setSelectedPost(currentPost);
    setShowFullPost(true);
    setShowBottomSheet(false);
  };

  const handleCloseFullPost = () => {
    setShowFullPost(false);
    setSelectedPost(null);
  };

  return (
    <div 
      ref={pageRef}
      className={`min-h-screen transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: '#2F4C6C' }}
      onClick={handlePageClick}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
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
        
        {/* Lottie Animation */}
        <div className="flex justify-center mt-8">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: 80, height: 80 }}
            />
          )}
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
            style={{ backgroundColor: '#2F4C6C' }}
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
            
            {/* Content */}
            <div className="pt-4">
              <h2 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Amita, cursive' }}>Posts</h2>
              
              {/* Post Card */}
              <div className="mb-6">
                {/* Image Card */}
                <div className="mb-4 relative" onTouchStart={handleTouchStart} onClick={handleReadPost}>
                  <div className="aspect-[4/5] rounded-xl overflow-hidden cursor-pointer">
                    <img 
                      src="/guides-bottomsheet.png" 
                      alt="Post Card" 
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
                        {posts[currentPostIndex].title}
                      </h3>
                      <p className="text-white text-sm opacity-90" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {posts[currentPostIndex].leftContent.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Page Identifier Circles - Centered */}
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-2">
                    {posts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPostIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentPostIndex 
                            ? 'bg-white' 
                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
                
                {/* Read Button - Centered */}
                <div className="flex justify-center">
                  <button 
                    onClick={handleReadPost}
                    className="bg-white text-[#2F4C6C] px-20 py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-200"
                  >
                    Read This Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Post View */}
      {showFullPost && selectedPost && (
        <div 
          ref={fullPostRef}
          className="fixed inset-0 z-50 min-h-screen overflow-y-auto"
          style={{ backgroundColor: '#2F4C6C' }}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseFullPost}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
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
          
          {/* Content */}
          <div className="px-6 pt-16 pb-8">
            <div className="max-w-md mx-auto">
              {/* Title */}
              <h1 className="text-white text-2xl font-semibold mb-8 leading-tight" style={{ fontFamily: 'Amita, cursive' }}>
                {selectedPost.title}
              </h1>
              
              {/* Content */}
              <div className="text-white text-base leading-relaxed space-y-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <p>{selectedPost.leftContent}</p>
                <p>{selectedPost.rightContent}</p>
                <p>{selectedPost.bottomRightContent}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
