import { Utensils } from 'lucide-react';
import React from 'react';

function Instructions({ diet }) {
  const instructions = diet.instructions || '';

  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2">
          <Utensils className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Instrucciones</h2>
      </div>

      {/* Content */}
      <p className="leading-relaxed whitespace-pre-line text-gray-700">{instructions}</p>
    </section>
  );
}

export default Instructions;
