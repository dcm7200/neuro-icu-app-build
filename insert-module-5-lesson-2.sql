-- Insert Module 5: The Neurological Examination (if not exists)
INSERT INTO curriculum_modules (
  name, 
  description, 
  category, 
  order_position, 
  estimated_hours
)
VALUES (
  'The Neurological Examination',
  'Master the comprehensive neuro exam from foundations to specialized techniques in critical care.',
  'Pathophysiology',
  5,
  3.0
)
ON CONFLICT DO NOTHING;

-- Get Module 5 ID
WITH module_5 AS (
  SELECT id FROM curriculum_modules 
  WHERE name = 'The Neurological Examination'
  LIMIT 1
)

-- Insert Lesson 2
INSERT INTO module_lessons (
  module_id,
  title,
  content,
  order_position,
  estimated_minutes
)
SELECT 
  module_5.id,
  'Focused Exam in the Unconscious or Sedated Patient',
  '
# Focused Exam in the Unconscious or Sedated Patient

## Overview
The neurological examination of an unconscious or sedated patient requires modification from the standard awake exam. This lesson focuses on the coma exam—a streamlined, systematic approach to assess the unconscious patient''s neurological status.

## Learning Objectives
- Perform a focused neurological exam in sedated/unconscious patients
- Assess level of consciousness using standardized scales
- Evaluate pupillary function and brainstem reflexes
- Interpret motor and reflex findings
- Recognize patterns that suggest localization of injury

---

## What is the Coma Exam?

The **coma exam** is a streamlined neurological assessment for patients who cannot cooperate or respond to commands. It prioritizes:
- **Consciousness level** (arousal, responsiveness)
- **Brainstem function** (pupils, eye movements, gag reflex)
- **Motor function** (tone, posture, response to stimuli)
- **Reflexes** (deep tendon, pathological)

---

## Part 1: Level of Consciousness

### Glasgow Coma Scale (GCS)
The GCS is the gold standard for documenting consciousness level in comatose patients.

**Three components:**
- **Eye Opening (E):** 1-4 points
- **Verbal Response (V):** 1-5 points
- **Motor Response (M):** 1-6 points

**Total GCS = E + V + M (range 3–15)**

---

## Part 2: Brainstem Function

### Pupillary Assessment
- **Size:** Normal 2-4mm
- **Reactivity:** Should constrict briskly to light
- **Symmetry:** Normally equal

**Abnormal patterns:**
- **Pinpoint pupils:** Pontine hemorrhage or opioid overdose
- **Mid-fixed pupils:** Midbrain dysfunction
- **Blown pupil (one side):** Uncal herniation (emergency)
- **Sluggish pupils:** Metabolic encephalopathy

### Brainstem Reflexes
- **Oculocephalic reflex:** Eyes move opposite to head turn (doll''s eyes)
- **Corneal reflex:** Touch cornea; both eyes should blink
- **Gag reflex:** Stimulate back of pharynx; should trigger contraction

---

## Part 3: Motor Examination

### Tone Assessment
- **Flaccid:** No resistance (spinal shock, severe brainstem injury)
- **Normal:** Slight resistance
- **Rigid:** Increased tone (upper motor neuron involvement)
- **Spastic:** Velocity-dependent increase

### Posturing
- **Decorticate (flexor):** Arms flexed, legs extended → cerebral hemispheric injury
- **Decerebrate (extensor):** All extremities extended → midbrain/brainstem injury
- **Flaccid:** No posturing → spinal cord injury

### Motor Response to Pain
Apply nail bed pressure, supraorbital pressure, or sternal rub:
- Withdrawal → good sign
- Posturing → indicates injury level
- No response → worst prognostic sign

---

## Part 4: Reflex Assessment

### Deep Tendon Reflexes
- **Brisk:** Upper motor neuron lesion
- **Normal:** Baseline
- **Diminished:** LMN or nerve injury
- **Absent:** Severe LMN injury

### Pathological Reflexes
- **Babinski sign:** Extensor plantar response (upgoing toe) → UMN lesion
- **Clonus:** Rhythmic jerking → hyperreflexia

---

## Systematic Approach

1. Stabilize cervical spine (if trauma suspected)
2. Assess responsiveness (verbal stimulation, pain)
3. Check pupils and brainstem reflexes
4. Assess motor function (tone, posturing, pain response)
5. Test reflexes and Babinski
6. Document GCS score

---

## Video: Focused Neuro Exam in the Comatose Patient

[embed type="youtube" url="https://youtu.be/YFk3TEgaiTM"]

---

## Interpretation: What the Exam Tells You

### GCS and Prognosis
- **GCS 3-5:** Very severe, often irreversible damage
- **GCS 6-8:** Severe, significant morbidity
- **GCS 9-12:** Moderate, variable outcomes
- **GCS 13-15:** Mild, generally better prognosis

### Brainstem Signs
- **Intact brainstem:** Pupils reactive, reflexes present
- **Dysfunction:** Pupillary abnormalities, absent reflexes

### Motor Patterns
- **Localizing response:** Better prognosis
- **Decorticate:** Cerebral injury
- **Decerebrate:** Brainstem injury, worse prognosis
- **Flaccid:** Worst prognosis

---

## Key Takeaways

✅ The coma exam is a **simplified, systematic approach** for unconscious patients
✅ **GCS** is the standard for documenting consciousness
✅ **Brainstem signs** help localize injury
✅ **Motor responses** indicate severity and prognosis
✅ **Serial exams matter more** than one-time assessment
✅ **Track changes** and escalate when deteriorating

---

## Clinical Pearl

> What matters most is **trend**. A patient improving from GCS 5 to 7 is encouraging; deterioration from 12 to 10 warrants urgent investigation.

Always compare to prior exams and note time of day.
',
  2,
  20
)
FROM module_5;
