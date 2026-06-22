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

// ─── M09.L1 ──────────────────────────────────────────────────────────────────
const m09l1Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'ICP Physiology, CPP, and Autoregulation' },
    },
    {
      type: 'heading',
      content: { text: 'Monro-Kellie Doctrine' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'The skull is a rigid, fixed-volume container. Its contents are: brain parenchyma (~80%), blood (~10%), and CSF (~10%). Because the total volume is fixed, an increase in any one component must be compensated by a decrease in another — otherwise intracranial pressure (ICP) rises.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Parameter', 'Normal Value', 'Treatment Threshold'],
        rows: [
          ['ICP', '5–15 mmHg', '>20–25 mmHg'],
          ['CPP (MAP − ICP)', '≥50–60 mmHg', '<50 mmHg (TBI: target 60–70)'],
          ['MAP (for CPP support)', 'Varies by ICP', 'Titrate to maintain CPP goal'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Cerebral Autoregulation' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'In a healthy brain, cerebral blood flow (CBF) remains constant across a MAP range of approximately 50–150 mmHg — this is autoregulation. In brain injury (stroke, TBI, SAH), autoregulation is frequently impaired, making CBF pressure-passive: it rises and falls directly with MAP.',
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Loss of Autoregulation — Clinical Implications',
        text: 'When autoregulation fails: (1) BP drops → CBF drops → ischemia; (2) BP rises → CBF rises → hyperemia, edema, and worsening ICP. This is why both hypotension AND hypertension are dangerous in brain-injured patients.',
      },
    },
    {
      type: 'heading',
      content: { text: 'CO₂ Reactivity' },
    },
    {
      type: 'table',
      content: {
        headers: ['PaCO₂ Change', 'Vascular Effect', 'ICP Effect', 'Clinical Use'],
        rows: [
          ['↑ PaCO₂ (hypercarbia)', 'Vasodilation → ↑ CBF', '↑ ICP', 'HARMFUL — avoid in elevated ICP'],
          ['↓ PaCO₂ (hyperventilation)', 'Vasoconstriction → ↓ CBF', '↓ ICP', 'EMERGENCY BRIDGE ONLY (minutes to hours); rebound vasodilation if prolonged'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Types of Cerebral Edema' },
    },
    {
      type: 'table',
      content: {
        headers: ['Type', 'Mechanism', 'Common Causes', 'Steroid Response'],
        rows: [
          ['Vasogenic', 'Blood-brain barrier disruption → protein-rich fluid enters interstitium', 'Tumor, abscess, trauma', '✅ Responds well (dexamethasone)'],
          ['Cytotoxic', 'Cellular Na/K-ATPase failure → intracellular swelling', 'Ischemic stroke, hypoxia', '❌ Does NOT respond to steroids'],
          ['Interstitial', 'Obstructed CSF flow → transependymal CSF extravasation', 'Obstructive hydrocephalus', '✅ Responds to CSF drainage'],
        ],
      },
    },
    {
      type: 'warning',
      content: {
        title: "Cushing's Triad — Late Sign of Herniation",
        text: "Hypertension + Bradycardia + Irregular respirations. This is a reflex response to brainstem compression — NOT an early warning sign. If you see Cushing's triad, herniation is already occurring. Act IMMEDIATELY.",
      },
    },
  ],
};

// ─── M09.L2 ──────────────────────────────────────────────────────────────────
const m09l2Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'ICP Monitoring: EVD, Bolt, Waveforms, and Troubleshooting' },
    },
    {
      type: 'heading',
      content: { text: 'External Ventricular Drain (EVD)' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'The EVD is the gold standard for ICP monitoring because it simultaneously measures ICP AND allows therapeutic CSF drainage. It is placed in the frontal horn of the lateral ventricle via a Kocher\'s point burr hole.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['EVD Care Element', 'Details'],
        rows: [
          ['Zero reference point', 'Level transducer to external auditory meatus (EAM)'],
          ['Documentation', 'Record drain height, open vs closed status, 24h CSF output, ICP range each shift'],
          ['Drainage', 'Open vs closed drainage per physician orders; do not change without order'],
          ['Bright red blood in EVD', 'EMERGENCY — may indicate re-rupture; clamp and notify immediately'],
        ],
      },
    },
    {
      type: 'collapsible',
      content: {
        title: 'EVD Troubleshooting Guide',
        content: 'No drainage → Check for kinks in tubing; verify drain height (too high?); assess for blood clot at catheter tip; confirm drain is open per orders; notify neurosurgery if unresolved.\n\nHigh resistance / sluggish drainage → May indicate catheter tip obstruction with blood or debris; do NOT flush EVD without explicit neurosurgery order; notify provider.\n\nBloody drainage (new or worsening) → Differentiate from old blood (brown/xanthochromic) vs fresh blood (bright red); bright red = re-rupture emergency; clamp drain, call neurosurgery STAT, obtain STAT CT head.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Cranial Bolt — Raumedic System (BNI)' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'The Raumedic parenchymal bolt provides ICP monitoring only (no CSF drainage). It is placed 2 cm from the cortical surface in subcortical white matter. Placement is in the peri-lesional region or in the non-dominant frontal lobe for diffuse injury. A post-placement CT is required to confirm probe position.',
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Raumedic Multimodal Monitoring',
        text: 'The BNI Raumedic system tracks ICP, PbtO₂ (brain tissue oxygen), local temperature, and cerebral compliance index (CCPI). This provides a more complete picture of cerebral physiology than ICP alone.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Parameter', 'Normal', 'Concerning', 'Critical'],
        rows: [
          ['ICP', '5–15 mmHg', '>20 mmHg', '>25 mmHg'],
          ['PbtO₂', '>20 mmHg', '<20 mmHg', '<15 mmHg'],
        ],
      },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'First 4–5 hours of Raumedic readings are usually inaccurate — do NOT make clinical decisions during probe equilibration',
          'FiO₂ challenge: increase FiO₂ to 100% × 15–20 min → PbtO₂ should rise 4–5 mmHg if probe is accurate',
          'If signal amplitude <375 → clean the fiber optic with an alcohol wipe to restore accuracy',
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'ICP Waveform Interpretation' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'The ICP waveform has three components per cardiac cycle: P1 (percussion wave — reflects arterial pulsation), P2 (tidal wave — reflects brain compliance), and P3 (dicrotic notch — reflects venous closure). Normal morphology: P1 > P2 > P3.',
      },
    },
    {
      type: 'warning',
      content: {
        title: 'P2 > P1 = Reduced Compliance',
        text: 'When P2 exceeds P1, the brain has lost its buffering capacity — compliance is critically reduced and any further volume addition will cause a steep ICP rise. This is a warning sign of impending decompensation.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Wave Type', 'ICP Range', 'Duration', 'Clinical Significance'],
        rows: [
          ['A waves (Plateau waves)', '50–100 mmHg', '5–20 min', '🔴 Severely reduced compliance; sign of impending herniation → IMMEDIATE TREATMENT'],
          ['B waves', '20–50 mmHg', '30 sec – 2 min', '🟡 Mildly reduced compliance; monitor closely'],
          ['C waves', 'Low amplitude', 'Variable', '🟢 Correlated with respiratory cycle; clinically insignificant'],
        ],
      },
    },
  ],
};

