'use client';

import { AlertCircle, X, Calendar, Pill } from 'lucide-react';

/* modal */
export default function DeleteMedSaleModal({ type, item, onCancel, onConfirm }) {
  const isConsulta = type === 'consulta';

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
        onClick={onCancel}
      />

      {/* Modal Container */}
      <div className="animate-slideUp fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-3xl bg-linear-to-br from-white via-gray-50/30 to-purple-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Background Elements */}
          <div
            className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br ${getGradientColor()} opacity-20 blur-3xl`}
          />
          <div
            className={`pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr ${getGradientColor()} opacity-20 blur-3xl`}
          />

          {/* Header */}
          <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-white/50 backdrop-blur-xl">
            <div className={`absolute inset-0 bg-linear-to-r ${getGradientColor()} opacity-10`} />
            <div className="relative flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className={`absolute inset-0 animate-ping rounded-2xl bg-${getAccentColor()}-500 opacity-20`}
                  />
                  <div
                    className={`relative rounded-2xl bg-linear-to-br ${getGradientColor()} p-3 shadow-lg`}
                  >
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Confirmar Eliminación</h2>
              </div>
              <button
                onClick={onCancel}
                className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-red-500"
              >
                <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            <div className="bg-beehealth-body-main/80 mb-6 flex items-center rounded-xl border-2 border-gray-100 p-4 shadow-md backdrop-blur-sm">
              <p className="font-medium text-gray-700">
                ¿Estás seguro de que deseas eliminar{' '}
                {isConsulta ? 'esta consulta médica' : 'esta venta de medicamento'}?
              </p>
            </div>

            {/* Med Info */}
            <div className="bg-beehealth-body-main/80 mb-6 flex items-center gap-3 rounded-xl border-2 border-gray-100 p-4 shadow-md backdrop-blur-sm">
              <div className={`rounded-lg bg-linear-to-br ${getGradientColor()} p-2.5 shadow-sm`}>
                {isConsulta ? (
                  <Calendar className="h-5 w-5 text-white" />
                ) : (
                  <Pill className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {isConsulta
                    ? `${item.paciente} - ${item.hora}`
                    : `${item.nombre} (${item.cantidad} unidades)`}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="group flex-1 rounded-xl bg-linear-to-r from-red-600 to-rose-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/50 active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  Eliminar
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
