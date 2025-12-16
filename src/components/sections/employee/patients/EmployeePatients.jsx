'use client';

import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import EmployeePatientsList from './components/EmployeePatientsList';
import PatientsSearchBar from '@/components/shared/patients/PatientsSearchBar';
import { useEffect, useState } from 'react';

// Custom Hooks
import { useGetAllPatients } from '@/hooks/patients/get/useGetAllPatients';

export default function EmployeePatients({ currentUser, role }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { patients, refetch } = useGetAllPatients();

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <SharedSectionHeader
        Icon="pacientes"
        newPatient={true}
        refetch={refetch}
        role={role}
        title="Pacientes"
        subtitle="Lista de todos los pacientes de la clínica"
      />

      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm">
        <PatientsSearchBar
          searchValue={searchTerm}
          setSearchValue={setSearchTerm}
          onSearch={setSearchTerm}
        />
      </div>

      <EmployeePatientsList
        currentUser={currentUser}
        role={role}
        searchTerm={searchTerm}
        patients={patients}
      />
    </div>
  );
}
