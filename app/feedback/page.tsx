"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StudentSidebar from "@/components/sidebar/student-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockFeedback } from "@/mock/feedback";
import { 
  MessageSquare, MessageCircle, AlertTriangle, CheckCircle, 
  X, Clock, ArrowRight, ShieldAlert, Scale, Send 
} from "lucide-react";

export default function StudentFeedbackPage() {
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [impugnReason, setImpugnReason] = useState("");

  const feedbacks = mockFeedback.filter((f) => f.to === "student");

  // Configuración de UI según el tipo de feedback
  const getFeedbackConfig = (type: string) => {
    switch (type) {
      case "positive":
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-600" />,
          bgColor: "bg-green-50 border-green-100",
          badgeClass: "bg-green-50 text-green-700 border-green-200",
          label: "Aprobado / Positivo"
        };
      case "negative":
        return {
          icon: <X className="w-4 h-4 text-red-600" />,
          bgColor: "bg-red-50 border-red-100",
          badgeClass: "bg-red-50 text-red-700 border-red-200",
          label: "Crítico / Negativo"
        };
      case "report":
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          bgColor: "bg-amber-50 border-amber-100",
          badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
          label: "Reporte de Sistema"
        };
      default:
        return {
          icon: <MessageCircle className="w-4 h-4 text-[#0039A6]" />,
          bgColor: "bg-[#EAF3FF] border-[#D6E4FF]/60",
          badgeClass: "bg-[#EAF3FF] text-[#0039A6] border-[#D6E4FF]",
          label: "Informativo"
        };
    }
  };

  const handleSendImpugn = (id: number, author: string) => {
    if (!impugnReason.trim()) {
      alert("Por favor, escribe la justificación técnico-legal para la impugnación.");
      return;
    }
    alert(`Impugnación enviada para la evaluación de ${author}.\n\nMotivo: "${impugnReason}"`);
    setImpugnReason("");
    setSelectedFeedback(null);
  };

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      
      {/* HEADER PRINCIPAL */}
      <div className="mb-6 border-b border-[#D6E4FF] pb-4">
        <h1 className="text-3xl font-extrabold text-[#0039A6] tracking-tight flex items-center gap-2.5">
          <MessageSquare className="w-7 h-7" />
          Historial de Evaluaciones y Feedback
        </h1>
        <p className="text-slate-500 text-sm mt-0.5 font-medium">
          Revisa las auditorías emitidas por las empresas, reportes automatizados e impugna fallos de ser necesario.
        </p>
      </div>

      {/* BANDEJA DE FEEDBACK COMPACTA */}
      <Card className="bg-white border border-[#D6E4FF] rounded-2xl overflow-hidden shadow-2xs divide-y divide-slate-100">
        {feedbacks.map((f) => {
          const config = getFeedbackConfig(f.type);
          return (
            <div
              key={f.id}
              onClick={() => setSelectedFeedback(f)}
              className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-all cursor-pointer group"
            >
              {/* Contenido izquierdo */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`p-2.5 rounded-xl border shrink-0 ${config.bgColor}`}>
                  {config.icon}
                </div>
                
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-[#0039A6] transition-colors">
                      {f.authorName}
                    </h2>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
                      • <Clock className="w-3 h-3" /> Estado: {f.status || "Procesado"}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs truncate max-w-xl mt-0.5">
                    {f.message}
                  </p>
                </div>
              </div>

              {/* Tag y flecha derecha */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border ${config.badgeClass}`}>
                  {f.type}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0039A6] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </Card>


      {/* ================= VENTANA EMERGENTE (MODAL) MVP DE DETALLE E IMPUGNACIÓN ================= */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-[#D6E4FF] overflow-hidden flex flex-col animate-scaleUp">
            
            {/* Cabecera del Modal */}
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg border ${getFeedbackConfig(selectedFeedback.type).bgColor}`}>
                  {getFeedbackConfig(selectedFeedback.type).icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                    Evaluador: {selectedFeedback.authorName}
                  </span>
                  <h3 className="text-base font-bold text-slate-800">
                    {getFeedbackConfig(selectedFeedback.type).label}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedFeedback(null); setImpugnReason(""); }}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-6 space-y-4 text-sm text-slate-600">
              
              {/* Comentario principal de la Empresa */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Cuerpo de la Evaluación</span>
                <p className="text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                  {selectedFeedback.message}
                </p>
              </div>

              {/* Skills Asociadas */}
              {selectedFeedback.skills && selectedFeedback.skills.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Tecnologías Evaluadas</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFeedback.skills.map((s: string) => (
                      <span key={s} className="px-2.5 py-0.5 text-xs font-semibold rounded-lg bg-[#EAF3FF] text-[#0039A6] border border-[#D6E4FF]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Alerta de Políticas si es negativo o un reporte */}
              {(selectedFeedback.type === "negative" || selectedFeedback.type === "report") && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Arbitraje Técnico:</strong> Cuentas con un plazo reglamentario para argumentar fallos o falsos positivos antes de que afecte tu score inteligente global.
                  </span>
                </div>
              )}

              {/* INPUT MVP: FORMULARIO DE RAZÓN DE IMPUGNACIÓN DIRECTO */}
              <div className="pt-2 border-t border-dashed border-slate-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0039A6] uppercase tracking-wider">
                  <Scale className="w-3.5 h-3.5" /> Formular Impugnación de Criterio (MVP)
                </div>
                <div className="flex gap-2 items-center">
                  <Input
                    value={impugnReason}
                    onChange={(e) => setImpugnReason(e.target.value)}
                    placeholder="Escribe la razón (Ej: El repositorio cuenta con los test solicitados en la carpeta...)"
                    className="h-9.5 text-xs bg-slate-50 focus-visible:ring-[#0039A6] border-[#D6E4FF] rounded-xl"
                  />
                  <Button
                    onClick={() => handleSendImpugn(selectedFeedback.id, selectedFeedback.authorName)}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl h-9.5 px-4 text-xs font-semibold shrink-0 flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" /> Impugnar
                  </Button>
                </div>
              </div>

            </div>

            {/* Acciones base en el Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <Button 
                onClick={() => { alert("Aceptado en tu perfil público."); setSelectedFeedback(null); }}
                className="bg-[#0039A6] hover:bg-[#002B7A] text-white text-xs font-semibold rounded-xl px-4 h-9.5"
              >
                Aceptar evaluación
              </Button>
              <Button 
                variant="outline"
                onClick={() => { alert("Feedback archivado."); setSelectedFeedback(null); }}
                className="text-xs rounded-xl border-slate-200 text-slate-500 h-9.5"
              >
                Ocultar de la vista
              </Button>
            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
}