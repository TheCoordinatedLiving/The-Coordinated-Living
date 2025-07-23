"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import PostsContent from './PostsContent';
import BooksContent from './BooksContent';

interface GoogleKeepProps {
  onClose: () => void;
}

const GoogleKeep = ({ onClose }: GoogleKeepProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('Posts');

  useEffect(() => {
    gsap.fromTo(
      windowRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(windowRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div ref={windowRef} className="absolute inset-x-0 top-0 bottom-16 bg-black/30 flex items-center justify-center z-50 opacity-0">
      <div className="w-[85vw] h-[85vh] max-w-[1600px] bg-white rounded-lg flex flex-col">
        {/* Browser Chrome */}
        <div className="bg-white rounded-t-lg">
            <div className="flex items-center justify-between pl-2 pt-1">
                <div className="flex-1">
                    <Image src="/keep/Tabs.svg" width={250} height={32} alt="Browser tabs" />
                </div>
                {/* Window Controls */}
                <div className="flex items-center space-x-4 px-4">
                     <Image src="/broswer/maximize.svg" width={14} height={14} alt="Maximize" className="cursor-pointer" />
                     <Image src="/broswer/minimize.svg" width={14} height={14} alt="Minimize" className="cursor-pointer" />
              
                      <button onClick={handleClose}>
                          <Image src="/broswer/close.svg" width={14} height={14} alt="Close" className="cursor-pointer" />
                      </button>
                </div>
            </div>
            <div className="bg-white">
                <Image src="/keep/Address.svg" width={1200} height={32} alt="Address bar" className="w-full h-auto" />
            </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 flex flex-col overflow-hidden rounded-b-lg bg-white">
          {/* Keep Banner */}
          <div>
            <Image src="/keep/keep-banner.svg" width={1150} height={48} alt="Google Keep banner" className="w-full h-auto" />
          </div>

          <div className="flex-1 flex">
            {/* Side Navigation */}
            <div className="w-64 relative">
              <Image src="/keep/side-nav.svg" layout="fill" objectFit="cover" alt="Side navigation background" />
              <nav className="relative z-10 pt-4 flex flex-col" style={{ gap: '13px' }}>
                <NavItem 
                  icon="/keep/Posts.svg" 
                  label="POSTS" 
                  isActive={activeTab === 'Posts'}
                  onClick={() => setActiveTab('Posts')}
                />
                <NavItem 
                  icon="/keep/book.svg" 
                  label="GUIDES" 
                  isActive={activeTab === 'Books'}
                  onClick={() => setActiveTab('Books')}
                />
                <NavItem 
                  icon="/keep/archive.svg" 
                  label="ARCHIVE" 
                  isActive={activeTab === 'Archive'}
                  onClick={() => setActiveTab('Archive')}
                />
                <NavItem 
                  icon="/keep/bin.svg" 
                  label="BIN" 
                  isActive={activeTab === 'Bin'}
                  onClick={() => setActiveTab('Bin')}
                />
              </nav>
            </div>
            
            {/* Rest of the content area */}
            <div className="flex-1 bg-white">
               {activeTab === 'Posts' && <PostsContent />}
               {activeTab === 'Books' && <BooksContent />}
               {activeTab === 'Archive' && <div className="w-full h-full flex items-center justify-center"><p className="text-gray-500">NO ARCHIVED POSTS OR GUIDES</p></div>}
               {activeTab === 'Bin' && <div className="w-full h-full flex items-center justify-center"><p className="text-gray-500">NO GUIDES OR POSTS DELETED</p></div>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

interface NavItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center w-[95%] pl-6 py-2 space-x-4 text-sm font-medium transition-colors cursor-pointer rounded-r-full ${
        isActive 
          ? 'text-white' 
          : 'text-gray-700 hover:bg-gray-200/50'
      }`}
      style={{
        backgroundColor: isActive ? '#50A0D8' : 'transparent'
      }}
    >
      <Image 
        src={icon} 
        width={20} 
        height={20} 
        alt={label} 
        style={{
          filter: isActive ? 'brightness(0) invert(1)' : 'none'
        }}
      />
      <span>{label}</span>
    </button>
  );
}

export default GoogleKeep; 