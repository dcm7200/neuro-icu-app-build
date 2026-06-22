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
// M13.L1 — Sodium and Fluid Management: SIADH, CSW, and Hypernatremia
// ─────────────────────────────────────────────────────────────────────────────
const m13l1Content = {
  blocks: [
    { type: "heading", content: { text: "Why Sodium Matters in the Neuro ICU" } },
    { type: "paragraph", content: { text: "Hyponatremia causes cerebral edema; hypernatremia causes osmotic demyelination or dehydration. In SAH patients, sodium dysregulation is one of the most common and dangerous complications. Monitor BMP q6h in acute phases." } },
    { type: "heading", content: { text: "SIADH vs. Cerebral Salt Wasting — The Classic Confusion" } },
    { type: "callout", content: { icon: "info", title: "Key Point: Treat Both the Same Way in Neuro ICU", text: "Despite opposite volume status (SIADH = euvolemic/hypervolemic; CSW = hypovolemic), both are treated the same in neuro ICU patients: IV fluids, hypertonic saline, salt supplementation, fludrocortisone, high-sodium/high-protein diet. AVOID fluid restriction in neuro patients — it causes hypovolemia and worsens vasospasm and outcomes." } },
    { type: "table", content: { headers: ["Feature", "SIADH", "Cerebral Salt Wasting (CSW)"], rows: [["Volume status", "Euvolemic or mildly hypervolemic", "Hypovolemic — salt-wasting from kidneys"], ["Urine sodium", "Elevated (>20 mEq/L)", "Elevated (>20 mEq/L) — same"], ["Urine osmolality", "High (>100 mOsm/kg)", "High — same"], ["Serum sodium", "Low (<135 mEq/L)", "Low — same"], ["Serum osmolality", "Low (<280 mOsm/kg)", "Low — same"], ["BUN/Cr", "Normal or low", "Often elevated (pre-renal due to hypovolemia)"], ["Treatment", "Fluid restrict (AVOID in neuro) + HTS + fludrocortisone", "IV fluids + HTS + salt supplementation + fludrocortisone"]] } },
    { type: "heading", content: { text: "Hyponatremia Management" } },
    { type: "table", content: { headers: ["Intervention", "Dose/Details"], rows: [["3% Hypertonic Saline (HTS)", "Peripheral or central access; 1-2 mEq/L/hr max correction rate; target Na 145-155 in SAH patients"], ["23.4% HTS (bolus)", "30 mL IV via CENTRAL LINE ONLY — used for acute herniation or severe ICP spike; very rapid rise in Na"], ["Salt tablets", "NaCl tabs 1-2g PO TID-QID; supplement dietary sodium"], ["Fludrocortisone", "0.1-0.2 mg PO/NG daily — helps renal sodium retention; especially useful in CSW"], ["High-protein/high-osmolality diet", "Tube feeds with high osmolality and protein content"], ["Avoid hypotonic fluids", "NO D5W, NO 0.45% NaCl — worsen hyponatremia"], ["Avoid fluid restriction", "CONTRAINDICATED in SAH/TBI — worsens vasospasm and outcomes"]] } },
    { type: "warning", content: { title: "Correction Rate — Do NOT Overcorrect", text: "Correct sodium at MAX 8-10 mEq/L per 24 hours (some guidelines: 10-12 mEq/L/24h). Overcorrection risks osmotic demyelination syndrome (ODS/central pontine myelinolysis) — can cause locked-in syndrome. If overcorrection occurs: give D5W to re-lower sodium." } },
    { type: "heading", content: { text: "Hypernatremia in Neuro ICU" } },
    { type: "paragraph", content: { text: "Common causes: osmotic therapy (mannitol, HTS), diabetes insipidus (DI — especially after brain death or pituitary injury), inadequate free water." } },
    { type: "table", content: { headers: ["Cause", "Urine Osmolality", "Treatment"], rows: [["Central DI (no ADH)", "Low (<200 mOsm/kg) despite high serum Na", "DDAVP 1-2 mcg IV/SQ q8-12h; free water replacement; vasopressin infusion for organ donors"], ["Nephrogenic DI (ADH resistance)", "Low (<200 mOsm/kg)", "Treat underlying cause; thiazide diuretics paradoxically reduce urine output"], ["Free water deficit", "Concentrated urine (>600 mOsm/kg)", "Oral or NG free water; D5W if severe"]] } },
    { type: "paragraph", content: { text: "Free water deficit calculation: Water Deficit (L) = 0.6 × weight (kg) × [(serum Na / 140) - 1]. Correct slowly — no faster than 0.5 mEq/L/hr or 12 mEq/L/24h for hypernatremia." } }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M13.L2 — DVT Prophylaxis, BP Management, and Glucose Control
// ─────────────────────────────────────────────────────────────────────────────
const m13l2Content = {
  blocks: [
    { type: "heading", content: { text: "DVT Prophylaxis in the Neuro ICU" } },
    { type: "callout", content: { icon: "info", title: "Every Patient Gets SQH", text: "All neuro ICU patients get subcutaneous heparin (SQH) 5000 units q8h. If weight >110 kg: 7500 units q8h. Timing depends on diagnosis — discuss on rounds with neurosurgery." } },
    { type: "table", content: { headers: ["Diagnosis", "SQH Timing", "Notes"], rows: [["Ischemic stroke", "24-48h after presentation", "Earlier if small infarct and hemostasis confirmed"], ["ICH", "24-48h after stability confirmed on repeat CT", "Shared decision with neurosurgery"], ["Aneurysmal SAH", "After aneurysm securement", "Immediately after endovascular; 24-48h after surgical"], ["Post-craniotomy", "24-48h after surgery", "Per neurosurgery guidance"], ["Post-tPA", "24h after tPA administration", "No antithrombotic therapy for 24h post-tPA"]] } },
    { type: "paragraph", content: { text: "Per PREVAIL trial: Enoxaparin (Lovenox) 40 mg SQ daily is SUPERIOR to unfractionated heparin for DVT prevention in neuro patients who are eligible. Use when anticoagulation cleared by neurosurgery." } },
    { type: "heading", content: { text: "BP Management Pearls" } },
    { type: "warning", content: { title: "Do NOT React to Single Elevated BP Readings", text: "Cuff readings using oscillometry measure MAP directly and derive SBP/DBP — they can be unreliable with irregular rhythms. Arterial line directly measures SBP/DBP. A single elevated reading should prompt verification, not immediate medication." } },
    { type: "heading", content: { text: "Arterial Line Waveform Troubleshooting (Square Wave Test)" } },
    { type: "paragraph", content: { text: "Perform a rapid flush (1-second) to generate a square wave, then count oscillations after the waveform returns to baseline:" } },
    { type: "table", content: { headers: ["Oscillations After Square Wave", "Interpretation", "Cause / Fix"], rows: [["0-1 oscillation", "OVERDAMPED — underestimates SBP, overestimates DBP; MAP usually unchanged", "Low bag pressure, loose connectors, air bubbles, clot, kinking — fix each one"], ["1-2 oscillations", "OPTIMAL — accurate readings", "Normal — no action needed"], ["≥3 oscillations", "UNDERDAMPED — overestimates SBP, underestimates DBP", "Stiff/noncompliant tubing, defective transducer — use softer tubing"]] } },
    { type: "heading", content: { text: "BP Medication Selection" } },
    { type: "callout", content: { icon: "warning", title: "AVOID Hydralazine in Acute Brain Injury", text: "Hydralazine impairs cerebral autoregulation and causes unpredictable BP drops. NEVER use for acute BP management in brain injury patients. Use nicardipine or clevidipine for acute IV management." } },
    { type: "table", content: { headers: ["Situation", "Agent", "Notes"], rows: [["Acute hypertension IV (NCCU)", "Nicardipine drip or Clevidipine drip", "Titratable; predictable; preferred in neuro ICU"], ["Transitioning to oral", "Captopril 25mg q8h or Labetalol 100mg q4-6h", "Short-acting bridge while long-acting takes effect"], ["Chronic oral — general", "Amlodipine 5-10mg daily", "Takes 24-48h to reach full effect; cheap"], ["African Americans / Hispanics", "CCBs (amlodipine) or thiazides", "Avoid thiazides in cerebral edema — natriuretic effect"], ["Heart disease (reduced EF)", "Metoprolol succinate; carvedilol (start low)", "Carvedilol requires slow titration"], ["DM / heart failure", "ACEi (lisinopril) or ARBs", "Captopril→lisinopril at 5:1 conversion ratio"], ["AKI", "Avoid ACEi/ARBs if Cr rising; OK once stable ×2 or downtrending", ""]] } },
    { type: "heading", content: { text: "Glucose Management" } },
    { type: "paragraph", content: { text: "Target blood glucose 140-180 mg/dL. Intensive glucose control (80-110 mg/dL) has NOT shown benefit after brain injury and INCREASES risk of hypoglycemia — which is MORE HARMFUL than moderate hyperglycemia." } },
    { type: "table", content: { headers: ["Scenario", "Insulin Approach"], rows: [["All patients", "Sliding scale insulin (SSI) at minimum"], ["Persistent hyperglycemia", "Add basal insulin: Glargine (Lantus) 0.2-0.3 units/kg/day + SSI"], ["Weight-based dosing", "0.4-0.5 units/kg/day total: half as long-acting, remainder in 3 pre-meal doses; start at 60-70% if erratic feeding"], ["Continuous tube feeds", "Glargine + SSI + lispro q6h (instead of pre-meal)"], ["AKI/CKD", "Insulin lasts longer — reduce doses; monitor closely"]] } },
    { type: "warning", content: { title: "Hypoglycemia Is the Enemy", text: "Hypoglycemia (<70 mg/dL) is more detrimental to the injured brain than moderate hyperglycemia. Check glucose q1-2h on insulin drips; q4-6h on scheduled insulin. If glucose <70 mg/dL: give D50W 25-50 mL IV immediately." } }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M13.L3 — AKI, Pain Management, and Anti-Emetics
// ─────────────────────────────────────────────────────────────────────────────
const m13l3Content = {
  blocks: [
    { type: "heading", content: { text: "AKI in the Neuro ICU" } },
    { type: "paragraph", content: { text: "AKI is common in the neuro ICU due to hypovolemia, nephrotoxic medications, contrast agents, and rhabdomyolysis (especially in TBI and seizures). A systematic approach prevents over-restriction of necessary treatments." } },
    { type: "heading", content: { text: "AKI Evaluation" } },
    { type: "checklist", content: { items: ["Rule out post-renal obstruction first: bladder scan or foley catheter to check for urinary retention", "Review offending medications: NSAIDs, aminoglycosides, vancomycin, IV contrast, PPIs, diuretics, ACEi/ARBs", "Assess volume status: history of diarrhea, vomiting, hypotension, dehydration", "Urine electrolytes (FeNa) and urine eosinophils: often unhelpful; faster to give a fluid trial and assess response", "Rhabdomyolysis: CK >1000 U/L; myoglobinuria; low FeNa paradoxically"] } },
    { type: "callout", content: { icon: "info", title: "CT Contrast and Gadolinium Are Safe", text: "No strong evidence supports withholding CT contrast (iodinated) for fear of contrast-induced nephropathy (CIN). The risk is vastly overstated. Benefits of CTA/CTP usually outweigh minimal risk.\n\nGadolinium (MRI contrast): Per 2019 JAMA meta-analysis of 4,931 patients — ZERO cases of nephrogenic systemic fibrosis (NSF) in CKD 4/5. Risk of withholding exceeds the minimal risk of NSF with modern macrocyclic agents." } },
    { type: "heading", content: { text: "AKI Management" } },
    { type: "table", content: { headers: ["Cause", "Action"], rows: [["Pre-renal (hypovolemia)", "IV fluid boluses (isotonic saline); reassess urine output"], ["Obstruction (post-renal)", "Relieve obstruction (Foley, nephrostomy tube)"], ["Nephrotoxic medications", "Discontinue offending agents; dose-adjust remaining renals"], ["Rhabdomyolysis", "Aggressive IVF to target UOP 200-300 mL/hr; sodium bicarb controversial"], ["Intrinsic renal (ATN)", "Supportive; avoid further insults; may need CRRT if severe"], ["Contrast (if truly needed)", "Pre-hydrate with isotonic saline; minimize contrast dose; avoid repeat contrast within 24-48h"]] } },
    { type: "heading", content: { text: "Pain Management — WHO Analgesic Ladder" } },
    { type: "table", content: { headers: ["Pain Level", "Agent(s)", "Doses / Notes"], rows: [["Mild (1-3)", "Acetaminophen", "650-1000 mg q6-8h; max 3-4g/day healthy adults; <3g/day CKD; <2g/day liver disease/cirrhosis"], ["Mild-Moderate (1-4)", "NSAIDs: Ketorolac (IV), Ibuprofen", "Avoid if CKD, GI bleed risk, or on anticoagulation; short-term use preferred"], ["Moderate (4-7)", "Tramadol, Celecoxib", "Tramadol: onset 1h; avoid in seizure patients (lowers threshold)"], ["Severe (8-10)", "Opioids: Morphine, Oxycodone, Hydromorphone, Fentanyl", "AVOID hydromorphone in stroke patients (neurotoxic metabolites). Fentanyl preferred in ICU (no active metabolites)."], ["Adjuncts (any level)", "Gabapentin, Pregabalin, SNRIs, TCAs, Baclofen, Cyclobenzaprine", "Neuropathic pain; muscle spasm; titrate carefully in neuro patients"], ["Topical", "Lidocaine patch, Menthol cream, Capsaicin, EMLA cream", "Procedural analgesia; localized pain"]] } },
    { type: "heading", content: { text: "Opioid Considerations in Neuro ICU" } },
    { type: "table", content: { headers: ["Agent", "IV Onset", "Half-life", "Notes"], rows: [["Fentanyl", "1-2 min", "2-4h (context-sensitive: longer with prolonged infusion)", "PREFERRED in neuro ICU for infusions; no active metabolites; rapid titration"], ["Morphine", "5-10 min", "2-4h", "Active metabolite (M6G) accumulates in renal failure; causes histamine release (↑ ICP theoretically)"], ["Hydromorphone", "10-15 min", "2-3h", "AVOID in stroke patients — neuroexcitatory metabolite (hydromorphone-3-glucuronide) can cause myoclonus, seizures, dysphoria"], ["Oxycodone", "30-60 min (oral)", "3-4h", "Oral only; appropriate for moderate pain in alert patients"]] } },
    { type: "heading", content: { text: "Anti-Emetic Options" } },
    { type: "table", content: { headers: ["Agent", "Mechanism", "Dose", "Notes"], rows: [["Ondansetron (Zofran)", "5-HT3 antagonist", "4-8 mg IV/PO q6-8h", "First line; minimal sedation; QTc prolongation with high doses"], ["Metoclopramide (Reglan)", "Dopamine antagonist + prokinetic", "10 mg IV q6-8h", "Promotes gastric motility; avoid in Parkinson's; EPS risk"], ["Prochlorperazine (Compazine)", "Dopamine antagonist", "10 mg IV/PO q6h", "EPS risk; avoid in Parkinson's"], ["Promethazine (Phenergan)", "Antihistamine + dopamine antagonist", "12.5-25 mg IV/PO q6h", "Sedating; BLACK BOX WARNING against IV push — use IVPB over 10-15 min"], ["Haloperidol", "Dopamine antagonist", "0.5-2 mg IV q6-8h", "Also useful for agitation/delirium; QTc prolongation"], ["Dexamethasone", "Anti-inflammatory", "4-8 mg IV/PO", "Useful for chemotherapy-related N/V; vasogenic edema-related headache with N/V"]] } }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M13.L4 — CT and MRI Basics for the Neuro ICU
// ─────────────────────────────────────────────────────────────────────────────
const m13l4Content = {
  blocks: [
    { type: "heading", content: { text: "Why Every Neuro ICU Clinician Needs Imaging Literacy" } },
    { type: "paragraph", content: { text: "You will review imaging before the radiologist does. Pattern recognition on CT and MRI guides acute management decisions — blood, edema, herniation, ischemia. This lesson covers the essentials you need at the bedside." } },
    { type: "heading", content: { text: "CT Head Basics — Hounsfield Units (HU)" } },
    { type: "table", content: { headers: ["Tissue", "HU Range", "Appears As"], rows: [["Air", "−1000", "Black"], ["Fat", "−100 to −50", "Very dark"], ["Water / CSF", "0", "Black/dark"], ["White matter", "20-30 HU", "Light gray"], ["Gray matter", "35-45 HU", "Slightly brighter than white matter"], ["Fresh blood", "50-80 HU", "Bright white"], ["Calcification / bone", ">100 HU", "Very bright white"], ["Contrast / iodine", ">100 HU", "Bright white"]] } },
    { type: "heading", content: { text: "CT Windowing — The Secret to Seeing More" } },
    { type: "paragraph", content: { text: "Window Width (W) = range of HU values displayed. Window Center/Level (C) = midpoint of that range. Narrower window = higher contrast between similar tissues. Wider window = broader overview." } },
    { type: "table", content: { headers: ["Window Preset", "Center (C)", "Width (W)", "Best For"], rows: [["Brain window", "C=40, W=80", "HU 0-80", "Standard brain parenchyma; subdural blood"], ["Stroke window", "C=40, W=40", "HU 20-60", "Gray-white differentiation for early ischemia; loss of gray-white distinction visible earlier"], ["Bone window", "C=600, W=2000", "HU −400 to 1600", "Skull fractures; bony anatomy"], ["Blood window (SDH)", "C=55, W=200", "HU −45 to 155", "Subdural collections — especially isodense subacutes"], ["Subdural window", "C=75, W=200", "HU −25 to 175", "Detecting thin SDH against bone"]] } },
    { type: "callout", content: { icon: "info", title: "Clinical Application: Early Ischemic Stroke on CT", text: "Switch to stroke window (C40, W40) when looking for early ischemia. Loss of gray-white differentiation in MCA territory (insular ribbon sign, dense MCA sign, loss of basal ganglia outline) is visible within 2-6 hours on stroke window that you'd miss on standard brain window." } },
    { type: "heading", content: { text: "MRI Sequences — The Key Ones" } },
    { type: "table", content: { headers: ["Sequence", "Bright (High Signal)", "Dark (Low Signal)", "Best For"], rows: [["T1", "Fat, subacute blood (methemoglobin), gadolinium enhancement", "Water/CSF, acute blood, air", "Anatomy, enhancement, subacute blood, fat"], ["T2/FLAIR", "Water, edema, most pathology; FLAIR suppresses free water", "Fat (T2), CSF suppressed on FLAIR", "Edema, white matter disease, chronic gliosis; FLAIR for periventricular lesions"], ["DWI (Diffusion Weighted)", "Cytotoxic edema (restricted diffusion) = acute ischemia, abscess core", "Normal brain, vasogenic edema", "ACUTE STROKE — most sensitive in first 6 hours"], ["ADC (Apparent Diffusion Coefficient)", "Vasogenic edema, facilitated diffusion, chronic stroke", "Cytotoxic edema (restricted diffusion) = DARK on ADC", "Confirms DWI findings; dark DWI + dark ADC = true restriction (acute stroke/abscess)"], ["SWI (Susceptibility Weighted)", "Normal brain", "Blood products (hemosiderin, deoxyhemoglobin), calcium, air", "Microhemorrhages, old bleeds, DAI, cavernous malformations, venous structures"], ["GRE (Gradient Echo)", "Normal brain", "Blood products, calcium", "Similar to SWI; older sequences; hemorrhagic transformation detection"], ["MRA (Angiography)", "Flowing blood (time of flight)", "Static tissue", "Aneurysm, stenosis, dissection — no contrast needed for basic MRA"]] } },
    { type: "heading", content: { text: "DWI-ADC Interpretation Pearls" } },
    { type: "table", content: { headers: ["DWI", "ADC", "Interpretation"], rows: [["Bright", "Dark", "TRUE restriction = cytotoxic edema = acute ischemia, abscess core, dense cellular tumor"], ["Bright", "Bright", "'T2 shine-through' = underlying T2 bright lesion, NOT true restriction (subacute stroke, vasogenic edema)"], ["Dark or normal", "Bright", "Facilitated diffusion = vasogenic edema, chronic stroke, cyst"], ["Normal", "Normal", "Normal brain — no diffusion abnormality"]] } },
    { type: "callout", content: { icon: "info", title: "Avoid the 'T2 Shine-Through' Trap", text: "Always confirm DWI findings on ADC map. If DWI is bright BUT ADC is also bright (not dark) → it's T2 shine-through, not true ischemia. True acute ischemia = bright DWI + DARK ADC." } },
    { type: "heading", content: { text: "MRI Contrast — Gadolinium Safety" } },
    { type: "paragraph", content: { text: "Gadolinium enhances disrupted blood-brain barrier (tumors, abscesses, active demyelination, meningitis, infarct subacutely). It does NOT cause AKI. Per a 2019 JAMA meta-analysis of 4,931 CKD 4/5 patients: zero cases of nephrogenic systemic fibrosis (NSF) with modern macrocyclic agents. Do not withhold MRI contrast in AKI/CKD — the benefit almost always outweighs the risk." } },
    { type: "heading", content: { text: "Contrast Allergy Premedication" } },
    { type: "table", content: { headers: ["Prior Reaction Severity", "Action"], rows: [["Mild (flushing, hives, limited urticaria)", "No premedication required — proceed"], ["Moderate (generalized urticaria, bronchospasm, angioedema)", "Premedicate + use different contrast agent"], ["Severe (hypotension, anaphylaxis, cardiac arrest)", "Do NOT give contrast without detailed risk/benefit discussion"]] } },
    { type: "paragraph", content: { text: "13-hour IV premedication regimen: Hydrocortisone 200mg IV at 13h, 7h, and 1h prior to contrast + Diphenhydramine 50mg IV 1h before.\nAccelerated regimen (4-5h): Methylprednisolone 40mg or hydrocortisone 200mg IV immediately, then every 4h until contrast + Diphenhydramine 50mg IV 1h before." } }
  ]
};

const lessons = [
  { title: 'M13.L1 — Sodium and Fluid Management: SIADH, CSW, and Hypernatremia', content: m13l1Content },
  { title: 'M13.L2 — DVT Prophylaxis, BP Management, and Glucose Control', content: m13l2Content },
  { title: 'M13.L3 — AKI, Pain Management, and Anti-Emetics', content: m13l3Content },
  { title: 'M13.L4 — CT and MRI Basics for the Neuro ICU', content: m13l4Content },
];

async function populate() {
  console.log('🔧 Loading M13 content...\n');
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
