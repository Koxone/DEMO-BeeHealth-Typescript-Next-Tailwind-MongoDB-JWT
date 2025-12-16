import React from 'react';

function Radio({ id, question, value, options, onChange, required }) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
      <div className="flex flex-wrap gap-4">
        {options?.map((opt) => {
          const val = opt.value;
          const lbl = opt.label;
          return (
            <label key={val} className="flex items-center gap-2">
              <input
                type="radio"
                name={`q-${id}`}
                value={val}
                checked={value === val}
                onChange={() => onChange(val)}
                required={required}
              />
              {lbl}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default Radio;
