'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useGetAllPatients } from '@/hooks/patients/get/useGetAllPatients';

interface AssignWorkoutProps {
  selectedPatients: string[];
  onChange: (ids: string[]) => void;
  specialty?: string;
}

export default function AssignWorkout({
  selectedPatients,
  onChange,
  specialty,
}: AssignWorkoutProps) {
  // Fetch patients
  const { patients } = useGetAllPatients();
  const [patientsData, setPatientsData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (patients && patients.length > 0) {
      let filtered = patients;

      if (specialty) {
        filtered = filtered.filter((patient: any) => patient.specialty.includes(specialty));
      }

      if (searchTerm) {
        filtered = filtered.filter((patient: any) =>
          patient.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setPatientsData(filtered);
    }
  }, [patients, specialty, searchTerm]);

  // Dropdown control
  const [open, setOpen] = useState(false);

  // Toggle selection
  const togglePatient = (id: string) => {
    const newSelected = selectedPatients.includes(id)
      ? selectedPatients.filter((x) => x !== id)
      : [...selectedPatients, id];
    onChange(newSelected);
  };

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      <label className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Asignar a pacientes
      </label>

      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-900 transition-colors hover:border-gray-400"
      >
        <span>
          {selectedPatients.length === 0 && 'Seleccionar pacientes'}
          {selectedPatients.length === 1 && '1 paciente seleccionado'}
          {selectedPatients.length > 1 && `${selectedPatients.length} pacientes seleccionados`}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-600" />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="bg-beehealth-body-main mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-400 shadow-md">
          <div className="bg-beehealth-body-main sticky top-0 z-10 p-2 shadow-sm">
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {patientsData.map((patient) => (
              <li
                key={patient._id}
                className="hover:bg-beehealth-body-main flex cursor-pointer items-center gap-3 px-3 py-2"
                onClick={() => togglePatient(patient._id)}
              >
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded border ${selectedPatients.includes(patient._id) ? 'bg-beehealth-blue-primary-solid border-beehealth-blue-primary-solid' : 'border-gray-300'}`}
                >
                  {selectedPatients.includes(patient._id) && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">{patient.fullName}</span>
              </li>
            ))}
            {patientsData.length === 0 && (
              <li className="px-3 py-2 text-center text-sm text-gray-500">
                No se encontraron pacientes
              </li>
            )}
          </ul>
        </div>
      )}

      <p className="mt-2 text-xs text-gray-500">
        Selecciona los pacientes que tendrán acceso a este ejercicio.
      </p>
    </div>
  );
}
