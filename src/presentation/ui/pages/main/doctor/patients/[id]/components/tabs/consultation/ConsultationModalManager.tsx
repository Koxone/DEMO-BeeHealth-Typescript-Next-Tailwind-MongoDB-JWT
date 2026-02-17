// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Feedback Components
import {
  CreateConsultationModal,
  ViewConsultationModal,
  SharedModalManagement,
} from './components/modals';

// Enums, Types and Interfaces
import { LatestConsultationResponseDTOPresentation } from '@/presentation/types/consultation.types';

// Prop types
type CreateConsultationModalData = {
  patientId: string;
  latestConsultation: LatestConsultationResponseDTOPresentation;
};

export const ConsultationModalManager: React.FC = () => {
  // Modal Handler
  const { activeModal, data, closeModal } = useActiveModalStore();

  if (!activeModal) return null;

  const isConsultationModal =
    activeModal === 'createConsultation' ||
    activeModal === 'viewConsultation' ||
    activeModal === 'success';

  if (!isConsultationModal) return null;

  return (
    <>
      {/* Modal para Crear Consulta */}
      {activeModal === 'createConsultation' && (
        <CreateConsultationModal
          patientId={(data as CreateConsultationModalData)?.patientId}
          latestConsultation={(data as CreateConsultationModalData)?.latestConsultation}
        />
      )}

      {/* Modal para Ver Detalle/Historial de Consulta */}
      {activeModal === 'viewConsultation' && <ViewConsultationModal />}

      {/* Success Modal */}
      {activeModal === 'success' && <SharedModalManagement />}
    </>
  );
};
