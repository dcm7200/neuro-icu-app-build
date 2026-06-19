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

async function listModules() {
  try {
    console.log('📚 All modules:\n');

    const { data: modules, error } = await supabase
      .from('curriculum_modules')
      .select('id, title, order_index')
      .order('order_index');

    if (error) {
      console.error('Error:', error);
      return;
    }

    modules?.forEach((m, idx) => {
      console.log(`${idx + 1}. ${m.title}`);
      console.log(`   ID: ${m.id}\n`);
    });

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

listModules();
