'use client';

import { OneSignalNotification } from '@/components/OneSignalNotification';

export default function OneSignalTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            OneSignal Integration Test
          </h1>
          <p className="text-gray-600">
            Test the OneSignal push notification system for Coordinated Living.
          </p>
        </div>

        <div className="space-y-6">
          <OneSignalNotification />
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🧪 Test Endpoints
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-700">Test Notification</p>
                  <p className="text-sm text-gray-500">Send a test notification via OneSignal</p>
                </div>
                <a
                  href="/api/notifications/onesignal-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Test API
                </a>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-700">Content Notification</p>
                  <p className="text-sm text-gray-500">Send a content notification via OneSignal</p>
                </div>
                <a
                  href="/api/notifications/onesignal-send"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Test API
                </a>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              📋 Next Steps
            </h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                <span>Add your OneSignal REST API key to your environment variables</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                <span>Replace existing notification components with OneSignalNotification</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                <span>Update your content notification endpoints to use OneSignal</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">4.</span>
                <span>Test notifications on different devices and browsers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
