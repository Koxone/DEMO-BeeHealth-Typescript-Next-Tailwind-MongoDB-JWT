'use client';

import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  TrendingUp,
  Users,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';
import StatsGrid from './components/StatsGrid';
import AppointmentsCard from './components/AppointmentsCard';
import DoctorCalendarCard from './components/DoctorCalendarCard';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day));
  return days;
};

/* Parse */
function parseDescriptionToFields(desc) {
  // Description lines
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
  };
}

/* Format */
function formatDateKey(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
}

export default function DoctorCalendar({ role, currentUser }) {
  // Guards
  const isDoctor = currentUser?.role === 'doctor';
  const specialty = currentUser?.specialty;

  // Local States
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState(null);

  // Icons
  const icons = useMemo(
    () => ({ CalendarIcon, ChevronLeft, ChevronRight, Users, Clock, User, Phone, Mail, Sparkles }),
    []
  );

  // Fetch events
  useEffect(() => {
    // Load events
    if (!isDoctor || !specialty) return;

    let mounted = true;
    (async () => {
      try {
        setLoadingEvents(true);
        setError(null);

        const res = await fetch(
          `/api/google/calendar/appointments?specialty=${encodeURIComponent(specialty)}`
        );
        if (!res.ok) throw new Error('No se pudieron cargar las citas');
        const data = await res.json();
        const items = Array.isArray(data?.events) ? data.events : [];

        const normalized = items.map((ev) => {
          const fields = parseDescriptionToFields(ev.description || '');
          const start = ev.start?.dateTime || ev.start?.date;
          const dateObj = start ? new Date(start) : null;

          const hh = dateObj
            ? dateObj.toLocaleTimeString('es-MX', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'America/Mexico_City',
              })
            : '';

          const tipo =
            specialty === 'dental'
              ? 'Odontología'
              : specialty === 'weight'
                ? 'Control de Peso'
                : fields.especialidad || 'Consulta';

          return {
            id: ev.id,
            tipo,
            hora: hh,
            paciente: fields.paciente || ev.summary || 'Paciente',
            telefono: fields.telefono || '',
            email: fields.email || ev.attendees?.[0]?.email || '',
            motivo: fields.motivo || '',
            _dateKey: dateObj ? formatDateKey(dateObj) : '',
          };
        });

        if (mounted) setEvents(normalized);
      } catch (e) {
        if (mounted) setError(e.message || 'Error al cargar citas');
      } finally {
        if (mounted) setLoadingEvents(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isDoctor, specialty]);

  // Derived
  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);
  const monthName = useMemo(
    () =>
      currentMonth.toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric',
      }),
    [currentMonth]
  );

  // Handlers
  const onPrev = () => {
    // Prev month
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const onNext = () => {
    // Next month
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const onSelectDate = (date) => {
    // Select day
    setSelectedDate(date);
  };

  // Helpers
  const helpers = useMemo(() => {
    // By day map
    const byDay = events.reduce((acc, e) => {
      if (!e._dateKey) return acc;
      acc[e._dateKey] ??= [];
      acc[e._dateKey].push(e);
      return acc;
    }, {});

    return {
      // Check
      hasAppointments: (date) => {
        if (!date) return false;
        return (byDay[formatDateKey(date)] || []).length > 0;
      },
      // Get list
      getAppointmentsForDate: (date) => {
        if (!date) return [];
        return byDay[formatDateKey(date)] || [];
      },
      // Format
      formatDate: (date) => formatDateKey(date),
    };
  }, [events]);

  /* Stats memo */
  // Basic counts for StatsGrid
  const stats = useMemo(() => {
    // Month window
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;

    // Filter events in current month using _dateKey yyyy-mm-dd
    const monthEvents = events.filter((e) => e._dateKey?.startsWith(monthPrefix));

    // Group by day
    const byDay = monthEvents.reduce((acc, e) => {
      acc[e._dateKey] = (acc[e._dateKey] || 0) + 1;
      return acc;
    }, {});

    // Today key
    const todayKey = formatDateKey(new Date());

    // Month length
    const lastDay = new Date(year, month + 1, 0).getDate();

    return {
      totalAppointmentsThisMonth: monthEvents.length,
      daysWithAppointments: Object.keys(byDay).length,
      todayAppointments: byDay[todayKey] || 0,
      averagePerDay: monthEvents.length ? Number((monthEvents.length / lastDay).toFixed(2)) : 0,
    };
  }, [events, currentMonth]);

  // Access UI
  if (!isDoctor || !specialty) {
    return (
      <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 shadow">
        <p className="font-semibold text-red-700">Sesión no válida</p>
        <p className="text-sm text-red-600">Necesitas rol de doctor con especialidad asignada</p>
      </div>
    );
  }

  return (
    <div className="h-full space-y-4 overflow-x-hidden overflow-y-auto md:space-y-6">
      <SharedSectionHeader
        Icon="calendar"
        role={role}
        title="Mi Calendario"
        subtitle="Visualiza y gestiona tus citas médicas"
      />

      <StatsGrid stats={stats} icons={{ CalendarIcon, CheckCircle, Clock, TrendingUp }} />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <DoctorCalendarCard
            monthName={monthName}
            days={days}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onPrev={onPrev}
            onNext={onNext}
            onSelectDate={onSelectDate}
            helpers={helpers}
            icons={icons}
          />

          <AppointmentsCard
            selectedDate={selectedDate}
            appointments={selectedDate ? helpers.getAppointmentsForDate(selectedDate) : []}
          />
        </div>
      </div>
    </div>
  );
}
