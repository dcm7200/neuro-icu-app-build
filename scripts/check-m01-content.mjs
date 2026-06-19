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
    const { data: lessons, error } = await supabase
      .from('module_lessons')
      .select('id, title, content')
      .ilike('title', '%M01%')
      .order('title');

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log(`📚 Found ${lessons.length} M01 lessons:\n`);

    lessons.forEach((lesson) => {
      console.log(`📖 ${lesson.title}`);
      console.log(`   ID: ${lesson.id}`);
      
      if (!lesson.content) {
        console.log('   ❌ NO CONTENT');
      } else {
        let content = lesson.content;
        if (typeof content === 'string') {
          try {
            content = JSON.parse(content);
          } catch (e) {
            console.log('   ❌ INVALID JSON');
            return;
          }
        }
        
        if (!content.blocks) {
          console.log('   ❌ NO BLOCKS ARRAY');
        } else if (!Array.isArray(content.blocks)) {
          console.log('   ❌ BLOCKS IS NOT AN ARRAY');
        } else {
          console.log(`   ✅ ${content.blocks.length} blocks`);
        }
      }
      console.log();
    });

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

check();
