'use client';

import CreatePatientForm from './components/CreatePatientForm';

// Custom Hooks
import { useModalClose } from '@/presentation/hooks/shared';

export default function CreatePatientModal({
  setCreatePatientModalOpen,
  specialty,
  role,
  refetch,
  registerUser,
}) {
  // Close handler
  const { handleOverlayClick } = useModalClose(() => setCreatePatientModalOpen(false));

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="relative inset-0 z-50 flex w-full max-w-150 items-center justify-center p-4">
        <CreatePatientForm
          role={role}
          registerUser={registerUser}
          refetch={refetch}
          setCreatePatientModalOpen={setCreatePatientModalOpen}
          specialty={specialty}
          onClick={() => setCreatePatientModalOpen(false)}
        />
      </div>
    </div>
  );
}
