'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function DistributionCard({ data }) {
  const safeData =
    Array.isArray(data) && data.length > 0
      ? data.map((d) => ({
          ...d,
          value: d.value > 0 ? d.value : 0.0001,
        }))
      : [
          {
            name: 'Sin datos',
            value: 1,
            color: '#e5e7eb',
          },
        ];

  return (
    <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Distribución</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={safeData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {safeData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {safeData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-700">{item.name}</span>
            </div>
            <span className="font-semibold text-gray-900">
              ${Number(item.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
