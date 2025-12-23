'use client';
import { Weight, TrendingDown, Ruler, Clock } from 'lucide-react';
import PatientStatsCard from '../PatientStatsCard';

export default function PatientStatsGrid({ weightLogs, patientWeightLogs, appointments }) {
  // Current date in Mexico timezone
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));

  // Normalize appointments
  const normalizedAppointments = (appointments || []).map((apt) => ({
    ...apt,
    dateTime: new Date(`${apt.date}T${apt.time}:00`),
  }));

  // Upcoming appointment (closest future)
  const upcomingAppointment = normalizedAppointments
    .filter((apt) => apt.dateTime >= now)
    .sort((a, b) => a.dateTime - b.dateTime)[0];

  // Last appointment (closest past)
  const lastAppointment = normalizedAppointments
    .filter((apt) => apt.dateTime < now)
    .sort((a, b) => b.dateTime - a.dateTime)[0];

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

  const currentWeight = patientWeightLogs[0]?.currentWeight || 0;
  const originalWeight = patientWeightLogs[0]?.originalWeight || 0;
  const currentSize = patientWeightLogs[0]?.currentSize || 0;
  const originalSize = patientWeightLogs[0]?.originalSize || 0;

  const weightProgress = currentWeight - originalWeight;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Weight,
          mainData: `${currentWeight.toFixed(1)} kg`,
          extraData: `${(((originalWeight - currentWeight) / originalWeight) * 100).toFixed(1)}%`,
          title: 'Peso Actual',
          variant: 'primary',
        },
        {
          Icon: Ruler,
          mainData: `${currentSize.toFixed(1)} cm`,
          extraData: `${(((originalSize - currentSize) / originalSize) * 100).toFixed(1)}%`,
          title: 'Talla Actual',
          variant: 'success',
        },
        {
          Icon: TrendingDown,
          mainData: `${Math.abs(weightProgress).toFixed(1)} kg`,
          extraData: `${(((originalWeight - currentWeight) / originalWeight) * 100).toFixed(1)}%`,
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
