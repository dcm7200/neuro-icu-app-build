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

const lessonFiles = [
  { jsonFile: 'M01.L1_Welcome_Faculty_Culture.json', title: 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up' },
  { jsonFile: 'M01.L2_Unit_Geography.json', title: 'M01.L2 — Unit Geography: 4NNB, 4NNC, and Everything Around Them' },
  { jsonFile: 'M01.L3_NCC_Team_Structure.json', title: 'M01.L3 — The NCC Team: Ice, Fire, and Everyone Around You' },
  { jsonFile: 'M01.L4_NCC_Roles_By_Patient_Type.json', title: 'M01.L4 — NCC Roles by Patient Type: Primary, Co-Managed, Consult' }
];

async function reload() {
  try {
    console.log('📚 Reloading M01 content...\n');

    for (const lesson of lessonFiles) {
      const jsonPath = path.join(__dirname, '..', 'curriculum', lesson.jsonFile);
      
      if (!fs.existsSync(jsonPath)) {
        console.log(`❌ ${lesson.title} — File not found`);
        continue;
      }

      const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
      const content = JSON.parse(jsonContent);

      // Find lesson by title
      const { data: lessonData, error: findError } = await supabase
        .from('module_lessons')
        .select('id')
        .eq('title', lesson.title)
        .single();

      if (findError) {
        console.log(`❌ ${lesson.title} — Not found in database`);
        continue;
      }

      // Update with content
      const { error: updateError } = await supabase
        .from('module_lessons')
        .update({ content: JSON.stringify(content) })
        .eq('id', lessonData.id);

      if (updateError) {
        console.log(`❌ ${lesson.title} — Update failed: ${updateError.message}`);
        continue;
      }

      console.log(`✅ ${lesson.title}`);
    }

    console.log('\n✨ Done! M01 content reloaded. Refresh your browser.');

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

reload();
