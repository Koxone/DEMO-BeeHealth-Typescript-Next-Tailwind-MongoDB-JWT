export default function GoalsHistoryCard({ goal }) {
  return (
    <div
      key={goal?._id}
      className="bg-beehealth-green-primary-light hover:bg-beehealth-green-primary-light-hover flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-colors"
    >
      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="border-beehealth-blue-primary-light bg-beehealth-blue-primary-light flex h-12 w-12 flex-col items-center justify-center rounded-lg border text-center">
          <span className="text-beehealth-blue-primary-dark text-xs font-medium uppercase">
            {new Date(goal?.createdAt).toLocaleDateString('es-MX', {
              month: 'short',
            })}
          </span>
          <span className="text-beehealth-blue-primary-dark text-lg font-bold">
            {new Date(goal?.createdAt).getDate()}
          </span>
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold text-gray-700">Meta asignada: {goal?.goal}kg</p>
          <p className="text-sm text-gray-500">Peso inicial: {goal?.initialWeight}kg</p>
        </div>
      </div>

      {/* Action badge */}
      <div
        className={[
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold',
          goal?.comply === true
            ? 'bg-green-100 text-green-700'
            : goal?.comply === false
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-500',
        ].join(' ')}
      >
        {goal?.comply === true
          ? 'Cumplida'
          : goal?.comply === false
            ? 'No cumplida'
            : 'No evaluada'}
      </div>
    </div>
  );
}
