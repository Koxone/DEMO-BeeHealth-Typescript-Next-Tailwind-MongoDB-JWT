'use client';

import { X, Dumbbell, AlertCircle, Loader, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

import BasicInfoSection from './components/basic/BasicInfoSection';
import MultimediaSection from './components/multimedia/MultimediaSection';
import DetailsSection from './components/details/DetailsSection';

// Custom Hooks
import { useEditWorkout } from '@/hooks/workouts/edit/useEditWorkout';
import { useModalClose } from '@/hooks/useModalClose';

export default function ModalEditWorkout({
  setShowEditModal,
  editingWorkout,
  setShowSuccessModal,
  fetchWorkouts,
  setWorkoutToDelete,
  setShowDeleteModal,
}) {
  // Edit Workout Custom Hook
  const { editWorkout, isLoading: loading, error } = useEditWorkout();

  // Modal close handler
  const { handleOverlayClick } = useModalClose(() => setShowEditModal(false));

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
  const [form, setForm] = useState({
    patients: [],
    name: '',
    type: '',
    difficulty: '',
    duration: '',
    about: '',
    instructions: '',
    benefits: '',
    cautions: '',
    images: '',
    video: '',
  });

  // Initialize state from editingWorkout
  useEffect(() => {
    if (editingWorkout) {
      setForm({
        patients: editingWorkout.patients || [],
        name: editingWorkout.name || '',
        type: editingWorkout.type || '',
        difficulty: editingWorkout.difficulty || '',
        duration: editingWorkout.duration || '',
        about: editingWorkout.about || '',
        instructions: '',
        benefits: '',
        cautions: '',
        images: '',
        video: editingWorkout.video || '',
      });

      if (editingWorkout.instructions && editingWorkout.instructions.length > 0) {
        setInstructionInputs(editingWorkout.instructions);
      }
      if (editingWorkout.benefits && editingWorkout.benefits.length > 0) {
        setBenefitInputs(editingWorkout.benefits);
      }
      if (editingWorkout.cautions && editingWorkout.cautions.length > 0) {
        setCautionInputs(editingWorkout.cautions);
      }
      if (editingWorkout.images && editingWorkout.images.length > 0) {
        setExistingImages(editingWorkout.images);
      }
    }
  }, [editingWorkout]);

  const [submitError, setSubmitError] = useState(null);

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!form.name.trim()) {
      setSubmitError('El nombre del ejercicio es requerido');
      return;
    }
    if (!form.type) {
      setSubmitError('Selecciona una categoría');
      return;
    }
    if (!form.difficulty) {
      setSubmitError('Selecciona un nivel de dificultad');
      return;
    }
    if (!form.duration) {
      setSubmitError('La duración debe ser mayor a 0');
      return;
    }
    if (!form.about.trim()) {
      setSubmitError('La explicación es requerida');
      return;
    }

    const instructions = instructionInputs.map((i) => i.trim()).filter((i) => i.length > 0);
    const benefits = benefitInputs.map((i) => i.trim()).filter((i) => i.length > 0);
    const cautions = cautionInputs.map((i) => i.trim()).filter((i) => i.length > 0);

    // Upload new images
    const newUploadedImages = await Promise.all(
      imageFiles.map(async (file, idx) => {
        if (!file) return null;
        return await uploadImage(file, idx);
      })
    );
    const validNewImages = newUploadedImages.filter((img) => img !== null);
    const finalImages = [...existingImages, ...validNewImages];

    if (instructions.length === 0) {
      setSubmitError('Debes agregar al menos una instrucción');
      return;
    }
    if (benefits.length === 0) {
      setSubmitError('Debes agregar al menos un beneficio');
      return;
    }
    if (cautions.length === 0) {
      setSubmitError('Debes agregar al menos una precaución');
      return;
    }
    if (finalImages.length === 0) {
      setSubmitError('Debes agregar al menos una imagen');
      return;
    }
    if (!form.video.trim()) {
      setSubmitError('Debes agregar un video');
      return;
    }

    const payload = {
      patients: form.patients,
      name: form.name.trim(),
      type: form.type,
      difficulty: form.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
      duration: Number(form.duration),
      about: form.about.trim(),
      instructions,
      benefits,
      cautions,
      images: finalImages,
      video: form.video.trim(),
    };

    try {
      await editWorkout(editingWorkout._id, payload);
      fetchWorkouts();
      setShowEditModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 1000);
    } catch (err) {
      console.error('Error updating workout:', err);
      setSubmitError(err.message || 'Error al actualizar el ejercicio');
    }
  };

  const getNivelColor = (nivel) => {
    const colors = {
      Beginner: 'bg-green-100 text-green-700 border-green-300',
      Intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      Advanced: 'bg-red-100 text-red-700 border-red-300',
    };
    return colors[nivel] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

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
          <div
            className="bg-beehealth-body-main/80 relative border-b border-red-100 bg-cover bg-center px-6 py-6 backdrop-blur-xl"
            style={{
              backgroundImage: `url(${editingWorkout?.images?.[0]})`,
              backgroundColor: 'rgba(0,0,0,0.60)',
              backgroundBlendMode: 'darken',
            }}
          >
            <div className="relative px-6 py-6 sm:px-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="bg-beehealth-blue-primary-solid absolute inset-0 animate-ping rounded-2xl" />
                    <div
                      className={`bg-beehealth-blue-primary-solid relative rounded-2xl p-3 shadow-lg`}
                    >
                      <Dumbbell className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">
                      Editar {editingWorkout?.name}
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-white">
                      Modifica los detalles del ejercicio según sea necesario.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-red-500"
                >
                  <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-300 relative max-h-[calc(95vh-180px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              {/* Error Messages */}
              {(submitError || error) && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-800">Error</p>
                    <p className="text-sm text-red-700">{submitError || error}</p>
                  </div>
                </div>
              )}

              {/* Basic Info Section */}
              <BasicInfoSection form={form} setForm={setForm} getNivelColor={getNivelColor} />

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
                    setWorkoutToDelete(editingWorkout);
                    setShowEditModal(false);
                    setShowDeleteModal(true);
                  }}
                  className="bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-white transition active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar ejercicio
                </button>

                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={loading}
                  className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="group bg-beehealth-blue-primary-solid hover:shadow-beehealth-blue-primary-solid flex-1 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Dumbbell className="h-5 w-5 transition-transform group-hover:rotate-12" />
                        Guardar Cambios
                      </>
                    )}
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
