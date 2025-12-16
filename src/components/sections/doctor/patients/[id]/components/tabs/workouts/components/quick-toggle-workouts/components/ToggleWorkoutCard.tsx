import { Calendar, Clock, Power, RefreshCcw, Trash2 } from 'lucide-react';

/**
 * ToggleWorkoutCard
 *
 * Provides a card interface that allows a doctor to toggle (activate/deactivate) a workout for a patient.
 * Activating a workout creates a workout_renewed timeline event.
 * Deactivating a workout creates a workout_completed timeline event.
 * Removing a workout creates a workout_removed timeline event.
 * Renewing a workout creates a workout_renewed timeline event.
 *
 * @param workout - The workout object containing workout details and status
 * @param handleWorkoutClick - Function to handle workout toggle action
 * @param patientId - Target patient identifier
 */
export default function ToggleWorkoutCard({
  workout,
  handleWorkoutClick,
  handleRenewWorkoutClick,
  patientId,
  recordId,
  setWorkoutToRemove,
  setShowRemoveWorkoutModal,
}) {
  // Date format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Disabled state
  const isDisabled = !recordId;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 ${
        isDisabled
          ? 'cursor-not-allowed border-dashed border-gray-300 bg-gray-100 opacity-50'
          : workout?.isActive
            ? 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark'
            : 'border-gray-200 bg-gray-50'
      }`}
    >
      {/* Remove button */}
      <button
        disabled={isDisabled}
        onClick={() => {
          if (isDisabled) return;
          setShowRemoveWorkoutModal(true);
          setWorkoutToRemove(workout);
        }}
        title={
          isDisabled
            ? 'Seleccione una consulta para modificar entrenamientos'
            : 'Remover entrenamiento del paciente'
        }
        className={`absolute right-2 bottom-2 scale-90 rounded-full border bg-white p-1 shadow-md transition-all duration-300 ${
          isDisabled
            ? 'cursor-not-allowed text-gray-300'
            : 'hover:bg-beehealth-red-primary-solid text-gray-400 hover:scale-130 hover:text-white'
        }`}
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* Renew workout button */}
      {workout?.isActive && (
        <button
          disabled={isDisabled}
          onClick={() => {
            if (isDisabled) return;
            handleRenewWorkoutClick(workout);
          }}
          title={
            isDisabled
              ? 'Seleccione una consulta para modificar entrenamientos'
              : 'Renovar entrenamiento para el paciente'
          }
          className={`absolute top-2 right-2 scale-90 rounded-full border bg-white p-1 shadow-md transition-all duration-300 ${
            isDisabled
              ? 'cursor-not-allowed text-gray-300'
              : 'hover:bg-beehealth-green-secondary-dark text-gray-400 hover:scale-130 hover:text-white'
          }`}
        >
          <RefreshCcw className="h-4 w-4 hover:animate-spin" />
        </button>
      )}

      {/* Content */}
      <div className="flex items-center justify-between">
        {/* Workout info */}
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-700">{workout?.workout?.name}</h4>

          <span className="bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold">
            {workout?.workout?.type}
          </span>

          {/* Meta */}
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Asignado: {formatDate(workout?.assignedAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              {workout?.isActive ? (
                <span>
                  Tiempo activo:{' '}
                  {Math.floor((Date.now() - new Date(workout.assignedAt).getTime()) / 86400000)}{' '}
                  días
                </span>
              ) : (
                <span>
                  Última vez asignado:{' '}
                  {workout?.finishedAt ? formatDate(workout.finishedAt) : 'Nunca'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Power button */}
        <button
          disabled={isDisabled}
          onClick={() => {
            if (isDisabled) return;
            handleWorkoutClick(workout);
          }}
          className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${
            isDisabled
              ? 'cursor-not-allowed bg-gray-200 shadow-inner'
              : workout?.isActive
                ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] active:scale-95'
                : 'bg-gray-300 shadow-md hover:scale-105 hover:bg-gray-400 active:scale-95'
          }`}
        >
          <Power
            className={`h-10 w-10 ${
              isDisabled ? 'text-gray-400' : workout?.isActive ? 'text-white' : 'text-gray-500'
            }`}
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
}
