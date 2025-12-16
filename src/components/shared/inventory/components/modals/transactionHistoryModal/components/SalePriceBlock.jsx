import { ArrowDownCircle, ArrowUpCircle, User } from 'lucide-react';
import React from 'react';

function SalePriceBlock({ transaction }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        {/* Title */}
        <span className="font-semibold">
          {transaction?.changedFields?.includes('salePrice') && 'Precio de venta'}
        </span>

        {/* Badge */}
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
            transaction?.movement === 'IN'
              ? 'bg-green-200 text-green-700'
              : 'bg-red-200 text-red-500'
          }`}
        >
          {transaction?.movement === 'IN' ? (
            <ArrowUpCircle className="h-4 w-4" />
          ) : (
            <ArrowDownCircle className="h-4 w-4" />
          )}
          {transaction?.movement === 'IN' ? 'Aumento de ' : 'Disminución de '}
          Precio de venta
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1 text-sm text-gray-700">
        {/* Reason */}
        <p>
          <span className="font-medium text-gray-800">Motivo:</span> {transaction?.reason}
        </p>
        <p>
          <span className="font-medium text-gray-800">Tipo:</span>{' '}
          {transaction?.oldSalePrice > transaction?.newSalePrice
            ? 'Disminución de Precio de venta'
            : 'Aumento de Precio de venta'}
        </p>

        {/* Change Info */}
        <p>
          <span className="font-medium text-gray-800">Anterior:</span>{' '}
          {`$${transaction?.oldSalePrice}`}
        </p>

        <p>
          <span className="font-medium text-gray-800">Cambio:</span>{' '}
          {transaction?.movement === 'IN' ? '+' : ''}${transaction?.priceDelta}
        </p>

        <p>
          <span className="font-medium text-gray-800">Nuevo:</span>{' '}
          {`$${transaction?.newSalePrice}`}
        </p>
      </div>

      {/* Performed By */}
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

export default SalePriceBlock;
