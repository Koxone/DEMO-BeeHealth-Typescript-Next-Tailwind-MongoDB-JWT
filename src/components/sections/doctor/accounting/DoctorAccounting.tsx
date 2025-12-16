'use client';

import MetricsGrid from './components/MetricsGrid';
import WeeklyIncomeChart from './components/WeeklyIncomeChart';
import DistributionCard from './components/DistributionCard';
import MedsSoldTable from '@/components/shared/medsSold/MedsSoldTable';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import TodayConsultsList from '@/components/shared/todayConsults/TodayConsultsList';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';

// Custom Hooks
import { useGetAllConsults } from '@/hooks/consults/useGetAllConsults';
import { getConsultTotals } from '@/components/sections/employee/consultations/utils/getConsultTotals';

export default function DoctorAccounting({ role, specialty }) {
  // Get consults data
  const { consults, isLoading, error } = useGetAllConsults({ speciality: specialty });

  // Calculate totals
  const totals = getConsultTotals(consults);
  const totalConsultsCost = totals?.consultPrice || 0;
  const totalItemsSold = totals?.totalItemsSold || 0;
  const totalCost = totals?.totalCost || 0;
  const quantityItemsSold = consults.reduce(
    (sum, consult) => sum + (consult.itemsSold?.length || 0),
    0
  );
  const metrics = {
    grandTotal: totalCost || 0,
    consultsTotal: totalConsultsCost || 0,
    medsTotal: totalItemsSold || 0,
  };

  /* Derived */
  const incomeDistribution = [
    { name: 'Consultas', value: metrics.consultsTotal, color: '#678bda' },
    { name: 'Medicamentos', value: metrics.medsTotal, color: '#73c89f' },
  ];

  const ingresosPorPaciente = consults.map((c) => ({
    nombre: c.patient.fullName,
    consultas: c.consultPrice,
    medicamentos: c.totalItemsSold,
  }));

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <SharedSectionHeader
        Icon="accounting"
        role={role}
        title="Mis Finanzas"
        subtitle="Control financiero del consultorio"
      />

      {/* Metrics */}
      <MetricsGrid
        totalDia={metrics?.grandTotal || 0}
        totalConsultas={metrics?.consultsTotal || 0}
        totalMedicamentos={metrics?.medsTotal || 0}
        consultasCount={consults.length}
        medsCount={quantityItemsSold}
        promedio={consults.length > 0 ? (metrics.grandTotal / consults.length).toFixed(2) : 0}
      />

      {/* Charts */}
      <div className="hidden grid-cols-2 gap-4 md:grid md:gap-6">
        <WeeklyIncomeChart data={ingresosPorPaciente} />
        <DistributionCard data={incomeDistribution} />
      </div>

      {/* Consults */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Consultas del Día</h2>
        </div>

        <TodayConsultsList consultsData={consults} totals={metrics} />
      </div>

      {/* Meds Sold */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
            Medicamentos Vendidos del Día
          </h2>
        </div>

        <MedsSoldTable consultsData={consults} />
      </div>
    </div>
  );
}
