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

// ─── M08.L1 ──────────────────────────────────────────────────────────────────
const m08l1Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Seizure Classification and ICU Triggers' },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Key Concept',
        text: 'ICU seizures are often subtle or nonconvulsive — maintain a high index of suspicion in any patient with unexplained altered mental status.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Common ICU Seizure Triggers' },
    },
    {
      type: 'table',
      content: {
        headers: ['Category', 'Examples'],
        rows: [
          ['Metabolic', 'Hyponatremia, hypoglycemia, uremia, hyperammonemia'],
          ['Structural', 'Stroke, intracranial hemorrhage, TBI, brain tumor'],
          ['Infectious', 'Meningitis, encephalitis'],
          ['Drug-Related', 'Benzo/EtOH withdrawal, tramadol, imipenem, fluoroquinolones'],
          ['Hypoxic-Ischemic', 'Post-cardiac arrest, prolonged hypoxia'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Seizure Classification' },
    },
    {
      type: 'table',
      content: {
        headers: ['Type', 'Subtypes / Notes'],
        rows: [
          ['Focal — Aware', 'Previously "simple partial"; consciousness intact'],
          ['Focal — Impaired Awareness', 'Previously "complex partial"; altered consciousness'],
          ['Generalized — Tonic-Clonic', 'Classic "grand mal"; most recognizable convulsion'],
          ['Generalized — Tonic', 'Sustained muscle stiffening'],
          ['Generalized — Clonic', 'Rhythmic jerking without tonic phase'],
          ['Generalized — Myoclonic', 'Brief, shock-like muscle jerks'],
          ['Generalized — Atonic', '"Drop attacks"; sudden loss of muscle tone'],
          ['Generalized — Absence', 'Brief staring spells; often subtle in ICU'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Status Epilepticus (SE) — Definition' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Operational definition: a seizure lasting >5 minutes OR two or more seizures without return to baseline between them. This threshold was chosen because spontaneous termination becomes unlikely after 5 minutes and neuronal injury is already accumulating.',
      },
    },
    {
      type: 'warning',
      content: {
        title: 'Time Is Brain',
        text: 'Brain injury begins from the very first minute of seizure activity. Every minute of ongoing SE compounds neuronal damage. Early, aggressive treatment is critical — do not wait to see if the seizure stops on its own.',
      },
    },
    {
      type: 'heading',
      content: { text: 'When to Order Continuous EEG (cEEG)' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Altered mental status that cannot be explained by medications or a metabolic cause should prompt urgent continuous EEG monitoring. The goal is to identify nonconvulsive seizures or nonconvulsive SE (NCSE) that have no visible motor manifestations.',
      },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Altered mental status unexplained by meds or metabolics',
          'Post-convulsive SE — to confirm seizure cessation',
          'High-risk structural injury: SAH, TBI, large MCA stroke',
          'Prior seizure history in an ICU patient with altered arousal',
          'Subtle motor phenomena: eye deviation, facial twitching, rhythmic limb movements',
        ],
      },
    },
    {
      type: 'collapsible',
      content: {
        title: 'Predictors of NCSE in the ICU',
        content: 'Factors that raise suspicion for nonconvulsive SE: (1) prior seizure history, (2) focal brain lesion on imaging, (3) history of SAH, TBI, or large stroke. In these patients, a "quiet" presentation does not rule out ongoing electrographic seizure activity.',
      },
    },
  ],
};

// ─── M08.L2 ──────────────────────────────────────────────────────────────────
const m08l2Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Status Epilepticus: First-Line Through Refractory Management' },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'ESETT Trial Takeaway',
        text: 'Levetiracetam, fosphenytoin, and valproate have SIMILAR efficacy in second-line SE treatment. No single agent is clearly superior — choose based on patient-specific factors (allergies, drug interactions, organ function, pregnancy).',
      },
    },
    {
      type: 'heading',
      content: { text: 'First-Line ASMs (Non-Benzo; can be given simultaneously or sequentially)' },
    },
    {
      type: 'table',
      content: {
        headers: ['Drug', 'Loading Dose', 'Maintenance', 'Key Considerations'],
        rows: [
          [
            'Levetiracetam (Keppra)',
            '60 mg/kg IV (max 4.5 g)',
            '500–1500 mg BID',
            'Few drug interactions; safe in pregnancy; rapid IV infusion possible',
          ],
          [
            'Fosphenytoin',
            '20 mg PE/kg IV (max 1,500 mg PE)',
            '5–6 mg PE/kg/day ÷ 2–3 doses',
            'Many drug interactions; requires cardiac monitoring; max infusion rate ≤150 mg PE/min',
          ],
          [
            'Valproate (VPA)',
            '20 mg/kg IV (max 1.5 g)',
            '5 mg/kg TID',
            'Monitor LFTs, platelets, ammonia; levocarnitine antidote for hyperammonemia; AVOID in pregnancy; rapid infusion safe',
          ],
          [
            'Lacosamide',
            '300–400 mg IV load',
            '100–200 mg BID',
            'Monitor PR interval; can be sedating',
          ],
        ],
      },
    },
    {
      type: 'collapsible',
      content: {
        title: 'Level Correction Formula',
        content: 'Replacement dose (mg) = (Target level − Current level) × Weight (kg) × Volume of distribution\n\n• Phenytoin Vd = 0.9 L/kg\n• Valproate Vd = 0.3 L/kg\n\nExample: Patient 70 kg, phenytoin level 5 mcg/mL, target 15 mcg/mL:\n(15 − 5) × 70 × 0.9 = 630 mg fosphenytoin PE load',
      },
    },
    {
      type: 'paragraph',
      content: {
        text: 'If no improvement after the first agent AND the patient is still protecting their airway, a second first-line ASM may be tried. If the patient is deteriorating neurologically, proceed directly to refractory SE management.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Refractory SE — Anesthetic Drips' },
    },
    {
      type: 'warning',
      content: {
        title: 'Intubation Required Before Anesthetic Drips',
        text: 'All three anesthetic agents used for refractory SE cause respiratory depression and loss of airway protective reflexes. Secure the airway with intubation BEFORE starting any anesthetic infusion.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Agent', 'Bolus', 'Infusion', 'Key Concerns'],
        rows: [
          [
            'Midazolam',
            '0.2 mg/kg IV',
            '0.2–2.8 mg/kg/hr',
            'Fat-soluble → slow offset with prolonged use; relatively hemodynamically neutral',
          ],
          [
            'Propofol',
            '0.5–1 mg/kg IV',
            '20–65 mcg/kg/min (max 200 mcg/kg/min with attending approval)',
            'Rapid onset/offset (advantage for neuro exams); monitor for Propofol Infusion Syndrome (check triglycerides, LFTs, CK, lactate, pH daily)',
          ],
          [
            'Ketamine',
            '0.5–3 mg/kg IV',
            '10–80 mcg/kg/min',
            'NMDA antagonist — different mechanism than other agents; hemodynamically neutral or stimulating; monitor BP, HR, ICP; low-dose focal SE may not require intubation',
          ],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Essential Monitoring During Refractory SE' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Continuous EEG — target burst suppression or complete seizure cessation',
          'Continuous cardiac telemetry',
          'Continuous arterial line for beat-to-beat BP monitoring',
          'Propofol: daily triglycerides, LFTs, CK, lactate, arterial pH (PRIS surveillance)',
          'Midazolam: watch for prolonged sedation due to lipophilic accumulation',
        ],
      },
    },
  ],
};

