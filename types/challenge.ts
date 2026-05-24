export interface Challenge {
  id: string;
  title: string;
  company: string;
  description: string;
  category: string;
  difficulty: "Básico" | "Intermedio" | "Avanzado";
  reward: string;
  finalBenefit: string;
  participants: number;
  skills: string[];
  resources?: { name: string; url: string }[];
}