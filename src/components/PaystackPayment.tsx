"use client";

import { useState } from 'react';

interface PaystackPaymentProps {
  amount: number;
  email: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
}

export default function PaystackPayment({
  amount,
  email,
  onSuccess,
  onClose
}: PaystackPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Call our API endpoint to initialize Paystack transaction
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          amount: (amount * 100).toString() // Convert to kobo
        }),
      });

      const data = await response.json();

      if (data.status && data.data.authorization_url) {
        // Redirect to Paystack checkout
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error(data.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert('Failed to initialize payment. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full py-4 px-6 rounded-full font-bold text-lg transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ backgroundColor: '#FFFFFF', color: '#2F4C6C' }}
    >
      {isLoading ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
