import { useState } from 'react';
import { Utensils } from 'lucide-react';
import ToggleDietCard from './components/ToggleDietCard';

// Feedback Components
import DietCompletedModal from '../diet-completed-modal/DietCompletedModal';
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';
import DietRenewModal from '../diet-renew-modal/DietRenewModal';

// Types
import { UserDiet } from '@/@types/diet/diet.types';

export default function QuickToggleDiets({
  patientId,
  recordId,
  userData,
  setShowSuccessModal,
  setSuccessTitle,
  setSuccessMessage,
  refetchDiets,
  dietsData,
  dietsLoading,
  dietsError,
  refetchTimeline,
  setShowRemoveDietModal,
  setDietToDelete,
}: {
  patientId: string | null;
  recordId: string | null;
  userData: any;
  setShowSuccessModal: (show: boolean) => void;
  setSuccessTitle: (title: string) => void;
  setSuccessMessage: (message: string) => void;
  refetchDiets: () => void;
  dietsData: UserDiet[];
  dietsLoading: boolean;
  dietsError: any;
  refetchTimeline: () => void;
  setShowRemoveDietModal: (show: boolean) => void;
  setDietToDelete: (diet: UserDiet | null) => void;
}) {
  const [selectedDiet, setSelectedDiet] = useState<UserDiet | null>(null);
  const [showToggleModal, setShowToggleModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Renew Diet Modal States
  const [showRenewModal, setShowRenewModal] = useState<boolean>(false);

  // Handle diet click
  const handleDietClick = (diet: UserDiet) => {
    setSelectedDiet(diet);
    setShowToggleModal(true);
  };

  const handleRenewDietClick = (diet: UserDiet) => {
    setSelectedDiet(diet);
    setShowRenewModal(true);
  };

  // Loading State
  if (dietsLoading) {
    return <LoadingState />;
  }

  // Error State
  if (dietsError) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6">
      {/* Assigned diets */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <Utensils className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-700">Gestion de Dietas</h3>
            <p className="text-sm text-gray-500">
              {recordId
                ? 'Click en una dieta para activar o desactivar del plan nutricional de este paciente.'
                : 'Es necesario seleccionar un registro clínico para poder asignar o remover una dieta del plan de un paciente'}
            </p>
          </div>
        </div>

        {/* Diet Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {dietsData?.map((diet) => (
            <ToggleDietCard
              key={diet?._id}
              diet={diet}
              handleDietClick={handleDietClick}
              handleRenewDietClick={handleRenewDietClick}
              patientId={patientId}
              recordId={recordId}
              setShowRemoveDietModal={setShowRemoveDietModal}
              setDietToDelete={setDietToDelete}
            />
          ))}
        </div>
      </div>

      {/* Toggle diet modal */}
      {showToggleModal && selectedDiet && (
        <DietCompletedModal
          selectedDiet={selectedDiet}
          recordId={recordId}
          userData={userData}
          setShowToggleModal={setShowToggleModal}
          isProcessing={isProcessing}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessTitle={setSuccessTitle}
          refetchTimeline={refetchTimeline}
          setSuccessMessage={setSuccessMessage}
          refetchDiets={refetchDiets}
        />
      )}

      {/* Renew diet modal */}
      {showRenewModal && selectedDiet && (
        <DietRenewModal
          selectedDiet={selectedDiet}
          recordId={recordId}
          userData={userData}
          isProcessing={isProcessing}
          setSuccessTitle={setSuccessTitle}
          refetchTimeline={refetchTimeline}
          setSuccessMessage={setSuccessMessage}
          refetchDiets={refetchDiets}
          setShowRenewModal={setShowRenewModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
    </div>
  );
}
