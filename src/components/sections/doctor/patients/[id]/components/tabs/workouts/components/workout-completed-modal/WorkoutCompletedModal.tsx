'use client';

import { useState } from 'react';
import { Loader, Power, PowerOff } from 'lucide-react';
import DoctorNotes from './components/DoctorNotes';
import Rating from './components/Rating';
import Compliance from './components/Compliance';
import WorkoutCard from './components/WorkoutCard';
import Header from './components/Header';

// Types
import type { ComplianceStatus } from '@/types/workouts/workout.types';

// Custom Hooks
import { useToggleWorkout } from '@/hooks/workouts/toggle/useToggleWorkout';
import { useModalClose } from '@/hooks/useModalClose';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';

export default function WorkoutCompletedModal({
  selectedWorkout,
  setShowToggleModal,
  setShowSuccessModal,
  setSuccessTitle,
  recordId,
  setSuccessMessage,
  isProcessing = false,
  userData,
  refetchPatientWorkouts,
  refetchTimeline,
}) {
  // Compliance state
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>('pending');
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [doctorNotes, setDoctorNotes] = useState<string>('');

  // Toggle Workout Custom Hook
  const { toggleWorkout, isLoading: toggleLoading, error: toggleError } = useToggleWorkout();

  // Modal close hook
  const { handleOverlayClick } = useModalClose(() => setShowToggleModal(false));

  // Find workout assignment info
  const workoutAssignment = userData?.workouts?.find(
    (w) => w.workout === selectedWorkout.workout._id
  );
  const isWorkoutActive = workoutAssignment?.isActive ?? false;

  const handleSubmit = async () => {
    if (isWorkoutActive) {
      try {
        await toggleWorkout({
          patientId: userData?._id,
          workoutId: selectedWorkout.workout._id,
          isActive: false,
          clinicalRecord: recordId,
        });
        setShowToggleModal(false);

        refetchPatientWorkouts();
        refetchTimeline();
        setShowSuccessModal(true);
        setSuccessTitle(' Entrenamiento Desactivado');
        setSuccessMessage('El entrenamiento ha sido desactivado exitosamente.');
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 1000);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await toggleWorkout({
          patientId: userData?._id,
          workoutId: selectedWorkout.workout._id,
          isActive: true,
          clinicalRecord: recordId,
        });
        setShowToggleModal(false);

        refetchPatientWorkouts();
        refetchTimeline();
        setShowSuccessModal(true);
        setSuccessTitle('Entrenamiento Activado');
        setSuccessMessage('El entrenamiento ha sido activado exitosamente.');
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 1000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isDeactivating = selectedWorkout.isActive;

  // Date formatter
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Loading State
  if (isProcessing || toggleLoading) {
    return <LoadingState />;
  }

  // Error State
  if (toggleError) {
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
            selectedWorkout={selectedWorkout}
            isProcessing={isProcessing}
            setShowToggleModal={setShowToggleModal}
          />

          {/* Content */}
          <div className="relative max-h-[70vh] overflow-y-auto p-6">
            {/* Workout info */}
            <WorkoutCard
              selectedWorkout={selectedWorkout}
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
                      Activar
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
