'use client';
import { useState } from 'react';

// UI Components
import { DoctorPatientsList, SharedSectionHeader } from './components';

// Custom Hooks
import { useAuth, useRegisterUser } from '@/presentation/hooks/auth';
import { useGetUsersByRoleAndSpecialty } from '@/presentation/hooks/users/';

// Enums and Types
import { UserRole } from '@/domain/enums/';

// Feedback Components
import CreatePatientModal from '@/presentation/ui/pages/main/shared/modals/create-patient-modal/CreatePatientModal';
import { ErrorState, LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';

export default function DoctorPatientsPage() {
  // Get current user
  const { currentUser, isLoading, specialty, role, refreshSession } = useAuth();

  // Fetch patients based on doctor's specialty
  const {
    data: patients,
    isLoading: patientsLoading,
    error,
  } = useGetUsersByRoleAndSpecialty(UserRole.PATIENT, specialty);

  // Create a new User with Role Patient using Custom Hook
  const { mutateAsync: registerUser } = useRegisterUser();

  // Create Patient Modal States
  const [createPatientModalOpen, setCreatePatientModalOpen] = useState<boolean>(false);

  // Loading State
  if (isLoading || patientsLoading) {
    return <LoadingState />;
  }

  // Error State
  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="h-full space-y-6 overflow-hidden">
      <SharedSectionHeader
        Icon="pacientes"
        role={currentUser?.role}
        title="Mis Pacientes"
        subtitle="Gestiona tu lista de pacientes"
      />

      <DoctorPatientsList
        patients={patients}
        setCreatePatientModalOpen={setCreatePatientModalOpen}
      />

      {/* Create Patient Modal */}
      {createPatientModalOpen && (
        <CreatePatientModal
          role={role}
          registerUser={registerUser}
          refetch={refreshSession}
          setCreatePatientModalOpen={setCreatePatientModalOpen}
          specialty={specialty}
        />
      )}
    </div>
  );
}
