// TEMPORARY DONATION SUCCESS PAGE
// TODO: Fix the original donation-success page with proper Suspense boundary

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DonationModal from '@/components/DonationModal';

export default function DonationSuccessPage() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const router = useRouter();

  const handleMakeAnotherDonation = () => {
    setIsDonationModalOpen(true);
  };

  const handleGoBackHome = () => {
    router.push('/');
  };

  const handleDonationSuccess = (data: { reference: string; amount: number }) => {
    setIsDonationModalOpen(false);
    // Redirect to payment success page
    router.push(`/payment-success?reference=${data.reference}&amount=${data.amount}`);
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#2F4C6C' }}>
      <div className="text-center text-white">
        <div className="w-32 h-32 rounded-full mb-6 mx-auto flex items-center justify-center" style={{ backgroundColor: '#2481C2' }}>
          <Image 
            src="/donate-success-logo.svg" 
            alt="Donation Success" 
            width={96} 
            height={96}
            className="w-24 h-24"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Amita, cursive' }}>Donation Success</h1>
        <p className="text-3xl" style={{ fontFamily: 'Amita, cursive' }}>A Cheerful Gift, a Full Cup</p>
        <p className="text-base mt-4 opacity-80 max-w-lg mx-auto">Thank you so much for your donation! You just topped up the cup on my desk and poured real fuel into this platform. Your kindness helps me keep things running sustainably—content, updates, and community support included. I'm grateful for you.</p>
        
        <div className="mt-8 space-y-4">
          <button 
            onClick={handleMakeAnotherDonation}
            className="w-full max-w-xs mx-auto block bg-white text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Make Another Donation
          </button>
          
          <button 
            onClick={handleGoBackHome}
            className="w-full max-w-xs mx-auto block bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-gray-800 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
      
      <DonationModal 
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onSuccess={handleDonationSuccess}
      />
    </div>
  );
}