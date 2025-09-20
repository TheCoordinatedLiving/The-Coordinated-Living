import { NextRequest, NextResponse } from 'next/server';
import { fetchGuides, fetchGuideById, AirtableGuide } from '@/lib/airtable';

export const dynamic = 'force-dynamic';

// Cache for guides data (5 minutes)
let guidesCache: AirtableGuide[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // If requesting a specific guide by ID
    if (id) {
      const guide = await fetchGuideById(id);
      if (!guide) {
        return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
      }
      return NextResponse.json(guide);
    }

    // Check cache first
    const now = Date.now();
    if (guidesCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json(guidesCache);
    }

    // Fetch fresh data from Airtable
    const guides = await fetchGuides();
    
    // Update cache
    guidesCache = guides;
    cacheTimestamp = now;

    return NextResponse.json(guides);
  } catch (error) {
    console.error('Error fetching guides:', error);
    
    // Return fallback data if Airtable fails
    const fallbackGuides = [
      {
        id: '1',
        fields: {
          'Title': 'Guide 1',
          'Description': 'Brief description of the first guide content and what it covers',
          'Content': 'Detailed content for Guide 1...',
          'Published': true,
          'Order': 1
        }
      },
      {
        id: '2',
        fields: {
          'Title': 'Guide 2',
          'Description': 'Brief description of the second guide content and what it covers',
          'Content': 'Detailed content for Guide 2...',
          'Published': true,
          'Order': 2
        }
      },
      {
        id: '3',
        fields: {
          'Title': 'Guide 3',
          'Description': 'Brief description of the third guide content and what it covers',
          'Content': 'Detailed content for Guide 3...',
          'Published': true,
          'Order': 3
        }
      },
      {
        id: '4',
        fields: {
          'Title': 'Guide 4',
          'Description': 'Brief description of the fourth guide content and what it covers',
          'Content': 'Detailed content for Guide 4...',
          'Published': true,
          'Order': 4
        }
      }
    ];

    return NextResponse.json(fallbackGuides);
  }
}
