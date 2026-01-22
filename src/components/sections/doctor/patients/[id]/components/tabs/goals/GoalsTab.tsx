import { useState } from 'react';
import GoalsHistory from './components/GoalsHistory';
import ActiveGoals from './components/active-goals/ActiveGoals';

// Feedback Components
import EmptyState from '@/components/shared/todayConsults/EmptyState';
import RemoveGoalModal from './components/remove-goal-modal/RemoveGoalModal';

export default function GoalsTab({
  goalsData,
  removeGoals,
  setShowCreateGoalModal,
  setShowSuccessModal,
  setSuccessTitle,
  setSuccessMessage,
  refetchGoals,
}: {
  goalsData: any;
  removeGoals: any;
  refetchGoals: () => void;
  setShowSuccessModal: (show: boolean) => void;
  setSuccessTitle: (title: string) => void;
  setSuccessMessage: (message: string) => void;
  setShowCreateGoalModal: (show: boolean) => void;
}) {
  const [showRemoveGoalModal, setShowRemoveGoalModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  return (
    <div className="flex flex-col gap-4">
      {/* Quick Stats */}
      {!goalsData?.some((goal) => goal?.isActive) ? (
        <EmptyState
          goal
          title="Paciente sin meta activa"
          subtitle="Asigna una nueva meta para que el paciente pueda comenzar su seguimiento."
          visible={true}
          onClickGoal={() => setShowCreateGoalModal(true)}
        />
      ) : (
        <ActiveGoals
          goalsData={goalsData}
          setSelectedGoal={setSelectedGoal}
          setShowRemoveGoalModal={setShowRemoveGoalModal}
        />
      )}

      {/* Diets Tab */}
      <GoalsHistory goalsData={goalsData} />

      {/* Remove Goal Modal*/}
      {showRemoveGoalModal && (
        <RemoveGoalModal
          setShowGoalModal={setShowRemoveGoalModal}
          refetchGoals={refetchGoals}
          removeGoals={removeGoals}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessTitle={setSuccessTitle}
          setSuccessMessage={setSuccessMessage}
          selectedGoal={selectedGoal}
          setShowRemoveGoalModal={setShowRemoveGoalModal}
        />
      )}
    </div>
  );
}
