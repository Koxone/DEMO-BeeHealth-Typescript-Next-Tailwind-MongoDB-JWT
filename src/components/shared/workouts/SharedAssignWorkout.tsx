'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Custom Hooks
import { useAssignWorkout } from '@/hooks/workouts/assign/useAssignWorkout';
import { useGetPatientsBySpecialty } from '@/hooks/patients/get/useGetPatientsBySpecialty';

// Zustand Store
import useAuthStore from '@/zustand/useAuthStore';

export default function SharedAssignWorkout({
  workoutId,
  workout,
  onSuccess,
}: {
  workoutId: string;
  workout: any;
  onSuccess: () => void;
}) {
  const { user } = useAuthStore();
  const specialty = user?.specialty;

  const { patients } = useGetPatientsBySpecialty(specialty);
  const [patientsData, setPatientsData] = useState(patients || []);
  const [openDropdown, setDropdownOpen] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const { isLoading, error } = useAssignWorkout();

  // Filtrar pacientes por especialidad
  useEffect(() => {
    if (patients && patients.length > 0) {
      const filtered = patients.filter((p) => p?.specialty.includes(specialty));
      setPatientsData(filtered);
    }
  }, [patients, specialty]);

  // Pre-seleccionar pacientes ya asignados
  useEffect(() => {
    if (workout?.patients?.length > 0) {
      const preSelected = workout.patients.map((p) => p.patient?._id || p.patient);
      setSelectedPatients(preSelected);
    }
  }, [workout]);

  const filteredList = patientsData.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const togglePatient = (id: string) => {
    setSelectedPatients((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    try {
      // await editPatients(workoutId, selectedPatients);
      onSuccess();
    } catch (err) {
      console.error('Error assigning workout:', err);
    }
  };

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      <label className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Asignar workout a pacientes
      </label>

      {/* Dropdown button */}
      <button
        onClick={() => setDropdownOpen(!openDropdown)}
        className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:border-gray-400"
      >
        <span>
          {selectedPatients.length === 0 && 'Seleccionar pacientes'}
          {selectedPatients.length === 1 && '1 paciente seleccionado'}
          {selectedPatients.length > 1 && `${selectedPatients.length} pacientes seleccionados`}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-600" />
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
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-beehealth-blue-primary-solid w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none"
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {filteredList.map((patient) => (
              <li
                key={patient?._id}
                className="flex cursor-pointer items-center gap-3 px-3 py-2 capitalize hover:bg-gray-50"
                onClick={() => togglePatient(patient?._id)}
              >
                <input
                  maxLength={250}
                  type="checkbox"
                  checked={selectedPatients.includes(patient._id)}
                  readOnly
                  className="text-beehealth-blue-primary-solid h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{patient?.fullName}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Error message */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {/* Assign button */}
      <button
        onClick={handleAssign}
        disabled={isLoading}
        className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-3 rounded-md px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isLoading ? 'Asignando...' : 'Guardar asignación'}
      </button>
    </div>
  );
}
