'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { useGetAllWorkouts } from '@/hooks/workouts/get/useGetAllWorkouts';
import { useParams } from 'next/navigation';
import { useEditWorkout } from '@/hooks/workouts/edit/useEditWorkout';

export default function AssignWorkout({ user, onSelectWorkout, patientId }) {
  const { id: workoutId } = useParams();

  // Fetch workouts with Custom Hook
  const { workoutData, isLoading, error, refetch: fetchWorkouts } = useGetAllWorkouts();

  /* State */
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]); //Click on checkbox = _id
  const [assigned, setAssigned] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Force single selection
  const toggleItem = (id) => {
    setSelected([id]);
  };

  // Assign handler
  const handleAssign = () => {
    const workoutId = selected[0];
    setAssigned([workoutId]);
    onSelectWorkout(workoutId);
    setOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  /* Remove */
  const removeAssigned = (id) => {
    setAssigned((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      {/* Title */}
      <label className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Asignar ejercicio
      </label>

      {/* Dropdown */}
      <div
        onClick={() => setOpen(!open)}
        className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-900 hover:border-gray-400"
      >
        <span>
          {selected.length === 0 && 'Seleccionar ejercicio'}
          {selected.length === 1 && '1 seleccionado'}
          {selected.length > 1 && `${selected.length} seleccionados`}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-600" />
      </div>

      {/* Dropdown content */}
      {open && (
        <div className="bg-beehealth-body-main mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-400 shadow-md">
          <div className="bg-beehealth-body-main sticky top-0 p-2 shadow-sm">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {workoutData?.map((item) => (
              <li
                key={item?._id}
                className="hover:bg-beehealth-body-main flex cursor-pointer items-center gap-3 px-3 py-2"
                onClick={() => {
                  if (item.patients?.some((p) => p.patient?._id === patientId)) return;
                  toggleItem(item?._id);
                }}
              >
                <input
                  type="checkbox"
                  checked={
                    item.patients?.some((p) => p.patient?._id === patientId) ||
                    selected.includes(item?._id)
                  }
                  disabled={item.patients?.some((p) => p.patient?._id === patientId)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleItem(item?._id);
                  }}
                  className="text-beehealth-blue-primary-solid h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{item?.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assign button */}
      <button
        type="button"
        onClick={handleAssign}
        disabled={selected.length === 0}
        className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-2 rounded-md px-3 py-2 text-sm text-white disabled:opacity-50"
      >
        Asignar ejercicio
      </button>

      {/* Success */}
      {showSuccess && (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          <Check className="h-4 w-4" />
          <span>Asignación completada</span>
        </div>
      )}

      {/* Assigned */}
      {assigned.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs font-semibold text-gray-600">Asignados:</p>

          <div className="flex flex-wrap gap-2">
            {assigned.map((item) => (
              <div
                key={item}
                className="bg-beehealth-blue-secondary-solid flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-medium text-white"
              >
                {item.name}

                <button onClick={() => removeAssigned(item.id)} className="hover:text-red-300">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
