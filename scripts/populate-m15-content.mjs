#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => { if(line&&!line.startsWith('#')){const[k,...v]=line.split('=');env[k.trim()]=v.join('=').trim();} });
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {auth:{autoRefreshToken:false,persistSession:false}});

// ─── M15.L1 — Agitation, Sedation Goals, and Daily Awakening Trials ───────────
const m15l1Content = {
  title: "Agitation, Sedation Goals, and Daily Awakening Trials",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Agitation in the ICU" }
    },
    {
      type: "paragraph",
      content: {
        text: "Agitation is motor restlessness arising from internal discomfort such as pain, delirium, or anxiety. Approximately 70% of ICU patients experience agitation. It is associated with longer ICU stays, more mechanical ventilation days, ventilator dyssynchrony, increased oxygen demand, and inadvertent device removal."
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Treatment Goal",
        text: "Treat the underlying discomfort while maintaining an AWAKE patient who can follow commands. Sedation should never be the default first response to agitation."
      }
    },
    {
      type: "heading",
      content: { text: "Validated Sedation Scales" }
    },
    {
      type: "table",
      content: {
        headers: ["RASS Score", "Label", "Description"],
        rows: [
          ["+4", "Combative", "Overtly combative, violent, immediate danger to staff"],
          ["+3", "Very Agitated", "Pulls or removes tubes/catheters; aggressive"],
          ["+2", "Agitated", "Frequent non-purposeful movement, fights ventilator"],
          ["+1", "Restless", "Anxious but movements not aggressive or vigorous"],
          ["0", "Alert & Calm", "Optimal target"],
          ["-1", "Drowsy", "Not fully alert but sustained eye opening >10 sec to voice"],
          ["-2", "Light Sedation", "Briefly awakens, eye contact <10 sec to voice"],
          ["-3", "Moderate Sedation", "Movement or eye opening to voice, no eye contact"],
          ["-4", "Deep Sedation", "No response to voice, moves to physical stimulation"],
          ["-5", "Unarousable", "No response to voice or physical stimulation"]
        ]
      }
    },
    {
      type: "table",
      content: {
        headers: ["Scale", "Range", "Optimal Target", "Notes"],
        rows: [
          ["RASS", "+4 to -5", "RASS 0", "Most widely validated; assesses both agitation and sedation depth"],
          ["Ramsay Sedation Scale", "1–6", "Ramsay 2", "1=anxious/agitated, 2=cooperative/oriented/tranquil, 3–6 increasing sedation"],
          ["Riker SAS", "1–7", "SAS 4", "1=unarousable, 4=calm/cooperative, 7=dangerous agitation"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Knowledge Check",
        text: "The major focus of an effective sedation/analgesia plan is formal iterative evaluation using validated scales — not just clinician impression or vital signs alone."
      }
    },
    {
      type: "heading",
      content: { text: "Daily Awakening Trials — Evidence Base" }
    },
    {
      type: "paragraph",
      content: {
        text: "Daily sedation interruptions (awakening trials) have demonstrated significant reductions in mechanical ventilation duration and ICU length of stay across multiple landmark trials."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Trial", "Design", "Key Findings"],
        rows: [
          [
            "Kress et al. 2000",
            "128 MICU patients; daily interruption of sedatives vs clinician discretion",
            "ICU d/c: 9.1 vs 12.9 days (p=0.01); Hospital d/c: 14.9 vs 19.2 days (p=0.04); 1-yr mortality: 44% vs 58% (p=0.01)"
          ],
          [
            "Early PT/OT Trial",
            "Intervention group received early physical and occupational therapy",
            "Delirium: 2 vs 4 days (p=0.03); Delirium prevalence: 33% vs 57% (p=0.02); Vent-free days: 23.5 vs 21.1 (p=0.05); ICU LOS: 5.9 vs 7.9 days (p=0.08)"
          ],
          [
            "Continuous IV Sedation Study",
            "Observational; 242 patients",
            "38% received continuous infusions; continuous sedation independently associated with prolonged mechanical ventilation"
          ]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Clinical Obligation",
        text: "Mechanical ventilation obligates the care team to ensure they can awaken most patients on a daily basis. Failure to perform daily awakening trials without a clear contraindication is a quality gap."
      }
    },
    {
      type: "heading",
      content: { text: "Analgesia-First Sedation Strategy" }
    },
    {
      type: "paragraph",
      content: {
        text: "Current evidence strongly supports treating pain before initiating sedation. An analgesia-first approach promotes normal sleep patterns and reduces total sedative requirements. SCCM PAD guidelines endorse analgesia-based sedation over sedation-first approaches."
      }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Assess pain using a validated scale before titrating sedation",
          "Treat pain first — do not escalate sedation to mask uncontrolled pain",
          "Target lightest effective sedation depth (RASS 0 to -1 for most patients)",
          "Perform daily awakening trials unless a specific contraindication exists",
          "Document the reason if awakening trial is deferred or contraindicated"
        ]
      }
    }
  ]
};

