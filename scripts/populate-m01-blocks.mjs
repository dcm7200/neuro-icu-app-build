#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');

// Parse .env.local
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...parts] = line.split('=');
    env[key.trim()] = parts.join('=').trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Content for M01.L1
const m01l1Blocks = [
  { type: 'heading', content: { text: 'Learning Objectives' } },
  {
    type: 'paragraph',
    content: {
      text: 'By the end of this lesson, you will be able to: (1) Identify the Section Head and core faculty of BNI Neurocritical Care and describe the scope of attending coverage. (2) Articulate the "speak-up" expectation that defines our team culture and the four specific situations in which speaking up is required. (3) Recognize that you are joining a multidisciplinary, regionalized, subspecialty service whose outcomes depend on team-based care — not individual heroics. (4) Locate the Barrow NCC Resources website and the orientation materials you will need across your first 90 days.'
    }
  },
  { type: 'heading', content: { text: 'Why This Lesson Matters' } },
  {
    type: 'paragraph',
    content: {
      text: 'Neurocritical care patients deteriorate fast. The cost of staying silent when you are uncertain — about an order, a finding, a plan, or a conversation — is measured in brain. Every faculty member you will meet has explicitly committed to a culture where the most junior person in the room can stop the line. Read this lesson first; the clinical content that follows assumes you have internalized this expectation.'
    }
  },
  { type: 'heading', content: { text: 'Section 1 — Who You Are Joining' } },
  {
    type: 'paragraph',
    content: {
      text: 'BNI Neurocritical Care is the section of the Barrow Neurological Institute that provides intensive care for patients with primary neurological injury or critical illness with neurological consequences. We operate at St. Joseph\'s Hospital and Medical Center in Phoenix, Arizona. The service runs on two parallel teams — Ice (day-anchored) and Fire (night-anchored) — covering the 4NNB and 4NNC pods, with attending coverage 24/7.'
    }
  },
  {
    type: 'callout',
    content: { icon: 'info', title: 'Section Head', text: 'Ruchira Jha, MD, MSc' }
  },
  {
    type: 'paragraph',
    content: {
      text: 'Core faculty: Fiona Lynch, MD; Patrick Crooks, MD; Nassim Matin, MD; Aditya Kumar, MD. You will see additional names on protocols (Anusha Mangalampalli, MD; Nicholas Nelson, MD; Tyler Haller, PharmD; Chia-Ling Phuah, MD MS; Daniella Sisniega, MD), reflecting the broader committee structure. The BNI Neurocritical Care Handbook 2026–2027 is authored by Mangalampalli, Kumar, and Nelson and serves as your pocket reference.'
    }
  },
  {
    type: 'callout',
    content: {
      icon: 'info',
      title: 'APP Positioning',
      text: 'Advanced Practice Providers — both Nurse Practitioners and Physician Assistants — are core members of the NCC service. You are not "covering" for the residents; you are partners with them and with the attendings. Your scope includes admissions, daily progress, procedures, family communication, and discharge planning.'
    }
  },
  { type: 'heading', content: { text: 'Section 2 — Our Culture: Speak Up' } },
  {
    type: 'paragraph',
    content: {
      text: 'Every NCC attending has explicitly told incoming trainees the same thing — speak up. From the orientation deck: "Speak up if you don\'t understand decisions or the patient situation. Speak up if you are uncomfortable with something. Speak up if you need help. No one will judge you for this — we need to know so we can help."'
    }
  },
  {
    type: 'paragraph',
    content: {
      text: 'Translate this into four concrete trigger situations. You are expected to speak up: (1) When the plan doesn\'t make sense to you — "Help me understand why we\'re doing X" is always legitimate. (2) When you are uncomfortable with something — a medication dose, a family interaction, a colleague\'s tone. (3) When you need help — procedures, documentation, a tough exam. (4) When something has gone wrong or is about to — near-misses and adverse events are reviewed without blame.'
    }
  },
  {
    type: 'warning',
    content: {
      text: 'This is non-negotiable. If you experience judgment, dismissal, or retaliation — that is a culture violation. Report it to your APP lead, the Section Head, or HR.'
    }
  },
  { type: 'heading', content: { text: 'Section 3 — Multidisciplinary by Design' } },
  {
    type: 'paragraph',
    content: {
      text: 'Neurocritical Care is a multidisciplinary specialty that is not about individual physicians, nurses, pharmacists, respiratory therapists, but rather developing a geographically regionalized and subspecialized team approach to patient care that has been shown to improve outcomes nationwide. Internalize this. (1) Cohort our patients on 4NBC whenever possible — geographic regionalization is part of why our outcomes are what they are. (2) Consults still warrant cohorting if the NCC issues make up the bulk of the active problem list. (3) Outside-hospital transfers are NEVER delayed because of bed-by-bed criteria. Boarders are moved post-hoc.'
    }
  },
  { type: 'heading', content: { text: 'Key Resources' } },
  {
    type: 'paragraph',
    content: {
      text: 'Barrow NCC Resources website (OKTA → BNI intranet) | NCC Orientation Deck (Resources website / Orientation) | Institutional Protocols (Resources website / Protocols) | BNI Handbook 2026–2027 (Distributed + Resources website) | Amion Schedule (amion.com) | Your APP Lead (Listed in offer letter)'
    }
  }
];

