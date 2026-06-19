-- NCC Curriculum - Comprehensive Content Load
-- Created: May 14, 2026 | Built by Sage 🦉
-- Instructions: Run this in Supabase SQL Editor to populate the app with real NCC content

-- ============================================================================
-- MODULE 1: Neuro ICU Essentials & Safety
-- ============================================================================

-- Lesson 1.1: NCC Patient Care Roles
INSERT INTO public.module_lessons (module_id, title, content, lesson_order)
SELECT 
  id,
  'Understanding NCC Team Roles',
  json_build_object(
    'title', 'Understanding NCC Team Roles',
    'blocks', json_build_array(
      json_build_object('id', '1', 'type', 'heading', 'content', json_build_object('text', 'NCC Team Structure')),
      json_build_object('id', '2', 'type', 'paragraph', 'content', json_build_object('text', 'The Neurocritical Care team serves three primary roles: primary team, co-managing team, and consulting team. Understanding these roles is essential for effective patient care coordination and communication.')),
      json_build_object('id', '3', 'type', 'heading', 'content', json_build_object('text', 'Primary NCC Patients')),
      json_build_object('id', '4', 'type', 'callout', 'content', json_build_object('title', 'When NCC is Primary Team', 'text', 'NCC assumes full responsibility for patient care, ordering, procedures, and ICU discharge decision-making.')),
      json_build_object('id', '5', 'type', 'checklist', 'content', json_build_object('items', ARRAY['Status epilepticus or at-risk patients', 'Neuromuscular disease requiring ICU (Guillain-Barré, Myasthenia Gravis)', 'Infectious meningitis requiring ICU', 'Autoimmune encephalitis or demyelinating conditions'])),
      json_build_object('id', '6', 'type', 'heading', 'content', json_build_object('text', 'Co-managed NCC Patients')),
      json_build_object('id', '7', 'type', 'paragraph', 'content', json_build_object('text', 'NCC works closely with primary team to support patient care while maintaining collaborative decision-making.')),
      json_build_object('id', '8', 'type', 'checklist', 'content', json_build_object('items', ARRAY['Spontaneous SAH (neurosurgery primary)', 'Spontaneous ICH without vascular lesion (stroke primary)', 'ICH with vascular lesion (neurosurgery primary)', 'Acute ischemic stroke at high decompensation risk', 'Large cerebellar or brainstem stroke', 'Shunt infection or acute hydrocephalus', 'Suprasellar surgery with diabetes insipidus'])),
      json_build_object('id', '9', 'type', 'heading', 'content', json_build_object('text', 'Consultation NCC Patients')),
      json_build_object('id', '10', 'type', 'callout', 'content', json_build_object('title', 'When NCC Provides Consultation', 'text', 'NCC makes recommendations to primary team; procedures/orders only with expressed permission.')),
      json_build_object('id', '11', 'type', 'checklist', 'content', json_build_object('items', ARRAY['Moderate/severe traumatic brain injury (TICU primary)', 'Cardiac arrest with anoxic brain injury', 'Toxidromes with seizures or encephalopathy', 'ICU patients with altered mental status', 'ECMO patients with stroke/ICH', 'Severe heatstroke']))
    )
  )::text,
  1
FROM public.curriculum_modules WHERE title = 'Neuro ICU Essentials & Safety';

-- Lesson 1.2: Basic Neurological Examination
INSERT INTO public.module_lessons (module_id, title, content, lesson_order)
SELECT 
  id,
  'Performing the Basic Neurological Exam',
  json_build_object(
    'title', 'Performing the Basic Neurological Exam',
    'blocks', json_build_array(
      json_build_object('id', '1', 'type', 'heading', 'content', json_build_object('text', 'The 5-Minute Neuro Exam')),
      json_build_object('id', '2', 'type', 'paragraph', 'content', json_build_object('text', 'The neurological exam is the foundation of neuro ICU nursing. A complete basic exam can be performed in 5 minutes and is essential for identifying changes that require escalation.')),
      json_build_object('id', '3', 'type', 'heading', 'content', json_build_object('text', 'Component 1: Level of Consciousness')),
      json_build_object('id', '4', 'type', 'table', 'content', json_build_object('headers', ARRAY['Response Level', 'Definition', 'Clinical Example'], 'rows', ARRAY[ARRAY['Alert', 'Awake, responds immediately to voice', 'Eyes open spontaneously, oriented to person/place/time'], ARRAY['Verbal', 'Requires verbal stimulation to arouse', 'Opens eyes to loud voice, drowsy'], ARRAY['Pain', 'Requires painful stimulation', 'Opens eyes to noxious stimulus only'], ARRAY['Unresponsive', 'No response to any stimulation', 'No response even to deep pain']])),
      json_build_object('id', '5', 'type', 'heading', 'content', json_build_object('text', 'Component 2: Pupils')),
      json_build_object('id', '6', 'type', 'callout', 'content', json_build_object('title', 'Normal Pupil Exam', 'text', 'Size: 2-4mm | Reactivity: Brisk response to light | Shape: Round and equal bilateral')),
      json_build_object('id', '7', 'type', 'warning', 'content', json_build_object('title', '⚠️ Red Flag: Blown Pupil', 'text', 'Fixed and dilated pupil (>6mm, non-reactive) = emergency sign of increased ICP and possible herniation. Requires immediate physician notification.')),
      json_build_object('id', '8', 'type', 'heading', 'content', json_build_object('text', 'Component 3: Motor Strength')),
      json_build_object('id', '9', 'type', 'table', 'content', json_build_object('headers', ARRAY['Grade', 'Strength Definition', 'Clinical Test'], 'rows', ARRAY[ARRAY['5/5', 'Normal strength', 'Moves against maximal resistance'], ARRAY['4/5', 'Moves against resistance but weakened', 'Moves limb against your hand resistance'], ARRAY['3/5', 'Moves against gravity only', 'Can lift limb off bed, not against resistance'], ARRAY['2/5 or lower', 'Minimal to no movement', 'Trace movement or no movement visible']])),
      json_build_object('id', '10', 'type', 'heading', 'content', json_build_object('text', 'Component 4: Sensory')),
      json_build_object('id', '11', 'type', 'paragraph', 'content', json_build_object('text', 'Test pain (sharp vs. dull) and light touch discrimination. Pay special attention to acute changes in sensation, which may indicate stroke.')),
      json_build_object('id', '12', 'type', 'heading', 'content', json_build_object('text', 'Component 5: Cranial Nerves (CN II-XII)')),
      json_build_object('id', '13', 'type', 'checklist', 'content', json_build_object('items', ARRAY['CN II (Optic): Vision, visual fields', 'CN III, IV, VI: Eye movements (oculomotor, trochlear, abducens)', 'CN V (Trigeminal): Facial sensation', 'CN VII (Facial): Facial movement, smile symmetry', 'CN XII (Hypoglossal): Tongue protrusion and movement'])),
      json_build_object('id', '14', 'type', 'warning', 'content', json_build_object('title', 'Red Flags Requiring Immediate Escalation', 'text', '• Blown pupil (fixed and dilated) • New weakness (facial droop, arm drift, leg weakness) • Acute LOC change • Seizure activity • New vision loss')),
      json_build_object('id', '15', 'type', 'heading', 'content', json_build_object('text', 'Practice & Competency')),
      json_build_object('id', '16', 'type', 'callout', 'content', json_build_object('title', 'Next Steps', 'text', 'Practice this exam on a manikin with your preceptor. Perform on at least 5 real patients under supervision before independent assessment.'))
    )
  )::text,
  2
