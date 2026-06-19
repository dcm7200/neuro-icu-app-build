require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
  try {
    console.log('Checking database schema...\n');

    // Try to query existing modules
    const { data, error } = await supabase
      .from('curriculum_modules')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error querying curriculum_modules:', error.message);
      console.log('\nThe table schema might not be loaded yet.');
      console.log('Please go to Supabase > SQL Editor and run the full database.sql file.');
    } else {
      console.log('✅ curriculum_modules table exists');
      console.log('Sample record:', data);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkSchema();
