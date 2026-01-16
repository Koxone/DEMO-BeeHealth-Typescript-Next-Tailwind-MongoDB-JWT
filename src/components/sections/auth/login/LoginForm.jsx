'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
  X,
  Stethoscope,
  Briefcase,
  User,
} from 'lucide-react';
import useAuthStore from '@/zustand/useAuthStore';

// Demo credentials
const DEMO_ACCOUNTS = {
  doctor: { email: 'doctor@demo.com', password: 'demo2025', label: 'Doctor', icon: Stethoscope },
  employee: {
    email: 'employee@demo.com',
    password: 'demo2025',
    label: 'Empleado',
    icon: Briefcase,
  },
  patient: { email: 'patient@demo.com', password: 'demo2025', label: 'Paciente', icon: User },
};

export default function LoginForm() {
  // Custom Hooks
  const router = useRouter();

  // Zustand
  const { setUser, setToken } = useAuthStore.getState();

  // Local states
  const [loading, setLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle demo login
  const handleDemoLogin = async (role) => {
    setLoading(true);
    setLoadingRole(role);

    const { email, password } = DEMO_ACCOUNTS[role];

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Error al iniciar sesión');
        setShowErrorModal(true);
        setLoading(false);
        setLoadingRole(null);
        return;
      }

      setUser(data.user);
      setToken(data.token);

      // Show success modal
      setUserName(data.user.name || data.user.email);
      setUserRole(data.user.role);
      setShowSuccessModal(true);

      // Redirect after 500ms
      setTimeout(() => {
        const userRoleRedirect = data.user.role;
        if (userRoleRedirect === 'patient') router.push('/patient/dashboard');
        else if (userRoleRedirect === 'doctor') router.push('/doctor/dashboard');
        else if (userRoleRedirect === 'employee') router.push('/employee/dashboard');
        else router.push('/auth/login');
      }, 500);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Error al conectar con el servidor');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
      setLoadingRole(null);
    }
  };

  return (
    <>
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
                onClick={() => handleDemoLogin(role)}
                disabled={loading}
                className={`flex w-full items-center justify-center gap-3 rounded-lg py-4 font-medium text-white transition ${
                  loading
                    ? 'cursor-not-allowed bg-gray-400'
                    : role === 'doctor'
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
          <div className="mt-8 rounded-lg bg-blue-50 p-4">
            <p className="text-center text-sm text-blue-800">
              💡 Esta es una demo. Cada rol tiene acceso a diferentes módulos y funcionalidades.
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            {/* Title */}
            <h3 className="mb-2 text-center text-2xl font-bold text-gray-700">¡Bienvenido!</h3>

            {/* Message */}
            <p className="mb-6 text-center text-gray-600">
              Hola <span className="font-semibold text-gray-700">{userName}</span>, tu sesión se ha
              iniciado correctamente.
            </p>

            {/* Role Badge */}
            <div className="mb-6 flex justify-center">
              <span className="text-beehealth-blue-primary-solid inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium capitalize">
                {userRole === 'patient'
                  ? 'Paciente'
                  : userRole === 'doctor'
                    ? 'Doctor'
                    : userRole === 'employee'
                      ? 'Empleado'
                      : userRole}
              </span>
            </div>

            {/* Loading Text */}
            <p className="text-center text-sm text-gray-500">Redirigiendo...</p>

            {/* Progress Bar */}
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
            {/* Error Icon */}
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

            {/* Title */}
            <h3 className="mb-2 text-center text-2xl font-bold text-gray-700">
              Error al iniciar sesión
            </h3>

            {/* Error Message */}
            <p className="mb-6 text-center text-gray-600">{errorMessage}</p>

            {/* Close Button */}
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full rounded-lg bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