// ─── M08.L3 ──────────────────────────────────────────────────────────────────
const m08l3Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Nonconvulsive SE and Continuous EEG Interpretation' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Nonconvulsive SE (NCSE) is electrographic status epilepticus without obvious motor manifestations. It is frequently missed without continuous EEG monitoring and carries the same risk of neuronal injury as convulsive SE.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Clinical Presentation of NCSE' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Unexplained altered or fluctuating consciousness',
          'Subtle motor phenomena: facial twitching, nystagmoid eye movements, eye deviation',
          'Automatisms (lip smacking, hand picking, blinking)',
          'Waxing and waning encephalopathy not explained by metabolics or medications',
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'High-Risk Populations for NCSE' },
    },
    {
      type: 'table',
      content: {
        headers: ['Population', 'Reason for Risk'],
        rows: [
          ['Post-cardiac arrest', 'Hypoxic-ischemic cortical injury lowers seizure threshold'],
          ['Post-convulsive SE', 'Motor activity stops but electrographic SE may persist'],
          ['Subarachnoid hemorrhage (SAH)', 'Cortical spreading depolarization, vasospasm, blood irritation'],
          ['Traumatic brain injury (TBI)', 'Focal cortical contusion, diffuse axonal injury'],
          ['Septic encephalopathy', 'Systemic inflammation disrupts BBB and neuronal excitability'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'EEG Pattern Risk Stratification (Rodriguez Ruiz et al., JAMA Neurol 2017)' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'EEG patterns are ranked by their associated risk of evolving to or representing seizure/SE. Risk increases with pattern frequency (crossing the significant threshold at approximately 1.0–1.5 Hz) and the presence of "plus" features (+F = fast activity superimposed, +S = sharp wave morphology).',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Pattern', 'Abbreviation', 'Seizure Risk'],
        rows: [
          ['Lateralized periodic discharges with plus features', 'LPD+', '🔴 Highest'],
          ['Lateralized periodic discharges', 'LPD', '🟠 High'],
          ['Lateralized rhythmic delta activity with plus', 'LRDA+', '🟠 High'],
          ['Generalized periodic discharges with plus', 'GPD+', '🟠 High'],
          ['Lateralized rhythmic delta activity', 'LRDA', '🟡 Moderate'],
          ['Generalized periodic discharges', 'GPD', '🟡 Moderate'],
          ['Generalized rhythmic delta activity (±plus)', 'GRDA / GRDA+', '🟢 Lowest'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'EEG Treatment Targets' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'During anesthetic management of refractory SE, the EEG goal is either burst suppression (suppression of background with periodic bursts) or complete seizure cessation, depending on institutional protocol and attending preference.',
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Workflow at SJHMC/BNI',
        text: 'Follow up with the Epilepsy / LTM attending via TigerConnect multiple times throughout the day for EEG interpretation, medication adjustments, and weaning decisions. Do not make significant EEG-based management changes without attending input.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Common cEEG Artifacts vs. Seizure Patterns' },
    },
    {
      type: 'table',
      content: {
        headers: ['Artifact Source', 'Appearance on EEG', 'How to Distinguish'],
        rows: [
          ['Cardiac (EKG)', 'Regular sharp spikes at HR frequency', 'Matches QRS on EKG channel; disappears with EKG filter'],
          ['Ventilator', 'Regular, slow, broad artifact', 'Correlates with ventilator rate; affects all leads equally'],
          ['Movement / Patting', 'Large-amplitude broadband noise', 'Time-locked to observed movement; abrupt onset/offset'],
          ['Muscle (EMG)', 'High-frequency, irregular', 'Predominates in temporal/frontal leads; abolished by paralytic'],
        ],
      },
    },
  ],
};

// ─── M08.L4 ──────────────────────────────────────────────────────────────────
const m08l4Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'AED Selection, Levels, and Long-Term Planning' },
    },
    {
      type: 'heading',
      content: { text: 'Additional AEDs for Refractory SE' },
    },
    {
      type: 'table',
      content: {
        headers: ['Drug', 'Dose', 'Mechanism', 'Notes'],
        rows: [
          [
            'Phenobarbital',
            '15–20 mg/kg IV load',
            'GABA-A potentiation',
            'Highly sedating; significant hypotension; use when other agents have failed; respiratory depression — intubation often required',
          ],
          [
            'Brivaracetam',
            'Varies',
            'SV2A ligand (similar to levetiracetam)',
            'More potent than levetiracetam; fewer behavioral side effects; consider if levetiracetam inadequate',
          ],
          [
            'Perampanel',
            'Varies',
            'AMPA receptor antagonist',
            'Oral/NG tube only — no IV formulation; unique mechanism useful in polytherapy; significant sedation at higher doses',
          ],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Therapeutic Drug Levels' },
    },
    {
      type: 'table',
      content: {
        headers: ['Drug', 'Target Level', 'Special Considerations'],
        rows: [
          [
            'Phenytoin / Fosphenytoin',
            'Total: 10–20 mcg/mL; Free: 1–2 mcg/mL',
            'Check FREE level in hypoalbuminemia or renal failure (protein binding altered); Winters correction: Adjusted PHT = measured / (0.2 × albumin + 0.1)',
          ],
          [
            'Valproate (VPA)',
            'Epilepsy: 50–100 mcg/mL; SE: up to 150 mcg/mL',
            'Monitor ammonia, LFTs, platelets especially at supratherapeutic levels',
          ],
          [
            'Levetiracetam',
            'No established target',
            'Titrate by clinical/EEG response; typical doses 500–3000 mg BID in ICU',
          ],
          [
            'Phenobarbital',
            '15–40 mcg/mL',
            'Highly sedating at upper range; check levels 1–2h after load',
          ],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Weaning Anesthetic Drips After Refractory SE' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'EEG-guided weaning is standard practice. Attempt wean after 24–48 hours of seizure-free EEG (or sustained burst suppression per protocol). Wean anesthetic infusions gradually while maintaining adequate standing AED levels. If seizures recur, re-escalate promptly.',
      },
    },
    {
      type: 'checklist',
      content: {
        items: [
          '24–48h seizure-free on continuous EEG before attempting wean',
          'Ensure adequate standing AED levels before weaning anesthetic',
          'Wean one agent at a time; reduce by 10–25% increments',
          'Re-escalate immediately if electrographic seizure recurs',
          'Communicate wean plan with LTM/epilepsy attending each shift',
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Long-Term AED Selection After SE' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Levetiracetam is often the preferred long-term agent in the ICU given its minimal drug interactions, IV availability, no hepatic metabolism, and no cardiac monitoring requirements. Final selection should account for seizure type, underlying etiology, drug interactions, organ function, and patient preference.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Underlying Etiology Workup' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Identifying and treating the underlying cause of SE is as important as stopping the seizures themselves. Initiate workup in parallel with seizure management.',
      },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'LP: CSF cell count, glucose, protein, culture, HSV/VZV PCR (meningitis/encephalitis)',
          'MRI brain with and without contrast (structural, ischemic, autoimmune signal changes)',
          'Autoimmune encephalitis panel: anti-NMDA-R, anti-LGI1, anti-CASPR2, anti-AMPA-R, anti-GABA-B',
          'Metabolic workup: CMP, NH3, thyroid, B12, toxicology',
          'EEG for classification and ongoing monitoring',
        ],
      },
    },
    {
      type: 'warning',
      content: {
        title: 'Fever Management During SE',
        text: 'Hyperthermia directly lowers seizure threshold and perpetuates SE. Aggressive temperature management (target normothermia) is part of SE treatment, not just supportive care. Use acetaminophen, cooling blankets, or intravascular cooling as needed.',
      },
    },
  ],
};

