import { AlertTriangle, TrendingDown, Pill } from 'lucide-react';

function AlertCard({ item }) {
  const { minStock, quantity } = item;

  // Helper para determinar el estado
  const getStatus = () => {
    if (quantity < minStock) {
      return {
        level: 'crítico',
        color: 'rose',
        label: 'CRÍTICO',
        icon: AlertTriangle,
        bg: 'from-rose-50 to-red-50',
        border: 'border-rose-300',
      };
    }
    if (quantity === minStock) {
      return {
        level: 'bajo',
        color: 'amber',
        label: 'BAJO',
        icon: TrendingDown,
        bg: 'from-amber-50 to-yellow-50',
        border: 'border-amber-300',
      };
    }
    return null;
  };

  const status = getStatus();

  if (!status) return null;

  const Icon = status.icon;
  const missing = Math.max(minStock - quantity, 0);
  const percentage = ((quantity / minStock) * 100).toFixed(0);

  return (
    <div className="px-5">
      <div
        className={`relative flex items-center justify-between rounded-xl border-2 ${status.border} bg-linear-to-r ${status.bg} p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
      >
        {/* Lado izquierdo */}
        <div className="relative z-10 flex min-w-0 flex-1 items-center gap-3">
          <div className={`relative rounded-xl bg-${status.color}-100 p-3`}>
            <Pill className={`h-5 w-5 text-${status.color}-600`} />
            <div
              className={`absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-${status.color}-500`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <p className="truncate text-sm font-bold text-gray-900">{item?.product?.name}</p>
              <span
                className={`animate-pulse rounded-full px-2 py-0.5 text-xs font-bold ${
                  status.color === 'rose'
                    ? 'bg-rose-600 text-rose-100'
                    : status.color === 'amber'
                      ? 'bg-amber-500 text-amber-50'
                      : 'bg-beehealth-body-main0 text-gray-100'
                }`}
              >
                {status.label}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-semibold text-${status.color}-600`}>
                  Stock: {quantity} unidades
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">Mínimo: {minStock}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full bg-linear-to-r from-${status.color}-500 to-${status.color}-600`}
                  style={{
                    width: `${Math.min((quantity / minStock) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className={`mb-1 text-xs font-medium text-${status.color}-600`}>
              Faltan {missing} unid.
            </p>
            <p className="text-xs text-gray-500">{percentage}% del mínimo</p>
          </div>
          <Icon className={`h-6 w-6 shrink-0 animate-bounce text-${status.color}-600`} />
        </div>
      </div>
    </div>
  );
}

export default AlertCard;
