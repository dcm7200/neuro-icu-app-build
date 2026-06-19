"use client";

interface ProgressOverviewProps {
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
}

export default function ProgressOverview({
  totalModules,
  completedModules,
  inProgressModules,
}: ProgressOverviewProps) {
  const completionPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const notStartedModules = totalModules - completedModules - inProgressModules;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Progress */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Overall Progress</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray={`${completionPercent * 2.827} 282.7`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">{completionPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Completed</h3>
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <p className="text-2xl font-bold text-green-600">{completedModules}</p>
          <p className="text-xs text-gray-500 mt-1">of {totalModules} modules</p>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">In Progress</h3>
            <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{inProgressModules}</p>
          <p className="text-xs text-gray-500 mt-1">actively learning</p>
        </div>

        {/* Not Started */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Not Started</h3>
            <span className="inline-block w-3 h-3 bg-gray-400 rounded-full"></span>
          </div>
          <p className="text-2xl font-bold text-gray-600">{notStartedModules}</p>
          <p className="text-xs text-gray-500 mt-1">to get started</p>
        </div>
      </div>
    </div>
  );
}
