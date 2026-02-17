import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
  useGetPatientDietPlans,
  useAssignDietPlanToPatient,
} from '@/presentation/hooks/diet-plan/';
import { useGetAllDiets } from '@/presentation/hooks/diet';
import { UserRole } from '@/domain/enums/';

export const useDietsTab = () => {
  // Patient ID from URL Params
  const { id: patientId } = useParams<{ id: string }>();

  // Get consultationId from URL
  const searchParams = useSearchParams();
  const consultationId = searchParams.get('consultationId');

  // Fetch Patient Dietl Plans
  const { data: patientDietPlansData, isLoading: isPlansLoading } = useGetPatientDietPlans(
    patientId!
  );
  const { data: allDietsData, isLoading: isTemplatesLoading } = useGetAllDiets();

  // Mutations
  const { mutate: assignDiet } = useAssignDietPlanToPatient(patientId!);

  // Nav to Consultations if no consultation selected
  const router = useRouter();
  const goToConsultations = () => {
    router.push(
      `/${UserRole.DOCTOR}/patients/${patientId}?tab=Consultas&scrollTo=assignDietPlanButton`
    );
  };

  const isLoading = isPlansLoading || isTemplatesLoading;
  const hasPlans = patientDietPlansData && patientDietPlansData.length > 0;

  return {
    patientId,
    patientDietPlansData,
    allDietsData,
    assignDiet,
    isLoading,
    consultationId,
    hasPlans,
    goToConsultations,
  };
};
