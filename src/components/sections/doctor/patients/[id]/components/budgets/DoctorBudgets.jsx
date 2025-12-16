'use client';

import { Plus, FileText } from 'lucide-react';
import { useState } from 'react';
import DoctorCreateBudgetModal from './components/createBudgetModal/DoctorCreateBudgetModal';

export default function DoctorBudgets() {
  // State
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data
  const budgets = [
    {
      id: 1,
      status: 'Activa',
      date: '2025-10-30',
      doctor: 'ACOSTA',
      diagnosis: 'Gingivitis',
      treatment: 'GINGIVECTOMIA CUADRANTE SD GINGIVECTOMIA CUADRANTE SI',
      type: 'Parodoncia',
      payment: 'Un Pago',
      total: '7,040.00',
      agreed: '0.00',
      done: '7,040.00',
      remaining: '0.00',
    },
    {
      id: 2,
      status: 'Activa',
      date: '2025-09-30',
      doctor: 'ACOSTA',
      diagnosis: 'Prevención',
      treatment: 'CONSULTA REVISION G',
      type: 'Operatoria',
      payment: 'Un Pago',
      total: '858.00',
      agreed: '0.00',
      done: '0.00',
      remaining: '858.00',
    },
    {
      id: 3,
      status: 'Activa',
      date: '2025-02-04',
      doctor: 'BARRIGA',
      diagnosis: 'Prevención',
      treatment: 'PROFILAXIS Y FLUOR VISA DE LA SALUD G',
      type: 'Operatoria',
      payment: 'Citas',
      total: '0.00',
      agreed: '0.00',
      done: '0.00',
      remaining: '0.00',
    },
  ];

  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--med-blue-light) sm:h-12 sm:w-12">
            <FileText className="text-beehealth-green-primary-dark h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-(--med-text-dark) sm:text-xl">
              Presupuestos
            </h2>
            <p className="text-xs text-(--med-text-muted) sm:text-sm">
              Historial de presupuestos del paciente
            </p>
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-beehealth-green-primary-dark flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Agregar presupuesto
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-(--med-blue-light)/20 text-left text-(--med-text-muted)">
              <th className="p-3 font-medium whitespace-nowrap"></th>
              <th className="p-3 font-medium whitespace-nowrap">Estatus</th>
              <th className="p-3 font-medium whitespace-nowrap">Fecha</th>
              <th className="p-3 font-medium whitespace-nowrap">Doctor</th>
              <th className="p-3 font-medium whitespace-nowrap">Diagnóstico</th>
              <th className="p-3 font-medium whitespace-nowrap">Tratamiento</th>
              <th className="p-3 font-medium whitespace-nowrap">Tipo</th>
              <th className="p-3 font-medium whitespace-nowrap">F. Pago</th>
              <th className="p-3 font-medium whitespace-nowrap">Costo total</th>
              <th className="p-3 font-medium whitespace-nowrap">P. Ac.</th>
              <th className="p-3 font-medium whitespace-nowrap">P. Real.</th>
              <th className="p-3 font-medium whitespace-nowrap">Resta</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((b) => (
              <tr
                key={b.id}
                className="bg-beehealth-body-main border-t border-(--med-gray-border) transition hover:bg-(--med-blue-light)/10"
              >
                {/* PDF Icon */}
                <td className="p-3 text-center">
                  <button
                    className="rounded-lg bg-blue-100 p-2 transition hover:bg-blue-200 active:scale-95"
                  >
                    <FileText className="h-5 w-5 text-blue-600" />
                  </button>
                </td>

                <td className="p-3 font-medium text-(--med-green)">{b.status}</td>
                <td className="p-3 text-(--med-text-dark)">{b.date}</td>
                <td className="p-3 text-(--med-text-dark)">{b.doctor}</td>
                <td className="p-3 text-(--med-text-dark)">{b.diagnosis}</td>
                <td className="p-3 text-blue-600 underline">{b.treatment}</td>
                <td className="p-3 text-(--med-text-dark)">{b.type}</td>
                <td className="p-3 text-(--med-text-dark)">{b.payment}</td>
                <td className="p-3 text-(--med-text-dark)">{b.total}</td>
                <td className="p-3 text-(--med-text-dark)">{b.agreed}</td>
                <td className="p-3 text-(--med-text-dark)">{b.done}</td>
                <td className="p-3 text-(--med-text-dark)">{b.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreateModal && <DoctorCreateBudgetModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}
