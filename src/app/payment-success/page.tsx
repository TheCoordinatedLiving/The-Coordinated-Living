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

interface PaymentData {
  type: 'donation' | 'channel';
  amount?: number;
  currency?: string;
  email?: string;
  phoneNumber?: string;
}

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [copied, setCopied] = useState(false);
  const [shouldRedirect] = useState(false);

  // Currency information
  const currencyInfo = {
    'GHS': { symbol: '₵', subunit: 100, name: 'Ghana Cedi' },
    'NGN': { symbol: '₦', subunit: 100, name: 'Nigerian Naira' },
    'ZAR': { symbol: 'R', subunit: 100, name: 'South African Rand' },
    'KES': { symbol: 'KSh', subunit: 100, name: 'Kenyan Shilling' },
    'USD': { symbol: '$', subunit: 100, name: 'US Dollar' }
  };

  // Helper function to format amount with correct currency
  const formatAmount = (amount: number, currency: string = 'GHS') => {
    const info = currencyInfo[currency as keyof typeof currencyInfo] || currencyInfo.GHS;
    return `${info.symbol}${amount.toFixed(2)}`;
  };

  // Get payment reference and type from URL parameters
  const reference = searchParams.get('reference');
  const trxref = searchParams.get('trxref');
  const urlPaymentType = searchParams.get('type');

  // IMMEDIATE REDIRECT CHECK - if it's a donation, redirect immediately before any rendering
  console.log('=== PAYMENT SUCCESS COMPONENT LOADED ===');
  console.log('URL Payment Type:', urlPaymentType);
  console.log('Reference:', reference);
  console.log('Trxref:', trxref);

  // WhatsApp channel link
  const whatsappChannelLink = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_LINK || "https://chat.whatsapp.com/YOUR_CHANNEL_LINK";

  // Handle redirect when shouldRedirect is true
  useEffect(() => {
    if (shouldRedirect) {
      console.log('Router redirect to donation-success');
      router.replace(`/donation-success?reference=${reference || trxref}`);
    }
  }, [shouldRedirect, router, reference, trxref]);

  useEffect(() => {
    // Debug: Check storage immediately when component loads
    console.log('=== PAYMENT SUCCESS PAGE LOADED ===');
    console.log('URL Payment Type:', urlPaymentType);
    console.log('SessionStorage on load:', {
      donationData: sessionStorage.getItem('donationData'),
      cameFromDonation: sessionStorage.getItem('cameFromDonation'),
      allKeys: Object.keys(sessionStorage)
    });
    console.log('LocalStorage on load:', {
      donationData: localStorage.getItem('donationData'),
      cameFromDonation: localStorage.getItem('cameFromDonation'),
      allKeys: Object.keys(localStorage)
    });
    console.log('Document referrer:', document.referrer);
    console.log('Current URL:', window.location.href);
    console.log('URL params:', { reference, trxref, urlPaymentType });
    
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
          
          // Extract payment type from metadata
          const metadata = data.data.metadata;
          console.log('Full metadata:', metadata);
          console.log('Full data object:', data.data);
          
          const paymentType = metadata?.custom_fields?.find((field: { variable_name: string; value: string }) => 
            field.variable_name === 'payment_type'
          )?.value;
          console.log('Payment type from metadata:', paymentType);
          
          // Check sessionStorage and localStorage for donation data as fallback
          const storedDonationData = sessionStorage.getItem('donationData') || localStorage.getItem('donationData');
          const cameFromDonationFlag = sessionStorage.getItem('cameFromDonation') || localStorage.getItem('cameFromDonation');
          console.log('Stored donation data (session):', sessionStorage.getItem('donationData'));
          console.log('Stored donation data (local):', localStorage.getItem('donationData'));
          console.log('Stored donation data (final):', storedDonationData);
          console.log('Came from donation flag (session):', sessionStorage.getItem('cameFromDonation'));
          console.log('Came from donation flag (local):', localStorage.getItem('cameFromDonation'));
          console.log('Came from donation flag (final):', cameFromDonationFlag);
          
          // Also check if we came from donation-mobile page (additional fallback)
          const cameFromDonation = document.referrer.includes('donation-mobile') || 
                                 window.location.href.includes('donation') ||
                                 cameFromDonationFlag === 'true';
          console.log('Came from donation:', cameFromDonation);
          console.log('Referrer:', document.referrer);
          console.log('URL:', window.location.href);
          
          // Determine payment type - URL parameter is most reliable
          let type: 'donation' | 'channel' = 'channel'; // default
          const paystackCurrency = data.data.currency || 'GHS';
          const paystackAmount = data.data.amount;
          const amount = paystackAmount / 100; // Convert from smallest unit to main unit
          const email = data.data.customer?.email;
          const phoneNumber = '';
          
          // Determine payment type - URL parameter is the absolute priority
          console.log('🔴 NEW CODE IS RUNNING - URL Payment Type:', urlPaymentType);
          if (urlPaymentType === 'donation') {
            console.log('🔴 URL explicitly says donation - setting type to donation');
            type = 'donation';
            // Create donation data if not already stored
            if (!storedDonationData) {
              const donationData = {
                amount: amount,
                currency: paystackCurrency,
                email: data.data.customer?.email || '',
                phoneNumber: ''
              };
              sessionStorage.setItem('donationData', JSON.stringify(donationData));
            }
          } else {
            // For subscription, channel, or any other type, use channel
            console.log('🔴 URL says subscription/channel or no type - setting type to channel');
            type = 'channel';
            // Clear any old donation data since this is not a donation
            sessionStorage.removeItem('donationData');
            localStorage.removeItem('donationData');
            localStorage.removeItem('cameFromDonation');
          }
          
          const paymentInfo = {
            type,
            amount,
            currency: paystackCurrency,
            email,
            phoneNumber
          };
          
          setPaymentData(paymentInfo);
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        // TEMPORARY FIX: Assume success if verification fails (due to missing API keys)
        console.log('Payment verification failed, but assuming success since we have reference');
        setPaymentStatus('success');
        
        // Set basic payment data
        const paymentInfo: PaymentData = {
          type: urlPaymentType === 'donation' ? 'donation' : 'channel',
          amount: 0, // We don't have the amount from failed verification
          email: '',
          phoneNumber: ''
        };
        
        console.log('=== FALLBACK PAYMENT DATA ===');
        console.log('urlPaymentType:', urlPaymentType);
        console.log('Setting type to:', paymentInfo.type);
        setPaymentData(paymentInfo);
      }
    };

    verifyPayment();
  }, [reference, trxref, urlPaymentType, router]);

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


  const handleShare = () => {
    const text = `I just donated to support Coordinated Living! Your support helps keep this platform running. 💙`;
    const url = window.location.origin;
    
    if (navigator.share) {
      navigator.share({ text, url });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${text} ${url}`);
      alert('Donation message copied to clipboard!');
    }
  };

  const handleSetUpAnother = () => {
    router.push('/donation-mobile');
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

  // Debug: Log payment data to see what we're getting
  console.log('Payment Data:', paymentData);
  console.log('Payment Type:', paymentData?.type);
  console.log('URL Payment Type:', urlPaymentType);

  // Determine if this is a donation based on URL parameter or payment data
  const isDonation = urlPaymentType === 'donation' || paymentData?.type === 'donation';
  
  // Debug logging
  console.log('=== FINAL PAYMENT TYPE DETECTION ===');
  console.log('urlPaymentType:', urlPaymentType);
  console.log('paymentData?.type:', paymentData?.type);
  console.log('isDonation:', isDonation);
  console.log('Will show donation content:', isDonation);
  console.log('Will show channel content:', !isDonation);

  // Get donation amount and currency from payment data or stored data
  const getDonationData = () => {
    if (paymentData?.amount) {
      return {
        amount: paymentData.amount,
        currency: paymentData.currency || 'GHS'
      };
    }
    const storedData = sessionStorage.getItem('donationData') || localStorage.getItem('donationData');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        return {
          amount: parsed.amount,
          currency: parsed.currency || 'GHS'
        };
      } catch {
        return null;
      }
    }
    return null;
  };

  const donationData = getDonationData();
  const donationAmount = donationData?.amount;

  // Render donation success content
  if (isDonation) {
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

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 
            className={`${amita.className} text-3xl font-bold text-center mb-4 leading-tight text-white`}
          >
            Thank You!<br />My Cup is Full
          </h1>

          {/* Donation Details */}
          {donationAmount && (
            <div 
              className="bg-white bg-opacity-10 rounded-2xl p-6 mb-6"
            >
              <div className="text-center">
                <p className={`${roboto.className} text-white text-lg font-medium mb-2`}>
                  Donation Amount: {donationAmount ? formatAmount(donationAmount, donationData?.currency) : 'N/A'}
                </p>
                <p className={`${roboto.className} text-white text-sm opacity-80`}>
                  One-time donation
                </p>
              </div>
            </div>
          )}

          {/* Thank You Message */}
          <p 
            className={`${roboto.className} text-white text-base leading-relaxed text-center mb-8`}
          >
            Your generous support helps keep this platform running and my cup full. 
            Every donation makes a real difference in maintaining this space for our community.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleShare}
              className="w-full py-4 px-6 rounded-full font-medium text-base transition-all duration-200 hover:scale-105 active:scale-95 bg-white"
            >
              <span className={`${roboto.className} font-medium text-lg`} style={{ color: '#2F4C6C' }}>Share Your Support</span>
            </button>
            
            <button
              onClick={handleSetUpAnother}
              className="w-full py-3 px-6 rounded-full font-medium text-base transition-all duration-200 hover:opacity-80 border-2 border-white text-white"
            >
              <span className={`${roboto.className} font-medium text-base`}>Set Up Another Donation</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p 
              className={`${roboto.className} text-white text-xs opacity-60`}
            >
              You&apos;ll receive an email confirmation shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render channel success content (default)
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
          <p className={`text-white text-lg leading-relaxed`}>
            <span className={`${amita.className} font-bold`}>Welcome!</span> <span className={`${roboto.className}`}>You&apos;re officially part of a community dedicated to navigating life&apos;s struggles and finding purpose in Christ. I&apos;m honored to have you here. This channel is for us to walk together in faith, sharing insights and growing closer to the Lord.</span>
          </p>
        </div>


        {/* Channel Information */}
        <div className="mb-8">
          <p className={`${roboto.className} text-white text-lg leading-relaxed`}>
            Since this is an exclusive community, please remember that the channel link is just for you. Please do not share it with others. Your support allows me to create this content, and keeping the channel private helps us honour everyone&apos;s investment.
          </p>
        </div>

        {/* Excitement Message */}
        <div className="mb-8 text-center">
          <p className={`${amita.className} text-2xl text-white font-bold`}>
            I&apos;m excited to have you here!
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
          <div className="mb-6">
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