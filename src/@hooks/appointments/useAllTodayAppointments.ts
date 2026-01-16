'use client';

import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Types
import {
  ParsedDescription,
  CalendarEvent,
  NormalizedAppointment,
} from '@/@types/appointments/appointments.types';
import { CurrentUserData } from '@/@types/user/user.types';

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

/* --- Fetcher --- */
async function fetchAllTodayAppointments(): Promise<NormalizedAppointment[]> {
  const res = await fetch('/api/google/calendar/appointments/all');

  if (!res.ok) throw new Error('Error al cargar las citas');

  const json: { weightEvents?: CalendarEvent[]; dentalEvents?: CalendarEvent[] } = await res.json();

  // Normalizar todas las especialidades
  const weight = normalizeEvents(json.weightEvents || [], 'weight');
  const dental = normalizeEvents(json.dentalEvents || [], 'dental');
  const all = [...weight, ...dental];

  // Fecha local correcta
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
  return all.filter((ev) => ev._dateKey === today);
}

/* --- Hook principal --- */
export function useAllTodayAppointments(): {
  appointments: NormalizedAppointment[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['allTodayAppointments'],
    queryFn: fetchAllTodayAppointments,
  });

  const refetch = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['allTodayAppointments'] });
  }, [queryClient]);

  return {
    appointments: data || [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
}

// Usage example:
// const { appointments, loading, error, refetch } = useAllTodayAppointments();
