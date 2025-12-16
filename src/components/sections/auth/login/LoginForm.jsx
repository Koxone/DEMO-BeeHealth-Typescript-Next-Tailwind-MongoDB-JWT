'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Mail, Lock, CheckCircle, AlertCircle, X } from 'lucide-react';
import useAuthStore from '@/zustand/useAuthStore';

export default function LoginForm() {
  // Custom Hooks
  const router = useRouter();

  // Zustand
  const { setUser, setToken } = useAuthStore.getState();

  // Local states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        return;
      }

      setUser(data.user);
      setToken(data.token);

      // Show success modal
      setUserName(data.user.name || data.user.email);
      setUserRole(data.user.role);
      setShowSuccessModal(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        const role = data.user.role;
        if (role === 'patient') router.push('/patient/dashboard');
        else if (role === 'doctor') router.push('/doctor/dashboard');
        else if (role === 'employee') router.push('/employee/dashboard');
        else router.push('/auth/login');
      }, 500);
    } catch (error) {
      console.error('Login error:', error);
      alert('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full items-center justify-center overflow-hidden p-4">
        <div className="bg-beehealth-body-main w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-xl">
          {/* Title */}
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="mb-8 text-center text-gray-600">Accede a tu cuenta médica</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600">Recordarme</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-700">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg py-3 font-medium text-white transition ${
                loading
                  ? 'cursor-not-allowed bg-blue-400'
                  : 'bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover'
              }`}
            >
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-gray-600">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => router.push('/auth/signup')}
              className="text-beehealth-blue-primary-solid hover:text-beehealth-blue-primary-solid-hover font-medium"
            >
              Regístrate aquí
            </button>
          </p>
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
            <h3 className="mb-2 text-center text-2xl font-bold text-gray-900">¡Bienvenido!</h3>

            {/* Message */}
            <p className="mb-6 text-center text-gray-600">
              Hola <span className="font-semibold text-gray-900">{userName}</span>, tu sesión se ha
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
            <h3 className="mb-2 text-center text-2xl font-bold text-gray-900">
              Error al iniciar sesión
            </h3>

            {/* Error Message */}
            <p className="mb-6 text-center text-gray-600">{errorMessage}</p>

            {/* Suggestion */}
            <div className="mb-6 rounded-lg bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                💡 Verifica que tu correo y contraseña sean correctos e intenta nuevamente.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full rounded-lg bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
            >
              Intentar de nuevo
            </button>

            {/* Sign up link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  router.push('/auth/signup');
                }}
                className="text-beehealth-blue-primary-solid hover:text-beehealth-blue-primary-solid-hover font-medium"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
