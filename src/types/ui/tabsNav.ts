import {
  ClipboardList,
  FileText,
  Package,
  DollarSign,
  Wallet,
  AlignLeft,
  Image,
  Pill,
  FlaskRound,
  Dumbbell,
  Apple,
} from 'lucide-react';

export const tabs = [
  { name: 'Consultas', icon: ClipboardList },
  { name: 'Dietas', icon: Apple },
  { name: 'Ejercicios', icon: Dumbbell },
  // { name: 'Cotización', icon: DollarSign },
  // { name: 'Caja', icon: Wallet },
  // { name: 'Ortodoncia', icon: AlignLeft },
  // { name: 'Imágenes', icon: Image },
  // { name: 'Receta', icon: Pill },
  // { name: 'Laboratorios', icon: FlaskRound },
] as const;

export type Tab = (typeof tabs)[number];
export type TabName = Tab['name'];
export type TabIcon = Tab['icon'];
