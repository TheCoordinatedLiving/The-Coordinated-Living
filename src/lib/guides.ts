// Centralized guides data management
// Now fetches from Airtable API with fallback to hardcoded data

import { AirtableGuide } from './airtable';

export interface Guide {
  id: string;
  title: string;
  description: string;
  downloadUrl?: string;
  coverImage?: string; // New field for book cover image
}

// Fallback data in case Airtable is unavailable
const fallbackGuides: Guide[] = [
  {
    id: '1',
    title: 'Guide 1',
    description: 'Brief description of the first guide content and what it covers',
    downloadUrl: 'https://example.com/guide1.pdf',
    coverImage: '/placeholder-book-cover.jpg'
  },
  {
    id: '2',
    title: 'Guide 2',
    description: 'Brief description of the second guide content and what it covers',
    downloadUrl: 'https://example.com/guide2.pdf',
    coverImage: '/placeholder-book-cover.jpg'
  },
  {
    id: '3',
    title: 'Guide 3',
    description: 'Brief description of the third guide content and what it covers',
    downloadUrl: 'https://example.com/guide3.pdf',
    coverImage: '/placeholder-book-cover.jpg'
  },
  {
    id: '4',
    title: 'Guide 4',
    description: 'Brief description of the fourth guide content and what it covers',
    downloadUrl: 'https://example.com/guide4.pdf',
    coverImage: '/placeholder-book-cover.jpg'
  }
];

// Fetch guides from Airtable API
export const getAllGuides = async (): Promise<Guide[]> => {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_BASE_URL || 'https://coordinated-living.vercel.app';
    const response = await fetch(`${baseUrl}/api/airtable/guides`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch guides');
    }
    
    const airtableGuides = await response.json();
    
        // Transform Airtable data to our Guide interface
        return airtableGuides.map((guide: AirtableGuide) => ({
      id: guide.id,
      title: guide.fields['Title'] || '',
      description: guide.fields['Description'] || '',
      downloadUrl: guide.fields['Download URL'] || '',
      coverImage: guide.fields['Book Cover']?.[0]?.url || '' // Extract URL from first attachment
    }));
  } catch (error) {
    console.error('Error fetching guides from Airtable:', error);
    // Return fallback data
    return fallbackGuides;
  }
};

// Get a specific guide by ID
export const getGuideById = async (id: string): Promise<Guide | undefined> => {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_BASE_URL || 'https://coordinated-living.vercel.app';
    const response = await fetch(`${baseUrl}/api/airtable/guides?id=${id}`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch guide');
    }
    
    const airtableGuide = await response.json();
    
    return {
      id: airtableGuide.id,
      title: airtableGuide.fields['Title'] || '',
      description: airtableGuide.fields['Description'] || '',
      downloadUrl: airtableGuide.fields['Download URL'] || '',
      coverImage: airtableGuide.fields['Book Cover']?.[0]?.url || ''
    };
  } catch (error) {
    console.error('Error fetching guide from Airtable:', error);
    // Return from fallback data
    return fallbackGuides.find(guide => guide.id === id);
  }
};

// Get guides count
export const getGuidesCount = async (): Promise<number> => {
  const guides = await getAllGuides();
  return guides.length;
};

// Synchronous version for backward compatibility (uses fallback data)
export const getAllGuidesSync = (): Guide[] => {
  return fallbackGuides;
};

export const getGuideByIdSync = (id: string): Guide | undefined => {
  return fallbackGuides.find(guide => guide.id === id);
};

export const getGuidesCountSync = (): number => {
  return fallbackGuides.length;
};
