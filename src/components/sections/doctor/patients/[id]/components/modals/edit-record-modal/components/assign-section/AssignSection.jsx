'use client';

import { useState } from 'react';
import AssignDiet from './components/AssignDiet.jsx';
import AssignWorkout from './components/AssignWorkout.jsx';
import useAuthStore from '@/zustand/useAuthStore';

export default function AssignSection({ onSelectDiet, onSelectWorkout, patientId }) {
  // Auth data
  const { user, isAuthenticated, token } = useAuthStore();

  const [mode, setMode] = useState(null);

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      {/* Title */}
      <label className="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Asignar a este paciente
      </label>

      {/* Mode buttons */}
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setMode(mode === 'diet' ? null : 'diet')}
          className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex-1 rounded-lg px-4 py-2 text-xs font-medium text-white"
        >
          Dieta
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === 'workout' ? null : 'workout')}
          className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex-1 rounded-lg px-4 py-2 text-xs font-medium text-white"
        >
          Ejercicio
        </button>
      </div>

      {/* Render component */}
      {mode === 'diet' && <AssignDiet user={user} onSelectDiet={onSelectDiet} />}
      {mode === 'workout' && (
        <AssignWorkout user={user} onSelectWorkout={onSelectWorkout} patientId={patientId} />
      )}

      {!mode && (
        <p className="text-xs text-gray-500">Selecciona Dieta o Ejercicio para continuar.</p>
      )}
    </div>
  );
}
