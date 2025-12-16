'use client';

import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface PatientsSearchBarProps {
  onSearch: (value: string) => void;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function PatientsSearchBar({
  onSearch,
  searchValue,
  setSearchValue,
}: PatientsSearchBarProps) {
  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  return (
    <div className="relative">
      {/* Icon */}
      <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />

      {/* Input */}
      <input
        type="text"
        placeholder="Buscar por nombre, teléfono o email..."
        value={searchValue}
        onChange={handleSearchChange}
        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-lg outline-none"
      />
    </div>
  );
}
