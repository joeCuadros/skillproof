"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StudentSidebar from "@/components/sidebar/student-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { mockCertifications } from "@/mock/certifications";
import { Award, ShieldCheck, ShieldAlert, X, Eye, FileText, Download, UploadCloud, Send, Plus } from "lucide-react";

export default function CertificationsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [activeCert, setActiveCert] = useState<any>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  // Campos para simulación de nuevo certificado
  const [newTitle, setNewTitle] = useState("");
  const [newLevel, setNewLevel] = useState("Básico");

  const handleOpenManageModal = (cert: any) => {
    setActiveCert(cert);
    setIsCreatingNew(false);
    setFileName(null);
    setOpenModal(true);
  };

  const handleOpenCreateModal = () => {
    setActiveCert(null);
    setIsCreatingNew(true);
    setFileName(null);
    setNewTitle("");
    setNewLevel("Básico");
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
            <Award className="w-9 h-9" />
            Certificaciones IA
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Valida y gestiona tus títulos oficiales avalados por nuestros sistemas inteligentes de evaluación.
          </p>
        </div>

        {/* 🔥 BOTÓN AGREGAR NUEVO CERTIFICADO */}
        <Button
          onClick={handleOpenCreateModal}
          className="bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl px-5 py-5 flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" /> Agregar Certificado
        </Button>
      </div>

      {/* GRID DE CERTIFICACIONES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {mockCertifications.map((c) => (
          <Card
            key={c.id}
            onClick={() => handleOpenManageModal(c)}
            className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#0039A6]/40 transition-all duration-300 flex flex-col justify-between min-h-[180px] space-y-4 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 h-full w-1.5 bg-[#0039A6] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-snug line-clamp-1">
                  {c.title}
                </h2>
                
                {/* BADGE DE VERIFICACIÓN */}
                <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase shrink-0 ${
                  c.verified ? "bg-[#EAF3FF] text-[#0039A6]" : "bg-red-50 text-red-600 border border-red-100"
                }`}>
                  {c.verified ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                  {c.verified ? "Verificado" : "Pendiente"}
                </div>
              </div>

              {/* DETALLES */}
              <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mt-1">
                <p>Nivel: <span className="text-slate-700 font-semibold">{c.level}</span></p>
                <p>•</p>
                <p>Puntaje: <span className="text-[#0039A6] font-bold">{c.score}%</span></p>
              </div>
            </div>

            <div className="text-xs font-semibold text-[#0039A6] flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-all pt-2">
              <Eye className="w-3.5 h-3.5" /> Gestionar credencial digital <span className="transition-transform group-hover:translate-x-0.5 ml-1">→</span>
            </div>
          </Card>
        ))}
      </div>

      {/* ================= MODAL DINÁMICO (CREAR / EDITAR) ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl border border-[#D6E4FF] overflow-hidden flex flex-col h-[85vh] animate-scaleUp">
            
            {/* CABECERA DE LA VENTANA */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#EAF3FF] p-2.5 rounded-xl text-[#0039A6]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                    {isCreatingNew ? "Registrar Nueva Certificación Externa" : `Panel de Gestión: ${activeCert?.title}`}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {isCreatingNew 
                      ? "Completa los datos para enviar el nuevo documento a la cola de verificación" 
                      : `Nivel Actual: ${activeCert?.level} • Récord: ${activeCert?.score}%`
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
              
              {/* COLUMNA IZQUIERDA: PREVIEW DINÁMICO */}
              <div className="w-full md:w-1/2 bg-slate-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
                <div className="text-xs font-bold text-[#0039A6] uppercase tracking-wider mb-2">
                  Vista Previa del Documento
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                  <FileText className="w-16 h-16 text-slate-400 animate-pulse" />
                  <p className="text-sm font-semibold text-slate-500 max-w-xs truncate">
                    {isCreatingNew ? (fileName || "Ningún archivo seleccionado") : `${activeCert?.title}.pdf`}
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    {isCreatingNew 
                      ? "Una vez cargado tu archivo, nuestro motor IA analizará los metadatos visuales del certificado."
                      : "El documento digital certificado se renderizará automáticamente en producción."
                    }
                  </p>
                </div>

                {!isCreatingNew && (
                  <Button
                    onClick={() => alert("Simulación: Descargando certificado original...")}
                    variant="outline"
                    className="mt-4 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" /> Descargar Certificado Actual
                  </Button>
                )}
              </div>

              {/* COLUMNA DERECHA: FORMULARIO */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-5">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#0039A6] uppercase tracking-wider mb-1">
                      {isCreatingNew ? "Información de la Credencial" : "Actualizar Certificación"}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Carga el documento oficial para que sea validado y anexado directamente en tu CV de Inteligencia Artificial.
                    </p>
                  </div>

                  {/* FORMULARIO ADICIONAL SI ES NUEVO */}
                  {isCreatingNew && (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nombre del Certificado</label>
                        <Input 
                          placeholder="Ej. AWS Certified Cloud Practitioner" 
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nivel de la Credencial</label>
                        <select
                          value={newLevel}
                          onChange={(e) => setNewLevel(e.target.value)}
                          className="w-full border border-[#D6E4FF] focus:border-[#0039A6] outline-none rounded-xl p-2.5 text-sm bg-white font-medium text-slate-700 transition-all"
                        >
                          <option>Básico</option>
                          <option>Intermedio</option>
                          <option>Avanzado</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* DROPZONE DE SUBIDA DE ARCHIVOS */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      {isCreatingNew ? "Cargar Archivo de Sustento (PDF)" : "Nuevo archivo adjunto"}
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
                            Arrastra o selecciona tu archivo aquí
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Soporta archivos PDF, PNG o JPG de hasta 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* TEXTAREA DE MENSAJES */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Notas aclaratorias u observaciones
                    </label>
                    <Textarea 
                      placeholder="Agrega el código de verificación del emisor o cualquier detalle que facilite la re-verificación por IA..."
                      rows={3}
                      className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl text-slate-700 text-xs"
                    />
                  </div>
                </div>

                {/* BOTÓN DE ACCIÓN / SUBMIT */}
                <Button
                  onClick={() => {
                    alert(isCreatingNew 
                      ? "Simulación: ¡Nueva solicitud enviada! El certificado se validará en unos momentos." 
                      : "Simulación: Solicitud de actualización y nuevo PDF cargados correctamente."
                    );
                    setOpenModal(false);
                  }}
                  disabled={isCreatingNew ? (!newTitle || !fileName) : false}
                  className="w-full bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm text-sm py-5 disabled:opacity-40"
                >
                  <Send className="w-4 h-4" /> 
                  {isCreatingNew ? "Registrar y Validar Certificado" : "Enviar para Re-verificación"}
                </Button>
              </div>

            </div>

            {/* ACCIONES DEL PIE DE PÁGINA */}
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