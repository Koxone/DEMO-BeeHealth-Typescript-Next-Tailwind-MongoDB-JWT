'use client';

import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';
import { Loader2 } from 'lucide-react';
import PatientDietCard from '@/components/sections/patient/diets/components/PatientDietCard';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import EmptyState from '@/components/shared/feedback/EmptyState';
import LoadingState from '@/components/shared/feedback/LoadingState';

export default function PatientDiets({ role, currentUser }) {
  // Fetch diets
  const { dietsData, isLoading, error } = useGetAllDiets();

  const filteredDiets = dietsData?.filter((diet) =>
    diet?.patients?.some((p) => p?.patient?._id === currentUser?.id)
  );

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header block */}
      <SharedSectionHeader
        role="patient"
        Icon="diets"
        title="Mis Dietas"
        subtitle="Planes nutricionales personalizados"
      />

      {/* Content block */}
      <div
        className={`grid gap-6 md:grid-cols-2 ${filteredDiets.length === 0 ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}
      >
        {filteredDiets && filteredDiets.length > 0 ? (
          filteredDiets.map((diet) => <PatientDietCard diet={diet} key={diet._id} />)
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
