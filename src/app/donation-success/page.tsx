// TEMPORARY DONATION SUCCESS PAGE
// TODO: Fix the original donation-success page with proper Suspense boundary

'use client';

import Image from 'next/image';

export default function DonationSuccessPage() {
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
        <p className="text-lg">Thank you for your donation!</p>
        <p className="text-sm mt-4 opacity-80">This page is temporarily disabled.</p>
      </div>
    </div>
  );
}