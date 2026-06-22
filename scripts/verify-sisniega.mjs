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

const { data } = await supabase
  .from('module_lessons')
  .select('content')
  .eq('title', 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up')
  .single();

const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
const block14 = content.blocks[14];
const hasSisniega = block14.content.html.includes('Sisniega');
console.log(hasSisniega ? '✅ Daniella Sisniega confirmed in Supabase block [14]' : '❌ NOT found');

// Show the names present in the grid
const names = [...block14.content.html.matchAll(/alt="([^"]+)"/g)].map(m => m[1]);
console.log('Grid members:', names.join(', '));
process.exit(0);
