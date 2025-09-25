import PostPageClient from './PostPageClient';
import { getPostById } from '@/lib/posts';

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