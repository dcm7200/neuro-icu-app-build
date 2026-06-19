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

// FULL DETAILED CONTENT FOR M01.L1
const m01l1Content = {
  title: 'Welcome, Faculty, and the Culture of Speaking Up',
  duration_min: 15,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    {
      type: 'paragraph',
      content: {
        text: 'By the end of this lesson, you will be able to:'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '1. Identify the Section Head and core faculty of BNI Neurocritical Care and describe the scope of attending coverage'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '2. Articulate the "speak-up" expectation that defines our team culture and the four specific situations in which speaking up is required'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '3. Recognize that you are joining a multidisciplinary, regionalized, subspecialty service whose outcomes depend on team-based care — not individual heroics'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '4. Locate the Barrow NCC Resources website and the orientation materials you will need across your first 90 days'
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
      content: {
        icon: 'info',
        title: 'Section Head',
        text: 'Ruchira Jha, MD, MSc'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Core faculty (as of the orientation deck):'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '• Fiona Lynch, MD\n• Patrick Crooks, MD\n• Nassim Matin, MD\n• Aditya Kumar, MD'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'You will see additional names on protocols (Anusha Mangalampalli, MD; Nicholas Nelson, MD; Tyler Haller, PharmD; Chia-Ling Phuah, MD MS; Daniella Sisniega, MD), reflecting the broader committee structure that maintains our institutional protocols. The handbook you\'ll reference throughout this curriculum (the BNI Neurocritical Care Handbook 2026–2027) is authored by Mangalampalli, Kumar, and Nelson.'
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
        text: 'Every NCC attending has explicitly told incoming trainees the same thing — speak up. From the orientation deck:'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'The Core Ask',
        text: 'Speak up if you don\'t understand decisions or the patient situation. Speak up if you are uncomfortable with something. Speak up if you need help. No one will judge you for this — we need to know so we can help.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Translate this into four concrete trigger situations. You are expected to speak up:'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '1. When the plan doesn\'t make sense to you. "Help me understand why we\'re doing X" is always a legitimate question. The attending who can\'t answer it should be welcome.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '2. When you are uncomfortable with something. A medication dose, a family interaction, a colleague\'s tone — flag it.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '3. When you need help. Procedures, documentation, a tough exam — there is no penalty for asking.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '4. When something has gone wrong or is about to. Near-misses and adverse events are reviewed without blame. Debriefs (covered later in M01) exist for this purpose.'
      }
    },
    {
      type: 'warning',
      content: {
        text: 'This is non-negotiable. If you experience the opposite — judgment, dismissal, retaliation — that is a culture violation. Report it to your APP lead, the Section Head, or HR; that channel will be reviewed in your first-week one-on-one.'
      }
    },
    { type: 'heading', content: { text: 'Section 3 — Multidisciplinary by Design' } },
    {
      type: 'paragraph',
      content: {
        text: 'The Admission Diagnosis Guidelines for NCC Pod 4NNC open with this sentence: "Neurocritical Care (NCC) is a multidisciplinary specialty that is not about individual physicians, nurses, pharmacists, respiratory therapists, but rather developing a geographically regionalized and subspecialized team approach to patient care that has been shown to improve outcomes nationwide."'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Internalize this. Several practical consequences follow:'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '• Cohort our patients on 4NBC whenever possible. Geographic regionalization is part of why our outcomes are what they are. The downstream cascade — bedside RNs who do nothing but NCC, dedicated NCC pharmacy, RTs who have seen 200 EVDs — only works if our patients sleep in the right beds.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '• Consults still warrant cohorting if the NCC issues make up the bulk of the active problem list.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '• Outside-hospital transfers are NEVER delayed because of bed-by-bed criteria. Boarders are moved post-hoc.'
      }
    },
    { type: 'heading', content: { text: 'Section 4 — Where to Find Things' } },
    {
      type: 'paragraph',
      content: {
        text: 'Your day-one resources:'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Barrow NCC Resources website',
        content: 'Living repository of protocols, workflows, and reference cards. Access: OKTA → BNI intranet → "Barrow NCC Resources"'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'NCC orientation deck',
        content: 'The slide set whose principles you are reading now. Location: Resources website, "Orientation" folder'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Institutional protocols',
        content: 'ICP, ICH bundle, aSAH, status epilepticus, brain death, etc. Location: Resources website, "Protocols" folder'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'BNI Neurocritical Care Handbook 2026–2027',
        content: 'Pocket reference (PDF and print). Distribution: Distributed at orientation; PDF on Resources website'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Schedule (Amion)',
        content: 'Your shifts, attending of record, Ice vs. Fire assignment. Access: amion.com — credentials provided in week 1'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Your APP lead',
        content: 'First-line questions, scheduling, performance reviews. Lookup: Listed in your offer letter; introduction during week 1'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Pro Tip',
        text: 'If you cannot find a protocol on the Resources website, ask in the APP TigerConnect chat before doing the wrong thing. That is speaking up.'
      }
    },
    { type: 'heading', content: { text: 'Self-Check' } },
    {
      type: 'paragraph',
      content: {
        text: '1. Who is the Section Head of BNI Neurocritical Care?'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '2. Name three of the four situations in which you are required to speak up.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '3. Why does the service cohort patients on the 4NBC pods?'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '4. Where do you find the institutional ICP protocol if you need it at 3 AM on your first overnight admission?'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Answers',
        text: 'Non-graded — discuss with your APP lead during your week-1 check-in.'
      }
    },
    { type: 'heading', content: { text: 'What\'s Next' } },
    {
      type: 'paragraph',
      content: {
        text: 'M01.L2 — Unit geography: where every supply, conference room, and office is located.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'M01.L3 — The NCC team in detail: Ice vs. Fire, attending coverage windows, residents, fellows, RN, RT, pharmacy.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'M01.L4 — NCC roles by patient type: when we are primary, co-managing, or consulting — and what changes.'
      }
    }
  ]
};

