import { notFound } from 'next/navigation';
import { getAllPosts } from '@/lib/posts';
import PostTemplate from '@/components/PostTemplate';
import SharedPostProtection from '@/components/SharedPostProtection';
import Link from 'next/link';

interface SharePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params;
  
  try {
    const posts = await getAllPosts();
    const post = posts.find(p => p.id === id);
    
    if (!post) {
      notFound();
    }

    return (
      <>
        <SharedPostProtection />
        <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-16">
          <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Amita, serif' }}>
              A Gift of Grace
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Someone has shared this inspiring message with you
            </p>
          </div>

          {/* Post Template */}
          <div className="mb-8">
            <PostTemplate
              title={post.title}
              content={post.content}
              images={post.images}
              isShared={true}
            />
          </div>

          {/* View More Button */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-block px-8 py-4 text-white font-semibold rounded-full hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#2F4C6C' }}
            >
              Discover More
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <a 
                  href="mailto:letstalk@thecoordinatedliving.com"
                  className="text-black hover:text-gray-700 transition-colors"
                >
                  letstalk@thecoordinatedliving.com
                </a>
                <a 
                  href="https://thecoordinatedliving.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700 transition-colors"
                >
                  thecoordinatedliving.com
                </a>
              </div>
              <p className="text-gray-400 text-xs">
                Powered by <span className="font-semibold text-blue-600">Coordinated Living</span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SharePageProps) {
  const { id } = await params;
  
  try {
    const posts = await getAllPosts();
    const post = posts.find(p => p.id === id);
    
    if (!post) {
      return {
        title: 'Post Not Found - Coordinated Living',
        description: 'The requested post could not be found.',
      };
    }

    return {
      title: `${post.title} - A Gift of Grace | Coordinated Living`,
      description: `Someone has shared this inspiring message with you. Discover more blessings at Coordinated Living.`,
      openGraph: {
        title: `${post.title} - A Gift of Grace`,
        description: `Someone has shared this inspiring message with you.`,
        type: 'article',
        images: [
          {
            url: '/coordinated-new.webp',
            width: 1200,
            height: 630,
            alt: 'Coordinated Living - A Gift of Grace',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${post.title} - A Gift of Grace`,
        description: `Someone has shared this inspiring message with you.`,
        images: ['/coordinated-new.webp'],
      },
    };
  } catch {
    return {
      title: 'A Gift of Grace - Coordinated Living',
      description: 'Discover inspiring content and biblical insights.',
      openGraph: {
        title: 'A Gift of Grace - Coordinated Living',
        description: 'Discover inspiring content and biblical insights.',
        type: 'article',
        images: [
          {
            url: '/coordinated-new.webp',
            width: 1200,
            height: 630,
            alt: 'Coordinated Living - A Gift of Grace',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'A Gift of Grace - Coordinated Living',
        description: 'Discover inspiring content and biblical insights.',
        images: ['/coordinated-new.webp'],
      },
    };
  }
}
