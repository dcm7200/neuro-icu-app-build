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

// ─── M16.L1 ── Septic Shock: Sepsis-3 Definitions, Diagnosis, and SSC Guidelines ───
const m16l1Content = {
  title: "Septic Shock: Sepsis-3 Definitions, Diagnosis, and SSC Guidelines",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Historical Context: Sepsis-1 Ladder" }
    },
    {
      type: "paragraph",
      content: {
        text: "Sepsis-1 (Bone, Chest 1992) described a ladder of severity: Infection → SIRS → Sepsis → Severe Sepsis → Septic Shock → MODS. This framework defined progressive deterioration driven by systemic inflammatory response."
      }
    },
    {
      type: "heading",
      content: { text: "Sepsis-3 Definition (Singer M et al, JAMA 2016;315:801-810)" }
    },
    {
      type: "paragraph",
      content: {
        text: "Organ dysfunction is defined as an acute change in total SOFA score ≥2 points from infection. Baseline SOFA is assumed to be 0 in patients without known prior organ dysfunction."
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Septic Shock Definition (Sepsis-3)",
        text: "Septic shock = sepsis + vasopressor requirement to maintain MAP ≥65 mmHg + serum lactate >2 mmol/L (18 mg/dL) despite adequate fluid resuscitation. ALL THREE criteria must be present."
      }
    },
    {
      type: "heading",
      content: { text: "Why Sepsis Is Hard to Diagnose" }
    },
    {
      type: "paragraph",
      content: {
        text: "Diagnosis is complicated by heterogeneous patient factors (acute derangements, chronic comorbidities), variable source, organism, and organs affected."
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Machiavelli, The Prince (1513)",
        text: "\"Hectic fever is difficult to recognize but easy to treat; left unattended it becomes easy to recognize and difficult to treat.\""
      }
    },
    {
      type: "heading",
      content: { text: "Surviving Sepsis Campaign (SSC)" }
    },
    {
      type: "paragraph",
      content: {
        text: "Launched in 2002, the SSC is a joint initiative of SCCM and ESICM with the goal of reducing global sepsis mortality."
      }
    },
    {
      type: "heading",
      content: { text: "Mortality Data (~3 Million Charts)" }
    },
    {
      type: "table",
      content: {
        headers: ["Clinical Scenario", "Mortality"],
        rows: [
          ["Vasopressors + hypotension + lactate >2 mmol/L", "42%"],
          ["Vasopressors + hypotension alone", "30%"],
          ["Lactate >2 mmol/L alone", "25%"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Critical Diagnostic Points" }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Do Not Confuse These Tools",
        text: "qSOFA = SCREENING only, NOT diagnostic. SOFA = identifies organ dysfunction for sepsis, NOT specifically septic shock. Septic shock requires ALL 3: sepsis + vasopressor + lactate >2 despite adequate fluids."
      }
    },
    {
      type: "heading",
      content: { text: "Case Study" }
    },
    {
      type: "paragraph",
      content: {
        text: "59-year-old female, POD8 bowel resection, worsening abdominal pain/nausea/vomiting. Vitals: HR 128, BP 78/45, RR 28, SpO2 94%, T 103.1°F. Labs: WBC 16, lactate 3.1 mmol/L. CT: anastomotic leak. Treated with cultures, antibiotics, 3L LR, norepinephrine."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Case Answer: This Patient Has Septic Shock",
        text: "Criteria met: (1) Infection — anastomotic leak with peritonitis. (2) Vasopressor requirement — norepinephrine for hypotension. (3) Lactate >2 mmol/L — lactate 3.1 despite 3L IVF. Incorrect answers: qSOFA alone, outside hospital diagnosis alone, SOFA alone — none of these define septic shock."
      }
    },
    {
      type: "heading",
      content: { text: "SSC Key Recommendations" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Antimicrobials within 1 hour of recognition (strong recommendation)",
          "Balanced crystalloids preferred over isotonic saline for resuscitation",
          "Initial MAP target 65 mmHg (not higher — no benefit to higher targets)",
          "Source control: risk-adjusted 90-day mortality increases with delayed control >6 hours"
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Sepsis Performance Improvement",
        text: "Sepsis Performance Improvement Projects are the only intervention proven to improve outcomes. The SSC evidence base supports these programs over 30 cc/kg IVF, steroids, or EGDT individually."
      }
    }
  ]
};

