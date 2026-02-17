export class ConsultationValidator {
  // Validate answers against Mongo template structure
  public static validateAgainstTemplate(answers: any[], template: any): void {
    const allQuestions = template.sections.flatMap((s: any) => s.questions);

    for (const question of allQuestions) {
      const response = answers.find((a) => a.questionId === question.questionId);

      // Rule: Required questions must be answered
      if (question.required && (!response || response.value === '' || response.value === null)) {
        throw new Error(`La pregunta "${question.text}" es obligatoria según el template.`);
      }
    }
  }
}
