'use client';

import ErrorState from '@/components/shared/feedback/ErrorState';
import LoadingState from '@/components/shared/feedback/LoadingState';
import { Clock, History, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { TimelineEventType } from '@/models/records/PatientTimeline';
import DietHistoryCard from './history-card/DietHistoryCard';
import EmptyState from '@/components/shared/feedback/EmptyState';

export default function DietsHistory({
  events,
  timelineLoading,
  timelineError,
  setShowHistoryCardFeedbackModal,
  setSelectedHistoryCard,
}: {
  events: any;
  timelineLoading: boolean;
  timelineError: any;
  setShowHistoryCardFeedbackModal: (show: boolean) => void;
  setSelectedHistoryCard: (card: any) => void;
}) {
  // Function to get badge details based on action type
  const getActionBadge = (action: TimelineEventType) => {
    switch (action) {
      // Diet
      case 'diet_assigned':
        return {
          label: 'Asignada',
          className: 'bg-blue-100 text-blue-700',
          icon: CheckCircle,
        };

      case 'diet_completed':
        return {
          label: 'Completada',
          className: 'bg-green-100 text-green-700',
          icon: CheckCircle,
        };

      case 'diet_removed':
        return {
          label: 'Cancelada',
          className: 'bg-red-100 text-red-700',
          icon: XCircle,
        };

      case 'diet_renewed':
        return {
          label: 'Renovada',
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
  const filteredEvents = events?.filter((event: any) => event.eventType.startsWith('diet_'));

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
      {/* Diet History */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <History className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-700">Historial de Dietas</h3>
            <p className="text-sm text-gray-500">Registro de asignaciones y cambios</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="space-y-3">
          {filteredEvents && filteredEvents.length === 0 && (
            <EmptyState
              title="No hay historial de dietas"
              subtitle="Aún no se han registrado asignaciones o cambios en las dietas."
            />
          )}

          {/* Diet History Cards */}
          {filteredEvents &&
            filteredEvents.length > 0 &&
            filteredEvents.map((record: any) => {
              const badge = getActionBadge(record?.eventType);
              const BadgeIcon = badge.icon;

              return (
                <DietHistoryCard
                  key={record?._id}
                  record={record}
                  setSelectedHistoryCard={setSelectedHistoryCard}
                  setShowHistoryCardFeedbackModal={setShowHistoryCardFeedbackModal}
                  badge={badge}
                  BadgeIcon={BadgeIcon}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
