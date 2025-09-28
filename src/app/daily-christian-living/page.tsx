import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Daily Christian Living & Personal Reflections | The Coordinated Living",
  description: "Explore guides for Christian living and personal daily reflections. Find practical wisdom and spiritual insights for your everyday Christian walk and personal growth.",
  keywords: [
    "guides for Christian living",
    "personal daily reflections",
    "daily Christian living",
    "Christian lifestyle",
    "daily devotions",
    "spiritual practices",
    "Christian walk"
  ],
  openGraph: {
    title: "Daily Christian Living & Personal Reflections | The Coordinated Living",
    description: "Explore guides for Christian living and personal daily reflections. Find practical wisdom and spiritual insights for your everyday Christian walk and personal growth.",
    type: "website",
  },
};

export default async function DailyChristianLivingPage() {
  const posts = await getAllPosts();
  
  // Filter posts related to daily Christian living and reflections
  const dailyLivingPosts = posts.filter(post => {
    const text = `${post.title} ${post.content || ''}`.toLowerCase();
    return text.includes('daily') || text.includes('reflection') || text.includes('guide') || 
           text.includes('living') || text.includes('practice') || text.includes('walk') ||
           text.includes('devotion') || text.includes('routine') || text.includes('habit');
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Amita, cursive' }}>
            Daily Christian Living & Personal Reflections
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore practical guides for Christian living and personal daily reflections. 
            Find wisdom, insights, and spiritual practices to strengthen your everyday Christian walk and deepen your relationship with God.
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
        {dailyLivingPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dailyLivingPosts.map((post) => (
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
                    {post.content ? post.content.substring(0, 120) + '...' : 'Read more about daily Christian living and personal reflections.'}
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
              href="/life-transitions"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Amita, cursive' }}>
                Life Transitions & Change
              </h3>
              <p className="text-gray-600 text-sm">
                Navigate life's challenges and embrace positive change
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
