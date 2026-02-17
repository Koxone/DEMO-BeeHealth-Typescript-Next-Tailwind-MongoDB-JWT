'use client';

// Next, React and Other Libraries
import { useState } from 'react';
import { Check, CheckCircle, ShoppingBasket, X } from 'lucide-react';

// UI Components
import BasicInfoSection from './components/BasicInfoSection';
import ImagesSection from './components/ImagesSection';
import DinamicTextSection from './components/DinamicTextSection';
import DynamicListSection from './components/shared/DynamicListSection';

// Enums, Types and Interfaces
import { SaveDietTemplateDTOPresentation } from '@/presentation/types';

// Custom Hooks
import { useCreateDietTemplate } from '@/presentation/hooks/diet';
import { useSuccessModal } from '@/presentation/hooks/shared/';

// Feedback Components
import { SuccessModal } from '@/presentation/ui/pages/main/shared/feedback/';

export default function CreateDietForm() {
  // Create Diet Template using Custom Hook
  const { mutate, isPending, isError, error, isSuccess } = useCreateDietTemplate();

  // Success Modal Handler
  const { title, message, showSuccessModal, handleSuccessModal } = useSuccessModal();

  const [formData, setFormData] = useState<SaveDietTemplateDTOPresentation>({
    name: '',
    category: '',
    description: '',
    benefits: '',
    instructions: '',
    ingredients: [],
    allowedFoods: { items: [], note: '' },
    forbiddenFoods: { items: [], note: '' },
    allowedLiquids: { items: [], note: '' },
    forbiddenLiquids: { items: [], note: '' },
    notes: '',
    images: [],
  });

  // Handle form submission
  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: () => {
        handleSuccessModal('¡Éxito!', 'El plan nutricional se ha creado correctamente.');
      },
    });
  };

  return (
    <div className="bg-beehealth-body-main min-h-full">
      <form className="mx-auto max-w-5xl space-y-8 p-4 md:p-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-700 md:text-4xl">
            Crear Plan Nutricional
          </h1>
          <p className="text-gray-600">
            * Los campos marcados con <span className="text-red-500">*</span> son obligatorios.
          </p>
          <p className="text-beehealth-blue-primary-solid text-sm">
            * Para una mejor experiencia para tus pacientes, completa todos los campos incluyendo
            los opcionales.
          </p>
        </div>

        {/* Basic info section - Required */}
        <BasicInfoSection formData={formData} setFormData={setFormData} />

        {/* Description section - Optional */}
        <DinamicTextSection
          title="Descripción"
          required={false}
          optional={true}
          placeholder="Escribe una descripción del plan nutricional"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        {/* Benefits section - Optional */}
        <DinamicTextSection
          title="Beneficios"
          required={false}
          optional={true}
          placeholder="Escribe los beneficios del plan nutricional"
          value={formData.benefits}
          onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
        />

        {/* Instructions section - Optional */}
        <DinamicTextSection
          title="Instrucciones"
          required={false}
          optional={true}
          placeholder="Escribe las instrucciones del plan nutricional"
          value={formData.instructions}
          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
        />

        {/* Ingredients - Optional */}
        <DynamicListSection
          title="Ingredientes"
          Icon={ShoppingBasket}
          variant="neutral"
          value={formData.ingredients}
          onChange={(e) =>
            setFormData({
              ...formData,
              ingredients: e.target.value,
            })
          }
          placeholder="ej. Pollo, arroz, verduras, etc."
        />

        {/* Allowed Foods - Required */}
        <DynamicListSection
          title="Alimentos Permitidos"
          Icon={CheckCircle}
          optional={false}
          variant="success"
          value={formData.allowedFoods}
          onChange={(e) =>
            setFormData({
              ...formData,
              allowedFoods: {
                ...formData.allowedFoods,
                ...e.target.value,
              },
            })
          }
          placeholder="ej. Pollo a la plancha, ensalada, etc."
        />

        {/* Allowed Liquids - Required */}
        <DynamicListSection
          title="Bebidas Permitidas"
          Icon={CheckCircle}
          variant="success"
          optional={false}
          value={formData.allowedLiquids}
          onChange={(e) =>
            setFormData({
              ...formData,
              allowedLiquids: {
                ...formData.allowedLiquids,
                ...e.target.value,
              },
            })
          }
          placeholder="ej. Agua, té, etc."
        />

        {/* Forbidden Foods - Required */}
        <DynamicListSection
          title="Alimentos Prohibidos"
          Icon={X}
          variant="warning"
          value={formData.forbiddenFoods}
          optional={false}
          onChange={(e) =>
            setFormData({
              ...formData,
              forbiddenFoods: {
                ...formData.forbiddenFoods,
                ...e.target.value,
              },
            })
          }
          placeholder="ej. Pollo frito, comida rápida, etc."
        />

        {/* Forbidden Liquids - Required */}
        <DynamicListSection
          title="Bebidas Prohibidas"
          Icon={X}
          variant="warning"
          value={formData.forbiddenLiquids}
          optional={false}
          onChange={(e) =>
            setFormData({
              ...formData,
              forbiddenLiquids: {
                ...formData.forbiddenLiquids,
                ...e.target.value,
              },
            })
          }
          placeholder="ej. Refrescos, alcohol, etc."
        />

        {/* Medical Notes - Optional */}
        <DinamicTextSection
          title="Notas Médicas"
          required={false}
          optional={true}
          placeholder="Agrega cualquier nota adicional relevante para el plan nutricional"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />

        {/* Images - Optional */}
        <ImagesSection
          images={formData.images}
          setImages={(newImages) => setFormData({ ...formData, images: newImages })}
        />

        {/* Actions */}
        <div className="flex flex-col gap-4 pb-8 sm:flex-row">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95 disabled:opacity-50"
          >
            <Check className="h-5 w-5" />
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            className="hover:bg-beehealth-body-main flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all active:scale-95"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && <SuccessModal title={title} message={message} />}
    </div>
  );
}
