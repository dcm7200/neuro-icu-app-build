"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/store";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  lesson_order: number;
  module?: { title: string };
}

export default function LessonsPage() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Fetch lessons on mount
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data, error } = await supabase
          .from("module_lessons")
          .select(
            `
            id,
            module_id,
            title,
            lesson_order,
            curriculum_modules(title)
          `
          )
          .order("lesson_order");

        if (error) throw error;

        // Type transformation
        const typed = (data || []).map((lesson: any) => ({
          ...lesson,
          module: lesson.curriculum_modules,
        }));

        setLessons(typed);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  // Delete lesson
  const handleDelete = async (lessonId: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;

    setDeleting(lessonId);
    try {
      const { error } = await supabase
        .from("module_lessons")
        .delete()
        .eq("id", lessonId);

      if (error) throw error;

      setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    } catch (err) {
      console.error("Error deleting lesson:", err);
      alert("Failed to delete lesson");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Lessons</h1>
            <p className="text-gray-600 text-sm">
              {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} created
            </p>
          </div>
        </div>
        <Link
          href="/admin/add-lesson"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Lesson
        </Link>
      </div>

      {/* Lessons Table */}
      {lessons.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-4">No lessons yet.</p>
          <Link
            href="/admin/add-lesson"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Create First Lesson
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Lesson Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Order
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr
                  key={lesson.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {lesson.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lesson.module?.title || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    #{lesson.lesson_order}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(lesson.id)}
                      disabled={deleting === lesson.id}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                      {deleting === lesson.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
