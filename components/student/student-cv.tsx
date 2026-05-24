import { Card } from "@/components/ui/card";

export default function StudentCV() {
  return (
    <Card className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-[#0039A6]">
        Mi CV Inteligente (IA)
      </h2>

      <p className="text-slate-500 mt-2">
        Generado automáticamente con tus habilidades verificadas
      </p>

      <button className="mt-5 px-5 py-2 rounded-2xl bg-[#0039A6] hover:bg-[#002B7A] text-white transition">
        Generar CV
      </button>
    </Card>
  );
}