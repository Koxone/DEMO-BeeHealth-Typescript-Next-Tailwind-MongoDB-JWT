'use client';

// Next, React and Other Libraries
import { Users, DollarSign, Pill, PlusCircle } from 'lucide-react';

// UI Components
import DoctorStatsCard from './DoctorStatsCard';

// Prop Types
interface DoctorStatsGridProps {
  role: string;
}

export default function DoctorStatsGrid({ role }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: DollarSign,
          mainData: '$' + 1,
          // mainData: '$' + totals?.grandTotal,
          extraData: 'Hoy',
          title: 'Ingresos de Hoy',
          variant: 'primary',
        },
        {
          Icon: Users,
          mainData: 1,
          // mainData: totals?.uniquePatients,
          extraData: 'Total',
          title: 'Pacientes atendidos',
          variant: 'success',
          href: '/doctor/accounting',
        },
        {
          Icon: Pill,
          mainData: '$' + 1,
          // mainData: '$' + totals?.medsTotal,
          extraData: 1,
          // extraData: totals?.medsItems,
          title: 'Venta de Medicamentos',
          variant: 'purple',
          href: '/doctor/accounting',
        },
        {
          Icon: PlusCircle,
          mainData: '$' + 1,
          // mainData: '$' + totals?.extrasTotal,
          extraData: 1,
          // extraData: totals?.extrasItems,
          title: 'Venta de Extras',
          variant: 'purple',
          href: '/doctor/accounting',
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
