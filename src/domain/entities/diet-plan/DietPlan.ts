import { UserSpecialty, ComplianceStatusEnum, DietPlanStatusEnum } from '@/domain/enums/';
import { DietRestrictionDTODomain } from '@/domain/types/diet-plan.domain.types';

// Types
export interface DietSnapshot {
  originalDietId: string;
  name: string;
  category: string;
  description: string;
  instructions: string;
  allowedFoods: DietRestrictionDTODomain;
  forbiddenFoods: DietRestrictionDTODomain;
  allowedLiquids: DietRestrictionDTODomain;
  forbiddenLiquids: DietRestrictionDTODomain;
  ingredients: string[];
  images: string[];
}

export interface DietPlanPropsDomain {
  id: string;
  parentId: string | null;
  specialty: UserSpecialty;
  patientId: string;
  dietId: string;
  consultationId: string;
  startDate: Date;
  endDate: Date;
  dietSnapshot: DietSnapshot;
  status: DietPlanStatusEnum;
  compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Entity
export class DietPlan {
  // Identity
  private id: string;

  // Data
  private consultationId: string;
  private parentId: string | null;
  private patientId: string;
  private dietId: string;
  private startDate: Date;
  private endDate: Date;
  private dietSnapshot: DietSnapshot;
  private status: DietPlanStatusEnum;
  private compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  };

  // Audit
  private readonly createdAt: Date;
  private updatedAt: Date;

  // Constructor
  private constructor(props: DietPlanPropsDomain) {
    this.id = props.id;
    this.consultationId = props.consultationId;
    this.patientId = props.patientId;
    this.parentId = props.parentId;
    this.dietId = props.dietId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.dietSnapshot = props.dietSnapshot;
    this.status = props.status;
    this.compliance = props.compliance;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  // Factory for NEW diet assignments
  static create(props: {
    consultationId: string;
    patientId: string;
    dietId: string;
    startDate: Date;
    endDate: Date;
    dietSnapshot: DietSnapshot;
  }): DietPlan {
    // Validations
    if (!props.consultationId) throw new Error('Consultation ID is required');
    if (!props.patientId) throw new Error('Patient ID is required');
    if (!props.dietId) throw new Error('Diet ID is required');
    if (props.startDate >= props.endDate) {
      throw new Error('Start date must be before end date');
    }

    const now = new Date();

    return new DietPlan({
      id: '', // Temporary placeholder, will be set by Infrastructure layer
      parentId: null, // New diet plans have no parent
      consultationId: props.consultationId,
      specialty: UserSpecialty.WEIGHT,
      patientId: props.patientId,
      dietId: props.dietId,
      startDate: props.startDate,
      endDate: props.endDate,
      dietSnapshot: props.dietSnapshot,
      status: DietPlanStatusEnum.ACTIVE,
      compliance: {
        status: ComplianceStatusEnum.PENDING,
        rating: 0,
        doctorNotes: '',
      },
      createdAt: now,
      updatedAt: now,
    });
  }

  // fromPersistence: Rehydrate from DB
  static fromPersistence(props: DietPlanPropsDomain): DietPlan {
    if (!props.id) throw new Error('Invalid diet plan id');
    return new DietPlan(props);
  }

  //! Behavior
  // Mark active Diet Plan as Completed
  complete(compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  }): void {
    const now = new Date();
    this.status = DietPlanStatusEnum.COMPLETED;
    this.compliance = compliance;
    this.updatedAt = now;
  }

  // Renew Diet Plan: Creates a new Diet Plan with same diet but new dates, and marks current as superseded
  renew(
    newEndDate: Date,
    compliance: { status: ComplianceStatusEnum; rating: number; doctorNotes: string },
    newConsultationId?: string
  ): DietPlan {
    const now = new Date();

    this.status = DietPlanStatusEnum.SUPERSEDED;
    this.compliance = compliance;
    this.updatedAt = now;

    return new DietPlan({
      id: '',
      parentId: this.id,
      consultationId: newConsultationId ?? this.consultationId,
      specialty: UserSpecialty.WEIGHT,
      patientId: this.patientId,
      dietId: this.dietId,
      startDate: now,
      endDate: newEndDate,
      dietSnapshot: { ...this.dietSnapshot },
      status: DietPlanStatusEnum.RENEWED,
      compliance: {
        status: ComplianceStatusEnum.PENDING,
        rating: 0,
        doctorNotes: '',
      },
      createdAt: now,
      updatedAt: now,
    });
  }

  // Cancel Diet Plan: Creates a new Diet Plan with status cancelled, and marks current as superseded
  cancel(compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  }): DietPlan {
    const now = new Date();

    this.status = DietPlanStatusEnum.SUPERSEDED;
    this.updatedAt = now;

    return new DietPlan({
      id: '',
      parentId: this.id,
      consultationId: this.consultationId,
      specialty: UserSpecialty.WEIGHT,
      patientId: this.patientId,
      dietId: this.dietId,
      startDate: this.startDate,
      endDate: now,
      dietSnapshot: this.dietSnapshot,
      status: DietPlanStatusEnum.CANCELLED,
      compliance: compliance,
      createdAt: now,
      updatedAt: now,
    });
  }

  updateEndDate(newDate: Date): void {
    if (newDate <= this.startDate) {
      throw new Error('New end date must be after start date');
    }
    this.endDate = newDate;
    this.updatedAt = new Date();
  }

  // Getters
  getId(): string {
    return this.id;
  }
  getConsultationId(): string {
    return this.consultationId;
  }
  getPatientId(): string {
    return this.patientId;
  }
  getDietId(): string {
    return this.dietId;
  }
  getStartDate(): Date {
    return this.startDate;
  }
  getEndDate(): Date {
    return this.endDate;
  }
  getDietSnapshot(): DietSnapshot {
    return this.dietSnapshot;
  }
  getStatus(): DietPlanStatusEnum {
    return this.status;
  }
  getCompliance() {
    return this.compliance;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // toPersistence
  toPersistence(): Omit<DietPlanPropsDomain, 'id'> {
    return {
      consultationId: this.consultationId,
      patientId: this.patientId,
      parentId: this.parentId,
      specialty: UserSpecialty.WEIGHT,
      dietId: this.dietId,
      startDate: this.startDate,
      endDate: this.endDate,
      dietSnapshot: this.dietSnapshot,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      compliance: this.compliance,
    };
  }
}
