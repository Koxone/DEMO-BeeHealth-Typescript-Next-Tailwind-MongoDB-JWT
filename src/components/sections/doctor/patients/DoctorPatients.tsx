'use client';

import DoctorPatientsList from './components/DoctorPatientsList';
import LoadingState from '@/components/shared/feedback/LoadingState';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

// Custom Hooks
import { useGetPatientsBySpecialty } from '@/@hooks/patients/get/useGetPatientsBySpecialty';
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

export default function DoctorPatients() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  // Fetch patients by specialty with Custom Hook
  const specialty = currentUser?.specialty || '';
  const { patients, isLoading, refetch } = useGetPatientsBySpecialty(specialty);

  // Loading State
  if (isLoading || isLoadingCurrentUser) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <SharedSectionHeader
        Icon="pacientes"
        newPatient={true}
        role={currentUser?.role}
        refetch={refetch}
        title="Mis Pacientes"
        subtitle="Gestiona tu lista de pacientes"
        specialty={currentUser?.specialty}
      />

      <DoctorPatientsList patients={patients} currentUser={currentUser} role={currentUser?.role} />
    </div>
  );
}
