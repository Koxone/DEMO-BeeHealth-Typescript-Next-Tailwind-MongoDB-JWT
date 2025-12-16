'use client';

import { X, Target, FileText } from 'lucide-react';
import { useState } from 'react';

// Custom Hooks
import { useModalClose } from '@/hooks/useModalClose';
import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';
import { useGetAllWorkouts } from '@/hooks/workouts/get/useGetAllWorkouts';
import { useGetPatientWeightLogs } from '@/hooks/clinicalRecords/get/useGetPatientWeightLogs';

export default function CreateGoalModal({ onClose, patient }) {
  // Modal close handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Fetch Diets Custom Hook
  const {
    dietsData,
    isLoading: dietsLoading,
    error: dietsError,
    refetch: refetchDiets,
  } = useGetAllDiets();

  // Fetch Workouts Custom Hook
  const {
    workoutData,
    isLoading: workoutsLoading,
    error: workoutsError,
    refetch: refetchWorkouts,
  } = useGetAllWorkouts();

  // Fetch Patient Weight Logs Custom Hook
  const {
    weightLogs,
    loading: weightLogsLoading,
    error: weightLogsError,
    refetch: refetchWeightLogs,
  } = useGetPatientWeightLogs(patient._id);

  // Local state
  const [form, setForm] = useState({
    patientId: '',
    goalType: '',
    targetValue: '',
    currentValue: '',
    deadline: '',
    notes: '',
    selectedDiet: '',
    selectedExercise: '',
  });

  const goalTypes = [
    { value: 'weight', label: 'Pérdida de Peso' },
    { value: 'diet', label: 'Plan de Dieta' },
    { value: 'workout', label: 'Plan de Ejercicio' },
    { value: 'custom', label: 'Meta Personalizada' },
  ];

  // Handlers
  const handleChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Goal data:', form);
    // Add your submit logic here
    onClose();
  };

  const renderDynamicField = () => {
    // Weight Section
    if (form.goalType === 'weight') {
      return (
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-gray-600">Peso Actual (kg)</label>
            <input
              type="number"
              step="0.1"
              readOnly
              value={weightLogs[0]?.currentWeight}
              onChange={(e) => handleChange('currentValue', e.target.value)}
              placeholder="Ej. 80.5"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-gray-600">Peso Meta (kg)</label>
            <input
              type="number"
              step="0.1"
              required
              value={form.targetValue}
              onChange={(e) => handleChange('targetValue', e.target.value)}
              placeholder="Ej. 70.0"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
            />
          </div>
        </div>
      );
    }

    // Diet Section
    if (form.goalType === 'diet') {
      return (
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-gray-600">Seleccionar Plan de Dieta</label>
          <select
            required
            value={form.selectedDiet}
            onChange={(e) => handleChange('selectedDiet', e.target.value)}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
          >
            <option value="">-- Selecciona una dieta --</option>
            {dietsData?.map((diet) => (
              <option key={diet._id} value={diet._id}>
                {diet.name}
              </option>
            ))}
          </select>

          <div className="mt-4 grid gap-1">
            <label className="text-sm font-semibold text-gray-600">Descripción de la Meta</label>
            <textarea
              required
              value={form.targetValue}
              onChange={(e) => handleChange('targetValue', e.target.value)}
              placeholder="Ej. Reducir consumo de azúcar a menos de 25g diarios"
              rows={3}
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
            />
          </div>
        </div>
      );
    }

    // Workout Section
    if (form.goalType === 'workout') {
      return (
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-gray-600">
            Seleccionar Plan de Ejercicio
          </label>
          <select
            required
            value={form.selectedExercise}
            onChange={(e) => handleChange('selectedExercise', e.target.value)}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
          >
            <option value="">-- Selecciona un plan --</option>
            {workoutData?.map((exercise) => (
              <option key={exercise._id} value={exercise._id}>
                {exercise.name}
              </option>
            ))}
          </select>

          <div className="mt-4 grid gap-1">
            <label className="text-sm font-semibold text-gray-600">Descripción de la Meta</label>
            <textarea
              required
              value={form.targetValue}
              onChange={(e) => handleChange('targetValue', e.target.value)}
              placeholder="Ej. Reducir consumo de azúcar a menos de 25g diarios"
              rows={3}
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
            />
          </div>
        </div>
      );
    }

    // Custom Goal Section
    if (form.goalType === 'custom') {
      return (
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-gray-600">Descripción de la Meta</label>
          <textarea
            required
            value={form.targetValue}
            onChange={(e) => handleChange('targetValue', e.target.value)}
            placeholder="Ej. Reducir consumo de azúcar a menos de 25g diarios"
            rows={3}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal */}
      <div
        className="bg-beehealth-body-main relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-beehealth-blue-primary-solid relative overflow-hidden px-6 py-6">
          <div className="bg-beehealth-body-main/10 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-beehealth-body-main/20 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Crear meta personalizada</h2>
                <p className="text-sm text-blue-100">Llena todos los campos</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-beehealth-body-main/20 hover:bg-beehealth-body-main/30 rounded-xl p-2 backdrop-blur-sm transition active:scale-95"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-beehealth-body-main/80 space-y-4 rounded-2xl border border-gray-100 p-5 shadow-lg backdrop-blur-sm">
              {/* Patient Selection */}
              <div className="grid gap-1">
                <label className="text-sm font-semibold text-gray-600">Paciente</label>
                <input
                  type="text"
                  name="patientId"
                  required
                  value={patient?.fullName || ''}
                  onChange={(e) => handleChange('patientId', patient?._id)}
                  placeholder="Paciente"
                  className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
                  readOnly
                />
              </div>

              {/* Goal Type */}
              <div className="grid gap-1">
                <label className="text-sm font-semibold text-gray-600">Tipo de Meta</label>
                <select
                  required
                  value={form.goalType}
                  onChange={(e) => handleChange('goalType', e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
                >
                  <option value="">-- Selecciona el tipo --</option>
                  {goalTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Field */}
              {form.goalType && renderDynamicField()}

              {/* Notes */}
              {form.goalType && (
                <div className="grid gap-1">
                  <label className="text-sm font-semibold text-gray-600">
                    Notas Adicionales (opcional)
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Ej. Consultar cada 2 semanas para seguimiento"
                    rows={3}
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover hover:shadow-beehealth-blue-secondary-solid flex-1 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg"
              >
                Crear Meta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
