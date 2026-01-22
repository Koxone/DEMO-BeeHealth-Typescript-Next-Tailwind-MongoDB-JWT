'use client';

import { useEffect, useState } from 'react';
import { Pill, Users, DollarSign, Banknote, CreditCard, ArrowLeftRight } from 'lucide-react';

export default function MedsSoldTable({ consultsData }) {
  const [medSold, setMedsSold] = useState([]);

  useEffect(() => {
    if (!consultsData) return;

    const result = consultsData.flatMap((consult) =>
      consult.itemsSold.map((item) => ({
        ...item,
        patient: consult.patient,
        consultStatus: consult.consultStatus,
        paymentMethod: consult.paymentMethod,
      }))
    );

    setMedsSold(result);
  }, [consultsData]);

  // Calculate Total General
  const totalMedicamentos = medSold.reduce((acc, m) => acc + m.total, 0);

  return (
    <div className="bg-beehealth-body-main hidden max-h-[600px] overflow-y-auto rounded-2xl border border-gray-200 shadow-sm md:block">
      <table className="w-full table-fixed">
        {/* Header */}
        <thead className="bg-beehealth-green-primary-light border-b-2 border-gray-200">
          <tr>
            {/* Patient */}
            <th className="px-6 py-4 text-left">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-semibold tracking-wide text-gray-700">Paciente</span>
              </div>
            </th>

            {/* Product */}
            <th className="px-6 py-4 text-left">
              <div className="flex items-center gap-2">
                <Pill className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-semibold tracking-wide text-gray-700">Producto</span>
              </div>
            </th>

            {/* Quantity */}
            <th className="px-6 py-4 text-center">
              <span className="text-sm font-semibold tracking-wide text-gray-700">Cantidad</span>
            </th>

            {/* Unit Price */}
            <th className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-semibold tracking-wide text-gray-700">
                  Precio Unitario
                </span>
              </div>
            </th>

            {/* Total */}
            <th className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-semibold tracking-wide text-gray-700">Total</span>
              </div>
            </th>

            {/* Payment Method */}
            <th className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-semibold tracking-wide text-gray-700">
                  Metodo de pago
                </span>
              </div>
            </th>

            {/* Actions */}
            {/* <th className="px-6 py-4 text-center">
              <span className="text-sm font-semibold tracking-wide text-gray-700">Acciones</span>
            </th> */}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {medSold.map((med, index) => (
            <tr
              key={med?.product?._id + index}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`group animate-fadeInUp transition ${
                med?.consultStatus === 'cancelled'
                  ? 'bg-beehealth-red-primary-light'
                  : 'hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50'
              }`}
            >
              {/* Patient */}
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-800 capitalize">
                  {med?.patient?.fullName}
                </span>
              </td>

              {/* Product */}
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-700">{med?.product?.name}</span>
              </td>

              {/* Quantity */}
              <td className="px-6 py-4 text-center">
                <span className="text-sm font-medium text-gray-700">{med?.quantity}</span>
              </td>

              {/* Unit Price */}
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-medium text-gray-700">
                  ${med?.price.toLocaleString()}
                </span>
              </td>

              {/* Total */}
              <td className="px-6 py-4 text-right">
                <span className="text-lg font-semibold tracking-wide text-neutral-700">
                  ${med?.total?.toLocaleString()}
                </span>
              </td>

              {/* Payment Method */}
              <td className="px-6 py-4 text-right">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold capitalize ${
                    med?.paymentMethod === 'efectivo'
                      ? 'border-[#C4E3CC] bg-[#E6F4EA] text-[#2F6E45]'
                      : med?.paymentMethod === 'tarjeta'
                        ? 'border-[#C9D8FF] bg-[#E7EEFF] text-[#3C5BBF]'
                        : 'border-[#FFE2B8] bg-[#FFF6E6] text-[#A86A00]'
                  }`}
                >
                  {med?.paymentMethod === 'efectivo' && <Banknote className="h-3.5 w-3.5" />}

                  {med?.paymentMethod === 'tarjeta' && <CreditCard className="h-3.5 w-3.5" />}

                  {med?.paymentMethod === 'transferencia' && (
                    <ArrowLeftRight className="h-3.5 w-3.5" />
                  )}

                  {med?.paymentMethod}
                </span>
              </td>

              {/* Actions */}
              {/* <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEditModal(m)}
                    className="group/btn rounded-xl border-2 border-transparent p-2 transition hover:border-blue-200 hover:bg-blue-50 active:scale-95"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600 transition-transform group-hover/btn:rotate-12" />
                  </button>

                  <button
                    onClick={() => openDeleteModal(m)}
                    className="group/btn rounded-xl border-2 border-transparent p-2 transition hover:border-red-200 hover:bg-red-50 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 transition-transform group-hover/btn:scale-110" />
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>

        <tfoot className="w-full border-t-2 border-gray-200">
          <tr className="font-semibold">
            <td colSpan={3} className="px-6 py-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span>Total General</span>
              </div>
            </td>

            <td className="text-beehealth-blue-primary-solid px-6 py-4 text-right text-lg font-semibold">
              ${totalMedicamentos.toLocaleString()}
            </td>

            <td colSpan={2} />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
