'use client';
import { Activity, Weight, TrendingDown, TrendingUp, Award, Ruler } from 'lucide-react';
import StatCard from '../../dashboard/components/stats-grid/components/StatCard';

// Custom Hooks
import { calculateStats } from './utils';

export default function Stats({ historyData = [], type = 'weight', patientWeightLogs = [] }) {
  // Stats
  const stats = calculateStats(historyData);

  // Labels by type
  const labels =
    type === 'size'
      ? {
          initial: 'Talla Inicial',
          current: 'Talla Actual',
          difference: 'Diferencia',
          unit: 'cm',
        }
      : {
          initial: 'Peso Inicial',
          current: 'Peso Actual',
          difference: 'Diferencia',
          unit: 'kg',
        };

  // Icons by type
  const icon =
    type === 'size' ? (
      <Ruler className="h-4 w-4 text-blue-600" />
    ) : (
      <Weight className="h-4 w-4 text-blue-600" />
    );

  return (
    <div className="bg-beehealth-body-main rounded-2xl border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg md:border-2 md:p-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Initial */}
        <StatCard
          Icon={type === 'size' ? Ruler : Weight}
          label={labels.initial}
          value={
            type === 'size'
              ? patientWeightLogs[0]?.originalSize
              : patientWeightLogs[0]?.originalWeight
          }
          unit={labels.unit}
        />

        {/* Current */}
        <StatCard
          Icon={type === 'size' ? Ruler : Weight}
          label={labels.current}
          value={
            type === 'size'
              ? patientWeightLogs[0]?.currentSize
              : patientWeightLogs[0]?.currentWeight
          }
          unit={labels.unit}
        />

        {/* Difference */}
        <StatCard
          Icon={stats.isPositive ? TrendingDown : TrendingUp}
          label={labels.difference}
          value={
            type === 'size'
              ? patientWeightLogs[0]?.originalSize - patientWeightLogs[0]?.currentSize
              : patientWeightLogs[0]?.originalWeight - patientWeightLogs[0]?.currentWeight
          }
          unit={labels.unit}
        />

        {/* Progress */}
        <StatCard
          Icon={Award}
          label="Progreso"
          value={`${
            type === 'size'
              ? (
                  ((patientWeightLogs[0]?.originalSize - patientWeightLogs[0]?.currentSize) /
                    patientWeightLogs[0]?.originalSize) *
                  100
                ).toFixed(1)
              : (
                  ((patientWeightLogs[0]?.originalWeight - patientWeightLogs[0]?.currentWeight) /
                    patientWeightLogs[0]?.originalWeight) *
                  100
                ).toFixed(1)
          }%`}
          unit=""
        />
      </div>
    </div>
  );
}
