#!/usr/bin/env node
// Loads M01.L3 and M01.L4 full content into the database
// Converts lesson content into the blocks format expected by LessonRenderer

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
    env[key.trim()] = parts.join('=').trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// ─── M01.L3 Content ────────────────────────────────────────────────────────

const m01l3Content = {
  title: 'The NCC Team: Ice, Fire, and Everyone Around You',
  duration_min: 20,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    { type: 'paragraph', content: { text: '1. Distinguish Ice and Fire teams by patient list, daytime attending, nighttime coverage, and downgrade pathway.' } },
    { type: 'paragraph', content: { text: '2. Describe the attending coverage windows across the 24-hour cycle, including when the night neurointensivist is in-house versus phone-only.' } },
    { type: 'paragraph', content: { text: '3. Identify every team role — residents, fellows, pharmacy, RT, nursing, EEG, social work, and therapy — and what each is responsible for.' } },
    { type: 'paragraph', content: { text: '4. Select the correct TigerConnect role for any scenario based on time of day and question type.' } },

    { type: 'callout', content: { icon: 'info', title: 'Why This Lesson Matters', text: 'On your first admission at 2 AM, you will need to know exactly who to call and where to reach them. There is no time to guess. This lesson is your map of the team — not just names, but the logic of how coverage works, who owns what, and when to loop in each role.' } },

    { type: 'heading', content: { text: 'Section 1 — Ice vs. Fire: The Two Parallel Teams' } },
    { type: 'paragraph', content: { text: 'NCC runs two simultaneous teams covering the 4NBC and 4NNC pods. They carry separate patient lists, have separate attending structures, and downgrade to different general neurology teams.' } },
    {
      type: 'table',
      content: {
        headers: ['', 'Ice', 'Fire'],
        rows: [
          ['Patient list', 'NCC Ice', 'NCC Fire'],
          ['Daytime attending', 'Ice attending', 'Fire attending'],
          ['Night attending', 'Fire (via TigerConnect)', 'Fire (in-house until ~midnight)'],
          ['Downgrades to', 'Blue team', 'Red team'],
        ]
      }
    },
    { type: 'paragraph', content: { text: 'Your patients follow their team\'s attending during the day. You always know which attending is running your list.' } },
    { type: 'paragraph', content: { text: 'At night, the Fire attending stays in-house until roughly midnight on most weeks. After midnight, both Ice and Fire night coverage is by phone — route through the NCC attending TigerConnect role.' } },
    { type: 'paragraph', content: { text: 'PCCM attending is in-house 24/7 and is a co-management partner for all ICU-level pulmonary and critical care issues.' } },
    { type: 'callout', content: { icon: 'info', title: 'Downgrade rule', text: 'When a patient downgrades, the destination team is determined by which NCC team they\'re on — Ice patients go to Blue, Fire patients go to Red. Know this before you initiate a downgrade conversation.' } },

    { type: 'heading', content: { text: 'Section 2 — Attending Coverage Windows' } },
    { type: 'paragraph', content: { text: 'Understanding when the attending is physically present versus available by phone is essential for knowing how urgently you need to move on a problem.' } },
    {
      type: 'table',
      content: {
        headers: ['Window', 'Coverage'],
        rows: [
          ['Rounds', '8 AM (or after grand rounds on Fridays)'],
          ['PM rounds', 'At attending discretion'],
          ['4:30–5 PM', 'Signout touch-base with daytime attending'],
          ['Evening (until ~midnight)', 'Fire neurointensivist in-house'],
          ['After midnight', 'Phone coverage — use NCC Attending TigerConnect role'],
          ['24/7', 'PCCM attending in-house for pulmonary/critical care issues'],
        ]
      }
    },
    { type: 'callout', content: { icon: 'warning', title: 'Call, don\'t wait', text: 'Overnight phone coverage is still real coverage. Do not sit on a problem because you don\'t want to call. If you\'re asking yourself "should I call?" — call.' } },

    { type: 'heading', content: { text: 'Section 3 — When to Call the Attending' } },
    { type: 'paragraph', content: { text: 'These are non-negotiable triggers. Any one of them means you call the attending — not after you\'ve "worked it up," not after the next set of vitals. Now.' } },
    { type: 'paragraph', content: { text: 'Neurological: Change in neuro exam. Unexpected imaging findings.' } },
    { type: 'paragraph', content: { text: 'Cardiovascular / Hemodynamic: Hypotension on pressors. New arrhythmia. Troponin elevation. Need for blood transfusion.' } },
    { type: 'paragraph', content: { text: 'Respiratory: Worsening respiratory status. Intubation watch. NIV initiation. Significant change in peak or plateau pressures.' } },
    { type: 'paragraph', content: { text: 'Procedural / Surgical: Pre-extubation (notify NCC attending AND PCCM). Pre-antibiotic start. NSGY plan for emergent OR. Any unplanned or major procedure.' } },
    { type: 'paragraph', content: { text: 'Patient Safety: Unexpected death. Code Blue.' } },
    { type: 'warning', content: { text: 'There is no version of "I didn\'t call because I didn\'t want to bother them" that ends well. The attendings have said explicitly: they want to know. Call for anything you are unsure of, and anytime you feel overwhelmed.' } },

    { type: 'heading', content: { text: 'Section 4 — Residents and Fellows' } },
    { type: 'paragraph', content: { text: 'Neurology Residents: 2 per team (Ice 1/2 and Fire 1/2). Each sees up to 8 patients. Schedule: 6 off-days per 4-week rotation, 4 per 3-week rotation. Off-days restricted — no clinic days, no Fridays, no weekends.' } },
    { type: 'paragraph', content: { text: 'Neurosurgery Residents: 1 NSGY resident per Ice team typically.' } },
    { type: 'paragraph', content: { text: 'Fellows: NCC fellow and epilepsy fellow rotate through. The epilepsy fellow is your primary contact for EEG interpretation and new monitoring requests.' } },

    { type: 'heading', content: { text: 'Section 5 — The Rest of the Team' } },
    { type: 'paragraph', content: { text: 'You will interact with every one of these roles daily. Know what they own.' } },

    {
      type: 'collapsible',
      content: {
        title: 'NCC Pharmacist',
        content: 'Owns: medication reconciliation review, HTS dosing, sedation management, antibiotic selection and stewardship, anticoagulation reversal, pentobarbital coma protocol, PRIS monitoring. Bring sedation, HTS, AC reversal, and antibiotic questions to pharmacist during rounds — not via mid-day page. Pharmacist owns pentobarbital coma protocol monitoring: q72h LFTs, propylene glycol surveillance.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Respiratory Therapy (RT)',
        content: 'Owns: ventilator setup and management, NIV initiation, suctioning protocols, ETCO₂ monitoring, patient transport for all intubated patients. Loop RT in early for any vent changes, extubation planning, or transport. They are procedural partners, not order-takers.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Bedside RN',
        content: 'Owns: ACLS certification, whiteboard accuracy (your name, ASCOM number, contact method), and first-call for changes in patient status. Verify your name and ASCOM number on the patient whiteboard every morning — a wrong number means a delayed call when things change.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Charge RN',
        content: 'Owns: Bed map, staffing logistics, Code Blue triage support. Loop the charge RN in early on any bed/cohorting question. They are the operational quarterback for the unit — they know what\'s open, what\'s coming, and what\'s not going to work.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'EEG Tech / Epilepsy Fellow',
        content: 'Owns: Continuous EEG setup (~30 min from order to leads on), interpretation, and reporting. Use the Ice+EEG or Fire+EEG TigerConnect role for your service. Reports route back through the same channel.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Social Work / Case Management',
        content: 'Owns: Complex disposition planning and advocacy for long-stay patients with disorders of consciousness. Flag DoC patients early — the social work and case management teams need lead time. Don\'t wait until the ICU LOS conversation is already urgent.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Acute Therapy (OT/PT/Speech)',
        content: 'Owns: Early mobilization, swallow evaluation, cognitive and functional assessment. Flag DoC patients at admission for early OT/PT/ST involvement. Swallow evals gate oral medication and nutrition — get them ordered early.'
      }
    },

    { type: 'heading', content: { text: 'Section 6 — TigerConnect Address Book' } },
    { type: 'paragraph', content: { text: 'This is your communication infrastructure. Know it before you need it.' } },
    {
      type: 'table',
      content: {
        headers: ['Role', 'When to use'],
        rows: [
          ['SJHMC NCC Ice Resident 1/2', 'Daytime Ice neurology residents'],
          ['SJHMC NCC Fire Resident 1/2', 'Daytime Fire neurology residents'],
          ['SJHMC Neuro Critical Care - Attending', 'New admissions 24/7; urgent attending contact at any hour'],
          ['SJHMC NCC Fire', 'Night attending — after midnight cross-coverage'],
          ['NCC Resident', 'Cross-cover signout'],
          ['Ice+EEG / Fire+EEG', 'EEG team for your service'],
          ['Pharmacy', 'NCC pharmacist direct'],
        ]
      }
    },
    { type: 'callout', content: { icon: 'info', title: 'Overnight admissions', text: 'Use "SJHMC Neuro Critical Care - Attending" for all new admissions regardless of time. That role routes to whoever is on and in-house. Do not text the daytime attending\'s personal role for an overnight admission unless explicitly told to.' } },

    { type: 'heading', content: { text: 'Section 7 — Note Signature Discipline' } },
    { type: 'paragraph', content: { text: 'This is operational, not administrative. Your progress note signature is how the team reaches you.' } },
    { type: 'paragraph', content: { text: 'Every morning, update your progress note signature to include: your ASCOM number for the shift, your daytime end time, and your nighttime contact method.' } },
    { type: 'paragraph', content: { text: 'The bedside RN, charge nurse, and cross-covering provider will look at your note signature to reach you. If it says last week\'s ASCOM number, that call goes nowhere. Your signature must also match what is on the patient whiteboard.' } },

    { type: 'heading', content: { text: 'Self-Check' } },
    { type: 'paragraph', content: { text: '1. A new admission comes in at 1:30 AM. Which TigerConnect role do you use to reach the attending?' } },
    { type: 'paragraph', content: { text: '2. The Fire team downgrades a patient. Which general neurology team receives them?' } },
    { type: 'paragraph', content: { text: '3. The bedside RN calls you about a change in vent pressures at 10 PM. Beyond NCC, who else do you notify?' } },
    { type: 'paragraph', content: { text: '4. Name two things the NCC pharmacist owns that you should not be tracking independently.' } },
    { type: 'paragraph', content: { text: '5. Before rounding, what two things about your contact information do you verify?' } },
    { type: 'callout', content: { icon: 'info', text: 'Answers are non-graded — discuss with your APP lead at your week-1 check-in.' } },
  ]
};

