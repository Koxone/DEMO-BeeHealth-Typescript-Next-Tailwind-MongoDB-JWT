import { useState } from 'react';
import { Utensils } from 'lucide-react';
import ToggleWorkoutCard from './components/ToggleWorkoutCard';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';
import WorkoutCompletedModal from '../workout-completed-modal/WorkoutCompletedModal';

// Types
import { UserWorkout } from '@/types/workouts/workout.types';
import WorkoutReactivateModal from '../workout-reactivate-modal/WorkoutReactivateModal';

export default function QuickToggleWorkouts({
  patientId,
  userData,
  setShowSuccessModal,
  setSuccessTitle,
  setSuccessMessage,
  refetchPatientWorkouts,
  workoutsData,
  recordId,
  patientWorkoutsLoading,
  patientWorkoutsError,
  refetchTimeline,
  setShowRemoveWorkoutModal,
  setWorkoutToRemove,
}: {
  patientId: string;
  userData: any;
  setShowSuccessModal: (show: boolean) => void;
  setSuccessTitle: (title: string) => void;
  setSuccessMessage: (message: string) => void;
  refetchPatientWorkouts: () => void;
  workoutsData: UserWorkout[];
  patientWorkoutsLoading: boolean;
  recordId: string | null;
  patientWorkoutsError: any;
  refetchTimeline: () => void;
  setShowRemoveWorkoutModal: (show: boolean) => void;
  setWorkoutToRemove: (workout: UserWorkout | null) => void;
}) {
  const [selectedWorkout, setSelectedWorkout] = useState<UserWorkout | null>(null);
  const [showToggleModal, setShowToggleModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Renew Workout Modal States
  const [showRenewModal, setShowRenewModal] = useState<boolean>(false);

  // Handle workout click
  const handleWorkoutClick = (workout: UserWorkout) => {
    setSelectedWorkout(workout);
    setShowToggleModal(true);
  };

  const handleRenewWorkoutClick = (workout: UserWorkout) => {
    setSelectedWorkout(workout);
    setShowRenewModal(true);
  };

  // Loading State
  if (patientWorkoutsLoading) {
    return <LoadingState />;
  }

  // Error State
  if (patientWorkoutsError) {
    return <ErrorState />;
  }
  return (
    <div className="space-y-6">
      {/* Assigned workouts */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <Utensils className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-700">Gestion de Entrenamientos</h3>
            <p className="text-sm text-gray-500">
              Click en un entrenamiento para activar o desactivar del plan de entrenamiento de este
              paciente.
            </p>
          </div>
        </div>

        {/* Workout Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {workoutsData?.map((workout) => {
            return (
              <ToggleWorkoutCard
                key={workout?.workout?._id}
                recordId={recordId}
                workout={workout}
                handleWorkoutClick={handleWorkoutClick}
                handleRenewWorkoutClick={handleRenewWorkoutClick}
                patientId={patientId}
                setShowRemoveWorkoutModal={setShowRemoveWorkoutModal}
                setWorkoutToRemove={setWorkoutToRemove}
              />
            );
          })}
        </div>
      </div>

      {/* Toggle workout modal */}
      {showToggleModal && selectedWorkout && (
        <WorkoutCompletedModal
          recordId={recordId}
          selectedWorkout={selectedWorkout}
          userData={userData}
          setShowToggleModal={setShowToggleModal}
          isProcessing={isProcessing}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessTitle={setSuccessTitle}
          refetchTimeline={refetchTimeline}
          setSuccessMessage={setSuccessMessage}
          refetchPatientWorkouts={refetchPatientWorkouts}
        />
      )}

      {/* Renew workout modal */}
      {showRenewModal && selectedWorkout && (
        <WorkoutReactivateModal
          selectedWorkout={selectedWorkout}
          recordId={recordId}
          userData={userData}
          isProcessing={isProcessing}
          setSuccessTitle={setSuccessTitle}
          refetchTimeline={refetchTimeline}
          setSuccessMessage={setSuccessMessage}
          refetchWorkouts={refetchPatientWorkouts}
          setShowRenewModal={setShowRenewModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
    </div>
  );
}
