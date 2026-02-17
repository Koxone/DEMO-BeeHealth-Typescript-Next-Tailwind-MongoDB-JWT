// Next, React and Other Libraries
import { useParams, useSearchParams } from 'next/dist/client/components/navigation';

// UI Components
import { GoalsHistory, GoalsManagement } from './components/';
import { GoalsTabModalManager } from './GoalModalManager';

// Enums, Types and Interfaces
import { PatientTimelineEventDTOPresentation, UserDTOPresentation } from '@/presentation/types/';

// Custom Hooks and Stores
import { useGetPatientGoals } from '@/presentation/hooks';
import { useScrollToTopOnTabChange } from '@/presentation/hooks/shared/useScrollToTopOnTabChange';

// Prop Types
interface GoalsTabProps {
  patientUserData: UserDTOPresentation;
  timelineEvents: PatientTimelineEventDTOPresentation[];
}

export default function GoalsTab({ patientUserData, timelineEvents }: GoalsTabProps) {
  // Patient ID from URL Params
  const { id: patientId } = useParams<{ id: string }>();

  // Get consultationId from URL
  const searchParams = useSearchParams();
  const consultationId = searchParams.get('consultationId');

  // Fetch Goals Data with Custom Hook
  const { data: goalsData } = useGetPatientGoals(patientId, consultationId);

  // Scroll to top when changing to Goals Tab
  useScrollToTopOnTabChange();

  return (
    <div className="flex flex-col gap-4">
      <GoalsManagement goalsData={goalsData} />

      <GoalsHistory timelineEvents={timelineEvents} />

      {/* Modal Manager */}
      <GoalsTabModalManager patientUserData={patientUserData} />
    </div>
  );
}
