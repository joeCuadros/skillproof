import { mockValidators } from "@/mock/validators";

export function getValidatorBySkill(skill: string) {
  return mockValidators.find(
    (v) => v.skill.toLowerCase() === skill.toLowerCase()
  );
}