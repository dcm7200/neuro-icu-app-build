-- ============================================
-- NEURO ICU ONBOARDING APP - COMPLETE SCHEMA
-- ============================================
-- This schema includes: users, curriculum, competencies, quizzes, progress tracking, and scenarios
-- Created for PostgreSQL / Supabase
-- Last Updated: 2026-05-13

-- ============================================
-- AUTHENTICATION & USERS
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'resident', -- 'resident', 'nurse', 'np', 'instructor', 'admin'
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  department VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);

-- ============================================
-- CURRICULUM STRUCTURE
-- ============================================

CREATE TABLE IF NOT EXISTS curriculum_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL, -- 'Foundation', 'Pathophysiology', 'Protocol', 'Competency_Checkpoint'
  order_position INTEGER NOT NULL,
  estimated_hours FLOAT DEFAULT 2.0,
  is_required BOOLEAN DEFAULT TRUE,
  prerequisite_module_id UUID REFERENCES curriculum_modules(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_curriculum_modules_category ON curriculum_modules(category);
CREATE INDEX idx_curriculum_modules_order ON curriculum_modules(order_position);

-- ============================================

CREATE TABLE IF NOT EXISTS module_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES curriculum_modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content_type VARCHAR(50) NOT NULL, -- 'lecture', 'interactive', 'case_study', 'protocol_walkthrough', 'video'
  body TEXT NOT NULL, -- Markdown content
  order_position INTEGER NOT NULL,
  estimated_duration_minutes INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_module_lessons_module_id ON module_lessons(module_id);
CREATE INDEX idx_module_lessons_order ON module_lessons(module_id, order_position);

-- ============================================

CREATE TABLE IF NOT EXISTS clinical_protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  protocol_type VARCHAR(100) NOT NULL, -- 'ICP_Management', 'TBI', 'aSAH', 'Seizure', 'Brain_Death', 'PSH', 'Tirofiban', 'Downgrade'
  description TEXT,
  content TEXT NOT NULL, -- Markdown: physiology, assessment, management algorithm, complications
  last_updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clinical_protocols_type ON clinical_protocols(protocol_type);

-- ============================================
-- COMPETENCIES & LEARNING OUTCOMES
-- ============================================

CREATE TABLE IF NOT EXISTS competencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  domain VARCHAR(100) NOT NULL, -- 'Clinical_Assessment', 'Acute_Conditions', 'Pharmacology', 'Specialized_Protocols', 'Interdisciplinary'
  expected_proficiency VARCHAR(50) NOT NULL, -- 'Familiar', 'Proficient', 'Independent'
  assessment_method VARCHAR(255), -- 'Quiz', 'Skill Checklist', 'Scenario', 'Observation'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_competencies_domain ON competencies(domain);

-- ============================================

CREATE TABLE IF NOT EXISTS module_competency_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES curriculum_modules(id) ON DELETE CASCADE,
  competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
  proficiency_target VARCHAR(50) NOT NULL, -- 'Familiar', 'Proficient', 'Independent'
  is_required BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(module_id, competency_id)
);

CREATE INDEX idx_module_competency_module ON module_competency_map(module_id);
CREATE INDEX idx_module_competency_competency ON module_competency_map(competency_id);

-- ============================================
-- QUIZZES & ASSESSMENTS
-- ============================================

CREATE TABLE IF NOT EXISTS competency_quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES curriculum_modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  competency_ids UUID[] DEFAULT ARRAY[]::UUID[], -- Array of competency IDs this quiz assesses
  passing_score_percent INTEGER DEFAULT 80,
  allow_retakes BOOLEAN DEFAULT TRUE,
  max_attempts INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quizzes_module_id ON competency_quizzes(module_id);

-- ============================================

CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES competency_quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) NOT NULL, -- 'multiple_choice', 'true_false', 'short_answer', 'scenario'
  order_position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quiz_questions_quiz ON quiz_questions(quiz_id);

-- ============================================

CREATE TABLE IF NOT EXISTS quiz_question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  explanation TEXT,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_options_question ON quiz_question_options(question_id);

-- ============================================

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES competency_quizzes(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL,
  score_percent INTEGER,
  passed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_minutes INTEGER
);

CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);
CREATE INDEX idx_quiz_attempts_user_quiz ON quiz_attempts(user_id, quiz_id);

-- ============================================

CREATE TABLE IF NOT EXISTS quiz_attempt_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_attempt_id UUID NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  selected_option_id UUID REFERENCES quiz_question_options(id) ON DELETE SET NULL,
  answer_text TEXT,
  is_correct BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_attempt_answers_attempt ON quiz_attempt_answers(quiz_attempt_id);

-- ============================================
-- LEARNING SCENARIOS
-- ============================================

CREATE TABLE IF NOT EXISTS learning_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES curriculum_modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  clinical_presentation TEXT NOT NULL, -- Initial patient scenario in markdown
  learning_objectives TEXT[], -- Array of learning objectives
  difficulty_level VARCHAR(50) NOT NULL, -- 'Introductory', 'Intermediate', 'Advanced'
  estimated_duration_minutes INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scenarios_module ON learning_scenarios(module_id);

-- ============================================

CREATE TABLE IF NOT EXISTS scenario_branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID NOT NULL REFERENCES learning_scenarios(id) ON DELETE CASCADE,
  branch_key VARCHAR(100) NOT NULL, -- 'initial_assessment', 'treatment_choice_1', etc.
  description TEXT, -- What the learner sees
  clinical_context TEXT, -- What actually happens
  correct_action VARCHAR(255), -- What the learner should do
  order_position INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_branches_scenario ON scenario_branches(scenario_id);

