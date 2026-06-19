#!/usr/bin/env node

/**
 * Neuro ICU App - Curriculum Loader
 * Loads M01-M03 lessons from JSON/Markdown files into Supabase
 * 
 * Usage: node load-ncc-curriculum.js
 * 
 * Created: 2026-05-15
 * Author: Sage 🦉
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Environment setup
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Curriculum data structure
const curriculumData = [
  {
    title: 'M01 — Welcome to BNI Neurocritical Care',
    description: 'Phase 1 Orientation & Unit Foundations',
    category: 'Foundations',
    estimated_hours: 1.5,
    order_index: 1,
    lessons: [
      {
        title: 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up',
        lesson_order: 1,
        duration_min: 15,
        markdown_file: 'M01.L1_Welcome_Faculty_Culture---200fa40a-5b3f-4369-9878-a58f0817db96.md'
      },
      {
        title: 'M01.L2 — Unit Geography: 4NNB, 4NNC, and Everything Around Them',
        lesson_order: 2,
        duration_min: 20,
        markdown_file: 'M01.L2_Unit_Geography---70f4426f-cb3a-40e4-98a3-034633003ef5.md'
      },
      {
        title: 'M01.L3 — The NCC Team: Ice, Fire, and Everyone Around You',
        lesson_order: 3,
        duration_min: 20,
        markdown_file: 'M01.L3_NCC_Team_Structure---345f5fe1-06ed-4646-aa84-2eb9da33e4f2.md'
      },
      {
        title: 'M01.L4 — NCC Roles by Patient Type: Primary, Co-Managed, Consult',
        lesson_order: 4,
        duration_min: 25,
        markdown_file: 'M01.L4_NCC_Roles_By_Patient_Type---99022962-7954-4cc7-91d6-2ec8713030f3.md'
      }
    ]
  },
  {
    title: 'M02 — Clinical Tools & System Access',
    description: 'Phase 1 Orientation & Unit Foundations',
    category: 'Foundations',
    estimated_hours: 2.0,
    order_index: 2,
    lessons: [
      {
        title: 'M02.L1 — Cerner PowerChart (Desktop & Mobile)',
        lesson_order: 1,
        duration_min: 30,
        markdown_file: 'M02.L1_Cerner_PowerChart---655e5bff-a3f5-4cf8-b53d-d6d06f02806f.md'
      },
      {
        title: 'M02.L2 — TigerConnect Roles and Team Chats',
        lesson_order: 2,
        duration_min: 15,
        markdown_file: 'M02.L2_TigerConnect---f053fa6a-337d-47c4-b6b4-7ccc9f9f06cd.md'
      },
      {
        title: 'M02.L3 — Hybrid Chart for Procedure Billing and Service Attribution',
        lesson_order: 3,
        duration_min: 15,
        markdown_file: 'M02.L3_HybridChart---47c405f8-5ef0-48cb-8f3b-b7d521cae5e2.md'
      },
      {
        title: 'M02.L4 — Imaging Viewers: iConnect, Merge, Ambra',
        lesson_order: 4,
        duration_min: 20,
        markdown_file: 'M02.L4_Imaging_Viewers---73255701-933f-46a7-b3c7-194705bfa9b2.md'
      },
      {
        title: 'M02.L5 — Natus EEG, Airstrip One, TeleTracking, Ascom',
        lesson_order: 5,
        duration_min: 20,
        markdown_file: 'M02.L5_Natus_Airstrip_TeleTracking_Ascom---29ad5884-8fc9-440f-8cc8-ed10ce08a25d.md'
      },
      {
        title: 'M02.L6 — OKTA, Commonspirit Email, Barrow NCC Resources Website',
        lesson_order: 6,
        duration_min: 10,
        markdown_file: 'M02.L6_OKTA_Email_NCCResources---98215b6c-3dfd-466f-9840-ba9846b06330.md'
      },
      {
        title: 'M02.L7 — Amion Schedule and Signout Norms',
        lesson_order: 7,
        duration_min: 15,
        markdown_file: 'M02.L7_Amion_Schedule_Signout---008aba8e-3c19-4c55-98eb-3da1435d325b.md'
      }
    ]
  },
  {
    title: 'M03 — Daily Workflow for the NCC APP',
    description: 'Phase 1 Orientation & Unit Foundations',
    category: 'Foundations',
    estimated_hours: 2.0,
    order_index: 3,
    lessons: [
      {
        title: 'M03.L1 — Pre-Rounding: From 0600 to 0800',
        lesson_order: 1,
        duration_min: 25,
        markdown_file: 'M03.L1_Pre_Rounding---200fa40a-5b3f-4369-9878-a58f0817db96.md'
      },
      {
        title: 'M03.L2 — The APP Presentation Template: Pertinent Positives Only',
        lesson_order: 2,
        duration_min: 20,
        markdown_file: 'M03.L2_APP_Presentation_Template---e948dfb1-a1f4-4524-951c-6a0ee78838c5.md'
      },
      {
        title: 'M03.L3 — Rounds Choreography',
        lesson_order: 3,
        duration_min: 15,
        markdown_file: 'M03.L3_Rounds_Choreography---1ae2de0c-6e7c-4545-aba1-4f8c250b979c.md'
      },
      {
        title: 'M03.L4 — Note Discipline: H&P, Progress, Transfer, Death',
        lesson_order: 4,
        duration_min: 30,
        markdown_file: 'M03.L4_Note_Discipline---3cb6dd6f-44c0-44b4-9f0d-9c7d5efb006e.md'
      },
      {
        title: 'M03.L5 — Signout Workflows: Daytime, PM Attending, On-Call',
        lesson_order: 5,
        duration_min: 20,
        markdown_file: 'M03.L5_Signout_Workflows---cac22e91-eeb9-4fba-8254-579e50307828.md'
      },
      {
        title: 'M03.L6 — When to Call the Attending',
        lesson_order: 6,
        duration_min: 20,
        markdown_file: 'M03.L6_When_To_Call_Attending---3774aa21-c19c-47f7-855c-899da1594f3a.md'
      }
    ]
  }
];

/**
 * Load markdown file content
 */
