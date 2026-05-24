import { Card } from "@/components/ui/card";

export default function CompanyOverview() {
  const stats = [
    { title: "Retos Activos", value: "12" },
    { title: "Participantes", value: "248" },
    { title: "Talentos Guardados", value: "34" },
    { title: "Entrevistas", value: "8" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((s) => (
        <Card
          key={s.title}
          className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm hover:shadow-md transition"
        >
          <p className="text-slate-500 text-sm">{s.title}</p>
          <h3 className="text-4xl font-bold text-[#0039A6] mt-3">
            {s.value}
          </h3>
        </Card>
      ))}
    </div>
  );
}