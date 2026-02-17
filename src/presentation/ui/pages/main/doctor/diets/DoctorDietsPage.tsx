'use client';

// UI Components
import DoctorDietCard from './components/DoctorDietCard';
import SharedSectionHeader from '../../shared/shared-section-header/SharedSectionHeader';

// Custom Hooks
import { useAuth } from '@/presentation/hooks/auth';
import { useGetAllDiets } from '@/presentation/hooks/diet';

// Feedback Components
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';

export default function DoctorDietsPage() {
  // Fetch all Diets from Custom Hook
  const { data: allDietsData, isLoading: isDietsLoading, error } = useGetAllDiets();

  // Get current user from auth context
  const { currentUser, isLoading: isAuthLoading } = useAuth();

  // Loading State
  if (isDietsLoading || isAuthLoading) {
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
        {allDietsData && allDietsData?.diets?.length > 0 ? (
          allDietsData?.diets.map((diet) => <DoctorDietCard diet={diet} key={diet?.id} />)
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
