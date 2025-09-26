// Centralized post data management
// Now fetches from Airtable API with fallback to hardcoded data

import { AirtablePost } from './airtable';

export interface Post {
  id: string;
  title: string;
  content: string; // Main content for right column
  images: Array<{
    src: string;
    alt: string;
  }>; // Array of 2 images for left column
  // Legacy fields for backward compatibility
  leftContent?: string;
  rightContent?: string;
  bottomRightContent?: string;
}

// Fallback data in case Airtable is unavailable
const fallbackPosts: Post[] = [
  {
    id: '1',
    title: 'A THOUSAND TIMES I FAILED',
    content: '"A thousand times I failed, still your mercy remains, should I stumble out here still I\'m caught in your grace." This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today. For years, I pursued other paths, pouring tireless effort into fields he hadn\'t called me to, only to find no lasting fruit. That rollercoaster of emotions, the unpleasant experiences, the endless accusations and judgments thrown around – they\'re hallmarks of a mind out of alignment. Want to know the root cause? It\'s simply a lack of trust in the Father. No matter how you rationalize it, we constantly try to force a fit where there isn\'t one. But in Christ, we step into the true identity the Father created for us. This identity comes with specific tasks, assignments, and responsibilities, all of which we are perfectly equipped for. It\'s there we discover an unexplainable peace, joy, and confidence. When we align ourselves with God\'s purpose for our lives, we find a peace that surpasses all understanding. This isn\'t about perfection – it\'s about walking in the identity He has given us, trusting that He has equipped us for every good work.',
    images: [],
    leftContent: '"A thousand times I failed, still your mercy remains, should I stumble out here still I\'m caught in your grace." This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today. For years, I pursued other paths, pouring tireless effort into fields he hadn\'t called me to, only to find no lasting fruit. That rollercoaster of emotions, the unpleasant experiences, the endless accusations and judgments thrown around – they\'re hallmarks of a mind out of alignment.',
    rightContent: 'Want to know the root cause? It\'s simply a lack of trust in the Father. No matter how you rationalize it, we constantly try to force a fit where there isn\'t one. But in Christ, we step into the true identity the Father created for us. This identity comes with specific tasks, assignments, and responsibilities, all of which we are perfectly equipped for. It\'s there we discover an unexplainable peace, joy, and confidence.',
    bottomRightContent: 'When we align ourselves with God\'s purpose for our lives, we find a peace that surpasses all understanding. This isn\'t about perfection – it\'s about walking in the identity He has given us, trusting that He has equipped us for every good work.'
  },
  {
    id: '2', 
    title: 'IN ALL THINGS GOD WORKS',
    content: '"In all things God works for the good of those who love him." This promise from Romans 8:28 has been my anchor through many storms. When life seems chaotic and uncertain, this truth reminds me that God is always at work. Too often we try to control every aspect of our lives, forgetting that we serve a God who sees the bigger picture. Our limited perspective can\'t comprehend the intricate ways He weaves our experiences together for His glory and our good. Trusting God doesn\'t mean we become passive or indifferent to our circumstances. Instead, it means we actively seek His will while resting in His sovereignty. We pray, we work, we serve, but we do so with open hands. The peace that comes from this kind of trust is unlike anything the world can offer. It\'s not dependent on circumstances, but on the unchanging character of our Heavenly Father who loves us beyond measure. As we learn to trust God more deeply, we begin to see His hand in every detail of our lives. What once seemed like random events become part of a beautiful tapestry He\'s weaving for our good and His glory.',
    images: [],
    leftContent: '"In all things God works for the good of those who love him." This promise from Romans 8:28 has been my anchor through many storms. When life seems chaotic and uncertain, this truth reminds me that God is always at work. Too often we try to control every aspect of our lives, forgetting that we serve a God who sees the bigger picture. Our limited perspective can\'t comprehend the intricate ways He weaves our experiences together for His glory and our good.',
    rightContent: 'Trusting God doesn\'t mean we become passive or indifferent to our circumstances. Instead, it means we actively seek His will while resting in His sovereignty. We pray, we work, we serve, but we do so with open hands. The peace that comes from this kind of trust is unlike anything the world can offer. It\'s not dependent on circumstances, but on the unchanging character of our Heavenly Father who loves us beyond measure.',
    bottomRightContent: 'As we learn to trust God more deeply, we begin to see His hand in every detail of our lives. What once seemed like random events become part of a beautiful tapestry He\'s weaving for our good and His glory.'
  },
  {
    id: '3',
    title: 'BE STILL AND KNOW', 
    content: '"Be still and know that I am God." These words from Psalm 46:10 have become increasingly precious to me in our fast-paced world. In the midst of constant noise and endless demands, God calls us to stillness. Stillness isn\'t just about physical quiet, though that\'s important. It\'s about quieting our hearts and minds before the Lord, allowing His peace to wash over us and His voice to be heard above the chaos. In those moments of stillness, we remember who God is and who we are in Him. We\'re reminded that He is sovereign, He is good, and He is working all things together for our good. The world tells us to hustle, to strive, to never stop moving. But God invites us to rest in Him, to find our strength in quietness and trust. This is the counter-cultural way of the Kingdom. As we practice stillness, we discover that God\'s presence is our greatest treasure. In Him we find rest for our souls, peace for our minds, and strength for our journey.',
    images: [],
    leftContent: '"Be still and know that I am God." These words from Psalm 46:10 have become increasingly precious to me in our fast-paced world. In the midst of constant noise and endless demands, God calls us to stillness. Stillness isn\'t just about physical quiet, though that\'s important. It\'s about quieting our hearts and minds before the Lord, allowing His peace to wash over us and His voice to be heard above the chaos.',
    rightContent: 'In those moments of stillness, we remember who God is and who we are in Him. We\'re reminded that He is sovereign, He is good, and He is working all things together for our good. The world tells us to hustle, to strive, to never stop moving. But God invites us to rest in Him, to find our strength in quietness and trust. This is the counter-cultural way of the Kingdom.',
    bottomRightContent: 'As we practice stillness, we discover that God\'s presence is our greatest treasure. In Him we find rest for our souls, peace for our minds, and strength for our journey.'
  },
  {
    id: '4',
    title: 'A CHEERFUL GIFT',
    content: 'Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform. Thank you for your kindness! Your support makes a difference in keeping this platform running and sharing these messages of hope and encouragement.',
    images: [],
    leftContent: 'Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform.',
    rightContent: 'Thank you for your kindness!',
    bottomRightContent: 'Your support makes a difference in keeping this platform running and sharing these messages of hope and encouragement.'
  }
];

