#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...parts] = line.split('=');
    if (key) env[key.trim()] = parts.join('=').trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function inspect() {
  // Try various title formats
  const titles = [
    'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up',
    'Welcome, Faculty, and the Culture of Speaking Up',
  ];

  for (const title of titles) {
    const { data, error } = await supabase
      .from('module_lessons')
      .select('id, title, lesson_order, content')
      .eq('title', title)
      .single();

    if (data) {
      console.log('Found lesson:', data.id, data.title);
      const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
      console.log('\nContent type:', typeof content);
      if (content && content.blocks) {
        console.log('Blocks count:', content.blocks.length);
        content.blocks.forEach((b, i) => {
          const preview = b.content?.text || b.content?.title || (b.content?.headers ? `[table headers: ${b.content.headers.join(', ')}]` : '');
          console.log(`  [${i}] type=${b.type} | ${String(preview).substring(0, 80)}`);
        });
      } else {
        console.log('Content keys:', Object.keys(content || {}));
        console.log('Raw snippet:', JSON.stringify(content).substring(0, 500));
      }
      return;
    }
  }

  // Try partial match
  const { data: all } = await supabase
    .from('module_lessons')
    .select('id, title, lesson_order')
    .ilike('title', '%Welcome%');
  
  console.log('Partial matches:', all);
  
  // Also list first module's lessons
  const { data: firstModule } = await supabase
    .from('curriculum_modules')
    .select('id, name')
    .order('created_at')
    .limit(3);
  console.log('First modules:', firstModule);

  if (firstModule?.[0]) {
    const { data: lessons } = await supabase
      .from('module_lessons')
      .select('id, title, lesson_order')
      .eq('module_id', firstModule[0].id)
      .order('lesson_order');
    console.log('Module 1 lessons:', lessons);
  }
}

inspect().catch(console.error);
