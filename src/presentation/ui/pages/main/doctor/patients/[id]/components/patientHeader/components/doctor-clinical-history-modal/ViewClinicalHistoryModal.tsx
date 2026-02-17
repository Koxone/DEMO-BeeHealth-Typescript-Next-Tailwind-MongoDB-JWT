'use client';

// UI
import ClinicalHistoryForm from './read-only/clinical-history-form/ClinicalHistoryForm';

// Wrapper
import DoctorClinicalHistoryModalWrapper from './shared/DoctorClinicalHistoryModalWrapper';

// Types
import { ClinicalHistoryDTOPresentation } from '@/presentation/types/clinical-history.types';

interface ViewClinicalHistoryModalProps {
  patientClinicalHistory: ClinicalHistoryDTOPresentation;
}

export default function ViewClinicalHistoryModal({
  patientClinicalHistory,
}: ViewClinicalHistoryModalProps) {
  return (
    <DoctorClinicalHistoryModalWrapper>
      <ClinicalHistoryForm patientClinicalHistory={patientClinicalHistory} />
    </DoctorClinicalHistoryModalWrapper>
  );
}
