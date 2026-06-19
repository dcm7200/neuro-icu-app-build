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

// Rich content blocks for M01.L1
const m01l1Content = {
  title: 'Welcome, Faculty, and the Culture of Speaking Up',
  duration_min: 15,
  blocks: [
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
        text: 'Neurocritical Care is a multidisciplinary specialty that is not about individual physicians, nurses, pharmacists, respiratory therapists, but rather developing a geographically regionalized and subspecialized team approach to patient care that has been shown to improve outcomes nationwide. Internalize this: (1) Cohort our patients on 4NBC whenever possible — geographic regionalization is part of why our outcomes are what they are. (2) Consults still warrant cohorting if NCC issues dominate the problem list. (3) Outside-hospital transfers are NEVER delayed because of bed-by-bed criteria. Boarders are moved post-hoc.'
      }
    },
    { type: 'heading', content: { text: 'Key Resources' } },
    {
      type: 'paragraph',
      content: {
        text: 'Barrow NCC Resources website (OKTA → BNI intranet) | NCC Orientation Deck (Resources website / Orientation) | Institutional Protocols (Resources website / Protocols) | BNI Handbook 2026–2027 (Distributed + Resources website) | Amion Schedule (amion.com) | Your APP Lead (Listed in offer letter)'
      }
    }
  ]
};

// Rich content for M01.L2
const m01l2Content = {
  title: 'Unit Geography: 4NNB, 4NNC, and Everything Around Them',
  duration_min: 20,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    {
      type: 'paragraph',
      content: {
        text: 'By the end of this lesson: (1) Locate the 4NNB and 4NNC neurocritical care pods and describe the bed footprint. (2) Locate the seven priority spaces: APP office, attending office, supply Pyxis, conference rooms, lounge, EEG room, Code Blue room. (3) Locate spaces outside the unit (ED, Mercy 1st-floor, 6th-floor). (4) Find procedure supplies for emergent intervention within 60 seconds.'
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
        text: '4NNC = 16 beds, primary NCC patients. 4NNB = variable beds, co-managed and overflow. Whenever possible, primary and co-managed NCC patients should be admitted or cohorted to 4NBC. When 4NBC is full, post-hoc transfer back is preferred. Do NOT delay outside-hospital transfers waiting for a 4NBC bed.'
      }
    },
    { type: 'heading', content: { text: 'Section 2 — Inside the Unit' } },
    {
      type: 'collapsible',
      content: {
        title: 'APP Office',
        content: 'Where you sit between rounds, write notes, decompress. Your locker and your team\'s printer. Tip: the APP office whiteboard often has TigerConnect role assignments — check it before signing in.'
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
        content: 'Houses: cranial access kit, ventriculostomy pack, central-line trays, arterial-line kits, lumbar-puncture kits, US-IV kit, occipital-nerve-block tray. Procedure-specific kits (Raumedic Drill Kit, Bolt Kit, Neurovent-PTO) are at the bedside. Pyxis access provisioned with Cerner credentials.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Code Blue Room',
        content: 'CRITICAL: ICU Code Blue ≠ Overhead Code Blue. ICU Code Blue = ICU team only. Overhead Code Blue = rest of hospital + full code team. Always confirm overhead is called. Charge nurse advises if help is needed.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'EEG / Epilepsy Reading Room',
        content: 'Where epilepsy fellow and attending read continuous EEGs. For urgent questions, walk over — report turnaround can lag rounds. Ice+EEG and Fire+EEG TigerConnect chats are the asynchronous channel.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Conference Rooms',
        content: '4th-floor Barrow: primary for case conference, multidisciplinary rounds, faculty meetings. 6th-floor: overflow and didactic. Mercy 1st-floor: cross-SJHMC convening.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Barrow Lounge',
        content: 'Coffee, food storage, decompression. Bring your own mug; it\'s a shared resource.'
      }
    },
    { type: 'heading', content: { text: 'Outside the Unit' } },
    {
      type: 'paragraph',
      content: {
        text: 'ED: Most patients arrive here. Bring phone, stethoscope, protocols. Stroke codes: stroke team staffs first, you contact NCC attending if admission to 4NBC. CT Scanner: Door-to-CT goal ≤25 min for ICH transfers.'
      }
    },
    { type: 'heading', content: { text: 'The 60-Second Drill' } },
    {
      type: 'paragraph',
      content: {
        text: 'Practice: (1) Patient posturing + anisocoria → cranial access kit (Pyxis). (2) ICU Code Blue only → confirm overhead activated. (3) Epileptologist question overnight → EEG reading room or TigerConnect. (4) Staff new aSAH with attending before family → Attending office or TigerConnect.'
      }
    }
  ]
};

