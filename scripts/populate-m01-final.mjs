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
    env[key.trim()] = parts.join('=').trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Simplified content structure
const contentData = {
  'Welcome, Faculty, and the Culture of Speaking Up': {
    title: 'Welcome, Faculty, and the Culture of Speaking Up',
    duration_min: 15,
    blocks: [
      { type: 'heading', content: { text: 'Learning Objectives' } },
      { type: 'paragraph', content: { text: 'By the end of this lesson, you will be able to identify the Section Head and core faculty, articulate the speak-up expectation, recognize the multidisciplinary team approach, and locate key resources.' } },
      { type: 'heading', content: { text: 'Why This Lesson Matters' } },
      { type: 'paragraph', content: { text: 'Neurocritical care patients deteriorate fast. The cost of staying silent when you are uncertain is measured in brain. Every faculty member has committed to a culture where the most junior person can stop the line.' } },
      { type: 'heading', content: { text: 'Section 1 — Who You Are Joining' } },
      { type: 'paragraph', content: { text: 'BNI Neurocritical Care provides intensive care for patients with primary neurological injury at St. Joseph\'s Hospital. Two parallel teams: Ice (day) and Fire (night).' } },
      { type: 'callout', content: { icon: 'info', title: 'Section Head', text: 'Ruchira Jha, MD, MSc' } },
      { type: 'paragraph', content: { text: 'Core faculty: Fiona Lynch, Patrick Crooks, Nassim Matin, Aditya Kumar' } },
      { type: 'callout', content: { icon: 'info', title: 'APP Positioning', text: 'APPs are partners with residents and attendings. Your scope includes admissions, daily progress, procedures, family communication, and discharge planning.' } },
      { type: 'heading', content: { text: 'Section 2 — Our Culture: Speak Up' } },
      { type: 'paragraph', content: { text: 'Every attending: Speak up if you don\'t understand. Speak up if uncomfortable. Speak up if you need help. No judgment.' } },
      { type: 'paragraph', content: { text: 'Four triggers: (1) Plan doesn\'t make sense. (2) Uncomfortable with something. (3) Need help. (4) Something went/is going wrong.' } },
      { type: 'warning', content: { text: 'Non-negotiable. If judgment/dismissal/retaliation occurs, report to APP lead, Section Head, or HR.' } },
      { type: 'heading', content: { text: 'Section 3 — Multidisciplinary by Design' } },
      { type: 'paragraph', content: { text: 'NCC is not about individual providers but geographically regionalized, subspecialized team care improving outcomes. Cohort patients on 4NBC. Never delay OSH transfers for bed criteria.' } },
      { type: 'heading', content: { text: 'Resources' } },
      { type: 'collapsible', content: { title: 'Barrow NCC Resources website', content: 'Access: OKTA → BNI intranet → "Barrow NCC Resources"' } },
      { type: 'collapsible', content: { title: 'NCC orientation deck', content: 'Location: Resources website / Orientation folder' } },
      { type: 'collapsible', content: { title: 'Institutional protocols', content: 'Location: Resources website / Protocols folder (ICP, ICH bundle, aSAH, status epilepticus, brain death)' } }
    ]
  },
  'Unit Geography: 4NNB, 4NNC, and Everything Around Them': {
    title: 'Unit Geography: 4NNB, 4NNC, and Everything Around Them',
    duration_min: 20,
    blocks: [
      { type: 'heading', content: { text: 'Learning Objectives' } },
      { type: 'paragraph', content: { text: 'Locate pods, priority spaces, and emergency areas. Retrieve supplies within 60 seconds.' } },
      { type: 'heading', content: { text: 'Why This Lesson Matters' } },
      { type: 'paragraph', content: { text: 'First month will have Code Blue, EVD placement, brain death exam. Know locations without thinking.' } },
      { type: 'heading', content: { text: 'The Two Pods' } },
      { type: 'paragraph', content: { text: '4NNC = 16 beds, primary NCC patients. 4NNB = variable, co-managed/overflow.' } },
      { type: 'collapsible', content: { title: 'APP Office', content: 'Sit between rounds, write notes, decompress. Locker, printer, whiteboard with TigerConnect roles.' } },
      { type: 'collapsible', content: { title: 'Attending Office', content: 'Daytime attending workspace. Knock first—don\'t interrupt family meetings.' } },
      { type: 'collapsible', content: { title: 'Supply Pyxis', content: 'Cranial access kit, ventriculostomy pack, central lines, A-lines, LP kit, US-IV, nerve block tray. Access with Cerner credentials.' } },
      { type: 'collapsible', content: { title: 'Code Blue Room', content: 'CRITICAL: ICU Code Blue ≠ Overhead Code Blue. ICU = ICU team only. Overhead = full hospital code team. Always confirm overhead called.' } },
      { type: 'collapsible', content: { title: 'EEG Reading Room', content: 'Epilepsy fellow reads cvEEG. Walk over for urgent questions—Cerner reports lag. Use Ice+EEG / Fire+EEG TigerConnect.' } },
      { type: 'collapsible', content: { title: 'Conference Rooms', content: '4th-floor Barrow: primary (case conference, rounds, faculty). 6th-floor: overflow/didactic. Mercy 1st-floor: cross-hospital.' } },
      { type: 'heading', content: { text: '60-Second Drill' } },
      { type: 'case-vignette', content: { stem: 'Anisocoria + posturing', role: 'Procedure', correct_action: 'Cranial access kit: Supply Pyxis' } },
      { type: 'case-vignette', content: { stem: 'Code Blue (ICU button)', role: 'Action', correct_action: 'Confirm overhead Code Blue activated' } },
      { type: 'case-vignette', content: { stem: 'Epileptologist overnight event', role: 'Contact', correct_action: 'EEG reading room or Ice+EEG/Fire+EEG TigerConnect' } }
    ]
  },
  'The NCC Team: Ice, Fire, and Everyone Around You': {
    title: 'The NCC Team: Ice, Fire, and Everyone Around You',
    duration_min: 20,
    blocks: [
      { type: 'heading', content: { text: 'Learning Objectives' } },
      { type: 'paragraph', content: { text: 'Distinguish Ice/Fire teams, attending coverage, identify every team role, know TigerConnect roles.' } },
      { type: 'heading', content: { text: 'Ice vs. Fire' } },
      { type: 'collapsible', content: { title: 'Ice Team', content: 'List: "NCC Ice". Day: Ice attending. Night: Fire attending (TigerText). Downgrades to: Blue team.' } },
      { type: 'collapsible', content: { title: 'Fire Team', content: 'List: "NCC Fire". Day: Fire attending. Night: Same (in-house ~midnight, phone after). Downgrades to: Red team.' } },
      { type: 'heading', content: { text: 'Attending Coverage' } },
      { type: 'paragraph', content: { text: 'Daytime: 8 AM rounds, available all day, 4:30-5 PM handoff. Night: in-house until ~midnight then phone. PCCM 24/7 backup.' } },
      { type: 'warning', content: { text: 'Call attending for: neuro change, unexpected imaging, hypotension/arrhythmia/troponin, CVA need, respiratory worsening, pre-extubation, pre-antibiotic, emergent OR, death/code, anything uncertain.' } },
      { type: 'heading', content: { text: 'Team Roles' } },
      { type: 'paragraph', content: { text: 'Residents: 2 neurology per team, 8 patients each. Neurosurgery: 1 per Ice team. Fellows: NCC + epilepsy.' } },
      { type: 'collapsible', content: { title: 'NCC Pharmacist (Tyler Haller)', content: 'On rounds. Med rec, HTS, sedation, antibiotics, AC reversal, pentobarbital, PRIS monitoring.' } },
      { type: 'collapsible', content: { title: 'Respiratory Therapy', content: '24/7. Vent setup, suctioning, NIV, ETCO2. Communicate vent changes directly.' } },
      { type: 'collapsible', content: { title: 'Bedside RN & Charge RN', content: 'RNs ACLS-certified. Charge runs bed map/staffing/triage. Bedside updates whiteboard with you, ASCOM, end time.' } },
      { type: 'collapsible', content: { title: 'EEG Tech / Epilepsy Fellow', content: '~30 min setup. Epilepsy fellow interprets via Ice+EEG/Fire+EEG TigerText.' } },
      { type: 'heading', content: { text: 'TigerConnect Quick Reference' } },
      { type: 'collapsible', content: { title: 'Ice Resident 1/2', content: 'Daytime Ice residents' } },
      { type: 'collapsible', content: { title: 'Fire Resident 1/2', content: 'Daytime Fire residents' } },
      { type: 'collapsible', content: { title: 'NCC Attending', content: '24/7 admissions' } },
      { type: 'collapsible', content: { title: 'NCC Fire', content: 'Night after midnight' } },
      { type: 'collapsible', content: { title: 'Ice+EEG / Fire+EEG', content: 'EEG team chat' } }
    ]
  },
  'NCC Roles by Patient Type: Primary, Co-Managed, Consult': {
    title: 'NCC Roles by Patient Type: Primary, Co-Managed, Consult',
    duration_min: 25,
    blocks: [
      { type: 'heading', content: { text: 'Learning Objectives' } },
      { type: 'paragraph', content: { text: 'Differentiate roles, list diagnoses, decide orders, recognize gray zones.' } },
      { type: 'heading', content: { text: 'Why This Matters' } },
      { type: 'paragraph', content: { text: 'Same team can be primary one bed, consultant next. Wrong role orders generate friction. This keeps you scoped, collegial, protected.' } },
      { type: 'heading', content: { text: 'The Three Roles' } },
      { type: 'callout', content: { icon: 'info', title: 'Primary', text: 'Own patient. Write H&P. Place all orders. Direct disposition.' } },
      { type: 'callout', content: { icon: 'info', title: 'Co-managing', text: 'Routine orders OK. Large decisions (intubation, code status, family meetings) with primary coordination.' } },
      { type: 'callout', content: { icon: 'info', title: 'Consult', text: 'Recommend only. Orders + family meetings need primary permission.' } },
      { type: 'heading', content: { text: 'Primary Diagnoses' } },
      { type: 'paragraph', content: { text: 'Status epilepticus, neuromuscular disease (GBS/MG), meningitis, autoimmune encephalitis/demyelinating.' } },
      { type: 'heading', content: { text: 'Co-managed Diagnoses' } },
      { type: 'paragraph', content: { text: 'SAH (NSGY), ICH no lesion (Stroke), ICH+lesion (NSGY), endovascular complications, shunt infection, suprasellar+DI, AIS at risk, cerebellar/brainstem stroke.' } },
      { type: 'heading', content: { text: 'Consult Diagnoses' } },
      { type: 'paragraph', content: { text: 'Moderate/severe TBI (TICU), post-arrest (MICU/CTICU), toxidromes+seizure (MICU), ICU/ECMO+AMS, ECMO+stroke/ICH.' } },
      { type: 'heading', content: { text: 'Order Authority' } },
      { type: 'paragraph', content: { text: 'Sedation: Primary ✓ | Co-managed ✓ (notify major) | Consult recommend' } },
      { type: 'paragraph', content: { text: 'Antibiotics: Primary (notify attending) | Co-managed (notify both) | Consult recommend' } },
      { type: 'paragraph', content: { text: 'Code status/family: Primary ✓ | Co-managed with primary | Consult only with permission' } },
      { type: 'heading', content: { text: 'Emergent Gray Zones' } },
      { type: 'warning', content: { text: 'Consult herniating when primary not bedside? Act (hyperosmolar, vent, NSGY). Document urgency. Notify both in parallel. Reset when primary arrives.' } },
      { type: 'heading', content: { text: 'Case Vignettes' } },
      { type: 'case-vignette', content: { stem: '56y thalamic ICH, no lesion, GCS 11, SBP 215', role: 'Co-managed', correct_action: 'Initiate nicardipine per ICH bundle, labs, CT q6h. Coordinate surgical referral if expansion.' } },
      { type: 'case-vignette', content: { stem: '22y severe TBI, GCS 6, ICP 28, TICU attending elsewhere', role: 'Consult', correct_action: 'Treat ICP (HTS/mannitol), document urgency, notify TICU+NCC attending parallel. Reset when TICU at bedside.' } },
      { type: 'case-vignette', content: { stem: '67y myasthenic crisis, day 3 PLEX, husband asks "keep going?"', role: 'Primary', correct_action: 'Sit down, answer, document, schedule formal meeting. Own this.' } }
    ]
  }
};

async function populate() {
  try {
    console.log('📝 Populating lesson content by ID...\n');

    // Get all lessons
    const { data: allLessons } = await supabase
      .from('module_lessons')
      .select('id, title, module_id');

    console.log(`Found ${allLessons?.length || 0} lessons in database\n`);

    for (const lesson of allLessons || []) {
      const matchingContent = Object.values(contentData).find(c => c.title === lesson.title);
      
      if (matchingContent) {
        const { error } = await supabase
          .from('module_lessons')
          .update({ content: JSON.stringify(matchingContent) })
          .eq('id', lesson.id);

        if (error) {
          console.error(`❌ ${lesson.title}:`, error.message);
        } else {
          console.log(`✅ ${lesson.title} (${matchingContent.blocks.length} blocks)`);
        }
      } else {
        console.log(`⏭️  ${lesson.title} (no content mapping)`);
      }
    }

    console.log('\n✨ Complete!');

  } catch (err) {
    console.error('Fatal:', err.message);
    process.exit(1);
  }
}

populate();
