import { AlertCircle } from 'lucide-react';
import React from 'react';

function Notes({ diet }) {
  const notes = diet.notes || '';

  return (
    <section className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-200 p-2">
          <AlertCircle className="h-5 w-5 text-blue-700" />
        </div>
        <h2 className="text-xl font-semibold text-blue-900">Notas del Médico</h2>
      </div>

      {/* Content */}
      <p className="leading-relaxed whitespace-pre-line text-blue-900">{notes}</p>
    </section>
  );
}

export default Notes;
