'use client';

// Next, React and Other Libraries
import { History } from 'lucide-react';

// UI Components
import TimelineEventCard from './components/TimelineEventCard';

// Constants, Helpers and Utils
import { dietGetActionBadgeConstant } from '@/presentation/constants/diet';

// Feedback Components
import { EmptyState } from '@/presentation/ui/pages/main/shared/feedback/';

// Enums, Types and Interfaces
import { PatientTimelineEventDTOPresentation } from '@/presentation/types';
import { PatientTimelineResponseDTO } from '@/application/dto/patient-timeline/PatientTimelineResponseDTO';

// Prop Types
interface PatientDietPlansHistoryProps {
  timelineEvents: PatientTimelineEventDTOPresentation[];
}

export default function WorkoutTimelineEvents({ timelineEvents }: PatientDietPlansHistoryProps) {
  return (
    <div className="space-y-6">
      {/* Diet History */}
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

        {/* Empty State */}
        <div className="space-y-3">
          {timelineEvents && timelineEvents.length === 0 && (
            <EmptyState
              title="No hay historial de entrenamientos"
              subtitle="Aún no se han registrado asignaciones o cambios en los entrenamientos."
            />
          )}

          {/* Workout History Cards */}
          {timelineEvents &&
            timelineEvents.length > 0 &&
            timelineEvents.map((record: PatientTimelineEventDTOPresentation) => {
              const badge = dietGetActionBadgeConstant(record?.eventType);
              const BadgeIcon = badge.icon;

              return (
                <TimelineEventCard
                  key={record?.id}
                  record={record}
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
