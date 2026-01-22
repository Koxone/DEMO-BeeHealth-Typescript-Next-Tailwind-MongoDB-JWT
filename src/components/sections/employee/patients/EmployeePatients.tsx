'use client';
import { useState } from 'react';

import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import EmployeePatientsList from './components/EmployeePatientsList';
import PatientsSearchBar from '@/components/shared/patients/PatientsSearchBar';

// Custom Hooks
import { useGetAllPatients } from '@/@hooks/patients/get/useGetAllPatients';
import { useEditUser } from '@/@hooks/users/useEditUser';
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

// Feedback Components
import EditPatientModal from './components/EditPatientModal';
import LoadingState from '@/components/shared/feedback/LoadingState';
import SuccessModal from '@/components/shared/feedback/SuccessModal';

export default function EmployeePatients() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  const [searchTerm, setSearchTerm] = useState('');
  const { patients, refetch } = useGetAllPatients();

  // Edit Patient Info Modal States
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successTitle, setSuccessTitle] = useState<string>('Consulta registrada');
  const [successMessage, setSuccessMessage] = useState<string>(
    'La operación se ha realizado con éxito.'
  );

  // Edit User Info with Custom Hook
  const { mutate: editUser, isPending } = useEditUser(selectedPatientId);

  // Success Modal States
  const handleSuccess = (title, message) => {
    setSuccessTitle(title);
    setSuccessMessage(message);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      setSuccessTitle('');
      setSuccessMessage('');
    }, 1000);
  };

  // Loading State
  if (isLoadingCurrentUser) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <SharedSectionHeader
        Icon="pacientes"
        newPatient={true}
        refetch={refetch}
        role={currentUser?.role}
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

      {/* Edit Patient Modal */}
      {isEditingModalOpen && (
        <EditPatientModal
          handleSuccess={handleSuccess}
          patient={patients.find((p) => p._id === selectedPatientId)}
          onClose={() => setIsEditingModalOpen(false)}
          refetch={refetch}
          isPending={isPending}
          editUser={editUser}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          title={successTitle}
          message={successMessage}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
    </div>
  );
}
