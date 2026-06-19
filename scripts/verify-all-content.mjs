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
    console.log('🔍 Checking ALL lesson content...\n');

    const { data: lessons, error } = await supabase
      .from('module_lessons')
      .select('id, title, content')
      .order('title');

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    if (!lessons) {
      console.log('No lessons');
      return;
    }

    const m01Lessons = lessons.filter(l => l.title.startsWith('Welcome') || l.title.startsWith('Unit') || l.title.startsWith('The NCC') || l.title.startsWith('NCC Roles'));

    console.log(`M01 Lessons: ${m01Lessons.length}\n`);

    for (const lesson of m01Lessons) {
      const content = lesson.content;
      const isPopulated = content && content.length > 0 && content !== 'null';
      const status = isPopulated ? '✅' : '❌';
      const size = content ? `${Math.round(content.length / 1024)}KB` : '0B';
      console.log(`${status} ${lesson.title} (${size})`);
    }

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

verify();
