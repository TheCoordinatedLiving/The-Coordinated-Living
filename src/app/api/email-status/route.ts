import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables
    const hasEmailUser = !!process.env.EMAIL_USER;
    const hasEmailPass = !!process.env.EMAIL_PASS;
    
    // Check if email credentials are configured
    const isConfigured = hasEmailUser && hasEmailPass;
    
    return NextResponse.json({
      status: 'ok',
      emailConfigured: isConfigured,
      emailUser: hasEmailUser ? `${process.env.EMAIL_USER?.substring(0, 3)}***@gmail.com` : 'Not set',
      emailPass: hasEmailPass ? 'Configured' : 'Not set',
      timestamp: new Date().toISOString(),
      serverTime: new Date().toLocaleString(),
      recommendations: isConfigured ? [
        'Check spam/junk folder for emails',
        'Verify recipient email address is correct',
        'Wait up to 24 hours for delivery',
        'Ask recipient to whitelist ohenegyan159@gmail.com'
      ] : [
        'Set EMAIL_USER and EMAIL_PASS environment variables',
        'Generate a new Gmail app password if needed'
      ]
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 