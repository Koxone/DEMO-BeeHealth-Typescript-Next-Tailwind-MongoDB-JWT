// Massive categories
const massiveCategories = [
  { value: 'schedule', label: 'Cambio de Horario' },
  { value: 'promotion', label: 'Promoción' },
  { value: 'announcement', label: 'Anuncio' },
];

// Massive types by category
const massiveTypes = {
  schedule: [
    { value: 'early_closure', label: 'Cierre Temprano' },
    { value: 'shift_closed', label: 'Turno Cerrado' },
    { value: 'day_closed', label: 'Día Cerrado' },
    { value: 'holiday', label: 'Día Festivo' },
    { value: 'maintenance', label: 'Mantenimiento' },
  ],
  promotion: [
    { value: 'discount', label: 'Descuento Especial' },
    { value: 'package_deal', label: 'Paquete Promocional' },
    { value: 'seasonal_offer', label: 'Oferta Temporal' },
  ],
  announcement: [
    { value: 'massive_general', label: 'Anuncio General' },
    { value: 'health_tip', label: 'Tip de Salud' },
    { value: 'deals_news', label: 'Noticias de la Clínica' },
  ],
};

// Personal categories
const personalCategories = [
  { value: 'appointment', label: 'Consulta' },
  { value: 'treatment', label: 'Tratamiento' },
  { value: 'followup', label: 'Seguimiento' },
];

// Specific types by personal category
const personalTypes = {
  appointment: [
    { value: 'new_appointment_created', label: 'Nueva Cita Creada' },
    { value: 'missed_appointment', label: 'No ha Asistido a Consulta' },
    { value: 'coming_appointment_reminder', label: 'Recordatorio de Consulta Próxima' },
    { value: 'today_appointment_reminder', label: 'Recordatorio de Consulta Hoy' },
    { value: 'appointment_needed', label: 'Necesita Agendar Cita' },
  ],
  treatment: [
    { value: 'diet_assigned', label: 'Dieta Asignada' },
    { value: 'diet_completed', label: 'Dieta Completada' },
    { value: 'workout_assigned', label: 'Ejercicio Asignado' },
    { value: 'workout_completed', label: 'Ejercicio Completado' },
    { value: 'new_goal_assigned', label: 'Nueva Meta Asignada' },
    { value: 'goal_completed', label: 'Meta Completada' },
    { value: 'goal_not_completed', label: 'Meta No Completada' },
  ],
  followup: [
    { value: 'results_ready', label: 'Resultados Disponibles' },
    { value: 'order_ready', label: 'Pedido Listo' },
    { value: 'personal_general', label: 'Mensaje General' },
  ],
};

const daysMap = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

export { massiveCategories, massiveTypes, personalCategories, personalTypes, daysMap };
