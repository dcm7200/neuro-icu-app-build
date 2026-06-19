-- Seed Foundation Modules with Lessons and Quizzes
-- This script creates Foundation Modules 1-4 with lessons and quizzes

-- Module 1: NCC Orientation & Role Expectations
INSERT INTO curriculum_modules (id, name, description, category, estimated_hours, order_position, created_at, updated_at)
VALUES (
  'mod-101',
  'NCC Orientation & Role Expectations',
  'Learn about your role at the Neuro ICU and facility orientation',
  'Foundation',
  2,
  1,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Lessons for Module 1
INSERT INTO module_lessons (id, module_id, title, body, content_type, order_position, estimated_duration_minutes, created_at, updated_at)
VALUES
  ('les-101-01', 'mod-101', 'Role Overview', '# Your Role in the Neuro ICU

## Welcome
As a member of the Neuro ICU team, you are critical to patient care and safety. This module covers your role expectations and key responsibilities.

## Role Definition
The Neuro ICU serves patients with acute neurological conditions including:
- Traumatic Brain Injury (TBI)
- Aneurysmal Subarachnoid Hemorrhage (aSAH)
- Stroke
- Seizure Disorders
- Post-operative neurosurgical patients

## Your Responsibilities
1. Patient monitoring and assessment
2. Medication administration and management
3. Documentation and communication
4. Safety and infection control
5. Team collaboration

## Standards
- Always follow hospital protocols
- Ask questions when unsure
- Report safety concerns immediately
- Maintain patient confidentiality', 'lesson', 1, 15, NOW(), NOW()),
  ('les-101-02', 'mod-101', 'Key Responsibilities', '# Key Responsibilities

## Clinical Duties
- Continuous patient monitoring
- Vital signs assessment every 1-2 hours
- Medication administration (with verification)
- IV management and infusion monitoring
- Documentation of all interventions

## Safety First
- Always verify patient identity before treatment
- Double-check high-risk medications
- Report adverse events immediately
- Maintain sterile technique for procedures

## Communication
- Daily handoff reports
- Escalation of acute changes
- Family communication support
- Multidisciplinary team rounds', 'lesson', 2, 12, NOW(), NOW());

-- Quiz for Module 1
INSERT INTO quizzes (id, module_id, title, description, passing_score, max_attempts, created_at, updated_at)
VALUES (
  'quiz-101',
  'mod-101',
  'NCC Orientation Quiz',
  'Test your understanding of roles and responsibilities',
  80,
  3,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Questions for Module 1 Quiz
INSERT INTO quiz_questions (id, quiz_id, question_text, feedback_text, order_position, created_at, updated_at)
VALUES
  ('q-101-01', 'quiz-101', 'Which of the following is NOT a primary condition treated in the Neuro ICU?', 'The Neuro ICU specializes in acute neurological conditions. Pneumonia is typically treated in general ICU settings.', 1, NOW(), NOW()),
  ('q-101-02', 'quiz-101', 'How often should vital signs typically be assessed in the Neuro ICU?', 'Neurological patients require frequent vital sign monitoring to detect changes early. Every 1-2 hours is standard practice.', 2, NOW(), NOW()),
  ('q-101-03', 'quiz-101', 'What should you do if you are unsure about a medication dose?', 'Patient safety comes first. Always verify medications with a colleague or pharmacist before administration.', 3, NOW(), NOW()),
  ('q-101-04', 'quiz-101', 'Which safety practice is most critical when administering medications?', 'Double verification ensures medications are correct, safeguarding patient welfare.', 4, NOW(), NOW());

-- Options for Q1
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-101-01-a', 'q-101-01', 'Traumatic Brain Injury', false, 1, NOW(), NOW()),
  ('opt-101-01-b', 'q-101-01', 'Community-acquired pneumonia', true, 2, NOW(), NOW()),
  ('opt-101-01-c', 'q-101-01', 'Aneurysmal Subarachnoid Hemorrhage', false, 3, NOW(), NOW()),
  ('opt-101-01-d', 'q-101-01', 'Post-operative neurosurgical patients', false, 4, NOW(), NOW());

-- Options for Q2
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-101-02-a', 'q-101-02', 'Every 4 hours', false, 1, NOW(), NOW()),
  ('opt-101-02-b', 'q-101-02', 'Every 1-2 hours', true, 2, NOW(), NOW()),
  ('opt-101-02-c', 'q-101-02', 'Once per shift', false, 3, NOW(), NOW()),
  ('opt-101-02-d', 'q-101-02', 'Only when patient reports symptoms', false, 4, NOW(), NOW());

-- Options for Q3
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-101-03-a', 'q-101-03', 'Ask a colleague or pharmacist to verify', true, 1, NOW(), NOW()),
  ('opt-101-03-b', 'q-101-03', 'Administer a lower dose to be safe', false, 2, NOW(), NOW()),
  ('opt-101-03-c', 'q-101-03', 'Ask the patient what they usually take', false, 3, NOW(), NOW()),
  ('opt-101-03-d', 'q-101-03', 'Wait for the physician to round', false, 4, NOW(), NOW());

-- Options for Q4
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-101-04-a', 'q-101-04', 'Double-check medication with a colleague', true, 1, NOW(), NOW()),
  ('opt-101-04-b', 'q-101-04', 'Verify patient is awake', false, 2, NOW(), NOW()),
  ('opt-101-04-c', 'q-101-04', 'Check if family consented', false, 3, NOW(), NOW()),
  ('opt-101-04-d', 'q-101-04', 'Confirm medication is FDA-approved', false, 4, NOW(), NOW());

-- Module 2: Clinical Assessment & Vital Signs
INSERT INTO curriculum_modules (id, name, description, category, estimated_hours, order_position, created_at, updated_at)
VALUES (
  'mod-102',
  'Clinical Assessment & Vital Signs',
  'Master vital signs interpretation and trending in neurological patients',
  'Foundation',
  2.5,
  2,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Lessons for Module 2
INSERT INTO module_lessons (id, module_id, title, body, content_type, order_position, estimated_duration_minutes, created_at, updated_at)
VALUES
  ('les-102-01', 'mod-102', 'Vital Signs Interpretation', '# Vital Signs in Neuro Patients

## Key Vital Signs
- **Temperature**: Normal 36.5-37.5°C. Fever may indicate infection; hypothermia can worsen outcomes
- **Heart Rate**: Normal 60-100 bpm. Bradycardia or tachycardia may indicate neurological change
- **Blood Pressure**: Maintain target based on diagnosis. See module on ICP management
- **Respiratory Rate**: Normal 12-20. Changes suggest neurological decline
- **SpO2**: Maintain >94%. Hypoxia worsens brain injury

## Neuro-Specific Concerns
- **Autonomic dysreflexia**: Sudden spike in BP with reflex bradycardia
- **Bradycardia**: May indicate increased ICP
- **Hypertension**: Response to pain, increased ICP, or central cause
- **Temperature control**: Fever increases metabolic demand', 'lesson', 1, 18, NOW(), NOW()),
  ('les-102-02', 'mod-102', 'Trending Over Time', '# Understanding Vital Sign Trends

## Why Trends Matter
Individual vital signs are snapshots; trends show the bigger picture.

## Red Flags
- Progressive increase in systolic BP (>180)
- Gradual decline in heart rate below 50
- Sustained temperature >38.5°C
- Declining SpO2 trend despite supplemental oxygen
- Respiratory depression (RR <10)

## Documentation
Record vitals every 1-2 hours. Note:
- Time and values
- Context (medication, activity, patient response)
- Any acute changes
- Interventions performed

## When to Escalate
- Any significant change from baseline
- Sustained abnormalities
- Patient symptomatic with vital sign change
- Concern for deterioration', 'lesson', 2, 15, NOW(), NOW());

-- Quiz for Module 2
INSERT INTO quizzes (id, module_id, title, description, passing_score, max_attempts, created_at, updated_at)
VALUES (
  'quiz-102',
  'mod-102',
  'Vital Signs Assessment Quiz',
  'Test your ability to interpret vital signs in neuro patients',
  80,
  3,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Questions for Module 2 Quiz  
INSERT INTO quiz_questions (id, quiz_id, question_text, feedback_text, order_position, created_at, updated_at)
VALUES
  ('q-102-01', 'quiz-102', 'A patient shows sudden hypertension (180/100) with bradycardia (48 bpm). What may this indicate?', 'This combination is classic for autonomic dysreflexia or increased intracranial pressure. Report immediately.', 1, NOW(), NOW()),
  ('q-102-02', 'quiz-102', 'What is a safe minimum oxygen saturation in neuro patients?', 'Hypoxia (SpO2 <94%) can worsen brain injury and must be prevented in neuro patients.', 2, NOW(), NOW()),
  ('q-102-03', 'quiz-102', 'A neuro patient develops a fever of 38.8°C. Why is this concerning?', 'Fever increases metabolic demand and can worsen neurological outcomes in brain-injured patients.', 3, NOW(), NOW());

-- Options for Q1
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-102-01-a', 'q-102-01', 'Autonomic dysreflexia or increased ICP', true, 1, NOW(), NOW()),
  ('opt-102-01-b', 'q-102-01', 'Normal variation in vitals', false, 2, NOW(), NOW()),
  ('opt-102-01-c', 'q-102-01', 'Anxiety response', false, 3, NOW(), NOW()),
  ('opt-102-01-d', 'q-102-01', 'Medication side effect', false, 4, NOW(), NOW());

-- Options for Q2
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-102-02-a', 'q-102-02', 'SpO2 >90%', false, 1, NOW(), NOW()),
  ('opt-102-02-b', 'q-102-02', 'SpO2 >94%', true, 2, NOW(), NOW()),
  ('opt-102-02-c', 'q-102-02', 'SpO2 >85%', false, 3, NOW(), NOW()),
  ('opt-102-02-d', 'q-102-02', 'Any SpO2 on room air', false, 4, NOW(), NOW());

-- Options for Q3
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-102-03-a', 'q-102-03', 'Increases metabolic demand and worsens outcomes', true, 1, NOW(), NOW()),
  ('opt-102-03-b', 'q-102-03', 'Usually beneficial for brain healing', false, 2, NOW(), NOW()),
  ('opt-102-03-c', 'q-102-03', 'Only matters if >40°C', false, 3, NOW(), NOW()),
  ('opt-102-03-d', 'q-102-03', 'Should be treated only if symptomatic', false, 4, NOW(), NOW());

-- Module 3: Neuro Exam Mastery
INSERT INTO curriculum_modules (id, name, description, category, estimated_hours, order_position, created_at, updated_at)
VALUES (
  'mod-103',
  'Neuro Exam Mastery',
  'Master the neurological assessment including GCS, motor, and sensory exams',
  'Foundation',
  3,
  3,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Lessons for Module 3
INSERT INTO module_lessons (id, module_id, title, body, content_type, order_position, estimated_duration_minutes, created_at, updated_at)
VALUES
  ('les-103-01', 'mod-103', 'GCS Scoring', '# Glasgow Coma Scale (GCS)

## Purpose
The GCS is the most important assessment in neuro patients. It measures level of consciousness.

## Components
### Eye Opening (E) - 4 points
- 4: Spontaneous
- 3: To verbal stimuli
- 2: To pain
- 1: No response

### Verbal Response (V) - 5 points
- 5: Oriented and conversant
- 4: Disoriented but conversant
- 3: Inappropriate words
- 2: Incomprehensible sounds
- 1: No response

### Motor Response (M) - 6 points
- 6: Obeys commands
- 5: Localizes to pain
- 4: Withdraws from pain
- 3: Flexor posturing (decorticate)
- 2: Extensor posturing (decerebrate)
- 1: No response

## Total Score
Minimum: 3 (eyes=1, verbal=1, motor=1)
Maximum: 15 (full alertness and orientation)

## Severity
- GCS 13-15: Mild
- GCS 9-12: Moderate
- GCS 3-8: Severe (often intubated)', 'lesson', 1, 20, NOW(), NOW()),
  ('les-103-02', 'mod-103', 'Motor & Sensory Assessment', '# Motor and Sensory Examination

## Motor Assessment
### Strength Grading (0-5 scale)
- 5: Normal strength against resistance
- 4: Weak but against resistance
- 3: Against gravity only
- 2: Passive motion
- 1: Muscle flicker
- 0: No movement

### Test Major Muscle Groups
- Shoulder abduction and flexion
- Elbow flexion and extension
- Wrist flexion and extension
- Grip strength
- Hip flexion and abduction
- Knee flexion and extension
- Ankle dorsiflexion and plantarflexion

## Sensory Assessment
Test in all extremities:
- Light touch
- Pinprick (pain)
- Temperature (if indicated)
- Proprioception (joint position)
- Vibration sense

## Abnormal Findings
- **Hemiparesis**: Weakness on one side (suggest stroke)
- **Quadriparesis**: All four limbs weak
- **Sensory level**: Spinal cord involvement
- **Crossed signs**: Opposite side sensory/motor loss (brainstem)', 'lesson', 2, 18, NOW(), NOW()),
  ('les-103-03', 'mod-103', 'Cranial Nerve Exam', '# Cranial Nerve Examination

## CN II (Optic Nerve) - Vision
- Assess visual fields
- Check pupil reactivity

## CN III, IV, VI (Oculomotor, Trochlear, Abducens)
- Test eye movements in all directions
- Check for nystagmus
- Assessment of pupils (size, reactivity, symmetry)

## CN V (Trigeminal) - Facial Sensation
- Test facial sensation to touch and pinprick
- Check corneal reflex

## CN VII (Facial) - Facial Movement
- Check for facial droop
- Test forehead wrinkling, eye closure, smile

## CN VIII (Vestibulocochlear) - Hearing
- Whisper test or Weber/Rinne
- Assess for dizziness

## CN IX, X (Glossopharyngeal, Vagus)
- Listen to voice quality
- Check gag reflex
- Assess swallowing ability

## CN XI (Accessory) - Shoulder Shrug
- Assess shoulder elevation bilaterally

## CN XII (Hypoglossal) - Tongue
- Check tongue protrusion for deviation
- Check for atrophy or fasciculations', 'lesson', 3, 15, NOW(), NOW());

-- Quiz for Module 3
INSERT INTO quizzes (id, module_id, title, description, passing_score, max_attempts, created_at, updated_at)
VALUES (
  'quiz-103',
  'mod-103',
  'Neurological Exam Quiz',
  'Test your understanding of neuro assessment',
  80,
  3,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Questions for Module 3 Quiz
INSERT INTO quiz_questions (id, quiz_id, question_text, feedback_text, order_position, created_at, updated_at)
VALUES
  ('q-103-01', 'quiz-103', 'A patient is oriented, opening eyes spontaneously, and following commands. What is their approximate GCS score?', 'Spontaneous eye opening (4) + oriented (5) + obeying commands (6) = GCS 15, indicating full alertness.', 1, NOW(), NOW()),
  ('q-103-02', 'quiz-103', 'What does a GCS score of 3-8 typically indicate?', 'GCS 3-8 is severe and usually indicates the patient needs airway protection.', 2, NOW(), NOW()),
  ('q-103-03', 'quiz-103', 'A patient has weakness on the right side of their body. What finding would suggest a brainstem lesion?', 'Crossed signs (weakness on one side with sensory loss on opposite side) suggest brainstem involvement.', 3, NOW(), NOW()),
  ('q-103-04', 'quiz-103', 'Which cranial nerve controls eye movements?', 'CN III (Oculomotor), CN IV (Trochlear), and CN VI (Abducens) control eye movements.', 4, NOW(), NOW());

-- Options for Q1
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-103-01-a', 'q-103-01', 'GCS 15', true, 1, NOW(), NOW()),
  ('opt-103-01-b', 'q-103-01', 'GCS 12', false, 2, NOW(), NOW()),
  ('opt-103-01-c', 'q-103-01', 'GCS 9', false, 3, NOW(), NOW()),
  ('opt-103-01-d', 'q-103-01', 'Cannot be determined', false, 4, NOW(), NOW());

-- Options for Q2
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-103-02-a', 'q-103-02', 'Severe with likely need for airway support', true, 1, NOW(), NOW()),
  ('opt-103-02-b', 'q-103-02', 'Mild impairment', false, 2, NOW(), NOW()),
  ('opt-103-02-c', 'q-103-02', 'Moderate impairment', false, 3, NOW(), NOW()),
  ('opt-103-02-d', 'q-103-02', 'Not concerning', false, 4, NOW(), NOW());

-- Options for Q3
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-103-03-a', 'q-103-03', 'Crossed signs with opposite sensory loss', true, 1, NOW(), NOW()),
  ('opt-103-03-b', 'q-103-03', 'Same-side sensory loss only', false, 2, NOW(), NOW()),
  ('opt-103-03-c', 'q-103-03', 'Hyperreflexia', false, 3, NOW(), NOW()),
  ('opt-103-03-d', 'q-103-03', 'Pupil changes', false, 4, NOW(), NOW());

-- Options for Q4
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-103-04-a', 'q-103-04', 'CN III, IV, and VI', true, 1, NOW(), NOW()),
  ('opt-103-04-b', 'q-103-04', 'CN II and V', false, 2, NOW(), NOW()),
  ('opt-103-04-c', 'q-103-04', 'CN VII and VIII', false, 3, NOW(), NOW()),
  ('opt-103-04-d', 'q-103-04', 'CN X and XI', false, 4, NOW(), NOW());

-- Module 4: ICU Systems & Equipment
INSERT INTO curriculum_modules (id, name, description, category, estimated_hours, order_position, created_at, updated_at)
VALUES (
  'mod-104',
  'ICU Systems & Equipment',
  'Learn the vital equipment and systems in the Neuro ICU',
  'Foundation',
  1.5,
  4,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Lessons for Module 4
INSERT INTO module_lessons (id, module_id, title, body, content_type, order_position, estimated_duration_minutes, created_at, updated_at)
VALUES
  ('les-104-01', 'mod-104', 'Equipment & Monitoring', '# Neuro ICU Equipment

## Monitoring Systems
- **Bedside Monitor**: Continuous cardiac, BP, SpO2, temperature
- **Ventilator**: For patients unable to protect airway
- **Infusion Pumps**: Precise medication/fluid administration
- **ICP Monitor**: Directly measures intracranial pressure

## Support Equipment
- **Arterial Line**: Continuous BP monitoring and blood draws
- **Central Line**: Medication administration and hemodynamics
- **Foley Catheter**: Accurate urine output measurement
- **External Ventricular Drain (EVD)**: ICP management

## Alarms
- Know your monitor settings
- Respond promptly to alarms
- Silence only after addressing issue
- Report equipment malfunction', 'lesson', 1, 12, NOW(), NOW());

-- Quiz for Module 4
INSERT INTO quizzes (id, module_id, title, description, passing_score, max_attempts, created_at, updated_at)
VALUES (
  'quiz-104',
  'mod-104',
  'Equipment Fundamentals Quiz',
  'Test your knowledge of Neuro ICU equipment',
  80,
  3,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Questions for Module 4 Quiz
INSERT INTO quiz_questions (id, quiz_id, question_text, feedback_text, order_position, created_at, updated_at)
VALUES
  ('q-104-01', 'quiz-104', 'What is the primary purpose of an arterial line in the ICU?', 'Arterial lines provide continuous BP monitoring and access for frequent blood draws.', 1, NOW(), NOW()),
  ('q-104-02', 'quiz-104', 'When an alarm sounds on the monitor, what should you do first?', 'Always assess the patient and the alarm context before silencing. Patient assessment is the priority.', 2, NOW(), NOW());

-- Options for Q1
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-104-01-a', 'q-104-01', 'Continuous BP monitoring and blood access', true, 1, NOW(), NOW()),
  ('opt-104-01-b', 'q-104-01', 'Medication administration only', false, 2, NOW(), NOW()),
  ('opt-104-01-c', 'q-104-01', 'ICP monitoring', false, 3, NOW(), NOW()),
  ('opt-104-01-d', 'q-104-01', 'Fluid restriction', false, 4, NOW(), NOW());

-- Options for Q2
INSERT INTO quiz_options (id, question_id, text, is_correct, order_position, created_at, updated_at)
VALUES
  ('opt-104-02-a', 'q-104-02', 'Assess patient and determine alarm cause', true, 1, NOW(), NOW()),
  ('opt-104-02-b', 'q-104-02', 'Silence the alarm immediately', false, 2, NOW(), NOW()),
  ('opt-104-02-c', 'q-104-02', 'Call the physician', false, 3, NOW(), NOW()),
  ('opt-104-02-d', 'q-104-02', 'Check the equipment battery', false, 4, NOW(), NOW());

-- Commit message
-- Successfully seeded Foundation Modules 1-4 (NCC Orientation, Vital Signs, Neuro Exam, Equipment)
-- Total: 4 modules, 7 lessons, 4 quizzes, 12 questions with multiple choice options
