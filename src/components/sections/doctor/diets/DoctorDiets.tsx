'use client';

import DoctorDietCard from '@/components/sections/doctor/diets/components/DoctorDietCard';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';
import ModalAssignDiet from './components/ModalAssignDiet';
import SuccessModal from '@/components/shared/feedback/SuccessModal';

// Custom Hooks
import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';
import { useState } from 'react';

// Types
import { IDiet } from '@/models/Diet';

export default function DoctorDiets({ role }) {
  // Fetch all diets
  const { dietsData, isLoading, error, refetch } = useGetAllDiets();

  // Assign Diet Modal State
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [dietToAssign, setDietToAssign] = useState<IDiet | null>(null);

  // Success Modal States
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const handleAssignDiet = (diet) => {
    setDietToAssign(diet);
    setShowAssignModal(true);
  };

  // Loading
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        {/* Header */}
        <SharedSectionHeader
          role={role}
          Icon="diets"
          title={role === 'doctor' ? 'Gestion de Dietas' : 'Mis Dietas'}
          subtitle={
            role === 'doctor'
              ? 'Crea y personaliza planes nutricionales'
              : 'Planes nutricionales personalizados'
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dietsData && dietsData.length > 0 ? (
          dietsData.map((diet) => (
            <DoctorDietCard
              diet={diet}
              key={diet._id}
              onClickAssign={() => handleAssignDiet(diet)}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
            <p className="text-lg font-semibold text-gray-700">No hay dietas registradas</p>

            <p className="text-gray-500">Crea un nuevo plan nutricional para comenzar</p>
          </div>
        )}
      </div>

      {/* Modal Assign Diet */}
      {showAssignModal && (
        <ModalAssignDiet
          dietToAssign={dietToAssign}
          setShowAssignModal={setShowAssignModal}
          refetch={refetch}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          title="Dieta asignada"
          message="La dieta ha sido asignada correctamente a los pacientes seleccionados."
          setShowSuccessModal={setShowSuccessModal}
          showSuccessModal={showSuccessModal}
        />
      )}
    </div>
  );
}
