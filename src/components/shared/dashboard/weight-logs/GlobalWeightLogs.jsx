'use client';

import React, { useState, useEffect } from 'react';
import { TrendingDown } from 'lucide-react';
import { useGetAllWeightLogs } from '@/hooks/clinicalRecords/get/useGetAllWeightLogs';
import { computeTotalLoss } from './services/weightLogsService';

function useAnimatedCounter(target, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * eased;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return count;
}

function GlobalWeightLogs() {
  // Custom hook to fetch weight logs
  const { weightLogs, loading, error, refetch } = useGetAllWeightLogs();

  /* Compute */
  const totalLoss = computeTotalLoss(weightLogs);

  /* Animated value */
  const animatedValue = useAnimatedCounter(loading ? 0 : Math.abs(totalLoss), 1500);

  // Hover refetch control
  let canRefetch = true;
  const handleHover = () => {
    if (!canRefetch) return;
    canRefetch = false;
    refetch();
    setTimeout(() => {
      canRefetch = true;
    }, 1500);
  };

  return (
    <div
      onMouseEnter={handleHover}
      className="bg-beehealth-blue-primary-solid rounded-xl p-4 text-white shadow-sm md:p-6"
    >
      <div className="flex h-full items-center justify-center gap-4">
        {/* Icon */}
        <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white/20">
          <TrendingDown className="h-8 w-8" />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <h3 className="text-xl font-medium opacity-90">Nuestros pacientes han perdido:</h3>

          <p className="text-4xl font-bold tracking-tight">
            {loading ? (
              <span className="inline-block h-9 w-32 animate-pulse rounded bg-white/20" />
            ) : (
              <>
                <span className="tabular-nums">{animatedValue.toFixed(1)}</span>
                <span className="ml-1 text-xl font-medium opacity-80">kg en total</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GlobalWeightLogs;
