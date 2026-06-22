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
  const { data } = await supabase
    .from('module_lessons')
    .select('id, content')
    .eq('title', 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up')
    .single();

  const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
  
  // Show html blocks
  [14, 17, 20].forEach(i => {
    const b = content.blocks[i];
    console.log(`\n=== Block [${i}] type=${b.type} ===`);
    console.log(JSON.stringify(b.content, null, 2));
  });
}

inspect().catch(console.error);
