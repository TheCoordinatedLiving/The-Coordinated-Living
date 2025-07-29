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


const WindowsLockScreen = ({ onUnlock }: { onUnlock: () => void }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = format(time, 'HH:mm');
  const formattedDate = format(time, 'EEEE, d MMMM');

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
          <div onClick={onUnlock}>
            <Image
              src="/windows/unlock-button.svg"
              width={200}
              height={40}
              alt="Click here to enter space"
              className="cursor-pointer mx-auto mt-16"
            />
          </div>
          <div 
            onClick={() => {
              // Create smooth zoom-out transition back to experience page
              const container = document.querySelector('.windows-lock-screen');
              if (container) {
                gsap.to(container, {
                  scale: 0.8,
                  opacity: 0,
                  duration: 1.2,
                  ease: 'power2.inOut',
                  onComplete: () => {
                    // Navigate back to the experience page
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
              src="/windows/experience-back.svg"
              width={80}
              height={16}
              alt="Go Back"
              className="cursor-pointer mx-auto mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const WindowsHomeScreen = () => {
  const [isQuestionWindowOpen, setIsQuestionWindowOpen] = useState(false);
  const [isKeepOpen, setIsKeepOpen] = useState(false);
  const [isAboutMeSelected, setIsAboutMeSelected] = useState(false);
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const openQuestionWindow = () => setIsQuestionWindowOpen(true);
  const closeQuestionWindow = () => setIsQuestionWindowOpen(false);
  const toggleKeep = () => setIsKeepOpen(!isKeepOpen);
  
  const handleAboutMeClick = () => {
    setIsAboutMeSelected(true);
  };
  
  const handleAboutMeDoubleClick = () => {
    setIsAboutMeOpen(true);
  };

  const handleCloseAboutMe = () => {
    setIsAboutMeOpen(false);
    setIsAboutMeSelected(false);
  };
  
  const handleDesktopClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Deselect if clicking on the desktop itself and not an icon
    if (e.target === e.currentTarget) {
      setIsAboutMeSelected(false);
    }
  };

  return (
    <div className="windows-home-screen absolute inset-0 opacity-0">
        {/* Clickable desktop area for deselection */}
        <div 
            className="absolute inset-0 z-0"
            onClick={handleDesktopClick}
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
                className={`flex flex-col items-center space-y-2 w-24 text-center cursor-pointer p-2 rounded-md ${isAboutMeSelected ? 'bg-blue-500/30' : 'bg-transparent'}`}
                onClick={(e) => { e.stopPropagation(); handleAboutMeClick(); }}
                onDoubleClick={(e) => { e.stopPropagation(); handleAboutMeDoubleClick(); }}
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
        {isQuestionWindowOpen && <AskAQuestion onClose={closeQuestionWindow} />}
        {isKeepOpen && <GoogleKeep onClose={toggleKeep} />}
        {isAboutMeOpen && <AboutMeWindow onClose={handleCloseAboutMe} />}
        {isTermsOpen && <TermsWindow onClose={() => setIsTermsOpen(false)} />}
    </div>
  );
};

const WindowsExperiencePage = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUnlock = () => {
    gsap.timeline({ onComplete: () => setIsUnlocked(true) })
      .to('.windows-lock-screen', { opacity: 0, duration: 1, ease: 'power2.inOut' });
  };

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

  // Effect to fade in the home screen once unlocked
  useEffect(() => {
    if (isUnlocked) {
      gsap.to('.windows-home-screen', { opacity: 1, duration: 1.5, ease: 'power2.inOut' });
    }
  }, [isUnlocked]);

  return (
    <div ref={containerRef} className="relative w-screen h-screen opacity-0">
      {!isUnlocked && <WindowsLockScreen onUnlock={handleUnlock} />}
      {isUnlocked && <WindowsHomeScreen />}
    </div>
  );
};

export default WindowsExperiencePage; 