"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import CompanySidebar from "@/components/sidebar/company-sidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Settings, Lock, Eye, EyeOff, BellRing, Scale, 
  ShieldAlert, Trash2, ShieldCheck, AlertCircle 
} from "lucide-react";

export default function CompanySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [candidateAlerts, setCandidateAlerts] = useState(true);
  const [reportAlerts, setReportAlerts] = useState(true);

  return (
    <DashboardLayout sidebar={<CompanySidebar />}>

      {/* HEADER */}
      <div className="mb-8 border-b border-[#D6E4FF] pb-6">
        <h1 className="text-4xl font-extrabold text-[#0039A6] tracking-tight flex items-center gap-3">
          <Settings className="w-9 h-9" />
          Configuración Institucional
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Gestiona las credenciales de seguridad de la organización, los canales de reclutamiento y políticas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* COLUMNA CENTRAL (Seguridad y Alertas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* CAMBIO DE CONTRASEÑA CORPORATIVA */}
          <Card className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#0039A6]" />
              <div>
                <h3 className="text-base font-bold text-slate-800">Clave de Acceso Empresarial</h3>
                <p className="text-xs text-slate-400">Actualiza las credenciales globales de acceso de la organización.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contraseña Actual de Entidad</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl h-11 pr-10 text-sm font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nueva Contraseña Corporativa</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Escribe la nueva contraseña segura"
                  className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl h-11 text-sm font-medium"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button 
                onClick={() => {
                  alert("Contraseña de la organización guardada.");
                  setCurrentPassword("");
                  setNewPassword("");
                }}
                disabled={!currentPassword || !newPassword}
                className="bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl text-xs px-5 py-4.5 shadow-sm disabled:opacity-40 transition-all"
              >
                Actualizar Credenciales de Seguridad
              </Button>
            </div>
          </Card>

          {/* CONTROL DE ALERTAS DE RECLUTAMIENTO */}
          <Card className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
              <BellRing className="w-5 h-5 text-[#0039A6]" />
              <div>
                <h3 className="text-base font-bold text-slate-800">Preferencias de Postulaciones</h3>
                <p className="text-xs text-slate-400">Configura las alertas de matching automático sobre tus retos abiertos.</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50/50 cursor-pointer transition-all">
                <div className="space-y-0.5 max-w-[85%]">
                  <span className="text-sm font-bold text-slate-800 block">Notificaciones de Nuevos Candidatos</span>
                  <span className="text-xs text-slate-400 block">Alertar de inmediato al correo de RRHH cada vez que un talento con alta compatibilidad aplique.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={candidateAlerts} 
                  onChange={() => setCandidateAlerts(!candidateAlerts)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0039A6] focus:ring-[#0039A6]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50/50 cursor-pointer transition-all">
                <div className="space-y-0.5 max-w-[85%]">
                  <span className="text-sm font-bold text-slate-800 block">Reportes del Motor de Evaluación</span>
                  <span className="text-xs text-slate-400 block">Recibir desgloses automatizados semanales sobre las soluciones de código de los estudiantes.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={reportAlerts} 
                  onChange={() => setReportAlerts(!reportAlerts)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0039A6] focus:ring-[#0039A6]"
                />
              </label>
            </div>
          </Card>

        </div>

        {/* COLUMNA LATERAL (Políticas Ecosistema e Inactividad) */}
        <div className="space-y-6">
          
          {/* TRANSPARENCIA CORPORATIVA */}
          <Card className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#0039A6]">
              <Scale className="w-5 h-5" />
              <h4 className="text-sm font-bold text-slate-800">Gobernanza del Sistema</h4>
            </div>
            
            <div className="space-y-3 text-xs text-slate-600 font-medium">
              <div className="flex gap-2 items-start">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <p>Todo reto técnico debe cerrarse con retroalimentación o asignación de mérito.</p>
              </div>
              <div className="flex gap-2 items-start">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <p>Las evaluaciones automáticas de la IA son transparentes y auditables.</p>
              </div>
              <div className="flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p>Penalización de visibilidad algorítmica si se abandonan procesos sin feedback.</p>
              </div>
            </div>
          </Card>

          {/* ELIMINAR CUENTA INSTITUCIONAL */}
          <Card className="bg-white border border-red-100 rounded-3xl p-6 shadow-2xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-red-50 p-1.5 rounded-lg text-red-600">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-slate-800">Zona de Peligro</h2>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">
                Dar de baja la empresa purgará de forma irreversible tus retos subidos, métricas de atracción de talento e historial de contratación.
              </p>

              <Button
                onClick={() => {
                  const res = window.confirm("¿Seguro de eliminar la cuenta de la organización?");
                  if (res) alert("Cuenta removida.");
                }}
                className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl text-xs py-3 flex items-center justify-center gap-1.5 border border-red-200"
              >
                <Trash2 className="w-3.5 h-3.5" /> Dar de baja organización
              </Button>
            </div>
          </Card>

        </div>

      </div>
    </DashboardLayout>
  );
}