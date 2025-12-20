import { Lock, Shield } from 'lucide-react';
import React from 'react';

function SecuritySection({ setShowPasswordModal }) {
  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
          <Shield className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Seguridad</h3>
          <p className="text-sm text-gray-500">Protege tu cuenta</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => setShowPasswordModal(true)}
          className="group bg-beehealth-body-main flex items-center justify-between rounded-xl border-2 border-gray-200 px-6 py-4 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 active:scale-95"
        >
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-gray-600 transition-colors group-hover:text-blue-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">Cambiar Contraseña</p>
              <p className="text-xs text-gray-500">Actualiza tu contraseña</p>
            </div>
          </div>
          <div className="text-gray-400 transition-transform group-hover:translate-x-1">→</div>
        </button>

        <button className="group bg-beehealth-body-main flex items-center justify-between rounded-xl border-2 border-gray-200 px-6 py-4 transition-all duration-200 hover:border-green-300 hover:bg-green-50 active:scale-95">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-gray-600 transition-colors group-hover:text-green-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">Verificación en 2 pasos</p>
              <p className="text-xs text-gray-500">Mayor seguridad</p>
            </div>
          </div>
          <div className="text-gray-400 transition-transform group-hover:translate-x-1">→</div>
        </button>
      </div>
    </div>
  );
}

export default SecuritySection;
