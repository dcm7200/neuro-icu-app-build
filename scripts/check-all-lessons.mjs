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
    console.log('🔍 Checking ALL lessons in database...\n');

    const { data: lessons, error } = await supabase
      .from('module_lessons')
      .select('id, title, content')
      .limit(10);

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log(`Found ${lessons?.length || 0} lessons:\n`);

    for (const lesson of lessons || []) {
      const hasContent = lesson.content && lesson.content.length > 0;
      const contentSize = hasContent ? `${(lesson.content.length / 1024).toFixed(2)}KB` : 'EMPTY';
      const status = hasContent ? '✅' : '❌';
      
      console.log(`${status} ${lesson.title}`);
      console.log(`   Content size: ${contentSize}`);
      if (hasContent) {
        console.log(`   Preview: ${String(lesson.content).substring(0, 80)}...`);
      }
      console.log();
    }

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

check();
