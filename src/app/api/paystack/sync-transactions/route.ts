import { NextRequest, NextResponse } from 'next/server';
import { batchCreateOrUpdateSubscribers } from '@/lib/airtable';

interface PaystackTransaction {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message?: string;
  gateway_response: string;
  paid_at?: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address?: string;
  metadata?: {
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
    [key: string]: unknown;
  };
  log?: unknown;
  fees?: number;
  fees_split?: unknown;
  authorization?: {
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
  plan?: {
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
  split?: unknown;
  order_id?: unknown;
  paidAt?: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data?: unknown;
  source?: unknown;
  fees_breakdown?: unknown;
}

interface PaystackTransactionResponse {
  status: boolean;
  message: string;
  data: PaystackTransaction[];
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
      status = 'success',
      from,
      to,
      customer 
    } = body;

    // Build query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
      status: status,
    });

    if (from) queryParams.append('from', from);
    if (to) queryParams.append('to', to);
    if (customer) queryParams.append('customer', customer.toString());

    // Fetch transactions from Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const paystackData: PaystackTransactionResponse = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error('Paystack API error:', paystackData);
      return NextResponse.json(
        { 
          status: false, 
          message: paystackData.message || 'Failed to fetch transactions' 
        },
        { status: paystackResponse.status }
      );
    }

    // Transform Paystack transactions to Airtable format
    const subscribersData = paystackData.data.map((transaction) => {
      const metadata = transaction.metadata?.custom_fields || [];
      const paymentTypeField = metadata.find((f: { variable_name: string }) => f.variable_name === 'payment_type');
      const phoneNumberField = metadata.find((f: { variable_name: string }) => f.variable_name === 'phone_number');
      const fullNameField = metadata.find((f: { variable_name: string }) => f.variable_name === 'full_name');

      return {
        'Email': transaction.customer.email || '',
        'Phone Number': phoneNumberField?.value || transaction.customer.phone || '',
        'Full Name': fullNameField?.value || 
          `${transaction.customer.first_name || ''} ${transaction.customer.last_name || ''}`.trim() || '',
        'Transaction Reference': transaction.reference,
        'Amount': transaction.amount / 100, // Convert from kobo to currency unit
        'Currency': transaction.currency,
        'Status': transaction.status,
        'Payment Type': paymentTypeField?.value || 'Unknown',
        'Paid At': transaction.paid_at || transaction.paidAt || transaction.created_at,
        'Subscription Code': transaction.plan?.plan_code || '',
        'Plan Code': transaction.plan?.plan_code || '',
        'Customer Code': transaction.customer.customer_code,
        'Created At': transaction.created_at,
      };
    });

    // Sync to Airtable
    const syncResult = await batchCreateOrUpdateSubscribers(subscribersData);

    return NextResponse.json({
      status: true,
      message: 'Transactions synced successfully',
      data: {
        transactionsFetched: paystackData.data.length,
        totalTransactions: paystackData.meta.total,
        synced: syncResult.success,
        failed: syncResult.failed,
        errors: syncResult.errors.length > 0 ? syncResult.errors : undefined,
        pagination: {
          page: paystackData.meta.page,
          perPage: paystackData.meta.perPage,
          pageCount: paystackData.meta.pageCount,
          total: paystackData.meta.total,
        },
      },
    });
  } catch (error) {
    console.error('Transaction sync error:', error);
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

// GET endpoint to fetch transactions without syncing
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
    const status = searchParams.get('status') || 'success';
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const customer = searchParams.get('customer');

    const queryParams = new URLSearchParams({
      page,
      perPage,
      status,
    });

    if (from) queryParams.append('from', from);
    if (to) queryParams.append('to', to);
    if (customer) queryParams.append('customer', customer);

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction?${queryParams.toString()}`,
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
          message: paystackData.message || 'Failed to fetch transactions' 
        },
        { status: paystackResponse.status }
      );
    }

    return NextResponse.json(paystackData);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { status: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

