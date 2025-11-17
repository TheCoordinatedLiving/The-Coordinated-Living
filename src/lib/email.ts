import { Resend } from 'resend';

/**
 * Send a donation confirmation email to the donor
 */
export async function sendDonationConfirmationEmail(
  donorEmail: string,
  donationAmount: number,
  currency: string = 'GHS',
  transactionReference?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable');
      return {
        success: false,
        error: 'Email service not configured',
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Format amount with currency
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(donationAmount);

    // Email subject
    const subject = 'Thank You for Pouring Into My Cup - The Coordinated Living';

    // HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              Hello there,
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              I wanted to send this quick, personal note because I am grateful for your decision to pour into my cup.
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Your support is a blessing that sustains The Coordinated Living. More than just the funds, it's what keeps this platform up and active. It enables me to keep sharing the guides, posts, and personal insights designed to help others find peace and confidence in their walk with the Lord.
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Thank you for joining me on this journey. I look forward to serving you with meaningful resources in the weeks ahead, and I am praying for you.
            </p>
            
            <p style="font-size: 16px; margin-top: 30px; margin-bottom: 10px;">
              With warmth and blessings,
            </p>
            
            <p style="font-size: 16px; margin-bottom: 5px;">
              <strong>Lesley</strong>
            </p>
            
            <p style="font-size: 16px; margin-bottom: 30px;">
              <a href="https://www.thecoordinatedliving.com/" style="color: #5C3262; text-decoration: none;">The Coordinated Living</a>
            </p>
            
            ${transactionReference ? `
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 30px; border-left: 4px solid #5C3262;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                <strong>Transaction Reference:</strong><br>
                <span style="font-family: monospace; color: #333; font-size: 11px;">${transactionReference}</span>
              </p>
            </div>
            ` : ''}
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px;">
            <p style="margin: 0;">
              This is an automated confirmation email. Please do not reply to this message.<br>
              For inquiries, contact us at <a href="mailto:letstalk@thecoordinatedliving.com" style="color: #5C3262;">letstalk@thecoordinatedliving.com</a>
            </p>
          </div>
        </body>
      </html>
    `;

    // Plain text version
    const textContent = `
Hello there,

I wanted to send this quick, personal note because I am grateful for your decision to pour into my cup.

Your support is a blessing that sustains The Coordinated Living. More than just the funds, it's what keeps this platform up and active. It enables me to keep sharing the guides, posts, and personal insights designed to help others find peace and confidence in their walk with the Lord.

Thank you for joining me on this journey. I look forward to serving you with meaningful resources in the weeks ahead, and I am praying for you.

With warmth and blessings,

Lesley

The Coordinated Living
https://www.thecoordinatedliving.com/

${transactionReference ? `\nTransaction Reference: ${transactionReference}\n` : ''}
---
This is an automated confirmation email. Please do not reply to this message.
For inquiries, contact us at letstalk@thecoordinatedliving.com
    `;

    // Send email via Resend
    console.log('Attempting to send donation confirmation email to:', donorEmail);
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
    
    const { data, error } = await resend.emails.send({
      from: 'The Coordinated Living <letstalk@thecoordinatedliving.com>',
      to: [donorEmail],
      subject: subject,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Resend email error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return {
        success: false,
        error: error.message || JSON.stringify(error) || 'Failed to send email',
      };
    }

    console.log('Donation confirmation email sent successfully!');
    console.log('Email message ID:', data?.id);
    console.log('Email sent to:', donorEmail);
    return {
      success: true,
      messageId: data?.id,
    };
  } catch (error) {
    console.error('Error sending donation confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

