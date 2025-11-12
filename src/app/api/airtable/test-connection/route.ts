import { NextResponse } from 'next/server';
import Airtable from 'airtable';

/**
 * Test Airtable connection and check if Subscribers table exists
 */
export async function GET() {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      return NextResponse.json({
        status: false,
        message: 'Airtable not configured - missing API key or Base ID',
        configured: false,
      });
    }

    const base = new Airtable({ apiKey }).base(baseId);

    // Try to access the Subscribers table
    try {
      // Get first record to test connection and see field structure
      const records = await base('Subscribers')
        .select({
          maxRecords: 1,
        })
        .firstPage();

      // Get field names from the first record if it exists, or from the table schema
      let fieldNames: string[] = [];
      
      if (records.length > 0) {
        fieldNames = Object.keys(records[0].fields);
      } else {
        // If no records, try to get schema (this might not work with all Airtable API versions)
        // For now, we'll return the expected fields
        fieldNames = [
          'Email',
          'Phone Number',
          'Full Name',
          'Transaction Reference',
          'Amount',
          'Currency',
          'Status',
          'Payment Type',
          'Paid At',
          'Subscription Code',
          'Plan Code',
          'Customer Code',
          'Created At',
          'Updated At',
        ];
      }

      return NextResponse.json({
        status: true,
        message: 'Airtable connection successful',
        configured: true,
        tableExists: true,
        recordCount: records.length,
        fieldNames: fieldNames,
        expectedFields: [
          'Email',
          'Phone Number',
          'Full Name',
          'Transaction Reference',
          'Amount',
          'Currency',
          'Status',
          'Payment Type',
          'Paid At',
          'Subscription Code',
          'Plan Code',
          'Customer Code',
          'Created At',
          'Updated At',
        ],
        missingFields: [
          'Email',
          'Phone Number',
          'Full Name',
          'Transaction Reference',
          'Amount',
          'Currency',
          'Status',
          'Payment Type',
          'Paid At',
          'Subscription Code',
          'Plan Code',
          'Customer Code',
          'Created At',
          'Updated At',
        ].filter(field => !fieldNames.includes(field)),
      });
    } catch (tableError: unknown) {
      // Table might not exist or have wrong name
      const err = tableError as { error?: string; message?: string };
      const errorMessage = err?.error || err?.message || 'Unknown error';
      
      return NextResponse.json({
        status: false,
        message: `Error accessing Subscribers table: ${errorMessage}`,
        configured: true,
        tableExists: false,
        error: errorMessage,
        suggestion: 'Make sure you have a table named "Subscribers" in your Airtable base',
      });
    }
  } catch (error: unknown) {
    const err = error as { message?: string; error?: string };
    return NextResponse.json({
      status: false,
      message: 'Failed to connect to Airtable',
      error: err?.message || err?.error || 'Unknown error',
      configured: false,
    });
  }
}

