export interface Certification {
  id: string;
  title: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  verified: boolean;
  score: number;
}