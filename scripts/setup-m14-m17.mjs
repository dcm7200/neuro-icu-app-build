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
// Module definitions — SCCM content (M14–M17)
// ─────────────────────────────────────────────────────────────────────────────
const modules = [
  {
    title: 'M14 — Acute Respiratory Failure and ARDS',
    description: 'ARDS diagnosis using Berlin Criteria, lung-protective ventilation (ARDSnet), PEEP optimization, prone positioning (PROSEVA), and weaning with SBT',
    category: 'Critical Care Fundamentals',
    order_index: 14,
    lessons: [
      { title: 'M14.L1 — ARDS: Diagnosis, Berlin Criteria, and Case Presentation', order_index: 1 },
      { title: 'M14.L2 — Lung-Protective Ventilation: ARDSnet Protocol and PEEP Management', order_index: 2 },
      { title: 'M14.L3 — Prone Positioning in Severe ARDS: PROSEVA Trial and Technique', order_index: 3 },
      { title: 'M14.L4 — Weaning from Mechanical Ventilation: SBT Protocol', order_index: 4 },
    ],
  },
  {
    title: 'M15 — Sedation, Analgesia, and Neuromuscular Blockade',
    description: 'Agitation epidemiology, validated sedation/pain scales, daily awakening trials, sedative and analgesic agents, and neuromuscular blockade in the ICU',
    category: 'Critical Care Fundamentals',
    order_index: 15,
    lessons: [
      { title: 'M15.L1 — Agitation, Sedation Goals, and Daily Awakening Trials', order_index: 1 },
      { title: 'M15.L2 — Sedative Agents: Pharmacology and Clinical Selection', order_index: 2 },
      { title: 'M15.L3 — Pain Assessment and Opioid Analgesics in the ICU', order_index: 3 },
      { title: 'M15.L4 — Neuromuscular Blockade: Indications, Agents, and Monitoring', order_index: 4 },
    ],
  },
  {
    title: 'M16 — Shock: Classification, Hemodynamics, and Management',
    description: 'Sepsis-3 definitions, four shock types (Shubin-Weill), hemodynamic profiles, vasopressor selection, corticosteroids, and trial evidence (PROSEVA, SOAP-2, ADRENAL, DanGer)',
    category: 'Critical Care Fundamentals',
    order_index: 16,
    lessons: [
      { title: 'M16.L1 — Septic Shock: Sepsis-3 Definitions, Diagnosis, and SSC Guidelines', order_index: 1 },
      { title: 'M16.L2 — Distributive Shock: Sepsis, Anaphylaxis, and Neurogenic Shock', order_index: 2 },
      { title: 'M16.L3 — Cardiogenic and Obstructive Shock: Identification and Management', order_index: 3 },
      { title: 'M16.L4 — Vasopressors, Corticosteroids, and Fluid Resuscitation in Shock', order_index: 4 },
    ],
  },
  {
    title: 'M17 — Toxicology and Drug Overdose in the ICU',
    description: 'Toxicology assessment framework, common toxidromes (cholinergic, toxic alcohols, salicylism), IMPACT mnemonic for AGMA, and therapeutic adjuncts in overdose',
    category: 'Critical Care Fundamentals',
    order_index: 17,
    lessons: [
      { title: 'M17.L1 — Toxicology Assessment: History, ECG, and Lab Approach', order_index: 1 },
      { title: 'M17.L2 — Cholinergic Syndrome and Toxic Alcohol Ingestion', order_index: 2 },
      { title: 'M17.L3 — Salicylate Poisoning and AGMA Differential (IMPACT)', order_index: 3 },
      { title: 'M17.L4 — Therapeutic Adjuncts and Supportive Care in Overdose', order_index: 4 },
    ],
  },
];

async function setup() {
  console.log('🔧 Setting up M14–M17 module shells (SCCM content)...\n');

  for (const mod of modules) {
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
    console.log('');
  }

  console.log('✨ Done! Now run the populate scripts for M14–M17.');
  process.exit(0);
}

setup().catch(console.error);
