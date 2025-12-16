'use client';

import { Calendar, Weight, Activity, FileText, BarChart3, Ruler } from 'lucide-react';
import { getIMCCategory } from './utils';

export default function RecordsTable({ historyData = [], patientWeightLogs }) {
  return (
    <>
      {/* Header de la tabla */}
      <div className="bg-beehealth-blue-primary-solid relative overflow-hidden px-6 py-4">
        <div className="bg-beehealth-body-main/10 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-beehealth-body-main/20 rounded-xl p-2 backdrop-blur-sm">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Registro de Mediciones</h2>
            <p className="text-sm text-purple-100">
              {patientWeightLogs.length} {patientWeightLogs?.length > 1 ? 'registros' : 'registro'}
            </p>
          </div>
        </div>
      </div>

      {/* Records */}
      <div className="space-y-4 p-4 lg:space-y-0 lg:p-0">
        {/* Desktop Header */}
        <div className="hidden border-b-2 border-gray-200 bg-linear-to-r from-gray-50 to-blue-50 lg:grid lg:grid-cols-5">
          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-bold text-gray-900">Fecha</span>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Weight className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-bold text-gray-900">Peso (kg)</span>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-bold text-gray-900">Talla (cm)</span>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-bold text-gray-900">Diferencia (kg)</span>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-bold text-gray-900">Diferencia (cm)</span>
            </div>
          </div>
        </div>

        {/* Records */}
        {patientWeightLogs?.map((record, index) => {
          const category = getIMCCategory(record.imc);
          return (
            <div
              key={record._id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="group animate-fadeInUp rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg lg:grid lg:grid-cols-5 lg:divide-x lg:divide-gray-200 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b-2 lg:p-0 lg:shadow-none lg:hover:bg-linear-to-r lg:hover:from-purple-50 lg:hover:to-pink-50"
            >
              {/* Fecha */}
              <div className="mb-4 flex items-center gap-3 border-b-2 border-gray-100 pb-3 lg:mb-0 lg:border-b-0 lg:px-6 lg:py-4">
                <div className="bg-beehealth-blue-primary-solid group-hover:bg-beehealth-blue-primary-solid-hover rounded-lg p-2 transition-all duration-200">
                  <Calendar className="h-4 w-4 text-white transition-colors duration-200 group-hover:text-white" />
                </div>
                <div className="lg:flex lg:items-center lg:gap-2">
                  <p className="text-xs font-medium text-gray-500 lg:hidden">Fecha</p>
                  <p className="text-sm font-bold text-gray-900 lg:font-semibold">
                    {new Date(record?.createdAt).toISOString().split('T')[0]}
                  </p>
                </div>
              </div>

              {/* Grid de datos */}
              <div className="grid grid-cols-2 gap-4 lg:contents">
                {/* Peso */}
                <div className="flex flex-col lg:px-6 lg:py-4">
                  <div className="mb-2 flex items-center gap-2 lg:hidden">
                    <Weight className="h-4 w-4 text-gray-500" />
                    <p className="text-xs font-medium text-gray-600">Peso</p>
                  </div>
                  <div className="flex items-baseline gap-1 lg:items-center lg:gap-2">
                    <p className="text-xl font-bold text-gray-900 lg:text-2xl lg:text-gray-600">
                      {record?.currentWeight}
                    </p>
                    <p className="text-xs text-gray-500 lg:text-sm">kg</p>
                  </div>
                </div>

                {/* Talla */}
                <div className="flex flex-col lg:px-6 lg:py-4">
                  <div className="mb-2 flex items-center gap-2 lg:hidden">
                    <Ruler className="h-4 w-4 text-gray-500" />
                    <p className="text-xs font-medium text-gray-600">Talla</p>
                  </div>
                  <div className="flex items-baseline gap-1 lg:items-center lg:gap-3">
                    <p className="text-xl font-bold text-gray-900 lg:text-2xl lg:text-gray-600">
                      {record?.currentSize}
                    </p>
                    <p className="text-xs text-gray-500 lg:text-sm">cm</p>
                  </div>
                </div>

                {/* Diferencia Peso */}
                <div className="flex flex-col lg:px-6 lg:py-4">
                  <div className="mb-2 flex items-center gap-2 lg:hidden">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <p className="text-xs font-medium text-gray-600">Dif. Peso</p>
                  </div>
                  <div className="flex items-baseline gap-1 lg:items-center lg:gap-3">
                    <p className="text-xl font-bold text-gray-900 lg:text-2xl lg:text-gray-600">
                      {record?.differenceFromPrevious}
                    </p>
                    <p className="text-xs text-gray-500 lg:text-sm">kg</p>
                  </div>
                </div>

                {/* Diferencia Talla */}
                <div className="flex flex-col lg:px-6 lg:py-4">
                  <div className="mb-2 flex items-center gap-2 lg:hidden">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <p className="text-xs font-medium text-gray-600">Dif. Talla</p>
                  </div>
                  <div className="flex items-baseline gap-1 lg:items-center lg:gap-3">
                    <p className="text-xl font-bold text-gray-900 lg:text-2xl lg:text-gray-600">
                      {record?.differenceSizeFromPrevious}
                    </p>
                    <p className="text-xs text-gray-500 lg:text-sm">cm</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
