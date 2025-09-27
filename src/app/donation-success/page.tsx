'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Amita, Roboto } from 'next/font/google';
import Image from 'next/image';

const amita = Amita({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

interface DonationData {
  amount: number;
  email: string;
  phoneNumber?: string;
}

export default function DonationSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, setDonationData] = useState<DonationData | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'failed' | 'pending'>('pending');
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('=== DONATION SUCCESS PAGE LOADED ===');
    console.log('URL:', window.location.href);
    console.log('Search params:', Object.fromEntries(new URLSearchParams(window.location.search)));
    
    // Get donation data from sessionStorage or localStorage
    const storedData = sessionStorage.getItem('donationData') || localStorage.getItem('donationData');
    console.log('Stored donation data:', storedData);
    
    if (storedData) {
      setDonationData(JSON.parse(storedData));
      // Clean up storage
      sessionStorage.removeItem('donationData');
      localStorage.removeItem('donationData');
    }

    // Verify payment if reference exists
    const reference = searchParams.get('reference');
    if (reference) {
      verifyPayment(reference);
    } else {
      setIsVerifying(false);
      setVerificationStatus('success'); // Assume success if no reference
    }

    // Animate page in
    if (pageRef.current) {
      gsap.set(pageRef.current, { opacity: 0, y: 20 });
      gsap.to(pageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    }
  }, [searchParams]);

  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference }),
      });

      const data = await response.json();
      
      if (data.status && data.data.status === 'success') {
        setVerificationStatus('success');
      } else {
        setVerificationStatus('failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setVerificationStatus('failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    if (pageRef.current) {
      gsap.to(pageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          router.push('/?skipLoader=true');
        }
      });
    }
  };

  // const handleShare = () => {
  //   const text = `I just donated to support Coordinated Living! Your support helps keep this platform running. 💙`;
  //   const url = window.location.origin;
  //   
  //   if (navigator.share) {
  //     navigator.share({ text, url });
  //   } else {
  //     // Fallback to copying to clipboard
  //     navigator.clipboard.writeText(`${text} ${url}`);
  //     alert('Donation message copied to clipboard!');
  //   }
  // };

  const handleSetUpAnother = () => {
    router.push('/donation-mobile');
  };

  if (isVerifying) {
    return (
      <div 
        ref={pageRef}
        className="min-h-screen w-full flex flex-col items-center justify-center"
        style={{ backgroundColor: '#2F4C6C' }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className={`${roboto.className} text-white text-lg`}>Verifying your donation...</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <div 
        ref={pageRef}
        className="min-h-screen w-full flex flex-col"
        style={{ backgroundColor: '#2F4C6C' }}
      >
        {/* Header */}
        <div className="flex justify-start items-center p-4 pt-8">
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Error Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <h1 
            className={`${amita.className} text-2xl font-bold mb-4 text-white`}
          >
            Payment Failed
          </h1>
          
          <p 
            className={`${roboto.className} text-white text-base leading-relaxed mb-8`}
          >
            We couldn&apos;t process your donation. Please try again or contact support if the issue persists.
          </p>

          <div className="space-y-3 w-full max-w-xs">
            <button
              onClick={handleSetUpAnother}
              className="w-full py-3 px-6 rounded-full font-medium text-base transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ 
                backgroundColor: 'white',
                color: '#2F4C6C',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Try Again
            </button>
            
            <button
              onClick={handleClose}
              className="w-full py-3 px-6 rounded-full font-medium text-base transition-all duration-200 hover:opacity-80 border-2 border-white text-white"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={pageRef}
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: '#2F4C6C' }}
    >
      {/* Header */}
      <div className="flex justify-start items-center p-4 pt-8">
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Success Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Logo Circle */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2481C2' }}>
            <Image
              src="/donate-success-logo.svg"
              alt="Coordinated Living Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </div>
        </div>

        {/* Title */}
        <h1 
          className={`${amita.className} text-3xl font-bold text-center mb-6 leading-tight text-white`}
        >
          Thank You For Your Donation
        </h1>

        {/* Description */}
        <div className="flex justify-center mb-8">
          <p 
            className={`${roboto.className} text-white text-base leading-relaxed text-center max-w-sm`}
          >
            Your generous support helps keep this platform running and my cup full. 
            Every donation makes a real difference in maintaining this space for our community.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 flex flex-col items-center">
          <button
            onClick={handleSetUpAnother}
            className="py-4 px-8 rounded-full font-medium text-base transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: 'white',
              color: '#2F4C6C',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            Make Another Donation
          </button>
          
          <div className="text-center">
            <button
              onClick={handleClose}
              className={`${roboto.className} text-white text-sm hover:text-gray-200 underline transition-colors`}
            >
              Back To Website
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
