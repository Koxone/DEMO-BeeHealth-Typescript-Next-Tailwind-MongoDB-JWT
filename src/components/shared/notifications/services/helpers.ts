const getClosureColor = (type) => {
  switch (type) {
    // Schedule changes
    case 'schedule':
      return 'bg-beehealth-red-primary-light border-beehealth-red-primary-dark';

    // Promotions
    case 'promotion':
      return 'bg-beehealth-green-tertiary-light border-beehealth-green-secondary-solid';

    // Announcements
    case 'announcement':
      return 'bg-beehealth-blue-tertiary-light border-beehealth-blue-secondary-solid';

    // Appointments
    case 'appointment_reminder':
      return 'bg-beehealth-blue-primary-light border-beehealth-blue-primary-solid';
    case 'missed_appointment':
      return 'bg-beehealth-red-primary-light border-beehealth-red-primary-solid';
    case 'reschedule_needed':
      return 'bg-beehealth-orange-primary-light border-beehealth-orange-primary-solid';
    case 'appointment_confirmed':
      return 'bg-beehealth-green-tertiary-light border-beehealth-green-secondary-solid';

    // Treatment
    case 'diet_assigned':
      return 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-solid';
    case 'workout_assigned':
      return 'bg-beehealth-purple-primary-light border-beehealth-purple-primary-solid';
    case 'medication_reminder':
      return 'bg-beehealth-blue-secondary-light border-beehealth-blue-secondary-solid';
    case 'treatment_update':
      return 'bg-beehealth-yellow-primary-light border-beehealth-yellow-primary-solid';

    // Follow-up
    case 'followup_needed':
      return 'bg-beehealth-orange-primary-light border-beehealth-orange-primary-solid';
    case 'results_ready':
      return 'bg-beehealth-green-primary-light border-beehealth-green-primary-solid';
    case 'progress_check':
      return 'bg-beehealth-blue-primary-light border-beehealth-blue-primary-solid';
    case 'measurement_reminder':
      return 'bg-beehealth-purple-secondary-light border-beehealth-purple-secondary-solid';

    // Default
    default:
      return 'bg-beehealth-body-main border-beehealth-logo-text';
  }
};
export { getClosureColor };

const eventMap = {
  // Schedule changes
  early_closure: 'Cierre Temprano',
  shift_closed: 'Turno Cerrado',
  day_closed: 'Día Cerrado',
  holiday: 'Día Festivo',
  maintenance: 'Mantenimiento',

  // Promotions
  discount: 'Descuento Especial',
  package_deal: 'Paquete Promocional',
  seasonal_offer: 'Oferta Temporal',

  // Announcements
  massive_general: 'Anuncio General',
  health_tip: 'Tip de Salud',
  deals_news: 'Noticias de la Clínica',

  // Appointments
  appointment_reminder: 'Recordatorio de Consulta Próxima',
  missed_appointment: 'No ha Asistido a Consulta',
  reschedule_needed: 'Necesita Reagendar',
  appointment_confirmed: 'Confirmar Asistencia',

  // Treatment
  diet_assigned: 'Dieta Asignada',
  workout_assigned: 'Ejercicio Asignado',
  medication_reminder: 'Recordatorio de Medicamento',
  treatment_update: 'Actualización de Tratamiento',

  // Follow-up
  followup_needed: 'Seguimiento Necesario',
  results_ready: 'Resultados Disponibles',
  progress_check: 'Revisión de Progreso',
  measurement_reminder: 'Recordatorio de Medición',
};
export { eventMap };
