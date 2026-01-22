'use client';
import { useState } from 'react';

import MetricsGrid from './components/MetricsGrid';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import TodayConsultsList from '@/components/shared/todayConsults/TodayConsultsList';
import MedsSoldTable from '@/components/shared/medsSold/MedsSoldTable';

// Custom Hooks
import { useGetAllConsults } from '@/@hooks/consults/useGetAllConsults';
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

// Local Helpers
import { getConsultTotals } from './utils/getConsultTotals';

// Feedback Components
import SuccessModal from '@/components/shared/feedback/SuccessModal';

export default function EmployeeConsults() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  // Get consults data
  const { consults, isLoading, error, refetch } = useGetAllConsults();

  // Success Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState('');
  const [successModalTitle, setSuccessModalTitle] = useState('');

  // Calculate totals with Custom Hook
  const { consultPrice, totalItemsSold, totalCost, itemsSoldCount, consultsCount } =
    getConsultTotals(consults);

  return (
    <div className="h-full overflow-y-auto pb-8">
      {/* Header */}
      <SharedSectionHeader
        role={currentUser?.role}
        Icon="accounting"
        title="Gestión de Consultas"
        subtitle="Registrar y controlar la atención médica de los pacientes."
      />

      <div className="flex flex-col gap-6">
        {/* Metrics summary */}
        <MetricsGrid
          totalCost={totalCost}
          totalItemsSold={totalItemsSold}
          consultPrice={consultPrice}
          consultsCount={consultsCount}
          itemsSoldCount={itemsSoldCount}
        />

        {/* Consultations Table */}
        <TodayConsultsList
          consultsData={consults}
          totalCost={totalCost}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessModalMessage={setSuccessModalMessage}
          setSuccessModalTitle={setSuccessModalTitle}
          refetch={refetch}
          totalItemsSold={totalItemsSold}
          consultPrice={consultPrice}
        />

        {/* Medications Sold Table */}
        <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200">
          <MedsSoldTable consultsData={consults} />
        </div>
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
