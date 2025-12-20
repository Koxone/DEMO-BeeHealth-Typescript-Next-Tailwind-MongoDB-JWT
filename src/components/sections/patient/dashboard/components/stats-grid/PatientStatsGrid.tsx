'use client';
import { Weight, TrendingDown, Ruler, Clock } from 'lucide-react';
import PatientStatsCard from '../PatientStatsCard';

export default function PatientStatsGrid({ weightLogs, patientWeightLogs, appointments }) {
  // Calculate last visit in days
  const lastVisitCount = Math.floor(
    (Date.now() - new Date(patientWeightLogs[0]?.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Check for upcoming appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointment = appointments?.find((apt) => {
    const aptDate = new Date(apt.date + 'T00:00:00');
    return aptDate >= today;
  });

  const daysUntilAppointment = upcomingAppointment
    ? Math.ceil(
        (new Date(upcomingAppointment.date + 'T00:00:00').getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  const appointmentDate = upcomingAppointment
    ? new Date(upcomingAppointment.date + 'T00:00:00').toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
      })
    : null;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Weight,
          mainData: `${patientWeightLogs[0]?.currentWeight} kg`,
          extraData: `${(
            ((patientWeightLogs[0]?.originalWeight - patientWeightLogs[0]?.currentWeight) /
              patientWeightLogs[0]?.originalWeight) *
            100
          ).toFixed(1)}%`,
          title: 'Peso Actual',
          variant: 'primary',
        },
        {
          Icon: Ruler,
          mainData: `${patientWeightLogs[0]?.currentSize} cm`,
          extraData: `${(
            ((patientWeightLogs[0]?.originalSize - patientWeightLogs[0]?.currentSize) /
              patientWeightLogs[0]?.originalSize) *
            100
          ).toFixed(1)}%`,
          title: 'Talla Actual',
          variant: 'success',
        },
        {
          Icon: TrendingDown,
          mainData: `${patientWeightLogs[0]?.currentWeight - patientWeightLogs[0]?.originalWeight} kg`,
          extraData: `${(
            ((patientWeightLogs[0]?.originalWeight - patientWeightLogs[0]?.currentWeight) /
              patientWeightLogs[0]?.originalWeight) *
            100
          ).toFixed(1)}%`,
          title: 'Progreso',
          variant: 'purple',
        },
        {
          Icon: Clock,
          mainData: upcomingAppointment
            ? daysUntilAppointment === 0
              ? '¡Es hoy!'
              : `${daysUntilAppointment} ${daysUntilAppointment === 1 ? 'día' : 'días'}`
            : `${lastVisitCount || 0} ${lastVisitCount === 1 ? 'día' : 'días'}`,
          title: upcomingAppointment
            ? 'Para tu próxima consulta'
            : 'Tiempo desde tu ultima consulta',
          variant: upcomingAppointment ? 'appointment' : 'danger',
          count: upcomingAppointment ? undefined : true,
          href: '/patient/new-appointment',
          appointmentDate: appointmentDate,
        },
      ].map((card, index) => (
        <PatientStatsCard
          key={index}
          Icon={card.Icon}
          href={card.href}
          mainData={card.mainData}
          extraData={card.extraData || null}
          title={card.title}
          variant={card.variant}
          count={card.count}
          appointmentDate={card.appointmentDate}
        />
      ))}
    </div>
  );
}
