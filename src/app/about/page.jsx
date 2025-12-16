'use client';

import { useRouter } from 'next/navigation';
import { Heart, Award, Users, Shield } from 'lucide-react';

export default function About() {
  const router = useRouter();

  return (
    <div className="bg-beehealth-body-main min-h-screen">
      <header className="bg-beehealth-body-main/80 border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={() => router.push('/')} className="flex items-center gap-2">
            <img src="/fish.png" alt="" className="max-w-10" />
            <span className="text-2xl font-bold text-gray-900">BeeHealth</span>
          </button>
          <button
            onClick={() => router.push('/auth/login')}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            Ingresar
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">Acerca de BeeHealth</h1>
        <p className="mb-12 text-xl text-gray-600">
          Somos una plataforma médica digital dedicada a mejorar la calidad de vida de nuestros
          pacientes a través de tecnología innovadora.
        </p>

        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-md">
            <Award className="mb-4 h-12 w-12 text-blue-500" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Excelencia Médica</h3>
            <p className="text-gray-600">Profesionales certificados comprometidos con tu salud</p>
          </div>
          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-md">
            <Users className="mb-4 h-12 w-12 text-green-500" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Atención Personalizada</h3>
            <p className="text-gray-600">Planes de tratamiento adaptados a tus necesidades</p>
          </div>
          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-md">
            <Shield className="mb-4 h-12 w-12 text-purple-500" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Seguridad de Datos</h3>
            <p className="text-gray-600">Tu información protegida con los más altos estándares</p>
          </div>
          <div className="bg-beehealth-body-main rounded-xl p-6 shadow-md">
            <Heart className="mb-4 h-12 w-12 text-red-500" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Compromiso Total</h3>
            <p className="text-gray-600">Acompañamiento continuo en tu proceso de salud</p>
          </div>
        </div>
      </div>
    </div>
  );
}
