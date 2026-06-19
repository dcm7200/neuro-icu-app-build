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

// ─────────────────────────────────────────────────────────────────────────────
// M04.L1 — Mechanical Ventilation: Modes, Settings, and Neuro Targets
// ─────────────────────────────────────────────────────────────────────────────
const m04l1Content = {
  blocks: [
    {
      type: "heading",
      content: { text: "Overview" }
    },
    {
      type: "paragraph",
      content: {
        text: "Mechanical ventilation is a core NCC APP skill. Neuro patients have unique ventilator requirements driven by the need to control PaCO₂, minimize ICP, and protect the airway — often in the setting of altered consciousness, brain injury, or neuromuscular compromise. You will co-manage all vented patients with the PCCM attending, who is in-house 24/7. Understand the modes, settings, and neuro-specific targets — but loop PCCM in for significant changes."
      }
    },
    {
      type: "heading",
      content: { text: "Ventilator Modes" }
    },
    {
      type: "table",
      content: {
        headers: ["Mode", "Full Name", "Breath Trigger", "Volume/Pressure", "When Used in NCC"],
        rows: [
          ["AC/VC", "Assist-Control / Volume Control", "Patient or timed", "Set tidal volume, variable pressure", "Most common in NCC. Full support, consistent TV. Good for ICP patients."],
          ["AC/PC", "Assist-Control / Pressure Control", "Patient or timed", "Set pressure, variable volume", "Useful in ARDS or when plateau pressure is a concern. Watch for TV swings."],
          ["PRVC", "Pressure-Regulated Volume Control", "Patient or timed", "Pressure-adjusted to achieve target TV", "Hybrid — best of both. Common in many NCC patients when available."],
          ["SIMV", "Synchronized Intermittent Mandatory Ventilation", "Synchronized mandatory + spontaneous", "Set rate + spontaneous breaths", "Less common; used in weaning. Can lead to respiratory fatigue — caution in neuro patients."],
          ["PS/CPAP", "Pressure Support / CPAP", "Patient-triggered only", "Set pressure support over PEEP", "Weaning mode or spontaneous breathing trials. Patient must drive all breaths."]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "NCC Default Starting Mode",
        text: "AC/VC or PRVC is the standard starting mode in NCC at SJHMC. If unsure of initial settings, confirm with PCCM at the time of intubation or on arrival from the ED/OR."
      }
    },
    {
      type: "heading",
      content: { text: "Key Ventilator Settings" }
    },
    {
      type: "table",
      content: {
        headers: ["Setting", "Abbreviation", "Typical Starting Range", "Neuro Consideration"],
        rows: [
          ["Tidal Volume", "TV / Vt", "6–8 mL/kg IBW", "6 mL/kg IBW for lung-protective. Avoid >8 in most neuro patients."],
          ["Respiratory Rate", "RR / f", "14–20 breaths/min", "Adjust to target PaCO₂ 35–40 mmHg. Do NOT drop RR without gas check."],
          ["FiO₂", "FiO₂", "Start 100%, wean to SpO₂ >94%", "Hyperoxia is not benign — wean FiO₂ as tolerated. Target SpO₂ 94–98%."],
          ["PEEP", "PEEP", "5 cmH₂O standard", "High PEEP can impair venous drainage → ↑ ICP. See PEEP section below."],
          ["Inspiratory Time / I:E Ratio", "Ti / I:E", "1:2 standard", "Inverse ratio ventilation rarely needed; PCCM-driven decision."],
          ["Plateau Pressure", "Pplat", "Target <30 cmH₂O", "Check with inspiratory hold. High Pplat = overdistension risk."]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Neuro-Specific Ventilator Targets" }
    },
    {
      type: "table",
      content: {
        headers: ["Parameter", "Target", "Rationale"],
        rows: [
          ["PaCO₂", "35–40 mmHg (normocarbia)", "Hypercapnia causes cerebral vasodilation → ↑ CBF → ↑ ICP. Keep in normal range."],
          ["SpO₂", ">94% (target 94–98%)", "Hypoxia is devastating in brain injury. Hyperoxia may worsen outcomes — don't over-oxygenate."],
          ["PaO₂", "80–100 mmHg (acceptable)", "Correlate with SpO₂ and clinical picture."],
          ["Head of Bed", "30° HOB elevation", "Improves venous drainage, reduces ICP. Do not lay flat unless procedure or hemodynamic reason."],
          ["ETT Tape/Holder", "Not too tight", "Tight ties/holders can impair jugular venous drainage → ↑ ICP. Check daily."]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "HYPERCAPNIA ALERT: PaCO₂ > 45 mmHg causes cerebral vasodilation and can significantly worsen intracranial hypertension. Check ABGs frequently in the first 24–48 hours and after any ventilator change. Do not allow the vent to 'drift' without gas confirmation."
      }
    },
    {
      type: "heading",
      content: { text: "Controlled Hyperventilation: A Bridge, Not a Treatment" }
    },
    {
      type: "paragraph",
      content: {
        text: "Deliberate hyperventilation (target PaCO₂ 30–35 mmHg) causes cerebral vasoconstriction and can rapidly lower ICP. This is a temporizing measure — used in acute herniation or ICP crisis while definitive treatment (CSF drainage, osmotherapy, OR) is arranged. Prolonged hyperventilation leads to rebound vasodilation and may worsen ischemia. Use only on explicit attending order and with a clear endpoint."
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Hyperventilation Is a Bridge",
        text: "Target PaCO₂ 30–35 mmHg only for acute herniation as a temporizing measure. Never use as a standing ICP management strategy. Document start time and stop criteria. Loop in neurosurgery and PCCM immediately."
      }
    },
    {
      type: "heading",
      content: { text: "PEEP and ICP: Know the Interaction" }
    },
    {
      type: "paragraph",
      content: {
        text: "Positive end-expiratory pressure (PEEP) increases intrathoracic pressure, which can impede cerebral venous outflow through the jugular veins — particularly in patients with impaired intracranial compliance. The clinical significance varies: well-compensated patients may tolerate moderate PEEP without ICP change; decompensated patients (high ICP, poor compliance) may see significant ICP increases with PEEP escalation. Always correlate PEEP changes with ICP monitor readings when one is in place."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "PEEP > 8–10 cmH₂O + Active ICP Monitoring",
        text: "If PEEP needs to exceed 8–10 cmH₂O AND the patient has an ICP monitor (e.g., EVD), coordinate the PEEP change with PCCM and neurosurgery. Observe ICP response for 15–30 minutes after each PEEP increment. Document ICP before and after change."
      }
    },
    {
      type: "heading",
      content: { text: "Ventilator Weaning in NCC" }
    },
    {
      type: "paragraph",
      content: {
        text: "Weaning requires both pulmonary readiness and neurologic readiness. Many NCC patients fail extubation not from lung mechanics but from airway protection failure — they can breathe but cannot manage secretions or protect the airway. Always assess both dimensions."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Spontaneous Awakening Trial (SAT) + Spontaneous Breathing Trial (SBT) Protocol",
        content: "SAT: Pause sedation. Assess for agitation, respiratory distress, SpO₂ < 88%, RR > 35, or HR > 140 — if any, resume sedation and document. If patient tolerates SAT, proceed to SBT.\n\nSBT: Place on PS 5 / PEEP 5 (or T-piece). Observe for 30–120 minutes. PASS criteria: RR < 35, SpO₂ > 90%, HR < 140 and stable, BP stable, no significant distress. FAIL criteria: any of the above thresholds breached — return to prior settings, allow rest > 24h before next attempt.\n\nNeuro addendum: Even a passed SBT does not mean safe extubation in NCC. Assess GCS, cough strength, and ability to follow commands separately."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Weaning Parameter", "Target for Extubation Readiness", "Notes"],
        rows: [
          ["NIF (Negative Inspiratory Force)", "< −20 to −25 cmH₂O (more negative = stronger)", "Critical for neuromuscular patients (MG, GBS, ALS exacerbation). Test at bedside with Wright spirometer or vent."],
          ["Vital Capacity (VC)", "> 10–15 mL/kg IBW", "Key in NMD patients. Below 10 mL/kg = high extubation failure risk."],
          ["RSBI (f/Vt)", "< 105 breaths/min/L", "Rapid shallow breathing index — low specificity in neuro patients."],
          ["Cough Strength", "Forceful visible cough on command", "Best predictor of extubation success in neuro patients — must be present."],
          ["GCS / Commands", "GCS ≥ 8, follows simple commands", "Minimum. Higher GCS better. Cannot protect airway if not responsive."],
          ["Secretion Burden", "Manageable frequency", "If suctioning needed every 15–30 min, likely to fail extubation."]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Extubation Checklist (Neuro + Pulmonary)" }
    },
    {
      type: "collapsible",
      content: {
        title: "Pre-Extubation Checklist",
        content: "PULMONARY:\n☐ Passed SAT and SBT\n☐ FiO₂ ≤ 0.4 and PEEP ≤ 5\n☐ Adequate oxygenation (SpO₂ > 94%)\n☐ Manageable secretion burden\n\nNEURO:\n☐ GCS ≥ 8 (or baseline for chronic disease)\n☐ Follows at least 1-step commands\n☐ Forceful purposeful cough\n☐ Swallow evaluation ordered if needed post-extubation\n☐ Airway edema concern addressed (cuff leak test if intubated > 48–72h)\n\nLOGISTICS:\n☐ Discuss with attending (PCCM and/or Neuro)\n☐ Airway equipment at bedside post-extubation\n☐ Plan for re-intubation if fails (discuss with team)\n☐ Orders: high-flow NC or face mask, post-extubation ABG plan"
      }
    },
    {
      type: "heading",
      content: { text: "Common Ventilator Alarms and Response" }
    },
    {
      type: "table",
      content: {
        headers: ["Alarm", "Common Causes", "Initial Response"],
        rows: [
          ["High Peak Pressure", "Coughing/biting tube, mucus plug, pneumothorax, bronchospasm, kink in circuit", "Suction patient, check circuit for kink, assess breath sounds, check plateau pressure. If sudden and severe → consider pneumothorax (CXR or bedside US)."],
          ["Low Tidal Volume / Low Minute Ventilation", "Cuff leak, circuit disconnect, patient-ventilator dyssynchrony, decreased respiratory drive", "Check circuit connections, assess cuff pressure, listen for air leak around ETT, observe patient effort."],
          ["Apnea Alarm", "Oversedation, patient apneic, disconnection", "Assess patient immediately — check responsiveness, check circuit. If patient apneic, bag-mask ventilate, call team."],
          ["High RR", "Pain, agitation, fever, metabolic acidosis, undersedation", "Assess patient, check ABG, treat underlying cause. Do not simply silence alarm."],
          ["Low SpO₂", "Mucus plug, tube malposition, patient deterioration", "Suction, manual ventilation assessment, chest X-ray if persistent."]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "When to Call PCCM vs. When to Act" }
    },
    {
      type: "table",
      content: {
        headers: ["Situation", "Action"],
        rows: [
          ["Acute respiratory failure, SpO₂ dropping rapidly", "Intervene immediately (increase FiO₂, suction, bag-mask if disconnected) AND notify PCCM simultaneously"],
          ["Need to increase PEEP above 8 in patient with ICP monitor", "Call PCCM before changing. Discuss ICP implications."],
          ["Routine FiO₂ wean per protocol", "Act, document, inform PCCM at rounds"],
          ["Considering extubation", "Discuss with PCCM AND neurology/neurosurgery attending before proceeding"],
          ["Vent alarm that self-resolves with suction", "Document, note in chart, mention to PCCM at rounds"],
          ["Pneumothorax suspected", "Activate team STAT — this is an emergency"]
        ]
      }
    },
    {
      type: "case-vignette",
      content: {
        stem: "You are caring for a 58-year-old with severe TBI (GCS 6T) on AC/VC with TV 500 mL, RR 18, FiO₂ 0.5, PEEP 5. The ICP has been running 18–22 mmHg. ABG returns: pH 7.30, PaCO₂ 52, PaO₂ 88. You notice the ventilator circuit was partially disconnected for the last hour during transport.",
        role: "NCC APP",
        correct_action: "This is hypercapnia (PaCO₂ 52) causing cerebral vasodilation — a direct ICP threat. Immediately recheck circuit connection and confirm it is secure. Increase RR to 20–22 to drive PaCO₂ toward 35–40. Notify PCCM and neurosurgery attending. Recheck ICP monitor — if actively climbing, consider 3% HTS bolus or EVD drainage per orders. Repeat ABG in 30–60 minutes to confirm correction. Document the circuit issue and notify the charge RN."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Intubation Watch Criteria in NCC",
        text: "Consider early intubation for: GCS ≤ 8 with loss of airway reflexes, rapidly declining GCS (≥2 point drop), inability to protect airway (aspiration risk), respiratory distress with SpO₂ < 90% not responding to supplemental O₂, status epilepticus requiring airway protection, or planned interventional procedure. Do not wait for respiratory arrest — anticipate and act early. Notify PCCM."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M04.L2 — Hemodynamic Monitoring and MAP Targets by Diagnosis
// ─────────────────────────────────────────────────────────────────────────────
const m04l2Content = {
  blocks: [
    {
      type: "heading",
      content: { text: "Overview" }
    },
    {
      type: "paragraph",
      content: {
        text: "Precise blood pressure management is one of the most critical and diagnosis-specific skills in neurocritical care. A blood pressure that is 'too high' for one patient may be essential for another. Every NCC admission should have a documented BP target based on their specific diagnosis. Mistakes in this area — over-treating hypertension in a vasospasm patient, or undertreating in ICH — can have catastrophic consequences."
      }
    },
    {
      type: "heading",
      content: { text: "Arterial Line: Interpretation and Troubleshooting" }
    },
    {
      type: "paragraph",
      content: {
        text: "All hemodynamically significant NCC patients — especially those on vasoactive drips or with targeted BP goals — should have an arterial line for continuous real-time monitoring. The radial artery is first choice; femoral is an alternative when radial is not feasible. The arterial waveform provides beat-to-beat BP, pulse pressure variation (PPV), and can be used to assess volume responsiveness."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Waveform Feature", "Normal", "Abnormal / What It Means"],
        rows: [
          ["Systolic upstroke", "Sharp, steep rise", "Slow upstroke → aortic stenosis or low contractility"],
          ["Dicrotic notch", "Visible mid-downstroke (aortic valve closure)", "Absent notch → low SVR, vasodilation, sepsis"],
          ["Waveform amplitude", "Consistent beat to beat", "Pulsus alternans → cardiac dysfunction; large breath-to-breath variation → volume depletion or tamponade"],
          ["Dampened waveform", "Round, blunted, low amplitude", "Clot at catheter tip, kink, loose connection, air bubble. Zero and flush first."],
          ["Over-damped (whip/ring)", "Spiked, exaggerated readings", "Air in system, excessively long tubing. Remove air and re-zero."]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Zeroing the Arterial Line: Step-by-Step",
        content: "1. Position the transducer at the level of the phlebostatic axis (4th ICS, mid-axillary line — approximates right atrium).\n2. Turn the stopcock so it is open to air and closed to the patient.\n3. Press 'Zero' on the bedside monitor — confirm the waveform flatlines at 0.\n4. Turn stopcock back to open-to-patient position.\n5. Confirm a normal arterial waveform appears on monitor.\n6. Document zero time.\n\nRe-zero: After any patient position change (sitting up, supine), after transport, after transducer relocation, or any time readings seem inconsistent with clinical picture."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Transducer Level = MAP Accuracy",
        text: "For neuro patients with ICP concerns, the transducer should be leveled at the tragus of the ear (approximates Circle of Willis / foramen of Monro) when calculating CPP. Standard cardiac phlebostatic axis leveling underestimates MAP at the brain level in upright patients. Know which reference point your attending prefers — document it."
      }
    },
    {
      type: "heading",
      content: { text: "MAP Targets by Diagnosis" }
    },
    {
      type: "warning",
      content: {
        text: "BP TARGETS ARE DIAGNOSIS-SPECIFIC. Never apply a generic 'normal' BP range to NCC patients. Confirm the target on admission, document it in the problem list or nursing communication, and re-confirm after any procedure or status change."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Diagnosis", "BP / MAP Target", "Key Rationale", "Notes"],
        rows: [
          ["Aneurysmal SAH — Pre-coiling/clipping (unsecured)", "SBP < 160 mmHg", "Prevent re-rupture of unsecured aneurysm", "Most dangerous window. Err on the side of strict control. Nicardipine or labetalol."],
          ["Aneurysmal SAH — Post-coiling/clipping (secured)", "SBP 140–200 (vasospasm protocol)", "Permissive/induced hypertension to maintain perfusion through vasospastic vessels", "Targets vary — confirm with neurosurgery/neurology. May include milrinone + volume."],
          ["ICH (Intracerebral Hemorrhage)", "SBP < 140 mmHg (ICH bundle)", "Reduce hematoma expansion risk. ATACH-2 / INTERACT2 data.", "Treat within 1 hour of presentation. Nicardipine preferred for smooth titration."],
          ["Acute Ischemic Stroke — tPA eligible", "SBP < 185/110 before tPA; < 180/105 during/after", "Required threshold for tPA administration per AHA guidelines.", "Strict — cannot give tPA if above threshold. After tPA: avoid hypotension too."],
          ["Acute Ischemic Stroke — no tPA", "Permissive hypertension: SBP < 220/120 (first 24–48h)", "Penumbra requires perfusion pressure. Treat only if very high or symptomatic.", "After 24h: gradual BP lowering acceptable per stroke protocol."],
          ["TBI — ICP Management", "MAP > 80; CPP 60–70 mmHg", "CPP = MAP − ICP. Must maintain perfusion pressure above ICP.", "If ICP = 20 and target CPP = 60, MAP must be > 80. Vasopressors to achieve if needed."],
          ["Spinal Cord Injury (SCI)", "MAP 85–90 mmHg (first 7 days)", "Spinal cord perfusion pressure — prevent secondary cord ischemia.", "Phenylephrine or norepinephrine. Volume first if hypotensive."],
          ["Sepsis / General ICU", "MAP ≥ 65 mmHg", "Organ perfusion floor — standard critical care target.", "Higher may be needed in chronic hypertension or vasopressor-dependent states."]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Cerebral Perfusion Pressure (CPP)" }
    },
    {
      type: "paragraph",
      content: {
        text: "CPP = MAP − ICP. In patients with an ICP monitor (EVD or Camino bolt), CPP can be calculated continuously. The target CPP in most TBI and elevated ICP patients is 60–70 mmHg. CPP < 50 mmHg is associated with cerebral ischemia. If ICP is elevated, maintain MAP to ensure adequate CPP — do not treat hypertension reflexively in ICP patients without first checking ICP and calculated CPP."
      }
    },
    {
      type: "heading",
      content: { text: "Vasopressors in NCC" }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Mechanism", "Dose Range", "Neuro Use Case", "Key Considerations"],
        rows: [
          ["Norepinephrine (Levophed)", "α1 + β1 agonist", "0.01–0.5 mcg/kg/min", "First-line vasopressor for hypotension/sepsis, CPP augmentation in TBI", "Increases MAP and SVR. Can cause reflex bradycardia. First-line in most shock states."],
          ["Phenylephrine (Neo-Synephrine)", "Pure α1 agonist", "0.5–5 mcg/kg/min", "Preferred for induced hypertension in aSAH vasospasm (pure alpha, no HR effects)", "Does not increase HR — useful when tachycardia is a concern. May cause reflex bradycardia."],
          ["Vasopressin", "V1 receptor agonist", "0.03–0.04 units/min (fixed)", "Adjunct in vasodilatory shock; catecholamine-sparing", "Not titrated for BP in NCC. Supplement to norepi. Watch for hyponatremia."],
          ["Dopamine", "Dose-dependent DA/β/α", "2–20 mcg/kg/min", "Rarely used in NCC", "Higher arrhythmia risk vs. norepi. Avoid as first-line. Occasionally used in bradycardia."],
          ["Milrinone", "PDE-3 inhibitor (inotrope/vasodilator)", "0.125–0.75 mcg/kg/min", "aSAH vasospasm — improves cardiac output + pulmonary vasodilation", "NCC pharmacist-managed. Can cause hypotension — concurrent phenylephrine often needed. Renally cleared."]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Induced Hypertension in aSAH Vasospasm",
        text: "After aneurysm is secured, vasospasm (days 4–14) may require induced hypertension to maintain cerebral perfusion through narrowed vessels. This is managed with volume expansion + phenylephrine ± milrinone. Targets are individualized — confirm daily with neurosurgery and the NCC pharmacist. This is one of the few situations in medicine where you are intentionally driving BP high."
      }
    },
    {
      type: "heading",
      content: { text: "Antihypertensives for Acute BP Control in NCC" }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Route", "Onset", "Duration", "Best Use in NCC", "Caution"],
        rows: [
          ["Nicardipine", "IV infusion", "1–5 min", "Infusion-dependent", "ICH bundle BP control, aSAH pre-securing. Smooth, titratable.", "Reflex tachycardia possible. Adjust every 5 min to target."],
          ["Labetalol", "IV bolus or infusion", "2–5 min", "2–6 hours", "Acute HTN spikes, tPA threshold control", "Avoid in asthma, heart block, decompensated HF. Bradycardia."],
          ["Clevidipine", "IV infusion", "2–4 min", "5–15 min off drip", "Precise rapid titration, short half-life", "Lipid formulation — factor into total lipid load (propofol also lipid)."],
          ["Hydralazine", "IV bolus", "10–20 min", "4–8 hours", "Less preferred — unpredictable duration and magnitude", "Avoid when precise control is needed. Reflex tachycardia. Unpredictable."]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Fluid Management in Neuro Patients" }
    },
    {
      type: "paragraph",
      content: {
        text: "Fluid choice matters in neurocritical care. Free water lowers serum osmolality and worsens cerebral edema. Hypotonic fluids (D5W, 0.45% NaCl) are generally avoided in patients with elevated ICP or cerebral edema risk. Isotonic crystalloids (normal saline, plasmalyte) are the default. In aSAH vasospasm management, volume expansion with isotonic fluid is part of induced hypertension protocol."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Fluid", "Tonicity", "Neuro Use", "Avoid When"],
        rows: [
          ["Normal Saline (0.9% NaCl)", "Isotonic", "Standard maintenance and resuscitation", "Hyperchloremic acidosis with large volumes"],
          ["PlasmaLyte / Normosol", "Isotonic (balanced)", "Preferred for large volume resuscitation", "Rare contraindications"],
          ["Lactated Ringer's (LR)", "Near-isotonic (slightly hypotonic)", "Use cautiously in severe ICP — slightly hypotonic", "Active elevated ICP, severe cerebral edema"],
          ["D5W", "Hypotonic (free water)", "AVOID in most NCC patients", "Any ICP elevation, cerebral edema, SAH"],
          ["0.45% NaCl ('half-normal')", "Hypotonic", "AVOID in NCC", "Never in elevated ICP patients"],
          ["3% NaCl (HTS)", "Hypertonic", "ICP management, sodium maintenance", "Requires central line for continuous; see L3"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "When to Involve PCCM for Hemodynamic Instability" }
    },
    {
      type: "table",
      content: {
        headers: ["Clinical Situation", "Action"],
        rows: [
          ["MAP < 65 not responding to 1–2L fluid bolus", "Call PCCM immediately. Start vasopressors per NCC order set."],
          ["New vasopressor requirement or increasing dose", "Notify PCCM — reassess cause (sepsis, cardiogenic, neurogenic)"],
          ["Suspected neurogenic pulmonary edema (aSAH)", "PCCM + Cardiology involvement, echo ordered"],
          ["Troponin elevation in aSAH (Takotsubo/neurogenic stunning)", "Notify PCCM + Cardiology. Echo. May limit induced hypertension."],
          ["BP persistently above goal despite max dose nicardipine", "Call PCCM. Consider adding second agent. Look for secondary cause."],
          ["Pressor requirement > 0.25 mcg/kg/min norepi", "Loop PCCM — consider early vasopressin, assess etiology"]
        ]
      }
    },
    {
      type: "case-vignette",
      content: {
        stem: "A 47-year-old presents with Hunt-Hess grade III aSAH. CTA confirms a right MCA aneurysm. She was coiled 2 days ago. Now on post-bleed day 6, her neuro exam worsens — new left arm drift. Her BP is currently 130/80 (MAP ~97). Transcranial Doppler shows MCA velocities of 180 cm/s bilaterally.",
        role: "NCC APP",
        correct_action: "This is symptomatic vasospasm. The aneurysm is secured (coiled) — induced hypertension is now appropriate. Notify neurosurgery and PCCM. Initiate or increase phenylephrine to target SBP 160–200 per post-securing vasospasm protocol. Consider milrinone per NCC pharmacist. Ensure adequate volume status. Obtain stat CTA perfusion or DSA per neurosurgery order. Document neurologic exam serially. Do NOT withhold BP augmentation out of reflex concern — this is a protocol-driven therapeutic intervention."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M04.L3 — Common NCC Drips: Sedation, HTS, AEDs, and Vasoactives
// ─────────────────────────────────────────────────────────────────────────────
const m04l3Content = {
  blocks: [
    {
      type: "heading",
      content: { text: "Overview" }
    },
    {
      type: "paragraph",
      content: {
        text: "The NCC pharmacist is an integral part of the team and co-owns several drug classes: HTS protocols, sedation titration, AED levels, and pentobarbital coma protocol. As the APP, you write and adjust orders — but collaborate closely. Know the drugs cold: their indications, doses, monitoring requirements, and the pitfalls that get patients hurt. This lesson is your drug reference for the unit."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "NCC Pharmacist Owns These Protocols",
        text: "HTS sodium targets and frequency of checks, AED therapeutic levels and dose adjustments, sedation protocol titration guidance, and pentobarbital coma dosing/monitoring are all pharmacist-owned protocols at SJHMC/BNI. Always loop in the NCC pharmacist for these drug classes. They round daily and are available for consult."
      }
    },
    {
      type: "heading",
      content: { text: "Sedation Agents" }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Dose Range", "Mechanism", "Onset/Duration", "Neuro Pros", "Neuro Cons / Pitfalls"],
        rows: [
          ["Propofol", "5–80 mcg/kg/min (0.3–4.8 mg/kg/hr)", "GABA-A agonist", "Seconds / minutes after stopping", "Fast on/off — allows neuro exams. Anticonvulsant properties. Reduces ICP/CMR.", "PRIS (Propofol Infusion Syndrome): metabolic acidosis, rhabdomyolysis, cardiac failure at high doses/prolonged use. Check triglycerides q72h. Max ~4 mg/kg/hr for extended use. Lipid load — calculate with TPN/feeds."],
          ["Midazolam", "0.02–0.1 mg/kg/hr", "Benzodiazepine (GABA-A)", "Minutes / hours (active metabolites)", "Anticonvulsant, anxiolytic, familiar drug.", "Accumulates in renal/hepatic failure — unpredictable wake-up time. Respiratory depression. Not reversible easily if oversedated. Poor choice for daily neuro exams."],
          ["Dexmedetomidine (Precedex)", "0.2–1.5 mcg/kg/hr", "Central α-2 agonist", "Minutes / 2–3h", "Cooperative sedation — patient arousable for neuro exam. Reduces opioid/benzo requirement.", "Does NOT suppress seizures — do not use as sole sedation in status epilepticus. Bradycardia and hypotension common. Do not load rapidly in hemodynamically unstable patients."],
          ["Ketamine", "0.1–2 mg/kg/hr (infusion)", "NMDA antagonist", "Rapid / minutes", "Analgo-sedation. Minimal respiratory depression. Emerging evidence it does NOT raise ICP at sedating doses.", "Previously avoided in ICP — current evidence is reassuring when used with other agents (propofol/benzo). Still controversial; discuss with attending. Increases secretions (pair with glycopyrrolate if needed). Emergence reactions at high doses."]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "PROPOFOL INFUSION SYNDROME (PRIS): Rare but life-threatening. Risk factors: dose > 4 mg/kg/hr, infusion > 48 hours, concurrent steroids or catecholamines, low carbohydrate intake. Signs: new metabolic acidosis, elevated lactate, elevated CK, dysrhythmia, hepatomegaly. If suspected: STOP propofol immediately, notify team, switch sedation, check ECG and metabolic panel."
      }
    },
    {
      type: "heading",
      content: { text: "Analgesia" }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Dose", "Neuro Use Case", "Pitfall"],
        rows: [
          ["Fentanyl (infusion)", "25–200 mcg/hr (infusion); 25–100 mcg IV PRN", "First-line opioid in NCC. Short-acting, no histamine release, titratable.", "Accumulates with prolonged infusion (lipophilic). Chest wall rigidity at high bolus doses."],
          ["Hydromorphone", "0.2–0.6 mg IV q3-4h PRN or infusion", "Potent — use when fentanyl inadequate or tolerance develops.", "Longer duration than fentanyl. Neuroexcitatory metabolite (hydromorphone-3-glucuronide) accumulates in renal failure."],
          ["Morphine", "2–4 mg IV PRN", "Avoid in NCC if possible.", "Histamine release → cerebral vasodilation → ↑ ICP. Active metabolite (M6G) accumulates in renal failure. Not preferred in ICP patients."],
          ["Acetaminophen IV (Ofirmev)", "1000 mg q6h IV", "Adjunct analgesia, antipyretic — important for fever management in neuro patients.", "Dose reduce in hepatic disease. Do not duplicate with oral/NG acetaminophen — check total dose."]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Pain-First (Analgosedation) Approach",
        text: "Start with analgesia before adding sedation. Uncontrolled pain drives agitation, tachycardia, and ICP spikes. Assess pain regularly using CPOT (Critical Care Pain Observation Tool) in non-verbal patients. Target CPOT < 2. Add sedation for agitation after pain is addressed."
      }
    },
    {
      type: "heading",
      content: { text: "Neuromuscular Blockade (NMB / Paralysis)" }
    },
    {
      type: "paragraph",
      content: {
        text: "NMB in NCC is reserved for specific indications. It eliminates exam findings and requires continuous deep sedation. Use only when the indication is clear and the plan is time-limited."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Dose", "Metabolism", "Why Preferred in NCC", "Monitoring"],
        rows: [
          ["Cisatracurium (Nimbex)", "0.03–0.6 mg/kg/hr infusion", "Hofmann elimination (temperature + pH dependent) — no renal/hepatic requirement", "No histamine release. Renal/hepatic independent. Preferred for prolonged NMB in NCC.", "Train-of-Four (TOF) q4–6h. Target 1–2/4 twitches for ICP indications."],
          ["Vecuronium", "0.05–0.15 mg/kg/hr infusion or bolus", "Hepatic/biliary; some renal", "Acceptable alternative. Less expensive.", "TOF monitoring required. Accumulates in hepatic/renal failure."]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "NMB Indications and Protocol in NCC",
        content: "INDICATIONS:\n• Refractory ICP crisis unresponsive to sedation/analgesia — eliminates posturing and Valsalva\n• Ventilator dyssynchrony causing ICP spikes\n• Refractory shivering (targeted temperature management)\n• Selected surgical or transport scenarios\n\nPROTOCOL:\n1. Ensure adequate sedation FIRST (propofol + opioid or midazolam + opioid). Never paralyze without sedation.\n2. Obtain attending order specifying indication and duration.\n3. Initiate cisatracurium infusion per order — start 0.03 mg/kg/hr and titrate to TOF 1–2/4.\n4. Monitor TOF every 4–6 hours. Document response.\n5. Reassess NMB need every 12–24 hours. Goal is shortest effective duration.\n6. When stopping: taper infusion, verify TOF recovery to 4/4, assess diaphragmatic movement before weaning ventilator."
      }
    },
    {
      type: "warning",
      content: {
        text: "NEVER paralyze a patient who is not adequately sedated. Paralysis without sedation = pharmacologic torture — the patient is awake and unable to move or communicate. Confirm adequate sedation (RASS -3 to -5 where appropriate) before initiating NMB."
      }
    },
    {
      type: "heading",
      content: { text: "Hypertonic Saline (HTS) for ICP Management" }
    },
    {
      type: "paragraph",
      content: {
        text: "HTS is a cornerstone of osmotherapy in NCC. It works by creating an osmotic gradient that draws free water from brain parenchyma across an intact blood-brain barrier, reducing cerebral edema and ICP. Sodium targets, frequency of monitoring, and concentration selection are pharmacist-driven protocols at BNI/SJHMC."
      }
    },
    {
      type: "table",
      content: {
        headers: ["HTS Formulation", "Concentration", "Route", "Indication", "Key Points"],
        rows: [
          ["2% NaCl", "2%", "Central line preferred; peripheral acceptable per policy", "Continuous ICP prophylaxis / maintenance of sodium targets (145–155 mEq/L)", "Most common continuous infusion. Rate adjusted to sodium goal. NCC pharmacist adjusts rate."],
          ["3% NaCl", "3%", "Peripheral IV acceptable", "Bolus for acute ICP spike or sodium augmentation", "100–250 mL bolus over 20–30 min. Repeat dosing requires sodium check. Can be given peripherally."],
          ["23.4% NaCl", "23.4%", "CENTRAL LINE ONLY — no exceptions", "Herniation / acute ICP crisis", "30 mL rapid infusion (over 10–20 min). Immediate osmotic effect. Reserved for emergencies. Can cause severe vein sclerosis/necrosis if peripheral."]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "23.4% HTS REQUIRES A CENTRAL LINE. NEVER administer 23.4% HTS through a peripheral IV. Extravasation causes severe tissue necrosis. Confirm central line placement before administration. If no central access and patient is herniating: 3% NaCl peripherally is an alternative while central access is being obtained."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "HTS Monitoring Protocol",
        content: "SODIUM TARGETS:\n• ICP management: Serum sodium 145–155 mEq/L (hypernatremia is intentional)\n• Avoid sodium > 160 except in extreme refractory cases with attending guidance\n• Avoid rapid sodium correction (should not rise > 10–12 mEq/L per 24h)\n\nLAB MONITORING (per NCC pharmacist protocol):\n• Serum sodium: q4–6h during active titration; q8h when stable\n• Serum osmolality: check with sodium. Osmol gap > 20 mOsm/kg = concern for accumulation\n• BMP including renal function: daily minimum\n\nHTS AND RENAL CONSIDERATIONS:\n• Monitor UOP — HTS causes osmotic diuresis\n• Hypernatremia is intentional for ICP control but monitor renal function closely\n• If discontinuing HTS: taper gradually to avoid rebound cerebral edema"
      }
    },
    {
      type: "heading",
      content: { text: "Antiepileptic Drugs (AEDs)" }
    },
    {
      type: "table",
      content: {
        headers: ["AED", "IV Dose Range", "Mechanism", "Monitoring", "Key NCC Considerations"],
        rows: [
          ["Levetiracetam (Keppra)", "1000–3000 mg/day IV divided q12h (or q8h)", "Binds SV2A", "Clinical (no serum level needed routinely)", "Most common AED in NCC. Renal clearance — dose reduce in AKI/CKD. Well-tolerated, minimal drug interactions. Watch for agitation/behavioral changes (keppra rage)."],
          ["Lacosamide (Vimpat)", "100–300 mg BID IV", "Slow inactivation Na+ channel", "PR interval on ECG (mild prolongation)", "Good IV bioavailability, minimal hepatic metabolism. Second-line or adjunct. Use with caution in cardiac conduction disease."],
          ["Fosphenytoin / Phenytoin", "Fosphenytoin: 15–20 mg PE/kg IV load; maintenance 4–6 mg PE/kg/day", "Fast Na+ channel blockade", "Free phenytoin levels (target 1–2 mcg/mL free, or 10–20 total in normal albumin)", "Older agent. Many drug interactions (CYP2C9/2C19 inducer). Avoid in liver disease. Fosphenytoin safer IV than phenytoin. Check levels — narrow therapeutic index."],
          ["Valproate (Depakote)", "10–15 mg/kg/day IV divided q6–8h; status epilepticus: 20–40 mg/kg load", "Multiple (Na+ channel, GABA)", "Valproate level (target 50–100 mcg/mL), LFTs, CBC, ammonia if encephalopathy", "Avoid in liver disease, mitochondrial disorders, pregnancy. Hyperammonemia even with normal LFTs. Drug interactions (CYP inhibitor — increases phenobarbital, lamotrigine levels)."],
          ["Phenobarbital", "10–20 mg/kg IV load; 1–3 mg/kg/day maintenance", "GABA-A agonist", "Phenobarbital level (target 20–40 mcg/mL)", "Long half-life (5–7 days). Sedating. Used in refractory seizures or pentobarbital coma step-down."]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "AED Levels: Pharmacist Protocol",
        text: "Routine AED level monitoring (when applicable — phenytoin, valproate, phenobarbital) is managed by the NCC pharmacist. Free phenytoin levels are preferred over total in hypoalbuminemia (common in ICU). Flag the pharmacist for any dose changes, new drug interactions (e.g., adding valproate in a patient on lamotrigine), or breakthrough seizures."
      }
    },
    {
      type: "heading",
      content: { text: "Vasoactive Agents for BP Control (NCC Context)" }
    },
    {
      type: "table",
      content: {
        headers: ["Agent", "Class", "Route/Dose", "NCC Primary Use", "Titration / Notes"],
        rows: [
          ["Nicardipine", "CCB (dihydropyridine)", "IV infusion: 5–15 mg/hr", "ICH bundle SBP < 140; aSAH pre-securing SBP < 160", "Titrate by 2.5 mg/hr q5–15 min to goal. Smooth and predictable. Reflex tachycardia possible."],
          ["Labetalol", "α + β blocker", "IV bolus: 10–80 mg; infusion: 0.5–2 mg/min", "Acute HTN spikes, tPA threshold control", "Bolus onset 5 min. Duration 2–6 hours. Hold for HR < 60 or bronchospasm."],
          ["Clevidipine", "CCB (ultra-short acting)", "IV infusion: 1–32 mg/hr", "Precise rapid titration, post-op BP control", "Half-life 1 min — very fast off. Lipid formulation. Excellent for tight real-time control."],
          ["Hydralazine", "Direct vasodilator", "IV bolus: 10–20 mg", "Avoid when precision needed", "Unpredictable onset (5–20 min) and duration (2–8h). Reserve for settings without infusion access."]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Pentobarbital Coma Protocol (Overview)" }
    },
    {
      type: "paragraph",
      content: {
        text: "Pentobarbital coma is a last-resort treatment for refractory status epilepticus or refractory intracranial hypertension not responsive to all other measures. It induces burst suppression on EEG, reducing cerebral metabolic demand. This is an intensive, pharmacist-managed protocol requiring continuous EEG monitoring, arterial line, and central access. As the APP, you will participate in this protocol under close attending and pharmacist oversight."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Pentobarbital Coma: What the APP Needs to Know",
        content: "INDICATION: Refractory status epilepticus (failed 2–3 AEDs) OR refractory ICP crisis (failed conventional measures).\n\nPRE-REQUISITES:\n• Intubated and mechanically ventilated\n• Arterial line and central venous access\n• Continuous EEG monitoring in place\n• NCC pharmacist actively managing\n• ICU attending at bedside or immediately available\n\nDOSING: Loading dose 5–15 mg/kg IV (administered by attending or PCCM), followed by maintenance infusion 1–5 mg/kg/hr — pharmacist titrates to burst suppression pattern on EEG.\n\nMONITORING:\n• EEG: titrate to burst suppression ratio 50–80%\n• BP: aggressive vasopressor support commonly needed (norepi ± vasopressin)\n• Temperature: hypothermia risk — warming blanket\n• Pentobarbital levels: pharmacist-monitored\n• Weaning: gradual taper over 12–24h after 24–48h of seizure control or ICP control\n\nAPP ROLE: Monitor vitals, vasopressor titration, daily labs, document EEG response, notify pharmacist of any clinical changes."
      }
    },
    {
      type: "case-vignette",
      content: {
        stem: "An intubated 65-year-old with large right MCA hemorrhagic stroke has ICP 28 mmHg despite EVD draining at 10 cmH₂O, HOB 30°, adequate sedation with propofol 40 mcg/kg/min, and 3% HTS 100 mL bolus given 2 hours ago. Sodium is now 148. The nurse asks if another HTS bolus should be given. Your assessment: ICP is refractory, sodium is at the upper limit of the standard target.",
        role: "NCC APP",
        correct_action: "Do not reflexively re-dose 3% HTS without attending guidance at a sodium of 148 — further increases risk toxicity without clear benefit at this sodium level. Notify the neurosurgery/neurology attending and NCC pharmacist immediately. Discuss next steps: options include 23.4% HTS push (if sodium allows and central line in place), increasing EVD drainage threshold, osmolality-guided decision, or escalating to mannitol if not contraindicated. Ensure you are maximizing all ICP bundle elements (HOB 30°, sedation adequate, temperature control, avoid hypercapnia). Document ICP trend, interventions, and attending communication."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M04.L4 — Procedures: EVD, LP, Central Line, Arterial Line
// ─────────────────────────────────────────────────────────────────────────────
const m04l4Content = {
  blocks: [
    {
      type: "heading",
      content: { text: "Overview" }
    },
    {
      type: "paragraph",
      content: {
        text: "As an NCC APP at BNI/SJHMC, you will assist with, monitor, and document procedures at the bedside. You may perform some procedures independently depending on your scope and competency validation. For each procedure, know: why we do it (indication), when not to do it (contraindications), what consent is needed, how to set up, what to watch afterward, and what can go wrong. This is your procedural reference — not a step-by-step surgical guide."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Scope and Credentialing Note",
        text: "Independently performing bedside procedures (LP, central line placement, arterial line) requires institutional credentialing. Know your scope. If you are assisting or monitoring rather than performing, your role is still critical: setup, consent verification, timeout participation, post-procedure monitoring, and documentation."
      }
    },

    // ── EVD ──
    {
      type: "heading",
      content: { text: "External Ventricular Drain (EVD)" }
    },
    {
      type: "table",
      content: {
        headers: ["EVD Element", "Details"],
        rows: [
          ["Indications", "Acute hydrocephalus (obstructive or communicating), ICP monitoring and control, therapeutic CSF drainage (SAH, IVH), CSF sampling for culture/cytology"],
          ["Contraindications", "Coagulopathy (INR > 1.4–1.5, platelets < 50–75K — correct first), skin infection at insertion site, anatomic abnormality. All relative — weigh urgency."],
          ["Consent", "Neurosurgery attending obtains consent (emergent: document exception). APP role: verify consent in chart before procedure."],
          ["Insertion Site", "Kocher's point (right frontal, 11 cm from nasion, 3 cm from midline). Placed by neurosurgery to target right frontal horn."],
          ["Pre-Procedure Checklist", "CT head reviewed, INR/platelet levels reviewed and acceptable, consent documented, antibiotics per protocol (usually cefazolin single dose), sterile kit at bedside, transducer setup confirmed"]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "EVD Management: Leveling, Zeroing, and Drainage Parameters",
        content: "LEVELING:\n• The transducer must be zeroed and leveled at the foramen of Monro — external landmark: tragus of the ear.\n• The drainage chamber is set at a prescribed height ABOVE the foramen of Monro (e.g., 'drain at 10 cmH₂O' = drainage chamber 10 cm above tragus).\n• When the patient's head position changes, the transducer level MUST be re-verified and adjusted.\n• Repositioning without re-leveling = inaccurate ICP readings and inappropriate drainage.\n\nZEROING:\n• Close EVD to patient, open to air at the zero level, zero monitor, reopen to patient.\n• Re-zero after repositioning, transport, or suspected drift.\n\nDRAINAGE PARAMETERS:\n• Drainage threshold ordered by neurosurgery (e.g., 'drain when ICP > 20' or 'continuous drainage at 10 cmH₂O')\n• Continuous drainage: clamp is open; CSF drains freely above set level. Monitor output hourly.\n• Intermittent drainage: clamp closed; nurse opens when ICP exceeds threshold, drains until ICP falls, re-clamps.\n• Document: hourly output (mL), CSF appearance (clear/bloody/xanthochromic), ICP values, drainage events."
      }
    },
    {
      type: "collapsible",
      content: {
        title: "EVD Troubleshooting",
        content: "NO CSF DRAINAGE despite ICP elevation:\n• Check all clamps (should be open)\n• Verify transducer level — may be set too high\n• Check for kink in tubing\n• Attempt gentle flush per neurosurgery order (flush only with MD order — not routinely)\n• If drain was placed for IVH: may be clotted — notify neurosurgery\n\nBLOODY CSF (new or worsening):\n• Expected in initial days post-placement or after SAH/IVH\n• New bright red blood in previously clearing CSF → notify neurosurgery immediately (possible hemorrhage)\n• Consistently bloody: send stat cell count and culture\n\nELEVATED ICP NOT RESPONDING TO DRAINAGE:\n• Confirm drain is open and correctly leveled\n• Escalate ICP bundle: sedation, HTS, HOB 30°, PCCM for ventilator (PaCO₂)\n• Notify neurosurgery — may need CT, OR, or additional intervention\n\nINFECTION SURVEILLANCE:\n• Ventriculostomy-associated infection (VAI) risk increases after day 5–7\n• Send CSF culture if: fever, new meningismus, CSF cloudiness, unexplained neurologic worsening\n• Do NOT routinely sample CSF without indication — each access = infection risk\n• EVD care bundle: sterile dressing changes, minimize accesses, daily assessment of continued need"
      }
    },
    {
      type: "warning",
      content: {
        text: "EVD LEVELING IS A PATIENT SAFETY ISSUE. An EVD set too low will over-drain CSF → collapsed ventricles → subdural hemorrhage. An EVD set too high will under-drain → ICP crisis. After ANY patient repositioning (HOB change, turning, transport), immediately verify the transducer level relative to the tragus and re-zero if the system was moved."
      }
    },

    // ── LP ──
    {
      type: "heading",
      content: { text: "Lumbar Puncture (LP)" }
    },
    {
      type: "table",
      content: {
        headers: ["LP Element", "Details"],
        rows: [
          ["Indications", "Suspected meningitis/encephalitis (CSF culture, cell count, protein/glucose), suspected SAH with negative CT (xanthochromia), ICP measurement (idiopathic intracranial hypertension), therapeutic drainage (IIH, NPH diagnosis), CNS lymphoma workup, Guillain-Barré (cytoalbuminous dissociation)"],
          ["Contraindications (Absolute)", "Evidence of elevated ICP with mass effect or midline shift on CT — risk of transtentorial herniation post-LP. Papilledema (suggest ↑ ICP — CT first, then discuss with neurology). Skin infection at insertion site."],
          ["Contraindications (Relative)", "Coagulopathy (INR > 1.4, platelets < 50K), anticoagulation (hold and discuss), spinal stenosis at level of interest, patient unable to cooperate"],
          ["Pre-Procedure", "CT head to rule out mass lesion/shift/obstructive hydrocephalus. Check coags. Consent. Positioning is critical."],
          ["Consent", "Obtain and document. Explain: headache risk (post-dural puncture headache ~10–30%), bleeding, infection, transient pain, rare neurologic complication."]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "LP Technique: Positioning and Landmark Keys",
        content: "POSITIONING OPTIONS:\n1. Lateral decubitus (fetal position): Patient on their side, knees to chest, chin to chest. This is the standard position and allows accurate opening pressure measurement.\n2. Seated (leaning forward over pillow): Easier landmarks, but CANNOT accurately measure opening pressure in this position.\n\nLANDMARKS:\n• L3-L4 or L4-L5 interspace is the target — below the conus medullaris (which ends at L1-L2).\n• Iliac crest line = L4 landmark. Find the space just above or below.\n\nOPENING PRESSURE:\n• Measured with manometer in lateral decubitus position, patient relaxed (Valsalva elevates pressure).\n• Normal: 6–25 cmH₂O.\n• Elevated (> 25 cmH₂O): IIH, meningitis, SAH, venous sinus thrombosis.\n• Document: pressure in cmH₂O, not mmHg."
      }
    },
    {
      type: "table",
      content: {
        headers: ["CSF Tube", "Volume", "Send For", "Notes"],
        rows: [
          ["Tube 1", "1–2 mL", "Cell count and differential", "Traumatic tap: RBCs highest in tube 1, should fall by tube 4"],
          ["Tube 2", "1–2 mL", "Glucose and protein", "Compare glucose to serum glucose (normal CSF glucose ~2/3 serum)"],
          ["Tube 3", "1–2 mL", "Culture and sensitivity (bacterial, fungal, AFB)", "Sterile handling — send promptly to lab"],
          ["Tube 4", "1–2 mL", "Cell count (repeat — to compare with tube 1 for traumatic tap); xanthochromia; special studies (cytology, viral PCR, etc.)", "If tube 4 RBCs = tube 1 RBCs → true SAH. If tube 4 much lower → traumatic tap."]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Traumatic Tap vs. True SAH",
        text: "A traumatic tap (needle nicks a vessel) can simulate SAH. Differentiate: (1) Xanthochromia (yellow-tinged CSF) requires time — present in true SAH after 2–4 hours, absent in traumatic tap. (2) Tube 4 RBC count: markedly lower than tube 1 suggests traumatic; equal counts suggest true SAH. (3) Spectrophotometry of CSF is more sensitive than visual xanthochromia. When in doubt, discuss with neurology."
      }
    },

    // ── Central Line ──
    {
      type: "heading",
      content: { text: "Central Venous Line (CVC)" }
    },
    {
      type: "table",
      content: {
        headers: ["CVC Element", "Details"],
        rows: [
          ["Indications", "Vasopressor administration, HTS (23.4%), CVP monitoring, large-bore access for rapid resuscitation, parenteral nutrition, monitoring (PA catheter), poor peripheral access"],
          ["Site Selection in NCC Patients", "Subclavian or femoral preferred over IJ in patients with elevated ICP — IJ access/compression can impair jugular venous drainage. If IJ required: use left IJ when possible (right-sided preferential venous drainage of the brain). Discuss with attending."],
          ["Contraindications (Relative)", "Coagulopathy, local infection, prior instrumentation at site, contralateral pneumothorax (subclavian), uncooperative patient"],
          ["Consent", "Obtain written consent when possible. Emergency exception documented. Confirm with patient/family."],
          ["Equipment", "CVC kit (triple lumen standard), ultrasound machine (mandatory for IJ, strongly preferred for subclavian), sterile drape, CHG prep, sterile gloves/gown/mask/cap"]
        ]
      }
    },
    {
      type: "collapsible",
        content: {
        title: "CVC Insertion: Pre-Procedure Checklist and Sterile Technique",
        content: "PRE-PROCEDURE:\n☐ Consent documented\n☐ Site selected and discussed with attending if ICP concern\n☐ INR/platelets reviewed\n☐ Ultrasound machine at bedside and probe cover available\n☐ Timeout performed (patient ID, site, procedure, allergies, antibiotics if needed)\n\nSTERILE TECHNIQUE (Line Care Bundle):\n• Full barrier precautions: sterile gown, gloves, mask, cap, large drape\n• CHG skin prep: 30-second scrub, allow to dry completely (> 30 seconds)\n• US-guided venipuncture — confirm vein (compressible, round, no pulsation) vs. artery (pulsatile, not compressible)\n• Seldinger technique: needle → wire → dilator → catheter\n• Confirm blood return from all ports before securing\n• Secure with suture or StatLock, sterile dressing\n\nPOST-PROCEDURE:\n• Chest X-ray (CXR): mandatory for IJ and subclavian — confirm tip position (cavoatrial junction), rule out pneumothorax\n• Femoral lines: no CXR needed but check femoral placement\n• Document line type, site, lumen count, tip position on CXR, date of insertion\n• Assess daily for continued need — remove when no longer required"
      }
    },
    {
      type: "table",
      content: {
        headers: ["Complication", "Presentation", "Response"],
        rows: [
          ["Pneumothorax", "Decreased breath sounds, hypoxia, tracheal deviation (tension), new air on CXR", "Stop procedure. CXR. If tension: needle decompression immediately. Otherwise PCCM/thoracic for chest tube."],
          ["Arterial Puncture", "Bright red pulsatile blood, inability to pass wire smoothly, pressure on waveform", "Remove needle immediately, hold firm pressure 10 min minimum. If catheter in artery: do NOT pull — call vascular surgery."],
          ["Air Embolism", "Sudden hypoxia, hypotension, 'mill wheel' murmur, during access", "Place patient in left lateral decubitus Trendelenburg. 100% O₂. Aspirate air if catheter in place. Call team."],
          ["Infection / CLABSI", "Fever, site erythema, bacteremia", "Blood cultures (peripheral + through line), consider line removal, antibiotics per ID"]
        ]
      }
    },

    // ── Arterial Line ──
    {
      type: "heading",
      content: { text: "Arterial Line" }
    },
    {
      type: "table",
      content: {
        headers: ["Arterial Line Element", "Details"],
        rows: [
          ["Indications", "Continuous beat-to-beat BP monitoring (vasoactive drips, targeted BP protocols, hemodynamic instability), frequent ABG sampling, arterial waveform analysis"],
          ["Site Selection", "Radial artery (right preferred — right radial for SBP/MAP monitoring; left radial if right unavailable). Femoral artery if radial fails (larger vessel, easier in shock). Brachial and axillary are alternatives."],
          ["Pre-Procedure Assessment", "Allen's test (radial): Compress both radial and ulnar arteries, patient makes fist until palm blanches, release ulnar — hand should flush pink within 5–7 seconds. Positive Allen's test = adequate ulnar collateral flow. Negative Allen's test = consider contralateral radial or femoral."],
          ["Contraindications", "Absent ulnar collateral flow (negative Allen's), local infection, Raynaud's phenomenon (relative), ipsilateral AV fistula for dialysis"]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Arterial Line Insertion and Setup",
        content: "EQUIPMENT: 20G catheter-over-needle (radial), arterial line transducer kit, pressurized NS bag (300 mmHg), monitor cable.\n\nINSERTION (Radial):\n1. Position wrist in dorsiflexion (wrist roll or towel under wrist), secure with tape.\n2. Sterile prep (CHG), sterile gloves. Drape.\n3. Palpate radial pulse, stabilize vessel with non-dominant hand.\n4. Insert needle at 30–45° angle, advance until flashback of blood.\n5. Flatten needle angle, advance catheter off needle into vessel.\n6. Remove needle, confirm pulsatile flow from catheter hub.\n7. Connect transducer tubing, confirm arterial waveform on monitor.\n8. Suture or secure with StatLock. Sterile dressing.\n9. Zero transducer (see L2 for zero procedure).\n\nCONFIRMATION OF PLACEMENT:\n• Pulsatile waveform on monitor is the key confirmation.\n• If waveform is dampened: flush gently, check for kink, check connections.\n• If no waveform: may be venous — check waveform character and attach to pressure transducer to confirm."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Arterial Line Problem", "Cause", "Fix"],
        rows: [
          ["Dampened waveform (low amplitude, blunted)", "Clot at tip, kink, loose connection, air bubble", "Flush briefly (fast-flush), check all connections, re-zero. If persistent: reposition wrist, replace line."],
          ["Over-damped / whipping waveform (exaggerated peaks)", "Air in tubing, excessively long tubing", "Remove air bubbles, shorten tubing if possible, re-zero."],
          ["No waveform", "Disconnection, catheter out of vessel, air", "Check all connections, check if blood can be aspirated, re-zero. May need replacement."],
          ["Ischemia of hand/fingers (pale, cold, cyanotic)", "Arterial occlusion, thrombosis", "Remove line immediately. Warm compress. Vascular surgery consult. Document."],
          ["Accidental disconnection / exsanguination risk", "Loose Luer lock", "ALL arterial connections must be Luer-lock secured. Routine daily check by nursing. High-flow exsanguination risk if disconnected."]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "ARTERIAL LINE DISCONNECTION IS LIFE-THREATENING. An open arterial line catheter can exsanguinate a patient rapidly. ALL Luer lock connections must be confirmed secure at every assessment. When drawing ABGs or blood samples, maintain direct visualization of all connections. Never leave an arterial line exposed and unattended."
      }
    },
    {
      type: "heading",
      content: { text: "Documentation Requirements (All Procedures)" }
    },
    {
      type: "table",
      content: {
        headers: ["Documentation Element", "What to Include"],
        rows: [
          ["Pre-procedure note", "Indication, risks/benefits discussed, consent obtained, timeout performed, relevant labs reviewed"],
          ["Procedure note", "Technique, site, size/gauge, number of attempts, ultrasound used (yes/no), complications during procedure, confirmation of placement"],
          ["Post-procedure note / orders", "CXR order (if applicable), post-procedure monitoring orders, activity restrictions, follow-up labs"],
          ["Nursing communication", "Document in Cerner — update nursing staff on what to monitor, drain parameters (EVD), drainage instructions, alarm thresholds"]
        ]
      }
    },
    {
      type: "case-vignette",
      content: {
        stem: "You are asked to perform a lumbar puncture on a 38-year-old with sudden-onset 'thunderclap headache.' CT head was done 6 hours post-symptom onset and read as normal. She is anxious but cooperative. Fundoscopic exam shows no papilledema. INR 1.0, platelets 185K. The ED team wants to rule out SAH. As you prepare, the patient asks: 'What are you looking for and how will you know if I had a bleed in my brain?'",
        role: "NCC APP",
        correct_action: "This is an appropriate LP indication — ruling out SAH after negative CT (CT is ~98% sensitive within 6h but LP adds certainty). Proceed with LP: lateral decubitus position, L3-L4 or L4-L5 space, open pressure measurement, standard 4 tubes. Explain to the patient: 'We are sampling the fluid around your brain and spine. If you had a small bleed, the fluid will be discolored — either bloody or yellow-tinged — which tells us what happened even when the CT looks normal. This helps us decide if you need more imaging or treatment.' After LP: send tube 1 for cell count, tube 2 for protein/glucose, tube 3 for culture, tube 4 for repeat cell count and xanthochromia. Compare tube 1 vs. tube 4 RBCs. Send for spectrophotometry if xanthochromia uncertain. Document opening pressure. Notify neurology with results."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Post-LP Headache Management",
        text: "Post-dural puncture headache (PDPH) occurs in 10–30% of LP patients — positional (worse upright, better supine), bifrontal or occipital, may include nausea/tinnitus/photophobia. Management: aggressive oral/IV hydration, caffeine (caffeine sodium benzoate IV or oral coffee), lying flat. If severe or lasting > 24–48h: anesthesia consult for epidural blood patch. Reassure patient this is common and treatable."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson registry — titles must match database exactly
// ─────────────────────────────────────────────────────────────────────────────
const lessons = [
  {
    title: 'M04.L1 — Mechanical Ventilation: Modes, Settings, and Neuro Targets',
    content: m04l1Content
  },
  {
    title: 'M04.L2 — Hemodynamic Monitoring and MAP Targets by Diagnosis',
    content: m04l2Content
  },
  {
    title: 'M04.L3 — Common NCC Drips: Sedation, HTS, AEDs, and Vasoactives',
    content: m04l3Content
  },
  {
    title: 'M04.L4 — Procedures: EVD, LP, Central Line, Arterial Line',
    content: m04l4Content
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Populate
// ─────────────────────────────────────────────────────────────────────────────
async function populate() {
  console.log('📚 Loading M04 content...\n');
  for (const lesson of lessons) {
    const { data, error: findError } = await supabase
      .from('module_lessons')
      .select('id,title')
      .eq('title', lesson.title)
      .single();

    if (findError || !data) {
      console.log('❌ Not found:', lesson.title);
      if (findError) console.log('   Error:', findError.message);
      continue;
    }

    const { error: updateError } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(lesson.content) })
      .eq('id', data.id);

    if (updateError) {
      console.log('❌ Update failed:', lesson.title);
      console.log('   Error:', updateError.message);
      continue;
    }

    console.log(`✅ ${lesson.title} — ${lesson.content.blocks.length} blocks`);
  }
  console.log('\n✨ Done!');
  process.exit(0);
}

populate().catch(console.error);
