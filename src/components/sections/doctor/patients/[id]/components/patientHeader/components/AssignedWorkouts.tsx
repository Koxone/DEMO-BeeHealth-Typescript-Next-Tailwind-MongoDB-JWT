'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function AssignedWorkouts({ assignedWorkoutsData }) {
  // Dropdown state
  const [isOpen, setIsOpen] = useState(false);

  // Active workouts only
  const activeWorkouts = assignedWorkoutsData?.filter((w) => w.isActive);
  const workoutsCount = activeWorkouts?.length || 0;
  const hasAssignedWorkouts = workoutsCount > 0;
  const assignedWorkouts = activeWorkouts || [];

  return (
    <div className="bg-beehealth-green-primary-solid flex h-full flex-col justify-between space-y-2 rounded-lg p-2">
      {/* Title */}
      <p className="text-xs">
        {hasAssignedWorkouts
          ? 'Entrenamientos activos a este paciente:'
          : 'Ningún entrenamiento activo'}
      </p>

      {/* Content */}
      {hasAssignedWorkouts ? (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex w-full appearance-none items-center justify-between rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
          >
            {workoutsCount === 1
              ? assignedWorkouts[0]?.workout?.name
              : `${workoutsCount} entrenamientos activos`}
            <ChevronDown
              size={18}
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 left-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {assignedWorkouts.map((workout) => (
                <Link
                  key={workout._id}
                  href={`/doctor/workouts/${workout?.workout?._id}`}
                  className="block w-full px-3 py-2 text-sm text-gray-800 transition first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100"
                >
                  {workout?.workout?.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/doctor/workouts"
          className="bg-beehealth-blue-secondary-solid hover:bg-beehealth-blue-secondary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
        >
          Ir a asignar entrenamiento
        </Link>
      )}
    </div>
  );
}
