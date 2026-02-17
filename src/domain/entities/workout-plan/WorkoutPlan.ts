import { UserSpecialty, ComplianceStatusEnum, WorkoutStatusEnum } from '@/domain/enums/';

export interface WorkoutSnapshot {
  originalWorkoutId: string;
  name: string;
  type: string;
  category: string;
  difficulty: string;
  duration: number;
  about: string;
  instructions: string[];
  benefits: string[];
  cautions: string[];
  images: string[];
  video: string;
}

export interface WorkoutPlanPropsDomain {
  id: string;
  parentId: string | null;
  specialty: UserSpecialty;
  patientId: string;
  workoutId: string;
  consultationId: string;
  startDate: Date;
  endDate: Date;
  workoutSnapshot: WorkoutSnapshot;
  status: WorkoutStatusEnum;
  compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export class WorkoutPlan {
  // Identity
  private id: string;

  // Data
  private consultationId: string;
  private parentId: string | null;
  private patientId: string;
  private workoutId: string;
  private startDate: Date;
  private endDate: Date;
  private workoutSnapshot: WorkoutSnapshot;
  private status: WorkoutStatusEnum;
  private compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  };

  // Audit
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: WorkoutPlanPropsDomain) {
    this.id = props.id;
    this.consultationId = props.consultationId;
    this.patientId = props.patientId;
    this.parentId = props.parentId;
    this.workoutId = props.workoutId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.workoutSnapshot = props.workoutSnapshot;
    this.status = props.status;
    this.compliance = props.compliance;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  // Factory para nuevas asignaciones
  static create(props: {
    consultationId: string;
    patientId: string;
    workoutId: string;
    startDate: Date;
    endDate: Date;
    workoutSnapshot: WorkoutSnapshot;
    specialty?: UserSpecialty;
  }): WorkoutPlan {
    // Validaciones de dominio
    if (!props.consultationId) throw new Error('Consultation ID is required');
    if (!props.patientId) throw new Error('Patient ID is required');
    if (!props.workoutId) throw new Error('Workout ID is required');
    if (props.startDate >= props.endDate) {
      throw new Error('Start date must be before end date');
    }

    const now = new Date();

    return new WorkoutPlan({
      id: '', // Temporary placeholder, will be set by Infrastructure layer
      parentId: null, // NewWorkoutPlan have no parent
      consultationId: props.consultationId,
      specialty: props.specialty ?? UserSpecialty.WEIGHT,
      patientId: props.patientId,
      workoutId: props.workoutId,
      startDate: props.startDate,
      endDate: props.endDate,
      workoutSnapshot: props.workoutSnapshot,
      status: WorkoutStatusEnum.ACTIVE,
      compliance: {
        status: ComplianceStatusEnum.PENDING,
        rating: 0,
        doctorNotes: '',
      },
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPersistence(props: WorkoutPlanPropsDomain): WorkoutPlan {
    if (!props.id) throw new Error('Invalid workout plan id');
    return new WorkoutPlan(props);
  }

  //! Comportamiento (Lógica de Negocio)

  complete(compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  }): void {
    this.status = WorkoutStatusEnum.COMPLETED;
    this.compliance = compliance;
    this.updatedAt = new Date();
  }

  renew(
    newEndDate: Date,
    compliance: { status: ComplianceStatusEnum; rating: number; doctorNotes: string },
    newConsultationId?: string
  ): WorkoutPlan {
    const now = new Date();

    this.status = WorkoutStatusEnum.SUPERSEDED;
    this.compliance = compliance;
    this.updatedAt = now;

    return new WorkoutPlan({
      id: '',
      parentId: this.id,
      consultationId: newConsultationId ?? this.consultationId,
      specialty: UserSpecialty.WEIGHT,
      patientId: this.patientId,
      workoutId: this.workoutId,
      startDate: now,
      endDate: newEndDate,
      workoutSnapshot: { ...this.workoutSnapshot },
      status: WorkoutStatusEnum.RENEWED,
      compliance: {
        status: ComplianceStatusEnum.PENDING,
        rating: 0,
        doctorNotes: '',
      },
      createdAt: now,
      updatedAt: now,
    });
  }

  cancel(compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  }): WorkoutPlan {
    const now = new Date();

    this.status = WorkoutStatusEnum.SUPERSEDED;
    this.updatedAt = now;

    return new WorkoutPlan({
      id: '',
      parentId: this.id,
      consultationId: this.consultationId,
      specialty: UserSpecialty.WEIGHT,
      patientId: this.patientId,
      workoutId: this.workoutId,
      startDate: this.startDate,
      endDate: now,
      workoutSnapshot: this.workoutSnapshot,
      status: WorkoutStatusEnum.CANCELLED,
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
  getWorkoutId(): string {
    return this.workoutId;
  }
  getStartDate(): Date {
    return this.startDate;
  }
  getEndDate(): Date {
    return this.endDate;
  }
  getWorkoutSnapshot(): WorkoutSnapshot {
    return this.workoutSnapshot;
  }
  getStatus(): WorkoutStatusEnum {
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

  // Mapeo para persistencia
  toPersistence(): Omit<WorkoutPlanPropsDomain, 'id'> {
    return {
      parentId: this.parentId,
      specialty: UserSpecialty.WEIGHT,
      patientId: this.patientId,
      workoutId: this.workoutId,
      consultationId: this.consultationId,
      startDate: this.startDate,
      endDate: this.endDate,
      workoutSnapshot: this.workoutSnapshot,
      status: this.status,
      compliance: this.compliance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
