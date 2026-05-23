import { CV } from "@/types/cv";

export const mockCVs: CV[] = [
  {
    id: "1",
    userId: "1",
    professionalTitle: "Frontend Developer",
    summary:
      "Perfil generado por IA basado en habilidades verificadas y retos completados.",
    skills: ["React", "TypeScript", "UI/UX"],
    languages: ["Inglés Intermedio"],
    education: ["Ingeniería de Sistemas"],
    experiences: ["Reto BCP Dashboard"],
    certifications: ["React Developer"],
    projects: ["Landing Page SaaS"],
  },

  {
    id: "2",
    userId: "2",
    professionalTitle: "Data Analyst",
    summary:
      "Especialista en análisis de datos y dashboards interactivos.",
    skills: ["Power BI", "Excel", "SQL"],
    languages: ["Inglés Avanzado"],
    education: ["Ingeniería Industrial"],
    experiences: ["Análisis Financiero"],
    certifications: ["Power BI Expert"],
    projects: ["Dashboard Financiero"],
  },

  {
    id: "3",
    userId: "3",
    professionalTitle: "Marketing Assistant",
    summary:
      "Perfil enfocado en marketing digital y estrategias sociales.",
    skills: ["Marketing", "Canva", "Analytics"],
    languages: ["Español", "Inglés Básico"],
    education: ["Marketing"],
    experiences: ["Campaña Social"],
    certifications: ["Digital Marketing"],
    projects: ["Social Media Campaign"],
  },

  {
    id: "4",
    userId: "4",
    professionalTitle: "UI Designer",
    summary:
      "Diseñadora enfocada en experiencias digitales modernas.",
    skills: ["Figma", "UI Design", "Branding"],
    languages: ["Inglés Intermedio"],
    education: ["Diseño Gráfico"],
    experiences: ["Startup Challenge"],
    certifications: ["UI Foundations"],
    projects: ["Mobile App Design"],
  },

  {
    id: "5",
    userId: "5",
    professionalTitle: "Backend Developer",
    summary:
      "Desarrollador orientado a APIs y arquitectura backend.",
    skills: ["Node.js", "MongoDB", "APIs"],
    languages: ["Inglés Intermedio"],
    education: ["Ingeniería de Software"],
    experiences: ["API Challenge"],
    certifications: ["Backend Engineering"],
    projects: ["REST API"],
  },
];