#!/usr/bin/env node
// Enriches M11-M13 lessons with APP-focused intro callouts + SVG images
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => { if(line&&!line.startsWith('#')){const[k,...v]=line.split('=');env[k.trim()]=v.join('=').trim();} });
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {auth:{autoRefreshToken:false,persistSession:false}});

function insertAfterType(blocks, type, block, nth = 1) {
  let count = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].type === type) { count++; if (count === nth) { blocks.splice(i + 1, 0, block); return blocks; } }
  }
  blocks.push(block); return blocks;
}
const img = (url, caption) => ({ type: 'image', content: { url, caption } });
const appCallout = (text) => ({ type: 'callout', content: { icon: 'info', title: '🩺 Your Role as NCC APP', text } });

const enrichments = [
  // ── M11: CNS Infections & TBI ──────────────────────────────────────────
  {
    title: 'M11.L1 — Bacterial Meningitis: Empiric Treatment, LP Workup, and Complications',
    appText: 'The APP initiates empiric antibiotics before the LP in most cases — do not hold treatment waiting for imaging or spinal tap setup. Know the regimen cold: Vancomycin + Ceftriaxone for standard adults; add Ampicillin for age >50, alcoholics, or immunocompromised. Give dexamethasone before or with the first dose for suspected pneumococcal meningitis. Document opening pressure on every LP. Droplet precautions for N. meningitidis — protect yourself and the team.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m11-meningitis-workup.svg', caption: 'Bacterial vs. viral CSF profile and empiric antibiotic decision tree. Low glucose + high lactate (>3.5) strongly favor bacterial etiology. Pip/tazo has poor CNS penetration — never use for CNS infections. Dexamethasone 10mg q6h × 4 days reduces hearing loss in pneumococcal meningitis — give before or with first antibiotic dose.' },
    ]
  },
  {
    title: 'M11.L2 — Viral Encephalitis and CNS Immunocompromised Infections',
    appText: 'Acyclovir is the APP\'s empiric bridge for encephalitis — start 10 mg/kg q8h while the workup is pending. HSV encephalitis is treatable and fatal without treatment; the risk of acyclovir (hydration-preventable AKI) is far less than the risk of undertreating. For immunocompromised patients, broaden your differential aggressively: Cryptococcus, CMV, Toxoplasma, JC virus, PML. Order the Biofire meningitis/encephalitis PCR panel on every LP — it changes management.',
    images: []
  },
  {
    title: 'M11.L3 — Ventriculitis and Intracranial Abscess',
    appText: 'For ventriculitis, you are managing an infection inside hardware that has limited culture sensitivity. Treat empirically based on nosocomial pathogens (Vancomycin + Cefepime) and discuss hardware removal with neurosurgery early — hardware in place prolongs infection. For brain abscess: do NOT perform LP (herniation risk from mass effect). Get blood cultures × 2, then start Vancomycin + Ceftriaxone + Metronidazole. Neurosurgery decides on surgical drainage — your job is cultures and antibiotics.',
    images: []
  },
  {
    title: 'M11.L4 — Traumatic Brain Injury: Classification, Monitoring, and Management',
    appText: 'TBI secondary injury prevention is APP-driven and continuous. Your targets: SBP >90 mmHg, SpO2 >94%, PaCO2 35-40, glucose 140-180, normothermia, CPP 60-70 mmHg. Even ONE episode of hypotension or hypoxia doubles mortality — this is not an exaggeration. Check ABGs after any ventilator change. The ICP monitor goes in for GCS ≤8 with abnormal CT. Seizure prophylaxis (levetiracetam × 7 days) prevents early post-traumatic seizures — start on admission for severe TBI.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m11-tbi-severity.svg', caption: 'TBI severity by GCS and secondary injury prevention targets. Mild = GCS 13-15, Moderate = 9-12, Severe = 3-8. The severity classification guides monitoring intensity and ICP monitoring thresholds. Secondary injury prevention checklist: every target matters, every episode of hypotension/hypoxia counts.' },
    ]
  },

  // ── M12: Sepsis, Shock & Arrhythmias ────────────────────────────────────
  {
    title: 'M12.L1 — Sepsis: Recognition, Source Control, and Antibiotics',
    appText: 'Neuro ICU patients cannot tell you they feel sick. You must recognize sepsis from objective signs: elevated/low WBC, unexplained fever or hypothermia, tachycardia, hypotension, rising lactate, or unexplained mentation decline. Antibiotics within one hour of recognition — each hour of delay increases mortality ~7%. Order MRSA nares swab with every Vancomycin order; de-escalate when culture data returns. Pip/tazo is fine for pneumonia — do NOT use for CNS infections (poor CNS penetration).',
    images: []
  },
  {
    title: 'M12.L2 — Shock: Classification, Hemodynamics, and Vasopressors',
    appText: 'Identify shock type at the bedside with POCUS, skin temperature, neck veins, and pulse pressure — you cannot always wait for a PA catheter. Start norepinephrine peripherally while central access is being obtained; early vasopressors save organs. For brain-injured patients, MAP target is higher than the standard sepsis goal: target MAP 70-80 to maintain CPP. Avoid phenylephrine in cardiogenic shock. Use vasopressin to spare norepinephrine dose.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m12-shock-types.svg', caption: 'Four shock types and their bedside hemodynamic signatures. Warm skin + flash capillary refill = distributive (septic or neurogenic). Cool skin + distended neck veins + big heart = cardiogenic. Bedside echo (POCUS) differentiates cardiogenic (↓LVEF) from obstructive (RV strain, septal bowing in PE) from hypovolemic (hyperdynamic LV, small chambers).' },
      { after: 'table', nth: 1, url: '/images/lessons/m12-vasopressor-guide.svg', caption: 'Vasopressor quick reference. Norepinephrine is first-line for almost all shock. Add vasopressin at 0.03 units/min to spare NE dose and reduce tachycardia. Dobutamine is an INOTROPE — add it for cardiogenic shock. Never use phenylephrine in cardiogenic shock (increases afterload). Start peripherally — do not delay for central access.' },
    ]
  },
  {
    title: 'M12.L3 — Atrial Fibrillation with RVR and Bradyarrhythmias',
    appText: 'AFib with RVR in the neuro ICU is rate control, not rhythm control. Your first moves: replace K (>4) and Mg (>2) regardless of levels, consider IV fluids, then Metoprolol 5mg IV push up to × 3. Avoid metoprolol/diltiazem if the patient is hypotensive — switch to amiodarone. Cardioversion is a last resort and requires attending presence. For bradycardia: Cushing\'s reflex (hypertension + bradycardia) means herniation — this is not a cardiac rhythm problem, it is a neurological emergency.',
    images: []
  },
  {
    title: 'M12.L4 — Pulmonary Embolism and Obstructive Shock',
    appText: 'Most neuro ICU patients with ICH or recent neurosurgery are NOT eligible for systemic tPA — call the PE response team (PERT) immediately for embolectomy options. IVC filter is the bridge for patients with PE who cannot be anticoagulated. For tension pneumothorax: diagnose clinically (sudden ↑ peak pressures + absent breath sounds) and needle decompress IMMEDIATELY — 14G angiocath, 2nd intercostal space, midclavicular line. Do not wait for X-ray. Chest tube always follows needle decompression.',
    images: []
  },

  // ── M13: Supportive Care Pearls ──────────────────────────────────────────
  {
    title: 'M13.L1 — Sodium and Fluid Management: SIADH, CSW, and Hypernatremia',
    appText: 'Sodium dysregulation is a daily APP task in SAH and post-op neuro patients. Check BMP q6h in the acute phase. SIADH and CSW look identical on labs — treat them the same in neuro ICU (IV fluids + HTS + fludrocortisone). NEVER fluid restrict a SAH patient — hypovolemia worsens vasospasm and outcomes. Know your correction rate: max 8-10 mEq/L per 24 hours or you risk osmotic demyelination. If you overcorrect, give D5W to bring sodium back down.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m13-sodium-management.svg', caption: 'SIADH vs CSW: both present with hyponatremia + high urine sodium + high urine osmolality. Key difference: CSW is hypovolemic; SIADH is euvolemic. In neuro ICU, treat both the same — volume + HTS + fludrocortisone. Never fluid restrict. Max correction rate 8-10 mEq/L per 24h. Overcorrect → give D5W to lower sodium.' },
    ]
  },
  {
    title: 'M13.L2 — DVT Prophylaxis, BP Management, and Glucose Control',
    appText: 'DVT prophylaxis timing is a rounds decision you own. Know the timing by diagnosis (SQH immediately for ischemic stroke, held until aneurysm secured for SAH, 24-48h post-ICH). For BP management, never react to a single cuff reading — verify with arterial line if available. Avoid hydralazine in any acute brain injury — impairs autoregulation. For glucose, target 140-180 mg/dL; hypoglycemia <70 mg/dL is more dangerous than moderate hyperglycemia and must be corrected immediately with D50W.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m13-dvt-prophylaxis.svg', caption: 'DVT prophylaxis timing by neuro ICU diagnosis. SQH 5000 units q8h is universal (>110 kg: 7500 q8h). Timing varies by diagnosis — held until aneurysm secured in SAH, 24-48h after CT stability in ICH. Per PREVAIL trial, Lovenox 40mg daily is superior to UFH for eligible patients once anticoagulation cleared.' },
    ]
  },
  {
    title: 'M13.L3 — AKI, Pain Management, and Anti-Emetics',
    appText: 'For AKI: rule out obstruction first (bladder scan), then review the medication list for nephrotoxins. Do not reflexively hold CT contrast — the evidence for contrast-induced nephropathy is weak and the diagnostic benefit of the scan almost always wins. For pain: fentanyl is the preferred ICU opioid (no active metabolites, rapid titration). Avoid hydromorphone in stroke patients (neuroexcitatory metabolite). Tramadol lowers seizure threshold — avoid in seizure patients. For N/V: ondansetron first line, avoid metoclopramide/haloperidol in Parkinson\'s.',
    images: []
  },
  {
    title: 'M13.L4 — CT and MRI Basics for the Neuro ICU',
    appText: 'You will read imaging before the radiologist calls. Know your windows: switch to stroke window (C40/W40) to see early ischemia — the insular ribbon sign and dense MCA sign are invisible on standard brain window. For MRI: bright DWI + dark ADC = true restriction = acute stroke or abscess. Bright DWI + bright ADC = T2 shine-through = not acute ischemia. SWI/GRE is your hemorrhage detector — catches microbleeds and hemosiderin that T1 and T2 miss.',
    images: [
      { after: 'paragraph', nth: 1, url: '/images/lessons/m13-ct-windows.svg', caption: 'CT windowing guide. Standard brain window (C40/W80) shows most anatomy. Stroke window (C40/W40) narrows the range to detect subtle gray-white loss in early ischemia — switch to this for any stroke concern. Bone window (C600/W2000) for skull fractures. Fresh blood = 50-80 HU (bright white). CSF = 0 HU (dark).' },
      { after: 'table', nth: 1, url: '/images/lessons/m13-mri-sequences.svg', caption: 'MRI sequence reference: T1 for anatomy/enhancement. T2/FLAIR for edema and white matter. DWI for acute ischemia (bright within minutes of onset). ADC confirms DWI — dark ADC = true restriction. SWI for microbleeds, hemosiderin, DAI, cavernous malformations. DWI bright + ADC bright = T2 shine-through, NOT acute stroke.' },
    ]
  },
];

