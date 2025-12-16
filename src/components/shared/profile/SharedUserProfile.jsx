'use client';

/* State */
import { useState } from 'react';

/* Icons */
import {
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Edit2,
  Save,
  Lock,
  Award,
  MapPin,
  Clock,
  Shield,
  CheckCircle2,
} from 'lucide-react';

export default function SharedUserProfile({ role, currentUser }) {
  /* Local editing state */
  const [isEditing, setIsEditing] = useState(false);

  if (role === 'doctor')
    return (
      <div className="h-full space-y-6 overflow-y-auto">
        {/* Header gradient */}
        <div className="bg-beehealth-blue-primary-solid relative overflow-hidden rounded-2xl p-8 shadow-xl">
          <div className="bg-beehealth-body-main/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"></div>
          <div className="bg-beehealth-body-main/10 absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="bg-beehealth-body-main/20 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg ring-4 ring-white/30 backdrop-blur-sm">
                <img
                  src={currentUser?.avatar}
                  alt="Profile"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
              <div>
                <h1 className="mb-1 text-3xl font-bold text-white md:text-4xl">
                  Mi Perfil Profesional
                </h1>
                <p className="text-green-50">Información profesional y de contacto</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="group bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              {isEditing ? (
                <>
                  <Save className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Guardar Cambios
                </>
              ) : (
                <>
                  <Edit2 className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Editar Perfil
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Profile card */}
          <div className="group bg-beehealth-body-main relative overflow-hidden rounded-2xl border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="absolute -top-5 -right-5 h-32 w-32 rounded-full bg-linear-to-br from-green-100 to-emerald-50 opacity-50 blur-2xl"></div>

            <div className="relative flex flex-col items-center">
              <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-emerald-600 shadow-lg ring-4 ring-green-100 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={currentUser?.avatar}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <div className="mb-2 flex items-center gap-2">
                <h2 className="text-center text-xl font-bold text-gray-900">
                  Dr(a). {currentUser.fullName}
                </h2>
                <CheckCircle2 className="h-5 w-5 text-green-500" title="Perfil verificado" />
              </div>

              <div className="mb-4 flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5">
                <p className="text-sm font-medium text-green-700">
                  {currentUser?.role === 'doctor' &&
                    currentUser?.specialty === 'weight' &&
                    'Control de Peso'}
                </p>
              </div>

              <div className="flex w-full gap-2">
                <div className="flex-1 rounded-lg bg-green-50 p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">156</p>
                  <p className="text-xs text-gray-600">Pacientes</p>
                </div>
                <div className="flex-1 rounded-lg bg-blue-50 p-3 text-center">
                  <p className="text-2xl font-bold text-blue-600">4.9</p>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal info */}
          <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-lg md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Información Personal</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Correo Electrónico"
                value={currentUser.email}
                isEditing={isEditing}
                icon={Mail}
              />
              <Field
                label="Telefono"
                value={currentUser.phone}
                isEditing={isEditing}
                icon={Phone}
              />
              <Field
                label="Cédula Profesional"
                value="1234567"
                isEditing={isEditing}
                icon={Award}
              />
              <Field label="Universidad" value="UNAM" isEditing={isEditing} icon={MapPin} />
            </div>
          </div>
        </div>

        {/* Professional info */}
        <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
              <Briefcase className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Información Profesional</h3>
          </div>

          <div className="grid gap-6">
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Edit2 className="h-4 w-4" />
                Biografía Profesional
              </label>
              <textarea
                rows="4"
                defaultValue="Especialista en nutrición clínica con más de 10 años de experiencia ayudando a pacientes a alcanzar sus objetivos de salud."
                disabled={!isEditing}
                className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              ></textarea>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl bg-linear-to-br from-blue-50 to-blue-100 p-4">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-xs text-blue-600">Años de experiencia</p>
                  <p className="text-2xl font-bold text-blue-900">10+</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-linear-to-br from-purple-50 to-purple-100 p-4">
                <Award className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-xs text-purple-600">Certificaciones</p>
                  <p className="text-2xl font-bold text-purple-900">5</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-linear-to-br from-green-50 to-green-100 p-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-xs text-green-600">Estado</p>
                  <p className="text-lg font-bold text-green-900">Activo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SecuritySection />
      </div>
    );

  if (role === 'employee') {
    const empleado = {
      nombre: currentUser.fullName,
      email: currentUser.email,
      telefono: currentUser.phone,
      puesto: 'Recepcionista',
      fechaIngreso: '2023-01-15',
      horario: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
    };

    return (
      <div className="h-full space-y-6 overflow-y-auto">
        {/* Header gradient employee */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-500 via-pink-500 to-rose-500 p-8 shadow-xl">
          <div className="bg-beehealth-body-main/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"></div>
          <div className="bg-beehealth-body-main/10 absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl"></div>

          <div className="relative">
            <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">Mi Perfil</h1>
            <p className="text-purple-50">Información personal y laboral</p>
          </div>
        </div>

        <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-8 shadow-lg">
          {/* Avatar initials */}
          <div className="mb-8 flex flex-col items-center">
            <div className="group relative mb-6">
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-purple-500 to-pink-500 opacity-75 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-4xl font-bold text-white shadow-2xl ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                {empleado.nombre
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            </div>

            <h2 className="mb-2 text-3xl font-bold text-gray-900">{empleado.nombre}</h2>
            <div className="mb-4 flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2">
              <Briefcase className="h-4 w-4 text-purple-600" />
              <p className="font-medium text-purple-700">{empleado.puesto}</p>
            </div>
          </div>

          <div className="space-y-3">
            <InfoCard icon={Mail} label="Email" value={empleado.email} color="blue" />
            <InfoCard icon={Phone} label="Telefono" value={empleado.telefono} color="green" />
            <InfoCard
              icon={Calendar}
              label="Fecha de Ingreso"
              value={empleado.fechaIngreso}
              color="purple"
            />
            <InfoCard icon={Clock} label="Horario" value={empleado.horario} color="orange" />
          </div>
        </div>

        <SecuritySection />
      </div>
    );
  }

  if (role === 'patient')
    return (
      <div className="space-y-6">
        {/* Header gradient patient */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 p-8 shadow-xl">
          <div className="bg-beehealth-body-main/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"></div>
          <div className="bg-beehealth-body-main/10 absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="bg-beehealth-body-main/20 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg ring-4 ring-white/30 backdrop-blur-sm">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="mb-1 text-3xl font-bold text-white md:text-4xl">Mi Perfil</h1>
                <p className="text-blue-50">Información personal y médica</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="group bg-beehealth-body-main flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-blue-600 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              {isEditing ? (
                <>
                  <Save className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Guardar Cambios
                </>
              ) : (
                <>
                  <Edit2 className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Editar Perfil
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Patient profile card */}
          <div className="group bg-beehealth-body-main relative overflow-hidden rounded-2xl border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="absolute -top-5 -right-5 h-32 w-32 rounded-full bg-linear-to-br from-blue-100 to-cyan-50 opacity-50 blur-2xl"></div>

            <div className="relative flex flex-col items-center">
              <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-600 shadow-lg ring-4 ring-blue-100 transition-transform duration-300 group-hover:scale-105">
                <User className="h-16 w-16 text-white" />
              </div>

              <h2 className="mb-2 text-center text-xl font-bold text-gray-900">
                {currentUser.fullName}
              </h2>

              <div className="mb-4 flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5">
                <User className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-700">Paciente</p>
              </div>

              <div className="flex w-full gap-2">
                <div className="flex-1 rounded-lg bg-green-50 p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-xs text-gray-600">Consultas</p>
                </div>
                <div className="flex-1 rounded-lg bg-purple-50 p-3 text-center">
                  <p className="text-2xl font-bold text-purple-600">3</p>
                  <p className="text-xs text-gray-600">Meses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient personal info */}
          <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-lg md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Información Personal</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Correo Electrónico"
                value={currentUser.email}
                isEditing={isEditing}
                icon={Mail}
              />
              <Field
                label="Telefono"
                value={currentUser.phone}
                isEditing={isEditing}
                icon={Phone}
              />
              <Field label="Altura (cm)" value="175" isEditing={isEditing} icon={User} />
              <Field label="Peso Actual (kg)" value="75" isEditing={isEditing} icon={User} />
            </div>
          </div>
        </div>

        <SecuritySection />
      </div>
    );

  return (
    <div className="bg-beehealth-body-main flex min-h-[400px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-8">
      <div className="text-center">
        <User className="mx-auto mb-4 h-16 w-16 text-gray-400" />
        <p className="text-lg font-medium text-gray-600">No se encontró un perfil válido</p>
        <p className="mt-2 text-sm text-gray-500">Por favor, contacta al administrador</p>
      </div>
    </div>
  );
}

/* Editable field */
function Field({ label, value, isEditing, icon: Icon }) {
  return (
    <div className="group">
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          defaultValue={value}
          disabled={!isEditing}
          className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
        />
        {isEditing && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <Edit2 className="h-4 w-4 text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
}

/* Simple info card */
function InfoCard({ icon: Icon, label, value, color = 'gray' }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100 hover:bg-blue-100',
    green: 'bg-green-50 border-green-100 hover:bg-green-100',
    purple: 'bg-purple-50 border-purple-100 hover:bg-purple-100',
    orange: 'bg-orange-50 border-orange-100 hover:bg-orange-100',
    gray: 'bg-beehealth-body-main border-gray-100 hover:bg-gray-100',
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    gray: 'text-gray-600',
  };

  return (
    <div
      className={`group flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${colorClasses[color]}`}
    >
      <div className="bg-beehealth-body-main flex h-12 w-12 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-110">
        <Icon className={`h-6 w-6 ${iconColorClasses[color]}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="truncate font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

/* Security section */
function SecuritySection() {
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
        <button className="group bg-beehealth-body-main flex items-center justify-between rounded-xl border-2 border-gray-200 px-6 py-4 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 active:scale-95">
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
