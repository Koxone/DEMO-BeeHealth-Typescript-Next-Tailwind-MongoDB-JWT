'use client';

import { useModalClose } from '@/hooks/useModalClose';
import { X, AlertCircle, Apple } from 'lucide-react';
import SharedAssignDiet from '@/components/shared/diets/SharedAssignDiet';

export default function ModalAssignDiet({
  dietToAssign,
  setShowAssignModal,
  setShowSuccessModal,
  refetch,
}) {
  const { handleOverlayClick } = useModalClose(() => setShowAssignModal(false));

  const onSuccess = () => {
    refetch();
    setShowAssignModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1000);
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="relative inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative w-full max-w-2xl overflow-hidden rounded-3xl bg-linear-to-r from-white via-red-50/30 to-orange-50/30 shadow-2xl transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="bg-beehealth-body-main/80 relative border-b border-red-100 bg-cover bg-center px-6 py-6 backdrop-blur-xl"
            style={{
              backgroundImage: `url(${dietToAssign?.images?.[0]})`,
              backgroundColor: 'rgba(0,0,0,0.60)',
              backgroundBlendMode: 'darken',
            }}
          >
            <div className="relative flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Asignar Dieta</h2>
                  <p className="mt-1 text-sm text-white">
                    Selecciona a qué pacientes deseas asignar esta dieta
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAssignModal(false)}
                className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-gray-200"
              >
                <X className="h-5 w-5 text-gray-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            {/* Aviso */}
            <div className="border-beehealth-green-secondary-dark bg-beehealth-green-tertiary-solid mb-6 rounded-xl border-2 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-beehealth-green-secondary-dark mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-beehealth-green-primary-solid text-sm font-semibold">
                    ¿Cómo funciona?
                  </p>
                  <p className="text-beehealth-green-primary-solid mt-1 text-xs">
                    Marca quiénes recibirán esta dieta. Si desmarcas a alguien, la dieta se
                    eliminará de su plan nutricional.
                  </p>
                </div>
              </div>
            </div>

            {/* Dieta */}
            <div className="bg-beehealth-body-main mb-6 overflow-hidden rounded-2xl border-2 border-gray-200 shadow-sm">
              <div className="bg-linear-to-r from-gray-50 to-gray-100 px-4 py-2">
                <p className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  Dieta a asignar
                </p>
              </div>

              <div className="space-y-4 p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-beehealth-green-tertiary-solid rounded-lg p-2">
                    <Apple className="text-beehealth-green-secondary-dark h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-900">{dietToAssign?.name}</p>
                  </div>
                </div>

                <SharedAssignDiet
                  dietId={dietToAssign?._id}
                  diet={dietToAssign}
                  onSuccess={onSuccess}
                />
              </div>
            </div>

            {/* Botón Cancelar */}
            <div className="flex">
              <button
                onClick={() => setShowAssignModal(false)}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95"
              >
                Cancelar
              </button>
            </div>

            {/* Tip */}
            <div className="bg-beehealth-body-main mt-4 flex items-start gap-2 rounded-lg px-3 py-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
              <p className="text-xs text-gray-600">
                Tip: puedes cerrar presionando ESC o haciendo clic fuera del modal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
