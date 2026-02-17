// Next, React and Other Libraries
import { useSearchParams } from 'next/dist/client/components/navigation';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Feedback Components
import {
  TimelineEventModal,
  CancelWorkoutPlanModal,
  CompleteWorkoutPlanModal,
  RenewWorkoutPlanModal,
  SharedModalManagement,
} from './components';

// Enums, Types and Interfaces
import { WorkoutPlanModalConstant } from '@/presentation/constants/workout-plan/workout-plan.constant';
import { WorkoutPlanDTOPresentation } from '@/presentation/types';

export const WorkoutsModalManagement: React.FC = () => {
  // Next, React and Other Libraries
  const searchParams = useSearchParams();

  // Get Consultation ID from URL Search Params
  const consultationId = searchParams.get('consultationId');

  // Modal Handler
  const { activeModal, data } = useActiveModalStore();

  if (!activeModal) return null;

  const workoutModals: WorkoutPlanModalConstant[] = [
    'workoutEvent',
    'workoutComplete',
    'workoutRenew',
    'workoutCancel',
  ];

  const isWorkoutsModal =
    workoutModals.includes(activeModal as WorkoutPlanModalConstant) || activeModal === 'success';

  if (!isWorkoutsModal) return null;

  return (
    <>
      {/* Modal para Crear Consulta */}
      {activeModal === 'workoutEvent' && <TimelineEventModal selectedTimelineEventCard={data} />}

      {/* Complete Workout Plan Modal */}
      {activeModal === 'workoutComplete' && (
        <CompleteWorkoutPlanModal selectedWorkout={data as WorkoutPlanDTOPresentation} />
      )}

      {/* Renew Workout Plan Modal */}
      {activeModal === 'workoutRenew' && (
        <RenewWorkoutPlanModal
          consultationId={consultationId}
          selectedWorkout={data as WorkoutPlanDTOPresentation}
        />
      )}

      {/* Cancel Workout Plan Modal */}
      {activeModal === 'workoutCancel' && (
        <CancelWorkoutPlanModal selectedWorkout={data as WorkoutPlanDTOPresentation} />
      )}

      {/* Success Modal */}
      {activeModal === 'success' && <SharedModalManagement />}
    </>
  );
};