FROM public.curriculum_modules WHERE title = 'Neuro ICU Essentials & Safety';

-- ============================================================================
-- MODULE 2: Common Diagnoses - Stroke & TBI
-- ============================================================================

-- Lesson 2.1: Acute Ischemic Stroke Management
INSERT INTO public.module_lessons (module_id, title, content, lesson_order)
SELECT 
  id,
  'Acute Ischemic Stroke: Recognition & Management',
  json_build_object(
    'title', 'Acute Ischemic Stroke: Recognition & Management',
    'blocks', json_build_array(
      json_build_object('id', '1', 'type', 'heading', 'content', json_build_object('text', 'Acute Ischemic Stroke')),
      json_build_object('id', '2', 'type', 'paragraph', 'content', json_build_object('text', 'Time is brain. Ischemic stroke results from blockage of cerebral blood flow. Recognition within the tPA window (4.5 hours) or thrombectomy window (24 hours) is critical for outcome.')),
      json_build_object('id', '3', 'type', 'heading', 'content', json_build_object('text', 'Clinical Recognition: NIHSS')),
      json_build_object('id', '4', 'type', 'callout', 'content', json_build_object('title', 'National Institutes of Health Stroke Scale (NIHSS)', 'text', 'Score ≥5 suggests significant stroke. Scores help determine severity and treatment eligibility.')),
      json_build_object('id', '5', 'type', 'heading', 'content', json_build_object('text', 'Red Flag Symptoms')),
      json_build_object('id', '6', 'type', 'warning', 'content', json_build_object('title', 'Acute Stroke Signs (Remember FAST)', 'text', '**F**ace drooping (asymmetric smile) | **A**rm weakness (drift, can''t lift) | **S**peech difficulty (slurred, incoherent) | **T**ime to call 911 or notify provider immediately')),
      json_build_object('id', '7', 'type', 'heading', 'content', json_build_object('text', 'Management Timeline')),
      json_build_object('id', '8', 'type', 'collapsible', 'content', json_build_object('title', 'Door to CT: Goal ≤25 minutes', 'text', 'Imaging must rule out hemorrhage before treatment. CTA may be obtained to evaluate for large vessel occlusion (LVO) candidate for thrombectomy.')),
      json_build_object('id', '9', 'type', 'collapsible', 'content', json_build_object('title', 'tPA Eligibility (IV Thrombolysis)', 'text', 'Last known well ≤4.5 hours ago, NIHSS ≥1, age ≥18, weakness in extremity. Requires non-contrast CT to rule out ICH. Blood pressure management critical: maintain SBP <140 mmHg.')),
      json_build_object('id', '10', 'type', 'collapsible', 'content', json_build_object('title', 'Mechanical Thrombectomy Window', 'text', 'Last known well ≤24 hours ago for LVO candidates. CTA/CTP shows evidence of salvageable brain. Coordination with interventional team is essential.')),
      json_build_object('id', '11', 'type', 'heading', 'content', json_build_object('text', 'In the ICU: Monitoring & Prevention')),
      json_build_object('id', '12', 'type', 'checklist', 'content', json_build_object('items', ARRAY['Continuous cardiac telemetry (arrhythmia risk)', 'Frequent neuro checks (watch for deterioration/hemorrhagic transformation)', 'Blood pressure management per protocol', 'Maintain strict NPO until swallow evaluation', 'DVT prophylaxis (sequential compression devices, anticoagulation per protocol)', 'Fever management (normalize temperature)', 'Blood glucose control'])),
      json_build_object('id', '13', 'type', 'warning', 'content', json_build_object('title', 'Complications to Watch For', 'text', 'Hemorrhagic transformation, malignant cerebral edema (large stroke), seizures, aspiration, hospital-acquired pneumonia.')),
      json_build_object('id', '14', 'type', 'heading', 'content', json_build_object('text', 'Antiplatelet Therapy')),
      json_build_object('id', '15', 'type', 'callout', 'content', json_build_object('title', 'Dual Antiplatelet Therapy Window', 'text', 'Aspirin + clopidogrel may be used for certain strokes within 24 hours of symptom onset. Consult with neurology for specific indications.'))
    )
  )::text,
  1
