import React from 'react';

function Number({ question, required, value, placeholder, id, onChange }) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
      <input
        type="number"
        required={required}
        value={value ?? ''} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ''}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
      />
    </div>
  );
}

export default Number;
