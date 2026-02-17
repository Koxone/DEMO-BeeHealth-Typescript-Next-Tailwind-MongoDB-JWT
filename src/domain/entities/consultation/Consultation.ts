import { UserSpecialty } from '@/domain/enums/';
import { ConsultationAnswer } from '@/domain/value-objects/consultation/ConsultationAnswer';
import { ConsultationAnswers } from '@/domain/value-objects/consultation/ConsultationAnswers';

// Prop Types
export interface ConsultationPropsTypeDomain {
  patientId: string;
  specialty: UserSpecialty;
  answers: ConsultationAnswers;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsultationPersistenceTypeDomain {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  answers: ConsultationAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

export class Consultation {
  private constructor(
    public readonly id: string,
    private props: ConsultationPropsTypeDomain
  ) {}

  // Factory method to create a new Consultation
  public static create(id: string, patientId: string, answers: ConsultationAnswers): Consultation {
    if (!patientId) {
      throw new Error('patientId is required');
    }
    if (!answers) {
      throw new Error('answers is required');
    }
    return new Consultation(id, {
      patientId,
      specialty: UserSpecialty.WEIGHT,
      answers,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Method to reconstruct Consultation from persistence
  public static fromPersistence(data: ConsultationPersistenceTypeDomain): Consultation {
    const answersVO = ConsultationAnswers.fromAnswers(data.answers);

    return new Consultation(data.id, {
      patientId: data.patientId,
      specialty: data.specialty,
      answers: answersVO,
      isActive: true,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  // To Persistence
  public toPersistence(): {
    patientId: string;
    specialty: UserSpecialty;
    answers: ReturnType<ConsultationAnswer['toPersistence']>[];
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      patientId: this.props.patientId,
      specialty: this.props.specialty,
      answers: this.props.answers.getAllAnswers().map((a) => a.toPersistence()),
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  public getWeightValue(): number | undefined {
    const WEIGHT_QUESTION_ID = 7;
    const weightAnswer = this.props.answers
      .getAllAnswers()
      .find((a) => a.questionId === WEIGHT_QUESTION_ID);

    return weightAnswer ? Number(weightAnswer.value) : undefined;
  }

  // Getters
  get consultationId(): string {
    return this.id;
  }

  get patientId(): string {
    return this.props.patientId;
  }

  get specialty(): UserSpecialty {
    return this.props.specialty;
  }

  get answers(): ConsultationAnswers {
    return this.props.answers;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Domain Methods
  public updateAnswers(newAnswers: ConsultationAnswers): void {
    this.props.answers = newAnswers;
    this.props.updatedAt = new Date();
  }

  public deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  public activate(): void {
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }
}
