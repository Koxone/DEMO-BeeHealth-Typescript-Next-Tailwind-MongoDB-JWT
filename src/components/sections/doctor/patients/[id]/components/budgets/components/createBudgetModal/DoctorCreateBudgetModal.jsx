'use client';

import { useState, useEffect } from 'react';
import { X, ClipboardList, Sparkles, DollarSign, FileText, Plus } from 'lucide-react';

export default function DoctorCreateBudgetModal({ onClose }) {
  // Disable scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = '');
  }, []);

  // Form state
  const [budgetForm, setBudgetForm] = useState({
    diagnosis: '',
    other: '',
    doctor: 'MAUREEN ALEXIS ACOSTA MIRELES',
    discount: 0,
    type: '',
    treatments: Array(5).fill(''),
  });

  const handleChange = (field, value) => {
    setBudgetForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTreatmentChange = (index, value) => {
    const updated = [...budgetForm.treatments];
    updated[index] = value;
    setBudgetForm((prev) => ({ ...prev, treatments: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="animate-in fade-in fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        <div
          className="animate-in fade-in zoom-in-95 relative max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-linear-to-br from-white via-purple-50/30 to-indigo-50/30 shadow-2xl backdrop-blur-md duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-white/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-indigo-500 opacity-10" />
            <div className="relative px-6 py-6 sm:px-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-purple-500 opacity-20" />
                    <div className="relative rounded-2xl bg-linear-to-br from-purple-500 to-indigo-500 p-3 shadow-lg">
                      <Plus className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      Agregar Presupuesto
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      Completa los campos para crear un nuevo presupuesto
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

          {/* Form */}
          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-300 relative max-h-[calc(95vh-180px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-8">
              {/* Info básica */}
              <div className="bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-purple-500 to-indigo-500 p-2.5">
                    <ClipboardList className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Información del presupuesto</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                  {/* Diagnóstico */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Diagnóstico</label>
                    <select
                      required
                      value={budgetForm.diagnosis}
                      onChange={(e) => handleChange('diagnosis', e.target.value)}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                    >
                      <option value="">Seleccionar</option>
                      <option>Prevención</option>
                      <option>Operatoria</option>
                      <option>Ortodoncia</option>
                      <option>Parodoncia</option>
                    </select>
                  </div>

                  {/* Otra */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Si eligió otra, especifique
                    </label>
                    <input
                      type="text"
                      value={budgetForm.other}
                      onChange={(e) => handleChange('other', e.target.value)}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Doctor */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Doctor</label>
                    <p className="bg-beehealth-body-main rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-600">
                      {budgetForm.doctor}
                    </p>
                  </div>

                  {/* Descuento */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Descuento (%)</label>
                    <select
                      value={budgetForm.discount}
                      onChange={(e) => handleChange('discount', e.target.value)}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                    >
                      {[0, 10, 20, 30, 40].map((v) => (
                        <option key={v} value={v}>
                          {v}%
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tipo */}
              <div className="bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-indigo-500 to-blue-500 p-2.5">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Tipo y Tratamientos</h3>
                </div>

                <div className="mb-6 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Tipo</label>
                  <select
                    required
                    value={budgetForm.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition focus:border-indigo-500 focus:shadow-md focus:shadow-indigo-500/20 focus:outline-none"
                  >
                    <option value="">Seleccionar</option>
                    <option>Operatoria</option>
                    <option>Ortodoncia</option>
                    <option>Parodoncia</option>
                  </select>
                </div>

                <h4 className="mb-2 text-base font-semibold text-gray-700">Tratamientos</h4>
                <div className="grid grid-cols-5 gap-3">
                  {budgetForm.treatments.map((t, i) => (
                    <select
                      key={i}
                      value={t}
                      onChange={(e) => handleTreatmentChange(i, e.target.value)}
                      className="bg-beehealth-body-main rounded-xl border-2 border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-indigo-500 focus:shadow-md focus:shadow-indigo-500/20 focus:outline-none"
                    >
                      <option>-</option>
                      <option>PROFILAXIS Y FLUOR</option>
                      <option>EXTRACCIÓN SIMPLE</option>
                      <option>CONSULTA REVISIÓN</option>
                      <option>GINGIVECTOMÍA</option>
                    </select>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition hover:border-gray-400 hover:shadow-md active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="group flex-1 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95"
                >
                  <span className="flex items-center justify-center gap-2">
                    <DollarSign className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    Crear Presupuesto
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
