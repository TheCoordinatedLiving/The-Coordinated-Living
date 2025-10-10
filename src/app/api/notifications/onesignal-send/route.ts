import { NextRequest, NextResponse } from 'next/server';
import { sendNotification } from '@/lib/onesignal';

export async function POST(request: NextRequest) {
  try {
    const { title, body, url, userIds } = await request.json();

    if (!title || !body) {
      return NextResponse.json(
        { error: 'Title and body are required' },
        { status: 400 }
      );
    }

    // Send notification via OneSignal
    const result = await sendNotification(
      title,
      body,
      url || 'https://www.thecoordinatedliving.com',
      userIds // Optional: send to specific users
    );

    console.log('OneSignal content notification sent:', result);

    return NextResponse.json({
      success: true,
      message: 'Content notification sent via OneSignal',
      stats: {
        total: result.recipients || 0,
        successful: result.recipients || 0,
        failed: 0
      },
      result: result
    });

  } catch (error: unknown) {
    console.error('Error sending OneSignal content notification:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send OneSignal content notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  try {
    const result = await sendNotification(
      'New Content Available! 📚',
      'Check out the latest posts and guides on Coordinated Living.',
      'https://www.thecoordinatedliving.com'
    );

    return NextResponse.json({
      success: true,
      message: 'Sample content notification sent via OneSignal',
      result: result
    });

  } catch (error: unknown) {
    console.error('Error sending sample OneSignal content notification:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send sample OneSignal content notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