FROM public.curriculum_modules WHERE title = 'Common Diagnoses: Stroke & TBI';

-- Lesson 2.2: Traumatic Brain Injury Classification & Management
INSERT INTO public.module_lessons (module_id, title, content, lesson_order)
SELECT 
  id,
  'Traumatic Brain Injury: Classification to Management',
  json_build_object(
    'title', 'Traumatic Brain Injury: Classification to Management',
    'blocks', json_build_array(
      json_build_object('id', '1', 'type', 'heading', 'content', json_build_object('text', 'TBI Classification')),
      json_build_object('id', '2', 'type', 'table', 'content', json_build_object('headers', ARRAY['Severity', 'GCS Score', 'Key Features'], 'rows', ARRAY[ARRAY['Mild', '13-15', 'No loss of consciousness or brief LOC <30 min'], ARRAY['Moderate', '9-12', 'Altered consciousness, often CT abnormalities'], ARRAY['Severe', '3-8', 'Altered consciousness, significant brain injury likely']])),
      json_build_object('id', '3', 'type', 'heading', 'content', json_build_object('text', 'Types of Traumatic Brain Injuries')),
      json_build_object('id', '4', 'type', 'paragraph', 'content', json_build_object('text', 'Understanding injury mechanism helps predict complications and guide management.')),
      json_build_object('id', '5', 'type', 'collapsible', 'content', json_build_object('title', 'Diffuse Axonal Injury (DAI)', 'text', 'From acceleration-deceleration forces. Disrupts axonal connections. Often severe, poor prognosis. Characterized by multiple microhemorrhages on MRI.')),
      json_build_object('id', '6', 'type', 'collapsible', 'content', json_build_object('title', 'Focal Injuries', 'text', '**Epidural hematoma**: Blood between skull and dura. Classic "talk-and-die" syndrome. Surgical emergency. **Subdural hematoma**: Blood under dura, between dura and brain. Can be acute, subacute, or chronic. Often requires surgery.')),
      json_build_object('id', '7', 'type', 'collapsible', 'content', json_build_object('title', 'Cerebral Contusions', 'text', 'Bruising of brain tissue. Typically at frontal and temporal poles (impact sites) and contrecoup sites. Risk of edema, hemorrhagic transformation, seizures.')),
      json_build_object('id', '8', 'type', 'heading', 'content', json_build_object('text', 'Intracranial Pressure (ICP) Management in TBI')),
      json_build_object('id', '9', 'type', 'warning', 'content', json_build_object('title', 'Critical Target: CPP ≥60 mmHg, ICP <22 mmHg', 'text', 'Secondary brain injury from elevated ICP and low cerebral perfusion is the main cause of poor outcomes in TBI. Aggressive management is essential.')),
      json_build_object('id', '10', 'type', 'heading', 'content', json_build_object('text', 'ICP Management Tiers')),
      json_build_object('id', '11', 'type', 'collapsible', 'content', json_build_object('title', 'Tier 0: Prevention & Basics', 'text', 'Head of bed 30° | Normothermia (36-37°C) | Seizure prophylaxis if indicated | Avoid hypoxia/hypercapnia | Head midline | Loosen tight collars')),
      json_build_object('id', '12', 'type', 'collapsible', 'content', json_build_object('title', 'Tier 1: Hyperosmolar Therapy', 'text', 'Hypertonic saline 3% or 23.4% | Mannitol 1 g/kg | Lasts 4-6 hours | Can repeat as needed based on ICP/clinical findings')),
      json_build_object('id', '13', 'type', 'collapsible', 'content', json_build_object('title', 'Tier 2: Deep Sedation & Analgesia', 'text', 'Propofol, fentanyl, midazolam | Goal deeper RASS -4 to -5 | Allows compliance with ICP management | May include neuromuscular blockade')),
      json_build_object('id', '14', 'type', 'warning', 'content', json_build_object('title', 'Red Flag: Herniation Signs', 'text', 'Blown pupil | Bilateral weakness | Posturing | Bradycardia with hypertension. Requires immediate escalation and possible surgical consultation.')),
      json_build_object('id', '15', 'type', 'heading', 'content', json_build_object('text', 'Complications to Monitor')),
      json_build_object('id', '16', 'type', 'checklist', 'content', json_build_object('items', ARRAY['Post-traumatic seizures', 'Hyponatremia (SIADH)', 'Hyperglycemia', 'Fever/infection', 'DVT/PE', 'Malnutrition', 'Neuropsychological changes']))
    )
  )::text,
  2
FROM public.curriculum_modules WHERE title = 'Common Diagnoses: Stroke & TBI';

-- ============================================================================
-- MODULE 3: Aneurysmal SAH, Seizures, Meningitis
-- ============================================================================

