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
    env[key.trim()] = parts.join('=').trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const { data, error } = await supabase.from('module_lessons').select('title, content').order('title');
if (error) { console.error(error.message); process.exit(1); }

let total = 0;
for (const r of data) {
  try {
    const p = JSON.parse(r.content);
    const blocks = p.blocks?.length || 0;
    total += blocks;
    console.log(blocks > 0 ? '✅' : '❌', `${r.title} (${blocks} blocks)`);
  } catch {
    console.log('❌ BAD JSON:', r.title);
  }
}
console.log(`\nTotal: ${data.length} lessons, ${total} blocks`);
process.exit(0);
