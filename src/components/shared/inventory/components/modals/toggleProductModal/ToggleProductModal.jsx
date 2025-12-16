'use client';

import { useEffect } from 'react';
import { Power, X } from 'lucide-react';
import { useModalClose } from '@/hooks/useModalClose';

export default function ToggleProductModal({ item, onClose, onConfirm }) {
  if (!item) return null;

  const isActive = item?.product?.inStock === true;

  const { handleOverlayClick } = useModalClose(onClose);

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`animate-in fade-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl duration-300 ${
          isActive
            ? 'bg-linear-to-br from-white via-green-50/40 to-emerald-50/40'
            : 'bg-linear-to-br from-white via-red-50/40 to-rose-50/40'
        }`}
      >
        {/* Decorative background */}
        <div
          className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full opacity-20 blur-3xl ${
            isActive
              ? 'bg-linear-to-br from-green-500 to-emerald-600'
              : 'bg-linear-to-br from-red-500 to-rose-600'
          }`}
        />
        <div
          className={`pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full opacity-20 blur-3xl ${
            isActive
              ? 'bg-linear-to-tr from-green-500 to-emerald-600'
              : 'bg-linear-to-tr from-red-500 to-rose-600'
          }`}
        />

        {/* Header */}
        <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-white/50 backdrop-blur-xl">
          <div
            className={`absolute inset-0 bg-linear-to-r ${
              isActive ? 'from-green-500 to-emerald-600' : 'from-red-500 to-rose-600'
            } opacity-10`}
          />
          <div className="relative px-6 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Animated Icon */}
                <div className="relative">
                  <div
                    className={`absolute inset-0 animate-ping rounded-2xl opacity-20 ${
                      isActive ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <div
                    className={`relative flex items-center justify-center rounded-2xl p-3 shadow-lg ${
                      isActive
                        ? 'bg-linear-to-br from-green-500 to-emerald-600'
                        : 'bg-linear-to-br from-red-500 to-rose-600'
                    }`}
                  >
                    <Power className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isActive ? 'Desactivar producto' : 'Reactivar producto'}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {isActive
                      ? 'Si desactivas este producto, ya no aparecerá en las listas de inventario ni podrá venderse. Podrás reactivarlo más adelante.'
                      : 'Al reactivar este producto, volverá a estar disponible en el inventario y podrá gestionarse nuevamente.'}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-gray-200"
              >
                <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-gray-800" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative space-y-6 p-6">
          <div className="bg-beehealth-green-primary-light/30 rounded-lg pb-1">
            <p className="text-center text-gray-800">
              ¿Seguro que deseas{' '}
              <span
                className={`animate-pulse text-lg font-semibold ${isActive ? 'text-red-600' : 'text-red-600'}`}
              >
                {isActive ? 'desactivar' : 'reactivar'}
              </span>{' '}
              <span className="font-semibold text-gray-800">
                {item?.product?.name || 'este producto'}
              </span>
              ?
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onClose}
              className="bg-beehealth-body-main flex-1 rounded-xl px-6 py-3.5 font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 ${
                isActive
                  ? 'bg-linear-to-r from-red-600 to-rose-600 hover:shadow-rose-500/40'
                  : 'bg-linear-to-r from-green-600 to-emerald-600 hover:shadow-green-500/40'
              }`}
            >
              {isActive ? 'Sí, desactivar' : 'Sí, reactivar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
