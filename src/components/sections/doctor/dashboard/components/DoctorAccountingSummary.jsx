import ViewMoreButton from '@/components/shared/dashboard/accountingSummary/components/ViewMoreButton';
import { Users, Pill, AlertCircle, ChevronRight, TrendingUp, DollarSign } from 'lucide-react';

export default function DoctorAccountingSummary({
  role,
  consultPrice,
  totalItemsSold,
  totalCost,
  consults,
}) {
  const itemsSoldNumber = consults.reduce((sum, consult) => {
    return sum + (consult.itemsSold?.length || 0);
  }, 0);

  return (
    <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="bg-beehealth-blue-primary-solid relative overflow-hidden px-6 py-5">
        <div className="bg-beehealth-body-main/10 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full" />
        <div className="bg-beehealth-body-main/10 absolute bottom-0 left-0 -mb-12 -ml-12 h-24 w-24 rounded-full" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-beehealth-body-main/20 rounded-xl p-2.5 backdrop-blur-sm">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">Resumen Contable</h2>
              <p className="text-sm text-blue-100">Estado financiero actual</p>
            </div>
          </div>

          {/* View More Button */}
          <ViewMoreButton role={role} route="accounting" />
        </div>
      </div>

      {/* Total */}
      <div className="bg-beehealth-green-primary-light border-b-2 border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-beehealth-blue-primary-solid rounded-lg p-2 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-xs text-gray-500">Consultas + Medicamentos</p>
            </div>
          </div>
          <div className="text-right">
            <p className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
              ${totalCost}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3 p-6">
        {[
          {
            icon: Users,
            label: 'Consultas',
            value: `${consults.length} pacientes`,
            amount: consultPrice,
            gradient: 'from-blue-500 to-indigo-600',
            bgGradient: 'from-blue-50 to-indigo-50',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            textColor: 'text-blue-600',
            borderColor: 'border-blue-200',
          },
          {
            icon: Pill,
            label: 'Medicamentos',
            value: `${itemsSoldNumber} vendidos`,
            amount: totalItemsSold,
            gradient: 'from-emerald-500 to-green-600',
            bgGradient: 'from-emerald-50 to-green-50',
            iconBg: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
            textColor: 'text-emerald-600',
            borderColor: 'border-emerald-200',
          },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`relative flex items-center justify-between rounded-xl border-2 ${item.borderColor} bg-linear-to-r ${item.bgGradient} p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              <div className="flex items-center gap-3">
                <div className={`${item.iconBg} rounded-xl p-3`}>
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
                  <p className="font-bold text-gray-900">{item.value}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${item.textColor}`}>${item.amount}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
