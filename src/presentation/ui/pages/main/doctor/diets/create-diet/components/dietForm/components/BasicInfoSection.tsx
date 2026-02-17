// Next, React and Other Libraries
import { Dispatch, SetStateAction } from 'react';

// Enums, Types and Interfaces
import { SaveDietTemplateDTOPresentation } from '@/presentation/types';

// Prop Types
interface BasicInfoSectionProps {
  formData: SaveDietTemplateDTOPresentation;
  setFormData: Dispatch<SetStateAction<SaveDietTemplateDTOPresentation>>;
}

function BasicInfoSection({ formData, setFormData }: BasicInfoSectionProps) {
  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-700">
        <div className="bg-beehealth-blue-primary-solid h-6 w-1 rounded-full"></div>
        Información Básica
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Plan name - Required */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nombre de la dieta
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              className="bg-beehealth-body-main w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: Plan Mediterráneo"
              value={formData.name}
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <p className="mt-1 text-xs text-gray-500">Nombre identificativo del plan</p>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Categoría
            <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.category}
            required
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="bg-beehealth-body-main w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ej: Pérdida de peso, Mantenimiento, Ganancia muscular"
          />
          <p className="mt-1 text-xs text-gray-500">Tipo o categoría del plan</p>
        </div>
      </div>
    </section>
  );
}

export default BasicInfoSection;
