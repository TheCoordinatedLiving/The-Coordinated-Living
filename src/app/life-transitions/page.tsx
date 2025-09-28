import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Life Transitions & Change | The Coordinated Living",
  description: "Learn how to navigate life's struggles, embrace changing scenes of life, and break generational cycles through faith. Find strength and guidance for life's transitions.",
  keywords: [
    "changing scenes of life",
    "breaking generational cycles through faith",
    "navigating life's struggles",
    "life transitions",
    "life changes",
    "overcoming challenges",
    "generational healing"
  ],
  openGraph: {
    title: "Life Transitions & Change | The Coordinated Living",
    description: "Learn how to navigate life's struggles, embrace changing scenes of life, and break generational cycles through faith. Find strength and guidance for life's transitions.",
    type: "website",
  },
};

export default async function LifeTransitionsPage() {
  const posts = await getAllPosts();
  
  // Filter posts related to life transitions and change
  const transitionPosts = posts.filter(post => {
    const text = `${post.title} ${post.content || ''}`.toLowerCase();
    return text.includes('change') || text.includes('transition') || text.includes('challenge') || 
           text.includes('struggle') || text.includes('generation') || text.includes('cycle') ||
           text.includes('overcome') || text.includes('transform') || text.includes('healing');
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Amita, cursive' }}>
            Life Transitions & Change
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn how to navigate life&apos;s struggles, embrace changing scenes of life, and break generational cycles through faith. 
            Find strength, guidance, and hope for life&apos;s most challenging transitions.
          </p>
        </div>

        {/* Back to Home */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-[#5C3C6E] hover:text-[#4A2F5A] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Posts Grid */}
        {transitionPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transitionPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/post/${post.id}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                  <Image
                    src={post.images?.[0]?.src || "/guides-bottomsheet.png"}
                    alt={post.images?.[0]?.alt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#5C3C6E] transition-colors" style={{ fontFamily: 'Amita, cursive' }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.content ? post.content.substring(0, 120) + '...' : 'Read more about navigating life transitions and embracing change.'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts available in this category yet. Check back soon!</p>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center" style={{ fontFamily: 'Amita, cursive' }}>
            Explore More Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/spiritual-growth"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Amita, cursive' }}>
                Spiritual Growth & Christian Living
              </h3>
              <p className="text-gray-600 text-sm">
                Grow closer to God and strengthen your faith journey
              </p>
            </Link>
            
            <Link 
              href="/life-purpose"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Amita, cursive' }}>
                Finding Purpose & Fulfillment
              </h3>
              <p className="text-gray-600 text-sm">
                Discover your calling and find fulfillment in life's journey
              </p>
            </Link>
            
            <Link 
              href="/daily-christian-living"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Amita, cursive' }}>
                Daily Christian Living
              </h3>
              <p className="text-gray-600 text-sm">
                Practical guides and daily reflections for Christian life
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
