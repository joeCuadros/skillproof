"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, X, Info } from "lucide-react";
import { mockChallenges } from "@/mock/challenges";

export default function StudentChallenges() {
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenInfo = (challenge: any) => {
    setSelectedChallenge(challenge);
    setOpenModal(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
        <Trophy className="w-5 h-5 text-[#0039A6]" />
        <h2 className="text-2xl font-bold text-[#0039A6] tracking-tight">
          Retos Disponibles
        </h2>
      </div>

      {/* GRID DE RETOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockChallenges.map((c) => (
          <Card
            key={c.id}
            className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#0039A6]/40 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-snug line-clamp-1">
                {c.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                {c.description}
              </p>
            </div>

            <Button 
              onClick={() => handleOpenInfo(c)}
              variant="outline"
              className="group w-full sm:w-auto self-start border-[#D6E4FF] text-[#0039A6] bg-[#F7FAFF] hover:bg-[#EAF3FF] hover:border-[#0039A6] rounded-xl flex items-center justify-center gap-2 font-semibold transition-all text-sm"
            >
              Más información
              <ArrowRight className="w-4 h-4 text-[#0039A6] transition-transform group-hover:translate-x-1" />
            </Button>
          </Card>
        ))}
      </div>

      {/* ================= VENTANA EMERGENTE (MODAL) ================= */}
      {openModal && selectedChallenge && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-[#D6E4FF] overflow-hidden flex flex-col animate-scaleUp">
            
            {/* CABECERA */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#EAF3FF] p-2 rounded-xl text-[#0039A6]">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0039A6] tracking-tight">
                  Detalles del Reto
                </h3>
              </div>
              <button 
                onClick={() => setOpenModal(false)}
                className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CONTENIDO */}
            <div className="p-6 space-y-4 bg-white">
              <div className="space-y-2">
                <h4 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  {selectedChallenge.title}
                </h4>
                <span className="inline-block bg-[#EAF3FF] text-[#0039A6] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Desafío Activo
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {selectedChallenge.description}
                </p>
              </div>
            </div>

            {/* ACCIONES */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button
                onClick={() => setOpenModal(false)}
                className="bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl px-6"
              >
                Entendido
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}