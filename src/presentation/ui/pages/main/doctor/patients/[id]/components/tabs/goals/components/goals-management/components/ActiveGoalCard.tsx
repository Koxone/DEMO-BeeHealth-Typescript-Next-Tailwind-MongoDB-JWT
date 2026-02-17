// Next, React and Other Libraries
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock, Trash2, X } from 'lucide-react';

// Enums, Types and Interfaces
import { GoalStatusEnum } from '@/domain/enums';
import { GoalDTOPresentation } from '@/presentation/types';

// Services
import { formatDateToMXShort, daysActive } from '@/presentation/services';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop Types
interface ActiveGoalCardProps {
  goal: GoalDTOPresentation;
}

export default function ActiveGoalCard({ goal }: ActiveGoalCardProps) {
  // Get consultationId from URL
  const searchParams = useSearchParams();
  const consultationId = searchParams.get('consultationId');

  // Modal Management with Store
  const { openModal } = useActiveModalStore();

  // Disable State
  const isDisabled = !consultationId || goal?.status !== GoalStatusEnum.ACTIVE;

  return (
    <div
      className={`group relative max-w-125 overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 ${
        isDisabled
          ? 'cursor-not-allowed border-dashed border-gray-300 bg-gray-100 opacity-50'
          : goal?.resolution === 'COMPLETE'
            ? 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark'
            : goal?.resolution === 'FAIL'
              ? 'bg-beehealth-red-secondary-light border-beehealth-red-secondary-dark'
              : 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark'
      }`}
    >
      {/* Cancel Goal button */}
      <button
        onClick={() => !isDisabled && openModal('cancelGoal')}
        disabled={isDisabled}
        title={!consultationId ? 'Seleccione una consulta para modificar metas' : 'Cancelar meta'}
        className={`group/cancel absolute right-2 bottom-2 scale-90 rounded-full border bg-white p-1 shadow-md transition-all duration-300 ${
          isDisabled
            ? 'cursor-not-allowed text-gray-300'
            : 'hover:bg-beehealth-red-primary-solid cursor-pointer text-gray-400 hover:scale-130 hover:text-white'
        }`}
      >
        <X className={`h-4 w-4 ${!isDisabled && 'group-hover/cancel:animate-bounce'}`} />
      </button>

      {/* Content */}
      <div className="flex items-center justify-between gap-10">
        {/* Goal info */}
        <div className="flex-1">
          <p className="text-xl font-bold text-gray-700">Meta: {goal?.targetValue}kg</p>
          {goal?.initialValue && (
            <p className="text-sm font-semibold text-gray-600">
              Peso Inicial: {goal?.initialValue}kg
            </p>
          )}

          <span className="bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark mt-1 inline-block rounded-md px-3 py-1 text-xs font-semibold">
            {goal?.notes}
          </span>

          {/* Meta info */}
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Asignada: {formatDateToMXShort(goal?.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>Tiempo activa: {daysActive(goal?.createdAt)} Días</span>
            </div>
          </div>
        </div>

        {/* Manage/Complete Goal Button */}
        <button
          onClick={() => !isDisabled && openModal('manageGoal', { goal })}
          disabled={isDisabled}
          title={
            !consultationId ? 'Seleccione una consulta para gestionar' : 'Gestionar cumplimiento'
          }
          className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${
            isDisabled
              ? 'cursor-not-allowed bg-gray-300 shadow-none'
              : goal?.resolution === 'COMPLETE'
                ? 'cursor-pointer bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] active:scale-95'
                : goal?.resolution === 'FAIL'
                  ? 'cursor-pointer bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.7)] active:scale-95'
                  : 'cursor-pointer bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] active:scale-95'
          }`}
        >
          <Trash2
            className={`h-10 w-10 ${isDisabled ? 'text-gray-400' : 'text-white'}`}
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
}
