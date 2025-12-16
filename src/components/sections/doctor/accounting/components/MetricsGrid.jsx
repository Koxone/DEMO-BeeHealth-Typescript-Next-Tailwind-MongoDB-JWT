'use client';

import { DollarSign, Users, Pill, TrendingUp } from 'lucide-react';

export default function MetricsGrid({
  totalDia,
  totalConsultas,
  totalMedicamentos,
  consultasCount,
  medsCount,
  promedio,
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {/* total día */}
      <div className="bg-beehealth-blue-primary-solid rounded-xl p-4 text-white shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <DollarSign className="h-8 w-8 opacity-80" />
          <span className="bg-beehealth-body-main/20 rounded px-2 py-1 text-xs">Hoy</span>
        </div>
        <p className="mb-1 text-2xl font-bold md:text-3xl">${totalDia.toLocaleString()}</p>
        <p className="text-xs text-blue-100 md:text-sm">Total del día</p>
      </div>

      {/* consultas */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <Users className="h-8 w-8 text-green-500" />
          <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            {consultasCount}
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
          ${totalConsultas.toLocaleString()}
        </p>
        <p className="text-xs text-gray-600 md:text-sm">Consultas</p>
      </div>

      {/* medicamentos */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <Pill className="h-8 w-8 text-purple-500" />
          <span className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
            {medsCount}
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
          ${totalMedicamentos.toLocaleString()}
        </p>
        <p className="text-xs text-gray-600 md:text-sm">Medicamentos</p>
      </div>

      {/* promedio */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <TrendingUp className="h-8 w-8 text-orange-500" />
          <span className="rounded bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
            +12%
          </span>
        </div>
        <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">${promedio || 0}</p>
        <p className="text-xs text-gray-600 md:text-sm">Promedio/paciente</p>
      </div>
    </div>
  );
}
