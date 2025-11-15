import { NextResponse } from 'next/server';

/**
 * Check Airtable configuration status
 * This endpoint helps verify that Airtable environment variables are set correctly
 */
export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  const config = {
    apiKey: {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      preview: apiKey ? `${apiKey.substring(0, 8)}...` : 'Not set',
    },
    baseId: {
      exists: !!baseId,
      length: baseId?.length || 0,
      preview: baseId ? `${baseId.substring(0, 8)}...` : 'Not set',
    },
    isConfigured: !!(apiKey && baseId),
  };

  return NextResponse.json({
    status: config.isConfigured ? 'configured' : 'not_configured',
    message: config.isConfigured
      ? 'Airtable is configured correctly'
      : 'Airtable configuration is missing. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in your .env.local file',
    config,
    instructions: !config.isConfigured
      ? {
          step1: 'Get your Airtable API Key: https://airtable.com/create/tokens',
          step2: 'Get your Base ID from your Airtable base URL (the part after /app/)',
          step3: 'Add to .env.local: AIRTABLE_API_KEY=your_key_here',
          step4: 'Add to .env.local: AIRTABLE_BASE_ID=your_base_id_here',
          step5: 'Restart your development server',
        }
      : undefined,
  });
}

