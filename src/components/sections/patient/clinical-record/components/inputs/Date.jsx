import React from 'react';

function Date({ question, required, value, id, onChange }) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
      <input
        type="date"
        required={required}
        value={value ?? ''} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
      />
    </div>
  );
}

export default Date;
