'use client';

import { History } from 'lucide-react';
import GoalsHistoryCard from './history-card/GoalsHistoryCard';

// Feedback Components
import EmptyState from '@/components/shared/feedback/EmptyState';

export default function GoalsHistory({ goalsData }: { goalsData: any }) {
  const goalsFiltered = goalsData?.filter((goal: any) => !goal.isActive);
  const hasGoals = goalsData?.some((goal: any) => !goal.isActive);

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

        {/* Empty State */}
        <div className="space-y-3">
          {!hasGoals && (
            <EmptyState
              title="No hay historial de metas"
              subtitle="Aún no se han registrado metas para este paciente"
            />
          )}

          {/* Diet History Cards */}
          {goalsFiltered &&
            goalsFiltered.length > 0 &&
            goalsFiltered.map((goal: any) => {
              return <GoalsHistoryCard key={goal?._id} goal={goal} />;
            })}
        </div>
      </div>
    </div>
  );
}
