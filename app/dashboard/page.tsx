"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/store";
import ModuleCard from "@/components/ModuleCard";
import ProgressOverview from "@/components/ProgressOverview";
import { Database } from "@/types/database";

type Module = Database["public"]["Tables"]["curriculum_modules"]["Row"];
type ModuleProgress = Database["public"]["Tables"]["user_module_progress"]["Row"];

export default function DashboardPage() {
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch all modules
        const { data: modulesData, error: modulesError } = await supabase
          .from("curriculum_modules")
          .select("*")
          .order("order_index");

        if (modulesError) {
          console.error("Modules fetch error:", modulesError.message, modulesError.details);
          throw modulesError;
        }
        console.log("Modules loaded:", modulesData?.length);
        setModules(modulesData || []);

        // Fetch user's progress
        const { data: progressData, error: progressError } = await supabase
          .from("user_module_progress")
          .select("*")
          .eq("user_id", user.id);

        if (progressError) {
          console.error("Progress fetch error:", progressError.message, progressError.details);
          throw progressError;
        }
        console.log("Progress loaded:", progressData?.length);
        setProgress(progressData || []);
      } catch (err: any) {
        console.error("Error fetching data:", err?.message || err?.toString() || JSON.stringify(err));
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

  const completedCount = progress.filter((p) => p.status === "completed").length;
  const inProgressCount = progress.filter((p) => p.status === "in_progress").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.full_name || "Provider"}
        </h1>
        <p className="text-gray-600 mt-2">
          Your comprehensive Neuro ICU onboarding journey
        </p>
      </div>

      {/* Progress Overview */}
      <ProgressOverview
        totalModules={modules.length}
        completedModules={completedCount}
        inProgressModules={inProgressCount}
      />

      {/* Modules Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => {
            const moduleProgress = progress.find((p) => p.module_id === module.id);
            return (
              <ModuleCard
                key={module.id}
                module={module}
                progress={moduleProgress}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
