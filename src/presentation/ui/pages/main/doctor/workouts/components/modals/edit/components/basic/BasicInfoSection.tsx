// Next, React and Other Libraries
import { Info, Sparkles, Clock, Dumbbell, TrendingUp } from 'lucide-react';

// Enums, Types and Interfaces
import { WorkoutDifficultyEnum, WorkoutCategoryEnum } from '@/domain/enums/';
import { WorkoutTemplateDTOPresentation } from '@/presentation/types/workout.types';

// Constants, Mappers and Helpers
import { WorkoutCategoryLabelMap } from '@/presentation/services/workout/workoutCategoryMapper';
import { WorkoutDifficultyLabelMap } from '@/presentation/services/workout/workoutDifficultyMapper';

// Prop Types
interface BasicInfoSectionProps {
  form: WorkoutTemplateDTOPresentation;
  setForm: (form: WorkoutTemplateDTOPresentation) => void;
}

export default function BasicInfoSection({ form, setForm }: BasicInfoSectionProps) {
  return (
    <div className="group bg-beehealth-body-main/80 border-beehealth-blue-primary-solid rounded-2xl border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-beehealth-blue-primary-solid rounded-xl p-2.5">
          <Info className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">Información Básica</h3>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Dumbbell className="text-beehealth-blue-primary-dark h-4 w-4" />
            Nombre del Ejercicio
          </label>
          <input
            maxLength={250}
            type="text"
            placeholder="Ej: Sentadillas con Peso"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-700 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Sparkles className="text-beehealth-blue-primary-dark h-4 w-4" />
            Categoría
          </label>
          <div className="relative">
            <select
              value={form.category}
              className="bg-beehealth-body-main w-full appearance-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-700 shadow-sm transition-all duration-300 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value as WorkoutCategoryEnum,
                })
              }
            >
              <option value="">Selecciona una categoría</option>

              {Object.values(WorkoutCategoryEnum)
                .filter((value) => value !== WorkoutCategoryEnum.ALL)
                .map((category) => (
                  <option key={category} value={category}>
                    {WorkoutCategoryLabelMap[category]}
                  </option>
                ))}
            </select>

            <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Clock className="text-beehealth-blue-primary-dark h-4 w-4" />
            Duración (minutos)
          </label>
          <input
            type="number"
            min="1"
            value={form.duration}
            onChange={(e) =>
              setForm({
                ...form,
                duration: Number(e.target.value),
              })
            }
            className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-700 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Difficulty Level */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <TrendingUp className="text-beehealth-blue-primary-dark h-4 w-4" />
            Nivel de Dificultad
          </label>
          <div className="relative">
            <select
              value={form.difficulty}
              className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3.5 font-semibold text-gray-800 shadow-sm transition-all duration-300 focus:shadow-md focus:outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  difficulty: e.target.value as WorkoutDifficultyEnum,
                })
              }
            >
              <option value="">Selecciona un nivel</option>

              {Object.values(WorkoutDifficultyEnum).map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {WorkoutDifficultyLabelMap[difficulty]}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
