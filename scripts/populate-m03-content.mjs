#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...parts] = line.split('=');
    if (key && key.trim()) env[key.trim()] = parts.join('=').trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// =============================================================================
// M03.L1 — Pre-Rounding: From 0600 to 0800
// =============================================================================
const m03l1Content = {
  title: 'M03.L1 — Pre-Rounding: From 0600 to 0800',
  duration_min: 25,
  blocks: [
    {
      type: 'paragraph',
      content: {
        text: 'The two hours before attending rounds are the most information-dense of your day. Pre-rounding is where you transform overnight chaos into a coherent story — one you can present confidently, one that drives the right decisions at 8 AM. This lesson walks through the BNI/SJHMC NCC pre-round routine, step by step.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Target Arrival: ~0600',
        text: 'Aim to arrive around 0600 when your census allows it. Complex patients (post-op, multi-system, or unstable) may require an earlier start. You should be finished pre-rounding and have your plan formed before 0730 to allow time for any early surprises.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Step 1 — Orient Yourself' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Before touching any chart, do two things: get your ASCOM number and check TigerConnect for overnight messages. Your ASCOM number is your bedside phone contact — you need it before you are paged by nursing or pharmacy. Update your Cerner note signature with the ASCOM number at the start of every shift (see M03.L4 for note signature requirements).'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Task', 'Where / How', 'Why It Matters'],
        rows: [
          ['Get ASCOM number', 'Charge nurse or ASCOM station at shift start', 'Nurses page you to this number; must be updated in Cerner signature and on patient whiteboards'],
          ['Check TigerConnect', 'NCC Ice or Fire Resident 1/2 channel', 'Overnight events, coverage questions, labs that flagged — all may be there'],
          ['Confirm patient list', 'Cerner → NCC Ice or NCC Fire list', 'Census changes overnight; verify you have the correct list before you start charting']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Step 2 — Review Overnight Events' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'For each patient, your first chart stop is the overnight narrative — what actually happened while you were not there. This is the foundation of your presentation. Skim nursing notes for events, interventions, and any notable patient behaviors. Read any provider notes entered overnight (cross-cover note, PCCM note, respiratory therapy note).'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Where to find overnight events in Cerner',
        content: 'Nursing notes: Chart → Documentation → Nursing → filter by 1900–0600. Provider notes: Chart → Notes → filter by date. Vitals trend: Chart → Vitals → 24-hour view. Any critical value callbacks should appear in the message center or TigerConnect — check both.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'What counts as an overnight "event"',
        text: 'Acute neuro change, hemodynamic instability, new arrhythmia, unexpected desaturation, fever spike, new labs critical values, nursing concern documented, family call with questions, any unplanned intervention. If cross-cover was called for any reason — that is an event.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Step 3 — Labs' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Know your labs before rounds. Not just the results — know what changed, what you expected, and what is actionable. A sodium of 148 means nothing without context; a sodium trending from 142 → 145 → 148 on HTS means your rate needs adjustment and the attending needs to know.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Lab Panel', 'Check For', 'Common NCC Triggers'],
        rows: [
          ['BMP / CMP', 'Sodium (trend), potassium, creatinine, glucose', 'Na >155 or <130 on HTS → attending call; Cr bump → adjust renally-cleared meds'],
          ['CBC', 'Hemoglobin trend, WBC, platelets', 'Hgb <7 or drop >2 → transfusion discussion; plt <50 → hold procedures'],
          ['Coagulation (PT/INR, PTT)', 'Trend in anticoagulated patients', 'INR >1.5 → hold anticoagulation, discuss reversal if bleeding risk'],
          ['Osmolality (serum)', 'Required on all HTS patients', 'Osm >320 → discuss HTS rate reduction; gap >10 above calculated → recheck'],
          ['Drug levels (AEDs, vanc, etc.)', 'Trough timing, therapeutic range', 'Sub-therapeutic → load or increase dose; supratherapeutic → hold, recheck'],
          ['ABG / VBG', 'pH, PaCO2, PaO2, bicarb, lactate', 'pH <7.30 or >7.50, lactate >2 → investigate and likely attending call'],
          ['LFTs / ammonia', 'Hepatic patients, valproate users', 'NH3 elevation with AMS → adjust valproate, lactulose, liver consult consideration']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Step 4 — Imaging' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Pull up any imaging ordered or resulted overnight. Do not wait for radiology to read it — form your own gestalt first, then compare to the read. For head CTs and MRIs, compare to prior if available. Know whether imaging was ordered to answer a specific question, and whether it did.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Imaging review checklist',
        content: '1. Open the study in Cerner or the radiology viewer. 2. Compare side-by-side with most recent prior (hemorrhage, edema, hydrocephalus, midline shift). 3. Read the radiology report — note any "recommend clinical correlation" or "recommend follow-up imaging" language. 4. If the read changes your assessment, update your plan. 5. If imaging is critical and the attending has not been called — call now, do not wait for rounds.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Step 5 — Vent Settings and Respiratory Status' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'For all intubated patients, know the current vent settings and overnight trajectory before rounds. The respiratory therapist (RT) documents this in Cerner — review the RT flowsheet. You should be able to state the mode, rate, tidal volume, PEEP, FiO2, and peak/plateau pressures from memory during rounds.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Parameter', 'What to Know', 'Flag If...'],
        rows: [
          ['Mode', 'AC/VC, PRVC, PS, CPAP/PS', 'Mode was changed overnight — know why'],
          ['Rate / TV', 'Set rate, total rate (patient-triggered), tidal volume', 'Patient overbreathing significantly above set rate'],
          ['PEEP / FiO2', 'Current values and trend', 'FiO2 >0.60 or PEEP >10 → weaning discussion needed'],
          ['Peak / Plateau', 'Peak reflects flow, plateau reflects compliance', 'Plateau >30 → lung-protective concern; sudden peak rise → obstruction, pneumothorax'],
          ['SBT status', 'Has spontaneous breathing trial been attempted or planned?', 'If eligible, ensure SBT is ordered for the day']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Step 6 — Active Drips' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Every active IV drip should be on your mental checklist. Know the current rate and whether it changed overnight. Sedation drips require sedation scoring (RASS); pressor drips require MAP targets and trend; HTS requires osmolality and sodium trend; AED drips require drug levels.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Drip Category', 'Know Before Rounds'],
        rows: [
          ['Sedation (propofol, midazolam, dexmedetomidine, fentanyl)', 'Current rate, RASS goal, RASS trend overnight, CAM-ICU result'],
          ['Vasopressors (norepinephrine, vasopressin, phenylephrine)', 'Current dose, MAP goal, trend (weaning vs. escalating), volume status'],
          ['Hypertonic saline (2% or 23.4%)', 'Rate, sodium trend last 3 values, serum osmolality, clinical indication (ICP vs. hyponatremia)'],
          ['AED drips (lacosamide, levetiracetam, valproate infusion)', 'Rate, drug level, seizure activity since last dose'],
          ['Anticoagulation (heparin, argatroban)', 'Current rate, PTT/anti-Xa result, indication, target range'],
          ['Insulin infusion', 'Rate, glucose trend, time of last glucose check']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Step 7 — Build Your Assessment' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'With data in hand, build a systems-based assessment for each patient. Think by problem, not by organ system. Identify: (1) what changed overnight and why, (2) what your top concern is today, (3) what decisions need to be made at rounds. Your presentation (M03.L2) should flow directly from this mental map.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Know the attending\'s priorities',
        text: 'Every NCC attending has specific things they want tracked closely on their patients. If you pre-rounded for the first time with this attending, look at yesterday\'s note for their assessment and plan — that tells you what they cared about. Arrive at rounds knowing whether you are making progress on those issues.'
      }
    },
    {
      type: 'warning',
      content: {
        text: 'Do not pre-round by reading only the most recent note and recycling it. The purpose of pre-rounding is independent data synthesis — you should be able to tell the story even if the note did not exist. Attendings can tell the difference between a trainee who has reviewed the data and one who has paraphrased a note.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Pre-Round Summary Checklist' }
    },
    {
      type: 'table',
      content: {
        headers: ['✓', 'Task'],
        rows: [
          ['☐', 'ASCOM number obtained, updated in Cerner signature'],
          ['☐', 'TigerConnect reviewed for overnight messages'],
          ['☐', 'Patient list verified (Ice or Fire)'],
          ['☐', 'Overnight nursing notes reviewed per patient'],
          ['☐', 'Cross-cover / overnight provider notes reviewed'],
          ['☐', 'Morning labs reviewed with trend context'],
          ['☐', 'Overnight imaging reviewed with comparison'],
          ['☐', 'Vent settings and RT flowsheet reviewed for intubated patients'],
          ['☐', 'All active drips: rates, trends, targets confirmed'],
          ['☐', 'Problem-based assessment built — know your top concern per patient'],
          ['☐', 'Know the attending\'s top priorities from prior plan']
        ]
      }
    }
  ]
};

// =============================================================================
// M03.L2 — The APP Presentation Template: Pertinent Positives Only
// =============================================================================
const m03l2Content = {
  title: 'M03.L2 — The APP Presentation Template: Pertinent Positives Only',
  duration_min: 20,
  blocks: [
    {
      type: 'paragraph',
      content: {
        text: 'The NCC presentation format is built on a single principle: pertinent positives only. This is not a head-to-toe systems dump. It is a concise, problem-focused story that tells the attending what happened, where the patient is, and what decisions need to be made — in three minutes or less per patient. Master this format and rounds will run efficiently; miss it and you will slow the team down.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'The Guiding Question',
        text: 'Before every sentence you speak on rounds, ask: "Does this change what we do today?" If no — cut it. If yes — lead with it.'
      }
    },
    {
      type: 'heading',
      content: { text: 'The Five-Part NCC Presentation Structure' }
    },
    {
      type: 'table',
      content: {
        headers: ['Part', 'What to Cover', 'Target Length'],
        rows: [
          ['1. One-Liner', 'Patient name/age, primary diagnosis, day of admission or post-op day, reason still in NCC', '1 sentence'],
          ['2. Overnight Events', 'What changed, what was done about it, what the result was — only if something changed', '1–3 sentences, or "uneventful overnight" if nothing changed'],
          ['3. Vitals & Exam', 'Abnormal vitals only, targeted neuro exam (level of consciousness, focality, cranial nerves if relevant, motor, ICP if monitored)', '2–4 sentences'],
          ['4. Pertinent Data', 'Labs that changed or are actionable, new imaging, vent parameters if intubated — abnormals and trends only', '2–5 sentences'],
          ['5. Issues & Plan', 'By problem: active issue → current plan → today\'s decision or goal', '1–2 sentences per active issue']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Part 1: The One-Liner' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'The one-liner orients everyone in the room to who this patient is and why they are here. It should be second nature — you should be able to say it half-asleep at 2 AM. It sets the frame for everything that follows.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'One-liner examples',
        content: '"Mr. Garcia, 58-year-old male, day 3 from large right MCA ischemic stroke with dense left hemiplegia, still in NCC for hemodynamic monitoring on permissive hypertension."\n\n"Ms. Patel, 44-year-old female, post-op day 1 from anterior communicating artery aneurysm clipping, intubated, in NCC for vasospasm surveillance."\n\n"Mr. Thompson, 71-year-old male, refractory status epilepticus on propofol and lacosamide drips, NCSE on cEEG, day 6."\n\nNote: Include the day counter — it contextualizes everything.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Part 2: Overnight Events' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Lead with what changed. If nothing changed, say so explicitly — "uneventful overnight" is a full and acceptable report. If something did happen, describe it in action-result format: what occurred, what was done, what the result was.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Overnight events — examples',
        content: 'Uneventful: "Overnight was uneventful. No events."\n\nEvent with resolution: "Overnight, patient had a blood pressure spike to 210 systolic at 0200 — cross-cover gave labetalol 10 mg IV, BP returned to goal range within 30 minutes, remained there through the morning."\n\nOngoing event: "Patient had two breakthrough clinical seizures at 0130 and 0345 — cross-cover gave 2 mg lorazepam each time with termination, but cEEG is still showing interictal epileptiform discharges and this needs attending discussion at rounds."'
      }
    },
    {
      type: 'heading',
      content: { text: 'Part 3: Vitals and Exam' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'State the current vitals range (do not recite every individual value), then deliver a focused neurological exam. The neuro exam is the centerpiece — this is a Neuro ICU. Know the exam before you walk into rounds; do not read from the nursing note.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Exam Component', 'What to Report'],
        rows: [
          ['Level of consciousness', 'GCS or FOUR score, RASS if sedated, response to stimulation'],
          ['Orientation / cognition', 'Person, place, time, situation — report deficits, not "AAOx4" if not full'],
          ['Cranial nerves', 'Report only those relevant to the diagnosis (pupil response in TBI/herniation, EOM in brainstem lesions, facial symmetry in MCA stroke)'],
          ['Motor', 'Strength grade if cooperative, withdrawal/posturing pattern if not, pronator drift'],
          ['Language', 'Fluency, comprehension, repetition — one line summary'],
          ['ICP / CPP', 'If monitored: current ICP, MAP, CPP, trend, any waves'],
          ['Change from prior', 'Always state: "neuro exam is unchanged" OR "neuro exam has changed — [specify]"']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Part 4: Pertinent Data' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Report labs and imaging that are abnormal, trending, or actionable. Normals are assumed unless stated otherwise — do not recite them. For labs on a trajectory (sodium, hemoglobin, creatinine), give the trend: "Sodium trending up — 142, 145, 148 over the last 24 hours on 2% HTS at 30 mL/hr."'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Vent summary for intubated patients',
        text: 'For intubated patients, add a brief vent summary in Part 4: current mode, rate, FiO2, PEEP, plateau pressure, and SBT status. One sentence: "On PRVC, RR 14, FiO2 40%, PEEP 5, plateau 22 — appears to be a weaning candidate, SBT planned today."'
      }
    },
    {
      type: 'heading',
      content: { text: 'Part 5: Issues and Plan' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Present by active problem, not organ system. Each issue gets: what is the issue, what is the current approach, and what is today\'s decision or goal. Do not list every past medical history item as a problem unless it is active and relevant to care today.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Issue-by-issue plan format — example',
        content: '"Issue 1 — Hemorrhagic transformation of right MCA: Currently on permissive hypertension goal <160 systolic. BP has been compliant. Today\'s goal is to check repeat CT at 48 hours — imaging is ordered for 10 AM.\n\nIssue 2 — Airway: Intubated on day 2. Failed SBT yesterday secondary to secretion burden. Plan today to repeat SBT after bronchodilators, discuss with PCCM attending before extubation per protocol.\n\nIssue 3 — DVT prophylaxis: Still holding enoxaparin given hemorrhagic transformation. Goal to readdress with attending at 48-hour CT — if stable, begin LMWH."\n\nNote: Lead with the most urgent issue, not the primary diagnosis.'
      }
    },
    {
      type: 'heading',
      content: { text: 'What Not to Do' }
    },
    {
      type: 'warning',
      content: {
        text: 'Do not recite every normal lab value. Saying "sodium 140, potassium 4.0, chloride 102, CO2 24, BUN 14, creatinine 0.9, glucose 98" when all values are normal wastes two minutes per patient and trains your attendings to stop listening during the lab section — including when you have something important to say.'
      }
    },
    {
      type: 'warning',
      content: {
        text: 'Do not read the note aloud. Your presentation is a synthesized verbal communication, not a dictation. If you are looking at a screen and reading, you have lost the room. The note is a backup, not a script.'
      }
    },
    {
      type: 'warning',
      content: {
        text: 'Do not present non-events. If the foley urine output was 800 mL overnight and is unremarkable, do not mention it. If it was 180 mL in 8 hours on a MAP of 65 with rising creatinine — that is not a non-event. Context determines what matters.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Lead with your biggest worry',
        text: 'The first problem you present should be the one you are most concerned about today — not necessarily the primary diagnosis. If a subarachnoid hemorrhage patient is clinically stable but you are worried about early vasospasm, lead with vasospasm surveillance. The attending will set the direction from there.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Presentation Self-Assessment' }
    },
    {
      type: 'table',
      content: {
        headers: ['Question', 'If No → Fix Before Rounds'],
        rows: [
          ['Can I give the one-liner without looking at the chart?', 'Review the patient\'s name, age, diagnosis, and day every morning'],
          ['Do I know specifically what changed overnight?', 'Read nursing notes before touching the rest of the chart'],
          ['Can I describe the neuro exam in one paragraph without reading?', 'Examine your patients or verify with bedside RN before 0730'],
          ['Have I filtered my lab report to only actionable values?', 'Circle/highlight abnormals; ignore normals during presentation prep'],
          ['Do I know what decision needs to be made for each issue today?', 'The plan section drives the attending\'s agenda — know it cold']
        ]
      }
    }
  ]
};

// =============================================================================
// M03.L3 — Rounds Choreography
// =============================================================================
const m03l3Content = {
  title: 'M03.L3 — Rounds Choreography',
  duration_min: 20,
  blocks: [
    {
      type: 'paragraph',
      content: {
        text: 'Knowing how rounds work at BNI/SJHMC NCC — the logistics, the order, the roles, the pace — makes you a more effective team member from your first day. This lesson covers the physical and procedural choreography of morning rounds and what your responsibilities are before, during, and after.'
      }
    },
    {
      type: 'heading',
      content: { text: 'When and Where Rounds Start' }
    },
    {
      type: 'table',
      content: {
        headers: ['Day', 'Start Time', 'Notes'],
        rows: [
          ['Monday–Thursday', '8:00 AM', 'Rounds begin at first patient room'],
          ['Friday', 'After grand rounds', 'Grand rounds typically end ~8:30 AM; rounds start immediately after — be ready'],
          ['Weekend / holiday', '8:00 AM (or attending discretion)', 'Confirm with attending night before if uncertain']
        ]
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Be at the unit before rounds start',
        text: 'You should have finished pre-rounding and be physically on the unit by 0745 at the latest. Use the 0745–0800 window to brief team members on any overnight events that are not in the chart yet and to flag any patient who needs urgent attending contact before rounds begin.'
      }
    },
    {
      type: 'heading',
      content: { text: 'The Rounds Team' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'NCC rounds are a structured team event. Know who is expected to be there and what their role is. Missing team members affect the quality of real-time decisions.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Role', 'Rounds Responsibility'],
        rows: [
          ['NCC Attending', 'Drives clinical discussion, makes final decisions, teaches, sets pace'],
          ['NCC Fellow', 'Supervises residents/APPs, often provides procedural teaching or clinical detail'],
          ['Epilepsy Fellow', 'Present for EEG-monitored patients; interprets cEEG findings in real time'],
          ['Neurology Resident (Ice/Fire)', 'Presents patients, enters orders during rounds, takes notes on plan changes'],
          ['NSGY Resident (Ice team)', 'Present for post-op or consult patients; coordinates surgical plan'],
          ['APP (You)', 'Present patients, clarify orders, flag communication issues, update families'],
          ['Pharmacist', 'Reviews medications, flags interactions, provides dosing — use them actively'],
          ['Charge RN / Bedside RN', 'May round bedside; brief them after rounds even if not present']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'How Rounds Flow — Patient by Patient' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Rounds follow a consistent pattern for each patient. Understanding this pattern lets you anticipate the next step and stay ahead of the attending.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Step', 'What Happens', 'Your Role'],
        rows: [
          ['1. Outside room', 'APP or resident presents using the 5-part template (M03.L2)', 'Present confidently; do not read from screen unless referencing specific data'],
          ['2. Discussion', 'Attending drives clinical discussion, asks questions, teaches', 'Answer what you know; say "I don\'t know, I\'ll find out" rather than guessing'],
          ['3. Bedside exam (PRN)', 'Attending examines patient directly — may or may not happen every day', 'Step aside, observe, take note if exam finding changes the plan'],
          ['4. Plan confirmation', 'Attending states or confirms the plan for the day', 'Write down every plan element — this becomes your note and orders'],
          ['5. Order entry', 'Resident or APP enters orders in Cerner during or immediately after', 'Do not let orders accumulate — enter as you go to avoid misses'],
          ['6. Move to next patient', 'Team moves; you finalize any pending orders before following', 'Keep pace; flag "still entering orders" if needed so team doesn\'t wait']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Using the Pharmacist on Rounds' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'The pharmacist on rounds is a resource — use them actively, not as a bystander. If you have a medication question (dose adjustment for renal function, interaction with a new drug, appropriate AED level timing, HTS rate calculation), ask during rounds while they are there. Do not save medication questions for a separate TigerConnect message if the pharmacist is standing next to you.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Questions best asked directly to the pharmacist on rounds',
        content: '• AED dose adjustment after level result\n• Renal dose adjustment when creatinine changes\n• Compatibility of two new drips\n• Prograf/tacrolimus level interpretation post-transplant\n• Antibiotic selection or duration guidance\n• Osmotica calculation verification for HTS patients\n• Reversal agent dosing (e.g., 4F-PCC for warfarin, andexanet for apixaban)\n• Sedation wean calculation suggestions'
      }
    },
    {
      type: 'heading',
      content: { text: 'What Rounds Is NOT For' }
    },
    {
      type: 'warning',
      content: {
        text: 'Rounds is not the time for lengthy debates about a differential. If a topic needs extended discussion, say "I\'d like to discuss this further after rounds" and flag it. The team has multiple patients to see — one prolonged discussion delays everyone\'s care.'
      }
    },
    {
      type: 'warning',
      content: {
        text: 'Rounds is not the time to look up information you should have pre-rounded on. If the attending asks a question and you need to look it up — say so, then look it up after rounds and follow up with the answer. Never stall rounds while searching Cerner for data that should have been in your presentation.'
      }
    },
    {
      type: 'heading',
      content: { text: 'After Rounds — Your Immediate Obligations' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'The ten minutes after rounds are as important as rounds themselves. Use them to complete the transition from discussion to action.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Post-Rounds Task', 'Why It Cannot Wait'],
        rows: [
          ['Confirm all orders are entered and signed', 'Nursing cannot act on verbal plans; unsigned orders delay care'],
          ['Update Cerner note signature with ASCOM # and daytime end time', 'Nursing and pharmacy need to reach you — an outdated signature creates dangerous communication gaps'],
          ['Brief the bedside RN on the plan', 'The RN was not necessarily at rounds — they need to know what\'s coming (imaging, procedures, extubation attempt, family meeting)'],
          ['Send any TigerConnect messages triggered by rounds discussion', 'Consults, family notifications, pharmacy follow-ups — do them now before the next task absorbs your attention'],
          ['Flag any unresolved "discuss later" items', 'Create a physical or digital note so these don\'t fall through at signout']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'PM Rounds' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'PM rounds occur at the attending\'s discretion. Some attendings run a formal structured PM round; others do a brief bedside sweep of unstable patients. When PM rounds are scheduled, attend. When they are not, it is still your responsibility to check in informally on any patient who had an event or whose status changed after morning rounds.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Pre-signout patient updates',
        text: 'Before the 4:30–5 PM signout touch-base (M03.L5), do a brief re-check on any patient who was unstable or had a pending study at morning rounds. You should be able to say "here\'s where things landed" for each of your sicker patients — not just hand off a plan that was made at 8 AM.'
      }
    }
  ]
};

// =============================================================================
// M03.L4 — Note Discipline: H&P, Progress, Transfer, Death
// =============================================================================
const m03l4Content = {
  title: 'M03.L4 — Note Discipline: H&P, Progress, Transfer, Death',
  duration_min: 25,
  blocks: [
    {
      type: 'paragraph',
      content: {
        text: 'Your notes are the legal record, the communication backbone, and the handoff document. In the NCC, notes have specific types, structures, and timing requirements — many of which differ from general medicine or surgical wards. This lesson covers every required note type, what goes in each, and the common errors that create risk.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Note Signature Requirement — Every Shift',
        text: 'Every note you write must include in the signature block: (1) your ASCOM number for the current shift, (2) the time your daytime coverage ends, and (3) the overnight contact (the on-call cross-cover number or TigerConnect channel). This is not optional — it is how nursing and pharmacy reach you and your backup. Update it at the start of every shift.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Note Type 1: History & Physical (H&P)' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'The H&P is written on every new NCC admission. It is the foundational document — all subsequent progress notes reference back to it. It must be thorough, accurate, and completed in a timely manner (typically within 24 hours of admission; urgent or high-acuity admissions warrant same-session completion).'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['H&P Section', 'Required Content'],
        rows: [
          ['Chief Complaint (CC)', 'One line — the reason for NCC admission in the patient\'s or referring provider\'s words'],
          ['HPI', 'Timeline of events leading to admission; symptom onset, progression, prior workup, interventions before arrival; include code status discussion if relevant'],
          ['Past Medical / Surgical History', 'Comprehensive; flag conditions relevant to NCC management (prior strokes, seizure history, liver disease, cardiac history, prior neurosurgery)'],
          ['Medications', 'Full home medication list with doses; include anticoagulants, antiplatelets, AEDs, immunosuppressants — these are high-stakes in neuro ICU'],
          ['Allergies', 'Drug allergies with reaction type — not just "PCN" but "PCN → anaphylaxis"'],
          ['Social History', 'Tobacco, alcohol, substances (alcohol use disorder affects seizure threshold and withdrawal risk); living situation, functional baseline, advance directives status'],
          ['Family History', 'Relevant when hereditary conditions are on the differential (cerebral cavernomas, channelopathies, familial aneurysms)'],
          ['Physical Exam', 'Full vital signs, general appearance, full neuro exam (use NIHSS for stroke, GCS/FOUR for TBI/coma), relevant systemic exam'],
          ['Assessment by Problem', 'Each active problem stated, followed by the working differential or confirmed diagnosis, and the plan — one problem at a time, clearly separated'],
          ['Plan', 'Specific orders, consults, tests, goals of care discussion planned if needed; code status explicitly documented']
        ]
      }
    },
    {
      type: 'warning',
      content: {
        text: 'The H&P is not the place for a speculative paragraph dump. If you are not sure of the diagnosis yet, say so explicitly and state your differential in ranked order. Vague H&Ps that say "will continue workup" without specifying the workup create gaps that follow the patient through the hospitalization.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Note Type 2: Daily Progress Note' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Every patient, every day. The progress note is a SOAP-format document that captures the current state, your assessment, and the plan. It must be written or co-signed before signout — do not leave unsigned or incomplete progress notes at end of shift.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Section', 'What to Include'],
        rows: [
          ['Subjective', 'Patient-reported symptoms if communicative; nursing-reported events; family updates if relevant'],
          ['Objective', 'Vital signs (relevant range), neuro exam (your exam or verified nursing exam), pertinent labs and trend, imaging results, vent parameters if applicable, active drips'],
          ['Assessment', 'By problem — same structure as your verbal presentation in M03.L2. Each problem, one-line summary of status.'],
          ['Plan', 'Specific, actionable plan per problem. Avoid "continue current management" unless truly no change. State the target, the metric, and the decision point.'],
          ['Signature', 'Your name, ASCOM #, daytime coverage end time, overnight contact']
        ]
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Writing a tight progress note — practical tips',
        content: '1. Build the note from your rounds plan, not from the prior note. Copying and pasting prior notes without updating is a citation violation and a patient safety risk.\n2. The assessment section should reflect what YOU assessed today — if the neuro exam is unchanged, say "neuro exam unchanged from [date]" rather than copying the prior exam.\n3. Use the plan to drive orders — if your plan says "check cEEG in AM," the order should already be in Cerner.\n4. Document family communication: "Daughter called at 1430, updated on plan" — this matters for continuity and legal documentation.\n5. If there is a goals-of-care conversation happening, document the content in the note, not just "GOC discussed."'
      }
    },
    {
      type: 'heading',
      content: { text: 'Note Type 3: Co-Management Note' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'When the NCC team is co-managing a patient whose primary team is another service (neurosurgery, PCCM, general medicine), you write a co-management note in parallel. This note documents neurological assessment and recommendations without superseding the primary team\'s plan for their domain.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Co-Management Note Element', 'Content Standard'],
        rows: [
          ['Role identification', 'State explicitly: "This note represents NCC co-management of neurological issues"'],
          ['Neuro assessment', 'Full neuro exam, neurological problem list, status of each problem'],
          ['Recommendations to primary team', 'Specific recommendations — avoid vague language like "optimize medically"'],
          ['Orders', 'Routine neurological orders are within your scope; major decisions (airway, intubation, ICU escalation) require coordination with primary team'],
          ['Daily cadence', 'Written daily, same as progress note — co-management does not get a pass on documentation frequency']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Note Type 4: Consult Note' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'When NCC is the consulting service (or when you receive a consult from another service), a formal consult note is required for the initial assessment. Subsequent follow-up notes are written as needed based on the clinical situation.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Consult note structure',
        content: 'Header: "Neurocritical Care Consult Note"\nConsult question: Restate the specific question from the requesting team\nRelevant history: Focused review pertinent to the consult question\nExam: Focused exam relevant to the consult\nData review: Relevant labs, imaging, EEG\nImpression: Your clinical assessment of the consult question\nRecommendations: Numbered, specific, actionable — the requesting team should be able to act on each recommendation without having to interpret it\nFollow-up plan: Specify your follow-up cadence\nAttending: Note who supervised/was notified\n\nNote: Consult notes are formal communications — avoid hedging language like "may consider" when you mean "recommend." Be specific.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Note Type 5: Transfer Summary' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'A transfer summary is required before any patient moves out of the NCC — to a step-down unit, floor bed, or another facility. This is a critical safety document. Receiving teams rely on it to understand the patient\'s hospital course without having to reconstruct it from dozens of notes.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Transfer Summary Component', 'Required Detail'],
        rows: [
          ['Reason for transfer', 'Why leaving NCC now — stabilized, downgrade criteria met, family request, etc.'],
          ['Admitting diagnosis', 'Primary NCC diagnosis at admission and current active diagnoses'],
          ['Hospital course summary', 'Concise narrative — major events, procedures, treatment decisions, response to treatment'],
          ['Active issues', 'Each active problem listed with current status and ongoing plan'],
          ['Pending studies', 'Any test ordered but not yet resulted — the receiving team must know to follow up'],
          ['Downgrade team assignment', 'Ice patients → Blue team; Fire patients → Red team (verify with charge nurse)'],
          ['Family communication status', 'Who is the contact, what have they been told, any pending family meetings or difficult conversations'],
          ['Code status', 'Current code status, documented advance directives, any active goals-of-care discussions'],
          ['Medications', 'Key medication changes made during NCC stay, current active medications, any monitoring requirements (drug levels, renal dosing)']
        ]
      }
    },
    {
      type: 'warning',
      content: {
        text: 'Do not write a transfer summary that is a copy-paste of the H&P with "transfer" inserted at the top. The transfer summary must reflect the patient\'s current state and hospital course — it is a forward-looking document for the receiving team, not a historical archive.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Note Type 6: Death Note' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'When a patient dies in the NCC, a death note is required. It is a clinical and legal document. Write it promptly — do not delay documentation after time of death is called.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Death Note Element', 'Required Content'],
        rows: [
          ['Time of death', 'Exact time (HH:MM), date, who called it'],
          ['Circumstances of death', 'Brief narrative — what happened in the preceding hours/minutes, cause of death'],
          ['Resuscitation status', 'Was a code called? DNR/DNI in place? Who authorized? Efforts made or withheld per advance directive'],
          ['Attending notification', 'When attending was notified, what was discussed'],
          ['Family notification', 'Who was called, when, what they were told; was family present at time of death?'],
          ['Organ procurement', 'Was OPO (organ procurement organization) contacted? Outcome of discussion? Relevant if patient meets criteria for donation after death'],
          ['Coroner notification', 'Required in certain cases (trauma, unclear cause, unwitnessed death, certain forensic criteria) — document if coroner was contacted and their guidance']
        ]
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'After a patient dies',
        text: 'Notify your attending before writing the death note if they were not present. Family communication after death often involves the attending — do not handle a death in isolation. Your attending can provide guidance on family conversations, next steps, and organ procurement coordination. If you are unsure of the cause of death or circumstances, say so and involve your attending before documenting.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Note Type Quick Reference' }
    },
    {
      type: 'table',
      content: {
        headers: ['Note Type', 'Trigger', 'Frequency', 'Time Limit'],
        rows: [
          ['H&P', 'New NCC admission', 'Once per admission', 'Within 24h; same session for critical admits'],
          ['Daily Progress Note', 'Existing NCC patient', 'Every patient, every day', 'Before signout'],
          ['Co-Management Note', 'NCC co-managing another team\'s patient', 'Daily while co-managing', 'Before signout'],
          ['Consult Note', 'Formal consult received or placed', 'Once initial; then PRN follow-up', 'Same-day response expected'],
          ['Transfer Summary', 'Any NCC discharge/transfer', 'Once per transfer event', 'Before patient physically leaves NCC'],
          ['Death Note', 'Patient death', 'Once, at time of death', 'Promptly after death is pronounced']
        ]
      }
    }
  ]
};

// =============================================================================
// M03.L5 — Signout Workflows: Daytime, PM Attending, On-Call
// =============================================================================
const m03l5Content = {
  title: 'M03.L5 — Signout Workflows: Daytime, PM Attending, On-Call',
  duration_min: 20,
  blocks: [
    {
      type: 'paragraph',
      content: {
        text: 'Signout is the single highest-risk communication event in the NCC. Most adverse events that occur at night can be traced back to something that was not communicated at signout — a pending result, an expected change, a fragile patient whose deterioration was predictable. This lesson covers all three signout scenarios you will encounter.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'The Signout Standard',
        text: 'Any information you would act on yourself if you were staying — your relief needs to know it. If a result comes back at midnight and your relief says "nobody told me about that" — that is your signout failure.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Signout 1: Daytime Touch-Base (4:30–5 PM)' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Every day at 4:30–5 PM, the day team has a brief structured touch-base with the daytime NCC attending before coverage transitions. This is not a full signout to the night team — it is a status check with the attending so they leave knowing where every patient stands. Keep it efficient: one structured sentence per patient.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Patient Category', 'What to Cover'],
        rows: [
          ['Stable patients', '"Mr. Garcia — unchanged, all imaging complete, plan per rounds continues. No concerns."'],
          ['Patients with events since rounds', '"Ms. Patel — BP spike at 1400, managed with labetalol IV, back to goal. No neuro change. Plan: continue monitoring."'],
          ['Patients with pending actions', '"Mr. Thompson — MRI still pending from this morning, should result by 1800. If it shows [finding X], plan is [Y]."'],
          ['Patients requiring attending decision', '"Mrs. Lin — daughter called at 3 PM re goals of care. Family wants to meet. Suggest PM attending makes that call or schedules for tomorrow."']
        ]
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Use this time, not TigerConnect',
        text: 'Issues that need attending awareness before end of day should be raised at this touch-base in person — not sent via TigerConnect 30 minutes later after the attending has left. If you have something to flag, hold it for 4:30 PM or raise it during the day when it is urgent.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Signout 2: PM Attending Handoff' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'When there is a formal in-house attending change in the evening (Fire neurointensivist arriving, in-house PCCM attending coverage transition), a structured handoff is required for any patient who is unstable, has pending decisions, or has complex active issues. Use I-PASS or an equivalent structured format.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['I-PASS Element', 'NCC Application'],
        rows: [
          ['I — Illness severity', '"Sick / Watcher / Stable" — brief categorization so the incoming attending knows who to focus on first'],
          ['P — Patient summary', 'One-liner + active issues + status (same as your presentation one-liner)'],
          ['A — Action list', 'Specific tasks pending: results to follow, procedures planned, family calls expected'],
          ['S — Situation awareness', '"If the sodium rises above 155, call me / call attending immediately." Explicit contingency plans for anticipated events.'],
          ['S — Synthesis by receiver', 'Incoming attending or resident reads back the key contingency plan to confirm understanding — not optional for sick patients']
        ]
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'PM attending handoff — sick patient example',
        content: 'I — "Mr. Thompson is sick."\nP — "58M, day 6 refractory NCSE, on propofol and lacosamide drips, intubated. cEEG showing suppression-burst pattern now but had breakthrough seizure activity at 0330. Today\'s goal was breakthrough seizure control."\nA — "Pending: valproate level due at 1800 — if subtherapeutic, plan is to increase valproate IV by 5 mg/kg. Neurology fellow is aware. EEG read at 2200 by overnight epilepsy fellow."\nS — "If he has clinical seizure activity — call attending immediately. He\'s at his burst-suppression target and any clinical breakthrough means we need to escalate. Do not wait for vitals to normalize first."\nS (receiver reads back) — "Got it — if clinical seizure activity, call attending, don\'t wait."'
      }
    },
    {
      type: 'heading',
      content: { text: 'Signout 3: On-Call Signout (End of Shift to Cross-Cover)' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'The on-call signout is the most comprehensive and the most high-stakes. Every patient. Every active issue. Explicit "if X, do Y" instructions for your sick patients. Your cross-cover resident will manage these patients for 12+ hours without your context — you are their only briefing.'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Signout Element', 'Required For', 'Detail Level'],
        rows: [
          ['One-liner and active diagnoses', 'Every patient', 'Brief — same as rounds one-liner'],
          ['Overnight anticipated events', 'Every patient', 'What you expect to happen, and what to do about it'],
          ['Pending results', 'Every patient', 'What is pending, when expected, and what to do with the result'],
          ['Active drip parameters', 'Drip patients', 'Target, current rate, when to titrate, when to call'],
          ['Vent management', 'Intubated patients', 'Current settings, SBT planned or not, criteria for extubation if expected overnight'],
          ['Family contact', 'Any patient whose family may call', 'Name of contact person, what they have been told, any expected calls or conversations'],
          ['Explicit contingency plans', 'Sick, unstable, or concerning patients', '"If BP rises above X, give Y. If you see Z on the monitor, call attending and go to bedside immediately."'],
          ['Code status', 'All patients', 'Current code status — do not assume cross-cover knows']
        ]
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Structuring on-call signout — practical format',
        content: 'For each patient:\n1. Name, age, diagnosis, day\n2. Status: "Stable / Watching / Sick"\n3. Overnight events expected: "Probably uneventful" or "Watching for [X]"\n4. Drips/vents: current parameters and targets\n5. Pending: "MRI read by 2300 — if it shows new hemorrhage, call attending, do not wait until morning"\n6. Family: "Daughter may call — she knows father is comfort-focused, not pursuing aggressive resuscitation"\n7. Code status: "DNR/DNI in Cerner"\n8. If sick: read back one explicit contingency — "If you call about this patient, the attending will want to know [X, Y, Z]"\n\nRecommended tool: Use the NCC signout template in Cerner or TigerConnect — do not do verbal-only signouts for complex patients.'
      }
    },
    {
      type: 'heading',
      content: { text: 'What Not to Do at Signout' }
    },
    {
      type: 'warning',
      content: {
        text: 'Do not give verbal-only signout for any complex or unstable patient. Verbal handoffs have no record, are not searchable, and are forgotten or distorted by 2 AM. Use a written or electronic signout tool in Cerner for any patient with active drips, pending results, or contingency plans.'
      }
    },
    {
      type: 'warning',
      content: {
        text: 'Do not skip pending results at signout. A lab ordered at 1600 that results at 2000 with a critical value will be acted on by your cross-cover with no context for why it was ordered or what to do with the result — unless you told them. Every pending result needs: what it is, when it is expected, and what to do with it.'
      }
    },
    {
      type: 'warning',
      content: {
        text: 'Do not say "keep an eye on it." This instruction gives cross-cover no actionable threshold. Replace with: "If systolic BP rises above 160, give labetalol 10 mg IV and notify attending." Specificity is the difference between a safe handoff and a missed event.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Signout Self-Check' }
    },
    {
      type: 'table',
      content: {
        headers: ['Before You Leave, Ask Yourself:', 'If No → Fix It'],
        rows: [
          ['Has cross-cover acknowledged every sick patient by name?', 'Do not leave until they have — especially for patients on pressors, high-dose sedation, or with active seizures'],
          ['Have all pending results been listed with contingency plans?', 'Review your orders placed today — any lab or imaging that isn\'t resulted yet goes on the pending list'],
          ['Are all active drips and parameters communicated?', 'Drip patients without explicit parameters are a safety hazard overnight'],
          ['Is code status documented and verbally confirmed for all patients?', 'A code that should not be called at 3 AM — your cross-cover must know before you walk out'],
          ['Is your Cerner signature updated with the on-call cross-cover contact?', 'Nursing may call your ASCOM after your shift if the signature is not updated — this creates confusion and delay']
        ]
      }
    }
  ]
};

// =============================================================================
// M03.L6 — When to Call the Attending
// =============================================================================
const m03l6Content = {
  title: 'M03.L6 — When to Call the Attending',
  duration_min: 20,
  blocks: [
    {
      type: 'paragraph',
      content: {
        text: 'M01.L3 introduced the attending call trigger list as part of your orientation to NCC oversight. This lesson expands on that list with clinical rationale, common errors in call decision-making, and real-world scenarios. Internalizing when — and why — to call is one of the most important professional skills you will develop in the NCC.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'The Core Rule',
        text: 'If you are unsure whether to call — call. No attending has ever been angry at a trainee for calling when uncertain. Every attending has been angry at a trainee for not calling when they should have. The cost of an unnecessary call is one mildly interrupted night. The cost of a missed call can be a patient\'s life.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Trigger Category 1: Neurological Changes' }
    },
    {
      type: 'table',
      content: {
        headers: ['Trigger', 'Why It Cannot Wait', 'Common Error'],
        rows: [
          ['Any change in neuro exam', 'Neurological deterioration can be rapid and irreversible — early recognition enables intervention (imaging, reversal, surgery)', 'Waiting for "one more set of vitals" before calling; attributing exam change to sedation without attending verification'],
          ['Unexpected imaging finding', 'A new hemorrhage, evolving infarct, or herniation on imaging requires immediate decision-making that is above resident/APP scope', 'Self-reassuring that the finding is "probably artifact" or "likely stable" without confirming with attending'],
          ['New seizure activity (clinical or EEG)', 'Breakthrough seizures in a monitored patient indicate treatment failure; escalation decisions require attending direction', 'Giving lorazepam for breakthrough seizure without notifying attending, then not calling because "it terminated"'],
          ['Worsening ICP / loss of CPP', 'Intracranial hypertension is time-sensitive; delayed intervention increases secondary brain injury', 'Adjusting head of bed and osmotherapy without notifying attending that ICP is trending up']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Trigger Category 2: Hemodynamic and Cardiac' }
    },
    {
      type: 'table',
      content: {
        headers: ['Trigger', 'Why It Cannot Wait', 'Common Error'],
        rows: [
          ['Hypotension requiring pressor initiation or escalation', 'Pressor escalation indicates hemodynamic instability — the cause must be identified and the attending must direct resuscitation', 'Titrating up norepinephrine without calling because "BP responded" — responding to a pressor dose increase is not the same as being hemodynamically stable'],
          ['New arrhythmia (especially AFib with RVR, VT, heart block)', 'New arrhythmias may require urgent cardiology consult, rate/rhythm control, or may indicate a systemic cause needing urgent workup', 'Waiting to see if the rhythm resolves spontaneously; failing to confirm whether rhythm is new or chronic'],
          ['Troponin elevation (new or worsening)', 'Troponin rise may indicate neurogenic myocardial injury (Takotsubo, SAH-related) or acute coronary syndrome — management differs significantly', 'Filing it as "expected in SAH" without attendig discussion; missing true STEMI'],
          ['Required transfusion', 'Blood transfusion decisions in the neuro ICU involve threshold discussion specific to the diagnosis (e.g., permissive anemia may be acceptable in some patients, dangerous in others)', 'Transfusing to a generic Hgb <7 threshold without discussing with attending for neuro-specific considerations']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Trigger Category 3: Respiratory and Airway' }
    },
    {
      type: 'table',
      content: {
        headers: ['Trigger', 'Specific Nuance for NCC'],
        rows: [
          ['Worsening respiratory status', 'May represent neurogenic pulmonary edema, aspiration, or respiratory fatigue from bulbar weakness — cause is NCC-specific and may require specialty decision'],
          ['Intubation watch / impending intubation', 'Intubation in neuro patients requires RSI medication selection tailored to neuro physiology (avoid succinylcholine in hyperkalemic risk, use ketamine vs. propofol with ICP context)'],
          ['Non-invasive ventilation (NIV/BiPAP) start', 'NIV in NCC patients with obtundation is high-risk for aspiration — attending must weigh airway protection vs. NIV benefit'],
          ['Peak / plateau pressure change on existing vent', 'Rising plateau → loss of lung compliance; rising peak only → obstruction. Both require immediate assessment; plateau >30 is a hard discussion trigger.'],
          ['Pre-extubation planning', 'Extubation in NCC requires attending AND PCCM attending agreement — do not initiate extubation without confirmation from both services']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Trigger Category 4: Procedures and Surgery' }
    },
    {
      type: 'table',
      content: {
        headers: ['Trigger', 'Detail'],
        rows: [
          ['Central venous access needed', 'All CVC placements in NCC require attending notification — you do not place lines without attending knowledge and (when relevant) supervision'],
          ['Pre-antibiotic initiation', 'For new infections, call attending before starting antibiotics — de-escalation is much harder than choosing the right first-line agent from the start'],
          ['NSGY plan for emergent OR', 'If neurosurgery is planning emergent OR (for hematoma, shunt malfunction, craniectomy) — NCC attending must be notified; they co-manage anesthetic decisions'],
          ['Unplanned or major procedure', 'LP, EVD placement, arterial line in a difficult patient, bedside tracheostomy — call attending; do not perform unplanned procedures in isolation'],
          ['Emergent or time-critical decision', 'tPA administration, endovascular window, emergent decompressive craniectomy decision — attending must make or directly supervise all time-critical interventions']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Trigger Category 5: End-of-Life and Sentinel Events' }
    },
    {
      type: 'table',
      content: {
        headers: ['Trigger', 'Detail'],
        rows: [
          ['Unexpected death', 'Call attending immediately, before documentation, before family notification. Attending must be informed before family hears.'],
          ['Code Blue', 'Notify attending during or immediately after code — they may want to be present, direct resuscitation, or speak with family'],
          ['Goals-of-care conversation needed urgently', 'Do not have a high-stakes goals-of-care conversation (withdrawing care, comfort measures only) without attending involvement — these are attending-led conversations'],
          ['Family is requesting to speak with a physician', 'For complex, emotionally charged, or decision-heavy conversations — get your attending. You can speak with families, but involve attending for major news.']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'The Decision Framework: Should I Call?' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'When you find yourself debating whether to call, run through this quick three-question check:'
      }
    },
    {
      type: 'table',
      content: {
        headers: ['Question', 'If Yes → Call'],
        rows: [
          ['Would I want to know about this if I were the attending?', 'Nearly always yes for any acute change, unexpected finding, or deterioration'],
          ['Is the decision I\'m about to make above my training level?', 'Escalation decisions, procedural decisions, family conversations about prognosis or withdrawal'],
          ['Am I unsure?', 'Full stop — call. Uncertainty is its own indication.']
        ]
      }
    },
    {
      type: 'heading',
      content: { text: 'Common Errors in Call Decisions' }
    },
    {
      type: 'warning',
      content: {
        text: '"One more set of vitals." This is the most common delay error in the NCC. If a patient is hypotensive at 0200, the attending should be called when you recognize the pattern — not after you have drawn another BMP, checked the urine output, given a fluid bolus, and waited 30 minutes to see if it helped. Call while you are gathering data, not after you have exhausted your independent options.'
      }
    },
    {
      type: 'warning',
      content: {
        text: '"It\'s 3 AM and I don\'t want to wake them." This reasoning has cost patients their lives. NCC attendings accepted a position that requires overnight calls — they are not doing you a favor by being reachable, it is their job. The right call at 3 AM is always better than the wrong outcome at 8 AM.'
      }
    },
    {
      type: 'warning',
      content: {
        text: 'Troubleshooting a problem beyond your independent scope without backup. If you find yourself on your third intervention for a problem that is not responding — stop and call. Each additional intervention without attending guidance increases the risk of compounding errors.'
      }
    },
    {
      type: 'heading',
      content: { text: 'How to Call the Attending' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'When you call, be ready to give a brief structured summary: who you are, which patient, what happened, what you have done, and what you need. Do not call and then say "I just wanted to let you know." Know what you are asking for before you dial.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Call structure — SBAR format',
        content: 'S — Situation: "This is [your name], NCC resident. I\'m calling about Mr. Thompson in bed 14."\nB — Background: "He\'s day 6 refractory NCSE on propofol and lacosamide drips."\nA — Assessment: "He just had a clinical seizure lasting 90 seconds that terminated spontaneously. cEEG fellow is looking at the tracing now. His valproate level from 1800 was 62 — subtherapeutic."\nR — Recommendation/Request: "I\'d like to increase the valproate IV dose and I want to confirm that\'s the right next step, or if you want to come in."\n\nHave the chart open when you call. Be ready to read vitals, drip rates, and current medications.'
      }
    },
    {
      type: 'heading',
      content: { text: 'Clinical Scenarios — Call or Wait?' }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'It is 0130. You are covering cross-call. Mrs. Nguyen is a 67-year-old woman with a large right MCA ischemic stroke on permissive hypertension (goal SBP < 180). Her nurse calls you because her blood pressure is 192/110. She is on no antihypertensives. Her neuro exam is unchanged from admission (dense left hemiplegia, left gaze preference). She has no drips running.',
        role: 'Cross-cover NCC resident',
        correct_action: 'CALL THE ATTENDING. BP above the permissive hypertension target with a large MCA stroke is not a routine titration — decisions about whether to treat, with what agent, and to what target must involve the attending. The key error here is treating to a generic BP number without attending guidance in a patient on intentional permissive hypertension. Call, state the BP, confirm the plan, then act.'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'It is 0340. Mr. Okonkwo is a 52-year-old man on post-op day 2 from ACA aneurysm clipping. He has a post-op ventriculostomy (EVD) for hydrocephalus management. The EVD has been clamped for a 4-hour trial per the neurosurgery plan. The nurse calls you because ICP on the monitor (EVD transducing during clamp trial) has risen from 12 to 28 over the past 20 minutes and the patient appears less arousable.',
        role: 'NCC cross-cover resident',
        correct_action: 'CALL THE ATTENDING AND NEUROSURGERY IMMEDIATELY — do this simultaneously or call NCC attending first while RN pages NSGY. Rising ICP to 28 with declining arousal during a clamp trial is a failed clamp trial — the EVD should be reopened. However, reopening the EVD after a clamp trial may require neurosurgery authorization. Do not wait; do not reopen the EVD independently without guidance; notify both teams in parallel. This is a time-sensitive intervention.'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'It is 0510. Ms. Rivera is a 38-year-old woman on day 4 from a subarachnoid hemorrhage (Fisher grade 3, Hunt-Hess grade 2). She is not intubated and has been neurologically stable. The nurse calls you because she is complaining of a new "really bad headache" — 8/10, different from her prior headache. Vital signs: BP 158/94, HR 82, SpO2 97% on room air. She is oriented.',
        role: 'NCC cross-cover resident',
        correct_action: 'CALL THE ATTENDING. New or worsening headache in an SAH patient must be treated as re-bleed until proven otherwise. This is a red flag symptom regardless of how stable she appeared. The attending needs to know, a STAT head CT must be ordered, and clinical reassessment must happen now — not after you decide whether her headache seems "serious enough." The correct error-avoiding action is to call first, then order the CT while waiting for attending callback. Do not reassure, do not give pain medication without a plan for emergent imaging.'
      }
    }
  ]
};

// =============================================================================
// Lesson registry
// =============================================================================
const lessons = [
  { title: 'M03.L1 — Pre-Rounding: From 0600 to 0800',                    content: m03l1Content },
  { title: 'M03.L2 — The APP Presentation Template: Pertinent Positives Only', content: m03l2Content },
  { title: 'M03.L3 — Rounds Choreography',                                 content: m03l3Content },
  { title: 'M03.L4 — Note Discipline: H&P, Progress, Transfer, Death',    content: m03l4Content },
  { title: 'M03.L5 — Signout Workflows: Daytime, PM Attending, On-Call',  content: m03l5Content },
  { title: 'M03.L6 — When to Call the Attending',                          content: m03l6Content },
];

// =============================================================================
// Main populate function
// =============================================================================
async function populate() {
  console.log('📚 Loading M03 content into Supabase...\n');

  for (const lesson of lessons) {
    const { data, error: findError } = await supabase
      .from('module_lessons')
      .select('id, title')
      .eq('title', lesson.title)
      .single();

    if (findError || !data) {
      console.log(`❌ Not found: "${lesson.title}"`);
      if (findError) console.log(`   Error: ${findError.message}`);
      continue;
    }

    const { error: updateError } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(lesson.content) })
      .eq('id', data.id);

    if (updateError) {
      console.log(`❌ Update failed for "${lesson.title}": ${updateError.message}`);
      continue;
    }

    console.log(`✅ ${lesson.title} — ${lesson.content.blocks.length} blocks`);
  }

  console.log('\n✨ Done! M03 content loaded.');
}

populate().catch(console.error);
