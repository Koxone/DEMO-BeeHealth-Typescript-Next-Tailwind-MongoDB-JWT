'use client';

/* modal */
export default function CancelModal({ cita, onClose, onConfirm, icons }) {
  const { AlertCircle } = icons;
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
          {/* header */}
          <div className="relative overflow-hidden rounded-t-3xl bg-linear-to-r from-rose-600 to-red-600 px-6 py-5">
            <div className="bg-beehealth-body-main/10 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-beehealth-body-main/20 rounded-xl p-2 backdrop-blur-sm">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Cancelar Cita</h2>
                <p className="text-sm text-rose-100">Esta acción no se puede deshacer</p>
              </div>
            </div>
          </div>

          {/* body */}
          <div className="space-y-5 p-6">
            <p className="text-base text-gray-700">
              ¿Estás seguro de que deseas cancelar esta cita?
            </p>

            <div className="rounded-xl border-2 border-gray-200 bg-linear-to-br from-gray-50 to-rose-50 p-5">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-rose-500 to-red-600 font-bold text-white shadow-lg">
                  {cita.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 font-bold text-gray-900">{cita.paciente}</p>
                  <p className="text-sm text-gray-600">
                    {cita.fecha} • {cita.hora}
                  </p>
                </div>
              </div>
              <div className="bg-beehealth-body-main rounded-lg p-3">
                <p className="mb-1 text-xs text-gray-500">Motivo</p>
                <p className="text-sm font-medium text-gray-700">{cita.motivo}</p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                onClick={onClose}
                className="hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 active:scale-95"
              >
                Mantener Cita
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-linear-to-r from-rose-600 to-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-200 hover:from-rose-700 hover:to-red-700 active:scale-95"
              >
                Sí, Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
