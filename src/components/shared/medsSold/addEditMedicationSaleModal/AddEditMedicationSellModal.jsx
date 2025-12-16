'use client';

import {
  X,
  Calendar,
  User,
  DollarSign,
  Clock,
  Pill,
  Package,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import useStateFromEditing from './hooks/useStateFromEditing';

export default function AddEditMedicationSellModal({
  type,
  editingItem,
  onClose,
  onSaveConsulta,
  onSaveMedicamento,
}) {
  /* Local states */
  const isConsulta = type === 'consulta';
  const [form, setForm] = useStateFromEditing(type, editingItem);

  /* Handlers */
  const onSubmit = (e) => {
    e.preventDefault();
    if (isConsulta) {
      onSaveConsulta(form);
    } else {
      onSaveMedicamento(form);
    }
  };

  const getGradientColor = () => {
    return isConsulta ? 'from-blue-500 to-indigo-500' : 'from-green-500 to-emerald-500';
  };

  const getAccentColor = () => {
    return isConsulta ? 'blue' : 'green';
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="animate-in fade-in fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      <div className="animate-slideUp fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative w-full max-w-lg overflow-hidden rounded-3xl bg-linear-to-br from-white via-gray-50/30 to-purple-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background elements */}
          <div
            className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br ${getGradientColor()} opacity-20 blur-3xl`}
          />
          <div
            className={`pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr ${getGradientColor()} opacity-20 blur-3xl`}
          />

          {/* Header */}
          <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-white/50 backdrop-blur-xl">
            <div className={`absolute inset-0 bg-linear-to-r ${getGradientColor()} opacity-10`} />
            <div className="relative px-6 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 animate-ping rounded-2xl bg-${getAccentColor()}-500 opacity-20`}
                    />
                    <div
                      className={`relative rounded-2xl bg-linear-to-br ${getGradientColor()} p-3 shadow-lg`}
                    >
                      {isConsulta ? (
                        <Calendar className="h-6 w-6 text-white" />
                      ) : (
                        <Pill className="h-6 w-6 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingItem ? 'Editar Venta de' : 'Venta de'}{' '}
                      {isConsulta ? 'Consulta' : 'Medicamento'}
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      {editingItem
                        ? 'Actualiza la información'
                        : 'Completa todos los campos requeridos'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-red-500"
                >
                  <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative max-h-[calc(90vh-180px)] overflow-y-auto p-6">
            {isConsulta ? (
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Consult */}
                <div className="bg-beehealth-body-main/80 space-y-4 rounded-2xl border border-gray-100 p-5 shadow-lg backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <div className="rounded-lg bg-linear-to-br from-blue-500 to-indigo-500 p-1.5">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Información de la Consulta</h3>
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Hora
                    </label>
                    <input
                      type="time"
                      required
                      value={form.hora}
                      onChange={(e) => setForm({ ...form, hora: e.target.value })}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Patient */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <User className="h-4 w-4 text-purple-500" />
                      Paciente
                    </label>
                    <select
                      required
                      value={form.paciente}
                      onChange={(e) => setForm({ ...form, paciente: e.target.value })}
                      className="bg-beehealth-body-main w-full appearance-none rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                    >
                      <option value="">Seleccionar paciente...</option>
                      <option value="Juan Pérez">Juan Pérez</option>
                      <option value="María López">María López</option>
                      <option value="Carlos Ruiz">Carlos Ruiz</option>
                      <option value="Ana Martínez">Ana Martínez</option>
                      <option value="Pedro García">Pedro García</option>
                    </select>
                  </div>

                  {/* Consult Type */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Sparkles className="h-4 w-4 text-indigo-500" />
                      Tipo de Consulta
                    </label>
                    <select
                      required
                      value={form.tipo}
                      onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:shadow-md focus:shadow-indigo-500/20 focus:outline-none"
                    >
                      <option value="">Seleccionar tipo...</option>
                      <option value="Primera Consulta">🆕 Primera Consulta</option>
                      <option value="Consulta General">📋 Consulta General</option>
                      <option value="Seguimiento">🔄 Seguimiento</option>
                      <option value="Urgencia">🚨 Urgencia</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      Costo
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={form.costo}
                      onChange={(e) => setForm({ ...form, costo: e.target.value })}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-green-500 focus:shadow-md focus:shadow-green-500/20 focus:outline-none"
                      placeholder="800.00"
                    />
                  </div>

                  {/* Payment Status */}
                  <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={form.pagado}
                        onChange={(e) => setForm({ ...form, pagado: e.target.checked })}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">Consulta pagada</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm hover:border-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="group flex-1 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg hover:scale-105 hover:shadow-blue-500/50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {editingItem ? 'Actualizar' : 'Guardar'}
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              /* Meds */
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="bg-beehealth-body-main/80 space-y-4 rounded-2xl border border-gray-100 p-5 shadow-lg backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <div className="rounded-lg bg-linear-to-br from-green-500 to-emerald-500 p-1.5">
                      <Pill className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Información del Medicamento</h3>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Pill className="h-4 w-4 text-green-500" />
                      Medicamento
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-green-500 focus:shadow-green-500/20 focus:outline-none"
                      placeholder="Nombre del medicamento"
                    />
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Package className="h-4 w-4 text-blue-500" />
                      Cantidad
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={form.cantidad}
                      onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:shadow-blue-500/20 focus:outline-none"
                      placeholder="1"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      Precio Unitario
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={form.precioUnitario}
                      onChange={(e) => setForm({ ...form, precioUnitario: e.target.value })}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:shadow-emerald-500/20 focus:outline-none"
                      placeholder="150.00"
                    />
                  </div>

                  {/* Select Patient */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <User className="h-4 w-4 text-purple-500" />
                      Paciente
                    </label>
                    <select
                      required
                      value={form.paciente}
                      onChange={(e) => setForm({ ...form, paciente: e.target.value })}
                      className="bg-beehealth-body-main w-full appearance-none rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:shadow-purple-500/20 focus:outline-none"
                    >
                      <option value="">Seleccionar paciente...</option>
                      <option value="Juan Pérez">Juan Pérez</option>
                      <option value="María López">María López</option>
                      <option value="Carlos Ruiz">Carlos Ruiz</option>
                      <option value="Ana Martínez">Ana Martínez</option>
                      <option value="Pedro García">Pedro García</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm hover:border-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="group flex-1 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg hover:scale-105 hover:shadow-emerald-500/50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Pill className="h-5 w-5" />
                      {editingItem ? 'Actualizar' : 'Guardar'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
