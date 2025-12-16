'use client';

import DashboardLayout from '@/components/shared/layouts/DashboardLayout';
import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import AppointmentsToday from '@/components/shared/appointments/AppointmentsToday';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';
import { useAllTodayAppointments } from '@/hooks/appointments/useAllTodayAppointments';
import { useGetFullInventory } from '@/hooks/inventory/useGetFullInventory';
import EmployeeStatsGrid from './components/EmployeeStatsGrid';

export default function EmployeeDashboard({ currentUser }) {
  // Hook to get all appointments
  const { appointments, error } = useAllTodayAppointments();

  // Custom Hooks
  const {
    inventory,
    loading: loadingInventory,
    error: errorInventory,
    setInventory,
  } = useGetFullInventory();

  return (
    <DashboardLayout>
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="employee" />

      {/* Stats */}
      <EmployeeStatsGrid role="employee" />

      {/* Content */}
      <div className="grid h-full max-h-[500px] grid-cols-1 md:gap-6 lg:grid-cols-2">
        <AppointmentsToday role={currentUser?.role} appointments={appointments} />
        <SharedInventoryAlerts role={currentUser?.role} inventory={inventory} />
      </div>
    </DashboardLayout>
  );
}
