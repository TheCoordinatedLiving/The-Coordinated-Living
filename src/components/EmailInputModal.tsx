"use client";

import { useState } from 'react';
import Toast from './Toast';

interface EmailInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSubmit: (email: string, phoneNumber: string, fullName: string) => void;
  amount: number;
  paymentType?: 'regular' | 'momo';
}

export default function EmailInputModal({
  isOpen,
  onClose,
  onEmailSubmit,
  amount,
  paymentType = 'regular'
}: EmailInputModalProps) {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation (only for regular payments)
    if (paymentType === 'regular') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    // Basic phone number validation (supports Ghana format starting with 0 and international format starting with +)
    const phoneRegex = /^(\+\d{7,15}|0\d{8,9})$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      setError('Please enter a valid WhatsApp number');
      return;
    }

    setIsLoading(true);
    
    try {
      // For MOMO payments, pass empty email string
      const emailToSubmit = paymentType === 'momo' ? '' : email;
      const nameToSubmit = paymentType === 'momo' ? '' : fullName;
      await onEmailSubmit(emailToSubmit, phoneNumber, nameToSubmit);
    } catch {
      setToast({
        message: 'Failed to process payment. Please try again.',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPhoneNumber('');
    setFullName('');
    setError('');
    setToast({ message: '', type: 'success', isVisible: false });
    onClose();
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-10 max-w-md w-full mx-4 relative shadow-2xl border border-white/20">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {paymentType === 'momo' 
              ? `Enter your WhatsApp number to proceed with Mobile Money payment of`
              : `Please enter your details below`
            }
            {paymentType === 'momo' && <span className="font-bold" style={{ color: '#2F4C6C' }}> GHS {amount}</span>}
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {paymentType === 'regular' && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                  required={paymentType === 'regular'}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                  required={paymentType === 'regular'}
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your WhatsApp number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
              required
              disabled={isLoading}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || (paymentType === 'regular' && (!email || !fullName)) || !phoneNumber}
            className="w-full py-4 px-6 rounded-full font-bold text-lg transition-all duration-200 hover:bg-[#2F4C6C] hover:text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#FFFFFF', color: '#2F4C6C' }}
          >
            {isLoading ? 'Processing...' : (paymentType === 'momo' ? 'Pay with Mobile Money' : 'Pay Now')}
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-8 p-4 rounded-full text-center" style={{ backgroundColor: '#2F4C6C' }}>
          <p className="text-sm" style={{ color: '#FFFFFF' }}>
            <strong>Note:</strong> {paymentType === 'momo' 
              ? 'You will receive a prompt on your mobile device to complete the Mobile Money payment.'
              : 'For your security, you will be redirected to Paystack to complete transaction.'
            }
          </p>
        </div>
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
}
