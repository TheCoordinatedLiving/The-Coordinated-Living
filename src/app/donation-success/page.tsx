// TEMPORARY DONATION SUCCESS PAGE
// TODO: Fix the original donation-success page with proper Suspense boundary

export default function DonationSuccessPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#2F4C6C' }}>
      <div className="text-center text-white px-6">
        <div className="w-20 h-20 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Amita, cursive' }}>
          Thank You For Your Donation!
        </h1>
        
        <p className="text-lg mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Your generous support helps keep this platform running and my cup full. 
          Every donation makes a real difference in maintaining this space for our community.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => window.location.href = '/donation-mobile'}
            className="w-full py-4 px-8 rounded-full font-medium text-base transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: 'white',
              color: '#2F4C6C',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            Make Another Donation
          </button>
          
          <button
            onClick={() => window.location.href = '/?skipLoader=true'}
            className="w-full py-3 px-6 rounded-full font-medium text-base transition-all duration-200 hover:opacity-80 border-2 border-white text-white"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Back To Website
          </button>
        </div>
        
        <p className="text-sm mt-6 opacity-60" style={{ fontFamily: 'Roboto, sans-serif' }}>
          This is a temporary page. The full donation success experience will be restored soon.
        </p>
      </div>
    </div>
  );
}

/*
ORIGINAL DONATION SUCCESS PAGE - TO BE RESTORED LATER
This page had the full functionality with:
- Payment verification
- Beautiful animations with GSAP
- Donation modal integration
- Proper error handling
- Full styling and user experience

The issue was useSearchParams() not being wrapped in Suspense boundary.
Need to fix that and restore the full functionality.
*/