import { User } from "@/types/user";

export const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    name: "Joe Cuadros",
    email: "student@skillproof.com",
    password: "123456",
    role: "student",
  },
  {
    id: "2",
    name: "Ana Torres",
    email: "ana@skillproof.com",
    password: "123456",
    role: "student",
  },
  {
    id: "3",
    name: "Luis Mendoza",
    email: "luis@skillproof.com",
    password: "123456",
    role: "student",
  },
  {
    id: "4",
    name: "Camila Rojas",
    email: "camila@skillproof.com",
    password: "123456",
    role: "student",
  },
  {
    id: "5",
    name: "Diego Salas",
    email: "diego@skillproof.com",
    password: "123456",
    role: "student",
  },

  {
    id: "6",
    name: "BCP Tech",
    email: "company@skillproof.com",
    password: "123456",
    role: "company",
  },
  {
    id: "7",
    name: "Innovate Perú",
    email: "innovate@skillproof.com",
    password: "123456",
    role: "company",
  },
];