'use client';

import DoctorDietCard from '@/components/sections/doctor/diets/components/DoctorDietCard';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';

// Custom Hooks
import { useGetAllDiets } from '@/@hooks/diets/get/useGetAllDiets';
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

export default function DoctorDiets() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  // Fetch all diets
  const { dietsData, isLoading, error, refetch } = useGetAllDiets();

  // Loading
  if (isLoading || isLoadingCurrentUser) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        {/* Header */}
        <SharedSectionHeader
          role={currentUser?.role}
          Icon="diets"
          title={currentUser?.role === 'doctor' ? 'Gestion de Dietas' : 'Mis Dietas'}
          subtitle={
            currentUser?.role === 'doctor'
              ? 'Crea y personaliza planes nutricionales'
              : 'Planes nutricionales personalizados'
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dietsData && dietsData.length > 0 ? (
          dietsData.map((diet) => <DoctorDietCard diet={diet} key={diet._id} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
            <p className="text-lg font-semibold text-gray-700">No hay dietas registradas</p>

            <p className="text-gray-500">Crea un nuevo plan nutricional para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
}
