"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Bell,
  Settings,
} from "lucide-react";

export default function CompanySidebar() {
  const router = useRouter();

  const items = [
    {
      name: "Inicio",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Retos",
      icon: Briefcase,
      path: "/company/challenges",
    },
    {
      name: "Candidatos",
      icon: Users,
      path: "/company/candidates",
    },
    {
      name: "Notificaciones",
      icon: Bell,
      path: "/company/notifications",
    },
    {
      name: "Configuración",
      icon: Settings,
      path: "/company/settings",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-[#D6E4FF] p-6 shadow-sm">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#0039A6]">
          SkillProof
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Haz que tu talento hable por ti
        </p>
      </div>

      <nav className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 hover:bg-[#EAF3FF] hover:text-[#0039A6] transition font-medium"
            >
              <Icon size={20} />
              {item.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}