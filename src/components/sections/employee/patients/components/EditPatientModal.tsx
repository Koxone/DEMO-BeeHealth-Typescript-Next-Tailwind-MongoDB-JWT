'use client';

import { X, User } from 'lucide-react';
import { useState } from 'react';

// Custom Hooks
import { useModalClose } from '@/@hooks/useModalClose';

export default function EditPatientModal({
  patient,
  onClose,
  refetch,
  editUser,
  isPending,
  handleSuccess,
}) {
  // Modal close handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Local state
  const [form, setForm] = useState({
    fullName: patient?.fullName || '',
    email: patient?.email || '',
    phone: patient?.phone || '',
    initialWeight: patient?.initialWeight || '',
    initialSize: patient?.initialSize || '',
  });

  // Handlers
  const handleChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    editUser(
      {
        userId: patient._id,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        initialWeight: form.initialWeight,
        initialSize: form.initialSize,
      },
      {
        onSuccess: () => {
          refetch();
          handleSuccess(
            'Paciente actualizado',
            'La información del paciente ha sido actualizada correctamente.'
          );
          onClose();
        },
        onError: (error) => {
          console.error('Error al actualizar paciente:', error);
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
      {/* Modal */}
      <div
        className="bg-beehealth-body-main relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-gray-100 backdrop-blur-xl">
          <div className="relative px-6 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="bg-beehealth-blue-primary-solid relative flex items-center justify-center rounded-2xl p-3 shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-700">Editar Paciente</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Actualiza la información del paciente
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isPending}
                className="group rounded-xl bg-gray-100 p-2 transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-5 w-5 text-gray-600 transition-all duration-200 ease-in-out group-hover:rotate-90 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-beehealth-body-main/80 space-y-4 rounded-2xl border border-gray-100 p-5 shadow-lg backdrop-blur-sm">
              {/* Full Name */}
              <div className="grid gap-1">
                <label className="text-sm font-semibold text-gray-600">Nombre Completo</label>
                <input
                  maxLength={100}
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Ej. Juan Pérez García"
                  className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 capitalize outline-none focus:border-blue-500"
                  disabled={isPending}
                />
              </div>

              {/* Email */}
              <div className="grid gap-1">
                <label className="text-sm font-semibold text-gray-600">Correo Electrónico</label>
                <input
                  maxLength={100}
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Ej. juan.perez@email.com"
                  className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  disabled={isPending}
                />
              </div>

              {/* Phone */}
              <div className="grid gap-1">
                <label className="text-sm font-semibold text-gray-600">Teléfono</label>
                <input
                  maxLength={15}
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Ej. 5512345678"
                  className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  disabled={isPending}
                />
              </div>

              {/* Initial Weight */}
              <div className="grid gap-1">
                <label className="text-sm font-semibold text-gray-600">Peso Inicial</label>
                <input
                  maxLength={15}
                  type="tel"
                  required
                  value={form.initialWeight}
                  onChange={(e) => handleChange('initialWeight', e.target.value)}
                  placeholder="Ej. 5512345678"
                  className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  disabled={isPending}
                />
              </div>

              {/* Initial Size */}
              <div className="grid gap-1">
                <label className="text-sm font-semibold text-gray-600">Talla Inicial</label>
                <input
                  maxLength={15}
                  type="tel"
                  required
                  value={form.initialSize}
                  onChange={(e) => handleChange('initialSize', e.target.value)}
                  placeholder="Ej. 5512345678"
                  className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex-1 rounded-xl px-6 py-3.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? 'Actualizando...' : 'Actualizar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
