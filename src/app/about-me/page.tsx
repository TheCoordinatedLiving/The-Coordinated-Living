"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AboutMePage = () => {
  const router = useRouter();

  const handleClose = () => {
    router.push('/?skipLoader=true');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2F4C6C' }}>
      {/* Close Button */}
      <button 
        onClick={handleClose}
        className="absolute top-8 left-4 w-8 h-8 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors z-10"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Logo */}
      <div className="absolute top-20 left-4">
        <Image 
          src="/new-post-logo-modal.svg" 
          alt="The Coordinated Living Logo" 
          width={128}
          height={128}
          className="w-32 h-auto"
        />
      </div>

      {/* Main Content */}
      <div className="pt-40 px-6 pb-8">
        <div className="max-w-md mx-auto">
          {/* Letter Content */}
          <div className="text-white space-y-8">
            {/* Greeting */}
            <div className="text-2xl" style={{ fontFamily: 'Amita, serif' }}>Hello,</div>
            
            {/* Letter Body */}
            <div className="text-sm leading-relaxed space-y-6">
              <p>
                &ldquo;Have you ever felt caught in a cycle of desires, wondering if there&apos;s more to life than this constant pull? In a world where truth often feels twisted, you&apos;re not alone.
              </p>
              
              <p>
                My name is Lesley, and like you, I&apos;ve navigated these challenging times through my journey and calling. I&apos;m now honored to serve you by sharing the Word of God. I welcome you to this space, a place where we seek &apos;the coordinated living&apos; - aligning our lives with God&apos;s Word and His purpose. Our goal is to be the sheep of His pasture, finding guidance, nourishment, and belonging within His fold.
              </p>
              
              <p>
                I believe that living the identity the Lord created for us in Christ is essential, and through teachings and reflections on His Word, we will explore what that may look like for each of us. Ultimately, we trust in the Father to guide us in living out that unique identity He has given each of us in Christ. He has blessed us with the presence of the Holy Spirit, our guide to navigate this. This is our confidence.
              </p>
              
              <p>
                I look forward to serving you through the tasks assigned to me. You&apos;re loved, cared for, and provided for. I invite you to explore the resources here and join our community as we learn and grow together in His grace.&rdquo;
              </p>
            </div>
            
            {/* Signature */}
            <div className="pt-6">
              <div className="text-sm">Signed</div>
              <div className="text-xl" style={{ fontFamily: 'Amita, serif' }}>Lesley.</div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="mt-16 pt-8 border-t border-white border-opacity-30">
            <div className="text-center text-white text-sm">
              letstalk@thecoordinatedliving.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
