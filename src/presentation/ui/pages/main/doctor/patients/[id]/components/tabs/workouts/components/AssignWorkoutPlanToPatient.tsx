'use client';

// Next, React and Other Libraries
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Enums, Types and Interfaces
import { UserSpecialty } from '@/domain/enums/';
import { WorkoutPlanDTOPresentation } from '@/presentation/types';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';
import { AssignWorkoutMutate } from '@/presentation/hooks/workout-plan/useAssignWorkoutPlanToPatient';
import { useParams } from 'next/dist/client/components/navigation';
import { useAssignWorkoutPlanFiltersForUi } from '@/presentation/hooks/workout-plan/ui/useAssignWorkoutPlanFiltersForUi';
import { GetAllWorkoutTemplatesResponse } from '@/application/use-cases/workout/GetAllWorkoutTemplatesUseCase';

// Prop Types
interface AssignWorkoutPlanToPatientProps {
  consultationId: string;
  assignWorkout: AssignWorkoutMutate;
  allWorkoutsData: GetAllWorkoutTemplatesResponse;
  patientWorkoutPlansData: WorkoutPlanDTOPresentation[];
}

export default function AssignWorkoutPlanToPatient({
  consultationId,
  allWorkoutsData,
  assignWorkout,
  patientWorkoutPlansData,
}: AssignWorkoutPlanToPatientProps) {
  // Patient ID from URL Params
  const { id: patientId } = useParams<{ id: string }>();

  // Modal Management with Store
  const { openModal, closeModal } = useActiveModalStore();

  // Local States
  const [openDropdown, setDropdownOpen] = useState(false);
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const { filteredWorkouts, isWorkoutBlocked, isWorkoutChecked } = useAssignWorkoutPlanFiltersForUi(
    {
      allWorkoutsData: allWorkoutsData,
      patientWorkoutPlansData: patientWorkoutPlansData,
      selectedWorkouts,
      search,
    }
  );

  const toggleWorkout = (id: string) => {
    setSelectedWorkouts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Handle Assign Workouts to Patient
  const handleAssign = async () => {
    try {
      await Promise.all(
        selectedWorkouts.map((workoutTemplateId) =>
          assignWorkout({
            consultationId,
            patientId,
            specialty: UserSpecialty.WEIGHT,
            workoutTemplateId,
            durationDays: 30,
          })
        )
      );

      // Success
      openModal('success', {
        title: 'Entrenamientos asignados',
        message: 'Los entrenamientos han sido asignados exitosamente al paciente.',
      });
      setTimeout(() => {
        closeModal();
      }, 1200);

      setSelectedWorkouts([]);
      setDropdownOpen(false);
    } catch (error) {
      // Error
      console.error('Error asignando entrenamientos', error);
    }
  };

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      <label className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
        Asignar entrenamientos al paciente
      </label>
      <label className="mb-2 text-xs tracking-wide text-gray-500">
        Selecciona los entrenamientos que deseas asignar al paciente y guarda los cambios.
      </label>

      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!openDropdown)}
        className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:border-gray-400"
      >
        <span>
          {selectedWorkouts.length === 0 && 'Seleccionar entrenamientos'}
          {selectedWorkouts.length === 1 && '1 entrenamiento seleccionado'}
          {selectedWorkouts.length > 1 && `${selectedWorkouts.length} entrenamientos asignados`}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-600 transition-transform ${openDropdown ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`mt-2 w-full overflow-hidden transition-all duration-300 ease-out ${
          openDropdown ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-beehealth-body-main h-56 overflow-y-auto rounded-lg border border-gray-400 shadow-md">
          <div className="bg-beehealth-body-main sticky top-0 p-2 shadow-sm">
            <input
              maxLength={250}
              type="text"
              placeholder="Buscar entrenamiento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-beehealth-blue-primary-solid w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none"
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {filteredWorkouts.map((workout) => {
              const blocked = isWorkoutBlocked(workout.id);
              const checked = isWorkoutChecked(workout.id);

              return (
                <li
                  key={workout.id}
                  onClick={() => {
                    if (blocked) return;
                    toggleWorkout(workout.id);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 ${
                    blocked ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'
                  }`}
                >
                  <input
                    maxLength={250}
                    type="checkbox"
                    checked={checked}
                    disabled={blocked}
                    readOnly
                    className="text-beehealth-blue-primary-solid pointer-events-none h-4 w-4 rounded border-gray-300"
                  />

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">{workout.name}</span>
                    {workout.category && (
                      <span className="text-xs text-gray-500">{workout.category}</span>
                    )}
                  </div>
                </li>
              );
            })}

            {filteredWorkouts.length === 0 && (
              <li className="px-3 py-4 text-center text-sm text-gray-500">
                No se encontraron entrenamientos que coincidan con tu búsqueda.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Assign button */}
      {openDropdown && (
        <button
          type="button"
          onClick={handleAssign}
          disabled={selectedWorkouts.length === 0}
          className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-3 cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Asignar a Paciente
        </button>
      )}
    </div>
  );
}
