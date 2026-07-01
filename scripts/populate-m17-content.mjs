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

// ─── M17.L1 — Toxicology Assessment: History, ECG, and Lab Approach ───────────
const m17l1Content = {
  title: "Toxicology Assessment: History, ECG, and Lab Approach",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Stepwise Safety and Assessment Approach" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Ensure your safety and staff safety first",
          "Determine if toxin is known or unknown",
          "Obtain history (also review EMR carefully)",
          "Perform physical exam"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "ECG Assessment" }
    },
    {
      type: "paragraph",
      content: { text: "Key ECG findings to evaluate in ALL toxicology patients:" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Rate",
          "Rhythm",
          "Intervals (QTc prolongation, QRS widening)",
          "Sodium channel blocker effect (widened QRS)",
          "Beta/calcium channel blocker effect (rate/conduction changes)",
          "QT prolonging agent (QTc prolongation → torsades risk)"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Lab Assessment — Key Labs in Toxicology" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "ABG or VBG (pH, pCO2, HCO3)",
          "Lactate",
          "Anion gap (AG = Na − [Cl + HCO3], normal 8–12)",
          "Osmolar gap (measured − calculated osmolality; normal <10)",
          "Serum electrolytes, glucose, BUN/Cr",
          "Ethanol level (REQUIRED for osmolar gap calculation)",
          "Acetaminophen and salicylate levels (send on ALL intentional ingestions)",
          "Urine drug screen (limited utility — many false positives/negatives)"
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Osmolar Gap Formula",
        text: "Calculated Osmolality = 2(Na) + BUN/2.8 + Glucose/18 + Ethanol/4.6\n\nOsmGap = Measured − Calculated\n\nNormal < 10 mOsm/kg. Elevated OsmGap → suspect toxic alcohol."
      }
    },
    {
      type: "heading",
      content: { text: "Acute Management Principles" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "ABCs — airway, breathing, circulation",
          "Decontamination (GI decontamination if indicated — activated charcoal within 1–2h if airway protected)",
          "Antidotal therapy (specific to toxin)",
          "Enhanced elimination (hemodialysis for salicylates, toxic alcohols, lithium, etc.)",
          "Supportive care tailored to specific toxin"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Knowledge Check Cases" }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Case 1 — Cholinergic Syndrome",
        text: "70M with profuse vomiting/diarrhea/secretions, HR 35, RR 30, BP 108/70, SpO2 88%. Lactate 3.6, pH 7.25, pCO2 25.\n\nAnswer: Cholinergic Syndrome\nFeatures: Bradycardia + bronchorrhea + SLUDGE = organophosphate, carbamate, or nerve agent."
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Case 2 — Toxic Alcohol Ingestion",
        text: "70F with agitation, GCS 13, HR 125. pH 6.8, pCO2 20, Lactate 3.6, AG 25, HCO3 10.\n\nAnswer: Toxic Alcohol Ingestion\nFeatures: Profound AGMA (AG 25, pH 6.8), pCO2 low (respiratory compensation), lactate cannot fully explain the degree of acidosis."
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Case 3 — Salicylism",
        text: "70F with AMS, HR 118, RR 24, T 38°C. pH 7.48, pCO2 32, Lactate 2.8, AG 16, HCO3 18.\n\nAnswer: Salicylism\nFeatures: Primary respiratory alkalosis + developing AGMA = mixed acid-base = classic salicylism. Alcohol withdrawal would show autonomic instability WITHOUT mixed acid-base."
      }
    }
  ]
};