-- Lesson 3.1: Aneurysmal Subarachnoid Hemorrhage (aSAH)
INSERT INTO public.module_lessons (module_id, title, content, lesson_order)
SELECT 
  id,
  'Aneurysmal SAH: The First 24 Hours',
  json_build_object(
    'title', 'Aneurysmal SAH: The First 24 Hours',
    'blocks', json_build_array(
      json_build_object('id', '1', 'type', 'heading', 'content', json_build_object('text', 'Aneurysmal Subarachnoid Hemorrhage')),
      json_build_object('id', '2', 'type', 'paragraph', 'content', json_build_object('text', 'aSAH is a catastrophic event with high mortality and morbidity. The first 24 hours set the trajectory. Early recognition and rapid intervention are paramount.')),
      json_build_object('id', '3', 'type', 'warning', 'content', json_build_object('title', '"Worst Headache of Life"', 'text', 'Classic presentation is sudden, severe headache at onset. Often accompanied by neck stiffness, photophobia, seizures, or acute neurological decline. **Any patient with this presentation warrants immediate CT.**')),
      json_build_object('id', '4', 'type', 'heading', 'content', json_build_object('text', 'Initial Assessment & Grading')),
      json_build_object('id', '5', 'type', 'table', 'content', json_build_object('headers', ARRAY['Scale', 'Purpose', 'Score Range'], 'rows', ARRAY[ARRAY['Hunt & Hess', 'Mortality risk, clinical severity', '1 (best) to 5 (worst)'], ARRAY['WFNS', 'Modified Hunt & Hess + eye opening', '1 (best) to 5 (worst)'], ARRAY['Fisher Grade', 'Vasospasm risk prediction', '1 (low) to 4 (highest risk)']])),
      json_build_object('id', '6', 'type', 'heading', 'content', json_build_object('text', 'Emergency Department Priorities')),
      json_build_object('id', '7', 'type', 'collapsible', 'content', json_build_object('title', '1. Imaging (CT/CTA)', 'text', 'Non-contrast CT head shows blood in subarachnoid space. CTA identifies aneurysm location and size. CTA benefits outweigh contrast nephropathy risk, even in renal failure.')),
      json_build_object('id', '8', 'type', 'collapsible', 'content', json_build_object('title', '2. Blood Pressure Control', 'text', 'Maintain SBP <140 mmHg to prevent rebleeding before aneurysm secured. Nicardipine preferred (titratable). Avoid bolus antihypertensives.')),
      json_build_object('id', '9', 'type', 'collapsible', 'content', json_build_object('title', '3. Aneurysm Securing (Coiling or Clipping)', 'text', 'Should occur within 24 hours of SAH. Endovascular coiling or surgical clipping. Once secured, rebleeding risk drops dramatically.')),
      json_build_object('id', '10', 'type', 'heading', 'content', json_build_object('text', 'Vasospasm: The Major Threat')),
      json_build_object('id', '11', 'type', 'callout', 'content', json_build_object('title', 'Vasospasm Timeline', 'text', 'Peaks **day 5-7** post-SAH. Can occur even after aneurysm secured. Results in delayed cerebral ischemia (DCI) and poor outcome.')),
      json_build_object('id', '12', 'type', 'heading', 'content', json_build_object('text', 'Vasospasm Prevention & Management')),
      json_build_object('id', '13', 'type', 'checklist', 'content', json_build_object('items', ARRAY['Nimodipine 60 mg PO q4h for 21 days (standard)', 'Avoid hypervolemia (paradoxically increases DCI risk)', 'Maintain normothermia', 'Frequent neuro checks for deterioration', 'Maintain CPP ≥60 mmHg (hypertensive therapy if needed)', 'Consider milrinone or interventional neuroradiology for refractory vasospasm'])),
      json_build_object('id', '14', 'type', 'warning', 'content', json_build_object('title', 'Signs of Vasospasm/DCI', 'text', 'Acute neurological deterioration (new weakness, confusion, decreased LOC), decreased NIHSS score, new stroke on imaging. Treat emergently to prevent infarction.')),
      json_build_object('id', '15', 'type', 'heading', 'content', json_build_object('text', 'External Ventricular Drain (EVD) Management')),
      json_build_object('id', '16', 'type', 'paragraph', 'content', json_build_object('text', 'Often placed emergently for hydrocephalus and IVH. Requires meticulous aseptic care to prevent ventriculitis.')),
      json_build_object('id', '17', 'type', 'checklist', 'content', json_build_object('items', ARRAY['Daily sterile dressing changes', 'Proper leveling and zeroing of transducer (at tragus level)', 'Monitor CSF output, color, clarity', 'Avoid routine CSF sampling (increases infection risk)', 'Monitor for signs of infection (fever, elevated WBC, turbid CSF)']))
    )
  )::text,
  1
FROM public.curriculum_modules WHERE title = 'Common Diagnoses: SAH, Seizures, Meningitis';

