export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: string;
          first_name: string | null;
          last_name: string | null;
          department: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role?: string;
          first_name?: string | null;
          last_name?: string | null;
          department?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: string;
          first_name?: string | null;
          last_name?: string | null;
          department?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      curriculum_modules: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category: string;
          order_position: number;
          estimated_hours: number;
          is_required: boolean;
          prerequisite_module_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          category: string;
          order_position: number;
          estimated_hours?: number;
          is_required?: boolean;
          prerequisite_module_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          category?: string;
          order_position?: number;
          estimated_hours?: number;
          is_required?: boolean;
          prerequisite_module_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      module_lessons: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          content_type: string;
          body: string;
          order_position: number;
          estimated_duration_minutes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          title: string;
          content_type: string;
          body: string;
          order_position: number;
          estimated_duration_minutes?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          module_id?: string;
          title?: string;
          content_type?: string;
          body?: string;
          order_position?: number;
          estimated_duration_minutes?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      competency_quizzes: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          description: string | null;
          competency_ids: string[];
          passing_score_percent: number;
          allow_retakes: boolean;
          max_attempts: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          title: string;
          description?: string | null;
          competency_ids?: string[];
          passing_score_percent?: number;
          allow_retakes?: boolean;
          max_attempts?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          module_id?: string;
          title?: string;
          description?: string | null;
          competency_ids?: string[];
          passing_score_percent?: number;
          allow_retakes?: boolean;
          max_attempts?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_questions: {
        Row: {
          id: string;
          quiz_id: string;
          question_text: string;
          question_type: string;
          order_position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          question_text: string;
          question_type: string;
          order_position: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          question_text?: string;
          question_type?: string;
          order_position?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_question_options: {
        Row: {
          id: string;
          question_id: string;
          option_text: string;
          is_correct: boolean;
          explanation: string | null;
          order_position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          question_id: string;
          option_text: string;
          is_correct?: boolean;
          explanation?: string | null;
          order_position: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          question_id?: string;
          option_text?: string;
          is_correct?: boolean;
          explanation?: string | null;
          order_position?: number;
          created_at?: string;
        };
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          quiz_id: string;
          attempt_number: number;
          score_percent: number | null;
          passed: boolean;
          started_at: string;
          completed_at: string | null;
          duration_minutes: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          quiz_id: string;
          attempt_number: number;
          score_percent?: number | null;
          passed?: boolean;
          started_at?: string;
          completed_at?: string | null;
          duration_minutes?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          quiz_id?: string;
          attempt_number?: number;
          score_percent?: number | null;
          passed?: boolean;
          started_at?: string;
          completed_at?: string | null;
          duration_minutes?: number | null;
        };
      };
      user_module_progress: {
        Row: {
          id: string;
          user_id: string;
          module_id: string;
          status: string;
          started_at: string | null;
          completed_at: string | null;
          progress_percent: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          module_id: string;
          status?: string;
          started_at?: string | null;
          completed_at?: string | null;
          progress_percent?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          module_id?: string;
          status?: string;
          started_at?: string | null;
          completed_at?: string | null;
          progress_percent?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_competency_progress: {
        Row: {
          id: string;
          user_id: string;
          competency_id: string;
          proficiency_level: string;
          assessment_source: string | null;
          assessed_at: string | null;
          assessor_id: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          competency_id: string;
          proficiency_level?: string;
          assessment_source?: string | null;
          assessed_at?: string | null;
          assessor_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          competency_id?: string;
          proficiency_level?: string;
          assessment_source?: string | null;
          assessed_at?: string | null;
          assessor_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          started_at: string;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          completed?: boolean;
          started_at?: string;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          completed?: boolean;
          started_at?: string;
          completed_at?: string | null;
          created_at?: string;
        };
      };
      learning_scenarios: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          clinical_presentation: string;
          learning_objectives: string[];
          difficulty_level: string;
          estimated_duration_minutes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          title: string;
          clinical_presentation: string;
          learning_objectives?: string[];
          difficulty_level: string;
          estimated_duration_minutes?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          module_id?: string;
          title?: string;
          clinical_presentation?: string;
          learning_objectives?: string[];
          difficulty_level?: string;
          estimated_duration_minutes?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      skill_checklists: {
        Row: {
          id: string;
          module_id: string | null;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          module_id?: string | null;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          module_id?: string | null;
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
