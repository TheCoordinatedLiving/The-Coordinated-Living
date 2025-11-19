import { NextResponse } from 'next/server';
import { getAirtableBase } from '@/lib/airtable';

/**
 * List all fields in the Donations table
 * This helps identify which fields exist and what they're named exactly
 */
export async function GET() {
  try {
    const airtableBase = getAirtableBase();
    
    if (!airtableBase) {
      return NextResponse.json({
        status: false,
        message: 'Airtable not configured - missing API key or Base ID',
      }, { status: 500 });
    }

    try {
      // Get a few records to see the field structure
      const records = await airtableBase('Donations')
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
        'Amount',
        'Payment', // We're trying this capitalized version
        'payment', // Original lowercase version
      ];

      // Find missing fields
      const missingFields = expectedFields.filter(
        field => !fieldNames.includes(field)
      );

      // Find extra fields (fields in Airtable but not in our code)
      const extraFields = fieldNames.filter(
        field => !expectedFields.includes(field)
      );

      // Get field types if possible (from first record)
      const fieldTypes: Record<string, string> = {};
      if (records.length > 0) {
        fieldNames.forEach(fieldName => {
          const value = records[0].fields[fieldName];
          fieldTypes[fieldName] = typeof value;
        });
      }

      return NextResponse.json({
        status: true,
        message: 'Donations table fields retrieved successfully',
        data: {
          tableName: 'Donations',
          fieldNames,
          fieldTypes,
          recordCount: records.length,
          expectedFields,
          missingFields,
          extraFields,
          sampleRecord: records.length > 0 ? {
            id: records[0].id,
            fields: records[0].fields,
          } : null,
        },
      });
    } catch (error) {
      console.error('Error fetching Donations table fields:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Check if table doesn't exist
      if (errorMessage.includes('Could not find table') || errorMessage.includes('TABLE_NOT_FOUND')) {
        return NextResponse.json({
          status: false,
          message: 'Donations table not found in Airtable. Please create it first.',
          error: errorMessage,
        }, { status: 404 });
      }

      return NextResponse.json({
        status: false,
        message: 'Error fetching Donations table fields',
        error: errorMessage,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in list-donation-fields endpoint:', error);
    return NextResponse.json({
      status: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

