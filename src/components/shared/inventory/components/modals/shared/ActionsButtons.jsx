'use client';

import useAuthStore from '@/zustand/useAuthStore';
import clsx from 'clsx';
import { Edit2, Power, History } from 'lucide-react';

export default function ActionButtons({ item, onEdit, onDelete, onHistory }) {
  const { user } = useAuthStore();
  return (
    <div className="flex items-center justify-center gap-2">
      {/* Edit Button */}
      <button
        onClick={() => onEdit(item)}
        className={clsx(
          'group/btn relative rounded-lg p-2 transition-all duration-200',
          item?.product?.inStock
            ? [
                'cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-md active:scale-95',
              ]
            : ['pointer-events-none bg-gray-300 text-gray-600 opacity-60']
        )}
        title="Editar producto"
      >
        <Edit2
          className={clsx(
            'h-4 w-4 transition-transform duration-200',
            item?.product?.inStock ? 'group-hover/btn:scale-110' : 'text-gray-500'
          )}
        />
      </button>

      {/* Toggle Button */}
      <button
        onClick={() => onDelete(item)}
        className={`group/toggle relative rounded-lg p-2 transition-all duration-200 hover:shadow-md active:scale-95 ${
          item?.product?.inStock
            ? 'bg-green-300 hover:bg-green-500'
            : 'bg-red-500 text-red-900 hover:bg-red-500'
        }`}
        title={item?.product?.inStock ? 'Desactivar producto' : 'Reactivar producto'}
      >
        <Power
          className={`hover/btn:scale-110 h-4 w-4 transition-transform duration-200 ${
            item?.product?.inStock
              ? 'text-green-800'
              : 'group-hover/toggle:scale-120 group-hover/toggle:animate-bounce group-hover/toggle:text-white'
          }`}
        />
      </button>

      {/* Transaction History Button */}
      {user?.role === 'doctor' && (
        <button
          onClick={() => onHistory(item)}
          className="group/btn relative cursor-pointer rounded-lg bg-amber-50 p-2 transition-all duration-200 hover:bg-amber-100 hover:shadow-md active:scale-95"
          title="Ver historial de transacciones"
        >
          <History
            className={clsx(
              'h-4 w-4 transition-transform duration-200',
              item?.product?.inStock ? 'text-amber-600 group-hover/btn:scale-110' : 'text-gray-500'
            )}
          />
        </button>
      )}
    </div>
  );
}
