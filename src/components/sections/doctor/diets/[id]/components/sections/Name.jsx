import { FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Name({
  diet,
  isEditing = false,
  editDiet,
  setShowSuccessModal,
  refreshDiets,
}) {
  const [nameValue, setNameValue] = useState(diet.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setNameValue(diet.name || '');
  }, [diet.name]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await editDiet(diet._id, { name: nameValue });
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
      {/* Label */}
      {isEditing && (
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-gray-100 p-2">
            <FileText className="h-5 w-5 text-gray-700" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Nombre</h2>
        </div>
      )}
      {!isEditing && (
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{diet?.name}</h1>
      )}

      {isEditing && (
        <div className="mt-4 space-y-4">
          <input
            className="focus:border-beehealth-blue w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />

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
