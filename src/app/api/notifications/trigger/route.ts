import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the trigger data (optional)
    const body = await request.json().catch(() => ({}));
    const { type = 'manual', source = 'unknown' } = body;

    console.log(`🔔 Manual notification trigger: ${type} from ${source}`);

    // Call the check-new-content endpoint
    const checkResponse = await fetch(`${request.nextUrl.origin}/api/notifications/check-new-content`, {
      method: 'GET'
    });

    const result = await checkResponse.json();

    if (!checkResponse.ok) {
      throw new Error(result.error || 'Failed to check for new content');
    }

    return NextResponse.json({
      message: 'Notification trigger processed',
      trigger: { type, source },
      result
    });

  } catch (error: unknown) {
    console.error('❌ Error triggering notifications:', error);
    return NextResponse.json(
      { error: 'Failed to trigger notifications', details: error.message },
      { status: 500 }
    );
  }
}

// Allow GET requests for simple triggers
export async function GET(request: NextRequest) {
  return POST(request);
}
