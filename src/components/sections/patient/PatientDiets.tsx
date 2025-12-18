'use client';

import PatientDietCard from '@/components/sections/patient/diets/components/PatientDietCard';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import EmptyState from '@/components/shared/feedback/EmptyState';
import LoadingState from '@/components/shared/feedback/LoadingState';

// Custom Hooks
import { useGetAllDietsFromPatient } from '@/hooks/diets/get/useGetAllDietsFromPatient';
import ErrorState from '@/components/shared/feedback/ErrorState';

export default function PatientDiets({ role, currentUser }) {
  // Get Current User ID
  const patientId = currentUser?.id as string;

  // Fetch Diets from user with Custom Hook
  const {
    dietsData,
    isLoading: dietsLoading,
    error: dietsError,
    refetch: refetchDiets,
  } = useGetAllDietsFromPatient(patientId);

  // Loading state
  if (dietsLoading) {
    return <LoadingState />;
  }

  // Error state
  if (dietsError) {
    return <ErrorState />;
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6 mb-20 md:mb-0">
      {/* Header block */}
      <SharedSectionHeader
        role="patient"
        Icon="diets"
        title="Mis Dietas"
        subtitle="Planes nutricionales personalizados"
      />

      {/* Content block */}
      <div
        className={`grid gap-6 md:grid-cols-2 ${dietsData?.length === 0 ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}
      >
        {dietsData && dietsData?.length > 0 ? (
          dietsData?.map((diet) => <PatientDietCard diet={diet} key={diet._id} />)
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
