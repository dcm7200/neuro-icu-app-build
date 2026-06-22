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
// M12.L1 — Sepsis: Recognition, Source Control, and Antibiotics
// ─────────────────────────────────────────────────────────────────────────────
const m12l1Content = {
  blocks: [
    { type: "heading", content: { text: "Definitions (Sepsis-3, SCCM 2016)" } },
    { type: "table", content: { headers: ["Term", "Definition"], rows: [["Sepsis", "Life-threatening organ dysfunction caused by a dysregulated host response to infection"], ["Septic Shock", "Sepsis + persistent hypotension requiring vasopressors to maintain MAP ≥65 mmHg AND serum lactate >2 mmol/L (18 mg/dL) despite adequate volume resuscitation"], ["SOFA Score", "Sequential Organ Failure Assessment — used to define organ dysfunction in sepsis"]] } },
    { type: "callout", content: { icon: "warning", title: "High Index of Suspicion in Neuro ICU", text: "Neuro ICU patients have altered sensorium that masks typical sepsis presentation. Have HIGH suspicion when patient has elevated/low WBC, fever/hypothermia, or unexplained decline in mentation or hemodynamics." } },
    { type: "heading", content: { text: "Initial Sepsis Workup" } },
    { type: "checklist", content: { items: ["CBC with differential", "Comprehensive metabolic panel (CMP)", "Procalcitonin and lactic acid (repeat q6h if elevated)", "ESR, CRP", "Blood cultures × 2 (draw before antibiotics if <15 min delay; otherwise start antibiotics)", "Urinalysis with culture (if recently admitted or Foley present <48h)", "Chest X-ray", "Consider: respiratory culture if intubated, C. diff testing if loose stools >24h after bowel regimen", "If EVD present: send basic CSF studies (cell count, protein, glucose, lactic acid, gram stain, culture) — discuss with neurosurgery first"] } },
    { type: "heading", content: { text: "Time to Antibiotics — Critical" } },
    { type: "warning", content: { title: "Every Hour Matters", text: "Time to antibiotics is a KEY determinant of outcome in sepsis. Each hour of delay increases mortality by approximately 7%. Do not delay antibiotics to wait for cultures, imaging, or LP results." } },
    { type: "heading", content: { text: "Empiric Antibiotic Selection by Source" } },
    { type: "table", content: { headers: ["Suspected Source", "Empiric Regimen", "Notes"], rows: [["Pneumonia (CAP)", "Vancomycin + Zosyn (piperacillin-tazobactam) or Cefepime", "Zosyn ok for pneumonia; NOT for CNS infections"], ["Pneumonia (HAP/VAP)", "Vancomycin + Cefepime OR Meropenem", "Consider anti-pseudomonal coverage"], ["UTI (uncomplicated)", "Ceftriaxone 1g q24h", "Evaluate prior cultures for resistant organisms (ESBL, Klebsiella)"], ["UTI (complicated/septic)", "Ceftriaxone OR Zosyn/Meropenem depending on prior cultures", ""], ["Intraabdominal source", "Pip/Tazo OR Meropenem + Flagyl if beta-lactam allergy", ""], ["Wound/skin/soft tissue", "Vancomycin + Pip/Tazo", ""], ["Unknown source / high severity", "Vancomycin + Pip/Tazo or Cefepime", "Broad coverage until source identified"], ["Immunocompromised", "Broaden + consider antifungals", "Micafungin or caspofungin if severe; de-escalate ASAP"]] } },
    { type: "heading", content: { text: "Volume Resuscitation" } },
    { type: "paragraph", content: { text: "Historically targeted 30 mL/kg in first 3 hours, but current practice targets euvolemia and fluid responsiveness to avoid fluid overload. Assess fluid responsiveness with passive leg raise (PLR) test or IVC ultrasound. Cold IV fluid bolus can also help reduce fever." } },
    { type: "heading", content: { text: "Fever Management in Sepsis" } },
    { type: "checklist", content: { items: ["Scheduled acetaminophen 1000mg q6-8h (first line)", "Ibuprofen if no contraindications (AKI, GI bleed, coagulopathy)", "Ice cold water via NG tube (200-500cc bolus)", "Cold IV fluid bolus", "Cooling blanket/pads if medications fail (caution: shivering increases ICP)", "Target normothermia — fever worsens neurologic outcomes"] } },
    { type: "heading", content: { text: "Antibiotic Stewardship" } },
    { type: "callout", content: { icon: "info", title: "De-escalate ASAP", text: "Order MRSA nares swab whenever Vancomycin is ordered. Negative nares = 95% negative predictive value for MRSA — allows early Vancomycin discontinuation. De-escalate antibiotics as soon as culture data is available." } }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M12.L2 — Shock: Classification, Hemodynamics, and Vasopressors
// ─────────────────────────────────────────────────────────────────────────────
const m12l2Content = {
  blocks: [
    { type: "heading", content: { text: "Definition" } },
    { type: "paragraph", content: { text: "Shock = hypotension (MAP <60 mmHg or SBP <90 mmHg) with evidence of cellular/tissue hypoxia: acute encephalopathy, decreased urine output (<0.5 mL/kg/hr), elevated lactic acid, or metabolic acidosis." } },
    { type: "heading", content: { text: "Four Types of Shock" } },
    { type: "table", content: { headers: ["Type", "Mechanism", "Cardiac Index", "SVR", "Examples"], rows: [["Hypovolemic", "Reduced preload from volume loss", "↓", "↑", "Hemorrhage, dehydration, burns"], ["Cardiogenic", "Pump failure", "↓", "↑", "MI, acute valvular insufficiency, arrhythmia, cardiomyopathy"], ["Distributive", "Vasodilation — low resistance", "Normal/↑", "↓↓", "Sepsis, anaphylaxis, neurogenic shock, adrenal crisis"], ["Obstructive", "Mechanical obstruction to flow", "↓", "Normal/↑", "Massive PE, tension pneumothorax, cardiac tamponade"]] } },
    { type: "heading", content: { text: "Hemodynamic Profile Comparison" } },
    { type: "table", content: { headers: ["Parameter", "Hypovolemic", "Cardiogenic", "Distributive", "Obstructive"], rows: [["Skin", "Cool/clammy", "Cool/clammy", "Warm/flushed", "Cool"], ["JVP", "↓", "↑", "↓", "↑ (PE, tamponade)"], ["Pulse pressure", "↓", "↓", "↑ (wide)", "↓"], ["Nailbed return", "Slow", "Slow", "Flash (rapid)", "Slow"], ["CXR", "Small heart", "Big heart, pulm edema", "Usually normal", "Normal (PE) or shift (PTX)"], ["Bedside echo (TTE/POCUS)", "Hyperdynamic LV, small chambers", "↓ LVEF, hypokinesis", "Hyperdynamic LV", "RV dilation, septal bowing (PE)"]] } },
    { type: "heading", content: { text: "General Shock Management Principles" } },
    { type: "checklist", content: { items: ["Assess fluid responsiveness with passive leg raise or small fluid bolus + hemodynamic response", "Start vasopressors PERIPHERALLY — do NOT wait for central line; early organ perfusion is the goal", "Place arterial line for real-time BP monitoring and titration", "Obtain central venous access early", "Consider bedside POCUS/echo to identify shock type and guide management", "Target MAP >65 mmHg (higher targets for brain-injured patients: MAP 70-80 for CPP goals)"] } },
    { type: "heading", content: { text: "Vasopressor and Inotrope Table" } },
    { type: "table", content: { headers: ["Drug", "Dose", "Cardiac Output", "MAP", "SVR", "Best Use"], rows: [["Norepinephrine", "0-50 mcg/min", "+/-", "++", "+++", "First-line for most shock states; primary vasopressor"], ["Vasopressin", "0.03-0.04 units/min", "No effect", "+++", "+++", "Adjunct to NE; spares NE dose; neurogenic shock"], ["Epinephrine", "0-50 mcg/min", "++", "++", "+++", "Anaphylaxis; cardiac arrest; refractory septic shock"], ["Phenylephrine", "0-360 mcg/min", "No effect", "++", "+++", "Pure vasoconstriction; AFib with RVR; AVOID in cardiogenic shock"], ["Dopamine", "5-20 mcg/kg/min", "++", "+", "++", "Bradycardic distributive shock; rarely used now"], ["Dobutamine (inotrope)", "0-20 mcg/kg/min", "+++", "+/-", "No effect", "Cardiogenic shock; low cardiac output; augment dobutamine with NE"]] } },
    { type: "warning", content: { title: "Phenylephrine Contraindicated in Cardiogenic Shock", text: "Phenylephrine causes pure vasoconstriction, which increases afterload and worsens heart failure. In cardiogenic shock, use norepinephrine + dobutamine instead." } },
    { type: "heading", content: { text: "Shock-Type Specific Management" } },
    { type: "table", content: { headers: ["Shock Type", "Key Treatment", "Notes"], rows: [["Hypovolemic", "IV fluids; PRBCs if hemorrhagic; Massive Transfusion Protocol 1:1:1 (PRBC:FFP:Plt)", "Find and control source of bleeding; CTA abdomen/pelvis if occult"], ["Cardiogenic", "NE + dobutamine; cardiology for revascularization; avoid aggressive fluids", "Consider ECMO for refractory; emergent echo"], ["Neurogenic", "IVF + NE → vasopressin/phenylephrine; dopamine if bradycardic", "SCI or brain death etiology; manage BP for CPP"], ["Septic", "Antibiotics immediately; IVF boluses; NE → vasopressin; stress dose hydrocortisone if on chronic steroids", "Serial lactate q6h; fluid responsiveness guided resuscitation"], ["Massive PE", "Call PE response team; NE for MAP; systemic tPA usually contraindicated in neuro pts", "Bedside echo for RV strain; embolectomy if eligible"], ["Tension Pneumothorax", "Needle decompression (2nd ICS, MCL) → chest tube IMMEDIATELY", "Don't wait for X-ray; treat on clinical diagnosis"]] } }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M12.L3 — Atrial Fibrillation with RVR and Bradyarrhythmias
// ─────────────────────────────────────────────────────────────────────────────
const m12l3Content = {
  blocks: [
    { type: "heading", content: { text: "AFib in the Neuro ICU — Key Principle" } },
    { type: "callout", content: { icon: "warning", title: "Rate Control — NOT Rhythm Control", text: "In neurocritical care patients, the goal is RATE CONTROL, not rhythm control. Cardioversion requires anticoagulation, carries stroke risk, and is rarely the right choice in acute brain injury. Focus on controlling the ventricular rate." } },
    { type: "heading", content: { text: "Initial AFib RVR Management" } },
    { type: "checklist", content: { items: ["Obtain 12-lead EKG immediately", "Monitor BP continuously", "Replace electrolytes: K >4 mEq/L, Mg >2 mg/dL (replace regardless of Mg level)", "Consider IV fluids and IV magnesium sulfate as first maneuvers"] } },
    { type: "heading", content: { text: "Hemodynamically STABLE — Step-Up Approach" } },
    { type: "table", content: { headers: ["Step", "Agent", "Dose", "Notes"], rows: [["1st line", "Metoprolol IV", "5 mg IV push; repeat × 2 at 5-min intervals if no response", "Hold if SBP <100 or bronchospasm"], ["2nd line", "Diltiazem IV", "5-10 mg IV bolus; then infusion 5-15 mg/hr", "More potent rate control; watch for hypotension"], ["3rd line", "Magnesium sulfate", "2g IV over 15 min", "May restore sinus rhythm or improve rate"], ["Alternative", "Digoxin IV", "0.25 mg × 1, repeat q6h × 24h; maintenance 0.125-0.25 mg daily", "Slower onset; useful if hypotensive and other options exhausted"]] } },
    { type: "heading", content: { text: "Hemodynamically UNSTABLE AFib" } },
    { type: "paragraph", content: { text: "If hypotensive, avoid metoprolol/diltiazem (worsen hypotension). Use amiodarone 150mg bolus over 10 min, then continuous infusion. Evaluate for other sources of hypotension (hypovolemia, sepsis, hemorrhage)." } },
    { type: "warning", content: { title: "Cardioversion in Neuro ICU — Last Resort", text: "DC cardioversion requires:\n• Sedation (etomidate or ketamine if hemodynamically tenuous)\n• Attending MUST BE PRESENT\n• Synchronized mode on defibrillator\n• Anticoagulation considerations (stroke risk)\nUse only when rate control has failed and hemodynamics are critically compromised." } },
    { type: "heading", content: { text: "Adult Bradycardia Management (AHA 2020)" } },
    { type: "table", content: { headers: ["Scenario", "Action"], rows: [["HR <50 without symptoms", "Monitor and observe; identify and treat underlying cause"], ["HR <50 with hypotension, AMS, ischemia, or HF", "Give Atropine 1 mg IV, repeat q3-5 min, max 3 mg"], ["Atropine ineffective", "Transcutaneous pacing AND/OR Dopamine 5-20 mcg/kg/min OR Epinephrine 2-10 mcg/min"], ["Refractory", "Cardiology consult for transvenous pacing"]] } },
    { type: "heading", content: { text: "Common Causes of Bradycardia in Neuro ICU" } },
    { type: "checklist", content: { items: ["Cushing's reflex (hypertension + bradycardia = sign of herniation — EMERGENCY)", "Beta-blocker or calcium channel blocker toxicity/excess", "Hyperkalemia", "Myocardial ischemia", "Vagal response during suctioning or procedures", "Hypothyroidism", "Anoxic brain injury"] } },
    { type: "heading", content: { text: "Sinus Tachycardia Differential in Neuro ICU" } },
    { type: "checklist", content: { items: ["Pain or inadequate sedation (most common)", "Fever / infection", "Hypovolemia / hemorrhage", "PE or pneumothorax", "Hyperadrenergic state (subarachnoid hemorrhage, stimulant toxicity)", "Hyperthyroidism", "Medications (dobutamine, epinephrine, albuterol)", "Anxiety or agitation"] } }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M12.L4 — Pulmonary Embolism and Obstructive Shock
// ─────────────────────────────────────────────────────────────────────────────
const m12l4Content = {
  blocks: [
    { type: "heading", content: { text: "PE in the Neuro ICU — Unique Challenges" } },
    { type: "paragraph", content: { text: "Neuro ICU patients are at VERY HIGH risk for DVT and PE due to immobility, hypercoagulable states (especially cancer, SAH), and interrupted anticoagulation prophylaxis. Most patients with intracranial hemorrhage or recent neurosurgery are INELIGIBLE for systemic thrombolysis — making early recognition and specialized management critical." } },
    { type: "heading", content: { text: "PE Recognition" } },
    { type: "checklist", content: { items: ["Sudden unexplained hypoxia or dyspnea", "Tachycardia (new)", "Hypotension out of proportion to clinical picture", "Right heart strain on EKG: S1Q3T3, new RBBB, sinus tachycardia, T-wave inversions V1-V4", "Elevated troponin or BNP", "Leg swelling or DVT by duplex ultrasound"] } },
    { type: "heading", content: { text: "Diagnostic Workup" } },
    { type: "table", content: { headers: ["Test", "Findings", "Notes"], rows: [["CT Pulmonary Angiography (CTPA)", "Filling defect in pulmonary arteries — definitive", "Test of choice; beware contrast in AKI"], ["Bedside POCUS/TTE", "RV dilation, septal D-sign, RV hypokinesis", "Rapid bedside assessment; McConnell sign (RV apex sparing) suggests PE"], ["EKG", "S1Q3T3, new RBBB, sinus tachycardia, RAD", "Not diagnostic alone; supports clinical suspicion"], ["D-dimer", "Elevated (>500 ng/mL)", "High sensitivity, low specificity; useful to RULE OUT PE at low pretest probability"], ["V/Q Scan", "Ventilation-perfusion mismatch", "Alternative to CTPA in severe contrast allergy or AKI"], ["Lower extremity duplex", "DVT as source", "80% of PE cases have DVT; positive DVT = treat as PE"]] } },
    { type: "heading", content: { text: "PE Severity Classification" } },
    { type: "table", content: { headers: ["Category", "Criteria", "Mortality", "Treatment"], rows: [["Massive (High-Risk) PE", "Persistent hypotension, cardiac arrest, or obstructive shock", ">15%", "Systemic thrombolysis (if eligible) or embolectomy"], ["Submassive (Intermediate-Risk) PE", "Normotensive + RV dysfunction on echo OR elevated biomarkers", "3-15%", "Anticoagulation; consider catheter-directed thrombolysis or embolectomy"], ["Low-Risk PE", "No hemodynamic compromise, no RV dysfunction", "<1%", "Anticoagulation alone"]] } },
    { type: "warning", content: { title: "Systemic Thrombolysis Usually Contraindicated in Neuro ICU", text: "Most neuro ICU patients with intracranial hemorrhage, recent neurosurgery, or stroke within 3 months are INELIGIBLE for systemic tPA. Call the PE response team (PERT) for embolectomy options: catheter-directed therapy, surgical embolectomy." } },
    { type: "heading", content: { text: "Management Algorithm" } },
    { type: "table", content: { headers: ["Situation", "Action"], rows: [["Hemodynamically unstable PE (obstructive shock)", "NE drip to maintain MAP >65; Call PERT immediately; Bedside echo; Consider embolectomy"], ["Stable PE — eligible for anticoagulation", "Start unfractionated heparin (5000 U bolus, then infusion per weight-based protocol); bridge to DOAC or warfarin"], ["Stable PE — anticoagulation contraindicated (active ICH)", "IVC filter placement (call IR); discuss risk/benefit with neurosurgery; reassess anticoagulation eligibility daily"], ["DVT without PE — high bleed risk", "IVC filter; reassess anticoagulation eligibility in 48-72h"]] } },
    { type: "heading", content: { text: "Tension Pneumothorax — Rapid Review" } },
    { type: "paragraph", content: { text: "Tension pneumothorax causes obstructive shock by compressing the heart and great vessels. It's a clinical diagnosis — DO NOT wait for X-ray confirmation." } },
    { type: "table", content: { headers: ["Sign", "Detail"], rows: [["Sudden ↑ peak airway pressure", "In ventilated patient — classic trigger"], ["Absent breath sounds (ipsilateral)", "Compared to contralateral side"], ["Tracheal deviation", "Away from affected side (LATE sign)"], ["Hypotension + tachycardia", "Obstructive shock pattern"], ["Ultrasound", "No lung sliding on affected side"], ["Treatment", "Needle decompression: 14G angiocath at 2nd intercostal space, midclavicular line → THEN chest tube"]] } }
  ]
};

const lessons = [
  { title: 'M12.L1 — Sepsis: Recognition, Source Control, and Antibiotics', content: m12l1Content },
  { title: 'M12.L2 — Shock: Classification, Hemodynamics, and Vasopressors', content: m12l2Content },
  { title: 'M12.L3 — Atrial Fibrillation with RVR and Bradyarrhythmias', content: m12l3Content },
  { title: 'M12.L4 — Pulmonary Embolism and Obstructive Shock', content: m12l4Content },
];

async function populate() {
  console.log('🔧 Loading M12 content...\n');
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
