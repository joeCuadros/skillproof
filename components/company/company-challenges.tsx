import { mockChallenges } from "@/mock/challenges";
import { Card } from "@/components/ui/card";

export default function CompanyChallenges() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-[#0039A6]">
        Retos Publicados
      </h2>

      {mockChallenges.map((c) => (
        <Card
          key={c.id}
          className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold text-slate-800">
            {c.title}
          </h3>

          <p className="text-slate-500 mt-2">
            {c.description}
          </p>

          <div className="flex gap-2 mt-4 flex-wrap">
            {c.skills.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-xl text-sm bg-[#EAF3FF] text-[#0039A6] border border-[#D6E4FF]"
              >
                {s}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}