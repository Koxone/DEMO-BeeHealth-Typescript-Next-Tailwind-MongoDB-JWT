'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Custom Hooks
import { useEditDiet } from '@/hooks/diets/edit/useEditDiet';
import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';
import { useDeleteDiet } from '@/hooks/diets/delete/useDeleteDiet';

import PatientsAssignedViewer from './components/PatientsAssignedViewer';
import AllowedFoods from './components/sections/allowed/AllowedFoods';
import AllowedLiquids from './components/sections/allowed/AllowedLiquids';
import ForbiddenFoods from './components/sections/forbidden/ForbiddenFoods';
import ForbiddenLiquids from './components/sections/forbidden/ForbiddenLiquids';
import Ingredients from './components/sections/Ingredients';
import Duration from './components/sections/Duration';
import Notes from './components/sections/Notes';
import Instructions from './components/sections/Instructions';
import Benefits from './components/sections/Benefits';
import Description from './components/sections/Description';
import AssignedDate from './components/sections/AssignedDate';
import DoctorName from './components/sections/DoctorName';
import Category from './components/sections/Category';
import GoBackButton from '@/components/shared/diets/GoBackButton';
import DietImage from './components/sections/DietImage';
import Name from './components/sections/Name';
import LoadingState from '@/components/shared/feedback/LoadingState';
import Images from './components/sections/Images';

// Feedback Components
import SuccessModal from '@/components/shared/feedback/SuccessModal';
import DeleteDietButton from './components/DeleteDietButton';
import ErrorState from '@/components/shared/feedback/ErrorState';
import DeleteModal from '@/components/shared/feedback/DeleteModal';

export default function DoctorDietDetail({ params, specialty }) {
  // Router search params
  const searchParams = useSearchParams();

  // Next.js router
  const router = useRouter();

  // Get diet ID from params
  const { id } = params;

  // Fetch all diets Custom Hook
  const { dietsData, isLoading, error, refetch } = useGetAllDiets();
  const refreshDiets = () => {
    refetch();
  };

  // Edit Diet Custom Hook
  const { isLoading: isEditingDiet, error: editError, editDiet } = useEditDiet();

  // Delete Diet Custom Hook
  const { deleteDiet, isDeleting, error: deleteError } = useDeleteDiet();
  const handleDelete = async () => {
    await deleteDiet(id);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      refetch();
      router.push('/doctor/diets');
    }, 1000);
  };

  const diet = dietsData.find((d) => d._id === id);

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const mode = searchParams.get('mode');
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [isReading, setIsReading] = useState(mode !== 'edit');
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Sync when URL changes
  useEffect(() => {
    setIsEditing(mode === 'edit');
    setIsReading(mode !== 'edit');
  }, [mode]);

  // Loading state
  if (isLoading || isEditingDiet) {
    return <LoadingState />;
  }

  // Error state
  if (error || !diet || editError) {
    return <ErrorState />;
  }

  return (
    <div className="bg-beehealth-body-main h-full min-h-full overflow-auto">
      {/* Success Modal */}
      <SuccessModal
        title={isEditing ? 'Dieta editada con éxito' : 'Dieta creada con éxito'}
        message="La información fue guardada correctamente."
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          {/* Go Back Button */}
          <GoBackButton />

          {/* Delete Diet Button */}
          <DeleteDietButton onClickDelete={() => setShowDeleteModal(true)} isLoading={isLoading} />
        </div>

        {/* Hero section with image */}
        {diet?.images?.[0] && <DietImage diet={diet} />}
        {isEditing && (
          <Images
            diet={diet}
            isEditing={isEditing}
            editDiet={editDiet}
            refreshDiets={refreshDiets}
            setShowSuccessModal={setShowSuccessModal}
          />
        )}
      </div>

      {/* Main content */}
      <div className="mx-auto px-0">
        {/* Title section */}
        <div className="mb-8 flex flex-col gap-6">
          <Name
            diet={diet}
            isEditing={isEditing}
            editDiet={editDiet}
            setShowSuccessModal={setShowSuccessModal}
            refreshDiets={refreshDiets}
          />

          {/* Meta info grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {diet?.category && <Category diet={diet} />}

            {/* Doctor Name */}
            {typeof diet?.doctor === 'object' && diet.doctor?.fullName && (
              <DoctorName diet={diet} />
            )}

            {/* Assigned Date */}
            {diet?.createdAt && <AssignedDate diet={diet} />}
          </div>

          {/* Select Patient to assign the diet */}
          {/* <AssignPatientToDiet specialty={specialty} dietId={id} diet={diet} refetch={refetch} /> */}

          {/* Patients assigned to this diet */}
          {/* <PatientsAssignedViewer patients={diet.patients} /> */}
          <PatientsAssignedViewer patients={null} />
        </div>

        {/* Collapse toggle */}
        {isReading && (
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mb-6 rounded-lg px-4 py-2 text-white"
          >
            {isCollapsed ? 'Ocultar dieta' : 'Mostrar dieta'}
          </button>
        )}

        {/* Content sections */}
        {(isEditing || isCollapsed) && (
          <div className="space-y-6">
            {/* Description section */}
            {diet?.description && (
              <Description
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Benefits section */}
            {diet?.benefits && (
              <Benefits
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Instructions section */}
            {diet?.instructions && (
              <Instructions
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Ingredients section */}
            {diet?.ingredients?.length > 0 && (
              <Ingredients
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Allowed foods section */}
            {diet?.allowedFoods?.items?.length > 0 && (
              <AllowedFoods
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Allowed liquids section */}
            {diet?.allowedLiquids?.items?.length > 0 && (
              <AllowedLiquids
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}
            {/* Forbidden foods section */}
            {diet?.forbiddenFoods?.items?.length > 0 && (
              <ForbiddenFoods
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Forbidden liquids section */}
            {diet?.forbiddenLiquids?.items?.length > 0 && (
              <ForbiddenLiquids
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Duration section */}
            {diet?.duration && (
              <Duration
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}

            {/* Medical notes section */}
            {diet?.notes && (
              <Notes
                diet={diet}
                isEditing={isEditing}
                editDiet={editDiet}
                refreshDiets={refreshDiets}
                setShowSuccessModal={setShowSuccessModal}
              />
            )}
          </div>
        )}

        {/* Delete Modal */}
        <DeleteModal
          isOpen={showDeleteModal}
          itemName={diet?.name}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
          successMessage="La dieta ha sido eliminada exitosamente."
          isDeleting={isDeleting}
          title="Eliminar Dieta"
          warningMessage="¿Estás seguro de que deseas eliminar esta dieta?"
          warningDescription="Esta acción es permanente y no podrás recuperar la información."
        />

        {/* Spacing at bottom */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
