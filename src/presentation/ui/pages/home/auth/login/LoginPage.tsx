'use client';

import { useAuth } from '@/presentation/hooks/auth';
import { Stethoscope, Briefcase, User, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Demo credentials
const DEMO_ACCOUNTS = {
  // doctor: { email: 'lemus.arturo180@icloud.com', password: 'koxone', label: 'Doctor', icon: Stethoscope },
  doctor: { email: 'lemus@koxland.net', password: 'koxone', label: 'Doctor', icon: Stethoscope },
  employee: {
    email: 'fabiola@koxland.net',
    password: 'koxone',
    label: 'Empleado',
    icon: Briefcase,
  },
  patient: {
    email: 'lemus.arturo180@icloud.com',
    password: '123456',
    label: 'Paciente',
    icon: User,
  },
  // patient: { email: 'admin@koxland.net', password: 'koxone', label: 'Paciente', icon: User },
};

export default function LoginPage() {
  // Router
  const router = useRouter();

  // Local UI state
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Auth Zustand Store
  const { isLoading, refreshSession, currentUser, specialty, role } = useAuth();

  // State
  const [error, setError] = useState('');

  // Login request
  const login = async (email: string, password: string, roleLabel?: string) => {
    setError('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || result.message || 'Login failed');
      }

      const result = await res.json();
      await refreshSession();
      router.replace('/auth/redirect');

      // Success UI
      setUserName(result.user?.fullName || '');
      setUserRole(roleLabel || result.user?.role || '');
      setShowSuccessModal(true);
    } catch (err: any) {
      setError(err.message);
      setErrorMessage(err.message);
      setShowErrorModal(true);
    } finally {
      setLoadingRole(null);
    }
  };

  // Demo login
  const handleDemoLogin = async (role: keyof typeof DEMO_ACCOUNTS) => {
    const account = DEMO_ACCOUNTS[role];
    setLoadingRole(role);
    await login(account.email, account.password, account.label);
  };

  return (
    <div className="mx-auto">
      <div className="flex h-full items-center justify-center overflow-hidden p-4">
        <div className="bg-beehealth-body-main w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-xl">
          {/* Title */}
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-700">Demo BeeHealth</h2>
          <p className="mb-8 text-center text-gray-600">
            Selecciona un rol para explorar la plataforma
          </p>

          {/* Demo Login Buttons */}
          <div className="space-y-4">
            {Object.entries(DEMO_ACCOUNTS).map(([role, { label, icon: Icon }]) => (
              <button
                key={role}
                // disabled={isLoading}
                onClick={() => handleDemoLogin(role as keyof typeof DEMO_ACCOUNTS)}
                className={`flex w-full items-center justify-center gap-3 rounded-lg py-4 font-medium text-white transition ${
                  role === 'doctor'
                    ? 'bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-dark'
                    : role === 'employee'
                      ? 'bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-dark'
                      : 'bg-beehealth-orange-primary-solid hover:bg-beehealth-orange-primary-dark'
                }`}
              >
                <Icon className="h-5 w-5" />
                {loadingRole === role ? 'Ingresando...' : `Entrar como ${label}`}
              </button>
            ))}
          </div>

          {/* Info */}
          <div className="bg-beehealth-blue-primary-light mt-8 rounded-lg p-4">
            <p className="text-beehealth-blue-primary-dark text-center text-sm">
              💡 Esta es una demo. Cada rol tiene acceso a diferentes módulos y funcionalidades.
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="text-beehealth-green-secondary-dark h-12 w-12" />
              </div>
            </div>

            <h3 className="mb-2 text-center text-2xl font-bold text-gray-700">¡Bienvenido!</h3>

            <p className="mb-6 text-center text-gray-600">
              Hola <span className="font-semibold text-gray-700">{userName}</span>, tu sesión se ha
              iniciado correctamente.
            </p>

            <div className="mb-6 flex justify-center">
              <span className="text-beehealth-blue-primary-solid inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium capitalize">
                {userRole}
              </span>
            </div>

            <p className="text-center text-sm text-gray-500">Redirigiendo...</p>

            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="from-beehealth-blue-primary-solid to-beehealth-blue-primary-solid-hover h-full w-full animate-pulse bg-linear-to-br"></div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="rounded-full bg-red-100 p-4">
                <AlertCircle className="h-12 w-12 text-red-600" />
              </div>
              <button
                onClick={() => setShowErrorModal(false)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <h3 className="mb-2 text-center text-2xl font-bold text-gray-700">
              Error al iniciar sesión
            </h3>

            <p className="mb-6 text-center text-gray-600">{errorMessage}</p>

            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full rounded-lg bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
