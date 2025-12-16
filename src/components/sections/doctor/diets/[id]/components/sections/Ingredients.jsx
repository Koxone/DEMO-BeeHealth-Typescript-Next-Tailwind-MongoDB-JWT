import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

export default function Ingredients({
  diet,
  isEditing = false,
  editDiet,
  refreshDiets,
  setShowSuccessModal,
}) {
  const [ingredients, setIngredients] = useState(diet.ingredients || []);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIngredients(diet.ingredients || []);
  }, [diet.ingredients]);

  const handleAdd = () => setIngredients([...ingredients, '']);
  const handleRemove = (index) => setIngredients(ingredients.filter((_, i) => i !== index));
  const handleEdit = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await editDiet(diet._id, { ingredients });
      refreshDiets();
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md md:p-4">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Ingredientes</h2>

      {!isEditing && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ingredients.map((item, index) => (
            <div key={index} className="bg-beehealth-body-main flex items-start gap-3 rounded-lg">
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"></div>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      )}

      {isEditing && (
        <div className="space-y-4">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="bg-beehealth-body-main flex items-center gap-3 rounded-lg border border-gray-200 p-3"
            >
              <input
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                value={item}
                onChange={(e) => handleEdit(index, e.target.value)}
                placeholder="Ingrediente"
              />
              <button
                onClick={() => handleRemove(index)}
                className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            onClick={handleAdd}
            className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
            Agregar ingrediente
          </button>

          <div className="flex items-center gap-3 pt-2">
            <button
              className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>

            <button
              className="bg-beehealth-body-main rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
              onClick={() => setIngredients(diet.ingredients)}
            >
              Cancelar
            </button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
