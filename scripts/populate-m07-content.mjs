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

// ─── M07.L1 — Acute Ischemic Stroke: tPA, Thrombectomy, and LVO Workup ───────

const m07l1Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Acute Ischemic Stroke: tPA, Thrombectomy, and LVO Workup' }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Time Is Brain',
        text: '1.9 million neurons are lost every minute during ischemic stroke. Rapid recognition, imaging, and intervention are paramount.'
      }
    },
    {
      type: 'heading',
      content: { text: 'ICU Admission Indications' }
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Large territory infarction (e.g., complete MCA, basilar artery)',
          'Post-tPA administration (monitoring for hemorrhagic transformation)',
          'Post-thrombectomy (neurological monitoring, BP management)',
          'Significant comorbidities requiring close monitoring',
          'Elevated NIHSS (≥15) or rapidly fluctuating neurological exam',
          'Airway compromise or aspiration risk',
          'Hemodynamic instability or malignant arrhythmia'
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'TOAST Classification of Stroke Etiology' }
    },
    {
      type: 'table',
      content: {
        headers: ['Category', 'Key Features'],
        rows: [
          ['Small Vessel Disease (Lacunar)', 'Pure motor, pure sensory, or ataxic hemiparesis; subcortical lesion <15 mm; classic lacunar syndromes'],
          ['Large Artery Atherosclerosis', 'Stenosis ≥50% or occlusion of major cerebral artery; atherosclerotic risk factors prominent'],
          ['Cardiogenic Embolism', 'Cardiac source identified (AFib, valvular disease, mural thrombus, PFO with DVT); often larger, multifocal, or cortical infarcts'],
          ['Other Determined Etiology', 'Non-atherosclerotic vasculopathy, hypercoagulable state, hematologic disorder, arterial dissection'],
          ['Cryptogenic / ESUS', 'Embolic Stroke of Undetermined Source; no identified cause after thorough workup; consider extended cardiac monitoring']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Common Stroke Syndromes' }
    },
    {
      type: 'table',
      content: {
        headers: ['Territory', 'Key Deficits'],
        rows: [
          ['MCA (dominant)', 'Contralateral hemiplegia (arm > leg), hemisensory loss, gaze deviation toward lesion, homonymous hemianopia, aphasia (Broca\'s/Wernicke\'s)'],
          ['MCA (non-dominant)', 'Contralateral hemiplegia, hemisensory loss, hemispatial neglect, anosognosia, constructional apraxia'],
          ['ACA', 'Contralateral leg > arm weakness, abulia, urinary incontinence, grasp reflex'],
          ['PCA', 'Contralateral homonymous hemianopia, alexia without agraphia, memory deficits (thalamic involvement)'],
          ['PICA (Wallenberg)', 'Ipsilateral: facial pain/temp loss, Horner\'s syndrome, dysphagia, hoarseness, ataxia. Contralateral: body pain/temp loss. "Crossed deficits."'],
          ['AICA', 'Ipsilateral: facial pain/temp loss, hearing loss, Horner\'s, ataxia. Contralateral: body pain/temp loss.'],
          ['SCA', 'Ipsilateral: Horner\'s syndrome, cerebellar ataxia. Contralateral: pain/temp loss.'],
          ['Weber Syndrome (midbrain)', 'Ipsilateral CN III palsy (ptosis, mydriasis, down-and-out gaze) + contralateral hemiplegia'],
          ['Benedikt Syndrome (midbrain)', 'Ipsilateral CN III palsy + contralateral tremor/choreoathetosis/ataxia (red nucleus involvement)'],
          ['Locked-In Syndrome', 'Quadriplegia, anarthria, intact cognition; preserved vertical eye movements and blinking only. Cause: basilar artery occlusion.']
        ]
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Crossed Deficits = Posterior Circulation',
        text: 'Ipsilateral cranial nerve findings with contralateral body findings (crossed deficits) are pathognomonic for brainstem/posterior circulation strokes. Think Wallenberg, AICA, SCA, Weber, or Benedikt.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Acute Reperfusion Therapy' }
    },
    {
      type: 'table',
      content: {
        headers: ['Therapy', 'Agent', 'Window', 'Notes'],
        rows: [
          ['IV Thrombolysis', 'Alteplase (0.9 mg/kg, max 90 mg) or Tenecteplase (0.25 mg/kg, max 25 mg)', '≤4.5 hours from last known well', 'Tenecteplase increasingly preferred; single bolus vs alteplase infusion'],
          ['Mechanical Thrombectomy', 'Stent-retriever / aspiration catheter', 'Up to 24 hours with favorable imaging (DAWN / DEFUSE-3 criteria)', 'For LVO (ICA, M1, M2, basilar); requires CTA confirmation']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Acute Imaging Protocol' }
    },
    {
      type: 'checklist',
      content: {
        items: [
          'CTH (non-contrast CT head): stat — rule out hemorrhage before thrombolysis',
          'CTA head and neck: identify LVO and proximal occlusion site',
          'CT Perfusion (CTP): for extended window (4.5–24h) — assess ischemic core vs penumbra (RAPID software)',
          'MRI DWI-FLAIR mismatch: for wake-up strokes — DWI bright but FLAIR negative suggests <4.5h onset',
          'NIHSS score ≥5: suggests significant stroke; drives treatment eligibility decisions'
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'LVO Workup Checklist' }
    },
    {
      type: 'checklist',
      content: [
        { items: [
          'CTA head/neck: confirm vessel occlusion site and level',
          'ECG: rule out AFib, new MI',
          'Echocardiogram (TTE/TEE): cardiac source of embolism',
          'Telemetry monitoring (prolonged cardiac monitoring if cryptogenic — CRYSTAL AF trial supports 30-day monitor)',
          'Lipid panel, HbA1c, CBC, CMP, coagulation studies',
          'Blood cultures if endocarditis suspected',
          'Hypercoagulability panel if young/cryptogenic (see L2)',
          'Carotid duplex ultrasound: stenosis assessment'
        ]}
      ].flatMap(x => x.items).reduce((acc, item) => { acc.items = acc.items || []; acc.items.push(item); return acc; }, { items: [] })
    },
    {
      type: 'warning',
      content: {
        title: 'tPA Absolute Contraindications (Key Highlights)',
        text: 'Active intracranial hemorrhage on imaging; recent intracranial/spinal surgery (<3 months); severe head trauma (<3 months); ischemic stroke within 3 months; active internal bleeding; BP >185/110 mmHg uncontrolled prior to treatment; blood glucose <50 or >400 mg/dL.'
      }
    }
  ]
};

// ─── M07.L2 — Post-Intervention Care: Hemorrhagic Transformation and BP Management ───

const m07l2Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Post-Intervention Care: Hemorrhagic Transformation and BP Management' }
    },
    {
      type: 'heading',
      content: { text: 'Blood Pressure Targets After Stroke' }
    },
    {
      type: 'table',
      content: {
        headers: ['Clinical Scenario', 'BP Target', 'Rationale'],
        rows: [
          ['Post-tPA (alteplase or tenecteplase)', 'SBP <180 mmHg for 24 hours', 'Higher pressures increase hemorrhagic transformation risk after thrombolysis'],
          ['Post-thrombectomy (successful reperfusion, mTICI 2b–3)', 'SBP <160 mmHg', 'Reperfused brain susceptible to hyperperfusion injury and HT'],
          ['Untreated ischemic stroke / permissive HTN', 'SBP <220 mmHg (avoid aggressive lowering)', 'Penumbral tissue relies on collateral perfusion; aggressive lowering extends infarct'],
          ['Pre-tPA (to qualify for treatment)', 'SBP ≤185, DBP ≤110 mmHg', 'Must be achieved and sustained before alteplase or tenecteplase administration']
        ]
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'mTICI Reperfusion Score',
        text: 'Used to grade reperfusion after mechanical thrombectomy. 0: No perfusion. 1: Minimal (<10% of territory). 2a: Partial (10–50%). 2b: Partial but >50% of territory perfused. 3: Complete (full reperfusion). mTICI 2b–3 = successful reperfusion → use tighter BP target (SBP <160).'
      }
    },
    {
      type: 'heading',
      content: { text: 'Hemorrhagic Transformation (HT) Classification' }
    },
    {
      type: 'table',
      content: {
        headers: ['ECASS III Class', 'Description', 'Clinical Significance'],
        rows: [
          ['HI1', 'Small petechiae along the margins of the infarct', 'Common, usually asymptomatic'],
          ['HI2', 'Confluent petechiae within the infarct zone, no mass effect', 'Usually asymptomatic'],
          ['PH1', 'Hematoma occupying <30% of infarct, mild mass effect', 'May be asymptomatic or mild worsening'],
          ['PH2', 'Hematoma >30% of infarct with significant mass effect', 'Symptomatic hemorrhage; associated with clinical deterioration — the "bad" HT']
        ]
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Heidelberg Class', 'Description'],
        rows: [
          ['Class 1 (HI)', 'Hemorrhagic Infarction — petechiae or confluent petechiae within the infarct (corresponds to HI1/HI2)'],
          ['Class 2 (PH)', 'Parenchymal Hematoma — blood clot within infarct (PH1/PH2)'],
          ['Class 3', 'Remote hemorrhage: remote ICH, subarachnoid hemorrhage, intraventricular hemorrhage, subdural/epidural hematoma']
        ]
      }
    },
    {
      type: 'warning',
      content: {
        title: 'PH2 = Symptomatic Hemorrhage',
        text: 'PH2 is the ECASS classification associated with clinical deterioration (≥4-point NIHSS worsening). Occurs in ~2–7% after tPA. Check 24-hour CT post-tPA. If PH2: hold antiplatelets/anticoagulation, neurosurgical consult, ICU escalation.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Cerebral Edema in Large Infarcts' }
    },
    {
      type: 'paragraph',
      content: { text: 'Cytotoxic edema develops within hours; vasogenic edema peaks at days 2–5. Large MCA territory infarcts (>50% of MCA distribution) are at highest risk for malignant cerebral edema with herniation.' }
    },
    {
      type: 'checklist',
      content: {
        items: [
          'HOB 30° to optimize CPP and venous drainage',
          'Osmotherapy: mannitol 20% 0.5–1 g/kg IV bolus or hypertonic saline 23.4% 30 mL IV (central line)',
          'Avoid hypotonic fluids and hyperthermia',
          'Serial neurological exams; pupillary changes signal herniation',
          'Neurosurgery consult early for malignant MCA infarction candidates'
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Decompressive Hemicraniectomy — Malignant MCA Infarction' }
    },
    {
      type: 'table',
      content: {
        headers: ['Trial', 'Key Finding'],
        rows: [
          ['DECIMAL', 'Mortality reduced with hemicraniectomy; increased survival with disability'],
          ['DESTINY I', 'Mortality benefit confirmed; age ≤60 years'],
          ['DESTINY II', 'Extended to age >60 years; mortality benefit preserved but greater proportion survived with severe disability (mRS 4–5)'],
          ['HAMLET', 'Consistent mortality reduction; all three pooled analyses confirm benefit']
        ]
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Hemicraniectomy Consent Nuance',
        text: 'All trials showed reduced mortality but increased survival with severe disability. Discuss with family: survival is more likely, but quality of life may be significantly impaired. Goals-of-care discussion is essential before proceeding.'
      }
    },
    {
      type: 'paragraph',
      content: { text: 'Time window: typically within 48 hours of symptom onset. Best outcomes with early surgery (before transtentorial herniation).' }
    },
    {
      type: 'heading',
      content: { text: 'Secondary Prevention and Anticoagulation Timing' }
    },
    {
      type: 'table',
        content: {
        headers: ['Indication', 'Strategy', 'Timing Notes'],
        rows: [
          ['Minor stroke / TIA', 'Dual antiplatelet therapy (aspirin + clopidogrel)', 'POINT and CHANCE trials: start within 12–24 hours; continue 21 days then single agent'],
          ['Cardioembolic (AFib)', 'Anticoagulation (DOAC preferred)', '4–14 days after large infarct to balance recurrence vs HT risk; earlier for minor strokes (24–48h)'],
          ['Large artery atherosclerosis', 'Statin + antiplatelet', 'High-intensity statin (atorvastatin 80 mg); LDL target <70 mg/dL'],
          ['Cryptogenic / ESUS', 'Antiplatelet + extended cardiac monitoring', 'If paroxysmal AFib detected → anticoagulate']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Hypercoagulability Workup (Young/Cryptogenic Stroke)' }
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Antiphospholipid antibodies (lupus anticoagulant, anticardiolipin IgG/IgM, anti-β2-glycoprotein I)',
          'Factor V Leiden mutation',
          'Prothrombin G20210A mutation',
          'Protein C and Protein S activity levels',
          'Antithrombin III activity',
          'Homocysteine level',
          'CBC with differential (polycythemia, thrombocytosis)',
          'SPEP/serum protein electrophoresis if hematologic malignancy suspected',
          'Note: Proteins C/S and antithrombin III levels are affected by acute thrombosis — recheck in 3 months'
        ]
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'CT Imaging Tips: Contrast Staining vs. Hemorrhage',
        content: 'After thrombectomy with contrast administration, dual-energy CT can distinguish contrast staining (expected, temporary) from true hemorrhage. Contrast staining appears hyperdense but clears on 24-hour follow-up CT. True PH2 hemorrhage persists or expands. Dual-energy CT reduces need for delayed repeat imaging in many centers.'
      }
    }
  ]
};

// ─── M07.L3 — Guillain-Barré Syndrome: Recognition, IVIG, and Respiratory Monitoring ───

const m07l3Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Guillain-Barré Syndrome: Recognition, IVIG, and Respiratory Monitoring' }
    },
    {
      type: 'heading',
      content: { text: 'Overview and Variants' }
    },
    {
      type: 'table',
      content: {
        headers: ['Variant', 'Pathology', 'Key Features'],
        rows: [
          ['AIDP (Acute Inflammatory Demyelinating Polyneuropathy)', 'Demyelinating; most common in Western countries', 'Classic ascending weakness, areflexia, albuminocytologic dissociation in CSF'],
          ['AMAN (Acute Motor Axonal Neuropathy)', 'Axonal; motor only; common in Asia after C. jejuni', 'Rapidly progressive; may recover quickly or poorly'],
          ['AMSAN (Acute Motor-Sensory Axonal Neuropathy)', 'Axonal; motor + sensory', 'Severe form; prolonged recovery'],
          ['Miller Fisher Syndrome', 'Anti-GQ1b antibodies', 'Triad: ophthalmoplegia, ataxia, areflexia — WITHOUT prominent limb weakness']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Typical Timeline and Triggers' }
    },
    {
      type: 'paragraph',
      content: { text: 'GBS typically follows a gastrointestinal or respiratory infection by 2–4 weeks. The most common identified pathogen is Campylobacter jejuni (especially AMAN variant). Other triggers include CMV, EBV, Mycoplasma, Zika virus, influenza, and vaccinations (rarely).' }
    },
    {
      type: 'heading',
      content: { text: 'Clinical Presentation' }
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Ascending weakness starting distally (legs before arms)',
          'Areflexia or hyporeflexia (universal feature)',
          'Back pain (early, often preceding weakness)',
          'Sensory symptoms (tingling, numbness) — less prominent than weakness',
          'Cranial nerve involvement (facial diplegia, dysphagia, ophthalmoplegia) in up to 50%',
          'Autonomic instability: labile BP, arrhythmias, ileus, urinary retention, diaphoresis',
          'CSF: albuminocytologic dissociation (high protein, normal WBC) — may be normal in first 1–2 weeks'
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Respiratory Monitoring: The 20/30/40 Rule' }
    },
    {
      type: 'warning',
      content: {
        title: 'The 20/30/40 Rule Is a SCREENING Tool Only — Not an Intubation Trigger',
        text: 'NIF and MIP values are extremely unreliable in GBS due to patient effort variability and neuromuscular fatigue. These thresholds should NEVER be used in isolation to make intubation decisions. The decision to intubate is CLINICAL.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Parameter', 'Threshold', 'Reliability'],
        rows: [
          ['FVC (Forced Vital Capacity)', '<20 mL/kg IBW', 'Most reliable of the three — warrants ICU-level monitoring'],
          ['NIF (Negative Inspiratory Force)', '<−30 cmH2O', 'Extremely unreliable — highly effort-dependent'],
          ['MIP (Maximum Inspiratory Pressure)', '<−40 cmH2O', 'Unreliable — use as one data point only']
        ]
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Hypoxia and Hypercarbia Are LATE Signs',
        text: 'Do NOT wait for SpO2 to drop or CO2 to rise before intubating. By the time hypoxia/hypercarbia appear, the patient has likely exhausted respiratory reserve. Intubate based on trajectory, clinical signs, and overall picture.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Daily Respiratory Assessment in GBS' }
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Neck flexion/extension strength (early indicator of bulbar involvement)',
          'Secretion management: can the patient clear secretions effectively?',
          'Speech quality: flaccid dysarthria suggests bulbar weakness',
          'Work of breathing: accessory muscle use, respiratory rate, shallow breaths',
          'Cough strength: effective cough vs. weak bovine cough',
          'Dysphagia screen: aspiration risk assessment',
          'FVC trend: declining trajectory more important than single value',
          'Sentence length: inability to count to 20 in one breath is concerning'
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Temporizing Non-Invasive Strategies' }
    },
    {
      type: 'paragraph',
      content: { text: 'When intubation is not yet required but trajectory is concerning, the following may be used with caution — always weigh aspiration risk:' }
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Nasopharyngeal airways + nasotracheal suctioning for secretion clearance',
          'High-flow nasal cannula (HFNC) for oxygenation support',
          'BiPAP for hypercapnic respiratory failure — USE WITH CAUTION if dysphagia present (aspiration risk)',
          'Frequent reassessment; NIV is a bridge, not a destination in rapid progressors'
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Treatment' }
    },
    {
      type: 'table',
      content: {
        headers: ['Therapy', 'Regimen', 'Notes'],
        rows: [
          ['IVIG', '2 g/kg total over 3–5 days', 'Equally effective as PLEX; preferred when venous access is difficult or autonomic instability makes PLEX risky'],
          ['Plasmapheresis (PLEX)', '5+ sessions (200–250 mL/kg total) over 10–14 days', 'Equally effective as IVIG; not additive — do not use both'],
          ['Steroids', 'NOT indicated', 'Multiple trials show no benefit and possible harm in GBS']
        ]
      }
    },
    {
      type: 'warning',
      content: {
        title: 'Succinylcholine is CONTRAINDICATED in GBS',
        text: 'GBS causes upregulation of extrajunctional acetylcholine receptors. Succinylcholine causes massive potassium efflux → life-threatening hyperkalemia. USE ROCURONIUM for RSI (sugammadex available for reversal).'
      }
    },
    {
      type: 'heading',
      content: { text: 'Autonomic Instability Management' }
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Continuous cardiac monitoring (arrhythmias: bradycardia, heart block, SVT)',
          'Avoid rapid BP corrections — labile BP is expected; over-treatment causes hypotension',
          'Short-acting agents preferred if treatment required (esmolol, nicardipine, phenylephrine)',
          'Ileus: bowel regimen, NG feeds if needed',
          'Urinary retention: bladder scan, Foley catheter as needed',
          'DVT prophylaxis: GBS patients are high-risk (immobility + autonomic dysfunction)'
        ]
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Tracheostomy Considerations in GBS',
        content: 'Prolonged respiratory failure requiring mechanical ventilation for >2–3 weeks warrants tracheostomy consideration. GBS patients who cannot be weaned should have early tracheostomy discussion (typically after 7–14 days of intubation). Tracheostomy improves patient comfort, facilitates weaning trials, and reduces sedation requirements. Prognosis for eventual weaning is generally favorable in AIDP — most patients recover respiratory function over weeks to months.'
      }
    }
  ]
};

