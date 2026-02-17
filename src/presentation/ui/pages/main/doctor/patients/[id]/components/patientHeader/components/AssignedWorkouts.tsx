'use client';

// Next, React and Other Libraries
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Custom Hooks and Stores
import { useGoToConsultasTab } from '@/presentation/hooks/shared/useGoToConsultasTab';

export default function AssignedWorkouts({ assignedWorkoutsData = [] }) {
  // Dropdown state
  const [isOpen, setIsOpen] = useState(false);

  // Go to Consultas Tab and scroll to "Assign Workout" button
  const { goToConsultasTab } = useGoToConsultasTab();

  // Active workouts only
  const activeWorkouts = assignedWorkoutsData?.filter((w) => w.isActive);
  const workoutsCount = activeWorkouts?.length || 0;
  const hasAssignedWorkouts = workoutsCount > 0;
  const assignedWorkouts = activeWorkouts || [];

  return (
    <div className="bg-beehealth-green-primary-solid flex h-full flex-col justify-between space-y-2 rounded-lg p-2">
      {/* Title */}
      <p className="text-xs">Entrenamientos Activos:</p>

      {/* Content */}
      {hasAssignedWorkouts ? (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="button-beehealth-confirm button-beehealth-xs"
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
        <button
          type="button"
          onClick={goToConsultasTab}
          className="button-beehealth-confirm button-beehealth-xs cursor-pointer"
        >
          Ninguno
        </button>
      )}
    </div>
  );
}
