import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { testEmail } = await request.json();

    if (!testEmail) {
      return NextResponse.json({ error: 'Test email address required' }, { status: 400 });
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Coordinated Living Test" <${process.env.EMAIL_USER}>`,
      to: testEmail,
      subject: 'Test Email from Coordinated Living',
      text: `
This is a test email from the Coordinated Living website.

If you receive this email, it means:
1. The Gmail app password is working correctly
2. The email service is configured properly
3. Emails can be sent from the server

Timestamp: ${new Date().toISOString()}

---
This is a test message.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5C3262;">Test Email from Coordinated Living</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>This is a test email from the Coordinated Living website.</p>
            <p><strong>If you receive this email, it means:</strong></p>
            <ul>
              <li>The Gmail app password is working correctly</li>
              <li>The email service is configured properly</li>
              <li>Emails can be sent from the server</li>
            </ul>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is a test message.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      messageId: result.messageId,
      to: testEmail
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to send test email' },
      { status: 500 }
    );
  }
} 