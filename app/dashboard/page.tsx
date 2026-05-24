"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

import StudentDashboard from "@/components/dashboard/student-dashboard";
import CompanyDashboard from "@/components/dashboard/company-dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { user, hydrated, loadUser } = useAuthStore();

  // 1. Cargar usuario normalmente al montar el componente
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // 2. DETECTOR DE BOTÓN ATRÁS: Si se regresa por historial, forzar el refresh inmediato
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // event.persisted es true si la página se cargó desde la caché del navegador (al ir atrás)
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // 3. Redirección si ya terminó de cargar (hydrated) y no hay sesión activa
  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/");
    }
  }, [hydrated, user, router]);

  // Estado 1: Esperando hidratación de la tienda
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F9FF]">
        <p className="text-[#0039A6] font-medium animate-pulse">
          Cargando sesión...
        </p>
      </div>
    );
  }

  // Estado 2: Redirección en camino
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F9FF]">
        <p className="text-[#0039A6] font-medium">
          Redirigiendo al inicio...
        </p>
      </div>
    );
  }

  // Estado 3: Renderizar Dashboards
  return user.role === "student" ? (
    <StudentDashboard />
  ) : (
    <CompanyDashboard />
  );
}