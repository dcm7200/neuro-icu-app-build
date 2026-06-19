/**
 * inject-lesson-visuals-r2.js — Round 2
 * Remaining 14 lessons: M05.L3-L4, M06.L2-L4, M07.L2-L4, M08.L1/L3/L4, M10.L2-L4
 * Built by Sage 🦉 on 2026-06-19
 */

const { createClient } = require('@supabase/supabase-js');
const sb = createClient(
  'https://onrdlphtuditorofccna.supabase.co',
  'eyJhbG…9B5o'
);

const INJECTIONS = [
  // M05
  {
    title: 'M05.L3 — Serial Trending: Detecting Change and When to Escalate',
    pos: 1,
    url: '/images/lessons/m05-deterioration-escalation.svg',
    caption: 'Neurological Deterioration Thresholds: Any change ≥2 GCS points, new pupil asymmetry, new focal deficit, or posturing = call the attending now. Trending over time matters more than any single value.'
  },
  {
    title: 'M05.L4 — Common Abnormal Findings and Localization',
    pos: 1,
    url: '/images/lessons/m05-localization.svg',
    caption: 'Neuroanatomical Localization: Match the deficit to the lesion. Crossed deficits (ipsilateral CN + contralateral body) always localize to the brainstem. Frontal = motor/personality. Parietal = sensory/neglect. Temporal = language/memory. Occipital = vision.'
  },
  // M06
  {
    title: 'M06.L2 — Vasospasm: Recognition, Monitoring, and Treatment',
    pos: 1,
    url: '/images/lessons/m06-vasospasm-timeline.svg',
    caption: 'Vasospasm Timeline: Risk window Day 3–21, peak Day 7–10. DCI occurs in 30% of aSAH — it is the leading cause of post-SAH morbidity. Nimodipine every 6 hours × 21 days is mandatory. Induced hypertension is first-line for symptomatic DCI.'
  },
  {
    title: 'M06.L3 — Spontaneous ICH: Workup, Bundle, and Surgical Criteria',
    pos: 1,
    url: '/images/lessons/m06-ich-score.svg',
    caption: 'ICH Score and Surgical Decision: ICH score 3 = 72% mortality; score 4–6 = near-universal. Surgical evacuation benefits cerebellar ICH >3cm and lobar hematomas in deteriorating patients. Deep/thalamic/ganglionic location = rarely surgical.'
  },
  {
    title: 'M06.L4 — Anticoagulation Reversal and Rebleeding Prevention',
    pos: 1,
    url: '/images/lessons/m06-anticoag-reversal.svg',
    caption: 'Anticoagulation Reversal: Identify the agent immediately — warfarin → 4F-PCC + Vit K | UFH → protamine | Factor Xa → andexanet alfa or 4F-PCC | Dabigatran → idarucizumab. Do not wait for full labs to begin reversal in ICH.'
  },
  // M07
  {
    title: 'M07.L2 — Post-Intervention Care: Hemorrhagic Transformation and BP Management',
    pos: 1,
    url: '/images/lessons/m07-bp-management.svg',
    caption: 'Post-Stroke BP Targets: Targets differ critically by scenario. Post-tPA: SBP <180/105 strictly. No tPA/no LVO: permissive up to 220/120. HT/ICH: aggressive <140. Wrong target = infarct extension or hemorrhage.'
  },
  {
    title: 'M07.L3 — Guillain-Barré Syndrome: Recognition, IVIG, and Respiratory Monitoring',
    pos: 1,
    url: '/images/lessons/m07-gbs-monitoring.svg',
    caption: 'GBS Respiratory Monitoring — Rule of 20-30: Intubate when FVC <20 mL/kg, MIP <-30 cmH₂O, or MEP <40 cmH₂O. SpO₂ stays normal until near-arrest. Do not rely on oxygen saturation alone to gauge respiratory failure in GBS.'
  },
  {
    title: 'M07.L4 — Myasthenic Crisis: Triggers, PLEX, and Ventilator Weaning',
    pos: 1,
    url: '/images/lessons/m07-plex-vs-ivig.svg',
    caption: 'PLEX vs IVIG: Both equally effective. PLEX preferred with IgA deficiency or renal failure. IVIG preferred when no central access or hemodynamic instability. Never combine — PLEX removes IVIG. Choose one and commit.'
  },
  // M08
  {
    title: 'M08.L1 — Seizure Classification and ICU Triggers',
    pos: 1,
    url: '/images/lessons/m08-seizure-classification.svg',
    caption: 'ILAE Seizure Classification: Onset type determines treatment. Focal vs. generalized vs. unknown — classification requires witnessed onset. In the NCC, always consider NCSE for unexplained AMS. Up to 25% of comatose ICU patients have subclinical seizures detectable only on EEG.'
  },
  {
    title: 'M08.L3 — Nonconvulsive SE and Continuous EEG Interpretation',
    pos: 1,
    url: '/images/lessons/m08-eeg-patterns.svg',
    caption: 'Key EEG Patterns: Know burst suppression (barbiturate coma target), electrographic seizures (treat immediately), GPDs/LPDs (ictal-interictal continuum — call neurology), and electrocerebral silence (brain death ancillary). Normal background = reassuring.'
  },
  {
    title: 'M08.L4 — AED Selection, Levels, and Long-Term Planning',
    pos: 1,
    url: '/images/lessons/m08-aed-comparison.svg',
    caption: 'AED Quick Reference: LEV (Keppra) is the NCC default — no hepatic metabolism, no drug interactions. VPA second-line (avoid in pregnancy/liver disease). Fosphenytoin requires continuous ECG during loading. Free phenytoin level critical in hypoalbuminemia patients.'
  },
  // M10
  {
    title: 'M10.L2 — Apnea Test and Ancillary Testing',
    pos: 1,
    url: '/images/lessons/m10-apnea-test.svg',
    caption: 'Apnea Test Protocol: PaCO₂ must rise ≥20 mmHg AND reach ≥60 mmHg with no respiratory effort = positive test. Abort if SpO₂ <85%, SBP <90, or arrhythmia. Abort → use ancillary testing (EEG, nuclear scan, or cerebral angiography).'
  },
  {
    title: 'M10.L3 — Disorders of Consciousness: Coma, VS, MCS, and EMCS',
    pos: 1,
    url: '/images/lessons/m10-consciousness-spectrum.svg',
    caption: 'Disorders of Consciousness Spectrum: VS is misdiagnosed in up to 40% of cases — use CRS-R, not clinical impression. Locked-in syndrome = fully conscious, not unconscious. Always talk to the patient. EMCS requires structured communication assessment and rehab referral.'
  },
  {
    title: 'M10.L4 — Organ Donation Pathway and Family Communication',
    pos: 1,
    url: '/images/lessons/m10-organ-donation.svg',
    caption: 'Organ Donation Pathway: OPO notification is mandatory at anticipated or confirmed brain death. The clinical team communicates the death; OPO makes the donation request — decoupled approach significantly improves consent rates. Donor management is active medical care.'
  }
];

