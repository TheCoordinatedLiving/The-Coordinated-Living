import Airtable from 'airtable';

// Airtable configuration
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  console.warn('Airtable API key or Base ID not found in environment variables');
}

// Lazy initialization of Airtable base
let base: Airtable.Base | null = null;

export const getAirtableBase = () => {
  if (!base && apiKey && baseId) {
    base = new Airtable({
      apiKey: apiKey,
    }).base(baseId);
  }
  return base;
};

// Types for our Airtable records
export interface AirtablePost {
  id: string;
  fields: {
    'Title': string;
    'Content': string; // Main content for right column
    'Image 1'?: Array<{
      id: string;
      url: string;
      filename: string;
      size: number;
      type: string;
    }>; // First image attachment field
    'Image 2'?: Array<{
      id: string;
      url: string;
      filename: string;
      size: number;
      type: string;
    }>; // Second image attachment field
    'Published'?: boolean;
    'Order'?: number;
    'Created Date'?: string; // Date when the post should be published (can be future date for scheduling)
    // Legacy fields for backward compatibility
    'Left Content'?: string;
    'Right Content'?: string;
    'Bottom Right Content'?: string;
  };
}

export interface AirtableGuide {
  id: string;
  fields: {
    'Title': string;
    'Description': string;
    'Download URL'?: string;
    'Book Cover'?: Array<{
      id: string;
      url: string;
      filename: string;
      size: number;
      type: string;
    }>; // Airtable attachment field returns array of file objects
    'Published'?: boolean;
    'Order'?: number;
    'Created Date'?: string;
  };
}

// Helper function to fetch all records from a table
export const fetchAirtableRecords = async <T>(
  tableName: string,
  options: {
    filterByFormula?: string;
    sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
    maxRecords?: number;
  } = {}
): Promise<T[]> => {
  try {
    const airtableBase = getAirtableBase();
    if (!airtableBase) {
      throw new Error('Airtable not configured - missing API key or Base ID');
    }

    const records: T[] = [];
    
    await airtableBase(tableName)
      .select({
        filterByFormula: options.filterByFormula || '',
        sort: options.sort || [],
        maxRecords: options.maxRecords || 100,
      })
      .eachPage((pageRecords, fetchNextPage) => {
        pageRecords.forEach((record) => {
          records.push({
            id: record.id,
            fields: record.fields,
          } as T);
        });
        fetchNextPage();
      });

    return records;
  } catch (error) {
    console.error(`Error fetching records from ${tableName}:`, error);
    throw error;
  }
};

// Specific functions for posts and guides
export const fetchPosts = async (): Promise<AirtablePost[]> => {
  // First, get ALL posts (no filter)
  const allPosts = await fetchAirtableRecords<AirtablePost>('Posts', {
    sort: [],
  });
  
  // Filter to only published posts that are ready to be shown
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Start of today
  
  const publishedPosts = allPosts.filter(post => {
    // Must be published
    if (post.fields['Published'] !== true) {
      return false;
    }
    
    // Check created date for scheduling
    const createdDate = post.fields['Created Date'];
    if (createdDate) {
      // If there's a created date, only show if it's today or in the past
      const created = new Date(createdDate);
      const createdDay = new Date(created.getFullYear(), created.getMonth(), created.getDate());
      return createdDay <= today;
    }
    
    // If no created date, show the post (immediate publishing)
    return true;
  });
  
  // Sort by Created Date (latest first) - simple date-based sorting
  return publishedPosts.sort((a, b) => {
    const aCreatedDate = a.fields['Created Date'];
    const bCreatedDate = b.fields['Created Date'];
    
    // If both have Created Date, sort by date (latest first)
    if (aCreatedDate && bCreatedDate) {
      const aDate = new Date(aCreatedDate);
      const bDate = new Date(bCreatedDate);
      const dateComparison = bDate.getTime() - aDate.getTime(); // Latest first
      
      if (dateComparison !== 0) {
        return dateComparison;
      }
    }
    
    // If only one has Created Date, prioritize it
    if (aCreatedDate && !bCreatedDate) {
      return -1;
    }
    if (!aCreatedDate && bCreatedDate) {
      return 1;
    }
    
    // If dates are the same or neither has date, fall back to Order sorting
    const aOrder = a.fields['Order'];
    const bOrder = b.fields['Order'];
    
    // Check if Order values exist (not undefined, null, or 0)
    const aHasOrder = aOrder !== undefined && aOrder !== null && aOrder !== 0;
    const bHasOrder = bOrder !== undefined && bOrder !== null && bOrder !== 0;
    
    // If both have Order values, sort by Order
    if (aHasOrder && bHasOrder) {
      return aOrder - bOrder;
    }
    
    // If only a has Order, a comes first
    if (aHasOrder && !bHasOrder) {
      return -1;
    }
    
    // If only b has Order, b comes first
    if (!aHasOrder && bHasOrder) {
      return 1;
    }
    
    // If neither has Order, maintain original order
    return 0;
  });
};

