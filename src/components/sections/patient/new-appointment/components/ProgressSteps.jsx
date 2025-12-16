'use client';

import { User, Calendar as CalendarIcon, Clock, Check } from 'lucide-react';

/* steps */
export default function ProgressSteps({ getStepStatus }) {
  const steps = [
    { number: 1, label: 'Médico', icon: User },
    { number: 2, label: 'Fecha', icon: CalendarIcon },
    { number: 3, label: 'Hora', icon: Clock },
  ];

  return (
    <div className="mb-8">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-5 right-0 left-0 -z-10 h-1 bg-gray-200">
          <div
            className="bg-beehealth-blue-primary-solid h-full transition-all duration-500 ease-out"
            style={{
              width:
                getStepStatus(3) === 'complete' || getStepStatus(3) === 'current'
                  ? '100%'
                  : getStepStatus(2) === 'complete' || getStepStatus(2) === 'current'
                    ? '66%'
                    : getStepStatus(1) === 'complete' || getStepStatus(1) === 'current'
                      ? '33%'
                      : '0%',
            }}
          />
        </div>

        {steps.map((step) => {
          const Icon = step.icon;
          const status = getStepStatus(step.number);
          return (
            <div
              key={step.number}
              className="flex flex-col items-center gap-2 rounded-xl bg-linear-to-br from-blue-50 to-indigo-50 px-2 py-1"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  status === 'complete'
                    ? 'bg-beehealth-blue-primary-solid scale-110 text-white shadow-lg'
                    : status === 'current'
                      ? 'bg-beehealth-body-main scale-105 border-2 border-blue-600 text-blue-600 shadow-md'
                      : 'bg-gray-200 text-gray-400'
                }`}
              >
                {status === 'complete' ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={`text-xs font-semibold ${status === 'pending' ? 'text-gray-400' : 'text-gray-700'}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
