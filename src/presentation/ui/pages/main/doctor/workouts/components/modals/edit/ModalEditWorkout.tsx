'use client';

// Next, React and Other Libraries
import { Dumbbell, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

// UI Components
import BasicInfoSection from './components/basic/BasicInfoSection';
import MultimediaSection from './components/multimedia/MultimediaSection';
import DetailsSection from './components/details/DetailsSection';
import WorkoutsModalHeader from '../WorkoutsModalHeader';

// Custom Hooks
import { useModalClose } from '@/presentation/hooks/shared';

// Enums, Types and Interfaces
import { WorkoutDifficultyEnum, WorkoutCategoryEnum } from '@/domain/enums/';
import { WorkoutTemplateDTOPresentation } from '@/presentation/types/workout.types';

// Constants, Mappers and Helpers
import { WorkoutActiveModalConstant } from '@/presentation/constants/workout/workout.constants';

// Prop Types
interface ModalEditWorkoutProps {
  setActiveModal: (modal: WorkoutActiveModalConstant | null) => void;
  selectedWorkout: WorkoutTemplateDTOPresentation | null;
  setSelectedWorkout: (workout: WorkoutTemplateDTOPresentation | null) => void;
  activeModal: WorkoutActiveModalConstant;
}

export default function ModalEditWorkout({
  setActiveModal,
  selectedWorkout,
  setSelectedWorkout,
  activeModal,
}: ModalEditWorkoutProps) {
  // Modal close handler
  const { handleOverlayClick } = useModalClose(() => setActiveModal(null));

  // Upload Images
  const [uploadingImages, setUploadingImages] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const handleAddImageFile = (index, file) => {
    const newFiles = [...imageFiles];
    newFiles[index] = file;
    setImageFiles(newFiles);
  };

  const handleAddImageButton = () => {
    setImageFiles([...imageFiles, null]);
  };

  const handleRemoveImageFile = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    const newUploading = { ...uploadingImages };
    delete newUploading[index];
    setUploadingImages(newUploading);
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  // Image Upload Function
  const uploadImage = async (file, index) => {
    if (!file) return null;

    try {
      setUploadingImages((prev) => ({ ...prev, [index]: true }));

      const filename = `workout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.name}`;
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      setSubmitError('Error al subir la imagen');
      return null;
    } finally {
      setUploadingImages((prev) => ({ ...prev, [index]: false }));
    }
  };

  // Instructions
  const [instructionInputs, setInstructionInputs] = useState(['']);
  const handleAddInstructionInput = () => {
    setInstructionInputs([...instructionInputs, '']);
  };
  const handleRemoveInstructionInput = (index) => {
    setInstructionInputs(instructionInputs.filter((_, i) => i !== index));
  };
  const handleInstructionInputChange = (index, value) => {
    const newInputs = [...instructionInputs];
    newInputs[index] = value;
    setInstructionInputs(newInputs);
  };

  // Benefits
  const [benefitInputs, setBenefitInputs] = useState(['']);
  const handleAddBenefitInput = () => {
    setBenefitInputs([...benefitInputs, '']);
  };
  const handleRemoveBenefitInput = (index) => {
    setBenefitInputs(benefitInputs.filter((_, i) => i !== index));
  };
  const handleBenefitInputChange = (index, value) => {
    const newInputs = [...benefitInputs];
    newInputs[index] = value;
    setBenefitInputs(newInputs);
  };

  // Cautions
  const [cautionInputs, setCautionInputs] = useState(['']);
  const handleAddCautionInput = () => {
    setCautionInputs([...cautionInputs, '']);
  };
  const handleRemoveCautionInput = (index) => {
    setCautionInputs(cautionInputs.filter((_, i) => i !== index));
  };
  const handleCautionInputChange = (index, value) => {
    const newInputs = [...cautionInputs];
    newInputs[index] = value;
    setCautionInputs(newInputs);
  };

  // Form State
  const [form, setForm] = useState<WorkoutTemplateDTOPresentation>({
    patients: [],
    name: '',
    type: '',
    category: WorkoutCategoryEnum.ALL,
    difficulty: WorkoutDifficultyEnum.BEGINNER,
    duration: 0,
    about: '',
    instructions: [],
    benefits: [],
    cautions: [],
    images: [],
    video: '',
  });

  // Initialize state from editingWorkout
  useEffect(() => {
    if (!selectedWorkout) return;

    setForm({
      patients: [],
      name: selectedWorkout.name,
      type: selectedWorkout.type,
      category: selectedWorkout.category,
      difficulty: selectedWorkout.difficulty,
      duration: selectedWorkout.duration,
      about: selectedWorkout.about,
      instructions: selectedWorkout.instructions,
      benefits: selectedWorkout.benefits,
      cautions: selectedWorkout.cautions,
      images: selectedWorkout.images,
      video: selectedWorkout.video,
    });

    setInstructionInputs(
      selectedWorkout.instructions.length > 0 ? selectedWorkout.instructions : ['']
    );

    setBenefitInputs(selectedWorkout.benefits.length > 0 ? selectedWorkout.benefits : ['']);

    setCautionInputs(selectedWorkout.cautions.length > 0 ? selectedWorkout.cautions : ['']);

    setExistingImages(selectedWorkout.images);
  }, [selectedWorkout]);

  const [submitError, setSubmitError] = useState(null);

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal Container */}
      <div className="relative inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        <div
          className="animate-in fade-in zoom-in-95 bg-beehealth-body-main relative max-h-[95vh] w-full overflow-hidden rounded-3xl shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <WorkoutsModalHeader
            selectedWorkout={selectedWorkout}
            setActiveModal={setActiveModal}
            activeModal={activeModal}
          />

          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-300 relative max-h-[calc(95vh-180px)] overflow-y-auto">
            <form className="space-y-6 p-6 sm:p-8">
              {/* Basic Info Section */}
              <BasicInfoSection form={form} setForm={setForm} />

              {/* Multimedia Section */}
              <MultimediaSection
                existingImages={existingImages}
                imageFiles={imageFiles}
                handleAddImageFile={handleAddImageFile}
                handleAddImageButton={handleAddImageButton}
                handleRemoveImageFile={handleRemoveImageFile}
                handleRemoveExistingImage={handleRemoveExistingImage}
                uploadingImages={uploadingImages}
                form={form}
                setForm={setForm}
              />

              {/* Workout Details */}
              <DetailsSection
                form={form}
                setForm={setForm}
                instructionInputs={instructionInputs}
                handleInstructionInputChange={handleInstructionInputChange}
                handleAddInstructionInput={handleAddInstructionInput}
                handleRemoveInstructionInput={handleRemoveInstructionInput}
                benefitInputs={benefitInputs}
                handleBenefitInputChange={handleBenefitInputChange}
                handleAddBenefitInput={handleAddBenefitInput}
                handleRemoveBenefitInput={handleRemoveBenefitInput}
                cautionInputs={cautionInputs}
                handleCautionInputChange={handleCautionInputChange}
                handleAddCautionInput={handleAddCautionInput}
                handleRemoveCautionInput={handleRemoveCautionInput}
              />

              {/* Actions */}
              <div className="flex gap-3">
                {/* Delete Workout Button */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedWorkout(selectedWorkout);
                    setActiveModal('delete');
                  }}
                  className="bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-white transition active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar ejercicio
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="group bg-beehealth-blue-primary-solid hover:shadow-beehealth-blue-primary-solid flex-1 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Dumbbell className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    Guardar Cambios
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
