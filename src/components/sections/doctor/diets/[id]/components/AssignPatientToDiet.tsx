'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

// Custom Hooks
import { useGetAllPatients } from '@/hooks/patients/get/useGetAllPatients';
import { useAssignPatientToDiet } from '@/hooks/diets/assign/useAssignPatientToDiet';

export default function AssignPatientToDiet({
  specialty,
  dietId,
  refetch,
  diet,
}: {
  specialty: string;
  dietId: string;
  refetch: () => void;
  diet: any;
}) {
  // Fetch patients
  const { patients } = useGetAllPatients();
  const [patientsData, setPatientsData] = useState(patients || []);
  useEffect(() => {
    if (patients && patients.length > 0) {
      const filteredPatients = patients.filter((patient) => patient.specialty.includes(specialty));
      setPatientsData(filteredPatients);
    }
  }, [patients, specialty]);

  useEffect(() => {
    if (diet?.patients?.length > 0) {
      const preSelected = diet.patients.map((p) => p.patient._id);
      setSelected(preSelected);
    }
  }, [diet]);

  // Dropdown control
  const [open, setOpen] = useState(false);

  // Selected patients
  const [selected, setSelected] = useState<string[]>([]);

  // Success notification state
  const [showSuccess, setShowSuccess] = useState(false);

  // Toggle selection
  const togglePatient = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Hook to assign diet
  const {
    editPatients: assignDietToPatients,
    isLoading: assigning,
    error: assignError,
  } = useAssignPatientToDiet();

  const handleAssign = async () => {
    // convert selected ids to payload
    const patientsPayload = selected.map((id) => ({ patient: id }));
    try {
      const updatedDiet = await assignDietToPatients(dietId, patientsPayload);
      setShowSuccess(true);
      refetch();
      setTimeout(() => setShowSuccess(false), 3000);
      setOpen(false);
    } catch (err) {
      console.error('Error assigning diet:', err);
    }
  };

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      <label className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Asignar dieta a pacientes{' '}
        <span className="text-[10px] font-normal normal-case">
          (Esta función solo es visible para Doctores)
        </span>
      </label>

      {/* Dropdown button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-900 transition-colors hover:border-gray-400"
      >
        <span>
          {selected.length === 0 && 'Asignar pacientes'}
          {selected.length === 1 && '1 paciente asignado'}
          {selected.length > 1 && `${selected.length} pacientes asignados`}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-600" />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="bg-beehealth-body-main mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-400 shadow-md">
          <div className="bg-beehealth-body-main sticky top-0 p-2 shadow-sm">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {patientsData.map((patient) => (
              <li
                key={patient._id}
                className="hover:bg-beehealth-body-main flex cursor-pointer items-center gap-3 px-3 py-2"
                onClick={() => togglePatient(patient._id)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(patient._id)}
                  onChange={() => togglePatient(patient._id)}
                  className="text-beehealth-blue-primary-solid focus:ring-beehealth-blue-primary-solid h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{patient.fullName}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assign button */}
      <button
        onClick={handleAssign}
        disabled={assigning}
        className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-2 rounded-md px-3 py-2 text-sm text-white disabled:opacity-50"
      >
        {assigning ? 'Asignando...' : 'Asignar dieta'}
      </button>

      {/* Success notification */}
      {showSuccess && (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          <Check className="h-4 w-4" />
          <span>Dieta asignada correctamente a los pacientes seleccionados</span>
        </div>
      )}

      {/* Info */}
      <p className="mt-2 text-xs text-gray-500">Selecciona uno o varios pacientes del listado.</p>

      {assignError && <p className="mt-1 text-xs text-red-500">{assignError}</p>}
    </div>
  );
}