-- ============================================
-- SKILL CHECKLISTS
-- ============================================

CREATE TABLE IF NOT EXISTS skill_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES curriculum_modules(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_checklists_module ON skill_checklists(module_id);

-- ============================================

CREATE TABLE IF NOT EXISTS checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id UUID NOT NULL REFERENCES skill_checklists(id) ON DELETE CASCADE,
  item_text VARCHAR(255) NOT NULL,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_checklist_items_checklist ON checklist_items(checklist_id);

-- ============================================

CREATE TABLE IF NOT EXISTS user_checklist_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  checklist_id UUID NOT NULL REFERENCES skill_checklists(id) ON DELETE CASCADE,
  checklist_item_id UUID NOT NULL REFERENCES checklist_items(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  instructor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, checklist_item_id)
);

CREATE INDEX idx_user_checklist_user ON user_checklist_progress(user_id);
CREATE INDEX idx_user_checklist_checklist ON user_checklist_progress(checklist_id);

-- ============================================
-- PROGRESS TRACKING
-- ============================================

CREATE TABLE IF NOT EXISTS user_module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES curriculum_modules(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  progress_percent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

CREATE INDEX idx_user_module_user ON user_module_progress(user_id);
CREATE INDEX idx_user_module_module ON user_module_progress(module_id);
CREATE INDEX idx_user_module_status ON user_module_progress(status);

-- ============================================

CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES module_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_user_lesson_user ON user_lesson_progress(user_id);
CREATE INDEX idx_user_lesson_lesson ON user_lesson_progress(lesson_id);

-- ============================================

CREATE TABLE IF NOT EXISTS user_competency_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
  proficiency_level VARCHAR(50) NOT NULL DEFAULT 'not_assessed', -- 'not_assessed', 'familiar', 'proficient', 'independent'
  assessment_source VARCHAR(100), -- 'quiz', 'checklist', 'scenario', 'observation'
  assessed_at TIMESTAMPTZ,
  assessor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, competency_id)
);

CREATE INDEX idx_user_competency_user ON user_competency_progress(user_id);
CREATE INDEX idx_user_competency_competency ON user_competency_progress(competency_id);
CREATE INDEX idx_user_competency_proficiency ON user_competency_progress(proficiency_level);

-- ============================================
-- ADMIN & AUDIT
-- ============================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(255) NOT NULL,
  resource_type VARCHAR(100),
  resource_id UUID,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at DESC);

-- ============================================
-- RLS POLICIES (Row Level Security)
-- ============================================

-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE competency_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_competency_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_checklists ENABLE ROW LEVEL SECURITY;

-- Residents can view all curriculum but only their own progress
CREATE POLICY "Residents view own progress" ON user_module_progress
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'instructor')
  ));

CREATE POLICY "Users view own competency progress" ON user_competency_progress
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'instructor')
  ));

-- Admins can modify curriculum
CREATE POLICY "Admins modify curriculum" ON curriculum_modules
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Curriculum readable by all authenticated" ON curriculum_modules
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Create sample admin user (you'll need to set password via Supabase Auth UI)
INSERT INTO users (email, role, first_name, last_name)
VALUES ('admin@neuro-icu.local', 'admin', 'Admin', 'User')
ON CONFLICT (email) DO NOTHING;

-- Create sample Foundation modules
INSERT INTO curriculum_modules (name, description, category, order_position, estimated_hours, is_required)
VALUES
  ('NCC Orientation & Role Expectations', 'Understanding the NCC environment, roles, and expectations for providers', 'Foundation', 1, 2.0, true),
  ('Clinical Assessment & Vital Signs', 'Assessment techniques and vital sign interpretation in ICU settings', 'Foundation', 2, 2.5, true),
  ('Neurological Examination Mastery', 'Complete neuro exam skills including GCS, motor/sensory, cranial nerves', 'Foundation', 3, 3.0, true),
  ('ICU Systems & Equipment', 'Overview of monitoring systems, ventilators, and common ICU equipment', 'Foundation', 4, 2.0, true)
ON CONFLICT DO NOTHING;

-- Create sample competencies
INSERT INTO competencies (name, description, domain, expected_proficiency, assessment_method)
VALUES
  ('Perform Complete Neurological Exam', 'Ability to perform and interpret comprehensive neuro assessment', 'Clinical_Assessment', 'Proficient', 'Skill Checklist'),
  ('Interpret GCS Scoring', 'Accurate Glasgow Coma Scale scoring and trending', 'Clinical_Assessment', 'Proficient', 'Quiz'),
  ('Recognize ICP Crisis', 'Identify signs of elevated intracranial pressure', 'Acute_Conditions', 'Proficient', 'Scenario'),
  ('Manage Seizure Activity', 'Initial management of acute seizure in ICU', 'Acute_Conditions', 'Independent', 'Scenario'),
  ('Administer Critical Medications', 'Safe administration of neuro ICU medications', 'Pharmacology', 'Independent', 'Observation')
ON CONFLICT DO NOTHING;

-- ============================================
-- TRIGGERS (Optional - for audit logging)
-- ============================================

CREATE OR REPLACE FUNCTION log_audit_event()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (action, resource_type, resource_id, details)
  VALUES (TG_ARGV[0], TG_TABLE_NAME, NEW.id, row_to_json(NEW));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- You can attach this trigger to tables as needed:
-- CREATE TRIGGER audit_curriculum_changes AFTER INSERT OR UPDATE ON curriculum_modules
-- FOR EACH ROW EXECUTE FUNCTION log_audit_event('curriculum_change');
