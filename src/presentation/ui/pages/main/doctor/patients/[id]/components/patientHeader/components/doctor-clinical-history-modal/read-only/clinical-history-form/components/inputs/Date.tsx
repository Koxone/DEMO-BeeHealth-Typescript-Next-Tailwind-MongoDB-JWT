import { useState } from 'react';
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

  const updateDate = (field, newValue) => {
    const newParsed = { ...parsed, [field]: newValue };

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

      {/* Cambio: flex-wrap en mobile, gap más pequeño en mobile */}
      <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-2">
        {/* Day Input - más ancho en mobile para mejor touch target */}
        <input
          type="text"
          inputMode="numeric"
          maxLength={2}
          value={parsed.day}
          onChange={(e) => updateDate('day', e.target.value.replace(/\D/g, ''))}
          placeholder="Día"
          className="w-[72px] shrink-0 rounded-lg border border-gray-300 px-3 py-3 text-center text-base sm:w-16 sm:py-2 md:py-3"
        />

        {/* Month Dropdown - flex-1 en mobile para ocupar espacio disponible */}
        <div className="relative min-w-0 flex-1 sm:flex-initial">
          <button
            type="button"
            onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-3 py-3 text-base sm:w-32 sm:py-2 md:py-3"
          >
            <span className={`truncate ${selectedMonthLabel ? 'text-gray-700' : 'text-gray-400'}`}>
              {selectedMonthLabel || 'Mes'}
            </span>
            <ChevronDown className="ml-1 h-4 w-4 shrink-0 text-gray-400" />
          </button>

          {monthDropdownOpen && (
            <>
              <div className="fixed inset-0 z-50" onClick={() => setMonthDropdownOpen(false)} />
              <div className="absolute top-full left-0 z-50 mt-1 max-h-48 w-full min-w-[120px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {MONTHS.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => {
                      updateDate('month', m.value);
                      setMonthDropdownOpen(false);
                    }}
                    className="w-full px-3 py-3 text-left text-base text-gray-700 hover:bg-gray-100 sm:py-2 sm:text-sm"
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Year Input - más ancho en mobile */}
        <input
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={parsed.year}
          onChange={(e) => updateDate('year', e.target.value.replace(/\D/g, ''))}
          placeholder="Año"
          className="w-20 shrink-0 rounded-lg border border-gray-300 px-3 py-3 text-center text-base sm:w-20 sm:py-2 md:py-3"
        />
      </div>
    </div>
  );
}

export default Date;
