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
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
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
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [fromWindows, setFromWindows] = useState(false);
  const [showFumaaModal, setShowFumaaModal] = useState(false);
  const [showLaptopTooltip, setShowLaptopTooltip] = useState(false);
  const [showLetterTooltip, setShowLetterTooltip] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const postTemplateRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={pageRef} className="relative ">
      {/* Experience page hidden behind */}
      {experienceVisible && (
        <div
          ref={experienceRef}
          className=" w-screen h-screen bg-black relative overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <Image 
            src="/coordinated-3.webp"
            alt="Experience Background"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />

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

          {/* Laptop iframe overlay */}
          <div
            ref={laptopRef}
            className="absolute cursor-pointer laptop-iframe inset-0"
            onMouseEnter={() => setShowLaptopTooltip(true)}
            onMouseLeave={() => setShowLaptopTooltip(false)}
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
                    // Navigate immediately when zoom completes
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
              src="/windows"
              style={{
                width: '77vw',
                height: '40vw',
                border: 'none',
                borderRadius: '0',
                backgroundColor: 'transparent',
                transform: 'scale(0.3)',
                transformOrigin: 'center center',
                position: 'absolute',
                top: '-13.5vw',
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

          {/* Laptop Tooltip - positioned outside the laptop container */}
          <div className={`absolute text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-500 pointer-events-none z-50 whitespace-nowrap laptop-tooltip-glow ${showLaptopTooltip ? 'opacity-90 scale-100' : 'opacity-0 scale-95'}`} style={{ 
            top: '50%', 
            right: '42%',
            transform: 'translateY(-100%)',
            backgroundColor: '#2481C2'
          }}>
            Explore Experience
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{ borderTopColor: '#2481C2', opacity: 0.9 }}></div>
          </div>

          {/* Letter Tooltip - positioned outside the letter container */}
          <div className={`absolute text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-500 pointer-events-none z-50 whitespace-nowrap letter-tooltip-glow ${showLetterTooltip ? 'opacity-90 scale-100' : 'opacity-0 scale-95'}`} style={{ 
            top: '70%', 
            left: '65%',
            transform: 'translateY(-100%)',
            backgroundColor: '#845399'
          }}>
            About Me
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{ borderTopColor: '#845399', opacity: 0.9 }}></div>
          </div>



          {/* Letter clip-path overlay */}
          <div
            className="absolute cursor-pointer letter-pulse-glow letter-clip-path inset-0"
            onMouseEnter={() => setShowLetterTooltip(true)}
            onMouseLeave={() => setShowLetterTooltip(false)}
            onClick={() => {
              console.log('Letter clicked!');
              setShowLesleyLetter(true);
              // Remove setIsLetterLoaded(false)
            }}
          />
          {/* cup- clippath */}
          <div
            className="absolute group"
            style={{ right: '14vw', top: '34vw', width: '7vw', height: '11vh', zIndex: 10 }}
          >
            <div
              className="cursor-pointer cup-glow heartbeat cup-float cup-hover-glow w-full h-full "
              style={{
                filter: 'blur(2px)',
              }}
              onClick={() => setShowFumaaModal(true)}
            />
            {/* Smoke Images */}
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
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
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
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
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
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
          </div>
          {/* phone- clippath */}
          <div
            className="absolute inset-0  phone-pulse-glow phone-yellow-glow group cursor-pointer"
            style={{ 
              left: '18vw', 
              top: '45vw', 
              width: '8vw', 
              height: '8vw', 
             
            }}
            onClick={() => {
              console.log('Phone clicked!');
              setShowVideos(true);
            }}
          >
            <div
              className="cursor-pointer w-full h-full"
              style={{
                clipPath: 'polygon(18% 65%, 43% 60%, 70% 84%, 39% 90%)',
                borderRadius: '50% 50% 0 0',
              }}
            
            />
            {/* Phone Tooltip */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#35B2C2] text-black px-3 py-2 rounded-lg text-sm font-medium transition-all duration-500 pointer-events-none z-30 whitespace-nowrap phone-tooltip-glow group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95">
             Join Our Channel
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#35B2C2]"></div>
            </div>
          </div>

          {/* White Notice Paper (top left) */}
          <div
            className="absolute white-notice-glow"
            style={{ 
              left: '31.5vw', 
              top: '6vw', 
              width: '11.8vw', 
              height: '19vh', 
              zIndex: 2,
            }}
          >
            <div
              className="w-full h-full cursor-pointer"
              style={{
                background: '#fff',
                position: 'relative',
                overflow: 'hidden',
                padding: '8px',
              }}
              onClick={() => {
                console.log('White notice paper clicked!');
                setShowPostModal(true);
              }}
            >
              {/* Content text - subtly visible */}
              <div
                style={{
                  fontSize: '7px',
                  lineHeight: '1.2',
                  color: '#000',
                  opacity: 0.12,
                  filter: 'blur(0.3px)',
                  textAlign: 'justify',
                  fontFamily: 'serif',
                  pointerEvents: 'none',
                }}
              >
                &quot;A thousand times I failed, still your mercy remains, should I stumble out here still I&apos;m caught in your grace.&quot; This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today. I&apos;m here today, sharing the very nature and gifts the Father blessed me with.
                <br /><br />
                For years, I pursued other paths, pouring tireless effort into fields he hadn&apos;t called me to, only to find no lasting fruit. That rollercoaster of emotions, the unpleasant experiences, the endless accusations and judgments thrown around – they&apos;re hallmarks of a mind out of alignment. We defy the very nature of the One who modeled us in His image, yet we stand confident, feeling fully justified.
                <br /><br />
                Want to know the root cause? It&apos;s simply a lack of trust in the Father. No matter how you rationalize it, we constantly try to force a fit where there isn&apos;t one.
                <br /><br />
                But in Christ, we step into the true identity the Father created for us. This identity comes with specific tasks, assignments, and responsibilities, all of which we are perfectly equipped for. It&apos;s there we discover an unexplainable peace, joy, and confidence. This is the rest of God.
              </div>
              
              {/* Black overlay at 30% opacity */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.3)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Yellow Card with "430" (beneath white notice) */}
          <div
            className="absolute"
            style={{ 
              left: '35.3vw', 
              top: '15vw', 
              width: '5vw', 
              height: '5vh', 
              zIndex: 2,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: '#FD8D37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '2px',
              }}
              onClick={() => {
                console.log('Yellow card with 430 clicked!');
                // TODO: Add interaction logic
              }}
            >
              {/* Time text only */}
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: '#845399',
                textAlign: 'center',
                lineHeight: '1.1'
              }}>
                4:30
              </div>
              
              {/* Black overlay at 50% opacity */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* White Notice with Lines (bottom left) */}
          <div
            className="absolute"
            style={{ 
              left: '31vw', 
              top: '20vw', 
              width: '6.5vw', 
              height: '11.5vh', 
              zIndex: 2,
            }}
          >
                          <div
                className="w-full h-full"
                style={{
                  background: '#fff',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '8px',
                }}
              >
                {/* Psalm content */}
                <div
                  style={{
                    fontSize: '9px',
                    lineHeight: '1.2',
                    color: '#000',
                    opacity: 0.8,
                    filter: 'blur(0.3px)',
                    textAlign: 'justify',
                    fontFamily: 'serif',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                    Psalm 94:18–19
                  </div>
                  <div>
                    When I thought, &quot;My foot slips,&quot; Your steadfast love, O LORD, helped me up. When the cares of my heart are many, Your consolations cheer my soul.
                  </div>
                </div>

              
              {/* Black overlay at 60% opacity */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>



          {/* Noticeboard Letter Image (left side) */}
          <div
            className="absolute"
            style={{ 
              left: '35.5vw', 
              top: '22vw', 
              width: '10.5vw', 
              height: '12.5vh', 
              zIndex: 1,
              transform: 'rotate(-3deg)',
            }}
          >
            <Image
              src="/letter.png"
              alt="Letter"
              width={230}
              height={270}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Noticeboard Profile Image clip path */}
          <div
            className="absolute"
            style={{ 
              left: '67vw', 
              top: '8vw', 
              width: '8vw', 
              height: '8vw', 
              zIndex: 2,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/lesley-img1.jpeg"
                alt="Lesley Profile"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-black opacity-40"
              />
            </div>
          </div>

          {/* Noticeboard Long Paper Document clip path */}
          <div
            className="absolute"
            style={{ 
              left: '54.5vw', 
              top: '7vw', 
              width: '8.5vw', 
              height: '160px', 
              zIndex: 2,
              backgroundColor: 'white',
            }}
          >
            <div 
              className="absolute inset-0 bg-black opacity-50"
            />
            <div
              className="cursor-pointer w-full "
              style={{
                clipPath: 'polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)',
              }}
              onClick={() => {
                console.log('Long paper document clicked!');
                // TODO: Add document content display logic
              }}
            />
            {/* Red pin at top middle */}
            <div
              className="absolute"
              style={{
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
              }}
            >
              <Image
                src="/red-pin.svg"
                alt="Red Pin"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
            
            {/* To-Do List Content */}
            <div
              className="absolute inset-0 p-2 text-black font-mono text-xs leading-tight"
              style={{ zIndex: 4, opacity: 0.4 }}
            >
              <div className="font-bold text-center mb-2" style={{ fontSize: '10px' }}>
                TO DO LIST
              </div>
              <div className="space-y-1">
                <div className="flex items-start">
                  <div className="w-2 h-2 border border-black mr-1 mt-0.5 flex-shrink-0 flex items-center justify-center">
                    <span style={{ fontSize: '6px', lineHeight: '1' }}>✓</span>
                  </div>
                  <span style={{ fontSize: '8px', textDecoration: 'line-through', filter: 'blur(1px)' }}>Chapter study</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 border border-black mr-1 mt-0.5 flex-shrink-0"></div>
                  <span style={{ fontSize: '8px', filter: 'blur(1px)' }}>Meditation</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 border border-black mr-1 mt-0.5 flex-shrink-0 flex items-center justify-center">
                    <span style={{ fontSize: '6px', lineHeight: '1' }}>✓</span>
                  </div>
                  <span style={{ fontSize: '8px', textDecoration: 'line-through', filter: 'blur(1px)' }}>Water plants</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 border border-black mr-1 mt-0.5 flex-shrink-0"></div>
                  <span style={{ fontSize: '8px', filter: 'blur(1px)' }}>Draw up a guide</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 border border-black mr-1 mt-0.5 flex-shrink-0 flex items-center justify-center">
                    <span style={{ fontSize: '6px', lineHeight: '1' }}>✓</span>
                  </div>
                  <span style={{ fontSize: '8px', textDecoration: 'line-through', filter: 'blur(1px)' }}>One on one call</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 border border-black mr-1 mt-0.5 flex-shrink-0"></div>
                  <span style={{ fontSize: '8px', filter: 'blur(1px)' }}>Post edits</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 border border-black mr-1 mt-0.5 flex-shrink-0"></div>
                  <span style={{ fontSize: '8px', filter: 'blur(1px)' }}>Check and respond to emails</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 border border-black mr-1 mt-0.5 flex-shrink-0 flex items-center justify-center">
                    <span style={{ fontSize: '6px', lineHeight: '1' }}>✓</span>
                  </div>
                  <span style={{ fontSize: '8px', textDecoration: 'line-through', filter: 'blur(1px)' }}>Update playlist</span>
                </div>
              </div>
            </div>
          </div>

          {/* Noticeboard Abstract Image clip path */}
          <div
            className="absolute"
            style={{ 
              left: '45vw', 
              top: '7vw', 
              width: '8vw', 
              height: '6vw', 
              zIndex: 2,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/lesley-img2.jpeg"
                alt="Lesley Image 2"
                width={200}
                height={150}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-black opacity-40"
              />
            </div>
            {/* Purple-black pin at top middle */}
            <div
              className="absolute"
              style={{
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
              }}
            >
              <Image
                src="/purple-black.svg"
                alt="Purple-Black Pin"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
          </div>

          {/* Noticeboard Three Lines Image clip path */}
          <div
            className="absolute"
            style={{ 
              left: '46.5vw', 
              top: '15vw', 
              width: '6vw', 
              height: '6vw', 
              zIndex: 2,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/lesley-img3.jpeg"
                alt="Lesley Image 3"
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-black opacity-40"
              />
            </div>
            {/* Purple pin at top middle */}
            <div
              className="absolute"
              style={{
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
              }}
            >
              <Image
                src="/purple-pin.svg"
                alt="Purple Pin"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
          </div>

          {/* Cloud Card Clip Path (for future image) */}
          <div
            className="absolute"
            style={{
              left: '54.5vw', // moved a tiny bit to the left
              top: '18vw',  // moved down just a little bit
              width: '8.5vw', // increased width slightly
              height: '5.5vw', // increased height slightly
              zIndex: 2,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: '#fff', // fully opaque background
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => {
                // Placeholder for future interaction
                console.log('Cloud card clip path clicked!');
              }}
            >
              {/* Image placed here */}
              <Image
                src="/scene1.jpg"
                alt="Scene 1"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
              {/* Black overlay at 50% opacity */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Polaroid Collage on Notice Board */}
          <div
            className="absolute"
            style={{
              left: '55vw',
              top: '24vw',
              width: '9vw',
              height: '11vh',
              zIndex: 2,
              transform: 'rotate(5deg)',
            }}
          >
            <Image
              src="/polaroid-3.png"
              alt="Polaroid Collage"
              width={200}
              height={250}
              className="w-full h-full object-contain"
            />
          </div>

          {/* White Notice/Paper Clip Path (far right, beneath images) */}
          <div
            className="absolute"
            style={{
              left: '69.5vw', // moved slightly more to the right
              top: '26vw',  // moved down a bit more
              width: '6vw', // further reduced width
              height: '6vh', // further reduced height
              zIndex: 3, // higher z-index to appear on top
              transform: 'rotate(3deg)',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: '#fff', // white background to match the paper
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '8px',
                textAlign: 'center',
              }}
              onClick={() => {
                // Placeholder for future interaction
                console.log('White notice clip path clicked!');
              }}
            >
              {/* Bible Verse Content */}
              <div style={{ 
                fontSize: '9px', 
                fontWeight: '900', 
                marginBottom: '3px', 
                color: '#000',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
              }}>
                John 16:33
              </div>
              <div style={{ 
                fontSize: '6px', 
                lineHeight: '1.2', 
                color: '#333', 
                fontStyle: 'italic',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
              }}>
                &quot;In the world you will have tribulation. But take heart; I have overcome the world.&quot;
              </div>
              
              {/* Black overlay at 50% opacity */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Small White Notice Clip Path (middle section, right of landscape photo) */}
          <div
            className="absolute"
            style={{
              left: '46vw', // moved even more to the left
              top: '23.5vw',  // moved down even more
              width: '6.5vw', // increased width slightly
              height: '10vh', // increased height
              zIndex: 2,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: '#fff', // white background to match the paper
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '6px',
                textAlign: 'center',
              }}
              onClick={() => {
                // Placeholder for future interaction
                console.log('Small white notice clip path clicked!');
              }}
            >
              {/* Bible Verse Content */}
              <div style={{ 
                fontSize: '9px', 
                fontWeight: '900', 
                marginBottom: '3px', 
                color: '#000',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
              }}>
                Romans 8:28
              </div>
              <div style={{ 
                fontSize: '7px', 
                lineHeight: '1.2', 
                color: '#333', 
                fontStyle: 'italic',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
              }}>
                &quot;And we know that for those who love God all things work together for good, for those who are called according to His purpose.&quot;
              </div>
              
              {/* Black overlay at 60% opacity */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Green Card Clip Path (beneath envelope) */}
          <div
            className="absolute"
            style={{
              left: '32.5vw', // moved slightly to the left
              top: '25.5vw',  // moved up a bit
              width: '6vw', // increased width a bit
              height: '7vh', // increased height a bit
              zIndex: 2,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: '#fff', // white background
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => {
                // Placeholder for future interaction
                console.log('Green card clip path clicked!');
              }}
            >
              {/* Image placed here */}
              <Image
                src="/landscape.jpg"
                alt="Landscape"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
              {/* Black overlay at 50% opacity */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* White Notice Clip Path (beneath to-do list) */}
          <div
            className="absolute"
            style={{
              left: '66.5vw', // moved a tiny bit to the right
              top: '18vw',  // moved up a little more
              width: '8vw', // increased width
              height: '18vh', // increased height a little bit more
              zIndex: 2,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: '#fff', // white background to match the paper
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => {
                // Placeholder for future interaction
                console.log('White notice beneath to-do list clip path clicked!');
              }}
            >
              {/* James Town Image */}
              <Image
                src="/james-town.jpeg"
                alt="James Town"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
              
              {/* Black overlay at 60% opacity */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Envelope clip path */}
          <div
            className="absolute"
            style={{ 
              left: '33vw', 
              top: '36vw', 
              width: '15vw', 
              height: '10vh', 
              zIndex: 2,
              transform: 'rotate(-5deg)',
            }}
          >
            {/* <div className="relative w-full h-full">
              <Image
                src="/envelope.svg"
                alt="Envelope"
                width={100}
                height={75}
                className="w-full h-full object-contain"
              />
            </div> */}
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
                onClick={() => setShowLesleyLetter(false)}
              />
              
              {/* Return to Desk button - top left */}
              <button
                onClick={() => setShowLesleyLetter(false)}
                className="absolute top-6 left-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer return-desk-glow"
              >
                Return to Desk
              </button>
              
              {/* Letter content - centered */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative z-10 max-w-xl w-full">
                  {/* SVG Letter */}
                  <div className="w-full flex justify-center">
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
                onClick={() => setShowVideos(false)}
              />
              
              {/* Return to Desk button - top left */}
              <button
                onClick={() => setShowVideos(false)}
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
                    <h1 className="text-7xl font-serif text-white mb-8 leading-tight">
                      Deep Dive<br />& Exclusive<br />Teachings
                    </h1>
                    
                    {/* Description */}
                    <p className="text-xl text-white mb-10 leading-relaxed opacity-90">
                      Explore profound biblical insights and exclusive teachings that will deepen your understanding of God&apos;s Word. Join us for in-depth discussions, spiritual guidance, and transformative lessons that will enrich your faith journey and strengthen your relationship with Christ.
                    </p>
                    
                    {/* Join Channel Button */}
                    <div className="flex justify-start">
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

                  
                  {/* Right side - Image */}
                  <div className="flex-1 flex justify-end items-end relative">
                    <Image
                      src="/join-channel.png"
                      alt="Join Channel"
                      width={4500}
                      height={6750}
                      className="object-contain"
                      style={{
                        transform: 'translateX(20%) translateY(15%)'
                      }}
                    />
          <div
            className="absolute cursor-pointer letter-pulse-glow"
            style={{
              right: '-55px',
              top: '200px',
              width: '500px',
              height: '100vh',
              zIndex: 10,
              backgroundColor: 'transparent',
              clipPath: 'polygon(13% 3%, 100% 0, 68% 100%, 0.5% 100%)',
            }}
          >
            {/* Portrait Video Player */}
            <video
              autoPlay
              muted={false}
              controls
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                clipPath: 'polygon(35% 3%, 100% 0, 68% 100%, 0.5% 100%)',
                borderRadius: '15px',
              }}
            >
              {/* Cloudinary Video Source */}
              <source src="https://res.cloudinary.com/dg41c7v3d/video/upload/v1753388692/counseling_q6a4zj.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Post Modal */}
          {showPostModal && (
            <div className="fixed inset-0 z-50">
              {/* Glass background blur */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
                onClick={() => setShowPostModal(false)}
              />
              
              {/* Return to Desk button - top left */}
              <button
                onClick={() => setShowPostModal(false)}
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
                  <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                    <div ref={postTemplateRef}>
                      <PostTemplate
                        title={posts[currentPostIndex].title}
                        currentPage={currentPostIndex + 1}
                        totalPages={posts.length}
                        leftContent={posts[currentPostIndex].leftContent}
                        rightContent={posts[currentPostIndex].rightContent}
                        bottomRightContent={posts[currentPostIndex].bottomRightContent}
                      />
                    </div>
                  </div>
                  
                  {/* Share button - outside template */}
                  <div className="flex justify-center mt-6">
                    <div className="relative">
                      <button
                        onClick={() => setShowShareOptions(!showShareOptions)}
                        className="bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer"
                        title="Share post"
                      >
                        Share This Post
                      </button>
                      
                      {/* Share options dropdown */}
                      {showShareOptions && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-30">
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
                      )}
                    </div>
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
                    <h2 className="text-white font-medium text-sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Welcome to The Interactive Workspace
                    </h2>
                  </div>

                  {/* Instructional Text */}
                  <div className="text-center" style={{ marginBottom: '24px' }}>
                    <p className="text-white font-bold text-lg mb-2" style={{ fontSize: '1.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '12px' }}>
                      Things aren&apos;t always what they seem.
                    </p>
                    <p className="text-gray-300 text-base" style={{ margin: 0 }}>
                      Explore the workspace — you might be surprised by what you find.
                    </p>
                  </div>

                  {/* Get Started Button */}
                  <button
                    onClick={() => {
                      // Smoothly fade out the welcome modal
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
                    }}
                    className="w-full text-white font-medium py-3 px-6 transition-colors duration-200 cursor-pointer get-started-glow"
                    style={{ backgroundColor: '#5C3262', borderRadius: '35px' }}
                  >
                    Get Started
                  </button>
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
                onClick={() => setShowFumaaModal(false)}
              />
              {/* Return to Desk button - top left */}
              <button
                onClick={() => setShowFumaaModal(false)}
                className="absolute top-6 left-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer return-desk-glow"
              >
                Return to Desk
              </button>
              {/* Modal content - centered */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div 
                  className="relative z-10 max-w-2xl w-full p-10 border-2 border-black shadow-2xl drop-shadow-2xl bg-white"
                  style={{ borderRadius: '0px' }}
                >
                  {/* Post Title */}
                  <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 text-center tracking-wide uppercase mb-8">
                      &quot;A Cheerful Gift, a Full Cup&quot;
                    </h1>
                  </div>
                  {/* Post Content */}
                  <div className="text-center">
                    <p className="text-gray-800 text-xl leading-relaxed mb-8">
                      Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform. Thank you for your kindness!
                    </p>

                    <button
                      className="mt-4 w-full py-5 bg-[#633366] text-white text-2xl font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-[#633366] focus:ring-opacity-50 transition-all duration-200 shadow-md hover:scale-[1.02] cursor-pointer"
                      style={{ letterSpacing: '0.01em' }}
                    >
                      Poor Into My Cup 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-top-2 pointer-events-auto">
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
