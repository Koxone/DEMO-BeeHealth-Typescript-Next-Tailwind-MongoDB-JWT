// Reuse the same structure as create to keep consistency

import { Clock, User, DollarSign } from 'lucide-react';

/* Form */
export default function ConsultaForm({ form, setForm }) {
  return (
    <div className="space-y-5">
      {/* Hora */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Clock className="h-4 w-4 text-indigo-500" />
          Hora
        </label>
        <input
          type="time"
          required
          value={form.hora}
          onChange={(e) => setForm({ ...form, hora: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        />
      </div>
      {/* Paciente */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <User className="h-4 w-4 text-purple-500" />
          Paciente
        </label>
        <input
          type="text"
          required
          value={form.paciente}
          onChange={(e) => setForm({ ...form, paciente: e.target.value })}
          placeholder="Nombre del paciente"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        />
      </div>
      {/* Tipo */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Tipo de consulta</label>
        <select
          required
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        >
          <option value="">Seleccionar</option>
          <option value="Primera Consulta">Primera Consulta</option>
          <option value="Consulta General">Consulta General</option>
          <option value="Seguimiento">Seguimiento</option>
          <option value="Urgencia">Urgencia</option>
        </select>
      </div>
      {/* Costo */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          Costo
        </label>
        <input
          type="number"
          required
          min="0"
          step="0.01"
          value={form.costo}
          onChange={(e) => setForm({ ...form, costo: e.target.value })}
          placeholder="800.00"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        />
      </div>
      {/* Pagado */}
      <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={form.pagado}
            onChange={(e) => setForm({ ...form, pagado: e.target.checked })}
            className="h-5 w-5 rounded border-gray-300 text-indigo-600"
          />
          <span className="font-semibold text-indigo-900">Consulta pagada</span>
        </label>
      </div>
    </div>
  );
}
