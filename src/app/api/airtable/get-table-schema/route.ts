import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

/**
 * Get the actual field structure from Subscribers and Subscriptions tables
 * This helps us see what fields actually exist
 */
export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      return NextResponse.json({
        status: false,
        message: 'Airtable not configured - missing API key or Base ID',
      });
    }

    const base = new Airtable({ apiKey }).base(baseId);
    const result: any = {
      status: true,
      tables: {},
    };

    // Check Subscribers table
    try {
      const subscribersRecords = await base('Subscribers')
        .select({
          maxRecords: 1,
        })
        .firstPage();

      const subscribersFields = subscribersRecords.length > 0
        ? Object.keys(subscribersRecords[0].fields)
        : [];

      result.tables.Subscribers = {
        exists: true,
        fieldNames: subscribersFields.sort(),
        recordCount: subscribersRecords.length,
        sampleRecord: subscribersRecords.length > 0
          ? {
              id: subscribersRecords[0].id,
              fields: subscribersRecords[0].fields,
            }
          : null,
      };
    } catch (subscribersError: any) {
      result.tables.Subscribers = {
        exists: false,
        error: subscribersError?.error || subscribersError?.message || 'Unknown error',
      };
    }

    // Check Subscriptions table
    try {
      const subscriptionsRecords = await base('Subscriptions')
        .select({
          maxRecords: 1,
        })
        .firstPage();

      const subscriptionsFields = subscriptionsRecords.length > 0
        ? Object.keys(subscriptionsRecords[0].fields)
        : [];

      result.tables.Subscriptions = {
        exists: true,
        fieldNames: subscriptionsFields.sort(),
        recordCount: subscriptionsRecords.length,
        sampleRecord: subscriptionsRecords.length > 0
          ? {
              id: subscriptionsRecords[0].id,
              fields: subscriptionsRecords[0].fields,
            }
          : null,
      };
    } catch (subscriptionsError: any) {
      result.tables.Subscriptions = {
        exists: false,
        error: subscriptionsError?.error || subscriptionsError?.message || 'Unknown error',
      };
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: 'Failed to connect to Airtable',
      error: error?.message || error?.error || 'Unknown error',
    });
  }
}

