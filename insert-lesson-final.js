require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Using Supabase URL:', supabaseUrl);
console.log('Service key exists:', !!supabaseServiceKey);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertLesson() {
  try {
    console.log('🔍 Checking for Module 5...');

    // Check if module exists
    let { data: modules, error: checkError } = await supabase
      .from('curriculum_modules')
      .select('id')
      .eq('name', 'The Neurological Examination');

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
        })
        .select();

      if (createError) throw createError;
      moduleId = newModule[0].id;
      console.log('✅ Module 5 created:', moduleId);
    } else {
      moduleId = modules[0].id;
      console.log('✅ Module 5 found:', moduleId);
    }

    // Insert lesson
    console.log('📝 Inserting Lesson 2...');

    const lessonContent = `# Focused Exam in the Unconscious or Sedated Patient

Master the systematic approach to assessing comatose patients.

## Overview
The coma exam is a streamlined neurological assessment for unconscious patients.

## Learning Objectives
- Perform a focused neuro exam in sedated/unconscious patients
- Assess consciousness using Glasgow Coma Scale
- Evaluate brainstem reflexes
- Interpret motor findings
- Recognize injury patterns

## Glasgow Coma Scale (GCS)
The gold standard for documenting consciousness:

**Eye Opening (E):** 1-4  
**Verbal Response (V):** 1-5  
**Motor Response (M):** 1-6  

Total GCS = E + V + M (3–15)

## Brainstem Reflexes
- Pupils: Size, reactivity, symmetry
- Oculocephalic (Doll's Eyes): Eyes move opposite to head
- Corneal: Both eyes should blink
- Gag: Pharyngeal contraction

## Motor Exam
- Tone: Flaccid, normal, rigid, spastic
- Posturing: Decorticate vs decerebrate
- Pain response: Localizing, withdrawal, posturing

## Video: Focused Neuro Exam in Comatose Patient
https://youtu.be/YFk3TEgaiTM

## Key Points
✅ GCS is standard for consciousness  
✅ Brainstem signs localize injury  
✅ Serial exams show trends  
✅ Escalate when deteriorating`;

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

    if (lessonError) throw lessonError;

    console.log('✅ Lesson 2 inserted!');
    console.log('📊 Lesson ID:', lesson[0].id);
    console.log('\n🎉 Visit http://localhost:3000/modules to view');

  } catch (error) {
    console.error('❌ Error:', error.message || error);
    process.exit(1);
  }
}

insertLesson();
