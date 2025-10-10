"use client";
import NotificationSubscription from '../../components/NotificationSubscription';
import SimpleNotificationTest from '../../components/SimpleNotificationTest';

export default function NotificationTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Push Notification Test Page
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Test 1: Simple Component */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test 1: Simple Component</h2>
            <SimpleNotificationTest />
          </div>
          
          {/* Test 2: Notification Subscription - Button Variant */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test 2: Button Variant</h2>
            <NotificationSubscription variant="button" />
          </div>
          
          {/* Test 3: Notification Subscription - Card Variant */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test 3: Card Variant</h2>
            <NotificationSubscription variant="card" />
          </div>
          
          {/* Test 4: Notification Subscription - Inline Variant */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test 4: Inline Variant</h2>
            <NotificationSubscription variant="inline" />
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click "Enable Notifications" on any of the components above</li>
            <li>Allow notifications when your browser asks for permission</li>
            <li>Go back to the terminal and run: <code className="bg-gray-200 px-2 py-1 rounded">node test-notifications.js</code></li>
            <li>You should receive a notification on your device!</li>
          </ol>
        </div>
        
        <div className="mt-4">
          <a 
            href="/" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
