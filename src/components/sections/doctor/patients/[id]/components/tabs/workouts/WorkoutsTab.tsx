import { useState } from 'react';

import WorkoutsHistory from './WorkoutsHistory';
import QuickToggleWorkouts from './components/quick-toggle-workouts/QuickToggleWorkouts';

// Feedback Components
import SuccessModal from '@/components/shared/feedback/SuccessModal';
import AssignWorkoutToPatient from '@/components/shared/workouts/AssignWorkoutToPatient';

export default function WorkoutsTab({
  patientId,
  userData,
  refetchPatientWorkouts,
  workoutsData,
  patientWorkoutsLoading,
  patientWorkoutsError,
  events,
  timelineLoading,
  timelineError,
  recordId,
  setShowWorkoutHistoryCardFeedbackModal,
  setSelectedWorkoutHistoryCard,
  refetchTimeline,
  setShowRemoveWorkoutModal,
  setWorkoutToRemove,
}: {
  patientId: string;
  recordId: string | null;
  userData: any;
  refetchPatientWorkouts: () => void;
  workoutsData: any;
  patientWorkoutsLoading: boolean;
  patientWorkoutsError: any;
  events: any;
  timelineLoading: boolean;
  timelineError: any;
  setShowWorkoutHistoryCardFeedbackModal: (show: boolean) => void;
  setSelectedWorkoutHistoryCard: (card: any) => void;
  refetchTimeline: () => void;
  setWorkoutToRemove: (workout: any) => void;
  setShowRemoveWorkoutModal: (show: boolean) => void;
}) {
  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successTitle, setSuccessTitle] = useState<string>('Entrenamiento asignado correctamente');
  const [successMessage, setSuccessMessage] = useState<string>(
    'El entrenamiento ha sido asignado exitosamente al paciente.'
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      <QuickToggleWorkouts
        patientId={patientId}
        recordId={recordId}
        userData={userData}
        setShowSuccessModal={setShowSuccessModal}
        setSuccessTitle={setSuccessTitle}
        setSuccessMessage={setSuccessMessage}
        refetchPatientWorkouts={refetchPatientWorkouts}
        workoutsData={workoutsData}
        patientWorkoutsLoading={patientWorkoutsLoading}
        patientWorkoutsError={patientWorkoutsError}
        setShowRemoveWorkoutModal={setShowRemoveWorkoutModal}
        refetchTimeline={refetchTimeline}
        setWorkoutToRemove={setWorkoutToRemove}
      />

      {/* Assign Section */}
      {recordId && (
        <AssignWorkoutToPatient
          patientId={patientId}
          recordId={recordId}
          setShowSuccessModal={setShowSuccessModal}
          refetchTimeline={refetchTimeline}
        />
      )}

      {/* Workouts Tab */}
      <WorkoutsHistory
        events={events}
        timelineLoading={timelineLoading}
        timelineError={timelineError}
        setShowWorkoutHistoryCardFeedbackModal={setShowWorkoutHistoryCardFeedbackModal}
        setSelectedWorkoutHistoryCard={setSelectedWorkoutHistoryCard}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          title={successTitle}
          message={successMessage}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
    </div>
  );
}
