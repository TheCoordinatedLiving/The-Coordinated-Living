
"use client";
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { gsap } from 'gsap';
import Lottie from 'lottie-react';
import { getAllPosts, Post } from '@/lib/posts';
import PostTemplate from '../components/PostTemplate';
import FullTermsContent from '../components/FullTermsContent';
import AskAQuestion from './windows/AskAQuestion';
import DonationModal from '../components/DonationModal';
import ComingSoonModal from '../components/ComingSoonModal';

const Loader = () => {
  const logoRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(logoRef.current, { rotation: 0 }, {
      rotation: 360,
      duration: 4,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <div ref={containerRef} className="loader-container fixed inset-0 z-10 w-screen h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 opacity-70 filter blur-[100px] gradient-background">
        <div className="absolute w-[200%] h-[200%] top-[-100%] left-[-100%] animate-float-1">
          <Image src="/loading-screen/Ellipse 1.svg" layout="fill" objectFit="cover" alt="Ellipse 1" />
        </div>
        <div className="absolute w-[200%] h-[200%] top-[-100%] right-[-100%] animate-float-2">
          <Image src="/loading-screen/Ellipse 2.svg" layout="fill" objectFit="cover" alt="Ellipse 2" />
        </div>
        <div className="absolute w-[200%] h-[200%] bottom-[-100%] left-[-100%] animate-float-3">
          <Image src="/loading-screen/Ellipse 3.svg" layout="fill" objectFit="cover" alt="Ellipse 3" />
        </div>
        <div className="absolute w-[200%] h-[200%] bottom-[-100%] right-[-100%] animate-float-4">
          <Image src="/loading-screen/Ellipse 4.svg" layout="fill" objectFit="cover" alt="Ellipse 4" />
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div ref={logoRef}>
          <Image 
            src="/loading-screen/logo.svg" 
            width={280} 
            height={105} 
            alt="Coordinated Living Logo" 
            className="w-32 xs:w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 2xl:w-80 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

const WelcomeScreen = ({ onEnterClick }: { onEnterClick: () => void }) => {
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    console.log('WelcomeScreen useLayoutEffect - animating logo');
    gsap.to(logoRef.current, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <div className="welcome-container opacity-0 relative w-screen h-screen overflow-hidden bg-black text-white flex justify-center items-center text-center p-2 xs:p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20">
      <div className="absolute inset-0 z-0 opacity-70 filter blur-[100px] gradient-background">
        <div className="absolute w-[200%] h-[200%] top-[-100%] left-[-100%] animate-float-1">
          <Image src="/loading-screen/Ellipse 1.svg" layout="fill" objectFit="cover" alt="Ellipse 1" />
        </div>
        <div className="absolute w-[200%] h-[200%] top-[-100%] right-[-100%] animate-float-2">
          <Image src="/loading-screen/Ellipse 2.svg" layout="fill" objectFit="cover" alt="Ellipse 2" />
        </div>
        <div className="absolute w-[200%] h-[200%] bottom-[-100%] left-[-100%] animate-float-3">
          <Image src="/loading-screen/Ellipse 3.svg" layout="fill" objectFit="cover" alt="Ellipse 3" />
        </div>
        <div className="absolute w-[200%] h-[200%] bottom-[-100%] right-[-100%] animate-float-4">
          <Image src="/loading-screen/Ellipse 4.svg" layout="fill" objectFit="cover" alt="Ellipse 4" />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {/* Logo */}
        <div ref={logoRef} className="w-12 xs:w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-auto welcome-logo mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <Image 
            src="/loading-screen/logo.svg" 
            width={96} 
            height={36} 
            alt="Logo" 
            className="w-full h-auto" 
          />
        </div>
        
        {/* Main Text */}
        <div className="welcome-text px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h1 
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight" 
            style={{ 
              fontFamily: 'Amita',
              wordWrap: 'break-word',
              hyphens: 'auto'
            }}
          >
            Where His grace abounds through the changing scenes of life.
          </h1>
        </div>
        
        {/* Button */}
        <div className="welcome-button">
          <button
            onClick={onEnterClick}
            className="bg-white text-black px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2 xs:py-2.5 sm:py-3 md:py-4 lg:py-5 xl:py-6 rounded-full font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wider transition-all duration-300 ease-in-out hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] cursor-pointer touch-manipulation"
            style={{
              minHeight: '44px',
              minWidth: '120px'
            }}
          >
            ENTER EXPERIENCE
          </button>
        </div>
      </div>
    </div>
  );
};

// New Homepage Component
const NewHomepage = ({ onPourIntoCupClick }: { onPourIntoCupClick: () => void }) => {
  const router = useRouter();
  const homepageRef = useRef<HTMLDivElement>(null);
  const statusBarRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  
  // Terms modal state
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  
  // Coming Soon modal state
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  
  // Fetch posts count from Airtable
  useEffect(() => {
    const fetchPostsCount = async () => {
      try {
        const apiPosts = await getAllPosts();
        setPostsCount(apiPosts.length);
      } catch (error) {
        console.error('Error fetching posts count:', error);
        setPostsCount(0);
      }
    };

    fetchPostsCount();
  }, []);
  
  // Static background
  const backgroundImage = '/homepage-new-background.png';
  


  const handlePostWidgetClick = () => {
    // Only navigate on mobile view (screen width < 1280px)
    if (window.innerWidth < 1280) {
      router.push('/post-mobile');
    }
  };

  // Coming Soon modal handlers
  const handleJoinChannelClick = () => {
    // Show Coming Soon modal instead of navigating
    setComingSoonFeature('Join Our Channels');
    setShowComingSoonModal(true);
  };

  const handlePourIntoCupClick = () => {
    // Open donation modal for actual donations
    onPourIntoCupClick();
  };

  const handleComingSoonModalClose = () => {
    setShowComingSoonModal(false);
    setComingSoonFeature('');
  };

  // Donation functionality handled in main Page component

  // const handleDonationSuccess = (data: { reference: string; amount: number }) => {
  //   // The modal will handle the redirect to Paystack
  //   // Success will be handled by the payment-success page
  //   console.log('Donation initiated:', data);
  // };

  useEffect(() => {
    if (homepageRef.current && statusBarRef.current && iconsRef.current) {
      // Set initial states
      gsap.set(homepageRef.current, { opacity: 0, y: 20 });
      gsap.set(statusBarRef.current, { opacity: 0, y: -20 });
      gsap.set(iconsRef.current, { opacity: 0, y: 30 });

      // Create entrance animation timeline
      const tl = gsap.timeline();
      
      tl.to(homepageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(statusBarRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, "-=0.4")
      .to(iconsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, "-=0.3");
    }
  }, []);

  return (
    <div 
      ref={homepageRef}
      className="fixed inset-0 z-40 w-screen overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Static Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* TCL Status Bar - Same as lockscreen */}
      <div ref={statusBarRef} className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-6 pt-3 pb-2">
        {/* Left Status - TCL Text and Icons */}
        <div className="flex items-center space-x-2">
          <Image 
            src="/left-top-logo-mobile.svg" 
            alt="TCL Logo" 
            width={12} 
            height={8}
            className="h-2 w-auto"
          />
        </div>
        
        {/* Right Status Icons */}
        <div className="flex items-center space-x-2">
        </div>
      </div>

      {/* Top Widgets */}
      <div className="absolute top-16 left-0 right-0 flex justify-center items-end px-2 sm:px-1 md:px-0 gap-2 sm:gap-1 md:gap-0">
        {/* Left Date Widget */}
        <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-[26px] flex flex-col p-4 sm:p-5 md:p-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          {/* Month and Year */}
          <div className="text-white text-xs sm:text-sm md:text-base font-bold uppercase">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}
          </div>
          
          {/* Date and Day */}
          <div className="flex items-end justify-start mt-2">
            <span className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold">{new Date().getDate()}</span>
            <span className="text-white text-xs sm:text-sm md:text-base font-bold ml-2 mb-2">
              {new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
            </span>
          </div>
          
          {/* Timestamp */}
          <div className="text-white text-sm sm:text-base font-bold mt-auto">
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })}
          </div>
        </div>
        
        {/* Right widgets */}
        <div className="flex flex-col justify-end h-40 sm:h-48 md:h-52 lg:h-56">
          {/* Pour Into My Cup Widget */}
          <div 
            className="w-44 h-18 sm:w-52 sm:h-20 md:w-56 md:h-22 lg:w-60 lg:h-24 rounded-[26px] mb-2 backdrop-blur-[16px] flex items-center px-3 sm:px-4 md:px-5 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95" 
            style={{ backgroundColor: 'rgba(23, 23, 26, 0.3)' }}
            onClick={handlePourIntoCupClick}
          >
            {/* Pour Into My Cup Icon */}
            <div className="flex-shrink-0 mr-3 sm:mr-4">
              <Image 
                src="/donation-widget.svg" 
                alt="Pour Into My Cup" 
                width={48}
                height={48}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              />
            </div>
            {/* Text Content */}
            <div className="flex flex-col justify-center" style={{ color: 'rgba(255, 255, 255, 0.88)' }}>
              <div className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                Pour Into
              </div>
              <div className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                My Cup
              </div>
            </div>
          </div>
          {/* Terms and Conditions Widget */}
          <div 
            className="w-44 h-18 sm:w-52 sm:h-20 md:w-56 md:h-22 lg:w-60 lg:h-24 rounded-[26px] mb-2 backdrop-blur-[16px] flex items-center px-3 sm:px-4 md:px-5 cursor-pointer" 
            style={{ backgroundColor: 'rgba(23, 23, 26, 0.3)' }}
            onClick={() => router.push('/terms-mobile')}
          >
            {/* Terms Check Icon */}
            <div className="flex-shrink-0 mr-3 sm:mr-4">
              <Image 
                src="/terms-check.svg" 
                alt="Terms and Conditions" 
                width={64}
                height={64}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
              />
            </div>
            
            {/* Terms and Conditions Text */}
            <div className="flex flex-col justify-center" style={{ color: 'rgba(255, 255, 255, 0.88)' }}>
              <div className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                Terms and
              </div>
              <div className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                Conditions
              </div>
            </div>
          </div>


        </div>
      </div>


      {/* App Icons Rows */}
      <div ref={iconsRef} className="absolute bottom-12 left-0 right-0 flex flex-col justify-center items-center">
        
        {/* Widget Card */}
        <div 
          className="w-full max-w-xs mx-auto mb-4 px-4 py-3 rounded-[20px] flex items-center justify-between -mt-8 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95" 
          style={{ backgroundColor: '#D0B3D6', height: '140px' }}
          onClick={handlePostWidgetClick}
        >
          {/* Left side content */}
          <div className="flex flex-col justify-between h-full">
            {/* Top left - Title and description */}
            <div>
              <h3 className="text-black font-bold text-lg uppercase">POSTS</h3>
              <p className="text-black text-xs mt-1">Navigate life with faith-filled reflections.</p>
            </div>
            
            {/* Bottom left - Count */}
            <div className="flex items-baseline">
              <span className="text-black font-bold text-3xl">{postsCount}</span>
              <span className="text-black text-sm ml-2">Posts Available</span>
            </div>
          </div>
          
          {/* Right side - Icon */}
          <div className="flex items-center justify-center">
            <Image 
              src="/post-widget-icon.svg" 
              alt="Posts Icon" 
              width={96}
              height={96}
              className="w-24 h-24"
            />
          </div>
        </div>
        
        {/* Page Identifier Circle */}
        <div className="flex justify-center items-center mb-4">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        
        {/* Bottom Row - 4 Original Icons */}
        <div className="flex justify-between items-center w-full px-8 sm:px-12 md:px-16 lg:px-20">
          {/* Ask Me Question Icon */}
          <div 
            className="flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => router.push('/about-me')}
          >
            <Image 
              src="/ask-me-question-mobile.svg" 
              alt="Ask Me Question" 
              width={100}
              height={100}
              style={{ 
                transform: 'scale(1.8)',
                transformOrigin: 'center'
              }}
              className="sm:scale-150 md:scale-175 lg:scale-200"
            />
          </div>
          
          {/* Guides Icon */}
          <div 
            className="flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => router.push('/guides-mobile')}
          >
            <Image 
              src="/guides-icon.svg" 
              alt="Guides" 
              width={100}
              height={100}
              style={{ 
                transform: 'scale(1.8)',
                transformOrigin: 'center'
              }}
              className="sm:scale-150 md:scale-175 lg:scale-200"
            />
          </div>
          
          {/* Question Mark Icon */}
          <div 
            className="flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => router.push('/ask-question')}
          >
            <Image 
              src="/question-mark.svg" 
              alt="Question Mark" 
              width={100}
              height={100}
              style={{ 
                transform: 'scale(1.8)',
                transformOrigin: 'center'
              }}
              className="sm:scale-150 md:scale-175 lg:scale-200"
            />
          </div>
          
          {/* Donation Icon */}
          <div 
            className="flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={handleJoinChannelClick}
          >
            <Image 
              src="/donation-icon.svg" 
              alt="Donation" 
              width={100}
              height={100}
              style={{ 
                transform: 'scale(1.8)',
                transformOrigin: 'center'
              }}
              className="sm:scale-150 md:scale-175 lg:scale-200"
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center py-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem) + 0.5rem)' }}>
        <div className="flex justify-between items-center w-full max-w-sm sm:max-w-md md:max-w-lg px-8 sm:px-12 md:px-16">
          {/* Left Icon - Minimize */}
          <div className="flex items-center justify-center p-2 sm:p-3 md:p-4">
            <Image 
              src="/minimize.svg" 
              alt="Minimize" 
              width={24} 
              height={24}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
          </div>
          
          {/* Middle Icon - Close */}
          <div className="flex items-center justify-center p-2 sm:p-3 md:p-4">
            <Image 
              src="/close.svg" 
              alt="Close" 
              width={24} 
              height={24}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
          </div>
          
          {/* Right Icon - Back */}
          <div className="flex items-center justify-center p-2 sm:p-3 md:p-4">
            <Image 
              src="/back.svg" 
              alt="Back" 
              width={24} 
              height={24}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
            onClick={() => setShowTermsModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl max-w-4xl max-h-[80vh] overflow-hidden border border-white border-opacity-20">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white border-opacity-20 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">TERMS AND CONDITIONS</h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
              <div className="text-white text-sm leading-relaxed space-y-4">
                <p>
                  <strong>Welcome to The Coordinated Living!</strong>
                </p>
                <p>
                  These terms and conditions outline the rules and regulations for the use of the Website, located at{' '}
                  <a href="https://thecoordinatedliving.com/" className="underline font-bold text-white" target="_blank" rel="noopener noreferrer">
                    https://thecoordinatedliving.com/
                  </a>
                </p>
                <p>
                  The Terms and Conditions on this webpage, as may without notice, be amended from time to time, shall apply to all our services directly or indirectly (through our authorized agents and sub-agents) made available online, any mobile device, by email or by telephone, as well as any other electronic media.
                </p>
                <p>
                  By accessing, browsing and using our website or any of our platform (hereafter collectively referred to as the &quot;website&quot;) and/or by completing a booking, you recognize and agree to have read, understood and agreed to the terms and conditions, including the privacy statement as set out below. You must NOT use this website if you disagree with any of the Terms and Conditions as stated below.
                </p>
                <p>
                  The pages, content and set-up of these pages, and the services provided on these pages and through the website are owned, operated and provide by THE COORDINATE LIVING (hereinafter referred to as IKOORDINATE) and are provided for your personal, non-commercial use only, subject to the terms and conditions set out below.
                </p>
                <p>
                  IKOORDINATE reserves the right to modify all information, including Terms and Conditions, as well as all other features at any time without giving you prior notice. Your use of this website following any modifications constitutes your agreement to follow and be bound by the Terms and Conditions as modified.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={showComingSoonModal}
        onClose={handleComingSoonModalClose}
        featureName={comingSoonFeature}
      />
    </div>
  );
};


