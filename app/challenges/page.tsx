"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StudentSidebar from "@/components/sidebar/student-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { mockChallenges } from "@/mock/challenges";
import { Trophy, Building2, ArrowRight, X, UploadCloud, Send } from "lucide-react";

export default function ChallengesPage() {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<any>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleJoinChallenge = (challenge: any) => {
    setActiveChallenge(challenge);
    setFileName(null); // Resetear archivo simulado
    setOpenUploadModal(true);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      {/* HEADER PRINCIPAL */}
      <div className="mb-8 border-b border-[#D6E4FF] pb-6">
        <h1 className="text-4xl font-extrabold text-[#0039A6] tracking-tight flex items-center gap-3">
          <Trophy className="w-9 h-9" />
          Retos Disponibles
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Potencia tu perfil profesional resolviendo desafíos de empresas reales.
        </p>
      </div>

      {/* GRID DE RETOS PREMIUM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {mockChallenges.map((c) => (
          <Card
            key={c.id}
            className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#0039A6]/40 transition-all duration-300 flex flex-col justify-between min-h-[220px] space-y-4"
          >
            <div className="space-y-3">
              {/* COMPAÑÍA */}
              <div className="flex items-center gap-1.5 text-[#0039A6] bg-[#EAF3FF] w-fit px-3 py-1 rounded-xl border border-[#D6E4FF]/40">
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {c.company}
                </span>
              </div>

              {/* TÍTULO Y DESCRIPCIÓN */}
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-snug line-clamp-1">
                  {c.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {c.description}
                </p>
              </div>
            </div>

            {/* BOTÓN DE ACCIÓN */}
            <Button
              onClick={() => handleJoinChallenge(c)}
              className="group w-full sm:w-auto self-start bg-[#0039A6] hover:bg-[#002B7A] text-white rounded-xl flex items-center justify-center gap-2 font-semibold transition-all shadow-sm text-sm py-5"
            >
              Unirme al reto
              <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
            </Button>
          </Card>
        ))}
      </div>

      {/* ================= MODAL DE CARGA / SUBIDA (MOCKUP) ================= */}
      {openUploadModal && activeChallenge && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-[#D6E4FF] overflow-hidden flex flex-col animate-scaleUp">
            
            {/* CABECERA */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#0039A6] uppercase tracking-wider block mb-0.5">
                  {activeChallenge.company}
                </span>
                <h3 className="text-lg font-bold text-slate-800 tracking-tight line-clamp-1">
                  Postular Solución: {activeChallenge.title}
                </h3>
              </div>
              <button 
                onClick={() => setOpenUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CUERPO DEL FORMULARIO */}
            <div className="p-6 space-y-5 bg-white">
              
              {/* ZONA DE ARRASTRE / DROPZONE SIMULADA */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0039A6] uppercase tracking-wider">
                  Adjuntar entregable (Código, Documento o PDF)
                </label>
                <div className="border-2 border-dashed border-[#D6E4FF] hover:border-[#0039A6] bg-[#F7FAFF] rounded-2xl p-6 text-center transition relative cursor-pointer group">
                  <input 
                    type="file" 
                    onChange={handleSimulateUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                  <UploadCloud className="w-10 h-10 text-[#0039A6] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  
                  {fileName ? (
                    <p className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-lg inline-block border border-green-200">
                      ✓ {fileName}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-slate-700">
                        Presiona para buscar o arrastra tu archivo aquí
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Soporta ZIP, PDF, RAR o DOCX hasta 25MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* MENSAJE ADICIONAL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0039A6] uppercase tracking-wider">
                  Mensaje o notas sobre tu solución
                </label>
                <Textarea 
                  placeholder="Escribe aquí los detalles de tu propuesta, tecnologías usadas o comentarios para los revisores de la empresa..."
                  rows={4}
                  className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl text-slate-700 leading-relaxed text-sm"
                />
              </div>

            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpenUploadModal(false)}
                className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancelar
              </Button>

              <Button
                onClick={() => {
                  alert("Simulación: ¡Solución enviada con éxito a la empresa revisora!");
                  setOpenUploadModal(false);
                }}
                className="bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl px-5 flex items-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" /> Enviar Solución
              </Button>
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
}