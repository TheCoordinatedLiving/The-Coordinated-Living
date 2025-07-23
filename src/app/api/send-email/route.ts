import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Only POST requests allowed' }, { status: 405 });
  }

  try {
    const { userEmail, subject, message } = await request.json();



    // Validate required fields
    if (!userEmail || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: userEmail, subject, message' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Ask Me A Question" <${process.env.EMAIL_USER}>`,
      to: 'letstalk@thecoordinatedliving.com',
      replyTo: userEmail,
      subject: subject || 'New Message from Ask Me A Question',
      text: `
New message from Ask Me A Question:

From: ${userEmail}
Subject: ${subject}
Message:
${message}

---
This message was sent from the Coordinated Living website.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5C3262;">New Message from Ask Me A Question</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${userEmail}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #5C3262;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was sent from the Coordinated Living website.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 