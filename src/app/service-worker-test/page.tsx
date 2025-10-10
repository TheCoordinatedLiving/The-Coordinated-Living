"use client";
import { useState, useEffect } from 'react';

export default function ServiceWorkerTestPage() {
  const [swStatus, setSwStatus] = useState<string>('Checking...');
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    const checkServiceWorker = async () => {
      try {
        if (!('serviceWorker' in navigator)) {
          setSwStatus('❌ Service Worker not supported');
          return;
        }

        console.log('Checking service worker...');
        
        // Check if service worker is already registered
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          console.log('Service worker already registered:', registration);
          setSwRegistration(registration);
          setSwStatus('✅ Service Worker already registered');
        } else {
          console.log('No service worker registered, registering...');
          const newRegistration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
          console.log('Service worker registered:', newRegistration);
          setSwRegistration(newRegistration);
          setSwStatus('✅ Service Worker registered successfully');
        }

        // Wait for service worker to be ready
        const readyRegistration = await navigator.serviceWorker.ready;
        console.log('Service worker ready:', readyRegistration);
        
        if (readyRegistration.active) {
          setSwStatus('✅ Service Worker is active and ready');
        } else {
          setSwStatus('⚠️ Service Worker registered but not active');
        }

      } catch (error) {
        console.error('Service worker error:', error);
        setSwStatus(`❌ Error: ${error.message}`);
      }
    };

    checkServiceWorker();
  }, []);

  // Helper function to convert VAPID key
  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const testPushSubscription = async () => {
    if (!swRegistration) {
      alert('No service worker registration found');
      return;
    }

    try {
      console.log('Testing push subscription...');
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        throw new Error('VAPID public key not configured');
      }
      
      const applicationServerKey = urlBase64ToUint8Array(vapidKey);
      console.log('Using VAPID key:', applicationServerKey);
      
      const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });
      console.log('Push subscription successful:', subscription);
      alert('✅ Push subscription successful!');
    } catch (error) {
      console.error('Push subscription error:', error);
      alert(`❌ Push subscription failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Service Worker Test Page
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Service Worker Status</h2>
          <p className="text-lg">{swStatus}</p>
          
          {swRegistration && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Registration Details:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Scope: {swRegistration.scope}</li>
                <li>Active: {swRegistration.active ? 'Yes' : 'No'}</li>
                <li>Installing: {swRegistration.installing ? 'Yes' : 'No'}</li>
                <li>Waiting: {swRegistration.waiting ? 'Yes' : 'No'}</li>
              </ul>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Push Subscription Test</h2>
          <button
            onClick={testPushSubscription}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Test Push Subscription
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <p className="text-sm text-gray-600">
            VAPID Public Key: {process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ? '✅ Set' : '❌ Not set'}
          </p>
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
