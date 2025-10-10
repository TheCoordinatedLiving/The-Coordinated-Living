// Test script for the notification modal
// Run this with: node test-notification-modal.js

const BASE_URL = 'http://localhost:3000';

async function testNotificationModal() {
  console.log('🧪 Testing Notification Modal System\n');

  try {
    // Test 1: Check subscription status
    console.log('1. Checking subscription status...');
    const statusResponse = await fetch(`${BASE_URL}/api/notifications/subscribe`);
    const statusData = await statusResponse.json();
    console.log('   ✅ Subscription status:', statusData);
    console.log('   📊 Current subscribers:', statusData.subscriptionCount);
    console.log('');

    // Test 2: Send test notification
    console.log('2. Sending test notification...');
    const testResponse = await fetch(`${BASE_URL}/api/notifications/test`);
    const testData = await testResponse.json();
    console.log('   ✅ Test notification result:', testData);
    console.log('');

    console.log('🎉 Tests completed!');
    console.log('');
    console.log('📋 How to test the modal:');
    console.log('   1. Open http://localhost:3000 in your browser');
    console.log('   2. Wait 3 seconds - the notification modal should appear');
    console.log('   3. Click "Enable Notifications" and allow browser permission');
    console.log('   4. The modal will show success and then disappear');
    console.log('   5. Refresh the page - modal should NOT appear again');
    console.log('   6. Run this script again to send test notifications');
    console.log('');
    console.log('🔧 To reset the modal (for testing):');
    console.log('   - Open browser console (F12)');
    console.log('   - Run: localStorage.removeItem("notification-modal-seen")');
    console.log('   - Refresh the page');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Make sure your dev server is running (npm run dev)');
    console.log('   2. Check that the VAPID keys are set in .env.local');
    console.log('   3. Verify the server is accessible at http://localhost:3000');
  }
}

// Run the test
testNotificationModal();
