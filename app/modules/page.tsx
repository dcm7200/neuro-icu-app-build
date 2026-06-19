'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
}

interface Lesson {
  id: string;
  title: string;
  module_id: string;
  lesson_order?: number;
}

export default function ModulesPage() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch modules
        const { data: modulesData } = await supabase
          .from('curriculum_modules')
          .select('*')
          .order('order_index');

        setModules(modulesData || []);

        // Fetch lessons
        const { data: lessonsData } = await supabase
          .from('module_lessons')
          .select('*')
          .order('lesson_order');

        setLessons(lessonsData || []);

        // Set first module as selected
        if (modulesData && modulesData.length > 0) {
          setSelectedModule(modulesData[0].id);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedModuleData = modules.find((m) => m.id === selectedModule);
  const moduleLessons = selectedModule
    ? lessons.filter((l) => l.module_id === selectedModule)
    : [];

  const handleLessonClick = (lesson: Lesson) => {
    router.push(`/modules/${selectedModule}/lessons/${encodeURIComponent(lesson.title)}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Neurocritical Care Curriculum</h1>
          <p className="text-gray-600 text-lg">Master the fundamentals of NCC at Barrow</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Modules Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                <h2 className="font-semibold text-white">Modules</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module.id)}
                    className={`w-full text-left px-4 py-3 transition ${
                      selectedModule === module.id
                        ? 'bg-blue-50 border-l-4 border-l-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-medium text-gray-900 text-sm">{module.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {lessons.filter((l) => l.module_id === module.id).length} lessons
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedModuleData ? (
              <div>
                {/* Module Header */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedModuleData.title}
                  </h2>
                  <p className="text-gray-600">{selectedModuleData.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    {moduleLessons.length} lessons
                  </div>
                </div>

                {/* Lessons Grid */}
                <div className="space-y-3">
                  {moduleLessons.length > 0 ? (
                    moduleLessons.map((lesson, idx) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson)}
                        className="w-full bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-md transition flex items-center justify-between"
                      >
                        <div className="text-left flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                              Lesson {idx + 1}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              15-25 min
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="text-gray-400" size={20} />
                      </button>
                    ))
                  ) : (
                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                      <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-gray-600">No lessons available</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-600">Select a module to view lessons</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
