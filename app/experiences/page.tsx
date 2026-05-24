"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StudentSidebar from "@/components/sidebar/student-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { mockExperiences } from "@/mock/experiences";
import { Briefcase, ShieldCheck, ShieldAlert, X, Eye, FileText, Download, UploadCloud, Send, Plus, Building2, Sparkles } from "lucide-react";

export default function ExperiencesPage() {
  const [openModal, setOpenModal] = useState(false);
  const [activeExp, setActiveExp] = useState<any>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  // Campos para simulación de nueva experiencia
  const [newCompany, setNewCompany] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleOpenManageModal = (exp: any) => {
    setActiveExp(exp);
    setIsCreatingNew(false);
    setFileName(null);
    setOpenModal(true);
  };

  const handleOpenCreateModal = () => {
    setActiveExp(null);
    setIsCreatingNew(true);
    setFileName(null);
    setNewCompany("");
    setNewRole("");
    setOpenModal(true);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      {/* HEADER PRINCIPAL */}
      <div className="mb-8 border-b border-[#D6E4FF] pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-[#0039A6] tracking-tight flex items-center gap-3">
            <Briefcase className="w-9 h-9" />
            Experiencias Verificadas
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Historial de tus etapas laborales validadas y auditadas por empresas reales y nuestro núcleo IA.
          </p>
        </div>

        {/* BOTÓN AGREGAR NUEVA EXPERIENCIA */}
        <Button
          onClick={handleOpenCreateModal}
          className="bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl px-5 py-5 flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" /> Agregar Experiencia
        </Button>
      </div>

      {/* GRID DE EXPERIENCIAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {mockExperiences.map((exp) => (
          <Card
            key={exp.id}
            onClick={() => handleOpenManageModal(exp)}
            className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#0039A6]/40 transition-all duration-300 flex flex-col justify-between min-h-[240px] space-y-4 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 h-full w-1.5 bg-[#0039A6] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-snug">
                    {exp.role}
                  </h2>
                  <p className="text-slate-500 text-sm font-semibold flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0039A6]" />
                    {exp.company}
                  </p>
                </div>
                
                {/* BADGE DE VERIFICACIÓN */}
                <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase shrink-0 ${
                  exp.verified ? "bg-[#EAF3FF] text-[#0039A6]" : "bg-red-50 text-red-600 border border-red-100"
                }`}>
                  {exp.verified ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                  {exp.verified ? "Verificado" : "Pendiente"}
                </div>
              </div>

              {/* FEEDBACK IA BREVE */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1 text-[#0039A6] font-bold uppercase tracking-wider text-[10px]">
                  <Sparkles className="w-3 h-3" /> Feedback del Sistema
                </div>
                <p className="line-clamp-2 italic">"{exp.feedback}"</p>
              </div>
            </div>

            <div className="text-xs font-semibold text-[#0039A6] flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-all pt-2 border-t border-slate-50">
              <Eye className="w-3.5 h-3.5" /> Ver constancia y gestionar <span className="transition-transform group-hover:translate-x-0.5 ml-1">→</span>
            </div>
          </Card>
        ))}
      </div>

      {/* ================= MODAL MIXTO (PREVIEW PDF + GESTIÓN / SUBIDA) ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl border border-[#D6E4FF] overflow-hidden flex flex-col h-[85vh] animate-scaleUp">
            
            {/* CABECERA */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#EAF3FF] p-2.5 rounded-xl text-[#0039A6]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                    {isCreatingNew ? "Registrar Nueva Experiencia Laboral" : `Sustento de Rol: ${activeExp?.role}`}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {isCreatingNew 
                      ? "Adjunta evidencias para validar tus funciones mediante auditoría inteligente." 
                      : `Organización: ${activeExp?.company} • Usuario: ${activeExp?.student}`
                    }
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setOpenModal(false)}
                className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CUERPO CENTRAL */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
              
              {/* COLUMNA IZQUIERDA: VISOR PDF SIMULADO */}
              <div className="w-full md:w-1/2 bg-slate-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
                <div className="text-xs font-bold text-[#0039A6] uppercase tracking-wider mb-2">
                  Documento de Acreditación (PDF)
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                  <FileText className="w-16 h-16 text-slate-400 animate-pulse" />
                  <p className="text-sm font-semibold text-slate-500 max-w-xs truncate">
                    {isCreatingNew ? (fileName || "Sin documento cargado") : `Constancia_${activeExp?.company}.pdf`}
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    {isCreatingNew 
                      ? "Sube un certificado laboral o contrato para pre-visualizar el archivo digital aquí."
                      : "Constancia firmada digitalmente y auditada. El buffer dinámico cargará el PDF original en producción."
                    }
                  </p>
                </div>

                {!isCreatingNew && (
                  <Button
                    onClick={() => alert("Simulación: Descargando constancia original adjunta...")}
                    variant="outline"
                    className="mt-4 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" /> Descargar Constancia Actual
                  </Button>
                )}
              </div>

              {/* COLUMNA DERECHA: FORMULARIO */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-5">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#0039A6] uppercase tracking-wider mb-1">
                      {isCreatingNew ? "Detalles del Puesto" : "Historial & Feedback"}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Vincular un comprobante legal incrementa la puntuación de confianza de tus habilidades en el perfil público.
                    </p>
                  </div>

                  {/* FORMULARIO ADICIONAL SI ES NUEVO */}
                  {isCreatingNew ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Empresa / Institución</label>
                        <Input 
                          placeholder="Ej. Microsoft Perú" 
                          value={newCompany}
                          onChange={(e) => setNewCompany(e.target.value)}
                          className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Cargo / Rol Ocupado</label>
                        <Input 
                          placeholder="Ej. Fullstack Developer Junior" 
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl text-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="bg-blue-50/50 border border-[#D6E4FF]/60 rounded-2xl p-4 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-[#0039A6] uppercase block tracking-wider text-[10px]">Registro de Auditoría Activa</span>
                      <p className="leading-relaxed whitespace-pre-line">{activeExp?.feedback}</p>
                    </div>
                  )}

                  {/* DROPZONE DE SUBIDA DE ARCHIVOS */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      {isCreatingNew ? "Cargar Constancia de Trabajo" : "Actualizar Archivo Probatorio (.pdf)"}
                    </label>
                    <div className="border-2 border-dashed border-[#D6E4FF] hover:border-[#0039A6] bg-[#F7FAFF] rounded-2xl p-6 text-center transition relative cursor-pointer group">
                      <input 
                        type="file" 
                        onChange={handleSimulateUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      <UploadCloud className="w-8 h-8 text-[#0039A6] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      
                      {fileName ? (
                        <p className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-lg inline-block border border-green-200">
                          ✓ {fileName}
                        </p>
                      ) : (
                        <>
                          <p className="text-xs font-semibold text-slate-700">
                            Arrastra o selecciona el documento de sustento
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Formatos soportados: PDF de hasta 15MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* TEXTAREA DE COMENTARIOS */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Resumen de responsabilidades o logros
                    </label>
                    <Textarea 
                      placeholder="Describe brevemente las principales tecnologías implementadas, retos resueltos y metas alcanzadas..."
                      rows={3}
                      className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl text-slate-700 text-xs"
                    />
                  </div>
                </div>

                {/* BOTÓN SUBMIT COMPONENTE */}
                <Button
                  onClick={() => {
                    alert(isCreatingNew 
                      ? "Simulación: ¡Nueva experiencia registrada! Entrando en proceso de validación cruzada." 
                      : "Simulación: El nuevo documento de sustento ha sido actualizado con éxito."
                    );
                    setOpenModal(false);
                  }}
                  disabled={isCreatingNew ? (!newCompany || !newRole || !fileName) : false}
                  className="w-full bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm text-sm py-5 disabled:opacity-40"
                >
                  <Send className="w-4 h-4" /> 
                  {isCreatingNew ? "Guardar y Solicitar Validación" : "Actualizar Historial"}
                </Button>
              </div>

            </div>

            {/* PIE DE PÁGINA GLOBAL */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setOpenModal(false)}
                className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl px-6"
              >
                Cerrar Panel
              </Button>
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
}