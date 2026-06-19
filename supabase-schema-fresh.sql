-- Neuro ICU Onboarding App - Complete Database Schema
-- Created: 2026-05-14
-- Version: 1.0
-- Built for Diane's Neuro ICU onboarding platform

-- ============================================================================
-- SECTION 1: CORE TABLES
-- ============================================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'resident',
  institution TEXT,
  specialty TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Curriculum modules (major topics)
CREATE TABLE public.curriculum_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  estimated_hours FLOAT,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Module lessons (individual learning units within a module)
CREATE TABLE public.module_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.curriculum_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  lesson_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SECTION 2: LEARNING & ASSESSMENT TABLES
-- ============================================================================

-- Competencies (learning outcomes)
CREATE TABLE public.competencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  proficiency_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Map modules to competencies
CREATE TABLE public.module_competency_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.curriculum_modules(id) ON DELETE CASCADE,
  competency_id UUID NOT NULL REFERENCES public.competencies(id) ON DELETE CASCADE,
  UNIQUE(module_id, competency_id)
);

-- Quizzes/assessments
CREATE TABLE public.competency_quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.curriculum_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  passing_score INTEGER DEFAULT 80,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz questions
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES public.competency_quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL,
  correct_answer TEXT,
  explanation TEXT,
  question_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz question options (for multiple choice)
CREATE TABLE public.quiz_question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  option_order INTEGER
);

-- User quiz attempts
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.competency_quizzes(id) ON DELETE CASCADE,
  score INTEGER,
  passed BOOLEAN,
  answers JSONB,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- SECTION 3: CLINICAL SCENARIOS & SKILL CHECKLISTS
-- ============================================================================

-- Clinical scenarios (case-based learning)
CREATE TABLE public.learning_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.curriculum_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  scenario_text TEXT,
  clinical_context TEXT,
  learning_objectives JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skill checklists (hands-on competency verification)
CREATE TABLE public.skill_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.curriculum_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  skills JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User skill checklist progress
CREATE TABLE public.user_skill_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  checklist_id UUID NOT NULL REFERENCES public.skill_checklists(id) ON DELETE CASCADE,
  skill_key TEXT,
  completed BOOLEAN DEFAULT false,
  instructor_signed_off BOOLEAN DEFAULT false,
  signed_off_by UUID REFERENCES public.users(id),
  signed_off_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SECTION 4: PROGRESS TRACKING
-- ============================================================================

-- User module progress
CREATE TABLE public.user_module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.curriculum_modules(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started',
  progress_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- User lesson progress
CREATE TABLE public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.module_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- User competency progress
CREATE TABLE public.user_competency_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  competency_id UUID NOT NULL REFERENCES public.competencies(id) ON DELETE CASCADE,
  proficiency_level TEXT,
  assessed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, competency_id)
);

-- ============================================================================
-- SECTION 5: AUDIT & ADMIN
-- ============================================================================

-- Audit logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SECTION 6: INDEXES
-- ============================================================================

CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_curriculum_modules_category ON public.curriculum_modules(category);
CREATE INDEX idx_module_lessons_module_id ON public.module_lessons(module_id);
CREATE INDEX idx_quiz_questions_quiz_id ON public.quiz_questions(quiz_id);
CREATE INDEX idx_quiz_attempts_user_id ON public.quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON public.quiz_attempts(quiz_id);
CREATE INDEX idx_user_module_progress_user_id ON public.user_module_progress(user_id);
CREATE INDEX idx_user_lesson_progress_user_id ON public.user_lesson_progress(user_id);
CREATE INDEX idx_user_competency_progress_user_id ON public.user_competency_progress(user_id);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);

-- ============================================================================
-- SECTION 7: ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_competency_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competency_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_competency_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Users table RLS
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id OR (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage users" ON public.users
  FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Curriculum modules - everyone can read
CREATE POLICY "Everyone can read modules" ON public.curriculum_modules
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage modules" ON public.curriculum_modules
  FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Module lessons - everyone can read
CREATE POLICY "Everyone can read lessons" ON public.module_lessons
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage lessons" ON public.module_lessons
  FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Competencies - everyone can read
CREATE POLICY "Everyone can read competencies" ON public.competencies
  FOR SELECT USING (true);

-- Quiz attempts - users can see their own, instructors can see all
CREATE POLICY "Users can see their own quiz attempts" ON public.quiz_attempts
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'instructor')
  );

CREATE POLICY "Users can create quiz attempts" ON public.quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User progress - users can see their own, instructors/admins can see all
CREATE POLICY "Users can see their own progress" ON public.user_module_progress
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'instructor')
  );

