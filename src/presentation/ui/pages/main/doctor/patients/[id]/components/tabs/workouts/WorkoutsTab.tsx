// UI Components
import { WorkoutTimelineEvents } from './components';
import WorkoutPlanManagement from './components/workout-plan-management/WorkoutPlanManagement';
import AssignWorkoutPlanToPatient from './components/AssignWorkoutPlanToPatient';

// Feedback Components
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';
import { WorkoutsModalManagement } from './WorkoutsModalManagement';

// Custom Hooks and Stores
import { useWorkoutsTab } from '@/presentation/hooks/workout';
import { useScrollToTopOnTabChange } from '@/presentation/hooks/shared/useScrollToTopOnTabChange';

// Enums, Types and Interfaces
import { PatientTimelineEventDTOPresentation } from '@/presentation/types/patient-timeline.types';

interface WorkoutsTabProps {
  timelineEvents: PatientTimelineEventDTOPresentation[];
}

export default function WorkoutsTab({ timelineEvents }: WorkoutsTabProps) {
  // Fetch All data needed for Workouts Tab using Custom Hook
  const { consultationId, patientWorkoutPlansData, allWorkoutsData, assignWorkout, isLoading } =
    useWorkoutsTab();

  // Scroll to top when switching tabs
  useScrollToTopOnTabChange();

  if (isLoading) return <LoadingState />;

  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <WorkoutPlanManagement
        consultationId={consultationId}
        patientWorkoutPlansData={patientWorkoutPlansData!}
      />

      {/* Assign Workout Plan To Patient */}
      {consultationId && (
        <AssignWorkoutPlanToPatient
          consultationId={consultationId}
          assignWorkout={assignWorkout}
          allWorkoutsData={allWorkoutsData}
          patientWorkoutPlansData={patientWorkoutPlansData!}
        />
      )}

      {/* Timeline Events */}
      <WorkoutTimelineEvents timelineEvents={timelineEvents} />

      {/* Modal Management */}
      <WorkoutsModalManagement />
    </div>
  );
}
