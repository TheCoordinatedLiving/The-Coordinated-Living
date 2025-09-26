"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Amita, Roboto } from 'next/font/google';

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

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [copied, setCopied] = useState(false);

  // Get payment reference from URL parameters
  const reference = searchParams.get('reference');
  const trxref = searchParams.get('trxref');

  // WhatsApp channel link
  const whatsappChannelLink = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_LINK || "https://chat.whatsapp.com/YOUR_CHANNEL_LINK";

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference && !trxref) {
        setPaymentStatus('failed');
        return;
      }

      try {
        // Verify payment with Paystack
        const response = await fetch('/api/paystack/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reference: reference || trxref
          }),
        });

        const data = await response.json();

        if (data.status && data.data.status === 'success') {
          setPaymentStatus('success');
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setPaymentStatus('failed');
      }
    };

    verifyPayment();
  }, [reference, trxref]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(whatsappChannelLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const openWhatsApp = () => {
    window.open(whatsappChannelLink, '_blank');
  };

  const handleClose = () => {
    router.push('/?skipLoader=true');
  };

  if (paymentStatus === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#2F4C6C' }}>
        <div className="max-w-lg w-full mx-4 text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`${roboto.className} text-white text-lg`}>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#2F4C6C' }}>
        <div className="max-w-lg w-full mx-4 text-center">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo Circle */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2481C2' }}>
              <Image
                src="/payment-success-logo.svg"
                alt="Coordinated Living Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
          </div>

          {/* Payment Failed Text */}
          <div className="mb-8">
            <h1 className={`${amita.className} text-2xl text-white mb-6`}>Payment Failed</h1>
          </div>

          {/* Retry Payment Message */}
          <div className="mb-8">
            <h2 className={`${amita.className} text-4xl text-white mb-6`}>Retry Payment</h2>
            <p className={`${roboto.className} text-white text-lg leading-relaxed`}>
              Unfortunately your payment didn&apos;t go through. Click on the retry payment button below to try payment again. Or contact support for help.
            </p>
          </div>

          {/* Retry Payment Button */}
          <div className="text-center">
            <button
              onClick={handleClose}
              className="w-full py-4 px-6 bg-white hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg mb-4"
            >
              <span className={`${roboto.className} font-medium text-lg`} style={{ color: '#2F4C6C' }}>Retry Payment</span>
            </button>
            
            {/* Contact Support Link */}
            <div>
              <button
                onClick={() => window.open('mailto:support@coordinatedliving.com', '_blank')}
                className={`${roboto.className} text-sm text-white hover:text-gray-200 underline transition-colors`}
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#2F4C6C' }}>
      <div className="max-w-lg w-full mx-4 text-center">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo Circle */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2481C2' }}>
            <Image
              src="/payment-success-logo.svg"
              alt="Coordinated Living Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </div>
        </div>

        {/* Payment Successful Text */}
        <div className="mb-8">
          <h1 className={`${amita.className} text-2xl text-white mb-6`}>Payment Successful</h1>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className={`${amita.className} text-4xl text-white mb-6`}>Welcome To Coordinated Living!</h2>
          <p className={`${roboto.className} text-white text-lg leading-relaxed`}>
            Thank you for joining our community. You&apos;re now part of an exclusive group dedicated to 
            coordinated living and meaningful connections.
          </p>
        </div>

        {/* About Our Channel */}
        <div className="mb-8">
          <h3 className={`${amita.className} text-2xl text-white mb-4`}>About Our Channel</h3>
          <p className={`${roboto.className} text-white text-lg leading-relaxed`}>
            Get exclusive Coordinated Living resources—with community discussions and support, regular updates and announcements, and access to premium guides and materials.
          </p>
        </div>

        {/* Join Channel Button */}
        <div className="text-center">
          <button
            onClick={openWhatsApp}
            className="w-full py-4 px-6 bg-white hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg mb-4"
          >
            <span className={`${roboto.className} font-medium text-lg`} style={{ color: '#2F4C6C' }}>Join Channel Now</span>
          </button>
          
          {/* Alternative: Copy Link */}
          <div>
            <button
              onClick={copyToClipboard}
              className={`${roboto.className} text-sm text-white hover:text-gray-200 underline transition-colors`}
            >
              {copied ? 'Link Copied!' : 'Copy Link Instead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function PaymentSuccessLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#2F4C6C' }}>
      <div className="max-w-lg w-full mx-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className={`${amita.className} text-xl text-white mb-2`}>Loading...</h2>
        <p className={`${roboto.className} text-white`}>Verifying your payment status</p>
      </div>
    </div>
  );
}

// Main export with Suspense boundary
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
