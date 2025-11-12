import { NextResponse } from 'next/server';
import Airtable from 'airtable';

/**
 * List all fields in the Subscribers table
 * This helps identify which fields exist and what they're named
 */
export async function GET() {
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

    try {
      // Get a few records to see the field structure
      const records = await base('Subscribers')
        .select({
          maxRecords: 5,
        })
        .firstPage();

      // Extract field names from records
      const fieldNames = records.length > 0 
        ? Object.keys(records[0].fields)
        : [];

      // Expected fields from our code
      const expectedFields = [
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

      // Find missing fields
      const missingFields = expectedFields.filter(
        field => !fieldNames.includes(field)
      );

      // Find extra fields (fields in Airtable but not in our code)
      const extraFields = fieldNames.filter(
        field => !expectedFields.includes(field)
      );

      return NextResponse.json({
        status: true,
        message: 'Field analysis complete',
        tableName: 'Subscribers',
        actualFields: fieldNames.sort(),
        expectedFields: expectedFields.sort(),
        missingFields: missingFields.sort(),
        extraFields: extraFields.sort(),
        recordCount: records.length,
        sampleRecord: records.length > 0 ? {
          id: records[0].id,
          fields: records[0].fields,
        } : null,
      });
    } catch (tableError: unknown) {
      const err = tableError as { error?: string; message?: string };
      return NextResponse.json({
        status: false,
        message: `Error accessing Subscribers table: ${err?.error || err?.message || 'Unknown error'}`,
        error: err,
        suggestion: 'Make sure you have a table named "Subscribers" in your Airtable base',
      });
    }
  } catch (error: unknown) {
    const err = error as { message?: string; error?: string };
    return NextResponse.json({
      status: false,
      message: 'Failed to connect to Airtable',
      error: err?.message || err?.error || 'Unknown error',
    });
  }
}

