# Email Setup Guide

## To enable real email sending, follow these steps:

### 1. Sign up for Resend
- Go to [https://resend.com](https://resend.com)
- Create a free account
- Get your API key from the dashboard

### 2. Create Environment File
Create a `.env.local` file in the root directory with:

```
RESEND_API_KEY=your_actual_resend_api_key_here
```

### 3. Verify Domain (Optional but Recommended)
- In Resend dashboard, add your domain
- This allows you to send from custom email addresses
- For now, emails will be sent from Resend's default domain

### 4. Test the Email Functionality
- Start your development server: `npm run dev`
- Navigate to the "Ask A Question" window
- Fill out the form and click "Send"
- Check your email at `ohenegyan159@gmail.com`

## Features
- ✅ Real email sending (no more mailto links)
- ✅ Beautiful HTML email templates
- ✅ Success modal confirmation
- ✅ Form validation and error handling
- ✅ Loading states during sending

## Troubleshooting
- If emails don't send, check the browser console for errors
- Verify your Resend API key is correct
- Check your Resend dashboard for sending limits
- Free tier allows 100 emails/day 