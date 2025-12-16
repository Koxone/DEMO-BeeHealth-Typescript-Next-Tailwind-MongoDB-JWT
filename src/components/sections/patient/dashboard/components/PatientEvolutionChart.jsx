'use client';

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts';
import { Loader2 } from 'lucide-react';
import { useGetAllWeightLogs } from '@/hooks/clinicalRecords/get/useGetAllWeightLogs';
import LoadingState from '@/components/shared/feedback/LoadingState';

export default function PatientEvolutionChart({ title, legendLabel, legendColor, unit, stroke }) {
  // Weight Logs Hook
  const {
    weightLogs,
    loading: weightLogsLoading,
    error: weightLogsError,
    refetch: refetchWeightLogs,
  } = useGetAllWeightLogs();

  // Loading state
  if (weightLogsLoading) {
    return <LoadingState />;
  }

  // No logs case
  if (!weightLogs || weightLogs.length === 0) {
    return (
      <div className="bg-beehealth-body-main h-[400px] rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
        <p className="text-gray-500">No hay datos de peso para mostrar.</p>
      </div>
    );
  }

  // Ordenar por fecha
  const sorted = [...weightLogs].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const chartData = sorted.map((log, index) => {
    const value = index === 0 ? log.originalWeight : log.currentWeight;

    return {
      mes: new Date(log.createdAt).toLocaleDateString('es-MX', {
        month: 'short',
        day: 'numeric',
      }),
      valor: Number(value),
    };
  });

  return (
    <div className="bg-beehealth-body-main h-[400px] rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">{title}</h2>

        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: legendColor }} />
          <span className="text-sm font-medium text-gray-700">{legendLabel}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={['auto', 'auto']} />

            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              formatter={(value) => [`${value} ${unit}`, legendLabel]}
            />

            <Line
              type="monotone"
              dataKey="valor"
              stroke={stroke}
              strokeWidth={3}
              dot={{ fill: stroke, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
