'use client';

// UI Components
import CreateFirstRecordButton from './CreateFirstRecordButton';
import { ButtonXs } from '@/presentation/ui/pages/main/shared/buttons/Buttons';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Enums, Types and Interfaces
import { ClinicalHistoryDTOPresentation } from '@/presentation/types/clinical-history.types';

// Prop Types
interface FullHistoryButtonProps {
  patientClinicalHistory: ClinicalHistoryDTOPresentation;
}

export default function FullHistoryButton({ patientClinicalHistory }: FullHistoryButtonProps) {
  // Modal Management with Store
  const { activeModal, data, openModal, closeModal } = useActiveModalStore();

  return (
    <div className="bg-beehealth-green-primary-solid flex h-full flex-col justify-between space-y-2 rounded-lg p-2">
      {/* Title */}
      <p className="text-xs">Historia Clinica Completa</p>

      {/* Content */}
      {patientClinicalHistory === null ? (
        // Create First Record Button
        <CreateFirstRecordButton onCreateNew={() => openModal('createClinicalHistory', null)} />
      ) : (
        // View Clinic History
        <ButtonXs
          onClick={() => openModal('viewClinicalHistory', patientClinicalHistory)}
          action="confirm"
        >
          Ver Historia Clinica
        </ButtonXs>
      )}
    </div>
  );
}
