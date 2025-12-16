'use client';

import { Plus, Package } from 'lucide-react';
import { useState } from 'react';
import DoctorSaleProductsModal from './components/productSaleModal/DoctorSaleProductsModal';

export default function DoctorProducts() {
  // State
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data
  const products = [
    {
      id: 1,
      fecha: '2025-08-29',
      nombre: 'CLINIC-CEPILLO DENTAL NATURA',
      observaciones: '',
      cantidad: 1,
      precio: '20.00',
      total: '20.00',
      importe: '20.00',
      forma: 'Tarjeta Débito',
      factura: '0',
    },
    {
      id: 2,
      fecha: '2021-06-19',
      nombre: 'CLINIC-CEPILLO DENTAL NATURA',
      observaciones: '',
      cantidad: 1,
      precio: '20.00',
      total: '20.00',
      importe: '20.00',
      forma: 'Efectivo',
      factura: '0',
    },
    {
      id: 3,
      fecha: '2020-09-19',
      nombre: 'CLINIC-CEPILLO DENTAL NATURA',
      observaciones: '',
      cantidad: 1,
      precio: '20.00',
      total: '20.00',
      importe: '20.00',
      forma: 'Efectivo',
      factura: '0',
    },
  ];

  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--med-blue-light) sm:h-12 sm:w-12">
            <Package className="text-beehealth-green-primary-dark h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-(--med-text-dark) sm:text-xl">
              Venta de Productos
            </h2>
            <p className="text-xs text-(--med-text-muted) sm:text-sm">
              Historial de productos adquiridos por el paciente
            </p>
          </div>
        </div>

        {/* Add Product Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-beehealth-green-primary-dark flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Registrar Venta
        </button>
      </div>

      {/* Table */}
      <div className="bg-beehealth-body-main overflow-x-auto rounded-xl border border-(--med-gray-border) shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-(--med-blue-light)/30 text-left text-(--med-text-muted)">
              <th className="p-3 font-medium whitespace-nowrap">Fecha</th>
              <th className="p-3 font-medium whitespace-nowrap">Nombre</th>
              <th className="p-3 font-medium whitespace-nowrap">Observaciones</th>
              <th className="p-3 text-center font-medium whitespace-nowrap">Cant.</th>
              <th className="p-3 text-center font-medium whitespace-nowrap">Precio</th>
              <th className="p-3 text-center font-medium whitespace-nowrap">Total</th>
              <th className="p-3 text-center font-medium whitespace-nowrap">Importe</th>
              <th className="p-3 font-medium whitespace-nowrap">Forma</th>
              <th className="p-3 text-center font-medium whitespace-nowrap">No. Factura</th>
              <th className="p-3 text-center font-medium whitespace-nowrap">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, index) => (
              <tr
                key={p.id}
                className="bg-beehealth-body-main border-t border-(--med-gray-border) transition hover:bg-(--med-blue-light)/10"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animation: 'fadeIn 0.3s ease-out forwards',
                }}
              >
                <td className="p-3 text-(--med-text-dark)">{p.fecha}</td>
                <td className="p-3 text-(--med-text-dark)">{p.nombre}</td>
                <td className="p-3 text-(--med-text-dark)">{p.observaciones}</td>
                <td className="p-3 text-center text-(--med-text-dark)">{p.cantidad}</td>
                <td className="p-3 text-center text-(--med-text-dark)">{p.precio}</td>
                <td className="p-3 text-center text-(--med-text-dark)">{p.total}</td>
                <td className="p-3 text-center text-(--med-text-dark)">{p.importe}</td>
                <td className="p-3 text-(--med-text-dark)">{p.forma}</td>
                <td className="p-3 text-center text-(--med-text-dark)">{p.factura}</td>

                {/* Actions */}
                <td className="flex items-center justify-center gap-2 p-3">
                  <button
                    className="rounded-lg bg-yellow-100 p-2 transition hover:bg-yellow-200 active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4h2m2 0h2m-6 0h-2m0 0H9m0 0H7m-2 4h2m12 0h2M5 8v8m14-8v8M5 16h14m-7-4h2m0 0v4m-2-4v4m-3 0h8"
                      />
                    </svg>
                  </button>
                  <button
                    className="rounded-lg bg-red-100 p-2 transition hover:bg-red-200 active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showCreateModal && <DoctorSaleProductsModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}
