'use client';

import { useCallback, useEffect, useState } from 'react';

// Types
import {
  ParsedDescription,
  CalendarEvent,
  NormalizedAppointment,
} from '@/types/appointments/appointments.types';
import { CurrentUserData } from '@/types/user/user.types';

// Helpers
function parseDescription(desc?: string): ParsedDescription {
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

// Hook para todas las citas de hoy
export function useAllTodayAppointments(): {
  appointments: NormalizedAppointment[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const [appointments, setAppointments] = useState<NormalizedAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodayAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/google/calendar/appointments/all');

      if (!res.ok) throw new Error('Error al cargar las citas');
      const json: { weightEvents?: CalendarEvent[]; dentalEvents?: CalendarEvent[] } =
        await res.json();

      // Normalizar todas las especialidades
      const weight = normalizeEvents(json.weightEvents || [], 'weight');
      const dental = normalizeEvents(json.dentalEvents || [], 'dental');
      const all = [...weight, ...dental];

      // Fecha local correcta
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
      const todayAppointments = all.filter((ev) => ev._dateKey === today);

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
  }, []);

  useEffect(() => {
    void fetchTodayAppointments();
  }, [fetchTodayAppointments]);

  return { appointments, loading, error, refetch: fetchTodayAppointments };
}

// // Google Calendar Custom Hooks
// const { appointments, loading, error } = useTodayAppointmentsBySpecialty();
