import PostPageClient from './PostPageClient';
import { getPostById } from '@/lib/posts';
import { Metadata } from 'next';

// SEO keyword mapping for content categorization
const getKeywordGroup = (title: string, content: string): string => {
  const text = `${title} ${content}`.toLowerCase();
  
  // Spiritual Growth & Relationship with God
  if (text.includes('god') || text.includes('faith') || text.includes('prayer') || text.includes('bible') || text.includes('christian')) {
    return 'Spiritual Growth & Christian Living';
  }
  
  // Life Purpose & Fulfillment
  if (text.includes('purpose') || text.includes('fulfillment') || text.includes('meaning') || text.includes('calling')) {
    return 'Finding Purpose & Fulfillment';
  }
  
  // Life Transitions & Change
  if (text.includes('change') || text.includes('transition') || text.includes('challenge') || text.includes('struggle') || text.includes('generation')) {
    return 'Life Transitions & Change';
  }
  
  // Daily Christian Living
  if (text.includes('daily') || text.includes('reflection') || text.includes('guide') || text.includes('living')) {
    return 'Daily Christian Living';
  }
  
  return 'Christian Living & Spiritual Growth';
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);
  
  if (!post) {
    return {
      title: 'Post Not Found | The Coordinated Living',
      description: 'The requested post could not be found. Explore our collection of Christian living guides and spiritual growth content.',
    };
  }
  
  const keywordGroup = getKeywordGroup(post.title, post.content || '');
  const metaDescription = post.content 
    ? `${post.content.substring(0, 155)}...` 
    : `Discover insights on ${keywordGroup.toLowerCase()} through this inspiring post.`;
  
  return {
    title: `${post.title} | ${keywordGroup} - The Coordinated Living`,
    description: metaDescription,
    keywords: [
      'Christian living',
      'spiritual growth',
      'finding purpose',
      'life fulfillment',
      'daily reflections',
      'faith-based guidance',
      'Christian lifestyle',
      'spiritual development'
    ],
    openGraph: {
      title: `${post.title} | The Coordinated Living`,
      description: metaDescription,
      type: 'article',
      publishedTime: new Date().toISOString(),
      authors: ['The Coordinated Living'],
      tags: [keywordGroup],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | The Coordinated Living`,
      description: metaDescription,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <div className="text-2xl font-bold text-gray-800 mb-4">Post not found</div>
          <div className="text-gray-600 mb-6">
            This post may not be published or may have been removed.
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-white px-6 py-3 rounded-full hover:opacity-90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            style={{ fontFamily: 'Amita, serif', backgroundColor: '#5C3C6E' }}
          >
            Visit Website for Full Experience
          </button>
        </div>
      </div>
    );
  }

  return <PostPageClient post={post} />;
} 