// ─── M07.L4 — Myasthenic Crisis: Triggers, PLEX, and Ventilator Weaning ─────────

const m07l4Content = {
  blocks: [
    {
      type: 'heading',
      content: { text: 'Myasthenic Crisis: Triggers, PLEX, and Ventilator Weaning' }
    },
    {
      type: 'heading',
      content: { text: 'Myasthenia Gravis — Antibody Subtypes' }
    },
    {
      type: 'table',
      content: {
        headers: ['Antibody', 'Target', 'Notes'],
        rows: [
          ['Anti-AChR', 'Acetylcholine receptor', 'Most common (~85%); classic ocular + bulbar + limb weakness'],
          ['Anti-MuSK', 'Muscle-specific kinase', '~5–8%; predominantly bulbar/respiratory; responds better to PLEX; Rituximab preferred for long-term'],
          ['Anti-LRP4', 'Low-density lipoprotein receptor-related protein 4', 'Rare; often milder phenotype'],
          ['Anti-Agrin', 'Agrin (neuromuscular junction stabilizer)', 'Rare; overlap with LRP4'],
          ['Seronegative', 'No detected antibody', '~10%; may have undetected antibodies; treat clinically']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Myasthenic Crisis — Definition and Triggers' }
    },
    {
      type: 'paragraph',
      content: { text: 'Myasthenic crisis is defined as respiratory failure requiring intubation or assisted ventilation in a patient with MG. It is a neurological emergency.' }
    },
    {
      type: 'table',
      content: {
        headers: ['Trigger Category', 'Examples'],
        rows: [
          ['Infection', 'Most common trigger; any infection (URI, UTI, pneumonia) can precipitate crisis'],
          ['Surgery / Procedures', 'Perioperative stress; medications used during anesthesia'],
          ['Medications', 'Aminoglycosides, fluoroquinolones, beta-blockers, calcium channel blockers, hydroxychloroquine, magnesium, procainamide, macrolides, contrast dye'],
          ['Excessive Pyridostigmine', 'Paradoxically, too much acetylcholinesterase inhibitor → cholinergic crisis (see below)'],
          ['Pregnancy / Postpartum', 'Hormonal changes; postpartum period especially high risk'],
          ['Aspiration Pneumonia', 'Complication of bulbar weakness that then worsens crisis']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Neuromuscular Exam — Respiratory Distress Signs' }
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Dyspnea at rest or with minimal exertion',
          'Tachypnea, increased respiratory rate',
          'Accessory muscle use (sternocleidomastoid, scalenes, intercostals)',
          'Shortened sentences (cannot complete full sentence in one breath)',
          'Thoracoabdominal desynchrony ("paradoxical breathing")',
          'Weak cough: "bovine" cough or inability to generate forceful cough',
          'Nasal voice / hypophonia (bulbar weakness)',
          'Declining FVC trend (serial measurements more valuable than single value)',
          'Ptosis / diplopia worsening'
        ]
      }
    },
    {
      type: 'warning',
      content: {
        title: 'Key Medications to AVOID in MG',
        text: 'Beta-blockers, aminoglycosides (gentamicin, tobramycin), fluoroquinolones (ciprofloxacin, levofloxacin), magnesium sulfate, procainamide, d-penicillamine, chloroquine/hydroxychloroquine, high-dose corticosteroids (may worsen acutely). Always review the full medication list on admission.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Treatment of Myasthenic Crisis' }
    },
    {
      type: 'table',
      content: {
        headers: ['Therapy', 'Regimen', 'Notes'],
        rows: [
          ['Plasmapheresis (PLEX)', '5 sessions over 10 days (alternate days)', 'Faster onset (~3–5 days). First-line for severe crisis. Anti-MuSK MG: PLEX preferred.'],
          ['IVIG', '2 g/kg over 3–5 days', 'Comparable efficacy to PLEX for most patients; onset ~1–2 weeks'],
          ['Corticosteroids', 'Prednisone (if not in acute crisis)', 'May cause transient initial worsening — AVOID starting steroids unless patient already intubated/protected']
        ]
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'PLEX Before IVIG if Both Planned',
        text: 'If both PLEX and IVIG are planned, ALWAYS give PLEX first. IVIG is removed during plasmapheresis — administering IVIG first wastes the treatment. Sequence: PLEX → then IVIG (if needed after).'
      }
    },
    {
      type: 'heading',
      content: { text: 'Pyridostigmine (Mestinon) in the ICU' }
    },
    {
      type: 'paragraph',
      content: { text: 'Acetylcholinesterase inhibitors (pyridostigmine) are the mainstay of outpatient MG management but are often HELD during myasthenic crisis in the ICU. The rationale: pyridostigmine increases secretions, worsening airway management in intubated or at-risk patients, and may mask the severity of the underlying crisis.' }
    },
    {
      type: 'heading',
      content: { text: 'Cholinergic Crisis vs. Myasthenic Crisis' }
    },
    {
      type: 'table',
      content: {
        headers: ['Feature', 'Myasthenic Crisis', 'Cholinergic Crisis'],
        rows: [
          ['Cause', 'Inadequate ACh effect at NMJ', 'Excess ACh (too much pyridostigmine or organophosphate)'],
          ['Weakness', 'Yes', 'Yes (depolarizing blockade)'],
          ['Pupils', 'Normal or dilated', 'Miosis (constricted)'],
          ['Secretions', 'Normal', 'Excessive (SLUDGE: salivation, lacrimation, urination, defecation, GI distress, emesis)'],
          ['Heart Rate', 'Normal or tachycardic', 'Bradycardia'],
          ['Fasciculations', 'Absent', 'Present'],
          ['Treatment', 'PLEX or IVIG', 'Stop pyridostigmine; atropine; pralidoxime if organophosphate']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Long-Term MG Immunosuppressive Therapies' }
    },
    {
      type: 'table',
      content: {
        headers: ['Agent', 'Mechanism / Use Case'],
        rows: [
          ['Prednisone', 'First-line immunosuppression; gradual taper; risk of initial worsening'],
          ['Azathioprine', 'Steroid-sparing; slow onset (6–18 months); check TPMT enzyme before starting'],
          ['Mycophenolate mofetil', 'Steroid-sparing; fewer side effects than azathioprine; slow onset'],
          ['Rituximab', 'Anti-CD20; preferred for MuSK-antibody positive MG; also used for refractory AChR-positive'],
          ['Eculizumab', 'Anti-complement (C5); FDA-approved for refractory AChR+ MG; high cost'],
          ['Inebilizumab', 'Anti-CD19 B-cell depleter; emerging for MG'],
          ['Efgartimod', 'Neonatal Fc receptor (FcRn) antagonist; reduces IgG levels including pathogenic AChR antibodies; subcutaneous or IV; faster onset than traditional immunosuppressants']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Ventilator Weaning in Myasthenic Crisis' }
    },
    {
      type: 'checklist',
      content: {
        items: [
          'Serial NIF (Negative Inspiratory Force): improving trend toward >−25 cmH2O supports readiness',
          'Serial FVC: improving trend toward >15–20 mL/kg IBW',
          'Spontaneous Breathing Trials (SBT): initiate when secretions manageable and NIF/FVC trending up',
          'Minimize sedation to allow accurate neuromuscular assessment',
          'Ensure PLEX/IVIG course has had time for effect (PLEX: 3–5 days; IVIG: 1–2 weeks)',
          'Treat underlying trigger (infection, offending medication)',
          'Resume pyridostigmine cautiously after extubation',
          'Consider tracheostomy for prolonged course (>2 weeks of mechanical ventilation)',
          'Speech therapy evaluation prior to extubation for bulbar function and aspiration risk'
        ]
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Thymectomy in MG — When and Why',
        content: 'Thymectomy is recommended for all patients with thymoma and for non-thymomatous AChR+ MG patients aged 18–65 years (MGTX trial: improved outcomes at 3 years with extended transsternal thymectomy + prednisone vs prednisone alone). Not routinely recommended for MuSK-positive or seronegative MG without thymoma. Not appropriate during myasthenic crisis — perform after stabilization.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'GBS vs MG — Key Differentiators',
        text: 'GBS: post-infectious, ascending, areflexia, autonomic instability, CSF albuminocytologic dissociation, succinylcholine CONTRAINDICATED. MG: fatigable weakness, normal reflexes, ocular/bulbar predominance, antibody-mediated, avoid beta-blockers/aminoglycosides/Mg. Both can require ICU respiratory management and both respond to PLEX or IVIG.'
      }
    }
  ]
};

// ─── Lessons Array and Populate Function ─────────────────────────────────────

const lessons = [
  { title: 'M07.L1 — Acute Ischemic Stroke: tPA, Thrombectomy, and LVO Workup', content: m07l1Content },
  { title: 'M07.L2 — Post-Intervention Care: Hemorrhagic Transformation and BP Management', content: m07l2Content },
  { title: 'M07.L3 — Guillain-Barré Syndrome: Recognition, IVIG, and Respiratory Monitoring', content: m07l3Content },
  { title: 'M07.L4 — Myasthenic Crisis: Triggers, PLEX, and Ventilator Weaning', content: m07l4Content },
];

async function populate() {
  console.log('🔧 Loading M07 content...\n');
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
