"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_35%)]" />

      <Card className="relative z-10 w-full max-w-md border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 text-white">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            SkillProof
          </h1>

          <p className="text-slate-300 text-sm">
            Demuestra tus habilidades con validación impulsada por IA
          </p>
        </div>

        {mode === "login" && (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">
                Correo electrónico
              </label>

              <Input
                placeholder="correo@skillproof.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-300">
                Contraseña
              </label>

              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl"
            >
              Iniciar Sesión
            </Button>

            <div className="flex justify-between text-sm text-slate-400">
              <button
                onClick={() => setMode("register")}
                className="hover:text-white"
              >
                Registrarse
              </button>

              <button
                onClick={() => setMode("forgot")}
                className="hover:text-white"
              >
                Recuperar cuenta
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-500 space-y-1">
              <p>
                Estudiante:
                student@skillproof.com / 123456
              </p>

              <p>
                Empresa:
                company@skillproof.com / 123456
              </p>
            </div>
          </div>
        )}

        {mode === "register" && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">
              Crear cuenta
            </h2>

            <Input
              placeholder="Nombre completo"
              className="bg-white/5 border-white/10 text-white"
            />

            <Input
              placeholder="Correo electrónico"
              className="bg-white/5 border-white/10 text-white"
            />

            <Input
              type="password"
              placeholder="Contraseña"
              className="bg-white/5 border-white/10 text-white"
            />

            <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white">
              <option className="text-black">
                Estudiante/Egresado
              </option>

              <option className="text-black">
                Empresa
              </option>
            </select>

            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl">
              Registrarse
            </Button>

            <button
              onClick={() => setMode("login")}
              className="text-sm text-slate-400 hover:text-white"
            >
              Volver
            </button>
          </div>
        )}

        {mode === "forgot" && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">
              Recuperar cuenta
            </h2>

            <Input
              placeholder="Correo electrónico"
              className="bg-white/5 border-white/10 text-white"
            />

            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl">
              Enviar enlace
            </Button>

            <button
              onClick={() => setMode("login")}
              className="text-sm text-slate-400 hover:text-white"
            >
              Volver
            </button>
          </div>
        )}
      </Card>
    </main>
  );
}