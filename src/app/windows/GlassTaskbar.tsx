"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { gsap } from 'gsap';


interface GlassTaskbarProps {
  onAskQuestionClick: () => void;
  onResourcesClick: () => void;
}

const GlassTaskbar = ({ onAskQuestionClick, onResourcesClick }: GlassTaskbarProps) => {
  const [time, setTime] = useState('');
  const taskbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      setTime(format(new Date(), 'h:mm a'));
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000 * 60); 
    return () => clearInterval(intervalId);
  }, []);

  const handleGoHome = () => {
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
  };

  return (
    <>
      <div
        ref={taskbarRef}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        {/* Container for the effect and content */}
        <div className="relative p-3">
          {/* Frosted glass overlay */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/5 shadow-2xl"></div>

          {/* Taskbar Content */}
          <div className="relative z-10 flex items-center justify-between h-full px-3">
            {/* Left Section: Weather */}
            <div className="flex items-center">
              <Image
                src="/windows/weather.svg"
                width={150}
                height={60}
                alt="Weather widget"
              />
            </div>

            {/* Center Section: Pinned Apps */}
            <div className="flex items-center" style={{ gap: '12px' }}>
              <div className="app-button" onClick={handleGoHome}>
                <Image
                  src="/windows/coord-logo.svg"
                  width={24}
                  height={24}
                  alt="Go Home icon"
                />
                <span>Go Home</span>
              </div>
              <div className="app-button" onClick={onAskQuestionClick}>
                <Image
                  src="/windows/gmail.svg"
                  width={24}
                  height={24}
                  alt="Ask a Question icon"
                />
                <span>Ask Me A Question</span>
              </div>
              <div className="app-button" onClick={onResourcesClick}>
                <Image
                  src="/windows/keep.svg"
                  width={24}
                  height={24}
                  alt="Resources icon"
                />
                <span>Resources</span>
              </div>
            </div>

            {/* Right Section: Quick Settings & Time */}
            <div className="flex items-center gap-6 text-white text-sm">
              <Image
                src="/windows/Quick-Settings.svg"
                width={80}
                height={32}
                alt="Quick Settings"
                className="cursor-pointer"
              />
              <div className="text-right">
                <p>{time}</p>
                <p>{format(new Date(), 'M/d/yyyy')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .glass-taskbar {
          background: rgba(68, 68, 68, 0.45);
          backdrop-filter: blur(70px);
          -webkit-backdrop-filter: blur(70px);
          box-shadow: 
            0 -8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }
        .app-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          color: white;
          font-size: 14px;
        }
        .app-button {
          will-change: box-shadow, transform;
          transition: box-shadow 0.15s ease, transform 0.15s ease;
          box-shadow: 0px 0.01em 0.01em rgba(45, 35, 66, 0.4), 0px 0.3em 0.7em -0.01em rgba(45, 35, 66, 0.3), inset 0px -0.01em 0px rgba(58, 65, 111, 0.5);
        }
        .app-button {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .app-button:hover {
          box-shadow: 0px 0.1em 0.2em rgba(45, 35, 66, 0.4), 0px 0.4em 0.7em -0.1em rgba(45, 35, 66, 0.3), inset 0px -0.1em 0px #3c4fe0;
          transform: translateY(-0.1em);
        }
        .app-button:active {
          box-shadow: inset 0px 0.1em 0.6em #3c4fe0;
          transform: translateY(0em);
        }
      `}</style>
    </>
  );
};

export default GlassTaskbar; 