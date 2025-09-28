"use client";
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

const AskQuestionPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: false,
    subject: false,
    message: false
  });
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [networkError, setNetworkError] = useState('');
  const sendTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleClose = () => {
    router.push('/?skipLoader=true');
  };

  const validateForm = () => {
    const errors = {
      email: !formData.email.trim(),
      subject: !formData.subject.trim(),
      message: !formData.message.trim()
    };
    
    setValidationErrors(errors);
    setShowValidationErrors(true);
    
    return !errors.email && !errors.subject && !errors.message;
  };

  const handleFieldChange = (field: 'email' | 'subject' | 'message', value: string) => {
    if (showValidationErrors) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: !value.trim()
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    handleFieldChange(name as 'email' | 'subject' | 'message', value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSending) return; // Prevent double submission
    setIsSending(true);
    if (sendTimeout.current) {
      clearTimeout(sendTimeout.current);
    }
    sendTimeout.current = setTimeout(async () => {
      if (!validateForm()) {
        setIsSending(false);
        return;
      }
      try {
        // Send email via API
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: formData.email,
            subject: formData.subject,
            message: formData.message
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setShowSuccessModal(true);
          setNetworkError('');
        } else {
          throw new Error(data.error || 'Failed to send email. Please try again.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        setNetworkError('Failed to send email. Please check your connection and try again. If the problem persists, the email may have been sent but could be in the recipient\'s spam folder.');
      } finally {
        setIsSending(false);
      }
    }, 200); // Debounce by 200ms
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2F4C6C' }}>
      <button 
        onClick={handleClose}
        className="absolute top-8 left-4 w-8 h-8 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className="pt-20 px-4">
        <h1 className="text-2xl font-bold text-white text-left mb-8" style={{ fontFamily: 'Amita, cursive' }}>Ask Me A Question</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* To Field */}
          <div>
            <div className="border-b border-white pb-1">
              <span className="text-sm text-white">To: </span>
              <span className="text-white font-semibold">letstalk@thecoordinatedliving.com</span>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm text-white mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full border-b pb-1 focus:outline-none text-white placeholder-white ${
                validationErrors.email && showValidationErrors 
                  ? 'border-red-400 text-red-300' 
                  : 'border-white focus:border-white'
              }`}
              placeholder=""
            />
            {validationErrors.email && showValidationErrors && (
              <div className="text-red-300 text-xs mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Please enter your email address
              </div>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-sm text-white mb-1">Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className={`w-full border-b pb-1 focus:outline-none text-white placeholder-white ${
                validationErrors.subject && showValidationErrors 
                  ? 'border-red-400 text-red-300' 
                  : 'border-white focus:border-white'
              }`}
              placeholder=""
            />
            {validationErrors.subject && showValidationErrors && (
              <div className="text-red-300 text-xs mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Please enter a subject
              </div>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm text-white mb-1">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className={`w-full focus:outline-none resize-none text-white placeholder-white ${
                validationErrors.message && showValidationErrors 
                  ? 'text-red-300' 
                  : ''
              }`}
              placeholder="Hello, I am............"
            />
            {validationErrors.message && showValidationErrors && (
              <div className="text-red-300 text-xs mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Please enter a message
              </div>
            )}
          </div>

          {/* Network Error Message */}
          {networkError && (
            <div className="pt-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <div className="flex items-center text-red-600 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {networkError}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSending}
              className={`w-full py-4 px-6 rounded-full font-semibold transition-colors ${
                isSending 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-100'
              }`}
              style={{ color: isSending ? '#666' : '#2F4C6C' }}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">Your email has been sent successfully to letstalk@thecoordinatedliving.com</p>
              <p className="text-gray-500 text-sm mt-2">Note: If the recipient doesn&apos;t see the email, please ask them to check their spam/junk folder.</p>
            </div>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                // Clear form
                setFormData({
                  email: '',
                  subject: '',
                  message: ''
                });
                setShowValidationErrors(false);
                setValidationErrors({
                  email: false,
                  subject: false,
                  message: false
                });
              }}
              className="bg-[#2F4C6C] hover:bg-[#1e3a52] text-white font-bold py-2 px-6 rounded-full transition-all duration-200 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskQuestionPage;
