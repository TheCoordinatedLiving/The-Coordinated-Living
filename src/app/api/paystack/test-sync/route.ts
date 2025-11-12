import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateSubscriber } from '@/lib/airtable';
import { createOrUpdateSubscription } from '@/lib/airtable-subscriptions';

/**
 * Test endpoint to simulate subscription payments and sync to Airtable
 * 
 * This endpoint simulates:
 * 1. New subscription payment (new user signing up)
 * 2. Subscription renewal payment (existing user renewing)
 * 
 * Usage:
 * POST /api/paystack/test-sync
 * Body: { "scenario": "new_subscription" | "renewal" }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { scenario = 'new_subscription', count = 1 } = body;

    // Support batch testing
    const scenarios = Array.isArray(scenario) ? scenario : [scenario];
    const testCount = typeof count === 'number' && count > 1 ? count : 1;
    
    const results = [];
    const errors = [];

    for (let i = 0; i < testCount; i++) {
      for (const testScenario of scenarios) {
        // Generate dummy data based on scenario
        let subscriberData;

        if (testScenario === 'new_subscription') {
          // Simulate a new user subscribing
          const timestamp = Date.now();
          const randomId = Math.floor(Math.random() * 10000) + i;
          
          subscriberData = {
            'Email': `test.subscriber.${randomId}@example.com`,
            'Phone Number': `+233${Math.floor(Math.random() * 900000000) + 100000000}`,
            'Full Name': `Test User ${randomId}`,
            'Transaction Reference': `TEST_SUB_${timestamp}_${randomId}`,
            'Amount': 100.00, // 100 GHS
            'Currency': 'GHS',
            'Status': 'success',
            'Payment Type': 'Join Community Subscription',
            'Paid At': new Date().toISOString(),
            'Subscription Code': `SUB_TEST_${timestamp}_${randomId}`,
            'Plan Code': 'PLN_test_monthly',
            'Customer Code': `CUS_TEST_${timestamp}_${randomId}`,
            'Created At': new Date().toISOString(),
          };

          console.log('Simulating NEW subscription payment:', subscriberData);
        } else if (testScenario === 'renewal') {
          // Simulate an existing user renewing their subscription
          const timestamp = Date.now();
          const randomId = Math.floor(Math.random() * 10000) + i;
          
          // Use a consistent email to simulate renewal (same user)
          const baseEmail = 'renewal.test@example.com';
          
          subscriberData = {
            'Email': baseEmail,
            'Phone Number': '+233241234567',
            'Full Name': 'Renewal Test User',
            'Transaction Reference': `TEST_RENEWAL_${timestamp}_${randomId}`,
            'Amount': 100.00, // 100 GHS
            'Currency': 'GHS',
            'Status': 'success',
            'Payment Type': 'Subscription Renewal',
            'Paid At': new Date().toISOString(),
            'Subscription Code': `SUB_RENEWAL_${timestamp}_${randomId}`,
            'Plan Code': 'PLN_test_monthly',
            'Customer Code': 'CUS_RENEWAL_TEST',
            'Created At': new Date().toISOString(),
          };

          console.log('Simulating SUBSCRIPTION RENEWAL payment:', subscriberData);
        } else {
          errors.push({
            scenario: testScenario,
            error: 'Invalid scenario. Use "new_subscription" or "renewal"',
          });
          continue;
        }

        // Sync to Airtable - create both subscriber and subscription records
        try {
          // First, create/update the subscriber
          const subscriberResult = await createOrUpdateSubscriber({
            'Full Name': subscriberData['Full Name'],
            'Email': subscriberData['Email'], // Add email to Subscribers table
            'Phone Number': subscriberData['Phone Number'],
            'Created At': subscriberData['Created At'],
          });
          
          // Calculate expiration date (30 days from now for monthly subscription)
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 30);
          
          // Then, create the subscription record
          // Note: Subscription Package is a single-select field - leave it empty for now
          // You'll need to set the valid options in Airtable or update this to match your options
          const subscriptionResult = await createOrUpdateSubscription({
            'Name': `${subscriberData['Full Name']} - ${subscriberData['Plan Code']}`,
            'Email': subscriberData['Email'],
            'Whatsapp Number': subscriberData['Phone Number'],
            // 'Subscription Package': subscriberData['Plan Code'] || 'Monthly', // Skip for now - needs valid option
            'Amount Paid': subscriberData['Amount'],
            'Expiration Date': expirationDate.toISOString(),
            'Created At': subscriberData['Created At'],
          }, subscriberResult?.id);
          
          results.push({
            scenario: testScenario,
            success: true,
            subscriberData,
            subscriberRecord: subscriberResult,
            subscriptionRecord: subscriptionResult,
          });
        } catch (error: unknown) {
          console.error('Error syncing to Airtable:', error);
          
          // Extract detailed error message
          const err = error as { message?: string; error?: string };
          let errorMessage = 'Unknown error';
          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (err?.error) {
            errorMessage = err.error;
          } else if (err?.message) {
            errorMessage = err.message;
          } else if (typeof error === 'string') {
            errorMessage = error;
          }
          
          // Log full error for debugging
          console.error('Full error details:', JSON.stringify(error, null, 2));
          
          errors.push({
            scenario: testScenario,
            subscriberData,
            error: errorMessage,
            errorDetails: error as Record<string, unknown>, // Include full error for debugging
          });
        }
      }
    }

    return NextResponse.json({
      status: true,
      message: `Processed ${results.length} successful syncs, ${errors.length} errors`,
      summary: {
        total: results.length + errors.length,
        successful: results.length,
        failed: errors.length,
      },
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Test sync error:', error);
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

// GET endpoint to show available scenarios
export async function GET() {
  return NextResponse.json({
    status: true,
    message: 'Test sync endpoint for simulating subscription payments',
    availableScenarios: {
      new_subscription: {
        description: 'Simulates a new user subscribing for the first time',
        usage: 'POST with { "scenario": "new_subscription" }',
      },
      renewal: {
        description: 'Simulates an existing user renewing their subscription',
        usage: 'POST with { "scenario": "renewal" }',
      },
    },
    example: {
      new_subscription: {
        method: 'POST',
        url: '/api/paystack/test-sync',
        body: { scenario: 'new_subscription' },
      },
      renewal: {
        method: 'POST',
        url: '/api/paystack/test-sync',
        body: { scenario: 'renewal' },
      },
    },
  });
}

