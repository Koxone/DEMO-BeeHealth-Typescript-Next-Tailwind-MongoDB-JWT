'use client';

import { Clock } from 'lucide-react';

const getNivelColor = (nivel) => {
  const map = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  };
  return map[nivel] || 'bg-gray-100 text-gray-800';
};

export default function WorkoutCard({ workout, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="group hover:border-beehealth-blue-primary-solid bg-beehealth-body-main cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 shadow-sm transition-all duration-200 hover:shadow-lg active:scale-95"
    >
      {/* Main Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={workout?.images?.[0]}
          alt={workout?.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-3 right-3">
          <span
            className={`bg-beehealth-body-main/80 rounded-full px-2 py-1 text-xs font-medium shadow-sm backdrop-blur-sm ${getNivelColor(workout?.difficulty)}`}
          >
            {workout?.difficulty}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-beehealth-blue-primary-solid rounded-full px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
            {workout?.type}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
          {workout?.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{workout?.duration} minutos</span>
        </div>

        {/* Patient Actions */}
        <p className="mt-3 text-sm font-medium text-blue-600 opacity-90 transition-opacity group-hover:opacity-100">
          Click para ver detalles →
        </p>
      </div>
    </div>
  );
}
