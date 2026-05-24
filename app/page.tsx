"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/mock/users";
import { useAuthStore } from "@/store/auth-store";

export default function AuthPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [mode, setMode] = useState<
    "login" | "register" | "forgot"
  >("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = mockUsers.find(
      (u) =>
        u.email.trim() === email.trim() &&
        u.password === password
    );

    if (!user) {
      alert("Credenciales incorrectas");
      return;
    }
    login(user);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#F5F9FF] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* decorativo suave */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#0039A6]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#00A3E0]/10 rounded-full blur-3xl" />

      <Card className="relative z-10 w-full max-w-md bg-white border border-[#D6E4FF] shadow-xl rounded-3xl p-8">
        
        {/* HEADER */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-4xl font-bold text-[#0039A6]">
            SkillProof
          </h1>

          <p className="text-slate-500 text-sm">
            Validación profesional con IA para estudiantes y empresas
          </p>
        </div>

        {/* LOGIN */}
        {mode === "login" && (
          <div className="space-y-5">
            <div>
              <label className="text-sm text-slate-600">
                Correo electrónico
              </label>

              <Input
                placeholder="correo@skillproof.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 border-[#D6E4FF] focus:border-[#0039A6]"
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">
                Contraseña
              </label>

              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 border-[#D6E4FF] focus:border-[#0039A6]"
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-[#0039A6] hover:bg-[#002B7A] text-white rounded-xl"
            >
              Iniciar Sesión
            </Button>

            <div className="flex justify-between text-sm text-slate-500">
              <button
                onClick={() => setMode("register")}
                className="hover:text-[#0039A6]"
              >
                Registrarse
              </button>

              <button
                onClick={() => setMode("forgot")}
                className="hover:text-[#0039A6]"
              >
                Recuperar cuenta
              </button>
            </div>

            {/* DEMO ACCOUNTS */}
            <div className="pt-4 border-t border-[#D6E4FF] text-xs text-slate-500 space-y-1">
              <p>👨‍🎓 Estudiante: student@skillproof.com / 123456</p>
              <p>🏢 Empresa: company@skillproof.com / 123456</p>
            </div>
          </div>
        )}

        {/* REGISTER */}
        {mode === "register" && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-[#0039A6]">
              Crear cuenta
            </h2>

            <Input placeholder="Nombre completo" className="border-[#D6E4FF]" />
            <Input placeholder="Correo electrónico" className="border-[#D6E4FF]" />
            <Input type="password" placeholder="Contraseña" className="border-[#D6E4FF]" />

            <select className="w-full border border-[#D6E4FF] rounded-xl p-3 text-slate-700">
              <option>Estudiante / Egresado</option>
              <option>Empresa</option>
            </select>

            <Button className="w-full bg-[#0039A6] hover:bg-[#002B7A] text-white rounded-xl">
              Registrarse
            </Button>

            <button
              onClick={() => setMode("login")}
              className="text-sm text-slate-500 hover:text-[#0039A6]"
            >
              Volver
            </button>
          </div>
        )}

        {/* FORGOT */}
        {mode === "forgot" && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-[#0039A6]">
              Recuperar cuenta
            </h2>

            <Input
              placeholder="Correo electrónico"
              className="border-[#D6E4FF]"
            />

            <Button className="w-full bg-[#0039A6] hover:bg-[#002B7A] text-white rounded-xl">
              Enviar enlace
            </Button>

            <button
              onClick={() => setMode("login")}
              className="text-sm text-slate-500 hover:text-[#0039A6]"
            >
              Volver
            </button>
          </div>
        )}
      </Card>
    </main>
  );
}