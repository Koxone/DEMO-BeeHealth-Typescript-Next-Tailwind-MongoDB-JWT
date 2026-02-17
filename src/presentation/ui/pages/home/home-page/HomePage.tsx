'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Activity, Calendar, Apple } from 'lucide-react';

// Components
import HomeHeader from '../shared/HomeHeader';
import GlobalWeightLoss from './components/GlobalWeightLoss';

export default function HomePage() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-beehealth-body-main w-full justify-self-center overflow-x-hidden">
      <HomeHeader about={true} contact={true} setShowMenu={setShowMenu} showMenu={showMenu} />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h1 className="mb-4 text-2xl leading-tight font-bold text-gray-700 md:mb-6 md:text-5xl">
              Plataforma integral para el cuidado de tu salud
            </h1>

            <p className="text-md mb-6 text-gray-600 md:mb-8 md:text-xl">
              Planes personalizados, actividad física y seguimiento clínico.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
              <button
                onClick={() => router.push('/auth/login')}
                className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-dark w-full rounded-lg px-6 py-3 font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
              >
                Comenzar ahora
              </button>
            </div>
          </div>

          {/* Weight Loss Counter Card */}
          <div className="mx-auto w-full max-w-md">
            <GlobalWeightLoss />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-700 md:mb-12 md:text-3xl">
          Todo lo que necesitas para cuidar tu salud
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-center rounded-full bg-blue-100 p-3">
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Control de Peso</h3>
            <p className="text-gray-600">
              Lleva un seguimiento claro de tu peso, IMC y progresos diarios
            </p>
          </div>

          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-center rounded-full bg-red-100 p-3">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Historial Clínico</h3>
            <p className="text-gray-600">
              Consulta tu información médica de forma ordenada y accesible
            </p>
          </div>

          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-center rounded-full bg-green-100 p-3">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Citas Médicas</h3>
            <p className="text-gray-600">
              Programa y consulta tus próximas citas sin complicaciones
            </p>
          </div>

          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center justify-center rounded-full bg-yellow-100 p-3">
              <Apple className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Planes Alimenticios</h3>
            <p className="text-gray-600">
              Recibe recomendaciones nutricionales personalizadas a tus objetivos
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
