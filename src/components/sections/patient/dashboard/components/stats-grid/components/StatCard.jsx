import React from 'react';

function StatCard({ Icon, label, value, unit }) {
  return (
    <div className="border-beehealth-blue-primary-solid/30 flex flex-col items-center justify-center rounded-lg border bg-linear-to-r from-gray-50 to-blue-50 p-2 shadow-xl">
      <div className="mb-2 flex items-center gap-4">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <div className="bg-beehealth-blue-primary-solid rounded-lg p-2">
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-700">
        {value} {unit}
      </p>
    </div>
  );
}

export default StatCard;
