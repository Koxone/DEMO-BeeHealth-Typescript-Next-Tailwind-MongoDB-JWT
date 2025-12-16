'use client';

import EmployeeStatsCard from './EmployeeStatsCard';
import { useGetFullInventory } from '@/hooks/inventory/useGetFullInventory';
import { Calendar, DollarSign, FileText, TriangleAlert } from 'lucide-react';
import { useAllTodayAppointments } from '@/hooks/appointments/useAllTodayAppointments';
import { useGetAllConsults } from '@/hooks/consults/useGetAllConsults';

export default function EmployeeStatsGrid({ role }) {
  // Appointments Today logic
  const { appointments } = useAllTodayAppointments();
  const todaysAppointmentsNumber = appointments?.length || 0;

  // Inventory and Alerts logic
  const { totalAlerts } = useGetFullInventory();

  // Consultations logic
  const { consults } = useGetAllConsults();

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
          Icon: Calendar,
          mainData: todaysAppointmentsNumber,
          extraData: 'Hoy',
          title: 'Citas Programadas',
          variant: 'primary',
        },
        {
          Icon: FileText,
          mainData: '$' + todayConsultsTotal,
          title: 'Consultas Hoy',
          extraData: 'Hoy',
          variant: 'purple',
        },
        {
          Icon: DollarSign,
          mainData: '$' + medsSoldTotal,
          title: 'Venta de Medicamentos',
          extraData: 'Hoy',
          variant: 'success',
        },
        {
          Icon: TriangleAlert,
          mainData: totalAlerts,
          extraData: 'Revisar',
          title: 'Alertas de Inventario',
          variant: 'danger',
        },
      ].map((card, index) => (
        <EmployeeStatsCard
          key={index}
          role={role}
          Icon={card.Icon}
          mainData={card.mainData}
          extraData={card.extraData}
          title={card.title}
          variant={card.variant}
        />
      ))}
    </div>
  );
}
