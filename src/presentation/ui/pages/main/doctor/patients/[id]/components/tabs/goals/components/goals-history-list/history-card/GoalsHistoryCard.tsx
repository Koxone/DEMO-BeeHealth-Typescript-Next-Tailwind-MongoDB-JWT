import { PatientTimelineResponseDTO } from '@/application/use-cases';
import { GOAL_STATUS_UI_MAP } from '@/presentation/constants/';

// Services
import { getCalendarDateMX } from '@/presentation/services';
import { PatientTimelineEventDTOPresentation } from '@/presentation/types';

// Prop Types
interface GoalsHistoryCardProps {
  event: PatientTimelineEventDTOPresentation;
}

export default function GoalsHistoryCard({ event }: GoalsHistoryCardProps) {
  // Map event types to user-friendly labels
  const statusUI = GOAL_STATUS_UI_MAP[event.eventType];

  return (
    <div
      key={event?.id}
      className="bg-beehealth-green-primary-light hover:bg-beehealth-green-primary-light-hover flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-colors"
    >
      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="border-beehealth-blue-primary-light bg-beehealth-blue-primary-light flex h-12 w-12 flex-col items-center justify-center rounded-lg border text-center">
          <span className="text-beehealth-blue-primary-dark text-xs font-medium uppercase">
            {getCalendarDateMX(event?.createdAt).month}
          </span>
          <span className="text-beehealth-blue-primary-dark text-lg font-bold">
            {getCalendarDateMX(event?.createdAt).day}
          </span>
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold text-gray-700">
            Meta asignada: {event?.snapshot?.targetValue}kg
          </p>
          <p className="text-sm text-gray-500">Peso inicial: {event?.snapshot?.initialValue}kg</p>
          {event?.snapshot?.finalValue && (
            <p className="font-semibold text-gray-700">
              Peso Final: {event?.snapshot?.finalValue}kg
            </p>
          )}
        </div>
      </div>

      {/* Action badge */}
      <div className={`rounded-full px-3 py-1.5 text-sm font-semibold ${statusUI.className}`}>
        {statusUI.label}
      </div>
    </div>
  );
}
