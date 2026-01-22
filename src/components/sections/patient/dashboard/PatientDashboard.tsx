'use client';

import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import PatientEvolutionChart from './components/PatientEvolutionChart';
import PatientGoalBanner from './components/PatientGoalBanner';
import PatientStatsGrid from './components/stats-grid/PatientStatsGrid';

// Custom Hooks
import { useGetPatientWeightLogs } from '@/@hooks/clinicalRecords/get/useGetPatientWeightLogs';
import { useGetMyAppointments } from '@/@hooks/appointments/useGetMyAppointments';
import { useGetPatientGoals } from '@/@hooks/users/useGetPatientGoals';
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

// Feedback Components
import ErrorState from '@/components/shared/feedback/ErrorState';
import LoadingState from '@/components/shared/feedback/LoadingState';

export default function PatientDashboard() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  // Patient ID
  const patientId = currentUser?.id;

  // Get Patient next appointments
  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useGetMyAppointments(patientId);

  // Patient Weight Logs Hook
  const {
    weightLogs: patientWeightLogs,
    loading: patientWeightLogsLoading,
    error: patientWeightLogsError,
    refetch: refetchPatientWeightLogs,
  } = useGetPatientWeightLogs(currentUser?.id);

  // Get Patient Goals with Custom Hook
  const {
    data: goalsData,
    isLoading: goalsLoading,
    error: goalsError,
    refetch: refetchGoals,
  } = useGetPatientGoals(patientId);

  // Loading state
  if (goalsLoading || appointmentsLoading || patientWeightLogsLoading || isLoadingCurrentUser) {
    return <LoadingState />;
  }

  // Error State
  if (appointmentsError || goalsError || patientWeightLogsError) {
    return <ErrorState />;
  }

  return (
    <div className="mb-20 h-full space-y-4 overflow-y-auto md:mb-0 md:space-y-6">
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="patient" />

      {/* Stats */}
      <PatientStatsGrid
        patientWeightLogs={patientWeightLogs}
        appointments={appointments}
        currentUser={currentUser}
      />

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <PatientGoalBanner goalsData={goalsData} currentUser={currentUser} />

        <PatientEvolutionChart
          weightLogs={patientWeightLogs}
          weightLogsLoading={patientWeightLogsLoading}
          title="Evolución del Peso"
          legendLabel="Peso"
          legendColor="#3b82f6"
          unit="kg"
          stroke="#3b82f6"
        />
      </div>
    </div>
  );
}
