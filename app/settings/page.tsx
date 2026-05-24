"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StudentSidebar from "@/components/sidebar/student-sidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Settings, Lock, Key, BellRing, Trash2, ShieldAlert, Check, Eye, EyeOff 
} from "lucide-react";

export default function StudentSettingsPage() {
  // Estados para cambio de contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Estados para preferencias de notificaciones
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>

      {/* HEADER DE LA SECCIÓN */}
      <div className="mb-8 border-b border-[#D6E4FF] pb-6">
        <h1 className="text-4xl font-extrabold text-[#0039A6] tracking-tight flex items-center gap-3">
          <Settings className="w-9 h-9" />
          Configuración
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Administra las preferencias de tu cuenta, la seguridad de tus accesos y las alertas del sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* COLUMNA PRINCIPAL: SEGURIDAD Y NOTIFICACIONES */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* BLOQUE 1: CAMBIO DE CONTRASEÑA */}
          <Card className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#0039A6]" />
              <div>
                <h3 className="text-base font-bold text-slate-800">Seguridad de la Cuenta</h3>
                <p className="text-xs text-slate-400">Actualiza tus credenciales periódicamente para mantener tu perfil seguro.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Contraseña Actual */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contraseña Actual</label>
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

              {/* Nueva Contraseña */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nueva Contraseña</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl h-11 text-sm font-medium"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Button 
                onClick={() => {
                  alert("Contraseña actualizada con éxito.");
                  setCurrentPassword("");
                  setNewPassword("");
                }}
                disabled={!currentPassword || !newPassword}
                className="bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl text-xs px-5 py-4.5 shadow-sm disabled:opacity-40 transition-all"
              >
                Actualizar Contraseña
              </Button>
            </div>
          </Card>

          {/* BLOQUE 2: PREFERENCIAS DE NOTIFICACIONES */}
          <Card className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
              <BellRing className="w-5 h-5 text-[#0039A6]" />
              <div>
                <h3 className="text-base font-bold text-slate-800">Canales de Notificación</h3>
                <p className="text-xs text-slate-400">Elige cómo y cuándo deseas recibir alertas sobre tus retos evaluados.</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Alertas Correo */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50/50 cursor-pointer transition-all">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-slate-800 block">Alertas por Correo Electrónico</span>
                  <span className="text-xs text-slate-400 block">Recibe reportes de feedback detallados e invitaciones de empresas directas.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0039A6] focus:ring-[#0039A6]"
                />
              </label>

              {/* Alertas Push */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50/50 cursor-pointer transition-all">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-slate-800 block">Notificaciones en Navegador (Push)</span>
                  <span className="text-xs text-slate-400 block">Avisos instantáneos cuando un reto nuevo sea publicado.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={pushAlerts} 
                  onChange={() => setPushAlerts(!pushAlerts)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0039A6] focus:ring-[#0039A6]"
                />
              </label>
            </div>
          </Card>

        </div>

        {/* COLUMNA LATERAL: ZONA DE PELIGRO */}
        <div className="space-y-4">
          <Card className="bg-white border border-red-100 rounded-3xl p-6 shadow-2xs relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-red-50 p-2 rounded-xl text-red-600">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    Zona de Peligro
                  </h2>
                  <p className="text-[10px] text-red-500 font-bold tracking-wide uppercase">Acción Irreversible</p>
                </div>
              </div>

              <p className="text-slate-500 text-xs leading-relaxed">
                Al eliminar tu cuenta perderás de forma definitiva tus certificados criptográficos, historial de XP acumulado y vinculaciones con procesos de selección activos.
              </p>

              <div className="pt-2">
                <Button
                  onClick={() => {
                    const confirm = window.confirm("¿Estás completamente seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
                    if (confirm) alert("Simulación: Cuenta dada de baja.");
                  }}
                  className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl text-xs py-3.5 flex items-center justify-center gap-1.5 border border-red-200"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Eliminar mi cuenta permanentemente
                </Button>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}