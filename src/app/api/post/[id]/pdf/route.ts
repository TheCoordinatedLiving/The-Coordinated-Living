import { NextRequest, NextResponse } from 'next/server';
import { getPostById } from '@/lib/posts';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  const post = getPostById(id);
  
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  
  // For now, redirect to a PDF view page
  // In a real implementation, you would generate PDF using libraries like puppeteer or jsPDF
  const pdfUrl = `/post/${id}/pdf-view`;
  
  return NextResponse.redirect(new URL(pdfUrl, request.url));
} 