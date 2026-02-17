'use client';

// Next, React and Other Libraries
import { useParams } from 'next/navigation';

// UI Components
import { TabsNav, BackButton, PatientHeader } from './components';
import { ConsultationTab, DietsTab, WorkoutsTab, GoalsTab } from './components/tabs/';

// Feedback Components
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';

// Custom Hooks
import { useGetCompletePatientInfo } from '@/presentation/hooks/users/';

export default function DoctorPatientDetailPage() {
  // Patient ID from URL Params
  const { id: patientId } = useParams<{ id: string }>();

  // Get Complete Patient Info from Custom Hook
  const {
    patientSpecialty,
    activeTab,
    patientUserData,
    patientStats,
    patientClinicalHistory,
    consultationsWithDietsAndWorkouts,
    patientWeightSummary,
    latestConsultation,
    patientWeightHistory,
    timelineEventsByCategory,
    isLoading,
  } = useGetCompletePatientInfo(patientId);

  // Loading State
  if (isLoading) return <LoadingState />;

  return (
    <div id="patientDetailScrollContainer" className="h-full space-y-6 overflow-y-auto">
      {/* Patient Header */}
      <div className="grid grid-rows-[auto_1fr]">
        <BackButton />
        <PatientHeader
          patientUserData={patientUserData}
          patientSpecialty={patientSpecialty}
          patientWeightSummary={patientWeightSummary}
          patientClinicalHistory={patientClinicalHistory}
        />
      </div>

      {/* Navigation Tabs */}
      <TabsNav activeTab={activeTab} />

      {/* Consultation Tab */}
      {activeTab === 'Consultas' && (
        <ConsultationTab
          consultationsWithDietsAndWorkouts={consultationsWithDietsAndWorkouts}
          patientWeightHistory={patientWeightHistory}
          patientStats={patientStats}
          latestConsultation={latestConsultation}
          patientWeightSummary={patientWeightSummary}
        />
      )}

      {/* Diets Tab */}
      {activeTab === 'Dietas' && <DietsTab timelineEvents={timelineEventsByCategory} />}

      {/* Workouts Tab */}
      {activeTab === 'Ejercicios' && <WorkoutsTab timelineEvents={timelineEventsByCategory} />}

      {/* Goals Tab */}
      {activeTab === 'Metas' && (
        <GoalsTab patientUserData={patientUserData} timelineEvents={timelineEventsByCategory} />
      )}
    </div>
  );
}
