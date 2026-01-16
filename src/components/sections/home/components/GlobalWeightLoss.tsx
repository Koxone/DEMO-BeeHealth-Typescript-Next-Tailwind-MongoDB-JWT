'use client';

import { useEffect, useState } from 'react';

const AnimatedCounter = ({
  value,
  duration = 1000,
  loading,
}: {
  value: number;
  duration?: number;
  loading: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (loading) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayValue(value * progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, loading]);

  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(displayValue);

  return <>{formattedValue}</>;
};

function GlobalWeightLoss({ totalLost, loading }: { totalLost: number; loading: boolean }) {
  return (
    <div className="animate-in fade-in sm:slide-in-from-right-4 mx-auto w-full max-w-full rounded-2xl bg-linear-to-br from-blue-100 to-green-100 p-4 shadow-xl duration-700 sm:max-w-md sm:p-6 md:p-12">
      <div className="bg-beehealth-body-main rounded-xl p-4 shadow-lg sm:p-6 md:p-8">
        <div className="mb-4">
          <div className="text-center">
            <div className="inline-block">
              <span className="text-4xl font-bold text-green-600 sm:text-5xl md:text-6xl">
                -{loading ? '...' : <AnimatedCounter value={totalLost} loading={loading} />}
              </span>
              <span className="ml-2 text-xl font-semibold text-gray-700 sm:text-2xl md:text-3xl">
                kg
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-center text-base font-semibold text-gray-700 sm:text-lg md:text-xl">
          Kilos perdidos por nuestros pacientes
        </h3>

        <p className="mt-3 text-center text-sm text-gray-600 md:text-base">
          Cada número representa una historia, un esfuerzo y un cambio real.
        </p>

        <p className="text-center text-sm font-semibold text-green-600 md:text-base">
          Porque 1 kilo - es 1 latido +
        </p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          <span className="text-xs font-medium text-green-700 md:text-sm">
            {loading ? 'Cargando...' : 'En tiempo real'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GlobalWeightLoss;
