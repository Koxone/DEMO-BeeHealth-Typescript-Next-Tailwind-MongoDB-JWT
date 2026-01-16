'use client';

import { Users, DollarSign, AlertTriangle, Pill } from 'lucide-react';
import DoctorStatsCard from './DoctorStatsCard';

// Custom Hooks
import { useGetFullInventory } from '@/@hooks/inventory/useGetFullInventory';

export default function DoctorStatsGrid({ role, totalItemsSold, totalCost, consultsCount }) {
  // Inventory and Alerts logic
  const { totalAlerts } = useGetFullInventory();

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
          mainData: consultsCount,
          extraData: 'Total',
          title: 'Pacientes atendidos',
          variant: 'success',
          href: '/doctor/accounting',
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
