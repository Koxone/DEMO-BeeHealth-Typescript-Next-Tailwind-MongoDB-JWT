'use client';

// Next, React and Other Libraries
import { useState } from 'react';
import { CircleCheck } from 'lucide-react';

// UI Components
import Rating from './components/Rating';
import WorkoutPlanCard from './components/WorkoutPlanCard';
import Compliance from './components/Compliance';
import DoctorNotes from './components/DoctorNotes';
import DietTabModalHeader from '@/presentation/ui/pages/main/doctor/patients/[id]/components/tabs/diets/components/DietTabModalHeader';

// Enums, Types and Interfaces
import { ComplianceStatusEnum } from '@/domain/enums/';
import { DietPlanResponseDTOPresentation, WorkoutPlanDTOPresentation } from '@/presentation/types';

// Custom Hooks and Stores
import { useModalClose } from '@/presentation/hooks/shared';
import { useCompleteDietPlan } from '@/presentation/hooks/diet-plan/';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';
import { useCompleteWorkoutPlan } from '@/presentation/hooks/workout-plan/useCompleteWorkoutPlan';
import WorkoutCard from '@/presentation/ui/pages/main/doctor/workouts/components/workoutCard/WorkoutCard';
import { useParams } from 'next/dist/client/components/navigation';
import TabsModalHeader from '@/presentation/ui/pages/main/shared/modals/TabsModalHeader';
import ModalHeader from '../ModalHeader';

// Prop Types
interface CompleteWorkoutPlanModalProps {
  selectedWorkout: WorkoutPlanDTOPresentation;
}

export default function CompleteWorkoutPlanModal({
  selectedWorkout,
}: CompleteWorkoutPlanModalProps) {
  // Patient ID from URL Params
  const { id: patientId } = useParams<{ id: string }>();

  // Modal Management with Store
  const { closeModal, openModal, data } = useActiveModalStore();

  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatusEnum>(
    ComplianceStatusEnum.COMPLETED
  );
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [doctorNotes, setDoctorNotes] = useState<string>('');

  const { handleOverlayClick } = useModalClose(() => closeModal());

  // Complete Workout Plan with Custom Hook
  const { mutate: completeWorkoutPlan, isPending } = useCompleteWorkoutPlan(patientId);

  const isFormValid = complianceStatus && rating > 0 && doctorNotes.trim().length > 0;

  const handleAssign = async () => {
    if (!selectedWorkout || !isFormValid) return;

    completeWorkoutPlan(
      {
        workoutPlanId: data?.id,
        compliance: {
          status: complianceStatus,
          rating: rating,
          doctorNotes: doctorNotes.trim(),
        },
      },
      {
        onSuccess: () => {
          closeModal();
          openModal('success', {
            title: 'Éxito',
            message: 'El plan de entrenamiento se completó correctamente.',
          });
          setTimeout(() => {
            closeModal();
          }, 1200);
        },
        onError: (err: any) => {
          console.error('Error al completar el plan de entrenamiento:', err);
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
          <ModalHeader selectedWorkout={selectedWorkout} />

          <div className="relative max-h-[70vh] overflow-y-auto p-6">
            <WorkoutPlanCard selectedWorkout={selectedWorkout} isDeactivating={false} />

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

            <div className="flex gap-3">
              <button
                onClick={() => closeModal()}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 cursor-pointer rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleAssign}
                disabled={!isFormValid || isPending}
                className="group bg-beehealth-blue-primary-solid flex-1 cursor-pointer rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
              >
                <span className="flex items-center justify-center gap-2">
                  <CircleCheck className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  {isPending ? 'Procesando...' : 'Completar'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
