import React from 'react';

function Select({ id, question, value, options, onChange, required }) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
      <select
        required={required}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
      >
        <option value="">Seleccione</option>
        {options?.map((opt) => (
          <option key={opt._id} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
