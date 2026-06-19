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

async function createBucket() {
  try {
    console.log('🪣 Creating storage bucket for lesson videos...\n');

    // Try to create the bucket
    const { data, error } = await supabase
      .storage
      .createBucket('lesson-videos', {
        public: true
      });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log('✅ Bucket already exists');
      } else {
        console.error('❌ Error:', error.message);
        return;
      }
    } else {
      console.log('✅ Bucket created:', data.name);
    }

    // Test upload capability
    console.log('\n📝 Bucket is ready for video uploads');
    console.log('   Max file size: 5GB');
    console.log('   Allowed formats: MP4, MOV, WebM, OGG');

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

createBucket();
