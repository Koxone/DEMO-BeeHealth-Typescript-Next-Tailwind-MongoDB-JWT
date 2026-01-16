import { CircleAlert, Flag } from 'lucide-react';
import ActiveGoalCard from './components/ActiveGoalCard';

export default function ActiveGoals({
  goalsData,
  setShowSuccessModal,
  setSuccessTitle,
  setSuccessMessage,
  removeGoals,
  refetchGoals,
  selectedGoal,
  setSelectedGoal,
  setShowRemoveGoalModal,
}: {
  goalsData: any;
  setShowSuccessModal: (show: boolean) => void;
  setSuccessTitle: (title: string) => void;
  setSuccessMessage: (message: string) => void;
  removeGoals: any;
  selectedGoal: any;
  setSelectedGoal: (goal: any) => void;
  refetchGoals: () => void;
  setShowRemoveGoalModal: (show: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Assigned goals */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <Flag className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-700">Meta Activa</h3>
            <div className="flex items-center space-x-1">
              <CircleAlert className="text-beehealth-red-primary-solid h-4 w-4" />
              <p className="text-sm text-gray-500">Solo puede haber una meta activa a la vez.</p>
            </div>
          </div>
        </div>

        {/* Diet Card */}
        <div className="grid grid-cols-1 gap-4">
          {goalsData
            ?.filter((goal) => goal?.isActive)
            .map((goal) => (
              <ActiveGoalCard
                key={goal?._id}
                refetchGoals={refetchGoals}
                selectedGoal={selectedGoal}
                setSelectedGoal={setSelectedGoal}
                goal={goal}
                setShowRemoveGoalModal={setShowRemoveGoalModal}
                removeGoals={removeGoals}
                setShowSuccessModal={setShowSuccessModal}
                setSuccessTitle={setSuccessTitle}
                setSuccessMessage={setSuccessMessage}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
