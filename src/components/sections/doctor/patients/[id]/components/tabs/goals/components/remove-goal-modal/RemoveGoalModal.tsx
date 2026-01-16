'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Flag } from 'lucide-react';

// Custom Hooks
import { useModalClose } from '@/@hooks/useModalClose';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';

export default function RemoveGoalModal({
  setShowGoalModal,
  isProcessing = false,
  setShowSuccessModal,
  setSuccessTitle,
  setSuccessMessage,
  setShowRemoveGoalModal,
  removeGoals,
  refetchGoals,
  selectedGoal,
}) {
  // Goal result state
  const [goalResult, setGoalResult] = useState<boolean | null>(null);

  // Modal close handler
  const { handleOverlayClick } = useModalClose(() => setShowGoalModal(false));

  // Success handler
  const handleSuccess = (title: string, message: string) => {
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

  // Submit handler
  const handleSubmit = () => {
    if (goalResult === null) return;

    removeGoals.mutate(
      {
        patientId: selectedGoal.patient,
        goalId: selectedGoal._id,
        comply: goalResult,
      },
      {
        onSuccess: () => {
          setShowRemoveGoalModal(false);
          setShowGoalModal(false);

          handleSuccess(
            goalResult ? 'Meta cumplida' : 'Meta no cumplida',
            goalResult
              ? 'La meta fue marcada como cumplida.'
              : 'La meta fue marcada como no cumplida.'
          );
        },
      }
    );
  };

  // Loading state
  if (isProcessing || removeGoals.isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (!selectedGoal) {
    return <ErrorState />;
  }

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="relative inset-0 z-50 flex w-full max-w-md items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="animate-in fade-in zoom-in-95 relative w-full overflow-hidden rounded-3xl bg-linear-to-br from-white via-blue-50/30 to-indigo-50/30 shadow-2xl duration-300"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr from-blue-400/20 to-indigo-400/20 blur-3xl" />

          {/* Header */}
          <div className="bg-beehealth-body-main flex items-center gap-3 border-b border-gray-200 p-6">
            <div className="bg-beehealth-blue-primary-solid flex h-10 w-10 items-center justify-center rounded-full">
              <Flag className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Finalizar Meta</h2>
              <p className="text-sm text-gray-600">Marcar resultado de la meta del paciente</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 p-6">
            {/* Result selection */}
            <div className="grid grid-cols-2 gap-4">
              {/* Completed */}
              <button
                onClick={() => setGoalResult(true)}
                className={`bg-beehealth-body-main flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-300 ${
                  goalResult === true
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-green-400'
                }`}
              >
                <CheckCircle className="h-8 w-8 text-green-600" />
                <span className="font-semibold text-gray-800">Cumplida</span>
              </button>

              {/* Not completed */}
              <button
                onClick={() => setGoalResult(false)}
                className={`bg-beehealth-body-main flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-300 ${
                  goalResult === false
                    ? 'border-red-500 bg-red-50 shadow-md'
                    : 'border-gray-200 hover:border-red-400'
                }`}
              >
                <XCircle className="h-8 w-8 text-red-600" />
                <span className="font-semibold text-gray-800">No cumplida</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowGoalModal(false)}
                className="bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-800 transition-all hover:border-gray-400 active:scale-95"
              >
                Cancelar
              </button>

              <button
                onClick={handleSubmit}
                disabled={goalResult === null}
                className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex-1 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-indigo-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
