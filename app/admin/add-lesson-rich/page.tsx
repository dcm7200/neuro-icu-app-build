"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/store";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  Plus,
  GripVertical,
  X,
  Eye,
  Code,
} from "lucide-react";
import Link from "next/link";

interface Module {
  id: string;
  title: string;
}

interface ContentBlock {
  id: string;
  type:
    | "heading"
    | "paragraph"
    | "callout"
    | "warning"
    | "table"
    | "checklist"
    | "collapsible"
    | "tabs"
    | "video"
    | "image"
    | "quiz";
  content: any;
}

interface LessonContent {
  title: string;
  blocks: ContentBlock[];
}

const TEMPLATES = {
  protocol: {
    name: "Protocol Template",
    content: {
      title: "",
      blocks: [
        {
          id: "1",
          type: "heading",
          content: { level: 1, text: "Protocol Title" },
        },
        {
          id: "2",
          type: "paragraph",
          content: { text: "Protocol overview and purpose..." },
        },
        {
          id: "3",
          type: "heading",
          content: { level: 2, text: "Prerequisites" },
        },
        {
          id: "4",
          type: "checklist",
          content: { items: ["Requirement 1", "Requirement 2", "Requirement 3"] },
        },
        {
          id: "5",
          type: "heading",
          content: { level: 2, text: "Steps" },
        },
        {
          id: "6",
          type: "collapsible",
          content: {
            title: "Step 1: Introduction",
            text: "Describe the first step...",
          },
        },
        {
          id: "7",
          type: "warning",
          content: {
            title: "Critical Points",
            text: "Important safety considerations...",
          },
        },
      ],
    },
  },
  caseStudy: {
    name: "Case Study Template",
    content: {
      title: "",
      blocks: [
        {
          id: "1",
          type: "heading",
          content: { level: 1, text: "Case Study: Patient Name/Condition" },
        },
        {
          id: "2",
          type: "heading",
          content: { level: 2, text: "Clinical Scenario" },
        },
        {
          id: "3",
          type: "paragraph",
          content: { text: "Describe the patient presentation..." },
        },
        {
          id: "4",
          type: "heading",
          content: { level: 2, text: "Key Findings" },
        },
        {
          id: "5",
          type: "table",
          content: {
            headers: ["Finding", "Value", "Interpretation"],
            rows: [
              ["Finding 1", "Result 1", "Normal/Abnormal"],
              ["Finding 2", "Result 2", "Normal/Abnormal"],
            ],
          },
        },
        {
          id: "6",
          type: "heading",
          content: { level: 2, text: "Clinical Questions" },
        },
        {
          id: "7",
          type: "quiz",
          content: {
            questions: [
              {
                question: "What is the diagnosis?",
                options: ["Option A", "Option B", "Option C"],
                correct: 0,
              },
            ],
          },
        },
      ],
    },
  },
  checklist: {
    name: "Competency Checklist",
    content: {
      title: "",
      blocks: [
        {
          id: "1",
          type: "heading",
          content: { level: 1, text: "Skill Competency Checklist" },
        },
        {
          id: "2",
          type: "paragraph",
          content: {
            text: "Use this checklist to verify competency before sign-off.",
          },
        },
        {
          id: "3",
          type: "checklist",
          content: {
            items: [
              "Skill 1: Demonstrates understanding",
              "Skill 2: Can perform independently",
              "Skill 3: Follows safety protocols",
              "Skill 4: Communicates effectively",
            ],
          },
        },
        {
          id: "4",
          type: "callout",
          content: {
            title: "Instructor Sign-off",
            text: "Preceptor signature and date required.",
          },
        },
      ],
    },
  },
  procedure: {
    name: "Clinical Procedure",
    content: {
      title: "",
      blocks: [
        {
          id: "1",
          type: "heading",
          content: { level: 1, text: "Procedure Name" },
        },
        {
          id: "2",
          type: "heading",
          content: { level: 2, text: "Equipment Needed" },
        },
        {
          id: "3",
          type: "checklist",
          content: { items: ["Equipment 1", "Equipment 2", "Equipment 3"] },
        },
        {
          id: "4",
          type: "heading",
          content: { level: 2, text: "Step-by-Step Procedure" },
        },
        {
          id: "5",
          type: "collapsible",
          content: { title: "Step 1", text: "Detailed instructions..." },
        },
        {
          id: "6",
          type: "warning",
          content: {
            title: "Safety Precautions",
            text: "Important safety information...",
          },
        },
      ],
    },
  },
};

