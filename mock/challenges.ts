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
    finalBenefit: "Certificado oficial firmado por el BCP e ingreso directo a su bolsa de trabajo de verano.",
    participants: 45,
    skills: ["Power BI", "Data Analysis", "Excel"],
    resources: [
      { name: "Caso_Negocio_BCP.pdf", url: "#" },
      { name: "Dataset_Financiero_Historico.xlsx", url: "#" }
    ]
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
    finalBenefit: "Mentoría 1 a 1 con el líder de diseño de Innovate y un badge verificable en tu perfil.",
    participants: 31,
    skills: ["React", "UI/UX", "Tailwind"],
    resources: [
      { name: "Bases_Innovate_Peru.pdf", url: "#" },
      { name: "Figma_Layout_Estructura.pdf", url: "#" }
    ]
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
    finalBenefit: "Reporte de feedback de código automatizado por IA y validación de horas de desarrollo.",
    participants: 62,
    skills: ["React", "Node.js", "Firebase"],
    resources: [
      { name: "Especificaciones_Tecnicas_CRUD.pdf", url: "#" },
      { name: "Template_Base_Datos.xlsx", url: "#" }
    ]
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
    finalBenefit: "Acceso prioritario a la convocatoria de pasantías de DataCorp con remuneración completa.",
    participants: 28,
    skills: ["Python", "Machine Learning", "Pandas"],
    resources: [
      { name: "Instrucciones_Modelo_DataCorp.pdf", url: "#" },
      { name: "Dataset_Ventas_Anuales.xlsx", url: "#" }
    ]
  },
];