'use client';

import EmployeeStatsCard from './EmployeeStatsCard';
import { useGetFullInventory } from '@/@hooks/inventory/useGetFullInventory';
import { Calendar, DollarSign, FileText, TriangleAlert } from 'lucide-react';
import { useAllTodayAppointments } from '@/@hooks/appointments/useAllTodayAppointments';
import { useGetAllConsults } from '@/@hooks/consults/useGetAllConsults';
import { getConsultTotals } from '../../consultations/utils/getConsultTotals';

export default function EmployeeStatsGrid({ role }) {
  // Appointments Today logic
  const { appointments } = useAllTodayAppointments();
  const todaysAppointmentsNumber = appointments?.length || 0;

  // Inventory and Alerts logic
  const { totalAlerts } = useGetFullInventory();

  // Consultations logic
  const { consults } = useGetAllConsults();

  // Calculate totals with Custom Hook
  const { consultPrice, totalItemsSold, totalCost, itemsSoldCount, consultsCount } =
    getConsultTotals(consults);

  const todayConsultsTotal = consults.map((c) => c.consultPrice).reduce((a, b) => a + b, 0) || 0;
  const medsSoldTotal =
    consults
      .flatMap((c) => c.itemsSold)
      .map((item) => item.total)
      .reduce((a, b) => a + b, 0) || 0;

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
          mainData: '$' + consultPrice.toFixed(2),
          title: 'Consultas Hoy',
          extraData: consultsCount + ` ${consultsCount === 1 ? 'consulta' : 'consultas'}`,
          variant: 'purple',
        },
        {
          Icon: DollarSign,
          mainData: '$' + totalItemsSold.toFixed(2),
          title: 'Venta de Medicamentos',
          extraData: itemsSoldCount + ` ${itemsSoldCount === 1 ? 'vendido' : 'vendidos'}`,
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
