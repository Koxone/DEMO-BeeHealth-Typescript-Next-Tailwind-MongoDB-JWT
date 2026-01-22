'use client';

import PatientDietCard from '@/components/sections/patient/diets/components/PatientDietCard';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

// Custom Hooks
import { useGetAllDietsFromPatient } from '@/@hooks/diets/get/useGetAllDietsFromPatient';
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

// Feedback Components
import ErrorState from '@/components/shared/feedback/ErrorState';
import EmptyState from '@/components/shared/feedback/EmptyState';
import LoadingState from '@/components/shared/feedback/LoadingState';

export default function PatientDiets() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  // Get Current User ID
  const patientId = currentUser?.id as string;

  // Fetch Diets from user with Custom Hook
  const {
    dietsData,
    isLoading: dietsLoading,
    error: dietsError,
    refetch: refetchDiets,
  } = useGetAllDietsFromPatient(patientId);

  const filteredDiets = dietsData?.filter((diet) => diet.isActive === true);

  // Loading state
  if (dietsLoading || isLoadingCurrentUser) {
    return <LoadingState />;
  }

  // Error state
  if (dietsError || !currentUser) {
    return <ErrorState />;
  }

  return (
    <div className="mb-20 h-full space-y-4 overflow-y-auto md:mb-0 md:space-y-6">
      {/* Header block */}
      <SharedSectionHeader
        role="patient"
        Icon="diets"
        title="Mis Dietas"
        subtitle="Planes nutricionales personalizados"
      />

      {/* Content block */}
      <div
        className={`grid gap-6 md:grid-cols-2 ${filteredDiets?.length === 0 ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}
      >
        {filteredDiets && filteredDiets?.length > 0 ? (
          filteredDiets?.map((diet) => <PatientDietCard diet={diet} key={diet._id} />)
        ) : (
          // Empty state block
          <EmptyState
            title="No tienes dietas asignadas"
            subtitle="Tu médico añadirá tus planes cuando estén listos"
            button="Contactar Médico"
            href="/patient/new-appointment"
            showButton={false}
          />
        )}
      </div>
    </div>
  );
}
