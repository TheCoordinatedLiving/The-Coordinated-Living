import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Extract the file name from the path
  // e.g., /.well-known/apple-developer-merchantid-domain-association
  const fileName = pathname.split('/.well-known/')[1];
  
  if (!fileName) {
    return new NextResponse('Not Found', { status: 404 });
  }
  
  try {
    // Construct the file path
    const filePath = join(process.cwd(), 'src/app/.well-known', fileName);
    
    // Read the file content
    const fileContent = await readFile(filePath, 'utf-8');
    
    // Set appropriate content type based on file extension
    let contentType = 'text/plain';
    if (fileName.endsWith('.json')) {
      contentType = 'application/json';
    } else if (fileName.endsWith('.txt')) {
      contentType = 'text/plain';
    }
    
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error reading .well-known file:', error);
    return new NextResponse('Not Found', { status: 404 });
  }
}
