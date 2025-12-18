# Email Setup (Resend)

This project now uses **Resend** for all emails (Ask Me A Question + donation confirmations).

## ✅ What's Already Done

1. **Resend is installed** – already in `package.json`
2. **Ask Me A Question API** – `src/app/api/send-email/route.ts` sends messages via Resend
3. **Donation confirmation email** – `src/lib/email.ts` (`sendDonationConfirmationEmail`) sends thank‑you emails via Resend
4. **Frontend wiring** – the Ask A Question window already calls the `/api/send-email` route

## 🔧 Setup Steps

### Step 1: Environment Variables

Create (or update) `.env.local` in the project root:

```env
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_SITE_URL=https://www.thecoordinatedliving.com
```

- **RESEND_API_KEY**: from your Resend project (Dashboard → API keys)
- **NEXT_PUBLIC_SITE_URL**: used to build the logo URL in the donation email (`/email-temp-logo.png`)

### Step 2: Configure Resend Sender

In the Resend dashboard:

1. Add and verify the domain you want to send from (e.g. `thecoordinatedliving.com`)
2. Add/verify the sender address `letstalk@thecoordinatedliving.com`
3. Make sure this address is allowed to send in your Resend project

The code sends from:

- Ask Me A Question: `from: 'letstalk@thecoordinatedliving.com'`
- Donation confirmation: `from: 'The Coordinated Living <letstalk@thecoordinatedliving.com>'`

### Step 3: Test “Ask Me A Question”

1. Run the dev server: `npm run dev`
2. Open the **Ask Me A Question** window
3. Fill in your email, subject, and message
4. Submit the form
5. Check `letstalk@thecoordinatedliving.com` – you should see the forwarded message (reply‑to set to the user’s email)

### Step 4: Test Donation Confirmation Email

1. With `RESEND_API_KEY` configured, make a **test donation** through the site
2. After a successful transaction, `sendDonationConfirmationEmail` will:
   - Send a thank‑you email to the donor’s email address
   - Include a warm message from Lesley
   - Optionally include the **transaction reference** when available

## 📧 What Gets Sent

- **Ask Me A Question**
  - **To**: `letstalk@thecoordinatedliving.com`
  - **Reply‑To**: user’s email
  - **Subject**: user’s subject (or `"New Message from Ask Me A Question"`)
  - **Body**: includes user email, subject, and formatted message

- **Donation Confirmation**
  - **To**: donor’s email
  - **Subject**: “Thank You for Pouring Into My Cup - The Coordinated Living”
  - **HTML**: branded purple template with logo and message from Lesley
  - **Text**: plain‑text fallback with the same message

## 🔒 Security & Troubleshooting

- **Never commit** `.env.local` to Git
- If emails fail:
  - Confirm `RESEND_API_KEY` is set and valid
  - Check that `letstalk@thecoordinatedliving.com` is a verified sender in Resend
  - Look at the browser console and server logs for the `/api/send-email` and donation flows
