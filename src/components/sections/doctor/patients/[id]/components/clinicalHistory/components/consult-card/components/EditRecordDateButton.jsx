'use client';

import { useEffect, useState } from 'react';
import { Check, Pencil, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import ReactDatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

export default function EditRecordDateButton({ onSelect, fetchRecord }) {
  // React Query Client
  const queryClient = useQueryClient();

  // Get patient ID from URL params
  const { id } = useParams();

  // UI state
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Today's date at midnight in local timezone
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleConfirm = async () => {
    if (!selectedDate) return;

    setIsLoading(true);

    // Format date to YYYY-MM-DD in local timezone
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 300));

    onSelect(formattedDate);

    // Invalidate queries to refetch data
    queryClient.invalidateQueries(['patientClinicalRecords', id]);

    fetchRecord();
    setIsLoading(false);
    setOpen(false);
    setSelectedDate(null);

    // Show success feedback
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedDate(null);
  };

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
          <div className="animate-in fade-in slide-in-from-bottom-2 absolute bottom-10 left-17 z-50 mb-3 -translate-x-1/2 duration-200">
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

              {/* Date Input */}
              <div className="mb-4">
                <ReactDatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    if (date) {
                      setSelectedDate(date);
                    }
                  }}
                  locale={es}
                  dateFormat="dd/MM/yyyy"
                  maxDate={today}
                  disabled={isLoading}
                  placeholderText="Selecciona una fecha"
                  popperPlacement="bottom-start"
                  showPopperArrow={false}
                  className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />

                {/* Helper text */}
                <p className="mt-2 text-xs text-gray-500">Fecha máxima: hoy</p>
              </div>

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
                  disabled={isLoading || !selectedDate}
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
