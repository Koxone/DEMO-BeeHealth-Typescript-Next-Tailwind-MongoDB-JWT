import { AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

function Notes({ diet }) {
  const [notes, setNotes] = useState(diet.notes || '');
  const [noteValue, setNoteValue] = useState(diet.description || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isReading, setIsReading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <section className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 md:p-4">
      {/* Header block */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-200 p-2">
          <AlertCircle className="h-5 w-5 text-blue-700" />
        </div>
        <h2 className="text-xl font-semibold text-blue-900">Notas del Médico</h2>
      </div>

      {/* Display block */}
      {!isEditing && <p className="leading-relaxed whitespace-pre-line text-blue-900">{notes}</p>}

      {/* Edit block */}
      {isEditing && (
        <textarea
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          placeholder="Escribe las notas del médico"
          className="bg-beehealth-body-main w-full rounded-lg border border-blue-300 p-3 text-blue-900 focus:border-blue-600 focus:outline-none"
          rows={2}
        />
      )}

      {isEditing && (
        <div className="flex items-center gap-3">
          <button
            disabled={isSaving}
            className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-hover rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity disabled:opacity-50"
          >
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      )}
    </section>
  );
}

export default Notes;
