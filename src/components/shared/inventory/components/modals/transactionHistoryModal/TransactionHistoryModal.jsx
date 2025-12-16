'use client';

import { X, History } from 'lucide-react';
import { useModalClose } from '@/hooks/useModalClose';
import RestockBlock from './components/RestockBlock';
import StatusOnBlock from './components/StatusOnBlock';
import StatusOffBlock from './components/StatusOffBlock';
import InitialStockBlock from './components/InitialStockBlock';
import TransactionBlock from './components/TransactionBlock';

export default function TransactionHistoryModal({ onClose, history, item, isLoading }) {
  const { handleOverlayClick } = useModalClose(onClose);

  const itemName = item?.product?.name;

  // Color mapping for transaction backgrounds
  const bgColorMap = {
    initial: 'bg-green-400/60',
    restock: 'bg-yellow-100/60',
    correction: 'bg-green-100/60',
    status_change_IN: 'bg-blue-200/60',
    status_change_OUT: 'bg-blue-200/60',
  };

  function getTransactionBg(transaction) {
    if (!transaction) return 'bg-beehealth-body-main';
    const { reasonType, movement } = transaction;
    if (reasonType === 'status_change') {
      return bgColorMap[`status_change_${movement}`] || 'bg-beehealth-body-main';
    }
    return bgColorMap[reasonType] || 'bg-beehealth-body-main';
  }

  /* Loading state */
  if (isLoading) {
    return (
      <div
        id="overlay"
        onClick={handleOverlayClick}
        className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      >
        <div
          className="bg-beehealth-body-main relative w-full max-w-md overflow-hidden rounded-3xl p-8 text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Spinner container */}
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Spinner */}
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>

            {/* Loading text */}
            <h2 className="text-xl font-bold text-gray-900">Cargando</h2>
          </div>
        </div>
      </div>
    );
  }

  /* No history */
  if (!history || history.length === 0) {
    return (
      <div
        id="overlay"
        onClick={handleOverlayClick}
        className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      >
        <div
          className="bg-beehealth-body-main relative w-full max-w-md overflow-hidden rounded-3xl p-8 text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-gray-900">Sin historial</h2>
          <p className="mt-2 text-sm text-gray-600">
            Este producto no tiene movimientos registrados.
          </p>

          <button
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal */}
      <div
        className="bg-beehealth-body-main relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative */}
        <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br from-green-100 to-emerald-200 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr from-green-100 to-emerald-200 opacity-20 blur-3xl" />

        {/* Header */}
        <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-gray-100 backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-green-100 to-emerald-200 opacity-10" />
          <div className="relative px-6 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="bg-beehealth-blue-primary-solid relative flex items-center justify-center rounded-2xl p-3 shadow-lg">
                    <History className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Historial de <span className="text-blue-500">{itemName}</span>
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">Movimientos recientes del producto</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl bg-gray-100 p-2 transition-all hover:bg-red-500"
              >
                <X className="h-5 w-5 text-gray-600 hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-180px)] space-y-4 overflow-y-auto p-6">
          {history?.map((transaction) => (
            <div
              key={transaction?._id}
              className={`rounded-2xl border border-gray-200 p-4 shadow-sm transition-all hover:shadow-md ${getTransactionBg(transaction)}`}
            >
              {/* Initial Stock */}
              {transaction?.changedFields?.length === 0 &&
                transaction?.reasonType === 'initial' &&
                transaction?.movement === 'IN' && <InitialStockBlock transaction={transaction} />}

              {/* Restock Block */}
              {transaction?.changedFields?.length === 0 &&
                transaction?.reasonType === 'restock' && <RestockBlock transaction={transaction} />}

              {/* Status Block ON */}
              {transaction?.changedFields?.length === 0 &&
                transaction?.reasonType === 'status_change' &&
                transaction?.movement === 'IN' && <StatusOnBlock transaction={transaction} />}

              {/* Status Block OFF */}
              {transaction?.changedFields?.length === 0 &&
                transaction?.reasonType === 'status_change' &&
                transaction?.movement === 'OUT' && <StatusOffBlock transaction={transaction} />}

              {/* General */}
              {transaction?.changedFields?.length > 0 && (
                <TransactionBlock transaction={transaction} />
              )}

              {/* Consult Sales */}
              {transaction?.changedFields?.length === 0 && transaction?.reasonType === 'sale' && (
                <TransactionBlock transaction={transaction} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
