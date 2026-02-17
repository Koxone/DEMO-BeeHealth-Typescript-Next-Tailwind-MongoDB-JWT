import { ClinicalHistoryAnswers } from '@/domain/value-objects/clinical-history/ClinicalHistoryAnswers';
import { ClinicalAnswer } from '@/domain/value-objects/clinical-history/ClinicalAnswer';
import { UserSpecialty } from '@/domain/enums/';

export interface ClinicalHistoryPropsTypeDomain {
  patientId: string;
  specialty: UserSpecialty;
  answers: ClinicalHistoryAnswers;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClinicalHistoryPersistenceTypeDomain {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  answers: ClinicalAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

export class WeightClinicalHistory {
  private constructor(
    private readonly id: string,
    private props: ClinicalHistoryPropsTypeDomain
  ) {}

  // Factory method para crear nuevo
  public static create(
    id: string,
    patientId: string,
    answers: ClinicalHistoryAnswers
  ): WeightClinicalHistory {
    if (!answers.getAnswerValue(7) || !answers.getAnswerValue(6)) {
      throw new Error('Métricas antropométricas básicas son obligatorias para Weight.');
    }

    return new WeightClinicalHistory(id, {
      patientId,
      specialty: UserSpecialty.WEIGHT,
      answers,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Factory method para reconstruir desde DB
  public static fromPersistence(data: ClinicalHistoryPersistenceTypeDomain): WeightClinicalHistory {
    const answersVO = ClinicalHistoryAnswers.fromAnswers(data.answers);

    return new WeightClinicalHistory(data.id, {
      patientId: data.patientId,
      specialty: data.specialty,
      answers: answersVO,
      isActive: true,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  // Serializar para persistencia
  public toPersistence(): {
    patientId: string;
    specialty: UserSpecialty;
    answers: ReturnType<ClinicalAnswer['toPersistence']>[];
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

  // Getters
  get historyId(): string {
    return this.id;
  }

  get patientId(): string {
    return this.props.patientId;
  }

  get specialty(): UserSpecialty {
    return this.props.specialty;
  }

  get answers(): ClinicalHistoryAnswers {
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

  // Métodos de dominio
  public updateAnswers(newAnswers: ClinicalHistoryAnswers): void {
    if (!newAnswers.getAnswerValue(7) || !newAnswers.getAnswerValue(6)) {
      throw new Error('Métricas antropométricas básicas son obligatorias para Weight.');
    }

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
