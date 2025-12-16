'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

/* Parse fields */
function parseDescription(desc) {
  if (!desc || typeof desc !== 'string') return {};
  const lines = desc
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const pick = (label) => {
    const line = lines.find((l) => l.toLowerCase().startsWith(label.toLowerCase()));
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
    pacienteId: pick('Paciente ID'),
  };
}

/* Time helpers */
function toTime(dateISO) {
  if (!dateISO) return '';
  const d = new Date(dateISO);
  return d.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Mexico_City',
  });
}

function dateKey(dateISO) {
  if (!dateISO) return '';
  const d = new Date(dateISO);
  return d.toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
}

/* Normalizer */
function normalizeEvents(items, specialty) {
  return (items || []).map((ev) => {
    const fields = parseDescription(ev.description || '');
    const startISO = ev.start?.dateTime || ev.start?.date || null;
    const endISO = ev.end?.dateTime || ev.end?.date || null;
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
      endISO,
      _dateKey: dateKey(startISO),
      _raw: ev,
    };
  });
}

/* Main hook */
export function useAllAppointments() {
  // Local state
  const [data, setData] = useState({
    all: [],
    bySpecialty: { weight: [], dental: [] },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* Fetcher */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [wRes, dRes] = await Promise.all([
        fetch('/api/google/calendar/appointments?specialty=weight'),
        fetch('/api/google/calendar/appointments?specialty=dental'),
      ]);

      if (!wRes.ok && !dRes.ok) {
        const txt = `Error al cargar citas`;
        throw new Error(txt);
      }

      const [wJson, dJson] = await Promise.all([
        wRes.ok ? wRes.json() : { events: [] },
        dRes.ok ? dRes.json() : { events: [] },
      ]);

      const weight = normalizeEvents(wJson.events, 'weight');
      const dental = normalizeEvents(dJson.events, 'dental');
      const all = [...weight, ...dental].sort((a, b) =>
        a.startISO < b.startISO ? 1 : a.startISO > b.startISO ? -1 : 0
      );

      setData({
        all,
        bySpecialty: { weight, dental },
      });
    } catch (e) {
      setError(e.message || 'Error desconocido');
      setData({
        all: [],
        bySpecialty: { weight: [], dental: [] },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  /* Auto load */
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  /* Derived maps */
  const byDay = useMemo(() => {
    const map = {};
    for (const ev of data.all) {
      if (!ev._dateKey) continue;
      if (!map[ev._dateKey]) map[ev._dateKey] = [];
      map[ev._dateKey].push(ev);
    }
    return map;
  }, [data.all]);

  /* Public api */
  return {
    data, // { all, bySpecialty: { weight, dental } }
    byDay, // { 'yyyy-mm-dd': [...] }
    loading,
    error,
    refetch: fetchAll,
  };
}
