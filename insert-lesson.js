const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertLesson() {
  try {
    console.log('🔍 Checking for Module 5...');

    // First, ensure Module 5 exists
    const { data: moduleData, error: moduleError } = await supabase
      .from('curriculum_modules')
      .select('id')
      .eq('name', 'The Neurological Examination')
      .single();

    let moduleId;

    if (moduleError || !moduleData) {
      console.log('📝 Module 5 not found, creating it...');
      const { data: newModule, error: createError } = await supabase
        .from('curriculum_modules')
        .insert({
          name: 'The Neurological Examination',
          description: 'Master the comprehensive neuro exam from foundations to specialized techniques in critical care.',
          category: 'Pathophysiology',
          order_position: 5,
          estimated_hours: 3.0,
        })
        .select()
        .single();

      if (createError) throw createError;
      moduleId = newModule.id;
      console.log('✅ Module 5 created:', moduleId);
    } else {
      moduleId = moduleData.id;
      console.log('✅ Module 5 found:', moduleId);
    }

    // Now insert Lesson 2
    console.log('📝 Inserting Lesson 2...');

    const lessonContent = `# Focused Exam in the Unconscious or Sedated Patient

## Overview
The neurological examination of an unconscious or sedated patient requires modification from the standard awake exam. This lesson focuses on the coma exam—a streamlined, systematic approach to assess the unconscious patient's neurological status.

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
  - 4 = Spontaneous
  - 3 = To verbal command
  - 2 = To pain
  - 1 = No response

- **Verbal Response (V):** 1-5 points
  - 5 = Oriented, converses normally
  - 4 = Disoriented conversation
  - 3 = Inappropriate words
  - 2 = Incomprehensible sounds
  - 1 = No response

- **Motor Response (M):** 1-6 points
  - 6 = Obeys commands
  - 5 = Localizes to pain
  - 4 = Withdraws from pain
  - 3 = Abnormal flexion (decorticate)
  - 2 = Abnormal extension (decerebrate)
  - 1 = No response

**Total GCS = E + V + M (range 3–15)**

---

## Part 2: Brainstem Function

### Pupillary Assessment
- **Size:** Normal 2-4mm
- **Reactivity:** Should constrict briskly to light
- **Symmetry:** Normally equal

**Abnormal patterns:**
- **Pinpoint pupils:** Pontine hemorrhage or opioid overdose
- **Mid-fixed pupils:** Midbrain dysfunction (increased ICP)
- **Blown pupil (one side):** Uncal herniation (medical emergency)
- **Sluggish pupils:** Metabolic encephalopathy

### Brainstem Reflexes
- **Oculocephalic reflex ("Doll's Eyes"):** Eyes move opposite to head turn
- **Corneal reflex:** Touch cornea; both eyes should blink
- **Gag reflex:** Stimulate back of pharynx; should trigger contraction

---

## Part 3: Motor Examination

### Tone Assessment
- **Flaccid:** No resistance to passive movement
- **Normal:** Slight resistance
- **Rigid:** Increased tone throughout
- **Spastic:** Velocity-dependent increase in tone

### Posturing
- **Decorticate (flexor posturing):** Arms flexed, legs extended → cerebral hemispheric injury
- **Decerebrate (extensor posturing):** All extremities extended → midbrain/brainstem injury
- **Flaccid:** No posturing → spinal cord injury

### Motor Response to Pain
Apply nail bed pressure, supraorbital pressure, or sternal rub:
- **Withdrawal:** Limb pulls away (good sign)
- **Posturing:** Indicates injury level
- **No response:** Worst prognostic sign

---

## Part 4: Reflex Assessment

### Deep Tendon Reflexes (DTRs)
- **Brisk:** Upper motor neuron lesion
- **Normal:** Baseline
- **Diminished:** LMN or nerve injury
- **Absent:** Severe LMN injury

### Pathological Reflexes
- **Babinski sign:** Extensor plantar response → UMN lesion
- **Clonus:** Rhythmic jerking → hyperreflexia

---

## Video: Focused Neuro Exam in the Comatose Patient

[Watch this video demonstration of the coma exam](https://youtu.be/YFk3TEgaiTM)

---

## Interpretation: What the Exam Tells You

### GCS and Prognosis
- **GCS 3-5:** Very severe, often irreversible damage
- **GCS 6-8:** Severe, significant morbidity expected
- **GCS 9-12:** Moderate, variable outcomes
- **GCS 13-15:** Mild, generally better prognosis

### Brainstem Signs
- **Intact brainstem:** Pupils reactive, reflexes present → better outcome
- **Brainstem dysfunction:** Pupillary abnormalities, absent reflexes → urgent consult

### Motor Patterns
- **Localizing response:** Better prognosis
- **Decorticate posturing:** Cerebral injury with some brainstem function
- **Decerebrate posturing:** Brainstem injury, worse prognosis
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

Always compare to prior exams and note time of day (sedation wear-off vs. true change).`;

    const { data: lesson, error: lessonError } = await supabase
      .from('module_lessons')
      .insert({
        module_id: moduleId,
        title: 'Focused Exam in the Unconscious or Sedated Patient',
        content_type: 'lecture',
        body: lessonContent,
        order_position: 2,
        estimated_duration_minutes: 20,
      })
      .select()
      .single();

    if (lessonError) throw lessonError;

    console.log('✅ Lesson 2 inserted successfully!');
    console.log('📊 Lesson ID:', lesson.id);
    console.log('\n🎉 Done! Visit http://localhost:3000/modules to see Module 5, Lesson 2');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

insertLesson();
