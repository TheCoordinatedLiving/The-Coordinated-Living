import Airtable from 'airtable';

// Airtable configuration
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY || '',
}).base(process.env.AIRTABLE_BASE_ID || '');

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
    'Content'?: string;
    'Download URL'?: string;
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
    const records: T[] = [];
    
    await base(tableName)
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
  return fetchAirtableRecords<AirtablePost>('Posts', {
    filterByFormula: '',
    sort: [],
  });
};

export const fetchGuides = async (): Promise<AirtableGuide[]> => {
  return fetchAirtableRecords<AirtableGuide>('Guides', {
    filterByFormula: '',
    sort: [],
  });
};

export const fetchPostById = async (id: string): Promise<AirtablePost | null> => {
  try {
    const record = await base('Posts').find(id);
    return {
      id: record.id,
      fields: record.fields,
    } as AirtablePost;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    return null;
  }
};

export const fetchGuideById = async (id: string): Promise<AirtableGuide | null> => {
  try {
    const record = await base('Guides').find(id);
    return {
      id: record.id,
      fields: record.fields,
    } as AirtableGuide;
  } catch (error) {
    console.error(`Error fetching guide with id ${id}:`, error);
    return null;
  }
};
