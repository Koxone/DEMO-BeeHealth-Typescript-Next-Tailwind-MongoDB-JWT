import React from 'react';

function BasicInfoSection({ formData, setFormData }) {
  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <div className="h-6 w-1 rounded-full bg-blue-600"></div>
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
              className="bg-beehealth-body-main w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: Plan Mediterráneo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <p className="mt-1 text-xs text-gray-500">Nombre identificativo del plan</p>
          </div>

          {/* Duration - Optional */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Duración
              <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="bg-beehealth-body-main w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ej: 30 días, 4 semanas"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Duración recomendada del plan</p>
          </div>
        </div>

        {/* Category - Optional */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Categoría
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="bg-beehealth-body-main w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ej: Pérdida de peso, Mantenimiento, Ganancia muscular"
          />
          <p className="mt-1 text-xs text-gray-500">Tipo o categoría del plan</p>
        </div>
      </div>
    </section>
  );
}

export default BasicInfoSection;
