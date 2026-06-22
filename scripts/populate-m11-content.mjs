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
// M11.L1 — Bacterial Meningitis: Empiric Treatment, LP Workup, and Complications
// ─────────────────────────────────────────────────────────────────────────────
const m11l1Content = {
  blocks: [
    { type: "heading", content: { text: "Overview" } },
    { type: "paragraph", content: { text: "CNS infections are life-threatening emergencies. Bacterial meningitis carries high mortality without prompt treatment. The cardinal rule: DO NOT delay antibiotics to get a lumbar puncture. Start empiric coverage immediately and do the LP as soon as safely possible." } },
    { type: "warning", content: { title: "Do NOT Delay Antibiotics for LP", text: "If you suspect bacterial meningitis, start antibiotics NOW. A 30-minute delay for imaging or LP setup can be lethal. Antibiotics do not significantly alter LP results for 2-4 hours." } },
    { type: "heading", content: { text: "Clinical Presentation" } },
    { type: "checklist", content: { items: ["Fever (most sensitive)", "Nuchal rigidity / meningismus", "Photophobia and phonophobia", "Headache — often described as worst of life", "Altered mental status / encephalopathy", "Petechial or purpuric rash (Neisseria meningitidis — emergency)", "Kernig's sign (unable to extend knee with hip flexed)", "Brudzinski's sign (flexion of knees with passive neck flexion)"] } },
    { type: "heading", content: { text: "When to Get CT Before LP" } },
    { type: "callout", content: { icon: "info", title: "CT Head Required Before LP If:", text: "• New focal neurologic deficit\n• Encephalopathy with GCS <10\n• New seizure\n• Papilledema\n• Immunocompromised state\n• History of CNS disease\n\nIf ANY of these present → CT first (but START antibiotics FIRST)." } },
    { type: "heading", content: { text: "LP Analysis — What to Order" } },
    { type: "table", content: { headers: ["Study", "Normal", "Bacterial Meningitis", "Viral Meningitis"], rows: [["Opening pressure", "<20 cmH2O", "Elevated (>20)", "Normal or mildly elevated"], ["WBC", "<5 cells/µL", "1000-10,000 (PMN predominant)", "10-1000 (lymphocyte predominant)"], ["Glucose", ">45 mg/dL (or >60% serum)", "<45 mg/dL — low", "Normal"], ["Protein", "15-45 mg/dL", ">200 mg/dL — high", "Normal to mildly elevated"], ["Lactate", "<3.5 mmol/L", "Elevated (>3.5 strongly suggests bacterial)", "Normal"], ["Gram stain/culture", "Negative", "Positive in ~70-80%", "Negative"], ["Biofire MEP PCR", "Negative", "May identify organism even after abx", "May identify virus"]] } },
    { type: "heading", content: { text: "Empiric Antibiotic Coverage" } },
    { type: "table", content: { headers: ["Population", "Coverage", "Regimen"], rows: [["Standard adult (immunocompetent)", "S. pneumoniae, N. meningitidis, H. influenzae", "Vancomycin 20 mg/kg IV q12h + Ceftriaxone 2g IV q12h"], ["Age >50, alcoholic, or immunocompromised", "Add Listeria", "+ Ampicillin 2g IV q4h"], ["Recent neurosurgery or hospital stay", "Pseudomonas, gram-negatives, MRSA", "Vancomycin + Cefepime 2g q8h OR Meropenem 2g q8h\n(Note: Pip/tazo LACKS CNS penetration — do NOT use)"], ["Suspected fungal (HIV, immunocompromised)", "Cryptococcus, Candida", "Add Fluconazole; cryptococcal antigen on LP"]] } },
    { type: "callout", content: { icon: "warning", title: "Pip/Tazo Does NOT Penetrate CNS", text: "Piperacillin-tazobactam has poor CNS penetration and should NOT be used for CNS infections. Use Cefepime or Meropenem for gram-negative/Pseudomonas CNS coverage." } },
    { type: "heading", content: { text: "Adjunctive Dexamethasone" } },
    { type: "paragraph", content: { text: "Dexamethasone 10mg IV q6h × 4 days for suspected pneumococcal meningitis. Give BEFORE or WITH first antibiotic dose — reduces hearing loss and mortality. Discontinue if not S. pneumoniae." } },
    { type: "heading", content: { text: "Droplet Precautions" } },
    { type: "callout", content: { icon: "info", title: "Isolation Requirements", text: "Neisseria meningitidis and H. influenzae require DROPLET precautions for first 24 hours of treatment. Post-exposure prophylaxis with rifampin or ciprofloxacin for close contacts." } },
    { type: "heading", content: { text: "Complications to Monitor" } },
    { type: "checklist", content: { items: ["Cerebral edema and herniation (treat elevated ICP)", "Ventriculitis / hydrocephalus (EVD if needed)", "Cerebral vasculitis and ischemic stroke", "SIADH / hyponatremia (restrict fluids carefully — avoid in meningitis patients who may be dehydrated)", "Hearing loss (audiogram prior to discharge)", "Subdural empyema (surgical emergency)"] } }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M11.L2 — Viral Encephalitis and CNS Immunocompromised Infections
// ─────────────────────────────────────────────────────────────────────────────
const m11l2Content = {
  blocks: [
    { type: "heading", content: { text: "Viral Encephalitis: Overview" } },
    { type: "paragraph", content: { text: "Encephalitis = brain parenchymal inflammation. Often presents with altered consciousness, behavioral changes, focal deficits, and seizures — distinct from meningitis which is primarily meningeal. HSV-1 is the most common cause of sporadic fatal encephalitis worldwide. Treat empirically with acyclovir while workup is ongoing." } },
    { type: "warning", content: { title: "Start Acyclovir Empirically", text: "Do not wait for HSV PCR results to start acyclovir. HSV encephalitis is treatable; delay increases mortality and morbidity. Start 10 mg/kg IV q8h and discontinue if HSV PCR returns negative and clinical picture doesn't fit." } },
    { type: "heading", content: { text: "Common Viral Causes and Treatment" } },
    { type: "table", content: { headers: ["Virus", "Epidemiology/Risk", "Treatment", "Notes"], rows: [["HSV-1", "Most common; any age; reactivation", "Acyclovir 10 mg/kg IV q8h × 14-21 days", "Temporal lobe involvement on MRI; keep hydrated to prevent AKI"], ["HSV-2", "Neonates; immunocompromised; recurrent meningitis", "Acyclovir 10 mg/kg IV q8h", "More common cause of recurrent 'Mollaret's' meningitis"], ["VZV", "Elderly; immunocompromised; post-zoster", "Acyclovir 10-15 mg/kg IV q8h", "May cause vasculitis → stroke; check VZV PCR AND IgG"], ["CMV", "Immunocompromised (HIV, transplant)", "Ganciclovir 5 mg/kg IV q12h", "Also consider valganciclovir for maintenance"], ["HHV-6", "Transplant recipients; limbic encephalitis", "Ganciclovir or foscarnet", "Associated with post-transplant limbic encephalitis"], ["West Nile Virus", "Mosquito-borne; summer/fall; elderly", "Supportive only", "Acute flaccid paralysis pattern; check IgM in CSF"], ["Enterovirus", "Summer; children; immunocompromised", "Supportive; IVIG for agammaglobulinemia", "Biofire PCR panel; hand-foot-mouth disease"], ["Rabies", "Animal bite; universally fatal once symptomatic", "Milwaukee protocol (unproven)", "Prevention: pre/post-exposure prophylaxis"]] } },
    { type: "heading", content: { text: "MRI Findings in Encephalitis" } },
    { type: "table", content: { headers: ["Pattern", "Suggests"], rows: [["Temporal lobe hyperintensity (DWI/FLAIR)", "HSV encephalitis — classic pattern"], ["Basal ganglia involvement", "Arboviral (EEE, WNV), autoimmune"], ["Limbic system (hippocampus, amygdala, cingulate)", "Autoimmune encephalitis (anti-NMDA, anti-LGI1)"], ["Cerebellitis (cerebellar hyperintensity)", "VZV, EBV, listeria, paraneoplastic"]] } },
    { type: "heading", content: { text: "Autoimmune Encephalitis" } },
    { type: "paragraph", content: { text: "Autoimmune encephalitis should be on the differential when CSF is non-diagnostic and clinical features include rapid behavioral change, psychiatric features, movement disorders, or seizures in a young patient. Order autoimmune encephalitis antibody panel on serum AND CSF." } },
    { type: "table", content: { headers: ["Antibody", "Clinical Syndrome", "Association"], rows: [["Anti-NMDAR", "Psychosis, catatonia, dyskinesias, autonomic instability", "Young women; ovarian teratoma (50%)"], ["Anti-LGI1", "Faciobrachial dystonic seizures, hyponatremia", "Middle-aged adults; rarely paraneoplastic"], ["Anti-CASPR2", "Morvan's syndrome, limbic encephalitis", "Middle-aged men; thymoma"], ["Anti-AMPAR", "Relapsing limbic encephalitis", "Lung/breast/thymoma"], ["Anti-GABAR", "Refractory SE, limbic encephalitis", "Lung cancer (SCLC)"]] } },
    { type: "heading", content: { text: "Immunocompromised CNS Infections" } },
    { type: "checklist", content: { items: ["Cryptococcus neoformans: India ink prep, cryptococcal antigen (serum + CSF); treat with amphotericin B + flucytosine", "JC virus (PML — Progressive Multifocal Leukoencephalopathy): white matter lesions; HIV with low CD4; no treatment", "Toxoplasma gondii: ring-enhancing lesions; empiric tx with pyrimethamine + sulfadiazine", "CNS aspergillosis: angioinvasive; treat with voriconazole", "CNS tuberculosis: basal meningitis pattern; start RIPE therapy"] } }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M11.L3 — Ventriculitis and Intracranial Abscess
// ─────────────────────────────────────────────────────────────────────────────
const m11l3Content = {
  blocks: [
    { type: "heading", content: { text: "Ventriculitis" } },
    { type: "paragraph", content: { text: "Ventriculitis is infection within the ventricular system, often associated with indwelling hardware (EVD, VP shunt). Diagnosis is clinical + CSF findings from EVD. Most organisms are nosocomial gram-negatives or Staphylococcus." } },
    { type: "callout", content: { icon: "info", title: "EVD Culture Caveat", text: "EVDs are antibiotic-coated, so gram stain and culture positivity is <20%. Low CSF glucose and CSF lactate >3.8 mmol/L are more useful diagnostic markers than culture alone." } },
    { type: "heading", content: { text: "Ventriculitis Diagnosis" } },
    { type: "table", content: { headers: ["Finding", "Supports Ventriculitis"], rows: [["CSF WBC elevated from EVD", "Especially if rising trend"], ["CSF lactate >3.8 mmol/L", "Sensitive marker even if culture negative"], ["CSF glucose low", "Suggests bacterial/fungal infection"], ["Positive CSF culture from EVD", "Definitive (but low sensitivity)"], ["Patient fever + altered mental status", "Clinical component of diagnosis"]] } },
    { type: "heading", content: { text: "Ventriculitis Treatment" } },
    { type: "paragraph", content: { text: "Empiric coverage: Vancomycin (MRSA coverage) + Cefepime 2g IV q8h (Pseudomonas and gram-negative coverage). May require hardware removal (discuss with neurosurgery). Duration typically 10-14 days after hardware removal or until CSF normalizes." } },
    { type: "heading", content: { text: "Intracranial Abscess and Empyema" } },
    { type: "paragraph", content: { text: "Intracranial abscesses can be brain parenchymal (abscess) or extra-axial (subdural empyema, epidural abscess). They arise from contiguous spread or hematogenous seeding." } },
    { type: "heading", content: { text: "Sources of Intracranial Abscess" } },
    { type: "table", content: { headers: ["Source", "Organisms", "Location"], rows: [["Sinusitis (frontal/ethmoid)", "Streptococci, anaerobes", "Frontal lobe, subdural empyema"], ["Dental abscess", "Streptococci viridans, anaerobes", "Temporal, frontal"], ["Mastoiditis/otitis", "Streptococci, gram-negatives, anaerobes", "Temporal, cerebellar"], ["Endocarditis", "Streptococci, Staphylococcus, HACEK", "Multiple, hematogenous"], ["Lung infection", "Anaerobes, Nocardia, Aspergillus", "Multiple"], ["No source found", "Streptococci (most common), Staphylococcus", "Variable"]] } },
    { type: "warning", content: { title: "DO NOT Perform LP for Suspected Abscess", text: "LP is contraindicated in intracranial abscess — risk of herniation from mass effect. Do NOT perform LP. Discuss surgical sampling with neurosurgery." } },
    { type: "heading", content: { text: "Abscess Workup" } },
    { type: "checklist", content: { items: ["Blood cultures × 2 (before antibiotics if possible)", "CT head with contrast (ring-enhancing lesion with mass effect)", "CT chest/abdomen/pelvis to find source", "TTE for endocarditis", "Dental panorex if dental source suspected", "Neurosurgery consult for surgical drainage/sampling"] } },
    { type: "heading", content: { text: "Empiric Antibiotic Treatment" } },
    { type: "paragraph", content: { text: "For community-acquired abscess: Vancomycin + Ceftriaxone + Metronidazole (for anaerobic coverage)\nFor post-surgical / nosocomial: Vancomycin + Meropenem\nDuration: typically 6-8 weeks total (4-8 weeks IV, then oral step-down if available)." } },
    { type: "callout", content: { icon: "info", title: "Corticosteroids in Abscess", text: "Use corticosteroids sparingly — only if significant vasogenic edema causing herniation risk. They can impair antibiotic penetration and mask clinical deterioration. Discuss with neurosurgery and ID." } }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M11.L4 — Traumatic Brain Injury: Classification, Monitoring, and Management
// ─────────────────────────────────────────────────────────────────────────────
const m11l4Content = {
  blocks: [
    { type: "heading", content: { text: "TBI Overview and Classification" } },
    { type: "paragraph", content: { text: "TBI is classified by severity, mechanism, and location. Severity is primarily determined by GCS score at presentation, though GCS alone has significant limitations — especially in intubated or sedated patients. The CBI-M framework provides a more comprehensive classification." } },
    { type: "heading", content: { text: "Glasgow Coma Scale (GCS)" } },
    { type: "table", content: { headers: ["Component", "Score", "Response"], rows: [["Eye Opening", "4", "Spontaneous"], ["Eye Opening", "3", "To voice"], ["Eye Opening", "2", "To pain"], ["Eye Opening", "1", "None"], ["Verbal", "5", "Oriented"], ["Verbal", "4", "Confused"], ["Verbal", "3", "Inappropriate words"], ["Verbal", "2", "Incomprehensible sounds"], ["Verbal", "1 (or T)", "None (or intubated)"], ["Motor", "6", "Follows commands"], ["Motor", "5", "Localizes pain"], ["Motor", "4", "Withdraws to pain"], ["Motor", "3", "Flexion (decorticate)"], ["Motor", "2", "Extension (decerebrate)"], ["Motor", "1", "None"]] } },
    { type: "callout", content: { icon: "info", title: "GCS Severity Classification", text: "Mild TBI: GCS 13-15 | Moderate TBI: GCS 9-12 | Severe TBI: GCS 3-8\n\nLimitation: GCS unreliable in intubated patients, those with toxins, or orbital/facial trauma." } },
    { type: "heading", content: { text: "CBI-M Framework (Comprehensive Classification)" } },
    { type: "paragraph", content: { text: "The CBI-M (Clinical-Biomarker-Imaging-Modifier) framework provides a more comprehensive TBI classification beyond GCS alone." } },
    { type: "table", content: { headers: ["Pillar", "Components"], rows: [["Clinical (Basic)", "GCS, pupillary reactivity score"], ["Clinical (Expanded)", "Injury signs, post-traumatic amnesia (PTA) duration, loss of consciousness (LOC) duration, altered mental status"], ["Clinical (Standardized)", "SCAT5 symptoms, cognitive function (BESS), vestibular-ocular function"], ["Biomarkers (within 24h)", "GFAP (Glial Fibrillary Acidic Protein), UCH-L1, S100B — help predict CT abnormality and severity"], ["Imaging", "CT classification (Marshall, Rotterdam), MRI for DAI/microhemorrhages"], ["Modifiers", "Age, pre-existing conditions, medications, alcohol/drugs"]] } },
    { type: "heading", content: { text: "TBI CT Classification — Marshall Score" } },
    { type: "table", content: { headers: ["Category", "CT Findings", "Mortality"], rows: [["I (Normal)", "No visible intracranial pathology", "~10%"], ["II (Diffuse injury)", "Cisterns present, no lesion >25cc, ± high/mixed density lesion ≤25cc", "~14%"], ["III (Diffuse with swelling)", "Cisterns compressed/absent, midline shift <5mm", "~34%"], ["IV (Diffuse + shift)", "Midline shift >5mm, no mass lesion >25cc", "~56%"], ["V (Evacuated mass)", "Any surgically evacuated lesion", "~"], ["VI (Non-evacuated mass)", "High/mixed density lesion >25cc not surgically evacuated", "~"]] } },
    { type: "heading", content: { text: "TBI Management Principles" } },
    { type: "checklist", content: { items: ["Prevent secondary injury: maintain CPP 60-70 mmHg, SpO2 >94%, PaCO2 35-40 mmHg, glucose 140-180, avoid fever (hyperthermia worsens outcome)", "ICP monitoring: indicated for GCS ≤8 with abnormal CT, or GCS ≤8 with normal CT + age >40, posturing, or SBP <90", "Target ICP <20-22 mmHg; treat with tiered protocol (see M09.L3)", "Coagulation management: reverse coagulopathy urgently in TBI + ICH", "Avoid hyponatremia (causes cerebral edema)", "DVT prophylaxis: delayed until hemorrhage stable (typically 48-72h)", "Nutrition: early enteral nutrition within 24-48h", "Seizure prophylaxis: levetiracetam × 7 days for severe TBI (prevents early PTS, not late)", "Surgical intervention: epidural hematoma (EDH) — most urgent; subdural hematoma (SDH) — if >10mm or midline shift >5mm; depressed skull fracture"] } },
    { type: "warning", content: { title: "Avoid Secondary Brain Injury at All Costs", text: "Hypotension (SBP <90 mmHg), hypoxia (SpO2 <90%), hyperthermia, hypoglycemia, and severe hypercarbia all worsen TBI outcomes dramatically. Even a single episode of hypotension or hypoxia doubles mortality. Vigilance is continuous." } }
  ]
};

const lessons = [
  { title: 'M11.L1 — Bacterial Meningitis: Empiric Treatment, LP Workup, and Complications', content: m11l1Content },
  { title: 'M11.L2 — Viral Encephalitis and CNS Immunocompromised Infections', content: m11l2Content },
  { title: 'M11.L3 — Ventriculitis and Intracranial Abscess', content: m11l3Content },
  { title: 'M11.L4 — Traumatic Brain Injury: Classification, Monitoring, and Management', content: m11l4Content },
];

async function populate() {
  console.log('🔧 Loading M11 content...\n');
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
