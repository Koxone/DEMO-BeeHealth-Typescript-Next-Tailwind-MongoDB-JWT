'use client';

import {
  Calendar,
  Users,
  FileText,
  DollarSign,
  Edit2,
  Trash2,
  Award,
  Banknote,
  CreditCard,
  ArrowLeftRight,
} from 'lucide-react';

export default function ConsultsTable({ rows, totals, onEdit, onDelete }) {
  // Table columns
  const columns = [
    {
      key: 'fecha',
      label: 'Fecha',
      align: 'left',
      icon: Calendar,
    },
    {
      key: 'paciente',
      label: 'Paciente',
      align: 'left',
      icon: Users,
    },
    {
      key: 'tipo',
      label: 'Tipo',
      align: 'left',
      icon: FileText,
    },
    {
      key: 'costo',
      label: 'Costo',
      align: 'right',
      icon: DollarSign,
    },
    {
      key: 'extras',
      label: 'Extras',
      align: 'right',
      icon: DollarSign,
    },
    {
      key: 'metodo',
      label: 'Metodo de Pago',
      align: 'center',
      icon: null,
    },
    {
      key: 'acciones',
      label: 'Acciones',
      align: 'center',
      icon: null,
    },
  ];

  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full">
        <thead className="bg-beehealth-green-primary-light border-b-2 border-gray-200">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={`px-6 py-4 text-${col.align} `}>
                <div
                  className={`flex items-center ${col.align === 'right' ? 'justify-end' : ''} ${col.align === 'center' ? 'justify-center' : 'gap-2'} `}
                >
                  {col.icon && <col.icon className="h-4 w-4 text-gray-500" />}
                  <span className="text-sm font-semibold tracking-wide text-gray-900">
                    {col.label}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {rows?.map((c, i) => (
            <tr
              key={c?._id}
              style={{ animationDelay: `${i * 50}ms` }}
              className="group animate-fadeInUp transition hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50"
            >
              {/* Dates */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-beehealth-blue-primary-solid group-hover:bg-beehealth-blue-primary-solid-hover rounded-lg p-2 transition">
                    <Calendar className="h-4 w-4 text-white transition group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(c?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(c?.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </td>

              {/* Patient Info */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* Avatar or Initials */}
                  <div className="bg-beehealth-blue-primary-solid flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl text-sm font-bold text-white shadow-md">
                    {c?.patient?.avatar ? (
                      /* Image */
                      <img
                        src={c.patient.avatar}
                        alt={c.patient.fullName || 'Avatar'}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      /* Initials */
                      <span>
                        {c?.patient?.fullName
                          ?.split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </span>
                    )}
                  </div>

                  <span className="text-sm font-semibold text-gray-900">
                    {c?.patient?.fullName}
                  </span>
                </div>
              </td>

              {/* Type */}
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-700">{c?.consultType}</span>
              </td>

              {/* Cost */}
              <td className="px-6 py-4 text-right">
                <span className="text-lg font-semibold text-neutral-700">${c?.consultPrice}</span>
              </td>

              {/* Extras */}
              <td className="px-6 py-4 text-right">
                <span className="text-lg font-semibold text-neutral-700">${c?.totalItemsSold}</span>
              </td>

              {/* Payment Method */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold capitalize ${
                    c?.paymentMethod === 'efectivo'
                      ? 'border-[#C4E3CC] bg-[#E6F4EA] text-[#2F6E45]'
                      : c?.paymentMethod === 'tarjeta'
                        ? 'border-[#C9D8FF] bg-[#E7EEFF] text-[#3C5BBF]'
                        : 'border-[#FFE2B8] bg-[#FFF6E6] text-[#A86A00]'
                  }`}
                >
                  {c?.paymentMethod === 'efectivo' && <Banknote className="h-3.5 w-3.5" />}

                  {c?.paymentMethod === 'tarjeta' && <CreditCard className="h-3.5 w-3.5" />}

                  {c?.paymentMethod === 'transferencia' && (
                    <ArrowLeftRight className="h-3.5 w-3.5" />
                  )}

                  {c?.paymentMethod}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="group/btn rounded-xl border-2 border-transparent p-2 transition hover:border-blue-200 hover:bg-blue-50 active:scale-95"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600 transition-transform group-hover/btn:rotate-12" />
                  </button>
                  <button
                    onClick={() => onDelete(c)}
                    className="group/btn rounded-xl border-2 border-transparent p-2 transition hover:border-red-200 hover:bg-red-50 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 transition-transform group-hover/btn:scale-110" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="w-full border-t-2 border-gray-200">
          <tr className="font-semibold">
            <td colSpan="3" className="px-6 py-4 text-sm text-gray-900">
              <div className="flex items-center gap-2">
                <span>Total General</span>
              </div>
            </td>

            <td className="text-beehealth-blue-primary-solid px-6 py-4 text-right text-lg font-bold">
              ${totals.grandTotal.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
