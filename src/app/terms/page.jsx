'use client';

import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function Terms() {
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
        <h1 className="mb-6 text-4xl font-bold text-gray-900">Términos y Condiciones</h1>
        <div className="bg-beehealth-body-main space-y-6 rounded-xl p-8 shadow-md">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">1. Aceptación de Términos</h2>
            <p className="text-gray-600">
              Al acceder y utilizar BeeHealth, aceptas estar sujeto a estos términos y condiciones.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">2. Uso del Servicio</h2>
            <p className="text-gray-600">
              BeeHealth es una plataforma de gestión médica. El usuario se compromete a proporcionar
              información veraz.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">3. Privacidad</h2>
            <p className="text-gray-600">
              Nos comprometemos a proteger tu información personal según nuestra política de
              privacidad.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">4. Responsabilidades</h2>
            <p className="text-gray-600">
              BeeHealth no sustituye la consulta médica profesional. Siempre consulta con tu médico.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