// FULL DETAILED CONTENT FOR M01.L2
const m01l2Content = {
  title: 'Unit Geography: 4NNB, 4NNC, and Everything Around Them',
  duration_min: 20,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    {
      type: 'paragraph',
      content: { text: 'By the end of this lesson, you will be able to:' }
    },
    {
      type: 'paragraph',
      content: { text: '1. Locate the 4NNB and 4NNC neurocritical care pods and describe the bed footprint of each.' }
    },
    {
      type: 'paragraph',
      content: { text: '2. Locate the seven priority spaces you will need most often during a shift (APP office, attending office, supply Pyxis, conference rooms, lounge, EEG room, Code Blue room).' }
    },
    {
      type: 'paragraph',
      content: { text: '3. Locate the spaces outside the unit you will need (Emergency Room, Mercy 1st-floor conference room, 6th-floor conference room).' }
    },
    {
      type: 'paragraph',
      content: { text: '4. Retrieve supplies for an emergent procedure within 60 seconds.' }
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
      content: { text: '4NNC = 16 beds, primary NCC patients' }
    },
    {
      type: 'paragraph',
      content: { text: '4NNB = variable, co-managed and overflow' }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Operating principle (from the Admission Diagnosis Guidelines): "Whenever possible, unless there are extenuating circumstances, primary and co-managed neurocritical care patients should be admitted or cohorted to 4NBC rooms if available, and consults may need to be cohorted to 4NBC if neurocritical care issues make up the bulk of their active problem list."'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'When 4NBC is full and a patient is boarded elsewhere, post-hoc transfer back is preferred. Do not delay outside-hospital transfers waiting for a 4NBC bed.'
      }
    },
    { type: 'heading', content: { text: 'Section 2 — Inside the Unit' } },
    {
      type: 'paragraph',
      content: {
        text: 'These are the spaces enumerated on the APP Onboarding Checklist. Get badge access for all of them in your first week.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: '4NB/C APP Office',
        content: 'Where you sit between rounds, write notes, and decompress. Your locker (typically) and your team\'s printer. Tip: the APP office whiteboard often has the current TigerConnect role assignments — check it before signing in.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: '4NB/C NCC Attending Office',
        content: 'Where the daytime attending works between rounds. Knock first. Don\'t enter unannounced during family meetings, which sometimes spill into this space.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: '4NB/C Supply Pyxis',
        content: 'Houses high-acuity supplies pulled by RN and provider. Common items: cranial access kit, ventriculostomy pack, central-line trays, arterial-line kits, lumbar-puncture kits, US-guided IV kit, occipital-nerve-block tray. Procedure-specific kits (Raumedic Drill Kit CH5, Raumedic Bolt Kit PTO, Raumedic Neurovent-PTO) are attached to the Raumedic pole at the bedside, not in the Pyxis (see M09.L3). Pyxis access is provisioned with your Cerner credentials; if it doesn\'t work on day 1, page pharmacy.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Code Blue Room',
        content: 'Specific room (typically corner of the pod) used as the rapid-response location. CRITICAL: ICU Code Blue ≠ overhead Code Blue. ICU Code Blue notifies only the ICU team. Overhead Code Blue notifies the rest of the hospital and brings the full code team. Always confirm overhead is called. The charge nurse can advise if additional help is needed (covered in M03.L6).'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'EEG / Epilepsy Reading Room',
        content: 'Where the epilepsy fellow and attending read continuous EEGs. For urgent EEG questions, walk over rather than relying solely on Cerner — the wait for a formal report can lag rounds. The Ice + EEG and Fire + EEG TigerConnect chats are the asynchronous channel.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Conference Rooms (4th-floor Barrow, 6th-floor, Mercy 1st-floor)',
        content: '4th-floor Barrow Conference Room — primary location for case conference, multidisciplinary rounds, and the BNI faculty meetings. 6th-floor Conference Room — overflow and didactic sessions; some APP grand rounds. Mercy 1st-floor Conference Room 1 — used when teams from across SJHMC convene; physically separate from the main Barrow conference room.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Barrow Lounge',
        content: 'Coffee, food storage, decompression. Bring your own mug; the lounge is a shared resource.'
      }
    },
    { type: 'heading', content: { text: 'Section 3 — Raumedic Kit Location' } },
    {
      type: 'paragraph',
      content: {
        text: 'Raumedic Drill Kit CH5, Bolt Kit PTO, and Neurovent-PTO catheter are attached to the Raumedic pole at the bedside.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Cranial access kit and ventriculostomy pack live in the Pyxis.'
      }
    },
    { type: 'heading', content: { text: 'Section 4 — Outside the Unit' } },
    {
      type: 'collapsible',
      content: {
        title: 'Emergency Room',
        content: 'Stroke codes, status, deterioration; bring phone + protocols. Most of our patients arrive from the ED.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'CT Scanner',
        content: 'Door-to-CT ≤25 min for ICH transfers (M13.L4). Know the path from ED to CT.'
      }
    },
    { type: 'heading', content: { text: 'Section 5 — The 60-Second Drill' } },
    {
      type: 'paragraph',
      content: {
        text: 'For your first overnight, practice this drill until you can do it in under a minute without thinking:'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'Anisocoria + posturing on 4NNC',
        role: 'Procedure Prep',
        correct_action: 'Go to: Supply Pyxis for cranial access kit'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'Code Blue called via ICU button only',
        role: 'Response',
        correct_action: 'Action: Confirm an overhead Code Blue has been activated'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'Night epileptologist needs to talk about an overnight burst-suppression event',
        role: 'Contact',
        correct_action: 'Go to: EEG reading room or reach via Ice+EEG / Fire+EEG TigerConnect'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'Staff new aSAH admission with attending before family arrives',
        role: 'Coordination',
        correct_action: 'Start at: 4NB/C NCC Attending Office, or TigerConnect the SJHMC NCC Attending role if not there'
      }
    },
    { type: 'heading', content: { text: 'Self-Check' } },
    {
      type: 'paragraph',
      content: {
        text: '1. What is the difference between an ICU Code Blue and an overhead Code Blue, and why does it matter?'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '2. Where are the Raumedic kits physically located when you need to insert one?'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: '3. Why are NCC consult patients sometimes cohorted to 4NBC even though we are not their primary team?'
      }
    },
    { type: 'heading', content: { text: 'What\'s Next' } },
    {
      type: 'paragraph',
      content: {
        text: 'M01.L3 — Who is on the team and how Ice/Fire coverage works.'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'M01.L4 — Primary vs. co-managed vs. consult: what each role lets you do and what it requires.'
      }
    }
  ]
};

