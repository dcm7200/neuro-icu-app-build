"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/lib/store";
import {
  Home,
  BookOpen,
  BarChart3,
  Settings,
  Menu,
  X,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUI();

  const isActive = (path: string) => pathname.startsWith(path);

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/modules", icon: BookOpen, label: "Modules" },
    { href: "/progress", icon: BarChart3, label: "Progress" },
    { href: "/admin", icon: Users, label: "Admin" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
      >
        {sidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 z-40 md:z-auto ${
          sidebarOpen ? "left-0" : "-left-64 md:left-0"
        }`}
      >
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg">NeuroICU</h1>
              <p className="text-xs text-slate-400">Onboarding</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center">
            Neuro ICU Platform v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
