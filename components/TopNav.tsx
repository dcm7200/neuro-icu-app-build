"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store";
import { Database } from "@/types/database";

type User = Database["public"]["Tables"]["users"]["Row"] | null;

interface TopNavProps {
  user: User;
}

export default function TopNav({ user }: TopNavProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const getRoleDisplay = (role: string) => {
    const roleMap: Record<string, string> = {
      resident: "👨‍🏫 Resident",
      nurse: "👩‍⚕️ Nurse",
      np: "👨‍⚕️ NP",
      instructor: "👨‍🎓 Instructor",
      admin: "⚙️ Admin",
    };
    return roleMap[role] || role;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-sm text-gray-600">
          {getRoleDisplay(user?.role || "resident")}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
