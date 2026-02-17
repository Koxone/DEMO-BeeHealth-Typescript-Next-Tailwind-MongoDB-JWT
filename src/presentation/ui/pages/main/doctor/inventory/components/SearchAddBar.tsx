'use client';

import { Search, Plus } from 'lucide-react';
import { ButtonSm } from '@/presentation/ui/pages/main/shared/buttons/Buttons';

// Prop Types
interface SearchAddBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAdd: () => void;
  onRestock: () => void;
}

export default function SearchAddBar({
  searchTerm,
  setSearchTerm,
  onAdd,
  onRestock,
}: SearchAddBarProps) {
  return (
    <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          maxLength={250}
          type="text"
          placeholder="Buscar por nombre, categoría o ubicación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-12 font-medium transition outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        {/* Create Product Buttons */}
        <ButtonSm onClick={onAdd} action="confirm">
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </ButtonSm>

        {/* Restock Button */}
        <ButtonSm onClick={onRestock} action="confirm">
          <Plus className="h-4 w-4" />
          Abastecer
        </ButtonSm>
      </div>
    </div>
  );
}
