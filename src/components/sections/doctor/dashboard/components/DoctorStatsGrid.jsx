'use client';

import { useTodayAppointmentsBySpecialty } from '@/hooks/appointments/useTodayAppointmentsBySpecialty';
import { useGetFullInventory } from '@/hooks/inventory/useGetFullInventory';
import { Users, DollarSign, AlertTriangle, Activity, Pill } from 'lucide-react';
import DoctorStatsCard from './DoctorStatsCard';
import { useGetAllConsults } from '@/hooks/consults/useGetAllConsults';

export default function DoctorStatsGrid({ role, specialty }) {
  // Appointments Today logic
  const { appointments, loading } = useTodayAppointmentsBySpecialty();
  const todaysAppointmentsNumber = appointments?.length || 0;

  // Inventory and Alerts logic
  const { totalAlerts } = useGetFullInventory();

  // Consultations logic
  const { consults } = useGetAllConsults({ speciality: specialty });

  const todayConsultsTotal = consults.map((c) => c.consultPrice).reduce((a, b) => a + b, 0) || 0;
  const medsSoldTotal =
    consults
      .flatMap((c) => c.itemsSold)
      .map((item) => item.total)
      .reduce((a, b) => a + b, 0) || 0;

  const totalSales = todayConsultsTotal + medsSoldTotal;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: DollarSign,
          mainData: '$' + totalSales,
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
          mainData: '$' + medsSoldTotal,
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
