// TEMPORARILY DISABLED TO FIX BUILD ISSUE
// TODO: Fix useSearchParams Suspense boundary issue and re-enable

export default function DonationSuccessPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#2F4C6C' }}>
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Donation Success</h1>
        <p className="text-lg">Thank you for your donation!</p>
        <p className="text-sm mt-4 opacity-80">This page is temporarily disabled.</p>
      </div>
    </div>
  );
}