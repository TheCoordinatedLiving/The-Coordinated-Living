import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateDonation, DonationInputData } from '@/lib/airtable';
import { sendDonationConfirmationEmail } from '@/lib/email';

interface TestDonationResult {
  scenario: string;
  success: boolean;
  donationData: DonationInputData;
  donationRecord?: { id: string; fields: Record<string, unknown> };
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { scenario, count = 1, testEmail } = body;

    if (!scenario) {
      return NextResponse.json(
        { status: false, message: 'Scenario is required' },
        { status: 400 }
      );
    }

    const results: TestDonationResult[] = [];
    const errors: Array<{ scenario: string; donationData: DonationInputData; error: string }> = [];

    // Generate test donation data based on scenario
    for (let i = 0; i < count; i++) {
      const timestamp = Date.now();
      const randomId = Math.floor(Math.random() * 10000);
      
      let donationData: DonationInputData;

      switch (scenario) {
        case 'with_email':
          donationData = {
            'Email': testEmail || `test.donor.${timestamp}.${randomId}@example.com`, // Use testEmail if provided
            'Phone Number': undefined,
            'Amount': 50 + Math.floor(Math.random() * 500), // Random amount between 50 and 550
            'payment': `TEST_DONATION_${timestamp}_${randomId}`,
          };
          break;

        case 'with_phone':
          donationData = {
            'Email': undefined,
            'Phone Number': `+233${Math.floor(200000000 + Math.random() * 800000000)}`, // Ghana phone number format
            'Amount': 25 + Math.floor(Math.random() * 200), // Random amount between 25 and 225
            'payment': `TEST_DONATION_${timestamp}_${randomId}`,
          };
          break;

        case 'with_both':
          donationData = {
            'Email': `test.donor.${timestamp}.${randomId}@example.com`,
            'Phone Number': `+233${Math.floor(200000000 + Math.random() * 800000000)}`,
            'Amount': 100 + Math.floor(Math.random() * 1000), // Random amount between 100 and 1100
            'payment': `TEST_DONATION_${timestamp}_${randomId}`,
          };
          break;

        case 'minimal':
          // Only required fields (Amount and payment)
          donationData = {
            'Email': undefined,
            'Phone Number': undefined,
            'Amount': 10 + Math.floor(Math.random() * 100), // Random amount between 10 and 110
            'payment': `TEST_DONATION_${timestamp}_${randomId}`,
          };
          break;

        default:
          return NextResponse.json(
            { status: false, message: `Unknown scenario: ${scenario}` },
            { status: 400 }
          );
      }

      try {
        // Create donation record in Airtable
        const donationRecord = await createOrUpdateDonation(donationData);

        if (donationRecord) {
          // Send confirmation email if email is provided
          let emailSent = false;
          let emailError: string | undefined;
          
          if (donationData['Email']) {
            try {
              const emailResult = await sendDonationConfirmationEmail(
                donationData['Email'],
                donationData['Amount'] || 0,
                'GHS', // Default currency
                donationData['payment']
              );
              
              if (emailResult.success) {
                emailSent = true;
                console.log(`Donation confirmation email sent to: ${donationData['Email']}`);
              } else {
                emailError = emailResult.error;
                console.error(`Failed to send email: ${emailResult.error}`);
              }
            } catch (emailErr) {
              emailError = emailErr instanceof Error ? emailErr.message : 'Unknown email error';
              console.error('Error sending donation confirmation email:', emailErr);
            }
          }

          results.push({
            scenario: `${scenario}_${i + 1}`,
            success: true,
            donationData,
            donationRecord: {
              id: donationRecord.id || '',
              fields: donationRecord.fields as Record<string, unknown>,
            },
            emailSent,
            ...(emailError && { emailError }),
            ...(emailSent && { emailMessageId: 'Check server logs for message ID' }),
          });
        } else {
          errors.push({
            scenario: `${scenario}_${i + 1}`,
            donationData,
            error: 'Failed to create donation record (returned null)',
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errors.push({
          scenario: `${scenario}_${i + 1}`,
          donationData,
          error: errorMessage,
        });
        console.error(`Error creating donation for scenario ${scenario}_${i + 1}:`, error);
      }
    }

    const successful = results.length;
    const failed = errors.length;
    const total = successful + failed;

    return NextResponse.json({
      status: true,
      message: `Test donation sync completed: ${successful} successful, ${failed} failed`,
      summary: {
        total,
        successful,
        failed,
      },
      results: results.length > 0 ? results : undefined,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Test donation sync error:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

