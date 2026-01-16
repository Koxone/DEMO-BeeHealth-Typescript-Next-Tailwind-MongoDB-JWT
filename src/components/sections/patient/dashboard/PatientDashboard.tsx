'use client';

import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import PatientEvolutionChart from './components/PatientEvolutionChart';
import PatientMotivationalBanner from './components/PatientMotivationalBanner';
import PatientStatsGrid from './components/stats-grid/PatientStatsGrid';

// Custom Hooks
import { useGetAllWeightLogs } from '@/@hooks/clinicalRecords/get/useGetAllWeightLogs';
import { useGetPatientWeightLogs } from '@/@hooks/clinicalRecords/get/useGetPatientWeightLogs';
import { useGetMyAppointments } from '@/@hooks/appointments/useGetMyAppointments';
import { useGetPatientGoals } from '@/@hooks/users/useGetPatientGoals';

// Feedback Components
import ErrorState from '@/components/shared/feedback/ErrorState';
import LoadingState from '@/components/shared/feedback/LoadingState';

export default function PatientDashboard({ currentUser }) {
  // Patient ID
  const patientId = currentUser?.id;

  // Get Patient next appointments
  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useGetMyAppointments(patientId);

  // Weight Logs Hook for Global counter
  const {
    weightLogs,
    loading: weightLogsLoading,
    error: weightLogsError,
    refetch: refetchWeightLogs,
  } = useGetAllWeightLogs();

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
  if (goalsLoading || appointmentsLoading || weightLogsLoading || patientWeightLogsLoading) {
    return <LoadingState />;
  }

  // Error State
  if (appointmentsError || goalsError || weightLogsError || patientWeightLogsError) {
    return <ErrorState />;
  }

  return (
    <div className="mb-20 h-full space-y-4 overflow-y-auto md:mb-0 md:space-y-6">
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="patient" />

      {/* Stats */}
      <PatientStatsGrid
        patientWeightLogs={patientWeightLogs}
        weightLogs={weightLogs}
        appointments={appointments}
      />

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <PatientMotivationalBanner goalsData={goalsData} />

        <PatientEvolutionChart
          weightLogs={patientWeightLogs}
          weightLogsLoading={weightLogsLoading}
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
