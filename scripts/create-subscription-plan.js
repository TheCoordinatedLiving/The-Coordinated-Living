// Script to create a subscription plan in Paystack
// Run this script to set up your subscription plan

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_e85988fa08e6452ebc108c7cf0f8aef6f206ca51';

async function createSubscriptionPlan() {
  try {
    const planData = {
      name: 'Coordinated Living Monthly',
      amount: 10000, // 100 GHS in kobo
      interval: 'monthly',
      currency: 'GHS',
      description: 'Monthly subscription for Coordinated Living channel access',
      send_invoices: true,
      send_sms: true,
      hosted_page: false,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://coordinated-living.vercel.app'}/payment-success?type=subscription`
    };

    console.log('Creating subscription plan with data:', planData);

    const response = await fetch('https://api.paystack.co/plan', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Subscription plan created successfully!');
      console.log('Plan Code:', data.data.plan_code);
      console.log('Plan ID:', data.data.id);
      console.log('Plan Name:', data.data.name);
      console.log('Amount:', data.data.amount);
      console.log('Interval:', data.data.interval);
      
      console.log('\n📝 Next steps:');
      console.log('1. Update the planCode in your join-channel page to:', data.data.plan_code);
      console.log('2. Make sure your webhook is configured to handle subscription events');
      console.log('3. Test the subscription flow');
    } else {
      console.error('❌ Failed to create subscription plan:', data.message);
    }
  } catch (error) {
    console.error('❌ Error creating subscription plan:', error);
  }
}

// Run the script
createSubscriptionPlan();
