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

// ─── M06.L1 — Aneurysmal SAH: Presentation, Grading, and Acute Management ───

const m06l1Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Overview: Aneurysmal SAH' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Subarachnoid hemorrhage (SAH) refers to bleeding into the subarachnoid space. Approximately 80% of spontaneous SAH results from aneurysm rupture. The classic presentation is a sudden-onset "thunderclap" headache — the worst headache of the patient\'s life — often accompanied by nausea, vomiting, photophobia, neck stiffness, and possible loss of consciousness.',
      },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Non-aneurysmal causes of spontaneous SAH include: perimesencephalic SAH (~50% of angio-negative cases, generally benign course), vascular dissection, dural AVF, AVM, vasculitis, Moyamoya disease, and cerebral amyloid angiopathy (CAA).',
      },
    },
    {
      type: 'heading',
      content: { text: 'Hunt-Hess Grading Scale' },
    },
    {
      type: 'table',
      content: {
        headers: ['Grade', 'Clinical Features', 'Approx. Survival (1968 data)'],
        rows: [
          ['1', 'Mild HA, normal mental status, no motor deficits, minimal nuchal rigidity', '~70%'],
          ['2', 'Severe HA, normal MS, possible CN deficit (e.g., CN III palsy)', '~60%'],
          ['3', 'Somnolent or confused, mild focal motor deficit', '~50%'],
          ['4', 'Stupor, moderate-to-severe hemiparesis, possible reflex posturing', '~20%'],
          ['5', 'Coma, decerebrate posturing or flaccid', '~10%'],
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Clinical Note on Hunt-Hess',
        text: 'Survival estimates are derived from 1968 data and reflect outcomes prior to modern neurocritical care. Use Hunt-Hess for grading severity and communication — avoid using it alone for early prognostication or withdrawal of care decisions.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Modified Fisher Scale — DCI Risk Stratification' },
    },
    {
      type: 'table',
      content: {
        headers: ['Grade', 'CT Findings', 'DCI Risk'],
        rows: [
          ['0', 'No SAH visible on CT', '0%'],
          ['1', 'Thin SAH (<1 mm), no intraventricular hemorrhage (IVH)', '~24%'],
          ['2', 'Thin SAH + IVH present', '~33%'],
          ['3', 'Thick SAH (≥1 mm), no IVH', '~33%'],
          ['4', 'Thick SAH + IVH present', '~40%'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'WFNS Grading Scale' },
    },
    {
      type: 'table',
      content: {
        headers: ['Grade', 'GCS Score', 'Motor Deficit'],
        rows: [
          ['1', '15', 'Absent'],
          ['2', '13–14', 'Absent'],
          ['3', '13–14', 'Present'],
          ['4', '7–12', 'Present or absent'],
          ['5', '3–6', 'Present or absent'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Initial Management: Prior to Aneurysm Securement' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'CTH and CTA head/neck STAT',
          'Maintain SBP <140 mmHg until aneurysm is secured',
          'NPO for potential angiogram or EVD placement',
          'Seizure ppx: Levetiracetam load if history concerning; maintenance 500 mg BID x7 days for craniotomy, MCA bifurcation aneurysm, or early cortical infarcts',
          'Start Nimodipine 60 mg PO/NG q4h (or 30 mg q2h if BP not tolerated; sublingual if unable to swallow)',
          'Hold subcutaneous heparin (SQH) until aneurysm is secured',
          'Reverse coagulopathy urgently',
          'Maintain euvolemia — strict daily I/O monitoring',
          'EVD placement per neurosurgery if hydrocephalus present',
          'Troponin, 12-lead EKG, and baseline TTE — high risk for stress cardiomyopathy (Takotsubo)',
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Post-Securement Management' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Liberalize SBP 100–200 mmHg during vasospasm window (days 4–14)',
          'Prefer vasopressor drips during acute vasospasm for precise BP titration',
          'Angio-negative non-traumatic SAH: continue SBP <140 mmHg',
          'Monitor EVD output daily; maintain ICP within prescribed range',
          'Start SQH after securement (immediately post-endovascular; 24–48h post-surgical)',
          'Continue Nimodipine for up to 21 days',
          'Neurological assessments q2h',
          'BMP q6h — monitor Na closely; avoid sodium-lowering medications',
          'Strict daily I/O — maintain euvolemia throughout entire vasospasm period',
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Key Complications' },
    },
    {
      type: 'warning',
      content: {
        title: 'Re-Rupture — STAT Neurosurgery',
        text: 'Signs: acute neurological deterioration, new seizure activity, sudden increase in EVD ICP, or bright red blood in EVD drainage. STAT page neurosurgery — do not delay. This is a neurosurgical emergency.',
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Stress Cardiomyopathy (Takotsubo / Neurogenic Stunned Myocardium)',
        text: 'SAH triggers a massive catecholamine surge → Takotsubo cardiomyopathy pattern. Obtain baseline TTE in all patients. Avoid phenylephrine (pure alpha-agonist) — prefer norepinephrine or dopamine if vasopressors are required. Monitor troponin trends closely.',
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'SIADH vs. Cerebral Salt Wasting (CSW)',
        text: 'Both present with hyponatremia, high urine sodium, and high urine osmolality. Treat similarly: IV fluids, hypertonic saline, salt tablets, fludrocortisone, and high-osmolality/high-protein diet. Monitor BMP q6h. Avoid free water — hyponatremia increases cerebral edema and seizure risk in SAH.',
      },
    },
  ],
};

// ─── M06.L2 — Vasospasm: Recognition, Monitoring, and Treatment ───────────────

const m06l2Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Vasospasm vs. Delayed Cerebral Ischemia (DCI)' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Vasospasm refers to arterial narrowing detectable on imaging (angiography, CTA, or TCD) that may or may not produce symptoms. Delayed Cerebral Ischemia (DCI) is the clinical syndrome — defined as a new focal neurological deficit OR a persistent GCS decline ≥2 points lasting more than 1 hour, not explained by another cause such as hydrocephalus, rebleeding, seizure, or metabolic derangement.',
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Vasospasm Timing',
        text: 'Vasospasm most commonly occurs between days 4–14 post-SAH, but can develop up to 3 weeks after the initial bleed. Peak risk is typically days 7–10. Vigilance must be maintained throughout this entire window.',
      },
    },
    {
      type: 'paragraph',
      content: {
        text: 'Physiological warning signs that may precede clinical DCI include: spontaneous diuresis (may reflect SIADH resolution or worsening CSW → volume contraction) and auto-hypertension (cerebral autoregulation driving MAP up to maintain perfusion pressure in the face of vasospasm).',
      },
    },
    {
      type: 'heading',
      content: { text: 'TCD Monitoring — Lindegaard Ratio' },
    },
    {
      type: 'table',
      content: {
        headers: ['Lindegaard Ratio (MCA velocity / ICA velocity)', 'Interpretation'],
        rows: [
          ['< 3', 'No significant vasospasm'],
          ['3 – 6', 'Suggestive of vasospasm'],
          ['> 6', 'Severe vasospasm'],
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'TCD Limitations',
        text: 'TCD is operator-dependent and has limited sensitivity for posterior circulation vasospasm. Use in combination with clinical assessment and CTA/CTP — not as a standalone diagnostic. A normal TCD does not exclude clinically significant vasospasm.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Evaluate Other Causes of Neurological Decline' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Hyponatremia — check BMP; Na <135 mEq/L can cause altered mental status and seizures',
          'Fever / Sepsis — common after EVD placement or prolonged ICU stay; obtain cultures',
          'Hypotension — check MAP; inadequate CPP worsens ischemia',
          'Seizures — obtain EEG if encephalopathy without clear structural cause',
          'Hydrocephalus — check EVD output and ICP trend',
          'Rebleeding — bright red EVD drainage, sudden ICP spike, acute deterioration',
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'When DCI Is Suspected' },
    },
    {
      type: 'warning',
      content: {
        title: 'DCI Protocol — Act Immediately',
        text: '1. STAT page neurosurgery and NCC attending. 2. STAT CTA head/neck + CT perfusion (CTP). 3. Begin BP augmentation immediately — IV fluid bolus and/or start vasopressors. 4. Contact endovascular team for angiogram consideration. Do NOT wait for imaging results before initiating blood pressure augmentation.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Initial DCI Management' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Augment blood pressure: target MAP per NCC attending (typically MAP augmentation of 20–40 mmHg above baseline)',
          'IV fluid bolus 250–500 mL NS or LR for volume expansion',
          'Start vasopressors if volume alone insufficient — norepinephrine preferred (avoid phenylephrine if stress cardiomyopathy suspected)',
          'Continue Nimodipine through vasopressors unless causing significant systemic hypotension',
          'Contact endovascular team for possible intra-arterial therapy (balloon angioplasty, intra-arterial verapamil or nicardipine)',
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Refractory Vasospasm Management' },
    },
    {
      type: 'table',
      content: {
        headers: ['Agent', 'Protocol', 'Route'],
        rows: [
          ['IV Milrinone (MILRISPASM protocol)', 'Start 0.5 mcg/kg/min; escalate per protocol', 'IV continuous infusion'],
          ['Intrathecal Nicardipine (if EVD present)', '2 mg q8h OR 4 mg q12h', 'Intrathecal via EVD'],
          ['Intra-arterial Verapamil / Nicardipine', 'Per endovascular team, performed in procedural suite', 'Intra-arterial'],
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Nimodipine During Vasopressors',
        text: 'Nimodipine is typically continued even when vasopressors are running — its benefit is primarily neuroprotective, not just vasodilatory. The exception is when it is causing significant systemic hypotension that limits blood pressure augmentation goals. Discuss dose adjustment (30 mg q2h) or temporary hold with NCC attending.',
      },
    },
  ],
};

// ─── M06.L3 — Spontaneous ICH: Workup, Bundle, and Surgical Criteria ─────────

const m06l3Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Spontaneous ICH: Etiologies by Location' },
    },
    {
      type: 'table',
      content: {
        headers: ['Etiology', 'Typical Location', 'Key Features'],
        rows: [
          ['Hypertensive', 'Basal ganglia, thalamus, cerebellum, brainstem (pons)', 'Most common cause; deep structures; chronic HTN history'],
          ['Cerebral Amyloid Angiopathy (CAA)', 'Lobar (cortical/subcortical)', 'Elderly patients; recurrent lobar bleeds; GRE/SWI microbleeds'],
          ['Vascular Malformation (AVM, cavernoma)', 'Variable', 'Younger patients; look for underlying lesion on CTA/MRA'],
          ['Trauma', 'Variable; may have contusions ± SDH', 'History; mechanism often high-force impact'],
          ['Anticoagulant / Thrombolytic', 'Variable; often large and expanding', 'Check medications; INR/anti-Xa/TT; urgent reversal required'],
        ],
      },
    },
    {
      type: 'warning',
      content: {
        title: 'Hematoma Expansion — The First 6 Hours Are Critical',
        text: 'Hematoma expansion occurs most frequently within the first 6 hours of symptom onset and is the primary driver of early neurological deterioration and death in ICH. BP control and urgent coagulopathy reversal are time-sensitive priorities — every minute matters.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Initial Assessment: Airway, Breathing, Circulation' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'A — Airway: assess protection; intubate for GCS ≤8 or clinical airway compromise',
          'B — Breathing: ensure oxygenation and ventilation; SpO₂ ≥94%',
          'C — Circulation: establish IV access ×2, draw labs (CBC, CMP, coagulation panel, type & screen)',
          'Target SBP <150 mmHg — AVOID SBP <130 mmHg (risk of ischemia in ICAD territory)',
          'Obtain urgent coagulation studies: INR/PT, aPTT, anti-Xa level, thrombin time, platelet count',
          'Initiate anticoagulation reversal immediately if indicated (see M06.L4)',
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'BP Target for ICH',
        text: 'Target SBP <150 mmHg for spontaneous ICH. Do not overshoot — maintaining SBP ≥130 mmHg is important in patients with underlying intracranial atherosclerotic disease (ICAD) to prevent secondary ischemic injury in perfusion-dependent territories.',
      },
    },
    {
      type: 'heading',
      content: { text: 'ICH Score — 30-Day Mortality Predictor' },
    },
    {
      type: 'table',
      content: {
        headers: ['Variable', 'Finding', 'Points'],
        rows: [
          ['GCS at presentation', '3–4', '2'],
          ['GCS at presentation', '5–12', '1'],
          ['GCS at presentation', '13–15', '0'],
          ['ICH Volume', '≥30 mL', '1'],
          ['ICH Volume', '<30 mL', '0'],
          ['Intraventricular Hemorrhage (IVH)', 'Present', '1'],
          ['Location', 'Infratentorial (brainstem / cerebellum)', '1'],
          ['Age', '≥80 years', '1'],
        ],
      },
    },
    {
      type: 'table',
      content: {
        headers: ['Total ICH Score', '30-Day Mortality'],
        rows: [
          ['0', '~0%'],
          ['1', '~13%'],
          ['2', '~26%'],
          ['3', '~72%'],
          ['4', '~97%'],
          ['5–6', '~100%'],
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'ICH Score — Use with Caution for Prognosis',
        text: 'The ICH Score is a validated 30-day mortality predictor but should NOT be used as the sole basis for early do-not-resuscitate decisions or withdrawal of care. Early aggressive management and reassessment over 24–72 hours are recommended before establishing definitive prognosis.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Imaging Strategy' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'CTA head is the primary initial imaging study. Key findings to evaluate: underlying vascular malformation (AVM, dural AVF, aneurysm), spot sign (contrast extravasation within hematoma = active bleeding and expansion risk), and intracranial atherosclerotic stenosis (ICAD) which impacts BP management targets.',
      },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Follow-up CT within 4–6 hours of initial scan to assess hematoma stability (especially high-risk: spot sign present, anticoagulation use, or ongoing BP issues)',
          'Follow-up CT at 24 hours regardless of clinical course',
          'CT or MR venogram if venous thrombosis suspected (e.g., lobar ICH in young patient, bilateral thalamic involvement, peri-partum)',
          'DSA (catheter angiogram) for suspected vascular malformation, isolated IVH without clear etiology, or atypical location for age',
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Neurosurgical Intervention Indications' },
    },
    {
      type: 'table',
      content: {
        headers: ['Clinical Scenario', 'Recommended Intervention'],
        rows: [
          ['IVH ± obstructive hydrocephalus', 'EVD placement for ICP monitoring and CSF drainage'],
          ['Superficial / lobar ICH with significant mass effect', 'Consider minimally invasive surgical evacuation'],
          ['Large deep ICH with refractory ICP / herniation', 'Decompressive hemicraniectomy consideration'],
          ['Posterior fossa ICH (cerebellum / brainstem) with mass effect', 'URGENT suboccipital craniectomy evaluation — EVD alone NOT preferred (upward herniation risk)'],
        ],
      },
    },
    {
      type: 'warning',
      content: {
        title: 'Posterior Fossa ICH — Do NOT Rely on EVD Alone',
        text: 'For cerebellar or brainstem hemorrhage causing obstructive hydrocephalus, placing an EVD without surgical evacuation carries a significant risk of upward transtentorial herniation by removing the obstructive pressure differential. Surgical evacuation via suboccipital craniectomy is the preferred definitive intervention. Urgent neurosurgery consultation is required.',
      },
    },
  ],
};

// ─── M06.L4 — Anticoagulation Reversal and Rebleeding Prevention ──────────────

const m06l4Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Anticoagulation Reversal: Overview' },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Time-Critical Urgency',
        text: 'Reversal of anticoagulation is time-critical in hemorrhagic stroke — hematoma expansion risk is highest in the first 6 hours. Identify the offending agent, check appropriate coagulation labs, and initiate reversal immediately. Do not wait for imaging results to begin reversal if ICH is confirmed.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Vitamin K Antagonist (Warfarin) Reversal' },
    },
    {
      type: 'table',
      content: {
        headers: ['Agent', 'Indication', 'Dose / Protocol'],
        rows: [
          ['Vitamin K (Phytonadione)', 'All warfarin-related ICH', '10 mg IV slow infusion (over 30–60 min)'],
          ['4F-PCC (Kcentra)', 'INR >2 or any warfarin-related ICH', '50 U/kg IV (max 5,000 units); recheck INR at 30 min'],
          ['3F-PCC (Profilnine)', 'HIT or heparin allergy — use instead of 4F-PCC', '25–50 U/kg IV'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Direct Oral Anticoagulants (DOACs) Reversal' },
    },
    {
      type: 'table',
      content: {
        headers: ['Drug (Brand)', 'Reversal Agent', 'Dose / Protocol'],
        rows: [
          ['Dabigatran (Pradaxa)', 'Idarucizumab (Praxbind)', '2.5 g IV × 2 doses (total 5 g); activated charcoal 25 g PO if ingestion within 2 hours'],
          ['Apixaban (Eliquis)', '4F-PCC (Kcentra)', '50 U/kg IV; activated charcoal 25 g PO if ingestion within 2 hours'],
          ['Rivaroxaban (Xarelto)', '4F-PCC (Kcentra)', '50 U/kg IV; activated charcoal 25 g PO if ingestion within 2 hours'],
          ['Edoxaban (Savaysa)', '4F-PCC (Kcentra)', '50 U/kg IV; activated charcoal 25 g PO if ingestion within 2 hours'],
        ],
      },
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'DOAC Reversal + HIT / Heparin Allergy',
        text: 'If the patient has HIT or a documented heparin allergy: use 3F-PCC (Profilnine) 25 U/kg instead of 4F-PCC for apixaban/rivaroxaban/edoxaban reversal — 4F-PCC (Kcentra) contains heparin and is contraindicated.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Heparin Products Reversal' },
    },
    {
      type: 'table',
      content: {
        headers: ['Agent', 'Reversal Agent', 'Dose / Protocol'],
        rows: [
          ['UFH (Unfractionated Heparin)', 'Protamine Sulfate', '1 mg protamine per 100 units heparin received in previous 2.5 hours; IVPB over 10 min; max 50 mg per dose; can repeat once'],
          ['LMWH (Enoxaparin) — within 8 hours', 'Protamine Sulfate', '1 mg protamine per 1 mg enoxaparin (max 50 mg); if bleeding continues, give second dose 0.5 mg/1 mg'],
          ['LMWH (Enoxaparin) — >8 hours ago', 'Protamine Sulfate (partial)', '0.5 mg protamine per 1 mg enoxaparin; note: anti-Xa activity not completely neutralized'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Direct Thrombin Inhibitors / Factor Xa Inhibitors / Fondaparinux' },
    },
    {
      type: 'table',
      content: {
        headers: ['Agent', 'Specific Reversal', 'Emergency Approach'],
        rows: [
          ['Argatroban', 'None available', 'Stop infusion; aPTT normalizes in ~1–3 h; activated PCC (FEIBA) 25 U/kg if life-threatening'],
          ['Bivalirudin (Angiomax)', 'None available', 'Stop infusion; short half-life ~25 min; activated PCC (FEIBA) 25 U/kg if life-threatening'],
          ['Fondaparinux (Arixtra)', 'None available', 'Stop drug; activated PCC (FEIBA) 25 U/kg if life-threatening'],
        ],
      },
    },
    {
      type: 'warning',
      content: {
        title: 'Do NOT Use 4F-PCC for Argatroban / Bivalirudin / Fondaparinux',
        text: '4F-PCC (Kcentra) contains heparin — it is contraindicated in patients with HIT and should NOT be used for reversal of argatroban, bivalirudin, or fondaparinux. Use activated PCC (FEIBA) if PCC therapy is required for life-threatening bleeding with these agents.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Antiplatelet Agent Reversal' },
    },
    {
      type: 'table',
      content: {
        headers: ['Agent (Brand)', 'Binding Type', 'Intervention'],
        rows: [
          ['Aspirin', 'Irreversible (COX-1 inhibitor; platelet lifespan ~7–10 days)', 'DDAVP 0.3 mcg/kg IV × 1 over 15 min (caution: tachyphylaxis, hyponatremia, seizures with multiple doses)'],
          ['Clopidogrel (Plavix)', 'Irreversible (prodrug → active metabolite; P2Y12)', 'DDAVP 0.3 mcg/kg IV × 1; consider platelet transfusion in severe/refractory cases'],
          ['Prasugrel (Effient)', 'Irreversible (prodrug; more potent than clopidogrel)', 'DDAVP 0.3 mcg/kg IV × 1; consider platelet transfusion in severe/refractory cases'],
          ['Ticagrelor (Brilinta)', 'Reversible (direct, non-covalent P2Y12 binding)', 'DDAVP 0.3 mcg/kg IV × 1; platelet function recovers over time (t½ ~7–8 h)'],
        ],
      },
    },
    {
      type: 'heading',
      content: { text: 'Thrombolytic Reversal (tPA / TNK)' },
    },
    {
      type: 'paragraph',
      content: {
        text: 'No specific reversal agent exists for alteplase (tPA) or tenecteplase (TNK). Management of life-threatening thrombolytic-related hemorrhage: aminocaproic acid 4 g IV load ± 1 g/hr × 8 hours; OR cryoprecipitate 10 units IV if fibrinogen is <150 mg/dL. Check fibrinogen level urgently.',
      },
    },
    {
      type: 'warning',
      content: {
        title: 'Plasma (FFP) Does NOT Reverse Alteplase',
        text: 'Fresh frozen plasma (FFP) does NOT reverse the effects of tPA or TNK. Alteplase is a plasminogen activator — its mechanism is enzymatic lysis of fibrin, not factor deficiency. Adding coagulation factors via FFP will not stop the bleeding. Use aminocaproic acid or cryoprecipitate.',
      },
    },
    {
      type: 'heading',
      content: { text: 'Rebleeding Prevention' },
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Optimize blood pressure: SBP <150 mmHg for ICH; SBP <140 mmHg pre-securement for SAH',
          'Correct all coagulopathy: target INR <1.4, platelet count ≥100,000/μL, correct factor deficiencies',
          'Avoid antiplatelet agents until patient is clinically and radiographically stable (discuss restart timing with neurosurgery and primary team)',
          'For SAH: hold SQH until aneurysm is secured; continue nimodipine for vasospasm prevention',
          'Minimize Valsalva: stool softeners (e.g., docusate ± senna), antiemetics, and adequate sedation/analgesia',
          'Strict BP monitoring at all times — actively prevent hypertensive surges caused by pain, agitation, or hypoventilation',
        ],
      },
    },
  ],
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const lessons = [
  { title: 'M06.L1 — Aneurysmal SAH: Presentation, Grading, and Acute Management', content: m06l1Content },
  { title: 'M06.L2 — Vasospasm: Recognition, Monitoring, and Treatment', content: m06l2Content },
  { title: 'M06.L3 — Spontaneous ICH: Workup, Bundle, and Surgical Criteria', content: m06l3Content },
  { title: 'M06.L4 — Anticoagulation Reversal and Rebleeding Prevention', content: m06l4Content },
];

async function populate() {
  console.log('🔧 Loading M06 content...\n');
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
