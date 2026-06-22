#!/usr/bin/env node
// Fix: insert lessons for already-created M11/M12/M13 modules
// Modules were created by setup-m11-m13.mjs but lessons failed (wrong column name)
// This script finds each module by title and inserts lessons with correct column: lesson_order
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => { if(line&&!line.startsWith('#')){const[k,...v]=line.split('=');env[k.trim()]=v.join('=').trim();} });
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {auth:{autoRefreshToken:false,persistSession:false}});

const modules = [
  {
    title: 'M11 — CNS Infections and Traumatic Brain Injury',
    lessons: [
      { title: 'M11.L1 — Bacterial Meningitis: Empiric Treatment, LP Workup, and Complications', lesson_order: 1 },
      { title: 'M11.L2 — Viral Encephalitis and CNS Immunocompromised Infections', lesson_order: 2 },
      { title: 'M11.L3 — Ventriculitis and Intracranial Abscess', lesson_order: 3 },
      { title: 'M11.L4 — Traumatic Brain Injury: Classification, Monitoring, and Management', lesson_order: 4 },
    ]
  },
  {
    title: 'M12 — Sepsis, Shock, and Arrhythmias',
    lessons: [
      { title: 'M12.L1 — Sepsis: Recognition, Source Control, and Antibiotics', lesson_order: 1 },
      { title: 'M12.L2 — Shock: Classification, Hemodynamics, and Vasopressors', lesson_order: 2 },
      { title: 'M12.L3 — Atrial Fibrillation with RVR and Bradyarrhythmias', lesson_order: 3 },
      { title: 'M12.L4 — Pulmonary Embolism and Obstructive Shock', lesson_order: 4 },
    ]
  },
  {
    title: 'M13 — Supportive Care Pearls',
    lessons: [
      { title: 'M13.L1 — Sodium and Fluid Management: SIADH, CSW, and Hypernatremia', lesson_order: 1 },
      { title: 'M13.L2 — DVT Prophylaxis, BP Management, and Glucose Control', lesson_order: 2 },
      { title: 'M13.L3 — AKI, Pain Management, and Anti-Emetics', lesson_order: 3 },
      { title: 'M13.L4 — CT and MRI Basics for the Neuro ICU', lesson_order: 4 },
    ]
  },
];

async function fix() {
  console.log('🔧 Inserting lessons for M11–M13...\n');
  for (const mod of modules) {
    const { data: modData, error: modErr } = await supabase
      .from('curriculum_modules')
      .select('id')
      .eq('title', mod.title)
      .single();
    if (modErr || !modData) { console.log(`❌ Module not found: ${mod.title}`); continue; }
    console.log(`📦 Module: ${mod.title} (${modData.id})`);

    for (const lesson of mod.lessons) {
      const { error } = await supabase.from('module_lessons').insert({
        module_id: modData.id,
        title: lesson.title,
        lesson_order: lesson.lesson_order,
        content: JSON.stringify({ title: lesson.title, duration_min: 0, blocks: [] })
      });
      if (error) console.log(`  ❌ ${lesson.title} — ${error.message}`);
      else console.log(`  ✅ ${lesson.title}`);
    }
    console.log('');
  }
  console.log('✨ Done!');
  process.exit(0);
}
fix().catch(console.error);