export const fetchGuides = async (): Promise<AirtableGuide[]> => {
  // First, get ALL guides (no filter)
  const allGuides = await fetchAirtableRecords<AirtableGuide>('Guides', {
    sort: [],
  });
  
  // Filter to only published guides
  const publishedGuides = allGuides.filter(guide => guide.fields['Published'] === true);
  
  // Sort manually: guides with Order first (ascending), then guides without Order
  return publishedGuides.sort((a, b) => {
    const aOrder = a.fields['Order'];
    const bOrder = b.fields['Order'];
    
    // Check if Order values exist (not undefined, null, or 0)
    const aHasOrder = aOrder !== undefined && aOrder !== null && aOrder !== 0;
    const bHasOrder = bOrder !== undefined && bOrder !== null && bOrder !== 0;
    
    // If both have Order values, sort by Order
    if (aHasOrder && bHasOrder) {
      return aOrder - bOrder;
    }
    
    // If only a has Order, a comes first
    if (aHasOrder && !bHasOrder) {
      return -1;
    }
    
    // If only b has Order, b comes first
    if (!aHasOrder && bHasOrder) {
      return 1;
    }
    
    // If neither has Order, maintain original order (by creation date)
    return 0;
  });
};

export const fetchPostById = async (id: string): Promise<AirtablePost | null> => {
  try {
    const airtableBase = getAirtableBase();
    if (!airtableBase) {
      throw new Error('Airtable not configured - missing API key or Base ID');
    }

    const record = await airtableBase('Posts').find(id);
    const post = {
      id: record.id,
      fields: record.fields,
    } as AirtablePost;
    
    // Check if post is published and ready to be shown
    if (post.fields['Published'] !== true) {
      return null;
    }
    
    // Check created date for scheduling
    const createdDate = post.fields['Created Date'];
    if (createdDate) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const created = new Date(createdDate);
      const createdDay = new Date(created.getFullYear(), created.getMonth(), created.getDate());
      
      // Only return if created date is today or in the past
      if (createdDay > today) {
        return null;
      }
    }
    
    return post;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    return null;
  }
};

