'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';

// Enums and Types
import { UserSpecialty } from '@/domain/enums/';

export default function CreatePatientForm({
  setCreatePatientModalOpen,
  specialty,
  onClick,
  role,
  refetch,
  registerUser,
}) {
  const router = useRouter();

  // State
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    specialty,
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

    try {
      await registerUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        lastName: formData.lastName,
        phone: formData.telefono,
        specialty: formData.specialty as UserSpecialty,
      });

      setCreatePatientModalOpen(false);
      refetch();

      if (role === 'doctor') {
        router.push('/doctor/patients');
      } else {
        router.push('/employee/patients');
      }
    } catch (error) {
      alert(error.message || 'Error al crear usuario');
    }
  };

  return (
    <div className="bg-beehealth-body-main flex h-full w-full max-w-xl items-center justify-center overflow-y-auto rounded-lg p-4">
      <div className="h-fit w-full">
        <div className="mb-6 text-center md:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-700 md:text-2xl">Crear paciente</h1>
          <p className="text-sm text-gray-600 md:text-base">Ingresa los datos del paciente</p>
        </div>

        <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-xl md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {role === 'employee' && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tipo de Consulta
                </label>

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
                  <option value="stetic">Medicina Estetica</option>
                </select>
              </div>
            )}

            {/* Nombre */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none"
                  placeholder="Carlos"
                />
              </div>
            </div>

            {/* Apellido */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Apellido</label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none"
                  placeholder="De León"
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

            {/* Teléfono */}
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
              <button type="button" onClick={onClick} className="button-beehealth-cancel">
                Cancelar
              </button>

              <button type="submit" className="button-beehealth-confirm">
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
