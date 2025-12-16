import { ArrowDownCircle, ArrowUpCircle, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function TransactionBlock({ transaction }) {
  /* Maps */
  const fieldMap = {
    costPrice: 'Costo',
    salePrice: 'Precio de Venta',
    name: 'Nombre',
    category: 'Categoría',
    minStock: 'Stock Mínimo',
    maxStock: 'Stock Máximo',
    quantity: 'Cantidad',
    status: 'Estado',
  };

  /* Money fields */
  const moneyFields = ['costPrice', 'salePrice'];

  /* Rows builder */
  const rows = (transaction.changedFields || []).map((field) => {
    const oldKey = `old${field.charAt(0).toUpperCase()}${field.slice(1)}`;
    const newKey = `new${field.charAt(0).toUpperCase()}${field.slice(1)}`;

    const oldVal = transaction[oldKey];
    const newVal = transaction[newKey];

    let delta = null;
    if (typeof oldVal === 'number' && typeof newVal === 'number') {
      delta = newVal - oldVal;
    }

    return {
      label: fieldMap[field] || field,
      field,
      oldVal,
      delta,
      newVal,
    };
  });

  /* Check type */
  const isSimpleMovement = rows.length === 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">
          {isSimpleMovement
            ? 'Movimiento de inventario'
            : rows.length > 1
              ? 'Cambios múltiples'
              : 'Cambio único'}
        </span>
      </div>

      <p className="text-sm text-gray-700">
        <span className="font-medium text-gray-800">Motivo:</span> {transaction.reason}
      </p>

      {/* Simple movement */}
      {isSimpleMovement && (
        <div className="mt-3 rounded-lg border border-gray-200 p-3 text-sm">
          {/* Movement info */}
          <div className="flex items-center gap-2">
            {transaction.movement === 'OUT' ? (
              <ArrowDownCircle className="h-4 w-4 text-red-600" />
            ) : (
              <ArrowUpCircle className="h-4 w-4 text-green-600" />
            )}
            <span>
              Movimiento {transaction.movement === 'OUT' ? 'saliente' : 'entrante'} con cantidad{' '}
              {transaction.quantity}
            </span>
          </div>

          {/* Patient */}
          {transaction.patient && (
            <p className="mt-2 text-gray-700">
              <span className="font-medium text-gray-800">Paciente:</span>{' '}
              <Link
                href={`/doctor/patients/${transaction.patient._id}`}
                className="text-blue-600 underline"
              >
                {transaction.patient.fullName}
              </Link>
            </p>
          )}
        </div>
      )}

      {/* Table of changes */}
      {!isSimpleMovement && (
        <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2 text-left">Tipo</th>
                <th className="px-3 py-2 text-left">Anterior</th>
                <th className="px-3 py-2 text-left">Cambio</th>
                <th className="px-3 py-2 text-left">Nuevo</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="px-3 py-2">{r.label}</td>

                  <td className="px-3 py-2">
                    {moneyFields.includes(r.field) ? `$${r.oldVal}` : r.oldVal}
                  </td>

                  <td
                    className={`px-3 py-2 ${
                      r.delta > 0
                        ? 'text-green-600'
                        : r.delta < 0
                          ? 'text-red-600'
                          : 'text-gray-600'
                    }`}
                  >
                    {r.delta !== null ? `${r.delta > 0 ? '+' : ''}${r.delta}` : ''}
                  </td>

                  <td className="px-3 py-2">
                    {moneyFields.includes(r.field) ? `$${r.newVal}` : r.newVal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <User className="h-4 w-4 text-gray-500" />
        <span>{transaction.performedBy?.fullName}</span>
      </div>

      <p className="mt-1 text-xs text-gray-400">
        {new Date(transaction.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

export default TransactionBlock;
