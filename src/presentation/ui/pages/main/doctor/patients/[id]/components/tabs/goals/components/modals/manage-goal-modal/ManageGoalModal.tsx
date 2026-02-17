'use client';

// Next, React and Other Libraries
import { CheckCircle, XCircle, Flag } from 'lucide-react';

// Custom Hooks and Stores
import { useGoalManager } from '@/presentation/hooks/goal/useGoalManager';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';
import { ButtonMd } from '@/presentation/ui/pages/main/shared/buttons/Buttons';

export default function ManageGoalModal() {
  // Modal Management with Store
  const { openModal, closeModal, data } = useActiveModalStore();

  const isComplete = data?.goal?.resolution === 'COMPLETE';
  const isFail = data?.goal?.resolution === 'FAIL';

  // Goal Management Hook
  const { activeGoal, completeGoal, failGoal } = useGoalManager();

  // Submit handler for completing the goal
  const handleSubmit = () => {
    if (!activeGoal) return;
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const isCompleting = isComplete;
    const mutation = isCompleting ? completeGoal : failGoal;
    const successMessage = isCompleting
      ? 'La meta se completó correctamente.'
      : 'La meta no se cumplió correctamente.';

    mutation(
      {
        goalId: activeGoal.id,
        consultationId: activeGoal.consultationId,
      },
      {
        onSuccess: async () => {
          await wait(1000);
          closeModal();
          await wait(500);
          openModal('success', {
            title: 'Éxito',
            message: successMessage,
          });
          await wait(1500);
          closeModal();
        },
        onError: (error: any) => {
          console.error(error.message || 'Error procesando la meta');
        },
      }
    );
  };

  return (
    <div
      id="overlay"
      onClick={() => closeModal()}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="relative inset-0 z-50 flex w-full max-w-lg items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="animate-in fade-in zoom-in-95 relative w-full overflow-hidden rounded-3xl bg-white shadow-2xl duration-300"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />

          {/* Header */}
          <div
            className={`flex items-center gap-4 border-b p-6 ${
              isComplete
                ? 'border-beehealth-blue-primary-dark bg-beehealth-green-secondary-dark'
                : isFail
                  ? 'border-beehealth-red-primary-dark bg-beehealth-red-primary-solid'
                  : 'bg-beehealth-blue-primary-solid border-beehealth-blue-primary-dark'
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm`}
            >
              {isComplete ? (
                <CheckCircle className="h-6 w-6 text-white" />
              ) : isFail ? (
                <XCircle className="h-6 w-6 text-white" />
              ) : (
                <Flag className="h-6 w-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {isComplete ? 'Meta Cumplida' : isFail ? 'Meta No Cumplida' : 'Meta En Progreso'}
              </h2>
              <p className="text-sm text-white/90">
                {isComplete
                  ? 'Excelente trabajo, el objetivo fue alcanzado.'
                  : isFail
                    ? 'El objetivo no fue alcanzado esta vez.'
                    : 'La meta sigue activa y en seguimiento.'}
              </p>
            </div>
          </div>

          {/* Goal Info */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center shadow-sm">
                <p className="text-xs font-medium text-gray-500">Peso Inicial</p>
                <p className="mt-1 text-lg font-bold text-gray-800">{data?.goal?.initialValue}kg</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center shadow-sm">
                <p className="text-xs font-medium text-gray-500">Peso Meta</p>
                <p className="mt-1 text-lg font-bold text-gray-800">{data?.goal?.targetValue}kg</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center shadow-sm">
                <p className="text-xs font-medium text-gray-500">Peso Actual</p>
                <p className="mt-1 text-lg font-bold text-gray-800">
                  {data?.goal?.currentWeight}kg
                </p>
              </div>
            </div>
          </div>

          {/* Compliance */}
          <div className="space-y-6 px-6 pb-6">
            <button
              className={`flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 p-4 transition-all duration-200 ${
                isFail
                  ? 'border-red-500 bg-red-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-red-400 hover:shadow-sm'
              }`}
            >
              {isComplete ? (
                <CheckCircle className="text-beehealth-green-secondary-dark h-6 w-6" />
              ) : isFail ? (
                <XCircle className="text-beehealth-red-primary-dark h-6 w-6" />
              ) : (
                <Flag className="text-beehealth-blue-primary-dark h-6 w-6" />
              )}
              <span className="font-semibold text-gray-800">
                {isComplete ? 'Meta Cumplida' : isFail ? 'Meta No Cumplida' : 'Meta En Progreso'}
              </span>
            </button>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <ButtonMd onClick={() => closeModal()} action="secondary-neutral" className="flex-1">
                Cancelar
              </ButtonMd>

              <ButtonMd onClick={handleSubmit} action="confirm" className="flex-1">
                Completar
              </ButtonMd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
