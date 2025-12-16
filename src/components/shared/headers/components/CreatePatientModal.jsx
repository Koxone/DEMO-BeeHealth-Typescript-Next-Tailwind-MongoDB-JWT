'use client';

import { useModalClose } from '@/hooks/useModalClose';
import CreatePatientForm from './CreatePatientForm';

export default function CreatePatientModal({ setIsModalPatientsOpen, specialty, role, refetch }) {
  // Close handler
  const { handleOverlayClick } = useModalClose(() => setIsModalPatientsOpen(false));

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="relative inset-0 z-50 flex w-full max-w-[600px] items-center justify-center p-4">
        <CreatePatientForm
          role={role}
          refetch={refetch}
          setIsModalPatientsOpen={setIsModalPatientsOpen}
          specialty={specialty}
          onClick={() => setIsModalPatientsOpen(false)}
        />
      </div>
    </div>
  );
}
