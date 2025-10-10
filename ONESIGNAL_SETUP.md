# OneSignal Integration Setup Guide

## ✅ **What's Been Implemented**

Your OneSignal integration is now ready! Here's what has been set up:

### **1. OneSignal SDK Integration**
- ✅ OneSignal SDK loaded in layout.tsx
- ✅ OneSignal service configuration (`src/lib/onesignal.ts`)
- ✅ React hook for OneSignal (`src/hooks/useOneSignal.ts`)
- ✅ OneSignal notification component (`src/components/OneSignalNotification.tsx`)
- ✅ API endpoints for OneSignal notifications

### **2. Features**
- ✅ Browser push notifications via OneSignal
- ✅ Subscription management
- ✅ Test notification functionality
- ✅ Content notification system
- ✅ Cross-platform support (web, mobile)

## 🔧 **Setup Steps**

### **Step 1: Get Your OneSignal REST API Key**

1. Go to your [OneSignal Dashboard](https://dashboard.onesignal.com/apps/9e0ff598-168f-4e83-979f-c6e19991d297/settings/keys_and_ids)
2. Copy your **REST API Key** (not the App ID)
3. Add it to your `.env.local` file:

```env
# OneSignal Configuration
ONESIGNAL_REST_API_KEY=your_rest_api_key_here
ONESIGNAL_APP_ID=9e0ff598-168f-4e83-979f-c6e19991d297
```

### **Step 2: Test the Integration**

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Visit the test page:**
   ```
   http://localhost:3000/onesignal-test
   ```

3. **Test notifications:**
   - Click "Enable Notifications" to subscribe
   - Click "Test Notification" to send a test
   - Visit the API endpoints to test server-side notifications

## 🚀 **How It Works**

### **For Users:**
1. User visits your site
2. Sees OneSignal notification widget
3. Clicks "Enable Notifications"
4. Browser asks for permission
5. User clicks "Allow"
6. They're now subscribed to OneSignal!

### **For You (Content Publisher):**
1. You publish new content
2. Your system calls the OneSignal API
3. Notifications are sent to all subscribers
4. Users get instant notifications on their devices

## 📱 **OneSignal vs Web-Push Benefits**

### **OneSignal Advantages:**
- **Better Delivery Rates** - Optimized infrastructure
- **Rich Analytics** - Open rates, click rates, delivery stats
- **Cross-Platform** - Works on web, iOS, Android
- **Segmentation** - Target specific user groups
- **A/B Testing** - Test different notification content
- **No VAPID Management** - OneSignal handles complexity
- **Better Browser Support** - Works across more browsers

### **Migration Benefits:**
- ✅ Removed web-push dependency
- ✅ No more VAPID key management
- ✅ Better notification delivery
- ✅ Rich analytics dashboard
- ✅ Easier maintenance

## 🔄 **Migration from Web-Push**

### **What Was Replaced:**
- ❌ `web-push` package → ✅ OneSignal SDK
- ❌ VAPID keys → ✅ OneSignal App ID + API Key
- ❌ Custom service worker → ✅ OneSignal service worker
- ❌ Manual subscription management → ✅ OneSignal handles everything

### **Files Updated:**
- ✅ `src/lib/onesignal.ts` - New OneSignal service
- ✅ `src/hooks/useOneSignal.ts` - New OneSignal hook
- ✅ `src/components/OneSignalNotification.tsx` - New notification component
- ✅ `src/app/api/notifications/onesignal-*` - New API endpoints
- ✅ `src/app/layout.tsx` - Added OneSignal SDK

## 🧪 **Testing**

### **Test Endpoints:**
- **Test Notification:** `/api/notifications/onesignal-test`
- **Content Notification:** `/api/notifications/onesignal-send`
- **Test Page:** `/onesignal-test`

### **Test Checklist:**
- [ ] Subscribe to notifications
- [ ] Send test notification
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Verify notification delivery
- [ ] Check OneSignal dashboard for analytics

## 📊 **OneSignal Dashboard**

Visit your [OneSignal Dashboard](https://dashboard.onesignal.com/apps/9e0ff598-168f-4e83-979f-c6e19991d297) to:
- View subscriber count
- See delivery statistics
- Create notification campaigns
- Set up user segmentation
- Configure notification settings

## 🔧 **Advanced Configuration**

### **Custom Notification Content:**
```typescript
import { sendNotification } from '@/lib/onesignal';

await sendNotification(
  'New Post Available!',
  'Check out our latest content on spiritual growth.',
  'https://www.thecoordinatedliving.com/post/new-post',
  ['user-id-1', 'user-id-2'] // Optional: specific users
);
```

### **Segmentation:**
You can target specific user groups by modifying the notification payload in `src/lib/onesignal.ts`.

## 🆘 **Troubleshooting**

### **Common Issues:**

1. **"OneSignal is not supported"**
   - Ensure you're using HTTPS or localhost
   - Check browser compatibility

2. **"Failed to initialize OneSignal"**
   - Verify your App ID is correct
   - Check browser console for errors

3. **"Failed to send notification"**
   - Verify your REST API key is correct
   - Check OneSignal dashboard for API limits

4. **Notifications not appearing**
   - Check browser notification permissions
   - Verify OneSignal subscription status

### **Debug Mode:**
Enable OneSignal debug mode by adding this to your browser console:
```javascript
localStorage.setItem('onesignal-debug', 'true');
```

## 📚 **Resources**

- [OneSignal Documentation](https://documentation.onesignal.com/)
- [OneSignal Web SDK](https://documentation.onesignal.com/docs/web-push-sdk)
- [OneSignal REST API](https://documentation.onesignal.com/reference)
- [OneSignal Dashboard](https://dashboard.onesignal.com/apps/9e0ff598-168f-4e83-979f-c6e19991d297)

---

**🎉 Congratulations!** Your OneSignal integration is complete and ready to use!