async function enrich() {
  console.log('🔧 Enriching M11–M13 with APP focus + images...\n');
  let updated = 0, skipped = 0;
  for (const def of enrichments) {
    const { data, error: fetchErr } = await supabase.from('module_lessons').select('id,title,content').eq('title', def.title).single();
    if (fetchErr || !data) { console.log(`❌ Not found: ${def.title}`); skipped++; continue; }
    let parsed;
    try { parsed = JSON.parse(data.content); } catch(e) { console.log(`❌ JSON parse error: ${def.title}`); skipped++; continue; }
    let blocks = parsed.blocks || [];
    blocks = blocks.filter(b => !(b.type === 'callout' && b.content?.title === '🩺 Your Role as NCC APP'));
    blocks.unshift(appCallout(def.appText));
    for (const imgDef of def.images) {
      blocks = blocks.filter(b => !(b.type === 'image' && b.content?.url === imgDef.url));
      insertAfterType(blocks, imgDef.after, img(imgDef.url, imgDef.caption), imgDef.nth);
    }
    parsed.blocks = blocks;
    const { error: updateErr } = await supabase.from('module_lessons').update({ content: JSON.stringify(parsed) }).eq('id', data.id);
    if (updateErr) { console.log(`❌ Update failed: ${def.title} — ${updateErr.message}`); skipped++; }
    else { console.log(`✅ ${def.title} — ${blocks.length} blocks (${def.images.length} image(s))`); updated++; }
  }
  console.log(`\n✨ Done — ${updated} updated, ${skipped} skipped.`);
  process.exit(0);
}
enrich().catch(console.error);
