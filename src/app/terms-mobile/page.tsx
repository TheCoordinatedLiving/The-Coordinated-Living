"use client";
import { useRouter } from 'next/navigation';
import FullTermsContent from '../../components/FullTermsContent';

export default function TermsMobilePage() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div 
      className="min-h-screen w-full p-4"
      style={{ backgroundColor: '#2481C2' }}
    >
      {/* Header with Close Button */}
      <div className="flex items-start justify-start mb-8">
        <button
          onClick={handleClose}
          className="text-white hover:text-gray-200 transition-colors duration-200 p-2"
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-white text-xl font-bold text-left" style={{ fontFamily: 'Amita, serif' }}>
          Terms and Conditions
        </h1>
      </div>

      {/* Content */}
      <div className="text-white text-sm leading-relaxed space-y-4">
        <p>
          <strong>Welcome to The Coordinated Living!</strong>
        </p>
        <p>
          These terms and conditions outline the rules and regulations for the use of the Website, located at{' '}
          <a href="https://thecoordinatedliving.com/" className="underline font-bold text-white" target="_blank" rel="noopener noreferrer">
            https://thecoordinatedliving.com/
          </a>
        </p>
        <p>
          The Terms and Conditions on this webpage, as may without notice, be amended from time to time, shall apply to all our services directly or indirectly (through our authorized agents and sub-agents) made available online, any mobile device, by email or by telephone, as well as any other electronic media.
        </p>
        <p>
          By accessing, browsing and using our website or any of our platform (hereafter collectively referred to as the &quot;website&quot;) and/or by completing a booking, you recognize and agree to have read, understood and agreed to the terms and conditions, including the privacy statement as set out below. You must NOT use this website if you disagree with any of the Terms and Conditions as stated below.
        </p>
        <p>
          The pages, content and set-up of these pages, and the services provided on these pages and through the website are owned, operated and provide by THE COORDINATE LIVING (hereinafter referred to as IKOORDINATE) and are provided for your personal, non-commercial use only, subject to the terms and conditions set out below.
        </p>
        <p>
          The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this website and compliant to the Company&apos;s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client&apos;s needs in respect of provision of the Company&apos;s stated services, in accordance with and subject to, prevailing law of Ghana. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
        </p>
        <p>
          IKOORDINATE reserves the right to modify all information, including Terms and Conditions, as well as all other features at any time without giving you prior notice. Your use of this website following any modifications constitutes your agreement to follow and be bound by the Terms and Conditions as modified.
        </p>

        <FullTermsContent />
      </div>
    </div>
  );
}
