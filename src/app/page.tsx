"use client";
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Image from "next/image";
import { gsap } from 'gsap';
import PostTemplate from '../components/PostTemplate';
import { generatePDFFromPostData, generatePostPDF } from '../lib/pdfGenerator';

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
  
  // Debug: Log when showPostModal changes
  useEffect(() => {
    console.log('showPostModal changed to:', showPostModal);
  }, [showPostModal]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [fromWindows, setFromWindows] = useState(false);
  const [showFumaaModal, setShowFumaaModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [showExpandedEmailModal, setShowExpandedEmailModal] = useState(false);
  const [showGuidesModal, setShowGuidesModal] = useState(false);
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
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
    // Animate guides modal out with ease
    const modalContainer = document.querySelector('.guides-modal-card');
    
    if (modalContainer) {
      gsap.to(modalContainer, {
        opacity: 0,
        scale: 0.95,
        y: -20,
        duration: 0.6,
        ease: "power2.inOut",
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




  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isClosingTermsModal, setIsClosingTermsModal] = useState(false);
  const postTemplateRef = useRef<HTMLDivElement>(null);
  const termsModalBackdropRef = useRef<HTMLDivElement>(null);
  const termsModalContentRef = useRef<HTMLDivElement>(null);
  
  // Ultra-wide screen detection - Optimized to reduce flickering
  const [isUltraWide, setIsUltraWide] = useState(false);
  
  const mobileItems = ['ABOUT ME', 'POST', 'ASK ME A QUESTION', 'JOIN OUR CHANNEL', 'GUIDES', 'POUR INTO MY CUP', 'TERMS AND CONDITIONS'];
  
  // Mobile navigation state
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [activeMobileItem, setActiveMobileItem] = useState(mobileItems[0]);

  
  const handleMobileNav = (direction: 'prev' | 'next') => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentMobileIndex === 0 ? mobileItems.length - 1 : currentMobileIndex - 1;
    } else {
      newIndex = currentMobileIndex === mobileItems.length - 1 ? 0 : currentMobileIndex + 1;
    }
    setCurrentMobileIndex(newIndex);
    setActiveMobileItem(mobileItems[newIndex]);
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

  // Sample posts data
  const posts = [
    {
      title: "POST TITLE HERE",
      leftContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            &quot;A thousand times I failed, still your mercy remains, should I stumble out here still I&apos;m caught in your grace.&quot; This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            For years, I pursued other paths, pouring tireless effort into fields he hadn&apos;t called me to, only to find no lasting fruit. That rollercoaster of emotions, the unpleasant experiences, the endless accusations and judgments thrown around – they&apos;re hallmarks of a mind out of alignment.
          </p>
        </>
      ),
      rightContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            Want to know the root cause? It&apos;s simply a lack of trust in the Father. No matter how you rationalize it, we constantly try to force a fit where there isn&apos;t one.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            But in Christ, we step into the true identity the Father created for us. This identity comes with specific tasks, assignments, and responsibilities, all of which we are perfectly equipped for. It&apos;s there we discover an unexplainable peace, joy, and confidence.
          </p>
        </>
      ),
      bottomRightContent: (
        <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
          When we align ourselves with God&apos;s purpose for our lives, we find a peace that surpasses all understanding. This isn&apos;t about perfection – it&apos;s about walking in the identity He has given us, trusting that He has equipped us for every good work.
        </p>
      )
    },
    {
      title: "SECOND POST TITLE",
      leftContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            &quot;In all things God works for the good of those who love him.&quot; This promise from Romans 8:28 has been my anchor through many storms. When life seems chaotic and uncertain, this truth reminds me that God is always at work.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            Too often we try to control every aspect of our lives, forgetting that we serve a God who sees the bigger picture. Our limited perspective can&apos;t comprehend the intricate ways He weaves our experiences together for His glory and our good.
          </p>
        </>
      ),
      rightContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            Trusting God doesn&apos;t mean we become passive or indifferent to our circumstances. Instead, it means we actively seek His will while resting in His sovereignty. We pray, we work, we serve, but we do so with open hands.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            The peace that comes from this kind of trust is unlike anything the world can offer. It&apos;s not dependent on circumstances, but on the unchanging character of our Heavenly Father who loves us beyond measure.
          </p>
        </>
      ),
      bottomRightContent: (
        <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
          As we learn to trust God more deeply, we begin to see His hand in every detail of our lives. What once seemed like random events become part of a beautiful tapestry He&apos;s weaving for our good and His glory.
        </p>
      )
    },
    {
      title: "THIRD POST TITLE",
      leftContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            &quot;Be still and know that I am God.&quot; These words from Psalm 46:10 have become increasingly precious to me in our fast-paced world. In the midst of constant noise and endless demands, God calls us to stillness.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            Stillness isn&apos;t just about physical quiet, though that&apos;s important. It&apos;s about quieting our hearts and minds before the Lord, allowing His peace to wash over us and His voice to be heard above the chaos.
          </p>
        </>
      ),
      rightContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            In those moments of stillness, we remember who God is and who we are in Him. We&apos;re reminded that He is sovereign, He is good, and He is working all things together for our good.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            The world tells us to hustle, to strive, to never stop moving. But God invites us to rest in Him, to find our strength in quietness and trust. This is the counter-cultural way of the Kingdom.
          </p>
        </>
      ),
      bottomRightContent: (
        <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
          As we practice stillness, we discover that God&apos;s presence is our greatest treasure. In Him we find rest for our souls, peace for our minds, and strength for our journey.
        </p>
      )
    }
  ];

  // Navigation functions
  const handlePreviousPost = () => {
    setCurrentPostIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextPost = () => {
    setCurrentPostIndex(prev => Math.min(posts.length - 1, prev + 1));
  };

  const handlePreviousGuide = () => {
    const guideImage = document.querySelector('.guide-image');
    if (guideImage) {
      gsap.to(guideImage, {
        opacity: 0,
        x: 50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentGuideIndex(prev => Math.max(0, prev - 1));
          gsap.to(guideImage, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    } else {
      setCurrentGuideIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNextGuide = () => {
    const guideImage = document.querySelector('.guide-image');
    if (guideImage) {
      gsap.to(guideImage, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentGuideIndex(prev => Math.min(3, prev + 1));
          gsap.to(guideImage, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    } else {
      setCurrentGuideIndex(prev => Math.min(3, prev + 1));
    }
  };



  // Share function
  const handleShare = async (type: 'link' | 'pdf') => {
    const postId = (currentPostIndex + 1).toString();
    const postTitle = posts[currentPostIndex].title;
    
    if (type === 'link') {
      // Generate shareable link
      const shareUrl = `${window.location.origin}/post/${postId}`;
      
      try {
        await navigator.share({
          title: postTitle,
          text: `Check out this post: ${postTitle}`,
          url: shareUrl,
        });
      } catch {
        // Fallback to clipboard copy
        try {
          // Ensure document is focused
          document.body.focus();
          
          // Try modern clipboard API first
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareUrl);
            setToastMessage('Link copied to clipboard!');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setToastMessage('Link copied to clipboard!');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          }
        } catch (clipboardError) {
          console.error('Failed to copy to clipboard:', clipboardError);
          // Still show success message even if clipboard fails
          setToastMessage('Link ready to share!');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }
      }
    } else if (type === 'pdf') {
      // Generate PDF from the actual rendered PostTemplate
      if (postTemplateRef.current) {
        const success = await generatePostPDF(postTemplateRef.current, posts[currentPostIndex].title);
        
        if (success) {
          // PDF generated successfully
        }
      } else {
        // Fallback to data-based generation
        const currentPost = posts[currentPostIndex];
        
        // Extract text content from React nodes
        const extractText = (node: React.ReactNode): string => {
          if (typeof node === 'string') return node;
          if (typeof node === 'number') return node.toString();
          if (Array.isArray(node)) return node.map(extractText).join(' ');
          if (node && typeof node === 'object' && 'props' in node) {
            const props = node as { props: { children?: React.ReactNode } };
            return extractText(props.props.children);
          }
          return '';
        };

        const leftContent = extractText(currentPost.leftContent);
        const rightContent = extractText(currentPost.rightContent);
        const bottomRightContent = extractText(currentPost.bottomRightContent);

        const success = await generatePDFFromPostData(
          currentPost.title,
          leftContent,
          rightContent,
          bottomRightContent,
          currentPostIndex + 1,
          posts.length
        );

        if (success) {
          // PDF generated successfully
        }
      }
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

  // Check if coming back from Windows page
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromWindowsParam = urlParams.get('fromWindows');
    
    if (fromWindowsParam === 'true') {
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


  useEffect(() => {
    // Don't start the loader timer if coming from Windows
    if (fromWindows) return;
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [fromWindows]);

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
    if (!pageRef.current) return;
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
      // Show experience page immediately when curtain starts sliding
      .add(() => {
        setExperienceVisible(true);
      })
      // Now slide the entire curtain (main page) up to reveal experience
      .to(curtainRef.current, {
        y: '-100%',
        duration: 1.2,
        ease: 'power3.inOut'
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
    if (isLoaded && pageRef.current) {
      const loader = pageRef.current.querySelector('.loader-container');
      const welcome = pageRef.current.querySelector('.welcome-container');

      if (loader && welcome) {
        gsap.timeline({
          onComplete: () => {
            if (loader instanceof HTMLElement) loader.style.display = 'none';
          }
        })
          .to(loader, { opacity: 0, duration: 1.5, ease: 'power2.inOut' })
          .to(welcome, { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, "-=1.0");
      }
    }
  }, [isLoaded]);

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





  return (
    <div ref={pageRef} className="relative ">
      {/* Experience page hidden behind */}
      {experienceVisible && ( 
        <div
          ref={experienceRef}
          className="bg-white relative overflow-hidden workspace-bg"
        >
          {/* Mobile Background */}
          <div className="xl:hidden absolute inset-0 bg-white" style={{ paddingBottom: '100px' }}>
            
            
            
            {/* Mobile Noticeboard Post */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 z-10">
              <div className="relative flex items-center justify-center" style={{ minHeight: '280px' }}>
                {/* Left Chevron */}
                <button 
                  className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg absolute left-0 cursor-pointer hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
                  onClick={() => handleMobileNav('prev')}
                  style={{ 
                    minWidth: '44px', 
                    minHeight: '44px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <svg width="12" height="12" className="xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"></polyline>
                  </svg>
                </button>
                
                {/* Content Card */}
                <div className="relative flex-1 mx-8 xs:mx-10 sm:mx-12 md:mx-16" style={{ minHeight: '280px', maxWidth: 'calc(100vw - 120px)' }}>
                  <div 
                    className="cursor-pointer"
                    onClick={() => {
                      if (activeMobileItem === 'POST') {
                        setShowPostModal(true);
                                            } else if (activeMobileItem === 'GUIDES') {
                        setShowGuidesModal(true);
                      }
                    }}
                  >
                    {activeMobileItem === 'ASK ME A QUESTION' ? (
                      <div 
                        className="w-full h-auto rounded-lg shadow-lg overflow-hidden flex flex-col"
                        style={{
                          maxHeight: '60vh',
                          minHeight: '250px',
                          maxWidth: '100%',
                          backgroundColor: '#2481C2'
                        }}
                      >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-2 border-b border-gray-200 flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                          <span className="text-white font-medium text-sm">New Message</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Expand button clicked!');
                              setShowExpandedEmailModal(true);
                              console.log('showExpandedEmailModal set to true');
                            }}
                            className="text-white px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                            style={{ backgroundColor: '#ffffff', color: '#2481C2' }}
                          >
                            Expand
                          </button>
                        </div>
                        
                        {/* Email Form */}
                        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                          {/* To Field */}
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium w-8">To:</span>
                            <div className="px-2 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}>
                              letstalk@coordinatedliving.com
                            </div>
                          </div>
                          
                          <div className="border-b border-gray-200"></div>
                          
                          {/* From Field */}
                          <div className="flex items-center space-x-2">
                            <input 
                              type="email" 
                              placeholder="Your email address"
                              className="flex-1 border-none outline-none text-white placeholder-gray-300 text-sm"
                              style={{ backgroundColor: 'transparent' }}
                            />
                          </div>
                          
                          <div className="border-b border-gray-200"></div>
                          
                          {/* Subject Field */}
                          <div className="flex items-center space-x-2">
                            <input 
                              type="text" 
                              placeholder="Subject"
                              className="flex-1 border-none outline-none text-white placeholder-gray-300 text-sm"
                              style={{ backgroundColor: 'transparent' }}
                            />
                          </div>
                          
                          <div className="border-b border-gray-200"></div>
                          
                          {/* Message Field */}
                          <div className="mt-4">
                            <div className="text-white font-medium mb-2 text-base">
                              Enter message
                            </div>
                            <textarea 
                              placeholder=""
                              rows={6}
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              className="w-full border-none outline-none resize-none text-white placeholder-gray-300"
                              style={{ backgroundColor: 'transparent' }}
                            />
                          </div>
                        </div>
                        
                        {/* Send Button */}
                        <div className="p-4 border-t border-gray-200 flex-shrink-0">
                          <button 
                            className="w-full text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                            style={{ backgroundColor: '#ffffff', color: '#2481C2' }}
                            onClick={() => {
                              // Handle send email functionality
                              console.log('Send email clicked');
                            }}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    ) : activeMobileItem === 'GUIDES' ? (
                      <Image
                        src="/guides-mobile.svg"
                        alt="Guides"
                        width={300}
                        height={200}
                        className="w-full h-auto object-contain max-w-full"
                        style={{
                          maxHeight: '60vh',
                          minHeight: '250px'
                        }}
                      />
                    ) : activeMobileItem === 'TERMS AND CONDITIONS' ? (
                      <div className="w-full h-full flex items-center justify-center p-2 pt-16">
                        <div className="rounded-2xl shadow-xl w-full max-w-lg max-h-[60vh] overflow-hidden" style={{ backgroundColor: '#2481C2' }}>
                          {/* Header */}
                          <div className="px-6 py-4">
                            <h2 className="text-lg font-bold text-white">TERMS AND CONDITIONS</h2>
                          </div>
                          
                          {/* Content */}
                          <div className="px-8 py-4 overflow-y-auto max-h-[35vh]">
                            <div className="text-sm text-white leading-relaxed space-y-3">
                              <p>
                                <strong>Welcome to The Coordinated Living!</strong>
                              </p>
                              <p>
                                These terms and conditions outline the rules and regulations for the use of the Website, located at{' '}
                                <a href="https://thecoordinatedliving.com/" className="underline font-bold" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                                  https://thecoordinatedliving.<br />com/
                                </a>
                              </p>
                              <p>
                                The Terms and Conditions on this webpage, as may without notice, be amended from time to time, shall apply to all our services directly or indirectly (through our authorized agents and sub-agents) made available online, any mobile device, by email or by telephone, as well as any other electronic media.
                              </p>
                              <p>
                                By accessing, browsing and using our website or any of our platform (hereafter collectively referred to as the &quot;website&quot;) and/or by completing a booking, you recognize and agree to have read, understood and agreed to the terms and conditions, including the privacy statement as set out below. You must NOT use this website if you disagree with any of the Terms and Conditions as stated below.
                              </p>
                            </div>
                          </div>
                          
                          {/* Footer with View Full Terms button */}
                          <div className="px-6 py-4">
                            <button
                              onClick={() => setShowTermsModal(true)}
                              className="w-full bg-white text-gray-800 py-2 px-4 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200"
                            >
                              View Full Terms
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : activeMobileItem === 'JOIN OUR CHANNEL' ? (
                      <div 
                        className="w-full h-full flex items-center justify-center p-2 pt-16"
                        style={{
                          maxHeight: '60vh',
                          minHeight: '250px'
                        }}
                      >
                        <div className="rounded-2xl shadow-xl w-full max-w-lg max-h-[60vh] overflow-hidden" style={{ backgroundColor: '#2481C2' }}>
                          {/* Modal Header */}
                          <div className="flex justify-center items-center p-4">
                            <span className="text-white font-bold text-xl xs:text-2xl sm:text-3xl text-center" style={{ fontFamily: 'Amita, serif', whiteSpace: 'nowrap' }}>Deep Dive Teachings</span>
                          </div>
                          
                          {/* Content */}
                          <div className="p-4 xs:p-5 sm:p-6 space-y-4 overflow-y-auto text-center" style={{ maxHeight: 'calc(60vh - 120px)' }}>
                            <p className="text-white text-xs xs:text-sm leading-relaxed">
                              Are you longing for an in-depth exploration of God&apos;s Word and its application to the complexities of life? Our videos, delivered through an exclusive paid WhatsApp channel, provide detailed teaching and deeper insights. Join our community to journey further into understanding how His grace abounds even in the most profound changing scenes of life and cultivate an intimate relationship with the Lord.
                            </p>
                          </div>
                          
                          {/* Join Channel Button */}
                          <div className="p-4 xs:p-5 sm:p-6">
                            <Image
                              src="/join-channel-button-mobile.svg"
                              alt="Join Channel"
                              width={200}
                              height={60}
                              className="w-1/2 h-auto cursor-pointer hover:opacity-80 transition-opacity mx-auto"
                              onClick={() => {
                                // Handle join channel functionality
                                console.log('Join channel clicked');
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : activeMobileItem === 'POUR INTO MY CUP' ? (
                      <div 
                        className="w-full h-full flex items-center justify-center p-2 pt-16"
                        style={{
                          maxHeight: '60vh',
                          minHeight: '250px'
                        }}
                      >
                        <div className="rounded-2xl shadow-xl w-full max-w-lg max-h-[60vh] overflow-hidden" style={{ backgroundColor: '#2481C2' }}>
                          {/* Modal Header */}
                          <div className="flex justify-center items-center p-4">
                            <span className="text-white font-bold text-xl xs:text-2xl sm:text-3xl text-center" style={{ fontFamily: 'Amita, serif' }}>
                              A Cheerful Gift,<br />A Full Cup
                            </span>
                          </div>
                          
                          {/* Content */}
                          <div className="p-4 xs:p-5 sm:p-6 space-y-4 overflow-y-auto text-center" style={{ maxHeight: 'calc(60vh - 120px)' }}>
                            <p className="text-white text-sm xs:text-base leading-relaxed">
                              Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform. Thank you for your kindness!
                            </p>
                          </div>
                          
                          {/* Pour Into My Cup Button */}
                          <div className="p-4 xs:p-5 sm:p-6">
                            <Image
                              src="/pour-into-cup-mobile.svg"
                              alt="Pour Into My Cup"
                              width={200}
                              height={60}
                              className="w-1/2 h-auto cursor-pointer hover:opacity-80 transition-opacity mx-auto"
                              onClick={() => {
                                // Handle pour into my cup functionality
                                console.log('Pour into my cup clicked');
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : activeMobileItem === 'ABOUT ME' ? (
                      <div className="w-full h-full flex flex-col">
                        {/* Banner Image with ABOUT ME text */}
                        <div className="relative w-full" style={{ height: '200px', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', marginTop: 'calc(-50vh + 50%)', position: 'absolute', top: 0 }}>
                          <Image
                            src="/about-me-mobile-banner.png"
                            alt="About Me Banner"
                            fill
                            className="object-cover"
                          />
                          {/* ABOUT ME text overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-white text-2xl font-bold" style={{ fontFamily: 'Amita, serif' }}>
                              ABOUT ME
                            </h1>
                          </div>
                        </div>
                        
                        {/* Content Card - Overlapping the banner */}
                        <div 
                          className="fixed rounded-t-3xl"
                          style={{ 
                            backgroundColor: '#2481C2',
                            top: '-60px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100vw',
                            height: 'calc(100vh + 60px)',
                            zIndex: 10
                          }}
                        >
                        </div>
                      </div>
                    ) : (
                      <Image
                        src="/new-post-mobile.svg"
                        alt="New Post"
                        width={300}
                        height={200}
                        className="w-full h-auto object-contain max-w-full"
                        style={{
                          maxHeight: '60vh',
                          minHeight: '250px'
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Smoke Effects for Coffee Cup */}
                </div>
                
                {/* Right Chevron */}
                <button 
                  className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg absolute right-0 cursor-pointer hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
                  onClick={() => handleMobileNav('next')}
                  style={{ 
                    minWidth: '44px', 
                    minHeight: '44px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <svg width="12" height="12" className="xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>
              </div>
              

            </div>


          </div>
          
          {/* Bottom Tab Bar */}
          <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 p-3" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
            <div 
              className="flex items-center justify-around rounded-full px-4 py-3 mx-8"
              style={{ backgroundColor: '#2F4C6C' }}
            >
              {/* Home Icon */}
              <div className="flex items-center justify-center w-10 h-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7D7D7D" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </div>
              
              {/* Card/Wallet Icon - Active */}
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
              
              {/* Two-way Arrow Icon */}
              <div className="flex items-center justify-center w-10 h-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7D7D7D" strokeWidth="2">
                  <path d="M8 3L4 7l4 4"/>
                  <path d="M4 7h16"/>
                  <path d="M16 21l4-4-4-4"/>
                  <path d="M20 17H4"/>
                </svg>
              </div>
              
              {/* Line Graph Icon */}
              <div className="flex items-center justify-center w-10 h-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7D7D7D" strokeWidth="2">
                  <polyline points="22,12 18,12 15,21 9,3 6,9 2,9"/>
                </svg>
              </div>
              
              {/* Settings/Gear Icon */}
              <div className="flex items-center justify-center w-10 h-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7D7D7D" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
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
                setShowPostModal(true);
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
              <img
                src="/Polaroid-collage.svg"
                alt="Polaroid Collage"
                style={{
                  width: '100%',
                  height: '100%',
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
                        onClick={() => console.log('Join Channel clicked!')}
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
                        transform: 'scale(1.1)',
                        width: '100%',
                        height: '100%',
                        objectPosition: 'center'
                      }}
                    >
                      <source src="/join-channel-v2.webm" type="video/webm" />
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
                        onClick={() => console.log('Pour Into My Cup clicked!')}
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
              <div className="p-6 space-y-6 overflow-y-auto flex-1">
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



      {/* Guides Modal - Mobile Only */}
      {showGuidesModal && (
        <div className="fixed inset-0 z-[9999]">
          {/* Black overlay */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={handleCloseGuidesModal}
          />
          
          {/* Close button - top left */}
          <button
            onClick={handleCloseGuidesModal}
            className="absolute top-6 left-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer"
          >
            Close
          </button>
          
          {/* Modal content */}
          <div className="absolute inset-0 flex items-center justify-center p-4 pt-20">
            <div 
              className="relative z-10 w-full max-w-md guides-modal-card"
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
                      duration: 0.8,
                      ease: "power2.out",
                      delay: 0.2
                    }
                  );
                }
              }}
            >
              {/* Guide Image */}
              <div className="w-full flex items-center justify-center">
                <Image
                  src={`/guide-${currentGuideIndex + 1}-mobile.svg`}
                  alt={`Guide ${currentGuideIndex + 1}`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-contain guide-image"
                />
              </div>
              
              {/* Navigation and Download Buttons */}
              <div className="p-4 flex items-center justify-between">
                {/* Previous Button */}
                {currentGuideIndex > 0 && (
                  <button
                    onClick={handlePreviousGuide}
                    className="bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 p-2 rounded-full font-medium shadow-lg hover:bg-opacity-100 transition-all cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>
                )}
                
                {/* Download Button */}
                <button
                  className="bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-opacity-100 transition-all cursor-pointer"
                  onClick={() => {
                    // Handle download functionality
                    console.log('Download guide clicked');
                  }}
                >
                  Download
                </button>
                
                {/* Next Button */}
                {currentGuideIndex < 3 && (
                  <button
                    onClick={handleNextGuide}
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
          <div className="absolute inset-0 flex items-center justify-center p-4 xl:p-16 pt-24 xl:pt-16">
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
                className="bg-white rounded-lg shadow-2xl overflow-hidden post-modal-content post-modal-container"
                ref={postTemplateRef}
              >
                <PostTemplate
                  title={posts[currentPostIndex].title}
                  currentPage={currentPostIndex + 1}
                  totalPages={posts.length}
                  leftContent={posts[currentPostIndex].leftContent}
                  rightContent={posts[currentPostIndex].rightContent}
                  bottomRightContent={posts[currentPostIndex].bottomRightContent}
                />
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
                    handleShare('link');
                    setShowShareOptions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Share as Link
                </button>
                <button
                  onClick={() => {
                    handleShare('pdf');
                    setShowShareOptions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Curtain (main page) that slides up */}
      <div
        ref={curtainRef}
        className="fixed inset-0 w-screen h-screen"
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
            <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
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

    </div>
  );
};

export default Page;
