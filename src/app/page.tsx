"use client";
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Image from "next/image";
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

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
  const [showVideos, setShowVideos] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [fromWindows, setFromWindows] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);

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
    <div ref={pageRef} className="relative w-screen h-screen overflow-y-auto">
      {/* Experience page hidden behind */}
      {experienceVisible && (
        <div
          ref={experienceRef}
          className="fixed inset-0 w-screen h-screen bg-black"
          style={{ zIndex: 1 }}
        >
          <img
            src="/coordinated.webp"
            alt="Experience Background"
            // className="w- h-full object-cover object-center"
            width="100%"
            height="auto"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
 
            }}
          />
          <div style={{
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
          </div>
          {/* Laptop iframe overlay */}
          <div
            ref={laptopRef}
            className="absolute cursor-pointer laptop-iframe"
            style={{
              left: '47.2vw',
              top: '67vh',
              width: '26vw',
              height: '24vh',
              transform: 'translate(-50%, -50%)',
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              zIndex: 2,
            }}
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
                width: '300%',
                height: '300%',
                border: 'none',
                borderRadius: '0',
                backgroundColor: 'transparent',
                transform: 'scale(0.3)',
                transformOrigin: 'center center',
                position: 'absolute',
                top: '-100%',
                left: '-100%',
                pointerEvents: laptopZoomed ? 'auto' : 'none',
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

          {/* Letter clip-path overlay */}
          <div
            className="absolute cursor-pointer letter-glow letter-clip-path"
            onClick={() => {
              console.log('Letter clicked!');
              setShowLesleyLetter(true);
            }}
          />
          {/* cup- clippath - temporarily hidden */}
          {/* <div
            className="absolute group"
            style={{ right: '14.6vw', bottom: '17.6vh', width: '1.5vw', height: '1.5vh', zIndex: 2 }}
          >
            <div
              className="cursor-pointer cup-glow heartbeat cup-float cup-hover-glow w-full h-full"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                clipPath: 'circle(50% at 50% 50%)',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
              onClick={() => console.log('Cup clicked!')}
            />
          </div> */}
          {/* phone- clippath */}
          <div
            className="absolute phone-glow phone-yellow-glow"
            style={{ 
              left: '13vw', 
              bottom: '8vh', 
              width: '22vw', 
              height: '28vh', 
              zIndex: 2,
            }}
          >
            <div
              className="cursor-pointer w-full h-full"
              style={{
                clipPath: 'polygon(18% 65%, 43% 60%, 70% 84%, 39% 90%)',
                borderRadius: '50% 50% 0 0',
              }}
              onClick={() => {
                console.log('Phone clicked!');
                setShowVideos(true);
              }}
            />
          </div>

          {/* Noticeboard Profile Image clip path */}
          <div
            className="absolute"
            style={{ 
              left: '67vw', 
              top: '14vh', 
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
              top: '11.3vh', 
              width: '8.5vw', 
              height: '19vh', 
              zIndex: 2,
              backgroundColor: 'white',
            }}
          >
            <div 
              className="absolute inset-0 bg-black opacity-50"
            />
            <div
              className="cursor-pointer w-full h-full"
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
              top: '11.50vh', 
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
              top: '26.5vh', 
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
              left: '66vw', // nudged slightly to the left
              top: '31vh',  // nudged slightly more up
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
              <img
                src="/scene1.jpg"
                alt="Scene 1"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
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
                box-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 90px rgba(255, 255, 255, 0.2), 0 0 120px rgba(255, 255, 255, 0.1);
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
                <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-2xl max-w-2xl w-full">
                  {/* SVG Letter */}
                  <div className="w-full flex justify-center">
                    <Image
                      src="/lesley.svg"
                      alt="Lesley's Letter"
                      width={600}
                      height={450}
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
              
              {/* Videos content - centered */}
              <div className="absolute inset-0 flex items-center justify-center p-16">
                <div className="relative z-10 max-w-2xl text-center">
                  {/* Title */}
                  <h1 className="text-7xl font-serif text-white mb-8 leading-tight">
                    Deep Dive &<br />Exclusive Teachings
                  </h1>
                  
                  {/* Description */}
                  <p className="text-xl text-white mb-12 leading-relaxed opacity-90">
                    Explore profound biblical insights and exclusive teachings that will deepen your understanding of God&apos;s Word. Join us for in-depth discussions, spiritual guidance, and transformative lessons that will enrich your faith journey and strengthen your relationship with Christ.
                  </p>
                  
                  {/* Join Channel Button */}
                  <div className="flex justify-center">
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
                  <div className="mb-6 flex justify-center">
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
                    className="px-4 py-2 mb-6"
                    style={{
                      backgroundColor: '#1D1C1E',
                      color: 'white',
                      borderRadius: '33.86px',
                    }}
                  >
                    <h2 className="text-white font-medium text-sm">
                      Welcome to Your Interactive Workspace
                    </h2>
                  </div>

                  {/* Instructional Text */}
                  <div className="mb-6 text-center">
                    <p className="text-white font-bold text-lg mb-2">
                      Things aren&apos;t always what they seem.
                    </p>
                    <p className="text-gray-300 text-base">
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
    </div>
  );
};

export default Page;
