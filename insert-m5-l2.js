require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const lessonContent = `# Focused Exam in the Unconscious or Sedated Patient

## Overview
Master the systematic approach to assessing the comatose or heavily sedated patient.

## Learning Objectives
- Perform structured neurological exam in unconscious patients
- Use Glasgow Coma Scale effectively
- Assess brainstem function
- Interpret motor findings
- Recognize key injury patterns

## What is the Coma Exam?
A streamlined neuro assessment prioritizing:
- Consciousness level
- Brainstem function (pupils, reflexes)
- Motor responses
- Reflex patterns

## Glasgow Coma Scale (GCS)
Gold standard for consciousness documentation.

**Eye Opening (1-4):** Spontaneous, verbal, pain, none
**Verbal Response (1-5):** Oriented, confused, inappropriate, incomprehensible, none
**Motor Response (1-6):** Obeys, localizes, withdraws, decorticate, decerebrate, none

**Total: 3-15**

## Brainstem Assessment
- **Pupils:** Size, reactivity, symmetry
- **Oculocephalic reflex:** Eyes move opposite to head turn (doll's eyes)
- **Corneal reflex:** Both eyes should blink
- **Gag reflex:** Pharyngeal contraction

## Motor Examination
- **Tone:** Flaccid → normal → rigid → spastic
- **Posturing:** 
  - Decorticate: Arms flexed, legs extended (cerebral injury)
  - Decerebrate: All extremities extended (brainstem injury)
- **Pain response:** Localizing, withdrawal, posturing, none

## Prognostic Interpretation
- **GCS 3-5:** Very severe
- **GCS 6-8:** Severe
- **GCS 9-12:** Moderate
- **GCS 13-15:** Mild/better prognosis

## Video Demonstration
Watch the clinical demonstration: https://youtu.be/YFk3TEgaiTM

## Key Clinical Pearls
✅ GCS is the standard for documenting consciousness
✅ Serial exams matter more than single assessments
✅ Brainstem signs help localize injury
✅ Track trends, not individual values
✅ Escalate when deteriorating

---

**Duration:** 20 minutes  
**Type:** Lecture with video demonstration`;

async function insert() {
  try {
    const { data, error } = await supabase
      .from('module_lessons')
      .insert({
        module_id: '00672257-13b2-4e6d-b364-73e3da3dd26c',
        title: 'Focused Exam in the Unconscious or Sedated Patient',
        content: lessonContent,
        lesson_order: 2,
      })
      .select();

    if (error) throw error;

    console.log('✅ Lesson inserted successfully!');
    console.log('📊 Lesson ID:', data[0].id);
    console.log('\n🎉 Visit http://localhost:3000/modules to view');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

insert();
