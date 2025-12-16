'use client';

import { useRouter } from 'next/navigation';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
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
        <h1 className="mb-6 text-4xl font-bold text-gray-900">Contáctanos</h1>
        <p className="mb-12 text-xl text-gray-600">
          Estamos aquí para ayudarte. Envíanos un mensaje.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-beehealth-body-main rounded-xl p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">Envíanos un mensaje</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Correo</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Mensaje</label>
                <textarea
                  rows="4"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition hover:bg-blue-600"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-beehealth-body-main flex items-start gap-4 rounded-xl p-6 shadow-md">
              <Mail className="mt-1 h-6 w-6 text-blue-500" />
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">contacto@medtrack.com</p>
              </div>
            </div>
            <div className="bg-beehealth-body-main flex items-start gap-4 rounded-xl p-6 shadow-md">
              <Phone className="mt-1 h-6 w-6 text-green-500" />
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">Telefono</h3>
                <p className="text-gray-600">+52 55 1234 5678</p>
              </div>
            </div>
            <div className="bg-beehealth-body-main flex items-start gap-4 rounded-xl p-6 shadow-md">
              <MapPin className="mt-1 h-6 w-6 text-red-500" />
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">Dirección</h3>
                <p className="text-gray-600">Av. Reforma 123, CDMX, México</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
