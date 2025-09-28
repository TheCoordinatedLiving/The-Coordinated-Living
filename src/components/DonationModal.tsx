'use client';

import { useState, useEffect } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('GHS');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Paystack supported currencies (only GHS enabled for this merchant account)
  const availableCurrencies = [
    { code: 'GHS', symbol: '₵', name: 'Ghana Cedi', country: 'Ghana' }
    // Note: Other currencies need to be enabled in Paystack merchant account
    // { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', country: 'Nigeria' },
    // { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa' },
    // { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', country: 'Kenya' },
    // { code: 'USD', symbol: '$', name: 'US Dollar', country: 'International' }
  ];

  // Set currency to GHS only (only supported currency for this merchant account)
  useEffect(() => {
    if (isOpen) {
      setCurrency('GHS');
      console.log('Currency set to GHS (only supported currency for this merchant account)');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate inputs
      if (!emailOrPhone || !amount) {
        throw new Error('Please fill in all required fields');
      }

      const donationAmount = parseFloat(amount);
      if (isNaN(donationAmount) || donationAmount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      if (donationAmount < 10) {
        throw new Error('Minimum donation amount is 10 GHS');
      }

      // Email or phone validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Updated phone regex to handle international numbers: +233, +1, 020, etc.
      const phoneRegex = /^(\+\d{7,15}|0\d{8,9}|\d{8,15})$/;
      const cleanInput = emailOrPhone.replace(/\s/g, '');
      
      if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(cleanInput)) {
        throw new Error('Please enter a valid email address or phone number');
      }

      // Determine if input is email or phone and generate temp email if needed
      const isEmail = emailOrPhone.includes('@');
      let email = '';
      let phoneNumber = '';
      
      if (isEmail) {
        email = emailOrPhone;
        phoneNumber = '';
      } else {
        // Generate temporary email for phone number
        const cleanPhone = emailOrPhone.replace(/\s/g, '');
        email = `temp-${cleanPhone}@coordinated-living.gh`;
        phoneNumber = emailOrPhone;
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
          amount: (donationAmount * 100).toString(), // Convert to smallest currency unit
          currency: currency,
          type: 'donation'
        }),
      });

      const data = await response.json();
      console.log('DonationModal API Response:', data);

      if (data.status && data.data.authorization_url) {
        // Store donation data in sessionStorage for success page
        const donationData = {
          amount: donationAmount,
          currency: currency,
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
    setEmailOrPhone('');
    setAmount('');
    setCurrency('GHS');
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
        {/* Close Button */}
        <div className="flex justify-end mb-6">
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
          Your support helps me sustainably run this platform. thank you for your kindness
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email or Phone Input */}
          <div>
            <label 
              htmlFor="emailOrPhone" 
              className="block text-white text-sm font-medium mb-2"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Email Address or Phone Number *
            </label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-white text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:outline-none bg-transparent"
              placeholder="enter email or phone number"
              required
            />
          </div>

          {/* Currency Selection - Hidden since only GHS is available */}
          {availableCurrencies.length > 1 && (
            <div>
              <label 
                htmlFor="currency" 
                className="block text-white text-sm font-medium mb-2"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Currency *
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-white text-white focus:ring-2 focus:ring-white focus:outline-none bg-transparent"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
              >
                {availableCurrencies.map((curr) => (
                  <option 
                    key={curr.code} 
                    value={curr.code}
                    style={{ backgroundColor: '#2F4C6C', color: 'white' }}
                  >
                    {curr.symbol} {curr.code} - {curr.name} ({curr.country})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Amount Selection */}
          <div>
            <label 
              className="block text-white text-sm font-medium mb-2"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Amount *
            </label>
            
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-white text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:outline-none bg-transparent"
                placeholder="Enter your preferred amount"
                min="10"
                step="0.01"
                required
              />
            </div>
            
            {/* Amount validation message */}
            {amount && parseFloat(amount) < 10 && (
              <p className="text-red-300 text-sm mt-2">
                Please make donation 10 GHS and above
              </p>
            )}
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
            disabled={isLoading || !emailOrPhone || !amount}
            className="w-full py-4 px-6 rounded-full font-bold text-lg transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#FFFFFF', color: '#2F4C6C' }}
          >
            {isLoading ? 'Processing...' : 'Pour'}
          </button>

        </form>
      </div>
    </div>
  );
}
