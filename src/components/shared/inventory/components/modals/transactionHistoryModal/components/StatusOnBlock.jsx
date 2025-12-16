import { ArrowDownCircle, ArrowUpCircle, User } from 'lucide-react';
import React from 'react';

function StatusOnBlock({ transaction }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">Disponibilidad</span>

        <span className="flex items-center gap-1 rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-700">
          Encendido
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-800">Motivo:</span> {transaction?.reason}
        </p>
        <p>
          <span className="font-medium text-gray-800">Tipo:</span> Cambio de Estatus
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <User className="h-4 w-4 text-gray-500" />
        <span>{transaction?.performedBy?.fullName}</span>
      </div>

      <p className="mt-1 text-xs text-gray-400">
        {new Date(transaction?.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

export default StatusOnBlock;
