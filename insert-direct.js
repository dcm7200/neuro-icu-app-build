const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://onrdlphtuditorofccna.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ucmRscGh0dWRpdG9yb2ZjY25hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODgxMDM1NywiZXhwIjoyMDk0Mzg2MzU3fQ.DGfIeydQk-hPHv3ORlQ1FmG-4eXHlR6E9vT4lAzk9B5o';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertLesson() {
  try {
    console.log('🔍 Checking for Module 5...');

    // Check if module exists
    let { data: modules, error: checkError } = await supabase
      .from('curriculum_modules')
      .select('id')
      .eq('name', 'The Neurological Examination')
      .limit(1);

    let moduleId;

    if (!modules || modules.length === 0) {
      console.log('📝 Creating Module 5...');
      const { data: newModule, error: createError } = await supabase
        .from('curriculum_modules')
        .insert({
          name: 'The Neurological Examination',
          description: 'Master the comprehensive neuro exam from foundations to specialized techniques in critical care.',
          category: 'Pathophysiology',
          order_position: 5,
          estimated_hours: 3.0,
          is_required: true,
        })
        .select();

      if (createError) {
        console.error('Error creating module:', createError);
        throw createError;
      }
      moduleId = newModule[0].id;
      console.log('✅ Module 5 created:', moduleId);
    } else {
      moduleId = modules[0].id;
      console.log('✅ Module 5 found:', moduleId);
    }

    // Insert lesson
    console.log('📝 Inserting Lesson 2...');

    const lessonContent = `# Focused Exam in the Unconscious or Sedated Patient

## Overview
The neurological examination of an unconscious or sedated patient requires modification from the standard awake exam. This lesson focuses on the coma exam.

## Learning Objectives
- Perform a focused neurological exam in sedated/unconscious patients
- Assess level of consciousness using standardized scales
- Evaluate pupillary function and brainstem reflexes
- Interpret motor and reflex findings

## What is the Coma Exam?
The **coma exam** is a streamlined assessment for unconscious patients prioritizing:
- Consciousness level (arousal, responsiveness)
- Brainstem function (pupils, eye movements, gag reflex)
- Motor function (tone, posture, response to stimuli)
- Reflexes (deep tendon, pathological)

## Part 1: Glasgow Coma Scale (GCS)
The GCS is the gold standard for documenting consciousness in comatose patients.

**Eye Opening (E):** 1-4 points
- 4 = Spontaneous
- 3 = To verbal command
- 2 = To pain
- 1 = No response

**Verbal Response (V):** 1-5 points
- 5 = Oriented
- 4 = Disoriented
- 3 = Inappropriate words
- 2 = Incomprehensible sounds
- 1 = No response

**Motor Response (M):** 1-6 points
- 6 = Obeys commands
- 5 = Localizes to pain
- 4 = Withdraws from pain
- 3 = Decorticate posturing
- 2 = Decerebrate posturing
- 1 = No response

**Total GCS = E + V + M (3–15)**

## Part 2: Brainstem Function

### Pupillary Assessment
- Size: Normal 2-4mm
- Reactivity: Should constrict briskly to light
- Symmetry: Normally equal

Abnormal patterns:
- Pinpoint pupils: Pontine hemorrhage
- Mid-fixed pupils: Midbrain dysfunction
- Blown pupil (one side): Uncal herniation (emergency)

### Brainstem Reflexes
- Oculocephalic reflex (Doll's Eyes): Eyes move opposite to head
- Corneal reflex: Both eyes should blink
- Gag reflex: Pharyngeal contraction

## Part 3: Motor Examination

### Tone Assessment
- Flaccid: No resistance
- Normal: Slight resistance
- Rigid: Increased tone
- Spastic: Velocity-dependent increase

### Posturing
- Decorticate: Arms flexed, legs extended → cerebral injury
- Decerebrate: All extremities extended → brainstem injury
- Flaccid: Worst prognosis

## Part 4: Reflexes

Deep Tendon Reflexes:
- Brisk: Upper motor neuron lesion
- Normal: Baseline
- Diminished: LMN injury
- Absent: Severe LMN injury

Pathological:
- Babinski sign: Extensor plantar response
- Clonus: Rhythmic jerking

## GCS and Prognosis
- GCS 3-5: Very severe
- GCS 6-8: Severe
- GCS 9-12: Moderate
- GCS 13-15: Mild, better prognosis

## Video
Watch the focused neuro exam demonstration: https://youtu.be/YFk3TEgaiTM

## Key Takeaways
✅ Coma exam is simplified and systematic
✅ GCS is the standard for consciousness
✅ Brainstem signs help localize injury
✅ Motor responses indicate severity
✅ Serial exams matter more than one-time
✅ Track changes and escalate when needed`;

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
      .select();

    if (lessonError) {
      console.error('Error creating lesson:', lessonError);
      throw lessonError;
    }

    console.log('✅ Lesson 2 inserted successfully!');
    console.log('📊 Lesson ID:', lesson[0].id);
    console.log('\n🎉 Done! Visit http://localhost:3000/modules to see Module 5');

  } catch (error) {
    console.error('❌ Error:', error.message || error);
    process.exit(1);
  }
}

insertLesson();
