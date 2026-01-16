'use client';

import { Loader, Power } from 'lucide-react';

// Components
import WorkoutCard from './components/WorkoutCard';
import Header from './components/Header';

// Hooks
import { useModalClose } from '@/@hooks/useModalClose';

// Feedback
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';

// Types
import { WorkoutFeedbackModalProps } from '@/@types/workouts/workout.types';
import { useToggleWorkout } from '@/@hooks/workouts/toggle/useToggleWorkout';

export default function WorkoutReactivateModal({
  selectedWorkout,
  setShowRenewModal,
  setShowSuccessModal,
  setSuccessTitle,
  setSuccessMessage,
  recordId,
  userData,
  refetchWorkouts,
  refetchTimeline,
  isProcessing = false,
}: WorkoutFeedbackModalProps) {
  // Toggle hook
  const { toggleWorkout, isLoading, error } = useToggleWorkout();

  // Modal close
  const { handleOverlayClick } = useModalClose(() => setShowRenewModal(false));

  // Submit handler
  const handleSubmit = async () => {
    try {
      await toggleWorkout({
        patientId: userData?._id,
        workoutId: selectedWorkout.workout._id,
        clinicalRecord: recordId,
        isActive: true,
        action: 'renew',
      });

      setShowRenewModal(false);
      refetchWorkouts();
      refetchTimeline();

      setShowSuccessModal(true);
      setSuccessTitle('Ejercicio Reactivada');
      setSuccessMessage('El ejercicio ha sido reactivado exitosamente.');

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  // Date formatter
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Loading
  if (isProcessing || isLoading) {
    return <LoadingState />;
  }

  // Error
  if (error) {
    return <ErrorState />;
  }

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="relative inset-0 z-50 flex w-full max-w-xl items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative w-full overflow-hidden rounded-3xl bg-linear-to-br from-white via-green-50/30 to-emerald-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr from-teal-400/20 to-green-400/20 blur-3xl" />

          {/* Header */}
          <Header
            isDeactivating={false}
            selectedWorkout={selectedWorkout}
            isProcessing={isProcessing}
            setShowRenewModal={setShowRenewModal}
          />

          {/* Content */}
          <div className="relative max-h-[70vh] overflow-y-auto p-6">
            {/* Workout info */}
            <WorkoutCard
              selectedWorkout={selectedWorkout}
              isDeactivating={false}
              formatDate={formatDate}
            />

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowRenewModal(false)}
                disabled={isProcessing}
                className="bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="group flex-1 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
              >
                <span className="flex items-center justify-center gap-2">
                  {isProcessing ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Power className="h-4 w-4 transition-transform group-hover:rotate-12" />
                      Reactivar
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
