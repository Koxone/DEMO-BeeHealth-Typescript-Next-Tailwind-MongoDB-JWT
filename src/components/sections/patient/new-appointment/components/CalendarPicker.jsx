'use client';

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

/* calendar */
export default function CalendarPicker({
  monthName,
  days,
  onPrev,
  onNext,
  selectedDate,
  onSelectDate,
  isDateAvailable,
  isPastDate,
}) {
  return (
    <div className="animate-slideDown bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-indigo-100 p-2">
          <CalendarIcon className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Paso 2: Selecciona una fecha</h2>
          <p className="text-sm text-gray-600">Elige el día de tu consulta</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-beehealth-body-main p-5">
        {/* header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onPrev}
            className="group hover:bg-beehealth-body-main rounded-xl border border-gray-200 p-2.5 shadow-sm transition-all duration-200 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 transition-transform duration-200 group-hover:-translate-x-1" />
          </button>
          <h3 className="bg-beehealth-body-main rounded-xl border border-gray-200 px-4 py-2 text-lg font-bold text-gray-900 capitalize shadow-sm">
            {monthName}
          </h3>
          <button
            type="button"
            onClick={onNext}
            className="group hover:bg-beehealth-body-main rounded-xl border border-gray-200 p-2.5 shadow-sm transition-all duration-200 active:scale-95"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* days of week */}
        <div className="mb-3 grid grid-cols-7 gap-2">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d) => (
            <div key={d} className="py-2 text-center text-xs font-bold text-gray-500">
              {d}
            </div>
          ))}
        </div>

        {/* days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} className="aspect-square" />;
            const isAvailable = isDateAvailable(date);
            const past = isPastDate(date);
            const selected = selectedDate && date.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectDate(date)}
                disabled={past || !isAvailable}
                className={`group relative flex aspect-square items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selected
                    ? 'bg-beehealth-blue-primary-solid z-10 scale-110 text-white shadow-lg'
                    : isAvailable && !past
                      ? 'bg-beehealth-body-main border-2 border-blue-300 text-gray-900 hover:scale-105 hover:bg-blue-50 hover:shadow-md active:scale-95'
                      : 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-50'
                }`}
              >
                {date.getDate()}
                {isAvailable && !past && !selected && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full border-2 border-white bg-green-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                )}
              </button>
            );
          })}
        </div>

        {/* legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-5 text-xs">
          <div className="flex items-center gap-2">
            <div className="bg-beehealth-body-main h-5 w-5 rounded-lg border-2 border-blue-300 shadow-sm" />
            <span className="font-medium text-gray-700">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-lg bg-gray-100" />
            <span className="font-medium text-gray-700">No disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-beehealth-blue-primary-solid h-5 w-5 rounded-lg shadow-sm" />
            <span className="font-medium text-gray-700">Seleccionado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
