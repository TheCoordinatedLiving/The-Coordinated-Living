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
    
    const cleanFields: Record<string, unknown> = {};
    
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
      // Log the value being set for debugging
      console.log('Setting Subscription Package to:', packageValue);
      // Try to set it, but if it fails, we'll catch the error
      cleanFields['Subscription Package'] = packageValue;
    } else {
      console.log('Subscription Package not provided or empty:', subscriptionData['Subscription Package']);
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

    // Check for existing expired subscriptions to update instead of creating duplicates
    let existingSubscriptionId: string | null = null;
    
    if (subscriberRecordId) {
      try {
        // Get the subscriber record to find linked subscriptions
        const subscriberRecord = await airtableBase('Subscribers').find(subscriberRecordId);
        const linkedSubscriptionIds = (subscriberRecord.fields['Subscriptions'] as string[]) || [];
        
        if (linkedSubscriptionIds.length > 0) {
          // Fetch all linked subscriptions by their IDs
          // Airtable allows fetching up to 100 records at a time, so we'll fetch in batches if needed
          const subscriptionRecords = [];
          for (const subId of linkedSubscriptionIds) {
            try {
              const record = await airtableBase('Subscriptions').find(subId);
              subscriptionRecords.push(record);
            } catch {
              // Skip if record doesn't exist
              console.log(`Subscription ${subId} not found, skipping`);
            }
          }
          
          // Find expired subscriptions (expiration date is in the past)
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const expiredSubscriptions = subscriptionRecords.filter((record) => {
            const expirationDate = record.fields['Expiration Date'] as string | undefined;
            if (!expirationDate) return false;
            
            const expDate = new Date(expirationDate);
            expDate.setHours(0, 0, 0, 0);
            return expDate < today;
          });
          
          // If we have expired subscriptions, update the most recent one
          if (expiredSubscriptions.length > 0) {
            // Sort by expiration date (most recent first) and take the first one
            expiredSubscriptions.sort((a, b) => {
              const dateA = new Date((a.fields['Expiration Date'] as string) || 0).getTime();
              const dateB = new Date((b.fields['Expiration Date'] as string) || 0).getTime();
              return dateB - dateA; // Most recent first
            });
            
            existingSubscriptionId = expiredSubscriptions[0].id;
            console.log(`Found expired subscription ${existingSubscriptionId} for subscriber ${subscriberRecordId}, will update instead of creating new`);
          }
        }
      } catch (searchError) {
        // If search fails, just create a new subscription
        console.log('Could not search for existing subscriptions, will create new:', searchError);
      }
    }
    
    let subscriptionId: string;
    let subscription: AirtableSubscription;
    
    if (existingSubscriptionId) {
      // Update existing expired subscription
      const updatedRecord = await airtableBase('Subscriptions').update([
        {
          id: existingSubscriptionId,
          fields: cleanFields as unknown as Record<string, string | number | string[] | undefined>,
        },
      ]);
      
      subscriptionId = updatedRecord[0].id;
      subscription = {
        id: subscriptionId,
        fields: updatedRecord[0].fields as AirtableSubscription['fields'],
      };
      
      console.log(`Updated expired subscription ${subscriptionId} with new expiration date and payment info`);
    } else {
      // Create new subscription record
      // Type assertion needed because Airtable expects Partial<FieldSet> but we're using Record<string, unknown>
      const newRecord = await airtableBase('Subscriptions').create([
        {
          fields: cleanFields as unknown as Record<string, string | number | string[] | undefined>,
        },
      ]);

      subscriptionId = newRecord[0].id;
      subscription = {
        id: subscriptionId,
        fields: newRecord[0].fields as AirtableSubscription['fields'],
      };
      
      console.log(`Created new subscription ${subscriptionId}`);
    }

    // Update the subscriber record to include this subscription in its "Subscriptions" field
    // This ensures the bidirectional link is properly established
    // Only needed for new subscriptions (existing ones are already linked)
    if (subscriberRecordId && !existingSubscriptionId) {
      try {
        // Get the current subscriber record to see existing subscriptions
        const subscriberRecord = await airtableBase('Subscribers').find(subscriberRecordId);
        const existingSubscriptions = (subscriberRecord.fields['Subscriptions'] as string[]) || [];
        
        // Add the new subscription ID if it's not already there
        if (!existingSubscriptions.includes(subscriptionId)) {
          const updatedSubscriptions = [...existingSubscriptions, subscriptionId];
          
          // Update the subscriber record with the new subscription link
          await airtableBase('Subscribers').update([
            {
              id: subscriberRecordId,
              fields: {
                'Subscriptions': updatedSubscriptions,
              },
            },
          ]);
          
          console.log(`Linked subscription ${subscriptionId} to subscriber ${subscriberRecordId}`);
        }
      } catch (updateError) {
        // Log the error but don't fail the subscription creation
        console.error('Error updating subscriber with subscription link:', updateError);
        console.log('Subscription was created successfully, but subscriber link update failed');
      }
    } else if (existingSubscriptionId) {
      console.log(`Subscription ${subscriptionId} is already linked to subscriber ${subscriberRecordId}, no need to update link`);
    }

    return subscription;
  } catch (error: unknown) {
      console.error('Error creating/updating subscription:', error);
      
      // Extract more detailed error information
      const err = error as { 
        message?: string; 
        error?: string; 
        statusCode?: number;
        errorDetails?: Record<string, unknown>;
      };
      let errorMessage = 'Unknown error';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (err?.error) {
        errorMessage = err.error;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (err?.statusCode) {
        errorMessage = `Airtable API error (${err.statusCode}): ${err.error || err.message || 'Unknown error'}`;
      }
      
      // Check if error is related to invalid field value (common for single-select fields)
      const errorString = JSON.stringify(error).toLowerCase();
      if (errorString.includes('invalid') || errorString.includes('enum') || errorString.includes('option')) {
        console.error('⚠️ INVALID FIELD VALUE ERROR - The Subscription Package value may not match Airtable options');
        console.error('Attempted value:', subscriptionData['Subscription Package']);
        console.error('This usually means the value must exactly match one of the options in Airtable');
        console.error('Please check your Airtable field options and ensure they match: "3 months" or "12 months"');
      }
      
      // Log full error for debugging
      console.error('Full error details:', JSON.stringify(error, null, 2));
      console.error('Subscription data attempted:', JSON.stringify(subscriptionData, null, 2));
      
      throw new Error(errorMessage);
    }
};