// Rich content for M01.L3
const m01l3Content = {
  title: 'The NCC Team: Ice, Fire, and Everyone Around You',
  duration_min: 20,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    {
      type: 'paragraph',
      content: {
        text: 'By the end of this lesson: (1) Distinguish Ice and Fire teams — coverage, lists, downgrades. (2) Describe attending coverage — daytime, nighttime, in-house-until-midnight. (3) Identify every team role — APP, residents, fellows, pharmacy, RT, RN, charge, EEG, social work, therapy. (4) Know which TigerConnect role for time of day and question type.'
      }
    },
    { type: 'heading', content: { text: 'Section 1 — Ice vs. Fire' } },
    {
      type: 'paragraph',
      content: {
        text: 'Ice: patient list "NCC Ice", day attending "Ice", night attending "Fire" (TigerText), downgrades to Blue team. Fire: patient list "NCC Fire", day attending "Fire", night attending same (in-house ~midnight, phone after), downgrades to Red team. Names are scheduling labels — no clinical meaning.'
      }
    },
    { type: 'heading', content: { text: 'Attending Coverage' } },
    {
      type: 'paragraph',
      content: {
        text: 'Daytime: 8 AM rounds (or after grand rounds Friday), available all day, PM rounds at discretion, 4:30–5 PM handoff. Night: neurointensivist in-house until ~midnight, then by phone. PCCM 24/7 — backup for codes, respiratory emergencies. Notify when intubating, starting NIV, pre-extubation.'
      }
    },
    { type: 'heading', content: { text: 'When to Call the Attending' } },
    {
      type: 'warning',
      content: {
        text: 'Change in neuro exam. Unexpected imaging. Hypotension/arrhy/troponin/transfusion. CVA need. Respiratory worsening, intubation watch, NIV, plateau changes. Pre-extubation. Pre-antibiotic. Emergent OR. Unplanned procedure. Unexpected death/code. ANYTHING YOU\'RE UNSURE OF.'
      }
    },
    { type: 'heading', content: { text: 'Team Roles' } },
    {
      type: 'paragraph',
      content: {
        text: 'Neurology residents: 2 per team, 8 patients each, 6 off-days/4-week. Neurosurgery: 1 per Ice, co-manages SAH/ICH/post-op. Fellows: NCC + epilepsy.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Pharmacist (Tyler Haller): On rounds, owns med rec, HTS, sedation, antibiotics, AC reversal, pentobarbital, PRIS. RT: 24/7, vent setup, suctioning, NIV, ETCO2. Bedside RN: whiteboard, ASCOM, contact info. Charge RN: bed map, staffing, triage. EEG tech / Epilepsy fellow: 30-min setup, interpret + TigerText. Social Work / PT/OT/SLP: Early orders (especially DoC flag).'
      }
    },
    { type: 'heading', content: { text: 'TigerConnect Quick Reference' } },
    {
      type: 'paragraph',
      content: {
        text: 'Ice Resident 1/2 (daytime) | Fire Resident 1/2 (daytime) | NCC Attending 24/7 | NCC Fire (night after midnight) | Ice+EEG / Fire+EEG (EEG team) | Pharmacy (pharmacist)'
      }
    },
    { type: 'heading', content: { text: 'Progress Note Signature' } },
    {
      type: 'paragraph',
      content: {
        text: 'Update each morning: ASCOM #, daytime end time, nighttime contact. MUST match patient\'s whiteboard.'
      }
    }
  ]
};