// FULL DETAILED CONTENT FOR M01.L3
const m01l3Content = {
  title: 'The NCC Team: Ice, Fire, and Everyone Around You',
  duration_min: 20,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    { type: 'paragraph', content: { text: '1. Distinguish the Ice and Fire teams in terms of coverage windows, patient lists, and who they downgrade to.' } },
    { type: 'paragraph', content: { text: '2. Describe attending coverage: daytime, nighttime, and the "in-house until midnight" window.' } },
    { type: 'paragraph', content: { text: '3. Identify every team role that touches an NCC patient — APP, residents (neurology + neurosurgery), fellows, pharmacy, RT, RN, charge RN, EEG, social work, case management, therapy — and what each one is responsible for.' } },
    { type: 'paragraph', content: { text: '4. Know which TigerConnect role to address depending on time of day and question type.' } },
    { type: 'heading', content: { text: 'Why This Lesson Matters' } },
    {
      type: 'paragraph',
      content: {
        text: 'You will need to reach the right person, at the right time, with the right amount of information. The team is large; the systems for finding each other (TigerConnect roles, Ascom phones, Amion) are layered on top of that. The orientation deck explicitly lists "Night coverage" as a unit-structure item — knowing who is in-house, who is on TigerConnect, and who you can wake up is part of your job.'
      }
    },
    { type: 'heading', content: { text: 'Section 1 — Ice vs. Fire' } },
    { type: 'paragraph', content: { text: 'The NCC service runs two parallel teams. Both cover 4NNB/4NNC patients; they split the list and the coverage windows.' } },
    {
      type: 'collapsible',
      content: {
        title: 'Ice Team',
        content: 'Patient list: "NCC Ice" (in Cerner). Day attending: Ice. Night attending: Fire (via Tigertext). Downgrades to: Blue team (general neurology)'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Fire Team',
        content: 'Patient list: "NCC Fire" (in Cerner). Day attending: Fire. Night attending: Same (in-house until ~midnight, by phone thereafter). Downgrades to: Red team (general neurology)'
      }
    },
    { type: 'heading', content: { text: 'Why the names' } },
    {
      type: 'paragraph',
      content: {
        text: '"Ice" and "Fire" are convenient (and unforgettable) team labels. They have no clinical meaning — they are scheduling buckets. The daytime team that "owns" a given attending\'s list is the team you present to and round with.'
      }
    },
    { type: 'heading', content: { text: 'List ownership and signout' } },
    {
      type: 'paragraph',
      content: { text: 'Every NCC patient is on either the NCC Ice or NCC Fire Cerner list.' } },
    {
      type: 'paragraph',
      content: {
        text: 'The NCC Fire team handles new admissions discussed with the night-covering attending. From Resident Responsibilities: "All patients newly admitted to the NCC service need to be discussed with the NCC attending covering the TigerText role \'SJHMC NCC Fire.\'"'
      }
    },
    {
      type: 'paragraph',
      content: {
        text: 'Between ~6 AM and 8 AM, the best way to know who to contact is to see who is covering the appropriate Tigertext role. Attending coverage transitions in that window.'
      }
    },
    { type: 'heading', content: { text: 'Attending Coverage' } },
    {
      type: 'paragraph',
      content: {
        text: 'From the orientation deck and the Resident Responsibilities document:'
      }
    },
    {
      type: 'paragraph',
      content: { text: '• Daytime attending (Ice or Fire) — owns morning rounds at 8 AM (or after grand rounds Friday). Available throughout the day for staffing, procedures, family meetings, and decisions.' } },
    {
      type: 'paragraph',
      content: { text: '• PM rounds happen at the discretion of the attending — bedside for some patients, "running the list" for others.' } },
    {
      type: 'paragraph',
      content: { text: '• Afternoon handoff — 4:30–5 PM, touch base with the NCC PM attending before signing out to the on-call resident or APP and the on-call neurosurgery resident.' } },
    {
      type: 'paragraph',
      content: { text: '• Night neurointensivist in-house until ~midnight "most weeks." After that, by phone.' } },
    {
      type: 'paragraph',
      content: { text: '• PCCM (Pulmonary/Critical Care) attending in-house 24/7 — backup for code blue, respiratory emergencies, anything that overruns NCC capacity. Notify when intubating, when starting NIV, before extubation, for new respiratory failure.' } },
    { type: 'heading', content: { text: 'When to Call the Attending — Non-Negotiable' } },
    {
      type: 'warning',
      content: {
        text: 'Call the attending for: Change in neurologic exam. Unexpected neuroimaging findings. Hypotension requiring vasopressors, arrhythmia, elevated troponin, blood-product transfusion. Need for central venous access. Worsening respiratory status, intubation watch, NIV initiation, plateau/peak pressure changes. Pre-extubation (also notify PCCM). Pre-antibiotic start. Neurosurgery plan for emergent operative intervention. Unplanned or major procedure. Unexpected death or code blue. Anything you are unsure of. ANYTIME YOU FEEL OVERWHELMED OR UNSURE WHAT TO DO FOR A PATIENT.'
      }
    },
    { type: 'heading', content: { text: 'Section 2 — Residents' } },
    {
      type: 'paragraph', content: { text: '• Two neurology residents per team (Ice 1/2, Fire 1/2) on most days.' } },
    {
      type: 'paragraph', content: { text: '• Each resident sees and writes progress notes on up to 8 patients.' } },
    {
      type: 'paragraph', content: { text: '• Off-days: 6 per 4-week rotation, 4 per 3-week rotation; clinic day + Fridays + weekends off-limits as off-days.' } },
    {
      type: 'paragraph', content: { text: '• Patient assignments typically inherit from the off-going resident.' } },
    {
      type: 'paragraph', content: { text: '• Neurosurgery resident: One per Ice team (typically). Co-manages co-managed patients (SAH, ICH with vascular lesion, post-op).' } },
    {
      type: 'paragraph', content: { text: '• Fellows: Neurocritical care fellows and epilepsy fellows rotate; you will work directly with the epilepsy fellow for cvEEG conversations.' } },
    { type: 'heading', content: { text: 'What this means for APPs' } },
    {
      type: 'paragraph',
      content: {
        text: 'You work alongside residents — not above or below them. The APP often carries the institutional memory of a complex patient across multiple resident rotations. During cross-cover, "this isn\'t my patient" is never a valid response (see M03.L6 — "it is not acceptable to say \'this is not my patient, I can\'t help you\' when issues arise; this is an ICU and the ICU never stops").'
      }
    },
    { type: 'heading', content: { text: 'Section 3 — Pharmacy, RT, Nursing' } },
    {
      type: 'collapsible',
      content: {
        title: 'NCC Clinical Pharmacy',
        content: 'Dedicated NCC pharmacist (Tyler Haller, PharmD, as of 2025) on rounds. Owns the medication reconciliation review, hypertonic saline management, sedation drips, antibiotic stewardship, anticoagulation reversal selection, pentobarbital coma management, propofol infusion syndrome monitoring. Get to know them in your first week. Their input on dose, route, and drug-drug interaction prevents a non-trivial fraction of errors. The orientation deck names them by example: "Tyler is phenomenal, but he should not be the only one looking at medications!" You still own the med rec.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Respiratory Therapy',
        content: '24/7 in-unit presence. Owns vent setup, suctioning, NIV initiation, ETCO₂, ventilator-management changes. Communicate vent changes (e.g., target PaCO₂ after intubation, brief therapeutic hyperventilation, ARDS protocol) directly to RT. For transport — RT travels with intubated patients; ensure matched minute ventilation and ETCO₂ monitoring.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Bedside RN and Charge RN',
        content: 'All ICU RNs are ACLS-certified. Charge RN runs the bed map, staffing, and triage. Charge RN tells you if additional help is needed during a Code Blue. Bedside RN updates the whiteboard with the daytime provider (you), your ASCOM number, how long you carry the patient, and who to page after.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'EEG technologists and the epilepsy team',
        content: 'EEG techs set up cvEEG; turnaround can be ~30 minutes from order. Epilepsy fellow / attending interprets and communicates via Ice + EEG / Fire + EEG TigerConnect chat and Cerner reports. For active patients, TigerText the team\'s EEG chat by ~0730 for overnight events.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Social Work and Case Management',
        content: 'Engaged early for complex disposition (placement, insurance, AMA risk, family dynamics). Always engaged for prolonged DOC patients (see M37).'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Acute Therapy (PT/OT/SLP)',
        content: 'Engaged early — even on intubated, non-following patients — for the Disorders of Consciousness pathway (see M37). Order all three disciplines with "DoC" in order comments. SLP performs bedside swallow / FEES / VFSS (see M30.L2).'
      }
    },
    { type: 'heading', content: { text: 'Section 4 — The TigerConnect Address Book' } },
    {
      type: 'paragraph', content: { text: 'You will use TigerConnect (Tigertext) every single shift. The roles below are the most common; full role list is in M02.L2.' } },
    {
      type: 'collapsible',
      content: {
        title: 'SJHMC NCC Ice Resident 1 / 2',
        content: 'Daytime Ice neurology resident(s)'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'SJHMC NCC Fire Resident 1 / 2',
        content: 'Daytime Fire neurology resident(s)'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'SJHMC Neuro Critical Care - Attending',
        content: 'Whoever is the call NCC attending right now (covers admissions 24/7)'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'SJHMC NCC Fire',
        content: 'Night-covering attending after ~midnight (in-house until midnight most weeks)'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'NCC Resident',
        content: 'Generic NCC resident role (used during cross-cover and signout)'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Ice + EEG / Fire + EEG',
        content: 'Group chat with the EEG team for that service'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: 'Pharmacy',
        content: 'Direct line to the NCC pharmacist'
      }
    },
    { type: 'heading', content: { text: 'Progress Note Signature Discipline' } },
    {
      type: 'paragraph',
      content: {
        text: 'Update your signature in the progress note every morning with: ASCOM number for your team, the end time of your daytime coverage (e.g., "ASCOM #XXXX until 5 PM"), nighttime contact (e.g., "Neurology pager 6-7400 5pm–7am"). This signature must match what is written on the patient\'s whiteboard.'
      }
    },
    { type: 'heading', content: { text: 'Self-Check' } },
    {
      type: 'case-vignette',
      content: {
        stem: 'New aSAH admission at 2 AM',
        role: 'TigerConnect Question',
        correct_action: 'Which Tigertext role do you staff with? Answer: SJHMC Neuro Critical Care - Attending'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'Fire team downgrading a patient to general neurology this afternoon',
        role: 'Downgrade Pathway',
        correct_action: 'Which team accepts the patient? Answer: Red team'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'Bedside RN calls about vent dyssynchrony at 11 PM',
        role: 'Notification',
        correct_action: 'Who else do you notify besides NCC attending? Answer: Respiratory Therapy'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'Pre-extubation planning',
        role: 'Notification List',
        correct_action: 'Who do you notify? Answer: NCC attending + PCCM attending'
      }
    },
    { type: 'heading', content: { text: 'What\'s Next' } },
    { type: 'paragraph', content: { text: 'M01.L4 — Primary vs. co-managed vs. consult: when does the role change what you are allowed to do?' } }
  ]
};

