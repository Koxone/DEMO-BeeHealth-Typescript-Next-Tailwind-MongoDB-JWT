'use client';

import { useState, FormEvent } from 'react';
import { Dumbbell, Loader } from 'lucide-react';
import { toast } from 'sonner';

// UI Components
import BasicInfoSection from './components/basic/BasicInfoSection';
import MultimediaSection from './components/multimedia/MultimediaSection';
import DetailsSection from '../components/modals/edit/components/details/DetailsSection';
import SharedSectionHeader from '../../../shared/shared-section-header/SharedSectionHeader';
import { ButtonGoBack } from '../../../shared/buttons/Buttons';

// Custom hooks
import { useCreateWorkoutTemplate } from '@/presentation/hooks/workout/';

// Enums, Types and Interfaces
import { WorkoutTemplateDTOPresentation } from '@/presentation/types/workout.types';
import { WorkoutDifficultyEnum, WorkoutCategoryEnum } from '@/domain/enums/';

export default function CreateWorkoutPage() {
  // Multimedia States
  const [uploadingImages, setUploadingImages] = useState({});
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([]);

  const handleAddImageFile = (index: number, file: File) => {
    const newFiles = [...imageFiles];
    newFiles[index] = file;
    setImageFiles(newFiles);
  };

  const handleAddImageButton = () => setImageFiles([...imageFiles, null]);

  const handleRemoveImageFile = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    const newUploading = { ...uploadingImages };
    delete (newUploading as any)[index];
    setUploadingImages(newUploading);
  };

  // Lists States (Instructions, Benefits, Cautions)
  const [instructionInputs, setInstructionInputs] = useState(['']);
  const [benefitInputs, setBenefitInputs] = useState(['']);
  const [cautionInputs, setCautionInputs] = useState(['']);

  const handleInstructionInputChange = (index: number, value: string) => {
    const newInputs = [...instructionInputs];
    newInputs[index] = value;
    setInstructionInputs(newInputs);
  };

  const handleBenefitInputChange = (index: number, value: string) => {
    const newInputs = [...benefitInputs];
    newInputs[index] = value;
    setBenefitInputs(newInputs);
  };

  const handleCautionInputChange = (index: number, value: string) => {
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

  const { mutate, isPending } = useCreateWorkoutTemplate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const finalData = {
      ...form,
      instructions: instructionInputs.filter((i) => i.trim() !== ''),
      benefits: benefitInputs.filter((b) => b.trim() !== ''),
      cautions: cautionInputs.filter((c) => c.trim() !== ''),
    };

    mutate(finalData, {
      onSuccess: () => {
        toast.success('Ejercicio creado correctamente');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Error al crear el ejercicio');
      },
    });
  };

  return (
    <div
      className="animate-in fade-in zoom-in-95 bg-beehealth-body-main relative mx-auto max-h-[95vh] w-full max-w-7xl overflow-hidden rounded-3xl duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      <ButtonGoBack />
      <SharedSectionHeader
        title="Crear Nuevo Ejercicio"
        subtitle="Completa todos los campos para agregar un nuevo ejercicio"
        Icon="workouts"
      />

      <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-300 relative max-h-[calc(95vh-180px)] overflow-y-auto pb-10">
        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          <BasicInfoSection form={form} setForm={setForm} />

          <MultimediaSection
            imageFiles={imageFiles}
            handleAddImageFile={handleAddImageFile}
            handleAddImageButton={handleAddImageButton}
            handleRemoveImageFile={handleRemoveImageFile}
            uploadingImages={uploadingImages}
            form={form}
            setForm={setForm}
          />

          <DetailsSection
            form={form}
            setForm={setForm}
            instructionInputs={instructionInputs}
            handleInstructionInputChange={handleInstructionInputChange}
            handleAddInstructionInput={() => setInstructionInputs([...instructionInputs, ''])}
            handleRemoveInstructionInput={(index) =>
              setInstructionInputs(instructionInputs.filter((_, i) => i !== index))
            }
            benefitInputs={benefitInputs}
            handleBenefitInputChange={handleBenefitInputChange}
            handleAddBenefitInput={() => setBenefitInputs([...benefitInputs, ''])}
            handleRemoveBenefitInput={(index) =>
              setBenefitInputs(benefitInputs.filter((_, i) => i !== index))
            }
            cautionInputs={cautionInputs}
            handleCautionInputChange={handleCautionInputChange}
            handleAddCautionInput={() => setCautionInputs([...cautionInputs, ''])}
            handleRemoveCautionInput={(index) =>
              setCautionInputs(cautionInputs.filter((_, i) => i !== index))
            }
          />

          {/* Actions */}
          <div className="bg-beehealth-body-main/95 flex gap-3 pt-4">
            <button
              type="button"
              disabled={isPending}
              className="bg-beehealth-body-main flex-1 cursor-pointer rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="group bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex-1 cursor-pointer rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-2">
                {isPending ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Creando...
                  </>
                ) : (
                  <>
                    <Dumbbell className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    Crear Ejercicio
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
