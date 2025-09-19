import PostPageClient from './PostPageClient';
import { getPostById } from '@/lib/posts';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Post not found</div>
      </div>
    );
  }

  return <PostPageClient post={post} />;
} 