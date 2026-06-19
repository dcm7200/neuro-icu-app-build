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

const urlMap = {
  'Ruchira-Jha-MD-MSc-600x600.jpg': 'jha.jpg',
  'C-Patrick-Crooks-MD-600x600.jpg': 'crooks.jpg',
  'Kumar-Aditya-260112-web-600x600.jpg': 'kumar.jpg',
  'Lynch_Fiona-241003-web-600x600.jpg': 'lynch.jpg',
  'Mangalampalli_Anusha-240814-web-600x600.jpg': 'mangalampalli.jpg',
  'Nassim-Matin-MD-600x600.jpg': 'matin.jpg',
  'Nelson_Nicholas-240816-web-600x600.jpg': 'nelson.jpg',
  'Phuah_Chia-Ling-240118-web-600x600.jpg': 'phuah.jpg',
  'Thomas-Rachel-250825-web-600x600.jpg': 'thomas.jpg',
  'Chung-Eunjoo-241010-web-600x600.jpg': 'chung.jpg',
  'Lewis_Candi-240301-web-600x600.jpg': 'lewis.jpg',
  'placeholderperson.png': 'lizano.jpg',
  'McLaughlin_Diane-241115-web-600x600.jpg': 'mclaughlin.jpg',
  'Stubbs_Lindsey-240216-web-600x600.jpg': 'stubbs.jpg',
  'Tittle_Abby-600x600.jpg': 'tittle.jpg',
  'Haller_Tyler-241115-web-600x600.jpg': 'haller.jpg',
};

const { data } = await supabase
  .from('module_lessons')
  .select('id, content')
  .eq('title', 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up')
  .single();

let updated = data.content;
for (const [barrowFile, localFile] of Object.entries(urlMap)) {
  updated = updated.replaceAll(
    'https://www.barrowneuro.org/wp-content/uploads/' + barrowFile,
    '/team/' + localFile
  );
}

const { error } = await supabase
  .from('module_lessons')
  .update({ content: updated })
  .eq('id', data.id);

if (error) { console.error('failed:', error.message); process.exit(1); }

const parsed = JSON.parse(updated);
const htmlBlocks = parsed.blocks.filter(b => b.type === 'html');
const firstSrc = htmlBlocks[0].content.html.match(/src="([^"]+)"/)[1];
console.log('✅ URLs updated to local paths');
console.log('   Sample src:', firstSrc);
console.log('   html blocks:', htmlBlocks.length);
process.exit(0);
