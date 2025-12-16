import React from 'react';
import { BadgeIcon } from 'lucide-react';

function WorkoutHistoryCard({
  record,
  setSelectedWorkoutHistoryCard,
  setShowWorkoutHistoryCardFeedbackModal,
  BadgeIcon,
  badge,
}) {
  return (
    <div
      key={record?._id}
      onClick={() => {
        setSelectedWorkoutHistoryCard(record);
        setShowWorkoutHistoryCardFeedbackModal(true);
      }}
      className="bg-beehealth-green-primary-light hover:bg-beehealth-green-primary-light-hover flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-colors"
    >
      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="border-beehealth-blue-primary-light bg-beehealth-blue-primary-light flex h-12 w-12 flex-col items-center justify-center rounded-lg border text-center">
          <span className="text-beehealth-blue-primary-dark text-xs font-medium uppercase">
            {new Date(record?.completedDate || record?.startDate).toLocaleDateString('es-MX', {
              month: 'short',
            })}
          </span>
          <span className="text-beehealth-blue-primary-dark text-lg font-bold">
            {new Date(record?.completedDate || record?.startDate).getDate()}
          </span>
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold text-gray-900">
            {record?.snapshot?.workoutName ||
              record?.workout?.name ||
              'Nombre de entrenamiento no disponible'}
          </p>
          <p className="text-sm text-gray-500">Por: {record?.doctor?.fullName}</p>
        </div>
      </div>

      {/* Action badge */}
      <div
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${badge.className}`}
      >
        <BadgeIcon className="h-4 w-4" />
        {badge.label}
      </div>
    </div>
  );
}

export default WorkoutHistoryCard;
