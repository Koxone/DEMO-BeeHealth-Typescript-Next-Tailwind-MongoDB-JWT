'use client';

import { Check, Stethoscope } from 'lucide-react';

// Local Helpers
import { doctors } from '../services/helpers';

export default function DoctorsGrid({ selectedDoctor, onSelect }) {
  return (
    <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-6 shadow-sm hover:shadow-lg">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2">
          <Stethoscope className="text-beehealth-blue-primary-solid h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-700">Paso 1: Selecciona tu médico</h2>
          <p className="text-sm text-gray-600">Elige el especialista que deseas consultar</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {doctors.map((doctor, index) => {
          const Icon = doctor.icon;
          return (
            <button
              key={doctor.id}
              type="button"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onSelect(doctor.id)}
              className={`group animate-fadeInUp relative overflow-hidden rounded-xl border-2 p-5 text-left ${
                selectedDoctor === doctor.id
                  ? 'border-beehealth-blue-primary-dark scale-105 bg-linear-to-br from-blue-50 to-indigo-50 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md active:scale-95'
              }`}
            >
              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ${
                      selectedDoctor === doctor.id
                        ? 'bg-beehealth-blue-primary-dark text-white shadow-lg'
                        : 'text-beehealth-blue-primary-solid bg-linear-to-br from-blue-100 to-indigo-100 group-hover:scale-110'
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  {selectedDoctor === doctor.id && (
                    <div className="bg-beehealth-blue-primary-dark absolute top-0 right-0 rounded-full p-1.5 shadow-lg">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="mb-1 font-bold text-gray-700">{doctor.nombre}</p>
                <p className="text-sm text-gray-600">{doctor.especialidad}</p>
              </div>

              {selectedDoctor === doctor.id && (
                <div className="absolute inset-0 animate-pulse bg-linear-to-br from-blue-400/10 to-indigo-400/10" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
