'use client';

import { Loader, Power } from 'lucide-react';

// Components
import DietCard from './components/DietCard';
import Header from './components/Header';

// Hooks
import { useToggleDiet } from '@/@hooks/diets/toggle/useToggleDiet';
import { useModalClose } from '@/@hooks/useModalClose';

// Feedback
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';

// Types
import type { DietFeedbackModalProps } from '@/@types/diet/diet.types';

export default function DietReactivateModal({
  selectedDiet,
  setShowRenewModal,
  setShowSuccessModal,
  setSuccessTitle,
  setSuccessMessage,
  recordId,
  userData,
  refetchDiets,
  refetchTimeline,
  isProcessing = false,
}: DietFeedbackModalProps) {
  // Toggle hook
  const { toggleDiet, isLoading, error } = useToggleDiet();

  // Modal close
  const { handleOverlayClick } = useModalClose(() => setShowRenewModal(false));

  // Submit handler
  const handleSubmit = async () => {
    try {
      await toggleDiet({
        patientId: userData?._id,
        dietId: selectedDiet.diet._id,
        clinicalRecord: recordId,
        isActive: true,
        action: 'renew',
      });

      setShowRenewModal(false);
      refetchDiets();
      refetchTimeline();

      setShowSuccessModal(true);
      setSuccessTitle('Dieta Reactivada');
      setSuccessMessage('La dieta ha sido reactivada exitosamente.');

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
            selectedDiet={selectedDiet}
            isProcessing={isProcessing}
            setShowRenewModal={setShowRenewModal}
          />

          {/* Content */}
          <div className="relative max-h-[70vh] overflow-y-auto p-6">
            {/* Diet info */}
            <DietCard selectedDiet={selectedDiet} isDeactivating={false} formatDate={formatDate} />

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
