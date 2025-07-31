"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface AboutMeWindowProps {
  onClose: () => void;
}

const AboutMeWindow = ({ onClose }: AboutMeWindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      windowRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(windowRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div ref={windowRef} className="absolute inset-0 flex items-center justify-center z-50">
      <div className="relative">
        {/* Background using code instead of SVG */}
        <div 
          className="w-[800px] h-[600px] bg-[#0A0A0A] rounded-lg border border-gray-700 shadow-2xl"
          style={{
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        />
        
        {/* Tab View positioned at the top */}
        <div className="absolute top-0 left-0 right-0">
          <Image 
            src="/aboutlesley/Tab-View.svg" 
            width={800} 
            height={40} 
            alt="Tab View"
          />
          
          {/* Window Control Buttons - positioned on the right side of tab */}
          <div className="absolute top-1/2 right-4 flex space-x-4 items-center transform -translate-y-1/2">
            {/* Maximize Button */}
            <button className="w-3 h-3 bg-transparent rounded transition-colors flex items-center justify-center">
              <Image 
                src="/aboutlesley/about-me-maximize.svg" 
                width={8} 
                height={8} 
                alt="Maximize"
              />
            </button>
            
            {/* Minimize Button */}
            <button className="w-3 h-3 bg-transparent rounded transition-colors flex items-center justify-center">
              <Image 
                src="/aboutlesley/about-me-minimize.svg" 
                width={8} 
                height={8} 
                alt="Minimize"
              />
            </button>
            
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="w-3 h-3 bg-transparent hover:cursor-pointer rounded transition-colors flex items-center justify-center"
            >
              <Image 
                src="/aboutlesley/about-me-close.svg" 
                width={8} 
                height={8} 
                alt="Close"
              />
            </button>
          </div>
        </div>
        
        {/* Menu File positioned directly under the tab-view */}
        <div className="absolute top-[34px] left-0" style={{ marginTop: 0 }}>
          <img 
            src="/aboutlesley/menu-file.svg" 
            width={800} 
            height={33} 
            alt="Menu File"
            style={{ display: 'block', margin: 0, padding: 0, lineHeight: 0, verticalAlign: 'top' }}
          />
        </div>
        
        {/* About Me Body positioned directly under the menu-file */}
        <div className="absolute top-[62px] left-0" style={{ marginTop: 0 }}>
          <img 
            src="/aboutlesley/about-me-body.svg" 
            width={800} 
            height={538} 
            alt="About Me Body"
            style={{ display: 'block', margin: 0, padding: 0, lineHeight: 0, verticalAlign: 'top' }}
          />
        </div>
        
        {/* About Me Status positioned directly under the body */}
        <div className="absolute top-[570px] left-0" style={{ marginTop: 0 }}>
          <img 
            src="/aboutlesley/about-me-status.svg" 
            width={800} 
            height={50} 
            alt="About Me Status"
            style={{ display: 'block', margin: 0, padding: 0, lineHeight: 0, verticalAlign: 'top' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMeWindow; 