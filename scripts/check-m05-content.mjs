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
    const { data: lesson, error } = await supabase
      .from('module_lessons')
      .select('id, title, content')
      .ilike('title', '%Awake%')
      .single();

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('📚 Lesson:', lesson.title);
    console.log('ID:', lesson.id);
    
    if (!lesson.content) {
      console.log('❌ No content');
      return;
    }

    let content = lesson.content;
    if (typeof content === 'string') {
      content = JSON.parse(content);
    }

    console.log('\n📦 Full content structure:');
    console.log(JSON.stringify(content, null, 2));

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

check();
