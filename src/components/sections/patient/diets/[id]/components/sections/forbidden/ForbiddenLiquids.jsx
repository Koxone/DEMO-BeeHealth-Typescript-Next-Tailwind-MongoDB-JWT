import React from 'react';
import { XCircle } from 'lucide-react';

export default function ForbiddenLiquids({ diet }) {
  // Read only data
  const items = diet.forbiddenLiquids.items || [];
  const note = diet.forbiddenLiquids.note || '';

  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-red-100 p-2">
          <XCircle className="h-5 w-5 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Bebidas Prohibidas</h2>
      </div>

      {/* Items */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((i, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3"
          >
            <XCircle className="mt-1 h-4 w-4 shrink-0 text-red-600" />
            <span className="text-gray-700">{i}</span>
          </div>
        ))}
      </div>

      {/* Note */}
      {note && (
        <div className="bg-beehealth-body-main rounded-lg border-l-2 border-gray-300 p-3">
          <p className="text-sm text-gray-600 italic">{note}</p>
        </div>
      )}
    </section>
  );
}
