'use client';

import { useRouter } from 'next/navigation';
import { Heart, Activity, Calendar, Apple, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import HomeHeader from './components/HomeHeader';
import { useGetAllWeightLogs } from '@/hooks/clinicalRecords/get/useGetAllWeightLogs';

export default function Home() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    weightLogs,
    loading: weightLogsLoading,
    error: weightLogsError,
    refetch: refetchWeightLogs,
  } = useGetAllWeightLogs();

  /* Compute total loss */
  const totalLoss = Object.values(
    weightLogs.reduce((acc, log) => {
      const id = log.patient._id;
      if (!acc[id] || new Date(log.createdAt) > new Date(acc[id].createdAt)) {
        acc[id] = log;
      }
      return acc;
    }, {})
  ).reduce((sum, log) => sum + (log.differenceFromOriginal || 0), 0);

  /* Manage loading */
  useEffect(() => {
    if (!weightLogsLoading) {
      setLoading(false);
    }
  }, [weightLogsLoading]);

  /* Animated counter */
  const AnimatedCounter = ({ value, duration = 2000 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (loading) return;

      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setDisplayValue(Math.floor(value * progress));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(animate);
    }, [value, duration, loading]);

    return displayValue.toFixed(1);
  };

  return (
    <div className="bg-beehealth-body-main">
      <HomeHeader setShowMenu={setShowMenu} showMenu={showMenu} />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h1 className="mb-4 text-3xl leading-tight font-bold text-gray-900 md:mb-6 md:text-5xl">
              Control médico inteligente para tu salud
            </h1>
            <p className="mb-6 text-lg text-gray-600 md:mb-8 md:text-xl">
              Gestiona tu peso, historial clínico, citas médicas y dietas personalizadas en un solo
              lugar.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
              <button
                onClick={() => router.push('/auth/signup')}
                className="w-full rounded-lg bg-blue-500 px-6 py-3 font-medium text-white shadow-md transition hover:bg-blue-600 active:scale-95 sm:w-auto"
              >
                Comenzar ahora
              </button>
              <button
                onClick={() => router.push('/about')}
                className="hover:bg-beehealth-body-main w-full rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition active:scale-95 sm:w-auto"
              >
                Conocer más
              </button>
            </div>
          </div>

          {/* Weight Loss Counter Card */}
          <div className="animate-in fade-in slide-in-from-right-4 rounded-2xl bg-linear-to-br from-blue-100 to-green-100 p-8 shadow-xl duration-700 md:p-12">
            <div className="bg-beehealth-body-main rounded-xl p-6 shadow-lg md:p-8">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-green-200 blur-lg"></div>
                  <div className="relative rounded-full bg-green-100 p-3 md:p-4">
                    <TrendingDown className="h-8 w-8 text-green-600 md:h-10 md:w-10" />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-center">
                  <div className="inline-block">
                    <span className="text-5xl font-bold text-green-600 md:text-6xl">
                      {loading ? '...' : <AnimatedCounter value={totalLoss} />}
                    </span>
                    <span className="ml-2 text-2xl font-semibold text-gray-700 md:text-3xl">
                      kg
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-center text-lg font-semibold text-gray-900 md:text-xl">
                Kilos perdidos por nuestros pacientes
              </h3>

              <p className="mt-3 text-center text-sm text-gray-600 md:text-base">
                Únete a nuestra comunidad y comienza tu transformación hoy
              </p>

              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-green-700 md:text-sm">
                  {loading ? 'Cargando...' : 'En tiempo real'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:mb-12 md:text-3xl">
          Todo lo que necesitas para cuidar tu salud
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-center rounded-full bg-blue-100 p-3">
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Control de Peso</h3>
            <p className="text-gray-600">
              Lleva un seguimiento claro de tu peso, IMC y progresos diarios
            </p>
          </div>

          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-center rounded-full bg-red-100 p-3">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Historial Clínico</h3>
            <p className="text-gray-600">
              Consulta tu información médica de forma ordenada y accesible
            </p>
          </div>

          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-center rounded-full bg-green-100 p-3">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Citas Médicas</h3>
            <p className="text-gray-600">
              Programa y consulta tus próximas citas sin complicaciones
            </p>
          </div>

          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-center rounded-full bg-yellow-100 p-3">
              <Apple className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Planes Alimenticios</h3>
            <p className="text-gray-600">
              Recibe recomendaciones nutricionales personalizadas a tus objetivos
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
