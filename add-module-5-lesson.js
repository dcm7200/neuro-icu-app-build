require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addLesson() {
  try {
    console.log('🔍 Finding Module 5...');

    // Get Module 5 (it already exists)
    const { data: modules, error } = await supabase
      .from('curriculum_modules')
      .select('id')
      .eq('order_index', 5)
      .single();

    if (error || !modules) {
      console.error('❌ Could not find Module 5');
      process.exit(1);
    }

    const moduleId = modules.id;
    console.log('✅ Module 5 found:', moduleId);

    // Check what columns module_lessons actually has
    console.log('\n🔍 Checking module_lessons table structure...');
    const { data: sampleLesson } = await supabase
      .from('module_lessons')
      .select('*')
      .limit(1);

    if (sampleLesson && sampleLesson.length > 0) {
      console.log('Sample lesson structure:', Object.keys(sampleLesson[0]));
    }

    // Insert the lesson with correct column names
    console.log('\n📝 Inserting Lesson 2...');

    const lessonData = {
      module_id: moduleId,
      lesson_number: 2,
      title: 'Focused Exam in the Unconscious or Sedated Patient',
      description: 'Systematic approach to coma examination, Glasgow Coma Scale, brainstem reflexes, motor assessment',
      body: `# Focused Exam in the Unconscious or Sedated Patient

## Lesson Overview
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

**Eye Opening (1-4):** Spontaneous, command, pain, none  
**Verbal Response (1-5):** Oriented, confused, inappropriate, incomprehensible, none  
**Motor Response (1-6):** Obeys, localizes, withdraws, decorticate, decerebrate, none  

**Total: 3-15**

## Brainstem Assessment
- Pupil size, reactivity, symmetry
- Oculocephalic reflex (doll's eyes)
- Corneal reflex
- Gag reflex

## Motor Examination
- Tone: Flaccid → normal → rigid → spastic
- Posturing: Decorticate vs decerebrate
- Pain response levels

## Key Prognostic Signs
- GCS 3-5: Severe
- GCS 6-8: Severe
- GCS 9-12: Moderate
- GCS 13-15: Better

## Video Demonstration
https://youtu.be/YFk3TEgaiTM

## Clinical Pearls
✅ GCS is the standard
✅ Serial exams matter
✅ Brainstem signs localize injury
✅ Track trends, not single exams`,
      content_type: 'lecture',
      order_index: 2,
      estimated_minutes: 20,
    };

    const { data: lesson, error: insertError } = await supabase
      .from('module_lessons')
      .insert(lessonData)
      .select();

    if (insertError) {
      console.error('❌ Insert error:', insertError);
      // Try without some optional fields
      const { data: lesson2, error: insertError2 } = await supabase
        .from('module_lessons')
        .insert({
          module_id: moduleId,
          title: 'Focused Exam in the Unconscious or Sedated Patient',
          body: lessonData.body,
          content_type: 'lecture',
          order_index: 2,
        })
        .select();

      if (insertError2) {
        console.error('❌ Retry failed:', insertError2);
        process.exit(1);
      }
      console.log('✅ Lesson inserted (simplified)');
      console.log('📊 Lesson ID:', lesson2[0].id);
    } else {
      console.log('✅ Lesson 2 inserted successfully!');
      console.log('📊 Lesson ID:', lesson[0].id);
    }

    console.log('\n🎉 Done! Visit http://localhost:3000/modules to view Module 5');

  } catch (error) {
    console.error('❌ Error:', error.message || error);
    process.exit(1);
  }
}

addLesson();
