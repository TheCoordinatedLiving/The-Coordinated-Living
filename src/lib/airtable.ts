import Airtable from 'airtable';

// Airtable configuration
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  console.warn('Airtable API key or Base ID not found in environment variables');
}

// Lazy initialization of Airtable base
let base: any = null;

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
    'Left Content': string;
    'Right Content': string;
    'Bottom Right Content': string;
    'Published'?: boolean;
    'Order'?: number;
    'Created Date'?: string;
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
      .eachPage((pageRecords: any[], fetchNextPage: () => void) => {
        pageRecords.forEach((record: any) => {
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
  
  // Filter to only published posts
  const publishedPosts = allPosts.filter(post => post.fields['Published'] === true);
  
  // Sort manually: posts with Order first (ascending), then posts without Order
  return publishedPosts.sort((a, b) => {
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
    
    // Only return if published
    if (post.fields['Published']) {
      return post;
    }
    return null;
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
