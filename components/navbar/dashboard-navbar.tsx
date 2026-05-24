export default function DashboardNavbar() {
  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <h2 className="text-4xl font-bold text-[#0039A6]">
          Dashboard Empresa
        </h2>
        <p className="text-slate-500 mt-2">
          Gestiona talento y retos verificados
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-5 py-2 rounded-2xl bg-[#0039A6] hover:bg-[#002B7A] text-white font-medium shadow-md transition">
          Publicar Reto
        </button>

        <div className="w-11 h-11 rounded-full bg-[#EAF3FF] border border-[#D6E4FF]" />
      </div>
    </div>
  );
}