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
// M05.L1 — Awake Comprehensive Exam
// ─────────────────────────────────────────────────────────────────────────────
const m05l1Content = {
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "The awake neurological exam is both a diagnostic instrument and a communication tool. At BNI/SJHMC, your exam findings drive attending calls, guide imaging decisions, and are the primary record of a patient's neurological trajectory. Precision and reproducibility are non-negotiable. This lesson walks through every domain of the complete awake neuro exam in the NCC context."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Documentation Culture at BNI",
        text: "Document pertinent positives AND pertinent negatives. A note that says 'neuro exam non-focal' tells the attending nothing. A note that says 'alert and oriented ×4, language intact, CN II–XII grossly intact, full strength 5/5 throughout, no drift, sensation intact, reflexes symmetric' communicates a real exam."
      }
    },
    {
      type: "heading",
      content: { text: "Mental Status" }
    },
    {
      type: "paragraph",
      content: {
        text: "Begin every exam here. Mental status is the highest-order function and often the most sensitive indicator of cortical dysfunction. Approach it systematically: level of arousal → orientation → attention → language → memory → higher cognition. Never skip this domain because the patient 'seems fine' — subtle deficits in attention or language are easy to miss without structured testing."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Domain", "Bedside Test", "Normal Response", "Abnormal Patterns"],
        rows: [
          ["Arousal", "Observe spontaneous wakefulness; apply verbal then tactile stimulation", "Awake without stimulation", "Somnolent, obtunded, stuporous, comatose"],
          ["Orientation", "Ask: person, place, date, situation/event", "Correct on all 4", "Time is lost first; person last; disoriented to situation = common in encephalopathy"],
          ["Attention", "Spell WORLD backwards (D-L-R-O-W); serial 7s from 100", "≤1 error", "Serial 7s more sensitive; errors indicate inattention or frontal/global dysfunction"],
          ["Language – Fluency", "Listen to spontaneous speech: rate, prosody, word-finding", "Fluent, normal rate, no paraphasias", "Non-fluent (Broca); fluent with paraphasias (Wernicke)"],
          ["Language – Comprehension", "Follow 1-, 2-, 3-step commands (axial and appendicular)", "Completes 3-step command", "Failure on complex commands → Wernicke's or global aphasia"],
          ["Language – Naming", "Point to 5 objects (pen, watch, fingernail, lapel, knuckle)", "Names all correctly", "Anomia (tip-of-tongue, circumlocution) → cortical or subcortical dysfunction"],
          ["Language – Repetition", "Repeat: 'No ifs, ands, or buts'", "Verbatim repetition", "Failure → conduction aphasia or any aphasia syndrome"],
          ["Language – Reading/Writing", "Read a sentence aloud; write a sentence spontaneously", "Intact", "Alexia without agraphia (dominant occipital); agraphia without alexia (angular gyrus)"],
          ["Memory", "Register 3 words; recall at 5 minutes", "3/3 at 5 min", "<3/3 → anterograde amnesia; hippocampal or diencephalic dysfunction"],
          ["Insight/Judgment", "Do you know why you're in the hospital? What would you do if there was a fire?", "Accurate insight, reasonable judgment", "Anosognosia (denies deficit) → non-dominant parietal; poor judgment → frontal"]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Language Testing in Practice: Tips for the NCC",
        content: "Aphasia testing must use appendicular commands (e.g., 'touch your nose with your left hand') to distinguish comprehension failure from pyramidal weakness. Always test naming with low-frequency items (fingernail, knuckle) not just high-frequency objects — anomia for low-frequency words is the earliest sign. If the patient is intubated or has a tracheostomy, assess comprehension and writing only — document 'verbal output limited by intubation.' In SAH patients, watch for subtle word-finding pauses that may precede clinical deterioration."
      }
    },
    {
      type: "heading",
      content: { text: "Cranial Nerves" }
    },
    {
      type: "paragraph",
      content: {
        text: "A complete cranial nerve exam can be performed in 3–5 minutes at the bedside once you have a system. In the NCC, CN II, III, VI, and VII are the highest-yield nerves — they localize lesions and signal herniation. CN I is typically omitted in the ICU setting unless anosmia is clinically relevant."
      }
    },
    {
      type: "table",
      content: {
        headers: ["CN", "Name", "Bedside Test", "Abnormal Finding & Significance"],
        rows: [
          ["I", "Olfactory", "Typically omitted in NCC (test only if anosmia suspected)", "Anosmia → anterior fossa lesion, cribriform plate fracture"],
          ["II", "Optic", "Visual acuity (read text); visual fields by confrontation (each quadrant); pupillary light reflex (afferent limb)", "Visual field cut → occipital (homonymous hemianopia), optic nerve (monocular); RAPD → optic nerve lesion"],
          ["III", "Oculomotor", "Pupil size/reactivity; upgaze, downgaze, medial gaze; ptosis", "Fixed dilated pupil + down-and-out gaze → uncal herniation or PComm aneurysm; ptosis + medial deviation → CN III palsy"],
          ["IV", "Trochlear", "Downgaze in adducted position; ask about vertical diplopia", "Vertical diplopia worse looking down-and-in → CN IV palsy (often post-traumatic)"],
          ["V", "Trigeminal", "Light touch/pinprick in V1 (forehead), V2 (cheek), V3 (jaw); jaw clench (masseter strength); corneal reflex (afferent limb)", "Facial numbness by distribution; absent corneal afferent → pontine or CN V lesion"],
          ["VI", "Abducens", "Lateral gaze; look for esotropia at rest", "Failure to abduct → CN VI palsy; false localizing sign with elevated ICP"],
          ["VII", "Facial", "Raise eyebrows, close eyes tight, show teeth, puff cheeks", "UMN: lower face weakness, forehead spared; LMN (Bell's): entire ipsilateral face weak"],
          ["VIII", "Vestibulocochlear", "Rub fingers near each ear; whisper test; Weber/Rinne if asymmetry suspected", "Sensorineural vs conductive hearing loss; nystagmus on exam → vestibular component"],
          ["IX/X", "Glossopharyngeal/Vagus", "Watch palate elevation with 'ahh'; gag reflex; voice quality (hoarse/nasal)", "Palate deviates away from lesion; loss of gag + hoarse voice → bulbar or pseudobulbar palsy"],
          ["XI", "Spinal Accessory", "Head turn (SCM) against resistance; shrug (trapezius) against resistance", "Weakness → posterior fossa lesion, jugular foramen syndrome"],
          ["XII", "Hypoglossal", "Protrude tongue; move laterally; observe for fasciculations/atrophy", "Deviation toward side of lesion; atrophy + fasciculations → LMN; deviation without atrophy → UMN"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "UMN vs LMN Facial Weakness — Critical Distinction",
        text: "Upper motor neuron (cortical/subcortical) facial weakness spares the forehead because forehead muscles have bilateral cortical representation. The patient can wrinkle their brow but cannot fully smile or close the lower face. Lower motor neuron (CN VII or facial nerve) weakness involves the entire ipsilateral face including the forehead. In a stroke patient with new facial droop: if forehead is spared → stroke (UMN). If forehead is involved → Bell's palsy or other LMN process."
      }
    },
    {
      type: "heading",
      content: { text: "Motor Exam" }
    },
    {
      type: "paragraph",
      content: {
        text: "Assess tone before testing strength. Then grade each muscle group systematically using the MRC scale. Pronator drift is one of the most sensitive tests for subtle upper extremity weakness — always perform it. Compare proximal vs distal and upper vs lower extremity to identify patterns."
      }
    },
    {
      type: "table",
      content: {
        headers: ["MRC Grade", "Description", "Clinical Equivalent"],
        rows: [
          ["5/5", "Full strength against full resistance", "Normal"],
          ["4/5", "Movement against some resistance but not full", "Mild weakness — functional but detectable"],
          ["3/5", "Movement against gravity only, no resistance overcome", "Cannot resist examiner at all"],
          ["2/5", "Movement possible only with gravity eliminated (tested in plane)", "Very weak"],
          ["1/5", "Visible or palpable muscle contraction, no movement", "Trace contraction"],
          ["0/5", "No contraction", "Complete paralysis"]
        ]
      }
    },
    {
      type: "table",
      content: {
        headers: ["Muscle Group", "Root Level", "Test Maneuver"],
        rows: [
          ["Deltoid (shoulder abduction)", "C5", "Raise arm to 90°; resist downward push"],
          ["Biceps (elbow flexion)", "C5–C6", "Flex elbow; resist extension"],
          ["Triceps (elbow extension)", "C7", "Extend elbow; resist flexion"],
          ["Wrist extensors", "C6–C7", "Extend wrist; resist flexion"],
          ["Grip (finger flexors)", "C8", "Grip 2 fingers; attempt to extract"],
          ["Finger intrinsics/spread", "T1", "Spread fingers; resist adduction"],
          ["Hip flexors (iliopsoas)", "L1–L2", "Raise knee; resist downward push"],
          ["Knee extensors (quadriceps)", "L3–L4", "Extend knee; resist flexion"],
          ["Ankle dorsiflexors ( tibialis anterior)", "L4–L5", "Dorsiflex foot; resist plantarflexion"],
          ["Ankle plantarflexors (gastrocnemius)", "S1–S2", "Plantarflex foot; resist dorsiflex; or heel raises"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Pronator Drift",
        text: "Have the patient extend both arms forward, palms up, eyes closed for 10 seconds. Pronation and downward drift of one arm = positive drift, indicating contralateral upper motor neuron lesion. This is more sensitive than overt weakness testing for subtle corticospinal tract dysfunction. Document as 'positive right pronator drift' — never 'mild weakness' without specifying the test."
      }
    },
    {
      type: "heading",
      content: { text: "Tone Assessment" }
    },
    {
      type: "table",
      content: {
        headers: ["Tone Pattern", "Description", "Localization"],
        rows: [
          ["Normal", "Smooth resistance throughout passive range", "—"],
          ["Spasticity", "Velocity-dependent increase in tone; catch-and-release ('clasp-knife')", "Corticospinal tract (UMN) lesion"],
          ["Rigidity", "Constant resistance throughout range; 'lead-pipe'; may have cogwheeling", "Extrapyramidal (basal ganglia); consider neuroleptic malignant syndrome"],
          ["Hypotonia/Flaccidity", "Absent or markedly reduced resistance", "LMN lesion, cerebellar lesion, acute UMN shock phase"],
          ["Paratonia (gegenhalten)", "Involuntary opposition to passive movement; changes direction with examiner", "Frontal lobe dysfunction; advanced dementia; metabolic encephalopathy"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Coordination" }
    },
    {
      type: "paragraph",
      content: {
        text: "Coordination testing assesses cerebellar function and cerebellar pathways. Perform each test bilaterally and compare. Note that weakness confounds coordination testing — dysmetria due to weakness is not cerebellar. Always correlate with tone and reflexes: cerebellar lesions produce hypotonia and diminished reflexes."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Test", "Instructions", "Abnormal Finding"],
        rows: [
          ["Finger-nose-finger (FNF)", "Patient touches own nose then examiner's moving finger, eyes open", "Dysmetria (past-pointing), intention tremor (worsens near target)"],
          ["Heel-shin (HS)", "Patient slides heel down shin from knee to ankle, eyes open", "Veering off midline; decomposed movement → ipsilateral cerebellar hemisphere"],
          ["Rapid alternating movements (RAM)", "Rapidly pronate/supinate hand on thigh; tap fingers to thumb", "Dysdiadochokinesia → ipsilateral cerebellar hemisphere or frontal lobe"],
          ["Romberg", "Stand feet together, arms at sides; observe 30 sec eyes open, then 30 sec eyes closed", "Positive Romberg (sways/falls with eyes closed only) → proprioceptive (dorsal column) loss; falls with eyes open → cerebellar"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Deep Tendon Reflexes" }
    },
    {
      type: "table",
      content: {
        headers: ["Reflex", "Root Level", "Grading (0–4+)", "Clinical Note"],
        rows: [
          ["Biceps", "C5–C6", "0=absent, 1+=trace, 2+=normal, 3+=brisk, 4+=clonus", "Brachioradialis also C5–C6; compare sides"],
          ["Brachioradialis", "C5–C6", "Same scale", ""],
          ["Triceps", "C7", "Same scale", "Often diminished in C7 radiculopathy"],
          ["Patellar (knee jerk)", "L3–L4", "Same scale", "Absent in femoral neuropathy, L3/L4 radiculopathy, GBS"],
          ["Achilles (ankle jerk)", "S1–S2", "Same scale", "Absent in S1 radiculopathy, peripheral neuropathy; check with patient kneeling on chair if supine exam difficult"],
          ["Plantar (Babinski)", "Corticospinal tract", "Flexor (normal) vs extensor (abnormal)", "Extension + fanning of toes = Babinski sign → UMN lesion; bilateral → bilateral corticospinal tract disease"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Sensory Exam" }
    },
    {
      type: "paragraph",
      content: {
        text: "Test at least two modalities representing different pathways. Light touch and pain/temperature travel via the spinothalamic tract (crosses at spinal cord level). Vibration and proprioception travel via the dorsal columns (crosses in medulla). Testing both allows you to identify dissociated sensory loss, which is highly localizing. Test distal to proximal; if deficit found, map the level."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Modality", "Pathway", "Test Method", "Abnormal Pattern"],
        rows: [
          ["Light touch", "Spinothalamic + dorsal column", "Wisp of cotton or fingertip; ask 'same or different?' bilaterally", "Hemisensory loss → thalamus or cortex; crossed (face vs body) → brainstem"],
          ["Pain/temperature", "Spinothalamic (lateral)", "Sharp end of broken tongue depressor or pinprick; ask 'sharp or dull?'", "Absent below a dermatomal level → spinal cord; contralateral body → thalamus"],
          ["Vibration", "Dorsal column (medial)", "128 Hz tuning fork on bony prominence (DIP, MTP, malleolus, patella, iliac crest)", "Loss at toes first → peripheral neuropathy; loss at a spinal level → cord; bilateral → B12, copper deficiency"],
          ["Proprioception (JPS)", "Dorsal column (medial)", "Hold great toe or index finger by sides; patient eyes closed, say 'up' or 'down'", "Loss → dorsal column dysfunction; pseudoathetosis in hands if severe"],
          ["Graphesthesia/Stereognosis", "Parietal cortex (somatosensory association)", "Write number in palm; place coin in hand", "Cortical sensory loss with intact primary sensation → contralateral parietal lesion"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Gait Assessment" }
    },
    {
      type: "paragraph",
      content: {
        text: "Only assess gait when it is safe to do so — patient must be able to stand, be hemodynamically stable, and not at fall risk without adequate assistance. When assessed, observe: stance width, initiation, stride length, arm swing, cadence, and ability to turn. Have a gait belt and assistant available."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Gait Pattern", "Characteristics", "Localization"],
        rows: [
          ["Hemiplegic", "Circumduction of affected leg; arm held flexed; foot drop possible", "Contralateral corticospinal tract (stroke, hemispheric lesion)"],
          ["Ataxic (cerebellar)", "Wide-based, staggering, lurches toward side of lesion", "Ipsilateral cerebellar hemisphere or vermis (midline → truncal ataxia)"],
          ["Sensory ataxic", "Wide-based; patient watches feet; worsens with eyes closed; positive Romberg", "Dorsal columns or peripheral proprioceptive fibers"],
          ["Parkinsonian", "Shuffling, small steps, reduced arm swing, stooped posture; festination", "Basal ganglia (substantia nigra)"],
          ["Apraxic", "Normal strength and sensation; cannot initiate or sequence steps; 'magnetic gait'", "Bilateral frontal lobes; normal pressure hydrocephalus"],
          ["Steppage", "High foot lift to clear foot drop; slap on landing", "Peroneal nerve, L4/L5 radiculopathy, anterior horn cell"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Reporting the Awake Exam — Template",
        text: "Use this structure in Cerner notes: 'Mental status: Alert and oriented ×4. Language fluent, comprehension intact, naming intact. Attention intact (WORLD backward correct). Memory 3/3 at 5 min. CN: II–XII intact. Pupils 3mm bilaterally, brisk. Motor: 5/5 throughout, no drift. Tone normal. Reflexes 2+ symmetric, flexor plantar. Sensory: intact to light touch and pinprick throughout. Coordination: FNF and HS intact. Gait: deferred [or: normal-based, no ataxia].'"
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M05.L2 — Focused Exam in the Unconscious or Sedated Patient
// ─────────────────────────────────────────────────────────────────────────────
const m05l2Content = {
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "The coma exam is the most critical skill in neurocritical care. You cannot obtain history or cooperation — your exam IS the data. A systematic, reproducible approach is essential for detecting change. This lesson covers the complete focused exam for the unconscious or heavily sedated NCC patient, including GCS, FOUR score, RASS, pupil assessment, eye movements, motor responses, brainstem reflexes, and meningismus."
      }
    },
    {
      type: "callout",
      content: {
        icon: "warning",
        title: "Always Document Sedation Status",
        text: "Every coma exam is interpretable only in the context of sedation. Document: last dose of opioids, benzos, propofol, or dexmedetomidine and the time. A Richmond Agitation-Sedation Scale (RASS) score of –3 on propofol is very different from a natural RASS –3. Failure to document this is one of the most common confounders in NCC communication."
      }
    },
    {
      type: "heading",
      content: { text: "Level of Consciousness: GCS" }
    },
    {
      type: "paragraph",
      content: {
        text: "The Glasgow Coma Scale (GCS) is the universal language of consciousness in the ICU. Score each component independently; report the total AND the subscores (e.g., GCS 8 = E2V2M4). Subscores matter — GCS 8 from E1V1M6 (intact motor) is very different from E2V2M4 (posturing). Never report just the total."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Component", "Response", "Score"],
        rows: [
          ["Eye Opening (E)", "Spontaneous", "4"],
          ["", "To verbal command", "3"],
          ["", "To pain", "2"],
          ["", "None", "1"],
          ["Verbal (V)", "Oriented", "5"],
          ["", "Confused", "4"],
          ["", "Inappropriate words", "3"],
          ["", "Incomprehensible sounds", "2"],
          ["", "None", "1"],
          ["", "Intubated — use 'T' suffix (e.g., GCS 8T)", "1T"],
          ["Motor (M)", "Obeys commands", "6"],
          ["", "Localizes to pain", "5"],
          ["", "Withdrawal from pain", "4"],
          ["", "Flexion posturing (decorticate)", "3"],
          ["", "Extension posturing (decerebrate)", "2"],
          ["", "None", "1"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Level of Consciousness: FOUR Score" }
    },
    {
      type: "paragraph",
      content: {
        text: "The Full Outline of Unresponsiveness (FOUR) score is preferred in many NCCs because it captures brainstem function and breathing patterns that GCS misses — and it does not penalize intubated patients for verbal response. Range: 0–16. Score of 0 = brain death criteria possible."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Domain", "Response", "Score"],
        rows: [
          ["Eye (E)", "Eyelids open + tracking or blinking to command", "4"],
          ["", "Eyelids open, not tracking", "3"],
          ["", "Eyelids closed, open to loud voice", "2"],
          ["", "Eyelids closed, open to pain", "1"],
          ["", "Eyelids remain closed", "0"],
          ["Motor (M)", "Thumbs-up, fist, or peace sign to command", "4"],
          ["", "Localizing to pain", "3"],
          ["", "Flexion to pain", "2"],
          ["", "Extension to pain", "1"],
          ["", "No response or myoclonus", "0"],
          ["Brainstem (B)", "Pupil AND corneal reflexes present", "4"],
          ["", "One pupil wide and fixed", "3"],
          ["", "Pupil OR corneal reflexes absent", "2"],
          ["", "Pupil AND corneal reflexes absent", "1"],
          ["", "Absent pupil, corneal, AND cough reflex", "0"],
          ["Respiration (R)", "Not intubated, regular breathing", "4"],
          ["", "Not intubated, Cheyne-Stokes pattern", "3"],
          ["", "Not intubated, irregular breathing", "2"],
          ["", "Breathes above vent rate", "1"],
          ["", "At vent rate or apneic", "0"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "RASS for Sedated Patients" }
    },
    {
      type: "table",
      content: {
        headers: ["Score", "Term", "Description"],
        rows: [
          ["+4", "Combative", "Overtly combative, violent, immediate danger to staff"],
          ["+3", "Very agitated", "Pulls at tubes, aggressive"],
          ["+2", "Agitated", "Frequent non-purposeful movement, fights ventilator"],
          ["+1", "Restless", "Anxious, but movements not aggressive or vigorous"],
          ["0", "Alert and calm", "—"],
          ["–1", "Drowsy", "Not fully alert; sustained awakening (>10 sec) to voice"],
          ["–2", "Light sedation", "Briefly awakens (<10 sec) with eye contact to voice"],
          ["–3", "Moderate sedation", "Movement or eye opening to voice, but no eye contact"],
          ["–4", "Deep sedation", "No response to voice; movement or eye opening to pain"],
          ["–5", "Unarousable", "No response to voice or pain"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Pupil Examination" }
    },
    {
      type: "paragraph",
      content: {
        text: "Pupil exam is the most critical component of the coma exam. Use a bright penlight in a darkened room. Assess each eye independently: size in mm, symmetry (note difference if >1 mm), and reactivity (brisk, sluggish, or fixed/non-reactive). Always check both eyes for the direct AND consensual response."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Pupil Pattern", "Size", "Reactivity", "Localization / Cause"],
        rows: [
          ["Unilateral fixed dilated ('blown')", "6–8 mm one side", "Fixed ipsilateral; contralateral may be reactive", "Uncal herniation (CN III compression by uncus) — EMERGENCY; also posterior communicating artery aneurysm rupture"],
          ["Bilateral fixed mid-position", "4–6 mm bilateral", "Fixed bilateral", "Midbrain lesion; also atropine, scopolamine toxicity"],
          ["Pinpoint bilateral reactive", "1–2 mm bilateral", "Reactive but tiny", "Pontine lesion (bilateral sympatholysis); opioid toxicity"],
          ["Unilateral miosis + ptosis + anhidrosis", "2–3 mm ipsilateral vs 4–5 mm contralateral", "Both reactive", "Horner syndrome (sympathetic chain disruption); carotid dissection, lateral medullary stroke, apical lung mass, thoracic pathology"],
          ["Bilateral sluggish reactive", "3–5 mm bilateral", "Present but slow", "Metabolic encephalopathy (hepatic, uremic, hypoxic); heavy sedation"],
          ["Physiologic anisocoria", "<1 mm difference", "Both reactive", "Normal variant (up to 20% of population); rule out pathology if new"]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "BLOWN PUPIL = EMERGENCY. A unilateral fixed dilated pupil in a comatose patient is uncal herniation until proven otherwise. Call the attending immediately. Do not wait for CT results to make the call — herniation can cause permanent brainstem injury within minutes."
      }
    },
    {
      type: "heading",
      content: { text: "Eye Movements" }
    },
    {
      type: "paragraph",
      content: {
        text: "In the unconscious patient, spontaneous eye position and reflex eye movements are your window to brainstem integrity. Note resting eye position, any spontaneous movements, and test reflex eye movements if safe."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Finding", "Description", "Significance"],
        rows: [
          ["Conjugate gaze deviation", "Both eyes deviated to one side at rest", "Toward lesion: large hemisphere stroke or seizure focus; away from lesion: contralateral pontine lesion"],
          ["Spontaneous roving eye movements", "Slow, conjugate horizontal movements without fixation", "Intact brainstem pathways; excludes brainstem destruction; common in metabolic coma"],
          ["Ocular bobbing", "Rapid downward then slow return to midline", "Pontine lesion (intrinsic or compressive)"],
          ["Ping-pong gaze", "Conjugate horizontal deviation alternating every 2–3 seconds", "Bilateral cerebral damage, basilar artery occlusion"],
          ["Skew deviation", "One eye higher than the other (vertical misalignment)", "Posterior fossa lesion (cerebellar, brainstem)"],
          ["Nystagmus", "Rhythmic oscillation with fast and slow phase", "Direction of fast phase names nystagmus; peripheral vs central distinguishes ear vs brainstem/cerebellum"]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Oculocephalic Reflex (Doll's Eyes) and Cold Caloric Testing",
        content: "OCULOCEPHALIC REFLEX: Rapidly rotate the head side-to-side while holding eyes open. Normal (intact brainstem): eyes move opposite to head rotation (eyes 'stay in place'). Abnormal: eyes move with head (like painted doll's eyes) → absent reflex → brainstem failure. CONTRAINDICATION: Do NOT perform if cervical spine injury not cleared. COLD CALORIC TESTING (Oculovestibular): Elevate HOB 30°. Confirm tympanic membrane intact. Inject 50 mL ice water into external ear canal. Normal response (intact brainstem): tonic deviation toward cold-water ear, lasting ~1–2 min. No response: brainstem failure at the level of CN VIII/VI/III pathway. Document: 'Oculocephalic reflex intact — eyes deviate conjugately away from direction of head turn' or 'Doll's eyes absent bilaterally.'"
      }
    },
    {
      type: "heading",
      content: { text: "Motor Response to Stimulation" }
    },
    {
      type: "paragraph",
      content: {
        text: "Apply noxious stimuli in a standardized way. Use nail-bed pressure (pen on nail) for limb responses. Use supraorbital notch pressure or sternal rub for assessing best motor response. Observe the response type — not just 'moves' vs 'doesn't move.'"
      }
    },
    {
      type: "table",
      content: {
        headers: ["Motor Response", "Description", "GCS-M", "Localization"],
        rows: [
          ["Obeys commands", "Follows 2-step commands reliably", "6", "Intact cortex and corticospinal tract"],
          ["Localizes", "Moves hand toward stimulus in purposeful way (e.g., toward supraorbital pressure)", "5", "Intact corticospinal tract with impaired consciousness"],
          ["Withdraws", "Flexion away from stimulus without localization; limb pulls back", "4", "Spinal cord + brainstem intact; hemispheric dysfunction"],
          ["Decorticate (flexion) posturing", "Upper extremity flexion, wrist flexion, leg extension; arms drawn to chest", "3", "Bilateral corticospinal lesions above red nucleus (diencephalon, internal capsule)"],
          ["Decerebrate (extension) posturing", "All four extremities extended and internally rotated; neck extended; jaw clenched", "2", "Lesion at or below red nucleus — midbrain or upper pons; very poor prognosis"],
          ["No motor response", "No movement to any stimulus", "1", "Brainstem failure, severe metabolic depression, or spinal cord injury"]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "NEW POSTURING = CALL THE ATTENDING NOW. Whether decorticate or decerebrate, new-onset posturing in a previously localizing patient indicates acute neurological deterioration. This is not a 'watch and reassess' situation — it is an immediate notification event."
      }
    },
    {
      type: "heading",
      content: { text: "Brainstem Reflexes" }
    },
    {
      type: "table",
      content: {
        headers: ["Reflex", "How to Test", "Afferent", "Efferent", "Absent = Level of Dysfunction"],
        rows: [
          ["Pupillary light reflex", "Bright light in each eye; observe direct and consensual response", "CN II (optic)", "CN III (oculomotor)", "Midbrain (CN III nuclear or nerve)"],
          ["Corneal reflex", "Touch limbus of cornea (not conjunctiva) with wisp of cotton; observe blink", "CN V (trigeminal, V1)", "CN VII (facial)", "Pontine lesion; absent CN V or VII"],
          ["Gag reflex", "Stimulate posterior pharynx with tongue depressor or suction catheter tip", "CN IX (glossopharyngeal)", "CN X (vagus)", "Medullary lesion; absent CN IX or X — note: absent gag alone is not a reliable coma indicator"],
          ["Cough reflex", "Deep tracheal suction via ETT; observe cough effort", "Airway afferents → vagus", "Respiratory muscles (phrenic, intercostal)", "Loss of cough reflex = near-complete brainstem failure below midbrain"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Meningismus" }
    },
    {
      type: "paragraph",
      content: {
        text: "In patients who are not intubated and do not have a known cervical spine injury, assess for meningeal signs when SAH or meningitis/encephalitis is on the differential. These tests detect irritation of the meninges and lumbosacral nerve roots."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Sign", "Technique", "Positive Finding", "Significance"],
        rows: [
          ["Nuchal rigidity", "With patient supine, gently attempt passive neck flexion (chin to chest)", "Resistance and pain with flexion", "Meningeal irritation — SAH, meningitis, encephalitis; absent in deep coma"],
          ["Kernig's sign", "Flex hip to 90°; then attempt to extend the knee", "Pain and/or resistance to knee extension >135°", "Lumbosacral nerve root irritation from meningeal inflammation"],
          ["Brudzinski's sign", "Flex the neck; observe lower extremities", "Involuntary hip and knee flexion bilaterally", "Meningeal irritation; more sensitive than Kernig's in bacterial meningitis"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Coma Exam Documentation Template",
        text: "GCS: E_V_M_ = __ (T if intubated). FOUR score: E_M_B_R_ = __. RASS: __. Sedation: [drug, dose, last given]. Pupils: [size] mm L, [size] mm R; [brisk/sluggish/fixed] bilaterally [or asymmetric]. Eyes: [spontaneous movements/gaze preference]. Motor: [localizes/withdraws/posturing/no response] to [nailbed/supraorbital] stimulation [symmetrically/asymmetrically — specify side]. Brainstem: corneal [present/absent] bilaterally; gag [present/absent]; cough [present/absent]. Meningismus: [nuchal rigidity present/absent]; Kernig/Brudzinski [not tested/negative/positive]."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M05.L3 — Serial Trending: Detecting Change and When to Escalate
// ─────────────────────────────────────────────────────────────────────────────
const m05l3Content = {
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "In neurocritical care, no single examination is as valuable as the trend. A patient with a GCS of 8 who was a GCS of 12 four hours ago is a different clinical problem than a patient who has been GCS 8 since admission. Serial examination is how you distinguish stability from deterioration — and it is the primary mechanism by which APPs at BNI identify patients who need immediate intervention."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Core Principle: Trajectory Is the Diagnosis",
        text: "A normal GCS on a single exam is reassuring. A normal GCS that is declining by 2 points each shift is an emergency in progress. Your job is not just to perform the exam — it is to compare it to the last exam, identify the direction of travel, and communicate that trajectory to the team."
      }
    },
    {
      type: "heading",
      content: { text: "What Counts as a Clinically Significant Change" }
    },
    {
      type: "paragraph",
      content: {
        text: "Not all variation between exams represents true neurological change. Fluctuation due to sedation, sleep-wake cycle, pain, or post-ictal state is expected. Distinguish noise from signal by applying defined thresholds:"
      }
    },
    {
      type: "table",
      content: {
        headers: ["Finding", "Threshold for Significance", "Immediate Action Required"],
        rows: [
          ["GCS decline", "Drop of ≥2 points from baseline in any component or total", "Yes — contact attending; recheck in 15 min"],
          ["New focal deficit", "Any new focal finding not present on prior exam (new hemiparesis, new aphasia, new gaze deviation)", "Yes — contact attending immediately"],
          ["Pupil change", "New asymmetry >1 mm, or previously reactive pupil now sluggish or fixed", "Yes — emergency call; may indicate herniation"],
          ["New posturing", "Any new decorticate or decerebrate posturing not previously present", "Yes — emergency call"],
          ["Seizure activity", "Witnessed clinical seizure, or subtle (face twitching, nystagmus, rhythmic limb movement)", "Yes — contact attending; initiate seizure protocol per order set"],
          ["New Cushing's triad", "Hypertension + bradycardia + irregular respiration as cluster", "Yes — emergency; may indicate acute ICP elevation"],
          ["Improvement ≥2 GCS points", "Sustained improvement meriting exam update in chart", "No — document and update attending at next scheduled check-in"]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "NEVER attribute a new neurological change to 'medication effect' without first ruling out a structural cause. Sedation can depress the exam, but sedation does not cause new focal deficits, blown pupils, or posturing. When in doubt — call the attending."
      }
    },
    {
      type: "heading",
      content: { text: "Exam Frequency Standards" }
    },
    {
      type: "table",
      content: {
        headers: ["Patient Status", "Nursing Exam Frequency", "APP/NP Exam Frequency", "Notes"],
        rows: [
          ["Stable NCC admission (monitoring)", "q2h neuro checks", "q4–8h with full exam documentation", "Baseline established within 1h of admission"],
          ["Post-procedure (thrombectomy, coiling, EVD placement)", "q1h × 4h, then q2h", "q4h or per attending order", "More frequent if hemodynamics or exam unstable"],
          ["Active clinical deterioration", "q15–30 min continuous assessment", "At bedside or q1h until stable", "Attending should be called; may need intensivist or neurosurgery"],
          ["Post-ictal or post-seizure", "q1h until return to baseline", "q2h with attention to postictal vs. organic decline", "Document expected recovery curve; escalate if not returning to baseline"],
          ["Intubated/sedated (deep RASS)", "q2h pupil checks minimum", "q4–8h with full brainstem exam", "GCS/FOUR documented every assessment; sedation doses charted"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Trending Pitfalls and Confounders" }
    },
    {
      type: "paragraph",
      content: {
        text: "The following factors can mask neurological deterioration or produce apparent exam changes that are not structural. Always document and account for these before concluding an exam is stable or worsening."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Confounder", "Effect on Exam", "How to Account For It"],
        rows: [
          ["Sedation/opioids", "Depressed GCS, miosis, decreased motor response", "Document drug, dose, and time of last administration; perform exam at trough when possible"],
          ["Post-ictal state", "Decreased arousal, transient focal deficits (Todd's paralysis), confusion lasting minutes to hours", "Document seizure time; expected recovery within 30–60 min; prolonged post-ictal requires escalation"],
          ["Circadian fluctuation", "Many patients worse at night (sundowning) or on awakening", "Compare to prior exam at same time of day when possible; note time of exam"],
          ["Metabolic disturbance", "Hyponatremia, hyperammonemia, hypoglycemia, uremia → global encephalopathy", "Check BMP/glucose/ammonia; correct abnormality and recheck exam"],
          ["Pain/agitation", "Can produce apparent worsening (restlessness, combativeness) mimicking neurological change", "Treat pain/agitation, recheck; do not miss underlying structural cause"],
          ["Hypoxia/hypotension", "Global exam depression", "Check vitals, SpO2; address physiology first; neurological changes during hemodynamic instability require simultaneous escalation"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Escalation Framework" }
    },
    {
      type: "table",
      content: {
        headers: ["Urgency Level", "Trigger", "Action"],
        rows: [
          ["EMERGENCY (immediate call)", "Blown pupil; new posturing; GCS drop ≥4 points; Cushing's triad; witnessed seizure with non-return to baseline", "Call attending NOW via TigerConnect (text + call); activate rapid response if attending unavailable; document time of call"],
          ["URGENT (within 15 minutes)", "GCS drop 2–3 points; new focal deficit; new pupil asymmetry >1 mm", "TigerConnect message to attending with exam findings; prepare patient for imaging; have neuro vitals running q15 min"],
          ["WATCH AND NOTIFY (next rounds or scheduled update)", "Single-point GCS fluctuation with obvious confounder; minor exam variability within expected range; exam improved from prior", "Document in Cerner with time-stamped comparison; communicate at next attending check-in or via non-urgent TigerConnect message"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Documentation Standards for Serial Exams" }
    },
    {
      type: "paragraph",
      content: {
        text: "Every exam note must include: (1) exact time of examination, (2) current GCS/FOUR/RASS with subscores, (3) explicit comparison to prior documented exam ('compared to exam at 14:00, patient was GCS 10T; now GCS 8T — decrement of 2 points'), (4) sedation status at time of exam, (5) what action was taken as a result."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "TigerConnect Message Template for Exam Change",
        text: "Use this structure when notifying attendings: '[Patient name/MRN/room]. [Diagnosis]. Exam change: was [prior exam findings at time]. Now [current exam findings at time]. GCS [prior] → [current]. [Specific change: e.g., new left gaze deviation, right pupil now 5mm sluggish vs 3mm brisk prior]. Sedation: [last dose/time]. Requesting [guidance/order/exam at bedside]. Will continue q1h neuro checks.'"
      }
    },
    {
      type: "heading",
      content: { text: "Clinical Vignettes" }
    },
    {
      type: "case-vignette",
      content: {
        stem: "A 58-year-old woman with right MCA ischemic stroke was admitted to the NCC 18 hours ago. Her admission GCS was 12T (E3V2TM5, intubated for airway protection). She is on propofol 20 mcg/kg/min and fentanyl PRN. At 02:00 you perform your routine exam and find GCS 9T (E2V1TM4 — now extension posturing on left). Her last propofol dose was unchanged. Pupils: right 3mm brisk, left 2mm brisk.",
        role: "NCC APP on overnight shift",
        correct_action: "This is a 3-point GCS drop with new left-sided extension posturing — an emergency. Call the attending immediately via TigerConnect (call, not just text) for a patient with suspected MCA stroke progression or hemorrhagic transformation. Prepare for stat non-contrast CT head. Continue q15-min neuro checks. Do NOT attribute the change to propofol (propofol does not cause new focal posturing). Document exam with timestamps and note time attending was called."
      }
    },
    {
      type: "case-vignette",
      content: {
        stem: "A 72-year-old man with SAH (Hunt-Hess III) is on post-bleed day 6, peak vasospasm window. At 10:00 his nurse calls you: 'He seemed more confused this morning and his right hand seems weaker.' His prior exam (08:00, documented by night APP) was GCS 14, oriented ×3, 5/5 strength throughout. Your exam now shows GCS 12, oriented ×2 (not to date), 4/5 right hand grip, 5/5 elsewhere. No sedation on board.",
        role: "NCC APP on day shift",
        correct_action: "GCS drop of 2 points plus new focal deficit (right hand weakness) in a post-SAH patient on day 6 = vasospasm until proven otherwise. This is an URGENT escalation: notify attending immediately via TigerConnect. Expect orders for stat CT perfusion or CT angiography, possible TCD assessment, and blood pressure augmentation per vasospasm protocol. Do not wait for routine rounds. Document both the 08:00 baseline and your 10:00 findings with exact times and comparison language."
      }
    },
    {
      type: "case-vignette",
      content: {
        stem: "A 45-year-old woman with autoimmune encephalitis (NMDA-R antibody positive) is on day 3 of her NCC admission. She has been fluctuating between GCS 10 and 12 over the past 24 hours with no clear trend. Night nursing calls at 04:30: 'Her GCS is 10 — she was 12 at midnight.' She is not sedated. Vitals stable. Pupils 3mm bilaterally reactive. No new focal findings.",
        role: "NCC APP overnight",
        correct_action: "A 2-point GCS drop triggers your 'urgent' threshold — you should assess the patient at bedside. On assessment, if you confirm GCS 10 with no new focal findings, stable pupils, and no posturing, and this pattern is consistent with her prior 24-hour fluctuation pattern documented in the chart (autoimmune encephalitis commonly fluctuates), this may represent expected disease variability rather than new deterioration. Document your bedside assessment with time, specific findings, comparison to prior documented exams, and a statement of your clinical impression. Notify the attending in a non-urgent message (not an emergency call) and continue q1h neuro checks for the next 2 hours to establish a trend. Key distinction: one point at one time is not a crisis; document the full context."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// M05.L4 — Common Abnormal Findings and Localization
// ─────────────────────────────────────────────────────────────────────────────
const m05l4Content = {
  blocks: [
    {
      type: "paragraph",
      content: {
        text: "Pattern recognition is the core skill that separates an efficient NCC APP from a novice. When you find an abnormal finding, your next step is localization: where in the neuraxis is the lesion that produces this finding? This lesson maps the most common abnormal exam findings in the NCC to their anatomic generators and clinical syndromes."
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Localization Before Imaging",
        text: "Always form your anatomic localization hypothesis before looking at the CT or MRI. This disciplines your thinking, catches incidental findings, and makes you a better communicator with neuroradiology. If your exam says 'left frontal' and CT shows a right parietal lesion, one of them is wrong — figure out which."
      }
    },
    {
      type: "heading",
      content: { text: "Pupil Abnormalities" }
    },
    {
      type: "table",
      content: {
        headers: ["Pattern", "Size", "Reactivity", "Localization", "Common Causes in NCC"],
        rows: [
          ["Unilateral fixed dilated ('blown')", "6–8 mm unilateral", "Fixed ipsilateral; contralateral may be brisk", "Ipsilateral CN III compression (uncal herniation) or posterior communicating artery aneurysm", "Expanding supratentorial mass with transtentorial herniation; ruptured PComm aneurysm"],
          ["Bilateral fixed mid-position", "4–6 mm bilateral", "Fixed bilateral", "Midbrain tegmentum (both sympathetic and parasympathetic pathways)", "Midbrain infarction; severe midbrain compression; some toxins (atropine)"],
          ["Pinpoint bilateral reactive", "1–2 mm bilateral", "Reactive (may need magnification to confirm)", "Bilateral pontine sympathetic fiber disruption OR opioid effect (peripheral)", "Pontine hemorrhage; massive opioid overdose — differentiate with naloxone response"],
          ["Unilateral miosis + ptosis (Horner's)", "2–3 mm ipsilateral", "Both reactive", "Ipsilateral oculosympathetic pathway (hypothalamus → cord → superior cervical ganglion → orbit)", "Carotid dissection (common in NCC); lateral medullary stroke; high cervical cord injury"],
          ["Bilateral sluggish reactive", "3–5 mm bilateral", "Present, sluggish", "Global CNS depression or metabolic", "Heavy sedation; hepatic encephalopathy; uremia; severe hypothyroidism"],
          ["Physiologic anisocoria", "<1 mm difference", "Both reactive bilaterally", "Normal variant", "Confirm it is not new; if new asymmetry → pathological until proven otherwise"]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "A unilateral fixed dilated pupil is a neurosurgical emergency. Time from herniation to irreversible brainstem damage can be measured in minutes. Call the attending immediately. If neurosurgical backup is on-call, they should be notified simultaneously. Prepare for possible emergent osmotherapy (mannitol, hypertonic saline) and neurosurgical intervention."
      }
    },
    {
      type: "heading",
      content: { text: "Gaze Deviation" }
    },
    {
      type: "table",
      content: {
        headers: ["Pattern", "Description", "Localization", "Mechanism"],
        rows: [
          ["Horizontal gaze deviation TOWARD lesion", "Eyes deviate to one side at rest; patient 'looks toward' the lesion", "Ipsilateral frontal lobe (frontal eye field, area 8) or ipsilateral basal ganglia", "Frontal lobe drives contralateral gaze; when destroyed, ipsilateral gaze field unopposed"],
          ["Horizontal gaze deviation AWAY from lesion", "Eyes deviate contralateral to the lesion; patient 'looks away' from the affected side", "Contralateral pontine paramedian reticular formation (PPRF) or CN VI nucleus", "PPRF drives ipsilateral gaze; pontine lesion causes ipsilateral gaze failure, eyes deviate away"],
          ["Seizure gaze deviation", "Eyes deviate away from seizure focus during ictus; toward focus post-ictally", "Irritating frontal lesion (seizure focus)", "Ictal discharge drives contralateral gaze; post-ictal depression → ipsilateral deviation"],
          ["Vertical gaze palsy (upgaze)", "Inability to look up voluntarily; often with convergence-retraction nystagmus (Parinaud syndrome)", "Dorsal midbrain — superior colliculus / posterior commissure", "Thalamic hemorrhage extending dorsally; pineal region mass; hydrocephalus"],
          ["Skew deviation", "One eye higher than the other; vertical misalignment", "Posterior fossa — brainstem or cerebellum", "Disruption of otolith-ocular pathways; common in cerebellar stroke with brainstem involvement"],
          ["Internuclear ophthalmoplegia (INO)", "Ipsilateral medial rectus palsy on lateral gaze with contralateral nystagmus; convergence intact", "Ipsilateral medial longitudinal fasciculus (MLF) in pons", "Multiple sclerosis; brainstem stroke; Wernicke's"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Motor Patterns: UMN vs LMN" }
    },
    {
      type: "table",
      content: {
        headers: ["Feature", "Upper Motor Neuron (UMN)", "Lower Motor Neuron (LMN)"],
        rows: [
          ["Tone", "Increased (spasticity, clasp-knife)", "Decreased (flaccidity)"],
          ["Bulk", "Preserved (minimal atrophy, disuse only)", "Wasting, atrophy"],
          ["Fasciculations", "Absent", "Present (active denervation)"],
          ["Weakness distribution", "Arm extensors > flexors; leg flexors > extensors ('pyramidal' pattern)", "Follows nerve or root distribution; may be diffuse in motor neuron disease"],
          ["Deep tendon reflexes", "Increased (hyperreflexia, clonus)", "Decreased or absent"],
          ["Plantar response", "Extensor (Babinski sign)", "Flexor (normal) or absent"],
          ["Acute phase (cord/brain)", "Flaccid initially ('spinal shock' or 'cerebral shock') — spasticity develops over days to weeks", "Flaccid from onset"],
          ["Examples in NCC", "Hemispheric stroke, SAH with cortical injury, spinal cord compression above conus", "GBS, myasthenic crisis, AIDP, NMJ disease, peripheral nerve injury"]
        ]
      }
    },
    {
      type: "collapsible",
      content: {
        title: "Hemispatial Neglect — Recognition and Testing",
        content: "Neglect is underdiagnosed because patients do not complain of it — they are unaware of their deficit (anosognosia). It is most prominent with large non-dominant (right) parietal lesions. The patient ignores the contralateral (left) half of space. BEDSIDE TESTS: (1) Line bisection — ask patient to mark the center of a horizontal line; neglect patients mark to the right of center. (2) Cancellation task — mark all symbols on a scattered page; neglect patients miss left-sided targets. (3) Clock drawing — patient draws a clock with 12 on top; neglect patients crowd all numbers onto the right side. (4) Extinction — touch both hands simultaneously; patient reports only ipsilateral touch (extinction to double simultaneous stimulation). CLINICAL IMPLICATION: A patient with left-sided neglect after right hemisphere stroke may be discharged and hit their left side on doorframes, fall, or not eat food on the left side of the tray. This is a major functional deficit."
      }
    },
    {
      type: "heading",
      content: { text: "Aphasia Syndromes" }
    },
    {
      type: "paragraph",
      content: {
        text: "Aphasia is a disorder of language (not speech articulation). It always implies a lesion in the dominant hemisphere (left hemisphere in >95% of right-handers; ~70% of left-handers). Distinguish aphasia from dysarthria (normal language, abnormal articulation) and from confusion (disordered thought content, not language processing)."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Aphasia Type", "Fluency", "Comprehension", "Repetition", "Localization", "NCC Context"],
        rows: [
          ["Broca's (expressive)", "Non-fluent, effortful, telegraphic speech", "Relatively intact", "Impaired", "Left inferior frontal gyrus (Broca's area, BA 44/45)", "Anterior MCA territory stroke; patient understands but cannot speak; often frustrating for patient"],
          ["Wernicke's (receptive)", "Fluent but paraphasic (word substitutions, neologisms); may be logorrheic", "Severely impaired", "Impaired", "Left superior temporal gyrus (Wernicke's area, BA 22)", "Posterior MCA territory; patient may not follow commands; can be mistaken for delirium or psychosis"],
          ["Global", "Non-fluent", "Severely impaired", "Impaired", "Large left MCA territory — combined frontal + temporal", "Large hemispheric stroke; severe MCA occlusion; poor prognosis for language recovery"],
          ["Conduction", "Fluent with phonemic paraphasias (sound substitutions)", "Intact", "Severely impaired (disproportionate)", "Arcuate fasciculus connecting Broca's and Wernicke's areas", "Rare in isolation; parietal/posterior frontal lesions"],
          ["Anomic", "Fluent, but frequent word-finding pauses; circumlocution", "Intact", "Intact", "Angular gyrus or diffuse cortical — nonspecific", "Earliest sign of many cortical pathologies; may be only residual deficit after aphasia recovery"],
          ["Transcortical motor", "Non-fluent", "Intact", "Intact (repetition preserved)", "Anterior/superior to Broca's area (supplementary motor area)", "ACA territory stroke; patient can repeat but cannot initiate speech"],
          ["Transcortical sensory", "Fluent with paraphasias", "Impaired", "Intact (echoes examiner)", "Posterior to Wernicke's area (watershed territory)", "Hypoperfusion watershed infarct; may echolalia"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Herniation Syndromes" }
    },
    {
      type: "paragraph",
      content: {
        text: "Herniation is the displacement of brain tissue through rigid compartmental boundaries due to increased intracranial pressure or mass effect. Recognizing the clinical syndrome tells you the level of brainstem compromise and guides intervention urgency."
      }
    },
    {
      type: "table",
      content: {
        headers: ["Syndrome", "Cause", "Clinical Progression", "Key Exam Findings"],
        rows: [
          ["Uncal (transtentorial)", "Expanding supratentorial mass (hemorrhage, edema, tumor) → uncus herniates over tentorial edge", "CN III palsy → ipsilateral fixed dilated pupil → decreased LOC → contralateral hemiplegia → posturing → death", "Ipsilateral blown pupil FIRST; then contralateral motor deficit; Cushing's triad late; rapid progression"],
          ["Central transtentorial", "Bilateral supratentorial mass effect or diffuse cerebral edema → bilateral downward herniation", "Bilateral miosis (symmetric) → then midposition fixed pupils → decorticate → decerebrate → brainstem failure", "Symmetric progression; no early CN III finding; Cheyne-Stokes breathing early; apnea late"],
          ["Upward cerebellar", "Posterior fossa mass (cerebellar hemorrhage/tumor/abscess) → cerebellar tissue pushes upward through tentorium", "Hydrocephalus; upgaze palsy; Parinaud syndrome; rapid deterioration", "Dorsal midbrain compression signs; sudden loss of consciousness"],
          ["Tonsillar (downward cerebellar)", "Posterior fossa mass or foramen magnum obstruction → cerebellar tonsils herniate into foramen magnum", "Neck pain/stiffness → sudden respiratory arrest; may have minimal warning", "Nuchal rigidity; sudden apnea; loss of cough and gag reflex; bradycardia from vagal compression"],
          ["Subfalcine", "Unilateral hemisphere mass → cingulate gyrus herniates under falx cerebri", "ACA compression → leg > arm weakness contralateral; may have urinary incontinence", "Contralateral leg weakness disproportionate to arm; less acute than uncal"]
        ]
      }
    },
    {
      type: "warning",
      content: {
        text: "CUSHING'S TRIAD = Hypertension + Bradycardia + Irregular/Slow Respirations. This is a late and ominous sign of critical ICP elevation and impending brainstem herniation. If you see this cluster: call attending IMMEDIATELY, initiate osmotherapy per protocol, and prepare for emergent neurosurgical intervention. This is not a 'watch-and-wait' finding."
      }
    },
    {
      type: "heading",
      content: { text: "Cerebellar Signs" }
    },
    {
      type: "table",
      content: {
        headers: ["Finding", "Test", "Localization Note"],
        rows: [
          ["Dysmetria", "Finger-nose-finger; heel-shin overshoot or undershoot", "Ipsilateral cerebellar hemisphere (unlike cortical deficits, cerebellar is ipsilateral to lesion)"],
          ["Intention tremor", "Tremor worsens as target approached on FNF", "Dentate nucleus or superior cerebellar peduncle"],
          ["Dysdiadochokinesia", "Irregular, poorly timed RAM or alternating pronation/supination", "Ipsilateral cerebellar hemisphere"],
          ["Nystagmus", "Fast phase toward side of lesion in peripheral; may be direction-changing or vertical in central", "Central nystagmus (direction-changing, vertical) → brainstem/cerebellar; peripheral → labyrinthine"],
          ["Truncal ataxia", "Cannot maintain sitting balance; wide-based stance; positive Romberg (may fall either direction)", "Cerebellar vermis; patients with vermis lesions have midline/gait ataxia with less limb ataxia"],
          ["Ataxic dysarthria", "Scanning speech — irregular rate and volume, slurred, explosive", "Cerebellum or its connections; distinguish from spastic dysarthria (UMN) and flaccid dysarthria (LMN)"],
          ["Hypotonia", "Decreased resistance to passive movement", "Ipsilateral cerebellar hemisphere; often subtle"]
        ]
      }
    },
    {
      type: "heading",
      content: { text: "Meningeal Signs" }
    },
    {
      type: "table",
      content: {
        headers: ["Sign", "Sensitivity (Bacterial Meningitis)", "Sensitivity (SAH)", "Clinical Notes"],
        rows: [
          ["Nuchal rigidity", "~30%", "~70% (onset 3–12h after bleed)", "Absent in deeply comatose patients; most reliable when conscious"],
          ["Kernig's sign", "~5%", "Lower", "Low sensitivity; positive when present is meaningful; test both legs"],
          ["Brudzinski's sign", "~5%", "Lower", "More sensitive than Kernig's in most studies; always test both"],
          ["Jolt accentuation of headache", "~97% (in alert patients)", "Not validated", "Ask patient to rapidly turn head side to side; worsening headache = positive; best screening test in conscious patients"]
        ]
      }
    },
    {
      type: "callout",
      content: {
        icon: "info",
        title: "Absence of Meningeal Signs Does NOT Rule Out Meningitis or SAH",
        text: "Sensitivity of individual meningeal signs is poor. A patient who is immunosuppressed, elderly, or comatose may have bacterial meningitis without neck stiffness. In the NCC, your clinical suspicion and the full clinical picture (fever, headache onset, CSF results) drive the diagnosis — not the presence or absence of Kernig's or Brudzinski's."
      }
    },
    {
      type: "heading",
      content: { text: "Pattern Recognition Vignettes" }
    },
    {
      type: "case-vignette",
      content: {
        stem: "A 61-year-old right-handed man with hypertension presents after sudden-onset 'worst headache of his life' 6 hours ago. CT shows diffuse subarachnoid blood. On your exam: GCS 13 (E3V4M6). He is alert but confused. His speech is fluent and grammatical. He follows 3-step commands. On confrontational naming he substitutes 'that writing thing' for 'pen.' Visual fields full. Right-sided 4/5 grip vs 5/5 left. Right pronator drift. Pupils 3mm bilateral brisk. Right Babinski sign. He denies any weakness.",
        role: "NCC APP evaluating new SAH admission",
        correct_action: "Localization: Left hemisphere dysfunction. The anomia (word-finding difficulty — 'that writing thing' for pen), right-sided hemiparesis (4/5 grip, positive pronator drift), and right Babinski are all consistent with a left hemispheric process. The anosognosia (denies weakness) may reflect some right parietal involvement or simply lack of insight. The fluent aphasia with good comprehension suggests possible early Wernicke involvement or a more posterior insult. This pattern — SAH with left hemisphere focal signs — should prompt: (1) documenting detailed exam as described, (2) alerting attending to focal deficits that may indicate cortical artery vasospasm even at early presentation, (3) consideration of CT angiography to evaluate for vasospasm vs. cortical vessel compromise, and (4) baseline language and motor documentation for serial trending."
      }
    },
    {
      type: "case-vignette",
      content: {
        stem: "A 77-year-old woman admitted with ICH (right basal ganglia, 18 mL) is on hospital day 2. Overnight she became less responsive. Current exam: RASS –1, no sedation on board. Pupils: right 5mm fixed, left 3mm brisk. Eyes deviated right at rest. No blink to threat on the left. Left arm 2/5, left leg 1/5. Right arm 4/5, right leg 4/5. Left arm extension posturing to pain.",
        role: "NCC APP on morning rounds",
        correct_action: "Emergency. Right pupil 5mm fixed = ipsilateral uncal herniation. The right hemisphere ICH has expanded or caused enough mass effect to compress the right uncus against the tentorium, compressing CN III. Supporting findings: right gaze deviation (frontal lobe pushing eyes rightward with large right hemisphere lesion), left hemiplegia (contralateral to lesion), left posturing. Action: Emergency call to attending NOW. Prepare osmotherapy (mannitol or 3% NaCl per protocol). Neurosurgery notification for possible emergent hematoma evacuation or ICP monitor. Stat repeat CT head. Do not waste time — every minute of CN III compression risks permanent midbrain injury. Document exam time of finding and time of attending notification."
      }
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson list
// ─────────────────────────────────────────────────────────────────────────────
const lessons = [
  { title: 'M05.L1 — Awake Comprehensive Exam', content: m05l1Content },
  { title: 'M05.L2 — Focused Exam in the Unconscious or Sedated Patient', content: m05l2Content },
  { title: 'M05.L3 — Serial Trending: Detecting Change and When to Escalate', content: m05l3Content },
  { title: 'M05.L4 — Common Abnormal Findings and Localization', content: m05l4Content },
];

async function populate() {
  console.log('📚 Loading M05 content...\n');
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
      console.log('❌ Update failed:', lesson.title, '—', updateError.message);
      continue;
    }

    console.log('✅', lesson.title, '—', lesson.content.blocks.length, 'blocks');
  }
  console.log('\n✨ Done!');
  process.exit(0);
}

populate().catch(console.error);