// ─── LESSONS ARRAY ────────────────────────────────────────────────────────────
const lessons = [
  { title: 'M08.L1 — Seizure Classification and ICU Triggers', content: m08l1Content },
  { title: 'M08.L2 — Status Epilepticus: First-Line Through Refractory Management', content: m08l2Content },
  { title: 'M08.L3 — Nonconvulsive SE and Continuous EEG Interpretation', content: m08l3Content },
  { title: 'M08.L4 — AED Selection, Levels, and Long-Term Planning', content: m08l4Content },
];

// ─── POPULATE ─────────────────────────────────────────────────────────────────
async function populate() {
  console.log('🔧 Loading M08 content...\n');
  for (const lesson of lessons) {
    const { data, error: findError } = await supabase
      .from('module_lessons')
      .select('id,title')
      .eq('title', lesson.title)
      .single();
    if (findError || !data) { console.log('❌ Not found:', lesson.title); continue; }
    const { error: updateError } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(lesson.content) })
      .eq('id', data.id);
    if (updateError) { console.log('❌ Update failed:', lesson.title, updateError.message); continue; }
    console.log(`✅ ${lesson.title} — ${lesson.content.blocks.length} blocks`);
  }
  console.log('\n✨ Done!');
  process.exit(0);
}
populate().catch(console.error);
