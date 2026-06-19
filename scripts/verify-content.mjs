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

async function verify() {
  try {
    console.log('🔍 Checking lesson content in database...\n');

    const { data: lessons, error } = await supabase
      .from('module_lessons')
      .select('id, title, module_id, content')
      .limit(5);

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    if (!lessons || lessons.length === 0) {
      console.log('❌ No lessons found in database');
      return;
    }

    console.log(`Found ${lessons.length} lessons:\n`);

    for (const lesson of lessons) {
      console.log(`📚 ${lesson.title}`);
      console.log(`   Module: ${lesson.module_id}`);
      console.log(`   Content type: ${typeof lesson.content}`);
      
      if (lesson.content) {
        if (typeof lesson.content === 'string') {
          try {
            const parsed = JSON.parse(lesson.content);
            console.log(`   ✅ Content is valid JSON with ${parsed.blocks?.length || 0} blocks`);
          } catch (e) {
            console.log(`   ❌ Content is string but NOT valid JSON`);
            console.log(`   First 100 chars: ${lesson.content.substring(0, 100)}`);
          }
        } else {
          console.log(`   ✅ Content is already object/array (${typeof lesson.content})`);
        }
      } else {
        console.log(`   ❌ Content is NULL or EMPTY`);
      }
      console.log();
    }

  } catch (err) {
    console.error('Fatal error:', err.message);
  }
}

verify();
