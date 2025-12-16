import React from 'react';

function StatCard({ Icon, label, value, unit }) {
  return (
    <div className="border-beehealth-blue-primary-solid/30 flex flex-col items-center justify-center rounded-lg border p-2 shadow-xl">
      <div className="mb-2 flex items-center gap-4">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <div className="rounded-lg bg-emerald-100 p-2">
          <Icon className="h-4 w-4 text-emerald-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {value} {unit}
      </p>
    </div>
  );
}

export default StatCard;
