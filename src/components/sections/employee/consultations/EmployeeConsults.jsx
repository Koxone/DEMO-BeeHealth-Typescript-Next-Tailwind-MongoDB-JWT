'use client';

import MetricsGrid from './components/MetricsGrid';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import TodayConsultsList from '@/components/shared/todayConsults/TodayConsultsList';
import MedsSoldTable from '../../../shared/medsSold/MedsSoldTable';
import { useGetAllConsults } from '@/hooks/consults/useGetAllConsults';
import { getConsultTotals } from './utils/getConsultTotals';

export default function EmployeeConsults({ role }) {
  // Get consults data
  const { consults, isLoading, error } = useGetAllConsults();

  // Calculate totals
  const totals = getConsultTotals(consults);
  const totalConsultsCost = totals?.consultPrice || 0;
  const totalItemsSold = totals?.totalItemsSold || 0;
  const totalCost = totals?.totalCost || 0;

  const metrics = {
    grandTotal: totalCost,
    consultsTotal: totalConsultsCost,
    medsTotal: totalItemsSold,
  };

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-8">
      {/* Header */}
      <SharedSectionHeader
        role={role}
        Icon="accounting"
        title="Gestión de Consultas"
        subtitle="Registrar y controlar la atención médica de los pacientes."
      />

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Metrics summary */}
        <MetricsGrid
          consultsData={consults}
          totals={{
            grandTotal: metrics?.grandTotal,
            consultsTotal: metrics?.consultsTotal,
            medsTotal: metrics?.medsTotal,
            count: metrics?.count,
          }}
        />

        {/* Consultations Table */}
        <TodayConsultsList consultsData={consults} totals={metrics} />

        {/* Medications Sold Table */}
        <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg">
          <MedsSoldTable consultsData={consults} />
        </div>
      </div>
    </div>
  );
}
