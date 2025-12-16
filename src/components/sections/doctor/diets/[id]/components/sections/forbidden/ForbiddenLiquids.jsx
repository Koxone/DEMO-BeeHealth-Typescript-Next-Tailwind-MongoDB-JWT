import { useState, useEffect } from 'react';
import { XCircle, Plus, Trash2 } from 'lucide-react';

export default function ForbiddenLiquids({ diet, isEditing = false, editDiet, refreshDiets, setShowSuccessModal }) {
  const [items, setItems] = useState(diet.forbiddenLiquids.items || []);
  const [note, setNote] = useState(diet.forbiddenLiquids.note || '');
  const [newItem, setNewItem] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setItems(diet.forbiddenLiquids.items || []);
    setNote(diet.forbiddenLiquids.note || '');
  }, [diet.forbiddenLiquids]);

  const handleAdd = () => {
    if (!newItem.trim()) return;
    setItems([...items, newItem.trim()]);
    setNewItem('');
  };

  const handleDelete = (index) => setItems(items.filter((_, i) => i !== index));

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await editDiet(diet._id, { forbiddenLiquids: { items, note } });
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
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-red-100 p-2">
          <XCircle className="h-5 w-5 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Bebidas Prohibidas</h2>
      </div>

      {!isEditing && (
        <>
          {/* Read items */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((i, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3"
              >
                <XCircle className="mt-1 h-4 w-4 shrink-0 text-red-600" />
                <span className="text-gray-700">{i}</span>
              </div>
            ))}
          </div>

          {/* Read note */}
          {note && (
            <div className="bg-beehealth-body-main rounded-lg border-l-2 border-gray-300 p-3">
              <p className="text-sm text-gray-600 italic">{note}</p>
            </div>
          )}
        </>
      )}

      {isEditing && (
        <>
          {/* Edit items */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((i, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3"
              >
                <div className="flex items-start gap-3">
                  <XCircle className="mt-1 h-4 w-4 shrink-0 text-red-600" />
                  <span className="text-gray-700">{i}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* New item input */}
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Ej. Refresco, bebidas energéticas"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Note input */}
          <label className="mb-1 block text-sm font-medium text-gray-700">Nota opcional</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Detalles o excepciones sobre líquidos prohibidos"
            className="bg-beehealth-body-main w-full rounded-lg border border-gray-300 p-3 text-sm"
            rows={3}
          />

          {/* Save button */}
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </>
      )}
    </section>
  );
}
