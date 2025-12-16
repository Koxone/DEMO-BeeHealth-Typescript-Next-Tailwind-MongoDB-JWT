'use client';

import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreatePatientForm({
  setIsModalPatientsOpen,
  specialty,
  onClick,
  role,
  refetch,
}) {
  const router = useRouter();
  // State
  const [formData, setFormData] = useState({
    nombre: '',
    specialty: specialty,
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  // Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert('Correo inválido');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.nombre,
          specialty: formData.specialty,
          email: formData.email,
          phone: formData.telefono,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Error al crear usuario');
        return;
      }

      // Close modal
      setIsModalPatientsOpen(false);
      refetch();
      {
        role === 'doctor'
          ? router.push(`/doctor/patients/${data.user.id}`)
          : router.push('/employee/patients');
      }
    } catch (error) {
      console.error(error);
      alert('Error al crear usuario');
    }
  };

  return (
    <div className="bg-beehealth-body-main flex h-full w-full max-w-xl items-center justify-center overflow-y-auto rounded-lg p-4">
      <div className="h-fit w-full">
        {/* Header */}
        <div className="mb-6 text-center md:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-2xl">Crear paciente</h1>
          <p className="text-sm text-gray-600 md:text-base">Ingresa los datos del paciente</p>
        </div>

        {/* Form */}
        <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-xl md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {role === 'employee' && (
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
            )}

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
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none"
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
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none"
                  placeholder="correo@dominio.com"
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
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none"
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
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none"
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
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              {/* Close button */}
              <button
                type="button"
                onClick={onClick}
                className="bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover flex w-fit items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-md transition active:scale-95"
              >
                Cancelar
              </button>

              {/* Create Button */}
              <button
                type="submit"
                className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg py-3 font-medium text-white shadow-md transition active:scale-95"
              >
                Crear usuario
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
