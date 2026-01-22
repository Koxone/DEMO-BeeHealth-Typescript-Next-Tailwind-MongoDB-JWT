'use client';

import DoctorStatsGrid from './components/DoctorStatsGrid';
import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import AppointmentsToday from '@/components/shared/appointments/AppointmentsToday';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';
import DoctorAccountingSummary from '@/components/sections/doctor/dashboard/components/DoctorAccountingSummary';

// Local Helpers
import { getConsultTotals } from '@/components/sections/employee/consultations/utils/getConsultTotals';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';

// Custom Hooks
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';
import { useGetAllConsults } from '@/@hooks/consults/useGetAllConsults';
import { useGetFullInventory } from '@/@hooks/inventory/useGetFullInventory';
import { useTodayAppointmentsBySpecialty } from '@/@hooks/appointments/useTodayAppointmentsBySpecialty';

export default function DoctorDashboard() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  // Google Calendar Custom Hooks
  const { appointments, isLoading: loadingAppointments } = useTodayAppointmentsBySpecialty();

  // Custom Hooks
  const { inventory, isLoading: loadingInventory } = useGetFullInventory();

  // All Consults
  const { consults, isLoading: loadingConsults } = useGetAllConsults({
    speciality: currentUser?.specialty,
  });

  // Filter consults by consultStatus
  const filteredConsults = consults.filter((consult) => consult?.consultStatus !== 'cancelled');

  // Calculate totals with Custom Hook
  const { consultPrice, totalItemsSold, totalCost, itemsSoldCount, consultsCount } =
    getConsultTotals(filteredConsults);

  // Loading State
  if (loadingAppointments || loadingInventory || loadingConsults) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <HeaderWelcome
        role={currentUser?.role}
        fullName={currentUser?.fullName}
        specialty={currentUser?.specialty}
      />

      {/* Stats */}
      <DoctorStatsGrid
        totalCost={totalCost}
        role={currentUser?.role}
        consultsCount={consultsCount}
        totalItemsSold={totalItemsSold}
      />

      {/* Appointments */}
      <AppointmentsToday role={currentUser?.role} appointments={appointments} />

      {/* Summaries */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <DoctorAccountingSummary
          totalCost={totalCost}
          role={currentUser?.role}
          consultPrice={consultPrice}
          consultsCount={consultsCount}
          totalItemsSold={totalItemsSold}
          itemsSoldCount={itemsSoldCount}
        />
        <SharedInventoryAlerts inventory={inventory} role={currentUser?.role} showButton={true} />
      </div>
    </div>
  );
}
