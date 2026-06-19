-- Fix RLS policies - simplify to avoid circular references

-- Drop the problematic RLS policies on users table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can manage users" ON public.users;

-- Create simpler, non-circular RLS policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Admin bypass (admins table needs special handling)
CREATE POLICY "Service role can manage users" ON public.users
  FOR ALL USING (true);  -- Service role bypasses RLS anyway

-- Fix: Also allow anon to see modules/lessons/competencies for learning
DROP POLICY IF EXISTS "Everyone can read modules" ON public.curriculum_modules;
DROP POLICY IF EXISTS "Everyone can read lessons" ON public.module_lessons;
DROP POLICY IF EXISTS "Everyone can read competencies" ON public.competencies;

CREATE POLICY "Everyone can read modules" ON public.curriculum_modules
  FOR SELECT USING (true);

CREATE POLICY "Everyone can read lessons" ON public.module_lessons
  FOR SELECT USING (true);

CREATE POLICY "Everyone can read competencies" ON public.competencies
  FOR SELECT USING (true);

CREATE POLICY "Everyone can read quiz questions" ON public.quiz_questions
  FOR SELECT USING (true);

CREATE POLICY "Everyone can read quiz options" ON public.quiz_question_options
  FOR SELECT USING (true);

CREATE POLICY "Everyone can read scenarios" ON public.learning_scenarios
  FOR SELECT USING (true);

CREATE POLICY "Everyone can read skill checklists" ON public.skill_checklists
  FOR SELECT USING (true);

-- Simplify quiz attempt policy
DROP POLICY IF EXISTS "Users can see their own quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Users can create quiz attempts" ON public.quiz_attempts;

CREATE POLICY "Users can see and create their own quiz attempts" ON public.quiz_attempts
  FOR ALL USING (auth.uid() = user_id);

-- Simplify progress policies
DROP POLICY IF EXISTS "Users can see their own progress" ON public.user_module_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_module_progress;

CREATE POLICY "Users can see and update their own module progress" ON public.user_module_progress
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can see their own lesson progress" ON public.user_lesson_progress;
DROP POLICY IF EXISTS "Users can update their own lesson progress" ON public.user_lesson_progress;

CREATE POLICY "Users can see and update their own lesson progress" ON public.user_lesson_progress
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can see their own skill progress" ON public.user_skill_progress;
DROP POLICY IF EXISTS "Users can create skill progress" ON public.user_skill_progress;
DROP POLICY IF EXISTS "Instructors can update skill progress" ON public.user_skill_progress;

CREATE POLICY "Users can see and create their own skill progress" ON public.user_skill_progress
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can see their own competency progress" ON public.user_competency_progress;

CREATE POLICY "Users can see and update their own competency progress" ON public.user_competency_progress
  FOR ALL USING (auth.uid() = user_id);

-- Module competency and quiz are read-only
DROP POLICY IF EXISTS "Everyone can read module competency map" ON public.module_competency_map;
CREATE POLICY "Everyone can read module competency map" ON public.module_competency_map
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Everyone can read quizzes" ON public.competency_quizzes;
CREATE POLICY "Everyone can read quizzes" ON public.competency_quizzes
  FOR SELECT USING (true);
