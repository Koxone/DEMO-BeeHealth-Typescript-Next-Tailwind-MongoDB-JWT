'use client';

import { X, Plus, Weight, FileText, AlertCircle } from 'lucide-react';

export default function AddRecordModal({ peso, notas, setPeso, setNotas, onClose, onSave }) {
  return (
    <>
      <div
        className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp bg-beehealth-body-main pointer-events-auto w-full max-w-md rounded-3xl border border-gray-100 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del modal */}
          <div className="relative overflow-hidden rounded-t-3xl bg-linear-to-r from-purple-600 to-pink-600 px-6 py-5">
            <div className="bg-beehealth-body-main/10 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-beehealth-body-main/20 rounded-xl p-2 backdrop-blur-sm">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Agregar Registro</h3>
                  <p className="text-sm text-purple-100">Nueva medición</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-beehealth-body-main/20 rounded-xl p-2 transition-all duration-200"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Contenido */}
          <form
            className="space-y-5 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
            }}
          >
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                <Weight className="h-4 w-4 text-purple-600" />
                Peso (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Ej: 75.5"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-lg font-semibold transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                <FileText className="h-4 w-4 text-purple-600" />
                Notas (opcional)
              </label>
              <textarea
                rows="4"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Ej: Progreso excelente, mantener rutina actual..."
                className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
              ></textarea>
            </div>

            <div className="rounded-lg border-l-4 border-blue-500 bg-linear-to-br from-blue-50 to-indigo-50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <p className="mb-1 text-sm font-semibold text-blue-900">Consejo</p>
                  <p className="text-sm text-blue-800">
                    Para mejores resultados, mídete siempre a la misma hora del día
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 active:scale-95"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-200 hover:from-purple-700 hover:to-pink-700 active:scale-95"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
