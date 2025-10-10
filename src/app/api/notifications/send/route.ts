import { NextRequest, NextResponse } from 'next/server';
import { sendNotification } from '@/lib/onesignal';

export async function POST(request: NextRequest) {
  try {
    const { title, body, url, type } = await request.json();

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
      url || 'https://www.thecoordinatedliving.com'
    );

    console.log('OneSignal notification sent:', result);

    return NextResponse.json({
      success: true,
      message: 'Notification sent via OneSignal',
      stats: {
        total: result.recipients || 0,
        successful: result.recipients || 0,
        failed: 0
      },
      result: result
    });

  } catch (error: unknown) {
    console.error('Error sending OneSignal notification:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send OneSignal notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Test endpoint to send a sample notification
export async function GET() {
  try {
    const result = await sendNotification(
      'Test Notification from Coordinated Living! 🎉',
      'This is a test notification to verify OneSignal is working properly.',
      'https://www.thecoordinatedliving.com'
    );

    return NextResponse.json({
      success: true,
      message: 'Test notification sent via OneSignal',
      result: result
    });

  } catch (error: unknown) {
    console.error('Error sending OneSignal test notification:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send OneSignal test notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