CREATE POLICY "Users can update their own progress" ON public.user_module_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can see their own lesson progress" ON public.user_lesson_progress
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'instructor')
  );

CREATE POLICY "Users can update their own lesson progress" ON public.user_lesson_progress
  FOR ALL USING (auth.uid() = user_id);

-- Skill progress - users can see their own, instructors can sign off
CREATE POLICY "Users can see their own skill progress" ON public.user_skill_progress
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'instructor')
  );

CREATE POLICY "Users can create skill progress" ON public.user_skill_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Instructors can update skill progress" ON public.user_skill_progress
  FOR UPDATE USING ((SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'instructor'));

-- Audit logs - admins only
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- ============================================================================
-- SECTION 8: SAMPLE DATA
-- ============================================================================

-- Insert sample modules
INSERT INTO public.curriculum_modules (title, description, category, estimated_hours, order_index) VALUES
('Neuro ICU Essentials & Safety', 'Fundamentals of neuro ICU orientation, safety protocols, basic neuro exam', 'Foundations', 2.0, 1),
('Common Diagnoses: Stroke & TBI', 'Stroke pathophysiology, tPA, thrombectomy, TBI classification, ICP management', 'Diagnoses', 3.0, 2),
('Common Diagnoses: SAH, Seizures, Meningitis', 'Subarachnoid hemorrhage, vasospasm, seizure management, meningitis/encephalitis', 'Diagnoses', 3.0, 3),
('Neuro Monitoring & Equipment', 'EEG, ICP monitoring, cerebral oximetry, EVD management, equipment troubleshooting', 'Equipment', 3.0, 4),
('Medications & Pharmacology', 'Sedation, antiepileptics, vasopressors, neuroprotection, drug interactions', 'Medications', 2.5, 5),
('Clinical Protocols & Procedures', 'Institution-specific protocols, emergency procedures, interdisciplinary workflows', 'Protocols', 2.0, 6),
('Case Studies & Simulations', 'Realistic patient scenarios, decision-making practice, team communication', 'Cases', 3.0, 7),
('Quality, Safety & Outcomes', 'Complication prevention, quality metrics, patient safety, evidence-based practice', 'Quality', 2.0, 8);

-- Insert sample competencies
INSERT INTO public.competencies (title, description, proficiency_level) VALUES
('Perform basic neurological examination', 'Ability to assess LOC, pupils, motor, sensory, cranial nerves', 'Foundational'),
('Recognize abnormal neuro findings and escalate', 'Identify red flags requiring immediate physician notification', 'Foundational'),
('Interpret common neuro ICU diagnoses', 'Understand pathophysiology and clinical presentation of stroke, TBI, SAH, seizures', 'Intermediate'),
('Manage ICP and cerebral perfusion', 'Understand ICP physiology, therapeutic targets, CPP management', 'Intermediate'),
('Operate neuro monitoring equipment safely', 'Use EEG, ICP monitors, cerebral oximetry, EVD management', 'Intermediate'),
('Administer and titrate neuro medications', 'Sedation, antiepileptics, vasopressors, neuroprotection drugs', 'Intermediate'),
('Recognize and manage status epilepticus', 'Emergency seizure protocol, medication algorithms, airway management', 'Advanced'),
('Manage patients with elevated ICP', 'Identify causes, implement therapies, recognize herniation risks', 'Advanced'),
('Communicate effectively in neuro ICU team', 'SBAR handoffs, interdisciplinary collaboration, escalation pathways', 'Foundational'),
('Apply quality and safety principles', 'Prevent complications, report adverse events, practice evidence-based care', 'Foundational');

-- Insert sample lessons for Module 1
INSERT INTO public.module_lessons (module_id, title, content, lesson_order) VALUES
((SELECT id FROM public.curriculum_modules WHERE title = 'Neuro ICU Essentials & Safety' LIMIT 1),
 'Lesson 1: Neuro ICU Layout & Safety Orientation',
 '# Neuro ICU Layout & Safety
 
 ## Overview
 Welcome to the Neuro ICU. This lesson introduces the physical layout, safety protocols, and key resources you''ll need on Day 1.
 
 ## Learning Objectives
 - Navigate the neuro ICU layout confidently
 - Identify key safety resources (crash cart, emergency equipment, supply locations)
 - Understand basic fire, fall, and infection safety protocols
 - Know emergency contact numbers and escalation pathways
 
 ## The Physical Layout
 - **Main Unit**: 12 beds in a semicircle for observation
 - **Equipment Room**: Monitors, ventilators, infusion pumps, EVD supplies
 - **Medication Room**: Locked, requires badge access
 - **Crash Cart**: Located at nursing station
 - **Break Room**: Restroom, kitchen, charting area
 
 ## Key Safety Protocols
 1. Fire: Know nearest exit
 2. Falls: Bed alarm on all patients
 3. Infection: Hand hygiene, PPE use, isolation protocols
 4. Code Response: Know your role in CPR/code team
 
 ## Emergency Contacts
 - Code: Dial extension 5555
 - Neurology: Extension 4000
 - Neurosurgery: Extension 4001
 - Pharmacy: Extension 3000
 - ICU Supervisor: Extension 5000',
 1),