function insertAt(blocks, pos, block) {
  const result = [...blocks];
  result.splice(pos, 0, block);
  return result;
}

async function main() {
  console.log('🦉 Sage — Round 2 visual injection\n');

  const moduleIds = [
    '00672257-13b2-4e6d-b364-73e3da3dd26c',
    'b7f29cb0-3158-4d02-8a57-d11ff8dbfe7f',
    '2306fd88-d9a7-4b12-99f3-25dbeffcfdf6',
    '433f60f4-6e4e-44b6-857b-435ebabbc05d',
    'c7d7896d-ccc8-4620-91cf-1da867b4219e',
    '4d6cc322-15e8-41a5-917b-58f98032401e'
  ];

  const { data: lessons, error } = await sb
    .from('module_lessons')
    .select('id, title, content')
    .in('module_id', moduleIds);

  if (error) { console.error('❌ Fetch failed:', error); process.exit(1); }

  let updated = 0, skipped = 0;

  for (const inj of INJECTIONS) {
    const lesson = lessons.find(l => l.title === inj.title);
    if (!lesson) { console.warn(`⚠️  Not found: ${inj.title}`); skipped++; continue; }

    let content;
    try { content = typeof lesson.content === 'string' ? JSON.parse(lesson.content) : lesson.content; }
    catch { console.error(`❌ Parse error: ${inj.title}`); skipped++; continue; }

    if (!content?.blocks) { console.warn(`⚠️  No blocks: ${inj.title}`); skipped++; continue; }

    const alreadyHasImage = content.blocks.some(b => b.type === 'image' && b.content?.url === inj.url);
    if (alreadyHasImage) { console.log(`⏭️  Already injected: ${inj.title}`); skipped++; continue; }

    const newBlock = { type: 'image', content: { url: inj.url, caption: inj.caption } };
    const blocks = insertAt(content.blocks, inj.pos, newBlock);
    const updatedContent = { ...content, blocks };

    const { error: updateError } = await sb
      .from('module_lessons').update({ content: updatedContent }).eq('id', lesson.id);

    if (updateError) { console.error(`❌ Update failed: ${inj.title}`, updateError); skipped++; }
    else { console.log(`✅ ${inj.title}`); updated++; }
  }

  console.log(`\n🎉 Round 2 done. Updated: ${updated} | Skipped: ${skipped}`);
}

main().catch(console.error);
