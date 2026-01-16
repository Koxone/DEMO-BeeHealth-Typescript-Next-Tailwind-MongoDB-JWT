'use client';

import { useCancelConsult } from '@/@hooks/consults/delete/useCancelConsult';
import { useModalClose } from '@/@hooks/useModalClose';
import { AlertCircle, X, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function EmployeeDeleteConsultModal({
  item,
  onClose,
  setShowSuccessModal,
  setSuccessModalMessage,
  setSuccessModalTitle,
}) {
  // Modal close handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Cancel Consult using Custom Hook
  const { mutate: cancelConsult } = useCancelConsult();

  // Cancellation Reason Local State
  const [cancellationReason, setCancellationReason] = useState<string>('');

  if (!item) return null;

  // Delete Consult Handler
  const onDelete = () => {
    cancelConsult(
      { consultId: item._id, reason: cancellationReason },
      {
        onSuccess: () => {
          onClose();
          setSuccessModalTitle('Consulta Cancelada');
          setSuccessModalMessage(
            `La consulta de ${item.patient.fullName} ha sido cancelada y los productos vendidos han sido restaurados en el inventario.`
          );
          setShowSuccessModal(true);

          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessModalMessage('');
            setSuccessModalTitle('');
          }, 1000);
        },
      }
    );
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal Container */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onDelete();
        }}
        className="animate-slideUp relative inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="animate-in fade-in zoom-in-95 relative w-full max-w-2xl overflow-hidden rounded-3xl bg-linear-to-br from-white via-gray-50/30 to-purple-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-white/50 backdrop-blur-xl">
            <div className="relative flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="bg-beehealth-blue-primary-solid relative rounded-2xl p-3 shadow-lg">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-700">Eliminar Consulta</h2>
              </div>
              <button
                onClick={onClose}
                className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-red-500"
              >
                <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative flex flex-col gap-4 p-6">
            {/* Information Message */}
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50/80 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Información importante</p>
                  <p className="mt-1 text-xs text-blue-700">
                    Al eliminar esta consulta, los productos vendidos serán restaurados en el
                    inventario, montos asociados y otros datos relacionados serán restaurados. Esta
                    acción no se puede deshacer.
                  </p>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="bg-beehealth-body-main/80 flex items-center gap-3 rounded-xl border-2 border-gray-100 p-4 shadow-md backdrop-blur-sm">
              <div className="bg-beehealth-blue-primary-solid rounded-lg p-2.5 shadow-sm">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">{item?.consultType}</p>
                <p className="text-sm text-gray-600">Paciente: {item?.patient?.fullName}</p>
              </div>
            </div>

            {/* Cost */}
            <div className="rounded-xl border-2 border-gray-200 bg-linear-to-br from-gray-50 to-blue-50">
              <div className="bg-beehealth-body-main rounded-lg p-3">
                <p className="mb-1 text-xs text-gray-500">Costo de la consulta</p>
                <p className="text-beehealth-blue-primary-solid text-2xl font-bold">
                  ${item?.consultPrice.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Items Sold */}
            <div className="rounded-xl border-2 border-gray-200 bg-linear-to-br from-gray-50 to-blue-50">
              <div className="bg-beehealth-body-main rounded-lg p-3">
                <p className="mb-1 text-xs text-gray-500">Productos vendidos</p>

                <div>
                  {item?.itemsSold?.map((med) => (
                    <div
                      key={med?.product?._id}
                      className="mt-2 flex items-center justify-between rounded-lg bg-gray-100/50 px-3 py-2"
                    >
                      <p className="text-sm text-gray-700">{med?.product?.name}</p>
                      <p className="text-sm font-semibold text-gray-800">x{med?.quantity}</p>
                      <p className="text-sm font-semibold text-gray-800">
                        ${(med?.product?.salePrice.toFixed(2) * med?.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className="rounded-xl border-2 border-gray-200 bg-linear-to-br from-gray-50 to-blue-50">
              <div className="bg-beehealth-body-main rounded-lg p-3">
                <p className="mb-1 text-xs text-gray-500">Razón *</p>

                <textarea
                  required
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  rows={4}
                  placeholder="Describe el motivo de la cancelación de la consulta..."
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="group bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover flex-1 rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  Sí, Cancelar Consulta
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
