'use client';

import { useModalClose } from '@/hooks/useModalClose';
import { AlertCircle, Trash2, X, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { useState } from 'react';

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  title = 'Eliminar Registro',
  itemName,
  itemBadges = [],
  warningMessage = '¿Estás seguro de que deseas eliminar este registro?',
  warningDescription = 'Esta acción es permanente y no podrás recuperar la información.',
  successMessage,
  isDeleting,
}) {
  const [isDeleted, setIsDeleted] = useState(false);

  const { handleOverlayClick } = useModalClose(onClose);

  if (!isOpen) return null;

  const handleDeleteWithFeedback = async () => {
    try {
      await onDelete();
      onClose();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="relative inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-3xl bg-linear-to-r from-white via-red-50/30 to-orange-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Background */}
          <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-r from-red-400/20 to-orange-400/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr from-rose-400/20 to-red-400/20 blur-3xl" />

          {/* Header */}
          <div className="bg-beehealth-body-main/80 relative border-b border-red-100 backdrop-blur-xl">
            <div className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 opacity-5" />
            <div className="relative px-6 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    {!isDeleted && (
                      <div className="absolute inset-0 animate-ping rounded-2xl bg-red-500 opacity-20" />
                    )}
                    <div
                      className={`relative rounded-2xl p-3 shadow-lg transition-all duration-300 ${
                        isDeleted
                          ? 'bg-linear-to-r from-green-500 to-emerald-600'
                          : 'bg-linear-to-r from-red-500 to-orange-600'
                      }`}
                    >
                      {isDeleted ? (
                        <CheckCircle className="h-7 w-7 text-white" />
                      ) : isDeleting ? (
                        <Loader className="h-7 w-7 animate-spin text-white" />
                      ) : (
                        <AlertTriangle className="h-7 w-7 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {isDeleted ? '¡Eliminado!' : title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      {isDeleted
                        ? 'El registro ha sido eliminado exitosamente'
                        : 'Esta acción no se puede deshacer'}
                    </p>
                  </div>
                </div>
                {!isDeleting && (
                  <button
                    onClick={onClose}
                    className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-gray-200"
                  >
                    <X className="h-5 w-5 text-gray-600 transition-colors" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            {!isDeleted ? (
              <>
                {/* Warning */}
                <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50/80 p-4 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                    <div>
                      <p className="text-sm font-semibold text-red-900">{warningMessage}</p>
                      <p className="mt-1 text-xs text-red-700">{warningDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Item Info */}
                <div className="bg-beehealth-body-main mb-6 overflow-hidden rounded-2xl border-2 border-gray-200 shadow-sm">
                  <div className="bg-linear-to-r from-gray-50 to-gray-100 px-4 py-2">
                    <p className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                      Registro a eliminar
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-red-100 p-2">
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-bold text-gray-900">{itemName}</p>
                        {itemBadges.length > 0 && (
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {itemBadges.map((badge, index) => (
                              <span
                                key={index}
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
                              >
                                {badge.label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteWithFeedback}
                    disabled={isDeleting}
                    className="group flex-1 rounded-xl bg-linear-to-r from-red-500 to-orange-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isDeleting ? (
                        <>
                          <Loader className="h-4 w-4 animate-spin" />
                          Eliminando...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
                          Eliminar
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Tip */}
                <div className="bg-beehealth-body-main mt-4 flex items-start gap-2 rounded-lg px-3 py-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                  <p className="text-xs text-gray-600">
                    Tip: Puedes cancelar presionando{' '}
                    <kbd className="bg-beehealth-body-main rounded border px-1.5 py-0.5 text-xs font-semibold shadow-sm">
                      ESC
                    </kbd>{' '}
                    o haciendo clic fuera del modal.
                  </p>
                </div>
              </>
            ) : (
              <div className="py-4 text-center">
                <p className="text-sm text-gray-700">
                  {successMessage || (
                    <>
                      El registro <span className="font-bold">{itemName}</span> ha sido eliminado
                      correctamente.
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
