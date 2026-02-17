import { tabs } from '@/presentation/types/';
import { useDoctorPatientDetailTabNavigation } from '../doctor-patient-detail/';
import { useGetPatientClinicalHistory } from '../clinical-history/useGetPatientClinicalHistory';
import { useGetPatientWeightSummary } from '@/presentation/hooks/clinical-history/useGetPatientWeightSummary';
import {
  useGetConsultationsWithDietsAndWorkouts,
  useGetLatestConsultation,
  useGetPatientConsultations,
  useGetPatientWeightHistory,
} from '../consultation';
import { useGetPatientTimeline } from '../patient-timeline/';
import { useGetUserById, useGetPatientStats } from '@/presentation/hooks/users';
import { useGetPatientWorkoutPlans } from '@/presentation/hooks/workout-plan/useGetPatientWorkoutPlans';
import { useGetTimelineEventsByCategory } from '../patient-timeline/useGetTimelineEventsByCategory';

export function useGetCompletePatientInfo(patientId: string) {
  const { activeTab } = useDoctorPatientDetailTabNavigation(tabs, 'Consultas');

  // Fetch User Data by ID
  const { data: patientUserData, isLoading: isUserLoading } = useGetUserById(patientId);
  const patientSpecialty = patientUserData?.specialty;

  // Fetch Patient Clinical History
  const { data: patientClinicalHistory, isLoading: isClinicalHistoryLoading } =
    useGetPatientClinicalHistory(patientId);

  // Fetch Patient Weight Summary
  const { data: patientWeightSummary } = useGetPatientWeightSummary(patientId);

  // Fetch Patient Stats
  const {
    data: patientStats,
    error: statsError,
    isLoading: isStatsLoading,
  } = useGetPatientStats(patientId);

  // Fetch Latest Consultation
  const {
    data: latestConsultation,
    error: latestConsultationError,
    isLoading: isLatestConsultationLoading,
  } = useGetLatestConsultation(patientId);

  // Fetch Patient Consultations
  const {
    data: patientConsultations,
    isLoading: isConsultationsLoading,
    error: consultationsError,
  } = useGetPatientConsultations(patientId);

  const {
    data: patientWeightHistory,
    error: weightHistoryError,
    isLoading: isWeightHistoryLoading,
  } = useGetPatientWeightHistory(patientId);

  // Fetch Consultations with Diets and Workouts
  const {
    data: consultationsWithDietsAndWorkouts,
    isLoading: isConsultationsWithDietsLoading,
    error: consultationsWithDietsError,
  } = useGetConsultationsWithDietsAndWorkouts(patientId);

  // Fetch Patient Timeline
  const {
    data: timelineEvents,
    isLoading: isTimelineLoading,
    error: timelineError,
  } = useGetPatientTimeline(patientId);

  // Fetch Patient Workouts
  const {
    data: patientWorkoutPlans,
    isLoading: isWorkoutsLoading,
    error: workoutsError,
  } = useGetPatientWorkoutPlans(patientId);

  // Fetch Patient Timeline Events by Category
  const { data: timelineEventsByCategory, error: timelineEventsByCategoryError } =
    useGetTimelineEventsByCategory(patientId, activeTab);

  const isLoading =
    isUserLoading ||
    isClinicalHistoryLoading ||
    isStatsLoading ||
    isLatestConsultationLoading ||
    isConsultationsLoading ||
    isWeightHistoryLoading ||
    isConsultationsWithDietsLoading ||
    isTimelineLoading ||
    isWorkoutsLoading;

  return {
    patientSpecialty,
    patientWeightHistory,
    patientStats,
    patientConsultations,
    latestConsultation,
    patientWeightSummary,
    activeTab,
    patientUserData,
    patientClinicalHistory,
    isLoading,
    consultationsWithDietsAndWorkouts,
    consultationsWithDietsError,
    timelineEvents,
    timelineError,
    weightHistoryError,
    isTimelineLoading,
    latestConsultationError,
    statsError,
    consultationsError,
    workoutsError,
    timelineEventsByCategoryError,
    timelineEventsByCategory,
    patientWorkoutPlans,
  };
}
