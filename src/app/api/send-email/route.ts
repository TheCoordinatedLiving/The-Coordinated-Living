import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Only POST requests allowed' }, { status: 405 });
  }

  try {
    const { userEmail, subject, message } = await request.json();
    console.log('userEmail', userEmail);
    console.log('subject', subject);
    console.log('message', message);

    // Validate required fields
    if (!userEmail || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: userEmail, subject, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable');
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // const fromAddress = 'send@thecoordinatedliving.com'


    console.log('Sending email via Resend...');
    const { data, error } = await resend.emails.send({
      from: 'dev@thecoordinatedliving.com',
      to: ['letstalk@thecoordinatedliving.com'],// ['dev@thecoordinatedliving.com', 'ohenegyan159@gmail.com'] 
      replyTo: userEmail,
    
      subject: subject || 'New Message from Ask Me A Question',
      text: `New message from Ask Me A Question:\n\nFrom: ${userEmail}\nSubject: ${subject}\nMessage:\n${message}\n\n---\nThis message was sent from the Coordinated Living website.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5C3262;">New Message from Ask Me A Question</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${userEmail}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #5C3262; white-space: pre-wrap;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was sent from the Coordinated Living website.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend send error:', error);
      return NextResponse.json(
        { success: false, error: (error as Error)?.message || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: data?.id,
    });
  } catch (error) {
    console.error('Email error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email authentication failed - check app password';
      } else if (error.message.includes('quota')) {
        errorMessage = 'Email quota exceeded';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Email service timeout';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
} 