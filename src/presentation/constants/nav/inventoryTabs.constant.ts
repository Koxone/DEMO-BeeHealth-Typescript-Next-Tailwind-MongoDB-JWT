import { InventoryCategoriesEnum } from '@/domain/enums';
import { Syringe, FileText, Pill, Plus } from 'lucide-react';

export const inventoryTabs = [
  { id: InventoryCategoriesEnum.MEDS, label: 'Medicamentos', Icon: Pill },
  { id: InventoryCategoriesEnum.PRESCRIPTIONS, label: 'Recetas', Icon: FileText },
  { id: InventoryCategoriesEnum.SUPPLIES, label: 'Suministros', Icon: Syringe },
  { id: InventoryCategoriesEnum.EXTRAS, label: 'Extras', Icon: Plus },
] as const;

export type Tab = (typeof inventoryTabs)[number];
export type TabName = Tab['label'];
export type TabIcon = Tab['Icon'];
