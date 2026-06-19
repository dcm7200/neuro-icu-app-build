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

async function cleanup() {
  try {
    console.log('🔄 Cleaning up modules...\n');

    // Delete the unlabeled "Welcome to BNI" module
    const { error: deleteError } = await supabase
      .from('curriculum_modules')
      .delete()
      .eq('id', 'a450f526-bc08-4569-8e4c-29c583039934');

    if (deleteError) {
      console.error('Error deleting old module:', deleteError);
      return;
    }

    console.log('✅ Deleted "Welcome to BNI Neurocritical Care" (unlabeled)');

    // Recreate M01
    const { data: m01, error: createError } = await supabase
      .from('curriculum_modules')
      .insert({
        title: 'M01 — Welcome to BNI Neurocritical Care',
        description: 'Phase 1 orientation: foundation, team structure, roles',
        category: 'Orientation',
        order_index: 1
      })
      .select('id')
      .single();

    if (createError) {
      console.error('Error creating M01:', createError);
      return;
    }

    console.log('✅ Restored M01 module');

    // Recreate the 4 lessons
    const lessons = [
      { title: 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up', order: 1 },
      { title: 'M01.L2 — Unit Geography: 4NNB, 4NNC, and Everything Around Them', order: 2 },
      { title: 'M01.L3 — The NCC Team: Ice, Fire, and Everyone Around You', order: 3 },
      { title: 'M01.L4 — NCC Roles by Patient Type: Primary, Co-Managed, Consult', order: 4 }
    ];

    for (const lesson of lessons) {
      const { error: lessonError } = await supabase
        .from('module_lessons')
        .insert({
          module_id: m01.id,
          title: lesson.title,
          lesson_order: lesson.order
        });

      if (lessonError) {
        console.error(`Error creating lesson ${lesson.title}:`, lessonError);
      } else {
        console.log(`✅ Restored ${lesson.title}`);
      }
    }

    console.log('\n✨ Done! M01 and all lessons restored.');

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

cleanup();
