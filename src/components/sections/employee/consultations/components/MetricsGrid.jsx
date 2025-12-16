'use client';

import { Pill, TrendingUp, CheckCircle, AlertCircle, Users } from 'lucide-react';

/* metrics */
export default function MetricsGrid({ totals, consultsData }) {
  // prevent NaN
  const total = Number(totals?.total ?? 0);
  const cobradas = Number(totals?.cobradas ?? 0);
  const grandTotal = Number(totals?.grandTotal ?? 0);
  const consultsTotal = Number(totals?.consultsTotal ?? 0);
  const medsTotal = Number(totals?.medsTotal ?? 0);

  const totalQuantity = consultsData?.reduce((acc, consult) => {
    const itemsTotal = consult.itemsSold?.reduce((sum, item) => sum + (item.quantity || 0), 0);
    return acc + itemsTotal;
  }, 0);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* total ingresos */}
      <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-5 shadow-lg">
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
          <p className="mb-1 text-3xl font-bold">${grandTotal.toLocaleString()}</p>
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
            {consultsData?.length || 0}
          </span>
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-900">${consultsTotal.toLocaleString()}</p>
        <p className="text-sm font-medium text-gray-600">Consultas</p>
      </div>

      {/* pendiente */}
      <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <Pill className="h-6 w-6 text-white" />
          </div>
          <span className="bg-beehealth-blue-primary-solid rounded-full px-3 py-1.5 text-xs font-bold text-white">
            {totalQuantity || 0}
          </span>
        </div>
        <p className="mb-1 text-3xl font-bold text-gray-900">${medsTotal.toLocaleString()}</p>
        <p className="text-sm font-medium text-gray-600">Medicamentos</p>
      </div>
    </div>
  );
}
