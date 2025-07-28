"use client";
import { useEffect, useState } from 'react';
import PostTemplate from '@/components/PostTemplate';
import { getPostById } from '@/lib/posts';

interface Post {
  id: string;
  title: string;
  leftContent: string;
  rightContent: string;
  bottomRightContent: string;
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Await the params to get the id
        const { id } = await params;
        
        // Use the centralized posts data instead of API
        const postData = getPostById(id);
        if (postData) {
          setPost(postData);
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Post not found</div>
      </div>
    );
  }

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