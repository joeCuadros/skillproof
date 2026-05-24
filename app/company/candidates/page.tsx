"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import CompanySidebar from "@/components/sidebar/company-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUsers } from "@/mock/users";
import { mockChallenges } from "@/mock/challenges";
import { 
  Users, Search, GraduationCap, Mail, Sparkles, X, 
  FileText, Download, Award, Target, Briefcase, MessagesSquare 
} from "lucide-react";

export default function CompanyCandidatesPage() {
  // Estados para Filtros
  const [selectedChallenge, setSelectedChallenge] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Estados para Ventana Emergente de Perfil
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [activeStudent, setActiveStudent] = useState<any>(null);

  // Filtrado inicial de roles de estudiantes
  const students = mockUsers.filter((u) => u.role === "student");

  // Extracción automática de Habilidades Únicas
  const allSkills = Array.from(
    new Set(students.flatMap((u: any) => u.skills || []))
  );

  // Asignación estática simulada de Seniority para romper la homogeneidad
  const getSeniorityBadge = (index: number) => {
    const levels = [
      { label: "Senior", styles: "bg-purple-50 text-purple-700 border-purple-200" },
      { label: "Semi-Senior", styles: "bg-amber-50 text-amber-700 border-amber-200" },
      { label: "Junior", styles: "bg-[#EAF3FF] text-[#0039A6] border-[#D6E4FF]" }
    ];
    return levels[index % levels.length];
  };

  // Lógica de filtrado combinada
  const filteredStudents = students.filter((u: any) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkill = selectedSkill === "all" || (u.skills || []).includes(selectedSkill);
    
    const targetChallenge = mockChallenges.find(c => c.id === selectedChallenge);
    const matchesChallenge = selectedChallenge === "all" || 
      (targetChallenge && (u.skills || []).some((s: string) => targetChallenge.skills.includes(s)));

    return matchesSearch && matchesSkill && matchesChallenge;
  });

  const handleOpenProfile = (student: any) => {
    setActiveStudent(student);
    setOpenProfileModal(true);
  };

  return (
    <DashboardLayout sidebar={<CompanySidebar />}>
      
      {/* HEADER PRINCIPAL */}
      <div className="mb-8 border-b border-[#D6E4FF] pb-6">
        <h1 className="text-4xl font-extrabold text-[#0039A6] tracking-tight flex items-center gap-3">
          <Users className="w-9 h-9" />
          Gestión de Candidatos
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Inspecciona perfiles, audita CVs firmados y mide el índice de coincidencia con tus retos activos.
        </p>
      </div>

      {/* BARRA DE FILTROS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-white p-4 rounded-2xl border border-[#D6E4FF]/70 shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Buscar por nombre o correo..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl text-sm h-11"
          />
        </div>

        <select
          className="w-full border border-[#D6E4FF] focus:border-[#0039A6] outline-none rounded-xl px-3 h-11 text-sm bg-white font-medium text-slate-700 transition-all"
          value={selectedChallenge}
          onChange={(e) => setSelectedChallenge(e.target.value)}
        >
          <option value="all">Filtrar por Retos Activos</option>
          {mockChallenges.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>

        <select
          className="w-full border border-[#D6E4FF] focus:border-[#0039A6] outline-none rounded-xl px-3 h-11 text-sm bg-white font-medium text-slate-700 transition-all"
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          <option value="all">Todas las habilidades</option>
          {allSkills.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* GRID DE CANDIDATOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {filteredStudents.map((user: any, index: number) => {
          const levelBadge = getSeniorityBadge(index);
          return (
            <Card
              key={user.id}
              className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px] space-y-4 relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-snug">
                      {user.name}
                    </h2>
                    <p className="text-slate-400 text-xs font-semibold flex items-center gap-1 mt-1">
                      <Mail className="w-3.5 h-3.5" /> {user.email}
                    </p>
                  </div>
                  
                  {/* BADGE DE SENIORITY VARIABLE */}
                  <span className={`text-[11px] px-3 py-0.5 font-bold rounded-full border tracking-wide uppercase shrink-0 ${levelBadge.styles}`}>
                    {levelBadge.label}
                  </span>
                </div>

                {/* CONTENEDOR DE TAGS DE HABILIDADES */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Habilidades Clave</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(user.skills || []).slice(0, 5).map((skill: string) => (
                      <span 
                        key={skill} 
                        className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-[#F0F4FA] text-slate-700 border border-slate-200/40 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skills?.length > 5 && (
                      <span className="text-[11px] font-bold text-[#0039A6] bg-[#EAF3FF] px-2.5 py-1 rounded-xl">
                        +{user.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* INSIGNIA INTELIGENTE CORE */}
                <div className="p-3 rounded-2xl bg-[#F0F5FF] border border-[#0039A6]/20 text-[11px] text-slate-600 flex items-start gap-2 leading-relaxed">
                  <Sparkles className="w-4 h-4 text-[#0039A6] shrink-0 mt-0.5 animate-pulse" />
                  <span><strong>Validación IA:</strong> Nivel de confianza verificado. {user.xp || 120} XP acumulados mediante entregables auditados.</span>
                </div>
              </div>

              {/* ACCIÓN ÚNICA: VER PERFIL */}
              <div className="pt-2 border-t border-slate-50">
                <Button 
                  onClick={() => handleOpenProfile(user)}
                  className="w-full bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl text-xs py-3.5 shadow-xs transition-all"
                >
                  Ver perfil completo y CV
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ================= VENTANA EMERGENTE DE PERFIL: DETALLE + VISOR DE CV PDF ================= */}
      {openProfileModal && activeStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl border border-[#D6E4FF] overflow-hidden flex flex-col h-[85vh] animate-scaleUp">
            
            {/* ENCABEZADO MODAL */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#EAF3FF] p-2.5 rounded-xl text-[#0039A6]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">{activeStudent.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {activeStudent.email} • {activeStudent.university || "Universidad Tecnológica"}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setOpenProfileModal(false)}
                className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CUERPO CENTRAL DE DOBLE COLUMNA */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
              
              {/* COLUMNA IZQUIERDA: VISOR DE CV PDF INTERACTIVO */}
              <div className="w-full md:w-1/2 bg-slate-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
                <div className="text-xs font-bold text-[#0039A6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Archivo de Currículum Indexado
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 bg-white/70 border border-dashed border-slate-300 rounded-2xl p-4">
                  <FileText className="w-16 h-16 text-[#0039A6]/80 animate-pulse" />
                  <div>
                    <p className="text-sm font-bold text-slate-700">CV_{activeStudent.name.replace(" ", "_")}_Verificado.pdf</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Tamaño: 2.4 MB • Firma Criptográfica Activa</p>
                  </div>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Este documento consolida las experiencias, habilidades validadas y retos completados dentro del ecosistema tecnológico.
                  </p>
                </div>

                <Button
                  onClick={() => alert("Simulación: Descargando CV firmado digitalmente...")}
                  className="mt-4 bg-[#0039A6] hover:bg-[#002B7A] text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold py-4 shadow-xs"
                >
                  <Download className="w-4 h-4" /> Descargar CV en PDF original
                </Button>
              </div>

              {/* COLUMNA DERECHA: METRICAS Y AFINIDAD */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-5">
                <div className="space-y-5">
                  
                  {/* SECCIÓN PUNTUACIONES */}
                  <div>
                    <h4 className="text-xs font-bold text-[#0039A6] uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" /> Récord Académico y de Plataforma
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Puntaje XP</span>
                        <span className="text-lg font-black text-[#0039A6]">{activeStudent.xp || 120}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Certificados</span>
                        <span className="text-lg font-black text-slate-800">{activeStudent.certifications?.length || 2}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Estatus IA</span>
                        <span className="text-xs font-black text-green-600 block mt-1 uppercase">Validado</span>
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN SKILLS COMPLETA (TAGS INTERNOS) */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Desglose Completo de Habilidades
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(activeStudent.skills || []).map((skill: string) => (
                        <span key={skill} className="px-3 py-1 rounded-xl text-xs font-bold bg-[#EAF3FF] text-[#0039A6] border border-[#D6E4FF]/40">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* LOGROS Y FEEDBACK DEL MOTOR */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" /> Auditoría del Core de Inteligencia Artificial
                    </h4>
                    <div className="bg-amber-50/60 border border-amber-200/50 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
                      El candidato cuenta con competencias sólidas indexadas. Patrón óptimo verificado en el análisis estructurado de código y despliegues eficientes en entornos productivos simulados.
                    </div>
                  </div>
                </div>

                {/* BOTÓN DE CONTACTO INMEDIATO */}
                <Button
                  onClick={() => {
                    alert(`Simulación: Enlace directo enviado a ${activeStudent.name}. Se ha notificado a su casilla.`);
                    setOpenProfileModal(false);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-xs py-4.5 mt-4 shadow-sm"
                >
                  <MessagesSquare className="w-4 h-4" /> Agendar Entrevista / Contactar Talento
                </Button>
              </div>

            </div>

            {/* PIE DE PÁGINA GLOBAL */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setOpenProfileModal(false)}
                className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl px-6 text-xs"
              >
                Cerrar Expediente
              </Button>
            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
}