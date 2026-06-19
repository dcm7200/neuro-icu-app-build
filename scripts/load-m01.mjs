#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');

// Parse .env.local
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...parts] = line.split('=');
    env[key.trim()] = parts.join('=').trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function loadM01Curriculum() {
  try {
    console.log('📚 Loading M01 Curriculum...\n');

    // First, get or create the M01 module
    const { data: moduleData, error: getModuleError } = await supabase
      .from('curriculum_modules')
      .select('id')
      .eq('title', 'Welcome to BNI Neurocritical Care')
      .single();

    let moduleId;
    if (getModuleError || !moduleData) {
      // Create new module
      const { data: newModule, error: createError } = await supabase
        .from('curriculum_modules')
        .insert({
          title: 'Welcome to BNI Neurocritical Care',
          description: 'Phase 1 orientation: foundation, team structure, roles',
          category: 'Orientation',
          estimated_hours: 1.5,
          order_index: 1
        })
        .select('id')
        .single();

      if (createError) {
        console.error('❌ Error creating module:', createError);
        return;
      }
      moduleId = newModule.id;
      console.log(`✅ Created module M01`);
    } else {
      moduleId = moduleData.id;
      console.log(`✅ Using existing module M01`);
    }

    // Load each lesson
    const lessons = [
      {
        id: 'M01.L1',
        title: 'Welcome, Faculty, and the Culture of Speaking Up',
        duration: 15,
        order: 1,
        content: 'Lesson on NCC culture, faculty, and speak-up expectations'
      },
      {
        id: 'M01.L2',
        title: 'Unit Geography: 4NNB, 4NNC, and Everything Around Them',
        duration: 20,
        order: 2,
        content: 'Physical layout of neurocritical care unit and key resources'
      },
      {
        id: 'M01.L3',
        title: 'The NCC Team: Ice, Fire, and Everyone Around You',
        duration: 20,
        order: 3,
        content: 'Team structure, coverage models, roles and responsibilities'
      },
      {
        id: 'M01.L4',
        title: 'NCC Roles by Patient Type: Primary, Co-Managed, Consult',
        duration: 25,
        order: 4,
        content: 'Patient care roles, order authority, gray zones, case studies'
      }
    ];

    for (const lesson of lessons) {
      const { error: lessonError } = await supabase
        .from('module_lessons')
        .insert({
          module_id: moduleId,
          title: lesson.title,
          content: lesson.content,
          lesson_order: lesson.order
        });

      if (lessonError && lessonError.code !== 'PGRST202') { // 23505 is unique violation
        console.error(`❌ Error inserting lesson ${lesson.id}:`, lessonError);
        continue;
      }

      console.log(`✅ Loaded ${lesson.id}: "${lesson.title}"`);
    }

    console.log('\n✨ M01 Curriculum loaded successfully!');
    console.log('👉 Visit http://localhost:3000/dashboard to view');

  } catch (err) {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
  }
}

loadM01Curriculum();
