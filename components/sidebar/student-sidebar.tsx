"use client";

import { useRouter } from "next/navigation";
import {
  Home,
  User,
  FileText,
  BookOpen,
  Award,
  Bell,
  Settings,
  MessageSquare
} from "lucide-react";

export default function StudentSidebar() {
  const router = useRouter();

  const items = [
    {
      name: "Inicio",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "Mi Perfil",
      icon: User,
      path: "/profile",
    },
    {
      name: "CV",
      icon: FileText,
      path: "/cv",
    },
    {
      name: "Retos",
      icon: BookOpen,
      path: "/challenges",
    },
    {
      name: "Certificaciones",
      icon: Award,
      path: "/certifications",
    },
    {
      name: "Experiencias",
      icon: BookOpen,
      path: "/experiences",
    },
    {
      name: "Feedback",
      icon: MessageSquare,
      path: "/feedback",
    },
    {
      name: "Notificaciones",
      icon: Bell,
      path: "/notifications",
    },
    {
      name: "Configuración",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-[#D6E4FF] p-6 shadow-sm">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#0039A6]">
          SkillProof
        </h1>
        <p className="text-slate-500 text-sm">
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