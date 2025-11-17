"use client";

import { useState } from 'react';

interface DonationSyncResult {
  status: boolean;
  message: string;
  summary?: {
    total: number;
    successful: number;
    failed: number;
  };
  results?: Array<{
    scenario: string;
    success: boolean;
    donationData: Record<string, unknown>;
    donationRecord?: { id: string; fields: Record<string, unknown> };
  }>;
  errors?: Array<{
    scenario: string;
    donationData: Record<string, unknown>;
    error: string;
  }>;
}

export default function TestDonationsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DonationSyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testDonation = async (scenario: 'with_email' | 'with_phone' | 'with_both' | 'minimal', count: number = 1, testEmail?: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/paystack/test-donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario,
          count,
          ...(testEmail && { testEmail }), // Include testEmail if provided
        }),
      });

      const data = await response.json();
      
      // Debug logging
      console.log('Test donation sync response:', data);
      console.log('Results:', data.results);
      console.log('Errors:', data.errors);

      if (!response.ok) {
        setError(data.message || 'Failed to sync donations');
        return;
      }

      setResult(data);
    } catch (err) {
      console.error('Test donation sync error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Test Donation Sync
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Simulate Donation Payments
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-gray-700">With Email Only</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Simulates a donation with email but no phone number
                </p>
                <button
                  onClick={() => testDonation('with_email', 1, 'ohenegyan159@gmail.com')}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Syncing...' : 'Test Email Donation'}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Will send to: ohenegyan159@gmail.com
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-gray-700">With Phone Only</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Simulates a donation with phone number but no email
                </p>
                <button
                  onClick={() => testDonation('with_phone', 1)}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Syncing...' : 'Test Phone Donation'}
                </button>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-gray-700">With Both</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Simulates a donation with both email and phone number
                </p>
                <button
                  onClick={() => testDonation('with_both', 1)}
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Syncing...' : 'Test Both Donation'}
                </button>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-gray-700">Minimal (No Contact)</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Simulates a donation with only amount and payment reference
                </p>
                <button
                  onClick={() => testDonation('minimal', 1)}
                  disabled={loading}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Syncing...' : 'Test Minimal Donation'}
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-yellow-50">
              <h3 className="font-semibold mb-2 text-gray-700">Batch Test</h3>
              <p className="text-sm text-gray-600 mb-4">
                Test multiple donations at once
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  onClick={() => testDonation('with_email', 5)}
                  disabled={loading}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Syncing...' : '5 Email'}
                </button>
                <button
                  onClick={() => testDonation('with_phone', 5)}
                  disabled={loading}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Syncing...' : '5 Phone'}
                </button>
                <button
                  onClick={() => testDonation('with_both', 5)}
                  disabled={loading}
                  className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Syncing...' : '5 Both'}
                </button>
                <button
                  onClick={() => testDonation('minimal', 5)}
                  disabled={loading}
                  className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Syncing...' : '5 Minimal'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-semibold mb-2">Error</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Sync Result
            </h2>

            <div className="mb-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  result.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {result.status ? 'Success' : 'Failed'}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{result.message}</p>

              {result.summary && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="text-2xl font-bold text-blue-600">
                      {result.summary.total}
                    </div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="text-2xl font-bold text-green-600">
                      {result.summary.successful}
                    </div>
                    <div className="text-sm text-gray-600">Successful</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <div className="text-2xl font-bold text-red-600">
                      {result.summary.failed}
                    </div>
                    <div className="text-sm text-gray-600">Failed</div>
                  </div>
                </div>
              )}
            </div>

            {result.results && result.results.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-gray-700">Synced Donations:</h3>
                <div className="space-y-2">
                  {result.results.map((r, idx: number) => {
                    const email = String(
                      r.donationData?.Email 
                      || r.donationRecord?.fields?.Email 
                      || 'No email'
                    );
                    
                    const phone = String(
                      r.donationData?.['Phone Number'] 
                      || r.donationData?.['Phone number']
                      || r.donationRecord?.fields?.['Phone number']
                      || r.donationRecord?.fields?.['Phone Number'] 
                      || 'No phone'
                    );
                    
                    const payment = String(
                      r.donationData?.payment 
                      || r.donationData?.['payment'] 
                      || r.donationData?.['Payment Date']
                      || r.donationRecord?.fields?.['Payment Date']
                      || r.donationRecord?.fields?.payment 
                      || 'N/A'
                    );
                    
                    const amount = String(
                      r.donationData?.Amount 
                      || r.donationRecord?.fields?.Amount 
                      || 'N/A'
                    );
                    
                    return (
                      <div key={idx} className="bg-gray-50 p-3 rounded text-sm border border-gray-200">
                        <div className="font-medium text-gray-700 mb-2">
                          Donation #{idx + 1}
                        </div>
                        <div className="space-y-1 mt-2">
                          <div className="text-gray-600 flex items-start">
                            <strong className="text-gray-700 mr-2 min-w-[100px]">Email:</strong> 
                            <span className={email === 'No email' ? 'text-gray-400 italic' : 'text-gray-800 font-mono'}>
                              {email}
                            </span>
                          </div>
                          <div className="text-gray-600 flex items-start">
                            <strong className="text-gray-700 mr-2 min-w-[100px]">Phone:</strong> 
                            <span className={phone === 'No phone' ? 'text-gray-400 italic' : 'text-gray-800'}>
                              {phone}
                            </span>
                          </div>
                          <div className="text-gray-600 flex items-start">
                            <strong className="text-gray-700 mr-2 min-w-[100px]">Payment Ref:</strong> 
                            <span className="font-mono text-xs">{payment}</span>
                          </div>
                          <div className="text-gray-600 flex items-start">
                            <strong className="text-gray-700 mr-2 min-w-[100px]">Amount:</strong> 
                            <span className="font-semibold">GHS {amount}</span>
                          </div>
                        </div>
                        {r.donationRecord?.id && (
                          <div className="text-green-600 text-xs mt-1">
                            ✓ Donation ID: {r.donationRecord.id}
                          </div>
                        )}
                        {/* Debug: Show raw data */}
                        <details className="mt-2 text-xs">
                          <summary className="cursor-pointer text-gray-500">Debug: View Raw Data</summary>
                          <pre className="mt-1 p-2 bg-gray-100 rounded overflow-auto text-xs">
                            {JSON.stringify(r, null, 2)}
                          </pre>
                        </details>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {result.results && result.results.length === 0 && result.summary?.successful === 0 && (
              <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  No successful syncs. Check the errors section below or check the browser console for details.
                </p>
              </div>
            )}

            {result.errors && result.errors.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-red-700">Errors:</h3>
                <div className="space-y-2">
                  {result.errors.map((e, idx: number) => (
                    <div key={idx} className="bg-red-50 p-3 rounded text-sm">
                      <div className="text-red-800 font-medium mb-1">{e.scenario}</div>
                      <div className="text-red-600">{e.error}</div>
                      <details className="mt-2 text-xs">
                        <summary className="cursor-pointer text-red-500">View Donation Data</summary>
                        <pre className="mt-1 p-2 bg-red-100 rounded overflow-auto text-xs">
                          {JSON.stringify(e.donationData, null, 2)}
                        </pre>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                View Full Response
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">How to Use:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
            <li>Click a button above to simulate a donation payment</li>
            <li>The data will be synced to your Airtable &quot;Donations&quot; table</li>
            <li>Check your Airtable dashboard to see the new donation records</li>
            <li>Test different scenarios: email only, phone only, both, or minimal (no contact info)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

