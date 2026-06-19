#!/usr/bin/env node
// Adds profile photos to M01.L1 team sections using html blocks
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

const TITLE = 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up';

// ── Helper: render a grid of photo cards ────────────────────────────────────

function photoGrid(people) {
  const cards = people.map(p => `
    <div style="text-align:center;padding:8px;">
      <img src="${p.img}" alt="${p.name}"
        style="width:90px;height:90px;border-radius:50%;object-fit:cover;border:2px solid #e5e7eb;display:block;margin:0 auto 8px;" />
      <p style="font-weight:600;font-size:13px;margin:0 0 2px;color:#111;">${p.name}</p>
      <p style="font-size:11px;color:#6b7280;margin:0;">${p.creds}</p>
      ${p.role ? `<p style="font-size:11px;color:#9ca3af;margin:2px 0 0;">${p.role}</p>` : ''}
    </div>`).join('');

  return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin:16px 0 24px;">${cards}</div>`;
}

// ── Photo data ───────────────────────────────────────────────────────────────

const neurologists = [
  { name: 'Ruchira Jha', creds: 'MD, MSc', role: 'Director', img: 'https://www.barrowneuro.org/wp-content/uploads/Ruchira-Jha-MD-MSc-600x600.jpg' },
  { name: 'Patrick Crooks', creds: 'MD', role: 'Asst. Professor', img: 'https://www.barrowneuro.org/wp-content/uploads/C-Patrick-Crooks-MD-600x600.jpg' },
  { name: 'Aditya Kumar', creds: 'MD', role: 'Neurologist', img: 'https://www.barrowneuro.org/wp-content/uploads/Kumar-Aditya-260112-web-600x600.jpg' },
  { name: 'Fiona Lynch', creds: 'MD, MPH', role: 'Neurologist', img: 'https://www.barrowneuro.org/wp-content/uploads/Lynch_Fiona-241003-web-600x600.jpg' },
  { name: 'Anusha Mangalampalli', creds: 'MD', role: 'Neurologist', img: 'https://www.barrowneuro.org/wp-content/uploads/Mangalampalli_Anusha-240814-web-600x600.jpg' },
  { name: 'Nassim Matin', creds: 'MD, MPH', role: 'Neurologist', img: 'https://www.barrowneuro.org/wp-content/uploads/Nassim-Matin-MD-600x600.jpg' },
  { name: 'Nicholas J. Nelson', creds: 'MD', role: 'Neurologist', img: 'https://www.barrowneuro.org/wp-content/uploads/Nelson_Nicholas-240816-web-600x600.jpg' },
  { name: 'Chia-Ling Phuah', creds: 'MD, MMSc', role: 'Neurologist-Scientist', img: 'https://www.barrowneuro.org/wp-content/uploads/Phuah_Chia-Ling-240118-web-600x600.jpg' },
  { name: 'Rachel Thomas', creds: 'MD, PhD', role: 'Neurologist', img: 'https://www.barrowneuro.org/wp-content/uploads/Thomas-Rachel-250825-web-600x600.jpg' },
];

const apps = [
  { name: 'Eunjoo Chung', creds: 'PhD, ACNP-BC', role: 'Nurse Practitioner', img: 'https://www.barrowneuro.org/wp-content/uploads/Chung-Eunjoo-241010-web-600x600.jpg' },
  { name: 'Candi Lewis', creds: 'ACNP-BC', role: 'Nurse Practitioner', img: 'https://www.barrowneuro.org/wp-content/uploads/Lewis_Candi-240301-web-600x600.jpg' },
  { name: 'Danny Lizano', creds: 'PA-C', role: 'Physician Assistant', img: 'https://www.barrowneuro.org/wp-content/uploads/placeholderperson.png' },
  { name: 'Diane McLaughlin', creds: 'DNP, AGACNP-BC, CCRN, FCCM, FNCS, MBA', role: 'Nurse Practitioner', img: 'https://www.barrowneuro.org/wp-content/uploads/McLaughlin_Diane-241115-web-600x600.jpg' },
  { name: 'Lindsey Stubbs', creds: 'AGACNP-BC, MSN, CNRN', role: 'Nurse Practitioner', img: 'https://www.barrowneuro.org/wp-content/uploads/Stubbs_Lindsey-240216-web-600x600.jpg' },
  { name: 'Abigail Tittle', creds: 'ACNP-BC, CNRN', role: 'Nurse Practitioner', img: 'https://www.barrowneuro.org/wp-content/uploads/Tittle_Abby-600x600.jpg' },
];

const pharmacist = [
  { name: 'Tyler Haller', creds: 'PharmD, BCCCP', role: 'NCC Pharmacist', img: 'https://www.barrowneuro.org/wp-content/uploads/Haller_Tyler-241115-web-600x600.jpg' },
];

// ── Full lesson content ───────────────────────────────────────────────────────

