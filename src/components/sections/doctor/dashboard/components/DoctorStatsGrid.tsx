'use client';

import { Users, DollarSign, AlertTriangle, Activity, Pill } from 'lucide-react';
import DoctorStatsCard from './DoctorStatsCard';

// Custom Hooks
import { useGetAllConsults } from '@/hooks/consults/useGetAllConsults';
import { useGetFullInventory } from '@/hooks/inventory/useGetFullInventory';
import { useTodayAppointmentsBySpecialty } from '@/hooks/appointments/useTodayAppointmentsBySpecialty';
import { getConsultTotals } from '@/components/sections/employee/consultations/utils/getConsultTotals';

export default function DoctorStatsGrid({ role, specialty }) {
  // Appointments Today logic
  const { appointments } = useTodayAppointmentsBySpecialty();
  const todaysAppointmentsNumber = appointments?.length || 0;

  // Inventory and Alerts logic
  const { totalAlerts } = useGetFullInventory();

  // Consultations logic
  const { consults } = useGetAllConsults({ speciality: specialty });

  // Today's consults total amount
  const { consultPrice, totalItemsSold, totalCost, itemsSoldCount, consultsCount } =
    getConsultTotals(consults);

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: DollarSign,
          mainData: '$' + totalCost,
          extraData: 'Hoy',
          title: 'Ingresos de Hoy',
          variant: 'primary',
        },
        {
          Icon: Users,
          mainData: todaysAppointmentsNumber,
          extraData: 'Hoy',
          title: 'Citas Programadas',
          variant: 'success',
          href: '/doctor/calendar',
        },
        {
          Icon: Pill,
          mainData: '$' + totalItemsSold,
          extraData: 'Hoy',
          title: 'Venta de Medicamentos',
          variant: 'purple',
          href: '/doctor/inventory',
        },
        {
          Icon: AlertTriangle,
          mainData: totalAlerts,
          extraData: totalAlerts === 0 ? 'Sin alertas' : 'Revisar',
          title: 'Alertas de Inventario',
          variant: totalAlerts === 0 ? 'success' : 'danger',
          href: '/doctor/inventory',
        },
      ].map((card, index) => (
        <DoctorStatsCard
          key={index}
          role={role}
          Icon={card.Icon}
          href={card.href}
          mainData={card.mainData}
          extraData={card.extraData || null}
          title={card.title}
          variant={card.variant}
        />
      ))}
    </div>
  );
}