// ─── M01.L4 Content ────────────────────────────────────────────────────────

const m01l4Content = {
  title: 'NCC Roles by Patient Type: Primary, Co-Managed, Consult',
  duration_min: 25,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    { type: 'paragraph', content: { text: '1. Differentiate primary, co-managed, and consult roles by scope of authority — what you can order, coordinate, and only recommend.' } },
    { type: 'paragraph', content: { text: '2. List the typical diagnoses that place NCC in each role at BNI/SJHMC.' } },
    { type: 'paragraph', content: { text: '3. Decide in real time what requires independent action versus coordination versus recommendation only.' } },
    { type: 'paragraph', content: { text: '4. Recognize the gray zones — emergent deteriorations on consult patients and family meetings — and know the correct response for each.' } },

    { type: 'callout', content: { icon: 'info', title: 'Why This Lesson Matters', text: 'Not knowing your role on a given patient is one of the highest-risk situations in complex ICU care. Overstepping on a consult erodes team relationships and creates duplicate, conflicting orders. Understepping on a primary patient leaves care gaps.' } },

    { type: 'heading', content: { text: 'Section 1 — The Three Roles' } },
    { type: 'paragraph', content: { text: 'Every patient NCC touches falls into one of three role categories. The role defines your authority — not your interest in the patient, and not your clinical competence.' } },
    {
      type: 'table',
      content: {
        headers: ['Role', 'What you control'],
        rows: [
          ['Primary', 'Direct overall care. Perform procedures, place orders across all domains, consult subspecialists, manage family communication, and discharge the patient from the ICU.'],
          ['Co-managing', 'Routine orders within your neurological scope. Large management decisions require coordination with the primary team. Family meetings are shared.'],
          ['Consult', 'Recommendations only. Do not place orders or run family meetings unless the primary team has explicitly delegated that authority to you for a specific issue.'],
        ]
      }
    },
    { type: 'callout', content: { icon: 'info', title: 'The short version', text: 'Primary owns the plan. Co-managing executes within a lane. Consult advises.' } },

    { type: 'heading', content: { text: 'Section 2 — Documentation by Role' } },
    {
      type: 'table',
      content: {
        headers: ['Role', 'Note types you write'],
        rows: [
          ['Primary', 'H&P, daily progress note, transfer/discharge summary, code status discussion, family meeting note'],
          ['Co-managing', 'Daily co-management progress note, running parallel to the primary team\'s note'],
          ['Consult', 'Initial consult note with recommendations, plus active follow-up notes for each subsequent visit'],
        ]
      }
    },
    { type: 'paragraph', content: { text: 'When in doubt about what to write: match the format to the role, not to how involved you feel clinically.' } },

    { type: 'heading', content: { text: 'Section 3 — When NCC is Primary' } },
    { type: 'paragraph', content: { text: 'NCC carries primary responsibility for patients whose principal problem is a neurological condition requiring intensive care — and where no other surgical or procedural specialty is driving the primary management plan.' } },
    { type: 'paragraph', content: { text: 'Primary NCC diagnoses: Status epilepticus (established or at high risk). Neuromuscular disease requiring ICU admission (GBS, myasthenic crisis). Infectious meningitis/encephalitis requiring intensive care. Autoimmune encephalitis and demyelinating conditions requiring intensive care.' } },
    { type: 'callout', content: { icon: 'info', text: 'On primary patients, you are the team. Every order is yours to place. Every family conversation is yours to lead or delegate. Every subspecialty consult goes through you.' } },

    { type: 'heading', content: { text: 'Section 4 — When NCC Co-Manages' } },
    { type: 'paragraph', content: { text: 'Co-management is the most common structure you will encounter. NCC provides neurological intensity while another team holds primary responsibility.' } },
    {
      type: 'table',
      content: {
        headers: ['Diagnosis', 'Primary team'],
        rows: [
          ['Spontaneous SAH', 'Neurosurgery'],
          ['Spontaneous ICH without vascular lesion', 'Stroke'],
          ['Spontaneous ICH with vascular lesion', 'Neurosurgery'],
          ['Elective endovascular complications', 'Endovascular NSGY'],
          ['Shunt infection, acute hydrocephalus', 'Neurosurgery'],
          ['Suprasellar surgery with DI', 'Neurosurgery'],
          ['AIS at high risk for decompensation', 'Stroke'],
          ['Large cerebellar or brainstem stroke', 'Stroke'],
          ['Intracranial/spinal neoplasms requiring ICU', 'Often Neurosurgery'],
        ]
      }
    },
    { type: 'paragraph', content: { text: 'On co-managed patients: routine neurological orders are yours to place. Large decisions require touching base with the primary team before acting. Family meetings are shared — coordinate who leads before the meeting starts.' } },

    { type: 'heading', content: { text: 'Section 5 — When NCC Consults' } },
    { type: 'paragraph', content: { text: 'On consult patients, NCC provides neurological expertise but does not direct care. The primary team owns the chart and the family relationship.' } },
    {
      type: 'table',
      content: {
        headers: ['Diagnosis', 'Primary team'],
        rows: [
          ['Moderate/severe TBI', 'TICU'],
          ['Cardiac arrest with anoxic brain injury', 'MICU or CTICU'],
          ['Toxidromes with seizures or encephalopathy', 'MICU'],
          ['ICU/ECMO with AMS', 'MICU, TICU, or CTICU'],
          ['ECMO with stroke/ICH', 'CTICU'],
          ['Severe heatstroke', 'MICU'],
        ]
      }
    },
    { type: 'warning', content: { text: 'On consult patients: write recommendations, do not place orders unless explicitly asked and documented. Do not run family meetings independently. Communicate clearly to the bedside RN that your recommendations require primary team order entry.' } },

    { type: 'heading', content: { text: 'Section 6 — Order Authority Matrix' } },
    { type: 'paragraph', content: { text: 'Use this table in real time when you are unsure what you can place unilaterally on a given patient.' } },
    {
      type: 'table',
      content: {
        headers: ['Order type', 'Primary', 'Co-managing', 'Consult'],
        rows: [
          ['Sedation drip titration', '✅ Yes', '✅ Yes (notify if major)', '❌ Recommend only'],
          ['Electrolyte replacement', '✅ Yes', '✅ Yes', '❌ Recommend only'],
          ['Fever workup', '✅ Yes', '✅ Yes (notify primary)', '❌ Recommend only'],
          ['DVT prophylaxis', '✅ Yes', '✅ Yes (coordinate timing)', '❌ Recommend only'],
          ['Antibiotic initiation', '✅ Yes (notify attending)', '✅ Yes (notify primary + attending)', '❌ Recommend only'],
          ['Antihypertensive drip', '✅ Yes', '✅ Yes (coordinate BP goals)', '❌ Recommend only'],
          ['Hyperosmolar therapy', '✅ Yes', '✅ Yes', '❌ Recommend only (urgent exception)'],
          ['Vasopressor initiation', '✅ Yes (notify)', '✅ Yes (notify both teams)', '❌ Recommend only'],
          ['AC reversal', '✅ Yes', '✅ Yes (coordinate)', '❌ Recommend only'],
          ['Surgical consult', '✅ Yes', '✅ Coordinate first', '❌ Coordinate with primary'],
          ['Code status / GOC family meeting', '✅ Yes', '✅ With primary present', '❌ Only with primary\'s explicit permission'],
          ['ICU discharge / transfer', '✅ Yes', '✅ With primary', '❌ Primary decides'],
        ]
      }
    },

    { type: 'heading', content: { text: 'Section 7 — The Gray Zones' } },
    { type: 'paragraph', content: { text: 'Two situations don\'t fit cleanly into the role framework. Know how to handle both.' } },
    {
      type: 'collapsible',
      content: {
        title: 'Acute Deterioration on a Consult Patient',
        content: 'You\'re following a TICU patient with ICP issues as a consult. The patient acutely deteriorates and the TICU team is not immediately available. What you do: (1) Act in the patient\'s best interest — treat ICP, stabilize. (2) Document the time pressure and your reasoning clearly. (3) Notify the primary team and the NCC attending in parallel — do not wait for one before reaching the other. (4) When the primary team arrives, reset boundaries explicitly. This is not overstepping. Emergent care resets to "act now, sort later." The documentation is what protects everyone.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Family Meetings on Consult Patients',
        content: 'Family asks to speak with you about prognosis. You\'re the consult. What you do: (1) Do not run the meeting independently. (2) Inform the primary team before engaging with family about goals or prognosis. (3) Participate if invited — you are the neurological expert in the room. (4) Answer neurological questions clearly and directly if asked. (5) Document your participation in a follow-up note. The family has a relationship with the primary team. You are the neurological consultant. Both things matter.'
      }
    },

    { type: 'heading', content: { text: 'Case Vignettes' } },
    { type: 'paragraph', content: { text: 'Work through these before your first shift. They are not graded — discuss with your APP lead.' } },
    {
      type: 'case-vignette',
      content: {
        stem: '56-year-old with thalamic ICH, GCS 11, SBP 215. NCC is co-managing with Stroke as primary.',
        role: 'Co-managed',
        correct_action: 'Initiate nicardipine per the ICH bundle — this is within your co-management scope for blood pressure control. Notify the Stroke attending of the change (BP goals may be specifically targeted). Coordinate a surgical referral if there is radiographic expansion — do not place that consult unilaterally. Document your actions, BP goal, and the notification.'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: '22-year-old severe TBI, ICP 28, on NCC consult. TICU team is managing a concurrent code on the floor.',
        role: 'Consult',
        correct_action: 'Treat the ICP now — osmotherapy, head of bed positioning, confirm sedation is adequate, check for Cushing triad. Document the time pressure clearly: "TICU attending unavailable at time of intervention due to concurrent emergency." Notify TICU and the NCC attending in parallel. When the TICU team arrives, review what was done and reset the care structure.'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: '67-year-old with myasthenic crisis on PLEX, intubated day 4. Husband approaches in the hallway: "Should we keep going?"',
        role: 'Primary',
        correct_action: 'Sit down. Do not answer a prognosis question while standing in the hallway. Take him to a private space and have the conversation with appropriate time and attention. Answer his question honestly with what you know. Document the conversation in a family meeting note. If it raises serious goals-of-care questions, schedule a formal meeting — don\'t handle it fully in the hallway.'
      }
    },

    { type: 'heading', content: { text: 'Self-Check' } },
    { type: 'paragraph', content: { text: '1. A new ICH patient comes in with Stroke as primary. You need to initiate nicardipine. Do you place the order?' } },
    { type: 'paragraph', content: { text: '2. On the same patient, the family asks about goals of care. What\'s your first step before engaging?' } },
    { type: 'paragraph', content: { text: '3. You\'re consulting on a TICU patient who develops acute ICP crisis. What are the three things you do simultaneously?' } },
    { type: 'paragraph', content: { text: '4. What note type do you write on a co-managed patient?' } },
    { type: 'paragraph', content: { text: '5. The TICU resident calls asking you to "just place the order" for an antibiotic on your consult patient. What do you say?' } },
    { type: 'callout', content: { icon: 'info', text: 'Answers are non-graded — discuss with your APP lead during your week-1 check-in.' } },

    { type: 'callout', content: { icon: 'info', title: 'Module 1 Complete', text: 'You\'ve completed Module 1 — Orientation & Unit Foundations. You know who runs this service, where things are, who\'s on your team, and what your authority is on any given patient. Next: Module 2 — Clinical Tools & System Access.' } },
  ]
};

// ─── Load to Database ───────────────────────────────────────────────────────

const lessons = [
  {
    title: 'M01.L3 — The NCC Team: Ice, Fire, and Everyone Around You',
    content: m01l3Content,
  },
  {
    title: 'M01.L4 — NCC Roles by Patient Type: Primary, Co-Managed, Consult',
    content: m01l4Content,
  },
];

async function populate() {
  console.log('📚 Loading M01.L3 and M01.L4 content...\n');

  for (const lesson of lessons) {
    // Find lesson by title
    const { data, error: findError } = await supabase
      .from('module_lessons')
      .select('id, title')
      .eq('title', lesson.title)
      .single();

    if (findError || !data) {
      console.log(`❌ Not found in database: "${lesson.title}"`);
      console.log('   Run load-m01.mjs first to create lesson records, then re-run this script.');
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

    console.log(`✅ ${lesson.title} — ${lesson.content.blocks.length} blocks loaded`);
  }

  console.log('\n✨ Done! Refresh the app to see content.');
}

populate().catch(console.error);
