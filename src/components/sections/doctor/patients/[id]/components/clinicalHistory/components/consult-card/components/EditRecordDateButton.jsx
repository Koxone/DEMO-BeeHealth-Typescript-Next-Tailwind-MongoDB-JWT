'use client';

import { useEffect, useState } from 'react';
import { Check, ChevronDown, Pencil, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

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

export default function EditRecordDateButton({ onSelect, fetchRecord }) {
  // React Query Client
  const queryClient = useQueryClient();

  // Get patient ID from URL params
  const { id } = useParams();

  // UI state
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Date fields
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);

  // Today's date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Check if selected date is valid and not in the future
  const isValidDate = () => {
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);

    if (!d || !m || !y) return false;
    if (d < 1 || d > 31) return false;
    if (y < 1900 || y > currentYear) return false;

    // Check if date is in the future
    if (y > currentYear) return false;
    if (y === currentYear && m > currentMonth) return false;
    if (y === currentYear && m === currentMonth && d > currentDay) return false;

    // Check valid days for month
    const daysInMonth = new Date(y, m, 0).getDate();
    if (d > daysInMonth) return false;

    return true;
  };

  const handleConfirm = async () => {
    if (!isValidDate()) return;

    setIsLoading(true);

    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 300));

    onSelect(formattedDate);

    // Invalidate queries to refetch data
    queryClient.invalidateQueries(['patientClinicalRecords', id]);

    fetchRecord();
    setIsLoading(false);
    setOpen(false);
    setDay('');
    setMonth('');
    setYear('');

    // Show success feedback
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    setDay('');
    setMonth('');
    setYear('');
    setMonthDropdownOpen(false);
  };

  const selectedMonthLabel = MONTHS.find((m) => m.value === parseInt(month))?.label || '';

  return (
    <div className="relative">
      {/* Edit Button */}
      <button
        type="button"
        title="Cambiar fecha de registro"
        onClick={() => setOpen(!open)}
        disabled={isLoading}
        className="group bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover relative mt-2 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Pencil className="h-4 w-4 text-white" />

        {/* Tooltip for mobile */}
        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 sm:hidden">
          Editar fecha
        </span>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={handleCancel} />

          {/* Date Picker Panel */}
          <div className="animate-in fade-in slide-in-from-bottom-2 absolute bottom-10 left-30 z-50 mb-3 -translate-x-1/2 duration-200">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Seleccionar fecha</h3>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Google-style Date Inputs */}
              <div className="mb-4 flex gap-2">
                {/* Day Input */}
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={day}
                    onChange={(e) => setDay(e.target.value.replace(/\D/g, ''))}
                    disabled={isLoading}
                    placeholder="Día"
                    className="w-16 rounded-md border border-gray-700 bg-transparent px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {/* Month Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
                    disabled={isLoading}
                    className="flex w-32 items-center justify-between rounded-md border border-gray-700 bg-transparent px-3 py-2.5 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className={selectedMonthLabel ? 'text-gray-700' : 'text-gray-500'}>
                      {selectedMonthLabel || 'Mes'}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>

                  {monthDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-50"
                        onClick={() => setMonthDropdownOpen(false)}
                      />
                      <div className="absolute top-full left-0 z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
                        {MONTHS.map((m) => (
                          <button
                            key={m.value}
                            type="button"
                            onClick={() => {
                              setMonth(String(m.value));
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
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={year}
                    onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
                    disabled={isLoading}
                    placeholder="Año"
                    className="w-20 rounded-md border border-gray-700 bg-transparent px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Helper text */}
              <p className="mb-4 text-xs text-gray-500">Fecha máxima: hoy</p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isLoading || !isValidDate()}
                  className="flex-1 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Guardando...
                    </span>
                  ) : (
                    'Confirmar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Success Toast */}
      {updated && (
        <div className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-4 left-1/2 z-50 -translate-x-1/2 duration-300">
          <div className="flex items-center gap-2 rounded-full bg-linear-to-br from-green-600 to-emerald-600 px-4 py-2.5 shadow-lg">
            <div className="rounded-full bg-white/20 p-0.5">
              <Check className="h-4 w-4 text-white" strokeWidth={3} />
            </div>
            <span className="text-sm font-semibold text-white">
              Fecha actualizada correctamente
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