// ─── M09.L3 ──────────────────────────────────────────────────────────────────
const m09l3Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Medical ICP Management: Tiered Protocol' },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Core Principle',
        text: 'Treat elevated ICP before herniation occurs. Simultaneously monitor CPP — aggressive ICP reduction without maintaining adequate CPP causes ischemia. Both sides of the equation matter.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Tier 0 — Universal General Measures' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Head of bed (HOB) at 30° — promotes jugular venous drainage',
          'Midline head position — prevents jugular vein kinking',
          'Loosen tight cervical collars — venous obstruction raises ICP',
          'Avoid hip flexion >30° — increases intra-abdominal pressure → ICP',
          'Aggressive fever management — hyperthermia worsens cerebral edema and ICP',
          'Maintain SpO₂ >94% — hypoxia causes cerebral vasodilation',
          'Normocarbia: target PaCO₂ 35–40 mmHg',
          'Treat pain and agitation promptly',
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Tier 1 — Sedation and EVD Drainage' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Sedation and analgesia reduce cerebral metabolic demand and blunt ICP spikes from agitation, suctioning, and noxious stimuli. EVD drainage is the most immediately effective intervention for elevated ICP when available — removing even a few mL of CSF can dramatically reduce ICP.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Intervention', 'Agents / Details'],
        rows: [
          ['Sedation', 'Propofol (preferred for neuro exams — short offset) or midazolam'],
          ['Analgesia', 'Fentanyl or hydromorphone IV infusion'],
          ['EVD drainage', 'Per orders; most effective first-line intervention when EVD in place'],
          ['Fluid management', 'Maintain euvolemia; avoid hypotonic fluids (worsen cerebral edema)'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Tier 2 — Hyperosmolar Therapy' },
    },
    {
      type: 'table',
      content: {
        headers: ['Agent', 'Dose', 'Route / Notes', 'Hold Criteria'],
        rows: [
          [
            'Mannitol 20%',
            '0.25–1 g/kg IV q4–6h',
            'Peripheral IV acceptable; causes osmotic diuresis — foley required',
            'Hold if serum osmolarity >320 mOsm/L or patient hypovolemic',
          ],
          [
            'Hypertonic Saline (HTS) 3%',
            'Continuous infusion or bolus per orders',
            'Peripheral IV acceptable; target serum Na 145–155 mEq/L',
            'Hold if Na >155–160 mEq/L',
          ],
          [
            'HTS 23.4% ("the shot")',
            '30 mL IV push',
            'Central line ONLY; reserved for acute ICP crisis; volume-expanding (beneficial in SAH)',
            'Hold if Na >155 mEq/L; central access required',
          ],
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'HTS vs Mannitol at SJHMC/BNI',
        text: 'Hypertonic saline is generally preferred over mannitol at this institution, particularly in SAH patients, because HTS is simultaneously volume-expanding while reducing ICP. Mannitol causes diuresis and may worsen hypovolemia in vasospasm.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Tier 3 — Controlled Hyperventilation' },
    },
    {
      type: 'warning',
      content: {
        title: 'Temporary Bridge Only — Not a Sustained Strategy',
        text: 'Target PaCO₂ 30–35 mmHg. Effective within minutes, but rebound vasodilation occurs if maintained beyond a few hours as cerebrovascular pH normalizes. Use ONLY as a bridge to definitive treatment (e.g., while awaiting emergent OR or before osmotic therapy takes effect).',
      },
    },
    {
      type: 'heading',
      content: { text: 'Tier 4 — Barbiturate Coma' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Pentobarbital coma is a last resort for refractory ICP not responding to all other measures. It reduces cerebral metabolic demand to near-baseline. Target burst suppression on continuous EEG. Significant hemodynamic compromise (hypotension, myocardial depression) is expected — vasopressors nearly always required.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Surgical Options' },
    },
    {
      type: 'table',
      content: {
        headers: ['Procedure', 'Indication'],
        rows: [
          ['Decompressive hemicraniectomy', 'Malignant MCA infarction; refractory ICP unresponsive to medical therapy'],
          ['Suboccipital craniectomy', 'Posterior fossa mass or edema causing brainstem compression'],
          ['VP shunt / EVD', 'CSF diversion for obstructive or communicating hydrocephalus'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'CPP Augmentation' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'MAP challenge: raise MAP by 10 mmHg × 20 min under close supervision; verify CBF response with PbtO₂ improvement',
          'Vasopressors (norepinephrine, phenylephrine) to maintain CPP ≥50–60 mmHg',
          'Confirm CPP improvement correlates with PbtO₂ rise (>20 mmHg) before committing to higher MAP targets',
        ],
      },
    },
  ],
};

// ─── M09.L4 ──────────────────────────────────────────────────────────────────
const m09l4Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Herniation Syndromes: Recognition and Emergency Response' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Herniation occurs when brain parenchyma is displaced through an anatomical opening due to a pressure gradient between compartments. Each herniation syndrome produces a distinct clinical picture based on which structures are compressed.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Herniation Syndromes at a Glance' },
    },
    {
      type: 'table',
      content: {
        headers: ['Syndrome', 'Mechanism', 'Key Signs', 'Urgency'],
        rows: [
          [
            'Uncal (transtentorial)',
            'Temporal lobe mass compresses CN III and PCA as uncus herniates over tentorium',
            'Ipsilateral fixed dilated pupil ("blown pupil"), contralateral hemiplegia, ↓ consciousness → Cushing\'s triad',
            '🔴 STAT neurosurgery',
          ],
          [
            'Central (transtentorial)',
            'Bilateral downward displacement of cerebral hemispheres through tentorium',
            'Bilateral pinpoint pupils (diencephalic stage), then fixed midposition, bilateral motor signs, Cheyne-Stokes → central neurogenic hyperventilation → ataxic breathing',
            '🔴 STAT',
          ],
          [
            'Upward (transtentorial)',
            'Cerebellum herniates upward through tentorium; caused by posterior fossa mass or over-drainage via supratentorial EVD',
            'Midbrain compression; worsening with supratentorial CSF drainage',
            '🔴 STAT — avoid EVD in posterior fossa',
          ],
          [
            'Tonsillar',
            'Cerebellar tonsils herniate through foramen magnum',
            'Sudden apnea, bradycardia, loss of consciousness',
            '🔴 Immediately fatal without intervention',
          ],
          [
            'Subfalcine',
            'Cingulate gyrus herniates under falx cerebri',
            'ACA compression → contralateral leg weakness; may be asymptomatic early',
            '🟠 Urgent monitoring; may progress',
          ],
        ],
      },
    },
    {
      type: 'warning',
      content: {
        title: '"Blown Pupil" Protocol',
        text: 'A unilateral fixed dilated pupil in an ICU patient must be assumed to represent uncal herniation until proven otherwise. Do NOT attribute it to mydriatic eye drops without direct verification of drop administration. Act IMMEDIATELY — call neurosurgery, initiate herniation protocol.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Emergency Response to Herniation' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          '1. AIRWAY — Immediate intubation if not already intubated',
          '2. HYPERVENTILATE — Bag-mask or ventilator; target PaCO₂ 30–35 mmHg (rapid ICP reduction)',
          '3. MANNITOL — 1 g/kg IV push (or 23.4% HTS 30 mL via central line)',
          '4. HOB 30° — Elevate head of bed',
          '5. STAT CT head — To identify surgical lesion',
          '6. STAT neurosurgery consult — Prepare for emergent OR',
          '7. Open EVD if in place — Drain CSF immediately',
          '8. Maintain CPP — Vasopressors as needed',
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: "Cushing's Triad — What It Means",
        text: "Hypertension + Bradycardia + Irregular respirations. This Cushing reflex is the brain's last-resort attempt to maintain CPP when ICP is critically elevated. It is a LATE sign — herniation is already occurring by the time you observe it. Do not wait for Cushing's triad to act; act on rising ICP trends.",
      },
    },
    {
      type: 'collapsible',
      content: {
        title: 'Upward Herniation — Special Consideration',
        content: 'Upward herniation (cerebellum herniating upward through the tentorium cerebelli) is a paradoxical complication of posterior fossa pathology. Draining CSF via a supratentorial EVD can actually CAUSE upward herniation by lowering supratentorial pressure and creating an upward pressure gradient. In posterior fossa lesions with hydrocephalus, definitive treatment is suboccipital craniectomy with tumor/clot evacuation, not EVD alone.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Clinical Finding', 'Likely Herniation Type', 'Immediate Action'],
        rows: [
          ['Unilateral fixed dilated pupil + contralateral weakness', 'Uncal', 'STAT neurosurgery + herniation protocol'],
          ['Bilateral pupils: pinpoint → midposition + bilateral motor', 'Central', 'Herniation protocol; check CT for mass'],
          ['Sudden apnea + bradycardia', 'Tonsillar', 'ACLS; intubate; STAT posterior fossa CT'],
          ['Leg weakness + cingulate shift on CT', 'Subfalcine', 'Monitor ICP; optimize medical management'],
          ['Worsening with EVD drainage in posterior fossa pt', 'Upward', 'Clamp EVD; STAT neurosurgery; prepare OR'],
        ],
      },
    },
  ],
};

// ─── LESSONS ARRAY ────────────────────────────────────────────────────────────
const lessons = [
  { title: 'M09.L1 — ICP Physiology, CPP, and Autoregulation', content: m09l1Content },
  { title: 'M09.L2 — ICP Monitoring: EVD, Bolt, Waveforms, and Troubleshooting', content: m09l2Content },
  { title: 'M09.L3 — Medical ICP Management: Tiered Protocol', content: m09l3Content },
  { title: 'M09.L4 — Herniation Syndromes: Recognition and Emergency Response', content: m09l4Content },
];

// ─── POPULATE ─────────────────────────────────────────────────────────────────
async function populate() {
  console.log('🔧 Loading M09 content...\n');
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
