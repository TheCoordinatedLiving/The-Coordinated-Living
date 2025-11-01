"use client";

import { useState } from 'react';
import Image from 'next/image';

interface PaymentSuccessProps {
  onClose: () => void;
}

export default function PaymentSuccess({ onClose }: PaymentSuccessProps) {
  const [copied, setCopied] = useState(false);

  // WhatsApp community link - you'll need to replace this with your actual community link
  const whatsappChannelLink = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_LINK || "https://chat.whatsapp.com/YOUR_CHANNEL_LINK";

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">
            Welcome to our exclusive community! You can now join our WhatsApp community.
          </p>
        </div>

        {/* WhatsApp Join Section */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Join Our WhatsApp Community</h3>
            <p className="text-sm text-gray-600 mb-4">
              Click the button below to join our exclusive WhatsApp community and start receiving your content.
            </p>
            
            {/* WhatsApp Button */}
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
            >
              <Image
                src="/whatsapp-mobile.svg"
                alt="WhatsApp"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="font-semibold">Join WhatsApp Community</span>
            </button>
          </div>

          {/* Alternative: Copy Link */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Or copy the link:</p>
            <button
              onClick={copyToClipboard}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> If you have any issues joining the community, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
