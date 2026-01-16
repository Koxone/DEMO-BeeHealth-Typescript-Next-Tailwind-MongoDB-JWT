'use client';

import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import EmployeePatientsList from './components/EmployeePatientsList';
import PatientsSearchBar from '@/components/shared/patients/PatientsSearchBar';
import { useState } from 'react';

// Custom Hooks
import { useGetAllPatients } from '@/@hooks/patients/get/useGetAllPatients';
import { useEditUser } from '@/@hooks/users/useEditUser';

// Feedback Components
import EditPatientModal from './components/EditPatientModal';

export default function EmployeePatients({ currentUser, role }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { patients, refetch } = useGetAllPatients();

  // Edit Patient Info Modal States
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');

  // Edit User Info with Custom Hook
  const { mutate: editUser, isPending } = useEditUser(selectedPatientId);

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
        searchTerm={searchTerm}
        patients={patients}
        setSelectedPatientId={setSelectedPatientId}
        setIsEditingModalOpen={setIsEditingModalOpen}
      />

      {isEditingModalOpen && (
        <EditPatientModal
          patient={patients.find((p) => p._id === selectedPatientId)}
          onClose={() => setIsEditingModalOpen(false)}
          refetch={refetch}
          isPending={isPending}
          editUser={editUser}
        />
      )}
    </div>
  );
}