// Content for M01.L2
const m01l2Blocks = [
  { type: 'heading', content: { text: 'Learning Objectives' } },
  {
    type: 'paragraph',
    content: {
      text: 'By the end of this lesson: (1) Locate the 4NNB and 4NNC neurocritical care pods and describe the bed footprint. (2) Locate the seven priority spaces: APP office, attending office, supply Pyxis, conference rooms, lounge, EEG room, Code Blue room. (3) Locate spaces outside the unit (ED, Mercy 1st-floor, 6th-floor conference room). (4) Find procedure supplies for emergent intervention within 60 seconds.'
    }
  },
  { type: 'heading', content: { text: 'Why This Lesson Matters' } },
  {
    type: 'paragraph',
    content: {
      text: 'You will be paged to a Code Blue, an emergent EVD placement, or a brain death exam during your first month. Knowing where the cranial access kit is, where the Raumedic monitor lives, and which conference room family meetings happen in — without thinking — saves time when it counts.'
    }
  },
  { type: 'heading', content: { text: 'Section 1 — The Two NCC Pods' } },
  {
    type: 'paragraph',
    content: {
      text: '4NNC = 16 beds, primary NCC patients. 4NNB = variable beds, co-managed and overflow. Operating principle: Whenever possible, unless there are extenuating circumstances, primary and co-managed neurocritical care patients should be admitted or cohorted to 4NBC rooms if available. Consults may warrant cohorting if NCC issues dominate the problem list. When 4NBC is full, post-hoc transfer back is preferred. Do NOT delay outside-hospital transfers waiting for a 4NBC bed.'
    }
  },
  { type: 'heading', content: { text: 'Section 2 — Inside the Unit' } },
  {
    type: 'collapsible',
    content: {
      title: 'APP Office',
      content: 'Where you sit between rounds, write notes, decompress. Your locker (typically) and your team\'s printer. Tip: the APP office whiteboard often has the current TigerConnect role assignments — check it before signing in.'
    }
  },
  {
    type: 'collapsible',
    content: {
      title: 'Attending Office',
      content: 'Where the daytime attending works between rounds. Knock first. Don\'t enter unannounced during family meetings.'
    }
  },
  {
    type: 'collapsible',
    content: {
      title: 'Supply Pyxis',
      content: 'Houses high-acuity supplies: cranial access kit, ventriculostomy pack, central-line trays, arterial-line kits, lumbar-puncture kits, US-IV kit, occipital-nerve-block tray. Procedure-specific kits (Raumedic Drill Kit CH5, Bolt Kit PTO, Neurovent-PTO) are attached to the Raumedic pole at the bedside, not in the Pyxis. Pyxis access provisioned with Cerner credentials; if it doesn\'t work day 1, page pharmacy.'
    }
  },
  {
    type: 'collapsible',
    content: {
      title: 'Code Blue Room',
      content: 'Specific room (typically corner of pod) used as rapid-response location. CRITICAL: ICU Code Blue ≠ Overhead Code Blue. ICU Code Blue notifies only ICU team. Overhead Code Blue notifies the rest of the hospital and brings full code team. Always confirm overhead is called. Charge nurse advises if additional help is needed.'
    }
  },
  {
    type: 'collapsible',
    content: {
      title: 'EEG / Epilepsy Reading Room',
      content: 'Where epilepsy fellow and attending read continuous EEGs. For urgent EEG questions, walk over rather than relying solely on Cerner — report turnaround can lag rounds. Ice + EEG and Fire + EEG TigerConnect chats are asynchronous channel.'
    }
  },
  {
    type: 'collapsible',
    content: {
      title: 'Conference Rooms',
      content: '4th-floor Barrow Conference Room — primary location for case conference, multidisciplinary rounds, BNI faculty meetings. 6th-floor Conference Room — overflow and didactic sessions, some APP grand rounds. Mercy 1st-floor Conference Room 1 — used when teams from across SJHMC convene; physically separate from main Barrow conference room.'
    }
  },
  {
    type: 'collapsible',
    content: {
      title: 'Barrow Lounge',
      content: 'Coffee, food storage, decompression. Bring your own mug; lounge is a shared resource.'
    }
  },
  { type: 'heading', content: { text: 'Outside the Unit, Still on Your Map' } },
  {
    type: 'paragraph',
    content: {
      text: 'Emergency Room: Most patients arrive from ED. You will be summoned for stroke codes, status epilepticus, acute neurological deterioration. Bring phone, stethoscope, relevant protocols on phone or resources website. Stroke codes: stroke attending/fellow staffs first; you contact TigerConnect NCC attending if patient to be admitted to 4NBC. CT Scanner: Door-to-CT goal ≤25 min for ICH transfers. Know the path from ED to CT.'
    }
  },
  { type: 'heading', content: { text: 'The 60-Second Drill' } },
  {
    type: 'paragraph',
    content: {
      text: 'Practice until you can do it in under a minute without thinking: (1) Patient posturing + anisocoria on 4NNC → cranial access kit location? (Supply Pyxis) (2) Code Blue via ICU button only → what do you do? (Confirm overhead activated) (3) Night epileptologist needs to talk re overnight event → where to find them? (EEG reading room + TigerConnect) (4) Staff new aSAH with on-call attending before family arrives → where start? (Attending office or TigerConnect)'
    }
  }
];

