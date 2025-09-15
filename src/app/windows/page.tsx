"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { gsap } from 'gsap';
import GlassTaskbar from './GlassTaskbar';
import AskAQuestion from './AskAQuestion';
import GoogleKeep from './GoogleKeep';
import AboutMeWindow from './AboutMeWindow';
import TermsWindow from './TermsWindow';


const WindowsLockScreen = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Don't render time until component is mounted to prevent hydration mismatch
  const formattedTime = time ? format(time, 'HH:mm') : '--:--';
  const formattedDate = time ? format(time, 'EEEE, d MMMM') : 'Loading...';

  return (
    <div className="windows-lock-screen absolute inset-0">
      <Image
        src="/windows/lockscreen.png"
        layout="fill"
        objectFit="cover"
        alt="Windows Lockscreen Wallpaper"
        className="z-0"
      />
      <div className="relative z-10 flex flex-col items-center h-full text-white pt-32">
        <div className="text-center">
          <Image
            src="/windows/logo-white.svg"
            width={48}
            height={48}
            alt="Windows Logo"
            className="mx-auto mb-8"
          />
          <h1
            className="font-semibold"
            style={{ fontSize: '152.9px', lineHeight: '1' }}
          >
            {formattedTime}
          </h1>
          <p className="text-xl mt-4">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

const WindowsHomeScreen = () => {
  const [isQuestionWindowOpen, setIsQuestionWindowOpen] = useState(false);
  const [isKeepOpen, setIsKeepOpen] = useState(false);
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [lastOpenedModal, setLastOpenedModal] = useState<string | null>(null);

  const openQuestionWindow = () => {
    setIsQuestionWindowOpen(true);
    setLastOpenedModal('question');
  };
  const closeQuestionWindow = () => {
    console.log('Closing Ask Question modal');
    setIsQuestionWindowOpen(false);
    // If this was the last opened modal, clear the tracking
    if (lastOpenedModal === 'question') {
      setLastOpenedModal(null);
    }
  };
  const openResourcesWindow = () => {
    setIsKeepOpen(true);
    setLastOpenedModal('resources');
  };
  const closeResourcesWindow = () => {
    console.log('Closing Resources modal');
    setIsKeepOpen(false);
    // If this was the last opened modal, clear the tracking
    if (lastOpenedModal === 'resources') {
      setLastOpenedModal(null);
    }
  };
  const toggleKeep = () => {
    if (isKeepOpen) {
      closeResourcesWindow();
    } else {
      openResourcesWindow();
    }
  };
  
  const handleAboutMeClick = () => {
    setIsAboutMeOpen(true);
  };

  const handleCloseAboutMe = () => {
    setIsAboutMeOpen(false);
  };

  return (
    <div className="windows-home-screen absolute inset-0 opacity-0">
        {/* Clickable desktop area for deselection */}
        <div 
            className="absolute inset-0 z-0"
        />
        
        <Image
        src="/windows/homewall.png"
        layout="fill"
        objectFit="cover"
        alt="Windows Home Screen Wallpaper"
        />

        {/* Desktop Icons */}
        <div className="absolute top-5 left-5 z-10 flex flex-col space-y-4">
            {/* About Me Icon */}
            <div 
                className="flex flex-col items-center space-y-2 w-24 text-center cursor-pointer p-2 rounded-md"
                onClick={(e) => { e.stopPropagation(); handleAboutMeClick(); }}
            >
                <Image
                    src="/windows/about-me.svg"
                    width={60}
                    height={60}
                    alt="About Me"
                />
                <p className="text-white text-sm font-medium" style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                    About Me
                </p>
            </div>
            {/* Coordinated Living Icon */}
            <div 
                className="flex flex-col items-center space-y-2 w-24 text-center cursor-pointer p-2 rounded-md"
                onClick={() => {
                    // Create smooth zoom-out transition back to experience page
                    const container = document.querySelector('.windows-home-screen');
                    if (container) {
                        gsap.to(container, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 1.2,
                            ease: 'power2.inOut',
                            onComplete: () => {
                                // Navigate back to the experience page with coordinated.webp
                                window.location.href = '/?fromWindows=true';
                            }
                        });
                    } else {
                        // Fallback if container not found
                        window.location.href = '/?fromWindows=true';
                    }
                }}
            >
                <Image
                    src="/windows/coord-logo.svg"
                    width={60}
                    height={60}
                    alt="Coordinated Living"
                />
                <p className="text-white text-sm font-medium" style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                    Home
                </p>
            </div>
            
            {/* Terms Icon */}
            <div 
                className="flex flex-col items-center space-y-2 w-24 text-center cursor-pointer p-2 rounded-md"
                onClick={() => {
                    setIsTermsOpen(true);
                }}
            >
                <Image
                    src="/terms.svg"
                    width={60}
                    height={60}
                    alt="Terms"
                />
                <p className="text-white text-sm font-medium" style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                    Terms
                </p>
            </div>
        </div>

        <GlassTaskbar onAskQuestionClick={openQuestionWindow} onResourcesClick={toggleKeep} />
        {isQuestionWindowOpen && <AskAQuestion onClose={closeQuestionWindow} isOnTop={lastOpenedModal === 'question'} />}
        {isKeepOpen && <GoogleKeep onClose={closeResourcesWindow} isOnTop={lastOpenedModal === 'resources'} />}
        {isAboutMeOpen && <AboutMeWindow onClose={handleCloseAboutMe} />}
        {isTermsOpen && <TermsWindow onClose={() => setIsTermsOpen(false)} />}
    </div>
  );
};

const WindowsExperiencePage = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLockscreenOnly, setIsLockscreenOnly] = useState(false);

  const handleUnlock = () => {
    gsap.timeline({ onComplete: () => setIsUnlocked(true) })
      .to('.windows-lock-screen', { opacity: 0, duration: 1, ease: 'power2.inOut' });
  };

  // Check if this is lockscreen-only mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lockscreenParam = urlParams.get('lockscreen');
    if (lockscreenParam === 'true') {
      setIsLockscreenOnly(true);
    }
  }, []);

  // Fade-in effect for the whole page
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1.0, 
          ease: 'power2.inOut'
        }
      );
    }
  }, []);

  // Auto-unlock after a brief delay to show the lockscreen (only if not lockscreen-only mode)
  useEffect(() => {
    if (!isLockscreenOnly) {
      const timer = setTimeout(() => {
        handleUnlock();
      }, 2000); // Show lockscreen for 2 seconds then auto-unlock

      return () => clearTimeout(timer);
    }
  }, [isLockscreenOnly]);

  // Effect to fade in the home screen once unlocked
  useEffect(() => {
    if (isUnlocked) {
      gsap.to('.windows-home-screen', { opacity: 1, duration: 1.5, ease: 'power2.inOut' });
    }
  }, [isUnlocked]);

  return (
    <div ref={containerRef} className="relative w-screen h-screen opacity-0">
      {isLockscreenOnly ? (
        <WindowsLockScreen />
      ) : (
        <>
          {!isUnlocked && <WindowsLockScreen />}
          {isUnlocked && <WindowsHomeScreen />}
        </>
      )}
    </div>
  );
};

export default WindowsExperiencePage; 