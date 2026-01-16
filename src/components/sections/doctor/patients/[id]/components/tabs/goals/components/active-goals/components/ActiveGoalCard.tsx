import { Calendar, Clock, Trash } from 'lucide-react';

/**
 * ActiveGoalCard
 *
 * Provides a card interface that allows a doctor to toggle (activate/deactivate) a diet for a patient.
 * Activating a diet creates a diet_renewed timeline event.
 * Deactivating a diet creates a diet_completed timeline event.
 * Removing a diet creates a diet_removed timeline event.
 * Renewing a diet creates a diet_renewed timeline event.
 *
 * @param diet - The diet object containing diet details and status
 * @param handleDietClick - Function to handle diet toggle action
 * @param patientId - Target patient identifier
 */
export default function ActiveGoalCard({
  goal,
  removeGoals,
  setShowSuccessModal,
  setSuccessTitle,
  setSuccessMessage,
  refetchGoals,
  setShowRemoveGoalModal,
  selectedGoal,
  setSelectedGoal,
}) {
  // Date format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      timeZone: 'America/Mexico_City',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Days difference
  const daysActive = (createdAt) => {
    const start = new Date(createdAt).getTime();
    const now = Date.now();
    const diff = now - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };
  // Disabled state
  const isDisabled = !goal?.isActive;

  const handleRemoveClick = () => {
    setSelectedGoal(goal);
    setShowRemoveGoalModal(true);
  };

  // Success Modal States
  const handleSuccess = (title, message) => {
    refetchGoals();
    setSuccessTitle(title);
    setSuccessMessage(message);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      setSuccessTitle('');
      setSuccessMessage('');
    }, 1000);
  };

  return (
    <div className="group bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark relative max-w-[500px] overflow-hidden rounded-xl border-2 p-4 transition-all duration-300">
      {/* Content */}
      <div className="flex items-center justify-between gap-10">
        {/* Diet info */}
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-700">Meta: {goal?.goal}kg</h4>
          {goal?.initialWeight && (
            <h5 className="text-sm font-semibold text-gray-600">
              Peso Inicial: {goal?.initialWeight}kg
            </h5>
          )}

          <span className="bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark mt-1 inline-block rounded-md px-3 py-1 text-xs font-semibold">
            {goal?.notes}
          </span>

          {/* Meta info */}
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Asignada: {formatDate(goal?.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>Tiempo activa: {daysActive(goal.createdAt)} Días</span>
            </div>
          </div>
        </div>

        {/* Power button */}
        <button
          // onClick={() => {
          //   removeGoals(goal?.patient, {
          //     onSuccess: () => {
          //       handleSuccess('Meta eliminada', 'La meta ha sido eliminada correctamente.');
          //     },
          //   });
          // }}
          onClick={handleRemoveClick}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] active:scale-95"
        >
          <Trash
            className={`h-10 w-10 ${
              isDisabled ? 'text-gray-400' : goal?.isActive ? 'text-white' : 'text-gray-500'
            }`}
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
}