// Content for M01.L3
const m01l3Blocks = [
  { type: 'heading', content: { text: 'Learning Objectives' } },
  {
    type: 'paragraph',
    content: {
      text: 'By the end of this lesson: (1) Distinguish Ice and Fire teams: coverage, patient lists, downgrade pathways. (2) Describe attending coverage: daytime, nighttime, in-house-until-midnight window. (3) Identify every team role touching an NCC patient — APP, residents (neuro + NSGY), fellows, pharmacy, RT, RN, charge RN, EEG, social work, therapy. (4) Know which TigerConnect role to address depending on time of day and question type.'
    }
  },
  { type: 'heading', content: { text: 'Section 1 — Ice vs. Fire' } },
  {
    type: 'paragraph',
    content: {
      text: 'NCC service runs two parallel teams. Both cover 4NNB/4NNC; they split the list and coverage windows. Ice: patient list "NCC Ice", day attending "Ice", night attending "Fire" (via TigerText), downgrades to Blue team. Fire: patient list "NCC Fire", day attending "Fire", night attending same (in-house until ~midnight, by phone thereafter), downgrades to Red team. "Ice" and "Fire" are scheduling labels with no clinical meaning.'
    }
  },
  { type: 'heading', content: { text: 'Attending Coverage Details' } },
  {
    type: 'paragraph',
    content: {
      text: 'Daytime attending owns morning rounds at 8 AM (or after grand rounds Friday). Available throughout day for staffing, procedures, family meetings. PM rounds at discretion. Afternoon handoff at 4:30–5 PM. Night neurointensivist in-house until ~midnight "most weeks", then by phone. PCCM (Pulmonary/Critical Care) attending in-house 24/7 — backup for code blue, respiratory emergencies, anything overrunning NCC capacity. Notify when intubating, starting NIV, pre-extubation, new respiratory failure.'
    }
  },
  { type: 'heading', content: { text: 'When to Call the Attending (Non-Negotiable)' } },
  {
    type: 'paragraph',
    content: {
      text: 'Call for: Change in neuro exam. Unexpected imaging findings. Hypotension on pressors, arrhythmia, elevated troponin, transfusion. Need for central venous access. Worsening respiratory status, intubation watch, NIV start, plateau/peak changes. Pre-extubation (also notify PCCM). Pre-antibiotic start. Neurosurgery emergent OR plan. Unplanned/major procedure. Unexpected death or code blue. Anything you are unsure of. ANYTIME YOU FEEL OVERWHELMED OR UNSURE WHAT TO DO FOR A PATIENT.'
    }
  },
  { type: 'heading', content: { text: 'Team Roles' } },
  {
    type: 'paragraph',
    content: {
      text: 'Neurology residents: 2 per team (Ice 1/2, Fire 1/2), see up to 8 patients each, 6 off-days per 4-week rotation. Neurosurgery resident: 1 per Ice team typically, co-manages SAH/ICH with vascular lesion/post-op. Fellows: Neurocritical care and epilepsy rotate; work directly with epilepsy fellow for cvEEG.'
    }
  },
  {
    type: 'paragraph',
    content: {
      text: 'NCC Pharmacist (Tyler Haller, PharmD): On rounds, owns med rec review, HTS management, sedation drips, antibiotic stewardship, AC reversal, pentobarbital coma, PRIS monitoring. Get to know in first week. Respiratory Therapy: 24/7 presence, owns vent setup, suctioning, NIV, ETCO2, ventilator changes. Communicate vent changes directly to RT. For transport, RT travels with intubated patients — ensure matched minute ventilation.'
    }
  },
  {
    type: 'paragraph',
    content: {
      text: 'Bedside RN and Charge RN: All ICU RNs ACLS-certified. Charge RN runs bed map, staffing, triage, advises if additional help needed during Code Blue. Bedside RN updates whiteboard with daytime provider, ASCOM, duration, nighttime page. EEG Techs / Epilepsy Fellow: Setup ~30 min turnaround, interpret and communicate via Ice+EEG/Fire+EEG TigerText and Cerner. Social Work / Case Mgmt: Early engagement for complex disposition, always for DOC long-stay. Acute Therapy (PT/OT/SLP): Early order even on intubated non-following for Disorders of Consciousness pathway.'
    }
  },
  { type: 'heading', content: { text: 'TigerConnect Address Book' } },
  {
    type: 'paragraph',
    content: {
      text: 'SJHMC NCC Ice Resident 1/2 → Daytime Ice neurology residents. SJHMC NCC Fire Resident 1/2 → Daytime Fire residents. SJHMC Neuro Critical Care - Attending → NCC attending 24/7 for admissions. SJHMC NCC Fire → Night attending after midnight. NCC Resident → Cross-cover/signout. Ice+EEG / Fire+EEG → EEG team TigerConnect chat. Pharmacy → NCC pharmacist direct line.'
    }
  },
  { type: 'heading', content: { text: 'Note Signature Discipline' } },
  {
    type: 'paragraph',
    content: {
      text: 'Update progress-note signature each morning with: ASCOM # for your team, daytime end time (e.g., "ASCOM #XXXX until 5 PM"), nighttime contact (e.g., "Neurology pager 6-7400 5pm–7am"). This signature MUST match what is on the patient\'s whiteboard.'
    }
  }
];

