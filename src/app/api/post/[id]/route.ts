import { NextRequest, NextResponse } from 'next/server';
import { getPostById, getAllPosts } from '@/lib/posts';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  const post = getPostById(id);
  
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  
  return NextResponse.json(post);
}

// Add an endpoint to get all posts (useful for the PostsContent component)
export async function POST(request: NextRequest) {
  const posts = getAllPosts();
  return NextResponse.json({ posts });
} 