const content = {
  title: 'Welcome, Faculty, and the Culture of Speaking Up',
  duration_min: 15,
  blocks: [
    { type: 'heading', content: { text: 'Learning Objectives' } },
    { type: 'paragraph', content: { text: '1. Identify the Section Head, core faculty, APPs, and pharmacist of BNI Neurocritical Care and describe the scope of attending coverage.' } },
    { type: 'paragraph', content: { text: '2. Articulate the "speak-up" expectation that defines our team culture and the four specific situations in which speaking up is required.' } },
    { type: 'paragraph', content: { text: '3. Recognize that you are joining a multidisciplinary, regionalized, subspecialty service whose outcomes depend on team-based care — not individual heroics.' } },
    { type: 'paragraph', content: { text: '4. Locate the Barrow NCC Resources website and the orientation materials you will need across your first 90 days.' } },

    { type: 'callout', content: { icon: 'info', title: 'Why This Lesson Matters', text: 'Neurocritical care patients deteriorate fast. The cost of staying silent when you are uncertain is measured in brain. Every faculty member has explicitly committed to a culture where the most junior person in the room can stop the line. Read this first — the clinical content that follows assumes you have internalized this expectation.' } },

    // ── SECTION 1 ─────────────────────────────────────────────────────────────
    { type: 'heading', content: { text: 'Section 1 — Who You Are Joining' } },
    { type: 'paragraph', content: { text: 'The BNI Neurocritical Care Program provides state-of-the-art intensive care for patients with acute, serious, and life-threatening brain and spine injuries. The program operates throughout the entire neurocritical care continuum — from emergency presentation through post-neurosurgical recovery and transfer care — not just a singular phase.' } },
    { type: 'paragraph', content: { text: 'Patients arrive from the emergency department, following neurosurgical procedures, or as transfers requiring intensive neurological care. The service collaborates with disciplines across St. Joseph\'s Hospital and Medical Center on a case-by-case basis.' } },
    { type: 'callout', content: { icon: 'info', title: 'The Barrow Difference', text: 'BNI is one of the largest employers of subspecialized and advanced practice neuroscience nurses in the world. All core NCC faculty are fellowship trained and board certified in neurocritical care. The program has NIH funding for active translational research. Newsweek has ranked SJHMC as a World\'s Best Specialized Hospital for Neurology and Neurosurgery 2022–2026.' } },

    // ── PROGRAM DIRECTOR ──────────────────────────────────────────────────────
    { type: 'heading', content: { text: 'Program Director' } },
    { type: 'paragraph', content: { text: 'Ruchira Jha, MD, MSc — Director of Neurocritical Care, Medical Director of the Neurointensive Care Unit, Atkinson Chair for Research. Harvard MD · Pittsburgh MSc · MGH/Brigham fellowship. Board certified in Neurology (ABPN) and Neurocritical Care (UCNS). NIH-funded research on cerebral edema and TBI outcomes. TRACK TBI and GAIN consortia. JAMA Neurology editorial board; Critical Care Section Editor, Stroke.' } },

    // ── ATTENDING NEUROINTENSIVISTS ────────────────────────────────────────────
    { type: 'heading', content: { text: 'Attending Neurointensivists' } },
    { type: 'paragraph', content: { text: 'All core attendings are fellowship trained and board certified in neurocritical care.' } },
    { type: 'html', content: { html: photoGrid(neurologists) } },

    // ── APPs ──────────────────────────────────────────────────────────────────
    { type: 'heading', content: { text: 'Advanced Practice Providers (Your Team)' } },
    { type: 'paragraph', content: { text: 'The NCC APP team is one of the most credentialed in the country. These are your direct colleagues — the people you will hand off to, learn from, and cover with.' } },
    { type: 'html', content: { html: photoGrid(apps) } },
    { type: 'callout', content: { icon: 'info', title: 'APP Positioning', text: 'You are not "covering" for residents. You are partners with clinical depth that rivals the resident tier on most rotations. Your scope includes admissions, daily progress, procedures, family communication, and discharge planning.' } },

    // ── PHARMACIST ────────────────────────────────────────────────────────────
    { type: 'heading', content: { text: 'NCC Clinical Pharmacist' } },
    { type: 'html', content: { html: photoGrid(pharmacist) } },
    { type: 'paragraph', content: { text: 'Tyler owns sedation protocols, HTS dosing, AED levels, anticoagulation reversal, pentobarbital coma monitoring, and antibiotic stewardship on the NCC service. He is on rounds — use that time, not mid-day pages, for medication questions.' } },

    // ── WHAT WE TREAT ─────────────────────────────────────────────────────────
    { type: 'heading', content: { text: 'What We Treat' } },
    {
      type: 'table',
      content: {
        headers: ['Condition', 'NCC Role'],
        rows: [
          ['Hemorrhagic stroke (ICH, SAH)', 'Primary or Co-managed (with Neurosurgery/Stroke)'],
          ['Ischemic stroke at high decompensation risk', 'Co-managed with Stroke'],
          ['Seizures and status epilepticus', 'Primary'],
          ['Traumatic brain injury (moderate/severe)', 'Consult (TICU primary)'],
          ['Subarachnoid hemorrhage', 'Co-managed with Neurosurgery'],
          ['Neuromuscular disease (GBS, MG)', 'Primary'],
          ['Meningitis / encephalitis requiring ICU', 'Primary'],
          ['Autoimmune encephalitis / demyelinating disease', 'Primary'],
          ['Cardiac arrest with anoxic brain injury', 'Consult (MICU/CTICU primary)'],
        ]
      }
    },

    // ── SPEAK UP ──────────────────────────────────────────────────────────────
    { type: 'heading', content: { text: 'Section 2 — Our Culture: Speak Up' } },
    { type: 'paragraph', content: { text: 'Every NCC attending has told incoming providers the same thing: speak up. From the orientation deck: "Speak up if you don\'t understand decisions or the patient situation. Speak up if you are uncomfortable with something. Speak up if you need help. No one will judge you for this — we need to know so we can help."' } },
    {
      type: 'table',
      content: {
        headers: ['Situation', 'What to say / do'],
        rows: [
          ['The plan doesn\'t make sense to you', '"Help me understand why we\'re doing X." Always a legitimate question.'],
          ['You\'re uncomfortable with something', 'Flag it — medication dose, a family interaction, a colleague\'s tone.'],
          ['You need help', 'Procedures, documentation, a tough exam — no penalty for asking.'],
          ['Something has gone wrong or is about to', 'Near-misses are reviewed without blame. Debriefs exist for this.'],
        ]
      }
    },
    { type: 'warning', content: { text: 'If you experience the opposite — judgment, dismissal, retaliation — that is a culture violation. Report it to your APP lead, the Section Head, or HR. This is non-negotiable.' } },

    // ── MULTIDISCIPLINARY ─────────────────────────────────────────────────────
    { type: 'heading', content: { text: 'Section 3 — Multidisciplinary by Design' } },
    { type: 'paragraph', content: { text: 'From the Admission Diagnosis Guidelines: "Neurocritical Care is a multidisciplinary specialty that is not about individual physicians, nurses, pharmacists, respiratory therapists, but rather developing a geographically regionalized and subspecialized team approach to patient care that has been shown to improve outcomes nationwide."' } },
    { type: 'paragraph', content: { text: 'Cohort primary and co-managed patients on 4NNC whenever possible. Geographic regionalization is part of why outcomes here are what they are. Outside-hospital transfers are never delayed for bed-by-bed criteria — boarders are moved post-hoc.' } },

    // ── WHERE TO FIND THINGS ─────────────────────────────────────────────────
    { type: 'heading', content: { text: 'Section 4 — Where to Find Things' } },
    {
      type: 'table',
      content: {
        headers: ['Resource', 'Purpose', 'Where'],
        rows: [
          ['Barrow NCC Resources website', 'Protocols, workflows, reference cards', 'OKTA → BNI intranet → "Barrow NCC Resources"'],
          ['NCC orientation deck', 'The slide set whose principles you are reading now', 'Resources website → Orientation folder'],
          ['Institutional protocols', 'ICP, ICH bundle, aSAH, status epilepticus, brain death, etc.', 'Resources website → Protocols folder'],
          ['BNI NCC Handbook 2026–2027', 'Pocket reference — Mangalampalli, Kumar, Nelson', 'Distributed at orientation; PDF on Resources website'],
          ['barrowneuro.org/centers-programs/neurocritical-care-program/', 'Full team listing, faculty bios', 'Public website'],
          ['Schedule (Amion)', 'Shifts, attending of record, Ice vs. Fire assignment', 'amion.com — credentials provided week 1'],
          ['Your APP lead', 'First-line questions, scheduling, performance reviews', 'Listed in your offer letter; introduced during week 1'],
        ]
      }
    },
    { type: 'callout', content: { icon: 'info', text: 'If you cannot find a protocol on the Resources website, ask in the APP TigerConnect chat before doing the wrong thing. That is speaking up.' } },

    // ── SELF CHECK ────────────────────────────────────────────────────────────
    { type: 'heading', content: { text: 'Self-Check' } },
    { type: 'paragraph', content: { text: '1. Who is the Director of Neurocritical Care at BNI and what are her primary research interests?' } },
    { type: 'paragraph', content: { text: '2. Name three of the six APPs on the NCC team.' } },
    { type: 'paragraph', content: { text: '3. Name three of the four situations in which you are required to speak up.' } },
    { type: 'paragraph', content: { text: '4. Where do you find the institutional ICP protocol at 3 AM?' } },
    { type: 'callout', content: { icon: 'info', text: 'Answers are non-graded — discuss with your APP lead during your week-1 check-in.' } },
  ]
};

async function update() {
  const { data, error: findError } = await supabase
    .from('module_lessons').select('id').eq('title', TITLE).single();
  if (findError || !data) { console.error('❌ Lesson not found'); process.exit(1); }

  const { error: updateError } = await supabase
    .from('module_lessons').update({ content: JSON.stringify(content) }).eq('id', data.id);
  if (updateError) { console.error('❌ Update failed:', updateError.message); process.exit(1); }

  console.log(`✅ M01.L1 updated — ${content.blocks.length} blocks`);
  console.log(`   Photo cards: ${neurologists.length} neurologists, ${apps.length} APPs, ${pharmacist.length} pharmacist`);
  process.exit(0);
}

update().catch(console.error);
