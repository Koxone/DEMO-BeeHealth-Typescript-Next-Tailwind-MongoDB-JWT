'use client';

import { History } from 'lucide-react';
import GoalsHistoryCard from './history-card/GoalsHistoryCard';

// Feedback Components
import { PatientTimelineEventDTOPresentation } from '@/presentation/types';

// Prop Types
interface GoalsHistoryProps {
  timelineEvents: PatientTimelineEventDTOPresentation[];
}

export default function GoalsHistory({ timelineEvents }: GoalsHistoryProps) {
  return (
    <div className="space-y-6">
      {/* Diet History */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <History className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-700">Historial de Metas</h3>
            <p className="text-sm text-gray-500">Registro de asignaciones y cambios</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Diet History Cards */}
          {timelineEvents &&
            timelineEvents?.length > 0 &&
            timelineEvents?.map((event) => {
              return <GoalsHistoryCard key={event.id} event={event} />;
            })}
        </div>
      </div>
    </div>
  );
}
