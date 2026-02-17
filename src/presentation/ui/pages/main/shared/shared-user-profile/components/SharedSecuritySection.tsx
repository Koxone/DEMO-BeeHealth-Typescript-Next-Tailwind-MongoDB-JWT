import { Lock, Shield } from 'lucide-react';

// Prop Types
interface SecuritySectionProps {
  setShowPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function SharedSecuritySection({ setShowPasswordModal }: SecuritySectionProps) {
  return (
    <div className="bg-beehealth-body-main h-fit rounded-2xl border border-gray-200 p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-beehealth-blue-primary-solid flex h-10 w-10 items-center justify-center rounded-lg">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-700">Seguridad</h3>
          <p className="text-sm text-gray-500">Protege tu cuenta</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Change Password */}
        <button
          onClick={() => setShowPasswordModal(true)}
          className="group bg-beehealth-body-main flex items-center justify-between rounded-xl border-2 border-gray-200 px-6 py-4 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 active:scale-95"
        >
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-gray-600 transition-colors group-hover:text-blue-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-700">Cambiar Contraseña</p>
              <p className="text-xs text-gray-500">Actualiza tu contraseña</p>
            </div>
          </div>
          <div className="text-gray-400 transition-transform group-hover:translate-x-1">→</div>
        </button>

        {/* 2 Step Verification */}
        <div className="group bg-beehealth-body-main flex cursor-not-allowed items-center justify-between rounded-xl border-2 border-gray-200 px-6 py-4 transition-all duration-200 hover:border-green-300 hover:bg-green-50 active:scale-95">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-gray-600 transition-colors group-hover:text-green-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-700">Verificación en 2 pasos</p>
              <p className="text-xs text-gray-500">Mayor seguridad</p>
            </div>
          </div>
          <div className="text-gray-400 transition-transform group-hover:translate-x-1">→</div>
        </div>
      </div>
    </div>
  );
}

export default SharedSecuritySection;
