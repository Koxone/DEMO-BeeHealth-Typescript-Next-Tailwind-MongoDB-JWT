import { Plus, X } from 'lucide-react';
import { useState } from 'react';

function DynamicListSection({
  title,
  Icon,
  variant = 'success',
  placeholder,
  optional = true,
  value,
  onChange,
}) {
  // Variant styles
  const variantStyles = {
    success: {
      background: 'bg-beehealth-green-secondary-solid',
      text: 'text-white',
      buttons: 'bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-hover',
    },
    warning: {
      background: 'bg-beehealth-red-primary-solid',
      text: 'text-white',
      buttons: 'bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover',
    },
    neutral: {
      background: 'bg-beehealth-blue-primary-solid',
      text: 'text-white',
      buttons: 'bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover',
    },
  };

  const styles = variantStyles[variant];

  // local state solo para input temporal
  const [inputValue, setInputValue] = useState('');

  // Detect if value has items and note
  const items = Array.isArray(value) ? value : value.items || [];
  const note = !Array.isArray(value) && value.note !== undefined ? value.note : '';

  // Agregar item
  const handleAdd = () => {
    if (!inputValue.trim()) return;
    const newItems = [...items, inputValue.trim()];
    setInputValue('');
    if (Array.isArray(value)) {
      onChange({ target: { value: newItems } });
    } else {
      onChange({ target: { value: { ...value, items: newItems } } });
    }
  };

  // Eliminar item
  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    if (Array.isArray(value)) {
      onChange({ target: { value: newItems } });
    } else {
      onChange({ target: { value: { ...value, items: newItems } } });
    }
  };

  // Actualizar nota
  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    if (!Array.isArray(value)) {
      onChange({ target: { value: { ...value, note: newNote } } });
    }
  };

  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className={`rounded-lg ${styles.background} p-2`}>
          <Icon className={`h-5 w-5 ${styles.text}`} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {optional && <span className="ml-1 text-xs text-gray-400">(Opcional)</span>}
        {!optional && <span className="ml-1 text-xs text-gray-400">(Requerido)</span>}
      </div>

      {/* Items list */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-beehealth-body-main flex items-center justify-between rounded-lg border border-gray-300 p-2 text-sm"
          >
            <span>{item}</span>
            <button onClick={() => handleRemove(index)} className="rounded-lg bg-gray-200 p-1">
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>

      {/* Add item input */}
      <div
        className="mb-4 flex gap-2"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
          }
        }}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2 text-sm"
        />
        <button
          type="button"
          onClick={handleAdd}
          className={`flex items-center justify-center rounded-lg ${styles.buttons} px-3 py-2 text-sm font-medium text-white`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Note */}
      {!Array.isArray(value) && (
        <>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nota opcional</label>
          <textarea
            placeholder="Escribe una nota para esta sección"
            className="bg-beehealth-body-main w-full rounded-lg border border-gray-300 p-3 text-sm"
            rows={3}
            value={note}
            onChange={handleNoteChange}
          />
        </>
      )}
    </section>
  );
}

export default DynamicListSection;
