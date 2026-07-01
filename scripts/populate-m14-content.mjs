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
// M14.L1 — ARDS: Diagnosis, Berlin Criteria, and Case Presentation
// ─────────────────────────────────────────────────────────────────────────────
const m14l1Content = {
  title: "ARDS: Diagnosis, Berlin Criteria, and Case Presentation",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Case Presentation" }
    },
    {
      type: "paragraph",
      content: {
        text: "A 46-year-old male, 70 kg, 70 inches tall, is found agitated in a hotel room and brought in by EMS. Vitals: T 102.1°F, HR 140, RR 28, BP 90/60. Pupils are dilated, skin is erythematous and dry. He has a short tonic-clonic seizure and is intubated. Vomitus is noted in the oropharynx during intubation. CT head is normal. 1L NS is administered."
      }
    },
    {
      type: "heading",
      content: { text: "Initial Ventilator Settings and ABG" }
    },
    {
      type: "table",
      content: {
        headers: ["Parameter", "Value"],
        rows: [
          ["Mode", "AC/VC"],
          ["Rate", "18 bpm"],
          ["Tidal Volume (VT)", "600 mL"],
          ["FiO2", "100%"],
          ["PEEP", "5 cmH2O"],
          ["ABG pH", "7.30"],
          ["PaCO2", "46 mmHg"],
          ["PaO2", "285 mmHg"],
          ["Compliance", "50 mL/cmH2O"],
          ["Resistance", "10 cmH2O/L/s"],
          ["P/F Ratio", "285"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Quiz 1: What should be done?",
        text: "The tidal volume is too high. Predicted Body Weight (PBW) for males = 50 + 2.3 × (height in inches − 60). PBW = 50 + 2.3 × 10 = 73 kg. Target VT = 6 mL/kg × 73 kg = 438 mL. The current VT of 600 mL is well above this target — decrease tidal volume immediately."
      }
    },
    {
      type: "heading",
      content: { text: "12-Hour Deterioration" }
    },
    {
      type: "paragraph",
      content: {
        text: "Twelve hours later the patient deteriorates. Current settings: AC/VC, Rate 12 (patient breathing at 20), VT 600 mL, FiO2 60%, PEEP 5. PIP 45, Pplat 35 cmH2O."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Parameter", "Value", "Interpretation"],
        rows: [
          ["ABG pH", "7.37", "Normal"],
          ["PaCO2", "37 mmHg", "Normal"],
          ["PaO2", "60 mmHg", "Low"],
          ["P/F Ratio", "100", "Severe ARDS"],
          ["Compliance", "20 mL/cmH2O", "↓ Significantly reduced"],
          ["Echo", "Normal LV/RV, IVC 20 mm minimal variation", "Non-cardiogenic etiology"],
          ["CXR", "Bilateral opacities", "Consistent with ARDS"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Quiz 2: Management?",
        text: "ALL of the following are indicated: (1) Prone positioning — P/F <150 with optimized settings. (2) Wean FiO2 — target PaO2 55–80 mmHg. (3) Increase PEEP — optimize recruitment and prevent atelectrauma. (4) Decrease VT — target 6 mL/kg PBW (≈438 mL for this patient)."
      }
    },
    {
      type: "heading",
      content: { text: "Berlin Criteria for ARDS" }
    },
    {
      type: "table",
      content: {
        headers: ["Criterion", "Definition"],
        rows: [
          ["Timing", "Onset within 1 week of known clinical insult or new/worsening respiratory symptoms"],
          ["Chest Imaging", "Bilateral opacities not fully explained by effusions, lobar/lung collapse, or nodules"],
          ["Origin of Edema", "Respiratory failure not fully explained by cardiac failure or fluid overload; need objective assessment (e.g., echo) to exclude hydrostatic edema"],
          ["Mild", "PaO2/FiO2 200–300 mmHg with PEEP or CPAP ≥5 cmH2O"],
          ["Moderate", "PaO2/FiO2 100–200 mmHg with PEEP ≥5 cmH2O"],
          ["Severe", "PaO2/FiO2 ≤100 mmHg with PEEP ≥5 cmH2O"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "This Patient's ARDS Classification",
        text: "P/F ratio of 100 with PEEP 5 → Severe ARDS by Berlin Criteria. Non-cardiogenic confirmed by echo (normal LV/RV, non-plethoric IVC). Bilateral opacities on CXR. Onset within 1 week of aspiration event."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M14.L2 — Lung-Protective Ventilation: ARDSnet Protocol and PEEP Management
// ─────────────────────────────────────────────────────────────────────────────
const m14l2Content = {
  title: "Lung-Protective Ventilation: ARDSnet Protocol and PEEP Management",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Ventilator-Induced Lung Injury (VILI) Mechanisms" }
    },
    {
      type: "table",
      content: {
        headers: ["Mechanism", "Cause", "Prevention"],
        rows: [
          ["Volutrauma", "Excessive tidal volume → alveolar overdistention", "VT ≤6 mL/kg PBW"],
          ["Barotrauma", "Excessive plateau pressure", "Pplat ≤30 cmH2O"],
          ["Atelectrauma", "Cyclic alveolar collapse from insufficient PEEP", "Optimize PEEP to prevent de-recruitment"],
          ["Biotrauma", "Systemic inflammatory response triggered by all of the above", "Comprehensive lung-protective strategy"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Stress and Strain Concepts" }
    },
    {
      type: "paragraph",
      content: {
        text: "Stress = transpulmonary pressure (TPP) — the pressure across the lung parenchyma. Strain = deformation of lung tissue relative to resting volume. Dynamic strain from VT >8 mL/kg PBW leads to injury. Static strain from maximum TPP >30 cmH2O leads to injury. Lung-protective ventilation targets both."
      }
    },
    {
      type: "heading",
      content: { text: "ARDSnet Protocol — Inclusion Criteria" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "PaO2/FiO2 ≤300 mmHg",
          "Bilateral infiltrates on chest imaging",
          "No clinical evidence of left atrial hypertension (or excluded by echo)"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Predicted Body Weight (PBW) Calculation" }
    },
    {
      type: "table",
      content: {
        headers: ["Sex", "Formula"],
        rows: [
          ["Male", "PBW (kg) = 50 + 2.3 × (height in inches − 60)"],
          ["Female", "PBW (kg) = 45.5 + 2.3 × (height in inches − 60)"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "ARDSnet Ventilator Protocol" }
    },
    {
      type: "table",
      content: {
        headers: ["Parameter", "Target / Protocol"],
        rows: [
          ["Initial VT", "8 mL/kg PBW, reduce by 1 mL/kg every ≤2 hours to target 6 mL/kg PBW"],
          ["Minimum VT", "4 mL/kg PBW (floor if Pplat remains elevated)"],
          ["Maximum RR", "35 breaths/min"],
          ["Oxygenation Goal", "PaO2 55–80 mmHg OR SpO2 88–95%"],
          ["Pplat Goal", "≤30 cmH2O; check every 4h and after each PEEP or VT change"],
          ["Pplat >30 cmH2O", "Decrease VT by 1 mL/kg (min 4 mL/kg PBW)"],
          ["pH Goal", "7.30–7.45"],
          ["Acidosis (pH 7.15–7.30)", "Increase RR (max 35 bpm)"],
          ["Severe Acidosis (pH <7.15)", "Increase RR to 35; may increase VT (exceeding Pplat target); may give NaHCO3"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "ARDSnet PEEP / FiO2 Tables" }
    },
    {
      type: "table",
      content: {
        headers: ["Strategy", "FiO2 → PEEP Combinations"],
        rows: [
          ["Lower PEEP / Higher FiO2", "FiO2 0.3→PEEP 5, 0.4→5, 0.4→8, 0.5→8, 0.5→10, 0.6→10, 0.7→10, 0.7→12, 0.7→14, 0.8→14, 0.9→14, 0.9→16, 0.9→18, 1.0→18–24"],
          ["Higher PEEP / Lower FiO2", "FiO2 0.3→PEEP 5, 0.3→8, 0.3→10, 0.3→12, 0.3→14, 0.4→14, 0.4→16, 0.5→16, 0.5→18, 0.5–0.8→20, 0.8→22, 0.9→22, 1.0→22–24"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "PEEP Physiology" }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Primary Function of PEEP",
        text: "PEEP's primary function is to prevent de-recruitment — not primarily to recruit already-collapsed alveoli. Without adequate PEEP, cyclic alveolar collapse occurs with each breath (atelectrauma). High PEEP strategies should be used for ARDS patients ONLY; in non-ARDS patients, high PEEP can cause overdistention and hemodynamic compromise."
      }
    },
    {
      type: "heading",
      content: { text: "Methods for Determining Best PEEP" }
    },
    {
      type: "table",
      content: {
        headers: ["Method Category", "Techniques"],
        rows: [
          ["Visual / Imaging", "CT scan, Electrical Impedance Tomography (EIT), Lung Ultrasound"],
          ["Mechanical", "Pressure-Volume (PV) curves, Best static compliance (highest compliance at lowest PEEP)"],
          ["Empirical", "ARDSnet PEEP-FiO2 tables (Lower PEEP/Higher FiO2 or Higher PEEP/Lower FiO2)"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Lung-Protective Ventilation Safety Targets" }
    },
    {
      type: "table",
      content: {
        headers: ["Target", "Goal"],
        rows: [
          ["Tidal Volume", "<8 mL/kg IBW; target 6 mL/kg PBW"],
          ["Plateau Pressure (Pplat)", "≤30 cmH2O"],
          ["Driving Pressure (Pplat − PEEP)", "<15 cmH2O"],
          ["PaO2", "55–80 mmHg"],
          ["pH", ">7.15 (permissive hypercapnia acceptable above this threshold)"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "NIH ARDS Network Trial Evidence",
        text: "The landmark NIH ARDSnet trial demonstrated that patients ventilated with lower tidal volumes (6 mL/kg PBW) had improved 28-day survival and more ventilator-free days compared to those ventilated with traditional tidal volumes (12 mL/kg PBW). This established 6 mL/kg PBW as the standard of care."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M14.L3 — Prone Positioning in Severe ARDS: PROSEVA Trial and Technique
// ─────────────────────────────────────────────────────────────────────────────
const m14l3Content = {
  title: "Prone Positioning in Severe ARDS: PROSEVA Trial and Technique",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Mechanisms of Hypoxemia in ARDS" }
    },
    {
      type: "table",
      content: {
        headers: ["Mechanism", "Description"],
        rows: [
          ["Shunt", "Blood flows through completely unventilated (collapsed) alveoli — not correctable with increased FiO2 alone"],
          ["Low V/Q Mismatch", "Alveoli are poorly ventilated but still receive perfusion — partially responsive to increased FiO2"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "How Prone Positioning Improves Oxygenation" }
    },
    {
      type: "paragraph",
      content: {
        text: "In ARDS, lung injury and consolidation are predominantly dorsal (gravity-dependent in the supine position). Proning redistributes lung density: dorsal regions become non-dependent, improving aeration of previously collapsed alveoli. Chest wall compliance also decreases in the prone position, contributing to more homogeneous transpulmonary pressure distribution across the lung."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Position", "CT Appearance", "Physiologic Effect"],
        rows: [
          ["Supine", "Dense consolidation in dorsal (dependent) regions; ventral regions relatively aerated", "Severe V/Q mismatch; shunt in dorsal segments"],
          ["Prone", "Dorsal regions now non-dependent, improve aeration; more homogeneous ventilation distribution", "Improved V/Q matching, reduced shunt, better oxygenation"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "PROSEVA Trial (Guérin et al., NEJM 2013)" }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Study Design and Population",
        text: "Multicenter RCT. Patients with Berlin ARDS were optimized on mechanical ventilation for 12–24 hours. If P/F improved to >150 during this period, they were excluded (responders). If P/F remained <150, they were randomized."
      }
    },
    {
      type: "heading",
      content: { text: "PROSEVA Inclusion Criteria" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "P/F ratio <150 mmHg",
          "PEEP ≥5 cmH2O",
          "FiO2 ≥0.6",
          "Tidal volume = 6 mL/kg PBW",
          "ARDS diagnosed and intubated for <36 hours"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "PROSEVA Protocol" }
    },
    {
      type: "table",
      content: {
        headers: ["Group", "Protocol"],
        rows: [
          ["Supine Group", "Lung-protective ventilation: VT 6 mL/kg PBW, Pplat ≤30 cmH2O, PaO2 55–80 or SpO2 88–95%, PEEP/FiO2 table, sedation + analgesia + NMB as needed"],
          ["Prone Group", "Same lung-protective ventilation PLUS prone positioning initiated within 1 hour of randomization, for AT LEAST 16 hours/day"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Criteria to Stop Proning (All Must Be Met)" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "P/F ratio ≥150 mmHg",
          "PEEP ≤10 cmH2O",
          "FiO2 ≤0.6"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "PROSEVA Results" }
    },
    {
      type: "table",
      content: {
        headers: ["Outcome", "Prone Group", "Supine Group", "Result"],
        rows: [
          ["28-Day Mortality", "Significantly lower", "Higher", "p < 0.001"],
          ["90-Day Mortality", "Significantly lower", "Higher", "p < 0.001"],
          ["Number at Risk Day 0", "237", "229", "—"],
          ["Number at Risk Day 90", "182", "136", "Prone group retained more survivors"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Key Takeaway: When to Prone",
        text: "Prone positioning is indicated when P/F ratio remains <150 mmHg despite optimized ARDSnet lung-protective ventilation settings. The benefit is most pronounced in severe ARDS. Sessions should last at least 16 continuous hours per day."
      }
    },
    {
      type: "heading",
      content: { text: "Contraindications to Prone Positioning" }
    },
    {
      type: "warning",
      content: {
        title: "Relative and Absolute Contraindications",
        text: "Spinal instability or recent spinal surgery. Open chest or open abdomen. Severe facial trauma. Elevated intracranial pressure (selected cases). Unstable pelvis fractures. Cardiac arrest or hemodynamic instability not responsive to resuscitation. These are relative — risks must be weighed against the mortality benefit of proning in severe ARDS."
      }
    },
    {
      type: "heading",
      content: { text: "PROSEVA PEEP / FiO2 Reference Table" }
    },
    {
      type: "table",
      content: {
        headers: ["FiO2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"],
        rows: [
          ["PEEP (cmH2O)", "5", "5–8", "8–10", "10", "10–14", "14", "14–18", "18–24"]
        ]
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M14.L4 — Weaning from Mechanical Ventilation: SBT Protocol
// ─────────────────────────────────────────────────────────────────────────────
const m14l4Content = {
  title: "Weaning from Mechanical Ventilation: SBT Protocol",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "ARDSnet Weaning Criteria" }
    },
    {
      type: "paragraph",
      content: {
        text: "Before a spontaneous breathing trial (SBT) is attempted, ALL of the following criteria must be met:"
      }
    },
    {
      type: "checklist",
      content: {
        items: [
          "FiO2 ≤0.40 AND PEEP ≤8 cmH2O  —OR—  FiO2 ≤0.50 AND PEEP ≤5 cmH2O",
          "PEEP and FiO2 are ≤ the values from the previous day (no escalation)",
          "Acceptable spontaneous breathing efforts detected (reduce vent rate by 50% for 5 minutes to assess)",
          "Systolic BP ≥90 mmHg without vasopressor support",
          "No neuromuscular blocking agents (NMBAs) active"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Spontaneous Breathing Trial (SBT) Method" }
    },
    {
      type: "table",
      content: {
        headers: ["Parameter", "Specification"],
        rows: [
          ["Duration", "Up to 120 minutes (patient must have been on study ventilation ≥12 hours)"],
          ["Method", "T-piece OR Trach collar OR CPAP ≤5 cmH2O with Pressure Support ≤5 cmH2O"],
          ["FiO2 during SBT", "≤0.50"],
          ["PEEP during SBT", "≤5 cmH2O"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "SBT Pass Criteria (All Must Be Met)" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "SpO2 ≥90% OR PaO2 ≥60 mmHg",
          "Spontaneous tidal volume ≥4 mL/kg PBW",
          "Respiratory rate ≤35 breaths/min",
          "pH ≥7.30",
          "No signs of respiratory distress (see criteria below)"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Respiratory Distress — SBT Failure Criteria" }
    },
    {
      type: "warning",
      content: {
        title: "SBT Fails if 2 or More of the Following Are Present",
        text: "1. Heart rate >120% of baseline. 2. Marked accessory muscle use. 3. Abdominal paradox (inward abdominal movement during inspiration). 4. Diaphoresis. 5. Marked dyspnea (patient-reported or clinically evident)."
      }
    },
    {
      type: "heading",
      content: { text: "SBT Outcomes and Next Steps" }
    },
    {
      type: "table",
      content: {
        headers: ["SBT Result", "Action"],
        rows: [
          ["Tolerated ≥30 minutes (pass criteria met)", "Consider extubation"],
          ["Not tolerated (fail criteria met)", "Resume pre-weaning ventilator settings; reassess readiness the following day"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Definition: Unassisted Breathing (Post-Extubation)" }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Unassisted Breathing — Distinct from SBT",
        text: "Unassisted breathing (used for ventilator-free day counting) is defined as: extubation to face mask, nasal prong, or room air; T-tube breathing; trach mask; OR CPAP ≤5 cmH2O WITHOUT pressure support or synchronized IMV. This is distinct from an SBT, which may still use low-level PS."
      }
    },
    {
      type: "heading",
      content: { text: "ARDSnet Quick Reference: All Key Targets" }
    },
    {
      type: "table",
      content: {
        headers: ["Parameter", "Target"],
        rows: [
          ["Tidal Volume (goal)", "6 mL/kg PBW"],
          ["Tidal Volume (maximum)", "8 mL/kg PBW"],
          ["Tidal Volume (minimum)", "4 mL/kg PBW"],
          ["Plateau Pressure (Pplat)", "≤30 cmH2O"],
          ["Driving Pressure (Pplat − PEEP)", "<15 cmH2O"],
          ["PaO2", "55–80 mmHg"],
          ["SpO2", "88–95%"],
          ["pH (goal)", "7.30–7.45"],
          ["pH (minimum tolerated)", "≥7.15"],
          ["Maximum RR", "35 breaths/min"],
          ["Minimum PEEP", "5 cmH2O"],
          ["P/F — Mild ARDS", "200–300 mmHg (PEEP ≥5)"],
          ["P/F — Moderate ARDS", "100–200 mmHg (PEEP ≥5)"],
          ["P/F — Severe ARDS", "≤100 mmHg (PEEP ≥5)"],
          ["P/F threshold for proning", "<150 mmHg (after optimization)"],
          ["Prone positioning duration", "≥16 hours/day"],
          ["SBT maximum duration", "120 minutes"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Clinical Pearl: Daily Readiness Assessment",
        text: "Weaning readiness should be assessed daily for every mechanically ventilated ARDS patient. Paired daily spontaneous awakening trials (SAT) and spontaneous breathing trials (SBT) — the 'ABC' bundle — reduce ventilator days, ICU LOS, and mortality. Do not skip the weaning screen just because the patient had severe ARDS."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// Populate function
// ─────────────────────────────────────────────────────────────────────────────
async function populateM14Content() {
  console.log('Fetching M14 lessons from Supabase...');

  const { data: lessons, error: fetchError } = await supabase
    .from('module_lessons')
    .select('id, title')
    .like('title', 'M14.L%')
    .order('order_index');

  if (fetchError) {
    console.error('Error fetching lessons:', fetchError);
    process.exit(1);
  }

  if (!lessons || lessons.length === 0) {
    console.error('No M14 lessons found. Make sure the lessons are seeded first.');
    process.exit(1);
  }

  console.log(`Found ${lessons.length} M14 lesson(s):`, lessons.map(l => l.title));

  const contentMap = {
    'M14.L1': m14l1Content,
    'M14.L2': m14l2Content,
    'M14.L3': m14l3Content,
    'M14.L4': m14l4Content,
  };

  for (const lesson of lessons) {
    // Extract lesson key like "M14.L1" from title (e.g. "M14.L1 — ARDS: Diagnosis...")
    const keyMatch = lesson.title.match(/^(M14\.L\d+)/);
    if (!keyMatch) {
      console.warn(`  Skipping lesson with unexpected title format: "${lesson.title}"`);
      continue;
    }
    const key = keyMatch[1];
    const contentObj = contentMap[key];

    if (!contentObj) {
      console.warn(`  No content defined for key "${key}" (title: "${lesson.title}")`);
      continue;
    }

    console.log(`  Updating ${key} (id: ${lesson.id})...`);

    const { error: updateError } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(contentObj) })
      .eq('id', lesson.id);

    if (updateError) {
      console.error(`  ERROR updating ${key}:`, updateError);
    } else {
      console.log(`  ✓ ${key} content updated successfully.`);
    }
  }

  console.log('\nM14 content population complete.');
}

populateM14Content().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
