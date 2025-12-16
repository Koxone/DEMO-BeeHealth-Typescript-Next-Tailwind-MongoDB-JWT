'use client';

import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function Privacy() {
  const router = useRouter();

  return (
    <div className="bg-beehealth-body-main min-h-screen">
      <header className="bg-beehealth-body-main/80 border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={() => router.push('/')} className="flex items-center gap-2">
            <img src="/fish.png" alt="" className="max-w-10" />
            <span className="text-2xl font-bold text-gray-900">BeeHealth</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">Política de Privacidad</h1>
        <div className="bg-beehealth-body-main space-y-6 rounded-xl p-8 shadow-md">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">Recopilación de Datos</h2>
            <p className="text-gray-600">
              Recopilamos información personal necesaria para proporcionar nuestros servicios
              médicos.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">Uso de la Información</h2>
            <p className="text-gray-600">
              Tu información se utiliza exclusivamente para mejorar tu experiencia y proporcionar
              atención médica personalizada.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">Seguridad</h2>
            <p className="text-gray-600">
              Implementamos medidas de seguridad avanzadas para proteger tus datos personales y
              médicos.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">Tus Derechos</h2>
            <p className="text-gray-600">
              Tienes derecho a acceder, modificar o eliminar tu información personal en cualquier
              momento.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
