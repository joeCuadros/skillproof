import { Challenge } from "@/types/challenge";

export const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Dashboard Financiero",
    company: "BCP Tech",
    description:
      "Construir dashboard interactivo usando Power BI.",
    category: "Data Analytics",
    difficulty: "Intermedio",
    reward: "Certificado + entrevista",
    participants: 45,
    skills: ["Power BI", "Data Analysis"],
  },

  {
    id: "2",
    title: "Landing Page SaaS",
    company: "Innovate Perú",
    description:
      "Diseñar landing page moderna para startup.",
    category: "Frontend",
    difficulty: "Básico",
    reward: "Mentoría + experiencia verificada",
    participants: 31,
    skills: ["React", "UI/UX"],
  },
];