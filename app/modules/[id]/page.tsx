"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/store";
import { Database } from "@/types/database";
import RichLessonRenderer from "@/components/RichLessonRenderer";
import { ChevronRight, Clock, CheckCircle } from "lucide-react";

type Module = Database["public"]["Tables"]["curriculum_modules"]["Row"];
type Lesson = Database["public"]["Tables"]["module_lessons"]["Row"];
type ModuleProgress = Database["public"]["Tables"]["user_module_progress"]["Row"];
type Quiz = Database["public"]["Tables"]["competency_quizzes"]["Row"];

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const moduleId = params.id as string;

  const [module, setModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<ModuleProgress | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!user || !moduleId) return;

      try {
        // Fetch module
        const { data: moduleData, error: moduleError } = await supabase
          .from("curriculum_modules")
          .select("*")
          .eq("id", moduleId)
          .single();

        if (moduleError) {
          console.error("Module fetch error:", moduleError.message, moduleError.details);
          throw moduleError;
        }
        console.log("Module loaded:", moduleData?.title);
        setModule(moduleData);

        // Fetch lessons
        const { data: lessonsData, error: lessonsError } = await supabase
          .from("module_lessons")
          .select("*")
          .eq("module_id", moduleId)
          .order("lesson_order");

        if (lessonsError) {
          console.error("Lessons fetch error:", lessonsError.message, lessonsError.details);
          throw lessonsError;
        }
        console.log("Lessons loaded:", lessonsData?.length);
        setLessons(lessonsData || []);

        // Fetch quiz if it exists
        const { data: quizData, error: quizError } = await supabase
          .from("competency_quizzes")
          .select("*")
          .eq("module_id", moduleId)
          .single();

        if (quizError && quizError.code !== "PGRST116") {
          console.error("Quiz fetch error:", quizError.message, quizError.details);
          throw quizError;
        }
        if (quizData) setQuiz(quizData);

        // Fetch/create progress record
        const { data: progressData } = await supabase
          .from("user_module_progress")
          .select("*")
          .eq("user_id", user.id)
          .eq("module_id", moduleId)
          .single();

        if (!progressData) {
          // Create progress record if it doesn't exist
          const { data: newProgress } = await supabase
            .from("user_module_progress")
            .insert([
              {
                user_id: user.id,
                module_id: moduleId,
                status: "in_progress",
                progress_percentage: 0,
                started_at: new Date().toISOString(),
              },
            ] as any)
            .select()
            .single();
          setProgress(newProgress);
        } else {
          setProgress(progressData);
        }
      } catch (err: any) {
        console.error("Error fetching module:", err?.message || err?.toString() || JSON.stringify(err));
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [user, moduleId, router]);

  const currentLesson = lessons[currentLessonIndex];
  const totalLessons = lessons.length;
  const lessonsCompleted =
    Math.round((currentLessonIndex / totalLessons) * 100) ||
    progress?.progress_percent ||
    0;

  const handleNextLesson = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      // Mark module as completed
      handleCompleteModule();
    }
  };

  const handleCompleteModule = async () => {
    if (!user || !moduleId) return;

    try {
      await supabase
        .from("user_module_progress")
        .update({
          status: "completed",
          progress_percent: 100,
          completed_at: new Date().toISOString(),
        } as any)
        .eq("user_id", user.id)
        .eq("module_id", moduleId)

      router.push("/dashboard");
    } catch (err) {
      console.error("Error completing module:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!module || !currentLesson) {
    return <div className="text-center text-red-600">Module not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-4 flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.name}</h1>
        <p className="text-gray-600">{module.description}</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Module Progress</h3>
          <span className="text-sm font-medium text-gray-600">
            Lesson {currentLessonIndex + 1} of {totalLessons}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(currentLessonIndex / totalLessons) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-2">
                  LESSON
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentLesson.title}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Lesson {(currentLessonIndex || 0) + 1} of {lessons.length}</span>
              </div>
            </div>

            {/* Lesson Body */}
            <div className="mb-8">
              <RichLessonRenderer content={currentLesson.content} />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                disabled={currentLessonIndex === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ← Previous Lesson
              </button>
              <button
                onClick={handleNextLesson}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 transition"
              >
                {currentLessonIndex === totalLessons - 1
                  ? "Complete Module"
                  : "Next Lesson"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Lessons List */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
              <h3 className="font-semibold text-white">Lessons</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLessonIndex(index)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 transition flex items-start gap-3 ${
                    index === currentLessonIndex
                      ? "bg-blue-50 border-l-4 border-l-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="mt-1">
                    {index < currentLessonIndex ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : index === currentLessonIndex ? (
                      <div className="w-5 h-5 rounded-full border-2 border-blue-600"></div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {lesson.estimated_duration_minutes} min
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {quiz && (
            <div className="bg-white rounded-lg border border-gray-200 mt-6 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
                <h3 className="font-semibold text-white">Assessment</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-4">{quiz.title}</p>
                <button
                  onClick={() => router.push(`/modules/${moduleId}/quiz`)}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                >
                  Take Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
