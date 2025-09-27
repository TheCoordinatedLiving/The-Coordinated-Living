'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import DonationModal from '@/components/DonationModal';

const DonationMobilePage = () => {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (pageRef.current) {
      // Set initial state
      gsap.set(pageRef.current, { opacity: 0, y: 20 });
      
      // Animate in
      gsap.to(pageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    }
  }, []);

  const handleClose = () => {
    if (pageRef.current) {
      gsap.to(pageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          // Navigate to homepage with skipLoader parameter to bypass loader and welcome screen
          router.push('/?skipLoader=true');
        }
      });
    }
  };

  const handleDonate = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDonationSuccess = (data: { reference: string; amount: number }) => {
    // The modal will handle the redirect to Paystack
    // Success will be handled by the payment-success page
    console.log('Donation initiated:', data);
  };

  return (
    <div 
      ref={pageRef}
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: '#2F4C6C' }}
    >
      {/* Header with close button */}
      <div className="flex justify-start items-center p-4 pt-8">
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 pb-8">
        {/* Title */}
        <h1 
          className="text-3xl font-bold text-left mb-4 leading-tight mt-4"
          style={{ 
            fontFamily: 'Amita, cursive',
            color: 'white'
          }}
        >
          A Cheerful Gift,<br />a Full Cup
        </h1>

        {/* Description */}
        <p 
          className="text-base leading-relaxed text-left mb-8"
          style={{ 
            fontFamily: 'Roboto, sans-serif',
            color: 'white'
          }}
        >
          Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform. Thank you for your kindness!
        </p>

        {/* Donation button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleDonate}
            className="w-full max-w-xs py-4 px-8 rounded-full font-medium text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            style={{ 
              backgroundColor: 'white',
              color: '#2F4C6C',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            Pour Into My Cup
          </button>
        </div>
      </div>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleDonationSuccess}
      />
    </div>
  );
};

export default DonationMobilePage;
