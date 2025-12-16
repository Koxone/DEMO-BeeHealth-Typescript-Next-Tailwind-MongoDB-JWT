'use client';

import { X, FileText } from 'lucide-react';
import ModalHeader from './components/ModalHeader';
import CreateFirstRecordForm from './clinical-record/CreateFirstRecordForm';

// Custom Hooks
import { useModalClose } from '@/hooks/useModalClose';
import { useGetSinglePatient } from '@/hooks/patients/get/useGetSinglePatient';

// Zustand
import useAuthStore from '@/zustand/useAuthStore';

export default function CreateFirstRecordModal({
  onClose,
  showSuccessModal,
  setShowSuccessModal,
  setShowCreateFirstRecordModal,
  fetchRecord,
}) {
  // Close handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Fetch patient data from the custom hook
  const { patient } = useGetSinglePatient();
  const patientId = patient?._id;

  // Auth Zustand
  const { user } = useAuthStore();

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    >
      {/* Modal */}
      <div
        className="bg-beehealth-body-main relative flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          title="Crear primer registro clinico"
          subtitle="Completa el siguiente formulario para crear el primer registro clínico del paciente."
          onClose={onClose}
          icons={{ X, FileText }}
        />

        {/* Main content with scroll */}
        <div className="flex-1 overflow-y-auto">
          <CreateFirstRecordForm
            fetchRecord={fetchRecord}
            setShowCreateFirstRecordModal={setShowCreateFirstRecordModal}
            specialty={user?.specialty}
            patientId={patientId}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
          />
        </div>
      </div>
    </div>
  );
}