export default function AddLessonRichPage() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplate, setShowTemplate] = useState(true);

  const [formData, setFormData] = useState({
    moduleId: "",
    lessonData: {
      title: "",
      blocks: [],
    } as LessonContent,
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

  // Apply template
  const applyTemplate = (templateKey: keyof typeof TEMPLATES) => {
    setFormData({
      ...formData,
      lessonData: { ...TEMPLATES[templateKey].content },
    });
    setShowTemplate(false);
  };

  // Add block
  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: {},
    };

    setFormData({
      ...formData,
      lessonData: {
        ...formData.lessonData,
        blocks: [...formData.lessonData.blocks, newBlock],
      },
    });
  };

  // Update block
  const updateBlock = (id: string, content: any) => {
    setFormData({
      ...formData,
      lessonData: {
        ...formData.lessonData,
        blocks: formData.lessonData.blocks.map((b) =>
          b.id === id ? { ...b, content } : b
        ),
      },
    });
  };

  // Delete block
  const deleteBlock = (id: string) => {
    setFormData({
      ...formData,
      lessonData: {
        ...formData.lessonData,
        blocks: formData.lessonData.blocks.filter((b) => b.id !== id),
      },
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.moduleId || !formData.lessonData.title) {
      setError("Please select module and enter lesson title");
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

      // Insert the lesson with rich content as JSON
      const { error: insertError } = await supabase
        .from("module_lessons")
        .insert([
          {
            module_id: formData.moduleId,
            title: formData.lessonData.title,
            content: JSON.stringify(formData.lessonData),
            lesson_order: nextOrder,
          },
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({
        moduleId: "",
        lessonData: { title: "", blocks: [] },
      });

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
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create Rich Lesson
          </h1>
          <p className="text-gray-600 text-sm">
            Beautiful, interactive lesson content
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error/Success Alerts */}
            {error && (
              <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Lesson created successfully! Redirecting...</p>
              </div>
            )}

            {/* Module & Title */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Module *
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

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  value={formData.lessonData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lessonData: {
                        ...formData.lessonData,
                        title: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., Understanding Intracranial Pressure"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Content Blocks */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Content Blocks</h3>
              {formData.lessonData.blocks.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No blocks yet. Choose a template or add content below.
                </p>
              ) : (
                formData.lessonData.blocks.map((block, idx) => (
                  <div
                    key={block.id}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900 capitalize">
                          {block.type}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteBlock(block.id)}
                        className="p-1 hover:bg-red-50 rounded text-red-600 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Block Editor (simplified for now) */}
                    {block.type === "heading" && (
                      <input
                        type="text"
                        value={block.content.text || ""}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            ...block.content,
                            text: e.target.value,
                          })
                        }
                        placeholder="Heading text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    )}

                    {block.type === "paragraph" && (
                      <textarea
                        value={block.content.text || ""}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            ...block.content,
                            text: e.target.value,
                          })
                        }
                        placeholder="Paragraph text"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    )}

                    {(block.type === "callout" || block.type === "warning") && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={block.content.title || ""}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              ...block.content,
                              title: e.target.value,
                            })
                          }
                          placeholder="Title"
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                        <textarea
                          value={block.content.text || ""}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              ...block.content,
                              text: e.target.value,
                            })
                          }
                          placeholder="Content"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    )}

                    {block.type === "checklist" && (
                      <textarea
                        value={(block.content.items || []).join("\n")}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            items: e.target.value
                              .split("\n")
                              .filter((i) => i.trim()),
                          })
                        }
                        placeholder="One item per line"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                      />
                    )}

                    {block.type === "collapsible" && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={block.content.title || ""}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              ...block.content,
                              title: e.target.value,
                            })
                          }
                          placeholder="Section title"
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                        <textarea
                          value={block.content.text || ""}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              ...block.content,
                              text: e.target.value,
                            })
                          }
                          placeholder="Content"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    )}

                    {block.type === "video" && (
                      <input
                        type="text"
                        value={block.content.url || ""}
                        onChange={(e) =>
                          updateBlock(block.id, { url: e.target.value })
                        }
                        placeholder="YouTube URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    )}

                    {block.type === "image" && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={block.content.url || ""}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              ...block.content,
                              url: e.target.value,
                            })
                          }
                          placeholder="Image URL"
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          value={block.content.caption || ""}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              ...block.content,
                              caption: e.target.value,
                            })
                          }
                          placeholder="Image caption"
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Add Block Buttons */}
            {!showTemplate && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Add Content Block
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "heading",
                    "paragraph",
                    "callout",
                    "warning",
                    "checklist",
                    "collapsible",
                    "table",
                    "video",
                    "image",
                    "quiz",
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addBlock(type as ContentBlock["type"])}
                      className="px-3 py-2 bg-blue-50 text-blue-700 rounded text-sm font-medium hover:bg-blue-100 transition capitalize"
                    >
                      + {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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
        </div>

        {/* Right Sidebar: Templates & Preview */}
        <div className="space-y-6">
          {/* Template Selector */}
          {showTemplate && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Start with a Template
              </h3>
              <div className="space-y-2">
                {Object.entries(TEMPLATES).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => applyTemplate(key as keyof typeof TEMPLATES)}
                    className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
                  >
                    <p className="font-medium text-gray-900 text-sm">
                      {template.name}
                    </p>
                  </button>
                ))}
                <button
                  onClick={() => setShowTemplate(false)}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-700 font-medium text-sm"
                >
                  Start Blank
                </button>
              </div>
            </div>
          )}

          {/* Preview Toggle */}
          {!showTemplate && (
            <div className="sticky top-4">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="w-full flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg font-medium"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* JSON Preview (Dev) */}
      {showPreview && (
        <div className="mt-8 bg-gray-900 text-gray-100 rounded-lg p-6 font-mono text-xs max-h-96 overflow-auto">
          <p className="text-gray-400 mb-2">JSON Structure:</p>
          <pre>{JSON.stringify(formData.lessonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
