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
// M10.L1 — Brain Death: Criteria, Prerequisites, and Clinical Exam
// ─────────────────────────────────────────────────────────────────────────────
const m10l1Content = {
  title: 'M10.L1 — Brain Death: Criteria, Prerequisites, and Clinical Exam',
  duration_min: 15,
  blocks: [
    {
      type: 'heading',
      content: { text: 'Legal and Clinical Framework' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Brain death in the United States is defined as the irreversible cessation of all functions of the entire brain, including the brainstem. This "whole-brain" standard is legally required in the US and differs from the UK\'s brainstem-only model. A patient declared brain dead is legally deceased, regardless of ongoing cardiovascular function sustained by mechanical support.',
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Legal Definition',
        text: 'Whole-brain death (brainstem + cortex) is legally required in the US. Once declared, the patient is legally deceased — regardless of a heartbeat maintained by the ventilator.',
      },
    },

    // ── Prerequisites ──────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Prerequisites Before Clinical Exam' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'ALL prerequisites must be satisfied before proceeding with the clinical brain death examination. Failure to meet any condition may invalidate the exam and require ancillary testing to complete the determination.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Prerequisite', 'Threshold / Criteria'],
        rows: [
          ['Brain injury', 'Sustained, permanent, catastrophic injury with consistent neuroimaging'],
          ['Wait after hypoxic-ischemic injury (age ≥ 2 yrs)', '≥ 24 hours before examination'],
          ['Wait after hypoxic-ischemic injury (age < 2 yrs)', '≥ 48 hours before examination'],
          ['Core body temperature', '≥ 36°C sustained for ≥ 24 hours'],
          ['Systolic blood pressure', '≥ 100 mmHg'],
          ['Mean arterial pressure', '≥ 75 mmHg'],
          ['Pharmacologic paralysis', 'Must be excluded (TOF monitoring or reversal)'],
          ['Pentobarbital level', '< 5 mcg/mL — OR — ≥ 5 half-lives elapsed since last dose'],
          ['Alcohol level (if indicated)', '≤ 80 mg/dL'],
          ['Toxicology screen (if indicated)', 'Negative for CNS depressants'],
          ['Metabolic / acid-base / endocrine', 'Severe derangements excluded'],
          ['Family notification', 'Reasonable attempt to inform family made prior to exam'],
        ],
      },
    },

    // ── Clinical Exam ──────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Clinical Examination Components' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'The clinical examination assesses for complete absence of both cortical and brainstem function. Every component listed below must be absent for the exam to support a brain death determination.',
      },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Coma: no response to visual, auditory, or tactile stimulation',
          'Absent motor responses to noxious stimuli (excluding spinally-mediated reflexes)',
          'Absent pupillary light responses bilaterally — pupils fixed (need not be dilated)',
          'Absent oculocephalic reflex (doll\'s eyes) — deferrable if C-spine precaution applies*',
          'Absent oculovestibular reflex — 50 mL ice water each ear; eyes remain midline for 60 sec',
          'Absent corneal reflexes bilaterally',
          'Absent gag reflex',
          'Absent cough reflex to deep tracheal suctioning',
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: '* The Only Deferrable Reflex',
        text: 'The oculocephalic reflex (doll\'s eyes) is the ONLY component that can be deferred without requiring ancillary testing — typically when cervical spine injury precludes head rotation. All other components must be tested or ancillary testing is required.',
      },
    },

    // ── Spinal Reflexes Warning ────────────────────────────────────────────
    {
      type: 'warning',
      content: {
        title: 'Spinal Reflexes Do NOT Invalidate the Exam',
        text: 'Spontaneous or stimulus-evoked spinal reflexes — including the Lazarus sign, triple flexion, plantar responses, and other limb movements — can persist after brain death. These are spinally mediated and do NOT invalidate the brain death examination. Proactively educate families who may witness these movements at the bedside.',
      },
    },

    // ── Examiner Requirements ──────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Examiner and Documentation Requirements' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Requirements for number of examiners and interval between examinations vary by state law and institutional policy. In Arizona, two physicians are typically required, and at least one must be an attending physician. The apnea test must also be completed. Always follow your institution\'s specific brain death protocol.',
      },
    },
    {
      type: 'collapsible',
      content: {
        title: 'Quick Reference: Brain Death Determination Sequence',
        content:
          '1. Confirm all prerequisites are met (temperature, BP, drug levels, metabolic status)\n' +
          '2. Document catastrophic irreversible brain injury with consistent neuroimaging\n' +
          '3. Notify family — make a reasonable attempt before proceeding\n' +
          '4. Perform complete clinical exam:\n' +
          '   • Coma (no response to stimulation)\n' +
          '   • Absent pupils, oculocephalic*, caloric, corneal, gag, cough reflexes\n' +
          '5. Perform apnea test (see M10.L2)\n' +
          '6. Repeat with second examiner if required by institution\n' +
          '7. Document time of death = time of completion of determination\n' +
          '\n* Deferrable if C-spine injury; ancillary testing not required for this reflex alone.',
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// M10.L2 — Apnea Test and Ancillary Testing
// ─────────────────────────────────────────────────────────────────────────────
const m10l2Content = {
  title: 'M10.L2 — Apnea Test and Ancillary Testing',
  duration_min: 15,
  blocks: [
    {
      type: 'heading',
      content: { text: 'The Apnea Test: Purpose and Overview' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'The apnea test is a required component of the brain death examination. It confirms the absence of spontaneous respiratory drive — a function of the lower brainstem (medulla). Hypercapnia is the strongest stimulus for breathing; if PaCO₂ rises above a defined threshold without any respiratory effort, medullary respiratory centers are non-functional. The test must be conducted under controlled physiologic conditions to avoid harm.',
      },
    },

    // ── Prerequisites ──────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Apnea Test Prerequisites' },
    },
    {
      type: 'table',
      content: {
        headers: ['Parameter', 'Required Value'],
        rows: [
          ['Systolic blood pressure', '≥ 100 mmHg'],
          ['Mean arterial pressure', '≥ 75 mmHg'],
          ['Arterial pH', '7.35 – 7.45'],
          ['Baseline PaCO₂', '35–45 mmHg (use established baseline if chronic CO₂ retainer)'],
          ['PaO₂ before disconnection', '> 200 mmHg'],
          ['Hypovolemia', 'Corrected prior to test'],
          ['Hemodynamic instability', 'Absent or corrected'],
        ],
      },
    },

    // ── Procedure ──────────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Step-by-Step Procedure' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Pre-oxygenate with 100% FiO₂ for 10 minutes to fill the oxygen reserve',
          'Obtain baseline ABG — confirm PaCO₂ and PaO₂ targets are met',
          'Disconnect from ventilator',
          'Insert O₂ cannula or suction catheter into ETT at 6 L/min (maintains oxygenation via apneic diffusion)',
          'Observe closely for any spontaneous respiratory effort for 8–10 minutes',
          'Obtain final ABG immediately before reconnecting',
          'Reconnect to ventilator',
          'Interpret result based on ABG and observation findings',
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Positive Result — Supports Brain Death',
        text: 'PaCO₂ rises ≥ 20 mmHg above baseline (OR reaches ≥ 60 mmHg absolute) WITHOUT any spontaneous respiratory effort observed during the test period.',
      },
    },

    // ── Abort Criteria ─────────────────────────────────────────────────────
    {
      type: 'warning',
      content: {
        title: 'Abort Criteria — Reconnect Immediately If Any of the Following Occur:',
        text:
          '• SBP drops below 90 mmHg\n' +
          '• SpO₂ falls below 85%\n' +
          '• Hemodynamic instability develops\n' +
          '• Significant cardiac arrhythmia occurs\n\n' +
          'An aborted or incomplete apnea test requires ancillary testing to complete the brain death determination.',
      },
    },

    // ── Ancillary Testing ──────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Ancillary Testing' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Ancillary tests are required when the clinical examination or apnea test cannot be completed due to clinical instability, confounders, or an aborted test. They are not required when all clinical components are fully and satisfactorily assessed.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Test', 'Finding in Brain Death', 'Notes'],
        rows: [
          [
            'Nuclear medicine cerebral blood flow scan',
            '"Hollow skull" sign — absent intracranial perfusion',
            'Most commonly used in practice; highly specific; not affected by sedating drugs',
          ],
          [
            'Cerebral angiography (conventional)',
            'No intracranial filling beyond the skull base',
            'Gold standard; invasive; requires IR',
          ],
          [
            'CT angiography (CTA)',
            'No intracranial filling',
            'Emerging evidence; less established; faster and more accessible',
          ],
          [
            'EEG',
            'Electrocerebral silence (isoelectric baseline)',
            'Rarely used alone; susceptible to drug effects and hypothermia; low specificity',
          ],
        ],
      },
    },

    // ── Time of Death ──────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Time of Death Documentation' },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'When to Record Time of Death',
        text: 'Time of death is documented as the time of completion of the brain death determination — either the last confirming clinical examination or the time the ancillary test result is available. This must be clearly documented in the medical record.',
      },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Legal requirements, institutional protocols, and state regulations governing brain death vary. Always follow your institution\'s specific brain death policy for number of examiners, required waiting periods, documentation templates, and time-of-death recording.',
      },
    },
    {
      type: 'collapsible',
      content: {
        title: 'Apnea Test: At-a-Glance Summary',
        content:
          'BEFORE: FiO₂ 100% × 10 min → baseline ABG (PaCO₂ 35-45, PaO₂ > 200)\n' +
          'DURING: Disconnect vent → O₂ 6 L/min via ETT cannula → observe 8-10 min for ANY breath\n' +
          'AFTER: Final ABG → reconnect vent\n\n' +
          'POSITIVE (brain death): ΔPaCO₂ ≥ 20 mmHg above baseline (or absolute ≥ 60 mmHg) + NO respiratory effort\n' +
          'ABORT if: SBP < 90, SpO₂ < 85%, arrhythmia, hemodynamic collapse → needs ancillary testing',
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// M10.L3 — Disorders of Consciousness: Coma, VS, MCS, and EMCS
// ─────────────────────────────────────────────────────────────────────────────
const m10l3Content = {
  title: 'M10.L3 — Disorders of Consciousness: Coma, VS, MCS, and EMCS',
  duration_min: 15,
  blocks: [
    {
      type: 'heading',
      content: { text: 'The Spectrum of Disorders of Consciousness' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Disorders of consciousness (DoC) form a spectrum from complete unresponsiveness to minimal but reproducible awareness. Accurate diagnosis along this spectrum has direct implications for prognosis, family communication, legal decision-making, and therapeutic interventions. Misclassification — particularly labeling an MCS patient as vegetative — remains a significant clinical problem.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['State', 'Arousal', 'Awareness', 'Eyes', 'Key Distinguishing Features'],
        rows: [
          [
            'Coma',
            'None',
            'None',
            'Closed',
            'No sleep-wake cycles; brainstem reflexes may be present or absent',
          ],
          [
            'Vegetative State (VS / UWS)',
            'Present',
            'None',
            'May open spontaneously',
            'Sleep-wake cycles present; no purposeful responses to any stimuli',
          ],
          [
            'Minimally Conscious State− (MCS−)',
            'Present',
            'Fluctuating',
            'Opens to stimulation',
            'Reproducible command-following only',
          ],
          [
            'Minimally Conscious State+ (MCS+)',
            'Present',
            'Fluctuating',
            'Opens to stimulation',
            'Intelligible verbalization OR functional object use',
          ],
          [
            'Emergence from MCS (EMCS)',
            'Present',
            'Present',
            'Opens spontaneously',
            'Reliable, consistent functional communication OR functional object use',
          ],
          [
            'Confusional State',
            'Present',
            'Present',
            'Open',
            'Oriented but confused; transitional stage out of EMCS',
          ],
        ],
      },
    },

    // ── Coma ───────────────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Coma' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Coma is characterized by the complete absence of both arousal and awareness. Eyes remain closed. There are no sleep-wake cycles. Brainstem reflexes may be preserved or absent depending on injury location and severity. Coma is typically a transient state — patients either improve toward VS or higher levels of consciousness, or progress to brain death.',
      },
    },

    // ── VS/UWS ─────────────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Vegetative State (VS) / Unresponsive Wakefulness Syndrome (UWS)' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Patients in VS demonstrate arousal without any awareness. Eyes may open spontaneously, and sleep-wake cycles are preserved. Brainstem reflexes are present, and patients may exhibit spontaneous movements, grimacing, or non-purposeful posturing — none of which reflect awareness.',
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Persistent vs. Permanent VS',
        text:
          '• Persistent VS: duration > 1 month (does not imply permanence)\n' +
          '• Permanent VS: > 3 months after non-traumatic injury, OR > 12 months after traumatic injury\n\n' +
          '"Permanent" implies very low probability of meaningful recovery, but documented exceptions exist — particularly in young TBI patients. Avoid overly deterministic language early.',
      },
    },

    // ── MCS ────────────────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Minimally Conscious State (MCS)' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'MCS is defined by fluctuating but reproducible behavioral evidence of awareness. The key distinction from VS: behaviors must be clearly purposeful and reproducible — not just reflexive. MCS is further subdivided based on the complexity of observed behaviors.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Subtype', 'Defining Behavior(s)'],
        rows: [
          [
            'MCS− (minus)',
            'Reproducible command-following only — even if inconsistent across trials',
          ],
          [
            'MCS+ (plus)',
            'Intelligible verbalization (words or phrases) AND/OR functional object use — in addition to lower-level behaviors',
          ],
        ],
      },
    },

    // ── EMCS ───────────────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Emergence from MCS (EMCS)' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'EMCS is a major milestone marked by reliable, consistent functional object use (e.g., using a comb correctly) OR functional communication (e.g., consistently accurate yes/no responses to biographical questions). This represents recovery of reliable volitional behavior and marks transition out of the minimally conscious state.',
      },
    },

    // ── Assessment ─────────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Assessment: CRS-R and ICU Confounders' },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Coma Recovery Scale–Revised (CRS-R)',
        text: 'The CRS-R is the gold-standard structured tool for DoC assessment. It evaluates six subscales: auditory, visual, motor, oromotor/verbal, communication, and arousal/attention. Use it in the ICU only after minimizing confounders. Unstructured bedside assessment systematically underestimates awareness.',
      },
    },
    {
      type: 'warning',
      content: {
        title: 'ICU Confounders Can Mask Awareness — Minimize Before Assessing',
        text:
          'The following can suppress behavioral responsiveness and mimic VS in a patient with actual awareness:\n' +
          '• Sedation and analgesics (especially opioids and benzodiazepines)\n' +
          '• Neuromuscular blockade\n' +
          '• Delirium\n' +
          '• Metabolic derangements (hyponatremia, uremia, hepatic encephalopathy)\n' +
          '• Seizures / non-convulsive status\n' +
          '• Hydrocephalus\n\n' +
          'A patient may appear vegetative solely due to these confounders. Re-assess after correction.',
      },
    },

    // ── Covert Consciousness ───────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Covert Consciousness' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Task-based functional MRI and high-density EEG studies have demonstrated that up to 15–20% of patients who are clinically diagnosed as vegetative can follow commands using brain activity alone — with no detectable behavioral output. This "covert consciousness" or "cognitive-motor dissociation" is invisible to bedside examination and requires neuroimaging to detect. Its clinical implications — for prognosis, legal decision-making, and patient communication — are profound and actively debated.',
      },
    },

    // ── Prognostic Factors ─────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Prognostic Factors' },
    },
    {
      type: 'table',
      content: {
        headers: ['Factor', 'Favorable', 'Unfavorable'],
        rows: [
          ['Etiology', 'Traumatic brain injury', 'Anoxic / hypoxic-ischemic injury'],
          ['Age', 'Younger', 'Older'],
          ['Timing of assessment', 'Weeks–months post-injury', 'Within first few days (too early)'],
          ['MRI DWI / tractography', 'Preserved white matter connectivity', 'Widespread diffusion restriction, destroyed tracts'],
          ['SSEPs', 'Present cortical N20 responses bilaterally', 'Absent bilateral N20 responses'],
          ['EEG reactivity', 'EEG reactive to stimulation', 'Burst-suppression or isoelectric'],
        ],
      },
    },
    {
      type: 'warning',
      content: {
        title: 'Avoid Premature Prognostic Nihilism',
        text: 'Do NOT deliver "no hope" or "nothing more we can do" messages early in the clinical course. Allow adequate time, correct all confounders, consult specialized DoC teams when available, and consider advanced neuroimaging before prognosticating. Well-documented late recoveries occur — especially after TBI in young patients. The consequences of premature withdrawal based on inaccurate prognosis are irreversible.',
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// M10.L4 — Organ Donation Pathway and Family Communication
// ─────────────────────────────────────────────────────────────────────────────
const m10l4Content = {
  title: 'M10.L4 — Organ Donation Pathway and Family Communication',
  duration_min: 15,
  blocks: [
    {
      type: 'heading',
      content: { text: 'Brain Death and Organ Donation: Sequencing Is Critical' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'The brain death determination and the organ donation conversation are two entirely separate processes. Brain death must be fully and formally determined before donation is discussed. Conflating these two conversations — even subtly — causes lasting harm to families and undermines trust in the medical team and in the donation process.',
      },
    },
    {
      type: 'warning',
      content: {
        title: 'Never Combine Death Notification with Donation Request',
        text: 'Never introduce organ donation in the same conversation as notifying the family of death. Allow adequate time for grief. The OPO coordinator — not the clinical team — will introduce donation separately, at an appropriate moment, with compassion and no pressure.',
      },
    },

    // ── Federal Referral Requirement ───────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Federal Referral Requirement' },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'NOTA 1984 — Federal Law',
        text: 'ALL patients meeting brain death criteria — or at imminent risk of death — MUST be referred to the Organ Procurement Organization (OPO). This is mandated by the National Organ Transplant Act of 1984. Failure to refer is a federal compliance violation.',
      },
    },
    {
      type: 'paragraph',
      content: {
        text: 'At Barrow Neurological Institute, the OPO is Donor Network of Arizona (DNA). Hospital systems automatically trigger OPO notification when brain death criteria are met. The OPO coordinator manages family approach, consent, donor management coordination, organ placement logistics, and operating room scheduling. The clinical team supports this process but does not lead the donation conversation.',
      },
    },
    {
      type: 'warning',
      content: {
        title: 'Do NOT Approach the Family About Donation Without the OPO Coordinator',
        text: 'The OPO coordinator — not the bedside nurse, resident, or attending — is responsible for the organ donation conversation. Do not discuss donation with families without the OPO coordinator present. This is both institutional policy and established best practice for maximizing consent rates and family satisfaction.',
      },
    },

    // ── Donor Management ───────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Donor Management Goals After Family Consent' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'After consent is obtained, the NCC team continues active involvement in optimizing the donor\'s physiology to preserve organ viability for all transplant recipients. The following physiologic targets apply to most brain-dead donors:',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['System / Parameter', 'Target'],
        rows: [
          ['MAP', '60–80 mmHg'],
          ['SBP', '100–120 mmHg'],
          ['Vasopressor of choice (neurogenic DI)', 'Vasopressin — first-line'],
          ['SpO₂', '> 95%'],
          ['PaO₂', '> 100 mmHg'],
          ['Plateau pressure (lung protection)', 'Minimize; lung-protective ventilation'],
          ['Blood glucose', '70–180 mg/dL'],
          ['Core temperature', '36–37.5°C'],
          ['Urine output (DI management)', '0.5–3 mL/kg/hr'],
          ['Hematocrit', '> 30% (for cardiac and other solid organs)'],
        ],
      },
    },
    {
      type: 'collapsible',
      content: {
        title: 'Hormone Replacement Therapy — MAST Protocol',
        content:
          'Many centers use a standardized hormone replacement protocol (often called "MAST") after brain death to compensate for pituitary-hypothalamic dysfunction:\n\n' +
          '• Methylprednisolone — anti-inflammatory; lung and organ protection\n' +
          '• Arginine Vasopressin (ADH) — treats neurogenic diabetes insipidus; maintains hemodynamics\n' +
          '• Synthetic thyroid hormone (T3/T4 — liothyronine or levothyroxine) — supports myocardial function\n' +
          '• Insulin (regular) — glucose control\n\n' +
          'Follow your institution\'s specific donor management protocol. Dosing and triggers are protocol-dependent.',
      },
    },

    // ── DCD ────────────────────────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Donation After Circulatory Death (DCD)' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'DCD applies when the patient does not meet brain death criteria but the family or legal surrogate decides to withdraw life-sustaining treatment. The OPO coordinates the timing of withdrawal and organ procurement. The withdrawal-of-care decision must be made entirely independently of and prior to any donation conversation. DCD involves different ethical considerations, organ viability timelines, and logistical requirements than donation after brain death (DBD).',
      },
    },

    // ── Family Communication ───────────────────────────────────────────────
    {
      type: 'heading',
      content: { text: 'Family Communication: The SPIKES Framework' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Use the SPIKES protocol for structured, compassionate delivery of serious news — including brain death notification. Originally developed for oncology, SPIKES is widely applicable to any high-stakes goals-of-care or serious illness conversation.',
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Step', 'Action'],
        rows: [
          [
            'S — Setting up',
            'Private room; invite key family members; silence phones; sit down at eye level; minimize interruptions',
          ],
          [
            'P — Perception',
            'Ask what the family already understands: "What have the doctors told you so far about how things are going?"',
          ],
          [
            'I — Invitation',
            'Ask how much information the family wants and is ready to hear: "Would it be helpful if I explain what we found today?"',
          ],
          [
            'K — Knowledge',
            'Deliver information clearly and incrementally; avoid jargon; check for understanding after each key statement',
          ],
          [
            'E — Emotions / Empathy',
            'Pause; acknowledge emotional reactions explicitly before continuing: "I can see this is incredibly difficult..."',
          ],
          [
            'S — Summary / Strategy',
            'Summarize key points; explain next steps clearly; check understanding; offer to answer questions; schedule follow-up',
          ],
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Give Families Time to Grieve',
        text: 'After delivering brain death news, stop. Allow silence. Do not rush to next steps, logistics, or donation. The OPO coordinator will introduce donation at a separate, compassionate moment — never in the same breath as news of death.',
      },
    },
    {
      type: 'collapsible',
      content: {
        title: 'Brain Death vs. DCD — Quick Comparison',
        content:
          'DONATION AFTER BRAIN DEATH (DBD)\n' +
          '• Patient is legally deceased at time of donation\n' +
          '• Warm ischemia time is minimal\n' +
          '• More organs eligible; higher quality\n' +
          '• OPO coordinates after brain death confirmed\n\n' +
          'DONATION AFTER CIRCULATORY DEATH (DCD)\n' +
          '• Patient is alive (but on life support) when decision made\n' +
          '• Family chooses WLST independently of donation discussion\n' +
          '• Warm ischemia time is a critical limitation\n' +
          '• Typically kidneys, liver, lungs eligible; heart DCD protocols emerging\n' +
          '• OPO coordinates timing of WLST and procurement',
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lessons array
// ─────────────────────────────────────────────────────────────────────────────
const lessons = [
  { title: 'M10.L1 — Brain Death: Criteria, Prerequisites, and Clinical Exam', content: m10l1Content },
  { title: 'M10.L2 — Apnea Test and Ancillary Testing', content: m10l2Content },
  { title: 'M10.L3 — Disorders of Consciousness: Coma, VS, MCS, and EMCS', content: m10l3Content },
  { title: 'M10.L4 — Organ Donation Pathway and Family Communication', content: m10l4Content },
];

// ─────────────────────────────────────────────────────────────────────────────
// Populate function
// ─────────────────────────────────────────────────────────────────────────────
async function populate() {
  console.log('🔧 Loading content...\n');
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
