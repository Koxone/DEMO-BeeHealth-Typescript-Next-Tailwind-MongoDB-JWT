// Wrapper
import DoctorClinicalHistoryModalWrapper from '../shared/DoctorClinicalHistoryModalWrapper';
import CreateClinicalHistoryForm from './components/CreateClinicalHistoryForm';

// Prop Types
interface DoctorCreatePatientClinicalHistoryModalProps {
  patientId: string;
}

function CreateClinicalHistoryModal({ patientId }: DoctorCreatePatientClinicalHistoryModalProps) {
  return (
    <DoctorClinicalHistoryModalWrapper>
      <CreateClinicalHistoryForm patientId={patientId} />
    </DoctorClinicalHistoryModalWrapper>
  );
}

export default CreateClinicalHistoryModal;
