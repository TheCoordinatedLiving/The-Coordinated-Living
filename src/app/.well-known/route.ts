import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    // Read the .well-known directory from public folder
    const wellKnownPath = join(process.cwd(), 'public/.well-known');
    const files = await readdir(wellKnownPath);
    
    // Create a simple HTML response listing the files
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>.well-known Directory</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; }
            ul { list-style-type: none; padding: 0; }
            li { margin: 10px 0; }
            a { color: #0066cc; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>.well-known Directory</h1>
          <p>Available files:</p>
          <ul>
            ${files.map(file => `<li><a href="/.well-known/${file}">${file}</a></li>`).join('')}
          </ul>
        </body>
      </html>
    `;
    
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error reading .well-known directory:', error);
    return new NextResponse('Directory not found', { status: 404 });
  }
}
