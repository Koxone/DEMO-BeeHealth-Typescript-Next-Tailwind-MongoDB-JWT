import { useModalClose } from '@/@hooks/useModalClose';
import { X, Users, User } from 'lucide-react';
import { useState } from 'react';

// Local Helpers
import {
  massiveCategories,
  massiveTypes,
  personalCategories,
  personalTypes,
} from '../../../helpers';

// Custom Hooks
import { useCreateMassiveAnnouncement } from '@/@hooks/notifications/useCreateMassive';
import LoadingState from '@/components/shared/feedback/LoadingState';

function CreateNotificationModal({ setShowAddClosure, patientsData }) {
  const [newAnnouncement, setNewAnnouncement] = useState({
    scope: 'massive',
    category: '',
    type: 'holiday',
    message: '',
    patient: '',
    date: '',
  });

  // Create massive announcement hook
  const { createMassiveAnnouncement, isLoading, error } = useCreateMassiveAnnouncement();

  // Modal close handler
  const { handleOverlayClick } = useModalClose(() => setShowAddClosure(false));

  // Reset event type when category changes
  const handleCategoryChange = (category) => {
    setNewAnnouncement((prev) => ({ ...prev, category, type: '' }));
  };

  // Determine if date should be shown
  const shouldShowDate = () => {
    if (newAnnouncement.scope === 'massive' && newAnnouncement.category === 'schedule') return true;
    if (newAnnouncement.scope === 'personal' && newAnnouncement.category === 'appointment')
      return true;
    if (newAnnouncement.type === 'followup_needed' || newAnnouncement.type === 'progress_check')
      return true;
    return false;
  };

  // Loading State
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Crear Nueva Notificación</h3>
            <h4 className="text-sm text-gray-600">
              Elige entre notificaciones masivas o personalizadas
            </h4>
          </div>
          <button
            onClick={() => setShowAddClosure(false)}
            className="group hover:bg-beehealth-red-primary-solid rounded-lg bg-gray-100 p-2 text-gray-500 hover:text-white"
          >
            <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Scope Selection */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Alcance de Notificación
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setNewAnnouncement((prev) => ({
                    ...prev,
                    scope: 'massive',
                    category: '',
                    type: '',
                  }));
                }}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-semibold transition-all ${
                  newAnnouncement.scope === 'massive'
                    ? 'border-beehealth-blue-primary-solid text-beehealth-blue-primary-dark bg-blue-50'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Masiva</span>
              </button>
              <button
                onClick={() => {
                  setNewAnnouncement((prev) => ({
                    ...prev,
                    scope: 'personal',
                  }));
                }}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-semibold transition-all ${
                  newAnnouncement.scope === 'personal'
                    ? 'border-beehealth-green-secondary-solid text-beehealth-green-secondary-dark bg-green-50'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Personal</span>
              </button>
            </div>
          </div>

          {/* Patient Selection (only for personal) */}
          {newAnnouncement.scope === 'personal' && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Seleccionar Paciente
              </label>
              <select
                value={newAnnouncement.patient}
                onChange={(e) =>
                  setNewAnnouncement((prev) => ({ ...prev, patient: e.target.value }))
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none"
              >
                <option value="">Selecciona un paciente...</option>
                {patientsData?.map((patient) => (
                  <option key={patient._id} value={patient._id} className="capitalize">
                    {patient.fullName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Event Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Categoría de Evento
            </label>
            <select
              value={newAnnouncement.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none"
            >
              <option value="">Selecciona una categoría...</option>
              {newAnnouncement.scope === 'massive'
                ? massiveCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))
                : personalCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
            </select>
          </div>

          {/* Event Type (conditional on category selection) */}
          {newAnnouncement.category && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Tipo Específico
              </label>
              <select
                value={newAnnouncement.type}
                onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none"
              >
                <option value="">Selecciona un tipo...</option>
                {newAnnouncement.scope === 'massive'
                  ? massiveTypes[newAnnouncement.category]?.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))
                  : personalTypes[newAnnouncement.category]?.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
              </select>
            </div>
          )}

          {/* Date (conditional) */}
          {shouldShowDate() && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Fecha</label>
              <input
                type="date"
                value={newAnnouncement.date}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none"
              />
            </div>
          )}

          {/* Notes/Message */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Mensaje / Notas
            </label>
            <textarea
              value={newAnnouncement.message || ''}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
              placeholder="Escribe el mensaje de la notificación..."
              rows={4}
              className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowAddClosure(false)}
              className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                await createMassiveAnnouncement({
                  category: newAnnouncement.category,
                  type: newAnnouncement.type,
                  message: newAnnouncement.message,
                  relatedDate: newAnnouncement.date || undefined,
                });

                setShowAddClosure(false);
              }}
              disabled={!newAnnouncement.category || !newAnnouncement.type}
              className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex-1 rounded-xl px-4 py-2 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              Crear Notificación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNotificationModal;
