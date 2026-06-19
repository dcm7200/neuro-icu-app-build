#!/usr/bin/env node
// Converts M01.L1 and M01.L2 from old JSON curriculum format → blocks format
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
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

// ── M01.L1 ──────────────────────────────────────────────────────────────────

const m01l1Content = {
  title: 'Welcome, Faculty, and the Culture of Speaking Up',
  duration_min: 15,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    { type: 'paragraph', content: { text: '1. Identify the Section Head and core faculty of BNI Neurocritical Care and describe the scope of attending coverage.' } },
    { type: 'paragraph', content: { text: '2. Articulate the "speak-up" expectation that defines our team culture and the four specific situations in which speaking up is required.' } },
    { type: 'paragraph', content: { text: '3. Recognize that you are joining a multidisciplinary, regionalized, subspecialty service whose outcomes depend on team-based care — not individual heroics.' } },
    { type: 'paragraph', content: { text: '4. Locate the Barrow NCC Resources website and the orientation materials you will need across your first 90 days.' } },

    { type: 'callout', content: { icon: 'info', title: 'Why This Lesson Matters', text: 'Neurocritical care patients deteriorate fast. The cost of staying silent when you are uncertain is measured in brain. Every faculty member has explicitly committed to a culture where the most junior person in the room can stop the line. Read this first — the clinical content that follows assumes you have internalized this expectation.' } },

    { type: 'heading', content: { text: 'Section 1 — Who You Are Joining' } },
    { type: 'paragraph', content: { text: 'BNI Neurocritical Care provides intensive care for patients with primary neurological injury or critical illness with neurological consequences. We operate at St. Joseph\'s Hospital and Medical Center in Phoenix, Arizona. The service runs on two parallel teams — Ice and Fire — covering the 4NNB and 4NNC pods, with attending coverage 24/7.' } },
    { type: 'paragraph', content: { text: 'Section Head: Ruchira Jha, MD, MSc' } },
    {
      type: 'table',
      content: {
        headers: ['Faculty', 'Role'],
        rows: [
          ['Fiona Lynch, MD', 'Core faculty'],
          ['Patrick Crooks, MD', 'Core faculty'],
          ['Nassim Matin, MD', 'Core faculty'],
          ['Aditya Kumar, MD', 'Core faculty'],
          ['Anusha Mangalampalli, MD', 'Protocol committee; BNI Handbook co-author'],
          ['Nicholas Nelson, MD', 'Protocol committee; BNI Handbook co-author'],
          ['Tyler Haller, PharmD', 'Protocol committee'],
          ['Chia-Ling Phuah, MD MS', 'Protocol committee'],
          ['Daniella Sisniega, MD', 'Protocol committee'],
        ]
      }
    },
    { type: 'callout', content: { icon: 'info', title: 'APP Positioning', text: 'Advanced Practice Providers — NPs and PAs — are core members of the NCC service. You are not "covering" for residents. You are partners. Your scope includes admissions, daily progress, procedures, family communication, and discharge planning.' } },

    { type: 'heading', content: { text: 'Section 2 — Our Culture: Speak Up' } },
    { type: 'paragraph', content: { text: 'Every NCC attending has told incoming providers the same thing: speak up. From the orientation deck: "Speak up if you don\'t understand decisions or the patient situation. Speak up if you are uncomfortable with something. Speak up if you need help. No one will judge you for this — we need to know so we can help."' } },
    { type: 'paragraph', content: { text: 'You are expected to speak up in four concrete situations:' } },
    {
      type: 'table',
      content: {
        headers: ['Situation', 'What to say'],
        rows: [
          ['The plan doesn\'t make sense to you', '"Help me understand why we\'re doing X." Always a legitimate question.'],
          ['You\'re uncomfortable with something', 'Flag it — medication dose, a family interaction, a colleague\'s tone.'],
          ['You need help', 'Procedures, documentation, a tough exam — no penalty for asking.'],
          ['Something has gone wrong or is about to', 'Near-misses and adverse events are reviewed without blame. Debriefs exist for this.'],
        ]
      }
    },
    { type: 'warning', content: { text: 'If you experience the opposite — judgment, dismissal, retaliation — that is a culture violation. Report it to your APP lead, the Section Head, or HR. This is non-negotiable.' } },

    { type: 'heading', content: { text: 'Section 3 — Multidisciplinary by Design' } },
    { type: 'paragraph', content: { text: 'From the Admission Diagnosis Guidelines: "Neurocritical Care is a multidisciplinary specialty that is not about individual physicians, nurses, pharmacists, respiratory therapists, but rather developing a geographically regionalized and subspecialized team approach to patient care that has been shown to improve outcomes nationwide."' } },
    { type: 'paragraph', content: { text: 'Cohort primary and co-managed patients on 4NNC whenever possible. Geographic regionalization is part of why our outcomes are what they are. Consult patients can still be cohorting candidates if NCC issues dominate the active problem list. Outside-hospital transfers are never delayed because of bed-by-bed criteria — boarders are moved post-hoc.' } },

    { type: 'heading', content: { text: 'Section 4 — Where to Find Things' } },
    {
      type: 'table',
      content: {
        headers: ['Resource', 'Purpose', 'Where'],
        rows: [
          ['Barrow NCC Resources website', 'Living repository of protocols, workflows, reference cards', 'OKTA → BNI intranet → "Barrow NCC Resources"'],
          ['NCC orientation deck', 'The slide set whose principles you are reading now', 'Resources website, "Orientation" folder'],
          ['Institutional protocols', 'ICP, ICH bundle, aSAH, status epilepticus, brain death, etc.', 'Resources website, "Protocols" folder'],
          ['BNI NCC Handbook 2026–2027', 'Pocket reference (PDF and print)', 'Distributed at orientation; PDF on Resources website'],
          ['Schedule (Amion)', 'Your shifts, attending of record, Ice vs. Fire assignment', 'amion.com — credentials provided week 1'],
          ['Your APP lead', 'First-line questions, scheduling, performance reviews', 'Listed in your offer letter; introduction during week 1'],
        ]
      }
    },
    { type: 'callout', content: { icon: 'info', text: 'If you cannot find a protocol on the Resources website, ask in the APP TigerConnect chat before doing the wrong thing. That is speaking up.' } },

    { type: 'heading', content: { text: 'Self-Check' } },
    { type: 'paragraph', content: { text: '1. Who is the Section Head of BNI Neurocritical Care?' } },
    { type: 'paragraph', content: { text: '2. Name three of the four situations in which you are required to speak up.' } },
    { type: 'paragraph', content: { text: '3. Why does the service cohort patients on the 4NNC pod?' } },
    { type: 'paragraph', content: { text: '4. Where do you find the institutional ICP protocol if you need it at 3 AM on your first overnight admission?' } },
    { type: 'callout', content: { icon: 'info', text: 'Answers are non-graded — discuss with your APP lead during your week-1 check-in.' } },
  ]
};

