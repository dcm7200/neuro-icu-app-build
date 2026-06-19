"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/store";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Module {
  id: string;
  title: string;
}

export default function AddLessonPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    moduleId: "",
    title: "",
    content: "",
  });

  // Fetch modules on mount
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data, error } = await supabase
          .from("curriculum_modules")
          .select("id, title")
          .order("order_index");

        if (error) throw error;
        setModules(data || []);
      } catch (err: any) {
        console.error("Error fetching modules:", err);
        setError("Failed to load modules");
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.moduleId || !formData.title || !formData.content) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      // Get the highest lesson_order for this module
      const { data: existingLessons, error: fetchError } = await supabase
        .from("module_lessons")
        .select("lesson_order")
        .eq("module_id", formData.moduleId)
        .order("lesson_order", { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      const nextOrder = (existingLessons?.[0]?.lesson_order || 0) + 1;

      // Insert the lesson
      const { error: insertError } = await supabase
        .from("module_lessons")
        .insert([
          {
            module_id: formData.moduleId,
            title: formData.title,
            content: formData.content,
            lesson_order: nextOrder,
          },
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({ moduleId: "", title: "", content: "" });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/admin/lessons");
      }, 2000);
    } catch (err: any) {
      console.error("Error creating lesson:", err);
      setError(err.message || "Failed to create lesson");
    } finally {
      setSubmitting(false);
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
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Lesson</h1>
          <p className="text-gray-600 text-sm">
            Create a new lesson within a module
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6 space-y-6"
      >
        {/* Error Alert */}
        {error && (
          <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Success!</p>
              <p className="text-sm">Lesson created. Redirecting...</p>
            </div>
          </div>
        )}

        {/* Module Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Module
          </label>
          <select
            value={formData.moduleId}
            onChange={(e) =>
              setFormData({ ...formData, moduleId: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a module --</option>
            {modules.map((mod) => (
              <option key={mod.id} value={mod.id}>
                {mod.title}
              </option>
            ))}
          </select>
        </div>

        {/* Lesson Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Lesson Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., Introduction to Stroke Management"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Lesson Content */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Lesson Content (Markdown)
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Paste your lesson content here. Markdown is supported."
            rows={15}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">
            💡 You can use Markdown formatting: **bold**, *italic*, # Headings,
            - Bullet points
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {submitting ? "Saving..." : "Save Lesson"}
          </button>
          <Link
            href="/admin"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Tips */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Paste content directly from Word docs or PDFs</li>
          <li>• Use Markdown formatting for structure</li>
          <li>• Links: [text](https://example.com)</li>
          <li>• Code blocks: ```code```</li>
        </ul>
      </div>
    </div>
  );
}
