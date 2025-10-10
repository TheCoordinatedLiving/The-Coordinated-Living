import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This is a simple test endpoint that doesn't use push notifications
    // It just returns a success message to test the API
    
    return NextResponse.json({
      success: true,
      message: 'Simple notification test endpoint working',
      timestamp: new Date().toISOString(),
      note: 'This endpoint is for testing API connectivity only'
    });

  } catch (error) {
    console.error('Error in simple test endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to test simple endpoint' },
      { status: 500 }
    );
  }
}