-- Lesson 3.2: Status Epilepticus - Emergency Management
INSERT INTO public.module_lessons (module_id, title, content, lesson_order)
SELECT 
  id,
  'Status Epilepticus: Emergency Protocol',
  json_build_object(
    'title', 'Status Epilepticus: Emergency Protocol',
    'blocks', json_build_array(
      json_build_object('id', '1', 'type', 'heading', 'content', json_build_object('text', 'Status Epilepticus Definition')),
      json_build_object('id', '2', 'type', 'callout', 'content', json_build_object('title', 'Status Epilepticus (SE)', 'text', 'Continuous seizure >5 minutes OR ≥2 seizures without return to baseline. A **medical emergency** with mortality 10-15%.')),
      json_build_object('id', '3', 'type', 'warning', 'content', json_build_object('title', 'Why SE is Dangerous', 'text', 'Each minute of continued seizure increases neuronal death (excitotoxicity). Airway compromise, aspiration, hyperthermia, rhabdomyolysis, cardiac arrhythmias. Every minute counts.')),
      json_build_object('id', '4', 'type', 'heading', 'content', json_build_object('text', 'Time Zero: ABC + Glucose')),
      json_build_object('id', '5', 'type', 'checklist', 'content', json_build_object('items', ARRAY['Airway: Suction, nasal trumpet, jaw thrust', 'Breathing: Supplemental O2, HOB elevated', 'Circulation: IV access, cardiac monitoring', 'Glucose: Fingerstick, if <60 mg/dL → Thiamine 100 mg IV + D50 50 mL IV', 'Neurologic exam: Pupils, posturing (rule out herniation)'])),
      json_build_object('id', '6', 'type', 'heading', 'content', json_build_object('text', '5-Minute Mark: First-Line Antiseizure Medication')),
      json_build_object('id', '7', 'type', 'table', 'content', json_build_object('headers', ARRAY['Agent', 'Dose', 'Route', 'Onset'], 'rows', ARRAY[ARRAY['Lorazepam (preferred)', '4 mg (0.1 mg/kg if <40 kg)', 'IV', '1-3 min'], ARRAY['Midazolam', '10 mg (5 mg if <40 kg)', 'IM', '3-5 min'], ARRAY['Diazepam', '10 mg (0.2 mg/kg if <50 kg)', 'IV', '1-2 min'], ARRAY['Midazolam (intranasal)', '5-10 mg', 'Intranasal', '10-15 min']])),
      json_build_object('id', '8', 'type', 'heading', 'content', json_build_object('text', '10-Minute Mark: Second-Line Medication')),
      json_build_object('id', '9', 'type', 'paragraph', 'content', json_build_object('text', 'If seizures persist after first-line agent, escalate immediately to second-line. Options include levetiracetam, lacosamide, valproic acid, or fosphenytoin.')),
      json_build_object('id', '10', 'type', 'collapsible', 'content', json_build_object('title', 'Levetiracetam (Keppra)', 'text', 'Load: 60 mg/kg IV | Maintenance: 1000-2000 mg BID. Do NOT adjust for renal function. Fast acting, minimal drug interactions.')),
      json_build_object('id', '11', 'type', 'collapsible', 'content', json_build_object('title', 'Lacosamide (Vimpat)', 'text', 'Load: 200-400 mg IV | Maintenance: 100-200 mg BID. Check ECG for PR prolongation (contraindication). Monitor telemetry.')),
      json_build_object('id', '12', 'type', 'heading', 'content', json_build_object('text', '30-Minute Mark: Anesthetic Agents for Refractory SE')),
      json_build_object('id', '13', 'type', 'warning', 'content', json_build_object('title', 'Refractory SE = Seizures Persist After 2nd-Line', 'text', 'Requires intubation and anesthetic infusions. Propofol, midazolam, or ketamine titrated to seizure cessation. **Continuous EEG monitoring mandatory.**')),
      json_build_object('id', '14', 'type', 'collapsible', 'content', json_build_object('title', 'Propofol Infusion', 'text', 'Load: 20 mg aliquots q2min (max 2 mg/kg) | Infusion: 20-65 mcg/kg/min | Advantage: Fast onset. Risk: Hypotension, propofol infusion syndrome at high doses.')),
      json_build_object('id', '15', 'type', 'heading', 'content', json_build_object('text', 'Concurrent Management')),
      json_build_object('id', '16', 'type', 'checklist', 'content', json_build_object('items', ARRAY['STAT CT head (rule out hemorrhage, mass)', 'Lumbar puncture (rule out meningitis/encephalitis)', 'Blood cultures, labs (CBC, CMP, ASM levels)', 'Continuous EEG monitoring', 'Intubation (if not already done)', 'Neurology consult']))
    )
  )::text,
  2
FROM public.curriculum_modules WHERE title = 'Common Diagnoses: SAH, Seizures, Meningitis';

-- ============================================================================
-- MODULE 4: Neuro Monitoring & Equipment
-- ============================================================================

