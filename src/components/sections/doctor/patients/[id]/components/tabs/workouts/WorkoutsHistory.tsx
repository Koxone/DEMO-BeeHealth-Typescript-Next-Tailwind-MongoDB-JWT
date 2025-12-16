'use client';

import ErrorState from '@/components/shared/feedback/ErrorState';
import LoadingState from '@/components/shared/feedback/LoadingState';
import { Clock, History, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { TimelineEventType } from '@/models/records/PatientTimeline';
import WorkoutHistoryCard from './components/history-card/WorkoutHistoryCard';
import EmptyState from '@/components/shared/feedback/EmptyState';

export default function WorkoutsHistory({
  events,
  timelineLoading,
  timelineError,
  setShowWorkoutHistoryCardFeedbackModal,
  setSelectedWorkoutHistoryCard,
}: {
  events: any;
  timelineLoading: boolean;
  timelineError: any;
  setShowWorkoutHistoryCardFeedbackModal: (show: boolean) => void;
  setSelectedWorkoutHistoryCard: (card: any) => void;
}) {
  // Function to get badge details based on action type
  const getActionBadge = (action: TimelineEventType) => {
    switch (action) {
      // Workout
      case 'workout_assigned':
        return {
          label: 'Asignado',
          className: 'bg-blue-100 text-blue-700',
          icon: CheckCircle,
        };

      case 'workout_completed':
        return {
          label: 'Completado',
          className: 'bg-green-100 text-green-700',
          icon: CheckCircle,
        };

      case 'workout_removed':
        return {
          label: 'Cancelado',
          className: 'bg-red-100 text-red-700',
          icon: XCircle,
        };

      case 'workout_renewed':
        return {
          label: 'Renovado',
          className: 'bg-emerald-100 text-emerald-700',
          icon: RotateCcw,
        };

      // Workout
      case 'workout_assigned':
        return {
          label: 'Asignado',
          className: 'bg-blue-100 text-blue-700',
          icon: CheckCircle,
        };

      case 'workout_completed':
        return {
          label: 'Completado',
          className: 'bg-green-100 text-green-700',
          icon: CheckCircle,
        };

      case 'workout_removed':
        return {
          label: 'Cancelado',
          className: 'bg-red-100 text-red-700',
          icon: XCircle,
        };

      case 'workout_renewed':
        return {
          label: 'Reactivado',
          className: 'bg-emerald-100 text-emerald-700',
          icon: RotateCcw,
        };

      default:
        return {
          label: 'Evento',
          className: 'bg-gray-100 text-gray-700',
          icon: Clock,
        };
    }
  };

  const filteredEvents = events?.filter((event: any) => event.eventType.startsWith('workout_'));

  // Loading State
  if (timelineLoading) {
    return <LoadingState />;
  }

  // Error State
  if (timelineError) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6">
      {/* Workouts History */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <History className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-700">Historial de Entrenamientos</h3>
            <p className="text-sm text-gray-500">Registro de asignaciones y cambios</p>
          </div>
        </div>

        <div className="space-y-3">
          {filteredEvents && filteredEvents.length === 0 && (
            <EmptyState
              title="No hay historial de entrenamientos"
              subtitle="Aún no se han registrado asignaciones o cambios en los entrenamientos."
            />
          )}

          {filteredEvents &&
            filteredEvents.length > 0 &&
            filteredEvents.map((record: any) => {
              const badge = getActionBadge(record?.eventType);
              const BadgeIcon = badge.icon;

              return (
                <WorkoutHistoryCard
                  key={record?._id}
                  record={record}
                  setSelectedWorkoutHistoryCard={setSelectedWorkoutHistoryCard}
                  setShowWorkoutHistoryCardFeedbackModal={setShowWorkoutHistoryCardFeedbackModal}
                  BadgeIcon={BadgeIcon}
                  badge={badge}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
