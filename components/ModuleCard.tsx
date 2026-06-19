"use client";

import Link from "next/link";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Database } from "@/types/database";

type Module = Database["public"]["Tables"]["curriculum_modules"]["Row"];
type ModuleProgress = Database["public"]["Tables"]["user_module_progress"]["Row"];

interface ModuleCardProps {
  module: Module;
  progress?: ModuleProgress;
}

export default function ModuleCard({ module, progress }: ModuleCardProps) {
  const status = progress?.status || "not_started";
  const progressPercent = progress?.progress_percent || 0;

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in_progress":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200";
      case "in_progress":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            Completed
          </span>
        );
      case "in_progress":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
            In Progress
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
            Not Started
          </span>
        );
    }
  };

  return (
    <Link href={`/modules/${module.id}`}>
      <div
        className={`border rounded-lg p-5 hover:shadow-lg transition-shadow cursor-pointer h-full ${getStatusColor()}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-snug">
              {module.title}
            </h3>
          </div>
          {getStatusIcon()}
        </div>

        <p className="text-xs text-gray-600 mb-4 line-clamp-2">
          {module.description}
        </p>

        {status === "in_progress" && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-700">Progress</span>
              <span className="text-xs text-gray-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{module.estimated_hours}h</span>
          </div>
          {getStatusBadge()}
        </div>
      </div>
    </Link>
  );
}