// ─── M15.L2 — Sedative Agents: Pharmacology and Clinical Selection ─────────────
const m15l2Content = {
  title: "Sedative Agents: Pharmacology and Clinical Selection",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Benzodiazepines" }
    },
    {
      type: "paragraph",
      content: {
        text: "Mechanism: Potentiation of GABA-A receptor chloride channel opening. Agents include midazolam (short-acting, suitable for IV infusion), lorazepam (longer-acting, less hemodynamic effect), and diazepam."
      }
    },
    {
      type: "warning",
      content: {
        title: "Benzodiazepines and Delirium Risk",
        text: "Pandharipande et al. identified lorazepam as an independent risk factor for transitioning to delirium (OR 1.2 per mg/day). Additional risks include respiratory depression, hypotension, tolerance, and withdrawal syndrome. Prefer non-benzodiazepine sedation whenever possible."
      }
    },
    {
      type: "heading",
      content: { text: "Propofol" }
    },
    {
      type: "paragraph",
      content: {
        text: "Mechanism: GABA-A agonist. Advantages: rapid onset and offset enabling frequent neurological assessments, titratable depth, reduces ICP, anti-epileptic properties. Particularly useful in the neuro ICU where neurological exams must be preserved."
      }
    },
    {
      type: "warning",
      content: {
        title: "Propofol Infusion Syndrome (PRIS)",
        text: "PRIS occurs with high doses >80 mcg/kg/min for >48 hours. Features: metabolic acidosis, cardiac failure, rhabdomyolysis, and acute renal failure. Monitor serum triglycerides in patients receiving prolonged propofol infusions. The lipid vehicle provides ~1.1 kcal/mL — account for this in nutritional calculations."
      }
    },
    {
      type: "heading",
      content: { text: "Dexmedetomidine" }
    },
    {
      type: "paragraph",
      content: {
        text: "Mechanism: Selective alpha-2 adrenergic agonist acting at locus coeruleus. Produces anxiolysis and sedation WITHOUT respiratory depression, allowing neurological assessment. Analgesic-sparing properties. Reduces delirium incidence."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Property", "Detail"],
        rows: [
          ["Advantages", "No respiratory depression, allows extubation while sedated, reduces delirium, analgesic-sparing, useful as CIWA protocol adjunct"],
          ["Disadvantages", "Bradycardia, hypotension, limited sedation depth (RASS -2 to 0 only)"],
          ["Best Use Cases", "Agitated patients planned for extubation, alcohol withdrawal, patients where neurological assessment must be preserved"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Ketamine" }
    },
    {
      type: "paragraph",
      content: {
        text: "Mechanism: NMDA receptor antagonist. Unique profile: provides both analgesia and dissociative sedation. Bronchodilator via catecholamine release. Preserves airway reflexes and hemodynamic stability."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Property", "Detail"],
        rows: [
          ["Advantages", "Analgesia + sedation in one agent, bronchodilator, hemodynamically supportive (catecholamine release), useful for painful procedures"],
          ["Disadvantages", "Increased secretions (consider glycopyrrolate), emergence reactions/dysphoria, historically avoided in elevated ICP — newer data is more permissive"],
          ["Best Use Cases", "Hemodynamically unstable patients, bronchospasm/severe asthma, procedural sedation, adjunct analgesic"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Etomidate" }
    },
    {
      type: "warning",
      content: {
        title: "Etomidate — RSI Only",
        text: "Etomidate is an induction agent only. A single dose suppresses adrenal cortisol production for up to 24 hours via inhibition of 11-beta-hydroxylase. DO NOT use as a continuous sedation infusion. Reserve for rapid sequence intubation."
      }
    },
    {
      type: "heading",
      content: { text: "Haloperidol (Butyrophenone)" }
    },
    {
      type: "paragraph",
      content: {
        text: "Haloperidol is a typical antipsychotic used for agitated, delirious, or psychotic patients in the ICU. Onset approximately 20 minutes IV. Causes less respiratory depression and hemodynamic compromise than traditional sedatives. Not a true sedative but valuable for delirium management."
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Haloperidol Side Effects",
        text: "QT prolongation (obtain baseline and serial ECGs), neuroleptic malignant syndrome (NMS), extrapyramidal symptoms (EPS). Monitor QTc; hold or switch agent if QTc >500 ms."
      }
    },
    {
      type: "heading",
      content: { text: "Brain Function Monitoring" }
    },
    {
      type: "paragraph",
      content: {
        text: "For patients requiring deep sedation, objective brain function monitoring tools include the Bispectral Index (BIS) and Near-Infrared Spectroscopy (NIRS). BIS provides a continuous processed EEG index (0–100) to guide sedation depth titration and detect awareness."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Mechanism", "Key Advantage", "Key Risk", "Best Use"],
        rows: [
          ["Midazolam", "GABA-A potentiation", "Short-acting, IV infusion", "Delirium, tolerance", "Short-term procedural or acute agitation"],
          ["Lorazepam", "GABA-A potentiation", "Less hemodynamic effect", "Independent delirium risk factor", "Status epilepticus (not preferred for sedation)"],
          ["Propofol", "GABA-A agonist", "Rapid offset, neuro exam preserved", "PRIS, hypotension", "Neuro ICU, short-term sedation"],
          ["Dexmedetomidine", "Alpha-2 agonist", "No respiratory depression", "Bradycardia, limited depth", "Pre-extubation, delirium, alcohol withdrawal"],
          ["Ketamine", "NMDA antagonist", "Hemodynamic support + analgesia", "Secretions, emergence", "Hemodynamic instability, procedures"],
          ["Haloperidol", "Dopamine D2 antagonist", "Delirium management", "QT prolongation, NMS", "Delirium, psychosis"]
        ]
      }
    }
  ]
};

// ─── M15.L3 — Pain Assessment and Opioid Analgesics in the ICU ────────────────
const m15l3Content = {
  title: "Pain Assessment and Opioid Analgesics in the ICU",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Pain Epidemiology in the ICU" }
    },
    {
      type: "paragraph",
      content: {
        text: "In a landmark study of 154 surgical and 76 medical ICU patients assessed twice daily, 51% experienced significant pain. There was no difference in prevalence between medical and surgical patients. Alarmingly, 36% of surgical patients and 63% of medical patients received NO preventive analgesics. Medical patients reported higher pain scores despite their greater analgesic deficit."
      }
    },
    {
      type: "heading",
      content: { text: "Consequences of Uncontrolled Pain" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Catabolism and negative nitrogen balance",
          "Paralytic ileus — delayed enteral nutrition",
          "ADH release — fluid retention and hyponatremia",
          "Immune dysregulation — increased infection susceptibility",
          "Hypercoagulable state — DVT/PE risk",
          "Increased myocardial oxygen demand — risk of ischemia"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Pain Assessment in the ICU" }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Pain Assessment Goal",
        text: "Use a validated scale, establish a target goal, and measure against it at regular intervals. Do NOT rely solely on vital signs — they are neither sensitive nor specific for pain."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Scale Type", "Examples", "Best For"],
        rows: [
          ["Descriptive", "Verbal descriptor scale (none/mild/moderate/severe)", "Patients who can communicate verbally"],
          ["Numerical (NRS)", "0–10 numeric rating scale", "Patients who can self-report"],
          ["Visual (VAS)", "100 mm visual analog scale", "Patients who can self-report and mark a line"],
          ["Behavioral", "BPS, CPOT", "Intubated or unable-to-report patients — most common in ICU"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "SCCM Behavioral Pain Scale (BPS)" }
    },
    {
      type: "paragraph",
      content: {
        text: "The BPS (Payen J et al. Crit Care Med 2001;29(12):2258–2263) is validated for intubated patients unable to self-report pain. Three domains are assessed; each scored 1–4. Total range: 3 (no pain) to 12 (maximum pain)."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Domain", "Score 1", "Score 2", "Score 3", "Score 4"],
        rows: [
          ["Facial Expression", "Relaxed", "Partially tightened", "Fully tightened", "Grimacing"],
          ["Upper Limb Movements", "None", "Partially bent", "Fully bent with fingers flexed", "Permanently retracted"],
          ["MV Compliance", "Tolerating movement", "Coughing but tolerating", "Fighting ventilator", "Unable to control ventilation"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "BPS Interpretation",
        text: "BPS 3 = no pain; BPS 6+ = significant pain requiring intervention; BPS 12 = maximum pain. A BPS >5 is commonly used as a threshold for analgesic intervention."
      }
    },
    {
      type: "heading",
      content: { text: "Opioid Analgesics: Adverse Effects" }
    },
    {
      type: "checklist",
        content: {
          items: [
            "Respiratory depression — dose-dependent, most clinically significant",
            "Hypotension — sympatholysis and histamine release (especially morphine)",
            "Decreased GI motility — ileus, constipation, feeding intolerance",
            "Pruritis — histamine-mediated (morphine > others)"
          ]
        }
    },
    {
      type: "heading",
      content: { text: "ICU Opioid Comparison" }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Receptor", "IV Onset", "Half-Life", "Metabolism", "Active Metabolites", "Equianalgesic IV Dose"],
        rows: [
          ["Fentanyl", "μ agonist", "1–2 min", "2–4 h", "N-dealkylation (CYP3A4)", "Yes", "0.1 mg"],
          ["Hydromorphone", "μ agonist", "5–15 min", "2–3 h", "Glucuronidation", "No", "1.5 mg"],
          ["Morphine", "μ (weak δ, κ)", "5–10 min", "3–4 h", "Glucuronidation", "Yes (M6G)", "10 mg"],
          ["Methadone", "μ + weak NMDA antagonist", "1–3 days (steady state)", "15–60 h", "N-demethylation", "No", "Variable"],
          ["Remifentanil", "μ agonist", "1–3 min", "3–10 min", "Plasma esterases", "No", "—"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Remifentanil in the ICU",
        text: "Remifentanil's ultra-short half-life (~3–10 minutes via plasma esterase hydrolysis) makes it ideal when rapid offset is required (e.g., frequent neurological exams). Discontinuation can cause acute opioid withdrawal — transition carefully."
      }
    },
    {
      type: "heading",
      content: { text: "Analgesic Strategy Framework" }
    },
    {
      type: "paragraph",
      content: {
        text: "SCCM PAD guidelines support a multimodal approach to ICU analgesia. Opioids remain the primary agents, but adjuvants can reduce opioid requirements and side effects."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Approach", "Examples", "Benefit"],
        rows: [
          ["Adjuvant analgesics", "Acetaminophen, NSAIDs, gabapentin, ketamine (sub-anesthetic)", "Opioid-sparing; target different pain pathways"],
          ["Opioids", "Fentanyl, hydromorphone, morphine, remifentanil", "First-line for moderate-severe ICU pain"],
          ["Regional/neuraxial", "Epidural, peripheral nerve blocks, wound catheters", "Superior analgesia for thoracic/abdominal surgery; reduces systemic opioid load"],
          ["Analgesia-first sedation", "Treat pain before escalating sedation", "Reduces sedative requirements; improves ventilator synchrony"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Key Takeaways",
        text: "Measure pain, anxiety, and agitation using validated scales. Establish numeric goals. Monitor process adherence AND outcome against those goals. Never accept 'the patient looks comfortable' as a substitute for validated measurement."
      }
    }
  ]
};

// ─── M15.L4 — Neuromuscular Blockade: Indications, Agents, and Monitoring ─────
const m15l4Content = {
  title: "Neuromuscular Blockade: Indications, Agents, and Monitoring",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Indications for NMB in the ICU" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Severe ARDS with P/F ratio <150 — facilitates prone positioning, reduces VILI, improves ventilator synchrony",
          "Status epilepticus — only when airway management requires it; EEG monitoring is ESSENTIAL (NMB masks clinical seizures)",
          "Elevated ICP with severe refractory agitation",
          "Tetanus — to control muscle rigidity and spasms",
          "Difficult intubation and airway management (RSI)"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Landmark Trials: NMB in ARDS" }
    },
    {
      type: "table",
      content: {
        headers: ["Trial", "Design", "Primary Finding", "Interpretation"],
        rows: [
          [
            "ACURASYS (2010)",
            "48-hour cisatracurium infusion vs placebo in severe ARDS (P/F <150)",
            "90-day mortality: 31.6% vs 40.7% (p=0.08, non-significant trend); reduced barotrauma, improved P/F ratio",
            "Suggested mortality benefit; drove widespread adoption of early NMB in severe ARDS"
          ],
          [
            "ROSE (2019)",
            "Early NMB (cisatracurium 48h) vs lighter sedation target in ARDS",
            "No mortality benefit: 42.5% vs 42.8%",
            "Challenged ACURASYS. Suggests benefit in ACURASYS may have been attributable to deeper sedation in the control arm rather than NMB per se"
          ]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Current Practice Interpretation",
        text: "NMB remains reasonable in severe ARDS (P/F <150) when ventilator dyssynchrony cannot be controlled with optimized sedation/analgesia, particularly when prone positioning is planned. However, routine early NMB is no longer universally recommended based on ROSE trial data."
      }
    },
    {
      type: "warning",
      content: {
        title: "NMB in the Neuro ICU — Critical Warning",
        text: "NMB abolishes ALL clinical neurological assessment. In the neuro ICU, use NMB only when absolutely necessary. Always ensure continuous EEG monitoring is in place when there is any seizure risk — NMB completely masks clinical seizure activity while electrographic seizures continue undetected and untreated."
      }
    },
    {
      type: "heading",
      content: { text: "Depolarizing NMB Agent" }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Onset", "Duration", "Mechanism", "Contraindications"],
        rows: [
          [
            "Succinylcholine",
            "45–60 seconds",
            "10–15 minutes",
            "Depolarizes all NMJ → fasciculations → sustained depolarization block",
            "Burns >24h old, crush injuries, denervation injuries (hyperkalemia risk from upregulated AChR), known hyperkalemia, malignant hyperthermia susceptibility, pseudocholinesterase deficiency"
          ]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Non-Depolarizing (Competitive) NMB Agents" }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Dose (Intubation)", "Onset", "Duration", "Metabolism", "Key Notes"],
        rows: [
          ["Rocuronium", "0.6–1.2 mg/kg (1.2 mg/kg for RSI)", "60–90 sec", "30–90 min", "Hepatic/biliary", "Reversible with sugammadex; high-dose RSI alternative to succinylcholine"],
          ["Vecuronium", "0.1 mg/kg", "3–5 min", "25–40 min", "Hepatic", "Longer-acting; caution in liver failure; accumulates with prolonged infusion"],
          ["Cisatracurium", "0.15–0.2 mg/kg; infusion 1–3 mcg/kg/min", "3–5 min", "45–75 min", "Hofmann elimination (organ-independent)", "Drug of choice for prolonged ICU NMB; safe in renal AND hepatic failure"],
          ["Atracurium", "0.4–0.5 mg/kg", "2–3 min", "30–45 min", "Hofmann + plasma esterases", "Releases histamine (less preferred than cisatracurium for infusions)"],
          ["Pancuronium", "0.08–0.1 mg/kg", "3–5 min", "60–100 min", "Renal (primarily)", "Long-acting; vagolytic effect causes tachycardia; rarely used in modern ICU practice"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Cisatracurium — ICU Agent of Choice",
        text: "Cisatracurium undergoes spontaneous Hofmann elimination at physiologic pH and temperature — completely independent of renal or hepatic function. This makes it the preferred agent for prolonged NMB infusions in critically ill patients who commonly have multi-organ dysfunction."
      }
    },
    {
      type: "heading",
      content: { text: "Monitoring NMB: Train-of-Four (TOF)" }
    },
    {
      type: "paragraph",
      content: {
        text: "Train-of-four stimulation delivers four supramaximal electrical stimuli at 2 Hz to a peripheral nerve (typically ulnar at the wrist) and counts the resulting muscle twitches. This guides NMB titration in the ICU."
      }
    },
    {
      type: "table",
      content: {
        headers: ["TOF Result", "Interpretation", "Action"],
        rows: [
          ["0/4 twitches", "Too deep — complete block", "Reduce or hold NMB infusion"],
          ["1–2/4 twitches", "Target range for ICU NMB", "Maintain current infusion rate"],
          ["3–4/4 twitches", "Inadequate block", "Increase NMB infusion rate"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "NMB Reversal Agents" }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Mechanism", "Agents Reversed", "Special Considerations"],
        rows: [
          [
            "Neostigmine",
            "Anticholinesterase — increases ACh at NMJ to overcome competitive block",
            "All non-depolarizing NMBs",
            "Must administer with glycopyrrolate or atropine to block muscarinic effects (bradycardia, bronchospasm, increased secretions)"
          ],
          [
            "Sugammadex",
            "Encapsulates and inactivates agent in plasma — true pharmacological reversal",
            "Rocuronium and vecuronium ONLY",
            "Faster and more complete reversal than neostigmine; no muscarinic side effects; preferred when available"
          ]
        ]
      }
    },
    {
      type: "warning",
      content: {
        title: "CRITICAL: Never Use NMB Without Adequate Sedation",
        text: "Neuromuscular blockade provides NO sedation, NO analgesia, and NO anxiolysis. A fully paralyzed patient can be fully awake, aware, and in pain — unable to communicate or move. This constitutes patient harm. ALWAYS ensure adequate sedation and analgesia are established BEFORE initiating NMB. This is both a clinical and ethical imperative."
      }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Confirm adequate sedation (RASS target achieved) BEFORE starting NMB",
          "Confirm adequate analgesia is in place",
          "Ensure continuous EEG monitoring if any seizure risk exists",
          "Titrate NMB infusion to TOF 1–2/4 twitches",
          "Reassess NMB necessity daily — discontinue as soon as indication resolves",
          "Document sedation, analgesia, and NMB goals on every ICU rounds"
        ]
      }
    }
  ]
};

// ─── Main Execution ────────────────────────────────────────────────────────────
async function main() {
  console.log('Fetching M15 lessons from Supabase...');

  const { data: lessons, error: fetchError } = await supabase
    .from('module_lessons')
    .select('id, title')
    .like('title', 'M15.L%')
    .order('order_index');

  if (fetchError) {
    console.error('Error fetching lessons:', fetchError);
    process.exit(1);
  }

  if (!lessons || lessons.length === 0) {
    console.error('No M15 lessons found. Ensure lessons are seeded before running this script.');
    process.exit(1);
  }

  console.log(`Found ${lessons.length} M15 lesson(s):`);
  lessons.forEach(l => console.log(`  - ${l.id}: ${l.title}`));

  const contentMap = [m15l1Content, m15l2Content, m15l3Content, m15l4Content];

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const content = contentMap[i];

    if (!content) {
      console.warn(`No content defined for lesson index ${i} (${lesson.title}), skipping.`);
      continue;
    }

    console.log(`\nUpdating lesson: ${lesson.title} (${lesson.id})`);

    const { error: updateError } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(content) })
      .eq('id', lesson.id);

    if (updateError) {
      console.error(`  ERROR updating ${lesson.title}:`, updateError);
    } else {
      console.log(`  ✓ Successfully updated ${lesson.title} with ${content.blocks.length} blocks`);
    }
  }

  console.log('\nM15 content population complete.');
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
