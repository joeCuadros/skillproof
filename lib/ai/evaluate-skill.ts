export function evaluateAnswers(
  answers: string[],
  questions: string[]
) {
  const score =
    Math.round((answers.length / questions.length) * 100);

  let level = "Básico";

  if (score >= 80) level = "Avanzado";
  else if (score >= 50) level = "Intermedio";

  return {
    score,
    level,
    passed: score >= 60,
  };
}