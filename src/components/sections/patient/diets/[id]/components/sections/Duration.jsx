import { Clock } from 'lucide-react';
import React from 'react';

function Duration({ diet }) {
  const duration = diet.duration || '';

  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-orange-100 p-2">
          <Clock className="h-5 w-5 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Duración</h2>
      </div>

      {/* Content */}
      <p className="leading-relaxed text-gray-700">{duration}</p>
    </section>
  );
}

export default Duration;
