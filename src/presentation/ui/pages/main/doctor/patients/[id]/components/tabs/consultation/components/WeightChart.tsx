'use client';

// Next, React and Other Libraries
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

// Enums, Types and Interfaces
import { WeightClinicalSummaryDTOPresentation, WeightHistoryPoint } from '@/presentation/types/';

// Prop Types
interface WeightChartProps {
  patientWeightHistory: WeightHistoryPoint[];
  patientWeightSummary: WeightClinicalSummaryDTOPresentation;
}

export default function WeightChart({
  patientWeightHistory,
  patientWeightSummary,
}: WeightChartProps) {
  // Get initial weight from summary
  const initialWeight = Number(patientWeightSummary?.metrics?.initialWeight || 0);

  // Order by date ascending and format for the chart
  const sortedHistory = [...(patientWeightHistory || [])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formattedData = [
    {
      fecha: 'Inicial',
      peso: initialWeight,
      diferencia: 0,
    },
    ...sortedHistory.map((log) => {
      const currentWeight = Number(log.weight);
      return {
        fecha: new Date(log.date).toLocaleDateString('es-MX', {
          day: '2-digit',
          month: '2-digit',
        }),
        peso: currentWeight,
        diferencia: Number((currentWeight - initialWeight).toFixed(2)),
      };
    }),
  ];

  const total = formattedData.length - 1;

  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid flex h-12 w-12 items-center justify-center rounded-xl">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-700">Evolución de Peso</h2>
            <p className="text-sm text-gray-500">
              Peso Inicial: <span className="font-semibold">{initialWeight} kg</span>
            </p>
          </div>
        </div>

        <div className="rounded-full bg-blue-50 px-4 py-2">
          <span className="text-beehealth-blue-primary-solid text-sm font-semibold">
            {total} seguimientos
          </span>
        </div>
      </div>

      {/* Chart */}
      {total > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

            <XAxis
              dataKey="fecha"
              stroke="#9ca3af"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '12px', fontWeight: '500' }}
              dy={10}
            />

            <YAxis
              stroke="#9ca3af"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '12px' }}
              domain={[
                (dataMin: number) => Math.floor(Math.min(dataMin, initialWeight) - 2),
                (dataMax: number) => Math.ceil(Math.max(dataMax, initialWeight) + 2),
              ]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'peso') return [`${value} kg`, 'Peso'];
                if (name === 'diferencia') {
                  const label = value > 0 ? `+${value} kg` : `${value} kg`;
                  return [label, 'Vs. Inicial'];
                }
                return [value, name];
              }}
            />

            <Area
              type="monotone"
              dataKey="peso"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorPeso)"
              animationDuration={1500}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-100 py-16">
          <TrendingUp className="mb-3 h-12 w-12 text-gray-200" />
          <p className="font-medium text-gray-500">No hay registros históricos</p>
        </div>
      )}
    </div>
  );
}
