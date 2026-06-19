#!/usr/bin/env node
// Updates M01.L1 with enriched "Who You Are Joining" content from barrowneuro.org
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

const title = 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up';

const updatedContent = {
  title: 'Welcome, Faculty, and the Culture of Speaking Up',
  duration_min: 15,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    { type: 'paragraph', content: { text: '1. Identify the Section Head and core faculty of BNI Neurocritical Care and describe the scope of attending coverage.' } },
    { type: 'paragraph', content: { text: '2. Articulate the "speak-up" expectation that defines our team culture and the four specific situations in which speaking up is required.' } },
    { type: 'paragraph', content: { text: '3. Recognize that you are joining a multidisciplinary, regionalized, subspecialty service whose outcomes depend on team-based care — not individual heroics.' } },
    { type: 'paragraph', content: { text: '4. Locate the Barrow NCC Resources website and the orientation materials you will need across your first 90 days.' } },

    { type: 'callout', content: { icon: 'info', title: 'Why This Lesson Matters', text: 'Neurocritical care patients deteriorate fast. The cost of staying silent when you are uncertain is measured in brain. Every faculty member has explicitly committed to a culture where the most junior person in the room can stop the line. Read this first — the clinical content that follows assumes you have internalized this expectation.' } },

    // ── SECTION 1: UPDATED WITH WEBSITE CONTENT ───────────────────────────
    { type: 'heading', content: { text: 'Section 1 — Who You Are Joining' } },
    { type: 'paragraph', content: { text: 'The BNI Neurocritical Care Program provides state-of-the-art intensive care for patients with acute, serious, and life-threatening brain and spine injuries. The program operates throughout the entire neurocritical care continuum — from emergency presentation through post-neurosurgical recovery and transfer care — not just a singular phase.' } },
    { type: 'paragraph', content: { text: 'Patients arrive from the emergency department, following neurosurgical procedures, or as transfers requiring intensive neurological care. The service collaborates with disciplines across St. Joseph\'s Hospital and Medical Center on a case-by-case basis to deliver individualized, subspecialized care.' } },
    {
      type: 'callout',
      content: {
        icon: 'info',
        title: 'The Barrow Difference',
        text: 'Barrow Neurological Institute is one of the largest employers of subspecialized and advanced practice neuroscience nurses in the world. All core NCC faculty are fellowship trained and board certified in neurocritical care. The program has received NIH funding and other prestigious awards to pursue research in neurocritical care — making this a rare combination of clinical excellence and active translational science.'
      }
    },

    { type: 'heading', content: { text: 'Program Director: Ruchira Jha, MD, MSc' } },
    { type: 'paragraph', content: { text: 'Dr. Jha is the Director of Neurocritical Care, Medical Director of the Neurointensive Care Unit, and the Atkinson Chair for Research at Barrow Neurological Institute. She holds professorships in the Departments of Neurology, Neurosurgery, and Translational Neuroscience.' } },
    {
      type: 'table',
      content: {
        headers: ['', 'Detail'],
        rows: [
          ['Board certifications', 'Neurology (ABPN); Neurocritical Care (UCNS)'],
          ['Medical degree', 'Harvard Medical School'],
          ['Graduate degree', 'MSc, Clinical & Translational Research — University of Pittsburgh'],
          ['Training', 'Neurology residency, chief residency, and NCC fellowship — MGH / Brigham & Women\'s (Harvard Partners Program)'],
          ['Research focus', 'Cerebral edema and secondary injury after TBI; individualized neuroprotection targets'],
          ['Consortia', 'TRACK TBI, GAIN (Genetic Associations in Neurotrauma)'],
          ['Editorial roles', 'JAMA Neurology editorial board; Critical Care Section Editor, Stroke journal'],
          ['Societies', 'AAN, ANA, National Neurotrauma Society, Neurocritical Care Society, Society for Neuroscience, SCCM'],
        ]
      }
    },

    { type: 'heading', content: { text: 'Core Faculty' } },
    {
      type: 'table',
      content: {
        headers: ['Faculty', 'Role / Notes'],
        rows: [
          ['Fiona Lynch, MD', 'Core faculty — fellowship trained, board certified in neurocritical care'],
          ['Patrick Crooks, MD', 'Core faculty — fellowship trained, board certified in neurocritical care'],
          ['Nassim Matin, MD', 'Core faculty — fellowship trained, board certified in neurocritical care'],
          ['Aditya Kumar, MD', 'Core faculty — fellowship trained, board certified in neurocritical care; BNI Handbook co-author'],
          ['Anusha Mangalampalli, MD', 'Protocol committee; BNI Handbook co-author'],
          ['Nicholas Nelson, MD', 'Protocol committee; BNI Handbook co-author'],
          ['Tyler Haller, PharmD', 'NCC Clinical Pharmacist; protocol committee'],
          ['Chia-Ling Phuah, MD MS', 'Protocol committee'],
          ['Daniella Sisniega, MD', 'Protocol committee'],
        ]
      }
    },

    { type: 'callout', content: { icon: 'info', title: 'APP Positioning', text: 'Advanced Practice Providers — NPs and PAs — are core members of the NCC service. You are not "covering" for residents. You are partners. BNI is one of the largest employers of subspecialized APPs in neurocritical care nationally. Your scope includes admissions, daily progress, procedures, family communication, and discharge planning.' } },

    // ── SECTIONS 2–4 UNCHANGED ─────────────────────────────────────────────
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
    { type: 'paragraph', content: { text: 'This is backed by who BNI employs: neurointensivists, neurosurgeons, neuroscience nurses, respiratory therapists, and critical-care pharmacists — all subspecialized. Cohort primary and co-managed patients on 4NNC whenever possible. Geographic regionalization is part of why outcomes here are what they are. Outside-hospital transfers are never delayed for bed-by-bed criteria.' } },

    { type: 'heading', content: { text: 'Section 4 — Where to Find Things' } },
    {
      type: 'table',
      content: {
        headers: ['Resource', 'Purpose', 'Where'],
        rows: [
          ['Barrow NCC Resources website', 'Living repository of protocols, workflows, reference cards', 'OKTA → BNI intranet → "Barrow NCC Resources"'],
          ['NCC orientation deck', 'The slide set whose principles you are reading now', 'Resources website → Orientation folder'],
          ['Institutional protocols', 'ICP, ICH bundle, aSAH, status epilepticus, brain death, etc.', 'Resources website → Protocols folder'],
          ['BNI NCC Handbook 2026–2027', 'Pocket reference — Mangalampalli, Kumar, Nelson', 'Distributed at orientation; PDF on Resources website'],
          ['barrowneuro.org/centers-programs/neurocritical-care-program/', 'Public-facing program overview, faculty bios', 'Public website — useful for context and family questions'],
          ['Schedule (Amion)', 'Your shifts, attending of record, Ice vs. Fire assignment', 'amion.com — credentials provided week 1'],
          ['Your APP lead', 'First-line questions, scheduling, performance reviews', 'Listed in your offer letter; introduction during week 1'],
        ]
      }
    },
    { type: 'callout', content: { icon: 'info', text: 'If you cannot find a protocol on the Resources website, ask in the APP TigerConnect chat before doing the wrong thing. That is speaking up.' } },

    { type: 'heading', content: { text: 'Self-Check' } },
    { type: 'paragraph', content: { text: '1. Who is the Director of Neurocritical Care at BNI and what are her primary research interests?' } },
    { type: 'paragraph', content: { text: '2. What makes BNI\'s APP workforce distinctive nationally?' } },
    { type: 'paragraph', content: { text: '3. Name three of the four situations in which you are required to speak up.' } },
    { type: 'paragraph', content: { text: '4. Where do you find the institutional ICP protocol at 3 AM on your first overnight admission?' } },
    { type: 'callout', content: { icon: 'info', text: 'Answers are non-graded — discuss with your APP lead during your week-1 check-in.' } },
  ]
};

async function update() {
  const { data, error: findError } = await supabase
    .from('module_lessons').select('id').eq('title', title).single();
  if (findError || !data) {
    console.error('❌ Could not find lesson:', title);
    process.exit(1);
  }
  const { error: updateError } = await supabase
    .from('module_lessons').update({ content: JSON.stringify(updatedContent) }).eq('id', data.id);
  if (updateError) {
    console.error('❌ Update failed:', updateError.message);
    process.exit(1);
  }
  console.log(`✅ M01.L1 updated — ${updatedContent.blocks.length} blocks`);
  console.log('   Added: Dr. Jha full profile, Barrow Difference callout, public website link');
  process.exit(0);
}

update().catch(console.error);
