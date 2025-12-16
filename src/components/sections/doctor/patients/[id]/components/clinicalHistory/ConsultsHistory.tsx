'use client';

import { useState } from 'react';
import { Plus, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';
import AddHistoryButton from './components/AddHistoryButton';
import ConsultCard from './components/consult-card/ConsultCard';
import GoalButton from './components/GoalButton';
import CreateFirstRecordButton from './components/CreateFirstRecordButton';

const RECORDS_PER_PAGE = 5;

export default function ConsultsHistory({
  onAdd,
  onEdit,
  questions,
  fetchRecord,
  onDelete,
  onCreateNew,
  patientRecord,
  specialty,
  setShowCreateGoalModal,
  patientId,
  events,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalRecords = patientRecord?.length || 0;
  const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const endIndex = startIndex + RECORDS_PER_PAGE;
  const visibleRecords = patientRecord?.slice(startIndex, endIndex) || [];

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12">
            <ClipboardList className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-(--med-text-dark) sm:text-xl">
              Historial de Consultas para este paciente
            </h2>
            <p className="text-xs text-(--med-text-muted) sm:text-sm">
              Registros médicos del paciente
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {patientRecord?.length > 0 ? (
            <AddHistoryButton onAdd={onAdd} />
          ) : (
            <CreateFirstRecordButton onCreateNew={onCreateNew} />
          )}
          <GoalButton onClick={() => setShowCreateGoalModal(true)} />
        </div>
      </div>

      {/* Records */}
      {patientRecord?.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {visibleRecords.map((r, index) => {
            const bgColors = [
              'bg-beehealth-green-primary-light',
              'bg-beehealth-blue-primary-light',
            ];
            const bgColorClass = bgColors[index % bgColors.length];

            return (
              <div
                key={r._id}
                className={`${bgColorClass} rounded-xl p-3 shadow-sm transition hover:shadow-md sm:p-4`}
                style={{
                  animation: `fadeIn 0.3s ease-out ${index * 100}ms forwards`,
                }}
              >
                <ConsultCard
                  r={r}
                  questions={questions}
                  onEdit={(record, readOnly) => onEdit(record, readOnly)}
                  specialty={specialty}
                  fetchRecord={fetchRecord}
                  onDelete={onDelete}
                  patientRecord={patientRecord}
                  patientId={patientId}
                  events={events}
                />
              </div>
            );
          })}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-beehealth-body-main border-beehealth-blue-primary-solid flex w-fit items-center gap-6 justify-self-center rounded-xl px-4 py-3">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="hover:bg-beehealth-blue-primary-solid flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </button>

              <span className="text-sm text-gray-700">
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="hover:bg-beehealth-blue-primary-solid flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-900"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-beehealth-body-main flex flex-col items-center justify-center rounded-xl border border-(--med-gray-border) py-12 text-center sm:py-16">
          <ClipboardList className="mb-3 h-10 w-10 text-gray-400 sm:h-12 sm:w-12" />
          <p className="mb-1 text-sm font-medium text-(--med-text-dark) sm:text-base">
            Sin registros clínicos
          </p>
          <p className="mb-4 text-xs text-(--med-text-muted) sm:text-sm">
            Comienza agregando el primer registro
          </p>
          <button
            onClick={onAdd}
            className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Agregar Registro
          </button>
        </div>
      )}
    </div>
  );
}
