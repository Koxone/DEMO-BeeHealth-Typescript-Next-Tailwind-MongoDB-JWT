import { CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

function Benefits({ diet, isEditing = false, editDiet, refreshDiets, setShowSuccessModal }) {
  const [benValue, setBenValue] = useState(diet.benefits || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBenValue(diet.benefits || '');
  }, [diet.benefits]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await editDiet(diet._id, { benefits: benValue });
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
        <div className="rounded-lg bg-green-100 p-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Beneficios</h2>
      </div>

      {/* Read mode */}
      {!isEditing && <p className="leading-relaxed text-gray-700">{diet.benefits}</p>}

      {/* Edit mode */}
      {isEditing && (
        <div className="mt-4 space-y-4">
          <textarea
            className="focus:border-beehealth-green-secondary-solid w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none"
            value={benValue}
            onChange={(e) => setBenValue(e.target.value)}
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

export default Benefits;
