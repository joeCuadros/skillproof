export interface ValidatorQuestion {
  question: string;
  alternatives: string[];
  correctAnswer: string;
}

export interface Validator {
  id: string;
  skill: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  questions: ValidatorQuestion[];
}