"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import { getAllPosts, Post } from '@/lib/posts';
import Image from 'next/image';


export default function PostMobilePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [showFullPost, setShowFullPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentFullPostIndex, setCurrentFullPostIndex] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNavigationArrows, setShowNavigationArrows] = useState(false);
  
  // Refs for animations
  const pageRef = useRef<HTMLDivElement>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const fullPostRef = useRef<HTMLDivElement>(null);
  const fullPostContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
    
    // Fetch the lottie animation data
    fetch('/new-click-mobile.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  // Fetch posts from Airtable
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const apiPosts = await getAllPosts();
        setPosts(apiPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback to empty array if Airtable fails
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
    if (posts.length === 0) {
      // Show the "No Posts Available" bottom sheet directly
      setShowBottomSheet(true);
    } else {
      // Show posts bottom sheet
      setShowBottomSheet(true);
    }
  };

  const handleReadPost = () => {
    if (posts.length > 0 && posts[currentPostIndex]) {
      const currentPost = posts[currentPostIndex];
      setSelectedPost(currentPost);
      setCurrentFullPostIndex(currentPostIndex);
      setShowFullPost(true);
      setShowBottomSheet(false);
    }
  };

  // Navigation functions for full post view
  const handleNextPost = () => {
    if (posts.length > 0) {
      const nextIndex = (currentFullPostIndex + 1) % posts.length;
      setCurrentFullPostIndex(nextIndex);
      setSelectedPost(posts[nextIndex]);
      
      // Smooth scroll to top
      if (fullPostRef.current) {
        fullPostRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      // Hide navigation arrows initially for new post
      setShowNavigationArrows(false);
    }
  };

  const handlePreviousPost = () => {
    if (posts.length > 0) {
      const prevIndex = (currentFullPostIndex - 1 + posts.length) % posts.length;
      setCurrentFullPostIndex(prevIndex);
      setSelectedPost(posts[prevIndex]);
      
      // Smooth scroll to top
      if (fullPostRef.current) {
        fullPostRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      // Hide navigation arrows initially for new post
      setShowNavigationArrows(false);
    }
  };

  const handleCloseFullPost = () => {
    setShowFullPost(false);
    setSelectedPost(null);
    setShowNavigationArrows(false);
  };

  // Handle scroll detection for navigation arrows
  useEffect(() => {
    const handleScroll = () => {
      if (fullPostRef.current) {
        const container = fullPostRef.current;
        
        // Check if user has scrolled to the bottom (with some tolerance)
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50; // 50px tolerance
        
        setShowNavigationArrows(isAtBottom);
      }
    };

    if (showFullPost && fullPostRef.current) {
      const container = fullPostRef.current;
      container.addEventListener('scroll', handleScroll);
      
      // Check initial scroll position
      handleScroll();
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [showFullPost, selectedPost]);

  // Show loading state if posts are not loaded yet
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#2F4C6C' }}>
        <div className="text-white text-lg font-medium">Loading posts please wait</div>
      </div>
    );
  }


  // Show landing page if no posts are available
  if (posts.length === 0) {
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
          <Image 
            src="/new-post-logo-modal.svg" 
            alt="The Coordinated Living" 
            width={128}
            height={128}
            className="w-32 h-auto"
          />
        </div>
        
        {/* Landing Page Content */}
        <div className="px-6 pt-48 pb-8">
          <div className="max-w-md mx-auto">
            <div className="text-white text-sm leading-relaxed space-y-4">
              <p>
                &quot;A thousand times I failed, still your mercy remains, should I stumble out here still I&apos;m caught in your grace.&quot; This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today.
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
          
          {/* Lottie Animation - Smaller */}
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
        
        {/* Bottom Sheet for No Posts */}
        {showBottomSheet && (
          <>
            {/* Backdrop */}
            <div 
              ref={backdropRef}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={(e) => {
                e.stopPropagation();
                hideBottomSheetAnimation();
              }}
            />
            
            {/* Bottom Sheet */}
            <div 
              ref={bottomSheetRef}
              className="fixed bottom-0 left-0 right-0 rounded-t-3xl p-6 z-50 max-h-[85vh] overflow-y-auto"
              style={{ backgroundColor: '#2F4C6C' }}
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">No Posts Available</h2>
                <p className="text-white mb-6">
                  There are currently no published posts to display. Please check back later.
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    hideBottomSheetAnimation();
                  }}
                  className="bg-white text-[#2F4C6C] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

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
        <Image 
          src="/new-post-logo-modal.svg" 
          alt="The Coordinated Living" 
          width={128}
          height={128}
          className="w-32 h-auto"
        />
      </div>
      
      {/* Landing Page Content */}
      <div className="px-6 pt-48 pb-8">
        <div className="max-w-md mx-auto">
          <div className="text-white text-sm leading-relaxed space-y-4">
            <p>
              &quot;A thousand times I failed, still your mercy remains, should I stumble out here still I&apos;m caught in your grace.&quot; This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today.
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
        
        {/* Lottie Animation - Smaller */}
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
            onClick={(e) => {
              e.stopPropagation();
              hideBottomSheetAnimation();
            }}
          />
          
          {/* Bottom Sheet Content */}
          <div 
            ref={bottomSheetRef}
            className="relative w-full rounded-t-3xl p-8 max-h-[90vh] overflow-y-auto flex flex-col" 
            style={{ backgroundColor: '#2F4C6C' }}
          >
            {/* Handle */}
            <div className="flex justify-center mb-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  hideBottomSheetAnimation();
                }}
                className="w-12 h-1 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-200"
              ></button>
            </div>
            
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                hideBottomSheetAnimation();
              }}
              className="absolute top-4 right-4 p-2"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Content */}
            <div className="pt-4 flex-1 overflow-y-auto">
              <h2 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Amita, cursive' }}>Posts</h2>
              
              {posts.length > 0 ? (
                /* Post Card */
                <div className="mb-6">
                  {/* Image Card */}
                  <div className="mb-4 relative" onTouchStart={handleTouchStart} onClick={handleReadPost}>
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer" style={{ borderRadius: '16px' }}>
                      <Image 
                        src={posts[currentPostIndex]?.images?.[0]?.src || "/guides-bottomsheet.png"} 
                        alt={posts[currentPostIndex]?.images?.[0]?.alt || "Post Card"} 
                        fill
                        className="object-cover rounded-2xl"
                        onError={(e) => {
                          console.error('Image failed to load:', posts[currentPostIndex]?.images?.[0]?.src);
                          // Fallback to default image if Airtable image fails
                          e.currentTarget.src = "/guides-bottomsheet.png";
                        }}
                      />
                      
                      {/* Logo - Top Left */}
                      <div className="absolute top-4 left-4">
                        <Image 
                          src="/guide-bottom-logo.svg" 
                          alt="Logo" 
                          width={64}
                          height={64}
                          className="w-16 h-16"
                        />
                      </div>
                      
                      {/* Title and Description - Bottom Left */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-lg font-semibold mb-2" style={{ fontFamily: 'Amita, cursive' }}>
                          {posts[currentPostIndex]?.title || 'Loading...'}
                        </h3>
                        <p className="text-white text-sm opacity-90" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          {posts[currentPostIndex]?.leftContent?.substring(0, 100) + '...' || 'Loading content...'}
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
              ) : (
                /* No Posts Available */
                <div className="text-center text-white mb-6">
                  <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Amita, cursive' }}>No Posts Available</h3>
                  <p className="text-sm opacity-80 mb-6">
                    There are currently no published posts to display. Please check back later.
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      hideBottomSheetAnimation();
                    }}
                    className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
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
          <div className="px-6 pt-16 pb-32" ref={fullPostContentRef}>
            <div className="max-w-md mx-auto">
              {/* Title */}
              <h1 className="text-white text-2xl font-semibold mb-8 leading-tight" style={{ fontFamily: 'Amita, cursive' }}>
                {selectedPost.title}
              </h1>
              
              {/* Content */}
              <div className="text-white text-base leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <div className="space-y-4">
                  {selectedPost.content ? (
                    // Use new content field if available - split into paragraphs
                    typeof selectedPost.content === 'string' ? (
                      selectedPost.content.split('\n').map((paragraph, index) => (
                        paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                      ))
                    ) : (
                      <p>{selectedPost.content}</p>
                    )
                  ) : (
                    // Fallback to legacy fields
                    <>
                      {selectedPost.leftContent && <p>{selectedPost.leftContent}</p>}
                      {selectedPost.rightContent && <p>{selectedPost.rightContent}</p>}
                      {selectedPost.bottomRightContent && <p>{selectedPost.bottomRightContent}</p>}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Only show if there are multiple posts and user has scrolled to bottom */}
          {posts.length > 1 && (
            <div 
              className={`fixed bottom-6 left-0 right-0 px-6 z-20 transition-all duration-500 ease-in-out ${
                showNavigationArrows 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="max-w-md mx-auto flex justify-between items-center">
                {/* Previous Button */}
                <button
                  onClick={handlePreviousPost}
                  className="flex items-center justify-center w-12 h-12 bg-[#2F4C6C] bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200 backdrop-blur-sm border-2 border-white border-opacity-30"
                  aria-label="Previous Post"
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
                      d="M15 19l-7-7 7-7" 
                    />
                  </svg>
                </button>

                {/* Post Counter */}
                <div className="flex items-center space-x-2 bg-[#2F4C6C] bg-opacity-90 rounded-full px-4 py-2 backdrop-blur-sm border-2 border-white border-opacity-30">
                  <span className="text-white text-sm font-medium">
                    {currentFullPostIndex + 1} of {posts.length}
                  </span>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPost}
                  className="flex items-center justify-center w-12 h-12 bg-[#2F4C6C] bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200 backdrop-blur-sm border-2 border-white border-opacity-30"
                  aria-label="Next Post"
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
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
