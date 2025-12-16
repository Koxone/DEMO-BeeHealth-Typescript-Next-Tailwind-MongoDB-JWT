'use client';

import { useCallback, useState } from 'react';

// Types
import {
  AppointmentResponse,
  UseCreateAppointmentResult,
  CreateAppointmentParams,
} from '@/types/appointments/appointments.types';

export function useCreateAppointment(): UseCreateAppointmentResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const createAppointment = useCallback(
    async ({
      patientId,
      patientName,
      date,
      time,
      phone = '',
      email = '',
      reason,
      specialty,
    }: CreateAppointmentParams): Promise<AppointmentResponse> => {
      if (!patientName || !date || !time || !reason || !specialty) {
        throw new Error('Faltan campos obligatorios');
      }

      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetch('/api/google/calendar/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patientId,
            patientName,
            specialty,
            date,
            time,
            phone,
            email,
            reason,
          }),
        });

        if (!res.ok) {
          const errJson = await res.json().catch(() => null);
          const msg = errJson?.error || 'No se pudo crear la cita';
          throw new Error(msg);
        }

        const json = await res.json();
        const response: AppointmentResponse = {
          success: true,
          data: json?.data ?? json,
          message: 'Cita creada correctamente',
        };

        setData(response.data);
        return response;
      } catch (e: any) {
        setError(e.message || 'Error desconocido');
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return { createAppointment, loading, error, data, reset };
}

// How to use?:
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     await createAppointment({
//       patientId: currentPatientInfo?.patient?._id,
//       patientName: currentPatientInfo?.patient?.fullName,
//       date: citaForm.fecha,
//       time: citaForm.hora,
//       phone: currentPatientInfo?.patient?.phone,
//       email: currentPatientInfo?.patient?.email,
//       reason: citaForm.motivo,
//       specialty: currentPatientInfo?.specialty,
//     });
//   } catch (err) {
//     console.error('Error al crear cita:', err.message);
//   }

//   onClose();
// };
