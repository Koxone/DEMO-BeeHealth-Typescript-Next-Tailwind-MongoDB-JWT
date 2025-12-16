'use client';

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
import { useGetPatientWeightLogs } from '@/hooks/clinicalRecords/get/useGetPatientWeightLogs';

interface WeightLog {
  _id: string;
  patient: {
    _id: string;
    email: string;
  };
  clinicalRecord: {
    _id: string;
    recordDate: string;
    createdAt: string;
  } | null;
  originalWeight: number;
  currentWeight: number;
  differenceFromPrevious: number;
  differenceFromOriginal: number;
  originalSize: number;
  currentSize: number;
  differenceSizeFromPrevious: number;
  differenceSizeFromOriginal: number;
  createdAt: string;
  updatedAt: string;
}

interface ChartData {
  fecha: string;
  peso: number;
  diferencia: number;
}

interface WeightChartProps {
  id: string;
}

export default function WeightChart({ id }: WeightChartProps) {
  const {
    weightLogs,
    loading: weightLogsLoading,
    error: weightLogsError,
    refetch: refetchWeightLogs,
  } = useGetPatientWeightLogs(id);

  // Filter out logs without clinicalRecord, sort by recordDate ascending, and format data
  const formattedData: ChartData[] = (weightLogs || [])
    .filter((log) => log.clinicalRecord?.recordDate)
    .sort(
      (a, b) =>
        new Date(a.clinicalRecord!.recordDate).getTime() -
        new Date(b.clinicalRecord!.recordDate).getTime()
    )
    .map((log, index) => {
      const peso = index === 0 ? log.originalWeight : log.currentWeight;

      return {
        fecha: new Date(log.clinicalRecord!.recordDate).toLocaleDateString('es-MX'),
        peso: Number(peso),
        diferencia: log.differenceFromOriginal,
      };
    });

  const total = formattedData.length;

  if (weightLogsLoading) {
    return (
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-lg">
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-gray-500">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-lg">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid flex h-12 w-12 items-center justify-center rounded-xl">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Evolución de Peso</h2>
            <p className="text-sm text-gray-500">Seguimiento del progreso del paciente</p>
          </div>
        </div>

        <div className="rounded-full bg-blue-50 px-4 py-2">
          <span className="text-beehealth-blue-primary-solid text-sm font-semibold">
            {total} registros
          </span>
        </div>
      </div>

      {/* Chart or empty state */}
      {total > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="fecha"
              stroke="#6b7280"
              style={{ fontSize: '12px', fontWeight: '500' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              domain={['dataMin - 5', 'dataMax + 5']}
              label={{
                value: 'Peso (kg)',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: '12px', fill: '#6b7280' },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'peso') return [`${value} kg`, 'Peso'];
                if (name === 'diferencia')
                  return [`${value > 0 ? '+' : ''}${value} kg`, 'Desde inicio'];
                return [value, name];
              }}
              cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="peso"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorPeso)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="bg-beehealth-body-main flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16">
          <TrendingUp className="mb-3 h-12 w-12 text-gray-300" />
          <p className="mb-1 font-medium text-gray-600">Sin datos de evolución</p>
          <p className="text-sm text-gray-500">Agrega registros para ver el progreso</p>
        </div>
      )}
    </div>
  );
}
