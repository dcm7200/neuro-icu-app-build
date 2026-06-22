#!/usr/bin/env node
// Enriches M06-M10 lessons with:
//  1. APP-focused intro callout (prepended as first block)
//  2. Relevant SVG image block(s) injected at natural break points
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => { if(line&&!line.startsWith('#')){const[k,...v]=line.split('=');env[k.trim()]=v.join('=').trim();} });
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {auth:{autoRefreshToken:false,persistSession:false}});

// Helper: inject a block after the Nth occurrence of a given block type
function insertAfterType(blocks, type, block, nth = 1) {
  let count = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].type === type) {
      count++;
      if (count === nth) {
        blocks.splice(i + 1, 0, block);
        return blocks;
      }
    }
  }
  // fallback: append at end
  blocks.push(block);
  return blocks;
}

function img(url, caption) {
  return { type: 'image', content: { url, caption } };
}
function appCallout(text) {
  return { type: 'callout', content: { icon: 'info', title: '🩺 Your Role as NCC APP', text } };
}

// ─── Lesson enrichment definitions ───────────────────────────────────────────
// Each entry: { title, appText, images: [{ after: 'blockType', nth, url, caption }] }
const enrichments = [

  // ── M06: Hemorrhagic Stroke ──────────────────────────────────────────────
  {
    title: 'M06.L1 — Aneurysmal SAH: Presentation, Grading, and Acute Management',
    appText: 'As the NCC APP you are often first to grade the SAH, initiate the pre-securement bundle, and manage BP until neurosurgery secures the aneurysm. Know the Hunt-Hess and Fisher scales cold — the attending will ask on every admission. Start nimodipine, hold SQH, order TTE/troponin, and maintain SBP <140 mmHg. You manage the bridge.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m06-hunt-hess-fisher.svg', caption: 'Hunt-Hess grades clinical severity (grade at admission, not after resuscitation). Modified Fisher predicts vasospasm/DCI risk from CT blood pattern. Both guide ICU level of care and prognostication discussions.' },
      { after: 'table', nth: 1, url: '/images/lessons/m06-circle-of-willis.svg', caption: 'Circle of Willis anatomy — aneurysm location correlates with clinical deficits. Anterior communicating = ACA/frontal deficits or bilateral leg weakness. Posterior communicating = CN III palsy. MCA bifurcation = language/neglect. Basilar tip = coma.' },
    ]
  },
  {
    title: 'M06.L2 — Vasospasm: Recognition, Monitoring, and Treatment',
    appText: 'DCI is the leading cause of preventable death and disability after aSAH. As the APP, you own the daily TCD review, sodium checks every 6 hours, and the first call when a patient declines on Day 4-14. Know the Lindegaard ratio, recognize physiologic DCI warning signs (spontaneous diuresis, auto-hypertension), and have the CTA/CTP order ready. Call neurosurgery STAT — do not manage DCI solo.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m06-vasospasm-timeline.svg', caption: 'DCI occurs in ~30% of aSAH patients. Risk peaks Days 7-10 but persists until Day 21 — do not relax vigilance early. Nimodipine runs the full 21 days. TCDs screen daily; CTA/CTP confirms when exam changes.' },
    ]
  },
  {
    title: 'M06.L3 — Spontaneous ICH: Workup, Bundle, and Surgical Criteria',
    appText: 'In the first 6 hours of ICH, hematoma expansion is the primary threat — and you control the two interventions that stop it: BP reduction to SBP <150 and anticoagulation reversal. Calculate the ICH Score on every admission to anchor prognosis. Get CTA immediately (spot sign = expansion risk). Activate neurosurgery early for posterior fossa hemorrhage — EVD alone can cause upward herniation.',
    images: [
      { after: 'table', nth: 1, url: '/images/lessons/m06-ich-score.svg', caption: 'ICH Score predicts 30-day mortality. Score it on admission: GCS, volume (estimate as ABC/2 on CT), IVH, infratentorial location, age ≥80. A score of 3 carries ~72% 30-day mortality. Communicate this to family early with the attending.' },
    ]
  },
  {
    title: 'M06.L4 — Anticoagulation Reversal and Rebleeding Prevention',
    appText: 'As the APP, you identify the anticoagulant, confirm the last dose and INR/level, and initiate reversal without waiting. Every minute of uncorrected coagulopathy is continued hematoma expansion. Know the reversal agent for each drug class cold. Common pitfall: Pip/tazo for empiric antibiotics gets ordered and nobody realizes 4F-PCC is contraindicated in HIT patients — always check heparin allergy before ordering Kcentra.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m06-anticoag-reversal.svg', caption: 'Quick-reference reversal guide: Warfarin → Kcentra + Vit K. Dabigatran → Idarucizumab. Factor Xa inhibitors → 4F-PCC. Heparin → Protamine. tPA → Aminocaproic acid. DDAVP for antiplatelets. Plasma does NOT reverse tPA.' },
    ]
  },

  // ── M07: Ischemic Stroke & Neuromuscular ────────────────────────────────
  {
    title: 'M07.L1 — Acute Ischemic Stroke: tPA, Thrombectomy, and LVO Workup',
    appText: 'In the stroke code, you are coordinating imaging, labs, and eligibility review in parallel. Know the absolute tPA contraindications without looking them up — the clock is running. For LVO patients going to thrombectomy, your job starts when they return from the suite: BP management, neuro checks q1h, hemorrhagic transformation surveillance. "Time is brain" does not end at the groin puncture.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m07-tpa-algorithm.svg', caption: 'IV tPA eligibility decision tree. The 4.5-hour window applies to last known well, not symptom onset. Absolute contraindications include prior intracranial hemorrhage, active bleeding, and recent major surgery within 14 days. When in doubt, call the attending — do not delay for documentation.' },
    ]
  },
  {
    title: 'M07.L2 — Post-Intervention Care: Hemorrhagic Transformation and BP Management',
    appText: 'Post-tPA and post-thrombectomy care is an APP-owned workflow at BNI/SJHMC. You run hourly neuro checks, maintain strict BP targets, and recognize hemorrhagic transformation before the attending does. The mTICI score tells you how aggressively to control BP — 2b-3 reperfusion means the vessel is open and you need to prevent hyperperfusion. A new headache or BP spike at Hour 6 post-tPA is hemorrhagic transformation until proven otherwise.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m07-bp-management.svg', caption: 'Post-intervention BP targets by scenario. Post-tPA: SBP <180 for 24h (strict — no exceptions). Post-thrombectomy with successful reperfusion (mTICI 2b-3): SBP <160. Untreated permissive hypertension: SBP <220. Never use hydralazine — impairs autoregulation.' },
    ]
  },
  {
    title: 'M07.L3 — Guillain-Barré Syndrome: Recognition, IVIG, and Respiratory Monitoring',
    appText: 'GBS respiratory monitoring is one of the most high-stakes daily APP tasks. You do not wait for hypoxia — that is too late. Serial FVC and NIF every 4-6 hours, assess cough strength and voice quality, watch for thoracoabdominal dyssynchrony. The 20/30/40 rule is a screen only — your clinical judgment about trajectory overrides the numbers. When you think they are tiring, call the attending for elective intubation before the crash. Use rocuronium, NOT succinylcholine.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m07-gbs-monitoring.svg', caption: 'GBS respiratory monitoring checklist. Track FVC (most reliable), NIF, neck flexion, cough, voice, and work of breathing every 4-6h. Downward trajectory = impending failure. Elective intubation is always safer than emergent intubation in a GBS patient with bulbar compromise.' },
    ]
  },
  {
    title: 'M07.L4 — Myasthenic Crisis: Triggers, PLEX, and Ventilator Weaning',
    appText: 'As the NCC APP, you will coordinate the PLEX/IVIG decision with neurology and the apheresis team. Critical order-of-operations rule: if both are planned, PLEX first — IVIG is cleared by plasmapheresis and the IVIG infusion is wasted. Review the medication list on every MG admission and remove the offenders (beta-blockers, aminoglycosides, fluoroquinolones, magnesium). Hold pyridostigmine in the ICU — secretion risk outweighs benefit. Know the cholinergic vs myasthenic crisis distinction cold.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m07-plex-vs-ivig.svg', caption: 'PLEX vs IVIG in MG crisis: both are equally effective for acute crisis. PLEX works faster (2-3 days vs 5-10 days for IVIG). Give PLEX first if sequential therapy planned — IVIG is removed during plasmapheresis. PLEX requires central venous access; IVIG does not.' },
    ]
  },

  // ── M08: Seizures & Status Epilepticus ──────────────────────────────────
  {
    title: 'M08.L1 — Seizure Classification and ICU Triggers',
    appText: 'ICU seizures are frequently subtle or non-convulsive — eye deviation, rhythmic blinking, focal twitching, unexplained AMS. As the APP, you order the cEEG, manage the metabolic triggers, and recognize the high-risk window (post-cardiac arrest, SAH, TBI). If altered mental status is not explained by meds or metabolics, order continuous EEG and page neurology. Do not wait for convulsions.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m08-seizure-classification.svg', caption: 'Seizure classification: focal (aware vs. impaired awareness) vs. generalized. In the ICU, focal impaired-awareness seizures are the most commonly missed — they present as staring, automatisms, or postictal confusion without convulsions. Any unexplained AMS in a high-risk patient needs cEEG.' },
    ]
  },
  {
    title: 'M08.L2 — Status Epilepticus: First-Line Through Refractory Management',
    appText: 'You will be executing the SE ladder. Know it cold: Benzos first (lorazepam or midazolam), then second-line ASM (levetiracetam is go-to — fewest interactions), then call the attending before anesthetic drips. Non-negotiable rule: intubate BEFORE starting propofol, midazolam drip, or ketamine infusion for refractory SE. Monitor propofol infusion syndrome (triglycerides, LFTs, CK, lactate) every 12h on propofol drips >48h.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m08-se-ladder.svg', caption: 'SE treatment escalation ladder. Benzos are first-line (rapid, IV). Second-line: LEV, fosphenytoin, or valproate (ESETT trial — similar efficacy). Refractory SE requires intubation before anesthetic drips. Target burst suppression on cEEG. Ketamine is a viable option with hemodynamic instability.' },
    ]
  },
  {
    title: 'M08.L3 — Nonconvulsive SE and Continuous EEG Interpretation',
    appText: 'NCSE is the most missed diagnosis in the neuro ICU. As the APP, you are the daily liaison between the bedside and the LTM epilepsy attending (reach via TigerConnect, check-in several times per day). You act on their EEG reads — if they call LPD+ at 2 Hz and the patient is encephalopathic, you start a trial ASM. Know the pattern hierarchy: LPD+ is the highest seizure risk, GRDA is the lowest. Artifact recognition prevents unnecessary treatment.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m08-eeg-patterns.svg', caption: 'cEEG pattern risk hierarchy (Rodriguez Ruiz et al., JAMA Neurol 2017). LPD+ carries the highest seizure risk; GRDA the lowest. Patterns above the 1-1.5 Hz threshold warrant close attention and often a trial of treatment. Discuss ambiguous patterns with the LTM epilepsy attending.' },
    ]
  },
  {
    title: 'M08.L4 — AED Selection, Levels, and Long-Term Planning',
    appText: 'AED management is an APP core skill. Know your drug levels, interactions, and which patients need free phenytoin levels (hypoalbuminemia, renal failure). When weaning anesthetic drips after refractory SE, use EEG guidance — do not wean on a fixed schedule. Always investigate the underlying etiology simultaneously: LP, MRI, autoimmune panel. A patient in SE from anti-NMDA encephalitis needs immunotherapy, not just escalating AEDs.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m08-aed-comparison.svg', caption: 'AED comparison for ICU use. Levetiracetam: fewest drug interactions, safe in pregnancy, no level monitoring — default first choice. Fosphenytoin: many interactions, cardiac monitoring required, level-dependent. Valproate: hepatotoxicity/thrombocytopenia risk, contraindicated in pregnancy. Lacosamide: PR prolongation on EKG.' },
    ]
  },

  // ── M09: ICP & Herniation ────────────────────────────────────────────────
  {
    title: 'M09.L1 — ICP Physiology, CPP, and Autoregulation',
    appText: 'Every decision you make at the ICP bolt — positioning, sedation, osmotherapy, ventilator settings — is applied Monro-Kellie. You are managing volumes inside a rigid box. The CPP target is your north star: MAP - ICP = CPP ≥ 60 mmHg. Know the CO2-ICP relationship: rising CO2 dilates vessels → more blood volume → ICP rises. This is why you never let the PaCO2 drift above 45 without checking. And why hyperventilation is a bridge, not a treatment.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m09-monro-kellie.svg', caption: 'Monro-Kellie Doctrine: brain (80%) + blood (10%) + CSF (10%) = fixed total volume. Remove CSF (EVD drainage) or blood (surgical evacuation) to make room. Failure to compensate → exponential ICP rise. The pressure-volume curve inflects sharply — small volume changes cause large ICP spikes at high baseline ICP.' },
      { after: 'table', nth: 1, url: '/images/lessons/m09-autoregulation.svg', caption: 'Cerebral autoregulation maintains constant CBF across MAP 50-150 mmHg in the healthy brain. Injured brain loses autoregulation → pressure-passive flow. This means BP drops directly reduce CBF (ischemia) and BP spikes directly increase CBF and ICP (hyperemia). Maintain MAP in the safe zone for your patient.' },
    ]
  },
  {
    title: 'M09.L2 — ICP Monitoring: EVD, Bolt, Waveforms, and Troubleshooting',
    appText: 'EVD management is an NCC APP core procedural skill. Level to the external auditory meatus (EAM) every time position changes. Know your drain height order (number of cmH2O above/below EAM). Bright red blood in the EVD is a re-rupture emergency — close the drain, call neurosurgery STAT, stat CT. For the Raumedic bolt, do not make clinical decisions from the first 4-5 hours of readings (calibration period). The FiO2 challenge tells you if the PbtO2 probe is reading accurately.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m09-icp-waveforms.svg', caption: 'ICP waveform components: P1 (arterial pulsation) > P2 (brain compliance) > P3 (venous) in the normal brain. When P2 > P1, compliance is lost — the brain is on the steep part of the pressure-volume curve. A waves (plateau waves: ICP 50-100 mmHg for 5-20 min) signal impending herniation and require immediate action.' },
    ]
  },
  {
    title: 'M09.L3 — Medical ICP Management: Tiered Protocol',
    appText: 'You own Tier 0 and Tier 1 independently — these do not require attending sign-off for every action. HOB 30°, midline head, loosen collar, treat fever, normocarbia, EVD drainage: you execute these without a call. Tier 2 (hyperosmolar therapy) and Tier 3 (hyperventilation) need attending awareness. Tier 4 (barbiturate coma) is always an attending-driven decision. Never give 23.4% HTS peripherally — central line only. Do not give mannitol to a hypovolemic patient.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m09-tiered-icp.svg', caption: 'Tiered ICP management protocol. Tier 0: positioning + physiologic targets (APP-independent). Tier 1: sedation + EVD drainage (most effective first-line). Tier 2: osmotherapy — mannitol or HTS (hold mannitol if Osm >320; 23.4% central only). Tier 3: controlled hyperventilation — bridge only. Tier 4: barbiturate coma — last resort.' },
    ]
  },
  {
    title: 'M09.L4 — Herniation Syndromes: Recognition and Emergency Response',
    appText: 'A blown pupil is your emergency until proven otherwise — never attribute to mydriatics without verification. When you see it: call the attending immediately, start the herniation bundle (HOB 30°, hyperventilate to PaCO2 30-35, mannitol 1g/kg push), page neurosurgery, order STAT CT. Do not wait to confirm with imaging before treating. Cushing\'s triad means herniation is already happening — you are behind. Every second matters.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m09-herniation-syndromes.svg', caption: 'Five herniation syndromes and their clinical signatures. Uncal (most common): blown pupil + contralateral hemiplegia. Central: bilateral pinpoint → midposition fixed pupils + Cheyne-Stokes. Upward (posterior fossa mass): avoid EVD drainage — causes upward herniation. Tonsillar: sudden apnea. Subfalcine: leg > arm weakness (ACA territory).' },
    ]
  },

  // ── M10: Brain Death & DoC ───────────────────────────────────────────────
  {
    title: 'M10.L1 — Brain Death: Criteria, Prerequisites, and Clinical Exam',
    appText: 'Brain death determination is a structured, sequential process — not a judgment call. As the NCC APP, you verify ALL prerequisites are met before the attending performs the exam, and you may participate in the exam under attending supervision. Know which reflex is deferrable (oculocephalic only) and what does not invalidate the exam (spinal reflexes — Lazarus sign can occur; it does not mean the patient is alive). Documentation must be meticulous.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m10-brain-death-sequence.svg', caption: 'Brain death determination sequence: Prerequisites first (temperature, hemodynamics, medications, metabolics) → Clinical exam (8 reflexes) → Apnea test → Ancillary testing if needed. All steps must be documented. Time of death = completion of last confirming exam or ancillary test.' },
    ]
  },
  {
    title: 'M10.L2 — Apnea Test and Ancillary Testing',
    appText: 'The apnea test is a procedural skill the NCC APP assists with or performs under attending supervision. Your job: verify prerequisites (PaO2 >200, PaCO2 35-45, hemodynamics stable), pre-oxygenate 10 minutes, have the abort criteria memorized before you disconnect the vent. Know your endpoint: PaCO2 must rise ≥20 mmHg above baseline WITHOUT respiratory effort. If you abort, document exactly why and arrange ancillary testing. The nuclear cerebral blood flow scan (hollow skull sign) is the most commonly used ancillary test at BNI.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m10-apnea-test.svg', caption: 'Apnea test step-by-step: pre-oxygenate → baseline ABG → disconnect vent → passive O2 via cannula in ETT → observe 8-10 min → post-ABG → reconnect. Positive: PaCO2 rise ≥20 mmHg from baseline without respiratory effort. Abort if: SBP <90, SpO2 <85%, hemodynamic instability, or arrhythmia.' },
    ]
  },
  {
    title: 'M10.L3 — Disorders of Consciousness: Coma, VS, MCS, and EMCS',
    appText: 'DoC assessment is one of the highest-stakes communication tasks you will do. Families will ask you if their loved one is "in there." The answer requires a structured exam (CRS-R), not a bedside impression. Misdiagnosis of VS occurs in up to 40% of patients — many are actually MCS. Avoid the word "vegetative" with families. Avoid early definitive prognosis statements, especially in TBI. Your job: remove confounders, use CRS-R, document accurately, and let the attending frame prognosis with appropriate time horizons.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m10-consciousness-spectrum.svg', caption: 'DoC spectrum from coma to emergence. Precise diagnosis requires CRS-R (Coma Recovery Scale-Revised) — not a clinical impression. MCS patients can communicate inconsistently but reproducibly. Covert consciousness (command-following on fMRI/EEG without behavioral response) occurs in ~20% of clinically vegetative patients.' },
    ]
  },
  {
    title: 'M10.L4 — Organ Donation Pathway and Family Communication',
    appText: 'Federal law (NOTA 1984) mandates referral of all potential donors to the OPO. At BNI, the OPO is Donor Network of Arizona — the hospital triggers this automatically. Your role: complete the brain death documentation, maintain donor physiology after consent (MAP 60-80, SpO2 >95%, glucose 70-180, normothermia), and support the family. You do NOT approach the family about donation — that is the OPO coordinator\'s domain. After family consent, NCC continues to manage the patient as a donor. Document vitals, labs, and interventions as you would any ICU patient.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m10-organ-donation.svg', caption: 'Organ donation pathway: brain death determination complete → OPO referral (automatic) → OPO family approach and consent → NCC donor management (MAP, SpO2, glucose, temp targets) → OR for procurement. DCD (donation after circulatory death): different pathway — family consent for WLST → OPO coordinates timing.' },
    ]
  },
];

