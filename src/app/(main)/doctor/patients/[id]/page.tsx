'use client';

import DoctorPatientDetail from '@/components/sections/doctor/patients/[id]/DoctorPatientDetail';

// Feedback Components
import ErrorState from '@/components/shared/feedback/ErrorState';
import LoadingState from '@/components/shared/feedback/LoadingState';

// Library Hooks
import { useParams } from 'next/navigation';

// Custom Hooks
import { useGetUserById } from '@/hooks/users/useGetUserById';

export default function DoctorPatientDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { userData, isLoading, error, refetch } = useGetUserById(id);
  const specialty = userData?.specialty || '';

  // Loadin State
  if (isLoading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !userData) {
    return <ErrorState />;
  }

  return (
    <div>
      <DoctorPatientDetail patient={userData} specialty={specialty} />
    </div>
  );
}
