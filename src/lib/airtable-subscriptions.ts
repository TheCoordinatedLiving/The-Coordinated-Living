import Airtable from 'airtable';
import { getAirtableBase } from './airtable';
import { AirtableSubscription } from './airtable';

/**
 * Create or update a subscription record in Airtable Subscriptions table
 */
export const createOrUpdateSubscription = async (
  subscriptionData: AirtableSubscription['fields'],
  subscriberRecordId?: string
): Promise<AirtableSubscription | null> => {
  try {
    const airtableBase = getAirtableBase();
    if (!airtableBase) {
      throw new Error('Airtable not configured - missing API key or Base ID');
    }

    // Helper to format dates for Airtable
    // Airtable date fields typically accept YYYY-MM-DD format
    const formatDate = (dateValue: string | Date): string => {
      if (!dateValue) return '';
      const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      if (isNaN(date.getTime())) return '';
      // Use YYYY-MM-DD format for date fields
      return date.toISOString().split('T')[0];
    };

    // Map data to actual Airtable Subscriptions table field names:
    // Name, Subscriber (link), Email, Whatsapp Number, 
    // Subscription Package (single select), Amount Paid, Expiration Date, Created At
    
    const cleanFields: Record<string, any> = {};
    
    // Name
    if (subscriptionData['Name']) {
      cleanFields['Name'] = String(subscriptionData['Name']).trim();
    }
    
    // Subscriber - link to Subscribers table (array of record IDs)
    if (subscriberRecordId) {
      cleanFields['Subscriber'] = [subscriberRecordId];
    } else if (subscriptionData['Subscriber']) {
      cleanFields['Subscriber'] = subscriptionData['Subscriber'];
    }
    
    // Email
    if (subscriptionData['Email']) {
      cleanFields['Email'] = String(subscriptionData['Email']).trim();
    }
    
    // Whatsapp Number
    if (subscriptionData['Whatsapp Number']) {
      cleanFields['Whatsapp Number'] = String(subscriptionData['Whatsapp Number']).trim();
    }
    
    // Subscription Package (single select)
    // Only set if provided and not empty - if the value doesn't match Airtable options, skip it
    // The user will need to set this manually or we need to know the valid options
    if (subscriptionData['Subscription Package'] && String(subscriptionData['Subscription Package']).trim()) {
      const packageValue = String(subscriptionData['Subscription Package']).trim();
      // Try to set it, but if it fails, we'll catch the error
      cleanFields['Subscription Package'] = packageValue;
    }
    // If not provided, leave it empty - Airtable will allow empty single-select fields
    
    // Amount Paid (number)
    if (subscriptionData['Amount Paid'] !== undefined && subscriptionData['Amount Paid'] !== null) {
      const numValue = typeof subscriptionData['Amount Paid'] === 'number' 
        ? subscriptionData['Amount Paid'] 
        : parseFloat(String(subscriptionData['Amount Paid']));
      if (!isNaN(numValue)) {
        cleanFields['Amount Paid'] = numValue;
      }
    }
    
    // Expiration Date
    if (subscriptionData['Expiration Date']) {
      cleanFields['Expiration Date'] = formatDate(subscriptionData['Expiration Date']);
    }
    
    // Created At - SKIP this field as it's computed/read-only in Airtable
    // Airtable automatically sets this when a record is created
    // Don't try to set it manually

    // Create new subscription record
    const newRecord = await airtableBase('Subscriptions').create([
      {
        fields: cleanFields,
      },
    ]);

    return {
      id: newRecord[0].id,
      fields: newRecord[0].fields as AirtableSubscription['fields'],
    };
  } catch (error: any) {
    console.error('Error creating/updating subscription:', error);
    
    // Extract more detailed error information
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error?.error) {
      errorMessage = error.error;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error?.statusCode) {
      errorMessage = `Airtable API error (${error.statusCode}): ${error.error || error.message || 'Unknown error'}`;
    }
    
    // Log full error for debugging
    console.error('Full error details:', JSON.stringify(error, null, 2));
    
    throw new Error(errorMessage);
  }
};

