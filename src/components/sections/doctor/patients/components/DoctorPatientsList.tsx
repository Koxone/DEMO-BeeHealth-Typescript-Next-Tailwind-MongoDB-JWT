'use client';

import { useState, useMemo } from 'react';
import DoctorPatientCard from './DoctorPatientCard';
import PatientsSearchBar from '@/components/shared/patients/PatientsSearchBar';

// Types
import { CurrentUserData } from '@/types/user/user.types';

interface DoctorPatientsListProps {
  patients: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    lastVisit?: string | null;
  }[];
  currentUser: CurrentUserData | null;
  role?: string;
}

export default function DoctorPatientsList({
  patients,
  currentUser,
  role,
}: DoctorPatientsListProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return patients;
    const lower = search.toLowerCase();
    return patients.filter(
      (p) =>
        p.fullName.toLowerCase().includes(lower) ||
        p.email.toLowerCase().includes(lower) ||
        p.phone.toLowerCase().includes(lower)
    );
  }, [search, patients]);

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto">
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm">
        <PatientsSearchBar onSearch={setSearch} searchValue={search} setSearchValue={setSearch} />
      </div>

      <div className="grid grid-cols-1 gap-3 overflow-y-auto">
        {filtered.map((patient) => (
          <DoctorPatientCard
            key={patient._id}
            patient={patient}
            currentUser={currentUser}
            role={role}
          />
        ))}
      </div>
    </div>
  );
}