// Content for M01.L4
const m01l4Blocks = [
  { type: 'heading', content: { text: 'Learning Objectives' } },
  {
    type: 'paragraph',
    content: {
      text: 'By the end of this lesson: (1) Differentiate the three NCC roles (Primary, Co-managed, Consult) and authority scope. (2) List typical diagnoses for each role at BNI/SJHMC. (3) Decide what you can order, what to coordinate, what is advisory. (4) Recognize gray zones: emergent deteriorations, family meetings.'
    }
  },
  { type: 'heading', content: { text: 'Why This Lesson Matters' } },
  {
    type: 'paragraph',
    content: {
      text: 'The same NCC team can be primary for one bed and recommendation-only consultant in the next. Understanding role scope keeps you (a) inside scope, (b) collegial with neurosurgery/trauma/medicine, (c) protected medico-legally. Early friction for new APPs often stems from orders placed under the wrong role.'
    }
  },
  { type: 'heading', content: { text: 'The Three Roles' } },
  {
    type: 'callout',
    content: {
      icon: 'info',
      title: 'Primary',
      text: 'Responsible for directing patient\'s overall care, performing procedures, placing orders, consulting other specialists, discharging from ICU. You own the patient. You write H&P, place all orders, direct disposition.'
    }
  },
  {
    type: 'callout',
    content: {
      icon: 'info',
      title: 'Co-managing',
      text: 'Works closely with primary team to support during ICU stay; may perform procedures, place orders, participate in family meetings while in close contact with primary before large management decisions. Routine orders (sedation, electrolytes, fever workup, DVT) within scope; major decisions require coordination.'
    }
  },
  {
    type: 'callout',
    content: {
      icon: 'info',
      title: 'Consult',
      text: 'Makes recommendations to primary; may place orders and participate in family meetings only with primary\'s expressed permission. Even routine orders require primary team\'s explicit permission.'
    }
  },
  { type: 'heading', content: { text: 'NCC Primary Diagnoses' } },
  {
    type: 'paragraph',
    content: {
      text: 'Status epilepticus or at-risk. Neuromuscular disease (GBS, Myasthenia Gravis) requiring ICU. Infectious meningitis requiring ICU. Autoimmune encephalitis, demyelinating conditions requiring ICU.'
    }
  },
  { type: 'heading', content: { text: 'NCC Co-managed Diagnoses' } },
  {
    type: 'paragraph',
    content: {
      text: 'Spontaneous SAH (primary: Neurosurgery). Spontaneous ICH without vascular lesion (primary: Stroke). Spontaneous ICH with vascular lesion (primary: Neurosurgery). Elective endovascular complications (primary: Endovascular NSGY). Shunt infection/acute hydrocephalus (primary: Neurosurgery). Suprasellar surgery with DI (primary: Neurosurgery). AIS at high risk for decompensation (primary: Stroke). Large cerebellar/brainstem stroke (primary: Stroke). ICH/spinal neoplasms requiring ICU (primary: Often Neurosurgery).'
    }
  },
  { type: 'heading', content: { text: 'NCC Consult Diagnoses' } },
  {
    type: 'paragraph',
    content: {
      text: 'Moderate/severe TBI (primary: TICU). Cardiac arrest with anoxic brain injury (primary: MICU/CTICU). Toxidromes with seizures/encephalopathy (primary: MICU). ICU/ECMO with AMS (primary: MICU/TICU/CTICU). ECMO with stroke/ICH (primary: CTICU). Severe heatstroke (primary: MICU).'
    }
  },
  { type: 'heading', content: { text: 'Order Authority Summary' } },
  {
    type: 'paragraph',
    content: {
      text: 'Sedation titration: Primary (Yes), Co-managed (Yes, notify if major), Consult (Recommend only). Electrolytes: Primary (Yes), Co-managed (Yes), Consult (Recommend only). Fever workup: Primary (Yes), Co-managed (Yes, notify), Consult (Recommend only). DVT prophylaxis: Primary (Yes), Co-managed (Yes, coordinate), Consult (Recommend only). Antibiotics: Primary (Yes, notify attending), Co-managed (Yes, notify both), Consult (Recommend only). Antihypertensive: Primary (Yes), Co-managed (Yes, coordinate), Consult (Recommend only).'
    }
  },
  {
    type: 'paragraph',
    content: {
      text: 'Vasopressors: Primary (Yes, notify), Co-managed (Yes, notify both), Consult (Recommend only). AC reversal: Primary (Yes), Co-managed (Yes, coordinate), Consult (Recommend only). Code status / Family meeting: Primary (Yes), Co-managed (With primary), Consult (Primary\'s permission only). ICU discharge: Primary (Yes), Co-managed (With primary), Consult (N/A, primary decides).'
    }
  },
  { type: 'heading', content: { text: 'Emergent Gray Zones' } },
  {
    type: 'warning',
    content: {
      text: 'On consult patient acutely decompensating (e.g., herniating TBI when TICU team not at bedside): You CAN act in patient\'s best interest (hyperosmolar, vent adjustments, NSGY page). MUST document time-critical reason. MUST notify primary team AND NCC attending in parallel. Reset boundaries when primary at bedside.'
    }
  },
  { type: 'heading', content: { text: 'Family Meetings on Consults' } },
  {
    type: 'paragraph',
    content: {
      text: 'Do NOT run independently. Inform primary team. Offer to participate if invited. You CAN answer neurological questions if asked. Document conversations. Primary team leads goals-of-care conversation.'
    }
  },
  { type: 'heading', content: { text: 'Case Vignette 1' } },
  {
    type: 'case-vignette',
    content: {
      stem: '56 y/o spontaneous deep right thalamic ICH, no vascular lesion on CTA, GCS 11. Stroke admits to NCC. RN calls about SBP 215.',
      role: 'Co-managed (Stroke primary)',
      correct_action: 'YOU CAN: Initiate nicardipine, titrate per ICH Bundle, notify stroke attending, order labs, head CT q6h. YOU SHOULD COORDINATE: Surgical referral if expansion/mass effect.'
    }
  },
  { type: 'heading', content: { text: 'Case Vignette 2' } },
  {
    type: 'case-vignette',
    content: {
      stem: '22 y/o TBI, GCS 6, intubated, ICP monitor placed, TICU primary, ICP 28 on arrival, TICU attending in trauma bay.',
      role: 'Consult (TICU primary)',
      correct_action: 'YOU CAN (URGENT): Treat ICP elevation per protocol (Tier 1 HTS/mannitol). MUST document time-critical. MUST notify TICU + NCC attending in parallel. Coordinate: HTS dosing, sedation, NSGY, family comms. Reset when TICU at bedside.'
    }
  },
  { type: 'heading', content: { text: 'Case Vignette 3' } },
  {
    type: 'case-vignette',
    content: {
      stem: '67 y/o myasthenic crisis, day 3 plasmapheresis. Husband asks "should we keep going?"',
      role: 'Primary',
      correct_action: 'YOU CAN: Sit down, answer, document conversation, schedule formal family meeting if needed. You own this conversation.'
    }
  },
  { type: 'heading', content: { text: 'What\'s Next' } },
  {
    type: 'paragraph',
    content: {
      text: 'You\'ve completed Phase 1, Module 1. Next: M02 — Clinical Tools & System Access. You\'ll get Cerner, TigerConnect, Hybrid Chart, PACS, and EEG access wired up for your first shift.'
    }
  }
];

async function populateBlocks() {
  try {
    console.log('📝 Populating lesson content blocks...\n');

    const lessons = [
      { id: 'M01.L1', blocks: m01l1Blocks },
      { id: 'M01.L2', blocks: m01l2Blocks },
      { id: 'M01.L3', blocks: m01l3Blocks },
      { id: 'M01.L4', blocks: m01l4Blocks }
    ];

    for (const lesson of lessons) {
      // Clear existing blocks
      await supabase
        .from('lesson_blocks')
        .delete()
        .eq('lesson_id', lesson.id);

      // Insert new blocks
      for (let i = 0; i < lesson.blocks.length; i++) {
        const block = lesson.blocks[i];
        const { error } = await supabase
          .from('lesson_blocks')
          .insert({
            lesson_id: lesson.id,
            block_type: block.type,
            content: block.content,
            order_index: i
          });

        if (error) {
          console.error(`❌ Error inserting block in ${lesson.id}:`, error);
        }
      }

      console.log(`✅ Populated ${lesson.id} with ${lesson.blocks.length} blocks`);
    }

    console.log('\n✨ All lesson blocks populated successfully!');
  } catch (err) {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
  }
}

populateBlocks();
