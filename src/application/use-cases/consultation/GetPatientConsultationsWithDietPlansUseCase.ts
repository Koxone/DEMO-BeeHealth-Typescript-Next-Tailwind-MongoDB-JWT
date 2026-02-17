import { ConsultationRepository } from '@/domain/repositories/consultation/ConsultationRepository';
import { DietPlanRepository } from '@/domain/repositories/diet-plan/DietPlanRepository';
import { UserSpecialty } from '@/domain/enums/';
import { ClinicalHistoryAnswerDTOApplication } from '@/application/types/clinical-history.application.types';
import { WorkoutPlanRepository } from '../../../domain/repositories/workout-plan/WorkoutPlanRepository';

export interface ConsultationWithDietsAndWorkoutsResponseDTO {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  answers: ClinicalHistoryAnswerDTOApplication[];
  dietPlans: {
    id: string;
    dietId: string;
    dietName: string;
    createdAt: Date;
  }[];
  workoutPlans: {
    id: string;
    workoutId: string;
    workoutName: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export class GetPatientConsultationsWithDietsAndWorkoutsUseCase {
  constructor(
    private readonly consultationRepository: ConsultationRepository,
    private readonly dietPlanRepository: DietPlanRepository,
    private readonly workoutPlanRepository: WorkoutPlanRepository
  ) {}

  async execute(patientId: string): Promise<ConsultationWithDietsAndWorkoutsResponseDTO[]> {
    // 1. Obtener consultas del paciente
    const consultations = await this.consultationRepository.findAllByPatientIdAndSpecialty(
      patientId,
      UserSpecialty.WEIGHT
    );

    if (!consultations || consultations.length === 0) return [];

    const consultationIds = consultations.map((c) => c.id);

    const [dietPlans, workoutPlans] = await Promise.all([
      this.dietPlanRepository.findAllByConsultationIds(consultationIds),
      this.workoutPlanRepository.findAllByConsultationIds(consultationIds),
    ]);

    return consultations.map((consultation) => {
      const diets = dietPlans.filter((plan) => plan.getConsultationId() === consultation.id);
      const workouts = workoutPlans.filter((plan) => plan.getConsultationId() === consultation.id);

      return {
        id: consultation.id,
        patientId: consultation.patientId,
        specialty: consultation.specialty,
        answers: consultation.answers.getAllAnswers().map((a) => a.toPersistence()),
        dietPlans: diets.map((diet) => ({
          id: diet.getId(),
          dietId: diet.getDietId(),
          dietName: diet.getDietSnapshot().name,
          createdAt: diet.getCreatedAt(),
        })),
        workoutPlans: workouts.map((workout) => ({
          id: workout.getId(),
          workoutId: workout.getWorkoutId(),
          workoutName: workout.getWorkoutSnapshot().name,
          createdAt: workout.getCreatedAt(),
        })),
        createdAt: consultation.createdAt,
        updatedAt: consultation.updatedAt,
      };
    });
  }
}
