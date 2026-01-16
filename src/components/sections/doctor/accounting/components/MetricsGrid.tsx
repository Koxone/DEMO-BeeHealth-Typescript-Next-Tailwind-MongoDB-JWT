'use client';

import { DollarSign, Users, Pill, TrendingUp } from 'lucide-react';

export default function MetricsGrid({
  consultPrice,
  totalItemsSold,
  totalCost,
  itemsSoldCount,
  consultsCount,
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {/* Totals */}
      <div className="bg-beehealth-blue-primary-solid rounded-xl p-4 text-white shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <DollarSign className="h-8 w-8 opacity-80" />
          <span className="bg-beehealth-body-main/20 rounded px-2 py-1 text-xs">Hoy</span>
        </div>
        <p className="mb-1 text-2xl font-bold md:text-3xl">${totalCost}</p>
        <p className="text-xs text-blue-100 md:text-sm">Total del día</p>
      </div>

      {/* Consults */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <Users className="text-beehealth-blue-primary-solid h-8 w-8" />
          <span className="text-beehealth-blue-primary-dark rounded bg-blue-50 px-2 py-1 text-xs font-medium">
            {consultsCount} {consultsCount === 1 ? 'consulta' : 'consultas'}
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-700 md:text-3xl">${consultPrice}</p>
        <p className="text-xs text-gray-600 md:text-sm">Consultas</p>
      </div>

      {/* Medicines */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <Pill className="text-beehealth-blue-primary-solid h-8 w-8" />
          <span className="text-beehealth-blue-primary-dark rounded bg-blue-50 px-2 py-1 text-xs font-medium">
            {itemsSoldCount} {itemsSoldCount === 1 ? 'vendido' : 'vendidos'}
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-700 md:text-3xl">${totalItemsSold}</p>
        <p className="text-xs text-gray-600 md:text-sm">Medicamentos</p>
      </div>

      {/* Average */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <TrendingUp className="text-beehealth-blue-primary-solid h-8 w-8" />
          <span className="text-beehealth-blue-primary-dark rounded bg-blue-50 px-2 py-1 text-xs font-medium">
            +12%
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-700 md:text-3xl">
          ${consultsCount > 0 ? (totalCost / consultsCount).toFixed(2) : 0}
        </p>
        <p className="text-xs text-gray-600 md:text-sm">Promedio/paciente</p>
      </div>
    </div>
  );
}
