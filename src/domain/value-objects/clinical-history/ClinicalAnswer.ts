import { QuestionType } from '@/domain/enums/';

export interface ClinicalAnswerProps {
  questionId: number;
  questionText: string;
  questionType: QuestionType;
  value: any;
}

export class ClinicalAnswer {
  private constructor(
    public readonly questionId: number,
    public readonly questionText: string,
    public readonly questionType: QuestionType,
    public readonly value: any
  ) {}

  public static create(props: ClinicalAnswerProps): ClinicalAnswer {
    if (!props.questionId) {
      throw new Error('questionId is required');
    }
    if (!props.questionText) {
      throw new Error('questionText is required');
    }
    if (!props.questionType) {
      throw new Error('questionType is required');
    }

    return new ClinicalAnswer(
      props.questionId,
      props.questionText,
      props.questionType,
      props.value
    );
  }

  public toPersistence() {
    return {
      questionId: this.questionId,
      questionText: this.questionText,
      questionType: this.questionType,
      value: this.value,
    };
  }

  public equals(other: ClinicalAnswer): boolean {
    return this.questionId === other.questionId;
  }
}
