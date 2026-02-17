import { ClinicalAnswer } from './ClinicalAnswer';

export class ClinicalHistoryAnswers { 
  private constructor(private readonly answers: ClinicalAnswer[]) {}

  public static create(answers: ClinicalAnswer[]): ClinicalHistoryAnswers {
    if (!answers || answers.length === 0) {
      throw new Error('Answers cannot be empty');
    }
    return new ClinicalHistoryAnswers(answers);
  }

  public static fromAnswers(answers: ClinicalAnswer[]): ClinicalHistoryAnswers {
    return new ClinicalHistoryAnswers(answers);
  }

  get values(): ClinicalAnswer[] {
    return [...this.answers];
  }

  public getAllAnswers(): ClinicalAnswer[] {
    return [...this.answers];
  }

  public getAnswerValue(id: number): any {
    const found = this.answers.find((a) => a.questionId === id);
    return found ? found.value : null;
  }

  public getAnswer(id: number): ClinicalAnswer | undefined {
    return this.answers.find((a) => a.questionId === id);
  }

  public hasAnswer(id: number): boolean {
    return this.answers.some((a) => a.questionId === id);
  }

  public count(): number {
    return this.answers.length;
  }

  public toPersistence() {
    return this.answers.map((a) => a.toPersistence());
  }
}
