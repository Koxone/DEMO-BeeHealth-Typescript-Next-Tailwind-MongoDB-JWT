'use client';

import {
  DoctorStatsGrid,
  AppointmentsToday,
  DoctorAccountingSummary,
  SharedHeaderWelcome,
  SharedInventoryAlerts,
} from './components';

// Custom Hooks
import { useAuth } from '@/presentation/hooks/auth';

// Feedback Components
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';

export default function DoctorDashboardPage() {
  const { isLoading, currentUser, specialty, role } = useAuth();

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <SharedHeaderWelcome role={role} specialty={specialty} currentUser={currentUser} />

      {/* Stats */}
      <DoctorStatsGrid role={role} />

      {/* Appointments */}
      <AppointmentsToday role={role} appointments={[]} />

      {/* Summaries */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <DoctorAccountingSummary role={role} />
        <SharedInventoryAlerts role={role} showButton={true} />
      </div>
    </div>
  );
}