-- Lesson 4.1: ICP Monitoring and Management
INSERT INTO public.module_lessons (module_id, title, content, lesson_order)
SELECT 
  id,
  'Intracranial Pressure (ICP) Monitoring & Management',
  json_build_object(
    'title', 'Intracranial Pressure (ICP) Monitoring & Management',
    'blocks', json_build_array(
      json_build_object('id', '1', 'type', 'heading', 'content', json_build_object('text', 'What is ICP?')),
      json_build_object('id', '2', 'type', 'paragraph', 'content', json_build_object('text', 'Intracranial pressure (ICP) is the pressure exerted by cerebrospinal fluid, blood, and brain tissue within the cranial vault. The skull is rigid, so any increase in one component (e.g., blood, edema, mass) causes pressure to rise.')),
      json_build_object('id', '3', 'type', 'callout', 'content', json_build_object('title', 'Normal ICP', 'text', 'Adults: 5-15 mmHg | Elevated ICP: >22 mmHg | Cerebral Perfusion Pressure (CPP): MAP - ICP (target ≥60 mmHg)')),
      json_build_object('id', '4', 'type', 'heading', 'content', json_build_object('text', 'Monitoring Devices')),
      json_build_object('id', '5', 'type', 'collapsible', 'content', json_build_object('title', 'Intraventricular Catheter (EVD)', 'text', 'Gold standard. Placed in lateral ventricle. Allows continuous ICP monitoring AND therapeutic CSF drainage. Most invasive but most accurate. Infection risk (ventriculitis) with prolonged placement.')),
      json_build_object('id', '6', 'type', 'collapsible', 'content', json_build_object('title', 'Parenchymal Monitor (Bolt)', 'text', 'Fiber-optic sensor placed in brain tissue. Accurate, no CSF drainage. Lower infection risk than EVD. Cant be re-zeroed after placement, may drift. Examples: Raumedic, Codman.')),
      json_build_object('id', '7', 'type', 'collapsible', 'content', json_build_object('title', 'Noninvasive Methods', 'text', 'Optic nerve sheath diameter (ultrasound), transcranial Doppler. Less accurate than invasive monitors. Useful as adjuncts, not primary.')),
      json_build_object('id', '8', 'type', 'heading', 'content', json_build_object('text', 'EVD Nursing Care')),
      json_build_object('id', '9', 'type', 'checklist', 'content', json_build_object('items', ARRAY['Sterile technique: Dressing changes with aseptic protocol', 'Leveling: Transducer at tragus level (consistent baseline)', 'Zeroing: Daily or per protocol, before documenting values', 'Waveform: Monitor for A, B, C waves', 'CSF output: Monitor color, clarity, volume (decrease suggests blockage)', 'Clamping: Only when ordered by physician', 'Never infuse into EVD line', 'Keep drainage system below head of bed'])),
      json_build_object('id', '10', 'type', 'heading', 'content', json_build_object('text', 'ICP Waveforms')),
      json_build_object('id', '11', 'type', 'callout', 'content', json_build_object('title', 'Normal Waveform', 'text', 'Three peaks: P1 (percussion wave) > P2 (tidal wave) > P3 (dicrotic wave). If P2 ≥ P1, concerning for poor compliance.')),
      json_build_object('id', '12', 'type', 'warning', 'content', json_build_object('title', 'Plateau (A) Waves', 'text', 'Sudden ICP elevations (20-50+ mmHg) lasting 5-20 minutes. Associated with poor compliance. May precede herniation. Treat immediately.')),
      json_build_object('id', '13', 'type', 'heading', 'content', json_build_object('text', 'ICP Crisis Management')),
      json_build_object('id', '14', 'type', 'paragraph', 'content', json_build_object('text', 'Elevated ICP is a medical emergency. Treatment follows a tiered approach from least to most invasive.')),
      json_build_object('id', '15', 'type', 'collapsible', 'content', json_build_object('title', 'Tier 0: Prevention & Basics', 'text', 'HOB 30° | Keep head midline | Loosen neck collars | Avoid hypoxia/hypercapnia (PaCO2 35-45) | Maintain normothermia | Manage pain and sedation')),
      json_build_object('id', '16', 'type', 'collapsible', 'content', json_build_object('title', 'Tier 1: Hyperosmolar Therapy', 'text', 'Hypertonic saline (3% or 23.4%) OR Mannitol. Effectiveness lasts 4-6 hours. Can repeat. Monitor serum sodium <160 and osmolar gap <20.')),
      json_build_object('id', '17', 'type', 'collapsible', 'content', json_build_object('title', 'Tier 2: Deep Sedation + Analgesia', 'text', 'Target RASS -4 to -5. Propofol, fentanyl, midazolam. Consider neuromuscular blockade. Continuous EEG to monitor sedation level.')),
      json_build_object('id', '18', 'type', 'collapsible', 'content', json_build_object('title', 'Tier 3: Extreme Measures', 'text', 'Mild hypothermia (33-35°C), neuromuscular blockade, pentobarbital infusion (burst suppression), decompressive surgery (hemicraniectomy).')),
      json_build_object('id', '19', 'type', 'warning', 'content', json_build_object('title', 'Signs of Herniation', 'text', 'Blown pupil (fixed, dilated) | Decerebrate posturing (arms extended, legs extended) | Bradycardia + hypertension + irregular breathing. **Emergency—notify physician immediately.**'))
    )
  )::text,
  1
FROM public.curriculum_modules WHERE title = 'Neuro Monitoring & Equipment';

