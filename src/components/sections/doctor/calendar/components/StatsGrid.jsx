export default function StatsGrid({ stats, icons }) {
  const { CalendarIcon, CheckCircle, Clock, TrendingUp } = icons;
  const items = [
    {
      label: 'Citas este mes',
      value: stats.totalAppointmentsThisMonth,
      Icon: CalendarIcon,
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'from-beehealth-green-primary-light to-beehealth-green-primary-dark',
    },
    {
      label: 'Días con citas',
      value: stats.daysWithAppointments,
      Icon: CheckCircle,
      gradient: 'from-emerald-500 to-green-600',
      bg: 'from-beehealth-green-primary-light to-beehealth-green-primary-dark',
    },
    {
      label: 'Citas hoy',
      value: stats.todayAppointments,
      Icon: Clock,
      gradient: 'from-amber-500 to-orange-600',
      bg: 'from-beehealth-green-primary-light to-beehealth-green-primary-dark',
    },
  ];
  return (
    <div className="mx-auto mb-6 max-w-7xl px-2">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {items.map(({ label, value, Icon, gradient, bg }, i) => (
          <div
            key={label}
            style={{ animationDelay: `${i * 100}ms` }}
            className={`bg-beehealth-blue-primary-solid/30 animate-fadeInUp group relative overflow-hidden rounded-2xl border-2 border-gray-200 p-4 shadow-sm transition hover:scale-105 hover:shadow-lg`}
          >
            <div
              className={`absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-linear-to-br ${gradient} opacity-10 transition group-hover:scale-150`}
            />
            <div className="relative z-10">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-gray-600 md:text-sm">{label}</p>
                <div className={`rounded-lg bg-linear-to-br ${gradient} p-1.5`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 md:text-3xl">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
