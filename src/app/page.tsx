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
          <Image src="/loading-screen/logo.svg" width={280} height={105} alt="Coordinated Living Logo" />
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
    <div className="welcome-container opacity-0 relative w-screen h-screen overflow-hidden bg-black text-white flex justify-center items-center text-center p-8 sm:p-20">
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
      <div className="relative z-10 flex flex-col items-center">
        <div ref={logoRef} className="w-24 h-auto welcome-logo">
          <Image src="/loading-screen/logo.svg" width={96} height={36} alt="Logo" />
        </div>
        <div className="max-w-3xl mx-auto welcome-text" style={{ marginTop: '137px' }}>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight" style={{ fontFamily: 'Amita' }}>
            Where His grace abounds through the changing scenes of life.
          </h1>
        </div>
        <div className="welcome-button" style={{ marginTop: '137px' }}>
          <button
            onClick={onEnterClick}
            className="bg-white text-black px-8 py-4 rounded-full font-bold text-base tracking-wider transition-shadow duration-300 ease-in-out hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] cursor-pointer"
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
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  
  // Debug: Log when showPostModal changes
  useEffect(() => {
    console.log('showPostModal changed to:', showPostModal);
  }, [showPostModal]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [fromWindows, setFromWindows] = useState(false);
  const [showFumaaModal, setShowFumaaModal] = useState(false);

  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const postTemplateRef = useRef<HTMLDivElement>(null);
  
  // Ultra-wide screen detection - Optimized to reduce flickering
  const [isUltraWide, setIsUltraWide] = useState(false);
  
  const mobileItems = ['JOIN OUR CHANNEL', 'ABOUT ME', 'POST', 'POUR INTO MY CUP', 'EXPERIENCE'];
  
  // Mobile navigation state
  const [currentMobileIndex, setCurrentMobileIndex] = useState(2);
  const [activeMobileItem, setActiveMobileItem] = useState(mobileItems[2]);

  
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

  // Auto-hide welcome modal after 5 seconds
  useEffect(() => {
    if (showWelcomeModal) {
      const timer = setTimeout(() => {
        const modal = document.querySelector('.welcome-modal-card');
        if (modal) {
          gsap.to(modal, {
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              setShowWelcomeModal(false);
            }
          });
        } else {
          setShowWelcomeModal(false);
        }
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showWelcomeModal]);

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
      // Show welcome modal and experience page immediately when curtain starts sliding
      .add(() => {
        setShowWelcomeModal(true);
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
          className="bg-black relative overflow-hidden workspace-bg"
        >
          {/* Mobile Background */}
          <div className="md:hidden absolute inset-0">
            <Image
              src="/mobile-background.png"
              alt="Mobile Background"
              fill
              className="object-cover"
              priority
            />
            {/* Glass Blur Overlay */}
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
            />
            
            {/* Mobile Navigation */}
            <div className="absolute top-8 left-4 right-4 z-10">
              <div className="relative flex items-center justify-center px-4 py-3">
                {/* Active Item Only */}
                <span 
                  className="text-2xl font-medium text-[#35B2C2] opacity-100 transition-all duration-500"
                  style={{ fontFamily: 'Amita' }}
                >
                  {activeMobileItem}
                </span>
              </div>
            </div>
            
            {/* Mobile Noticeboard Post */}
            <div className="absolute top-48 left-4 right-4 z-10">
              <div className="relative flex items-center justify-center">
                {/* Left Chevron */}
                <button 
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg absolute left-0 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleMobileNav('prev')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"></polyline>
                  </svg>
                </button>
                
                {/* Content Card */}
                <div className="relative" style={{ minHeight: '350px' }}>
                  <Image
                    src={
                      activeMobileItem === 'EXPERIENCE' ? '/experience-mobile.svg' :
                      activeMobileItem === 'JOIN OUR CHANNEL' ? '/join-channel-mobile.svg' :
                      activeMobileItem === 'ABOUT ME' ? '/about-me-mobile.svg' :
                      activeMobileItem === 'POUR INTO MY CUP' ? '/coffee-cup-mobile.svg' :
                      '/new-post-mobile.svg'
                    }
                    alt={
                      activeMobileItem === 'EXPERIENCE' ? 'Experience' :
                      activeMobileItem === 'JOIN OUR CHANNEL' ? 'Join Channel' :
                      activeMobileItem === 'ABOUT ME' ? 'About Me' :
                      activeMobileItem === 'POUR INTO MY CUP' ? 'Pour Into My Cup' :
                      'New Post'
                    }
                    width={300}
                    height={200}
                    className="w-full h-auto object-contain"
                    style={{
                      marginTop: activeMobileItem === 'POUR INTO MY CUP' ? '150px' : '0px',
                      marginLeft: activeMobileItem === 'POUR INTO MY CUP' ? '10px' : '0px'
                    }}
                  />
                  
                  {/* Smoke Effects for Coffee Cup */}
                  {activeMobileItem === 'POUR INTO MY CUP' && (
                    <>
                      <div
                        className="absolute pointer-events-none smoke-container"
                        style={{ 
                          zIndex: 1, 
                          top: '-40px', 
                          left: '40%',
                          transform: 'translateX(-50%)',
                          width: '200px',
                          height: '200px'
                        }}
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
                        className="absolute pointer-events-none smoke-container"
                        style={{ 
                          zIndex: 1, 
                          top: '-40px', 
                          left: '40%',
                          transform: 'translateX(-50%)',
                          width: '200px',
                          height: '200px'
                        }}
                      >
                        <Image
                          src="/smoke.png"
                          alt="Smoke"
                          width={200}
                          height={200}
                          className="w-full h-full object-contain smoke-animation2"
                        />
                      </div>
                    </>
                  )}
                </div>
                
                {/* Right Chevron */}
                <button 
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg absolute right-0 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleMobileNav('next')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>
              </div>
              

            </div>

          </div>
          
          {/* Desktop Content - Hidden on Mobile */}
          <div className="hidden md:block">
         

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

          {/* Lesley Letter Overlay */}
          {showLesleyLetter && (
            <div className="fixed inset-0 z-50">
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
                Return to Desk
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
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

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
                      <source src="/join-channel.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Post Modal */}
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
                Return to Desk
              </button>
              
              {/* Post Template Content */}
              <div className="absolute inset-0 flex items-center justify-center p-16">
                {/* Left Navigation Button */}
                {currentPostIndex > 0 && (
                  <button
                    onClick={handlePreviousPost}
                    className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
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
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
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

                <div className="relative z-10 max-w-2xl w-full">
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
                  
                  {/* Share button - outside template */}
                  <div 
                    className="flex justify-center mt-6 post-share-button"
                  >
                    <div className="relative">
                      <button
                        onClick={() => setShowShareOptions(!showShareOptions)}
                        className="bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer"
                        title="Share post"
                      >
                        Share This Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Share options dropdown - positioned outside modal to prevent blinking */}
          {showShareOptions && showPostModal && (
            <div className="fixed inset-0 z-[60] pointer-events-none">
              <div 
                className="absolute inset-0 pointer-events-auto"
                onClick={() => setShowShareOptions(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8 pointer-events-auto">
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

          {/* Welcome Modal */}
          {showWelcomeModal && (
            <div className="fixed inset-0 z-50">
              {/* Glass background blur */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
              />
              
              {/* Welcome Card */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div 
                  className="relative z-10 max-w-md w-full p-8 text-center welcome-modal-card"
                  style={{
                    backgroundColor: '#0F0F0F',
                    borderRadius: '26.22px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Coordinated Living Logo */}
                  <div className="flex justify-center" style={{ marginBottom: '24px' }}>
                    <Image
                      src="/modal-logo.svg"
                      alt="Coordinated Living Logo"
                      width={120}
                      height={120}
                      className="w-[120px] h-[120px]"
                    />
                  </div>

                  {/* Welcome Banner */}
                  <div
                    className="px-4 py-2"
                    style={{
                      backgroundColor: '#1D1C1E',
                      color: 'white',
                      borderRadius: '33.86px',
                      maxWidth: '300px',
                      margin: '0 auto',
                      marginBottom: '24px',
                    }}
                  >
                    <h2 className="text-white font-medium text-sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Amita, serif' }}>
                      Welcome to The Interactive Workspace
                    </h2>
                  </div>

                  {/* Instructional Text */}
                  <div className="text-center" style={{ marginBottom: '24px' }}>
                    <p className="text-white font-bold text-lg mb-2" style={{ fontSize: '1.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '12px', fontFamily: 'Amita, serif' }}>
                      Things aren&apos;t always what they seem.
                    </p>
                    <p className="text-gray-300 text-base" style={{ margin: 0, fontFamily: 'Roboto, sans-serif' }}>
                      Explore the workspace — you might be surprised by what you find.
                    </p>
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

      {/* Curtain (main page) that slides up */}
      <div
        ref={curtainRef}
        className="fixed inset-0 w-screen h-screen"
        style={{ zIndex: 10 }}
      >
        <Loader />
        {!fromWindows && <WelcomeScreen onEnterClick={handleEnterClick} />}
      </div>

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
