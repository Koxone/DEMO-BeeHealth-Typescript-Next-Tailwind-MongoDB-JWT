'use client';

import { useState } from 'react';
import { HelpCircle, Mail, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  { q: '¿Cómo actualizo mi peso?', a: 'Contacta con tu Medico para poder actualizar tu peso.' },
  {
    q: '¿Cómo agendo una cita?',
    a: "Ve a la sección de Citas Médicas y haz clic en 'Agendar Cita'.",
  },
  {
    q: '¿Puedo cambiar mi dieta?',
    a: 'Contacta a tu médico para solicitar un cambio en tu plan nutricional.',
  },
  {
    q: '¿Cómo descargo mi historial?',
    a: 'En la sección de Historial Clínico encontrarás la opción de exportar tus datos.',
  },
];

export default function PatientSupport() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Soporte</h1>
        <p className="text-gray-600">Estamos aquí para ayudarte</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6">
        <div className="space-y-4 md:space-y-6">
          <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-lg border border-gray-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="hover:bg-beehealth-body-main flex w-full items-center justify-between p-4 text-left transition"
                  >
                    <span className="font-medium text-gray-900">{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {openFaq === idx && <div className="px-4 pb-4 text-gray-600">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
              Información de Contacto
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">soporte@medtrack.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">Telefono</p>
                  <p className="text-gray-600">+52 55 1234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-gray-900">Dirección</p>
                  <p className="text-gray-600">Av. Reforma 123, CDMX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
