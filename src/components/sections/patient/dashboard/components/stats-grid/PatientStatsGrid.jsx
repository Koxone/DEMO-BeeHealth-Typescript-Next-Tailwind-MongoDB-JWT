'use client';

import { Weight, TrendingDown, Ruler, Clock } from 'lucide-react';
import PatientStatsCard from '../PatientStatsCard';

// Custom Hooks
import { useGetAllWeightLogs } from '@/hooks/clinicalRecords/get/useGetAllWeightLogs';
import { useGetPatientWeightLogs } from '@/hooks/clinicalRecords/get/useGetPatientWeightLogs';

export default function PatientStatsGrid({ role, currentUser }) {
  // Weight Logs Hook for Global counter
  const {
    weightLogs,
    loading: weightLogsLoading,
    error: weightLogsError,
    refetch: refetchWeightLogs,
  } = useGetAllWeightLogs();

  // Patient Weight Logs Hook
  const {
    weightLogs: patientWeightLogs,
    loading: patientWeightLogsLoading,
    error: patientWeightLogsError,
    refetch: refetchPatientWeightLogs,
  } = useGetPatientWeightLogs(currentUser?.id);

  // Calculate last visit in days
  const lastVisitCount = Math.floor(
    (Date.now() - new Date(patientWeightLogs[0]?.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Weight,
          mainData: `${weightLogs[0]?.currentWeight} kg`,
          extraData: `${(
            ((weightLogs[0]?.originalWeight - weightLogs[0]?.currentWeight) /
              weightLogs[0]?.originalWeight) *
            100
          ).toFixed(1)}%`,
          title: 'Peso Actual',
          variant: 'primary',
        },
        {
          Icon: Ruler,
          mainData: `${weightLogs[0]?.currentSize} cm`,
          extraData: `${(
            ((weightLogs[0]?.originalSize - weightLogs[0]?.currentSize) /
              weightLogs[0]?.originalSize) *
            100
          ).toFixed(1)}%`,
          title: 'Talla Actual',
          variant: 'success',
        },
        {
          Icon: TrendingDown,
          mainData: `${weightLogs[0]?.currentWeight - weightLogs[0]?.originalWeight} kg`,
          extraData: `${(
            ((weightLogs[0]?.originalWeight - weightLogs[0]?.currentWeight) /
              weightLogs[0]?.originalWeight) *
            100
          ).toFixed(1)}%`,
          title: 'Progreso',
          variant: 'purple',
        },
        {
          Icon: Clock,
          mainData: `${lastVisitCount || 0} ${lastVisitCount === 1 ? 'día' : 'días'}`,
          title: 'Tiempo desde tu ultima consulta',
          variant: 'danger',
          count: true,
          href: '/patient/new-appointment',
        },
      ].map((card, index) => (
        <PatientStatsCard
          key={index}
          role={role}
          Icon={card.Icon}
          href={card.href}
          mainData={card.mainData}
          extraData={card.extraData || null}
          title={card.title}
          variant={card.variant}
          lastVisitCount={lastVisitCount}
          count={card.count}
        />
      ))}
    </div>
  );
}
