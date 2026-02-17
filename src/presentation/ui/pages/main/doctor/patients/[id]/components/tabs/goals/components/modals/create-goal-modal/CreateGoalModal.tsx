'use client';

// Next, React and Other Libraries
import { toast } from 'sonner';
import { useState } from 'react';
import { X, Flag } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// UI Components
import { ButtonMd } from '@/presentation/ui/pages/main/shared/buttons/Buttons';

// Custom Hooks and Stores
import { useCreateGoal } from '@/presentation/hooks';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Enums, Types and Interfaces
import { UserSpecialty } from '@/domain/enums';
import { UserDTOPresentation } from '@/presentation/types';

// Prop Types
interface CreateGoalModalProps {
  patientUserData: UserDTOPresentation;
}

export default function CreateGoalModal({ patientUserData }: CreateGoalModalProps) {
  // Modal Management with Store
  const { closeModal, openModal } = useActiveModalStore();

  // Get Consultation ID from URL Search Params
  const searchParams = useSearchParams();
  const currentWeight = searchParams.get('currentWeight');
  const consultationId = searchParams.get('consultationId') ?? '';

  const initialWeightNumber = Number(currentWeight ?? 0);

  // Mutation
  const { mutate: createGoal, isPending } = useCreateGoal(patientUserData.id);

  // Form State
  const [targetValue, setTargetValue] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const targetNum = Number(targetValue);

    if (!targetNum || targetNum <= 0) {
      toast.error('Por favor, ingresa un peso meta válido.');
      return;
    }

    if (targetNum >= initialWeightNumber) {
      toast.error('El peso meta debe ser menor al peso actual.');
      return;
    }

    createGoal(
      {
        consultationId,
        specialty: UserSpecialty.WEIGHT,
        initialValue: initialWeightNumber,
        targetValue: targetNum,
        notes,
      },
      {
        onSuccess: async () => {
          await wait(1000);
          closeModal();
          await wait(500);
          openModal('success', {
            title: 'Éxito',
            message: 'La meta se creó correctamente.',
          });
          await wait(1500);
          closeModal();
        },
        onError: (error: any) => {
          toast.error(error.message || 'Error al crear la meta');
        },
      }
    );
  };

  return (
    <div
      id="overlay"
      onClick={() => closeModal()}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal */}
      <div
        className="bg-beehealth-body-main relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-beehealth-blue-primary-solid relative overflow-hidden px-6 py-6">
          <div className="bg-beehealth-body-main/10 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-beehealth-body-main/20 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm">
                <Flag className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Crear meta personalizada</h2>
                <p className="text-sm text-blue-100">Llena todos los campos</p>
              </div>
            </div>
            <button
              onClick={() => closeModal()}
              className="group hover:bg-beehealth-red-primary-solid bg-beehealth-body-main/20 cursor-pointer rounded-xl p-2 text-gray-600 transition-all duration-300 hover:rotate-90 hover:text-white"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-beehealth-body-main/80 space-y-4 rounded-2xl border border-gray-100 p-5 shadow-lg backdrop-blur-sm">
              {/* Patient Selection */}
              <div className="grid gap-1">
                <label className="text-sm font-semibold text-gray-600">Paciente</label>
                <input
                  type="text"
                  required
                  value={patientUserData?.name + ' ' + patientUserData?.lastName}
                  placeholder="Paciente"
                  className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
                  readOnly
                />
              </div>

              {/* Dynamic Field */}
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <label className="text-sm font-semibold text-gray-600">Peso Actual (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    readOnly
                    value={currentWeight || ''}
                    placeholder="Ej. 80.5"
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm font-semibold text-gray-600">Peso Meta (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    placeholder="Ej. 70.0"
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="grid gap-1">
                <label className="text-sm font-semibold text-gray-600">
                  Notas Adicionales (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Consultar cada 2 semanas para seguimiento"
                  rows={3}
                  className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <ButtonMd
                onClick={() => closeModal()}
                action="secondary-neutral"
                className="flex-1"
                type="button"
                disabled={isPending}
              >
                Cancelar
              </ButtonMd>

              <ButtonMd action="confirm" className="flex-1" type="submit" disabled={isPending}>
                {isPending ? 'Guardando...' : 'Completar'}
              </ButtonMd>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
