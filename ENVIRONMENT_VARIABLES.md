# Environment Variables Configuration

This file contains the environment variables needed for the Coordinated Living application.

## Required Environment Variables

All of these variables are already configured in the **Vercel project → Settings → Environment Variables** for production.  
For **local development**, create a `.env.local` file in your project root with the same variables:

```env
# Paystack Configuration (Live Keys)
PAYSTACK_SECRET_KEY=sk_live_your_live_secret_key_here
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_live_public_key_here

# Base URL for the application
NEXT_PUBLIC_BASE_URL=https://www.thecoordinatedliving.com

# WhatsApp Channel Link
NEXT_PUBLIC_WHATSAPP_CHANNEL_LINK=https://chat.whatsapp.com/YOUR_CHANNEL_LINK

# Email Configuration (Resend)
RESEND_API_KEY=re_your_resend_api_key_here

# Airtable Configuration (REQUIRED for subscriber sync)
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here


## Important Notes

- **Never commit your `.env.local` file to version control**
- The `.env.local` file should be added to your `.gitignore`
- Treat Vercel’s Environment Variables UI as the **source of truth** for live keys – keep your local `.env.local` in sync with what’s set in Vercel
- **Replace the placeholder keys with your actual live Paystack keys from your Paystack dashboard**
- Update the WhatsApp channel link with your actual channel URL
- Add any additional environment variables as needed for your specific setup

## Paystack URLs

- **Callback URL**: `https://www.thecoordinatedliving.com/payment-success`
- **Webhook URL**: `https://www.thecoordinatedliving.com/api/paystack/webhook`
