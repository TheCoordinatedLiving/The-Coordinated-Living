"use client";

import { useState } from 'react';

interface SyncResult {
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
    subscriberData: Record<string, unknown>;
    subscriberRecord?: { id: string; fields: Record<string, unknown> };
    subscriptionRecord?: { id: string; fields: Record<string, unknown> };
  }>;
  errors?: Array<{
    scenario: string;
    subscriberData: Record<string, unknown>;
    error: string;
  }>;
}

export default function TestSyncPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testSync = async (scenario: 'new_subscription' | 'renewal', count: number = 1) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/paystack/test-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario,
          count,
        }),
      });

      const data = await response.json();
      
      // Debug logging
      console.log('Test sync response:', data);
      console.log('Results:', data.results);
      console.log('Errors:', data.errors);

      if (!response.ok) {
        setError(data.message || 'Failed to sync');
        return;
      }

      setResult(data);
    } catch (err) {
      console.error('Test sync error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Test Airtable Sync
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Simulate Subscription Payments
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-gray-700">New Subscription</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Simulates a new user subscribing for the first time
                </p>
                <button
                  onClick={() => testSync('new_subscription', 1)}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Syncing...' : 'Test New Subscription'}
                </button>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-gray-700">Subscription Renewal</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Simulates an existing user renewing their subscription
                </p>
                <button
                  onClick={() => testSync('renewal', 1)}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Syncing...' : 'Test Renewal'}
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-yellow-50">
              <h3 className="font-semibold mb-2 text-gray-700">Batch Test</h3>
              <p className="text-sm text-gray-600 mb-4">
                Test multiple subscriptions at once
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => testSync('new_subscription', 5)}
                  disabled={loading}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Syncing...' : 'Test 5 New Subscriptions'}
                </button>
                <button
                  onClick={() => testSync('renewal', 3)}
                  disabled={loading}
                  className="flex-1 bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Syncing...' : 'Test 3 Renewals'}
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
                <h3 className="font-semibold mb-2 text-gray-700">Synced Records:</h3>
                <div className="space-y-2">
                  {result.results.map((r, idx: number) => {
                    // Get email from subscriberData or subscriptionRecord - check both locations
                    const email = String(
                      r.subscriberData?.Email 
                      || r.subscriberData?.['Email']
                      || r.subscriptionRecord?.fields?.Email 
                      || r.subscriptionRecord?.fields?.['Email']
                      || 'No email found'
                    );
                    
                    const fullName = String(
                      r.subscriberData?.['Full Name'] 
                      || r.subscriberData?.FullName 
                      || r.subscriberRecord?.fields?.Name 
                      || 'N/A'
                    );
                    
                    const phone = String(
                      r.subscriberData?.['Phone Number'] 
                      || r.subscriberData?.PhoneNumber 
                      || r.subscriptionRecord?.fields?.['Whatsapp Number'] 
                      || 'N/A'
                    );
                    
                    const reference = String(
                      r.subscriberData?.['Transaction Reference'] 
                      || r.subscriberData?.TransactionReference 
                      || 'N/A'
                    );
                    
                    const amount = String(
                      r.subscriberData?.Amount 
                      || r.subscriptionRecord?.fields?.['Amount Paid'] 
                      || 'N/A'
                    );
                    
                    const currency = String(r.subscriberData?.Currency || 'GHS');
                    
                    const status = String(
                      r.subscriberData?.Status 
                      || r.subscriptionRecord?.fields?.Status 
                      || 'N/A'
                    );
                    
                    // Debug log
                    console.log('Rendering result:', { email, fullName, rawData: r });
                    
                    return (
                      <div key={idx} className="bg-gray-50 p-3 rounded text-sm border border-gray-200">
                        <div className="font-medium text-gray-700 mb-2">
                          {fullName}
                          {email && email !== 'No email found' && (
                            <span className="text-gray-500 ml-2">({email})</span>
                          )}
                        </div>
                        <div className="space-y-1 mt-2">
                          <div className="text-gray-600 flex items-start">
                            <strong className="text-gray-700 mr-2 min-w-[100px]">Email:</strong> 
                            <span className={email === 'No email found' ? 'text-red-500 font-mono' : 'text-gray-800 font-mono'}>
                              {email || 'EMPTY - Check console'}
                            </span>
                          </div>
                          <div className="text-gray-600 flex items-start">
                            <strong className="text-gray-700 mr-2 min-w-[100px]">Phone:</strong> 
                            <span>{phone}</span>
                          </div>
                          <div className="text-gray-600 flex items-start">
                            <strong className="text-gray-700 mr-2 min-w-[100px]">Reference:</strong> 
                            <span className="font-mono text-xs">{reference}</span>
                          </div>
                          <div className="text-gray-600 flex items-start">
                            <strong className="text-gray-700 mr-2 min-w-[100px]">Amount:</strong> 
                            <span>{currency} {amount}</span>
                          </div>
                          <div className="text-gray-600 flex items-start">
                            <strong className="text-gray-700 mr-2 min-w-[100px]">Status:</strong> 
                            <span>{status}</span>
                          </div>
                        </div>
                        {r.subscriberRecord?.id && (
                          <div className="text-green-600 text-xs mt-1">
                            ✓ Subscriber ID: {r.subscriberRecord.id}
                          </div>
                        )}
                        {r.subscriptionRecord?.id && (
                          <div className="text-blue-600 text-xs mt-1">
                            ✓ Subscription ID: {r.subscriptionRecord.id}
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
                      <div className="text-red-800">{e.error}</div>
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
            <li>Click a button above to simulate a subscription payment</li>
            <li>The data will be synced to your Airtable &quot;Subscribers&quot; table</li>
            <li>Check your Airtable dashboard to see the new records</li>
            <li>For renewals, use the same email to test update functionality</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

