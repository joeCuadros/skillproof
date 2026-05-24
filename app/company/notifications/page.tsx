"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import CompanySidebar from "@/components/sidebar/company-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell, Users, Trophy, AlertTriangle, Clock, X, 
  ArrowRight, ArrowUpRight, ShieldAlert, Sparkles 
} from "lucide-react";

export default function CompanyNotificationsPage() {
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  const notifications = [
    {
      id: 1,
      title: "Nuevo postulante en reto",
      shortMessage: "3 nuevos estudiantes han aplicado a tu reto activo.",
      fullMessage: "Los perfiles han completado las fases previas y fueron indexados automáticamente por el motor de compatibilidad técnica. Tienen un promedio de afinidad del 88%.",
      type: "candidates",
      time: "Hace 10 min",
      actionLabel: "Revisar Candidatos",
      meta: "Reto: Dashboard Power BI"
    },
    {
      id: 2,
      title: "Reto finalizado",
      shortMessage: "El reto 'React Landing Page' ha cumplido su ciclo temporal.",
      fullMessage: "El tiempo límite de entrega ha expirado. El sistema ha recopilado todos los repositorios y soluciones de código enviados para iniciar la pre-evaluación algorítmica.",
      type: "challenge",
      time: "Hace 2 horas",
      actionLabel: "Ver Soluciones",
      meta: "Reto: React Landing Page"
    },
    {
      id: 3,
      title: "Acción obligatoria",
      shortMessage: "Debes contactar al ganador del reto antes del cierre de actas.",
      fullMessage: "De acuerdo con las normativas de transparencia y auditoría de la plataforma, es obligatorio emitir el feedback correspondiente o contactar al talento seleccionado.",
      type: "warning",
      time: "Hace 1 día",
      actionLabel: "Auditar Cierre",
      meta: "Transparencia Corporativa"
    },
  ];

  const getNotificationConfig = (type: string) => {
    switch (type) {
      case "candidates":
        return {
          icon: <Users className="w-4 h-4 text-[#0039A6]" />,
          bgColor: "bg-[#EAF3FF] border-[#D6E4FF]/60",
          label: "Talento"
        };
      case "challenge":
        return {
          icon: <Trophy className="w-4 h-4 text-green-600" />,
          bgColor: "bg-green-50 border-green-100",
          label: "Retos"
        };
      default:
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          bgColor: "bg-amber-50 border-amber-100",
          label: "Urgente"
        };
    }
  };

  return (
    <DashboardLayout sidebar={<CompanySidebar />}>
      
      {/* HEADER */}
      <div className="mb-6 border-b border-[#D6E4FF] pb-4">
        <h1 className="text-3xl font-extrabold text-[#0039A6] tracking-tight flex items-center gap-2.5">
          <Bell className="w-7 h-7" />
          Notificaciones Corporativas
        </h1>
        <p className="text-slate-500 text-sm mt-0.5 font-medium">
          Monitorea el estatus de tus retos tecnológicos y el flujo de talento postulado.
        </p>
      </div>

      {/* BANDEJA DE ENTRADA COMPACTA */}
      <Card className="bg-white border border-[#D6E4FF] rounded-2xl overflow-hidden shadow-2xs divide-y divide-slate-100">
        {notifications.map((n) => {
          const config = getNotificationConfig(n.type);
          return (
            <div
              key={n.id}
              onClick={() => setSelectedNotification(n)}
              className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`p-2.5 rounded-xl border shrink-0 ${config.bgColor}`}>
                  {config.icon}
                </div>
                
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-[#0039A6] transition-colors">
                      {n.title}
                    </h2>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
                      • <Clock className="w-3 h-3" /> {n.time}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs truncate max-w-xl mt-0.5">
                    {n.shortMessage}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
                  {config.label}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0039A6] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </Card>

      {/* ================= VENTANA EMERGENTE (MODAL) ================= */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-[#D6E4FF] overflow-hidden flex flex-col animate-scaleUp">
            
            {/* Cabecera Modal */}
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg border ${getNotificationConfig(selectedNotification.type).bgColor}`}>
                  {getNotificationConfig(selectedNotification.type).icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">{selectedNotification.meta}</span>
                  <h3 className="text-base font-bold text-slate-800">{selectedNotification.title}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedNotification(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo Modal */}
            <div className="p-6 space-y-4 text-sm text-slate-600">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Reporte de Actividad</span>
                <p className="text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                  {selectedNotification.fullMessage}
                </p>
              </div>

              {selectedNotification.type === "warning" && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Regla de Ecosistema:</strong> Las empresas que mantienen un índice transparente de feedback reciben un boost de visibilidad del 20% en sus vacantes activas.</span>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5">
              <Button 
                variant="outline" 
                onClick={() => setSelectedNotification(null)}
                className="text-xs rounded-xl border-slate-200 text-slate-500 h-10"
              >
                Cerrar aviso
              </Button>
              <Button className="bg-[#0039A6] hover:bg-[#002B7A] text-white text-xs font-semibold rounded-xl gap-1 h-10">
                {selectedNotification.actionLabel} <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
}