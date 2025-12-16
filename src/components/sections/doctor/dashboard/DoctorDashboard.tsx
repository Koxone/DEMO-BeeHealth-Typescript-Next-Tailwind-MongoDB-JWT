'use client';

import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import AppointmentsToday from '@/components/shared/appointments/AppointmentsToday';
import DoctorAccountingSummary from '@/components/sections/doctor/dashboard/components/DoctorAccountingSummary';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';
import DoctorStatsGrid from './components/DoctorStatsGrid';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';

// Custom Hooks
import { useTodayAppointmentsBySpecialty } from '@/hooks/appointments/useTodayAppointmentsBySpecialty';
import { useGetFullInventory } from '@/hooks/inventory/useGetFullInventory';
import { getConsultTotals } from '@/components/sections/employee/consultations/utils/getConsultTotals';
import { useGetAllConsults } from '@/hooks/consults/useGetAllConsults';

// Types
import { CurrentUserData } from '@/types/user/user.types';

interface DoctorDashboardProps {
  currentUser: CurrentUserData;
}

export default function DoctorDashboard({ currentUser }: DoctorDashboardProps) {
  // Props
  const role = currentUser?.role;
  const specialty = currentUser?.specialty;

  // Google Calendar Custom Hooks
  const { appointments, isLoading: loadingAppointments } = useTodayAppointmentsBySpecialty();

  // Custom Hooks
  const { inventory, isLoading: loadingInventory } = useGetFullInventory();

  // All Consults
  const { consults, isLoading: loadingConsults } = useGetAllConsults({ speciality: specialty });

  const { consultPrice, totalItemsSold, totalCost } = getConsultTotals(consults);

  if (loadingAppointments || loadingInventory || loadingConsults) {
    return <LoadingState />;
  }
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role={role} />

      {/* Stats */}
      <DoctorStatsGrid role={role} specialty={specialty} />

      {/* Appointments */}
      <AppointmentsToday role={role} appointments={appointments} />

      {/* Summaries */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <DoctorAccountingSummary
          role={role}
          consultPrice={consultPrice}
          totalItemsSold={totalItemsSold}
          totalCost={totalCost}
          consults={consults}
        />
        <SharedInventoryAlerts inventory={inventory} role={role} showButton={true} />
      </div>
    </div>
  );
}
