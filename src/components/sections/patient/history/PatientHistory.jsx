'use client';

import { useState } from 'react';
import Stats from '../history/components/Stats';
import RecordsTable from '../history/components/RecordsTable';
import RecordsMobileList from '../history/components/RecordsMobileList';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

// Custom Hooks
import { useGetPatientClinicalRecords } from '@/hooks/clinicalRecords/get/useGetPatientClinicalRecords';
import { useGetPatientWeightLogs } from '@/hooks/clinicalRecords/get/useGetPatientWeightLogs';
import EmptyState from '@/components/shared/feedback/EmptyState';
import LoadingState from '@/components/shared/feedback/LoadingState';

export default function PatientHistory({ role, currentUser }) {
  const { data, isLoading, error } = useGetPatientClinicalRecords(currentUser?.id);

  const {
    weightLogs: patientWeightLogs,
    loading: patientWeightLogsLoading,
    error: patientWeightLogsError,
  } = useGetPatientWeightLogs(currentUser?.id);

  const [peso, setPeso] = useState('');
  const [notas, setNotas] = useState('');

  const historyData = data || [];
  const mappedHistory = historyData.map((r) => ({
    id: r?._id,
    fecha: new Date(r?.recordDate).toISOString().split('T')[0],
    peso: r?.answers.find((a) => a.question?.questionId === 7)?.value,
    talla: r?.answers.find((a) => a.question?.questionId === 8)?.value,
    imc: Number(r?.indiceMasaCorporal).toFixed(1),
    notas: r?.motivoConsulta || 'Sin notas',
  }));

  if (isLoading) return <LoadingState />;
  if (error)
    return <p className="p-6 text-center text-red-600">Error: {error?.message || 'Desconocido'}</p>;
  if (!historyData.length) return <EmptyState onAdd={() => setShowModal(true)} />;

  return (
    <div className="h-full w-full space-y-6 overflow-y-auto pb-40">
      <SharedSectionHeader
        role={role}
        title="Historial Clínico"
        subtitle="Visualiza tus ultimos registros médicos"
        Icon="history"
      />

      {/* Empty state  */}
      {!patientWeightLogs || patientWeightLogs.length === 0 ? (
        <EmptyState
          title="No hay registros de peso"
          subtitle="Agenda tu primer cita para comenzar a registrar tus mediciones"
          button="Agendar Cita"
          href="/patient/new-appointment"
        />
      ) : (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-4">
              <h3 className="text-lg font-semibold text-gray-800">Resumen de Peso</h3>
            </div>

            <Stats
              type="weight"
              historyData={mappedHistory}
              patientWeightLogs={patientWeightLogs}
            />

            <div className="col-span-1 mt-4 md:col-span-2 lg:col-span-2 xl:col-span-4">
              <h3 className="text-lg font-semibold text-gray-800">Resumen de Talla</h3>
            </div>

            <Stats type="size" historyData={mappedHistory} patientWeightLogs={patientWeightLogs} />
          </div>

          {/* Table */}
          <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
            <RecordsTable historyData={mappedHistory} patientWeightLogs={patientWeightLogs} />
            {/* <RecordsMobileList historyData={mappedHistory} /> */}
          </div>
        </div>
      )}
    </div>
  );
}
