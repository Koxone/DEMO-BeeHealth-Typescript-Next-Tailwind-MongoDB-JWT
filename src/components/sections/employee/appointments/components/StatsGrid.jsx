'use client';

/* stats */
export default function StatsGrid({ stats, icons }) {
  const items = [
    {
      label: 'Total',
      value: stats.total,
      icon: icons.Calendar,
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'from-blue-50 to-indigo-50',
    },
    {
      label: 'Confirmadas',
      value: stats.confirmadas,
      icon: icons.CheckCircle,
      gradient: 'from-emerald-500 to-green-600',
      bg: 'from-emerald-50 to-green-50',
    },
    {
      label: 'Pendientes',
      value: stats.pendientes,
      icon: icons.Clock,
      gradient: 'from-amber-500 to-orange-600',
      bg: 'from-amber-50 to-orange-50',
    },
    {
      label: 'Canceladas',
      value: stats.canceladas,
      icon: icons.X,
      gradient: 'from-rose-500 to-red-600',
      bg: 'from-rose-50 to-red-50',
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {items.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            style={{ animationDelay: `${index * 100}ms` }}
            className={`bg-linear-to-br ${stat.bg} animate-fadeInUp rounded-2xl border-2 border-gray-200 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium text-gray-600 md:text-sm">{stat.label}</p>
              <div className={`bg-linear-to-br p-1.5 ${stat.gradient} rounded-lg`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 md:text-3xl">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
