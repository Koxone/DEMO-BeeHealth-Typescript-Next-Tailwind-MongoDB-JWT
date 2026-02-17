// Next, React and Other Libraries
import { Calendar, Clock } from 'lucide-react';

// Enums, Types and Interfaces
import { WorkoutPlanDTOPresentation } from '@/presentation/types';

// Services, Mappers, Constants and Helpers
import { formatDateToMXShort } from '@/presentation/services/dateFormatter';

import CancelWorkoutPlanButton from './manage-workout-plan-modal/components/CancelWorkoutPlanButton';
import CompleteWorkoutPlanButton from './manage-workout-plan-modal/components/CompleteDietPlanButton';
import RenewWorkoutPlanButton from './manage-workout-plan-modal/components/RenewWorkoutPlanButton';

// Prop Types
interface ToggleWorkoutPlanCardProps {
  workout: WorkoutPlanDTOPresentation;
  consultationId: string | null | undefined;
}

export default function ManageWorkoutPlanCard({
  workout,
  consultationId,
}: ToggleWorkoutPlanCardProps) {
  const isDisabled = !consultationId || workout.status === undefined;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 ${
        isDisabled
          ? 'cursor-not-allowed border-dashed border-gray-300 bg-gray-100 opacity-50'
          : workout?.status === 'active' || workout?.status === 'renewed'
            ? 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark'
            : 'border-gray-200 bg-gray-50'
      }`}
    >
      {/* Cancel Workout Plan button */}
      <CancelWorkoutPlanButton isDisabled={isDisabled} workout={workout} />

      {/* Renew Workout Plan button */}
      {(workout?.status === 'active' || workout?.status === 'renewed') && (
        <RenewWorkoutPlanButton isDisabled={isDisabled} workout={workout} />
      )}

      {/* Content */}
      <div className="flex items-center justify-between">
        {/* Workout info */}
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-700">{workout?.workoutSnapshot?.name}</h4>

          <span className="bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold">
            {workout?.workoutSnapshot?.category}
          </span>

          {/* Meta info */}
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Asignada: {formatDateToMXShort(workout?.startDate)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              {workout.status === 'active' || workout.status === 'renewed' ? (
                <span>
                  Tiempo activa:{' '}
                  {Math.floor((Date.now() - new Date(workout.startDate).getTime()) / 86400000)} Días
                </span>
              ) : (
                <span>
                  Última vez asignada:{' '}
                  {workout.endDate
                    ? new Date(workout.endDate).toLocaleDateString('es-MX', {
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
        <CompleteWorkoutPlanButton isDisabled={isDisabled} workout={workout} />
      </div>
    </div>
  );
}
