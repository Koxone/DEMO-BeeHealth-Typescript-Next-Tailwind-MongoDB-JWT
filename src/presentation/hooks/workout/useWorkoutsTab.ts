import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useGetPatientWorkoutPlans } from '@/presentation/hooks/workout-plan/useGetPatientWorkoutPlans';
import { useAssignWorkoutPlanToPatient } from '../workout-plan/useAssignWorkoutPlanToPatient';
import { useGetAllWorkouts } from '@/presentation/hooks/workout';
import { UserRole } from '@/domain/enums/';

export const useWorkoutsTab = () => {
  // Patient ID from URL Params
  const { id: patientId } = useParams<{ id: string }>();

  // Get consultationId from URL
  const searchParams = useSearchParams();
  const consultationId = searchParams.get('consultationId');

  // Fetch data
  const { data: patientWorkoutPlansData, isLoading: isPlansLoading } = useGetPatientWorkoutPlans(
    patientId!
  );
  const { data: allWorkoutsData, isLoading: isTemplatesLoading } = useGetAllWorkouts();

  // Mutations
  const { mutate: assignWorkout } = useAssignWorkoutPlanToPatient(patientId!);

  const isLoading = isPlansLoading || isTemplatesLoading;
  const hasPlans = patientWorkoutPlansData && patientWorkoutPlansData.length > 0;

  const router = useRouter();
  const goToConsultations = () => {
    router.push(
      `/${UserRole.DOCTOR}/patients/${patientId}?tab=Consultas&scrollTo=assignWorkoutPlanButton`
    );
  };

  return {
    patientId,
    consultationId,
    patientWorkoutPlansData,
    allWorkoutsData,
    assignWorkout,
    isLoading,
    hasPlans,
    goToConsultations,
  };
};
