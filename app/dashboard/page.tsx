"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/auth-store";

import StudentDashboard from "@/components/dashboard/student-dashboard";
import CompanyDashboard from "@/components/dashboard/company-dashboard";

export default function DashboardPage() {
  const { user, hydrated, loadUser } =
    useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!hydrated) {
    return null;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        No autenticado
      </div>
    );
  }

  return user.role === "student" ? (
    <StudentDashboard />
  ) : (
    <CompanyDashboard />
  );
}