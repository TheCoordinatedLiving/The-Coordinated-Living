"use client";

import { useState } from 'react';
import Toast from './Toast';

interface EmailInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSubmit: (email: string) => void;
  amount: number;
}

export default function EmailInputModal({
  isOpen,
  onClose,
  onEmailSubmit,
  amount
}: EmailInputModalProps) {
  const [email, setEmail] = useState('');
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
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      await onEmailSubmit(email);
    } catch (err) {
      setToast({
        message: 'Failed to process email. Please try again.',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
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
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Amita, cursive', color: '#2F4C6C' }}>Complete Your Payment</h2>
          <p className="text-gray-600">
            Enter your email address to proceed with payment of <span className="font-bold" style={{ color: '#2F4C6C' }}>GHS {amount}</span>
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
            disabled={isLoading || !email}
            className="w-full py-4 px-6 rounded-full font-bold text-lg transition-all duration-200 hover:bg-[#2F4C6C] hover:text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#FFFFFF', color: '#2F4C6C' }}
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-8 p-4 rounded-full text-center" style={{ backgroundColor: '#2F4C6C' }}>
          <p className="text-sm" style={{ color: '#FFFFFF' }}>
            <strong>Note:</strong> You will be redirected to Paystack's secure payment page to complete your transaction.
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