// Fetch posts from Airtable API
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_BASE_URL || 'https://coordinated-living.vercel.app';
    const response = await fetch(`${baseUrl}/api/airtable/posts`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const airtablePosts = await response.json();
    
    // Transform Airtable data to our Post interface
    return airtablePosts.map((post: AirtablePost) => {
      // Combine Image 1 and Image 2 into images array
      const images = [];
      if (post.fields['Image 1'] && post.fields['Image 1'].length > 0) {
        images.push({
          src: post.fields['Image 1'][0].url,
          alt: 'Post image 1'
        });
      }
      if (post.fields['Image 2'] && post.fields['Image 2'].length > 0) {
        images.push({
          src: post.fields['Image 2'][0].url,
          alt: 'Post image 2'
        });
      }

      // Use the main Content field, with fallback to legacy fields
      let content = post.fields['Content'] || '';
      
      // If no main content, combine legacy fields
      if (!content) {
        const parts = [];
        if (post.fields['Left Content']) parts.push(post.fields['Left Content']);
        if (post.fields['Right Content']) parts.push(post.fields['Right Content']);
        if (post.fields['Bottom Right Content']) parts.push(post.fields['Bottom Right Content']);
        content = parts.join('\n\n');
      }

      return {
        id: post.id,
        title: post.fields['Title'] || '',
        content: content,
        images: images,
        // Legacy fields for backward compatibility
        leftContent: post.fields['Left Content'] || '',
        rightContent: post.fields['Right Content'] || '',
        bottomRightContent: post.fields['Bottom Right Content'] || ''
      };
    });
  } catch (error) {
    console.error('Error fetching posts from Airtable:', error);
    // Return fallback data
    return fallbackPosts;
  }
};

// Get a specific post by ID
export const getPostById = async (id: string): Promise<Post | undefined> => {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_BASE_URL || 'https://coordinated-living.vercel.app';
    const response = await fetch(`${baseUrl}/api/airtable/posts?id=${id}`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    const airtablePost = await response.json();
    
    // Check if we got an error response
    if (airtablePost.error) {
      throw new Error(airtablePost.error);
    }
    
    // Combine Image 1 and Image 2 into images array
    const images = [];
    if (airtablePost.fields['Image 1'] && airtablePost.fields['Image 1'].length > 0) {
      images.push({
        src: airtablePost.fields['Image 1'][0].url,
        alt: 'Post image 1'
      });
    }
    if (airtablePost.fields['Image 2'] && airtablePost.fields['Image 2'].length > 0) {
      images.push({
        src: airtablePost.fields['Image 2'][0].url,
        alt: 'Post image 2'
      });
    }

    // Use the main Content field, with fallback to legacy fields
    let content = airtablePost.fields['Content'] || '';
    
    // If no main content, combine legacy fields
    if (!content) {
      const parts = [];
      if (airtablePost.fields['Left Content']) parts.push(airtablePost.fields['Left Content']);
      if (airtablePost.fields['Right Content']) parts.push(airtablePost.fields['Right Content']);
      if (airtablePost.fields['Bottom Right Content']) parts.push(airtablePost.fields['Bottom Right Content']);
      content = parts.join('\n\n');
    }

    return {
      id: airtablePost.id,
      title: airtablePost.fields['Title'] || '',
      content: content,
      images: images,
      // Legacy fields for backward compatibility
      leftContent: airtablePost.fields['Left Content'] || '',
      rightContent: airtablePost.fields['Right Content'] || '',
      bottomRightContent: airtablePost.fields['Bottom Right Content'] || ''
    };
  } catch (error) {
    console.error('Error fetching post from Airtable:', error);
    // Return from fallback data
    return fallbackPosts.find(post => post.id === id);
  }
};

// Get posts count
export const getPostsCount = async (): Promise<number> => {
  const posts = await getAllPosts();
  return posts.length;
};

// Synchronous version for backward compatibility (uses fallback data)
export const getAllPostsSync = (): Post[] => {
  return fallbackPosts;
};

export const getPostByIdSync = (id: string): Post | undefined => {
  return fallbackPosts.find(post => post.id === id);
};

export const getPostsCountSync = (): number => {
  return fallbackPosts.length;
}; 