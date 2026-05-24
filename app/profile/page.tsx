"use client";

import StudentSidebar from "@/components/sidebar/student-sidebar";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";
import { mockValidators } from "@/mock/validators";

export default function StudentProfilePage() {
  const { user, loadUser, hydrated } = useAuthStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedValidator, setSelectedValidator] = useState<any>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  // 🔥 SOLO SELECT (NO INPUT)
  const [skillSelected, setSkillSelected] = useState("");
  const [levelSelected, setLevelSelected] = useState("Intermedio");

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!hydrated) return <div>Cargando...</div>;
  if (!user) return <div>No autenticado</div>;

  // 🔥 ABRIR EVALUACIÓN
  const startEvaluation = (skill: string) => {
    const validator = mockValidators.find(
      (v) => v.skill.toLowerCase() === skill.toLowerCase()
    );

    if (!validator) {
      alert("No existe evaluación para esta skill");
      return;
    }

    setSelectedValidator(validator);
    setAnswers(new Array(validator.questions.length).fill(""));
    setResult(null);
    setOpenModal(true);
  };

  // 🔥 CALIFICACIÓN SIMPLE
  const submitEvaluation = () => {
    if (!selectedValidator) return;

    let correct = 0;

    selectedValidator.questions.forEach((q: any, i: number) => {
      if (answers[i] === q.correctAnswer) correct++;
    });

    const score = Math.round(
      (correct / selectedValidator.questions.length) * 100
    );

    let level = "Básico";
    if (score >= 80) level = "Avanzado";
    else if (score >= 50) level = "Intermedio";

    setResult({
      score,
      level,
      passed: score >= 60,
    });
  };

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#0039A6]">
          Mi Perfil
        </h1>

        <p className="text-slate-500 mt-2">
          Bienvenido {user.name}
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* INFO */}
        <Card className="p-6 bg-white border border-[#D6E4FF] rounded-3xl">
          <h2 className="text-xl font-semibold text-[#0039A6]">
            Información
          </h2>

          <Input defaultValue={user.name} />
          <Input defaultValue={user.email} />
          <Input placeholder="Universidad" />
          <Input placeholder="Carrera" />

          <Button className="w-full bg-[#0039A6] text-white mt-4">
            Guardar cambios
          </Button>
        </Card>

        {/* SKILLS */}
        <Card className="p-6 bg-white border border-[#D6E4FF] rounded-3xl">
          <h2 className="text-xl font-semibold text-[#0039A6]">
            Skills
          </h2>

          {/* SKILLS EXISTENTES (FILTRADAS POR USUARIO) */}
          <div className="flex flex-wrap gap-3 mt-4">
            {mockValidators
              .filter((v) => Number(user.id || 0) % Number(v.id) === 1)
              .map((v) => (
                <button
                  key={v.id}
                  onClick={() => startEvaluation(v.skill)}
                  className="
          group flex items-center gap-2
          px-4 py-2 rounded-2xl
          border border-[#D6E4FF]
          bg-[#F7FAFF]
          hover:bg-[#EAF3FF]
          hover:border-[#0039A6]
          transition-all duration-200
          shadow-sm
        "
                >
                  <span className="font-medium text-[#0039A6]">
                    {v.skill}
                  </span>

                  <span
                    className={`
            text-[10px] px-2 py-1 rounded-full font-semibold
            ${v.level === "Básico"
                        ? "bg-green-100 text-green-700"
                        : v.level === "Intermedio"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
          `}
                  >
                    {v.level}
                  </span>

                  <span className="text-[#0039A6] opacity-40 group-hover:opacity-100 transition">
                    →
                  </span>
                </button>
              ))}
          </div>

          {/* 🔥 AGREGAR NUEVA SKILL (SOLO SELECT) */}
          <div className="mt-6 border-t pt-4 border-[#D6E4FF] space-y-3">

            <h3 className="text-sm font-semibold text-slate-600">
              Agregar nueva skill
            </h3>

            <select
              value={skillSelected}
              onChange={(e) => setSkillSelected(e.target.value)}
              className="w-full border border-[#D6E4FF] rounded-xl p-2 text-sm"
            >
              <option value="">Selecciona una skill</option>

              {mockValidators.map((v) => (
                <option key={v.id} value={v.skill}>
                  {v.skill} ({v.level})
                </option>
              ))}
            </select>
            <select
              value={levelSelected}
              onChange={(e) => setLevelSelected(e.target.value)}
              className="w-full border border-[#D6E4FF] rounded-xl p-2 text-sm"
            >
              <option>Básico</option>
              <option>Intermedio</option>
              <option>Avanzado</option>
            </select>

            <Button
              onClick={() => startEvaluation(skillSelected)}
              disabled={!skillSelected}
              className="w-full bg-[#0039A6] text-white disabled:opacity-50"
            >
              Validar skill con IA
            </Button>

          </div>
        </Card>

      </div>

      {/* ================= MODAL IA ================= */}
      {openModal && selectedValidator && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl p-6">

            <h2 className="text-2xl font-bold text-[#0039A6]">
              Evaluación IA - {selectedValidator.skill}
            </h2>

            <p className="text-slate-500 text-sm">
              Nivel objetivo: {selectedValidator.level}
            </p>

            {/* QUESTIONS */}
            <div className="mt-6 space-y-6 max-h-[300px] overflow-auto">
              {selectedValidator.questions.map((q: any, i: number) => (
                <div key={i}>
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.alternatives.map((alt: string, idx: number) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <input
                          type="radio"
                          name={`q-${i}`}
                          onChange={() => {
                            const copy = [...answers];
                            copy[i] = alt;
                            setAnswers(copy);
                          }}
                        />
                        {alt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* RESULTADO */}
            {result && (
              <div className="mt-5 p-4 bg-[#EAF3FF] rounded-xl">
                <p className="text-[#0039A6] font-semibold">
                  Score: {result.score}%
                </p>
                <p>Nivel: {result.level}</p>
                <p className="text-sm">
                  {result.passed ? "APROBADO" : "NO APROBADO"}
                </p>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-6">

              <Button
                variant="outline"
                onClick={() => setOpenModal(false)}
              >
                Cerrar
              </Button>

              {!result && (
                <Button
                  onClick={submitEvaluation}
                  className="bg-[#0039A6] text-white"
                >
                  Evaluar
                </Button>
              )}

            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
}