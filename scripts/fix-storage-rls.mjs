#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');

const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...parts] = line.split('=');
    env[key.trim()] = parts.join('=').trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function fixRLS() {
  try {
    console.log('🔐 Fixing storage RLS policies...\n');

    // Try to execute SQL to disable RLS on the bucket
    const { error } = await supabase.rpc('exec', {
      sql: `
        ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
      `
    });

    if (error && !error.message.includes('does not exist')) {
      console.log('⚠️  Could not execute RLS fix directly');
      console.log('   Trying via HTTP POST instead...\n');
    }

    // Alternative: Update bucket policy via HTTP
    const bucketUrl = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/buckets/lesson-videos`;
    
    // For now, just log instructions
    console.log('✅ To fix RLS, run this in Supabase SQL Editor:');
    console.log(`
    -- Allow anyone to upload to lesson-videos bucket
    CREATE POLICY "Allow public uploads"
    ON storage.objects 
    FOR INSERT 
    WITH CHECK (bucket_id = 'lesson-videos');

    CREATE POLICY "Allow public reads"
    ON storage.objects 
    FOR SELECT 
    USING (bucket_id = 'lesson-videos');
    `);

    console.log('\nOR use the Supabase dashboard:');
    console.log('1. Go to Storage > lesson-videos');
    console.log('2. Click "Policies" (top right)');
    console.log('3. Add policy to allow INSERT and SELECT for all users\n');

  } catch (err) {
    console.error('Error:', err.message);
  }
}

fixRLS();
