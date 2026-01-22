'use client';

import { X, FileText } from 'lucide-react';
import ModalHeader from './components/ModalHeader';
import CreateFirstRecordForm from './clinical-record/CreateFirstRecordForm';

// Custom Hooks
import { useModalClose } from '@/@hooks/useModalClose';
import { useGetSinglePatient } from '@/@hooks/patients/get/useGetSinglePatient';
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';
import LoadingState from '@/components/shared/feedback/LoadingState';

export default function CreateFirstRecordModal({
  onClose,
  showSuccessModal,
  setShowSuccessModal,
  setShowCreateFirstRecordModal,
  fetchRecord,
  refetchWeightLogs,
}) {
  // Close handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Fetch patient data from the custom hook
  const { patient } = useGetSinglePatient();
  const patientId = patient?._id;

  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  // Loading State
  if (isLoadingCurrentUser) {
    return <LoadingState />;
  }

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
          title="Crear primer registro clínico"
          subtitle="Completa el siguiente formulario para crear el primer registro clínico del paciente."
          onClose={onClose}
          icons={{ X, FileText }}
        />

        {/* Main content with scroll */}
        <div className="flex-1 overflow-y-auto">
          <CreateFirstRecordForm
            fetchRecord={fetchRecord}
            refetchWeightLogs={refetchWeightLogs}
            setShowCreateFirstRecordModal={setShowCreateFirstRecordModal}
            specialty={currentUser?.specialty}
            patientId={patientId}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
          />
        </div>
      </div>
    </div>
  );
}
