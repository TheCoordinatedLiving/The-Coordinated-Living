# Paystack Payment Integration Setup

This document outlines the setup required for the Paystack payment integration.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_test_e85988fa08e6452ebc108c7cf0f8aef6f206ca51
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_202dc7ba07bdd0aed2c7fe9efe6f96c6a3b4ffa5
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_CHANNEL_LINK=https://chat.whatsapp.com/YOUR_CHANNEL_LINK
```

## Paystack Dashboard Configuration

### 1. Webhook Setup

1. Log in to your Paystack dashboard
2. Go to Settings > Webhooks
3. Add a new webhook with the following URL:
   ```
   https://www.thecoordinatedliving.com/api/paystack/webhook
   ```
4. Select the following events:
   - `charge.success`
   - `charge.failed` (optional)
   - `subscription.create` (for subscription creation)
   - `subscription.disable` (for subscription cancellation)

### 2. Test Mode vs Live Mode

- **Test Mode**: 
  - Secret Key: `sk_test_e85988fa08e6452ebc108c7cf0f8aef6f206ca51`
  - Public Key: `pk_test_202dc7ba07bdd0aed2c7fe9efe6f96c6a3b4ffa5`
- **Live Mode**: Use live keys (sk_live_... and pk_live_...)

## API Endpoints

### 1. Initialize Payment
- **Endpoint**: `/api/paystack/initialize`
- **Method**: POST
- **Body**: 
  ```json
  {
    "email": "customer@email.com",
    "amount": "20000"
  }
  ```

### 2. Verify Payment
- **Endpoint**: `/api/paystack/verify`
- **Method**: POST
- **Body**:
  ```json
  {
    "reference": "transaction_reference"
  }
  ```

### 3. Webhook Handler
- **Endpoint**: `/api/paystack/webhook`
- **Method**: POST
- **Headers**: `x-paystack-signature` (automatically handled)

## Subscription Setup

### 1. Create Subscription Plan

You can create a subscription plan using the provided script:

```bash
node scripts/create-subscription-plan.js
```

Or manually create it in your Paystack dashboard:
1. Go to Plans in your Paystack dashboard
2. Create a new plan with:
   - Name: "Coordinated Living Monthly"
   - Amount: 10000 (100 GHS in kobo)
   - Interval: Monthly
   - Currency: GHS

### 2. Update Plan Code

After creating the plan, update the `planCode` in `/src/app/join-channel/page.tsx` to match your actual plan code from Paystack.

## API Endpoints

### 1. Initialize Subscription
- **Endpoint**: `/api/paystack/subscription/initialize`
- **Method**: POST
- **Body**: 
  ```json
  {
    "email": "customer@email.com",
    "phoneNumber": "0548838479",
    "planCode": "PLN_your_plan_code"
  }
  ```

### 2. Create Subscription
- **Endpoint**: `/api/paystack/subscription/create`
- **Method**: POST
- **Body**: 
  ```json
  {
    "email": "customer@email.com",
    "phoneNumber": "0548838479",
    "planCode": "PLN_your_plan_code"
  }
  ```

### 3. Create Plan
- **Endpoint**: `/api/paystack/plan/create`
- **Method**: POST
- **Body**: 
  ```json
  {
    "name": "Coordinated Living Monthly",
    "amount": "10000",
    "interval": "monthly"
  }
  ```

## Payment Flow

### Subscription Flow
1. User clicks "Join Channel" button
2. Email input modal appears
3. User enters email and phone number
4. System calls `/api/paystack/subscription/initialize` with email, phone, and plan code
5. User is redirected to Paystack checkout page
6. After payment, user is redirected to `/payment-success?type=subscription`
7. Payment success page verifies the transaction
8. Webhook handles subscription creation

### One-time Payment Flow (Donations)
1. User clicks "Pour Into My Cup" button
2. Donation modal appears
3. User enters email, phone, and amount
4. System calls `/api/paystack/initialize` with email, amount, and type='donation'
5. User is redirected to Paystack checkout page
6. After payment, user is redirected to `/donation-success?reference=xxx`
7. Payment success page verifies the transaction
8. Webhook is called by Paystack to confirm payment

## Testing

### Test Cards (Test Mode Only)

- **Successful Payment**: 4084084084084085
- **Failed Payment**: 4084084084084081
- **Insufficient Funds**: 4084084084084082
- **Expired Card**: 4084084084084083

### Test Amounts

- Use amounts in kobo (e.g., 20000 = GHS 200.00)
- Minimum amount is 100 kobo (GHS 1.00)

## Security Notes

1. **Never expose your secret key** in client-side code
2. **Always verify webhook signatures** (implemented in webhook handler)
3. **Use HTTPS** in production
4. **Validate all inputs** before processing

## Troubleshooting

### Common Issues

1. **"Invalid signature" error**: Check that your webhook URL is correct and accessible
2. **"Amount must be at least 100 kobo"**: Ensure amount is in kobo, not the main currency
3. **"Invalid email"**: Validate email format before sending to Paystack
4. **Webhook not receiving events**: Check Paystack dashboard webhook logs

### Debug Mode

Enable debug logging by adding console.log statements in the API routes for development.

## Production Checklist

- [ ] Replace test keys with live keys
- [ ] Update webhook URL to production domain
- [ ] Test webhook with actual payments
- [ ] Set up proper error monitoring
- [ ] Configure SSL certificate
- [ ] Test payment flow end-to-end