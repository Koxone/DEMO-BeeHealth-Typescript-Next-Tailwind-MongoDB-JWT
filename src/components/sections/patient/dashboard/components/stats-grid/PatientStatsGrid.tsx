'use client';

import { Weight, TrendingDown, Ruler, Clock } from 'lucide-react';
import PatientStatsCard from '../PatientStatsCard';

export default function PatientStatsGrid({ patientWeightLogs, appointments, currentUser }) {
  // Current date (Mexico timezone)
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));

  // Normalize appointments
  const normalizedAppointments = (appointments || []).map((apt) => ({
    ...apt,
    dateTime: new Date(`${apt.date}T${apt.time}:00`),
  }));

  // Upcoming appointment
  const upcomingAppointment = normalizedAppointments
    .filter((apt) => apt.dateTime >= now)
    .sort((a, b) => a.dateTime - b.dateTime)[0];

  // Last appointment
  const lastAppointment = normalizedAppointments
    .filter((apt) => apt.dateTime < now)
    .sort((a, b) => b.dateTime - a.dateTime)[0];

  // Appointment calculations
  const daysUntilAppointment = upcomingAppointment
    ? Math.ceil((upcomingAppointment.dateTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const daysSinceLastAppointment = lastAppointment
    ? Math.floor((now.getTime() - lastAppointment.dateTime.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const appointmentDate = upcomingAppointment
    ? upcomingAppointment.dateTime.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
      })
    : null;

  // Legacy metrics
  const legacyCurrentWeight = patientWeightLogs?.[0]?.currentWeight ?? 0;
  const legacyInitialWeight = patientWeightLogs?.[0]?.originalWeight ?? 0;
  const legacyCurrentSize = patientWeightLogs?.[0]?.currentSize ?? 0;
  const legacyInitialSize = patientWeightLogs?.[0]?.originalSize ?? 0;

  // New metrics availability
  const hasNewMetrics =
    currentUser?.currentWeight != null &&
    currentUser?.initialWeight != null &&
    currentUser?.currentSize != null &&
    currentUser?.initialSize != null;

  // Resolved weight values
  const resolvedCurrentWeight = hasNewMetrics ? currentUser.currentWeight : legacyCurrentWeight;
  const resolvedInitialWeight = hasNewMetrics ? currentUser.initialWeight : legacyInitialWeight;

  // Resolved size values
  const resolvedCurrentSize = hasNewMetrics ? currentUser.currentSize : legacyCurrentSize;
  const resolvedInitialSize = hasNewMetrics ? currentUser.initialSize : legacyInitialSize;

  // Weight calculations
  const weightDifference = resolvedCurrentWeight - resolvedInitialWeight;
  const weightPercentage =
    resolvedInitialWeight !== 0
      ? ((resolvedInitialWeight - resolvedCurrentWeight) / resolvedInitialWeight) * 100
      : 0;

  // Size calculations
  const sizePercentage =
    resolvedInitialSize !== 0
      ? ((resolvedInitialSize - resolvedCurrentSize) / resolvedInitialSize) * 100
      : 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Weight,
          mainData: `${resolvedCurrentWeight.toFixed(1)} kg`,
          extraData: `${weightPercentage.toFixed(1)}%`,
          title: 'Peso Actual',
          variant: 'primary',
        },
        {
          Icon: Ruler,
          mainData: `${resolvedCurrentSize.toFixed(1)} cm`,
          extraData: `${sizePercentage.toFixed(1)}%`,
          title: 'Talla Actual',
          variant: 'success',
        },
        {
          Icon: TrendingDown,
          mainData: `${Math.abs(weightDifference).toFixed(1)} kg`,
          extraData: `${weightPercentage.toFixed(1)}%`,
          title: 'Progreso',
          variant: 'purple',
        },
        {
          Icon: Clock,
          mainData: upcomingAppointment
            ? daysUntilAppointment === 0
              ? '¡Es hoy!'
              : `${daysUntilAppointment} ${daysUntilAppointment === 1 ? 'día' : 'días'}`
            : `${daysSinceLastAppointment || 0} ${daysSinceLastAppointment === 1 ? 'día' : 'días'}`,
          title: upcomingAppointment
            ? 'Para tu próxima consulta'
            : 'Tiempo desde tu última consulta',
          variant: upcomingAppointment ? 'appointment' : 'danger',
          count: !upcomingAppointment,
          href: '/patient/new-appointment',
          appointmentDate,
        },
      ].map((card, index) => (
        <PatientStatsCard
          key={index}
          Icon={card.Icon}
          href={card.href}
          mainData={card.mainData}
          extraData={card.extraData}
          title={card.title}
          variant={card.variant}
          count={card.count}
          appointmentDate={card.appointmentDate}
        />
      ))}
    </div>
  );
}
