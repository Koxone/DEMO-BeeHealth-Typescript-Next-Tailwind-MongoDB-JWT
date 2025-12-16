import { FileText } from 'lucide-react';
import React from 'react';

export default function Description({ diet }) {
  const description = diet.description || '';

  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-gray-100 p-2">
          <FileText className="h-5 w-5 text-gray-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Descripción</h2>
      </div>

      {/* Content */}
      <p className="leading-relaxed whitespace-pre-line text-gray-700">{description}</p>
    </section>
  );
}
