'use client';

// Next, React and Other Libraries
import { useState } from 'react';
import { AlertCircle, Trash2, Loader, X } from 'lucide-react';

// UI Components
import DietTabModalHeader from '@/presentation/ui/pages/main/doctor/patients/[id]/components/tabs/diets/components/DietTabModalHeader';

// Custom Hooks
import { useModalClose } from '@/presentation/hooks/shared';
import { DietPlanResponseDTOPresentation } from '@/presentation/types';

// Enums, Types, Constants and Interfaces
import { useCancelDietPlan } from '@/presentation/hooks/diet-plan/useCancelDietPlan';
import { ComplianceStatusEnum } from '@/domain/enums/';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop Types
interface CancelDietPlanModalProps {
  selectedDiet: DietPlanResponseDTOPresentation;
}

export default function CancelDietPlanModal({ selectedDiet }: CancelDietPlanModalProps) {
  // Modal Management with Store
  const { activeModal, data, openModal, closeModal } = useActiveModalStore();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [doctorNotes, setDoctorNotes] = useState<string>('');

  // Modal close handler
  const { handleOverlayClick } = useModalClose(() => closeModal());

  const { mutate: cancelDietPlan } = useCancelDietPlan();

  const handleCancel = async () => {
    if (!selectedDiet) return;

    cancelDietPlan(
      {
        patientId: selectedDiet.patientId,
        dietPlanId: selectedDiet.id,
        compliance: {
          rating: 0,
          status: ComplianceStatusEnum.CANCELLED,
          doctorNotes: doctorNotes,
        },
      },
      {
        onSuccess: () => {
          closeModal();
          openModal('success', { title: 'Éxito', message: 'La dieta se canceló correctamente.' });
          setTimeout(() => {
            closeModal();
          }, 1200);
        },
        onError: (err: any) => {
          console.error('Error al cancelar la dieta:', err);
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
      {/* Modal Container */}
      <div className="relative inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-3xl bg-linear-to-r from-white via-red-50/30 to-orange-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Background Elements */}
          <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-r from-red-400/20 to-orange-400/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr from-rose-400/20 to-red-400/20 blur-3xl" />

          {/* Header */}
          <DietTabModalHeader selectedDiet={selectedDiet} />

          {/* Content */}
          <div className="relative p-6">
            {/* Warning Message */}
            <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50/80 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <div>
                  <p className="text-sm font-semibold text-red-900">
                    ¿Estás seguro de que deseas cancelar esta dieta?
                  </p>
                  <p className="mt-1 text-xs text-red-700">
                    Esto marcara la dieta como cancelada, el paciente no obtendra beneficios de esta
                    accion.
                  </p>
                </div>
              </div>
            </div>

            {/* Information of the diet to cancel */}
            <div className="bg-beehealth-body-main mb-6 overflow-hidden rounded-2xl border-2 border-gray-200 shadow-sm">
              <div className="bg-linear-to-r from-gray-50 to-gray-100 px-4 py-2">
                <p className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  Dieta a cancelar
                </p>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <X className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-700">
                      {selectedDiet?.dietSnapshot?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Notes Section */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Notas del Doctor (opcional)
              </label>
              <textarea
                rows={3}
                className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Agrega alguna nota relevante sobre la remoción de esta dieta..."
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
              />
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <button
                onClick={() => closeModal()}
                disabled={isDeleting}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 cursor-pointer rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleCancel}
                disabled={isDeleting}
                className="group bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover flex-1 cursor-pointer rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
              >
                <span className="flex items-center justify-center gap-2">
                  {isDeleting ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Removiendo...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
                      Remover
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Nota adicional */}
            <div className="bg-beehealth-body-main mt-4 flex items-start gap-2 rounded-lg px-3 py-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
              <p className="text-xs text-gray-600">
                Tip: Puedes cancelar presionando{' '}
                <kbd className="bg-beehealth-body-main rounded border px-1.5 py-0.5 text-xs font-semibold shadow-sm">
                  ESC
                </kbd>{' '}
                o haciendo clic fuera del modal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
