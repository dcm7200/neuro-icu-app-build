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

const modules = [
  {
    title: 'M06 — Hemorrhagic Stroke: SAH and ICH',
    description: 'Aneurysmal SAH, spontaneous ICH, vasospasm management, and surgical pathways',
    category: 'Clinical Diagnoses',
    order_index: 6,
    lessons: [
      { title: 'M06.L1 — Aneurysmal SAH: Presentation, Grading, and Acute Management', order: 1 },
      { title: 'M06.L2 — Vasospasm: Recognition, Monitoring, and Treatment', order: 2 },
      { title: 'M06.L3 — Spontaneous ICH: Workup, Bundle, and Surgical Criteria', order: 3 },
      { title: 'M06.L4 — Anticoagulation Reversal and Rebleeding Prevention', order: 4 },
    ]
  },
  {
    title: 'M07 — Ischemic Stroke and Neuromuscular Disease',
    description: 'Acute ischemic stroke management, LVO, post-tPA care, GBS, and myasthenic crisis',
    category: 'Clinical Diagnoses',
    order_index: 7,
    lessons: [
      { title: 'M07.L1 — Acute Ischemic Stroke: tPA, Thrombectomy, and LVO Workup', order: 1 },
      { title: 'M07.L2 — Post-Intervention Care: Hemorrhagic Transformation and BP Management', order: 2 },
      { title: 'M07.L3 — Guillain-Barré Syndrome: Recognition, IVIG, and Respiratory Monitoring', order: 3 },
      { title: 'M07.L4 — Myasthenic Crisis: Triggers, PLEX, and Ventilator Weaning', order: 4 },
    ]
  },
  {
    title: 'M08 — Seizures and Status Epilepticus',
    description: 'Seizure types, status epilepticus protocol, refractory SE, and EEG monitoring',
    category: 'Clinical Diagnoses',
    order_index: 8,
    lessons: [
      { title: 'M08.L1 — Seizure Classification and ICU Triggers', order: 1 },
      { title: 'M08.L2 — Status Epilepticus: First-Line Through Refractory Management', order: 2 },
      { title: 'M08.L3 — Nonconvulsive SE and Continuous EEG Interpretation', order: 3 },
      { title: 'M08.L4 — AED Selection, Levels, and Long-Term Planning', order: 4 },
    ]
  },
  {
    title: 'M09 — Intracranial Pressure and Herniation',
    description: 'ICP physiology, monitoring, medical and surgical management, and herniation recognition',
    category: 'Pathophysiology & Protocols',
    order_index: 9,
    lessons: [
      { title: 'M09.L1 — ICP Physiology, CPP, and Autoregulation', order: 1 },
      { title: 'M09.L2 — ICP Monitoring: EVD, Bolt, Waveforms, and Troubleshooting', order: 2 },
      { title: 'M09.L3 — Medical ICP Management: Tiered Protocol', order: 3 },
      { title: 'M09.L4 — Herniation Syndromes: Recognition and Emergency Response', order: 4 },
    ]
  },
  {
    title: 'M10 — Brain Death and Disorders of Consciousness',
    description: 'Brain death evaluation, DoC spectrum, prognosis, and organ donation pathway',
    category: 'Pathophysiology & Protocols',
    order_index: 10,
    lessons: [
      { title: 'M10.L1 — Brain Death: Criteria, Prerequisites, and Clinical Exam', order: 1 },
      { title: 'M10.L2 — Apnea Test and Ancillary Testing', order: 2 },
      { title: 'M10.L3 — Disorders of Consciousness: Coma, VS, MCS, and EMCS', order: 3 },
      { title: 'M10.L4 — Organ Donation Pathway and Family Communication', order: 4 },
    ]
  },
];

async function setup() {
  console.log('🔧 Creating M06–M10 modules and lessons...\n');
  for (const mod of modules) {
    const { data: m, error: me } = await supabase
      .from('curriculum_modules')
      .insert({ title: mod.title, description: mod.description, category: mod.category, order_index: mod.order_index })
      .select('id').single();
    if (me) { console.error('❌ Module failed:', mod.title, me.message); continue; }
    console.log('✅ Module:', mod.title);

    for (const l of mod.lessons) {
      const { error: le } = await supabase.from('module_lessons').insert({
        module_id: m.id,
        title: l.title,
        lesson_order: l.order,
        content: JSON.stringify({ title: l.title, duration_min: 0, blocks: [] })
      });
      if (le) console.error('  ❌ Lesson:', l.title, le.message);
      else console.log('  ✅', l.title);
    }
  }
  console.log('\n✨ Structure done.');
  process.exit(0);
}
setup().catch(console.error);
