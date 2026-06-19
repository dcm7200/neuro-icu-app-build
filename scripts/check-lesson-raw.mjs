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

async function check() {
  try {
    console.log('🔍 Fetching single lesson with service role...\n');

    const { data, error } = await supabase
      .from('module_lessons')
      .select('*')
      .eq('title', 'Welcome, Faculty, and the Culture of Speaking Up')
      .single();

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    console.log('✅ Lesson found:');
    console.log('  ID:', data.id);
    console.log('  Title:', data.title);
    console.log('  Module ID:', data.module_id);
    console.log('  Content type:', typeof data.content);
    console.log('  Content length:', data.content?.length);
    console.log('  Content preview:', String(data.content).substring(0, 150) + '...');
    console.log('\nAll fields:', Object.keys(data));

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

check();
