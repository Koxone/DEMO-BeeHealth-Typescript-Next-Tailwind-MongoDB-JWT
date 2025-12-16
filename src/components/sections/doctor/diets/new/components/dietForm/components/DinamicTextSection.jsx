import { FileText, CheckCircle } from 'lucide-react';
import React from 'react';

function DinamicTextSection({
  title = '',
  Icon,
  placeholder = '',
  optional = true,
  value,
  onChange,
}) {
  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <div className="h-6 w-1 rounded-full bg-yellow-600"></div>
        {title}
        {optional && <span className="ml-1 text-xs text-gray-400">(Opcional)</span>}
      </h2>

      <div className="mt-4 space-y-4">
        <textarea
          className="focus:border-beehealth-blue w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none"
          rows={2}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </section>
  );
}

export default DinamicTextSection;
