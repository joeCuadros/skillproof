import { Challenge } from "@/types/challenge";

export const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Dashboard Financiero",
    company: "BCP Tech",
    description:
      "Construir un dashboard interactivo usando Power BI con análisis de datos financieros reales.",
    category: "Data Analytics",
    difficulty: "Intermedio",
    reward: "Certificado + entrevista laboral",
    participants: 45,
    skills: ["Power BI", "Data Analysis", "Excel"],
  },
  {
    id: "2",
    title: "Landing Page SaaS",
    company: "Innovate Perú",
    description:
      "Diseñar una landing page moderna para una startup tecnológica con enfoque UX/UI.",
    category: "Frontend",
    difficulty: "Básico",
    reward: "Mentoría + experiencia verificada",
    participants: 31,
    skills: ["React", "UI/UX", "Tailwind"],
  },
  {
    id: "3",
    title: "App de Gestión de Tareas",
    company: "Digital Factory",
    description:
      "Desarrollar una app de productividad con autenticación y CRUD completo.",
    category: "Full Stack",
    difficulty: "Intermedio",
    reward: "Certificado + evaluación IA",
    participants: 62,
    skills: ["React", "Node.js", "Firebase"],
  },
  {
    id: "4",
    title: "Modelo de Predicción de Ventas",
    company: "DataCorp",
    description:
      "Crear un modelo básico de machine learning para predicción de ventas.",
    category: "Data Science",
    difficulty: "Avanzado",
    reward: "Certificado + acceso a internship",
    participants: 28,
    skills: ["Python", "Machine Learning", "Pandas"],
  },
];