-- Lesson 4.2: EVD and Infection Prevention
INSERT INTO public.module_lessons (module_id, title, content, lesson_order)
SELECT 
  id,
  'External Ventricular Drain (EVD): Setup & Management',
  json_build_object(
    'title', 'External Ventricular Drain (EVD): Setup & Management',
    'blocks', json_build_array(
      json_build_object('id', '1', 'type', 'heading', 'content', json_build_object('text', 'EVD Basics')),
      json_build_object('id', '2', 'type', 'paragraph', 'content', json_build_object('text', 'EVD is a catheter placed in the lateral ventricle that provides continuous ICP monitoring AND allows therapeutic CSF drainage. Typically placed for hydrocephalus, IVH, or ICP control.')),
      json_build_object('id', '3', 'type', 'heading', 'content', json_build_object('text', 'Pre-Placement Checklist')),
      json_build_object('id', '4', 'type', 'checklist', 'content', json_build_object('items', ARRAY['Recent CT/MRI confirming ventricular anatomy', 'Labs: PT/INR, PTT, CBC, platelet count', 'Correct all coagulopathy if possible', 'Antibiotics started (if meningitis suspected)', 'Family briefing on procedure', 'Informed consent obtained'])),
      json_build_object('id', '5', 'type', 'heading', 'content', json_build_object('text', 'EVD Drain Height & Settings')),
      json_build_object('id', '6', 'type', 'table', 'content', json_build_object('headers', ARRAY['Clinical Scenario', 'Drain Height', 'Rationale'], 'rows', ARRAY[ARRAY['Unsecured aneurysm', '20 cm H2O (15 mmHg) above tragus', 'Prevent rebleeding from sudden ICP drops'], ARRAY['Post-aneurysm clip/coil', 'Lower per neurosurgery', 'Once secured, can drain more aggressively'], ARRAY['IVH without aneurysm', 'Per protocol (typically 10-15 cm)', 'Balance ICP control with ventricular drainage'], ARRAY['Clogged EVD', 'Zero and reassess', 'Gentle flushing may help (sterile saline only)']])),
      json_build_object('id', '7', 'type', 'heading', 'content', json_build_object('text', 'Daily EVD Care Protocol')),
      json_build_object('id', '8', 'type', 'collapsible', 'content', json_build_object('title', 'Aseptic Dressing Changes', 'text', 'Every shift or per protocol (usually daily). Wash hands, don mask & sterile gloves. Swab insertion site 3x with betadine (1 swab per minute, spiral pattern). Apply sterile dressing. Document appearance (redness, drainage, swelling).')),
      json_build_object('id', '9', 'type', 'collapsible', 'content', json_build_object('title', 'Zeroing & Calibration', 'text', 'Daily before documenting ICP. Place transducer at tragus (ear canal level) with patient horizontal. Open zeroing valve to atmosphere. Wait for indicator to show zero. Close valve. Document baseline.')),
      json_build_object('id', '10', 'type', 'collapsible', 'content', json_build_object('title', 'CSF Assessment', 'text', 'Color: Clear/straw-colored (normal) vs. Xanthochromic (blood) vs. Turbid (infection). Clarity: Clear, hazy, or opaque. Volume/hour: Track trending. Sudden decrease suggests blockage.')),
      json_build_object('id', '11', 'type', 'heading', 'content', json_build_object('text', 'Infection Prevention (Critical!)')),
      json_build_object('id', '12', 'type', 'warning', 'content', json_build_object('title', 'Ventriculitis Risk Increases After 5-10 Days', 'text', 'EVD-associated infection rate ~1-2%/day. Strict asepsis is non-negotiable. No routine CSF sampling. Daily assessment for fever, elevated WBC.')),
      json_build_object('id', '13', 'type', 'checklist', 'content', json_build_object('items', ARRAY['No routine CSF sampling (increases infection risk)', 'Only sample if high suspicion for infection', 'Prophylactic antibiotics not recommended (higher resistance)', 'EVD care with sterile technique every time', 'Monitor for signs: Fever, turbid CSF, elevated WBC', 'Document CSF appearance hourly', 'Change dressing at first sign of contamination'])),
      json_build_object('id', '14', 'type', 'heading', 'content', json_build_object('text', 'EVD Weaning & Removal')),
      json_build_object('id', '15', 'type', 'paragraph', 'content', json_build_object('text', 'Once the clinical condition stabilizes and ventricular size improves, EVD is gradually weaned.')),
      json_build_object('id', '16', 'type', 'collapsible', 'content', json_build_object('title', 'Gradual Weaning Strategy', 'text', 'Raise drain height slowly (per neurosurgery order) OR clamp for increasing periods. Monitor for increased ICP. If ICP rises, lower drain again. Some studies support rapid clamping over gradual weaning.')),
      json_build_object('id', '17', 'type', 'collapsible', 'content', json_build_object('title', 'Removal Criteria', 'text', 'EVD can be clamped trial if: ICP stable, CSF clear, adequate ventricular size, patient clinically stable. Monitor closely for 24-48h after clamping before removal. Final removal under sterile conditions.')),
      json_build_object('id', '18', 'type', 'warning', 'content', json_build_object('title', 'Complications to Watch', 'text', 'Hemorrhage at insertion site, obstruction/malfunction (clogging), ventriculitis/meningitis, CSF leak, subdural hematoma from overdrainage.'))
    )
  )::text,
  2
FROM public.curriculum_modules WHERE title = 'Neuro Monitoring & Equipment';

-- ============================================================================
-- MODULE 5: Medications & Pharmacology
-- ============================================================================

