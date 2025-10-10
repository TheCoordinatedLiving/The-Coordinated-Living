import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, body, url } = await request.json();

    // Default test notification
    const notificationData = {
      title: title || 'Test Notification',
      body: body || 'This is a test notification from Coordinated Living',
      url: url || '/',
      type: 'test'
    };

    // Send notification
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
      throw new Error(`Failed to send test notification: ${response.statusText}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Test notification sent successfully',
      data: result
    });

  } catch (error) {
    console.error('Error sending test notification:', error);
    return NextResponse.json(
      { error: 'Failed to send test notification' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Send a simple test notification
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notifications/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Notification',
        body: 'This is a test notification from Coordinated Living',
        url: '/',
        type: 'test'
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send test notification: ${response.statusText}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Test notification sent successfully',
      data: result
    });

  } catch (error) {
    console.error('Error sending test notification:', error);
    return NextResponse.json(
      { error: 'Failed to send test notification' },
      { status: 500 }
    );
  }
}
