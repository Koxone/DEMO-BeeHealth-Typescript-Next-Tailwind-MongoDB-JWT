'use client';

import DoctorPatientsList from './components/DoctorPatientsList';
import LoadingState from '@/components/shared/feedback/LoadingState';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

// Types
import { CurrentUserData } from '@/types/user/user.types';

// Custom Hooks
import { useGetPatientsBySpecialty } from '@/hooks/patients/get/useGetPatientsBySpecialty';

interface DoctorPatientsProps {
  currentUser: CurrentUserData | null;
  role?: 'doctor' | 'patient' | 'employee' | 'admin';
}

export default function DoctorPatients({ currentUser, role }: DoctorPatientsProps) {
  // Fetch patients by specialty with Custom Hook
  const specialty = currentUser?.specialty || '';
  const { patients, isLoading, refetch } = useGetPatientsBySpecialty(specialty);

  // Loading State
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <SharedSectionHeader
        Icon="pacientes"
        newPatient={true}
        role={role}
        refetch={refetch}
        title="Mis Pacientes"
        subtitle="Gestiona tu lista de pacientes"
        specialty={currentUser?.specialty}
      />

      <DoctorPatientsList patients={patients} currentUser={currentUser} role={role} />
    </div>
  );
}