// FULL DETAILED CONTENT FOR M01.L4
const m01l4Content = {
  title: 'NCC Roles by Patient Type: Primary, Co-Managed, Consult',
  duration_min: 25,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    { type: 'paragraph', content: { text: '1. Differentiate the three NCC patient-care roles (Primary, Co-managed, Consult) and the scope of authority each carries.' } },
    { type: 'paragraph', content: { text: '2. List the typical diagnoses that fall under each role at BNI/SJHMC.' } },
    { type: 'paragraph', content: { text: '3. Decide, for any given patient, what you can place orders for, what you must clear with the primary team, and what is solely advisory.' } },
    { type: 'paragraph', content: { text: '4. Recognize the gray zones — emergent situations, deteriorations, family meetings — and the rules for navigating them.' } },
    { type: 'heading', content: { text: 'Why This Lesson Matters' } },
    {
      type: 'paragraph',
      content: {
        text: 'The same NCC team can be the patient\'s primary service for one bed and a recommendation-only consultant in the bed next door. Understanding the role for each patient is what keeps you (a) inside scope, (b) collegial with neurosurgery, trauma, and medicine, and (c) protected medico-legally. This is also the source of most early friction for new APPs — orders placed under the wrong role generate phone calls and bad feelings fast.'
      }
    },
    { type: 'heading', content: { text: 'Section 1 — The Three Roles' } },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Primary',
        text: 'As the primary team, NCC is responsible for directing patient\'s overall care, performing procedures, placing orders, consulting other specialists as needed, and discharging from the ICU — among many other tasks. You own the patient. You write the H&P. You place all the orders. You direct disposition. Other services are consultants to you.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Co-managing',
        text: 'As a co-managing team, NCC works closely with the primary team to support patients through their ICU stay, which may include performing procedures, placing orders and participating in family meetings while in close contact with the primary team before making large management decisions. You and the primary team share decision-making. Routine orders (sedation titration, electrolyte replacement, fever workup, DVT prophylaxis) are within scope; large management decisions (intubation, surgical questions, code status, transitions of care) require explicit coordination with the primary team. Same applies to family meetings.'
      }
    },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Consult',
        text: 'As a consult team, NCC makes recommendations to the primary team, and may place orders and participate in family meetings only with primary teams\' expressed permission. You make recommendations. You do not place orders independently. You do not run family meetings independently. Even routine orders require the primary team\'s explicit permission when NCC is consulting.'
      }
    },
    { type: 'heading', content: { text: 'Documentation by Role' } },
    {
      type: 'paragraph', content: { text: 'Primary: full H&P, daily progress notes, transfer/discharge summary, code-status discussions, family-meeting notes.' } },
    {
      type: 'paragraph', content: { text: 'Co-managed: daily progress notes written from your service\'s perspective (typically a "co-management" note), parallel to the primary team\'s note.' } },
    {
      type: 'paragraph', content: { text: 'Consult: consult note with explicit recommendations; daily follow-up note when active.' } },
    { type: 'heading', content: { text: 'Section 2 — Who Falls Where at BNI/SJHMC' } },
    {
      type: 'paragraph', content: { text: 'Below is the current breakdown from the NCC Patient Care Roles document. This is the operating reality; deviations require attending-to-attending agreement.' } },
    { type: 'heading', content: { text: 'NCC Primary Diagnoses' } },
    {
      type: 'paragraph', content: { text: '• Patients with status epilepticus or at risk of status epilepticus (M11 module)' } },
    {
      type: 'paragraph', content: { text: '• Neuromuscular disease (Guillain-Barré, Myasthenia Gravis) requiring ICU (M17 module)' } },
    {
      type: 'paragraph', content: { text: '• Infectious meningitis requiring ICU (M18 module)' } },
    {
      type: 'paragraph', content: { text: '• Autoimmune encephalitis, demyelinating conditions requiring ICU (M19 module)' } },
    { type: 'heading', content: { text: 'NCC Co-managed Diagnoses' } },
    {
      type: 'paragraph', content: { text: '• Spontaneous subarachnoid hemorrhage (primary: Neurosurgery)' } },
    {
      type: 'paragraph', content: { text: '• Spontaneous ICH without vascular lesion (primary: Stroke)' } },
    {
      type: 'paragraph', content: { text: '• Spontaneous ICH with vascular lesion (primary: Neurosurgery)' } },
    {
      type: 'paragraph', content: { text: '• Elective endovascular complications (primary: Endovascular Neurosurgery)' } },
    {
      type: 'paragraph', content: { text: '• Shunt infection, acute hydrocephalus (primary: Neurosurgery)' } },
    {
      type: 'paragraph', content: { text: '• Suprasellar surgery with diabetes insipidus (primary: Neurosurgery)' } },
    {
      type: 'paragraph', content: { text: '• Acute ischemic stroke at high risk for decompensation (primary: Stroke)' } },
    {
      type: 'paragraph', content: { text: '• Large cerebellar or brainstem stroke (primary: Stroke)' } },
    {
      type: 'paragraph', content: { text: '• Intracranial or spinal neoplasms requiring ICU (primary: Often Neurosurgery)' } },
    { type: 'heading', content: { text: 'NCC Consult Diagnoses' } },
    {
      type: 'paragraph', content: { text: '• Moderate/severe traumatic brain injury (primary: TICU)' } },
    {
      type: 'paragraph', content: { text: '• Cardiac arrest with suspected anoxic brain injury (primary: Generally MICU or CTICU)' } },
    {
      type: 'paragraph', content: { text: '• Toxidromes with seizures or encephalopathy (primary: MICU)' } },
    {
      type: 'paragraph', content: { text: '• ICU/ECMO patients with altered mental status (primary: MICU, TICU, CTICU)' } },
    {
      type: 'paragraph', content: { text: '• ECMO patients with stroke/ICH (primary: CTICU)' } },
    {
      type: 'paragraph', content: { text: '• Severe heatstroke (primary: MICU)' } },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'Reminder',
        text: 'From the Admission Diagnosis Guidelines: "Consult for post-cardiac arrest, brain death, and severe TBI (goal to automate, work in progress); will be considered for transfer as a case-by-case discussion between primary teams and neurocritical care consult depending on their other ICU needs."'
      }
    },
    { type: 'heading', content: { text: 'Section 3 — Putting It Into Practice' } },
    {
      type: 'paragraph', content: { text: 'Routine orders by role:' } },
    {
      type: 'paragraph', content: { text: 'Sedation drip titration: Primary (Yes) | Co-managed (Yes, notify if major change) | Consult (No, recommend only)' } },
    {
      type: 'paragraph', content: { text: 'Electrolyte replacement: Primary (Yes) | Co-managed (Yes) | Consult (No, recommend only)' } },
    {
      type: 'paragraph', content: { text: 'Fever workup: Primary (Yes) | Co-managed (Yes, notify primary) | Consult (No, recommend only)' } },
    {
      type: 'paragraph', content: { text: 'DVT prophylaxis: Primary (Yes) | Co-managed (Yes, coordinate with NSGY timing post-op) | Consult (No, recommend only)' } },
    {
      type: 'paragraph', content: { text: 'Antibiotic initiation: Primary (Yes, notify attending) | Co-managed (Yes, notify primary + attending) | Consult (Recommend only)' } },
    {
      type: 'paragraph', content: { text: 'Antihypertensive drip: Primary (Yes) | Co-managed (Yes, coordinate goals with primary) | Consult (Recommend only)' } },
    {
      type: 'paragraph', content: { text: 'Hypertonic saline / mannitol: Primary (Yes) | Co-managed (Yes) | Consult (Recommend only, urgent exception below)' } },
    {
      type: 'paragraph', content: { text: 'Vasopressor initiation: Primary (Yes, notify attending) | Co-managed (Yes, notify primary + attending) | Consult (Recommend only)' } },
    {
      type: 'paragraph', content: { text: 'AC reversal: Primary (Yes) | Co-managed (Yes, coordinate with primary) | Consult (Recommend only)' } },
    {
      type: 'paragraph', content: { text: 'Surgical consult: Primary (Yes) | Co-managed (Coordinate first) | Consult (Coordinate with primary)' } },
    {
      type: 'paragraph', content: { text: 'Code status / GOC family meeting: Primary (Yes) | Co-managed (With primary) | Consult (Only with primary\'s expressed permission)' } },
    {
      type: 'paragraph', content: { text: 'ICU discharge / transfer: Primary (Yes) | Co-managed (With primary) | Consult (N/A, primary decides)' } },
    { type: 'heading', content: { text: 'Emergent Gray Zones' } },
    {
      type: 'warning',
      content: {
        text: 'The roles document is explicit that NCC\'s authority is broader when the patient is acutely decompensating, even on a consult. If your TBI consult patient is herniating and the TICU team is not at bedside, you do what the patient needs (hyperosmolar, ventilator adjustments, NSGY page) and document the urgency. Standard rule: act in the patient\'s best interest, document the time-pressure, and notify both the primary team and the NCC attending in parallel.'
      }
    },
    { type: 'heading', content: { text: 'Family Meetings on Consults' } },
    {
      type: 'paragraph', content: { text: 'Do not run a family meeting without the primary team\'s express permission. If the family is escalating or seeking a meeting, your role is to inform the primary team, offer to participate if invited, and document any conversations you do have (which is allowed — you can answer the family\'s neurological questions if asked) — but the goals-of-care lead is the primary team.' } },
    { type: 'heading', content: { text: 'Section 4 — Case Vignettes' } },
    {
      type: 'case-vignette',
      content: {
        stem: 'A 56 y/o presents with spontaneous, deep right thalamic ICH, no vascular lesion on CTA, GCS 11. Stroke admits to NCC pod. RN calls about SBP 215.',
        role: 'Co-managed (Stroke primary, NCC co-managed)',
        correct_action: 'You can do: Initiate nicardipine drip and titrate to SBP goal per the 2025 ICH Bundle Algorithm; notify stroke attending of initiation. Order labs, head CT q6h, DVT bundle. You should coordinate: Surgical referral if hematoma expands or develops mass effect.'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'A 22 y/o with TBI from a motorcycle crash, GCS 6, intubated, ICP monitor placed by NSGY. TICU primary. ICPs are 28 on arrival to your unit; the TICU attending is rounding on a trauma bay across the hospital.',
        role: 'Consult (TICU primary, NCC consult)',
        correct_action: 'You can do: Treat the emergent ICP elevation per the institutional ICP protocol (Tier 1 — HTS or mannitol bolus) given the immediate threat to brain. Document the time-critical reason. Notify TICU attending and NCC attending in parallel. You should coordinate: Hypertonic saline scheduled dosing, sedation escalation, NSGY interventions, family communication. Reset the boundaries the moment TICU is at bedside.'
      }
    },
    {
      type: 'case-vignette',
      content: {
        stem: 'A 67 y/o with myasthenic crisis on the NCC service, day 3 of plasmapheresis. The husband stops you in the hallway and asks "should we keep going?"',
        role: 'Primary',
        correct_action: 'You can do: Sit down with the husband, answer his question, document the conversation, schedule a formal family meeting with the attending if needed. You own this conversation.'
      }
    },
    { type: 'heading', content: { text: 'Self-Check' } },
    {
      type: 'paragraph', content: { text: '1. Severe TBI patient comes from the ED with ICP monitor in place. Who is primary? What is NCC?' } },
    {
      type: 'paragraph', content: { text: '2. SAH patient on day 4 develops TCD velocities of 220 cm/s in the left MCA. You want to start induced hypertension. Who do you call before placing the order?' } },
    {
      type: 'paragraph', content: { text: '3. Post-cardiac-arrest patient on the medicine service is consulted to NCC. Their family is asking about prognosis. What do you do?' } },
    { type: 'heading', content: { text: 'What\'s Next' } },
    {
      type: 'paragraph', content: { text: 'You\'ve completed Phase 1, Module 1. Next module: M02 — Clinical Tools & System Access. You\'ll get Cerner, TigerConnect, Hybrid Chart, PACS, and EEG access wired up for your first shift.' } }
  ]
};

async function populateFullContent() {
  try {
    console.log('🏗️  Populating FULL lesson content with all detailed blocks...\n');

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
        console.log(`✅ ${lesson.title} — ${lesson.content.blocks.length} blocks`);
      }
    }

    console.log('\n✨ ALL lessons fully populated with detailed, rich content!');
    console.log('📚 Total content blocks: 90+');
    console.log('🎯 Ready to view at http://localhost:3000/modules\n');

  } catch (err) {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
  }
}

populateFullContent();
