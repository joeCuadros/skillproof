import { Feedback } from "@/types/feedback";

export const mockFeedback: Feedback[] = [
  // 🏢 EMPRESA → ESTUDIANTE (POSITIVO)
  {
    id: "f1",
    from: "company",
    to: "student",
    authorName: "BCP Labs",
    targetName: "Juan Pérez",
    challenge: "Dashboard Power BI",
    type: "positive",
    message: "Excelente análisis de datos, muy buena lógica y visualización.",
    rating: 5,
    skills: ["Power BI", "Data Analysis"],
    attachments: ["certificado_bcp.pdf"],
    status: "approved",
    createdAt: "2026-05-20",
  },

  // 🏢 EMPRESA → ESTUDIANTE (NEGATIVO)
  {
    id: "f2",
    from: "company",
    to: "student",
    authorName: "TechCorp",
    targetName: "Maria Lopez",
    challenge: "React Landing Page",
    type: "negative",
    message: "Código incompleto y mala estructura de componentes.",
    rating: 2,
    skills: ["React"],
    status: "pending",
    createdAt: "2026-05-21",
  },

  // 🚨 DENUNCIA EMPRESA → ESTUDIANTE
  {
    id: "f3",
    from: "company",
    to: "student",
    authorName: "InnovaSoft",
    targetName: "Carlos Rojas",
    challenge: "App Mobile UI",
    type: "report",
    message: "Se detectó posible copia de solución externa sin evidencia de desarrollo propio.",
    rating: 1,
    status: "disputed",
    createdAt: "2026-05-22",
  },

  // 👨‍🎓 ESTUDIANTE → EMPRESA (FEEDBACK)
  {
    id: "f4",
    from: "student",
    to: "company",
    authorName: "Luis Torres",
    targetName: "BCP Labs",
    challenge: "Challenge UX",
    type: "neutral",
    message: "Buena experiencia, pero falta más claridad en los requisitos del reto.",
    rating: 3,
    status: "approved",
    createdAt: "2026-05-23",
  },

  // 👨‍🎓 ESTUDIANTE → EMPRESA (NEGATIVO)
  {
    id: "f5",
    from: "student",
    to: "company",
    authorName: "Ana Silva",
    targetName: "TechCorp",
    challenge: "Marketing Case",
    type: "negative",
    message: "Feedback tardío y poco detallado en la evaluación.",
    rating: 2,
    status: "disputed",
    createdAt: "2026-05-24",
  },
];