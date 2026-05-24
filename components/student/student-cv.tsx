"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";

export default function StudentCV() {
  const router = useRouter();

  return (
    <Card className="bg-white border border-[#D6E4FF] rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <div className="absolute top-0 left-0 h-full w-2 bg-[#0039A6]" />
      
      <div className="space-y-1.5 pl-2">
        <div className="flex items-center gap-2 text-[#0039A6]">
          <FileText className="w-5 h-5" />
          <h2 className="text-2xl font-bold tracking-tight">
            Mi CV Inteligente (IA)
          </h2>
        </div>
        <p className="text-slate-500 text-sm flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#0039A6]" />
          Generado automáticamente con tus habilidades verificadas del sistema.
        </p>
      </div>

      <Button 
        onClick={() => router.push("/cv")}
        className="bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl px-6 py-5 shadow-sm transition-transform active:scale-95 shrink-0 self-start sm:self-center"
      >
        Gestionar y Ver CV
      </Button>
    </Card>
  );
}