// ─── M17.L2 — Cholinergic Syndrome and Toxic Alcohol Ingestion ─────────────────
const m17l2Content = {
  title: "Cholinergic Syndrome and Toxic Alcohol Ingestion",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Cholinergic Syndrome" }
    },
    {
      type: "paragraph",
      content: { text: "Mechanism: Excess acetylcholine at muscarinic and nicotinic receptors. Causes include organophosphates (insecticides, nerve agents), carbamates, physostigmine, and donepezil." }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "SLUDGE/BBB Mnemonic — Muscarinic Effects",
        text: "S = Salivation\nL = Lacrimation\nU = Urination\nD = Defecation\nG = Gastric emptying (emesis)\nE = Emesis\nB = Bradycardia\nB = Bronchorrhea\nB = Bronchospasm"
      }
    },
    {
      type: "paragraph",
      content: { text: "Nicotinic effects: Fasciculations, muscle weakness, paralysis, depolarization, respiratory depression, seizure, coma." }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Clinical Pearl",
        text: "Bradycardia + bronchorrhea + secretions + GI symptoms = think organophosphate/nerve agent."
      }
    },
    {
      type: "heading",
      content: { text: "Treatment of Cholinergic Syndrome" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Remove from exposure",
          "Atropine (competitive muscarinic antagonist) — titrate to DRYING OF SECRETIONS, NOT heart rate. Dose: 2–4 mg IV q5–10 min; may need massive doses (hundreds of mg) in severe organophosphate poisoning",
          "Pralidoxime (2-PAM) — reactivates acetylcholinesterase if given early (before 'aging')",
          "Benzodiazepines for seizures",
          "Supportive care"
        ]
      }
    },
    {
      type: "warning",
      content: {
        title: "Atropine Endpoint",
        text: "The endpoint for atropine titration is DRY secretions (bronchorrhea resolved) — NOT tachycardia. Do not stop just because the heart rate rises."
      }
    },
    {
      type: "heading",
      content: { text: "Toxic Alcohol Ingestion" }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Pattern to Recognize",
        text: "Anion gap + low bicarbonate + elevated osmolar gap = toxic alcohol until proven otherwise.\n\nALWAYS measure ethanol when calculating osmolar gap.\n\nCalculated Osm = 2(Na) + BUN/2.8 + Glucose/18 + Ethanol/4.6\nOsmGap = Measured − Calculated. Normal <10."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Alcohol", "Source", "Metabolites", "Clinical Effects", "Lab Pattern"],
        rows: [
          [
            "Ethylene glycol",
            "Antifreeze",
            "Oxalic acid → oxalate crystals",
            "Renal failure, calcium oxalate crystals in urine",
            "AGMA + high OsmGap early"
          ],
          [
            "Methanol",
            "Windshield washer fluid, moonshine",
            "Formaldehyde → formic acid",
            "Visual disturbances ('snowstorm'), blindness, CNS depression",
            "AGMA + high OsmGap early"
          ],
          [
            "Propylene glycol",
            "Medication solvent (IV lorazepam, phenobarbital)",
            "Lactic acid",
            "AGMA, elevated lactate",
            "OsmGap may be elevated"
          ],
          [
            "Isopropyl alcohol",
            "Rubbing alcohol",
            "Acetone (not acidic)",
            "CNS depression, ketosis WITHOUT acidosis",
            "High OsmGap but MINIMAL anion gap"
          ]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "OsmGap vs. Anion Gap Timeline",
        text: "Early: High OsmGap, normal AG (parent compound present, not yet metabolized).\nAs metabolism occurs: OsmGap falls, AG rises.\nVery late: Normal OsmGap but high AG (parent compound fully metabolized to toxic acids)."
      }
    },
    {
      type: "heading",
      content: { text: "Treatment of Toxic Alcohol Ingestion" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Fomepizole (4-MP) — alcohol dehydrogenase inhibitor, first-line for ethylene glycol and methanol. Dose: 15 mg/kg loading dose, then 10 mg/kg q12h × 4 doses, then 15 mg/kg q12h (enzyme induction increases dose)",
          "Ethanol infusion — alternative ADH inhibitor (more cumbersome, causes CNS effects)",
          "Hemodialysis — for severe cases (high levels, severe acidosis, renal failure, visual loss in methanol)",
          "Correct metabolic acidosis"
        ]
      }
    }
  ]
};

