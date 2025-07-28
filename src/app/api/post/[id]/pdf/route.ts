import { NextRequest, NextResponse } from 'next/server';

// Mock post data - in a real app, this would come from a database
const posts = [
  {
    id: '1',
    title: 'POST TITLE HERE',
    leftContent: 'Content for left side...',
    rightContent: 'Content for right side...',
    bottomRightContent: 'Content for bottom right...'
  },
  {
    id: '2', 
    title: 'SECOND POST TITLE',
    leftContent: 'Content for left side...',
    rightContent: 'Content for right side...',
    bottomRightContent: 'Content for bottom right...'
  },
  {
    id: '3',
    title: 'THIRD POST TITLE', 
    leftContent: 'Content for left side...',
    rightContent: 'Content for right side...',
    bottomRightContent: 'Content for bottom right...'
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  
  // For now, redirect to a PDF view page
  // In a real implementation, you would generate PDF using libraries like puppeteer or jsPDF
  const pdfUrl = `/post/${id}/pdf-view`;
  
  return NextResponse.redirect(new URL(pdfUrl, request.url));
} 