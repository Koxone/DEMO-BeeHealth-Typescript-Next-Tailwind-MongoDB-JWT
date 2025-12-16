'use client';

import { useCallback, useEffect, useState } from 'react';
import useAuthStore from '@/zustand/useAuthStore';

// Types
import { CurrentUserData } from '@/types/user/user.types';
import {
  ParsedDescription,
  CalendarEvent,
  NormalizedAppointment,
} from '@/types/appointments/appointments.types';

/* --- Helpers --- */
function parseDescription(desc: string): ParsedDescription {
  if (!desc || typeof desc !== 'string') return {};
  const lines: string[] = desc
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const pick = (label: string): string => {
    const line = lines.find((l: string) => l.toLowerCase().startsWith(label.toLowerCase()));
    if (!line) return '';
    return line.split(':').slice(1).join(':').trim();
  };

  return {
    paciente: pick('Paciente'),
    motivo: pick('Motivo de consulta'),
    telefono: pick('Teléfono'),
    email: pick('Correo'),
    fecha: pick('Fecha'),
    hora: pick('Hora'),
    especialidad: pick('Especialidad'),
    patientId: pick('Paciente ID'),
  };
}

function toTime(dateISO?: string | null): string {
  if (!dateISO) return '';
  const d = new Date(dateISO);
  return d.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Mexico_City',
  });
}

function dateKey(dateISO?: string | null): string {
  if (!dateISO) return '';
  const d = new Date(dateISO);
  return d.toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
}

/* --- Normalizador --- */
function normalizeEvents(
  items: CalendarEvent[],
  specialty: CurrentUserData['specialty']
): NormalizedAppointment[] {
  return (items || []).map((ev: CalendarEvent) => {
    const fields = parseDescription(ev.description || '');
    const startISO = ev.start?.dateTime || ev.start?.date || null;
    const tipo =
      specialty === 'dental'
        ? 'Odontología'
        : specialty === 'weight'
          ? 'Control de Peso'
          : fields.especialidad || 'Consulta';

    return {
      id: ev.id,
      specialty,
      tipo,
      hora: toTime(startISO),
      paciente: fields.paciente || ev.summary || 'Paciente',
      telefono: fields.telefono || '',
      email: fields.email || ev.attendees?.[0]?.email || '',
      motivo: fields.motivo || '',
      startISO,
      _dateKey: dateKey(startISO),
      patientId: fields.patientId || '',
    };
  });
}

/* --- Hook principal --- */
export function useTodayAppointmentsBySpecialty(): {
  appointments: NormalizedAppointment[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const { user } = useAuthStore();

  const [appointments, setAppointments] = useState<NormalizedAppointment[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodayAppointments = useCallback(async () => {
    if (!user || !user.specialty) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/google/calendar/appointments?specialty=${user.specialty}`);

      if (!res.ok) throw new Error('Error al cargar las citas');

      const json: { events: CalendarEvent[] } = await res.json();
      const normalized = normalizeEvents(json.events, user.specialty);

      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
      const todayAppointments = normalized.filter((ev) => ev._dateKey === today);

      setAppointments(todayAppointments);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Error desconocido');
      }
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [user?.specialty]);

  useEffect(() => {
    fetchTodayAppointments();
  }, [fetchTodayAppointments]);

  return { appointments, isLoading, error, refetch: fetchTodayAppointments };
}

// // Google Calendar Custom Hooks
// const { appointments, isLoading, error } = useTodayAppointmentsBySpecialty();