// ─── M16.L2 ── Distributive Shock: Sepsis, Anaphylaxis, and Neurogenic Shock ───
const m16l2Content = {
  title: "Distributive Shock: Sepsis, Anaphylaxis, and Neurogenic Shock",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Definition of Distributive Shock" }
    },
    {
      type: "paragraph",
      content: {
        text: "Distributive shock is shock caused by loss of vascular tone (vasoplegia). It is the most common form of shock. Hemodynamics: SVR ↓, CO normal or elevated. The most common subtype is septic shock."
      }
    },
    {
      type: "heading",
      content: { text: "Subtypes of Distributive Shock" }
    },
    {
      type: "table",
      content: {
        headers: ["Subtype", "Mechanism"],
        rows: [
          ["Septic", "Immune response to infection causing massive vasodilation"],
          ["Anaphylactic", "Life-threatening allergic reaction with histamine/leukotriene-mediated vasodilation"],
          ["Neurogenic", "Sudden loss of autonomic function after spinal cord disruption at T6 and above (unopposed parasympathetic response)"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Shock Definition" }
    },
    {
      type: "paragraph",
      content: {
        text: "Shock is circulatory failure leading to inadequate tissue perfusion and oxygen delivery. Tissue perfusion depends on SVR and CO. An imbalance between O2 consumption and delivery leads to cell death → organ failure → death."
      }
    },
    {
      type: "heading",
      content: { text: "Shubin-Weill Hemodynamic Classification" }
    },
    {
      type: "table",
      content: {
        headers: ["Type", "CO", "SVR", "CVP", "PCWP"],
        rows: [
          ["Distributive", "↑", "↓", "↔", "↔"],
          ["Hypovolemic", "↓", "↑", "↓", "↓"],
          ["Cardiogenic", "↓↓", "↑↑", "↑", "↑"],
          ["Obstructive", "↓", "↑", "↑↑", "↑↑"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "ABCDE Approach to Shock" }
    },
    {
      type: "table",
      content: {
        headers: ["Letter", "Principle", "Key Action"],
        rows: [
          ["A", "Airway", "Secure and protect the airway"],
          ["B", "Breathing", "Control work of breathing"],
          ["C", "Circulation", "Optimize for specific shock type"],
          ["D", "Delivery", "Ensure adequate O2 delivery"],
          ["E", "Endpoints", "Achieve resuscitation endpoints"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Intubation Can Worsen Hypotension",
        text: "Sedatives lower BP; positive pressure ventilation decreases preload. May need volume resuscitation first. However, early intubation reduces work of breathing (which can consume up to 50% of O2 delivery) and reduces endogenous catecholamine surge."
      }
    },
    {
      type: "heading",
      content: { text: "Anaphylactic Shock: Treatment Algorithm" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Remove the offending agent immediately",
          "Establish airway and restore circulation",
          "Epinephrine — reverses peripheral vasodilation, dilates bronchi, increases contractility, suppresses histamine/leukotriene release",
          "H1 and H2 antihistamines — counter histamine-mediated effects",
          "Hydrocortisone — shortens duration of the allergic reaction",
          "Bronchodilators — for bronchospasm"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Neurogenic Shock: Treatment (Primarily Supportive)" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Establish airway",
          "IVF resuscitation to maintain MAP >65 mmHg",
          "Vasoconstrictors: norepinephrine, dopamine, phenylephrine (note: phenylephrine may worsen bradycardia)",
          "Inotropes: dobutamine, epinephrine for cardiac support",
          "Atropine for severe bradycardia",
          "Corticosteroids: role remains unclear"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Pulmonary Artery Catheter (PAC / Swan-Ganz)" }
    },
    {
      type: "paragraph",
      content: {
        text: "The PAC provides hemodynamic data useful for shock classification. Outside cardiac patients, little evidence supports routine use. No proven value in high-risk surgical patients, shock, or lung injury patients."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "PAC Limitations",
        text: "Requires proper placement, absence of valvular disease, and normal heart compliance to interpret correctly. Pros: familiarity and experience. Cons: lack of proven accuracy, infection risk, catheter dysfunction."
      }
    }
  ]
};

// ─── M16.L3 ── Cardiogenic and Obstructive Shock: Identification and Management ───
const m16l3Content = {
  title: "Cardiogenic and Obstructive Shock: Identification and Management",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Cardiogenic Shock: Definition and Hemodynamics" }
    },
    {
      type: "paragraph",
      content: {
        text: "Cardiogenic shock is the failure of the heart as a pump, resulting in inadequate cardiac output and tissue perfusion. Hemodynamic profile: CO↓↓, SVR↑↑, CVP↑, PCWP↑."
      }
    },
    {
      type: "heading",
      content: { text: "Causes and Specific Treatments" }
    },
    {
      type: "table",
      content: {
        headers: ["Cause", "Specific Treatment"],
        rows: [
          ["Acute MI", "Revascularization (SHOCK Trial)"],
          ["RV Infarct", "Specific supportive care (volume, avoid vasodilators)"],
          ["Acute MR or VSD", "Inotropes ± mechanical support"],
          ["Arrhythmias", "Correct electrolytes; antiarrhythmics or electrical therapy"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "SHOCK Trial (Hochman JS et al, NEJM 1999;341:625-634)" }
    },
    {
      type: "paragraph",
      content: {
        text: "Compared initial medical therapy vs initial revascularization in cardiogenic shock complicating acute MI."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Endpoint", "Revascularization", "Medical Therapy", "Significance"],
        rows: [
          ["30-day mortality", "ARR 9.3%", "—", "NOT statistically significant"],
          ["6-month mortality", "50%", "63.1%", "STATISTICALLY SIGNIFICANT"],
          ["Age >75 years", "—", "—", "Less benefit with revascularization"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "DanGer Shock Trial (NEJM 2024)" }
    },
    {
      type: "paragraph",
      content: {
        text: "360 patients enrolled over 10 years. Evaluated microaxial flow pump (Impella) for post-MI cardiogenic shock."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Outcome", "Impella Pump", "Standard Care"],
        rows: [
          ["180-day all-cause mortality", "45.8%", "58.5%"],
          ["HR 0.74, 95% CI 0.55–0.99, p=0.04", "Statistically significant", "—"],
          ["Required RRT", "41.9%", "26.7%"],
          ["Composite safety endpoint", "24.0%", "6.2%"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "DanGer Shock: Benefit With Tradeoffs",
        text: "The Impella pump reduced 180-day mortality but required significantly more renal replacement therapy and had a higher composite safety endpoint. Patient selection and risk-benefit discussion are critical."
      }
    },
    {
      type: "heading",
      content: { text: "Obstructive Shock: Definition and Hemodynamics" }
    },
    {
      type: "paragraph",
      content: {
        text: "Obstructive shock results from physical obstruction of the great vessels or heart that impedes filling or ejection. Hemodynamic profile: CO↓, SVR↑, CVP↑↑, PCWP↑↑. Some classify this as a subset of cardiogenic shock."
      }
    },
    {
      type: "heading",
      content: { text: "Obstructive Shock Causes and Clinical Findings" }
    },
    {
      type: "table",
      content: {
        headers: ["Cause", "Key Clinical Findings", "Treatment"],
        rows: [
          ["Massive PE", "RV strain on echo, septal bowing, elevated RV pressure", "Anticoagulation, thrombolytics, or catheter-directed therapy"],
          ["Tension Pneumothorax", "Tracheal deviation, absent breath sounds, hypotension", "Immediate needle decompression, then chest tube"],
          ["Cardiac Tamponade", "Beck's triad: hypotension + JVD + muffled heart sounds; electrical alternans on EKG; pericardial effusion on echo", "Emergent pericardiocentesis or surgical drainage"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Shock Type Quick Reference" }
    },
    {
      type: "table",
      content: {
        headers: ["Type", "CO", "SVR", "CVP", "PCWP", "Common Causes", "First-Line Treatment"],
        rows: [
          ["Distributive", "↑", "↓", "↔", "↔", "Sepsis, anaphylaxis, neurogenic", "Fluids + norepinephrine"],
          ["Hypovolemic", "↓", "↑", "↓", "↓", "Hemorrhage, dehydration, burns", "Volume replacement"],
          ["Cardiogenic", "↓↓", "↑↑", "↑", "↑", "AMI, cardiomyopathy, arrhythmia", "Revascularization / inotropes"],
          ["Obstructive", "↓", "↑", "↑↑", "↑↑", "PE, tamponade, tension PTX", "Relieve obstruction"]
        ]
      }
    }
  ]
};

// ─── M16.L4 ── Vasopressors, Corticosteroids, and Fluid Resuscitation in Shock ───
const m16l4Content = {
  title: "Vasopressors, Corticosteroids, and Fluid Resuscitation in Shock",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "MAP Target in Septic Shock" }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "SSC Recommendation: MAP Target 65 mmHg",
        text: "The Surviving Sepsis Campaign recommends an initial MAP target of 65 mmHg — not higher. This is a strong recommendation with moderate quality evidence. Higher MAP targets have not demonstrated benefit."
      }
    },
    {
      type: "heading",
      content: { text: "SEPSISPAM Trial (Asfar P et al, NEJM 2014;370:1583-1593)" }
    },
    {
      type: "paragraph",
      content: {
        text: "Compared low-target vs high-target MAP groups in septic shock. Kaplan-Meier survival curves showed similar outcomes between groups, supporting the lower MAP target."
      }
    },
    {
      type: "heading",
      content: { text: "Individual Patient Data Meta-Analysis (NEJM Evid 2025)" }
    },
    {
      type: "table",
      content: {
        headers: ["Analysis", "Result"],
        rows: [
          ["RR (lower vs standard MAP target)", "0.93 (95% CrI 0.76–1.07)"],
          ["Risk difference", "−2.6 (−9.6 to 2.8)"],
          ["Probability lower target is better", "87%"],
          ["Consistency", "Consistent across sensitivity analyses"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Vasopressor Timing" }
    },
    {
      type: "table",
      content: {
        headers: ["Trial", "Design", "Key Finding"],
        rows: [
          ["CLASSIC Trial (NEJM 2022;386:2459-2470)", "Both groups received median 3L IVF prior to vasopressors", "Similar outcomes — no benefit to aggressive vasopressor restriction"],
          ["CLOVERS Trial (NEJM 2023;338:499-510)", "Early vasopressors + limited fluids vs late vasopressors + more fluids; median 2L IVF pre-randomization", "Similar outcomes; short-term peripheral vasopressor therapy appeared SAFE"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Norepinephrine vs Dopamine: SOAP-2 Trial" }
    },
    {
      type: "paragraph",
      content: {
        text: "De Backer D et al, NEJM 2010;362:779-789. 1,679 shock patients randomized to norepinephrine (NE) vs dopamine (DA)."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Outcome", "Dopamine", "Norepinephrine", "p-value"],
        rows: [
          ["Overall mortality (OR for death with DA)", "1.17 (95% CI 0.97–1.42)", "—", "p=0.10 (not significant)"],
          ["Arrhythmias", "24.1%", "12.4%", "p<0.01"],
          ["Cardiogenic shock subgroup mortality", "Greater with DA", "—", "p=0.03"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "SSC Recommendation: Norepinephrine First-Line",
        text: "Multiple meta-analyses confirm lower mortality with norepinephrine. The SSC recommends NE as the first-line vasopressor. Dopamine is associated with significantly more arrhythmias and worse outcomes in cardiogenic shock."
      }
    },
    {
      type: "heading",
      content: { text: "Vasopressin as Adjunct" }
    },
    {
      type: "paragraph",
      content: {
        text: "VAST and VANISH trials compared vasopressin vs norepinephrine. Vasopressin as an adjunct spares norepinephrine dose and may reduce catecholamine-related adverse effects, though survival benefit has not been definitively established."
      }
    },
    {
      type: "heading",
      content: { text: "Corticosteroids in Septic Shock" }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "High-Dose Steroids in All Sepsis: DO NOT WORK",
        text: "Historical trials of high-dose corticosteroids given to all sepsis patients showed no benefit. Do not use high-dose steroids indiscriminately in sepsis."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Trial", "Population", "Treatment", "Key Result"],
        rows: [
          ["Annane 2002 (JAMA 2002;288:8628-8671)", "138 septic shock patients; ACTH stim test; non-responders (ΔCortisol ≤9 μg/dL)", "Hydrocortisone 50mg IV q6h × 7d + Fludrocortisone 50mcg PO daily × 7d", "Non-responders: more vasopressor discontinuation, 17% reduction in 28-day mortality. No effect in responders."],
          ["ADRENAL Trial", "3,800 septic shock patients on vasopressors + MV >4h", "Hydrocortisone 200mg/day continuous × 7d", "NO difference in 90-day survival. Faster vasopressor discontinuation. More hyperglycemia (1.1% vs 0.3%) and hypernatremia."],
          ["APROCCHSS Trial (Annane D et al, NEJM 2018;378:809-818)", "~1,300 very sick patients (high-dose vasopressors, ≥2 organ failures)", "HC + Fludrocortisone vs placebo (4-arm factorial; APC removed 2011)", "Hydrocortisone + fludrocortisone group showed mortality benefit."]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Corticosteroid Decision Summary" }
    },
    {
      type: "table",
      content: {
        headers: ["Clinical Scenario", "Recommendation"],
        rows: [
          ["Refractory septic shock on vasopressors", "Consider hydrocortisone 200 mg/day (ADRENAL, APROCCHSS)"],
          ["ACTH non-responder", "Benefit with hydrocortisone + fludrocortisone (Annane 2002)"],
          ["All sepsis (not refractory)", "High-dose steroids DO NOT help — avoid"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Fluid Resuscitation" }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "SSC: Balanced Crystalloids Preferred",
        text: "Balanced crystalloids (Lactated Ringer's, PlasmaLyte) are preferred over isotonic saline. This is a strong recommendation with moderate evidence. Goal: restore perfusion while avoiding fluid overload."
      }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Use balanced crystalloids (LR, PlasmaLyte) over normal saline",
          "Avoid aggressive fluid loading without dynamic assessment",
          "Use dynamic measures of fluid responsiveness: passive leg raise (PLR), pulse pressure variation, IVC ultrasound",
          "Reassess fluid responsiveness before each fluid bolus",
          "Goal: restore tissue perfusion while preventing fluid overload and its complications"
        ]
      }
    }
  ]
};

// ─── Main: Query and Update ───────────────────────────────────────────────────

async function main() {
  console.log('Fetching M16 lessons from Supabase...');

  const { data: lessons, error: fetchError } = await supabase
    .from('module_lessons')
    .select('id, title')
    .like('title', 'M16.L%')
    .order('order_index');

  if (fetchError) {
    console.error('Error fetching lessons:', fetchError);
    process.exit(1);
  }

  if (!lessons || lessons.length === 0) {
    console.error('No M16 lessons found. Ensure module_lessons contains rows with title LIKE M16.L%');
    process.exit(1);
  }

  console.log(`Found ${lessons.length} M16 lesson(s):`);
  lessons.forEach(l => console.log(`  ${l.id}: ${l.title}`));

  const contentMap = [m16l1Content, m16l2Content, m16l3Content, m16l4Content];

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const content = contentMap[i];

    if (!content) {
      console.warn(`No content defined for lesson index ${i} (${lesson.title}), skipping.`);
      continue;
    }

    console.log(`\nUpdating: ${lesson.title} (id: ${lesson.id})`);

    const { error: updateError } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(content) })
      .eq('id', lesson.id);

    if (updateError) {
      console.error(`  ✗ Failed to update ${lesson.title}:`, updateError);
    } else {
      console.log(`  ✓ Updated successfully`);
    }
  }

  console.log('\nDone. M16 content population complete.');
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
