'use client';

// React and Libraries
import { Plus } from 'lucide-react';
import { useState, useMemo } from 'react';

// Components
import DoctorPatientCard from './DoctorPatientCard';
import PatientsSearchBar from './PatientsSearchBar';

// Types and Enums
import { PatientListItemDTOPresentation } from '@/presentation/types';

// Props Interface
interface DoctorPatientsListProps {
  patients: PatientListItemDTOPresentation[];
  setCreatePatientModalOpen: (open: boolean) => void;
}

export default function DoctorPatientsList({
  patients,
  setCreatePatientModalOpen,
}: DoctorPatientsListProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return patients;
    const lower = search.toLowerCase();
    return patients.filter(
      (p: PatientListItemDTOPresentation) =>
        p.fullName.toLowerCase().includes(lower) ||
        p.email.toLowerCase().includes(lower) ||
        p.phone.toLowerCase().includes(lower)
    );
  }, [search, patients]);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="bg-beehealth-body-main grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-sm">
        <PatientsSearchBar onSearch={setSearch} searchValue={search} setSearchValue={setSearch} />

        {/* Open Create New Patient Modal*/}
        <button
          onClick={() => setCreatePatientModalOpen(true)}
          className="button-beehealth-confirm"
        >
          <Plus className="h-5 w-5" />
          Nuevo Paciente
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 overflow-y-auto">
        {filtered.map((patient) => (
          <DoctorPatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
}
