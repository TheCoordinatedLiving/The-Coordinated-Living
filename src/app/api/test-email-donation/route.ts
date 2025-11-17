import { NextRequest, NextResponse } from 'next/server';
import { sendDonationConfirmationEmail } from '@/lib/email';

/**
 * Test endpoint to send a donation confirmation email
 * This helps debug email sending issues
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email = 'ohenegyan159@gmail.com', amount = 100 } = body;

    // Check if RESEND_API_KEY is configured
    const hasResendKey = !!process.env.RESEND_API_KEY;
    const resendKeyLength = process.env.RESEND_API_KEY?.length || 0;

    console.log('=== Email Test Debug Info ===');
    console.log('Target email:', email);
    console.log('RESEND_API_KEY exists:', hasResendKey);
    console.log('RESEND_API_KEY length:', resendKeyLength);
    console.log('RESEND_API_KEY preview:', process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` : 'NOT SET');

    if (!hasResendKey) {
      return NextResponse.json({
        success: false,
        error: 'RESEND_API_KEY is not configured',
        debug: {
          hasResendKey: false,
          message: 'Please add RESEND_API_KEY to your .env.local file and restart the server',
        },
      }, { status: 500 });
    }

    // Try to send the email
    const result = await sendDonationConfirmationEmail(
      email,
      amount,
      'GHS',
      'TEST_REFERENCE_' + Date.now()
    );

    return NextResponse.json({
      success: result.success,
      messageId: result.messageId,
      error: result.error,
      debug: {
        hasResendKey: true,
        resendKeyLength,
        email,
        amount,
      },
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        errorType: error instanceof Error ? error.constructor.name : typeof error,
      },
    }, { status: 500 });
  }
}

