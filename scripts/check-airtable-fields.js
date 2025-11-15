const Airtable = require('airtable');
const fs = require('fs');
const path = require('path');

// Read .env.local file directly
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  console.error('Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID in .env.local');
  process.exit(1);
}

const base = new Airtable({ apiKey }).base(baseId);

async function checkTables() {
  console.log('Checking Airtable tables...\n');

  // Check Subscribers table
  try {
    console.log('=== SUBSCRIBERS TABLE ===');
    const subscribersRecords = await base('Subscribers')
      .select({
        maxRecords: 5,
      })
      .firstPage();

    if (subscribersRecords.length > 0) {
      const fields = Object.keys(subscribersRecords[0].fields);
      console.log('Field names:', fields);
      console.log('\nSample record:');
      console.log(JSON.stringify({
        id: subscribersRecords[0].id,
        fields: subscribersRecords[0].fields,
      }, null, 2));
    } else {
      console.log('Table exists but has no records');
      console.log('Trying to create a test record to see field structure...\n');
      
      // Try creating a minimal record to see what fields are expected
      try {
        await base('Subscribers').create([{
          fields: {
            'Email': 'test@example.com'
          }
        }]);
        console.log('✓ Successfully created test record with Email field');
        console.log('Now fetching it back to see all fields...\n');
        
        const testRecords = await base('Subscribers')
          .select({
            filterByFormula: "{Email} = 'test@example.com'",
            maxRecords: 1
          })
          .firstPage();
          
        if (testRecords.length > 0) {
          const fields = Object.keys(testRecords[0].fields);
          console.log('Available fields in Subscribers table:', fields);
          
          // Delete the test record
          await base('Subscribers').destroy([testRecords[0].id]);
          console.log('✓ Test record deleted');
        }
      } catch (createError) {
        console.log('Error creating test record (this tells us about fields):');
        console.log('Error:', createError.error || createError.message);
        if (createError.errorDetails) {
          console.log('Details:', JSON.stringify(createError.errorDetails, null, 2));
        }
      }
    }
  } catch (error) {
    console.error('Error accessing Subscribers table:', error.error || error.message);
    if (error.errorDetails) {
      console.log('Details:', JSON.stringify(error.errorDetails, null, 2));
    }
  }

  console.log('\n');

  // Check Subscriptions table
  try {
    console.log('=== SUBSCRIPTIONS TABLE ===');
    const subscriptionsRecords = await base('Subscriptions')
      .select({
        maxRecords: 5,
      })
      .firstPage();

    if (subscriptionsRecords.length > 0) {
      const fields = Object.keys(subscriptionsRecords[0].fields);
      console.log('Field names:', fields);
      console.log('\nSample record:');
      console.log(JSON.stringify({
        id: subscriptionsRecords[0].id,
        fields: subscriptionsRecords[0].fields,
      }, null, 2));
    } else {
      console.log('Table exists but has no records');
      console.log('Trying to create a test record to see field structure...\n');
      
      try {
        await base('Subscriptions').create([{
          fields: {
            'Email': 'test@example.com'
          }
        }]);
        console.log('✓ Successfully created test record with Email field');
        
        const testRecords = await base('Subscriptions')
          .select({
            filterByFormula: "{Email} = 'test@example.com'",
            maxRecords: 1
          })
          .firstPage();
          
        if (testRecords.length > 0) {
          const fields = Object.keys(testRecords[0].fields);
          console.log('Available fields in Subscriptions table:', fields);
          await base('Subscriptions').destroy([testRecords[0].id]);
          console.log('✓ Test record deleted');
        }
      } catch (createError) {
        console.log('Error creating test record:');
        console.log('Error:', createError.error || createError.message);
        if (createError.errorDetails) {
          console.log('Details:', JSON.stringify(createError.errorDetails, null, 2));
        }
      }
    }
  } catch (error) {
    console.error('Error accessing Subscriptions table:', error.error || error.message);
    if (error.errorDetails) {
      console.log('Details:', JSON.stringify(error.errorDetails, null, 2));
    }
  }
}

checkTables().catch(console.error);

