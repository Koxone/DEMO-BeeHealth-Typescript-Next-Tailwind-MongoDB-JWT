'use client';

import { useEffect } from 'react';
import { Trash2, X } from 'lucide-react';

export default function DeleteProductModal({ item, onClose, onConfirm }) {
  if (!item) return null;

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close when clicking outside the modal
  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay') onClose();
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-in fade-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-3xl bg-linear-to-br from-white via-gray-50/30 to-rose-50/30 shadow-2xl duration-300"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br from-rose-500 to-pink-500 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr from-pink-500 to-rose-600 opacity-20 blur-3xl" />

        {/* Header */}
        <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-white/50 backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-rose-500 to-pink-600 opacity-10" />
          <div className="relative px-6 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Animated Icon */}
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-2xl bg-rose-500 opacity-20" />
                  <div className="relative flex items-center justify-center rounded-2xl bg-linear-to-br from-rose-500 to-pink-600 p-3 shadow-lg">
                    <Trash2 className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Title and subtitle */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Eliminar elemento</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Esta acción no se puede deshacer. El elemento será eliminado permanentemente.
                  </p>
                </div>
              </div>

              {/* Close button */}
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
        <div className="relative space-y-6 p-6">
          <p className="text-center text-gray-800">
            ¿Seguro que deseas eliminar{' '}
            <span className="font-semibold text-rose-600">{item.nombre || item.tipo}</span>?
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onClose}
              className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:shadow-md active:scale-95"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-linear-to-r from-rose-600 to-pink-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40 active:scale-95"
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
