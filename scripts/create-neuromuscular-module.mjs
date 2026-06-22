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

const M07_ID = '2306fd88-d9a7-4b12-99f3-25dbeffcfdf6';
const GBS_ID = '83ad52a2-fee8-4985-8ccf-31170b09dab5';
const MG_ID  = 'cc1947d8-4826-4243-a28e-c56f1cf1cbac';

// M08-M13 need to shift up by 1 (in reverse order to avoid unique constraint collision)
const toShift = [
  { id: 'cc35676f-6eae-4b2a-8b25-2934a3fc3169', label: 'M13 Supportive Care',  from: 13, to: 14 },
  { id: 'd6109218-edd7-40a7-91f5-826ad5eea8d5', label: 'M12 Sepsis',           from: 12, to: 13 },
  { id: '6f130a22-c612-413e-968e-5721e6e2455d', label: 'M11 CNS Infections',   from: 11, to: 12 },
  { id: '4d6cc322-15e8-41a5-917b-58f98032401e', label: 'M10 Brain Death',      from: 10, to: 11 },
  { id: 'c7d7896d-ccc8-4620-91cf-1da867b4219e', label: 'M09 ICP',              from: 9,  to: 10 },
  { id: '433f60f4-6e4e-44b6-857b-435ebabbc05d', label: 'M08 Seizures',         from: 8,  to: 9  },
];

async function migrate() {
  // Step 1: shift existing modules 8-13 up one slot (highest first)
  console.log('Step 1: Shifting M08-M13 up by one slot...');
  for (const s of toShift) {
    const { error } = await supabase.from('curriculum_modules')
      .update({ order_index: s.to }).eq('id', s.id);
    if (error) { console.error('  ❌', s.label, error.message); process.exit(1); }
    console.log(`  ✅ ${s.label}: ${s.from} → ${s.to}`);
  }

  // Step 2: create Neuromuscular Disorders at slot 8
  console.log('\nStep 2: Creating Neuromuscular Disorders module (slot 8)...');
  const { data: newMod, error: modErr } = await supabase
    .from('curriculum_modules')
    .insert({
      title: 'Neuromuscular Disorders',
      description: 'Guillain-Barré syndrome, myasthenic crisis, respiratory monitoring, PLEX, IVIG, and ventilator weaning in the Neuro ICU',
      category: 'Clinical Diagnoses',
      order_index: 8,
    })
    .select('id').single();
  if (modErr) { console.error('  ❌ Module create failed:', modErr.message); process.exit(1); }
  console.log('  ✅ Created:', newMod.id);

  // Step 3: move GBS lesson → new module
  console.log('\nStep 3: Moving GBS lesson...');
  const { error: gbsErr } = await supabase.from('module_lessons')
    .update({ module_id: newMod.id, lesson_order: 1, title: 'L1 — Guillain-Barré Syndrome: Recognition, IVIG, and Respiratory Monitoring' })
    .eq('id', GBS_ID);
  if (gbsErr) { console.error('  ❌', gbsErr.message); process.exit(1); }
  console.log('  ✅ GBS → Neuromuscular Disorders, order 1');

  // Step 4: move MG lesson → new module
  console.log('\nStep 4: Moving Myasthenic Crisis lesson...');
  const { error: mgErr } = await supabase.from('module_lessons')
    .update({ module_id: newMod.id, lesson_order: 2, title: 'L2 — Myasthenic Crisis: Triggers, PLEX, and Ventilator Weaning' })
    .eq('id', MG_ID);
  if (mgErr) { console.error('  ❌', mgErr.message); process.exit(1); }
  console.log('  ✅ MG → Neuromuscular Disorders, order 2');

  // Step 5: rename M07 to stroke-only
  console.log('\nStep 5: Renaming M07 to Acute Ischemic Stroke...');
  const { error: m07Err } = await supabase.from('curriculum_modules')
    .update({
      title: 'M07 — Acute Ischemic Stroke',
      description: 'Acute ischemic stroke: tPA, thrombectomy, LVO workup, post-intervention care, hemorrhagic transformation, and BP management',
    })
    .eq('id', M07_ID);
  if (m07Err) { console.error('  ❌', m07Err.message); process.exit(1); }
  console.log('  ✅ M07 renamed');

  // Step 6: verify final order
  console.log('\n─── Final module order ───────────────────────');
  const { data: mods } = await supabase.from('curriculum_modules').select('order_index,title').order('order_index');
  mods.forEach(m => console.log(`  ${String(m.order_index).padStart(2)}  ${m.title}`));

  console.log('\n✨ Done!');
  process.exit(0);
}

migrate().catch(console.error);
