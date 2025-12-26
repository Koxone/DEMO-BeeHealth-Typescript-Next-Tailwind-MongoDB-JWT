import { CalendarIcon, Clock, User } from 'lucide-react';
import { FaSyringe, FaTooth } from 'react-icons/fa';
import { GiWeightScale } from 'react-icons/gi';

/* Slots helper */
export function getAvailableSlots(date, tipo) {
  if (!date) return [];
  const day = date.getDay();
  const slots = [];
  const addSlots = (startHour, endHour) => {
    for (let h = startHour; h < endHour; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      slots.push(`${String(h).padStart(2, '0')}:30`);
    }
  };
  if (tipo === 'Odontología') {
    if (day === 0) addSlots(11, 17);
    return slots;
  }
  switch (day) {
    case 1:
      addSlots(8, 14);
      addSlots(16, 19);
      break;
    case 2:
    case 3:
      addSlots(10, 14);
      addSlots(16, 19);
      break;
    case 4:
      addSlots(16, 19);
      break;
    case 5:
      addSlots(8, 14);
      addSlots(16, 19);
      break;
    case 6:
      return [];
    case 0:
      addSlots(10, 13);
      break;
  }
  return slots;
}

/* Doctors list */
export const doctors = [
  {
    id: 1,
    nombre: 'Control de Peso',
    especialidad: 'Nutrición y Metabolismo',
    icon: GiWeightScale,
  },
  { id: 2, nombre: 'Odontología', especialidad: 'Periodoncia', icon: FaTooth },
  { id: 3, nombre: 'Tratamientos Estéticos', especialidad: 'Medicina Estética', icon: FaSyringe },
];

export const steps = [
  { number: 1, label: 'Médico', icon: User },
  { number: 2, label: 'Fecha', icon: CalendarIcon },
  { number: 3, label: 'Hora', icon: Clock },
];
