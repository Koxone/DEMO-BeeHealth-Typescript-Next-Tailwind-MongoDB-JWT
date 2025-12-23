'use client';

import { Pill, TrendingUp, Users } from 'lucide-react';

export default function MetricsGrid({
  totalCost,
  totalItemsSold,
  consultPrice,
  consultsCount,
  itemsSoldCount,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="bg-beehealth-body-main relative overflow-hidden rounded-2xl border-2 border-gray-200 p-5 shadow-lg">
        <div className="bg-beehealth-body-main/10 absolute top-0 right-0 -mt-12 -mr-12 h-24 w-24 rounded-full" />
        <div className="relative z-10">
          <div className="mb-3 flex items-center justify-between">
            <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="bg-beehealth-blue-primary-solid rounded-full px-3 py-1.5 text-xs font-bold text-white">
              Total
            </span>
          </div>
          <p className="mb-1 text-3xl font-bold">${totalCost.toFixed(2)}</p>
          <p className="text-sm">Ingresos del Dia</p>
        </div>
      </div>

      {/* cobrado */}
      <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <Users className="h-6 w-6 text-white" />
          </div>
          <span className="bg-beehealth-blue-primary-solid rounded-full px-3 py-1.5 text-xs font-bold text-white">
            {consultsCount || 0}
          </span>
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-700">${consultPrice.toFixed(2)}</p>
        <p className="text-sm font-medium text-gray-600">Consultas</p>
      </div>

      {/* pendiente */}
      <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <Pill className="h-6 w-6 text-white" />
          </div>
          <span className="bg-beehealth-blue-primary-solid rounded-full px-3 py-1.5 text-xs font-bold text-white">
            {itemsSoldCount || 0}
          </span>
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-700">${totalItemsSold.toFixed(2)}</p>
        <p className="text-sm font-medium text-gray-600">Medicamentos</p>
      </div>
    </div>
  );
}