export const fetchGuideById = async (id: string): Promise<AirtableGuide | null> => {
  try {
    const airtableBase = getAirtableBase();
    if (!airtableBase) {
      throw new Error('Airtable not configured - missing API key or Base ID');
    }

    const record = await airtableBase('Guides').find(id);
    const guide = {
      id: record.id,
      fields: record.fields,
    } as AirtableGuide;
    
    // Only return if published
    if (guide.fields['Published']) {
      return guide;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching guide with id ${id}:`, error);
    return null;
  }
};

// Subscriber and Subscription types - Updated to match actual Airtable fields
export interface AirtableSubscriber {
  id?: string;
  fields: {
    'Name'?: string;
    'Email'?: string;
    'WhatsApp Number'?: string;
    'Subscription Status'?: string; // Formula field - read only
    'Whatsapp Status'?: string;
    'Expiration Date Rollup (from Subscriptions)'?: string; // Rollup field - read only
    'Created At'?: string;
    'Last modified'?: string;
    'Subscriptions'?: string[]; // Link to Subscriptions table
  };
}

// Input type for createOrUpdateSubscriber - accepts both input field names and Airtable field names
export type SubscriberInputData = {
  'Full Name'?: string; // Maps to 'Name' in Airtable
  'Phone Number'?: string; // Maps to 'WhatsApp Number' in Airtable
  'Email'?: string;
  'Whatsapp Status'?: string;
  'Transaction Reference'?: string;
  'Amount'?: number;
  'Currency'?: string;
  'Status'?: string;
  'Payment Type'?: string;
  'Paid At'?: string;
  'Subscription Code'?: string;
  'Plan Code'?: string;
  'Customer Code'?: string;
  'Created At'?: string;
  'Updated At'?: string;
  // Also accept direct Airtable field names for flexibility
  'Name'?: string;
  'WhatsApp Number'?: string;
} & Partial<AirtableSubscriber['fields']>;

export interface AirtableSubscription {
  id?: string;
  fields: {
    'Name'?: string;
    'Subscriber'?: string[]; // Link to Subscribers table (array of record IDs)
    'Email'?: string;
    'Whatsapp Number'?: string;
    'Subscription Package'?: string; // Single select
    'Amount Paid'?: number;
    'Expiration Date'?: string; // Date field
    'Created At'?: string;
  };
}

// Note: createOrUpdateSubscription is exported from airtable-subscriptions.ts
// Import it directly from there to avoid circular dependencies

// Function to create or update a subscriber record in Airtable
export const createOrUpdateSubscriber = async (
  subscriberData: SubscriberInputData
): Promise<AirtableSubscriber | null> => {
  try {
    const airtableBase = getAirtableBase();
    if (!airtableBase) {
      throw new Error('Airtable not configured - missing API key or Base ID');
    }

    // Filter out undefined/null values and convert data types appropriately
    // This helps avoid INVALID_VALUE_FOR_COLUMN errors
    const cleanFields: Record<string, unknown> = {};
    
    // Map our data fields to actual Airtable Subscribers table field names:
    // Name, Email, WhatsApp Number, Subscription Status (formula - read only), 
    // Whatsapp Status, Expiration Date Rollup (rollup - read only),
    // Created At, Last modified, Subscriptions (link)
    
    // Name - from Full Name
    if (subscriberData['Full Name']) {
      cleanFields['Name'] = String(subscriberData['Full Name']).trim();
    }
    
    // Email - add email to Subscribers table
    if (subscriberData['Email']) {
      cleanFields['Email'] = String(subscriberData['Email']).trim();
    }
    
    // WhatsApp Number - from Phone Number
    if (subscriberData['Phone Number']) {
      cleanFields['WhatsApp Number'] = String(subscriberData['Phone Number']).trim();
    }
    
    // Whatsapp Status - set to provided value, or default to "Yet to be added"
    if (subscriberData['Whatsapp Status']) {
      cleanFields['Whatsapp Status'] = String(subscriberData['Whatsapp Status']).trim();
    } else {
      // Default status for new subscribers
      cleanFields['Whatsapp Status'] = 'Yet to be added';
    }
    
    // Created At - SKIP this field as it's computed/read-only in Airtable
    // Airtable automatically sets this when a record is created
    // Don't try to set it manually
    
    // Last modified - SKIP this field as it's auto-managed by Airtable
    // Don't set it manually, let Airtable handle it
    
    // Note: Subscription Status is a formula field (read-only)
    // Note: Expiration Date Rollup is a rollup field (read-only)
    // Note: Subscriptions link will be created when we create the subscription record
    
    // Ensure Name field is provided (it might be required)
    if (!cleanFields['Name'] && subscriberData['Full Name']) {
      cleanFields['Name'] = String(subscriberData['Full Name']).trim();
    }
    
    // If still no name, use email or a default
    if (!cleanFields['Name']) {
      cleanFields['Name'] = subscriberData['Email'] || 'Unknown Subscriber';
    }
    
    console.log('Creating subscriber with fields:', JSON.stringify(cleanFields, null, 2));
    
    try {
      // Create new record directly
      // Type assertion needed because Airtable expects Partial<FieldSet> but we're using Record<string, unknown>
      const newRecord = await airtableBase('Subscribers').create([
        {
          fields: cleanFields as unknown as Record<string, string | number | string[] | undefined>,
        },
      ]);
      
      return {
        id: newRecord[0].id,
        fields: newRecord[0].fields as AirtableSubscriber['fields'],
      };
    } catch (createError: unknown) {
      // Extract detailed error information
      const err = createError as { 
        error?: string; 
        message?: string; 
        errorDetails?: { fieldName?: string; field?: string };
        statusCode?: number;
      };
      
      let errorMessage = 'Unknown error';
      let fieldName = 'unknown';
      
      if (err?.error === 'UNKNOWN_FIELD_NAME' || err?.error?.includes('UNKNOWN_FIELD_NAME')) {
        const errorDetails = err.errorDetails || err;
        fieldName = (errorDetails as { fieldName?: string })?.fieldName || 'unknown';
        errorMessage = `Field "${fieldName}" does not exist in Airtable.`;
      } else if (err?.error === 'INVALID_VALUE_FOR_COLUMN' || err?.error?.includes('INVALID_VALUE_FOR_COLUMN')) {
        const errorDetails = err.errorDetails || err;
        fieldName = (errorDetails as { fieldName?: string; field?: string })?.fieldName || 
                   (errorDetails as { fieldName?: string; field?: string })?.field || 'unknown';
        errorMessage = `Invalid value for field "${fieldName}". Check data type and format.`;
        
        // Log what we tried to send
        console.error('Failed to create record. Fields attempted:', JSON.stringify(cleanFields, null, 2));
        console.error('Error details:', JSON.stringify(createError, null, 2));
      } else {
        errorMessage = err?.error || err?.message || 'Unknown error';
      }
      
      throw new Error(`${errorMessage} Full error: ${JSON.stringify(createError)}`);
    }
  } catch (error: unknown) {
    const err = error as { message?: string; error?: string; statusCode?: number };
    console.error('Error creating/updating subscriber:', error);
    
    // Extract more detailed error information
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
    
    // Log full error for debugging
    console.error('Full error details:', JSON.stringify(error, null, 2));
    
    throw new Error(errorMessage);
  }
};

// Function to batch create or update subscribers
export const batchCreateOrUpdateSubscribers = async (
  subscribersData: SubscriberInputData[]
): Promise<{ success: number; failed: number; errors: Array<{ subscriber: SubscriberInputData; error: string }> }> => {
  let success = 0;
  let failed = 0;
  const errors: Array<{ subscriber: SubscriberInputData; error: string }> = [];

  for (const subscriberData of subscribersData) {
    try {
      await createOrUpdateSubscriber(subscriberData);
      success++;
    } catch (error) {
      failed++;
      const err = error instanceof Error ? error : new Error('Unknown error');
      errors.push({
        subscriber: subscriberData,
        error: err.message,
      });
    }
  }

  return { success, failed, errors };
};
