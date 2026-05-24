"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StudentSidebar from "@/components/sidebar/student-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell, Trophy, Award, Info, Clock, X, Sparkles, 
  ArrowRight, MessageSquareCode, FileBadge, ArrowUpRight 
} from "lucide-react";

export default function StudentNotificationsPage() {
  // Estado para controlar la ventana emergente de la notificación activa
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  const notifications = [
    {
      id: 1,
      title: "Reto evaluado",
      shortMessage: "Tu solución fue revisada por el equipo de BCP Labs.",
      fullMessage: "Tu solución al reto de 'Optimización de Consultas Distribuidas' fue auditada. El equipo de ingeniería destacó tu estructura limpia, aunque sugieren mejorar el uso de índices compuestos.",
      type: "challenge",
      time: "Hace 10 min",
      enterprise: "BCP Labs",
      aiScore: 92,
      feedbackIA: "Código altamente eficiente. Se detectó una redundancia menor en la línea 42, pero cumple con los estándares de producción."
    },
    {
      id: 2,
      title: "Certificación IA aprobada",
      shortMessage: "Has obtenido nivel Intermedio verificado en React.",
      fullMessage: "¡Felicitaciones! Tras evaluar tus últimos 3 entregables de código, nuestro modelo de IA ha emitido y firmado digitalmente tu credencial oficial de React Avanzado/Intermedio.",
      type: "success",
      time: "Hace 2 horas",
      enterprise: "SkillProof Engine",
      aiScore: 100,
      feedbackIA: "Arquitectura de componentes impecable. Patrón de hooks personalizados implementado con total maestría."
    },
    {
      id: 3,
      title: "Nueva oportunidad",
      shortMessage: "TechCorp publicó un nuevo reto que hace match contigo.",
      fullMessage: "La empresa TechCorp acaba de lanzar el reto 'Refactorización de Microservicios en Node.js'. Debido a tus tags de habilidades, tienes un 95% de afinidad automática.",
      type: "info",
      time: "Hace 1 día",
      enterprise: "TechCorp",
      aiScore: null,
      feedbackIA: null
    },
  ];

  // Configuración de estilos rápidos por tipo de alerta
  const getNotificationConfig = (type: string) => {
    switch (type) {
      case "challenge":
        return {
          icon: <Trophy className="w-4 h-4 text-amber-600" />,
          bgColor: "bg-amber-50 border-amber-100",
          label: "Retos"
        };
      case "success":
        return {
          icon: <Award className="w-4 h-4 text-green-600" />,
          bgColor: "bg-green-50 border-green-100",
          label: "Certificaciones"
        };
      default:
        return {
          icon: <Info className="w-4 h-4 text-[#0039A6]" />,
          bgColor: "bg-[#EAF3FF] border-[#D6E4FF]/60",
          label: "Sistema"
        };
    }
  };

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="mb-6 border-b border-[#D6E4FF] pb-4">
        <h1 className="text-3xl font-extrabold text-[#0039A6] tracking-tight flex items-center gap-2.5">
          <Bell className="w-7 h-7" />
          Centro de Actividad
        </h1>
        <p className="text-slate-500 text-sm mt-0.5 font-medium">
          Revisa las actualizaciones de tus postulaciones y auditorías automatizadas.
        </p>
      </div>

      {/* CONTENEDOR COMPACTO (Estilo Bandeja de Entrada de Correos) */}
      <Card className="bg-white border border-[#D6E4FF] rounded-2xl overflow-hidden shadow-2xs divide-y divide-slate-100">
        {notifications.map((n) => {
          const config = getNotificationConfig(n.type);
          return (
            <div
              key={n.id}
              onClick={() => setSelectedNotification(n)}
              className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-all cursor-pointer group"
            >
              {/* Icono + Texto Corto */}
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

              {/* Tag de Categoría / Acción a la derecha */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded-md">
                  {config.label}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0039A6] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </Card>


      {/* ================= VENTANA EMERGENTE (MODAL) DE DETALLE ================= */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-[#D6E4FF] overflow-hidden flex flex-col animate-scaleUp">
            
            {/* Cabecera del Modal */}
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-white to-[#F7FAFF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg border ${getNotificationConfig(selectedNotification.type).bgColor}`}>
                  {getNotificationConfig(selectedNotification.type).icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Detalle de Notificación</span>
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

            {/* Cuerpo del Modal */}
            <div className="p-6 space-y-4 text-sm leading-relaxed text-slate-600">
              
              {/* Mensaje principal */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Comunicado de {selectedNotification.enterprise}</span>
                <p className="text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {selectedNotification.fullMessage}
                </p>
              </div>

              {/* Bloque condicional: Si viene indexado con feedback técnico de IA */}
              {selectedNotification.feedbackIA && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#0039A6] uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 animate-pulse" /> Reporte Técnico del Motor IA</span>
                    {selectedNotification.aiScore && (
                      <span className="bg-[#EAF3FF] px-2 py-0.5 rounded-md text-xs font-black">Score: {selectedNotification.aiScore}%</span>
                    )}
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F0F5FF] border border-[#0039A6]/20 text-xs text-slate-700 font-medium leading-normal flex gap-2">
                    <MessageSquareCode className="w-4 h-4 text-[#0039A6] shrink-0 mt-0.5" />
                    <span>{selectedNotification.feedbackIA}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Acciones del pie del Modal */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5">
              <Button 
                variant="outline" 
                onClick={() => setSelectedNotification(null)}
                className="text-xs rounded-xl border-slate-200 text-slate-500 h-10"
              >
                Marcar como leído y cerrar
              </Button>
              
              {selectedNotification.type === "challenge" && (
                <Button className="bg-[#0039A6] hover:bg-[#002B7A] text-white text-xs font-semibold rounded-xl gap-1 h-10">
                  Ver mi entrega <FileBadge className="w-3.5 h-3.5" />
                </Button>
              )}

              {selectedNotification.type === "info" && (
                <Button className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-xl gap-1 h-10">
                  Postular al reto <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
}