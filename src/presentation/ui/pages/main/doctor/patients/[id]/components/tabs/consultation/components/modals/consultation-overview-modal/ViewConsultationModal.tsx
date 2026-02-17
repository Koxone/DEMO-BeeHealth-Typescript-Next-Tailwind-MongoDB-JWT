'use client';

// UI Components
import ModalHeader from '../create-consultation-modal/components/ModalHeader';
import ViewConsultationForm from './components/ViewConsultationForm';

// Enums, Types and Interfaces
import { ConsultationDTOPresentation } from '@/presentation/types/';

// Custom Hooks and Stores
import { useModalClose } from '@/presentation/hooks/shared';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

export default function ViewConsultationModal() {
  // Modal Management with Store
  const { data, closeModal } = useActiveModalStore();

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
        <ModalHeader title="Ver consulta" subtitle="Información médica registrada" />

        {/* Main content */}
        <div className="max-h-[calc(90vh-180px)] overflow-y-auto px-6 py-8">
          <ViewConsultationForm consultation={data as ConsultationDTOPresentation} />
        </div>
      </div>
    </div>
  );
}