// ── M01.L2 ──────────────────────────────────────────────────────────────────

const m01l2Content = {
  title: 'Unit Geography: 4NNB, 4NNC, and Everything Around Them',
  duration_min: 20,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    { type: 'paragraph', content: { text: '1. Locate the 4NNB and 4NNC neurocritical care pods and describe the bed footprint of each.' } },
    { type: 'paragraph', content: { text: '2. Find the seven physical spaces you will need most often during a shift.' } },
    { type: 'paragraph', content: { text: '3. Know where supplies and equipment are located.' } },
    { type: 'paragraph', content: { text: '4. Navigate the unit in under 60 seconds when it matters.' } },

    { type: 'callout', content: { icon: 'info', title: 'Why This Lesson Matters', text: 'When a patient deteriorates, you need to move. Not know where to go — move. This lesson is the physical map of your workplace. Walk it on your first day before rounds start.' } },

    { type: 'heading', content: { text: 'Section 1 — The Two NCC Pods' } },
    { type: 'paragraph', content: { text: 'Both pods are on the 4th floor of St. Joseph\'s Hospital and Medical Center. They are adjacent. They function as one service operationally but are physically distinct pod spaces.' } },
    {
      type: 'table',
      content: {
        headers: ['Pod', 'Beds', 'Primary use', 'Notes'],
        rows: [
          ['4NNC', '16', 'Primary NCC patients', 'Cohort here first — dedicated NCC nursing and pharmacy'],
          ['4NNB', 'Variable', 'Overflow and co-managed patients', 'Use when 4NNC is full; still on the NCC service'],
        ]
      }
    },
    { type: 'callout', content: { icon: 'info', title: 'Cohorting matters', text: 'Geographic regionalization produces better outcomes. 4NNC has bedside RNs who do nothing but NCC, dedicated pharmacy, RTs who have managed hundreds of EVDs. Cohort every primary and co-managed patient here when possible.' } },

    { type: 'heading', content: { text: 'Section 2 — Seven Spaces You Need Most' } },
    {
      type: 'collapsible',
      content: {
        title: '1. APP Office',
        content: 'Where you sit, write notes, decompress between calls. The whiteboard here shows current TigerConnect role assignments for the shift — check it when you arrive. Printer is here. This is also where you pick up procedure consent forms.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: '2. Attending Office',
        content: 'Where the daytime attending works. Knock before entering — family meetings sometimes happen here. When you need to escalate in person, this is your destination during daytime hours. After ~5 PM, use TigerConnect.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: '3. Supply Pyxis',
        content: 'Located near the nursing station. Contains: cranial access kits, ventriculostomy packs (Raumedic and Integra), central-line trays, arterial-line kits, lumbar-puncture kits, ultrasound-guided IV kits, occipital-nerve-block trays. Know where this is before your first procedure. Do not wait for a supply tech to find it for you.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: '4. Code Blue Room',
        content: 'Corner of the pod. This is where crash cart and resuscitation equipment live. Critical distinction: ICU Code Blue is NOT the same as an Overhead Code Blue. If you initiate a code, confirm with the charge nurse whether overhead needs to be activated. Do not assume it happens automatically.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: '5. EEG / Epilepsy Reading Room',
        content: 'Walk here for urgent EEG questions rather than waiting for a report. The epilepsy fellow or EEG tech is usually present during daytime hours. For time-sensitive patterns (suspected seizure, burst suppression query, new periodic discharges), physical presence gets you a faster answer than TigerConnect.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: '6. Conference Rooms',
        content: 'Three main options: 4th-floor Barrow conference room (primary — rounds, family meetings, didactics), 6th-floor conference room (overflow, larger group didactics), Mercy 1st-floor (cross-hospital coordination). Rounds on most days start at 4th-floor Barrow and move to bedside. On Fridays, after grand rounds.'
      }
    },
    {
      type: 'collapsible',
      content: {
        title: '7. Barrow Lounge',
        content: 'Coffee, food, decompression. Shared resource — bring your own mug. This is also where informal debriefs happen and where you will find attendings and residents between calls on lighter days. Use it.'
      }
    },

    { type: 'heading', content: { text: 'Section 3 — The 60-Second Drill' } },
    { type: 'paragraph', content: { text: 'Run through these scenarios until the answers are automatic. Do the physical walk on day one.' } },
    {
      type: 'table',
      content: {
        headers: ['Scenario', 'Action', 'Location'],
        rows: [
          ['Patient with anisocoria + posturing', 'Cranial access kit', 'Supply Pyxis'],
          ['Code Blue called on ASCOM', 'Code Blue room; confirm overhead activation', 'Corner of pod — ask charge RN'],
          ['EEG looks like seizure on Natus, need urgent read', 'Walk to EEG reading room', 'On-pod EEG/reading area'],
          ['Need to discuss a plan with attending before a family meeting', 'Knock on attending office door', 'Attending office'],
          ['Need consent form for LP or EVD', 'Grab from APP office', 'APP office printer/files'],
        ]
      }
    },
    { type: 'warning', content: { text: 'Do not rely on unit staff to navigate for you during an emergency. Walk the pod physically during your first pre-shift hour. Locate the Pyxis, Code Blue room, and crash cart before rounds start.' } },

    { type: 'heading', content: { text: 'Self-Check' } },
    { type: 'paragraph', content: { text: '1. What is the difference between 4NNC and 4NNB, and which do you cohort patients to first?' } },
    { type: 'paragraph', content: { text: '2. Where are ventriculostomy packs physically located?' } },
    { type: 'paragraph', content: { text: '3. A Code Blue is called on your patient\'s ASCOM. What is the first thing you confirm after reaching the bedside?' } },
    { type: 'paragraph', content: { text: '4. Why might you walk to the EEG reading room instead of waiting for a TigerConnect message?' } },
    { type: 'callout', content: { icon: 'info', text: 'Non-graded — discuss with your APP lead, and do the physical walk on day one.' } },
  ]
};

// ── Load to DB ───────────────────────────────────────────────────────────────

const lessons = [
  { title: 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up', content: m01l1Content },
  { title: 'M01.L2 — Unit Geography: 4NNB, 4NNC, and Everything Around Them', content: m01l2Content },
];

async function fix() {
  console.log('🔧 Fixing M01.L1 and M01.L2 (converting to blocks format)...\n');
  for (const lesson of lessons) {
    const { data, error: findError } = await supabase
      .from('module_lessons').select('id, title').eq('title', lesson.title).single();
    if (findError || !data) {
      console.log(`❌ Not found: "${lesson.title}"`);
      continue;
    }
    const { error: updateError } = await supabase
      .from('module_lessons').update({ content: JSON.stringify(lesson.content) }).eq('id', data.id);
    if (updateError) {
      console.log(`❌ Update failed: ${updateError.message}`);
      continue;
    }
    console.log(`✅ ${lesson.title} — ${lesson.content.blocks.length} blocks`);
  }
  console.log('\n✨ Done!');
  process.exit(0);
}

fix().catch(console.error);