((SELECT id FROM public.curriculum_modules WHERE title = 'Neuro ICU Essentials & Safety' LIMIT 1),
 'Lesson 2: The Basic Neurological Exam',
 '# The Basic Neurological Exam
 
 ## Overview
 The neuro exam is the foundation of neuro ICU nursing. Learn to perform it quickly, accurately, and consistently.
 
 ## Learning Objectives
 - Perform a complete basic neuro exam in 5 minutes
 - Identify normal vs. abnormal findings
 - Know which findings require immediate escalation
 
 ## The Neuro Exam Components
 
 ### 1. Level of Consciousness (LOC)
 - **Alert**: Awake, responds immediately to voice
 - **Verbal**: Requires verbal stimulation to arouse
 - **Pain**: Requires painful stimulation
 - **Unresponsive**: No response to stimulation
 
 ### 2. Pupils
 - **Size**: Normal 2-4mm, equal, round
 - **Reactivity**: Brisk response to light
 - **Red flag**: Blown pupil (fixed and dilated) = emergency
 
 ### 3. Motor Strength
 - Grade 5/5: Normal strength
 - Grade 4/5: Moves against resistance but weakened
 - Grade 3/5: Moves against gravity but not resistance
 - Grade 0-2/5: Minimal to no movement
 
 ### 4. Sensory
 - Pain: Sharp vs. dull discrimination
 - Touch: Light sensation
 - Red flag: Acute sensory change (new numbness) = stroke sign
 
 ### 5. Cranial Nerves (CN II-XII)
 - CN II: Vision
 - CN III, IV, VI: Eye movements
 - CN V: Facial sensation
 - CN VII: Facial movement
 - CN XII: Tongue movement
 
 ## Red Flags Requiring Immediate Escalation
 - Blown pupil (fixed and dilated)
 - New weakness (facial droop, arm drift, leg weakness)
 - Acute LOC change (newly unresponsive or more alert)
 - Seizure activity
 - New vision loss
 
 ## Practice
 You''ll practice this on a manikin and real patients with your preceptor.',
 2);

-- Insert sample quiz for Module 1
INSERT INTO public.competency_quizzes (module_id, title, description, passing_score) VALUES
((SELECT id FROM public.curriculum_modules WHERE title = 'Neuro ICU Essentials & Safety' LIMIT 1),
 'Module 1 Assessment',
 'Basic knowledge check on neuro ICU essentials',
 80);

-- Insert sample quiz questions
INSERT INTO public.quiz_questions (quiz_id, question_text, question_type, correct_answer, explanation, question_order) VALUES
((SELECT id FROM public.competency_quizzes WHERE title = 'Module 1 Assessment' LIMIT 1),
 'What is the normal pupil size in millimeters?',
 'multiple_choice',
 '2-4mm',
 'Normal pupil size ranges from 2-4mm. Pupils larger than 6mm or unequal are red flags.',
 1),
((SELECT id FROM public.competency_quizzes WHERE title = 'Module 1 Assessment' LIMIT 1),
 'Which finding requires immediate physician escalation?',
 'multiple_choice',
 'Fixed and dilated pupil (blown pupil)',
 'A blown pupil (fixed and dilated) is a sign of increased ICP and possible herniation, requiring immediate intervention.',
 2),
((SELECT id FROM public.competency_quizzes WHERE title = 'Module 1 Assessment' LIMIT 1),
 'What does a motor grade of 4/5 mean?',
 'multiple_choice',
 'Moves against resistance but weakened',
 'Grade 4/5 means the patient can move the limb against resistance but with decreased strength compared to normal.',
 3);

