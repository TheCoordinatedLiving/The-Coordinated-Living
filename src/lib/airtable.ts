import Airtable from 'airtable';

// Airtable configuration
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  console.warn('Airtable API key or Base ID not found in environment variables');
}

// Lazy initialization of Airtable base
let base: Airtable.Base | null = null;

const getAirtableBase = () => {
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

// Subscriber and Subscription types
export interface AirtableSubscriber {
  id?: string;
  fields: {
    'Email'?: string;
    'Phone Number'?: string;
    'Full Name'?: string;
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
  };
}

// Function to create or update a subscriber record in Airtable
export const createOrUpdateSubscriber = async (
  subscriberData: AirtableSubscriber['fields']
): Promise<AirtableSubscriber | null> => {
  try {
    const airtableBase = getAirtableBase();
    if (!airtableBase) {
      throw new Error('Airtable not configured - missing API key or Base ID');
    }

    // Check if subscriber exists by email or transaction reference
    const email = subscriberData['Email'];
    const transactionRef = subscriberData['Transaction Reference'];
    
    let existingRecord = null;
    
    if (email) {
      const records = await airtableBase('Subscribers')
        .select({
          filterByFormula: `{Email} = "${email}"`,
          maxRecords: 1,
        })
        .firstPage();
      
      if (records.length > 0) {
        existingRecord = records[0];
      }
    }
    
    // If not found by email, try transaction reference
    if (!existingRecord && transactionRef) {
      const records = await airtableBase('Subscribers')
        .select({
          filterByFormula: `{Transaction Reference} = "${transactionRef}"`,
          maxRecords: 1,
        })
        .firstPage();
      
      if (records.length > 0) {
        existingRecord = records[0];
      }
    }

    if (existingRecord) {
      // Update existing record
      const updatedRecord = await airtableBase('Subscribers').update([
        {
          id: existingRecord.id,
          fields: {
            ...subscriberData,
            'Updated At': new Date().toISOString(),
          },
        },
      ]);
      
      return {
        id: updatedRecord[0].id,
        fields: updatedRecord[0].fields as AirtableSubscriber['fields'],
      };
    } else {
      // Create new record
      const newRecord = await airtableBase('Subscribers').create([
        {
          fields: {
            ...subscriberData,
            'Created At': new Date().toISOString(),
            'Updated At': new Date().toISOString(),
          },
        },
      ]);
      
      return {
        id: newRecord[0].id,
        fields: newRecord[0].fields as AirtableSubscriber['fields'],
      };
    }
  } catch (error) {
    console.error('Error creating/updating subscriber:', error);
    throw error;
  }
};

// Function to batch create or update subscribers
export const batchCreateOrUpdateSubscribers = async (
  subscribersData: AirtableSubscriber['fields'][]
): Promise<{ success: number; failed: number; errors: any[] }> => {
  let success = 0;
  let failed = 0;
  const errors: any[] = [];

  for (const subscriberData of subscribersData) {
    try {
      await createOrUpdateSubscriber(subscriberData);
      success++;
    } catch (error) {
      failed++;
      errors.push({
        subscriber: subscriberData,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return { success, failed, errors };
};
