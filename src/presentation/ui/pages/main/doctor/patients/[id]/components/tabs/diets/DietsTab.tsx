// Next, React and Other Libraries
import { Plus } from 'lucide-react';

// UI Components
import { DietTimelineEvents, AssignDietPlanToPatient, DietPlanManagement } from './components';

// Feedback Components
import { DietsModalManagement } from './DietsModalManagement';
import { LoadingState, EmptyState } from '@/presentation/ui/pages/main/shared/feedback/';

// Custom Hooks
import { useDietsTab } from '@/presentation/hooks/diet';
import { useScrollToTopOnTabChange } from '@/presentation/hooks/shared/useScrollToTopOnTabChange';

// Enums, Types and Interfaces
import { PatientTimelineEventDTOPresentation } from '@/presentation/types/patient-timeline.types';

// Prop Types
interface DietsTabProps {
  timelineEvents: PatientTimelineEventDTOPresentation[];
}

export default function DietsTab({ timelineEvents }: DietsTabProps) {
  // Custom Hook for Diets Tab
  const {
    patientDietPlansData,
    allDietsData,
    assignDiet,
    isLoading,
    hasPlans,
    consultationId,
    goToConsultations,
  } = useDietsTab();

  // Scroll to top when switching tabs
  useScrollToTopOnTabChange();

  // Loading State
  if (isLoading) return <LoadingState />;

  // Empty State
  if (!hasPlans) {
    return (
      <EmptyState
        title="Selecciona una consulta para continuar"
        subtitle="Es necesario seleccionar una consulta para poder gestionar las dietas de este paciente."
      >
        <button
          type="button"
          onClick={goToConsultations}
          className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200"
        >
          <Plus className="h-5 w-5" />
          Seleccionar Consulta
        </button>
      </EmptyState>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <DietPlanManagement patientDietPlansData={patientDietPlansData} />

      {/* Assign Diet Plan To Patient */}
      {consultationId && (
        <AssignDietPlanToPatient
          assignDiet={assignDiet}
          allDietsData={allDietsData}
          patientDietPlansData={patientDietPlansData}
        />
      )}

      {/* Diets Tab */}
      {patientDietPlansData?.length > 0 && <DietTimelineEvents timelineEvents={timelineEvents} />}

      {/* Diets Modal Management */}
      <DietsModalManagement />
    </div>
  );
}
