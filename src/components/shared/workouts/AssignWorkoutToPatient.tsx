'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Custom hooks
import { useGetUserById } from '@/hooks/users/useGetUserById';
import { useAssignWorkout } from '@/hooks/workouts/assign/useAssignWorkout';
import { useGetAllWorkouts } from '@/hooks/workouts/get/useGetAllWorkouts';

// Feedback components
import LoadingState from '../feedback/LoadingState';
import ErrorState from '../feedback/ErrorState';

export default function AssignWorkoutToPatient({
  onSuccess,
  patientId,
  setShowSuccessModal,
  recordId,
  refetchTimeline,
}: {
  onSuccess?: () => void;
  recordId?: string | null;
  patientId: string;
  setShowSuccessModal?: (show: boolean) => void;
  refetchTimeline?: () => void;
}) {
  // Local state
  const [openDropdown, setDropdownOpen] = useState(false);
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  // Fetch workouts
  const { workoutData, isLoading: loadingWorkouts } = useGetAllWorkouts();

  // Fetch patient
  const { userData, isLoading: loadingUser, error: userError } = useGetUserById(patientId);

  // Assign workout
  const { assignWorkout, isLoading: assigning, error: assignError } = useAssignWorkout();

  // Filter list
  const filteredList =
    workoutData?.filter((workout) => workout?.name.toLowerCase().includes(search.toLowerCase())) ||
    [];

  // Toggle selection
  const toggleWorkout = (id: string) => {
    setSelectedWorkouts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const alreadyAssignedWorkouts = userData?.workouts?.map((w) => w.workout) ?? [];

  // Assign handler
  const handleAssign = async () => {
    try {
      const newWorkoutsToAssign = selectedWorkouts.filter(
        (workoutId) => !alreadyAssignedWorkouts.includes(workoutId)
      );
      if (newWorkoutsToAssign.length === 0) return;
      await Promise.all(
        newWorkoutsToAssign.map((workoutId) =>
          assignWorkout({ patientId, workoutId, clinicalRecord: recordId })
        )
      );

      onSuccess?.();
      refetchTimeline?.();
      setShowSuccessModal?.(true);
      setDropdownOpen(false);

      setTimeout(() => {
        setShowSuccessModal?.(false);
      }, 1500);
    } catch (err) {
      console.error('Error assigning workouts', err);
    }
  };

  // Autofill assigned workouts
  useEffect(() => {
    if (!workoutData || !userData?.workouts) return;

    const assignedIds = userData.workouts.map((w) => w.workout);

    setSelectedWorkouts((prev) => {
      const sameLength = prev.length === assignedIds.length;
      const sameValues = sameLength && prev.every((id) => assignedIds.includes(id));

      return sameValues ? prev : assignedIds;
    });
  }, [workoutData, userData?.workouts]);

  // Loading
  if (loadingWorkouts || loadingUser) {
    return <LoadingState />;
  }

  // Error
  if (userError) {
    return <ErrorState />;
  }

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      {/* Labels */}
      <label className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
        Asignar ejercicios al paciente
      </label>
      <label className="mb-2 text-xs tracking-wide text-gray-500">
        Selecciona los ejercicios que deseas asignar al paciente y guarda los cambios.
      </label>

      {/* Dropdown button */}
      <button
        onClick={() => setDropdownOpen(!openDropdown)}
        className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-900 transition-colors hover:border-gray-400"
      >
        <span>
          {selectedWorkouts.length === 0 && 'Seleccionar ejercicios'}
          {selectedWorkouts.length === 1 && '1 ejercicio seleccionado'}
          {selectedWorkouts.length > 1 && `${selectedWorkouts.length} ejercicios seleccionados`}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-600 transition-transform ${
            openDropdown ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`mt-2 w-full overflow-hidden transition-all duration-300 ease-out ${
          openDropdown ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-beehealth-body-main h-56 overflow-y-auto rounded-lg border border-gray-400 shadow-md">
          {/* Search */}
          <div className="bg-beehealth-body-main sticky top-0 p-2 shadow-sm">
            <input
              type="text"
              placeholder="Buscar ejercicios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-beehealth-blue-primary-solid w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:outline-none"
            />
          </div>

          {/* List */}
          <ul className="divide-y divide-gray-100">
            {filteredList.map((workout) => {
              const isSelected = selectedWorkouts.includes(workout?._id);

              return (
                <li
                  key={workout?._id}
                  onClick={() => {
                    if (isSelected) return;
                    toggleWorkout(workout?._id);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 ${
                    isSelected ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={isSelected}
                    readOnly
                    className="text-beehealth-blue-primary-solid pointer-events-none h-4 w-4 rounded border-gray-300"
                  />

                  <div className="flex flex-col">
                    {/* Workout name */}
                    <span className="text-sm font-medium text-gray-700">{workout?.name}</span>

                    {/* Workout Type */}
                    {workout?.type && (
                      <span className="text-xs text-gray-500">{workout?.type}</span>
                    )}
                  </div>
                </li>
              );
            })}

            {filteredList.length === 0 && (
              <li className="px-3 py-4 text-center text-sm text-gray-500">
                No se encontraron workouts
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Error */}
      {assignError && <p className="mt-2 text-xs text-red-500">{assignError}</p>}

      {/* Action button */}
      {openDropdown && (
        <button
          onClick={handleAssign}
          disabled={assigning}
          className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-3 rounded-md px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {assigning ? 'Asignando...' : 'Guardar asignación'}
        </button>
      )}
    </div>
  );
}
