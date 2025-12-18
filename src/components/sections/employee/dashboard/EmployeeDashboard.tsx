'use client';

import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import AppointmentsToday from '@/components/shared/appointments/AppointmentsToday';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';
import EmployeeStatsGrid from './components/EmployeeStatsGrid';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';

// Custom Hooks
import { useAllTodayAppointments } from '@/hooks/appointments/useAllTodayAppointments';
import { useGetFullInventory } from '@/hooks/inventory/useGetFullInventory';

export default function EmployeeDashboard({ currentUser }) {
  // Hook to get all appointments
  const {
    appointments,
    loading: loadingAppointments,
    error: errorAppointments,
    refetch: refetchAppointments,
  } = useAllTodayAppointments();

  // Custom Hooks
  const {
    inventory,
    isLoading,
    error: errorInventory,
    criticalItems,
    lowItems,
    totalAlerts,
    refetch,
  } = useGetFullInventory();

  // Loading State
  if (isLoading || loadingAppointments) {
    return <LoadingState />;
  }

  // Error State
  if (errorAppointments || errorInventory) {
    return <ErrorState />;
  }

  return (
    <div className="flex h-full flex-col justify-between space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="employee" />

      {/* Stats */}
      <EmployeeStatsGrid role="employee" />

      {/* Content */}
      <div className="grid h-full max-h-[500px] grid-cols-1 md:gap-6 lg:grid-cols-2">
        <AppointmentsToday role={currentUser?.role} appointments={appointments} />
        <SharedInventoryAlerts role={currentUser?.role} inventory={inventory} />
      </div>
    </div>
  );
}
