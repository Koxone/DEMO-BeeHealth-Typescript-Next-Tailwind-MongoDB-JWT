'use client';

import { useState } from 'react';

import MetricsGrid from './components/MetricsGrid';
import WeeklyIncomeChart from './components/WeeklyIncomeChart';
import DistributionCard from './components/DistributionCard';
import MedsSoldTable from '@/components/shared/medsSold/MedsSoldTable';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import TodayConsultsList from '@/components/shared/todayConsults/TodayConsultsList';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';
import SuccessModal from '@/components/shared/feedback/SuccessModal';

// Custom Hooks
import { useGetAllConsults } from '@/hooks/consults/useGetAllConsults';
import { getConsultTotals } from '@/components/sections/employee/consultations/utils/getConsultTotals';

export default function DoctorAccounting({ role, specialty }) {
  // Get consults data
  const { consults, isLoading, error, refetch } = useGetAllConsults({ speciality: specialty });

  // Get Totals for Metrics
  const { consultPrice, totalItemsSold, totalCost, itemsSoldCount, consultsCount } =
    getConsultTotals(consults);

  // Success Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState('');
  const [successModalTitle, setSuccessModalTitle] = useState('');

  // Calculate totals
  const quantityItemsSold = consults.reduce(
    (sum, consult) => sum + (consult.itemsSold?.length || 0),
    0
  );

  /* Derived */
  const incomeDistribution = [
    { name: 'Consultas', value: consultPrice, color: '#678bda' },
    { name: 'Medicamentos', value: totalItemsSold, color: '#73c89f' },
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
        consultPrice={consultPrice}
        totalItemsSold={totalItemsSold}
        totalCost={totalCost}
        itemsSoldCount={quantityItemsSold}
        consultsCount={consultsCount}
      />

      {/* Charts */}
      <div className="hidden grid-cols-2 gap-4 md:grid md:gap-6">
        <WeeklyIncomeChart data={ingresosPorPaciente} />
        <DistributionCard data={incomeDistribution} />
      </div>

      {/* Consults */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700 md:text-xl">Consultas del Día</h2>
        </div>

        <TodayConsultsList
          consultsData={consults}
          totalCost={totalCost}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessModalMessage={setSuccessModalMessage}
          setSuccessModalTitle={setSuccessModalTitle}
          refetch={refetch}
        />
      </div>

      {/* Meds Sold */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700 md:text-xl">
            Medicamentos Vendidos del Día
          </h2>
        </div>

        <MedsSoldTable consultsData={consults} />
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          message={successModalMessage}
          title={successModalTitle}
          setShowSuccessModal={setShowSuccessModal}
          showSuccessModal={showSuccessModal}
        />
      )}
    </div>
  );
}
