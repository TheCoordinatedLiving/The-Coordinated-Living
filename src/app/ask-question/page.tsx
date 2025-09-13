"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AskQuestionPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const handleClose = () => {
    router.push('/?skipLoader=true');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2481C2' }}>
      <button 
        onClick={handleClose}
        className="absolute top-8 left-4 w-8 h-8 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className="pt-20 px-4">
        <h1 className="text-2xl font-bold text-white text-left mb-8">Ask Me A Question</h1>
        
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
              className="w-full border-b border-white pb-1 focus:outline-none focus:border-white text-white placeholder-white"
              placeholder=""
            />
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
              className="w-full border-b border-white pb-1 focus:outline-none focus:border-white text-white placeholder-white"
              placeholder=""
            />
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
              className="w-full focus:outline-none resize-none text-white placeholder-white"
              placeholder="Hello, I am............"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-white py-4 px-6 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              style={{ color: '#2481C2' }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestionPage;
