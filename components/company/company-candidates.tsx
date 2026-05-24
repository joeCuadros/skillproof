import { mockUsers } from "@/mock/users";
import { Card } from "@/components/ui/card";

export default function CompanyCandidates() {
  const students = mockUsers.filter(
    (u) => u.role === "student"
  );

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-[#0039A6]">
        Talento Destacado
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {students.map((s) => (
          <Card
            key={s.id}
            className="bg-white border border-[#D6E4FF] rounded-3xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-slate-800">
              {s.name}
            </h3>

            <p className="text-slate-500 text-sm mt-1">
              {s.email}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}