import { Validator } from "@/types/validator";

export const mockValidators: Validator[] = [
  {
    id: "1",
    skill: "React",
    level: "Intermedio",

    questions: [
      {
        question: "¿Qué es un componente?",
        alternatives: [
          "Una función reutilizable",
          "Una base de datos",
          "Un servidor",
          "Una API",
        ],
        correctAnswer: "Una función reutilizable",
      },

      {
        question:
          "¿Qué diferencia existe entre props y state?",
        alternatives: [
          "Props son inmutables",
          "State es externo",
          "Props guardan APIs",
          "No hay diferencia",
        ],
        correctAnswer: "Props son inmutables",
      },

      {
        question: "¿Qué hace useEffect?",
        alternatives: [
          "Maneja efectos secundarios",
          "Crea componentes",
          "Diseña UI",
          "Conecta Firebase",
        ],
        correctAnswer:
          "Maneja efectos secundarios",
      },

      {
        question: "¿Qué es JSX?",
        alternatives: [
          "Sintaxis similar a HTML",
          "Base de datos",
          "Lenguaje backend",
          "Framework CSS",
        ],
        correctAnswer:
          "Sintaxis similar a HTML",
      },

      {
        question:
          "¿Qué es renderizado condicional?",
        alternatives: [
          "Mostrar UI según condiciones",
          "Crear APIs",
          "Subir imágenes",
          "Optimizar CSS",
        ],
        correctAnswer:
          "Mostrar UI según condiciones",
      },
    ],
  },

  {
    id: "2",
    skill: "Power BI",
    level: "Avanzado",

    questions: [
      {
        question: "¿Qué es una medida DAX?",
        alternatives: [
          "Cálculo dinámico",
          "Tabla SQL",
          "Visualización",
          "API externa",
        ],
        correctAnswer: "Cálculo dinámico",
      },

      {
        question:
          "¿Cuándo usar gráfico de barras?",
        alternatives: [
          "Comparar categorías",
          "Mostrar código",
          "Diseñar logos",
          "Editar texto",
        ],
        correctAnswer:
          "Comparar categorías",
      },

      {
        question: "¿Qué es ETL?",
        alternatives: [
          "Proceso de transformación",
          "Tipo de gráfico",
          "Lenguaje frontend",
          "Servidor cloud",
        ],
        correctAnswer:
          "Proceso de transformación",
      },

      {
        question:
          "¿Cómo optimizar dashboards?",
        alternatives: [
          "Reduciendo visuales innecesarios",
          "Duplicando tablas",
          "Usando imágenes grandes",
          "Quitando filtros",
        ],
        correctAnswer:
          "Reduciendo visuales innecesarios",
      },

      {
        question: "¿Qué es Power Query?",
        alternatives: [
          "Herramienta ETL",
          "Base de datos",
          "Lenguaje móvil",
          "Plugin React",
        ],
        correctAnswer:
          "Herramienta ETL",
      },
    ],
  },
];