// Rich content for M01.L4
const m01l4Content = {
  title: 'NCC Roles by Patient Type: Primary, Co-Managed, Consult',
  duration_min: 25,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    {
      type: 'paragraph',
      content: {
        text: 'By the end: (1) Differentiate Primary/Co-managed/Consult roles + scope. (2) List typical diagnoses per role. (3) Decide what you can order, coordinate, advise. (4) Recognize gray zones — emergencies, family meetings.'
      }
    },
    { type: 'heading', content: { text: 'Why This Matters' } },
    {
      type: 'paragraph',
      content: {
        text: 'Same NCC team can be primary one bed, consultant the next. Understanding scope keeps you (a) inside scope, (b) collegial, (c) medico-legally protected. Early APP friction stems from orders under wrong role.'
      }
    },
    { type: 'heading', content: { text: 'The Three Roles' } },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Primary',
        text: 'Own patient. Write H&P. Place all orders. Direct disposition. Consult others.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Co-managing',
        text: 'Routine orders (sedation, electrolytes, fever, DVT) OK. Large decisions + family meetings require primary coordination.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Consult',
        text: 'Recommendations only. Orders + family meetings need primary\'s expressed permission.'
      }
    },
    { type: 'heading', content: { text: 'NCC Primary Diagnoses' } },
    {
      type: 'paragraph',
      content: {
        text: 'Status epilepticus. Neuromuscular (GBS, MG) requiring ICU. Meningitis. Autoimmune encephalitis/demyelinating.'
      }
    },
    { type: 'heading', content: { text: 'NCC Co-managed' } },
    {
      type: 'paragraph',
      content: {
        text: 'SAH (NSGY primary). ICH no lesion (Stroke primary). ICH + lesion (NSGY). Endovascular complications. Shunt infection. DI post-op. AIS at risk. Cerebellar/brainstem stroke. Neoplasm requiring ICU.'
      }
    },
    { type: 'heading', content: { text: 'NCC Consult' } },
    {
      type: 'paragraph',
      content: {
        text: 'Moderate/severe TBI (TICU). Post-cardiac arrest (MICU/CTICU). Toxidromes + seizure/encephalopathy (MICU). ICU/ECMO + AMS. ECMO + stroke/ICH. Severe heatstroke.'
      }
    },
    { type: 'heading', content: { text: 'Order Authority Quick Reference' } },
    {
      type: 'paragraph',
      content: {
        text: 'Sedation titration: Primary ✓ | Co-managed ✓ (notify major) | Consult recommend. Electrolytes: All ✓ for primary/co-managed. Fever workup: ✓/✓ notify. DVT: ✓/✓ coordinate. Antibiotics: ✓ notify attending / ✓ notify both. Vasopressors: ✓ notify / ✓ notify both.'
      }
    },
    { type: 'heading', content: { text: 'Emergent Gray Zones' } },
    {
      type: 'warning',
      content: {
        text: 'Consult herniating when primary not bedside? ACT in patient\'s best interest. DOCUMENT time-critical. NOTIFY primary + NCC attending PARALLEL. Reset when primary arrives.'
      }
    },
    { type: 'heading', content: { text: 'Family Meetings on Consult' } },
    {
      type: 'paragraph',
      content: {
        text: 'Don\'t run solo. Inform primary. Participate if invited. Answer neuro questions. Document. Primary leads goals-of-care.'
      }
    },
    { type: 'heading', content: { text: 'Case Vignette 1' } },
    {
      type: 'case-vignette',
      content: {
        stem: '56 y/o thalamic ICH, no lesion, GCS 11, SBP 215. Stroke admits.',
        role: 'Co-managed',
        correct_action: 'Initiate nicardipine per bundle, titrate, notify stroke attending, labs, head CT q6h. Coordinate surgical referral if expansion.'
      }
    },
    { type: 'heading', content: { text: 'Case Vignette 2' } },
    {
      type: 'case-vignette',
      content: {
        stem: '22 y/o severe TBI, GCS 6, intubated, ICP 28 on arrival, TICU attending in trauma bay.',
        role: 'Consult',
        correct_action: 'URGENT: Treat ICP per protocol (HTS/mannitol Tier 1). Document urgency. Notify TICU + NCC attending parallel. Coordinate HTS, sedation, NSGY, family. Reset when TICU bedside.'
      }
    },
    { type: 'heading', content: { text: 'Case Vignette 3' } },
    {
      type: 'case-vignette',
      content: {
        stem: '67 y/o myasthenic crisis, day 3 plasmapheresis. Husband: "keep going?"',
        role: 'Primary',
        correct_action: 'Sit down, answer, document, schedule formal meeting if needed. Own this.'
      }
    }
  ]
};

async function populateContent() {
  try {
    console.log('📝 Populating rich lesson content...\n');

    const lessons = [
      { title: 'Welcome, Faculty, and the Culture of Speaking Up', content: m01l1Content },
      { title: 'Unit Geography: 4NNB, 4NNC, and Everything Around Them', content: m01l2Content },
      { title: 'The NCC Team: Ice, Fire, and Everyone Around You', content: m01l3Content },
      { title: 'NCC Roles by Patient Type: Primary, Co-Managed, Consult', content: m01l4Content }
    ];

    for (const lesson of lessons) {
      const { error } = await supabase
        .from('module_lessons')
        .update({ content: JSON.stringify(lesson.content) })
        .eq('title', lesson.title);

      if (error) {
        console.error(`❌ Error updating ${lesson.title}:`, error);
      } else {
        console.log(`✅ Populated: ${lesson.title}`);
      }
    }

    console.log('\n✨ Rich content loaded! Visit http://localhost:3000 to view');

  } catch (err) {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
  }
}

populateContent();
