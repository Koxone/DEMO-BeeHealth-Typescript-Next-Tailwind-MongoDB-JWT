'use client';

import { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/domain/enums/';

type Specialty = 'weight' | 'dental' | 'stetic' | '';

export default function SignupPage() {
  // State
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specialty, setSpecialty] = useState<Specialty>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  // Submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !lastName.trim() || !phone.trim() || !email.trim() || !password.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    if (!specialty) {
      setError('Selecciona un tipo de consulta.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          password,
          role: UserRole.PATIENT,
          specialty,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || 'Error al crear la cuenta.');
        return;
      }

      setSuccess('Cuenta creada correctamente.');
      setName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSpecialty('');

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        router.replace('/auth/login');
      }, 1500);
    } catch {
      setError('Error de red.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center">
      <div className="h-fit w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center md:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-700 md:text-2xl">Crear Cuenta</h1>
          <p className="text-sm text-gray-600 md:text-base">
            Elige el tipo de consulta y llena el resto de campos
          </p>
        </div>

        {/* Form */}
        <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-xl md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Specialty */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tipo de Consulta
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value as Specialty)}
                required
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona una opción</option>
                <option value="weight">Control de Peso</option>
                <option value="dental">Odontología</option>
                <option value="stetic">Medicina Estética</option>
              </select>
            </div>

            {/* Name & Last Name */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="given-name"
                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Juan"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-gray-700">Apellido</label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    autoComplete="family-name"
                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Pérez"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Teléfono</label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                  inputMode="numeric"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="+52 55 1234 5678"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Success Message */}
            {success && (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-600">
                {success}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg py-3 font-medium text-white shadow-md transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creando...' : 'Crear cuenta'}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>

          {/* Go to Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => {}}
                className="text-beehealth-blue-primary-dark hover:text-beehealth-blue-primary-dark-hover font-medium"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