// ─── Main enrichment function ─────────────────────────────────────────────────
async function enrich() {
  console.log('🔧 Enriching M06–M10 with APP focus + images...\n');
  let updated = 0, skipped = 0;

  for (const def of enrichments) {
    // Fetch current lesson
    const { data, error: fetchErr } = await supabase
      .from('module_lessons')
      .select('id,title,content')
      .eq('title', def.title)
      .single();

    if (fetchErr || !data) {
      console.log(`❌ Not found: ${def.title}`);
      skipped++;
      continue;
    }

    let parsed;
    try { parsed = JSON.parse(data.content); } catch(e) {
      console.log(`❌ JSON parse error: ${def.title}`);
      skipped++;
      continue;
    }

    let blocks = parsed.blocks || [];

    // 1. Remove any existing APP callout to avoid duplication on re-runs
    blocks = blocks.filter(b => !(b.type === 'callout' && b.content?.title === '🩺 Your Role as NCC APP'));

    // 2. Prepend APP intro callout
    blocks.unshift(appCallout(def.appText));

    // 3. Inject images at specified positions (offset by 1 for the prepended callout)
    for (const imgDef of def.images) {
      // Remove existing duplicate of same image first
      blocks = blocks.filter(b => !(b.type === 'image' && b.content?.url === imgDef.url));
      insertAfterType(blocks, imgDef.after, img(imgDef.url, imgDef.caption), imgDef.nth);
    }

    parsed.blocks = blocks;

    const { error: updateErr } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(parsed) })
      .eq('id', data.id);

    if (updateErr) {
      console.log(`❌ Update failed: ${def.title} — ${updateErr.message}`);
      skipped++;
    } else {
      console.log(`✅ ${def.title} — ${blocks.length} blocks (${def.images.length} image(s) added)`);
      updated++;
    }
  }

  console.log(`\n✨ Done — ${updated} updated, ${skipped} skipped.`);
  process.exit(0);
}

enrich().catch(console.error);