// Commented out video animation for demo
// const VideoAnimation = ({ videoRef, onVideoEnd }: { videoRef: React.RefObject<HTMLVideoElement | null>, onVideoEnd: () => void }) => {
//   return (
//     <div className="video-animation-container fixed inset-0 z-5 w-screen h-screen opacity-0 pointer-events-none bg-black">
//       <video
//         ref={videoRef}
//         className="w-full h-full object-cover"
//         preload="auto"
//         muted
//         playsInline
//         onEnded={onVideoEnd}
//       >
//         <source src="/door.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [laptopZoomed, setLaptopZoomed] = useState(false);
  const [showLesleyLetter, setShowLesleyLetter] = useState(false);
  // Remove isLetterLoaded state
  const [showVideos, setShowVideos] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  
  // Donation modal state
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  
  const handleDonationModalClose = () => {
    setIsDonationModalOpen(false);
  };
  
  // Coming Soon modal state
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  
  // Posts state for dynamic content
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  
  // Debug: Log when showPostModal changes
  useEffect(() => {
    console.log('showPostModal changed to:', showPostModal);
  }, [showPostModal]);

  // Fetch posts from Airtable
  useEffect(() => {
    const fetchPosts = async () => {
      setPostsLoading(true);
      try {
        const apiPosts = await getAllPosts();
        
        // Use the posts directly from getAllPosts (already transformed)
        setPosts(apiPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Keep fallback posts if Airtable fails
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Reset currentPostIndex when posts are loaded
  useEffect(() => {
    if (posts.length > 0) {
      setCurrentPostIndex(0);
    }
  }, [posts]);
  const [fromWindows, setFromWindows] = useState(false);
  const [showFumaaModal, setShowFumaaModal] = useState(false);
  const [showBlurEffect, setShowBlurEffect] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [showExpandedEmailModal, setShowExpandedEmailModal] = useState(false);
  const [showGuidesModal, setShowGuidesModal] = useState(false);
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  const [showPostBottomSheet, setShowPostBottomSheet] = useState(false);
  const [currentPostBottomSheetIndex, setCurrentPostBottomSheetIndex] = useState(0);
  const [showFullPostBottomSheet, setShowFullPostBottomSheet] = useState(false);
  const [currentFullPostIndex, setCurrentFullPostIndex] = useState(0);
  const [showAskAQuestion, setShowAskAQuestion] = useState(false);
  const [showHomepage, setShowHomepage] = useState(false);
  const [homepageVisible, setHomepageVisible] = useState(false);
  
  
  
  // Handle skipLoader parameter for smooth navigation from mobile pages
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const skipLoader = urlParams.get('skipLoader');
    
    if (skipLoader === 'true') {
      // Skip loader and welcome screen, go directly to homepage on mobile
      if (window.innerWidth < 1280) {
        setShowHomepage(true);
        setHomepageVisible(true);
        setIsLoaded(true);
        // Clean up the URL parameter
        window.history.replaceState({}, '', '/');
      } else {
        // On desktop, skip to experience directly
        setIsLoaded(true);
        setExperienceVisible(true);
        // Smoothly slide the curtain up to reveal experience
        if (curtainRef.current) {
          gsap.to(curtainRef.current, {
            y: '-100%',
            duration: 1.2,
            ease: 'power3.inOut'
          });
        }
        // Clean up the URL parameter
        window.history.replaceState({}, '', '/');
      }
    }
  }, []);

  // Handle navigation back to homepage from other pages
  useEffect(() => {
    const handlePopState = () => {
      // When user navigates back to homepage, show it directly on mobile
      if (window.location.pathname === '/' && window.innerWidth < 1280) {
        setShowHomepage(true);
        setHomepageVisible(true); // Show immediately when navigating back
        setIsLoaded(true);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  const handleCloseExpandedEmailModal = () => {
    // Animate expanded email modal out with ease
    const modalContainer = document.querySelector('.expanded-email-modal-card');
    
    if (modalContainer) {
      gsap.to(modalContainer, {
        opacity: 0,
        scale: 0.95,
        y: -20,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          setShowExpandedEmailModal(false);
        }
      });
    } else {
      setShowExpandedEmailModal(false);
    }
  };

  const handleCloseGuidesModal = () => {
    // Animate bottom sheet out with ease
    const bottomSheet = document.querySelector('.guides-bottom-sheet');
    
    if (bottomSheet) {
      gsap.to(bottomSheet, {
        y: '100%',
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setShowGuidesModal(false);
          setCurrentGuideIndex(0); // Reset to first guide
        }
      });
    } else {
      setShowGuidesModal(false);
      setCurrentGuideIndex(0);
    }
  };

  const handleClosePostBottomSheet = () => {
    // Animate bottom sheet out with ease
    const bottomSheet = document.querySelector('.post-bottom-sheet');
    
    if (bottomSheet) {
      gsap.to(bottomSheet, {
        y: '100%',
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setShowPostBottomSheet(false);
          setCurrentPostBottomSheetIndex(0); // Reset to first post
        }
      });
    } else {
      setShowPostBottomSheet(false);
      setCurrentPostBottomSheetIndex(0);
    }
  };

  const handleCloseFullPostBottomSheet = () => {
    // Animate bottom sheet out with ease
    const bottomSheet = document.querySelector('.full-post-bottom-sheet');
    
    if (bottomSheet) {
      gsap.to(bottomSheet, {
        y: '100%',
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setShowFullPostBottomSheet(false);
          setCurrentFullPostIndex(0); // Reset to first post
        }
      });
    } else {
      setShowFullPostBottomSheet(false);
      setCurrentFullPostIndex(0);
    }
  };




  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isClosingTermsModal, setIsClosingTermsModal] = useState(false);
  const [clickAnimation, setClickAnimation] = useState(null);
  const postTemplateRef = useRef<HTMLDivElement>(null);
  const termsModalBackdropRef = useRef<HTMLDivElement>(null);
  const termsModalContentRef = useRef<HTMLDivElement>(null);
  
  // Ultra-wide screen detection - Optimized to reduce flickering
  const [isUltraWide, setIsUltraWide] = useState(false);
  
  const mobileItems = ['ABOUT ME', 'POST', 'ASK ME A QUESTION', 'JOIN OUR CHANNEL', 'GUIDES', 'POUR INTO MY CUP', 'TERMS AND CONDITIONS'];
  
  // Mobile navigation state
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [activeMobileItem, setActiveMobileItem] = useState(mobileItems[0]);
  
  // Swipe functionality state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Tab container ref for auto-scroll
  const tabContainerRef = useRef<HTMLDivElement>(null);
  
  // Floating tab container ref for dynamic positioning
  const floatingTabRef = useRef<HTMLDivElement>(null);

  // Dynamic floating tab positioning for mobile browser UI (including Chrome)
  useEffect(() => {
    const adjustFloatingTabPosition = () => {
      if (floatingTabRef.current && window.innerWidth < 1280) { // Only for mobile/tablet
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        const windowHeight = window.innerHeight;
        const heightDifference = windowHeight - viewportHeight;
        
        // Get safe area inset bottom
        const safeAreaBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom') || '0');
        
        // Detect browser type
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        const isChrome = /Chrome/.test(navigator.userAgent);
        const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
        
        // Base spacing calculation
        let bottomSpacing = 80; // Base spacing
        
        // Chrome mobile browser specific handling
        if (isChrome && (isIOS || isAndroid)) {
          // Chrome mobile has more aggressive browser UI
          bottomSpacing = Math.max(bottomSpacing, 100);
          
          // Add extra spacing for Chrome's dynamic viewport
          if (heightDifference > 0) {
            bottomSpacing = Math.max(bottomSpacing, heightDifference + 60);
          }
          
          // Additional spacing for Chrome on iOS
          if (isIOS && isChrome) {
            bottomSpacing = Math.max(bottomSpacing, 120);
          }
        }
        // Safari specific handling
        else if (isIOS && isSafari) {
          bottomSpacing = Math.max(bottomSpacing, 120);
        if (heightDifference > 0) {
          bottomSpacing = Math.max(bottomSpacing, heightDifference + 40);
          }
        }
        // Android Chrome specific handling
        else if (isAndroid && isChrome) {
          bottomSpacing = Math.max(bottomSpacing, 90);
          if (heightDifference > 0) {
            bottomSpacing = Math.max(bottomSpacing, heightDifference + 50);
          }
        }
        // Fallback for other browsers
        else {
          if (heightDifference > 0) {
            bottomSpacing = Math.max(bottomSpacing, heightDifference + 40);
          }
        }
        
        // Add safe area bottom
        bottomSpacing += safeAreaBottom;
        
        // For iPhone 14/15 models, ensure minimum spacing
        if (window.innerWidth <= 430 && window.innerHeight >= 844) {
          bottomSpacing = Math.max(bottomSpacing, 140);
        }
        
        // Apply the spacing with transition
        floatingTabRef.current.style.transition = 'bottom 0.3s ease-in-out';
        floatingTabRef.current.style.bottom = `${bottomSpacing}px`;
        floatingTabRef.current.style.paddingBottom = `${safeAreaBottom}px`;
        
        console.log('Floating tab positioned:', {
          browser: isChrome ? 'Chrome' : isSafari ? 'Safari' : 'Other',
          platform: isIOS ? 'iOS' : isAndroid ? 'Android' : 'Other',
          bottomSpacing,
          heightDifference,
          safeAreaBottom
        });
      }
    };

    // Initial adjustment with multiple attempts to catch Chrome's delayed viewport changes
    setTimeout(adjustFloatingTabPosition, 100);
    setTimeout(adjustFloatingTabPosition, 500);
    setTimeout(adjustFloatingTabPosition, 1000);

    // Listen for viewport changes (browser UI show/hide)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', adjustFloatingTabPosition);
    }

    // Fallback for older browsers
    window.addEventListener('resize', adjustFloatingTabPosition);
    
    // Additional event listeners for Chrome mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(adjustFloatingTabPosition, 300);
    });
    
    // Listen for scroll events that might trigger browser UI changes
    let scrollTimeout: NodeJS.Timeout | undefined;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(adjustFloatingTabPosition, 100);
    });
    
    // Add Chrome-specific CSS class for additional styling
    const isChrome = /Chrome/.test(navigator.userAgent);
    const isMobile = window.innerWidth < 1280;
    if (isChrome && isMobile && floatingTabRef.current) {
      floatingTabRef.current.classList.add('chrome-mobile-tab');
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', adjustFloatingTabPosition);
      }
      window.removeEventListener('resize', adjustFloatingTabPosition);
      window.removeEventListener('orientationchange', adjustFloatingTabPosition);
    };
  }, []);

  // Auto-scroll to active tab function
  const scrollToActiveTab = (index: number) => {
    if (tabContainerRef.current) {
      // Get responsive tab width based on screen size
      const screenWidth = window.innerWidth;
      const tabWidth = screenWidth >= 768 ? 64 : 52; // Larger tabs on tablet/iPad
      const spacing = 8; // Space between tabs (space-x-2 = 8px)
      const containerPadding = 16; // px-4 = 16px on each side
      const scrollPosition = (index * (tabWidth + spacing)) - containerPadding;
      
      tabContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };
  
  const handleMobileNav = (direction: 'prev' | 'next' | string) => {
    let newIndex;
    
    // If direction is a page name, find its index
    if (direction !== 'prev' && direction !== 'next') {
      const pageIndex = mobileItems.indexOf(direction);
      if (pageIndex !== -1) {
        setCurrentMobileIndex(pageIndex);
        setActiveMobileItem(mobileItems[pageIndex]);
        // Auto-scroll to the active tab
        setTimeout(() => scrollToActiveTab(pageIndex), 100);
        return;
      }
    }
    
    // Handle prev/next navigation
    if (direction === 'prev') {
      newIndex = currentMobileIndex === 0 ? mobileItems.length - 1 : currentMobileIndex - 1;
    } else {
      newIndex = currentMobileIndex === mobileItems.length - 1 ? 0 : currentMobileIndex + 1;
    }
    setCurrentMobileIndex(newIndex);
    setActiveMobileItem(mobileItems[newIndex]);
    // Auto-scroll to the active tab
    setTimeout(() => scrollToActiveTab(newIndex), 100);
  };

  // Swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    // Don't handle touch events if clicking on guide indicators
    if (e.target instanceof Element && e.target.closest('button[data-guide-indicator]')) {
      return;
    }
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Don't handle touch events if clicking on guide indicators
    if (e.target instanceof Element && e.target.closest('button[data-guide-indicator]')) {
      return;
    }
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Handle guide navigation when guides modal is open
    if (showGuidesModal) {
      if (isLeftSwipe && currentGuideIndex < 3) {
        handleNextGuide();
      }
      if (isRightSwipe && currentGuideIndex > 0) {
        handlePreviousGuide();
      }
    } else {
      // Handle main navigation when guides modal is closed
      if (isLeftSwipe) {
        // Swipe left = next page
        handleMobileNav('next');
      }
      if (isRightSwipe) {
        // Swipe right = previous page
        handleMobileNav('prev');
      }
    }
  };

  const handleCloseTermsModal = () => {
    setIsClosingTermsModal(true);
    
    if (termsModalBackdropRef.current && termsModalContentRef.current) {
      gsap.to(termsModalBackdropRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
      gsap.to(termsModalContentRef.current, { 
        opacity: 0, 
        scale: 0.9, 
        y: 20, 
        duration: 0.3, 
        ease: "power2.in",
        onComplete: () => {
          setShowTermsModal(false);
          setIsClosingTermsModal(false);
        }
      });
    } else {
      setShowTermsModal(false);
      setIsClosingTermsModal(false);
    }
  };
  
  useEffect(() => {
    const checkScreenSize = () => {
      const newIsUltraWide = window.innerWidth >= 1920;
      // Only update state if it actually changed
      if (newIsUltraWide !== isUltraWide) {
        setIsUltraWide(newIsUltraWide);
      }
    };
    
    checkScreenSize();
    
    // Debounce resize events to reduce frequency
    let timeoutId: NodeJS.Timeout;
    const debouncedCheckScreenSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 100);
    };
    
    window.addEventListener('resize', debouncedCheckScreenSize);
    
    return () => {
      window.removeEventListener('resize', debouncedCheckScreenSize);
      clearTimeout(timeoutId);
    };
  }, [isUltraWide]);

  // Animate terms modal entrance
  useEffect(() => {
    if (showTermsModal && !isClosingTermsModal) {
      if (termsModalBackdropRef.current && termsModalContentRef.current) {
        gsap.to(termsModalBackdropRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(termsModalContentRef.current, { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.4, 
          ease: "power2.out" 
        });
      }
    }
  }, [showTermsModal, isClosingTermsModal]);

  // Navigation functions
  const handlePreviousPost = () => {
    setCurrentPostIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextPost = () => {
    setCurrentPostIndex(prev => Math.min(posts.length - 1, prev + 1));
  };

  const handlePreviousGuide = () => {
    setCurrentGuideIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextGuide = () => {
    setCurrentGuideIndex(prev => Math.min(3, prev + 1));
  };




  // Share function - Native sharing
  const handleShare = async () => {
    if (!posts[currentPostIndex]) {
      setToastMessage('No post to share');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const post = posts[currentPostIndex];
    const shareUrl = `${window.location.origin}/share/${post.id}`;
    
    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setToastMessage('Share link copied to clipboard!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch {
      // Final fallback: show the URL
      setToastMessage(`Share this link: ${shareUrl}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };


  const pageRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);

  // Load Fumaa Lottie animation
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        await fetch('/Fumaa.json');
        // Animation loaded but not used currently
      } catch (error) {
        console.error('Failed to load Fumaa animation:', error);
      }
    };
    loadAnimation();
  }, []);

  // Load click animation Lottie
  useEffect(() => {
    const loadClickAnimation = async () => {
      try {
        const response = await fetch('/click-animation.json');
        const animation = await response.json();
        setClickAnimation(animation);
      } catch (error) {
        console.error('Failed to load click animation:', error);
      }
    };
    loadClickAnimation();
  }, []);

  // Check if coming back from Windows page
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromWindowsParam = urlParams.get('fromWindows');
    
    console.log('URL params check - fromWindowsParam:', fromWindowsParam);
    
    if (fromWindowsParam === 'true') {
      console.log('Setting fromWindows to true - skipping WelcomeScreen');
      setFromWindows(true);
      // Show loader briefly, then go directly to experience
      const timer = setTimeout(() => {
        setIsLoaded(true);
        setExperienceVisible(true);
        // Smoothly slide the curtain up to reveal experience
        if (curtainRef.current) {
          gsap.to(curtainRef.current, {
            y: '-100%',
            duration: 1.2,
            ease: 'power3.inOut'
          });
        }
      }, 1500); // Show loader for 1.5 seconds
      
      return () => clearTimeout(timer);
      // Clean up the URL parameter
      window.history.replaceState({}, '', '/');
    }
  }, []);

  // Animate PostTemplate when modal opens
  useEffect(() => {
    if (showPostModal && postTemplateRef.current) {
      gsap.fromTo(postTemplateRef.current, 
        { 
          opacity: 0,
          scale: 0.95,
          y: 20
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
  }, [showPostModal]);


  // Prevent body scrolling on mobile when experience is visible
  useEffect(() => {
    if (experienceVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, [experienceVisible]);

  useEffect(() => {
    // Don't start the loader timer if coming from Windows
    if (fromWindows) return;
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [fromWindows]);

  // Preload guide images to prevent flashing
  useEffect(() => {
    const guideImages = [
      '/guide-cover-mobile.png',
      '/his-grace.png', 
      '/Fhis-grace.png',
      '/post-hero.png'
    ];
    
    guideImages.forEach(src => {
      const preloadImage = new window.Image();
      preloadImage.src = src;
    });
  }, []);

  // Animate guides modal entrance
  useEffect(() => {
    if (showGuidesModal) {
      const bottomSheet = document.querySelector('.guides-bottom-sheet');
      if (bottomSheet) {
        gsap.fromTo(bottomSheet, 
          { 
            y: '100%',
            opacity: 0
          },
          { 
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          }
        );
      }
    }
  }, [showGuidesModal]);

  // Animate post bottom sheet entrance
  useEffect(() => {
    if (showPostBottomSheet) {
      const bottomSheet = document.querySelector('.post-bottom-sheet');
      if (bottomSheet) {
        gsap.fromTo(bottomSheet, 
          { 
            y: '100%',
            opacity: 0
          },
          { 
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          }
        );
      }
    }
  }, [showPostBottomSheet]);

  // Animate full post bottom sheet entrance
  useEffect(() => {
    if (showFullPostBottomSheet) {
      const bottomSheet = document.querySelector('.full-post-bottom-sheet');
      if (bottomSheet) {
        gsap.fromTo(bottomSheet, 
          { 
            y: '100%',
            opacity: 0
          },
          { 
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          }
        );
      }
    }
  }, [showFullPostBottomSheet]);

  // Add escape key handler for zoom out
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key, 'laptopZoomed:', laptopZoomed);
      if (e.key === 'Escape' && laptopZoomed) {
        console.log('ESC key detected, zooming out...');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Force focus back to the main document
        document.body.focus();
        
        gsap.to(experienceRef.current, {
          scale: 1,
          x: '0%',
          y: '0%',
          duration: 1.5,
          ease: 'power2.inOut',
          zIndex: 1,
        });
        setLaptopZoomed(false);
      }
    };

    // Add listeners with capture phase for better coverage
    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.body.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [laptopZoomed]);

  const handleEnterClick = () => {
    console.log('ENTER EXPERIENCE button clicked!');
    if (!pageRef.current) return;
    
    // Show homepage immediately for mobile but keep it invisible initially
    if (window.innerWidth < 1280) {
      setShowHomepage(true);
      setHomepageVisible(false); // Keep invisible initially
    }
    
    // Trigger blur effect immediately when button is clicked
    setShowBlurEffect(true);
    setTimeout(() => {
      setShowBlurEffect(false);
    }, 7000);
    
    const tl = gsap.timeline();

    // First, animate the button and text as before
    tl.to('.welcome-button', {
      scale: 1.1,
      duration: 0.2,
      ease: 'power2.out'
    })
      .to('.welcome-button', {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
      .to('.welcome-text', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut'
      }, "-=0.4")
      .to('.welcome-logo', {
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut'
      }, "<")
      // Enhanced curtain animation - smoother for mobile
      .to(curtainRef.current, {
        y: '-100%',
        duration: window.innerWidth < 1280 ? 1.5 : 1.2, // Longer duration for mobile
        ease: window.innerWidth < 1280 ? 'power2.inOut' : 'power3.inOut', // Smoother easing for mobile
        onStart: () => {
          console.log('Curtain animation started');
        },
        onComplete: () => {
          // Show experience page on desktop, homepage on mobile AFTER curtain animation completes
          console.log('Curtain animation complete - showing experience page or homepage');
          if (window.innerWidth < 1280) {
            setHomepageVisible(true);
          } else {
            setExperienceVisible(true);
          }
          
          // Dispatch custom event to notify that welcome screen is complete
          console.log('🎉 Dispatching welcomeScreenComplete event');
          window.dispatchEvent(new CustomEvent('welcomeScreenComplete'));
        }
      }, "-=0.2");
  };

  // Commented out video handling for demo
  // const handleVideoEnd = () => {
  //   setIsVideoEnded(true);
  // };

  // useEffect(() => {
  //   if (isVideoEnded) {
  //     gsap.timeline()
  //       .to('.video-animation-container', {
  //         opacity: 0,
  //         duration: 1.5,
  //         ease: 'power2.inOut'
  //       })
  //       .to('body', {
  //         backgroundColor: '#000',
  //         duration: 0.3,
  //         ease: 'power2.inOut'
  //       }, "-=0.3")
  //       .add(() => {
  //         // Smooth transition to experience page
  //         setTimeout(() => {
  //           window.location.href = '/experience';
  //         }, 200);
  //       }, "-=0.2");
  //   }
  // }, [isVideoEnded]);

  useLayoutEffect(() => {
    console.log('Main useLayoutEffect - isLoaded:', isLoaded, 'fromWindows:', fromWindows);
    
    // Initialize curtain position
    if (curtainRef.current) {
      gsap.set(curtainRef.current, { y: 0, opacity: 1 });
    }
    
    if (isLoaded && pageRef.current && !fromWindows) {
      const loader = pageRef.current.querySelector('.loader-container');
      const welcome = pageRef.current.querySelector('.welcome-container');

      console.log('Found elements - loader:', !!loader, 'welcome:', !!welcome);

      if (loader && welcome) {
        console.log('Starting welcome screen animation');
        gsap.timeline({
          onComplete: () => {
            console.log('Welcome screen animation complete');
            if (loader instanceof HTMLElement) loader.style.display = 'none';
          }
        })
          .to(loader, { opacity: 0, duration: 1.5, ease: 'power2.inOut' })
          .to(welcome, { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, "-=1.0");
      } else {
        console.log('Missing elements - loader or welcome not found');
        // Fallback: if welcome screen exists but animation failed, make it visible
        if (welcome) {
          console.log('Fallback: Making welcome screen visible');
          gsap.set(welcome, { opacity: 1 });
        }
      }
    }
  }, [isLoaded, fromWindows]);

  // Debug: Log WelcomeScreen rendering state
  useEffect(() => {
    console.log('WelcomeScreen render state - fromWindows:', fromWindows, 'isLoaded:', isLoaded);
  }, [fromWindows, isLoaded]);

  // Fallback: Ensure WelcomeScreen shows up on desktop even if timing is off
  useEffect(() => {
    if (isLoaded && !fromWindows && pageRef.current) {
      const timeout = setTimeout(() => {
        const welcome = pageRef.current?.querySelector('.welcome-container');
        if (welcome && getComputedStyle(welcome).opacity === '0') {
          console.log('Fallback timeout: Making welcome screen visible');
          gsap.set(welcome, { opacity: 1 });
        }
      }, 3000); // 3 second fallback

      return () => clearTimeout(timeout);
    }
  }, [isLoaded, fromWindows]);

  const handleCloseVideos = () => {
    // Create a timeline for smooth exit animation
    const tl = gsap.timeline();
    
    // Animate all elements out smoothly
    tl.to('.video-title, .video-description, .video-button, .video-image', {
      opacity: 0,
      y: -40,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.05
    });
    
    // Close modal after animation completes
    tl.call(() => {
      setShowVideos(false);
    });
  };

  const handleCloseLesleyLetter = () => {
    // Animate lesley letter out
    const letter = document.querySelector('[data-lesley-letter]');
    
    gsap.to(letter, {
      opacity: 0,
      y: -40,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => {
        setShowLesleyLetter(false);
      }
    });
  };

  const handleClosePostModal = () => {
    // Animate post modal out with ease
    const modalContainer = document.querySelector('.post-modal-container');
    
    if (modalContainer) {
      gsap.to(modalContainer, {
        opacity: 0,
        scale: 0.95,
        y: -20,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          setShowPostModal(false);
        }
      });
    } else {
      setShowPostModal(false);
    }
  };

  const handleCloseFumaaModal = () => {
    // Create a timeline for smooth exit animation
    const tl = gsap.timeline();
    
    // Animate all elements out smoothly
    tl.to('.cup-title, .cup-description, .cup-button, .cup-image', {
      opacity: 0,
      y: -40,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.05
    });
    
    // Close modal after animation completes
    tl.call(() => {
      setShowFumaaModal(false);
    });
  };






  // Donation modal handlers (already defined above)

  // Coming Soon modal handlers
  const handleJoinChannelClick = () => {
    // Show Coming Soon modal instead of navigating
    setComingSoonFeature('Join Our Channels');
    setShowComingSoonModal(true);
  };

  const handlePourIntoCupClick = () => {
    // Open donation modal for actual donations
    setIsDonationModalOpen(true);
  };

  const handleComingSoonModalClose = () => {
    setShowComingSoonModal(false);
    setComingSoonFeature('');
  };


  return (
    <div ref={pageRef} className="relative" style={{ height: '100vh', overflow: 'hidden' }}>
      
      {/* New Homepage - Mobile Only */}
      {showHomepage && (
        <div 
          className="xl:hidden"
          style={{ 
            opacity: homepageVisible ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <NewHomepage onPourIntoCupClick={() => setIsDonationModalOpen(true)} />
          
        </div>
      )}
      
      {/* Experience page hidden behind */}
      {experienceVisible && ( 
        <div
          ref={experienceRef}
          className="bg-white relative overflow-hidden workspace-bg"
          style={{ height: '100vh', overflow: 'hidden' }}
        >
          {/* Mobile Background */}
          <div className="xl:hidden absolute inset-0 bg-white overflow-hidden">
            
            
            
            {/* Mobile Noticeboard Post */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-1 xs:left-2 sm:left-3 right-1 xs:right-2 sm:right-3 z-10">
              <div className="relative flex items-center justify-center" style={{ minHeight: 'clamp(250px, 35vh, 400px)' }}>
                
                {/* Content Card */}
                <div className="relative flex-1 mx-2 xs:mx-4 sm:mx-6 md:mx-8" style={{ minHeight: 'clamp(250px, 35vh, 400px)', maxWidth: 'calc(100vw - 20px)' }}>
                  <div 
                    className="cursor-pointer"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onClick={() => {
                      if (activeMobileItem === 'GUIDES') {
                        setShowGuidesModal(true);
                      } else if (activeMobileItem === 'POST') {
                        setShowPostBottomSheet(true);
                      } else if (activeMobileItem === 'ASK ME A QUESTION') {
                        setShowAskAQuestion(true);
                      }
                    }}
                  >
                    {activeMobileItem === 'ASK ME A QUESTION' ? (
                                              <div className="w-full h-full flex flex-col">
                          {/* Banner Image with ASK ME A QUESTION text */}
                         <div className="relative w-full md:h-[600px] lg:h-[700px] tablet-banner ipad-banner" style={{ height: 'clamp(300px, 45vh, 500px)', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', position: 'absolute', top: 'calc(-50vh + 50% - clamp(150px, 22.5vh, 250px))' }}>
                          <Image
                            src="/about-me-mobile-banner-2.png"
                            alt="Ask Me A Question Banner"
                            fill
                            className="object-cover"
                          />
                          {/* ASK ME A QUESTION text overlay */}
                          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center md:bottom-4 lg:bottom-8 tablet-title ipad-title" style={{ paddingBottom: '20%', paddingTop: '10%' }}>
                            <h1 className="text-white text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2 xs:px-3 sm:px-4 text-center" style={{ fontFamily: 'Amita, serif' }}>
                              ASK ME A QUESTION
                            </h1>
                          </div>
                        </div>
                        
                        {/* Content Card - Overlapping the banner */}
                        <div 
                          className="fixed rounded-t-3xl tablet-content-card ipad-content-card"
                          style={{ 
                            backgroundColor: '#2F4C6C',
                            top: 'clamp(-100px, -10vh, -200px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100vw',
                            height: 'calc(100vh + clamp(100px, 10vh, 200px))',
                            zIndex: 10
                          }}
                        >

                          {/* Contact Form */}
                          <div className="absolute top-12 xs:top-14 sm:top-16 left-8 xs:left-12 sm:left-16 right-8 xs:right-12 sm:right-16 bottom-12 xs:bottom-14 sm:bottom-16 z-20 text-white px-2 xs:px-3 sm:px-4 overflow-y-auto scrollbar-hide pb-20">
                            <form className="space-y-0 pb-4 xs:pb-6 sm:pb-8">
                              {/* To Field */}
                              <div className="flex items-center space-x-2 xs:space-x-3 pb-3 xs:pb-4 border-b border-white/20">
                                <label className="text-sm xs:text-base font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                  To
                                </label>
                                <div className="bg-white rounded-full px-6 xs:px-8 sm:px-10 py-3 xs:py-4 w-full max-w-lg flex items-center justify-center">
                                  <span className="text-sm xs:text-base sm:text-lg text-black font-bold whitespace-nowrap text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    letstalk@thecoordinatedliving.com
                                  </span>
                                </div>
                              </div>

                              {/* Your Email Address Field */}
                              <div className="py-3 xs:py-4 border-b border-white/20">
                                <input
                                  type="email"
                                  className="w-full bg-transparent text-white placeholder-white focus:outline-none text-sm xs:text-base"
                                  placeholder="Your email address"
                                  style={{ fontFamily: 'Roboto, sans-serif' }}
                                />
                              </div>

                              {/* Subject Field */}
                              <div className="py-3 xs:py-4 border-b border-white/20">
                                <input
                                  type="text"
                                  className="w-full bg-transparent text-white placeholder-white focus:outline-none text-sm xs:text-base"
                                  placeholder="Subject"
                                  style={{ fontFamily: 'Roboto, sans-serif' }}
                                />
                              </div>

                              {/* Message Field */}
                              <div className="py-3 xs:py-4">
                                <textarea
                                  rows={4}
                                  className="w-full bg-transparent text-white placeholder-white focus:outline-none resize-none text-sm xs:text-base"
                                  placeholder="Enter message"
                                  style={{ fontFamily: 'Roboto, sans-serif' }}
                                />
                              </div>

                              {/* Send Button */}
                              <div className="flex justify-center pt-4 xs:pt-6">
                                <button
                                  type="submit"
                                  className="bg-white px-12 xs:px-16 sm:px-20 py-3 xs:py-4 rounded-full font-medium hover:bg-white/90 transition-colors text-sm xs:text-base"
                                  style={{ fontFamily: 'Roboto, sans-serif', color: '#2F4C6C' }}
                                >
                                  Send
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    ) : activeMobileItem === 'GUIDES' ? (
                                              <div className="w-full h-full flex flex-col">
                          {/* Banner Image with GUIDES text */}
                         <div className="relative w-full md:h-[600px] lg:h-[700px] tablet-banner ipad-banner" style={{ height: 'clamp(300px, 45vh, 500px)', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', position: 'absolute', top: 'calc(-50vh + 50% - clamp(150px, 22.5vh, 250px))' }}>
                          <Image
                            src="/about-me-mobile-banner-2.png"
                            alt="Guides Banner"
                            fill
                            className="object-cover"
                          />
                          {/* GUIDES text overlay */}
                          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center md:bottom-4 lg:bottom-8 tablet-title ipad-title" style={{ paddingBottom: '20%', paddingTop: '10%' }}>
                            <h1 className="text-white text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2 xs:px-3 sm:px-4 text-center" style={{ fontFamily: 'Amita, serif' }}>
                              GUIDES
                            </h1>
                          </div>
                        </div>
                        
                        {/* Content Card - Overlapping the banner */}
                        <div 
                          className="fixed rounded-t-3xl tablet-content-card ipad-content-card"
                          style={{ 
                            backgroundColor: '#2F4C6C',
                            top: 'clamp(-100px, -10vh, -200px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100vw',
                            height: 'calc(100vh + clamp(100px, 10vh, 200px))',
                            zIndex: 10
                          }}
                        >

                          {/* Content - Scrollable Container */}
                          <div 
                            className="absolute top-12 xs:top-14 sm:top-16 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 bottom-12 xs:bottom-14 sm:bottom-16 z-20 text-white px-2 xs:px-3 sm:px-4 overflow-y-auto scrollbar-hide tablet-content-container ipad-content-container pb-20"
                            style={{ 
                              maxHeight: 'calc(100vh - clamp(160px, 24vh, 260px))'
                            }}
                          >
                            {/* Title - Amita font */}
                            <div className="mb-4 xs:mb-6">
                              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold leading-tight" style={{ fontFamily: 'Amita, serif' }}>
                                Practical Guides For Your Journey
                              </h2>
                            </div>

                            {/* Body content - Roboto font */}
                            <div className="space-y-4 xs:space-y-6 text-sm xs:text-base leading-relaxed pb-20 xs:pb-32" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              <p>
                                Explore these resources to experience His abounding grace as you navigate specific scenes of life and grow in faith.
                              </p>
                              
                              {/* View Our Guides Button */}
                              <div className="flex justify-center pt-6 xs:pt-8">
                                <button
                                  className="bg-white px-8 xs:px-10 sm:px-12 py-3 xs:py-4 rounded-full font-medium hover:bg-white/90 transition-colors text-sm xs:text-base"
                                  style={{ fontFamily: 'Roboto, sans-serif', color: '#2F4C6C' }}
                                >
                                  View Our Guides
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : activeMobileItem === 'TERMS AND CONDITIONS' ? (
                                              <div className="w-full h-full flex flex-col">
                          {/* Banner Image with TERMS AND CONDITIONS text */}
                         <div className="relative w-full md:h-[600px] lg:h-[700px] tablet-banner ipad-banner" style={{ height: 'clamp(300px, 45vh, 500px)', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', position: 'absolute', top: 'calc(-50vh + 50% - clamp(150px, 22.5vh, 250px))' }}>
                          <Image
                            src="/about-me-mobile-banner-2.png"
                            alt="Terms And Conditions Banner"
                            fill
                            className="object-cover"
                          />
                          {/* TERMS AND CONDITIONS text overlay */}
                          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center md:bottom-4 lg:bottom-8 tablet-title ipad-title" style={{ paddingBottom: '20%', paddingTop: '10%' }}>
                            <h1 className="text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold px-2 xs:px-3 sm:px-4 text-center" style={{ fontFamily: 'Amita, serif' }}>
                              TERMS AND CONDITIONS
                            </h1>
                          </div>
                        </div>
                        
                        {/* Content Card - Overlapping the banner */}
                        <div 
                          className="fixed rounded-t-3xl tablet-content-card ipad-content-card"
                          style={{ 
                            backgroundColor: '#2F4C6C',
                            top: 'clamp(-100px, -10vh, -200px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100vw',
                            height: 'calc(100vh + clamp(100px, 10vh, 200px))',
                            zIndex: 10
                          }}
                        >

                          {/* Content - Scrollable Container */}
                          <div 
                            className="absolute top-12 xs:top-14 sm:top-16 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 bottom-12 xs:bottom-14 sm:bottom-16 z-20 text-white px-2 xs:px-3 sm:px-4 overflow-y-auto scrollbar-hide tablet-content-container ipad-content-container pb-20"
                            style={{ 
                              maxHeight: 'calc(100vh - clamp(160px, 24vh, 260px))'
                            }}
                          >
                            {/* Title - Amita font */}
                            <div className="mb-4 xs:mb-6">
                              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold leading-tight" style={{ fontFamily: 'Amita, serif' }}>
                                Welcome to The Coordinated Living!
                              </h2>
                            </div>

                            {/* Body content - Roboto font */}
                            <div className="space-y-4 xs:space-y-6 text-sm xs:text-base leading-relaxed pb-20 xs:pb-32" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              <p>
                                <strong>Welcome to The Coordinated Living!</strong>
                              </p>
                              <p>
                                These terms and conditions outline the rules and regulations for the use of the Website, located at{' '}
                                <a href="https://thecoordinatedliving.com/" className="underline font-bold text-white" target="_blank" rel="noopener noreferrer">
                                  https://thecoordinatedliving.com/
                                </a>
                              </p>
                              <p>
                                The Terms and Conditions on this webpage, as may without notice, be amended from time to time, shall apply to all our services directly or indirectly (through our authorized agents and sub-agents) made available online, any mobile device, by email or by telephone, as well as any other electronic media.
                              </p>
                              <p>
                                By accessing, browsing and using our website or any of our platform (hereafter collectively referred to as the &quot;website&quot;) and/or by completing a booking, you recognize and agree to have read, understood and agreed to the terms and conditions, including the privacy statement as set out below. You must NOT use this website if you disagree with any of the Terms and Conditions as stated below.
                              </p>
                              <p>
                                The pages, content and set-up of these pages, and the services provided on these pages and through the website are owned, operated and provide by THE COORDINATE LIVING (hereinafter referred to as IKOORDINATE) and are provided for your personal, non-commercial use only, subject to the terms and conditions set out below.
                              </p>
                              <p>
                                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this website and compliant to the Company&apos;s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client&apos;s needs in respect of provision of the Company&apos;s stated services, in accordance with and subject to, prevailing law of Ghana. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                              </p>
                              <p>
                                IKOORDINATE reserves the right to modify all information, including Terms and Conditions, as well as all other features at any time without giving you prior notice. Your use of this website following any modifications constitutes your agreement to follow and be bound by the Terms and Conditions as modified.
                              </p>

                              <FullTermsContent />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : activeMobileItem === 'JOIN OUR CHANNEL' ? (
                                              <div className="w-full h-full flex flex-col">
                          {/* Banner Image with JOIN OUR CHANNEL text */}
                         <div className="relative w-full md:h-[600px] lg:h-[700px] tablet-banner ipad-banner" style={{ height: 'clamp(300px, 45vh, 500px)', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', position: 'absolute', top: 'calc(-50vh + 50% - clamp(150px, 22.5vh, 250px))' }}>
                          <Image
                            src="/about-me-mobile-banner-2.png"
                            alt="Join Our Channel Banner"
                            fill
                            className="object-cover"
                          />
                          {/* CHANNEL text overlay */}
                          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center md:bottom-4 lg:bottom-8 tablet-title ipad-title" style={{ paddingBottom: '20%', paddingTop: '10%' }}>
                            <h1 className="text-white text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2 xs:px-3 sm:px-4 text-center" style={{ fontFamily: 'Amita, serif' }}>
                              CHANNEL
                            </h1>
                          </div>
                        </div>
                        
                        {/* Content Card - Overlapping the banner */}
                        <div 
                          className="fixed rounded-t-3xl tablet-content-card ipad-content-card"
                          style={{ 
                            backgroundColor: '#2F4C6C',
                            top: 'clamp(-100px, -10vh, -200px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100vw',
                            height: 'calc(100vh + clamp(100px, 10vh, 200px))',
                            zIndex: 10
                          }}
                        >

                          {/* Content - Scrollable Container */}
                          <div 
                            className="absolute top-12 xs:top-14 sm:top-16 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 bottom-12 xs:bottom-14 sm:bottom-16 z-20 text-white px-2 xs:px-3 sm:px-4 overflow-y-auto scrollbar-hide tablet-content-container ipad-content-container pb-20"
                            style={{ 
                              maxHeight: 'calc(100vh - clamp(160px, 24vh, 260px))'
                            }}
                          >
                            {/* Body content - Roboto font */}
                            <div className="space-y-4 xs:space-y-6 text-sm xs:text-base leading-relaxed pb-20 xs:pb-32" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              <p>
                                Are you longing for an in-depth exploration of God&apos;s Word and its application to the complexities of life? Our videos, delivered through an exclusive paid WhatsApp channel, provide detailed teaching and deeper insights. Join our community to journey further into understanding how His grace abounds even in the most profound changing scenes of life and cultivate an intimate relationship with the Lord.
                              </p>
                              
                              {/* Join Channel Button */}
                              <div className="flex justify-center pt-8">
                                <button 
                                  className="flex items-center space-x-3 px-8 py-3 bg-white hover:bg-gray-100 font-bold rounded-full transition-colors duration-200 shadow-lg"
                                  style={{ color: '#2F4C6C' }}
                                  onClick={handleJoinChannelClick}
                                >
                                  <Image
                                    src="/whatsapp-mobile.svg"
                                    alt="WhatsApp Icon"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                  />
                                  <span className="text-sm xs:text-base">Join Channel</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : activeMobileItem === 'POUR INTO MY CUP' ? (
                                              <div className="w-full h-full flex flex-col">
                          {/* Banner Image with POUR INTO MY CUP text */}
                         <div className="relative w-full md:h-[600px] lg:h-[700px] tablet-banner ipad-banner" style={{ height: 'clamp(300px, 45vh, 500px)', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', position: 'absolute', top: 'calc(-50vh + 50% - clamp(150px, 22.5vh, 250px))' }}>
                          <Image
                            src="/about-me-mobile-banner-2.png"
                            alt="Pour Into My Cup Banner"
                            fill
                            className="object-cover"
                          />
                          {/* POUR INTO MY CUP text overlay */}
                          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center md:bottom-4 lg:bottom-8 tablet-title ipad-title" style={{ paddingBottom: '20%', paddingTop: '10%' }}>
                            <h1 className="text-white text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2 xs:px-3 sm:px-4 text-center" style={{ fontFamily: 'Amita, serif' }}>
                              POUR INTO MY CUP
                            </h1>
                          </div>
                        </div>
                        
                        {/* Content Card - Overlapping the banner */}
                        <div 
                          className="fixed rounded-t-3xl tablet-content-card ipad-content-card"
                          style={{ 
                            backgroundColor: '#2F4C6C',
                            top: 'clamp(-100px, -10vh, -200px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100vw',
                            height: 'calc(100vh + clamp(100px, 10vh, 200px))',
                            zIndex: 10
                          }}
                        >

                          {/* Content - Scrollable Container */}
                          <div 
                            className="absolute top-12 xs:top-14 sm:top-16 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 bottom-12 xs:bottom-14 sm:bottom-16 z-20 text-white px-2 xs:px-3 sm:px-4 overflow-y-auto scrollbar-hide tablet-content-container ipad-content-container pb-20"
                            style={{ 
                              maxHeight: 'calc(100vh - clamp(160px, 24vh, 260px))'
                            }}
                          >
                            {/* Title - Amita font */}
                            <div className="mb-4 xs:mb-6">
                              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold leading-tight" style={{ fontFamily: 'Amita, serif' }}>
                                A Cheerful Gift, A Full Cup
                              </h2>
                            </div>

                            {/* Body content - Roboto font */}
                            <div className="space-y-4 xs:space-y-6 text-sm xs:text-base leading-relaxed pb-20 xs:pb-32" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              <p>
                                Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform. Thank you for your kindness!
                              </p>
                              
                              {/* Pour Into My Cup Button */}
                              <div className="flex justify-center pt-8">
                                <button 
                                  className="flex items-center space-x-3 px-8 py-3 bg-white hover:bg-gray-100 font-bold rounded-full transition-colors duration-200 shadow-lg"
                                  style={{ color: '#2F4C6C' }}
                                  onClick={handlePourIntoCupClick}
                                >
                                  <Image
                                    src="/pour-tab-mobile.svg"
                                    alt="Pour Into My Cup Icon"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                  />
                                  <span className="text-sm xs:text-base">Pour Into My Cup</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : activeMobileItem === 'ABOUT ME' ? (
                                              <div className="w-full h-full flex flex-col">
                          {/* Banner Image with ABOUT ME text */}
                         <div className="relative w-full md:h-[600px] lg:h-[700px] tablet-banner ipad-banner" style={{ height: 'clamp(300px, 45vh, 500px)', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', position: 'absolute', top: 'calc(-50vh + 50% - clamp(150px, 22.5vh, 250px))' }}>
                          <Image
                            src="/about-me-mobile-banner-2.png"
                            alt="About Me Banner"
                            fill
                            className="object-cover"
                          />
                          {/* ABOUT ME text overlay */}
                          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center md:bottom-4 lg:bottom-8 tablet-title ipad-title" style={{ paddingBottom: '20%', paddingTop: '10%' }}>
                            <h1 className="text-white text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2 xs:px-3 sm:px-4 text-center" style={{ fontFamily: 'Amita, serif' }}>
                              Welcome
                            </h1>
                          </div>
                        </div>
                        
                        {/* Content Card - Overlapping the banner */}
                        <div 
                          className="fixed rounded-t-3xl tablet-content-card ipad-content-card"
                          style={{ 
                            backgroundColor: '#2f4c6c',
                            top: 'clamp(-100px, -10vh, -200px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100vw',
                            height: 'calc(100vh + clamp(100px, 10vh, 200px))',
                            zIndex: 10
                          }}
                        >
                          {/* Header Logo - Top Left */}
                          <div className="absolute top-4 left-4 z-20">
                            <Image
                              src="/about-me-mobile-header.png"
                              alt="About Me Header Logo"
                              width={120}
                              height={60}
                              className="object-contain"
                            />
                          </div>

                          {/* Content - Scrollable Container */}
                          <div 
                            className="absolute top-20 xs:top-24 sm:top-28 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 bottom-12 xs:bottom-14 sm:bottom-16 z-20 text-white px-2 xs:px-3 sm:px-4 overflow-y-auto scrollbar-hide tablet-content-container-with-logo ipad-content-container-with-logo pb-20"
                            style={{ 
                              maxHeight: 'calc(100vh - clamp(160px, 24vh, 260px))'
                            }}
                          >
                            {/* Hello text - Amita font */}
                            <h2 className="text-2xl mb-4" style={{ fontFamily: 'Amita, serif' }}>
                              Hello,
                            </h2>

                            {/* Body content - Roboto font */}
                            <div className="space-y-4 xs:space-y-6 text-sm xs:text-base leading-relaxed pb-20 xs:pb-32" style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#2f4c6c', padding: '16px', borderRadius: '8px' }}>
                              <p>
                                Have you ever felt caught in a cycle of desires, wondering if there&apos;s more to life than this constant pull? In a world where truth often feels twisted, you&apos;re not alone.
                              </p>
                              
                              <p>
                                My name is Lesley, and like you, I&apos;ve navigated these challenging times through my journey and calling. I&apos;m now honored to serve you by sharing the Word of God. I welcome you to this space, a place where we seek &apos;the coordinated living&apos; - aligning our lives with God&apos;s Word and His purpose. Our goal is to be the sheep of His pasture, finding guidance, nourishment, and belonging within His fold.
                              </p>
                              
                              <p>
                                I believe that living the identity the Lord created for us in Christ is essential, and through teachings and reflections on His Word, we will explore what that may look like for each of us. Ultimately, we trust in the Father to guide us in living out that unique identity He has given each of us in Christ. He has blessed us with the presence of the Holy Spirit, our guide to navigate this. This is our confidence.
                              </p>
                              
                              <p>
                                I look forward to serving you through the tasks assigned to me. You&apos;re loved, cared for, and provided for. I invite you to explore the resources here and join our community as we learn and grow together in His grace.
                              </p>
                              
                              {/* Signature - Amita font */}
                              <div className="mt-8 mb-8">
                                <p className="text-sm mb-2 text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>Signed</p>
                                <p className="text-xl text-white" style={{ fontFamily: 'Amita, serif' }}>Lesley.</p>
                              </div>

                              {/* Email section */}
                              <div className="mt-8 mb-16">
                                {/* Thin horizontal line */}
                                <div className="w-full h-px bg-white mb-4"></div>
                                
                                {/* Email address - centered */}
                                <div className="text-center">
                                  <p className="text-sm text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    letstalk@thecoordinatedliving.com
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                                              <div className="w-full h-full flex flex-col">
                          {/* Banner Image with POST text */}
                         <div className="relative w-full md:h-[600px] lg:h-[700px] tablet-banner ipad-banner" style={{ height: 'clamp(300px, 45vh, 500px)', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', position: 'absolute', top: 'calc(-50vh + 50% - clamp(150px, 22.5vh, 250px))' }}>
                          <Image
                            src="/about-me-mobile-banner-2.png"
                            alt="Post Banner"
                            fill
                            className="object-cover"
                          />
                          {/* POST text overlay */}
                          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center md:bottom-4 lg:bottom-8 tablet-title ipad-title" style={{ paddingBottom: '20%', paddingTop: '10%' }}>
                            <h1 className="text-white text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2 xs:px-3 sm:px-4 text-center" style={{ fontFamily: 'Amita, serif' }}>
                              POST
                            </h1>
                          </div>
                        </div>
                        
                        {/* Content Card - Overlapping the banner */}
                        <div 
                          className="fixed rounded-t-3xl tablet-content-card ipad-content-card"
                          style={{ 
                            backgroundColor: '#2F4C6C',
                            top: 'clamp(-100px, -10vh, -200px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100vw',
                            height: 'calc(100vh + clamp(100px, 10vh, 200px))',
                            zIndex: 10
                          }}
                        >

                          {/* Header Logo - Top Left */}
                          <div className="absolute top-4 left-4 z-20">
                            <Image
                              src="/about-me-mobile-header.png"
                              alt="Post Header Logo"
                              width={120}
                              height={60}
                              className="object-contain"
                            />
                          </div>

                          {/* Content - Scrollable Container */}
                          <div 
                            className="absolute top-20 xs:top-24 sm:top-28 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 bottom-12 xs:bottom-14 sm:bottom-16 z-20 text-white px-2 xs:px-3 sm:px-4 overflow-y-auto scrollbar-hide tablet-content-container-with-logo ipad-content-container-with-logo pb-20"
                            style={{ 
                              maxHeight: 'calc(100vh - clamp(160px, 24vh, 260px))'
                            }}
                          >
                            {/* Body content - Roboto font */}
                            <div className="space-y-4 xs:space-y-6 text-sm xs:text-base leading-relaxed pb-20 xs:pb-32" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              <p className="italic">
                                &quot;A thousand times I failed, still your mercy remains, should I stumble out here still I&apos;m caught in your grace.&quot; This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today
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
                              
                              {/* Click Animation Lottie */}
                              {clickAnimation && (
                                <div className="flex justify-end items-center mt-6 pr-4">
                                  <Lottie
                                    animationData={clickAnimation}
                                    loop={true}
                                    autoplay={true}
                                    style={{ width: '80px', height: '80px' }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Smoke Effects for Coffee Cup */}
                </div>
                
              </div>
              

            </div>

            {/* Floating Tab Bar - Mobile, Tablet & iPad */}
            <div 
              ref={floatingTabRef}
              className="xl:hidden fixed left-1/2 transform -translate-x-1/2 z-[99999] floating-tab-container" 
              style={{ 
                bottom: 'max(120px, env(safe-area-inset-bottom, 0px) + 60px)',
                paddingBottom: 'env(safe-area-inset-bottom, 0px)'
              }}
            >
              <div 
                ref={tabContainerRef}
                className="flex items-center space-x-2 px-4 py-3 rounded-full overflow-x-auto scrollbar-hide tab-bar-scroll"
                style={{
                  width: 'clamp(320px, 50vw, 500px)', // Responsive width for different screen sizes
                  maxWidth: '90vw',
                  backgroundColor: '#ffffff'
                }}
              >
                {mobileItems.map((item, index) => {
                  const isActive = activeMobileItem === item;
                  const iconMap = {
                    'ABOUT ME': (
                      <Image
                        src="/about-tab.svg"
                        alt="About Me"
                        width={24}
                        height={24}
                        className={`w-6 h-6 md:w-7 md:h-7 tab-icon ${isActive ? 'active' : ''}`}
                      />
                    ),
                    'POST': (
                      <Image
                        src="/post-tab.svg"
                        alt="Post"
                        width={24}
                        height={24}
                        className={`w-6 h-6 md:w-7 md:h-7 tab-icon ${isActive ? 'active' : ''}`}
                      />
                    ),
                    'ASK ME A QUESTION': (
                      <Image
                        src="/ask-me-tab.svg"
                        alt="Ask Me A Question"
                        width={24}
                        height={24}
                        className={`w-6 h-6 md:w-7 md:h-7 tab-icon ${isActive ? 'active' : ''}`}
                      />
                    ),
                    'JOIN OUR CHANNEL': (
                      <Image
                        src="/join-channel-tab.svg"
                        alt="Join Our Channel"
                        width={24}
                        height={24}
                        className={`w-6 h-6 md:w-7 md:h-7 tab-icon ${isActive ? 'active' : ''}`}
                      />
                    ),
                    'GUIDES': (
                      <Image
                        src="/guides-tab.svg"
                        alt="Guides"
                        width={24}
                        height={24}
                        className={`w-6 h-6 md:w-7 md:h-7 tab-icon ${isActive ? 'active' : ''}`}
                      />
                    ),
                    'POUR INTO MY CUP': (
                      <Image
                        src="/donation-tab.svg"
                        alt="Pour Into My Cup"
                        width={24}
                        height={24}
                        className={`w-6 h-6 md:w-7 md:h-7 tab-icon ${isActive ? 'active' : ''}`}
                      />
                    ),
                    'TERMS AND CONDITIONS': (
                      <Image
                        src="/terms-tab.svg"
                        alt="Terms And Conditions"
                        width={24}
                        height={24}
                        className={`w-6 h-6 md:w-7 md:h-7 tab-icon ${isActive ? 'active' : ''}`}
                      />
                    )
                  };

                  return (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveMobileItem(item);
                        setCurrentMobileIndex(index);
                        // Auto-scroll to the clicked tab
                        setTimeout(() => scrollToActiveTab(index), 100);
                      }}
                      onTouchStart={(e) => {
                        // Prevent default touch behavior that might interfere
                        e.stopPropagation();
                      }}
                      onTouchEnd={(e) => {
                        // Handle touch end to ensure click is registered
                        e.stopPropagation();
                        setActiveMobileItem(item);
                        setCurrentMobileIndex(index);
                        // Auto-scroll to the clicked tab
                        setTimeout(() => scrollToActiveTab(index), 100);
                      }}
                      className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'text-[#2F4C6C]' 
                          : 'text-[#2F4C6C] hover:text-[#2F4C6C] hover:bg-gray-100 hover:bg-opacity-50'
                      }`}
                      style={{
                        width: 'clamp(52px, 8vw, 64px)', // Responsive tab size
                        height: 'clamp(52px, 8vw, 64px)', // Responsive tab size
                        flexShrink: 0, // Prevent tabs from shrinking
                        backgroundColor: isActive ? 'rgba(47, 76, 108, 0.05)' : 'transparent',
                        border: isActive ? '1px solid rgba(47, 76, 108, 0.05)' : '1px solid transparent',
                        // Ensure proper touch handling on mobile
                        touchAction: 'manipulation',
                        WebkitTapHighlightColor: 'transparent'
                      }}
                    >
                      {iconMap[item as keyof typeof iconMap]}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
          
          
          {/* Lesley Letter Overlay - Visible on all devices */}
          {showLesleyLetter && (
            <div className="fixed inset-0 z-[9999]">
              {/* Glass background blur - more transparent */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
                onClick={handleCloseLesleyLetter}
              />
              
              {/* Return to Desk button - top left */}
              <button
                onClick={handleCloseLesleyLetter}
                className="absolute top-6 left-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer return-desk-glow"
              >
                Go Back
              </button>
              
              {/* Letter content - centered */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative z-10 max-w-xl w-full">
                  {/* SVG Letter */}
                  <div 
                    className="w-full flex justify-center opacity-0"
                    data-lesley-letter
                    ref={(el) => {
                      if (el) {
                        gsap.fromTo(el, 
                          { 
                            opacity: 0, 
                            y: 60,
                            scale: 0.9
                          },
                          { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1,
                            duration: 1.4,
                            ease: "power2.out",
                            delay: 0.3
                          }
                        );
                      }
                    }}
                  >
                    <Image
                      src="/lesley.svg"
                      alt="Lesley's Letter"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain hidden xl:block"
                      priority
                    />
                    <Image
                      src="/lesley-mobile.svg"
                      alt="Lesley's Letter"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain xl:hidden"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop Content - Hidden on Mobile and Tablets */}
          <div className="hidden xl:block">
         

          {/* <div style={{
           position: 'absolute',
           top: 0,
           bottom: 0,
           left: 0,
           right: 0,
           marginLeft: 0,
           paddingLeft: 0,
           zIndex: 1,
          }} >
           <div style={{
            position: 'absolute',
            top: '65%',
            right: 0,
            height: '15%',
            width: '30%',
            zIndex: 3,


           }}></div>
          </div> */}

          {/* Laptop Glow - positioned behind iframe */}
          <div
            className="absolute pointer-events-none laptop-glow-animation laptop-pulse-glow"
            style={{ 
              left: '47.2vw',
              top: isUltraWide ? '60vh' : '38.4vw',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              width: '25vw',
              height: '13vw',
              filter: 'blur(6px)',
              opacity: 0.4,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                background: 'linear-gradient(45deg, rgba(53, 178, 194, 1) 0%, rgba(53, 178, 194, 0.9) 20%, rgba(53, 178, 194, 0.7) 40%, rgba(53, 178, 194, 0.5) 60%, rgba(53, 178, 194, 0.3) 80%, rgba(53, 178, 194, 0.1) 100%)',
                boxShadow: '0 0 30px rgba(53, 178, 194, 1), 0 0 60px rgba(53, 178, 194, 0.8), 0 0 90px rgba(53, 178, 194, 0.6), 0 0 120px rgba(53, 178, 194, 0.4)',
              }}
            />
          </div>

          {/* Laptop iframe overlay */}
          <div
            ref={laptopRef}
            className="absolute cursor-pointer laptop-iframe inset-0"
            style={isUltraWide ? {
              top: '60vh',
              right: '0',
              bottom: '0',
              left: '47.2vw'
            } : {}}
            onClick={(e) => {
              // Don't zoom if clicking on the iframe content
              if (e.target !== e.currentTarget) {
                return;
              }

              if (!laptopZoomed) {
                // Camera zoom in - scale and move the entire experience view toward laptop
                gsap.to(experienceRef.current, {
                  scale: 3,
                  x: '0%',
                  y: '-45%',
                  duration: 1.5,
                  ease: 'power2.inOut',
                  zIndex: 20,
                  onComplete: () => {
                    setLaptopZoomed(true);
                    // Navigate to full Windows page when zoom completes
                    window.location.href = '/windows';
                  }
                });
              } else {
                // Camera zoom out - return to original view
                gsap.to(experienceRef.current, {
                  scale: 1,
                  x: '0%',
                  y: '0%',
                  duration: 1.5,
                  ease: 'power2.inOut',
                  zIndex: 1,
                });
                setLaptopZoomed(false);
              }
            }}
          >
            <iframe
              src="/windows?lockscreen=true"
              style={{
                width: '77vw',
                height: isUltraWide ? '48vw' : '40vw',
                border: 'none',
                borderRadius: '0',
                backgroundColor: 'transparent',
                transform: 'scale(0.3)',
                transformOrigin: 'center center',
                position: 'absolute',
                top: isUltraWide ? '-18vw' : '-13.5vw',
                left: '-25.8vw',
                pointerEvents: laptopZoomed ? 'auto' : 'none',
                cursor: 'pointer',
                
              }}
              onLoad={() => {
                // Ensure iframe doesn't capture keyboard events when zoomed
                if (laptopZoomed) {
                  const iframe = document.querySelector('iframe');
                  if (iframe && iframe.contentWindow) {
                    try {
                      iframe.contentWindow.focus();
                    } catch (e) {
                      console.log('Could not focus iframe:', e);
                    }
                  }
                }
              }}
              onKeyDown={(e) => {
                // Prevent iframe from capturing ESC key
                if (e.key === 'Escape') {
                  e.preventDefault();
                  e.stopPropagation();
                  document.body.focus();
                }
              }}
            />
          </div>







                    {/* Letter Glow - positioned relative to letter */}
          <div
            className="absolute pointer-events-none letter-glow-animation"
            style={{ 
              left: isUltraWide ? '72vw' : '73vw',
              top: isUltraWide ? '82vh' : '50vw',
              transform: 'translate(-50%, -50%) rotate(-95deg) skewY(-57deg)',
              zIndex: 1,
              width: '8vw',
              height: '16vw',
              filter: 'blur(12px)',
              opacity: 0.7,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                clipPath: 'polygon(12% 30%, 85% 22%, 95% 82%, 22% 90%)',
                background: 'linear-gradient(45deg, rgba(36, 129, 194, 1) 0%, rgba(36, 129, 194, 1) 15%, rgba(36, 129, 194, 0.9) 30%, rgba(36, 129, 194, 0.7) 50%, rgba(36, 129, 194, 0.5) 70%, rgba(36, 129, 194, 0.2) 85%, rgba(36, 129, 194, 0) 100%)',
                boxShadow: '0 0 25px rgba(36, 129, 194, 1), 0 0 50px rgba(36, 129, 194, 0.9), 0 0 75px rgba(36, 129, 194, 0.7), 0 0 100px rgba(36, 129, 194, 0.5)',
              }}
            />
          </div>

          {/* Letter clip-path overlay */}
          <div
            className="absolute cursor-pointer letter-pulse-glow letter-clip-path inset-0"
            onClick={() => {
              console.log('Letter clicked!');
              setShowLesleyLetter(true);
              // Remove setIsLetterLoaded(false)
            }}
          />
          {/* cup- clippath */}
          <div
            className="absolute group cup-element"
            style={{ 
              right: '14vw', 
              top: isUltraWide ? '25vh' : '34vw', 
              width: '7vw', 
              height: '11vh', 
              zIndex: 10 
            }}
          >
            <div
              className="cursor-pointer cup-glow heartbeat cup-float cup-hover-glow w-full h-full "
              style={{
                filter: 'blur(2px)',
              }}
              onClick={() => setShowFumaaModal(true)}
            />
            {/* Smoke Images */}
            {!showFumaaModal && (
              <>
                <div
                  className="absolute inset-0 pointer-events-none flex items-center justify-center smoke-container"
                  style={{ zIndex: 1, top: '-110%', left: '-15%' }}
                >
                  <Image
                    src="/smoke.png"
                    alt="Smoke"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain smoke-animation"
                  />
                </div>
                <div
                  className="absolute inset-0 pointer-events-none flex items-center justify-center smoke-container"
                  style={{ zIndex: 1, top: '-110%', left: '-15%' }}
                >
                  <Image
                    src="/smoke.png"
                    alt="Smoke"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain smoke-animation2"
                  />
                </div>
                <div
                  className="absolute inset-0 pointer-events-none flex items-center justify-center smoke-container"
                  style={{ zIndex: 1, top: '-110%', left: '-15%' }}
                >
                  <Image
                    src="/smoke.png"
                    alt="Smoke"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain smoke-animation3"
                  />
                </div>
              </>
            )}
          </div>
          {/* phone- clippath */}
          <div
            className="absolute phone-pulse-glow phone-yellow-glow group cursor-pointer phone-element"
            style={{ 
              left: '18vw', 
              top: isUltraWide ? '75vh' : '45vw', 
              width: '8vw', 
              height: '8vw', 
              zIndex: 2,
              // backgroundColor:'red'
             
            }}
            onClick={() => {
              console.log('Phone clicked!');
              setShowVideos(true);
            }}
          >
            {/* Phone Glow - inside clip path container */}
            <div
              className="absolute pointer-events-none phone-glow-animation"
              style={{ 
                left: '2vw', 
                top: '0vw', 
                width: '8vw', 
                height: '8vw',
                zIndex: -1,
                filter: 'blur(12px)',
                opacity: 0.7,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: '8vw',
                  height: '3vw',
                  borderRadius: '50% 50% 0 0',
                  background: 'linear-gradient(67.04deg, rgba(255, 255, 0, 1) 0%, rgba(255, 255, 0, 0.9) 15%, rgba(255, 255, 0, 0.7) 30%, rgba(255, 255, 0, 0.5) 50%, rgba(255, 255, 0, 0.3) 70%, rgba(255, 255, 0, 0.1) 85%, rgba(255, 255, 0, 0) 100%)',
                  boxShadow: '0 0 25px rgba(255, 255, 0, 0.9), 0 0 50px rgba(255, 255, 0, 0.7), 0 0 75px rgba(255, 255, 0, 0.5), 0 0 100px rgba(255, 255, 0, 0.3)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)',
                }}
              />
            </div>
            <div
              className="cursor-pointer w-full h-full"
              style={{
                borderRadius: '50% 50% 0 0',
              }}
            
            />
          </div>

          {/* New Post Design - Left of Noticeboard */}
          <div
            className="absolute notice-post-left"
            style={{ 
              left: '38.5vw', 
              top: isUltraWide ? '20vh' : '30vh', 
              transform: 'translate(-50%, -50%)',
              width: '15vw', 
              height: '21vw', // Scaled up A4 ratio (1:1.414)
              zIndex: 2,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                position: 'relative',
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >

                             {/* Pin for left middle image */}
               <div style={{
                 position: 'absolute',
                 top: 'calc(50% - 75px)',
                 left: '50%',
                 transform: 'translateX(-50%)',
                 zIndex: 3,
               }}>
                 <Image
                   src="/notice-pin-new.svg"
                   alt="Notice Pin"
                   width={20}
                   height={20}
                   className="w-5 h-5"
                 />
               </div>
               <Image
                 src="/main-pic-right.svg"
                 alt="Main Picture"
                 width={200}
                 height={200}
                 className="w-1/2 h-1/2 object-contain"
                 style={{
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   transform: 'translate(-50%, -50%)',
                 }}
               />
               <Image
                 src="/post-1-left.png"
                 alt="Post 1 Left"
                 width={100}
                 height={100}
                 style={{
                   position: 'absolute',
                   top: '0%',
                   left: '-1%',
                   width: '25%',
                   height: '20%',
                   objectFit: 'cover',
                 }}
               />
               <Image
                 src="/post-left-2.png"
                 alt="Post Left 2"
                 width={100}
                 height={100}
                 style={{
                   position: 'absolute',
                   bottom: '0%',
                   right: '-1%',
                   width: '30%',
                   height: '20%',
                   objectFit: 'cover',
                 }}
               />
               <Image
                 src="/smaller-left-2.svg"
                 alt="Smaller Left"
                 width={100}
                 height={100}
                 style={{
                   position: 'absolute',
                   top: '-3%',
                   right: '-7%',
                   width: '40%',
                   height: '35%',
                   objectFit: 'contain',
                 }}
               />
               <Image
                 src="/Shorter-verse-left-2.svg"
                 alt="Shorter Verse"
                 width={100}
                 height={100}
                 style={{
                   position: 'absolute',
                   bottom: '-3%',
                   left: '-7%',
                   width: '35%',
                   height: '30%',
                   objectFit: 'contain',
                 }}
               />
            </div>
          </div>

          {/* New Post Design - Center of Noticeboard */}
          <div
            className="absolute white-notice-glow notice-post"
            style={{ 
              left: '53.5vw', 
              top: isUltraWide ? '20vh' : '30vh', 
              transform: 'translate(-50%, -50%)',
              width: '10vw', 
              height: '14vw', // A4 ratio (1:1.414)
              zIndex: 2,
            }}
          >
            {/* Pin at the top */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
              }}
            >
              <Image
                src="/notice-pin-new.svg"
                alt="Notice Pin"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <div
              className="w-full h-full cursor-pointer"
              style={{
                background: 'white', // Same white as background
                position: 'relative',
                overflow: 'hidden',
                border: '8px solid white',
                padding: '16px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }}
              onClick={() => {
                console.log('New post design clicked!');
                if (!postsLoading) {
                  setShowPostModal(true);
                }
              }}
            >
              {/* Circular Logo */}
              <div
                style={{
                  position: 'absolute',
                  top: '-12%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '45%',
                  height: '45%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src="/post-logo-new.svg"
                  alt="Coordinated Living Logo"
                  width={225}
                  height={225}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Main Text */}
              <div
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  color: 'black',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 'normal',
                  fontSize: '0.4vw',
                  lineHeight: '1.6',
                  width: '85%',
                  maxHeight: '65%',
                  overflow: 'visible',
                }}
              >
                A thousand times I failed, still your mercy remains, should I stumble out here still I&apos;m caught in your grace.&quot; This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today
                <br /><br />
                For years, I pursued other paths, pouring tireless effort into fields he hadn&apos;t called me to, only to find no lasting fruit. That rollercoaster of emotions, the unpleasant experiences, the endless accusations and judgments thrown around – they&apos;re hallmarks of a mind out of alignment.........
              </div>




            </div>
          </div>

          {/* New Post Design - Right of Noticeboard */}
          <div
            className="absolute notice-post-right"
            style={{ 
              left: '68.5vw', 
              top: isUltraWide ? '20vh' : '30vh', 
              transform: 'translate(-50%, -50%)',
              width: '15vw', 
              height: '21vw', // Scaled up A4 ratio (1:1.414)
              zIndex: 2,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                position: 'relative',
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                             {/* Pin for right middle image */}
               <div style={{
                 position: 'absolute',
                 top: 'calc(50% - 75px)',
                 left: '50%',
                 transform: 'translateX(-50%)',
                 zIndex: 3,
               }}>
                 <Image
                   src="/notice-pin-new.svg"
                   alt="Notice Pin"
                   width={20}
                   height={20}
                   className="w-5 h-5"
                 />
               </div>
               {/* Middle Image */}
               <Image
                 src="/right-middle-post.png"
                 alt="Right Middle Post"
                 width={200}
                 height={200}
                 className="w-1/2 h-1/2 object-contain"
                 style={{
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   transform: 'translate(-50%, -50%)',
                 }}
               />
               {/* Bottom-left Quote Card (opposite of left A4's top-left) */}
               <Image
                 src="/his-grace.png"
                 alt="His Grace"
                 width={100}
                 height={100}
                 style={{
                   position: 'absolute',
                   bottom: '0%',
                   left: '-1%',
                   width: '25%',
                   height: '20%',
                   objectFit: 'cover',
                 }}
               />
               {/* Top-right Quote Card (opposite of left A4's bottom-right) */}
               <Image
                 src="/do-everything.png"
                 alt="Do Everything"
                 width={100}
                 height={100}
                 style={{
                   position: 'absolute',
                   top: '0%',
                   right: '-1%',
                   width: '30%',
                   height: '20%',
                   objectFit: 'cover',
                 }}
               />
               {/* Bottom-right Round Sticker (opposite of left A4's top-right) */}
               <Image
                 src="/smaller-left.svg"
                 alt="Smaller Left"
                 width={100}
                 height={100}
                 style={{
                   position: 'absolute',
                   bottom: '-3%',
                   right: '-7%',
                   width: '40%',
                   height: '35%',
                   objectFit: 'contain',
                 }}
               />
               {/* Top-left Letter (opposite of left A4's bottom-left) */}
               <Image
                 src="/Shorter-verse.svg"
                 alt="Shorter Verse"
                 width={100}
                 height={100}
                 style={{
                   position: 'absolute',
                   top: '-3%',
                   left: '-7%',
                   width: '35%',
                   height: '30%',
                   objectFit: 'contain',
                 }}
               />
            </div>
          </div>





















          {/* Polaroid Collage Clip Path - Hidden for now */}
          {/*
          <div
            className="absolute"
            style={{
              left: '55vw',
              top: '42vh',
              width: '8vw',
              height: '10vh',
              zIndex: 2,
              transform: 'rotate(3deg)',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => {
                console.log('Polaroid collage clicked!');
              }}
            >
              <Image
                src="/Polaroid-collage.svg"
                alt="Polaroid Collage"
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
          */}


          <style jsx>{`
              .letter-glow {
                /* Removed glow effect to make clip path invisible */
              }
              
              .cup-glow {
                animation: cupPulse 2.5s ease-in-out infinite;
              }
              
              @keyframes cupPulse {
                0% {
                  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1);
                }
                50% {
                  box-shadow: 0 0 25px rgba(255, 255, 255, 0.4), 0 0 50px rgba(255, 255, 255, 0.2), 0 0 70px rgba(255, 255, 255, 0.1);
                }
                100% {
                  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1);
                }
              }
              
              .heartbeat {
                -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
                animation: heartbeat 1.5s ease-in-out infinite both;
              }
              
              @keyframes heartbeat {
                0% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
                }
                14% {
                  box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 165, 0, 0.4), 0 0 80px rgba(255, 69, 0, 0.2);
                }
                28% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
                }
                42% {
                  box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 165, 0, 0.4), 0 0 80px rgba(255, 69, 0, 0.2);
                }
                70% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
                }
              }
              
              .cup-float {
                animation: float 3s ease-in-out infinite;
              }
              
              @keyframes float {
                0%, 100% {
                  transform: translateY(0px) scale(1);
                }
                50% {
                  transform: translateY(-10px) scale(1);
                }
              }
              
              .return-desk-glow {
                animation: returnDeskGlow 3s ease-in-out infinite;
              }
              
              @keyframes returnDeskGlow {
                0%, 100% {
                  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.1);
                }
                50% {
                  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 255, 255, 0.1);
                }
              }
              
              .cup-hover-glow:hover {
                transform: scale(1.2);
                filter: blur(3px);
                box-shadow: none;
                transition: all 0.3s ease-in-out;
              }
              
              .phone-glow {
                animation: phoneGlow 3s ease-in-out infinite;
              }
              
              @keyframes phoneGlow {
                0%, 100% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1);
                }
                50% {
                  box-shadow: 0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.4), 0 0 120px rgba(255, 255, 255, 0.3), 0 0 160px rgba(255, 255, 255, 0.1);
                }
              }
              
              .profile-glow {
                animation: profileGlow 3s ease-in-out infinite;
              }
              
              @keyframes profileGlow {
                0%, 100% {
                  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2), 0 0 45px rgba(255, 255, 255, 0.1);
                }
                50% {
                  box-shadow: 0 0 25px rgba(255, 255, 255, 0.5), 0 0 50px rgba(255, 255, 255, 0.3), 0 0 75px rgba(255, 255, 255, 0.2);
                }
              }
              
              .white-notice-glow {
                animation: whiteNoticeGlow 3s ease-in-out infinite;
              }
              
              @keyframes whiteNoticeGlow {
                0%, 100% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2);
                }
                50% {
                  box-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 90px rgba(255, 255, 255, 0.3);
                }
              }
              
              .letter-glow {
                animation: letterGlow 3s ease-in-out infinite;
              }
              
              @keyframes letterGlow {
                0%, 100% {
                  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2), 0 0 45px rgba(255, 255, 255, 0.1);
                }
                50% {
                  box-shadow: 0 0 25px rgba(255, 255, 255, 0.5), 0 0 50px rgba(255, 255, 255, 0.3), 0 0 75px rgba(255, 255, 255, 0.2);
                }
              }
              
              .letter-pulse-glow {
                animation: letterPulseGlow 2.5s ease-in-out infinite;
              }
              
              @keyframes letterPulseGlow {
                0%, 100% {
                  box-shadow: 
                    0 0 20px rgba(255, 215, 0, 0.4),
                    0 0 40px rgba(255, 165, 0, 0.3),
                    0 0 60px rgba(255, 69, 0, 0.2),
                    0 0 80px rgba(255, 140, 0, 0.1);
                }
                50% {
                  box-shadow: 
                    0 0 30px rgba(255, 215, 0, 0.7),
                    0 0 60px rgba(255, 165, 0, 0.5),
                    0 0 90px rgba(255, 69, 0, 0.4),
                    0 0 120px rgba(255, 140, 0, 0.2);
                }
              }
              
              .phone-pulse-glow {
                animation: phonePulseGlow 3s ease-in-out infinite;
              }
              
              @keyframes phonePulseGlow {
                0%, 100% {
                  box-shadow: 
                    0 0 20px rgba(255, 255, 255, 0.4), 
                    0 0 40px rgba(255, 255, 255, 0.3), 
                    0 0 60px rgba(255, 255, 255, 0.2), 
                    0 0 80px rgba(255, 255, 255, 0.1);
                }
                50% {
                  box-shadow: 
                    0 0 40px rgba(255, 255, 255, 0.6), 
                    0 0 80px rgba(255, 255, 255, 0.4), 
                    0 0 120px rgba(255, 255, 255, 0.3), 
                    0 0 160px rgba(255, 255, 255, 0.1);
                }
              }
              
              .phone-tooltip-glow {
                animation: phoneTooltipGlow 2s ease-in-out infinite;
              }
              
              @keyframes phoneTooltipGlow {
                0%, 100% {
                  box-shadow: 
                    0 0 10px rgba(53, 178, 194, 0.6), 
                    0 0 20px rgba(53, 178, 194, 0.4), 
                    0 0 30px rgba(53, 178, 194, 0.2);
                }
                50% {
                  box-shadow: 
                    0 0 20px rgba(53, 178, 194, 0.8), 
                    0 0 40px rgba(53, 178, 194, 0.6), 
                    0 0 60px rgba(53, 178, 194, 0.4), 
                    0 0 80px rgba(53, 178, 194, 0.2);
                }
              }
              
              .phone-glow-animation {
                animation: phoneGlowPulse 4s ease-in-out infinite;
              }
              
              @keyframes phoneGlowPulse {
                0%, 100% {
                  opacity: 0.5;
                  transform: scale(1);
                  filter: blur(12px);
                }
                50% {
                  opacity: 0.9;
                  transform: scale(1.05);
                  filter: blur(12px);
                }
              }
              
              .letter-glow-animation {
                animation: letterGlowPulse 4s ease-in-out infinite;
              }
              
              @keyframes letterGlowPulse {
                0%, 100% {
                  opacity: 0.5;
                  transform: translate(-50%, -50%) rotate(-95deg) skewY(-57deg) scale(1);
                  filter: blur(12px);
                }
                50% {
                  opacity: 0.9;
                  transform: translate(-50%, -50%) rotate(-95deg) skewY(-57deg) scale(1.05);
                  filter: blur(12px);
                }
              }
              
              .letter-tooltip-glow {
                animation: letterTooltipGlow 2s ease-in-out infinite;
              }
              
              @keyframes letterTooltipGlow {
                0%, 100% {
                  box-shadow: 
                    0 0 10px rgba(132, 83, 153, 0.6), 
                    0 0 20px rgba(132, 83, 153, 0.4), 
                    0 0 30px rgba(132, 83, 153, 0.2);
                }
                50% {
                  box-shadow: 
                    0 0 20px rgba(132, 83, 153, 0.8), 
                    0 0 40px rgba(132, 83, 153, 0.6), 
                    0 0 60px rgba(132, 83, 153, 0.4), 
                    0 0 80px rgba(132, 83, 153, 0.2);
                }
              }
              

              
              @keyframes fadeInScale {
                0% {
                  opacity: 0;
                  transform: translateY(-100%) scale(0.8);
                }
                100% {
                  opacity: 0.9;
                  transform: translateY(-100%) scale(1);
                }
              }
              
              .laptop-tooltip-glow {
                animation: laptopTooltipGlow 2s ease-in-out infinite;
              }
              
              @keyframes laptopTooltipGlow {
                0%, 100% {
                  box-shadow: 
                    0 0 10px rgba(36, 129, 194, 0.6), 
                    0 0 20px rgba(36, 129, 194, 0.4), 
                    0 0 30px rgba(36, 129, 194, 0.2);
                }
                50% {
                  box-shadow: 
                    0 0 20px rgba(36, 129, 194, 0.8), 
                    0 0 40px rgba(36, 129, 194, 0.6), 
                    0 0 60px rgba(36, 129, 194, 0.4), 
                    0 0 80px rgba(36, 129, 194, 0.2);
                }
              }

              /* Smoke Animations */
              .smoke-animation {
                filter: blur(5px);
                transform-origin: 50% 50%;
                animation: smoke1 3s linear infinite;
                animation-delay: 0.5s;
                will-change: transform, opacity, filter;
              }

              .smoke-animation2 {
                filter: blur(5px);
                transform-origin: 50% 50%;
                animation: smoke2 3s linear infinite;
                animation-delay: 1.5s;
                will-change: transform, opacity, filter;
              }

              .smoke-animation3 {
                filter: blur(5px);
                transform-origin: 50% 50%;
                animation: smoke3 4s linear infinite;
                animation-delay: 2.5s;
                will-change: transform, opacity, filter;
              }

              @keyframes smoke1 {
                0% {
                  filter: blur(0px);
                  transform: translateY(0px) scale(-1, 1);
                  opacity: 0;
                }

                25% {
                  filter: blur(3px);
                  transform: translateY(-10px) scale(-1, 1.05);
                  opacity: 0.5;
                }

                50% {
                  filter: blur(5px);
                  transform: translateY(-20px) scale(-1, 1.1);
                  opacity: 1;
                }

                75% {
                  filter: blur(5px);
                  transform: translateY(-30px) scale(-1, 1.15);
                  opacity: 0.5;
                }

                100% {
                  filter: blur(7px);
                  transform: translateY(-40px) scale(-1, 1.2);
                  opacity: 0;
                }
              }

              @keyframes smoke2 {
                0% {
                  filter: blur(0px);
                  transform: translateY(0px) scale(1);
                  opacity: 0;
                }

                25% {
                  filter: blur(3px);
                  transform: translateY(-10px) scale(1.05);
                  opacity: 0.5;
                }

                50% {
                  filter: blur(5px);
                  transform: translateY(-20px) scale(1.1);
                  opacity: 1;
                }

                75% {
                  filter: blur(5px);
                  transform: translateY(-30px) scale(1.15);
                  opacity: 0.5;
                }

                100% {
                  filter: blur(7px);
                  transform: translateY(-40px) scale(1.2);
                  opacity: 0;
                }
              }

              @keyframes smoke3 {
                0% {
                  filter: blur(0px);
                  transform: translateY(0px) scale(1);
                  opacity: 0;
                }

                25% {
                  filter: blur(3px);
                  transform: translateY(-20px) scale(1.05);
                  opacity: 0.5;
                }

                50% {
                  filter: blur(5px);
                  transform: translateY(-40px) scale(1.1);
                  opacity: 1;
                }

                75% {
                  filter: blur(5px);
                  transform: translateY(-60px) scale(1.15);
                  opacity: 0.5;
                }

                100% {
                  filter: blur(7px);
                  transform: translateY(-80px) scale(1.2);
                  opacity: 0;
                }
              }
              
              @keyframes fadeInOut {
                0% {
                  opacity: 0;
                }
                8% {
                  opacity: 1;
                }
                80% {
                  opacity: 1;
                }
                88% {
                  opacity: 0.6;
                }
                94% {
                  opacity: 0.2;
                }
                100% {
                  opacity: 0;
                }
              }
            `}</style>



          {/* Videos Overlay */}
          {showVideos && (
            <div className="fixed inset-0 z-50">
              {/* Glass background blur */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
                onClick={handleCloseVideos}
              />
              
              {/* Return to Desk button - top left */}
              <button
                onClick={handleCloseVideos}
                className="absolute top-6 left-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer return-desk-glow"
              >
                Return to Desk
              </button>
              
              {/* Videos content - split layout */}
              <div className="absolute inset-0 flex items-center justify-center p-16">
                <div className="relative z-10 flex items-center justify-between w-full max-w-6xl">
                  {/* Left side - Content */}
                  <div className="flex-1 max-w-2xl relative">
                    {/* Title */}
                    <h1 
                      className="text-7xl font-serif text-white mb-8 leading-tight opacity-0 video-title" 
                      style={{ fontFamily: 'Amita' }}
                      ref={(el) => {
                        if (el) {
                          gsap.fromTo(el, 
                            { 
                              opacity: 0, 
                              y: 50,
                              scale: 0.9
                            },
                            { 
                              opacity: 1, 
                              y: 0, 
                              scale: 1,
                              duration: 1.2,
                              ease: "power2.out",
                              delay: 0.3
                            }
                          );
                        }
                      }}
                    >
                      Deep Dive<br />Teachings <br />
                    </h1>
                    
                    {/* Description */}
                    <p 
                      className="text-xl text-white mb-10 leading-relaxed opacity-0 video-description" 
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                      ref={(el) => {
                        if (el) {
                          gsap.fromTo(el, 
                            { 
                              opacity: 0, 
                              y: 40
                            },
                            { 
                              opacity: 0.9, 
                              y: 0,
                              duration: 1.4,
                              ease: "power2.out",
                              delay: 0.8
                            }
                          );
                        }
                      }}
                    >
                      Are you longing for an in-depth exploration of God&apos;s Word and its application to the complexities of life? Our videos, delivered through an exclusive paid WhatsApp channel, provide detailed teaching and deeper insights. Join our community to journey further into understanding how His grace abounds even in the most profound changing scenes of life and cultivate an intimate relationship with the Lord.
                    </p>
                    
                    {/* Join Channel Button */}
                    <div 
                      className="flex justify-start opacity-0 video-button"
                      ref={(el) => {
                        if (el) {
                          gsap.fromTo(el, 
                            { 
                              opacity: 0, 
                              y: 30,
                              scale: 0.95
                            },
                            { 
                              opacity: 1, 
                              y: 0, 
                              scale: 1,
                              duration: 1.0,
                              ease: "power2.out",
                              delay: 1.4
                            }
                          );
                        }
                      }}
                    >
                      <Image
                        src="/join-channel-new.svg"
                        alt="Join Channel"
                        width={200}
                        height={60}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={handleJoinChannelClick}
                      />
                    </div>

                  </div>

                  
                  {/* Right side - Video */}
                  <div 
                    className="flex-1 flex justify-end items-end relative opacity-0 video-image"
                    ref={(el) => {
                      if (el) {
                        gsap.fromTo(el, 
                          { 
                            opacity: 0, 
                            y: 80,
                            scale: 0.9
                          },
                          { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1,
                            duration: 1.6,
                            ease: "power2.out",
                            delay: 0.5
                          }
                        );
                      }
                    }}
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="object-contain"
                      style={{
                        transform: 'scale(2.0)',
                        width: '100%',
                        height: '100%',
                        objectPosition: 'center'
                      }}
                    >
                      <source src="/join-our-channel-new-2.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>

                  </div>
                </div>
              </div>
            </div>
          )}




          {/* Fumaa Modal */}
          {showFumaaModal && (
            <div className="fixed inset-0 z-50">
              {/* Glass background blur */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
                onClick={handleCloseFumaaModal}
              />
              {/* Return to Desk button - top left */}
              <button
                onClick={handleCloseFumaaModal}
                className="absolute top-6 left-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer return-desk-glow"
              >
                Return to Desk
              </button>
              {/* Modal content - split layout like join channel */}
              <div className="absolute inset-0 flex items-center justify-center p-16">
                <div className="relative z-10 flex items-center justify-between w-full max-w-6xl">
                  {/* Left side - Content */}
                  <div className="flex-1 max-w-2xl relative">
                    {/* Title */}
                    <h1 
                      className="text-7xl font-serif text-white mb-8 leading-tight opacity-0 cup-title"
                      style={{ fontFamily: 'Amita, serif' }}
                      ref={(el) => {
                        if (el) {
                          gsap.fromTo(el, 
                            { 
                              opacity: 0, 
                              y: 50,
                              scale: 0.9
                            },
                            { 
                              opacity: 1, 
                              y: 0, 
                              scale: 1,
                              duration: 1.2,
                              ease: "power2.out",
                              delay: 0.3
                            }
                          );
                        }
                      }}
                    >
                      A Cheerful Gift,<br />a Full Cup
                    </h1>
                    
                    {/* Description */}
                    <p 
                      className="text-xl text-white mb-10 leading-relaxed opacity-0 cup-description"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                      ref={(el) => {
                        if (el) {
                          gsap.fromTo(el, 
                            { 
                              opacity: 0, 
                              y: 40
                            },
                            { 
                              opacity: 0.9, 
                              y: 0,
                              duration: 1.4,
                              ease: "power2.out",
                              delay: 0.8
                            }
                          );
                        }
                      }}
                    >
                      Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform. Thank you for your kindness!
                    </p>
                    
                    {/* Pour Into My Cup Button */}
                    <div 
                      className="flex justify-start opacity-0 cup-button"
                      ref={(el) => {
                        if (el) {
                          gsap.fromTo(el, 
                            { 
                              opacity: 0, 
                              y: 30,
                              scale: 0.95
                            },
                            { 
                              opacity: 1, 
                              y: 0, 
                              scale: 1,
                              duration: 1.0,
                              ease: "power2.out",
                              delay: 1.4
                            }
                          );
                        }
                      }}
                    >
                      <Image
                        src="/pour-into-my-cup.svg"
                        alt="Pour Into My Cup"
                        width={200}
                        height={60}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={handlePourIntoCupClick}
                      />
                    </div>

                  </div>

                  
                  {/* Right side - Cup Image */}
                  <div 
                    className="flex-1 flex justify-end items-end relative opacity-0 cup-image"
                    ref={(el) => {
                      if (el) {
                        gsap.fromTo(el, 
                          { 
                            opacity: 0, 
                            y: 80,
                            scale: 0.9
                          },
                          { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1,
                            duration: 1.6,
                            ease: "power2.out",
                            delay: 0.5
                          }
                        );
                      }
                    }}
                  >
                    <Image
                      src="/coffee-cup.png"
                      alt="Coffee Cup"
                      width={1800}
                      height={2700}
                      className="object-contain"
                      style={{
                        transform: 'translateX(20%) translateY(15%) scale(0.65)'
                      }}
                    />
                    
                    {/* Animated Smoke Effects */}
                    <div
                      className="absolute inset-0 pointer-events-none flex items-center justify-center smoke-container"
                      style={{ zIndex: 1, top: '-45%', left: '25%' }}
                    >
                      <Image
                        src="/smoke.png"
                        alt="Smoke"
                        width={800}
                        height={220}
                        className="object-contain smoke-animation"
                        style={{ width: '800px', height: '220px', maxWidth: 'none' }}
                      />
                    </div>
                    <div
                      className="absolute inset-0 pointer-events-none flex items-center justify-center smoke-container"
                      style={{ zIndex: 1, top: '-45%', left: '25%' }}
                    >
                      <Image
                        src="/smoke.png"
                        alt="Smoke"
                        width={800}
                        height={220}
                        className="object-contain smoke-animation2"
                        style={{ width: '800px', height: '220px', maxWidth: 'none' }}
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}


          </div>
        </div>
      )}

      {/* Expanded Email Modal - Accessible from both mobile and desktop */}
      {showExpandedEmailModal && (
        <div className="fixed inset-0 z-[9999]">
          {/* Black overlay */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={handleCloseExpandedEmailModal}
          />
          
                    {/* Expanded Modal content */}
          <div className="absolute inset-0 flex items-center justify-center p-2 xs:p-3 sm:p-4">
            <div 
              className="relative z-10 w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden expanded-email-modal-card flex flex-col" 
              style={{ 
                maxHeight: '90vh',
                backgroundColor: '#845399'
              }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <span className="text-white font-medium">New Message</span>
                <button
                  onClick={handleCloseExpandedEmailModal}
                  className="text-white hover:text-gray-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              {/* Email Form */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1 pb-20">
                {/* To Field */}
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium w-8">To:</span>
                  <div className="px-3 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}>
                    letstalk@coordinatedliving.com
                  </div>
                </div>
                
                <div className="border-b border-gray-200"></div>
                
                {/* From Field */}
                <div className="flex items-center space-x-2">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="flex-1 border-none outline-none text-white placeholder-gray-300 text-base"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
                
                <div className="border-b border-gray-200"></div>
                
                {/* Subject Field */}
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Subject"
                    className="flex-1 border-none outline-none text-white placeholder-gray-300 text-base"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
                
                <div className="border-b border-gray-200"></div>
                
                {/* Message Field */}
                <div className="mt-4">
                  <div className="text-white font-medium mb-3 text-base">
                    Enter message
                  </div>
                                        <textarea 
                        placeholder=""
                        rows={8}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="w-full border-none outline-none resize-none text-white placeholder-gray-300 text-base"
                        style={{ minHeight: '120px', backgroundColor: 'transparent' }}
                      />
                </div>
              </div>
              
              {/* Send Button */}
              <div className="p-6 border-t border-gray-200 flex-shrink-0">
                <button 
                  className="w-full text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-base"
                  style={{ backgroundColor: '#2481C2' }}
                  onClick={() => {
                    // Handle send email functionality
                    console.log('Send email clicked');
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Guides Bottom Sheet - Mobile Only */}
      {showGuidesModal && (
        <div className="fixed inset-0 z-[9999]">
          {/* Blurred background overlay */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={handleCloseGuidesModal}
          />
          
          {/* Bottom Sheet */}
          <div 
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl shadow-2xl guides-bottom-sheet"
            style={{ 
              maxHeight: '95vh',
              minHeight: '85vh',
              backgroundColor: '#2f4c6c'
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4">
              <h2 
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-amita), cursive' }}
              >
                Available Guides
              </h2>
              <button
                onClick={handleCloseGuidesModal}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            {/* Swipeable Guides Container */}
            <div className="pb-6">
              {/* Cards Container with Single Active Card */}
              <div 
                className="mb-6 relative overflow-hidden" 
                style={{ minHeight: '400px' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div 
                  className="flex transition-transform duration-300 ease-out" 
                  style={{ 
                    height: '400px',
                    transform: `translateX(-${currentGuideIndex * (100 + 4)}%)`,
                    gap: '16px'
                  }}
                >
                  {/* First Card */}
                  <div className="flex-shrink-0 flex justify-center" style={{ width: '100vw' }}>
                    <div 
                      className="relative overflow-hidden rounded-2xl bg-white h-full"
                      style={{ width: 'calc(100vw - 32px)' }}
                    >
                      <Image
                        src="/guide-cover-mobile.png"
                        alt="Guide Cover"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onLoad={() => {
                          console.log('Guide image loaded successfully');
                        }}
                        onError={(e) => {
                          console.log('Guide image failed to load:', e);
                        }}
                      />
                      
                      {/* Logo - Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <Image
                          src="/guide-logo.svg"
                          alt="Guide Logo"
                          width={120}
                          height={120}
                          className="w-24 h-24"
                        />
                      </div>
                      
                      {/* Title and Description - Bottom Left */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <h3 
                          className="text-white text-lg font-bold mb-1"
                          style={{ fontFamily: 'Amita, serif' }}
                        >
                          GUIDE 1 TITLE
                        </h3>
                        <p 
                          className="text-white text-sm"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            opacity: 0.7
                          }}
                        >
                          GUIDE TITLE 1 DESCRIPTION
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Second Card */}
                  <div className="flex-shrink-0 flex justify-center" style={{ width: '100vw' }}>
                    <div 
                      className="relative overflow-hidden rounded-2xl bg-white h-full"
                      style={{ width: 'calc(100vw - 32px)' }}
                    >
                      <Image
                        src="/guide-cover-mobile.png"
                        alt="Guide Cover"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onLoad={() => {
                          console.log('Second guide image loaded successfully');
                        }}
                        onError={(e) => {
                          console.log('Second guide image failed to load:', e);
                        }}
                      />
                      
                      {/* Logo - Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <Image
                          src="/guide-logo.svg"
                          alt="Guide Logo"
                          width={120}
                          height={120}
                          className="w-24 h-24"
                        />
                      </div>
                      
                      {/* Title and Description - Bottom Left */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <h3 
                          className="text-white text-lg font-bold mb-1"
                          style={{ fontFamily: 'Amita, serif' }}
                        >
                          GUIDE 2 TITLE
                        </h3>
                        <p 
                          className="text-white text-sm"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            opacity: 0.7
                          }}
                        >
                          GUIDE TITLE 2 DESCRIPTION
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Third Card */}
                  <div className="flex-shrink-0 flex justify-center" style={{ width: '100vw' }}>
                    <div 
                      className="relative overflow-hidden rounded-2xl bg-white h-full"
                      style={{ width: 'calc(100vw - 32px)' }}
                    >
                      <Image
                        src="/guide-cover-mobile.png"
                        alt="Guide Cover"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onLoad={() => {
                          console.log('Third guide image loaded successfully');
                        }}
                        onError={(e) => {
                          console.log('Third guide image failed to load:', e);
                        }}
                      />
                      
                      {/* Logo - Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <Image
                          src="/guide-logo.svg"
                          alt="Guide Logo"
                          width={120}
                          height={120}
                          className="w-24 h-24"
                        />
                      </div>
                      
                      {/* Title and Description - Bottom Left */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <h3 
                          className="text-white text-lg font-bold mb-1"
                          style={{ fontFamily: 'Amita, serif' }}
                        >
                          GUIDE 3 TITLE
                        </h3>
                        <p 
                          className="text-white text-sm"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            opacity: 0.7
                          }}
                        >
                          GUIDE TITLE 3 DESCRIPTION
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fourth Card */}
                  <div className="flex-shrink-0 flex justify-center" style={{ width: '100vw' }}>
                    <div 
                      className="relative overflow-hidden rounded-2xl bg-white h-full"
                      style={{ width: 'calc(100vw - 32px)' }}
                    >
                      <Image
                        src="/guide-cover-mobile.png"
                        alt="Guide Cover"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onLoad={() => {
                          console.log('Fourth guide image loaded successfully');
                        }}
                        onError={(e) => {
                          console.log('Fourth guide image failed to load:', e);
                        }}
                      />
                      
                      {/* Logo - Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <Image
                          src="/guide-logo.svg"
                          alt="Guide Logo"
                          width={120}
                          height={120}
                          className="w-24 h-24"
                        />
                      </div>
                      
                      {/* Title and Description - Bottom Left */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <h3 
                          className="text-white text-lg font-bold mb-1"
                          style={{ fontFamily: 'Amita, serif' }}
                        >
                          GUIDE 4 TITLE
                        </h3>
                        <p 
                          className="text-white text-sm"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            opacity: 0.7
                          }}
                        >
                          GUIDE TITLE 4 DESCRIPTION
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Guide Indicators */}
              <div className="flex justify-center space-x-3 mt-6">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentGuideIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentGuideIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white opacity-30 hover:opacity-50'
                    }`}
                  />
                ))}
              </div>
              
              {/* Download Button */}
              <div className="flex justify-center mt-6">
                <button
                  className="px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200 shadow-lg"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    color: '#2F4C6C',
                    width: '80%'
                  }}
                  onClick={() => {
                    // Handle download functionality
                    console.log('Download guide clicked');
                  }}
                >
                  Download This Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Bottom Sheet - Mobile Only */}
      {showPostBottomSheet && (
        <div className="fixed inset-0 z-[9999]">
          {/* Blurred background overlay */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={handleClosePostBottomSheet}
          />
          
          {/* Bottom Sheet */}
          <div 
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl shadow-2xl post-bottom-sheet flex flex-col"
            style={{ 
              maxHeight: '90vh',
              minHeight: '75vh',
              backgroundColor: '#2f4c6c'
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4">
              <h2 
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-amita), cursive' }}
              >
                Latest Posts
              </h2>
              <button
                onClick={handleClosePostBottomSheet}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            {/* Swipeable Posts Container */}
            <div className="pb-6 flex-1 overflow-y-auto">
              {/* Cards Container with Single Active Card */}
              <div 
                className="mb-6 relative overflow-hidden" 
                style={{ minHeight: '400px' }}
                onTouchStart={(e) => {
                  setTouchStart(e.targetTouches[0].clientX);
                }}
                onTouchMove={(e) => {
                  setTouchEnd(e.targetTouches[0].clientX);
                }}
                onTouchEnd={() => {
                  if (!touchStart || !touchEnd) return;
                  
                  const distance = touchStart - touchEnd;
                  const isLeftSwipe = distance > 50;
                  const isRightSwipe = distance < -50;
                  
                  if (isLeftSwipe && currentPostBottomSheetIndex < posts.length - 1) {
                    setCurrentPostBottomSheetIndex(prev => prev + 1);
                  }
                  if (isRightSwipe && currentPostBottomSheetIndex > 0) {
                    setCurrentPostBottomSheetIndex(prev => prev - 1);
                  }
                }}
              >
                <div 
                  className="flex transition-transform duration-300 ease-out" 
                  style={{ 
                    height: '400px',
                    transform: `translateX(-${currentPostBottomSheetIndex * (100 + 4)}%)`,
                    gap: '16px'
                  }}
                >
                  {/* First Post Card */}
                  <div className="flex-shrink-0 flex justify-center" style={{ width: '100vw' }}>
                    <div 
                      className="relative overflow-hidden rounded-2xl bg-white h-full"
                      style={{ width: 'calc(100vw - 32px)' }}
                    >
                      <Image
                        src="/post-card-mobile.png"
                        alt="Post Card"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onLoad={() => {
                          console.log('Post card image loaded successfully');
                        }}
                        onError={(e) => {
                          console.log('Post card image failed to load:', e);
                        }}
                      />
                      
                      {/* Logo - Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <Image
                          src="/guide-logo.svg"
                          alt="Post Logo"
                          width={120}
                          height={120}
                          className="w-24 h-24"
                        />
                      </div>
                      
                      {/* Title and Description - Bottom Left */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <h3 
                          className="text-white text-lg font-bold mb-1"
                          style={{ fontFamily: 'Amita, serif' }}
                        >
                          {posts[0].title}
                        </h3>
                        <p 
                          className="text-white text-sm"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            opacity: 0.9
                          }}
                        >
                          A thousand times I failed, still your mercy remains...
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Second Post Card */}
                  <div className="flex-shrink-0 flex justify-center" style={{ width: '100vw' }}>
                    <div 
                      className="relative overflow-hidden rounded-2xl bg-white h-full"
                      style={{ width: 'calc(100vw - 32px)' }}
                    >
                      <Image
                        src="/post-card-mobile.png"
                        alt="Post Card"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onLoad={() => {
                          console.log('Second post card image loaded successfully');
                        }}
                        onError={(e) => {
                          console.log('Second post card image failed to load:', e);
                        }}
                      />
                      
                      {/* Logo - Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <Image
                          src="/guide-logo.svg"
                          alt="Post Logo"
                          width={120}
                          height={120}
                          className="w-24 h-24"
                        />
                      </div>
                      
                      {/* Title and Description - Bottom Left */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <h3 
                          className="text-white text-lg font-bold mb-1"
                          style={{ fontFamily: 'Amita, serif' }}
                        >
                          {posts[1].title}
                        </h3>
                        <p 
                          className="text-white text-sm"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            opacity: 0.9
                          }}
                        >
                          In all things God works for the good of those who love him...
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Third Post Card */}
                  <div className="flex-shrink-0 flex justify-center" style={{ width: '100vw' }}>
                    <div 
                      className="relative overflow-hidden rounded-2xl bg-white h-full"
                      style={{ width: 'calc(100vw - 32px)' }}
                    >
                      <Image
                        src="/post-card-mobile.png"
                        alt="Post Card"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onLoad={() => {
                          console.log('Third post card image loaded successfully');
                        }}
                        onError={(e) => {
                          console.log('Third post card image failed to load:', e);
                        }}
                      />
                      
                      {/* Logo - Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <Image
                          src="/guide-logo.svg"
                          alt="Post Logo"
                          width={120}
                          height={120}
                          className="w-24 h-24"
                        />
                      </div>
                      
                      {/* Title and Description - Bottom Left */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <h3 
                          className="text-white text-lg font-bold mb-1"
                          style={{ fontFamily: 'Amita, serif' }}
                        >
                          {posts[2].title}
                        </h3>
                        <p 
                          className="text-white text-sm"
                          style={{ 
                            fontFamily: 'Roboto, sans-serif',
                            opacity: 0.9
                          }}
                        >
                          Be still and know that I am God...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Post Indicators */}
              <div className="flex justify-center space-x-3 mt-6">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPostBottomSheetIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentPostBottomSheetIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white opacity-30 hover:opacity-50'
                    }`}
                  />
                ))}
              </div>
              
              {/* Read More Button */}
              <div className="flex justify-center mt-6">
                <button
                  className="px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200 shadow-lg"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    color: '#2F4C6C',
                    width: '80%'
                  }}
                  onClick={() => {
                    // Handle read more functionality - open full post bottom sheet
                    setCurrentFullPostIndex(currentPostBottomSheetIndex);
                    setShowPostBottomSheet(false);
                    setShowFullPostBottomSheet(true);
                  }}
                >
                  Read Full Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Post Bottom Sheet - Mobile Only */}
      {showFullPostBottomSheet && (
        <div className="fixed inset-0 z-[9999]">
          {/* Blurred background overlay */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={handleCloseFullPostBottomSheet}
          />
          
          {/* Bottom Sheet */}
          <div 
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl shadow-2xl full-post-bottom-sheet flex flex-col"
            style={{ 
              maxHeight: '85vh',
              minHeight: '75vh',
              backgroundColor: '#FFFFFF'
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header with Back Arrow and Title */}
            <div className="flex items-center px-6 pb-4">
              <button
                onClick={() => {
                  setShowFullPostBottomSheet(false);
                  setShowPostBottomSheet(true);
                }}
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 mr-4"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <h2 
                className="text-2xl font-bold text-black flex-1"
                style={{ fontFamily: 'var(--font-amita), cursive' }}
              >
                {posts[currentFullPostIndex].title}
              </h2>
            </div>
            
            {/* Scrollable Content Card */}
            <div className="px-6 pb-4 flex-1 flex flex-col min-h-0">
              <div 
                className="bg-white border border-gray-200 rounded-2xl p-6 flex-1 overflow-y-auto min-h-0"
                style={{ 
                  fontFamily: 'Roboto, sans-serif',
                  color: '#000000',
                  maxHeight: '50vh'
                }}
              >
                {/* Post Content */}
                <div className="space-y-4 text-base leading-relaxed">
                  {posts[currentFullPostIndex].content ? (
                    // Use new content field if available
                    <p>{posts[currentFullPostIndex].content}</p>
                  ) : (
                    // Fallback to legacy fields
                    <>
                      <p>{posts[currentFullPostIndex].leftContent}</p>
                      <p>{posts[currentFullPostIndex].rightContent}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                {/* Navigation Buttons */}
                <div className="flex items-center space-x-3">
                  {/* Previous Post Button */}
                  <button
                    onClick={() => {
                      setCurrentFullPostIndex(prev => Math.max(0, prev - 1));
                    }}
                    disabled={currentFullPostIndex === 0}
                    className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  
                  {/* Next Post Button */}
                  <button
                    onClick={() => {
                      setCurrentFullPostIndex(prev => Math.min(posts.length - 1, prev + 1));
                    }}
                    disabled={currentFullPostIndex === posts.length - 1}
                    className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
                
                {/* Share Button */}
                <button
                  onClick={async () => {
                    // Handle share functionality with error handling
                    try {
                      if (navigator.share) {
                        await navigator.share({
                          title: posts[currentFullPostIndex].title,
                          text: 'Check out this post from Coordinated Living',
                          url: window.location.href
                        });
                      } else {
                        // Fallback: copy to clipboard
                        await navigator.clipboard.writeText(window.location.href);
                        // You could add a toast notification here
                        console.log('Link copied to clipboard');
                      }
                    } catch (error) {
                      // Handle share errors (user cancelled, etc.)
                      if (error instanceof Error && error.name !== 'AbortError') {
                        console.log('Share failed:', error);
                        // Fallback to clipboard if share fails
                        try {
                          await navigator.clipboard.writeText(window.location.href);
                          console.log('Link copied to clipboard as fallback');
                        } catch (clipboardError) {
                          console.log('Clipboard copy also failed:', clipboardError);
                        }
                      }
                    }
                  }}
                  className="px-6 py-3 rounded-full font-medium transition-colors duration-200"
                  style={{ 
                    backgroundColor: '#2F4C6C',
                    color: '#FFFFFF',
                    fontFamily: 'Roboto, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1e6ba3';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2481C2';
                  }}
                >
                  Share this post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Modal - Accessible from both mobile and desktop */}
      {showPostModal && (
        <div className="fixed inset-0 z-[9999]">
          {/* Glass background blur */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
            onClick={handleClosePostModal}
          />
          
          {/* Return to Desk button - top left */}
          <button
            onClick={handleClosePostModal}
            className="absolute top-6 left-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer return-desk-glow"
          >
            <span className="xl:hidden">Go Back</span>
            <span className="hidden xl:inline">Return to Desk</span>
          </button>
          
          {/* Share button - top right */}
          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="absolute top-6 right-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer"
            title="Share post"
          >
            Share This Post
          </button>
          
          {/* Post Template Content */}
          <div className="absolute inset-0 flex items-center justify-center p-4 xl:p-16 pt-24 xl:pt-16 xl:overflow-y-auto">
            {/* Left Navigation Button */}
            {currentPostIndex > 0 && (
              <button
                onClick={handlePreviousPost}
                className="hidden xl:flex absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700"
                >
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
            )}

            {/* Right Navigation Button */}
            {currentPostIndex < posts.length - 1 && (
              <button
                onClick={handleNextPost}
                className="hidden xl:flex absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700"
                >
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            )}

            <div className="relative z-10 w-full xl:max-w-2xl">
              <div 
                className="post-modal-content post-modal-container"
                ref={postTemplateRef}
              >
                {postsLoading ? (
                  <div className="p-16 text-center">
                    <div className="flex flex-col items-center space-y-6">
                      {/* Elegant loading spinner */}
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                      </div>
                      {/* Subtle loading text */}
                      <div className="text-gray-600 text-lg font-medium">Loading posts...</div>
                      <div className="text-gray-500 text-sm">Please wait while we fetch the latest content</div>
                    </div>
                  </div>
                ) : posts.length > 0 ? (
                  <PostTemplate
                    title={posts[currentPostIndex].title}
                    content={posts[currentPostIndex].content}
                    images={posts[currentPostIndex].images}
                  />
                ) : (
                  <div className="p-8 text-center">
                    <div className="mb-4">
                      <svg className="w-16 h-16 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">x
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No Posts Available</h3>
                    <p className="text-white">Check back later for new content!</p>
                  </div>
                )}
              </div>
              
              
              {/* Mobile Pagination */}
              <div className="xl:hidden flex justify-center items-center mt-4 space-x-4">
                {/* Previous Button */}
                {currentPostIndex > 0 && (
                  <button
                    onClick={handlePreviousPost}
                    className="bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 p-2 rounded-full font-medium shadow-lg hover:bg-opacity-100 transition-all cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>
                )}
                
                {/* Pagination Text */}
                <div className="bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg">
                  {currentPostIndex + 1} / {posts.length}
                </div>
                
                {/* Next Button */}
                {currentPostIndex < posts.length - 1 && (
                  <button
                    onClick={handleNextPost}
                    className="bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 p-2 rounded-full font-medium shadow-lg hover:bg-opacity-100 transition-all cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share options dropdown - positioned in top right corner */}
      {showShareOptions && showPostModal && (
        <div className="fixed inset-0 z-[10000] pointer-events-none">
          <div 
            className="absolute inset-0 pointer-events-auto"
            onClick={() => setShowShareOptions(false)}
          />
          <div className="absolute top-20 right-6 pointer-events-auto">
            <div 
              className="w-48 bg-white rounded-md shadow-lg border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    handleShare();
                    setShowShareOptions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Share as Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Blur Effect - Desktop Only */}
      {showBlurEffect && (
        <div 
          className="fixed inset-0 w-screen h-screen pointer-events-none hidden lg:block"
          style={{ 
            zIndex: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            animation: 'fadeInOut 7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
          }}
        >
          {/* Welcome Card */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '450px',
              backgroundColor: '#000000',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              animation: 'fadeInOut 7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
            }}
          >
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/welcome-card-logo.svg"
                alt="Welcome Logo"
                width={60}
                height={60}
                className="w-15 h-15"
              />
            </div>
            
            {/* Blue Welcome Card */}
            <div 
              style={{
                backgroundColor: '#2F4C6C',
                borderRadius: '50px',
                padding: '8px 20px',
                marginBottom: '20px'
              }}
            >
              <h2 
                className="text-white text-center"
                style={{
                  fontFamily: 'Amita, cursive',
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: 0
                }}
              >
                Welcome To My Interactive Workspace
              </h2>
            </div>
            
            {/* Bottom Text */}
            <p 
              className="text-white text-center"
              style={{
                fontFamily: 'Amita, cursive',
                fontSize: '20px',
                fontWeight: '400',
                margin: 0,
                lineHeight: '1.4'
              }}
            >
              Things aren&apos;t always what they seem.<br />
              Explore, click, and discover.
            </p>
          </div>
        </div>
      )}

      {/* Curtain (main page) that slides up */}
      <div
        ref={curtainRef}
        className="fixed inset-0 w-screen h-screen overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <Loader />
        {!fromWindows && <WelcomeScreen onEnterClick={handleEnterClick} />}
      </div>

      {/* Full Terms and Conditions Modal */}
      {(showTermsModal || isClosingTermsModal) && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            ref={termsModalBackdropRef}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleCloseTermsModal}
            style={{ opacity: 0 }}
          />
          
          {/* Modal Content */}
          <div 
            ref={termsModalContentRef}
            className="relative rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            style={{ backgroundColor: '#845399', opacity: 0, transform: 'scale(0.9) translateY(20px)' }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white border-opacity-20 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">TERMS AND CONDITIONS</h2>
              <button
                onClick={handleCloseTermsModal}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="px-6 py-4 overflow-y-auto max-h-[70vh] pb-20">
              <div className="text-sm text-white leading-relaxed space-y-4">
                <p>
                  <strong>Welcome to The Coordinated Living!</strong>
                </p>
                <p>
                  These terms and conditions outline the rules and regulations for the use of the Website, located at{' '}
                  <a href="https://thecoordinatedliving.com/" className="underline font-bold" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                    https://thecoordinatedliving.com/
                  </a>
                </p>
                <p>
                  The Terms and Conditions on this webpage, as may without notice, be amended from time to time, shall apply to all our services directly or indirectly (through our authorized agents and sub-agents) made available online, any mobile device, by email or by telephone, as well as any other electronic media.
                </p>
                <p>
                  By accessing, browsing and using our website or any of our platform (hereafter collectively referred to as the &quot;website&quot;) and/or by completing a booking, you recognize and agree to have read, understood and agreed to the terms and conditions, including the privacy statement as set out below. You must NOT use this website if you disagree with any of the Terms and Conditions as stated below.
                </p>
                <p>
                  The pages, content and set-up of these pages, and the services provided on these pages and through the website are owned, operated and provide by THE COORDINATE LIVING (hereinafter referred to as IKOORDINATE) and are provided for your personal, non-commercial use only, subject to the terms and conditions set out below.
                </p>
                <p>
                  The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this website and compliant to the Company&apos;s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client&apos;s needs in respect of provision of the Company&apos;s stated services, in accordance with and subject to, prevailing law of Ghana. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                </p>
                <p>
                  IKOORDINATE reserves the right to modify all information, including Terms and Conditions, as well as all other features at any time without giving you prior notice. Your use of this website following any modifications constitutes your agreement to follow and be bound by the Terms and Conditions as modified.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">Table of Contents</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Definitions</li>
                  <li>Scope of Service</li>
                  <li>Privacy Policy</li>
                  <li>Children&apos;s Privacy</li>
                  <li>Cookies</li>
                  <li>License</li>
                  <li>Hyperlinking to our Content</li>
                  <li>Content Liability</li>
                  <li>Reservation of Rights</li>
                  <li>Prices</li>
                  <li>Payment</li>
                  <li>Correspondence and Communication</li>
                  <li>Disclaimer</li>
                  <li>Intellectual property rights</li>
                  <li>Dispute Resolution</li>
                  <li>Removal of links</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">1. DEFINITIONS</h3>
                <p>
                  &quot;IKOORDINATE&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;, &quot;the company&quot; means THE COORDINATE LIVING.
                </p>
                <p>
                  &quot;IKOORDINATE&quot;, is the trade name for THE COORDINATE LIVING, a Sole Proprietorship registered under the laws of Ghana, and having its registered address at Number 26 Ntreh Street, Adenta- Greater Accra Region.
                </p>
                <p>
                  The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
                <p>
                  For the purposes of this Privacy Policy:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>&quot;Account&quot;</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                  <li><strong>&quot;Affiliate&quot;</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                  <li><strong>&quot;Company&quot;</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Ikoordinate, Accra, Ghana.</li>
                  <li><strong>&quot;Cookies&quot;</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>
                  <li><strong>&quot;Country&quot;</strong> refers to: Ghana</li>
                  <li><strong>&quot;Device&quot;</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                  <li><strong>&quot;Personal Data&quot;</strong> is any information that relates to an identified or identifiable individual.</li>
                  <li><strong>&quot;Platform&quot;</strong> means the (mobile) website and apps on which the Service is made available, owned, controlled, managed, maintained and/or hosted by IKOORDINATE</li>
                  <li><strong>&quot;Service&quot;</strong> means the online facility booking avenue (including the facilitation of payments) of various products and services made available by IKOORDINATE.</li>
                  <li><strong>&quot;Service Provider&quot;</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</li>
                  <li><strong>&quot;Usage Data&quot;</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</li>
                  <li><strong>&quot;Website&quot;</strong> refers to The Coordinated Living, accessible from https://thecoordinatedliving.com/</li>
                  <li><strong>&quot;You&quot;</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">2. SCOPE OF SERVICE</h3>
                <p>
                  IKOORDINATE and its agents and partners shall provide an online service through the Platform, on which visitors/individuals of the Platform and by subscribing to the website, you enter into a direct (legally binding) contractual relationship with IKOORDINATE.
                </p>
                <p>
                  We would employ optimum use of reasonable skill and care in the provision of our service. We rely on information provided to us by other service providers in the provisions of our services. We therefore cannot guarantee that all information is accurate, complete or correct, nor can we be held liable for any such information, errors (whether patent or latent), any interruptions (whether due to any temporary and/or partial breakdown, repair, upgrade or maintenance of our Platform or otherwise).
                </p>
                <p>
                  Our service is made available for personal and non-commercial use only. Therefore, you are not allowed to re-sell, deep-link, use, copy, monitor, display, download or reproduce any content or information, software, bookings, tickets, products or services available on our Platform for any commercial or competitive activity or purpose without our prior knowledge.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">3. PRIVACY POLICY</h3>
                <p>
                  IKOORDINATE respects your privacy and are committed to ensuring the safety of the information you provide us. In order to constantly improve upon the services that we provide you with, we may collect and use information which you provide to us.
                </p>
                <p>
                  While using Our Service, we may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Usage Data</li>
                </ul>
                
                <p className="mt-4">
                  The Company may use Personal Data for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>To provide and maintain our Service:</strong> including to monitor the usage of our Service.</li>
                  <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
                  <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                  <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application&apos;s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
                  <li><strong>To provide you with news, special offers and general information:</strong> about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>
                  <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
                  <li><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</li>
                  <li><strong>For other purposes:</strong> We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</li>
                </ul>
                
                <p className="mt-4">
                  We may share Your personal information in the following situations:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</li>
                  <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                  <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
                  <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
                  <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
                  <li><strong>With Your consent:</strong> We may disclose Your personal information for any other purpose with Your consent.</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">4. CHILDREN&apos;S PRIVACY</h3>
                <p>
                  Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, we take steps to remove that information from Our servers.
                </p>
                <p>
                  If we need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, we may require Your parent&apos;s consent before We collect and use that information.
                </p>
                <p>
                  We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                </p>
                <p>
                  We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. If you have any questions about this Privacy Policy, you can contact us:
                </p>
                <p>
                  By email: <a href="mailto:letstalk@thecoordinatedliving.com" className="underline font-bold" style={{ color: 'white' }}>letstalk@thecoordinatedliving.com</a>
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">5. COOKIES</h3>
                <p>
                  Cookies are used for different purposes. They allow you to be recognized as the same user across the pages of a website, between websites or in your usage of an app. The types of information that we collect through cookies include IP address; device ID; viewed pages; browser type; browsing information; operating system; internet service provider; timestamp; responses to advertisements; the referring URL; and features used or activities engaged in within the website/apps.
                </p>
                <p>
                  We employ the use of cookies. By accessing website, you agree to use cookies in agreement with the ikoordinate&apos;s Privacy Policy.
                </p>
                <p>
                  Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                </p>
                <p>
                  Our website and apps use cookies for different purposes, these include;
                </p>
                
                <h4 className="text-md font-semibold text-white mt-4 mb-2">Tracking Technologies and Cookies</h4>
                <p>
                  We endeavor to offer our visitors an advanced, user-friendly website and apps that adapt automatically to their needs and wishes. To achieve this, we use technical cookies to show you our website, to track the activity on our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.
                </p>
                <p>
                  These technical cookies are absolutely necessary for our website to function properly. The technologies We use may include:
                </p>
                
                <h4 className="text-md font-semibold text-white mt-4 mb-2">Cookies or Browser Cookies</h4>
                <p>
                  A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, you may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.
                </p>
                
                <h4 className="text-md font-semibold text-white mt-4 mb-2">Web Beacons</h4>
                <p>
                  Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).
                </p>
                <p>
                  Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
                </p>
                <p>
                  We use both Session and Persistent Cookies for the purposes set out below:
                </p>
                
                <h4 className="text-md font-semibold text-white mt-4 mb-2">Necessary / Essential Cookies</h4>
                <p>
                  These are session Cookies administered by Ikoordinate and these Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                </p>
                
                <h4 className="text-md font-semibold text-white mt-4 mb-2">Cookies Policy / Notice Acceptance Cookies</h4>
                <p>
                  These are Persistent Cookies that are administered by Us for the purposes of identifying if users have accepted the use of cookies on the Website.
                </p>
                
                <h4 className="text-md font-semibold text-white mt-4 mb-2">Functionality Cookies</h4>
                <p>
                  We also use functional cookies to remember your preferences and to help you to use our website and apps efficiently and effectively. These functional cookies are not strictly necessary for the functioning of our website or apps, but they add functionality and enhance the services we provide you with.
                </p>
                <p>
                  The purpose of these functional Cookies is to allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                </p>
                <p>
                  For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the cookies section of our Privacy Policy
                </p>
                
                <h4 className="text-md font-semibold text-white mt-4 mb-2">Commercial cookies</h4>
                <p>
                  We use third-party cookies as well as our own to display personalized advertisements on our websites and on other websites. This is called &quot;retargeting,&quot; and it is based on browsing activities, such as the destinations you have been searching for, the product you have viewed and the prices you have been shown.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">6. LICENSE</h3>
                <p>
                  Unless otherwise stated ikoordinate and/or its licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may access this from The Coordinated Living for your own personal use subjected to restrictions set in these terms and conditions.
                </p>
                <p>
                  You must not:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Republish material from THE COORDINATE LIVING</li>
                  <li>Sell, rent or sub-license material from THE COORDINATE LIVING</li>
                  <li>Reproduce, duplicate or copy material from THE COORDINATE LIVING</li>
                  <li>Redistribute content from THE COORDINATE LIVING</li>
                </ul>
                <p>
                  Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. ikoordinate does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of ikoordinate, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, ikoordinate shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                </p>
                <p>
                  ikoordinate reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
                </p>
                <p>
                  You warrant and represent that:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                  <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                  <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                  <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                </ul>
                <p>
                  You hereby grant ikoordinate a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">7. HYPERLINKING TO OUR CONTENT</h3>
                <p>
                  The following organizations may link to our website without prior written approval:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Government agencies;</li>
                  <li>Search engines;</li>
                  <li>News organizations;</li>
                  <li>Online directory distributors may link to our website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                  <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                </ul>
                <p>
                  These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party&apos;s site.
                </p>
                <p>
                  We may consider and approve other link requests from the following types of organizations:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>commonly-known consumer and/or business information sources;</li>
                  <li>dot.com community sites;</li>
                  <li>associations or other groups representing charities;</li>
                  <li>online directory distributors;</li>
                  <li>internet portals;</li>
                  <li>accounting, law and consulting firms; and</li>
                  <li>educational institutions and trade associations.</li>
                </ul>
                <p>
                  We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of ikoordinate; and (d) the link is in the context of general resource information.
                </p>
                <p>
                  These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party&apos;s site.
                </p>
                <p>
                  If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to ikoordinate. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
                </p>
                <p>
                  Approved organizations may hyperlink to our website as follows:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>By use of our corporate name; or</li>
                  <li>By use of the uniform resource locator being linked to; or</li>
                  <li>By use of any other description of our website being linked to that makes sense within the context and format of content on the linking party&apos;s site.</li>
                </ul>
                <p>
                  No use of ikoordinate&apos;s logo or other artwork will be allowed for linking absent a trademark license agreement.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">8. CONTENT LIABILITY</h3>
                <p>
                  We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">9. RESERVATION OF RIGHTS</h3>
                <p>
                  We reserve the right to request that you remove all links or any particular link to our website. You approve to immediately remove all links to our Website upon request. We also reserve the right to these terms and conditions and it&apos;s linking policy at any time. By continuously linking to our website, you agree to be bound to and follow these linking terms and conditions.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">10. PRICES</h3>
                <p>
                  The prices on our Platform are highly competitive. All our services are at a subscription fee including VAT/sales tax and all other taxes (subject to change of such taxes), unless stated otherwise on our Platforms or the confirmation email.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">11. PAYMENT</h3>
                <p>
                  If applicable and available, you may be required to make full or part-payment of subscription fee as required under the payment policy of website in question by means of secure online payment (all to the extent offered and supported by your bank). In some cases, mobile money payment may be allowed.
                </p>
                <p>
                  There may be instances where payment is safely processed from your credit/debit card, bank account or mobile money account to our bank account through a third-party payment processor. Any payment facilitated by us will in each case constitute a payment of (part of) the website fee price by you of the relevant product or service in final settlement of such (partial) due and payable price and you cannot reclaim such paid monies.
                </p>
                <p>
                  For certain (non-refundable) rates or special offers, please note that we may require that payment is made upfront by wire transfer (if available) or by credit card or mobile money, and therefore your credit card may be pre-authorized or charged (sometimes without any option for refund) upon paying for the site.
                </p>
                <p>
                  If you wish to review, adjust or cancel your subscription, please revert to the confirmation email and follow the instructions therein. Please note depending on the particular subscription in question, you may either be charged for your cancellation, or forfeit any prepaid amount.
                </p>
                <p>
                  If you have a late or delayed fees payment date, make sure to effectively communicate it to us to avoid cancellation of a subscription or renewal without prior notice.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">12. CORRESPONDENCE AND COMMUNICATION</h3>
                <p>
                  Ikoordinate shall communicate to prospective subscribers via one or more of the following means – SMS, Email, Phone Call, etc. Customers may also reach the company through our CONTACT US mediums during work hours.
                </p>
                <p>
                  By subscribing, you agree to receive from us
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>an email, SMS, phone call or any of our communication mediums as listed above, shortly after your successful subscription providing you with certain information relevant to the website.</li>
                  <li>an email containing a receipt of your subscription fee. Please see our privacy and cookies policy for more information about how we may contact you</li>
                </ul>
                <p>
                  In order to duly complete and secure your booking, you need to use your preferred and correct email address. We are not responsible or liable for (and have no obligation to verify) any wrong or misspelled email address or inaccurate or wrong (mobile) phone number or credit card number or mobile money number.
                </p>
                <p>
                  Any claim or complaint against Ikoordinate or in respect of the service we provide must be promptly submitted via email, but in any event within thirty (30) days after the event giving rise to the complaint. Any claim or complaint that is submitted after the thirty (30) day period, may be rejected and the claimant shall forfeit its right to any damages, compensation or costs.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">13. DISCLAIMER</h3>
                <p>
                  To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>limit or exclude our or your liability for death or personal injury;</li>
                  <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                  <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                  <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                </ul>
                <p>
                  The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                </p>
                <p>
                  As long as the information and services on the website are provided we will not be liable for any loss or damage of any nature.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">14. INTELLECTUAL PROPERTY RIGHTS</h3>
                <p>
                  Unless stated otherwise, the software required for our services or available at or used by our Website/Platform and the intellectual property rights (including the copyrights) of the contents and information of and material on our Platform are owned by Ikoordinate, its suppliers or providers.
                </p>
                <p>
                  Ikoordinate exclusively retains ownership of all rights, title and interest in and to all intellectual property rights of the Platform/website on which the service is made available. You are not entitled to copy, scrape, deep-link, etc. to publish, promote, market, integrate, use, combine or otherwise use the content or our brand without our express written permission. Any unlawful use or any of the aforementioned actions will constitute a material infringement of our intellectual property rights which will entitle us to sue.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">15. GOVERNING LAW</h3>
                <p>
                  To the extent permitted by law, these Terms and Conditions and the provision of our services shall be governed by and construed in accordance with the laws of the Republic of Ghana.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">16. DISPUTE RESOLUTION</h3>
                <p>
                  Any dispute arising out of these general terms and conditions and our services shall in the first instance be settled amicably through mediation, failing which such dispute shall be submitted to a Court of competent jurisdiction in Accra, Ghana.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">17. REMOVAL OF LINKS FROM OUR WEBSITE</h3>
                <p>
                  If you find any link on our website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
                </p>
                <p>
                  We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed inset-0 flex items-start justify-center pt-8 z-[99999] pointer-events-none">
          <div 
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 pointer-events-auto"
            ref={(el) => {
              if (el) {
                gsap.fromTo(el, 
                  { 
                    opacity: 0,
                    y: -50,
                    scale: 0.9
                  },
                  { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                  }
                );
              }
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* AskAQuestion Modal */}
      {showAskAQuestion && (
        <AskAQuestion onClose={() => setShowAskAQuestion(false)} />
      )}

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={handleDonationModalClose}
      />

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={showComingSoonModal}
        onClose={handleComingSoonModalClose}
        featureName={comingSoonFeature}
      />



    </div>
  );
};

export default Page;
