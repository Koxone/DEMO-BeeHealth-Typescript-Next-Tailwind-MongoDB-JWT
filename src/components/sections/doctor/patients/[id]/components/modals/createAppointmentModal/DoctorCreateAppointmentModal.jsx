'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Sparkles, Info, Mail, Phone, Plus } from 'lucide-react';

// Custom Hooks
import { useModalClose } from '@/hooks/useModalClose';
import { useCreateAppointment } from '@/hooks/appointments/useCreateAppointment';

export default function DoctorCreateAppointmentModal({ currentPatientInfo, onClose }) {
  // Modal close handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Create appointment Custom Hook
  const { createAppointment, loading: creating, error: createError } = useCreateAppointment();

  // Local form state
  const [citaForm, setCitaForm] = useState({
    fecha: '',
    hora: '',
    pacienteId: currentPatientInfo?.patient?._id || '',
    paciente: currentPatientInfo?.patient?.fullName || '',
    telefono: currentPatientInfo?.answers?.['14'] || '',
    email: currentPatientInfo?.patient?.email || '',
    motivo: '',
  });

  // Handle form change
  const handleChange = (field, value) => {
    setCitaForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAppointment({
        patientId: currentPatientInfo?.patient?._id,
        patientName: currentPatientInfo?.patient?.fullName,
        date: citaForm.fecha,
        time: citaForm.hora,
        phone: currentPatientInfo?.patient?.phone,
        email: currentPatientInfo?.patient?.email,
        reason: citaForm.motivo,
        specialty: currentPatientInfo?.specialty,
      });
    } catch (err) {
      console.error('Error al crear cita:', err.message);
    }

    onClose();
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal */}
      <div className="relative inset-0 z-50 flex w-full items-center justify-center p-3 sm:p-6">
        <div
          className="animate-in fade-in zoom-in-95 relative max-h-[95vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-linear-to-br from-white via-emerald-50/30 to-teal-50/30 shadow-2xl backdrop-blur-md duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-white/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 opacity-10" />
            <div className="relative px-6 py-6 sm:px-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-emerald-500 opacity-20" />
                    <div className="relative rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 p-3 shadow-lg">
                      <Plus className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      Agendar Nueva Cita
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      Completa los campos para registrar una cita
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
          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-300 relative max-h-[calc(95vh-180px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              {/* Información básica */}
              <div className="bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 p-2.5">
                    <Info className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Información Básica</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Fecha */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Calendar className="h-4 w-4 text-emerald-500" />
                      Fecha
                    </label>
                    <input
                      type="date"
                      required
                      value={citaForm.fecha}
                      onChange={(e) => handleChange('fecha', e.target.value)}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 focus:border-emerald-500 focus:shadow-md focus:shadow-emerald-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Hora */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Clock className="h-4 w-4 text-teal-500" />
                      Hora
                    </label>
                    <input
                      type="time"
                      required
                      value={citaForm.hora}
                      onChange={(e) => handleChange('hora', e.target.value)}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 focus:border-teal-500 focus:shadow-md focus:shadow-teal-500/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Datos del paciente */}
              <div className="bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-green-500 to-emerald-500 p-2.5">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Paciente actual</h3>
                </div>

                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-emerald-600" />
                    {citaForm.paciente || 'Sin nombre registrado'}
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-blue-600" />
                    {citaForm.email || 'Sin correo registrado'}
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-teal-600" />
                    {citaForm.telefono || 'Sin teléfono registrado'}
                  </p>
                </div>
              </div>

              {/* Motivo */}
              <div className="bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-yellow-500 to-orange-500 p-2.5">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Motivo de la Consulta</h3>
                </div>

                <textarea
                  required
                  value={citaForm.motivo}
                  onChange={(e) => handleChange('motivo', e.target.value)}
                  placeholder="Describe el motivo de la cita..."
                  className="bg-beehealth-body-main w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 focus:border-orange-500 focus:shadow-md focus:shadow-orange-500/20 focus:outline-none"
                  rows="4"
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="group flex-1 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 active:scale-95"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Calendar className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    Agendar Cita
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
