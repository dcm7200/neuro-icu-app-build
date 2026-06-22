#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => { if(line&&!line.startsWith('#')){const[k,...v]=line.split('=');env[k.trim()]=v.join('=').trim();} });
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {auth:{autoRefreshToken:false,persistSession:false}});

// ─────────────────────────────────────────────────────────────────────────────
// Module definitions — structure only, empty lesson content
// ─────────────────────────────────────────────────────────────────────────────
const modules = [
  {
    title: 'M11 — CNS Infections and Traumatic Brain Injury',
    description: 'Bacterial meningitis, viral encephalitis, intracranial abscess, TBI classification and management',
    category: 'Clinical Diagnoses',
    order_index: 11,
    lessons: [
      { title: 'M11.L1 — Bacterial Meningitis: Empiric Treatment, LP Workup, and Complications', order: 1 },
      { title: 'M11.L2 — Viral Encephalitis and CNS Immunocompromised Infections', order: 2 },
      { title: 'M11.L3 — Ventriculitis and Intracranial Abscess', order: 3 },
      { title: 'M11.L4 — Traumatic Brain Injury: Classification, Monitoring, and Management', order: 4 },
    ],
  },
  {
    title: 'M12 — Sepsis, Shock, and Arrhythmias',
    description: 'Sepsis recognition, four shock types, vasopressor selection, and arrhythmia management in the Neuro ICU',
    category: 'Critical Care Fundamentals',
    order_index: 12,
    lessons: [
      {
        title: 'M12.L1 — Sepsis: Recognition, Source Control, and Antibiotics',
        order_index: 1,
      },
      {
        title: 'M12.L2 — Shock: Classification, Hemodynamics, and Vasopressors',
        order_index: 2,
      },
      {
        title: 'M12.L3 — Atrial Fibrillation with RVR and Bradyarrhythmias',
        order_index: 3,
      },
      {
        title: 'M12.L4 — Pulmonary Embolism and Obstructive Shock',
        order_index: 4,
      },
    ],
  },
  {
    title: 'M13 — Supportive Care Pearls',
    description: 'Sodium management, DVT prophylaxis, BP pearls, insulin, IV fluids, AKI, pain management, and CT/MRI basics',
    category: 'Critical Care Fundamentals',
    order_index: 13,
    lessons: [
      {
        title: 'M13.L1 — Sodium and Fluid Management: SIADH, CSW, and Hypernatremia',
        order_index: 1,
      },
      {
        title: 'M13.L2 — DVT Prophylaxis, BP Management, and Glucose Control',
        order_index: 2,
      },
      {
        title: 'M13.L3 — AKI, Pain Management, and Anti-Emetics',
        order_index: 3,
      },
      {
        title: 'M13.L4 — CT and MRI Basics for the Neuro ICU',
        order_index: 4,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Setup function — inserts modules and empty lesson shells
// ─────────────────────────────────────────────────────────────────────────────
async function setup() {
  console.log('🔧 Setting up M11–M13 module shells...\n');

  for (const mod of modules) {
    // ── Insert module ───────────────────────────────────────────────────────
    const { data: moduleData, error: moduleError } = await supabase
      .from('curriculum_modules')
      .insert({
        title: mod.title,
        description: mod.description,
        category: mod.category,
        order_index: mod.order_index,
      })
      .select('id')
      .single();

    if (moduleError) {
      console.log(`❌ Module insert failed: ${mod.title}`);
      console.log(`   ${moduleError.message}`);
      continue;
    }

    console.log(`✅ Module created: ${mod.title} (id: ${moduleData.id})`);

    // ── Insert lesson shells ────────────────────────────────────────────────
    for (const lesson of mod.lessons) {
      const emptyContent = JSON.stringify({
        title: lesson.title,
        duration_min: 0,
        blocks: [],
      });

      const { error: lessonError } = await supabase
        .from('module_lessons')
        .insert({
          module_id: moduleData.id,
          title: lesson.title,
          order_index: lesson.order_index,
          content: emptyContent,
        });

      if (lessonError) {
        console.log(`  ❌ Lesson insert failed: ${lesson.title}`);
        console.log(`     ${lessonError.message}`);
      } else {
        console.log(`  ✅ Lesson created: ${lesson.title}`);
      }
    }

    console.log(''); // blank line between modules for readability
  }

  console.log('✨ Done!');
  process.exit(0);
}

setup().catch(console.error);
