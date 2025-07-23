# Email Setup for Ask Me A Question Feature

## ✅ What's Already Done

1. **Nodemailer is installed** - Already in your `package.json`
2. **API Route created** - `src/app/api/send-email/route.ts` is ready
3. **Frontend integration** - Your `AskAQuestion.tsx` component is already configured to call the API

## 🔧 Setup Steps

### Step 1: Create Environment Variables

Create a `.env.local` file in your project root with these credentials:

```env
EMAIL_USER=ohenegyan159@gmail.com
EMAIL_PASS=gwev nzah mjec ofym
```

### Step 2: Gmail App Password Setup

The `EMAIL_PASS` should be an **App Password**, not your regular Gmail password:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Use that 16-character password as your `EMAIL_PASS`

### Step 3: Test the Email Functionality

1. Start your development server: `npm run dev`
2. Navigate to the "Ask Me A Question" window
3. Fill in the form and click "Send"
4. Check your email at `ohenegyan159@gmail.com`

## 📧 How It Works

- **From**: Users fill out the form in the Gmail interface
- **To**: All emails are sent to `ohenegyan159@gmail.com`
- **Subject**: Uses the subject line from the form
- **Message**: Includes the user's email and message content
- **Format**: Sends both plain text and HTML versions

## 🔒 Security Notes

- The `.env.local` file is already in your `.gitignore`
- App passwords are more secure than regular passwords
- The API validates all required fields before sending

## 🐛 Troubleshooting

If emails aren't sending:

1. Check that `.env.local` exists and has correct credentials
2. Verify the app password is correct
3. Check the browser console for any errors
4. Check the terminal/server logs for API errors

## 📱 Email Preview

The emails you'll receive will look like this:

```
Subject: [User's Subject]

New message from Ask Me A Question:

From: user@example.com
Subject: [User's Subject]
Message:
[User's message content]

---
This message was sent from the Coordinated Living website.
``` 