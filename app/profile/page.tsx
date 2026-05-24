"use client";

import StudentSidebar from "@/components/sidebar/student-sidebar";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";
import { mockValidators } from "@/mock/validators";
import { User, ShieldCheck, PlusCircle, CheckCircle2, XCircle, Award } from "lucide-react";

export default function StudentProfilePage() {
  const { user, loadUser, hydrated } = useAuthStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedValidator, setSelectedValidator] = useState<any>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const [skillSelected, setSkillSelected] = useState("");
  const [levelSelected, setLevelSelected] = useState("Intermedio");

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F9FF]">
        <p className="text-[#0039A6] font-medium animate-pulse">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F9FF]">
        <p className="text-slate-600 font-medium">No autenticado</p>
      </div>
    );
  }

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
      <div className="mb-8 border-b border-[#D6E4FF] pb-6">
        <h1 className="text-4xl font-extrabold text-[#0039A6] tracking-tight">
          Mi Perfil
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Bienvenido de vuelta, {user.name}
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* COLUMNA 1: INFORMACIÓN PERSONAL */}
        <Card className="p-6 bg-white border border-[#D6E4FF] rounded-3xl shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-[#0039A6]" />
            <h2 className="text-xl font-bold text-[#0039A6]">
              Información Personal
            </h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0039A6] uppercase tracking-wider">Nombre Completo</label>
              <Input defaultValue={user.name} className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0039A6] uppercase tracking-wider">Correo Electrónico</label>
              <Input defaultValue={user.email} className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0039A6] uppercase tracking-wider">Centro de Estudios</label>
              <Input placeholder="Universidad" className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0039A6] uppercase tracking-wider">Carrera / Especialidad</label>
              <Input placeholder="Carrera" className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl" />
            </div>
          </div>

          <Button className="w-full bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl transition-all shadow-sm">
            Guardar cambios
          </Button>
        </Card>

        {/* COLUMNA 2 Y 3: PANEL DE SKILLS */}
        <Card className="lg:col-span-2 p-6 bg-white border border-[#D6E4FF] rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-[#0039A6]" />
            <h2 className="text-xl font-bold text-[#0039A6]">
              Mis Habilidades Verificadas
            </h2>
          </div>

          {/* LISTA DE SKILLS */}
          <div className="flex flex-wrap gap-3">
            {mockValidators
              .filter((v) => Number(user.id || 0) % Number(v.id) === 1)
              .map((v) => (
                <button
                  key={v.id}
                  onClick={() => startEvaluation(v.skill)}
                  className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-[#D6E4FF] bg-[#F7FAFF] hover:bg-[#EAF3FF] hover:border-[#0039A6] transition-all duration-200 shadow-xs"
                >
                  <span className="font-semibold text-[#0039A6] text-sm">
                    {v.skill}
                  </span>

                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold tracking-wide uppercase ${
                      v.level === "Básico"
                        ? "bg-green-100 text-green-700"
                        : v.level === "Intermedio"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {v.level}
                  </span>

                  <span className="text-[#0039A6] text-xs font-bold opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </button>
              ))}
          </div>

          {/* AGREGAR NUEVA SKILL */}
          <div className="pt-5 border-t border-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                Solicitar Validación de Nueva Habilidad
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select
                value={skillSelected}
                onChange={(e) => setSkillSelected(e.target.value)}
                className="w-full border border-[#D6E4FF] focus:border-[#0039A6] outline-none rounded-xl p-2.5 text-sm bg-white font-medium text-slate-700 transition-all"
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
                className="w-full border border-[#D6E4FF] focus:border-[#0039A6] outline-none rounded-xl p-2.5 text-sm bg-white font-medium text-slate-700 transition-all"
              >
                <option>Básico</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
              </select>
            </div>

            <Button
              onClick={() => startEvaluation(skillSelected)}
              disabled={!skillSelected}
              className="w-full bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl py-5 transition-all disabled:opacity-40"
            >
              Validar skill con IA
            </Button>
          </div>
        </Card>
      </div>

      {/* ================= MODAL IA ================= */}
      {openModal && selectedValidator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden border border-[#D6E4FF] flex flex-col max-h-[90vh]">
            
            {/* CABECERA MODAL */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF]">
              <h2 className="text-2xl font-bold text-[#0039A6]">
                Evaluación IA: {selectedValidator.skill}
              </h2>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">
                Nivel objetivo evaluado: <span className="text-[#0039A6]">{selectedValidator.level}</span>
              </p>
            </div>

            {/* PREGUNTAS (Cuerpo Scrolleable) */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 bg-white">
              {selectedValidator.questions.map((q: any, i: number) => (
                <div key={i} className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-2">
                    <span className="bg-[#EAF3FF] text-[#0039A6] font-bold text-xs rounded-lg w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {q.question}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pl-7">
                    {q.alternatives.map((alt: string, idx: number) => {
                      const isSelected = answers[i] === alt;
                      return (
                        <label
                          key={idx}
                          className={`flex items-center gap-3 text-sm p-3 rounded-xl border transition-all cursor-pointer font-medium ${
                            isSelected
                              ? "bg-[#EAF3FF] border-[#0039A6] text-[#0039A6]"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${i}`}
                            checked={isSelected}
                            disabled={!!result}
                            onChange={() => {
                              const copy = [...answers];
                              copy[i] = alt;
                              setAnswers(copy);
                            }}
                            className="w-4 h-4 accent-[#0039A6] shrink-0"
                          />
                          {alt}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* SECCIÓN DE RESULTADOS */}
            {result && (
              <div className="mx-6 mb-2 p-4 bg-[#EAF3FF] border border-[#D6E4FF] rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-scaleUp">
                <div className="flex items-center gap-3">
                  {result.passed ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-bold text-[#0039A6] text-md">
                      Puntaje Obtenido: {result.score}%
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">
                      Calificación calculada: {result.level}
                    </p>
                  </div>
                </div>
                <div className={`self-start sm:self-center px-4 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider ${
                  result.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {result.passed ? "✓ Aprobado" : "✕ No Aprobado"}
                </div>
              </div>
            )}

            {/* BOTONES ACCIONES DEL MODAL */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpenModal(false)}
                className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cerrar
              </Button>

              {!result && (
                <Button
                  onClick={submitEvaluation}
                  disabled={answers.includes("")}
                  className="bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl px-6 disabled:opacity-50"
                >
                  Finalizar y Evaluar
                </Button>
              )}
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
}