// Next, React and Other Libraries
import { Calendar, Clock } from 'lucide-react';

// Enums, Types and Interfaces
import { DietPlanResponseDTOPresentation } from '@/presentation/types';

// Services, Mappers, Constants and Helpers
import { formatDateToMXShort } from '@/presentation/services/dateFormatter';

import CancelDietPlanButton from './manage-diet-plan-modal/components/CancelDietPlanButton';
import RenewDietPlanButton from './manage-diet-plan-modal/components/RenewDietPlanButton';
import CompleteDietPlanButton from './manage-diet-plan-modal/components/CompleteDietPlanButton';

// Prop Types
interface ToggleDietPlanCardProps {
  diet: DietPlanResponseDTOPresentation;
  consultationId: string | null | undefined;
}

export default function ManageDietPlanCard({ diet, consultationId }: ToggleDietPlanCardProps) {
  // Disable toggle actions if there's no consultation selected or if diet status is undefined (not active nor inactive)
  const isDisabled = !consultationId || diet.status === undefined;
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 ${
        isDisabled
          ? 'cursor-not-allowed border-dashed border-gray-300 bg-gray-100 opacity-50'
          : diet?.status === 'active' || diet?.status === 'renewed'
            ? 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark'
            : 'border-gray-200 bg-gray-50'
      }`}
    >
      {/* Cancel Diet Plan button */}
      <CancelDietPlanButton isDisabled={isDisabled} diet={diet} />

      {/* Renew Diet Plan button */}
      {(diet?.status === 'active' || diet?.status === 'renewed') && (
        <RenewDietPlanButton isDisabled={isDisabled} diet={diet} />
      )}

      {/* Content */}
      <div className="flex items-center justify-between">
        {/* Diet info */}
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-700">{diet?.dietSnapshot?.name}</h4>

          <span className="bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold">
            {diet?.dietSnapshot?.category}
          </span>

          {/* Meta info */}
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Asignada: {formatDateToMXShort(diet?.startDate)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              {diet.status === 'active' || diet.status === 'renewed' ? (
                <span>
                  Tiempo activa:{' '}
                  {Math.floor((Date.now() - new Date(diet.startDate).getTime()) / 86400000)} Días
                </span>
              ) : (
                <span>
                  Última vez asignada:{' '}
                  {diet.endDate
                    ? new Date(diet.endDate).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Nunca'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Power button */}
        <CompleteDietPlanButton isDisabled={isDisabled} diet={diet} />
      </div>
    </div>
  );
}
