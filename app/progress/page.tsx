"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/store";
import { Database } from "@/types/database";
import { BarChart3, TrendingUp } from "lucide-react";

type Module = Database["public"]["Tables"]["curriculum_modules"]["Row"];
type ModuleProgress = Database["public"]["Tables"]["user_module_progress"]["Row"];
type CompetencyProgress = Database["public"]["Tables"]["user_competency_progress"]["Row"];

export default function ProgressPage() {
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [competencies, setCompetencies] = useState<CompetencyProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch modules
        const { data: modulesData } = await supabase
          .from("curriculum_modules")
          .select("*")
          .order("order_position");

        setModules(modulesData || []);

        // Fetch module progress
        const { data: progressData } = await supabase
          .from("user_module_progress")
          .select("*")
          .eq("user_id", user.id);

        setProgress(progressData || []);

        // Fetch competency progress
        const { data: competencyData } = await supabase
          .from("user_competency_progress")
          .select("*")
          .eq("user_id", user.id);

        setCompetencies(competencyData || []);
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const completedModules = progress.filter((p) => p.status === "completed").length;
  const overallProgress = modules.length > 0
    ? Math.round((completedModules / modules.length) * 100)
    : 0;

  const competenciesByLevel = {
    independent: competencies.filter((c) => c.proficiency_level === "independent").length,
    proficient: competencies.filter((c) => c.proficiency_level === "proficient").length,
    familiar: competencies.filter((c) => c.proficiency_level === "familiar").length,
    not_assessed: competencies.filter((c) => c.proficiency_level === "not_assessed").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Progress Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your learning journey</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Overall Progress</h3>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{overallProgress}%</p>
          <p className="text-xs text-gray-500 mt-1">
            {completedModules} of {modules.length} modules
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Independent</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{competenciesByLevel.independent}</p>
          <p className="text-xs text-gray-500 mt-1">competencies mastered</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Proficient</h3>
          <p className="text-3xl font-bold text-yellow-600">{competenciesByLevel.proficient}</p>
          <p className="text-xs text-gray-500 mt-1">competencies</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Familiar</h3>
          <p className="text-3xl font-bold text-blue-600">{competenciesByLevel.familiar}</p>
          <p className="text-xs text-gray-500 mt-1">competencies</p>
        </div>
      </div>

      {/* Module Progress Table */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Module Status</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {modules.map((module) => {
                const moduleProgress = progress.find((p) => p.module_id === module.id);
                const status = moduleProgress?.status || "not_started";

                return (
                  <tr key={module.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {module.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {module.category}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        status === "completed"
                          ? "bg-green-100 text-green-700"
                          : status === "in_progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {status.replace("_", " ").charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${moduleProgress?.progress_percent || 0}%`,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
