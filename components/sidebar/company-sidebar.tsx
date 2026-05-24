import {
  LayoutDashboard,
  Briefcase,
  Users,
  Bell,
  Settings,
} from "lucide-react";

export default function CompanySidebar() {
  const items = [
    "Inicio",
    "Retos",
    "Candidatos",
    "Notificaciones",
    "Configuración",
  ];

  const icons = [
    LayoutDashboard,
    Briefcase,
    Users,
    Bell,
    Settings,
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
        {items.map((item, index) => {
          const Icon = icons[index];

          return (
            <button
              key={item}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 hover:bg-[#EAF3FF] hover:text-[#0039A6] transition font-medium"
            >
              <Icon size={20} />
              {item}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}