-- Lesson 5.1: Sedation in Neuro ICU Context
INSERT INTO public.module_lessons (module_id, title, content, lesson_order)
SELECT 
  id,
  'Sedation & Analgesia: Neuro ICU Approach',
  json_build_object(
    'title', 'Sedation & Analgesia: Neuro ICU Approach',
    'blocks', json_build_array(
      json_build_object('id', '1', 'type', 'heading', 'content', json_build_object('text', 'Goals of Sedation in Neuro ICU')),
      json_build_object('id', '2', 'type', 'paragraph', 'content', json_build_object('text', 'In the neuro ICU, sedation must balance **patient comfort** with **neurological assessment**. The goal is adequate sedation WITHOUT masking the neuro exam.')),
      json_build_object('id', '3', 'type', 'callout', 'content', json_build_object('title', 'Key Principle', 'text', 'Keep patient at RASS 0 to -2 when possible to allow frequent neuro checks. Only deepen sedation for specific indications (elevated ICP, ventilator dyssynchrony, status epilepticus).')),
      json_build_object('id', '4', 'type', 'heading', 'content', json_build_object('text', 'RASS Score (Richmond Agitation-Sedation Scale)')),
      json_build_object('id', '5', 'type', 'table', 'content', json_build_object('headers', ARRAY['RASS', 'Description', 'Clinical Appearance'], 'rows', ARRAY[ARRAY['+2', 'Agitated', 'Pulls at tubes, combative'], ARRAY['+1', 'Restless', 'Moving around bed, anxious'], ARRAY['0', 'Alert & Calm', 'Spontaneous eye opening'], ARRAY['-1', 'Drowsy', 'Opens eyes to voice'], ARRAY['-2', 'Light Sedation', 'Opens eyes to physical stimulation'], ARRAY['-3', 'Moderate Sedation', 'Minimal response to stimulation'], ARRAY['-4', 'Deep Sedation', 'Minimal/no response'], ARRAY['-5', 'Unarousable', 'No response to any stimulus']])),
      json_build_object('id', '6', 'type', 'heading', 'content', json_build_object('text', 'Common Neuro ICU Sedatives')),
      json_build_object('id', '7', 'type', 'collapsible', 'content', json_build_object('title', 'Propofol', 'text', 'Onset: 1-3 min | Offset: 10-20 min | RASS titration: 20-65 mcg/kg/min | Advantages: Rapid titratable, amnestic. Risks: Hypotension, propofol infusion syndrome at high doses/prolonged infusion.')),
      json_build_object('id', '8', 'type', 'collapsible', 'content', json_build_object('title', 'Midazolam (Versed)', 'text', 'Onset: 2-3 min | Offset: 30-60 min | Maintenance: 0.5-2 mg/kg/hr | Advantages: Long half-life, familiar. Risks: Accumulation, delayed offset, tachyphylaxis.')),
      json_build_object('id', '9', 'type', 'collapsible', 'content', json_build_object('title', 'Fentanyl', 'text', 'Opioid for analgesia + some sedation | 25-300 mcg/hr infusion | Combined with propofol/midazolam | Advantages: Excellent analgesia, minimal neuro effects. Risks: Rigidity (especially chest wall), constipation, withdrawal with abrupt stop.')),
      json_build_object('id', '10', 'type', 'collapsible', 'content', json_build_object('title', 'Dexmedetomidine (Precedex)', 'text', 'Alpha-2 agonist | 0.2-1.5 mcg/kg/hr | Advantages: Preserves respiratory drive, allows communication. Risks: Bradycardia, hypertension, limited experience in severe brain injury.')),
      json_build_object('id', '11', 'type', 'heading', 'content', json_build_object('text', 'Daily Sedation Interruption (SAT)')),
      json_build_object('id', '12', 'type', 'callout', 'content', json_build_object('title', 'Best Practice: Daily SAT', 'text', 'Stop sedation infusions daily to assess neurologic status and ability to breathe spontaneously. Improves outcomes, shortens ventilator days, allows neuro assessment.')),
      json_build_object('id', '13', 'type', 'heading', 'content', json_build_object('text', 'Special Considerations in Neuro ICU')),
      json_build_object('id', '14', 'type', 'warning', 'content', json_build_object('title', 'Avoid These in Brain-Injured Patients', 'text', 'Volatile anesthetics (halothane) - worsen intracranial pressure. Opioids at excessive doses (rigidity, ICP elevation). Phenytoin prophylaxis (worsens outcomes in TBI/stroke).')),
      json_build_object('id', '15', 'type', 'heading', 'content', json_build_object('text', 'Tolerance & Withdrawal')),
      json_build_object('id', '16', 'type', 'paragraph', 'content', json_build_object('text', 'After 48-72 hours of continuous sedation, patients may develop tolerance (needing higher doses). Abrupt discontinuation risks withdrawal (agitation, autonomic dysregulation).')),
      json_build_object('id', '17', 'type', 'collapsible', 'content', json_build_object('title', 'Weaning from Sedation', 'text', 'Gradual reduction in infusion rates, not abrupt stop. Daily SAT attempts. Monitor for signs of withdrawal (agitation, tachycardia, hypertension). Adjust antiseizure meds as needed.')
      )
    )
  )::text,
  1
FROM public.curriculum_modules WHERE title = 'Medications & Pharmacology';

-- ============================================================================
-- INSERT COMPETENCIES
-- ============================================================================

INSERT INTO public.competencies (title, description, proficiency_level) VALUES
('Perform comprehensive neuro exam', 'Assess LOC, pupils, motor, sensory, cranial nerves rapidly and accurately', 'Foundational'),
('Recognize acute stroke signs', 'Identify NIHSS criteria and escalate appropriately', 'Foundational'),
('Manage elevated ICP', 'Implement tiered ICP management strategies', 'Advanced'),
('EVD insertion technique', 'Sterile placement and initial setup', 'Advanced'),
('EVD daily care protocol', 'Dressing changes, zeroing, CSF assessment', 'Intermediate'),
('Interpret ICP waveforms', 'Recognize normal vs. pathologic patterns', 'Intermediate'),
('Status epilepticus emergency response', 'First-line medication administration and escalation', 'Advanced'),
('Sedation titration', 'Achieve target RASS while preserving neuro exam', 'Intermediate'),
('Recognize vasospasm signs', 'Early detection of delayed cerebral ischemia', 'Intermediate'),
('Prevent ventriculitis', 'Aseptic EVD care, infection prevention', 'Foundational');

-- ============================================================================
-- MAP COMPETENCIES TO MODULES
-- ============================================================================

INSERT INTO public.module_competency_map (module_id, competency_id)
SELECT m.id, c.id FROM public.curriculum_modules m, public.competencies c
WHERE (m.title = 'Neuro ICU Essentials & Safety' AND c.title = 'Perform comprehensive neuro exam')
   OR (m.title = 'Neuro ICU Essentials & Safety' AND c.title = 'Recognize acute stroke signs')
   OR (m.title = 'Common Diagnoses: Stroke & TBI' AND c.title = 'Recognize acute stroke signs')
   OR (m.title = 'Neuro Monitoring & Equipment' AND c.title = 'Manage elevated ICP')
   OR (m.title = 'Neuro Monitoring & Equipment' AND c.title = 'EVD insertion technique')
   OR (m.title = 'Neuro Monitoring & Equipment' AND c.title = 'EVD daily care protocol')
   OR (m.title = 'Neuro Monitoring & Equipment' AND c.title = 'Interpret ICP waveforms')
   OR (m.title = 'Neuro Monitoring & Equipment' AND c.title = 'Prevent ventriculitis')
   OR (m.title = 'Common Diagnoses: SAH, Seizures, Meningitis' AND c.title = 'Status epilepticus emergency response')
   OR (m.title = 'Common Diagnoses: SAH, Seizures, Meningitis' AND c.title = 'Recognize vasospasm signs')
   OR (m.title = 'Medications & Pharmacology' AND c.title = 'Sedation titration');

-- ============================================================================
-- STATUS: 6 lessons created + competencies mapped
-- Ready for testing
-- ============================================================================
