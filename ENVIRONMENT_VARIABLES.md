# Environment Variables Configuration

This file contains the environment variables needed for the Coordinated Living application.

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Paystack Configuration (Live Keys)
PAYSTACK_SECRET_KEY=sk_live_your_live_secret_key_here
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_live_public_key_here

# Base URL for the application
NEXT_PUBLIC_BASE_URL=https://www.thecoordinatedliving.com

# WhatsApp Channel Link
NEXT_PUBLIC_WHATSAPP_CHANNEL_LINK=https://chat.whatsapp.com/YOUR_CHANNEL_LINK

# Email Configuration (if using email features)
# Add your email service configuration here

# Airtable Configuration (if using Airtable)
# Add your Airtable API key and base ID here
```

## Important Notes

- **Never commit your `.env.local` file to version control**
- The `.env.local` file should be added to your `.gitignore`
- **Replace the placeholder keys with your actual live Paystack keys from your Paystack dashboard**
- Update the WhatsApp channel link with your actual channel URL
- Add any additional environment variables as needed for your specific setup

## Paystack URLs

- **Callback URL**: `https://www.thecoordinatedliving.com/payment-success`
- **Webhook URL**: `https://www.thecoordinatedliving.com/api/paystack/webhook`
