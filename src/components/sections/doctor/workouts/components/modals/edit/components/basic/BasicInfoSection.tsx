import { Info, Sparkles, Clock, Dumbbell, TrendingUp } from 'lucide-react';

function BasicInfoSection({ form, setForm, getNivelColor }) {
  return (
    <div className="group bg-beehealth-body-main/80 border-beehealth-blue-primary-solid rounded-2xl border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-beehealth-blue-primary-solid rounded-xl p-2.5">
          <Info className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Información Básica</h3>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Dumbbell className="text-beehealth-blue-primary-dark h-4 w-4" />
            Nombre del Ejercicio
          </label>
          <input
            type="text"
            placeholder="Ej: Sentadillas con Peso"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400"
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
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="bg-beehealth-body-main w-full appearance-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
            >
              <option value="">Selecciona una categoría</option>
              <option value="Fuerza">Fuerza</option>
              <option value="Cardio">Cardio</option>
              <option value="Core">Core</option>
              <option value="Flexibilidad">Flexibilidad</option>
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
            placeholder="Ej: 30"
            min="1"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400"
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
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className={`w-full appearance-none rounded-xl border-2 px-4 py-3.5 font-semibold shadow-sm transition-all duration-300 focus:shadow-md focus:outline-none ${getNivelColor(form.difficulty)}`}
            >
              <option value="">Selecciona un nivel</option>
              <option value="Beginner">Principiante</option>
              <option value="Intermediate">Intermedio</option>
              <option value="Advanced">Avanzado</option>
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

export default BasicInfoSection;
