'use client';

import { Clock, Check } from 'lucide-react';

/* slots */
export default function TimeSlots({ dateLabel, times, selectedTime, onSelectTime }) {
  return (
    <div className="animate-slideDown bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-purple-100 p-2">
          <Clock className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Paso 3: Selecciona un horario</h2>
          <p className="text-sm text-gray-600">Horarios disponibles para {dateLabel}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {times.map((time, idx) => (
          <button
            key={time}
            type="button"
            style={{ animationDelay: `${idx * 50}ms` }}
            onClick={() => onSelectTime(time)}
            className={`group animate-fadeInUp relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border-2 px-3 py-4 transition-all duration-300 ${
              selectedTime === time
                ? 'scale-110 border-purple-600 bg-linear-to-br from-purple-50 to-pink-50 shadow-lg'
                : 'bg-beehealth-body-main border-gray-200 hover:border-purple-300 hover:shadow-md active:scale-95'
            }`}
          >
            <Clock
              className={`h-5 w-5 transition-all duration-300 ${selectedTime === time ? 'scale-110 text-purple-600' : 'text-gray-400 group-hover:scale-110 group-hover:text-purple-500'}`}
            />
            <span
              className={`text-sm font-bold ${selectedTime === time ? 'text-purple-600' : 'text-gray-700'}`}
            >
              {time}
            </span>
            {selectedTime === time && (
              <div className="absolute top-1 right-1 rounded-full bg-purple-600 p-1 shadow-lg">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
