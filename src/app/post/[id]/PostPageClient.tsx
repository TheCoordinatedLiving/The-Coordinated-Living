"use client";
import PostTemplate from '@/components/PostTemplate';

interface Post {
  id: string;
  title: string;
  leftContent: string;
  rightContent: string;
  bottomRightContent: string;
}

interface PostPageClientProps {
  post: Post;
}

export default function PostPageClient({ post }: PostPageClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back to Experience Button */}
        <div className="mb-8 flex justify-start">
          <button 
            onClick={() => window.location.href = '/'}
            className="text-white px-6 py-3 rounded-full hover:opacity-90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            style={{ fontFamily: 'Amita, serif', backgroundColor: '#5C3C6E' }}
          >
            <span>Back to Experience</span>
          </button>
        </div>
        
        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <PostTemplate
            title={post.title}
            leftContent={<p className="text-base leading-relaxed text-black">{post.leftContent}</p>}
            rightContent={<p className="text-base leading-relaxed text-black">{post.rightContent}</p>}
            bottomRightContent={<p className="text-base leading-relaxed text-black">{post.bottomRightContent}</p>}
          />
        </div>
        

      </div>
    </div>
  );
} 