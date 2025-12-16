import { Utensils } from 'lucide-react';
import { useState, useEffect } from 'react';

function Instructions({ diet, isEditing = false, editDiet, refreshDiets, setShowSuccessModal }) {
  const [instValue, setInstValue] = useState(diet.instructions || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setInstValue(diet.instructions || '');
  }, [diet.instructions]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await editDiet(diet._id, { instructions: instValue });
      refreshDiets();
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2">
          <Utensils className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Instrucciones</h2>
      </div>

      {/* Read mode */}
      {!isEditing && (
        <p className="leading-relaxed whitespace-pre-line text-gray-700">{diet.instructions}</p>
      )}

      {/* Edit mode */}
      {isEditing && (
        <div className="mt-4 space-y-4">
          <textarea
            className="focus:border-beehealth-blue w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none"
            value={instValue}
            onChange={(e) => setInstValue(e.target.value)}
            rows={3}
          />
          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-hover rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </section>
  );
}

export default Instructions;
