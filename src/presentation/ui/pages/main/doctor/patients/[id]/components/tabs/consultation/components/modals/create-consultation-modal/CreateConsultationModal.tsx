'use client';

// UI Components
import ModalHeader from './components/ModalHeader';
import CreateConsultationForm from './components/CreateConsultationForm';

// Enums, Types and Interfaces
import { LatestConsultationResponseDTOPresentation } from '@/presentation/types/consultation.types';

// Custom Hooks
import { useModalClose } from '@/presentation/hooks/shared';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop Types
interface CreateConsultationModalProps {
  patientId: string;
  latestConsultation: LatestConsultationResponseDTOPresentation;
}

export default function CreateConsultationModal({
  latestConsultation,
  patientId,
}: CreateConsultationModalProps) {
  // Modal Management with Store
  const { activeModal, data, openModal, closeModal } = useActiveModalStore();

  // Close handler
  const { handleOverlayClick } = useModalClose(() => closeModal());
  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div
        className="bg-beehealth-body-main relative w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader title="Crear nueva consulta" subtitle="Registro médico del paciente" />

        {/* Main content */}
        <div className="max-h-[calc(90vh-180px)] overflow-y-auto px-6 py-8">
          <CreateConsultationForm patientId={patientId} latestConsultation={latestConsultation} />
        </div>
      </div>
    </div>
  );
}
