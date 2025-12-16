'use client';

import { useState } from 'react';
import { Loader, Power, PowerOff } from 'lucide-react';
import DoctorNotes from './components/DoctorNotes';
import Rating from './components/Rating';
import Compliance from './components/Compliance';
import DietCard from './components/DietCard';
import Header from './components/Header';

// Types
import type { ComplianceStatus } from '@/types/diet/diet.types';
import type { DietFeedbackModalProps } from '@/types/diet/diet.types';

// Custom Hooks
import { useToggleDiet } from '@/hooks/diets/toggle/useToggleDiet';
import { useModalClose } from '@/hooks/useModalClose';
import { useCreateTimelineEvent } from '@/hooks/timeline/useCreateTimelineEvent';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';

export default function DietCompletedModal({
  selectedDiet,
  setShowToggleModal,
  setShowSuccessModal,
  setSuccessTitle,
  recordId,
  setSuccessMessage,
  isProcessing = false,
  userData,
  refetchDiets,
  refetchTimeline,
}: DietFeedbackModalProps) {
  // Compliance state
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>('pending');
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [doctorNotes, setDoctorNotes] = useState<string>('');

  // Create Timeline Event Custom Hook
  const { createTimelineEvent, isLoading, error } = useCreateTimelineEvent();

  // Toggle Diet Custom Hook
  const { toggleDiet, isLoading: toggleLoading, error: toggleError } = useToggleDiet();

  // Modal close hook
  const { handleOverlayClick } = useModalClose(() => setShowToggleModal(false));

  // Find diet assignment info
  const dietAssignment = userData?.diets?.find((d) => d.diet === selectedDiet.diet._id);
  const isDietActive = dietAssignment?.isActive ?? false;

  const handleSubmit = async () => {
    if (isDietActive) {
      try {
        await toggleDiet({
          patientId: userData?._id,
          dietId: selectedDiet.diet._id,
          clinicalRecord: recordId,
          isActive: false,
        });
        setShowToggleModal(false);

        refetchDiets();
        refetchTimeline();
        setShowSuccessModal(true);
        setSuccessTitle('Dieta Desactivada');
        setSuccessMessage('La dieta ha sido desactivada exitosamente.');
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 1000);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await toggleDiet({
          patientId: userData?._id,
          dietId: selectedDiet.diet._id,
          isActive: true,
          clinicalRecord: recordId,
        });
        setShowToggleModal(false);

        refetchDiets();
        refetchTimeline();
        setShowSuccessModal(true);
        setSuccessTitle('Dieta Activada');
        setSuccessMessage('La dieta ha sido activada exitosamente.');
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 1000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isDeactivating = selectedDiet.isActive;

  // Date formatter
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Loading State
  if (isProcessing || isLoading || toggleLoading) {
    return <LoadingState />;
  }

  // Error State
  if (error || toggleError) {
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
          className={`animate-in fade-in zoom-in-95 relative w-full overflow-hidden rounded-3xl shadow-2xl duration-300 ${
            isDeactivating
              ? 'bg-linear-to-br from-white via-orange-50/30 to-red-50/30'
              : 'bg-linear-to-br from-white via-green-50/30 to-emerald-50/30'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full blur-3xl ${
              isDeactivating
                ? 'bg-linear-to-tr from-rose-400/20 to-red-400/20'
                : 'bg-linear-to-tr from-teal-400/20 to-green-400/20'
            }`}
          />

          {/* Header */}
          <Header
            isDeactivating={isDeactivating}
            selectedDiet={selectedDiet}
            isProcessing={isProcessing}
            setShowToggleModal={setShowToggleModal}
          />

          {/* Content */}
          <div className="relative max-h-[70vh] overflow-y-auto p-6">
            {/* Diet info */}
            <DietCard
              selectedDiet={selectedDiet}
              isDeactivating={isDeactivating}
              formatDate={formatDate}
            />

            {/* Compliance block */}
            {isDeactivating && (
              <>
                <Compliance
                  complianceStatus={complianceStatus}
                  setComplianceStatus={setComplianceStatus}
                />

                <Rating
                  rating={rating}
                  setRating={setRating}
                  hoveredRating={hoveredRating}
                  setHoveredRating={setHoveredRating}
                />

                <DoctorNotes doctorNotes={doctorNotes} setDoctorNotes={setDoctorNotes} />
              </>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowToggleModal(false)}
                disabled={isProcessing}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`group flex-1 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-75 ${
                  isDeactivating
                    ? 'bg-linear-to-br from-red-500 to-orange-600 hover:shadow-red-500/50'
                    : 'bg-linear-to-br from-green-500 to-emerald-600 hover:shadow-green-500/50'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isProcessing ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : isDeactivating ? (
                    <>
                      <PowerOff className="h-4 w-4 transition-transform group-hover:rotate-12" />
                      Desactivar
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
