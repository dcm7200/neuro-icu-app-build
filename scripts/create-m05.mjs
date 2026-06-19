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

async function createModule() {
  try {
    console.log('🧠 Creating Module M05...\n');

    // Create M05 module
    const { data: m05, error: moduleError } = await supabase
      .from('curriculum_modules')
      .insert({
        title: 'M05 — The Neuro Exam',
        description: 'Comprehensive neurological examination techniques and findings',
        category: 'Clinical Skills',
        order_index: 5
      })
      .select('id')
      .single();

    if (moduleError) {
      console.error('Error creating module:', moduleError);
      return;
    }

    console.log('✅ Created M05 — The Neuro Exam');

    // Create M05.L1 lesson
    const { data: l1, error: lessonError } = await supabase
      .from('module_lessons')
      .insert({
        module_id: m05.id,
        title: 'M05.L1 — Awake Comprehensive Exam',
        lesson_order: 1
      })
      .select('id')
      .single();

    if (lessonError) {
      console.error('Error creating lesson:', lessonError);
      return;
    }

    console.log('✅ Created M05.L1 — Awake Comprehensive Exam');

    // Initialize empty content structure
    const { error: contentError } = await supabase
      .from('module_lessons')
      .update({
        content: JSON.stringify({
          title: 'M05.L1 — Awake Comprehensive Exam',
          duration_min: 0,
          blocks: [
            {
              type: 'heading',
              content: { text: 'M05.L1 — Awake Comprehensive Exam' }
            },
            {
              type: 'paragraph',
              content: { text: 'Ready for content. Upload videos and add lesson materials.' }
            }
          ]
        })
      })
      .eq('id', l1.id);

    if (contentError) {
      console.error('Error initializing content:', contentError);
      return;
    }

    console.log('✅ Initialized lesson content');

    console.log('\n✨ Done! M05 module is ready.');
    console.log(`\n📝 You can now upload videos to this lesson:`);
    console.log(`   http://localhost:3000/admin/upload-video`);
    console.log(`   Select: M05.L1 — Awake Comprehensive Exam`);

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

createModule();
