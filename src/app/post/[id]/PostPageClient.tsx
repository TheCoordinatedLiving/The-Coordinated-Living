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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <PostTemplate
          title={post.title}
          leftContent={<p className="text-base leading-relaxed text-black">{post.leftContent}</p>}
          rightContent={<p className="text-base leading-relaxed text-black">{post.rightContent}</p>}
          bottomRightContent={<p className="text-base leading-relaxed text-black">{post.bottomRightContent}</p>}
        />
      </div>
    </div>
  );
} 