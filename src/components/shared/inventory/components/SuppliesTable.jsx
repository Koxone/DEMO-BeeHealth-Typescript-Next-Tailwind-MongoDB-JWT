'use client';

import clsx from 'clsx';
import ActionButtons from './modals/shared/ActionsButtons';

export default function SuppliesTable({ rows, getStockStatus, onEdit, onDelete, onHistory }) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-beehealth-body-main flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <span className="text-2xl text-gray-400">📦</span>
          </div>
          <p className="mb-1 text-base font-medium text-gray-900">No hay suministros registrados</p>
          <p className="text-sm text-gray-500">Comienza agregando tu primer suministro</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="bg-beehealth-body-main max-h-[500px] overflow-auto rounded-xl border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-beehealth-body-main/50 border-b border-gray-200">
                <th className="px-4 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Suministro
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Categoría
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Stock
                </th>
                <th className="hidden px-4 py-4 text-right text-xs font-semibold tracking-wider text-gray-600 uppercase lg:table-cell">
                  Precio
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {rows.map((sum, index) => {
                const stockStatus = getStockStatus(sum?.quantity, sum?.minStock);
                const disabled = !sum?.product?.inStock;

                return (
                  <tr
                    key={`${sum.id}-${index}`}
                    className={clsx(
                      'group animate-fadeIn transition-colors duration-150',
                      disabled && 'bg-gray-300/40'
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationDuration: '0.3s',
                      animationTimingFunction: 'ease-in-out',
                      animationFillMode: 'forwards',
                    }}
                  >
                    {/* Supply name */}
                    <td className={clsx('px-4 py-4', disabled && 'opacity-60')}>
                      <div className="flex items-center gap-3">
                        <div
                          className={clsx(
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 transition-transform duration-200 group-hover:scale-110',
                            disabled && 'bg-gray-200'
                          )}
                        >
                          <span
                            className={clsx('text-lg text-amber-600', disabled && 'text-gray-500')}
                          >
                            🧴
                          </span>
                        </div>

                        <div className="min-w-0">
                          <p
                            className={clsx(
                              'truncate text-sm font-semibold text-gray-900',
                              disabled && 'text-gray-600'
                            )}
                          >
                            {sum?.product?.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      <span
                        className={clsx(
                          'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                          disabled ? 'bg-gray-200 text-gray-500' : 'bg-gray-100 text-gray-700'
                        )}
                      >
                        {sum?.product?.category}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-4 text-center">
                      <div
                        className={clsx(
                          'flex flex-col items-center gap-1',
                          disabled && 'opacity-60'
                        )}
                      >
                        <span
                          className={clsx(
                            'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm',
                            stockStatus.bg,
                            stockStatus.color,
                            disabled && 'bg-gray-200 text-gray-500'
                          )}
                        >
                          <span className="relative flex h-2 w-2">
                            {!disabled && (
                              <>
                                {/* Outer ping */}
                                <span
                                  className={clsx(
                                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                                    stockStatus.color.startsWith('text-red') && 'bg-red-400',
                                    stockStatus.color.startsWith('text-yellow') && 'bg-yellow-400',
                                    stockStatus.color.startsWith('text-green') && 'bg-green-400'
                                  )}
                                ></span>

                                {/* Inner pulse */}
                                <span
                                  className={clsx(
                                    'relative inline-flex h-2 w-2 animate-pulse rounded-full',
                                    stockStatus.color.startsWith('text-red') && 'bg-red-500',
                                    stockStatus.color.startsWith('text-yellow') && 'bg-yellow-600',
                                    stockStatus.color.startsWith('text-green') && 'bg-green-500'
                                  )}
                                ></span>
                              </>
                            )}
                          </span>
                          {sum?.quantity} / {sum?.minStock}
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="hidden px-4 py-4 text-right lg:table-cell">
                      <span
                        className={clsx(
                          'text-sm font-semibold',
                          disabled ? 'text-gray-600' : 'text-gray-900'
                        )}
                      >
                        ${parseFloat(sum?.product?.costPrice).toFixed(2)}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-4 py-4">
                      <ActionButtons
                        item={sum}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onHistory={onHistory}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
