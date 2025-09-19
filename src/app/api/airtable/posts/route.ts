import { NextRequest, NextResponse } from 'next/server';
import { fetchPosts, fetchPostById } from '@/lib/airtable';

// Cache for posts data (5 minutes)
let postsCache: any[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // If requesting a specific post by ID
    if (id) {
      const post = await fetchPostById(id);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    // Check cache first
    const now = Date.now();
    if (postsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json(postsCache);
    }

    // Fetch fresh data from Airtable
    const posts = await fetchPosts();
    
    // Update cache
    postsCache = posts;
    cacheTimestamp = now;

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    
    // Return fallback data if Airtable fails
    const fallbackPosts = [
      {
        id: '1',
        fields: {
          'Title': 'A THOUSAND TIMES I FAILED',
          'Left Content': '"A thousand times I failed, still your mercy remains, should I stumble out here still I\'m caught in your grace." This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today. For years, I pursued other paths, pouring tireless effort into fields he hadn\'t called me to, only to find no lasting fruit. That rollercoaster of emotions, the unpleasant experiences, the endless accusations and judgments thrown around – they\'re hallmarks of a mind out of alignment.',
          'Right Content': 'Want to know the root cause? It\'s simply a lack of trust in the Father. No matter how you rationalize it, we constantly try to force a fit where there isn\'t one. But in Christ, we step into the true identity the Father created for us. This identity comes with specific tasks, assignments, and responsibilities, all of which we are perfectly equipped for. It\'s there we discover an unexplainable peace, joy, and confidence.',
          'Bottom Right Content': 'When we align ourselves with God\'s purpose for our lives, we find a peace that surpasses all understanding. This isn\'t about perfection – it\'s about walking in the identity He has given us, trusting that He has equipped us for every good work.',
          'Published': true,
          'Order': 1
        }
      },
      {
        id: '2',
        fields: {
          'Title': 'IN ALL THINGS GOD WORKS',
          'Left Content': '"In all things God works for the good of those who love him." This promise from Romans 8:28 has been my anchor through many storms. When life seems chaotic and uncertain, this truth reminds me that God is always at work. Too often we try to control every aspect of our lives, forgetting that we serve a God who sees the bigger picture. Our limited perspective can\'t comprehend the intricate ways He weaves our experiences together for His glory and our good.',
          'Right Content': 'Trusting God doesn\'t mean we become passive or indifferent to our circumstances. Instead, it means we actively seek His will while resting in His sovereignty. We pray, we work, we serve, but we do so with open hands. The peace that comes from this kind of trust is unlike anything the world can offer. It\'s not dependent on circumstances, but on the unchanging character of our Heavenly Father who loves us beyond measure.',
          'Bottom Right Content': 'As we learn to trust God more deeply, we begin to see His hand in every detail of our lives. What once seemed like random events become part of a beautiful tapestry He\'s weaving for our good and His glory.',
          'Published': true,
          'Order': 2
        }
      },
      {
        id: '3',
        fields: {
          'Title': 'BE STILL AND KNOW',
          'Left Content': '"Be still and know that I am God." These words from Psalm 46:10 have become increasingly precious to me in our fast-paced world. In the midst of constant noise and endless demands, God calls us to stillness. Stillness isn\'t just about physical quiet, though that\'s important. It\'s about quieting our hearts and minds before the Lord, allowing His peace to wash over us and His voice to be heard above the chaos.',
          'Right Content': 'In those moments of stillness, we remember who God is and who we are in Him. We\'re reminded that He is sovereign, He is good, and He is working all things together for our good. The world tells us to hustle, to strive, to never stop moving. But God invites us to rest in Him, to find our strength in quietness and trust. This is the counter-cultural way of the Kingdom.',
          'Bottom Right Content': 'As we practice stillness, we discover that God\'s presence is our greatest treasure. In Him we find rest for our souls, peace for our minds, and strength for our journey.',
          'Published': true,
          'Order': 3
        }
      },
      {
        id: '4',
        fields: {
          'Title': 'A CHEERFUL GIFT',
          'Left Content': 'Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform.',
          'Right Content': 'Thank you for your kindness!',
          'Bottom Right Content': 'Your support makes a difference in keeping this platform running and sharing these messages of hope and encouragement.',
          'Published': true,
          'Order': 4
        }
      }
    ];

    return NextResponse.json(fallbackPosts);
  }
}
