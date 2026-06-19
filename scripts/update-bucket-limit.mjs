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

async function updateBucket() {
  try {
    console.log('🪣 Updating bucket size limit...\n');

    // Update bucket with larger file size limit (1GB)
    const { data, error } = await supabase
      .storage
      .updateBucket('lesson-videos', {
        fileSizeLimit: 1073741824 // 1GB in bytes
      });

    if (error) {
      console.error('Error:', error.message);
      return;
    }

    console.log('✅ Updated lesson-videos bucket');
    console.log('   Max file size: 1 GB (1,073,741,824 bytes)');
    console.log('\n✨ You can now upload files up to 1GB!');

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

updateBucket();
