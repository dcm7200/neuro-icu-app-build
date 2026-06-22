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

const M13_ID       = 'cc35676f-6eae-4b2a-8b25-2934a3fc3169';
const LESSON_ID    = '93aab7d9-178a-423e-81a9-50b701eb4b93';

async function migrate() {
  // 1. Create new module at slot 16
  console.log('Step 1: Creating CT and MRI Basics module (slot 16)...');
  const { data: newMod, error: modErr } = await supabase
    .from('curriculum_modules')
    .insert({
      title: 'CT and MRI Basics',
      description: 'CT windowing, Hounsfield units, MRI sequences, DWI-ADC interpretation, contrast allergy premedication, and neuroimaging pearls for the Neuro ICU',
      category: 'Critical Care Fundamentals',
      order_index: 16,
    })
    .select('id').single();
  if (modErr) { console.error('❌', modErr.message); process.exit(1); }
  console.log('  ✅ Created:', newMod.id);

  // 2. Move lesson to new module
  console.log('\nStep 2: Moving CT and MRI Basics lesson...');
  const { error: lessonErr } = await supabase.from('module_lessons')
    .update({
      module_id:    newMod.id,
      lesson_order: 1,
      title: 'L1 — CT and MRI Basics for the Neuro ICU',
    })
    .eq('id', LESSON_ID);
  if (lessonErr) { console.error('❌', lessonErr.message); process.exit(1); }
  console.log('  ✅ Lesson moved → CT and MRI Basics, order 1');

  // 3. Update M13 description to reflect it no longer includes imaging
  console.log('\nStep 3: Updating M13 description...');
  const { error: m13Err } = await supabase.from('curriculum_modules')
    .update({
      description: 'Sodium management, DVT prophylaxis, BP pearls, insulin, IV fluids, AKI, pain management, and anti-emetics',
    })
    .eq('id', M13_ID);
  if (m13Err) { console.error('❌', m13Err.message); process.exit(1); }
  console.log('  ✅ M13 description updated');

  // 4. Show final order
  console.log('\n─── Final module order ───────────────────────');
  const { data: mods } = await supabase.from('curriculum_modules').select('order_index,title').order('order_index');
  mods.forEach(m => console.log(`  ${String(m.order_index).padStart(2)}  ${m.title}`));

  console.log('\n✨ Done!');
  process.exit(0);
}

migrate().catch(console.error);
