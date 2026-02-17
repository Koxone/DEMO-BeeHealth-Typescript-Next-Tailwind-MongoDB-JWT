import { ConsultationAnswer } from './ConsultationAnswer';

export class ConsultationAnswers {
  private constructor(private readonly answers: ConsultationAnswer[]) {}

  public static create(answers: ConsultationAnswer[]): ConsultationAnswers {
    if (!answers || answers.length === 0) {
      throw new Error('Answers cannot be empty');
    }
    return new ConsultationAnswers(answers);
  }

  public static fromAnswers(answers: ConsultationAnswer[]): ConsultationAnswers {
    return new ConsultationAnswers(answers);
  }

  get values(): ConsultationAnswer[] {
    return [...this.answers];
  }

  public getAllAnswers(): ConsultationAnswer[] {
    return [...this.answers];
  }

  public getAnswerValue(id: number): any {
    const found = this.answers.find((a) => a.questionId === id);
    return found ? found.value : null;
  }

  public getAnswer(id: number): ConsultationAnswer | undefined {
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
