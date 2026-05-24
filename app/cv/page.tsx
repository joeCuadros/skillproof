"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import StudentSidebar from "@/components/sidebar/student-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Asegúrate de tener el componente Input de shadcn
import { Textarea } from "@/components/ui/textarea"; // Asegúrate de tener el componente Textarea de shadcn
import { mockCVs } from "@/mock/cvs";
import type { CV } from "@/types/cv";
import { Download, Edit3, Save, Sparkles, Briefcase, GraduationCap, Award, Languages, Lightbulb } from "lucide-react";

export default function CVPage() {
    const { user, loadUser, hydrated } = useAuthStore();
    const [cv, setCV] = useState<CV | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Estados locales para controlar los inputs temporalmente durante la edición
    const [editTitle, setEditTitle] = useState("");
    const [editSummary, setEditSummary] = useState("");

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const generateCV = () => {
        if (!user) return;
        const found = mockCVs.find((c) => c.userId === user.id);
        if (!found) return;
        setCV(found);
        // Inicializar los campos editables con los datos del mock
        setEditTitle(found.professionalTitle);
        setEditSummary(found.summary);
    };

    // Sincronizar estados locales si el CV se carga por primera vez
    useEffect(() => {
        if (cv) {
            setEditTitle(cv.professionalTitle);
            setEditSummary(cv.summary);
        }
    }, [cv]);

    if (!hydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F9FF]">
                <p className="text-[#0039A6] font-medium animate-pulse">Cargando sesión...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-[#F5F9FF]">
            {/* SIDEBAR */}
            <StudentSidebar />

            {/* MAIN */}
            <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto space-y-8">

                {/* HEADER GENERAL */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#D6E4FF] pb-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-[#0039A6] tracking-tight">
                            Mi CV Profesional
                        </h1>
                        <p className="text-slate-500 mt-1 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-[#0039A6]" />
                            Generado con IA a partir de tus habilidades verificadas
                        </p>
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    {cv && (
                        <div className="flex items-center gap-3 self-start sm:self-center">
                            {!isEditing ? (
                                <Button 
                                    onClick={() => setIsEditing(true)}
                                    variant="outline" 
                                    className="border-[#D6E4FF] text-[#0039A6] hover:bg-[#EAF3FF] rounded-xl flex items-center gap-2"
                                >
                                    <Edit3 className="w-4 h-4" /> Editar CV
                                </Button>
                            ) : (
                                <Button 
                                    onClick={() => {
                                        setIsEditing(false);
                                        // Actualización visual simulada en el front
                                        setCV(prev => prev ? { ...prev, professionalTitle: editTitle, summary: editSummary } : null);
                                    }}
                                    className="bg-[#0039A6] hover:bg-[#002B7A] text-white rounded-xl flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Guardar Cambios
                                </Button>
                            )}
                            
                            <Button 
                                onClick={() => alert("Simulación: Descargando CV en PDF...")}
                                className="bg-[#0039A6] hover:bg-[#002B7A] text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" /> Descargar CV
                            </Button>
                        </div>
                    )}
                </div>

                {/* CASO: SIN CV */}
                {!cv && (
                    <Card className="p-12 border border-[#D6E4FF] rounded-3xl text-center bg-white shadow-sm max-w-2xl mx-auto mt-10 space-y-6">
                        <div className="w-16 h-16 bg-[#EAF3FF] rounded-2xl flex items-center justify-center mx-auto text-[#0039A6]">
                            <Sparkles className="w-8 h-8 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-[#0039A6]">
                                Aún no tienes un CV generado
                            </h2>
                            <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
                                Nuestra IA estructurará tu perfil profesional de forma óptima usando tus retos completados, habilidades técnicas y certificaciones obtenidas.
                            </p>
                        </div>
                        <Button
                            onClick={generateCV}
                            className="bg-[#0039A6] hover:bg-[#002B7A] text-white rounded-xl px-8 py-6 text-md font-semibold shadow-md transition-all duration-200 hover:scale-[1.02]"
                        >
                            Crear CV con IA
                        </Button>
                    </Card>
                )}

                {/* CASO: CV GENERADO */}
                {cv && (
                    <div className="space-y-6">

                        {/* SECCIÓN PRINCIPAL: RESUMEN Y TÍTULO (EDITABLE) */}
                        <Card className="p-8 border border-[#D6E4FF] rounded-3xl bg-white shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-2 bg-[#0039A6]" />
                            <div className="space-y-4">
                                <span className="bg-[#EAF3FF] text-[#0039A6] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                                    Perfil Profesional {isEditing && "• Modo Edición"}
                                </span>
                                
                                {!isEditing ? (
                                    <>
                                        <h2 className="text-3xl font-bold text-[#0039A6]">
                                            {cv.professionalTitle}
                                        </h2>
                                        <p className="text-slate-600 leading-relaxed text-md">
                                            {cv.summary}
                                        </p>
                                    </>
                                ) : (
                                    <div className="space-y-3 animate-fadeIn">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-[#0039A6] uppercase">Título Profesional</label>
                                            <Input 
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl text-lg font-semibold text-slate-800"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-[#0039A6] uppercase">Resumen Profesional</label>
                                            <Textarea 
                                                value={editSummary}
                                                onChange={(e) => setEditSummary(e.target.value)}
                                                rows={4}
                                                className="border-[#D6E4FF] focus-visible:ring-[#0039A6] rounded-xl text-slate-600 leading-relaxed"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* GRID DINÁMICO DE INFORMACIÓN ESENCIAL */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* SKILLS */}
                            <Card className="p-6 border border-[#D6E4FF] rounded-3xl bg-white shadow-sm space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <Lightbulb className="w-5 h-5 text-[#0039A6]" />
                                    <h3 className="font-bold text-[#0039A6] text-lg">Habilidades</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cv.skills.map((s) => (
                                        <span
                                            key={s}
                                            className="px-3 py-1.5 text-sm font-medium rounded-xl bg-[#EAF3FF] text-[#0039A6] border border-[#D6E4FF]"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </Card>

                            {/* IDIOMAS */}
                            <Card className="p-6 border border-[#D6E4FF] rounded-3xl bg-white shadow-sm space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <Languages className="w-5 h-5 text-[#0039A6]" />
                                    <h3 className="font-bold text-[#0039A6] text-lg">Idiomas</h3>
                                </div>
                                <ul className="grid grid-cols-2 gap-3 text-slate-700 font-medium">
                                    {cv.languages.map((l) => (
                                        <li key={l} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                            <span className="w-1.5 h-1.5 bg-[#0039A6] rounded-full" />
                                            {l}
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            {/* EDUCACIÓN */}
                            <Card className="p-6 border border-[#D6E4FF] rounded-3xl bg-white shadow-sm space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <GraduationCap className="w-5 h-5 text-[#0039A6]" />
                                    <h3 className="font-bold text-[#0039A6] text-lg">Educación</h3>
                                </div>
                                <ul className="space-y-3">
                                    {cv.education.map((e) => (
                                        <li key={e} className="flex items-start gap-2.5 text-slate-600">
                                            <span className="mt-1.5 w-2 h-2 bg-[#0039A6] rounded-full shrink-0" />
                                            <span className="leading-relaxed">{e}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            {/* CERTIFICACIONES */}
                            <Card className="p-6 border border-[#D6E4FF] rounded-3xl bg-white shadow-sm space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <Award className="w-5 h-5 text-[#0039A6]" />
                                    <h3 className="font-bold text-[#0039A6] text-lg">Certificaciones IA</h3>
                                </div>
                                <ul className="space-y-3">
                                    {cv.certifications.map((c) => (
                                        <li key={c} className="flex items-start gap-2.5 text-slate-600">
                                            <span className="mt-1.5 w-2 h-2 bg-[#0039A6] rounded-full shrink-0" />
                                            <span className="leading-relaxed font-medium text-slate-700">{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                        </div>

                        {/* SECCIÓN COMPLETA: EXPERIENCIAS + PROYECTOS */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* EXPERIENCIAS */}
                            <Card className="p-6 border border-[#D6E4FF] rounded-3xl bg-white shadow-sm space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <Briefcase className="w-5 h-5 text-[#0039A6]" />
                                    <h3 className="font-bold text-[#0039A6] text-lg">Trayectoria Laboral</h3>
                                </div>
                                <ul className="space-y-4">
                                    {cv.experiences.map((e) => (
                                        <li key={e} className="relative pl-5 border-l-2 border-[#D6E4FF] space-y-1">
                                            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#0039A6]" />
                                            <p className="text-slate-600 text-sm leading-relaxed">{e}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            {/* PROYECTOS */}
                            <Card className="p-6 border border-[#D6E4FF] rounded-3xl bg-white shadow-sm space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <Sparkles className="w-5 h-5 text-[#0039A6]" />
                                    <h3 className="font-bold text-[#0039A6] text-lg">Proyectos Destacados</h3>
                                </div>
                                <ul className="space-y-4">
                                    {cv.projects.map((p) => (
                                        <li key={p} className="relative pl-5 border-l-2 border-[#D6E4FF] space-y-1">
                                            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#0039A6]" />
                                            <p className="text-slate-600 text-sm leading-relaxed font-medium">{p}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                        </div>

                        {/* FOOTER ACTION */}
                        <Card className="p-8 border border-[#D6E4FF] rounded-3xl text-center bg-gradient-to-b from-white to-[#F5F9FF] shadow-sm space-y-3">
                            <h3 className="text-xl font-bold text-[#0039A6]">
                                ¿Quieres refinar los resultados?
                            </h3>
                            <p className="text-slate-500 text-sm max-w-md mx-auto">
                                Si has completado nuevos retos o tienes nuevas habilidades, puedes ordenar a la IA reconstruir el documento de inmediato.
                            </p>
                            <Button className="mt-2 bg-[#0039A6] hover:bg-[#002B7A] text-white font-semibold rounded-xl px-6 py-5 shadow-sm transition-transform active:scale-95">
                                Re-generar CV con IA
                            </Button>
                        </Card>

                    </div>
                )}

            </main>
        </div>
    );
}