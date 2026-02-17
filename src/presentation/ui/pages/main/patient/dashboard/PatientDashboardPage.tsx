'use client';

// UI Components
import SharedHeaderWelcome from '@/presentation/ui/pages/main/shared/dashboard/SharedHeaderWelcome';
import PatientEvolutionChart from './components/PatientEvolutionChart';
import PatientGoalBanner from './components/PatientGoalBanner';
import PatientStatsGrid from './components/stats-grid/PatientStatsGrid';

// Feedback Components
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';

// Enums and Types
import { UserRole } from '@/domain/enums/';

// Custom Hooks
import { useAuth } from '@/presentation/hooks/auth';
import { useGetMyWeightSummary } from '@/presentation/hooks/clinical-history/useGetMyWeightSummary';

export default function PatientDashboardPage() {
  // Get current user data from custom hook
  const { currentUser, specialty, isLoading } = useAuth();

  // Fetch patient's weight summary
  const { data: myWeightSummary, error } = useGetMyWeightSummary();

  // Loading State
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="mb-20 h-full space-y-4 overflow-y-auto md:mb-0 md:space-y-6">
      {/* Header */}
      <SharedHeaderWelcome
        role={UserRole.PATIENT}
        specialty={specialty}
        currentUser={currentUser}
      />

      {/* Stats */}
      <PatientStatsGrid myWeightSummary={myWeightSummary} />

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <PatientGoalBanner currentUser={currentUser} />

        <PatientEvolutionChart
          title="Evolución del Peso"
          legendLabel="Peso"
          legendColor="#3b82f6"
          unit="kg"
          stroke="#3b82f6"
        />
      </div>
    </div>
  );
}
