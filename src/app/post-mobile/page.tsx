"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';


export default function PostMobilePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
    
    // Fetch the lottie animation data
    fetch('/new-click-mobile.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  const handleClose = () => {
    router.push('/?skipLoader=true');
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: '#2481C2' }}
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
    </div>
  );
}
