import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const MONTHS = [
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' },
];

function Date({ question, required, value, id, onChange }) {
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);

  // Parsear valor YYYY-MM-DD
  const parseDate = (dateStr) => {
    if (!dateStr) return { day: '', month: '', year: '' };
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return {
        year: parts[0],
        month: parseInt(parts[1]) || '',
        day: parseInt(parts[2]) || '',
      };
    }
    return { day: '', month: '', year: '' };
  };

  const parsed = parseDate(value);
  const selectedMonthLabel = MONTHS.find((m) => m.value === parsed.month)?.label || '';

  // Actualizar fecha y llamar onChange con formato YYYY-MM-DD
  const updateDate = (field, newValue) => {
    const newParsed = { ...parsed, [field]: newValue };

    // Solo llamar onChange si tenemos al menos un valor
    if (newParsed.year || newParsed.month || newParsed.day) {
      const formatted = `${newParsed.year || ''}-${newParsed.month ? String(newParsed.month).padStart(2, '0') : ''}-${newParsed.day ? String(newParsed.day).padStart(2, '0') : ''}`;
      onChange(formatted);
    } else {
      onChange('');
    }
  };

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>

      <div className="flex gap-2">
        {/* Day Input */}
        <input
          type="text"
          inputMode="numeric"
          maxLength={2}
          value={parsed.day}
          onChange={(e) => updateDate('day', e.target.value.replace(/\D/g, ''))}
          placeholder="Día"
          className="w-16 rounded-lg border border-gray-300 px-3 py-2 text-center md:py-3"
        />

        {/* Month Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
            className="flex w-32 items-center justify-between rounded-lg border border-gray-300 px-3 py-2 md:py-3"
          >
            <span className={selectedMonthLabel ? 'text-gray-900' : 'text-gray-400'}>
              {selectedMonthLabel || 'Mes'}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {monthDropdownOpen && (
            <>
              <div className="fixed inset-0 z-50" onClick={() => setMonthDropdownOpen(false)} />
              <div className="absolute top-full left-0 z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {MONTHS.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => {
                      updateDate('month', m.value);
                      setMonthDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Year Input */}
        <input
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={parsed.year}
          onChange={(e) => updateDate('year', e.target.value.replace(/\D/g, ''))}
          placeholder="Año"
          className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-center md:py-3"
        />
      </div>
    </div>
  );
}

export default Date;
