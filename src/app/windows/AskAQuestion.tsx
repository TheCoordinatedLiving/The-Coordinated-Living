"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface AskAQuestionProps {
  onClose: () => void;
  isOnTop?: boolean;
}

const AskAQuestion = ({ onClose, isOnTop = false }: AskAQuestionProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    userEmail: boolean;
    subject: boolean;
    message: boolean;
  }>({
    userEmail: false,
    subject: false,
    message: false
  });
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [networkError, setNetworkError] = useState('');
  const sendTimeout = useRef<NodeJS.Timeout | null>(null);

  const validateForm = () => {
    const errors = {
      userEmail: !userEmail.trim(),
      subject: !subject.trim(),
      message: !message.trim()
    };
    
    setValidationErrors(errors);
    setShowValidationErrors(true);
    
    return !errors.userEmail && !errors.subject && !errors.message;
  };

  const handleFieldChange = (field: 'userEmail' | 'subject' | 'message', value: string) => {
    if (showValidationErrors) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: !value.trim()
      }));
    }
  };

  const handleSend = async () => {
    if (isSending) return; // Prevent double submission
    setIsSending(true);
    if (sendTimeout.current) {
      clearTimeout(sendTimeout.current);
    }
    sendTimeout.current = setTimeout(async () => {
      if (!validateForm()) {
        setIsSending(false);
        return;
      }
      try {
        // Send email via API
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail,
            subject,
            message
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setShowSuccessModal(true);
          setNetworkError('');
        } else {
          throw new Error(data.error || 'Failed to send email. Please try again.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        setNetworkError('Failed to send email. Please check your connection and try again. If the problem persists, the email may have been sent but could be in the recipient&apos;s spam folder.');
      } finally {
        setIsSending(false);
      }
    }, 200); // Debounce by 200ms
  };

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
    <div ref={windowRef} className={`absolute inset-x-0 top-0 bottom-16 bg-black/30 flex items-center justify-center ${isOnTop ? 'z-[60]' : 'z-[50]'} opacity-0`}>
      <div className="w-[85vw] h-[85vh] max-w-[1600px] bg-white rounded-lg shadow-2xl flex flex-col">
        {/* Browser Chrome */}
        <div className="bg-[#F1F3F4] rounded-t-lg">
            <div className="flex items-center justify-between pl-2 pt-1">
                <div className="flex-1">
                    <Image src="/broswer/Tabs.svg" width={250} height={32} alt="Browser tabs" />
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
            <div className="bg-white p-2">
                <Image src="/broswer/address-bar.svg" width={1200} height={32} alt="Address bar" className="w-full h-auto" />
            </div>
        </div>

        {/* Gmail UI - Page Content */}
        <div className="flex-1 flex overflow-hidden rounded-b-lg bg-[#F8FAFD]">
          {/* Far Left Navigation */}
          <div className="w-20 pt-4 flex flex-col items-center space-y-4">
              <button className="p-2 rounded-full hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
              </button>
              <button className="w-16 h-14 flex flex-col items-center justify-center rounded-xl">
                  <div className="px-3 py-2 bg-[#5C3262] rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                  </div>
                  <span className="text-xs font-bold text-[#5C3262] mt-2">Mail</span>
              </button>
              <button className="w-16 h-14 flex flex-col items-center justify-center rounded-xl hover:bg-gray-200">
                  <Image src="/broswer/chat.svg" width={32} height={32} alt="Chat" />
                  <span className="text-xs text-gray-600">Chat</span>
              </button>
              <button className="w-16 h-14 flex flex-col items-center justify-center rounded-xl hover:bg-gray-200">
                  <Image src="/broswer/meet.svg" width={32} height={32} alt="Meet" />
                  <span className="text-xs text-gray-600">Meet</span>
              </button>
          </div>

          {/* Main App Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Gmail Banner */}
            <div className="px-4 py-2">
              <Image src="/broswer/gmail-banner.svg" width={1150} height={48} alt="Gmail banner" className="w-full h-auto" />
            </div>
            
            {/* Scrollable Content Area */}
            <div className="flex-1 flex">
              {/* Left Sidebar */}
              <div className="w-64 bg-white p-4">
                 <Image src="/broswer/gmail-navigation-side.svg" width={230} height={350} alt="Gmail Navigation" />
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-white p-4">
                <div className="h-96 w-full flex flex-col rounded-lg shadow-lg border border-gray-200">
                    {/* Header */}
                    <div className="bg-[#F2F6FC] px-4 py-2 flex justify-between items-center rounded-t-lg">
                        <p className="text-sm font-medium text-black">New Message</p>
                        <div className="flex items-center space-x-3">
                            <button>
                                <Image src="/broswer/Minimize-message.svg" width={10} height={10} alt="Minimize" />
                            </button>
                            <button>
                                <Image src="/broswer/Pop-out.svg" width={10} height={10} alt="Pop-out" />
                            </button>
                            <button>
                                <Image src="/broswer/Close-message.svg" width={10} height={10} alt="Close" />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 flex flex-col px-4 bg-white">
                        <div className="border-b border-gray-300 py-2">
                            <input 
                                type="email" 
                                placeholder="To: letstalk@thecoordinatedliving.com" 
                                className="w-full text-sm text-black placeholder-gray-500 focus:outline-none bg-transparent"
                                value="To: letstalk@thecoordinatedliving.com"
                                readOnly
                            />
                        </div>
                        <div className={`border-b py-2 ${validationErrors.userEmail && showValidationErrors ? 'border-red-500' : 'border-gray-300'}`}>
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className={`w-full text-sm text-black placeholder-gray-500 focus:outline-none bg-transparent ${validationErrors.userEmail && showValidationErrors ? 'text-red-600' : ''}`}
                                value={userEmail}
                                onChange={(e) => {
                                  setUserEmail(e.target.value);
                                  handleFieldChange('userEmail', e.target.value);
                                }}
                            />
                            {validationErrors.userEmail && showValidationErrors && (
                              <div className="text-red-500 text-xs mt-1 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Please enter your email address
                              </div>
                            )}
                        </div>
                        <div className={`border-b py-2 ${validationErrors.subject && showValidationErrors ? 'border-red-500' : 'border-gray-300'}`}>
                            <input 
                                type="text" 
                                placeholder="Subject" 
                                className={`w-full text-sm text-black placeholder-gray-900 focus:outline-none bg-transparent ${validationErrors.subject && showValidationErrors ? 'text-red-600' : ''}`}
                                value={subject}
                                onChange={(e) => {
                                  setSubject(e.target.value);
                                  handleFieldChange('subject', e.target.value);
                                }}
                            />
                            {validationErrors.subject && showValidationErrors && (
                              <div className="text-red-500 text-xs mt-1 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Please enter a subject
                              </div>
                            )}
                        </div>
                        <div className={`flex-1 ${validationErrors.message && showValidationErrors ? 'border-red-500' : ''}`}>
                            <textarea 
                                className={`w-full py-2 text-sm resize-none text-black focus:outline-none bg-transparent placeholder-gray-900 ${validationErrors.message && showValidationErrors ? 'text-red-600' : ''}`}
                                aria-label="Message body"
                                placeholder="Enter message"
                                value={message}
                                onChange={(e) => {
                                  setMessage(e.target.value);
                                  handleFieldChange('message', e.target.value);
                                }}
                            ></textarea>
                            {validationErrors.message && showValidationErrors && (
                              <div className="text-red-500 text-xs mt-1 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Please enter a message
                              </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="px-4 py-3 bg-white rounded-b-lg">
                        {networkError && (
                          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center text-red-600 text-sm">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {networkError}
                            </div>
                          </div>
                        )}
                        <button 
                            onClick={handleSend}
                            disabled={isSending}
                            className={`bg-[#5C3262] hover:bg-[#4A2A50] text-white font-bold py-2 px-5 rounded-full flex items-center text-sm transition-all duration-200 hover:scale-105 cursor-pointer ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSending ? 'Sending...' : 'Send'}
                            <span className="ml-2 border-l border-white/30 pl-2 text-xs">▼</span>
                        </button>
                    </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-72 bg-white p-4 border-l border-gray-200">
                <div className="relative w-full h-full">
                  {/* Base Gemini SVG */}
                  <Image 
                    src="/broswer/Gemini.svg" 
                    width={250} 
                    height={550} 
                    alt="Gemini Section" 
                  />
                  
                  {/* Card 1 - Positioned on top */}
                  <div 
                    className="absolute"
                    style={{ top: '65px', left: '12px' }}
                  >
                    <Image src="/broswer/keep-it-simple.svg" width={226} height={80} alt="Keep it simple and direct" />
                  </div>

                  {/* Card 2 - Positioned on top */}
                  <div 
                    className="absolute"
                    style={{ top: '155px', left: '12px' }}
                  >
                    <Image src="/broswer/be-honest.svg" width={226} height={80} alt="Be honest and open" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">Your email has been sent successfully to letstalk@thecoordinatedliving.com</p>
              <p className="text-gray-500 text-sm mt-2">Note: If the recipient doesn&apos;t see the email, please ask them to check their spam/junk folder.</p>
            </div>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                // Clear form
                setUserEmail('');
                setSubject('');
                setMessage('');
              }}
              className="bg-[#5C3262] hover:bg-[#4A2A50] text-white font-bold py-2 px-6 rounded-full transition-all duration-200 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskAQuestion; 