import {
  LayoutDashboard,
  Activity,
  Calendar,
  Apple,
  Dumbbell,
  User,
  HelpCircle,
  Users,
  DollarSign,
  Package,
  FileText,
} from 'lucide-react';

export const patientSidebarItems = [
  { icon: LayoutDashboard, label: 'Inicio', path: '/patient/dashboard', badge: null },
  { icon: Calendar, label: 'Agendar Cita', path: '/patient/new-appointment', badge: null },
  { icon: Activity, label: 'Mi Historial', path: '/patient/history', badge: null },
  { icon: Apple, label: 'Mis Dietas', path: '/patient/diets', badge: null },
  { icon: Dumbbell, label: 'Mis Ejercicios', path: '/patient/workouts', badge: null },
];

export const weightControlSidebarItems = [
  { icon: LayoutDashboard, label: 'Inicio', path: '/doctor/dashboard', badge: null },
  {
    icon: Users,
    label: 'Pacientes',
    path: '/doctor/patients',
    badge: '0',
  },
  {
    icon: Calendar,
    label: 'Calendario',
    path: '/doctor/calendar',
    badge: '0',
  },
  { icon: Apple, label: 'Dietas', path: '/doctor/diets', badge: null },
  { icon: Dumbbell, label: 'Ejercicios', path: '/doctor/workouts', badge: null },
  { icon: DollarSign, label: 'Contabilidad', path: '/doctor/accounting', badge: null },
  { icon: Package, label: 'Inventario', path: '/doctor/inventory', badge: '5' },
  // { icon: User, label: 'Perfil', path: '/doctor/profile', badge: null },
];

export const dentalSidebarItems = [
  { icon: LayoutDashboard, label: 'Inicio', path: '/doctor/dashboard', badge: null },
  {
    icon: Users,
    label: 'Pacientes',
    path: '/doctor/patients',
    badge: '0',
  },
  {
    icon: Calendar,
    label: 'Calendario',
    path: '/doctor/calendar',
    badge: '0',
  },
  { icon: DollarSign, label: 'Contabilidad', path: '/doctor/accounting', badge: null },
  { icon: Package, label: 'Inventario', path: '/doctor/inventory', badge: '5' },
  { icon: User, label: 'Perfil', path: '/doctor/profile', badge: null },
];

export const employeeSidebarItems = [
  { icon: LayoutDashboard, label: 'Inicio', path: '/employee/dashboard', badge: null },
  { icon: Calendar, label: 'Citas', path: '/employee/appointments', badge: '12' },
  { icon: FileText, label: 'Consultas', path: '/employee/consultations', badge: null },
  { icon: Package, label: 'Inventario', path: '/employee/inventory', badge: '3' },
  { icon: Users, label: 'Pacientes', path: '/employee/patients', badge: null },
  { icon: User, label: 'Perfil', path: '/employee/profile', badge: null },
];
