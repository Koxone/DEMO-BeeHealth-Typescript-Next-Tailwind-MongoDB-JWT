import { ClipboardList, Dumbbell, Apple, Flag } from 'lucide-react';

export const tabs = [
  { name: 'Consultas', icon: ClipboardList },
  { name: 'Dietas', icon: Apple },
  { name: 'Ejercicios', icon: Dumbbell },
  { name: 'Metas', icon: Flag },
] as const;

export type Tab = (typeof tabs)[number];
export type TabName = Tab['name'];
export type TabIcon = Tab['icon'];
// TODO - This is not a type or interface, needs to be moved