// ─── M17.L3 — Salicylate Poisoning and AGMA Differential (IMPACT) ─────────────
const m17l3Content = {
  title: "Salicylate Poisoning and AGMA Differential (IMPACT)",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Salicylate Poisoning (Salicylism)" }
    },
    {
      type: "paragraph",
      content: { text: "Epidemiology: >25,000 overdoses/year. Unintentional more common than intentional." }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Formulations",
        text: "• Methyl salicylate (oil of wintergreen) — extremely concentrated; 1 tsp = 7g aspirin equivalent\n• Bismuth subsalicylate (Pepto-Bismol)\n• Acetylsalicylic acid (aspirin)\n\nCan be ACUTE or CHRONIC. Chronic toxicity risk factors: polypharmacy, topical use, dietary sources. Chronic has LESS classic symptoms — neurological findings predominate and may mimic dementia or AMS without typical GI findings.\n\nPharmacobezoar: Aspirin can form a bezoar → delayed/prolonged absorption, unpredictable toxicokinetics."
      }
    },
    {
      type: "heading",
      content: { text: "Clinical Pattern" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Tachypnea (direct CNS stimulation of respiratory center → respiratory alkalosis)",
          "Mixed acid-base: Respiratory alkalosis + Anion gap metabolic acidosis",
          "AMS, tinnitus, nausea, vomiting, hyperthermia, diaphoresis",
          "Classic: Alkaline urine early (salicylate excreted), acidic urine in severe toxicity (buffer depleted)"
        ]
      }
    },
    {
      type: "table",
      content: {
        headers: ["Lab Value", "Early", "Late"],
        rows: [
          ["pH", "↑ (respiratory alkalosis)", "↓ (AGMA dominates)"],
          ["pCO2", "↓ (hyperventilation)", "↓ (hyperventilation)"],
          ["HCO3", "Normal to ↓", "↓↓ (metabolic component)"],
          ["Anion Gap", "Normal to mildly ↑", "↑"],
          ["Lactate", "Normal", "May ↑"]
        ]
      }
    },
    {
      type: "warning",
      content: {
        title: "DEATH SPIRAL WARNING — Intubation Risk",
        text: "Salicylate toxicity drives COMPENSATORY tachypnea (respiratory alkalosis). IF respiratory rate drops (sedation, intubation without adequate rate):\n\npH drops rapidly → ionized salicylate distributes into CNS → rapid neurological deterioration and cardiovascular collapse.\n\nMAINTAIN HIGH RESPIRATORY RATE if intubating. If must intubate, target RR to MATCH patient's pre-intubation respiratory rate to maintain current pCO2. Failure to do so causes death spiral."
      }
    },
    {
      type: "heading",
      content: { text: "Treatment of Salicylate Poisoning" }
    },
    {
      type: "checklist",
      content: {
        items: [
          "NaHCO3 — urine alkalinization: ionizes salicylate in urine preventing tubular reabsorption. Target urine pH 7.5–8.0, serum pH >7.45",
          "Aggressive IV hydration",
          "Correct hypokalemia (K+ depletion impairs urine alkalinization)",
          "Dextrose supplementation (CNS glucose may be depleted despite normal serum glucose)",
          "Use NaHCO3 to keep serum pH above 7.5"
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Hemodialysis Indications for Salicylate Toxicity",
        text: "• AMS\n• Pulmonary edema\n• Renal failure\n• pH <7.2\n• Salicylate level >100 mg/dL (acute) or >60 mg/dL (chronic)\n• Clinical deterioration despite treatment"
      }
    },
    {
      type: "heading",
      content: { text: "IMPACT Mnemonic — AGMA Differential" }
    },
    {
      type: "paragraph",
      content: { text: "AGMA top-level categories: Ketones (DKA, starvation ketoacidosis), Uremia (renal failure), Lactate (types A/B1/B2/B3/D), Toxins (IMPACT)." }
    },
    {
      type: "table",
      content: {
        headers: ["Letter", "Toxin(s)"],
        rows: [
          ["I", "Iron and Isoniazid"],
          ["M", "Metformin (and off-market phenformin)"],
          ["P", "Paraldehyde"],
          ["A", "Aspirin (salicylates), Acetaminophen, toxic Alcohols (ethylene glycol, methanol, propylene glycol, isopropyl alcohol), Anti-retrovirals"],
          ["C", "Cyanide (including nitroprusside toxicity), Carbon monoxide"],
          ["T", "Toluene (and Toxic alcohols)"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Three Toxidrome Comparison" }
    },
    {
      type: "table",
      content: {
        headers: ["Feature", "Cholinergic", "Toxic Alcohol", "Salicylism"],
        rows: [
          ["HR", "Bradycardia", "Tachycardia", "Tachycardia"],
          ["RR", "↑ (bronchospasm)", "↑", "↑↑ (prominent, primary)"],
          ["Secretions", "↑↑↑ SLUDGE", "Normal", "Diaphoresis"],
          ["AMS", "GI/secretory dominant", "Agitation, AMS", "AMS, tinnitus"],
          ["pH", "↓ (acidosis)", "↓↓ (severe)", "↑ then ↓ (mixed)"],
          ["Anion Gap", "Variable", "↑↑", "↑ (mild-moderate)"],
          ["HCO3", "↓", "↓↓", "↓"],
          ["OsmGap", "Normal", "↑", "Normal"],
          ["Key feature", "Bradycardia + secretions", "Profound AGMA", "Resp alkalosis + AGMA"]
        ]
      }
    }
  ]
};

// ─── M17.L4 — Therapeutic Adjuncts and Supportive Care in Overdose ─────────────
const m17l4Content = {
  title: "Therapeutic Adjuncts and Supportive Care in Overdose",
  duration_min: 20,
  blocks: [
    {
      type: "heading",
      content: { text: "Arrhythmia Management in Overdose" }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Sodium Bicarbonate — Sodium Channel Blockers",
        text: "Key treatment for arrhythmias from SODIUM CHANNEL BLOCKERS: tricyclic antidepressants, class IA/IC antiarrhythmics, cocaine, diphenhydramine, propranolol.\n\nMechanism: Alkalinization + sodium loading overcomes sodium channel blockade.\nEndpoint: QRS <100ms, hemodynamic improvement.\nDose: 1–2 mEq/kg IV bolus, repeat as needed, then infusion.\n\nSigns of sodium channel blockade: Widened QRS (>100ms), terminal R wave in aVR, RBBB pattern, hypotension, dysrhythmias."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "QT Prolonging Agents — Torsades Risk",
        text: "Offending agents: Antipsychotics, antihistamines, antibiotics (macrolides, fluoroquinolones), antiarrhythmics (sotalol, amiodarone), methadone.\n\nTreatment:\n• Magnesium sulfate 2g IV\n• Discontinue offending agent\n• Correct electrolytes (K+, Mg2+)\n• Overdrive pacing if refractory"
      }
    },
    {
      type: "table",
      content: {
        headers: ["Toxin Class", "Clinical Features", "First-Line Treatment", "Escalation"],
        rows: [
          [
            "Beta-blocker toxicity",
            "Bradycardia, hypotension, AV block",
            "Glucagon (overcomes competitive blockade)",
            "High-dose insulin euglycemia therapy (HIET: insulin 1 unit/kg/hr + dextrose), calcium, lipid emulsion"
          ],
          [
            "Calcium channel blocker toxicity",
            "Bradycardia, hypotension",
            "Calcium chloride or gluconate IV; glucagon",
            "HIET (most effective — insulin improves calcium entry into myocardium), vasopressors, lipid emulsion, VA-ECMO for refractory"
          ]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Vasopressor Selection in Overdose" }
    },
    {
      type: "paragraph",
      content: { text: "Reference: Clifford et al, J Med Toxicol 2021" }
    },
    {
      type: "table",
      content: {
        headers: ["Vasopressor", "Mechanism", "Use", "Avoid When"],
        rows: [
          ["Phenylephrine", "Pure alpha-1 agonist", "Vasodilatory states without bradycardia", "Bradycardia present (causes reflex bradycardia)"],
          ["Norepinephrine", "Alpha + beta", "Good first-line for most overdose hypotension", "—"],
          ["Epinephrine", "Alpha + beta (strong)", "Anaphylaxis, cardiac arrest, severe refractory cases", "Routine first-line"],
          ["Dopamine", "Dopamine/alpha/beta", "Generally avoid in toxicology", "Arrhythmia risk, less predictable dose-response in overdose"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Seizure Management in Overdose" }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "AVOID Phenytoin/Fosphenytoin for Toxin-Induced Seizures",
        text: "Phenytoin/fosphenytoin are LESS EFFECTIVE for toxin-induced seizures and may worsen some toxidromes. Use benzodiazepines first."
      }
    },
    {
      type: "checklist",
      content: {
        items: [
          "Benzodiazepines FIRST (lorazepam, diazepam) — effective for most toxin-induced seizures",
          "Isoniazid (INH) seizures → pyridoxine (B6) IV, gram-for-gram if dose known, or 5g empirically",
          "Organophosphate seizures → benzodiazepines (phenytoin NOT effective)",
          "Tricyclic antidepressant seizures → benzodiazepines + sodium bicarbonate",
          "Propofol or barbiturates for refractory status epilepticus from toxins"
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Enhanced Elimination" }
    },
    {
      type: "table",
      content: {
        headers: ["Method", "Indications", "Key Details"],
        rows: [
          [
            "Activated charcoal",
            "Most ingestions within 1–2h if airway protected",
            "1g/kg (max 50g). Most effective within 1h. Contraindicated: unprotected airway, hydrocarbon, corrosive, bowel obstruction"
          ],
          [
            "Multi-dose activated charcoal (MDAC)",
            "Enterohepatic recirculation drugs",
            "Theophylline, phenobarbital, carbamazepine, dapsone, quinine"
          ],
          [
            "Urinary alkalinization (NaHCO3 infusion)",
            "Weak acid drugs",
            "Salicylates, phenobarbital, chlorpropamide, methotrexate"
          ],
          [
            "Hemodialysis",
            "Severe toxicity with dialyzable toxins",
            "Salicylates, toxic alcohols (ethylene glycol, methanol), lithium, metformin, valproic acid"
          ],
          [
            "Lipid emulsion therapy",
            "Local anesthetic toxicity; refractory lipid-soluble drug toxicity",
            "Bupivacaine (primary). May help: verapamil, diltiazem, TCAs. Dose: 20% lipid emulsion 1.5 mL/kg bolus, then 0.25 mL/kg/min infusion"
          ]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Poison Control Centers",
        text: "1-800-222-1222 (US) — Available 24/7. Invaluable for complex poisoning, unusual agents, and dose guidance. Call early and call often."
      }
    },
    {
      type: "callout",
      content: {
        icon: "tip",
        title: "Key Takeaways",
        text: "• Recognition of toxidrome pattern guides diagnosis and management\n• Cholinergic, toxic alcohol, and salicylate poisonings each have distinct clinical and lab features\n• Effective management = Decontamination + Antidotal therapy + Enhanced elimination + Supportive care\n• When uncertain: call Poison Control (1-800-222-1222)"
      }
    }
  ]
};

// ─── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Fetching M17 lessons from Supabase...');

  const { data: lessons, error: fetchError } = await supabase
    .from('module_lessons')
    .select('id, title')
    .like('title', 'M17.L%')
    .order('order_index');

  if (fetchError) {
    console.error('Error fetching lessons:', fetchError);
    process.exit(1);
  }

  if (!lessons || lessons.length === 0) {
    console.error('No M17 lessons found. Ensure M17 lessons exist in module_lessons.');
    process.exit(1);
  }

  console.log(`Found ${lessons.length} M17 lesson(s):`);
  lessons.forEach(l => console.log(`  - ${l.title} (${l.id})`));

  const contentMap = [m17l1Content, m17l2Content, m17l3Content, m17l4Content];

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const content = contentMap[i];

    if (!content) {
      console.warn(`No content defined for lesson index ${i} (${lesson.title}), skipping.`);
      continue;
    }

    console.log(`\nUpdating: ${lesson.title}...`);

    const { error: updateError } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(content) })
      .eq('id', lesson.id);

    if (updateError) {
      console.error(`  ✗ Error updating ${lesson.title}:`, updateError);
    } else {
      console.log(`  ✓ Successfully updated ${lesson.title}`);
    }
  }

  console.log('\nM17 content population complete.');
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
