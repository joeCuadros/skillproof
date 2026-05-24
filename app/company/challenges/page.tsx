"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import CompanySidebar from "@/components/sidebar/company-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { mockChallenges } from "@/mock/challenges";
import { 
  Trophy, Building2, X, Plus, Edit3, Users, Award, 
  Settings, ShieldAlert, Send, UploadCloud, FileText, Download, MessagesSquare, Sparkles 
} from "lucide-react";

export default function CompanyChallengesPage() {
  // Estados para Modales
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openPostulantsModal, setOpenPostulantsModal] = useState(false);
  const [openCertificateModal, setOpenCertificateModal] = useState(false);

  // Estados de datos activos
  const [activeChallenge, setActiveChallenge] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  // Campos de formulario para Crear / Editar
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDifficulty, setFormDifficulty] = useState("Intermedio");
  const [formReward, setFormReward] = useState("");

  // Estado para capturar el feedback individual por candidato (ID o índice como llave)
  const [individualFeedback, setIndividualFeedback] = useState<{ [key: number]: string }>({});

  // Mock de candidatos con puntajes automáticos para el Top
  const mockCandidates = [
    { id: 101, name: "Carlos Mendoza", score: 96, file: "solucion_arquitectura_final.zip", time: "Hace 2 horas" },
    { id: 102, name: "Ana Sofía Torres", score: 89, file: "query_optimization_v2.sql", time: "Hace 5 horas" },
    { id: 103, name: "Jean Pierre Claux", score: 78, file: "index_fix_script.py", time: "Hace 1 día" },
  ];

  // Controladores de acciones
  const handleOpenCreate = () => {
    setActiveChallenge(null);
    setIsEditing(false);
    setFormTitle("");
    setFormDesc("");
    setFormDifficulty("Intermedio");
    setFormReward("");
    setOpenFormModal(true);
  };

  const handleOpenEdit = (challenge: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveChallenge(challenge);
    setIsEditing(true);
    setFormTitle(challenge.title);
    setFormDesc(challenge.description);
    setFormDifficulty(challenge.difficulty || "Intermedio");
    setFormReward(challenge.reward || "");
    setOpenFormModal(true);
  };

  const handleOpenPostulants = (challenge: any) => {
    setActiveChallenge(challenge);
    setOpenPostulantsModal(true);
  };

  const handleOpenCertificate = () => {
    setFileName(null);
    setOpenCertificateModal(true);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  // Manejador para enviar el feedback de un estudiante específico
  const handleSendFeedback = (candidateId: number, candidateName: string) => {
    const text = individualFeedback[candidateId];
    if (!text || !text.trim()) {
      alert("Por favor, escribe un comentario antes de enviar.");
      return;
    }
    alert(`Feedback enviado a ${candidateName}: "${text}"`);
    // Limpiar input de ese usuario
    setIndividualFeedback(prev => ({ ...prev, [candidateId]: "" }));
  };

  return (
    <DashboardLayout sidebar={<CompanySidebar />}>
      
      {/* HEADER PRINCIPAL */}
      <div className="mb-8 border-b border-[#D6E4FF] pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-[#0039A6] tracking-tight flex items-center gap-3">
            <Settings className="w-9 h-9" />
            Gestión de Retos
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Publica, evalúa y conecta con talento técnico verificado por auditorías de IA.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl px-5 py-5 flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" /> Crear nuevo reto
        </Button>
      </div>

      {/* GRID DE RETOS EMITIDOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {mockChallenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[320px] space-y-4 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight line-clamp-1">
                  {challenge.title}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleOpenEdit(challenge, e)}
                  className="h-8 w-8 rounded-lg text-slate-400 hover:text-[#0039A6] hover:bg-[#EAF3FF] shrink-0"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                <Building2 className="w-3.5 h-3.5" /> {challenge.company}
              </div>

              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                {challenge.description}
              </p>

              {/* METADATOS TÉCNICOS */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-medium text-slate-600">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">🎯 Dificultad: <span className="font-bold text-slate-800">{challenge.difficulty || "Media"}</span></div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">🏆 Recompensa: <span className="font-bold text-[#0039A6]">{challenge.reward || "Certificado"}</span></div>
              </div>

              {/* SKILLS */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {challenge.skills?.map((skill: string) => (
                  <span key={skill} className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-[#EAF3FF] text-[#0039A6] border border-[#D6E4FF]/40">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* REGLA CORE EMBEBIDA */}
            <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-[11px] text-amber-800 flex items-start gap-1.5 leading-normal">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>Regla contractual: Requiere asignación obligatoria de feedback o recompensa al cierre.</span>
            </div>

            {/* ACCIÓN PRINCIPAL */}
            <Button
              onClick={() => handleOpenPostulants(challenge)}
              className="w-full bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm py-4 shadow-sm"
            >
              <Users className="w-4 h-4" /> Ver postulantes y evaluar
            </Button>
          </Card>
        ))}
      </div>

      {/* ================= MODAL 1: FORMULARIO (CREAR / EDITAR RETO) ================= */}
      {openFormModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-[#D6E4FF] flex flex-col animate-scaleUp max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                {isEditing ? "Modificar Reto Técnico" : "Publicar Nuevo Reto"}
              </h3>
              <button onClick={() => setOpenFormModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0039A6] uppercase tracking-wider">Título del Reto</label>
                <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Ej. Optimización de Querys en PostgreSQL" className="rounded-xl border-[#D6E4FF]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0039A6] uppercase tracking-wider">Descripción Breve</label>
                <Textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} rows={4} placeholder="Detalla los requisitos técnicos del entregable..." className="rounded-xl border-[#D6E4FF]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0039A6] uppercase tracking-wider">Dificultad</label>
                  <select value={formDifficulty} onChange={(e) => setFormDifficulty(e.target.value)} className="w-full border border-[#D6E4FF] rounded-xl p-2.5 text-sm bg-white font-medium text-slate-700">
                    <option>Principiante</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0039A6] uppercase tracking-wider">Compensación / Incentivo</label>
                  <Input value={formReward} onChange={(e) => setFormReward(e.target.value)} placeholder="Ej. Certificado Oficial + Entrevista" className="rounded-xl border-[#D6E4FF]" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-3xl">
              <Button variant="outline" onClick={() => setOpenFormModal(false)} className="rounded-xl border-slate-200">Cancelar</Button>
              <Button onClick={() => setOpenFormModal(false)} className="bg-[#0039A6] hover:bg-[#002B7A] rounded-xl px-5 text-white">
                {isEditing ? "Guardar Cambios" : "Lanzar Reto Público"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: MONITOR DE EVALUACIÓN (RANKING + COMENTARIO DIRECTO) ================= */}
      {openPostulantsModal && activeChallenge && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl border border-[#D6E4FF] flex flex-col animate-scaleUp max-h-[85vh]">
            
            {/* CABECERA */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[#0039A6] font-bold uppercase tracking-wider text-[11px] mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Ranking de Soluciones Automatizado por IA
                </div>
                <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{activeChallenge.title}</h3>
              </div>
              <button onClick={() => setOpenPostulantsModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CUERPO DEL RANKING */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <p className="text-xs font-medium text-slate-500">
                Los candidatos han sido ordenados automáticamente según la calidad del código. Puedes enviarles observaciones individuales directamente:
              </p>
              
              {/* LISTADO DE CANDIDATOS */}
              <div className="space-y-4">
                {mockCandidates.map((candidate, idx) => (
                  <div 
                    key={candidate.id} 
                    className={`p-4 border rounded-2xl flex flex-col gap-3 transition-all ${
                      idx === 0 
                        ? "bg-[#F0F5FF] border-[#0039A6]/40 shadow-xs" 
                        : "bg-white border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    {/* INFO Y PUNTUACIÓN */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${
                            idx === 0 ? "bg-[#0039A6] text-white" : "bg-slate-200 text-slate-600"
                          }`}>
                            #{idx + 1}
                          </span>
                          <h4 className="font-bold text-slate-800 text-sm">{candidate.name}</h4>
                        </div>

                        <p className="text-[11px] text-slate-400 font-medium">
                          Archivo: <span className="text-slate-600 underline cursor-pointer">{candidate.file}</span> • {candidate.time}
                        </p>
                      </div>

                      {/* ACCIONES DE ESTADO */}
                      <div className="flex gap-2 items-center shrink-0">
                        <Button 
                          onClick={handleOpenCertificate} 
                          size="sm" 
                          className="bg-[#0039A6] hover:bg-[#002B7A] text-white rounded-xl text-xs gap-1 h-9 font-semibold"
                        >
                          <Award className="w-3.5 h-3.5" /> Certificar
                        </Button>
                        
                        <Button 
                          onClick={() => alert(`Simulación: Conectando con ${candidate.name}.`)} 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs gap-1 h-9 font-semibold"
                        >
                          <MessagesSquare className="w-3.5 h-3.5" /> Contactar
                        </Button>
                      </div>
                    </div>

                    {/* BARRA DE PROGRESO DE COINCIDENCIA TÉCNICA */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-400 uppercase tracking-wide">Match de Habilidades</span>
                        <span className="text-[#0039A6]">{candidate.score}%</span>
                      </div>
                      <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#0039A6] h-full rounded-full transition-all" 
                          style={{ width: `${candidate.score}%` }} 
                        />
                      </div>
                    </div>

                    {/* NUEVO INPUT DE FEEDBACK INDIVIDUAL RÁPIDO */}
                    <div className="flex gap-2 items-center mt-1 pt-2 border-t border-dashed border-slate-100">
                      <Input
                        value={individualFeedback[candidate.id] || ""}
                        onChange={(e) => setIndividualFeedback(prev => ({ ...prev, [candidate.id]: e.target.value }))}
                        placeholder={`Escribir feedback rápido para ${candidate.name.split(' ')[0]}...`}
                        className="h-8.5 text-xs bg-slate-50/50 focus-visible:ring-[#0039A6] rounded-lg border-slate-200"
                      />
                      <Button
                        onClick={() => handleSendFeedback(candidate.id, candidate.name)}
                        size="sm"
                        className="bg-slate-800 hover:bg-slate-900 text-white rounded-lg h-8.5 px-3 text-xs shrink-0 font-medium flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" /> Enviar
                      </Button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* BOTONES ACCIONES BAJAS */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2 rounded-b-3xl">
              <Button onClick={() => setOpenPostulantsModal(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs px-4 h-9">Cerrar Monitor</Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: EMISIÓN DE CERTIFICADO ================= */}
      {openCertificateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#D6E4FF] overflow-hidden flex flex-col h-[75vh] animate-scaleUp">
            
            <div className="p-5 border-b border-slate-100 bg-[#F7FAFF] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#0039A6]" />
                <h3 className="font-bold text-slate-800 text-base">Emisión y Carga de Certificado Digital</h3>
              </div>
              <button onClick={() => setOpenCertificateModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* LADO IZQUIERDO: VISOR */}
              <div className="w-full md:w-1/2 bg-slate-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
                <span className="text-[10px] font-bold text-[#0039A6] tracking-wider uppercase block">Previsualización de Plantilla</span>
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                  <FileText className="w-14 h-14 text-slate-400 animate-pulse" />
                  <p className="text-xs font-semibold text-slate-600 max-w-xs truncate">{fileName || "Vista_Previa_Standard.pdf"}</p>
                  <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">El sistema inyectará la firma criptográfica y el nombre del ganador sobre el layout final automáticamente.</p>
                </div>
                <Button variant="outline" onClick={() => alert("Descargando plantilla actual...")} className="bg-white text-xs rounded-xl border-slate-300"><Download className="w-3.5 h-3.5 mr-1" /> Ver Estilo Base</Button>
              </div>

              {/* LADO DERECHO: SUBIDA DE ARCHIVO */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#0039A6] uppercase tracking-wider mb-0.5">Sustento de Acreditación</h4>
                    <p className="text-[11px] text-slate-400">Adjunta el archivo PDF firmado o la credencial corporativa oficial del evento.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Archivo del Certificado</label>
                    <div className="border-2 border-dashed border-[#D6E4FF] hover:border-[#0039A6] bg-[#F7FAFF] rounded-2xl p-5 text-center relative cursor-pointer group transition-all">
                      <input type="file" onChange={handleSimulateUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <UploadCloud className="w-7 h-7 text-[#0039A6] mx-auto mb-1 group-hover:scale-105 transition-transform" />
                      {fileName ? (
                        <p className="text-xs font-bold text-green-600">✓ {fileName}</p>
                      ) : (
                        <p className="text-xs text-slate-500 font-medium">Arrastra el archivo final (.pdf)</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Comentario para el feed público</label>
                    <Textarea rows={2} placeholder="Felicita al estudiante o añade especificaciones que aparecerán en su perfil inteligente..." className="rounded-xl text-xs border-[#D6E4FF]" />
                  </div>
                </div>

                <Button
                  onClick={() => { alert("Simulación: ¡Certificado emitido e indexado!"); setOpenCertificateModal(false); }}
                  disabled={!fileName}
                  className="w-full bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-xs py-4 disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" /> Confirmar y Emitir Credencial
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
}