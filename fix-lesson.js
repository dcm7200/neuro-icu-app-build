require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const lessonContent = JSON.stringify({
  blocks: [
    {
      id: '1',
      type: 'heading',
      content: { text: 'Focused Exam in the Unconscious or Sedated Patient' }
    },
    {
      id: '2',
      type: 'paragraph',
      content: { text: 'Master the systematic approach to assessing the comatose or heavily sedated patient.' }
    },
    {
      id: '3',
      type: 'heading',
      content: { text: 'Learning Objectives' }
    },
    {
      id: '4',
      type: 'checklist',
      content: {
        items: [
          'Perform structured neurological exam in unconscious patients',
          'Use Glasgow Coma Scale effectively',
          'Assess brainstem function',
          'Interpret motor findings',
          'Recognize key injury patterns'
        ]
      }
    },
    {
      id: '5',
      type: 'heading',
      content: { text: 'What is the Coma Exam?' }
    },
    {
      id: '6',
      type: 'callout',
      content: {
        title: 'Streamlined Assessment',
        text: 'A focused neuro assessment prioritizing consciousness level, brainstem function, motor responses, and reflex patterns.'
      }
    },
    {
      id: '7',
      type: 'heading',
      content: { text: 'Glasgow Coma Scale (GCS)' }
    },
    {
      id: '8',
      type: 'paragraph',
      content: { text: 'Gold standard for consciousness documentation. Score ranges from 3-15. Higher scores indicate better prognosis.' }
    },
    {
      id: '9',
      type: 'heading',
      content: { text: 'Brainstem Assessment' }
    },
    {
      id: '10',
      type: 'checklist',
      content: {
        items: [
          'Pupil assessment: Size, reactivity, symmetry',
          'Oculocephalic reflex (doll\'s eyes): Eyes move opposite to head turn',
          'Corneal reflex: Both eyes should blink',
          'Gag reflex: Pharyngeal contraction'
        ]
      }
    },
    {
      id: '11',
      type: 'heading',
      content: { text: 'Motor Examination' }
    },
    {
      id: '12',
      type: 'paragraph',
      content: { text: 'Assess tone, posturing patterns, and pain responses to determine injury severity and localization.' }
    },
    {
      id: '13',
      type: 'heading',
      content: { text: 'Video Demonstration' }
    },
    {
      id: '14',
      type: 'paragraph',
      content: { text: 'Watch this detailed demonstration of the focused neurological exam in a comatose patient: https://youtu.be/YFk3TEgaiTM' }
    },
    {
      id: '15',
      type: 'heading',
      content: { text: 'Key Clinical Pearls' }
    },
    {
      id: '16',
      type: 'callout',
      content: {
        title: 'Remember',
        text: 'GCS is the standard for documenting consciousness. Serial exams matter more than single assessments. Track trends, not individual values. Brainstem signs help localize injury.'
      }
    }
  ]
});

async function updateLesson() {
  try {
    console.log('Updating lesson (removing table, fixing video)...');

    const { data, error } = await supabase
      .from('module_lessons')
      .update({
        content: lessonContent
      })
      .eq('id', '33e318fb-1ce6-4984-bb9d-5a390e4bec24')
      .select();

    if (error) throw error;

    console.log('✅ Lesson updated!');
    console.log('- Removed prognosis table');
    console.log('- Video added as clickable link');
    console.log('🎉 Refresh http://localhost:3000/modules to view changes');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateLesson();
