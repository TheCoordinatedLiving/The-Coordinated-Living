"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#2F4C6C' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#2F4C6C' }}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t verify your payment. Please try again or contact support if the issue persists.
          </p>
          <button
            onClick={handleClose}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#2F4C6C' }}>
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">CL</span>
          </div>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Payment Successful Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
          <div className="w-16 h-1 bg-green-500 mx-auto mb-4"></div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Welcome to Coordinated Living!</h2>
          <p className="text-gray-600 leading-relaxed">
            Thank you for joining our community. You&apos;re now part of an exclusive group dedicated to 
            coordinated living and meaningful connections.
          </p>
        </div>

        {/* Channel Information */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">About Our Channel</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Exclusive content and resources for coordinated living</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Community discussions and support</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Regular updates and announcements</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Access to premium guides and materials</p>
            </div>
          </div>
        </div>

        {/* Join Channel Button */}
        <div className="text-center">
          <button
            onClick={openWhatsApp}
            className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Image
              src="/whatsapp-mobile.svg"
              alt="WhatsApp"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="font-semibold text-lg">Join Channel Now</span>
          </button>
          
          {/* Alternative: Copy Link */}
          <div className="mt-4">
            <button
              onClick={copyToClipboard}
              className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              {copied ? 'Link Copied!' : 'Copy Link Instead'}
            </button>
          </div>
        </div>

        {/* Support Note */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            Need help? Contact our support team if you have any issues joining the channel.
          </p>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function PaymentSuccessLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading...</h2>
        <p className="text-gray-600">Verifying your payment status</p>
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
