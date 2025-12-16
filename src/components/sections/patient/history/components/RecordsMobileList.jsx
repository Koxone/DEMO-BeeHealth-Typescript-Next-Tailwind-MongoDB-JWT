'use client';

import { Calendar } from 'lucide-react';
import { getIMCCategory } from './utils';

export default function RecordsMobileList({ historyData = [] }) {
  return (
    <div className="space-y-3 p-4 md:hidden">
      {historyData.map((record, index) => {
        const category = getIMCCategory(record.imc);
        return (
          <div
            key={record.id}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-fadeInUp rounded-xl border-2 border-gray-200 bg-linear-to-br from-purple-50 to-pink-50 p-4 transition-all duration-300 hover:border-purple-300 hover:shadow-lg"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-bold text-gray-900">{record.fecha}</span>
              </div>
              <span className={`rounded-lg border px-2 py-1 text-xs font-bold ${category.color}`}>
                {category.label}
              </span>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-3">
              <div className="bg-beehealth-body-main rounded-lg p-3">
                <p className="mb-1 text-xs text-gray-600">Peso</p>
                <p className="text-xl font-bold text-purple-600">{record.peso} kg</p>
              </div>
              <div className="bg-beehealth-body-main rounded-lg p-3">
                <p className="mb-1 text-xs text-gray-600">IMC</p>
                <p className="text-xl font-bold text-gray-900">{record.imc}</p>
              </div>
            </div>

            <div className="bg-beehealth-body-main rounded-lg p-3">
              <p className="mb-1 text-xs text-gray-600">Notas</p>
              <p className="text-sm font-medium text-gray-900">{record.notas}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
