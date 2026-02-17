'use client';

// Next, React and Other Libraries
import { useState } from 'react';
import { RefreshCcw } from 'lucide-react';

// UI Components
import WorkoutPlanCardRenew from './components/WorkoutPlanCardRenew';
import DoctorNotesRenewWorkoutPlan from './components/DoctorNotes';
import DietTabModalHeader from '@/presentation/ui/pages/main/doctor/patients/[id]/components/tabs/diets/components/DietTabModalHeader';

// Custom Hooks
import { useModalClose } from '@/presentation/hooks/shared';
import { useRenewDietPlan } from '@/presentation/hooks/diet-plan/useRenewDietPlan';

// Enums, Types and Interfaces
import { DietPlanResponseDTOPresentation, WorkoutPlanDTOPresentation } from '@/presentation/types';
import { ComplianceStatusEnum } from '@/domain/enums/';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';
import TabsModalHeader from '@/presentation/ui/pages/main/shared/modals/TabsModalHeader';
import { useRenewWorkoutPlan } from '@/presentation/hooks/workout-plan/useRenewWorkoutPlan';
import { useParams } from 'next/dist/client/components/navigation';
import ModalHeader from '../ModalHeader';

// Prop Types
interface RenewWorkoutPlanModalProps {
  consultationId: string;
  selectedWorkout: WorkoutPlanDTOPresentation;
}

export default function RenewWorkoutPlanModal({
  selectedWorkout,
  consultationId,
}: RenewWorkoutPlanModalProps) {
  // Patient ID from URL Params
  const { id: patientId } = useParams<{ id: string }>();

  // Modal Management with Store
  const { activeModal, data, openModal, closeModal } = useActiveModalStore();

  // Modal close hook
  const { handleOverlayClick } = useModalClose(() => closeModal());
  const [doctorNotes, setDoctorNotes] = useState<string>('');

  const { mutate: renewWorkoutPlan } = useRenewWorkoutPlan(patientId);

  const handleRenew = async () => {
    if (!selectedWorkout) return;

    renewWorkoutPlan(
      {
        workoutPlanId: data.id,
        durationDays: 30,
        compliance: {
          status: ComplianceStatusEnum.PENDING,
          rating: 0,
          doctorNotes: doctorNotes,
        },
        newConsultationId: consultationId,
      },
      {
        onSuccess: () => {
          closeModal();
          openModal('success', {
            title: 'Éxito',
            message: 'El plan de entrenamiento se renovó correctamente.',
          });
          setTimeout(() => {
            closeModal();
          }, 1200);
        },
        onError: (err: any) => {
          console.error('Error al renovar el plan de entrenamiento:', err);
        },
      }
    );
  };

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
          <ModalHeader selectedWorkout={selectedWorkout} />

          {/* Content */}
          <div className="relative max-h-[70vh] overflow-y-auto p-6">
            {/* Workout info */}
            <WorkoutPlanCardRenew selectedWorkout={selectedWorkout} isDeactivating={false} />

            <DoctorNotesRenewWorkoutPlan
              doctorNotes={doctorNotes}
              setDoctorNotes={setDoctorNotes}
            />

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => closeModal()}
                className="bg-beehealth-body-main flex-1 cursor-pointer rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                onClick={handleRenew}
                className="group bg-beehealth-blue-primary-solid flex-1 cursor-pointer rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-green-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
              >
                <span className="flex items-center justify-center gap-2">
                  <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  Renovar
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
