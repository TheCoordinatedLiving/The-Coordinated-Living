import { Resend } from 'resend';

/**
 * Send a donation confirmation email to the donor
 */
export async function sendDonationConfirmationEmail(
  donorEmail: string,
  _donationAmount: number, // Not used in template but kept for API consistency
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _currency: string = 'GHS', // Not used in template but kept for API consistency
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

    // Email subject
    const subject = 'Thank You for Pouring Into My Cup - The Coordinated Living';

    // Get base URL for logo (use environment variable or default)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thecoordinatedliving.com';
    const logoUrl = `${baseUrl}/email-temp-logo.png`;

    // HTML email template - Gmail compatible with wrapper table for background color
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
          <!-- Outer wrapper table for Gmail compatibility -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #5D3D6E; margin: 0; padding: 0;">
            <tr>
              <td align="center" style="padding: 0;">
                <!-- Inner content table -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #5D3D6E; max-width: 600px; width: 100%;">
                  <tr>
                    <td align="left" style="padding: 40px 40px 30px 40px; background-color: #5D3D6E;">
                      <!-- Logo -->
                      <img src="${logoUrl}" alt="The Coordinated Living" style="max-width: 200px; height: auto; display: block;" />
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="padding: 0 40px 30px 40px; background-color: #5D3D6E;">
                      <!-- Main Content -->
                      <div style="color: #ffffff; text-align: left;">
                        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 20px 0; color: #ffffff;">
                          Hello there,
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 20px 0; color: #ffffff;">
                          I wanted to send this quick, personal note because I am grateful for your decision to pour into my cup.
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 20px 0; color: #ffffff;">
                          Your support is a blessing that sustains The Coordinated Living. More than just the funds, it's what keeps this platform up and active. It enables me to keep sharing the guides, posts, and personal insights designed to help others find peace and confidence in their walk with the Lord.
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 20px 0; color: #ffffff;">
                          Thank you for joining me on this journey. I look forward to serving you with meaningful resources in the weeks ahead, and I am praying for you.
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.8; margin: 30px 0 10px 0; color: #ffffff;">
                          With warmth and blessings,
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 30px 0; color: #ffffff; font-family: 'Brush Script MT', cursive, serif;">
                          Lesley
                        </p>
                        
                        ${transactionReference ? `
                        <p style="font-size: 14px; line-height: 1.8; margin: 30px 0 0 0; color: #ffffff; font-weight: bold;">
                          Transaction Reference: ${transactionReference}
                        </p>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 30px 40px 20px 40px; background-color: #5D3D6E;">
                      <!-- White Line Separator -->
                      <div style="border-top: 1px solid #ffffff; width: 100%; margin: 0 auto;"></div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 0 40px 40px 40px; background-color: #5D3D6E;">
                      <!-- Footer Links -->
                      <div style="text-align: center; color: #ffffff; font-size: 14px; line-height: 1.8;">
                        <p style="margin: 0 0 5px 0; color: #ffffff;">
                          <a href="mailto:letstalk@thecoordinatedliving.com" style="color: #ffffff; text-decoration: none;">letstalk@thecoordinatedliving.com</a>
                        </p>
                        <p style="margin: 0; color: #ffffff;">
                          <a href="https://www.thecoordinatedliving.com" style="color: #ffffff; text-decoration: none;">www.thecoordinatedliving.com</a>
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
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

