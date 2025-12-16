'use client';

import { Heart, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    specialty: '',
  });

  // Field handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // Crear usuario en el backend
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.nombre,
          email: formData.email,
          phone: formData.telefono,
          password: formData.password,
          specialty: formData.specialty,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Error al crear usuario');
        return;
      }

      router.push('/auth/login');
      return;
    } catch (error) {
      console.error(error);
      alert('Error al crear usuario');
    }
  };

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto">
      <div className="h-fit w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center md:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-2xl">Crear Cuenta</h1>
          <p className="text-sm text-gray-600 md:text-base">
            Elige el tipo de consulta y llena el resto de campos
          </p>
        </div>

        {/* Form */}
        <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-xl md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Specialty */}
            <div>
              {/* Label */}
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tipo de Consulta
              </label>

              {/* Select */}
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona una opción</option>
                <option value="weight">Control de Peso</option>
                <option value="dental">Odontologia</option>
                <option value="esthetic">Medicina Estetica</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Juan Pérez"
                />
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Telefono</label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-3 font-medium text-white shadow-md transition hover:bg-blue-600 active:scale-95"
            >
              Crear cuenta
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          {/* Go to Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => router.push('/auth/login')}
                className="font-medium text-blue-500 hover:text-blue-600"
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
