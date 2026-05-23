import { User } from "@/types/user";

export const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    name: "Joe Student",
    email: "student@skillproof.com",
    password: "123456",
    role: "student",
  },
  {
    id: "2",
    name: "SkillProof Company",
    email: "company@skillproof.com",
    password: "123456",
    role: "company",
  },
];