-- Insert quiz question options
INSERT INTO public.quiz_question_options (question_id, option_text, is_correct, option_order) VALUES
((SELECT id FROM public.quiz_questions WHERE question_order = 1 LIMIT 1), '1-2mm', false, 1),
((SELECT id FROM public.quiz_questions WHERE question_order = 1 LIMIT 1), '2-4mm', true, 2),
((SELECT id FROM public.quiz_questions WHERE question_order = 1 LIMIT 1), '5-6mm', false, 3),
((SELECT id FROM public.quiz_questions WHERE question_order = 1 LIMIT 1), '8-10mm', false, 4),

((SELECT id FROM public.quiz_questions WHERE question_order = 2 LIMIT 1), 'Slightly sluggish pupil response', false, 1),
((SELECT id FROM public.quiz_questions WHERE question_order = 2 LIMIT 1), 'Fixed and dilated pupil (blown pupil)', true, 2),
((SELECT id FROM public.quiz_questions WHERE question_order = 2 LIMIT 1), 'Bilateral equal and reactive pupils', false, 3),
((SELECT id FROM public.quiz_questions WHERE question_order = 2 LIMIT 1), 'Pupils smaller than 2mm', false, 4),

((SELECT id FROM public.quiz_questions WHERE question_order = 3 LIMIT 1), 'No movement at all', false, 1),
((SELECT id FROM public.quiz_questions WHERE question_order = 3 LIMIT 1), 'Moves with gravity but not against resistance', false, 2),
((SELECT id FROM public.quiz_questions WHERE question_order = 3 LIMIT 1), 'Moves against resistance but weakened', true, 3),
((SELECT id FROM public.quiz_questions WHERE question_order = 3 LIMIT 1), 'Normal strength', false, 4);

-- Insert sample scenario
INSERT INTO public.learning_scenarios (module_id, title, description, scenario_text, clinical_context) VALUES
((SELECT id FROM public.curriculum_modules WHERE title = 'Neuro ICU Essentials & Safety' LIMIT 1),
 'Scenario 1: Acute Neuro Change - Stroke Alert',
 'A patient you''re caring for suddenly develops facial droop and arm weakness. How do you respond?',
 '## Scenario: Acute Neuro Deterioration

You are caring for a 58-year-old patient admitted for observation after a fall. You''re doing routine vital signs and neuro checks every 2 hours.

At 14:30, you note:
- **Before**: Patient alert, oriented, moving all extremities symmetrically
- **Now**: Patient still alert, but you notice left-sided facial droop and left arm drift (weakness)

**What do you do?**',
 'Acute stroke recognition and response');

-- Insert sample skill checklist
INSERT INTO public.skill_checklists (module_id, title, description, skills) VALUES
((SELECT id FROM public.curriculum_modules WHERE title = 'Neuro ICU Essentials & Safety' LIMIT 1),
 'Basic Neuro Exam Competency Checklist',
 'Hands-on verification of neuro exam competency',
 '[
   {"skill": "Correctly assesses level of consciousness", "required": true},
   {"skill": "Accurately evaluates pupil size and reactivity", "required": true},
   {"skill": "Grades motor strength 0-5 bilaterally", "required": true},
   {"skill": "Assesses sensory function (pain, light touch)", "required": true},
   {"skill": "Evaluates cranial nerves II, III, IV, VI, V, VII, XII", "required": true},
   {"skill": "Identifies and reports red flags appropriately", "required": true},
   {"skill": "Completes exam within 5 minutes", "required": false},
   {"skill": "Documents findings accurately in EMR", "required": true}
 ]'::jsonb);

-- ============================================================================
-- SECTION 9: FUNCTIONS (OPTIONAL, for future use)
-- ============================================================================

-- Function to update user_module_progress based on lesson completion
CREATE OR REPLACE FUNCTION update_module_progress()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_module_progress
  SET progress_percentage = (
    SELECT ROUND(100.0 * COUNT(CASE WHEN completed THEN 1 END) / NULLIF(COUNT(*), 0))
    FROM public.user_lesson_progress ulp
    JOIN public.module_lessons ml ON ulp.lesson_id = ml.id
    WHERE ulp.user_id = NEW.user_id
    AND ml.module_id = (
      SELECT module_id FROM public.module_lessons WHERE id = NEW.lesson_id
    )
  )
  WHERE user_id = NEW.user_id
  AND module_id = (
    SELECT module_id FROM public.module_lessons WHERE id = NEW.lesson_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_module_progress
AFTER INSERT OR UPDATE ON public.user_lesson_progress
FOR EACH ROW
EXECUTE FUNCTION update_module_progress();

-- ============================================================================
-- Schema complete. Database is ready for Next.js app.
-- ============================================================================
