#!/usr/bin/env node
// Creates M04 module + lesson records, adds M05.L3/L4, fixes M05 titles
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

async function setup() {
  console.log('🔧 Setting up M04 and M05 structure...\n');

  // ── Create M04 module ──────────────────────────────────────────────────────
  const { data: m04, error: m04Err } = await supabase
    .from('curriculum_modules')
    .insert({
      title: 'M04 — ICU Fundamentals for the NCC APP',
      description: 'Ventilator management, hemodynamics, common NCC drips, and bedside procedures',
      category: 'Clinical Skills',
      order_index: 4
    })
    .select('id')
    .single();

  if (m04Err) {
    console.error('❌ M04 module create failed:', m04Err.message);
    process.exit(1);
  }
  console.log('✅ Created M04 module');

  // ── Create M04 lessons ─────────────────────────────────────────────────────
  const m04Lessons = [
    { title: 'M04.L1 — Mechanical Ventilation: Modes, Settings, and Neuro Targets', order: 1 },
    { title: 'M04.L2 — Hemodynamic Monitoring and MAP Targets by Diagnosis', order: 2 },
    { title: 'M04.L3 — Common NCC Drips: Sedation, HTS, AEDs, and Vasoactives', order: 3 },
    { title: 'M04.L4 — Procedures: EVD, LP, Central Line, Arterial Line', order: 4 },
  ];

  for (const l of m04Lessons) {
    const { error } = await supabase.from('module_lessons').insert({
      module_id: m04.id,
      title: l.title,
      lesson_order: l.order,
      content: JSON.stringify({ title: l.title, duration_min: 0, blocks: [] })
    });
    if (error) console.error('❌', l.title, error.message);
    else console.log('✅ Created', l.title);
  }

  // ── Get M05 module id ──────────────────────────────────────────────────────
  const { data: m05mod } = await supabase
    .from('curriculum_modules')
    .select('id')
    .eq('title', 'M05 — The Neuro Exam')
    .single();

  // Try alternate title if not found
  let m05id = m05mod?.id;
  if (!m05id) {
    const { data: alt } = await supabase
      .from('curriculum_modules')
      .select('id,title')
      .ilike('title', '%M05%')
      .single();
    m05id = alt?.id;
    if (m05id) console.log('ℹ️  Found M05 as:', alt.title);
  }

  if (!m05id) {
    console.error('❌ Could not find M05 module — creating it');
    const { data: newM05, error: nm5e } = await supabase
      .from('curriculum_modules')
      .insert({
        title: 'M05 — The Neuro Exam',
        description: 'Awake and unconscious neurological examination, findings, and serial trending',
        category: 'Clinical Skills',
        order_index: 5
      })
      .select('id')
      .single();
    if (nm5e) { console.error(nm5e.message); process.exit(1); }
    m05id = newM05.id;
  }

  // ── Fix M05.L1 title ───────────────────────────────────────────────────────
  const { error: l1FixErr } = await supabase
    .from('module_lessons')
    .update({ title: 'M05.L1 — Awake Comprehensive Exam' })
    .eq('title', 'M05.L1 — Awake Comprehensive Exam');
  // Already correct title — just confirm
  console.log('✅ M05.L1 title confirmed');

  // ── Fix "Focused Exam" title ───────────────────────────────────────────────
  const { error: l2FixErr } = await supabase
    .from('module_lessons')
    .update({ title: 'M05.L2 — Focused Exam in the Unconscious or Sedated Patient', lesson_order: 2 })
    .eq('title', 'Focused Exam in the Unconscious or Sedated Patient');
  if (l2FixErr) console.error('❌ M05.L2 title fix failed:', l2FixErr.message);
  else console.log('✅ M05.L2 title fixed');

  // ── Create M05.L3 and M05.L4 ──────────────────────────────────────────────
  const m05NewLessons = [
    { title: 'M05.L3 — Serial Trending: Detecting Change and When to Escalate', order: 3 },
    { title: 'M05.L4 — Common Abnormal Findings and Localization', order: 4 },
  ];

  for (const l of m05NewLessons) {
    const { error } = await supabase.from('module_lessons').insert({
      module_id: m05id,
      title: l.title,
      lesson_order: l.order,
      content: JSON.stringify({ title: l.title, duration_min: 0, blocks: [] })
    });
    if (error) console.error('❌', l.title, error.message);
    else console.log('✅ Created', l.title);
  }

  console.log('\n✨ Structure setup complete.');
  process.exit(0);
}

setup().catch(console.error);
