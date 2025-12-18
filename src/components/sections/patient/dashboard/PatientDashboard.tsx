'use client';

import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import PatientEvolutionChart from './components/PatientEvolutionChart';
import PatientMotivationalBanner from './components/PatientMotivationalBanner';
import PatientStatsGrid from './components/stats-grid/PatientStatsGrid';
import GlobalWeightLogs from '@/components/shared/dashboard/weight-logs/GlobalWeightLogs';

// Custom Hooks
import { useGetAllWeightLogs } from '@/hooks/clinicalRecords/get/useGetAllWeightLogs';
import { useGetPatientWeightLogs } from '@/hooks/clinicalRecords/get/useGetPatientWeightLogs';
import { useGetAllClinicalRecords } from '@/hooks/clinicalRecords/get/useGetAllClinicalRecords';
import { useGetMyAppointments } from '@/hooks/appointments/useGetMyAppointments';

// Feedback Components
import ErrorState from '@/components/shared/feedback/ErrorState';
import LoadingState from '@/components/shared/feedback/LoadingState';

export default function PatientDashboard({ currentUser }) {
  // Patient ID
  const patientId = currentUser?.id;

  // Fetch clinical records for the patient
  const { data, loading } = useGetAllClinicalRecords({ patient: patientId });

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

  // Loading state
  if (loading || weightLogsLoading || patientWeightLogsLoading) {
    return <LoadingState />;
  }

  // Error State
  if (weightLogsError || patientWeightLogsError) {
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
        <PatientEvolutionChart
          weightLogs={patientWeightLogs}
          weightLogsLoading={weightLogsLoading}
          title="Evolución del Peso"
          legendLabel="Peso"
          legendColor="#3b82f6"
          unit="kg"
          stroke="#3b82f6"
        />

        <div className="grid grid-rows-2 gap-4">
          <GlobalWeightLogs
            weightLogs={weightLogs}
            loading={weightLogsLoading}
            refetch={refetchWeightLogs}
          />
          <PatientMotivationalBanner />
        </div>
      </div>
    </div>
  );
}
