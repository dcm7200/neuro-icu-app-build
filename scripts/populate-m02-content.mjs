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
    if (key && parts.length) env[key.trim()] = parts.join('=').trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// ─────────────────────────────────────────────────────────────────────────────
// M02.L1 — Cerner PowerChart (Desktop & Mobile)
// ─────────────────────────────────────────────────────────────────────────────
const m02l1Content = {
  title: "M02.L1 — Cerner PowerChart (Desktop & Mobile)",
  duration_min: 25,
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "Cerner PowerChart is the primary EMR at St. Joseph's Hospital and Medical Center (SJHMC). As an APP in the Neuro ICU, you will use it for order entry, clinical documentation, results review, and medication reconciliation. This lesson covers how to navigate PowerChart efficiently for NCC workflows on both desktop and mobile."
      }
    },
    {
      type: "heading",
      content: { text: "Accessing PowerChart" }
    },
    {
      type: "table",
      content: {
        headers: ["Access Method", "How to Open", "Notes"],
        rows: [
          ["Desktop (on-campus)", "Cerner PowerChart icon on hospital desktop or via OKTA dashboard", "Full feature access; required for order entry and full documentation"],
          ["Desktop (remote)", "Citrix Receiver or web browser via VPN + OKTA SSO", "Same full functionality; may have slight latency"],
          ["Mobile (iOS/Android)", "Cerner Ambulatory or PowerChart Touch app via App Store/Google Play", "Best for results review and quick notes; limited order entry"],
          ["Airstrip One", "Separate mobile app — vitals and drip monitoring only", "Does NOT replace PowerChart; covered in L5"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "OKTA First",
        text: "All remote access flows through OKTA SSO. If you cannot launch PowerChart remotely, verify your OKTA session is active before troubleshooting further. See M02.L6 for OKTA setup."
      }
    },
    {
      type: "heading",
      content: { text: "Finding the NCC Patient List" }
    },
    {
      type: "paragraph",
      content: {
        text: "The Neuro ICU uses two service-based patient lists in PowerChart. When you log in, you must load the correct patient list for your assigned service that day (Ice or Fire). Check Amion the morning of your shift to confirm your assignment."
      }
    },
    {
      type: "table",
      content: {
        headers: ["List Name", "Service", "Location"],
        rows: [
          ["NCC Ice", "Ice neurology service (neurology-led)", "PowerChart → Patient List → Search 'NCC Ice'"],
          ["NCC Fire", "Fire neurology service (neurosurgery-led co-management)", "PowerChart → Patient List → Search 'NCC Fire'"],
          ["4NNB Census", "All patients on 4NNB pod", "Charge RN view; useful for cross-coverage at night"],
          ["4NNC Census", "All patients on 4NNC pod", "Charge RN view; useful for cross-coverage at night"]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Step-by-step: Loading your patient list at shift start",
        content: "1. Log into PowerChart via desktop or Citrix.\n2. Click 'Patient Lists' in the top navigation bar.\n3. Click 'Manage Lists' if your NCC list is not already pinned.\n4. Search for 'NCC Ice' or 'NCC Fire' depending on your Amion assignment.\n5. Click the star icon to pin it as a favorite for future shifts.\n6. Double-click a patient name to open their chart.\n7. Use the 'Previous Patient / Next Patient' arrows to navigate without returning to the list."
      }
    },
    {
      type: "heading",
      content: { text: "Navigating the Chart" }
    },
    {
      type: "paragraph",
      content: {
        text: "The PowerChart chart ribbon gives you access to all clinical sections. The key tabs you will use daily in the Neuro ICU are listed below."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Tab / Section", "What's There", "NCC-Specific Use"],
        rows: [
          ["Summary", "Vital signs, problem list, active medications, recent labs", "Quick overview at the start of rounds; verify code status here"],
          ["Orders", "Order entry, order sets, active order review", "Use NCC-specific order sets (e.g., 'NCC Seizure Protocol', 'ICP Management')"],
          ["Notes", "All clinical documentation", "Write progress notes, procedure notes, H&P; view consultant notes"],
          ["Results", "Labs, micro, imaging reports", "Imaging reports appear here; always read the radiologist read even after viewing images yourself"],
          ["MAR", "Medication administration record", "Verify drip rates and PRN administration timing; cross-reference with Airstrip One"],
          ["Medication Reconciliation", "Home meds vs. inpatient med list", "Critical at admission and discharge; missing home meds are a common patient safety event"],
          ["Form Browser", "Nursing flowsheets, assessments, consents", "GCS trends, pupil checks, nursing I&O are all here"],
          ["Allergies", "Allergy list", "Verify before first order set; update if patient or family reports new allergy"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Order Entry in the NCC" }
    },
    {
      type: "paragraph",
      content: {
        text: "Order entry in the Neuro ICU requires attending co-signature for certain medication classes and procedures. Know what requires verbal read-back versus direct cosign."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "NCC Order Entry Workflow",
        content: "1. Open the patient chart → click 'Orders' tab.\n2. Click '+ Add' to open the order catalog.\n3. Search by name or use pre-built order sets (type 'NCC' to filter NCC-specific sets).\n4. For urgent orders (e.g., hypertonic saline, nimodipine initiation), enter the order and immediately notify the attending via TigerConnect for co-signature.\n5. Verify route, dose, and frequency match current ICU protocol.\n6. Sign and submit — orders go live immediately once submitted.\n7. For STAT labs or imaging: call the charge RN after placing to confirm awareness.\nNOTE: Never use 'Future Orders' for time-sensitive ICU interventions."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "NCC Order Sets",
        text: "The NCC has custom PowerChart order sets for SAH, TBI, status epilepticus, and ICP management. Search 'NCC' in the order catalog to access them. Using these sets reduces errors and ensures protocol compliance. Do not build orders from scratch for common NCC scenarios."
      }
    },
    {
      type: "heading",
      content: { text: "Documentation: Progress Notes" }
    },
    {
      type: "paragraph",
      content: {
        text: "Progress notes in the NCC should be completed before signout (by 4:30 PM for day shift). All notes go under the 'Notes' tab and are auto-associated with the attending of record. Do not use free-text note types — use the structured NCC note templates."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Note Type", "When to Use", "Who Signs"],
        rows: [
          ["NCC APP Progress Note", "Daily daytime note for NCC ICU patients", "APP author + attending co-sign"],
          ["NCC Procedure Note", "After any bedside procedure (LP, EVD care, etc.)", "APP or performing provider; attending may co-sign"],
          ["NCC H&P", "New admissions from ED or transfer", "APP author; attending must co-sign within 24h"],
          ["NCC Addendum", "Correction or supplement to existing note", "Author of original note or attending"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Medication Reconciliation" }
    },
    {
      type: "paragraph",
      content: {
        text: "Med rec is a Joint Commission requirement at admission, transfer, and discharge. In the NCC, critically ill patients often arrive with complex outpatient regimens that need to be either continued, held, or substituted."
      }
    },
    {
      type: "warning",
      content: {
        text: "NEVER skip medication reconciliation on admission. Missing home antiepileptics, antihypertensives, or anticoagulants are leading causes of preventable harm in neurological ICU patients. If the patient cannot provide history, contact family or the outpatient pharmacy directly."
      }
    },
    {
      type: "heading",
      content: { text: "Mobile Access: PowerChart Touch" }
    },
    {
      type: "paragraph",
      content: {
        text: "PowerChart Touch (available for iOS and Android) allows you to review results, read notes, and view imaging reports when away from the bedside. It is useful for overnight cross-coverage but does not support full order entry."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Feature", "Desktop", "PowerChart Touch (Mobile)"],
        rows: [
          ["Full order entry", "✅", "⚠️ Limited — basic orders only"],
          ["Results review", "✅", "✅"],
          ["Note writing", "✅", "✅ (dictation-friendly)"],
          ["MAR review", "✅", "✅"],
          ["Imaging report view", "✅", "✅ (report text only; use iConnect for images)"],
          ["Order sets", "✅", "❌ Not available"],
          ["Cosign workflow", "✅", "✅"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Common PowerChart Pitfalls in the NCC" }
    },
    {
      type: "collapsible",
      content: {
        title: "Pitfall: Wrong patient list loaded",
        content: "If you open the wrong patient list (e.g., you're on Ice but loaded Fire), you will see the wrong patients and may enter notes or orders on someone else's patient. Always verify the list name in the header. If you accidentally open the wrong chart, close immediately without entering anything and contact your attending."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Pitfall: Orders submitted without attending awareness",
        content: "PowerChart will allow you to submit orders without contacting the attending. In the NCC, any drip initiation, dose escalation, or new procedure order requires a verbal or TigerConnect notification to the attending even if they do not need to co-sign immediately. Document the conversation in the note."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Pitfall: Note filed in wrong encounter",
        content: "SJHMC patients sometimes have multiple active encounters (inpatient, observation, ED). Verify you are in the correct encounter before filing a note or entering orders. The encounter type and dates appear in the banner bar at the top of the chart."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Tip: Use the Patient Summary Band",
        text: "The left-side summary band in PowerChart shows allergies, code status, isolation precautions, and fall risk at a glance. Collapse it when you need more screen space, but check it first at every new patient encounter."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M02.L2 — TigerConnect Roles and Team Chats
// ─────────────────────────────────────────────────────────────────────────────
const m02l2Content = {
  title: "M02.L2 — TigerConnect Roles and Team Chats",
  duration_min: 20,
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "TigerConnect is the HIPAA-compliant secure messaging platform used at SJHMC for all clinical communications in the NCC. Understanding how to find the right role, send to the right team, and avoid common misuse patterns is critical for safe and efficient practice."
      }
    },
    {
      type: "heading",
      content: { text: "Initial Setup" }
    },
    {
      type: "collapsible",
      content: {
        title: "Step-by-step: First-time TigerConnect setup",
        content: "1. Download TigerConnect from the App Store or Google Play (or use the web app at app.tigerconnect.com).\n2. Select 'SJHMC' / 'CommonSpirit' as your organization when prompted.\n3. Log in with your Commonspirit email and password (same as your domain credentials).\n4. Enable push notifications — do NOT disable these. Critical pages come through TigerConnect.\n5. Set your status to your correct role before going on shift (e.g., 'SJHMC NCC Ice Resident 1').\n6. Set notification sounds to something audible — silent mode will cause you to miss urgent messages.\n7. Turn off 'Do Not Disturb' during all clinical shifts."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Role Assignment Matters",
        text: "TigerConnect uses role-based messaging. When someone messages 'SJHMC NCC Ice Resident 1', it routes to whoever is currently logged into that role. You MUST set your role at the start of each shift. If you forget, pages will go to whoever last held that role — or no one."
      }
    },
    {
      type: "heading",
      content: { text: "NCC TigerConnect Role Directory" }
    },
    {
      type: "paragraph",
      content: {
        text: "The following roles are the standard NCC address book. Search these exact names in TigerConnect to reach the right provider. Some roles are shift-specific; verify coverage times before paging."
      }
    },
    {
      type: "table",
      content: {
        headers: ["TigerConnect Role", "Who Answers", "When Active", "Use For"],
        rows: [
          ["SJHMC NCC Ice Resident 1", "Ice neurology daytime resident #1", "Day shift (approx 6 AM–5 PM)", "Ice service clinical questions, consult triage, orders support"],
          ["SJHMC NCC Ice Resident 2", "Ice neurology daytime resident #2", "Day shift", "Second Ice resident for overflow or simultaneous tasks"],
          ["SJHMC NCC Fire Resident 1", "Fire neurology daytime resident #1", "Day shift", "Fire service clinical questions, co-management updates"],
          ["SJHMC NCC Fire Resident 2", "Fire neurology daytime resident #2", "Day shift", "Second Fire resident for Fire service overflow"],
          ["SJHMC Neuro Critical Care - Attending", "NCC attending on call", "24/7 — new admissions and urgent issues", "New admissions from any source; critical changes; urgent orders requiring attending input"],
          ["SJHMC NCC Fire", "Cross-coverage after midnight", "Midnight–6 AM", "After-hours cross-coverage for Fire patients; use NCC Resident role for standard cross-cover signout"],
          ["NCC Resident", "Cross-coverage overnight NCC resident", "Overnight (5 PM–6 AM)", "Standard cross-cover handoff recipient; use this role when passing signout to overnight"],
          ["Ice+EEG", "Ice service EEG team/fellow", "Day shift primarily", "EEG questions, requesting urgent EEG reads, status epilepticus EEG management"],
          ["Fire+EEG", "Fire service EEG team/fellow", "Day shift primarily", "EEG questions on Fire patients"],
          ["Pharmacy", "NCC clinical pharmacist (direct)", "Day shift; overnight pharmacist by on-call", "Drug interactions, dosing questions, formulary substitutions, pharmacokinetic monitoring"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Team Chats and Group Messaging" }
    },
    {
      type: "paragraph",
      content: {
        text: "TigerConnect supports group conversations for team coordination. The NCC uses several standing group chats that you will be added to when you join the service."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Group Chat", "Purpose", "Who's In It"],
        rows: [
          ["NCC Morning Rounds", "Coordination for round order, admissions, and urgent items", "All NCC APPs, residents, attending of the day"],
          ["NCC Ice Team", "Ice-specific daily coordination", "Ice APP, Ice residents, Ice attending"],
          ["NCC Fire Team", "Fire-specific daily coordination", "Fire APP, Fire residents, Fire attending"],
          ["NCC Procedure Team", "LP/EVD/ICP procedure coordination", "APPs and residents who perform or assist with procedures"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "New Admissions: Always Use the Attending Role",
        text: "For any new admission to the NCC — regardless of time of day or night — the first TigerConnect message goes to 'SJHMC Neuro Critical Care - Attending'. This is non-negotiable. The attending must be in the loop on every new admission before orders are placed."
      }
    },
    {
      type: "heading",
      content: { text: "Best Practices for Clinical Messaging" }
    },
    {
      type: "paragraph",
      content: {
        text: "TigerConnect messages are asynchronous by default. For time-sensitive clinical situations, follow these escalation practices to ensure your message is received."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Urgency Level", "Action"],
        rows: [
          ["Routine (< 30 min)", "TigerConnect message to role; await reply"],
          ["Urgent (< 10 min)", "TigerConnect message, then follow up with phone call to ASCOM number if no reply in 5 min"],
          ["Emergent", "Call ASCOM directly; page via TigerConnect simultaneously; activate rapid response if needed"],
          ["New admission", "TigerConnect to Attending role immediately; include bed number, diagnosis, and any immediate orders needed"]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "What to include in a clinical TigerConnect message",
        content: "Use SBAR format for all clinical communications:\n• S (Situation): 'Mr. J in 4NNB bed 12 is having a clinical change'\n• B (Background): 'Day 3 post SAH, EVD in place, currently on nimodipine'\n• A (Assessment): 'New right arm drift, MAP dropped to 65'\n• R (Recommendation/Request): 'Requesting guidance on MAP target and whether to get emergent CT'\n\nKeep messages concise. Do not send a wall of text — attending is often at bedside. One screen of info maximum per message."
      }
    },
    {
      type: "heading",
      content: { text: "What NOT to Do in TigerConnect" }
    },
    {
      type: "warning",
      content: {
        text: "Do NOT use TigerConnect group chats to share identifiable patient information with anyone outside the direct care team. Even though TigerConnect is HIPAA-compliant, sharing PHI in large group threads violates hospital policy and is a reportable privacy event."
      }
    },
    {
      type: "warning",
      content: {
        text: "Do NOT make final clinical decisions via text message alone. 'OK to push the sux?' is not an acceptable way to get procedural approval. Clinical decisions that require attending authorization must include a real-time verbal component (phone or in-person) that is then documented in the patient chart."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Common TigerConnect mistakes to avoid",
        content: "• Messaging the individual person's name instead of the role — if they're off shift, the message is lost\n• Turning off notifications during on-call periods — you will miss urgent pages\n• Using TigerConnect for personal or non-clinical messaging on hospital accounts\n• Failing to check message receipts — use read receipts to confirm urgent messages were seen\n• Sending medication dosing requests without a follow-up verbal confirmation for high-risk drugs"
      }
    },
    {
      type: "heading",
      content: { text: "Cross-Coverage: After-Hours Handoff" }
    },
    {
      type: "paragraph",
      content: {
        text: "When transitioning to cross-coverage at the end of the day shift, the standard signout role is 'NCC Resident'. After midnight, Fire patients cross-cover to 'SJHMC NCC Fire'. Review M02.L7 (Amion) for signout format and timing expectations."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "TigerConnect is Not a Signout Tool",
        text: "Do not attempt to do full signout via TigerConnect messages. Use TigerConnect to initiate a verbal signout call. The actual signout content (patient list, active issues, anticipated events) should be communicated verbally and backed up by a written signout note in PowerChart."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M02.L3 — Hybrid Chart for Procedure Billing and Service Attribution
// ─────────────────────────────────────────────────────────────────────────────
const m02l3Content = {
  title: "M02.L3 — Hybrid Chart for Procedure Billing and Service Attribution",
  duration_min: 15,
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "The Hybrid Chart is a BNI/SJHMC-specific workflow used alongside PowerChart for procedure billing and service attribution. It is not a replacement for Cerner documentation — it runs in parallel and captures billing-specific data that the standard EMR does not adequately record for the NCC's complex co-management and consult service structure."
      }
    },
    {
      type: "heading",
      content: { text: "What Is the Hybrid Chart?" }
    },
    {
      type: "paragraph",
      content: {
        text: "The Hybrid Chart is a paper-based tracking tool (with some electronic components) that documents two things: (1) which service performed or supervised a procedure, and (2) which service should be attributed the billable encounter for that procedure. At BNI, where multiple services co-manage complex neuro patients, this prevents both double-billing and missed billing."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Component", "What It Captures", "Why Cerner Alone Isn't Enough"],
        rows: [
          ["Procedure attribution", "Which service (NCC Ice, NCC Fire, Neurosurgery, etc.) performed or supervised", "Cerner orders show who placed the order, not necessarily who performed the procedure"],
          ["Service co-management billing", "Daily attribution of co-management vs. primary service", "Cerner does not distinguish co-management billing codes from primary service codes"],
          ["Procedure billing detail", "Time, indication, consent, supervising attending", "Cerner procedure notes are clinical; billing requires structured capture of these elements"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Who Fills Out the Hybrid Chart?",
        text: "The APP or resident who performs or supervises the procedure is responsible for completing the Hybrid Chart entry. The supervising attending must countersign the hybrid chart entry — just as they countersign the Cerner procedure note. Both signatures are required for billing."
      }
    },
    {
      type: "heading",
      content: { text: "When to Use the Hybrid Chart" }
    },
    {
      type: "table",
      content: {
        headers: ["Procedure / Scenario", "Hybrid Chart Required?"],
        rows: [
          ["Lumbar puncture (LP)", "✅ Yes — always"],
          ["External ventricular drain (EVD) management", "✅ Yes — always"],
          ["Intracranial pressure (ICP) monitor placement or removal", "✅ Yes — always"],
          ["Arterial line placement", "✅ Yes — if NCC provider performed it"],
          ["Central venous catheter (CVC)", "✅ Yes — if NCC provider performed it"],
          ["Daily co-management note (Fire service)", "✅ Yes — one entry per day per co-managed patient"],
          ["New NCC consult (not admission)", "✅ Yes — service attribution required"],
          ["Standard daily progress note (Ice primary service)", "❌ No — captured in Cerner only"],
          ["Medication orders only (no procedure)", "❌ No"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "How to Complete a Hybrid Chart Entry" }
    },
    {
      type: "collapsible",
      content: {
        title: "Step-by-step: Hybrid Chart entry for a procedure",
        content: "1. Locate the Hybrid Chart binder at the NCC nursing station (4NNB or 4NNC — one per pod).\n2. Find the correct patient section (patients are filed by bed number and admission date).\n3. Fill in: Date, patient MRN, bed number, procedure type, indication, time of procedure start and end.\n4. Record consent status (documented in PowerChart — reference the PowerChart note ID).\n5. Record who performed the procedure and who supervised (attending name + signature line).\n6. For co-management days: record the date, your service, and the co-managing service.\n7. Obtain attending countersignature before end of shift — do not leave blank signature lines.\n8. The charge team retrieves these entries and submits billing codes — your job ends at the signature."
      }
    },
    {
      type: "warning",
      content: {
        text: "Do NOT leave a Hybrid Chart entry unsigned at end of shift. Unsigned entries cannot be billed. If the attending is unavailable, escalate to the fellow or division chief before leaving. An unsigned Hybrid Chart entry = lost revenue for the department."
      }
    },
    {
      type: "heading",
      content: { text: "Common Errors and How to Avoid Them" }
    },
    {
      type: "table",
      content: {
        headers: ["Common Error", "Consequence", "Prevention"],
        rows: [
          ["Forgetting to fill out Hybrid Chart after a procedure", "Procedure not billed; no departmental revenue credit", "Make it habit: Hybrid Chart immediately after procedure note in Cerner"],
          ["Filling out Hybrid Chart but not Cerner procedure note", "No clinical documentation; billing without medical record support = compliance risk", "Always complete both — Cerner first, then Hybrid Chart"],
          ["Wrong service attribution (e.g., marking Ice instead of Fire)", "Another service loses credit; billing disputes", "Check Amion or ask charge if unsure which service owns the patient that day"],
          ["Missing attending signature", "Entry cannot be billed; may require attestation amendment", "Hand the binder to the attending before they leave the floor; do not assume they'll find it"],
          ["Duplicate entry (two providers both filled out the same procedure)", "Billing duplicate flagged; possible compliance audit", "Check existing entries before writing; each procedure has one entry"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Hybrid Chart vs. PowerChart: What Goes Where" }
    },
    {
      type: "table",
      content: {
        headers: ["Information", "Cerner PowerChart", "Hybrid Chart"],
        rows: [
          ["Full clinical procedure note", "✅", "❌"],
          ["Consent documentation", "✅", "Reference only (by note ID)"],
          ["Billing attribution and codes", "❌", "✅"],
          ["Service co-management attestation", "Co-sign in note", "✅ Separate entry required"],
          ["Procedure time and duration", "In procedure note", "✅ Required for billing"],
          ["Attending countersignature", "✅ In Cerner note", "✅ Also in Hybrid Chart"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Questions About Hybrid Chart Billing?",
        text: "The NCC charge team handles submission and any billing questions. They are available via the NCC Resources website (OKTA → BNI Intranet → Barrow NCC Resources → Billing Contacts). Do not contact hospital billing directly — route all questions through the NCC charge team."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M02.L4 — Imaging Viewers: iConnect, Merge, Ambra
// ─────────────────────────────────────────────────────────────────────────────
const m02l4Content = {
  title: "M02.L4 — Imaging Viewers: iConnect, Merge, Ambra",
  duration_min: 20,
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "Rapid, accurate imaging review is core to Neuro ICU practice. SJHMC uses three imaging viewers depending on the study source and clinical context. iConnect is your primary tool for in-house studies. Merge and Ambra handle outside imaging and transfer patients. Knowing which to open — and how to access it — saves critical minutes."
      }
    },
    {
      type: "heading",
      content: { text: "Overview: Which Viewer for Which Study?" }
    },
    {
      type: "table",
      content: {
        headers: ["Viewer", "Primary Use Case", "Access Method", "When to Use"],
        rows: [
          ["iConnect", "All SJHMC in-house imaging (CT, MRI, CXR, angiography)", "OKTA dashboard or desktop shortcut", "Default for all studies ordered at SJHMC — 95% of your daily imaging"],
          ["Merge", "Outside hospital imaging — DICOM imports from referring facilities", "Via Cerner PowerChart imaging tab or Merge web portal", "Transfer patients arriving with CDs or prior imaging from other hospitals"],
          ["Ambra", "Cloud-based image sharing — receiving and sending studies", "ambra.ai or via email share link", "Receiving images from outside neurosurgeons; sharing studies for second opinion or tele-neurology"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "iConnect: Primary Imaging Viewer" }
    },
    {
      type: "paragraph",
      content: {
        text: "iConnect is the enterprise PACS (Picture Archiving and Communication System) for SJHMC. It integrates directly with PowerChart — clicking the imaging icon in a patient's chart will launch iConnect pre-loaded with that patient's studies."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Step-by-step: Opening a study in iConnect",
        content: "1. Open the patient chart in PowerChart.\n2. Click the 'Results' tab, then locate the imaging order.\n3. Click the camera/image icon next to the study name — iConnect launches automatically.\n4. Alternatively: open iConnect independently via OKTA, search by MRN or patient name.\n5. In iConnect, the study list shows by modality (CT, MRI, XR, IR) and date.\n6. Double-click a study to open the viewer.\n7. Use the windowing presets (stroke/brain window, subdural window, bone window) from the top toolbar.\n8. For CT head series: always scroll through all slices in bone window AND brain window for trauma or hemorrhage evaluation.\n9. Side-by-side comparison: right-click the current study → 'Compare' → select prior study."
      }
    },
    {
      type: "table",
      content: {
        headers: ["iConnect Feature", "How to Access", "NCC Clinical Use"],
        rows: [
          ["Brain window / Subdural window", "Window presets dropdown in toolbar", "Standard for ICH, SAH, subdural evaluation"],
          ["MRA/CTA 3D reconstruction", "Volume rendering tab within study", "Aneurysm sizing, vessel evaluation for treatment planning"],
          ["Side-by-side comparison", "Right-click → Compare", "Pre/post EVD placement, serial hemorrhage assessment"],
          ["Measurement tools", "Ruler icon in toolbar", "Midline shift, hematoma volume (ABC/2 method)"],
          ["Share study link", "Share icon → generate link or export to Ambra", "Send to outside neurosurgery or tele-consult team"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Read the Radiology Report, Always",
        text: "Even if you review images yourself in iConnect, always read the finalized radiology report in PowerChart. Radiologists have diagnostic training for subtle findings you may miss at the bedside. Your clinical interpretation supplements — it does not replace — the formal read. Document both perspectives in your note when they differ."
      }
    },
    {
      type: "heading",
      content: { text: "Merge: Outside and Transfer Imaging" }
    },
    {
      type: "paragraph",
      content: {
        text: "Transfer patients frequently arrive with prior imaging from outside hospitals on a CD or digital transfer. Merge is the platform used to import and view those studies."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Step-by-step: Viewing outside imaging in Merge",
        content: "1. Contact the radiology tech or charge RN to confirm the outside study has been imported to Merge (they receive the CD and upload it).\n2. Access Merge via the PowerChart imaging tab for that patient — look for the 'Outside Studies' section.\n3. Alternatively, open the Merge web portal directly and search by patient name and approximate date.\n4. Studies in Merge are labeled by their source facility.\n5. Use the same windowing tools as iConnect — Merge has a compatible viewer.\n6. To move an outside study to iConnect for comparison: contact radiology to perform a DICOM transfer (this takes 10-30 min; plan ahead for emergent neurosurgical cases).\n7. Always document in your note which outside study you reviewed, from which facility, and on what date it was performed."
      }
    },
    {
      type: "warning",
      content: {
        text: "Outside imaging may be from facilities with different DICOM compression or slice thickness. A CT head with 5mm slices from an outside facility is diagnostically inferior to SJHMC's standard 0.6mm reconstruction. Note imaging quality limitations in your chart review if relevant to clinical decision-making."
      }
    },
    {
      type: "heading",
      content: { text: "Ambra: Cloud-Based Image Sharing" }
    },
    {
      type: "paragraph",
      content: {
        text: "Ambra (ambra.ai) is used primarily for receiving studies from outside providers and for sharing SJHMC studies with consultants or referring providers. You will most commonly encounter Ambra when an outside neurosurgeon wants to review imaging for treatment planning or second opinion."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Scenario", "Action in Ambra"],
        rows: [
          ["Outside neurosurgeon sends you a pre-op CT", "Receive via email share link → download to Ambra workspace → review in Ambra viewer or forward to iConnect"],
          ["You need to share SJHMC angiography with MSK/Mayo for second opinion", "Request radiology to export study to Ambra → generate share link → send via secure email"],
          ["Tele-neurology review of stroke imaging", "Radiology generates Ambra link and routes to tele team; you do not typically initiate this"],
          ["Patient transferring out and receiving facility needs imaging", "Coordinate with radiology and medical records; Ambra or CD can both be used"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Ambra Access Tip",
        text: "You do not need a dedicated Ambra account for viewing received links. Share links open in any browser without login. If you need to send studies proactively, contact the radiology department — APP/resident-initiated Ambra exports require radiology authorization."
      }
    },
    {
      type: "heading",
      content: { text: "Imaging Workflows Specific to NCC Diagnoses" }
    },
    {
      type: "table",
      content: {
        headers: ["Diagnosis", "Imaging Modality", "What to Look for in iConnect"],
        rows: [
          ["Subarachnoid hemorrhage (SAH)", "CT Head non-contrast + CTA Head/Neck", "Basal cistern blood, Fisher grade, aneurysm location on CTA; compare to prior for re-bleed"],
          ["Traumatic brain injury (TBI)", "CT Head non-contrast ± CT C-spine", "Hemorrhage contusions, midline shift, herniation, ABC/2 hematoma volume, skull fractures on bone window"],
          ["Ischemic stroke", "CT Head non-contrast → CTA Head/Neck → MRI DWI/ADC", "ASPECTS score on CT, LVO on CTA, core infarct size on DWI"],
          ["Intracerebral hemorrhage (ICH)", "CT Head non-contrast ± CTA for spot sign", "Hematoma volume (ABC/2), location, IVH extension, spot sign on CTA"],
          ["Status epilepticus", "MRI Brain with DWI", "PRES pattern, hippocampal signal change, cortical diffusion restriction"],
          ["EVD/ICP monitor check", "CT Head non-contrast", "Catheter tip position, ventricular size, new hemorrhage along catheter tract"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Access Issues and Troubleshooting" }
    },
    {
      type: "collapsible",
      content: {
        title: "Troubleshooting: iConnect won't load or shows wrong patient",
        content: "• Verify OKTA session is active — iConnect uses SSO; expired OKTA sessions will fail silently\n• Try opening iConnect directly (not via PowerChart link) and searching by MRN\n• Clear browser cache if the viewer opens but is blank\n• If the study is missing: confirm order was placed and verify with radiology tech that the study was completed and filed\n• For urgent missing studies: call radiology directly (number posted at NCC nursing station)"
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Troubleshooting: Outside study not appearing in Merge",
        content: "• Confirm with charge RN that the CD or digital transfer arrived\n• Check with the radiology tech — outside studies must be manually uploaded; this can take 30-60 minutes after the CD arrives\n• If study is time-sensitive (e.g., patient with SAH coming from outside hospital): call radiology to expedite upload and consider initiating your own in-house imaging while waiting"
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M02.L5 — Natus EEG, Airstrip One, TeleTracking, Ascom
// ─────────────────────────────────────────────────────────────────────────────
const m02l5Content = {
  title: "M02.L5 — Natus EEG, Airstrip One, TeleTracking, Ascom",
  duration_min: 25,
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "Four ancillary systems round out the NCC technology ecosystem: Natus for continuous EEG monitoring, Airstrip One for mobile vitals and drip review, TeleTracking for bed management, and ASCOM for shift-based bedside communication. Each serves a distinct function — understanding all four allows you to manage NCC patients comprehensively without being physically tethered to a single workstation."
      }
    },
    {
      type: "heading",
      content: { text: "Natus: Continuous EEG Monitoring" }
    },
    {
      type: "paragraph",
      content: {
        text: "Natus is the EEG monitoring platform used for all continuous (cEEG) patients in the NCC. The Natus workstation is located within the NCC pod area. EEG technicians manage electrode placement; you manage clinical interpretation and ordering."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Natus Feature", "Where to Access", "Clinical Use"],
        rows: [
          ["Live EEG waveform review", "Natus workstation in 4NNB/4NNC", "Real-time seizure monitoring; useful during status epilepticus management"],
          ["Quantitative EEG (qEEG) trends", "Natus workstation → 'QEEG' tab", "Seizure burden over time, spike frequency trends; useful for post-cardiac arrest monitoring"],
          ["EEG report (prelim and final)", "PowerChart → Results tab", "Neurophysiology fellow prelim read within 30 min; final attending read within 24h"],
          ["Artifact identification", "Natus waveform review", "Distinguish electrode artifact from true EEG activity before calling EEG team"]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "How to order and initiate continuous EEG in the NCC",
        content: "1. Place a 'Continuous EEG' order in PowerChart with indication documented (e.g., altered mental status post-cardiac arrest, post-SE monitoring, SAH with clinical seizure concern).\n2. Notify the EEG technician via TigerConnect (message 'Ice+EEG' or 'Fire+EEG' depending on your service) — include bed number and indication.\n3. The tech will come to place electrodes, typically within 1-2 hours for standard orders, 30 min for STAT.\n4. Once leads are placed, monitoring begins automatically. Continuous reads are reviewed by the neurophysiology fellow.\n5. For urgent EEG interpretation (suspected ongoing seizure): call EEG tech directly via ASCOM or page Ice+EEG/Fire+EEG via TigerConnect with 'URGENT' in the subject line.\n6. All EEG data is reviewed at minimum every 12 hours; more frequently during active management."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "cEEG Indications in the NCC",
        text: "Continuous EEG is standard of care for: post-cardiac arrest (targeted temperature management patients), convulsive status epilepticus after benzodiazepine administration, unexplained altered mental status in neurologically at-risk patients, and high-grade SAH (Hunt-Hess 3-5). If in doubt, discuss with the attending — cEEG early is better than delayed."
      }
    },
    {
      type: "warning",
      content: {
        text: "Do NOT adjust EEG electrode leads or the Natus monitoring setup yourself. Electrode placement and impedance management are the EEG technician's responsibility. Improper adjustments can corrupt EEG data and lead to missed seizure detection."
      }
    },
    {
      type: "heading",
      content: { text: "Airstrip One: Mobile Vitals and Drip Monitoring" }
    },
    {
      type: "paragraph",
      content: {
        text: "Airstrip One is a HIPAA-compliant mobile app that pulls real-time vital signs and infusion pump data directly from the NCC bedside monitoring equipment. It allows you to review a patient's hemodynamic status and active drip rates from your phone, anywhere in the hospital."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Step-by-step: Setting up Airstrip One",
        content: "1. Download 'Airstrip One' from the App Store or Google Play.\n2. Log in with your Commonspirit/SJHMC credentials (same domain login as TigerConnect and Cerner).\n3. Select SJHMC as your facility.\n4. Search for a patient by name or MRN — only patients on currently monitored beds in 4NNB/4NNC will appear.\n5. Tap a patient to view: BP, HR, SpO2, temperature, MAP, ICP (if monitored), CPP, active infusions with current rates.\n6. Enable notification alerts for specific patients (e.g., notify if MAP drops below 70 or ICP exceeds 20)."
      }
    },
    {
      type: "table",
      content: {
        headers: ["What Airstrip One Shows", "What Airstrip One Does NOT Show"],
        rows: [
          ["Real-time vital signs from bedside monitor", "Lab results or imaging (use PowerChart for those)"],
          ["Active IV infusion rates and volumes", "Medication orders or order history"],
          ["ICP and CPP in real time (if EVD/ICP monitor in place)", "Ventilator waveforms or respiratory parameters in detail"],
          ["Historical trend graphs (last 24h)", "Nursing charting or clinical notes"],
          ["Alert thresholds (customizable per patient)", "Full MAR — use PowerChart MAR for full med history"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Airstrip One for Cross-Coverage",
        text: "Airstrip One is especially valuable during overnight cross-coverage when you may be managing multiple patients across 4NNB and 4NNC simultaneously. Set alert thresholds for all high-acuity patients at the start of cross-cover so you receive push notifications without needing to check each patient manually."
      }
    },
    {
      type: "heading",
      content: { text: "TeleTracking: Bed Management" }
    },
    {
      type: "paragraph",
      content: {
        text: "TeleTracking is the hospital-wide bed management platform. While charge RNs primarily operate TeleTracking, APP providers interact with it when coordinating admissions, transfers out of the ICU, and bed availability inquiries."
      }
    },
    {
      type: "table",
      content: {
        headers: ["TeleTracking Function", "Who Uses It", "APP/Provider Interaction"],
        rows: [
          ["Real-time bed status (occupied, dirty, available)", "Charge RN, bed coordinators", "Ask charge RN for current bed status; you do not access TeleTracking directly"],
          ["Admission request routing", "Charge RN + house supervisor", "When admitting a new patient: notify charge RN with patient details; they enter TeleTracking request"],
          ["Transfer-out coordination (ICU → step-down/floor)", "Charge RN + case manager", "Place 'Transfer out of ICU' order in PowerChart → notify charge RN → they update TeleTracking"],
          ["Isolation and precaution flags", "Charge RN", "Ensure infection control precautions are in PowerChart; charge RN syncs with TeleTracking"],
          ["Discharge planning timeline", "Charge RN + case manager", "Update discharge plan in PowerChart — TeleTracking pulls projected discharge date from Cerner"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Bed Availability for New Admissions",
        text: "When you receive a new consult or transfer request, the attending will ask about bed availability. Do not guess — call or TigerConnect the charge RN for 4NNB or 4NNC directly. They have live TeleTracking data. Response time is typically under 5 minutes during daytime."
      }
    },
    {
      type: "heading",
      content: { text: "ASCOM: Bedside Phones and Shift Communication" }
    },
    {
      type: "paragraph",
      content: {
        text: "ASCOM is the bedside phone system used throughout SJHMC. Every APP and resident covering the NCC is assigned an ASCOM number at the start of each shift. Your ASCOM number is how nursing staff, pharmacists, and ancillary teams reach you directly when TigerConnect alone is insufficient."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Step-by-step: Getting your ASCOM number at shift start",
        content: "1. Report to the NCC nursing station (4NNB or 4NNC) at the start of your shift.\n2. Find the ASCOM phone bin — phones are labeled and assigned by role (e.g., 'Ice APP', 'Fire APP', 'Cross-Cover').\n3. Pick up the phone assigned to your role for that shift.\n4. Note your ASCOM number (displayed on the phone screen or printed on the phone itself).\n5. Update your PowerChart signature block to include your ASCOM number — this helps nursing reach you via every channel.\n6. Update the whiteboard at the nursing station with your name and ASCOM number if your unit uses a whiteboard system.\n7. If no phone is available for your role: notify the charge RN immediately so they can locate or reassign a phone."
      }
    },
    {
      type: "table",
      content: {
        headers: ["ASCOM Scenario", "Action"],
        rows: [
          ["Phone not in bin at shift start", "Notify charge RN; check if prior shift provider still has it; request a replacement from the charge desk"],
          ["Call drops repeatedly during a clinical discussion", "Call back immediately; if pattern continues, swap the phone with charge RN"],
          ["Urgent call missed (phone was silenced)", "This is a patient safety event — never silence ASCOM during a clinical shift"],
          ["End of shift", "Return phone to the bin; brief the oncoming APP on active pending calls or issues"],
          ["Phone battery dying mid-shift", "Notify charge RN for a replacement; do not operate on a critically low battery during clinical hours"]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "Your ASCOM number is different each shift — it is not a permanent personal number. If you give out 'your ASCOM number' from a previous shift, calls will go to whoever has that phone today. Always give your current shift number, and update TigerConnect if you want to route calls via your personal device instead."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "ASCOM vs. TigerConnect: Which to Use?",
        text: "Use TigerConnect for documentation-linked messaging, role-based routing, and non-urgent communication. Use ASCOM when: (1) urgency requires immediate voice communication, (2) the person you're calling does not have TigerConnect access, or (3) TigerConnect is down or delayed. In emergencies, ASCOM first — TigerConnect second."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M02.L6 — OKTA, Commonspirit Email, Barrow NCC Resources Website
// ─────────────────────────────────────────────────────────────────────────────
const m02l6Content = {
  title: "M02.L6 — OKTA, Commonspirit Email, Barrow NCC Resources Website",
  duration_min: 15,
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "Three infrastructure tools form the backbone of your non-clinical digital access at BNI/SJHMC: OKTA (single sign-on), Commonspirit email (institutional communication), and the Barrow NCC Resources website (your go-to for protocols, orientation materials, and operational guides). Getting these set up correctly in your first week prevents access headaches throughout your tenure."
      }
    },
    {
      type: "heading",
      content: { text: "OKTA: Single Sign-On" }
    },
    {
      type: "paragraph",
      content: {
        text: "OKTA is the identity and access management (SSO) platform for CommonSpirit Health, the health system that operates SJHMC. Nearly every clinical and administrative application you use — PowerChart remote access, iConnect, TigerConnect web, SharePoint, email — authenticates through OKTA."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Step-by-step: Setting up OKTA on a new device",
        content: "1. Navigate to okta.com or the CommonSpirit OKTA portal (provided in your onboarding email).\n2. Log in with your CommonSpirit domain credentials (firstname.lastname@commonspirit.org or @dignityhealth.org depending on your hire date).\n3. Enroll in Multi-Factor Authentication (MFA): install the Okta Verify app on your phone or use Duo if prompted.\n4. Add your phone number as a backup MFA method.\n5. Once logged in, your OKTA dashboard shows all authorized apps as tiles.\n6. Bookmark the OKTA dashboard URL on your personal and work devices — you will use it daily for remote access.\n7. Update your OKTA password every 90 days when prompted (calendar reminders help)."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Application in OKTA", "What It Opens"],
        rows: [
          ["PowerChart (Cerner)", "Remote access to full EMR via Citrix or web"],
          ["iConnect", "PACS imaging viewer"],
          ["SharePoint", "CommonSpirit institutional documents and policies"],
          ["BNI Intranet", "Barrow internal resources including NCC Resources website"],
          ["Workday", "HR, time tracking, payroll"],
          ["HealthStream", "Compliance training and annual education requirements"],
          ["TigerConnect (web)", "Secure messaging in browser form"]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "Do NOT share your OKTA credentials with anyone, including other clinical staff. OKTA provides your single point of access to all patient systems. A compromised OKTA account is a full EMR security breach. If you believe your credentials are compromised, contact the IT security desk immediately."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "OKTA MFA Is Non-Negotiable",
        text: "Multi-factor authentication is required for all OKTA logins. If your MFA device changes (new phone), update OKTA MFA enrollment immediately — do not wait until you're locked out. IT can reset MFA but this requires an in-person visit with ID verification and can take hours."
      }
    },
    {
      type: "heading",
      content: { text: "Commonspirit Email" }
    },
    {
      type: "paragraph",
      content: {
        text: "Your institutional email is a CommonSpirit email address (typically firstname.lastname@commonspirit.org). This is used for formal communications, scheduling notifications from Amion, HR/payroll alerts, and any communication that requires a paper trail outside of TigerConnect."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Access Method", "How", "Notes"],
        rows: [
          ["On-campus computer", "Outlook desktop app or browser → OKTA → email tile", "Fully functional; attachments and calendar sync natively"],
          ["Off-campus browser", "OKTA dashboard → Outlook Web Access (OWA)", "Full inbox access; calendar view; no download required"],
          ["Mobile (iOS/Android)", "Outlook app → add CommonSpirit account → authenticate via OKTA", "Use Outlook mobile, not native Mail app — native Mail may bypass MFA requirements"],
          ["Shared calendar", "Outlook → open shared calendar (attending or service calendar)", "Useful for tracking rounding schedules, procedure coverage"]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Email categories you will receive regularly",
        content: "• Amion schedule updates and swap notifications\n• IT security alerts and password expiration warnings\n• HR/Workday payroll and benefits notifications\n• HealthStream compliance training due reminders\n• CommonSpirit all-staff clinical policy updates\n• Departmental communications from BNI division chiefs\n• On-call schedule confirmations\n• Credentialing reminders (every 2 years)\n\nSet up folders or rules immediately to avoid inbox chaos. Clinical TigerConnect is your real-time tool; email is for administrative and asynchronous communication."
      }
    },
    {
      type: "heading",
      content: { text: "Barrow NCC Resources Website" }
    },
    {
      type: "paragraph",
      content: {
        text: "The Barrow NCC Resources website is your centralized repository for protocols, orientation materials, the NCC handbook, and operational reference documents. It lives within the BNI intranet, accessible via OKTA."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Step-by-step: Accessing the NCC Resources website",
        content: "1. Log into OKTA (okta.com) with your CommonSpirit credentials.\n2. Click the 'BNI Intranet' tile on your OKTA dashboard.\n3. On the BNI intranet home page, locate the 'Clinical Resources' or 'NCC' navigation menu.\n4. Click 'Barrow NCC Resources' — this opens the NCC-specific resources portal.\n5. Bookmark this page on your browser for future direct access.\n6. If you cannot find the 'BNI Intranet' tile in OKTA, contact your NCC preceptor or the BNI IT help desk — access may need to be provisioned for new staff."
      }
    },
    {
      type: "table",
      content: {
        headers: ["NCC Resources Folder", "What's Inside", "When to Use"],
        rows: [
          ["Protocols", "Current NCC clinical protocols (SAH, TBI, Status Epilepticus, ICP, PRES, etc.)", "Any time you need protocol-specific dosing, treatment thresholds, or management algorithms"],
          ["Orientation", "New provider orientation checklist, competency forms, preceptor contacts", "Your first 30 days; return for credentialing renewals"],
          ["Handbook PDF", "Full NCC APP/Resident Handbook — policies, expectations, call structure, escalation paths", "Reference for operational questions not covered in onboarding"],
          ["Billing & Hybrid Chart", "Hybrid chart instructions, charge team contacts, procedure billing codes", "Any billing or attribution question"],
          ["Schedules & Contacts", "Attending directory, pharmacy contacts, subspecialty consult routing guide", "Finding the right person quickly"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Protocols Are Updated Regularly",
        text: "NCC protocols on the Resources website are the current official versions. Do not rely on PDFs saved to your desktop or phone — they may be outdated. Always access protocols via the website to ensure you're using the current version. Protocol version dates are listed in the document headers."
      }
    },
    {
      type: "paragraph",
      content: {
        text: "The NCC Resources website vs. PowerChart distinction: clinical documentation (notes, orders, results) lives in PowerChart. Operational guidance, protocols, and reference materials live in NCC Resources. Think of it as the difference between a patient's chart and the department's policy manual — both are essential, neither replaces the other."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M02.L7 — Amion Schedule and Signout Norms
// ─────────────────────────────────────────────────────────────────────────────
const m02l7Content = {
  title: "M02.L7 — Amion Schedule and Signout Norms",
  duration_min: 20,
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "Amion is the scheduling platform used by BNI/NCC for physician and APP schedule management. Understanding how to read your schedule, interpret Ice vs. Fire assignments, and execute signout properly is foundational to safe shift transitions in the Neuro ICU."
      }
    },
    {
      type: "heading",
      content: { text: "Accessing Amion" }
    },
    {
      type: "collapsible",
      content: {
        title: "Step-by-step: First-time Amion setup",
        content: "1. Navigate to amion.com in any browser.\n2. In week 1 of orientation, your schedule coordinator will provide you with the NCC Amion access code — this is typically sent via your CommonSpirit email.\n3. Enter the access code on the Amion login screen to view the NCC schedule.\n4. Create a personal Amion account (optional but recommended) to receive email/text notifications of schedule changes and swap requests.\n5. Bookmark amion.com on your phone and computer — you will check it daily before each shift.\n6. Download the Amion app (iOS/Android) for mobile schedule access."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "No Amion Login Yet?",
        text: "If you start week 1 without an Amion access code, contact your NCC program coordinator immediately. Do not start a shift without knowing your assignment (Ice vs. Fire) — the two services have different patient lists, attendings, and cross-coverage responsibilities."
      }
    },
    {
      type: "heading",
      content: { text: "Reading the NCC Schedule" }
    },
    {
      type: "paragraph",
      content: {
        text: "The Amion NCC schedule is organized by service (Ice, Fire) and role (APP, resident, attending, fellow). Each day shows who is covering each slot. Learn to read it correctly to avoid confusion about your assignment and accountability."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Schedule Column / Label", "Meaning", "Notes"],
        rows: [
          ["Ice APP", "APP provider covering the Ice (neurology-led) service", "Your primary team for the day; coordinate with Ice residents"],
          ["Fire APP", "APP provider covering the Fire (neurosurgery co-management) service", "Co-management with neurosurgery; attending is NCC Fire attending"],
          ["Ice Attending", "NCC attending supervising the Ice service", "Your supervisor for the day; all new admissions and urgent orders go to them via TigerConnect"],
          ["Fire Attending", "NCC attending supervising the Fire service", "Supervisor for Fire service; they often round with neurosurgery"],
          ["Cross-Cover", "Overnight or weekend provider covering both services", "If your name appears here, you are responsible for both 4NNB and 4NNC pods"],
          ["EEG Fellow", "Fellow staffing EEG reads for that day", "Contact via TigerConnect Ice+EEG or Fire+EEG; determines EEG read response time"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Ice vs. Fire: Know Your Assignment Before You Arrive",
        text: "Ice and Fire services have different patient lists in PowerChart, different attending contacts in TigerConnect, different signout contacts, and different hybrid chart responsibilities. Checking Amion the night before your shift allows you to pre-load the correct patient list in PowerChart and confirm who your attending is before rounds start."
      }
    },
    {
      type: "heading",
      content: { text: "Signout Norms and Expectations" }
    },
    {
      type: "paragraph",
      content: {
        text: "Signout is a patient safety event. The NCC has standardized signout expectations to minimize information loss at shift transitions. The following norms apply to all APP and resident providers."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Signout Timing", "Expectation"],
        rows: [
          ["Day shift end (4:30–5:00 PM)", "Verbal touch-base with cross-cover provider; all progress notes completed before signout begins"],
          ["On-call handoff (to overnight cross-cover)", "Formal verbal signout using standardized format; written signout note or updated problem list in PowerChart"],
          ["Weekend transitions (Friday PM)", "Extended signout; cover all patients, not just those with active issues — the cross-cover may not know any of your patients"],
          ["Morning rounds handoff (6–7 AM)", "Outgoing cross-cover to incoming day team; brief verbal handoff; highlight overnight events only"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Signout Format: What to Include" }
    },
    {
      type: "collapsible",
        content: {
          title: "Standardized NCC signout format (per patient)",
          content: "Use this structure for each patient during signout:\n\n1. Name / MRN / Bed: [patient identifier + location]\n2. Diagnosis and hospital day: 'SAH Day 5, Hunt-Hess 3, modified Fisher 4'\n3. Active issues from today: 'Vasospasm concern — had TCD today, report pending'\n4. Drips/infusions to watch: 'On nicardipine gtt at 5 mg/hr, MAP target 100-130'\n5. Pending items: 'Awaiting CTA Head result ordered at 3 PM; neurosurgery wants repeat in AM'\n6. Anticipated events: 'May need urgent CTA if neuro exam changes overnight'\n7. Code status and family contact: 'Full code; wife [Name] is primary contact, her number is in PowerChart'\n8. If-then instructions: 'If ICP > 25 sustained > 5 min: EVD drain at 10cm, notify attending'"
        }
    },
    {
      type: "warning",
      content: {
        text: "Do NOT sign out before all progress notes for your patients are completed in PowerChart. Unsigned or missing notes at handoff are a compliance issue and a patient safety risk. The oncoming provider may need to act on information that should be in the chart. 'I'll finish it later' is not acceptable."
      }
    },
    {
      type: "heading",
      content: { text: "What to Exclude From Signout" }
    },
    {
      type: "paragraph",
      content: {
        text: "Effective signout is as much about what you leave out as what you include. Over-loading the receiving provider with unnecessary information increases cognitive burden and buries the critical items."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Exclude From Signout", "Why"],
        rows: [
          ["Resolved issues from earlier in the week", "Cross-cover doesn't need the full hospital course — only active and anticipated issues"],
          ["Stable vitals that have not changed all day", "If there's nothing to watch, don't fill time describing it"],
          ["Social history unless directly relevant to overnight care", "EMR has it; reserve verbal signout for clinical decisions"],
          ["Redundant details already in the chart note", "'It's all in the note' is fine for background — signout highlights the deltas and the action items"],
          ["Irrelevant consultant recommendations from weeks ago", "Stick to active recommendations and open loops"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Schedule Changes, Swaps, and Absences" }
    },
    {
      type: "collapsible",
        content: {
          title: "How to handle schedule changes and swap requests",
          content: "1. All schedule swaps must be arranged through Amion — contact your schedule coordinator and the provider you're swapping with.\n2. Both parties must confirm the swap in Amion (or via email to the coordinator) before it is official.\n3. Do NOT rely on verbal swap agreements — if it's not in Amion, it doesn't exist for scheduling purposes.\n4. For unexpected absences (illness): contact the schedule coordinator AND your attending of the day AND the incoming cross-cover as early as possible.\n5. Same-day call-outs: notify by phone, not just email — response time matters for patient coverage.\n6. Check Amion after any swap confirmation to verify the change appears correctly on the live schedule."
        }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Amion Schedule Accuracy = Patient Safety",
        text: "An incorrect Amion schedule means the wrong provider receives TigerConnect pages (because roles are set based on who thinks they're on). Verify your schedule weekly and immediately after any swap. If Amion shows someone else in your slot, contact the coordinator same day."
      }
    },
    {
      type: "heading",
      content: { text: "Shift Documentation Expectations Before Leaving" }
    },
    {
      type: "table",
      content: {
        headers: ["Checklist Item", "Done Before Leaving?"],
        rows: [
          ["All progress notes complete and signed in PowerChart", "✅ Required"],
          ["All procedure notes complete (if procedures were done)", "✅ Required"],
          ["Hybrid Chart entries completed and attended-signed", "✅ Required"],
          ["Signout note or updated PowerChart problem list", "✅ Required"],
          ["Verbal signout to oncoming provider completed", "✅ Required"],
          ["TigerConnect role released / status updated to 'off shift'", "✅ Recommended — prevents misdirected pages"],
          ["ASCOM phone returned to charging bin", "✅ Required"],
          ["Any open order questions escalated to attending or cross-cover", "✅ Required"]
        ]
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson registry
// ─────────────────────────────────────────────────────────────────────────────
const lessons = [
  { title: 'M02.L1 — Cerner PowerChart (Desktop & Mobile)', content: m02l1Content },
  { title: 'M02.L2 — TigerConnect Roles and Team Chats', content: m02l2Content },
  { title: 'M02.L3 — Hybrid Chart for Procedure Billing and Service Attribution', content: m02l3Content },
  { title: 'M02.L4 — Imaging Viewers: iConnect, Merge, Ambra', content: m02l4Content },
  { title: 'M02.L5 — Natus EEG, Airstrip One, TeleTracking, Ascom', content: m02l5Content },
  { title: 'M02.L6 — OKTA, Commonspirit Email, Barrow NCC Resources Website', content: m02l6Content },
  { title: 'M02.L7 — Amion Schedule and Signout Norms', content: m02l7Content },
];

// ─────────────────────────────────────────────────────────────────────────────
// Populate
// ─────────────────────────────────────────────────────────────────────────────
async function populate() {
  console.log('📚 Loading M02 content...\n');
  for (const lesson of lessons) {
    const { data, error: findError } = await supabase
      .from('module_lessons')
      .select('id, title')
      .eq('title', lesson.title)
      .single();

    if (findError || !data) {
      console.log(`❌ Not found: "${lesson.title}" — ${findError?.message ?? 'no row returned'}`);
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
  console.log('\n✨ Done!');
}

populate().catch(console.error);
