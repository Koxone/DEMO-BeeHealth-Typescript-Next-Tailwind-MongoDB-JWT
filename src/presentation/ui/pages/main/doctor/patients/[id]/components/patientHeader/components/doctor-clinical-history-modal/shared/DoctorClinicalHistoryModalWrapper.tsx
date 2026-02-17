'use client';

// React
import { useState } from 'react';
import { X, FileText } from 'lucide-react';

// UI Components
import ModalHeader from '../read-only/ModalHeader';

// Custom Hooks
import { useModalClose } from '@/presentation/hooks/shared';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Types
interface DoctorClinicalHistoryModalWrapperProps {
  children: React.ReactNode;
}

export default function DoctorClinicalHistoryModalWrapper({
  children,
}: DoctorClinicalHistoryModalWrapperProps) {
  // Modal Management with Store
  const { activeModal, data, openModal, closeModal } = useActiveModalStore();

  // Editing state
  const [isEditing, setIsEditing] = useState(false);

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
        {/* Header */}
        <ModalHeader
          title="Historia Clínica Completa"
          subtitle="Registro médico del paciente"
          onClose={() => closeModal()}
          icons={{ X, FileText }}
        />

        {/* Content */}
        <div className="max-h-[calc(90vh-180px)] overflow-y-auto px-6 py-8">
          {children}

          {/* Action buttons when editing */}
          {isEditing && (
            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl bg-gray-300 px-6 py-2 font-semibold text-gray-700 transition hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-dark rounded-xl px-6 py-2 font-semibold text-white transition disabled:opacity-50"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
