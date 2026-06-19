"use client";
import { useState } from "react";
import { ChevronDown, AlertTriangle, AlertCircle, Info } from "lucide-react";

interface ContentBlock {
  id?: string;
  type: string;
  content: any;
}

interface LessonContent {
  title: string;
  duration_min?: number;
  blocks: ContentBlock[];
}

// ── Sub-components ────────────────────────────────────────────────────────────

const CaseVignette = ({ stem, role, correct_action }: { stem: string; role: string; correct_action: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-l-4 border-purple-500 bg-purple-50 p-4 my-4 rounded">
      <p className="text-xs font-semibold text-gray-500 mb-1">CLINICAL VIGNETTE</p>
      <p className="font-medium text-gray-900 mb-2">{stem}</p>
      <p className="text-sm text-purple-700 mb-2"><span className="font-semibold">Role:</span> {role}</p>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 text-sm font-medium text-purple-700 hover:text-purple-900"
      >
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        {open ? "Hide" : "Show"} correct action
      </button>
      {open && (
        <div className="mt-3 p-3 bg-white rounded border border-purple-200 text-sm text-gray-700">
          {correct_action}
        </div>
      )}
    </div>
  );
};

// ── Main renderer ─────────────────────────────────────────────────────────────

export default function RichLessonRenderer({ content }: { content: LessonContent | string }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  let lessonData: LessonContent;
  try {
    lessonData = typeof content === "string" ? JSON.parse(content) : content;
  } catch {
    lessonData = { title: "Error", blocks: [] };
  }

  if (!lessonData?.blocks || !Array.isArray(lessonData.blocks)) {
    lessonData = { title: lessonData?.title || "Error", blocks: [] };
  }

  const toggle = (key: string) => {
    const next = new Set(expanded);
    next.has(key) ? next.delete(key) : next.add(key);
    setExpanded(next);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {lessonData.blocks.map((block, idx) => {
        const key = block.id || String(idx);

        switch (block.type) {

          case "heading":
            return (
              <h2 key={key} className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                {block.content.text}
              </h2>
            );

          case "paragraph":
            return (
              <p key={key} className="text-gray-700 leading-relaxed mb-4">
                {block.content.text}
              </p>
            );

          case "callout":
            const isWarningCallout = block.content.icon === "warning";
            return (
              <div key={key} className={`border-l-4 p-4 my-4 rounded ${isWarningCallout ? "bg-amber-50 border-amber-400" : "bg-blue-50 border-blue-500"}`}>
                <div className="flex gap-3">
                  {isWarningCallout
                    ? <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    : <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  }
                  <div>
                    {block.content.title && (
                      <p className={`font-semibold mb-1 ${isWarningCallout ? "text-amber-900" : "text-blue-900"}`}>
                        {block.content.title}
                      </p>
                    )}
                    <p className={`text-sm ${isWarningCallout ? "text-amber-800" : "text-blue-800"}`}>
                      {block.content.text}
                    </p>
                  </div>
                </div>
              </div>
            );

          case "warning":
            return (
              <div key={key} className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 text-sm font-medium">{block.content.text}</p>
                </div>
              </div>
            );

          case "collapsible":
            const isOpen = expanded.has(key);
            return (
              <div key={key} className="border border-gray-200 rounded-lg my-3 overflow-hidden">
                <button
                  onClick={() => toggle(key)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition font-medium text-gray-900 text-left"
                >
                  <span>{block.content.title}</span>
                  <ChevronDown size={18} className={`transition-transform text-gray-500 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700 leading-relaxed">
                    {/* Support both .content and .text for collapsible body */}
                    {block.content.content || block.content.text}
                  </div>
                )}
              </div>
            );

          case "table":
            return (
              <div key={key} className="my-4 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      {block.content.headers?.map((h: string, i: number) => (
                        <th key={i} className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.content.rows?.map((row: string[], ri: number) => (
                      <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {row.map((cell: string, ci: number) => (
                          <td key={ci} className="border border-gray-300 px-3 py-2 text-gray-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "case-vignette":
            return (
              <CaseVignette
                key={key}
                stem={block.content.stem}
                role={block.content.role}
                correct_action={block.content.correct_action}
              />
            );

          case "html":
            return (
              <div
                key={key}
                dangerouslySetInnerHTML={{ __html: block.content.html }}
                className="my-4"
              />
            );

          case "video": {
            const isYT = block.content.src?.includes("youtube.com") || block.content.src?.includes("youtu.be");
            const match = isYT && block.content.src?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
            const ytId = match ? match[1] : "";
            return (
              <div key={key} className="my-4">
                {ytId ? (
                  <iframe
                    width="100%" height="400"
                    src={`https://www.youtube.com/embed/${ytId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="rounded-lg"
                  />
                ) : (
                  <video width="100%" controls className="rounded-lg bg-black">
                    <source src={block.content.src} type={block.content.type || "video/mp4"} />
                  </video>
                )}
              </div>
            );
          }

          case "checklist":
            return (
              <div key={key} className="my-4 space-y-2">
                {block.content.items?.map((item: string, i: number) => (
                  <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </label>
                ))}
              </div>
            );

          case "image":
            return (
              <figure key={key} className="my-4">
                <img src={block.content.url} alt={block.content.caption || ""} className="w-full rounded-lg border border-gray-200" />
                {block.content.caption && (
                  <figcaption className="text-center text-gray-500 text-sm mt-2">{block.content.caption}</figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
