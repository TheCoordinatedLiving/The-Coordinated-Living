'use client';

import { useState } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: { reference: string; amount: number }) => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate inputs
      if (!email || !phoneNumber || !amount) {
        throw new Error('Please fill in all required fields');
      }

      const donationAmount = parseFloat(amount);
      if (isNaN(donationAmount) || donationAmount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Phone number validation (international format)
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
        throw new Error('Please enter a valid phone number');
      }

      // Call the normal transaction API
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          phoneNumber: phoneNumber,
          amount: (donationAmount * 100).toString(), // Convert to kobo
          type: 'donation'
        }),
      });

      const data = await response.json();
      console.log('DonationModal API Response:', data);

      if (data.status && data.data.authorization_url) {
        // Store donation data in sessionStorage for success page
        const donationData = {
          amount: donationAmount,
          email: email,
          phoneNumber: phoneNumber
        };
        console.log('Storing donation data:', donationData);
        sessionStorage.setItem('donationData', JSON.stringify(donationData));
        sessionStorage.setItem('cameFromDonation', 'true');
        
        // Also store in localStorage as backup (survives redirects better)
        localStorage.setItem('donationData', JSON.stringify(donationData));
        localStorage.setItem('cameFromDonation', 'true');
        
        console.log('Stored in sessionStorage:', sessionStorage.getItem('donationData'));
        console.log('Stored in localStorage:', localStorage.getItem('donationData'));
        console.log('Paystack authorization URL:', data.data.authorization_url);
        
        // Redirect to Paystack checkout
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error(data.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('Donation error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPhoneNumber('');
    setAmount('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#2F4C6C' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-2xl font-bold"
            style={{ 
              fontFamily: 'Amita, cursive',
              color: 'white'
            }}
          >
            Pour Into My Cup
          </h2>
          <button
            onClick={handleClose}
            className="text-white hover:opacity-80 transition-opacity"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p 
          className="text-white text-sm mb-6 leading-relaxed"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Your support helps keep this platform running and my cup full. 
          Choose any amount that feels right for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-white text-sm font-medium mb-2"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-white text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:outline-none bg-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label 
              htmlFor="phoneNumber" 
              className="block text-white text-sm font-medium mb-2"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-white text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:outline-none bg-transparent"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Amount Selection */}
          <div>
            <label 
              className="block text-white text-sm font-medium mb-2"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Donation Amount (GHS) *
            </label>
            
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-white text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:outline-none bg-transparent"
                placeholder="Enter your preferred amount"
                min="1"
                step="0.01"
                required
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm pointer-events-none">GHS</span>
            </div>
          </div>


          {/* Error Message */}
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg p-3">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email || !phoneNumber || !amount}
            className="w-full py-4 px-6 rounded-full font-bold text-lg transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#FFFFFF', color: '#2F4C6C' }}
          >
            {isLoading ? 'Processing...' : 'Donate Now'}
          </button>

          {/* Terms */}
          <p className="text-white text-xs text-center opacity-80">
            By donating, you agree to our terms of service.
          </p>
        </form>
      </div>
    </div>
  );
}
