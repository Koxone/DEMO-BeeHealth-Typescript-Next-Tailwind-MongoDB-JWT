import { Calendar, Clock, Power, RefreshCcw, Trash2 } from 'lucide-react';

/**
 * ToggleDietCard
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
export default function ToggleDietCard({
  diet,
  handleDietClick,
  recordId,
  setDietToDelete,
  handleRenewDietClick,
  setShowRemoveDietModal,
}) {
  // Date format
  const formatDate = (dateString) => {
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
          : diet?.isActive
            ? 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark'
            : 'border-gray-200 bg-gray-50'
      }`}
    >
      {/* Remove diet button */}
      <button
        disabled={isDisabled}
        onClick={() => {
          if (isDisabled) return;
          setShowRemoveDietModal(true);
          setDietToDelete(diet);
        }}
        title={
          isDisabled ? 'Seleccione una consulta para modificar dietas' : 'Remover dieta de paciente'
        }
        className={`absolute right-2 bottom-2 scale-90 rounded-full border bg-white p-1 shadow-md transition-all duration-300 ${
          isDisabled
            ? 'cursor-not-allowed text-gray-300'
            : 'hover:bg-beehealth-red-primary-solid text-gray-400 hover:scale-130 hover:text-white'
        }`}
      >
        <Trash2 className="h-4 w-4 hover:animate-bounce" />
      </button>

      {/* Renew diet button */}
      {diet?.isActive && (
        <button
          disabled={isDisabled}
          onClick={() => {
            if (isDisabled) return;
            handleRenewDietClick(diet);
          }}
          title={
            isDisabled
              ? 'Seleccione una consulta para modificar dietas'
              : 'Renovar dieta para el paciente'
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
        {/* Diet info */}
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-700">{diet?.diet?.name}</h4>

          <span className="bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold">
            {diet?.diet?.category}
          </span>

          {/* Meta info */}
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Asignada: {formatDate(diet?.assignedAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              {diet.isActive ? (
                <span>
                  Tiempo activa:{' '}
                  {Math.floor((Date.now() - new Date(diet.assignedAt).getTime()) / 86400000)} Días
                </span>
              ) : (
                <span>
                  Última vez asignada:{' '}
                  {diet.finishedAt
                    ? new Date(diet.finishedAt).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Nunca'}
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
            handleDietClick(diet);
          }}
          className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${
            isDisabled
              ? 'cursor-not-allowed bg-gray-200 shadow-inner'
              : diet?.isActive
                ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] active:scale-95'
                : 'bg-gray-300 shadow-md hover:scale-105 hover:bg-gray-400 active:scale-95'
          }`}
        >
          <Power
            className={`h-10 w-10 ${
              isDisabled ? 'text-gray-400' : diet?.isActive ? 'text-white' : 'text-gray-500'
            }`}
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
}
