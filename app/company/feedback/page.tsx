"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import CompanySidebar from "@/components/sidebar/company-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, Users, Star, ArrowRight, X, Clock, 
  ShieldAlert, Scale, Send, ShieldX, MessageCircle, 
  AlertTriangle, CheckCircle, PlusCircle, Award
} from "lucide-react";

// MOCK INITIAL DE DATA DE FEEDBACK PARA LA EMPRESA
const INITIAL_FEEDBACKS = [
  {
    id: 1,
    authorName: "Carlos Mendoza",
    to: "company",
    type: "positive",
    message: "El reto de arquitectura de software estuvo excelente. Los requerimientos de escalabilidad en AWS fueron súper realistas y me ayudaron a medir mi nivel en entornos e-commerce reales.",
    rating: 5,
    skills: ["AWS", "Node.js", "Docker"],
    status: "Leído"
  },
  {
    id: 2,
    authorName: "Ana Sofía Torres",
    to: "company",
    type: "negative",
    message: "La sandbox automatizada me arrojó un timeout inesperado al ejecutar las migraciones de PostgreSQL. Estoy segura de que mis queries estaban optimizadas, solicito una revisión manual del script adjunto.",
    rating: 2,
    skills: ["PostgreSQL", "SQL Server"],
    status: "Pendiente"
  },
  {
    id: 3,
    authorName: "Jean Pierre Claux",
    to: "company",
    type: "report",
    message: "Alerta del validador: El usuario intentó subir un script empaquetado con dependencias externas bloqueadas por las políticas del entorno del reto corporativo.",
    rating: 1,
    skills: ["Python", "FastAPI"],
    status: "Bajo Revisión"
  },
  {
    id: 4,
    authorName: "Diana Villalta",
    to: "company",
    type: "positive",
    message: "Me encantó la velocidad de respuesta del equipo técnico. Tras resolver el bug de concurrencia, recibí una oferta para una entrevista técnica de inmediato. Proceso transparente.",
    rating: 5,
    skills: ["Go", "Redis", "gRPC"],
    status: "Leído"
  }
];

