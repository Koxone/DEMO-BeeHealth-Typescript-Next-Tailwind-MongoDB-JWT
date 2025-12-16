'use client';
import CreateFirstRecordButton from '../../clinicalHistory/components/CreateFirstRecordButton';

export default function FullHistoryButton({ onClickFullHistory, patientRecord, onCreateNew }) {
  return (
    <div className="bg-beehealth-green-primary-solid flex h-full flex-col justify-between space-y-2 rounded-lg p-2">
      {/* Title */}
      <p className="text-xs">Historia Clinica Completa</p>

      {/* Content */}
      {patientRecord?.length === 0 ? (
        <CreateFirstRecordButton onCreateNew={onCreateNew} />
      ) : (
        <button
          onClick={onClickFullHistory}
          className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
        >
          Ver o Editar
        </button>
      )}
    </div>
  );
}