function loadMarkdownContent(filename) {
  try {
    const filePath = path.join(__dirname, '../../', filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filename}`);
      return '';
    }
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.warn(`⚠️  Error reading ${filename}: ${err.message}`);
    return '';
  }
}

/**
 * Main loader function
 */
async function loadCurriculum() {
  console.log('🚀 Starting NCC Curriculum Loader...\n');

  let modulesCreated = 0;
  let lessonsCreated = 0;

  for (const moduleData of curriculumData) {
    try {
      console.log(`📚 Loading Module: ${moduleData.title}`);

      // Create module
      const { data: moduleRecord, error: moduleError } = await supabase
        .from('curriculum_modules')
        .insert([
          {
            title: moduleData.title,
            description: moduleData.description,
            category: moduleData.category,
            estimated_hours: moduleData.estimated_hours,
            order_index: moduleData.order_index
          }
        ])
        .select();

      if (moduleError) {
        console.error(`  ❌ Error creating module: ${moduleError.message}`);
        continue;
      }

      const moduleId = moduleRecord[0].id;
      modulesCreated++;
      console.log(`  ✅ Module created (ID: ${moduleId})`);

      // Load lessons
      for (const lessonData of moduleData.lessons) {
        try {
          const content = loadMarkdownContent(lessonData.markdown_file);

          const { data: lessonRecord, error: lessonError } = await supabase
            .from('module_lessons')
            .insert([
              {
                module_id: moduleId,
                title: lessonData.title,
                content: content,
                lesson_order: lessonData.lesson_order
              }
            ])
            .select();

          if (lessonError) {
            console.error(`    ❌ Error creating lesson: ${lessonError.message}`);
            continue;
          }

          lessonsCreated++;
          console.log(`    ✅ Lesson loaded: ${lessonData.title}`);
        } catch (err) {
          console.error(`    ❌ Lesson error: ${err.message}`);
        }
      }

      console.log('');
    } catch (err) {
      console.error(`❌ Module error: ${err.message}`);
    }
  }

  console.log('\n✨ Curriculum Loading Complete!');
  console.log(`   📚 Modules created: ${modulesCreated}`);
  console.log(`   📖 Lessons created: ${lessonsCreated}`);
}

// Run
loadCurriculum().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
