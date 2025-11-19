import { NextRequest, NextResponse } from 'next/server';
import { batchCreateOrUpdateSubscribers } from '@/lib/airtable';

interface PaystackSubscription {
  id: number;
  domain: string;
  status: string;
  subscription_code: string;
  email_token: string;
  amount: number;
  cron_expression: string;
  next_payment_date: string;
  open_invoice?: string;
  createdAt: string;
  plan: {
    id: number;
    name: string;
    plan_code: string;
    description?: string;
    amount: number;
    interval: string;
    send_invoices: boolean;
    send_sms: boolean;
    hosted_page: boolean;
    currency: string;
    migrate: boolean;
    is_deleted: boolean;
    is_archived: boolean;
    createdAt: string;
    updatedAt: string;
  };
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name?: string;
  };
  customer: {
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    customer_code: string;
    phone?: string;
    metadata?: Record<string, unknown>;
    risk_action: string;
    international_format_phone?: string;
  };
  created_at: string;
  updated_at?: string;
}

interface PaystackSubscriptionResponse {
  status: boolean;
  message: string;
  data: PaystackSubscription[];
  meta: {
    total: number;
    skipped: number;
    perPage: number;
    page: number;
    pageCount: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY is not set in environment variables');
      return NextResponse.json(
        { status: false, message: 'Paystack configuration error' },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { 
      page = 1, 
      perPage = 100,
      customer,
      plan,
      status
    } = body;

    // Build query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
    });

    if (customer) queryParams.append('customer', customer.toString());
    if (plan) queryParams.append('plan', plan);
    if (status) queryParams.append('status', status);

    // Fetch subscriptions from Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/subscription?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const paystackData: PaystackSubscriptionResponse = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error('Paystack API error:', paystackData);
      return NextResponse.json(
        { 
          status: false, 
          message: paystackData.message || 'Failed to fetch subscriptions' 
        },
        { status: paystackResponse.status }
      );
    }

    // Transform Paystack subscriptions to Airtable format
    const subscribersData = paystackData.data.map((subscription) => {
      return {
        'Email': subscription.customer.email || '',
        'Phone Number': subscription.customer.phone || subscription.customer.international_format_phone || '',
        'Full Name': `${subscription.customer.first_name || ''} ${subscription.customer.last_name || ''}`.trim() || '',
        'Transaction Reference': subscription.subscription_code,
        'Amount': subscription.amount / 100, // Convert from kobo to currency unit
        'Currency': subscription.plan.currency,
        'Status': subscription.status,
        'Payment Type': 'Subscription',
        'Paid At': subscription.next_payment_date || subscription.created_at,
        'Subscription Code': subscription.subscription_code,
        'Plan Code': subscription.plan.plan_code,
        'Customer Code': subscription.customer.customer_code,
        'Created At': subscription.created_at,
      };
    });

    // Sync to Airtable
    const syncResult = await batchCreateOrUpdateSubscribers(subscribersData);

    return NextResponse.json({
      status: true,
      message: 'Subscriptions synced successfully',
      data: {
        subscriptionsFetched: paystackData.data.length,
        totalSubscriptions: paystackData.meta.total,
        synced: syncResult.success,
        failed: syncResult.failed,
        errors: syncResult.errors,
        pagination: {
          page: paystackData.meta.page,
          perPage: paystackData.meta.perPage,
          pageCount: paystackData.meta.pageCount,
          total: paystackData.meta.total,
        },
      },
    });
  } catch (error) {
    console.error('Subscription sync error:', error);
    return NextResponse.json(
      { 
        status: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch subscriptions without syncing
export async function GET(request: NextRequest) {
  try {
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!paystackSecretKey) {
      return NextResponse.json(
        { status: false, message: 'Paystack configuration error' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '100';
    const customer = searchParams.get('customer');
    const plan = searchParams.get('plan');
    const status = searchParams.get('status');

    const queryParams = new URLSearchParams({
      page,
      perPage,
    });

    if (customer) queryParams.append('customer', customer);
    if (plan) queryParams.append('plan', plan);
    if (status) queryParams.append('status', status);

    const paystackResponse = await fetch(
      `https://api.paystack.co/subscription?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      return NextResponse.json(
        { 
          status: false, 
          message: paystackData.message || 'Failed to fetch subscriptions' 
        },
        { status: paystackResponse.status }
      );
    }

    return NextResponse.json(paystackData);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { status: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