export default function CompanyFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACKS);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [disputeReason, setDisputeReason] = useState("");
  
  // Estados para el Modal de Crear Nuevo Feedback
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newType, setNewType] = useState("positive");
  const [newRating, setNewRating] = useState("5");
  const [newMessage, setNewMessage] = useState("");
  const [newSkills, setNewSkills] = useState("");

  const getFeedbackConfig = (type: string) => {
    switch (type) {
      case "positive":
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-600" />,
          bgColor: "bg-green-50 border-green-100",
          badgeClass: "bg-green-50 text-green-700 border-green-200",
          label: "Opinión Positiva"
        };
      case "negative":
        return {
          icon: <X className="w-4 h-4 text-red-600" />,
          bgColor: "bg-red-50 border-red-100",
          badgeClass: "bg-red-50 text-red-700 border-red-200",
          label: "Reseña Crítica"
        };
      case "report":
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          bgColor: "bg-amber-50 border-amber-100",
          badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
          label: "Reporte de Auditoría / IA"
        };
      default:
        return {
          icon: <MessageCircle className="w-4 h-4 text-[#0039A6]" />,
          bgColor: "bg-[#EAF3FF] border-[#D6E4FF]/60",
          badgeClass: "bg-[#EAF3FF] text-[#0039A6] border-[#D6E4FF]",
          label: "Comentario General"
        };
    }
  };

  const handleSendDispute = (id: number, author: string) => {
    if (!disputeReason.trim()) {
      alert("Por favor, escribe los argumentos de la disputa antes de proceder.");
      return;
    }
    alert(`Disputa/Réplica iniciada formalmente contra la opinión de ${author}.\n\nMotivo del caso: "${disputeReason}"`);
    setDisputeReason("");
    setSelectedFeedback(null);
  };

  // Guardar nueva evaluación de la empresa hacia un estudiante
  const handleCreateFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newMessage.trim()) {
      alert("Por favor, completa los campos requeridos (Estudiante y Mensaje).");
      return;
    }

    const newFeedbackItem = {
      id: feedbacks.length + 1,
      authorName: newStudentName,
      to: "company", 
      type: newType,
      message: newMessage,
      rating: Number(newRating),
      skills: newSkills ? newSkills.split(",").map(s => s.trim()) : [],
      status: "Enviado"
    };

    setFeedbacks([newFeedbackItem, ...feedbacks]);
    setIsCreateOpen(false);
    
    // Resetear formulario
    setNewStudentName("");
    setNewType("positive");
    setNewRating("5");
    setNewMessage("");
    setNewSkills("");
  };

  return (
    <DashboardLayout sidebar={<CompanySidebar />}>
      
      {/* HEADER PRINCIPAL */}
      <div className="mb-6 border-b border-[#D6E4FF] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0039A6] tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7" />
            Feedback de Talento ({feedbacks.length})
          </h1>
          <p className="text-slate-500 text-sm mt-0.5 font-medium">
            Monitorea la experiencia de los candidatos, responde revisiones técnicas y publica evaluaciones.
          </p>
        </div>

        {/* BOTÓN AGREGAR FEEDBACK */}
        <Button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#0039A6] hover:bg-[#002B7A] text-white rounded-xl text-xs font-bold px-4 h-10 shadow-sm shrink-0 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Emitir Nuevo Feedback
        </Button>
      </div>

      {/* BANDEJA COMPACTA DE CORREOS/OPINIONES */}
      <Card className="bg-white border border-[#D6E4FF] rounded-2xl overflow-hidden shadow-2xs divide-y divide-slate-100">
        {feedbacks.map((f) => {
          const config = getFeedbackConfig(f.type);
          return (
            <div
              key={f.id}
              onClick={() => setSelectedFeedback(f)}
              className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-all cursor-pointer group"
            >
              {/* Contenido Principal */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`p-2.5 rounded-xl border shrink-0 ${config.bgColor}`}>
                  {config.icon}
                </div>
                
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-[#0039A6] transition-colors">
                      {f.authorName}
                    </h2>
                    {f.rating && (
                      <span className="text-[11px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded-md border border-amber-100 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" /> {f.rating}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
                      • <Clock className="w-3 h-3" /> {f.status}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs truncate max-w-xl mt-0.5">
                    {f.message}
                  </p>
                </div>
              </div>

              {/* Badges de Tipo y Flecha */}
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

      {/* ================= VENTANA EMERGENTE (MODAL): EMITIR NUEVO FEEDBACK ================= */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <form 
            onSubmit={handleCreateFeedback}
            className="bg-white w-full max-w-lg rounded-3xl shadow-xl border border-[#D6E4FF] overflow-hidden flex flex-col animate-scaleUp"
          >
            {/* Cabecera del Formulario */}
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#EAF3FF] text-[#0039A6] rounded-lg border border-[#D6E4FF]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    Emitir Evaluación de Talento
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Registra el performance del estudiante en la sandbox o proyecto
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo del Formulario */}
            <div className="p-6 space-y-4 text-sm text-slate-600">
              {/* Input: Nombre del Estudiante */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Nombre del Estudiante / Postulante *
                </label>
                <Input
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Ej: Jean Paul Valencia"
                  className="h-10 text-xs bg-slate-50 focus-visible:ring-[#0039A6] border-[#D6E4FF] rounded-xl"
                />
              </div>

              {/* Grid: Criterio y Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    Tipo de Criterio
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-slate-50 border border-[#D6E4FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0039A6]/20 text-slate-700 font-medium"
                  >
                    <option value="positive">Aprobado / Positivo</option>
                    <option value="negative">Crítico / Negativo</option>
                    <option value="report">Reportar Incidencia o Abuso</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    Puntuación (Rating)
                  </label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-slate-50 border border-[#D6E4FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0039A6]/20 text-slate-700 font-medium"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                    <option value="3">⭐⭐⭐ (3/5)</option>
                    <option value="2">⭐⭐ (2/5)</option>
                    <option value="1">⭐ (1/5)</option>
                  </select>
                </div>
              </div>

              {/* Input: Skills */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Tecnologías Clave Evaluadas <span className="text-slate-400">(Separadas por comas)</span>
                </label>
                <Input
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="Ej: Next.js, GraphQL, Prisma"
                  className="h-10 text-xs bg-slate-50 focus-visible:ring-[#0039A6] border-[#D6E4FF] rounded-xl"
                />
              </div>

              {/* Textarea: Mensaje */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Cuerpo del Feedback / Justificación Técnica *
                </label>
                <Textarea
                  required
                  rows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe aquí de forma detallada el performance del candidato, calidad del código o motivos..."
                  className="text-xs bg-slate-50 focus-visible:ring-[#0039A6] border-[#D6E4FF] rounded-xl resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Footer de Acciones del Formulario */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                className="text-xs rounded-xl border-slate-200 text-slate-500 h-10"
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-[#0039A6] hover:bg-[#002B7A] text-white text-xs font-bold rounded-xl px-5 h-10 flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Publicar Evaluación
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ================= VENTANA EMERGENTE (MODAL): DETALLE DE FEEDBACK EXISTENTE ================= */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-[#D6E4FF] overflow-hidden flex flex-col animate-scaleUp">
            
            {/* Cabecera Modal Detalle */}
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg border ${getFeedbackConfig(selectedFeedback.type).bgColor}`}>
                  {getFeedbackConfig(selectedFeedback.type).icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                    Postulante: {selectedFeedback.authorName}
                  </span>
                  <h3 className="text-base font-bold text-slate-800">
                    {getFeedbackConfig(selectedFeedback.type).label}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedFeedback(null); setDisputeReason(""); }}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo del Modal Detalle */}
            <div className="p-6 space-y-4 text-sm text-slate-600">
              
              {/* Bloque del Mensaje */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Declaración o Reseña del Estudiante</span>
                  {selectedFeedback.rating && (
                    <div className="flex items-center gap-0.5 text-xs text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" /> Criterio: {selectedFeedback.rating} / 5
                    </div>
                  )}
                </div>
                <p className="text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                  {selectedFeedback.message}
                </p>
              </div>

              {/* Tags Técnicos */}
              {selectedFeedback.skills && selectedFeedback.skills.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Foco del Proyecto / Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFeedback.skills.map((s: string) => (
                      <span key={s} className="px-2.5 py-0.5 text-xs font-semibold rounded-lg bg-[#EAF3FF] text-[#0039A6] border border-[#D6E4FF]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Alerta si aplica mediación */}
              {(selectedFeedback.type === "negative" || selectedFeedback.type === "report") && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Panel de Mediación:</strong> Abrir una disputa somete este hilo al comité de arbitraje técnico. Adjunta argumentos sólidos basados en el log de la sandbox.
                  </span>
                </div>
              )}

              {/* INPUT MVP: REPLICA DE DISPUTA DIRECTA */}
              <div className="pt-2 border-t border-dashed border-slate-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0039A6] uppercase tracking-wider">
                  <Scale className="w-3.5 h-3.5" /> Proceder con Contra-Argumento o Réplica (MVP)
                </div>
                <div className="flex gap-2 items-center">
                  <Input
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    placeholder="Escribe la justificación para abrir disputa o responder formalmente..."
                    className="h-9.5 text-xs bg-slate-50 focus-visible:ring-[#0039A6] border-[#D6E4FF] rounded-xl"
                  />
                  <Button
                    onClick={() => handleSendDispute(selectedFeedback.id, selectedFeedback.authorName)}
                    className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl h-9.5 px-4 text-xs font-semibold shrink-0 flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" /> Abrir Disputa
                  </Button>
                </div>
              </div>

            </div>

            {/* Footer del Modal Detalle */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <Button 
                onClick={() => { alert("Respuesta base enviada satisfactoriamente."); setSelectedFeedback(null); }}
                className="bg-[#0039A6] hover:bg-[#002B7A] text-white text-xs font-semibold rounded-xl px-4 h-9.5"
              >
                Responder de forma ordinaria
              </Button>
              <Button 
                onClick={() => { alert("Reporte de abuso escalado a soporte."); setSelectedFeedback(null); }}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl px-3 h-9.5 flex items-center gap-1"
              >
                <ShieldX className="w-3.5 h-3.5" /> Reportar Mal Uso
              </Button>
            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
}