'use client';

import { Check, FileText, CheckCircle, ShoppingBasket, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import BasicInfoSection from './components/BasicInfoSection';
import ImagesSection from './components/ImagesSection';
import DinamicTextSection from './components/DinamicTextSection';
import DynamicListSection from './components/shared/DynamicListSection';

// Feedback Components
import SuccessModal from '@/components/shared/feedback/SuccessModal';

// Custom Hook to handle diet creation
import { createDiet } from './services/createDiet';

export default function DietForm() {
  // Local states
  const router = useRouter();

  // Query Client for React Query
  const queryClient = useQueryClient();

  // States for form data
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    duration: '',
    description: '',
    benefits: '',
    instructions: '',
    ingredients: [],
    allowedFoods: {
      items: [],
      note: '',
    },
    forbiddenFoods: {
      items: [],
      note: '',
    },
    allowedLiquids: {
      items: [],
      note: '',
    },
    forbiddenLiquids: {
      items: [],
      note: '',
    },
    notes: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    try {
      const data = await createDiet(formData);
      setMessage('Dieta creada correctamente');
      resetForm();
      setShowSuccessModal(true);
      queryClient.invalidateQueries({ queryKey: ['diets'] });

      setTimeout(() => {
        setShowSuccessModal(false);
        router.push('/doctor/diets');
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      duration: '',
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
  };

  return (
    <div className="bg-beehealth-body-main min-h-full">
      {/* Success Modal */}
      <SuccessModal
        title="Dieta creada con éxito"
        message="La información fue guardada correctamente."
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
      <form className="mx-auto max-w-5xl space-y-8 p-4 md:p-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Crear Plan Nutricional
          </h1>
          <p className="text-gray-600">
            Completa los detalles del nuevo plan dietético para tus pacientes
          </p>
        </div>

        {/* Basic info section */}
        <BasicInfoSection formData={formData} setFormData={setFormData} />

        {/* Description section */}
        <DinamicTextSection
          title="Descripción"
          Icon={FileText}
          optional={false}
          placeholder="Escribe una descripción del plan nutricional"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        {/* Benefits section */}
        <DinamicTextSection
          title="Beneficios"
          Icon={CheckCircle}
          placeholder="Escribe los beneficios del plan nutricional"
          value={formData.benefits}
          onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
        />

        {/* Instructions section */}
        <DinamicTextSection
          title="Instrucciones"
          Icon={Search}
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

        {/* Allowed Foods */}
        <DynamicListSection
          title="Alimentos Permitidos"
          Icon={CheckCircle}
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

        {/* Allowed Liquids */}
        <DynamicListSection
          title="Bebidas Permitidas"
          Icon={CheckCircle}
          variant="success"
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

        {/* Forbidden Foods */}
        <DynamicListSection
          title="Alimentos Prohibidos"
          Icon={X}
          variant="warning"
          value={formData.forbiddenFoods}
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

        {/* Forbidden Liquids */}
        <DynamicListSection
          title="Bebidas Prohibidas"
          Icon={X}
          variant="warning"
          value={formData.forbiddenLiquids}
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

        {/* Medical Notes */}
        <DinamicTextSection
          title="Notas Médicas"
          Icon={FileText}
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
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95 disabled:opacity-50"
          >
            <Check className="h-5 w-5" />
            {loading ? 'Creando...' : 'Crear Plan Dietético'}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={resetForm}
            className="hover:bg-beehealth-body-main flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all active:scale-95"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
