'use client';

import { Weight, TrendingDown, Ruler, Clock } from 'lucide-react';
import PatientStatsCard from '../PatientStatsCard';
import { CurrentUserFromAuthStoreType } from '@/presentation/store/authStore';
import { WeightClinicalSummaryDTOPresentation } from '@/presentation/types/clinical-history.types';

// Prop Types
interface PatientStatsGridProps {
  myWeightSummary?: WeightClinicalSummaryDTOPresentation;
}

export default function PatientStatsGrid({ myWeightSummary }: PatientStatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Weight,
          mainData: '-- kg',
          extraData: `--%`,
          title: 'Peso Actual',
          variant: 'primary',
        },
        {
          Icon: Ruler,
          mainData: '-- cm',
          extraData: `--%`,
          title: 'Talla Actual',
          variant: 'success',
        },
        {
          Icon: TrendingDown,
          mainData: '-- kg',
          extraData: `--%`,
          title: 'Progreso',
          variant: 'purple',
        },
        {
          Icon: Clock,
          mainData: '--',
          title: 'Tiempo desde tu última consulta',
          variant: 'danger',
          count: true,
          href: '/patient/new-appointment',
        },
      ].map((card, index) => (
        <PatientStatsCard
          key={index}
          Icon={card.Icon}
          href={card.href}
          mainData={card.mainData}
          extraData={card.extraData}
          title={card.title}
          variant={card.variant}
          count={card.count}
          appointmentDate={1}
        />
      ))}
    </div>
  );
}
