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

const M11_ID = '6f130a22-c612-413e-968e-5721e6e2455d';
const M12_ID = 'd6109218-edd7-40a7-91f5-826ad5eea8d5';
const M13_ID = 'cc35676f-6eae-4b2a-8b25-2934a3fc3169';
const TBI_LESSON_ID = '1998be34-c4bb-4791-b5af-f9fe086067a9';

async function migrate() {
  // 1. Shift M13 (14→15) then M12 (13→14) — highest first
  console.log('Step 1: Shifting M12 and M13 up...');
  for (const [id, from, to, label] of [
    [M13_ID, 14, 15, 'M13 Supportive Care'],
    [M12_ID, 13, 14, 'M12 Sepsis'],
  ]) {
    const { error } = await supabase.from('curriculum_modules').update({ order_index: to }).eq('id', id);
    if (error) { console.error('  ❌', label, error.message); process.exit(1); }
    console.log(`  ✅ ${label}: ${from} → ${to}`);
  }

  // 2. Create TBI module at slot 13
  console.log('\nStep 2: Creating TBI module (slot 13)...');
  const { data: newMod, error: modErr } = await supabase
    .from('curriculum_modules')
    .insert({
      title: 'Traumatic Brain Injury',
      description: 'TBI classification, severity grading, secondary injury prevention, ICP monitoring, and acute management in the Neuro ICU',
      category: 'Clinical Diagnoses',
      order_index: 13,
    })
    .select('id').single();
  if (modErr) { console.error('  ❌', modErr.message); process.exit(1); }
  console.log('  ✅ Created:', newMod.id);

  // 3. Move TBI lesson to new module
  console.log('\nStep 3: Moving TBI lesson...');
  const { error: lessonErr } = await supabase.from('module_lessons')
    .update({
      module_id: newMod.id,
      lesson_order: 1,
      title: 'L1 — Traumatic Brain Injury: Classification, Monitoring, and Management',
    })
    .eq('id', TBI_LESSON_ID);
  if (lessonErr) { console.error('  ❌', lessonErr.message); process.exit(1); }
  console.log('  ✅ TBI lesson → Traumatic Brain Injury module, order 1');

  // 4. Rename M11 to CNS Infections only
  console.log('\nStep 4: Renaming M11 to CNS Infections...');
  const { error: m11Err } = await supabase.from('curriculum_modules')
    .update({
      title: 'M11 — CNS Infections',
      description: 'Bacterial meningitis, viral encephalitis, CNS infections in the immunocompromised, ventriculitis, and intracranial abscess',
    })
    .eq('id', M11_ID);
  if (m11Err) { console.error('  ❌', m11Err.message); process.exit(1); }
  console.log('  ✅ M11 renamed to "M11 — CNS Infections"');

  // 5. Show final order
  console.log('\n─── Final module order ───────────────────────');
  const { data: mods } = await supabase.from('curriculum_modules').select('order_index,title').order('order_index');
  mods.forEach(m => console.log(`  ${String(m.order_index).padStart(2)}  ${m.title}`));

  console.log('\n✨ Done!');
  process.exit(0);
}

migrate().catch(console.error);
