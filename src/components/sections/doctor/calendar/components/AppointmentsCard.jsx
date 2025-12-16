import { Cross, Users, Clock, CalendarIcon, User, Phone, Mail, Sparkles } from 'lucide-react';

export default function AppointmentsCard({ selectedDate, appointments }) {
  const title = selectedDate
    ? selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
    : 'Selecciona un día';

  return (
    <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg transition hover:shadow-xl">
      {/* Header */}
      <div className="bg-beehealth-blue-primary-solid relative overflow-hidden px-6 py-5">
        <div className="bg-beehealth-body-main/10 absolute top-0 right-0 -mt-12 -mr-12 h-24 w-24 rounded-full" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-beehealth-body-main/20 rounded-xl p-2 backdrop-blur-sm">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {selectedDate && appointments.length > 0 && (
              <p className="text-sm text-indigo-100">
                {appointments.length} cita{appointments.length !== 1 ? 's' : ''} programada
                {appointments.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {selectedDate && appointments.length > 0 ? (
          <div className="scrollbar-thin space-y-3 overflow-y-auto">
            {appointments.map((apt, index) => (
              <div
                key={apt.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group animate-fadeInUp relative overflow-hidden rounded-xl border-2 border-gray-200 p-4 transition hover:border-blue-300 hover:shadow-lg"
              >
                <div className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 opacity-5 transition group-hover:scale-150" />
                <div className="relative z-10">
                  {/* time */}
                  <div className="mb-3 flex items-center justify-between">
                    {/* Kind */}
                    <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
                      <Cross className="h-4 w-4 text-blue-600" />
                      <span className="font-bold text-gray-900">{apt.tipo}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-bold text-gray-900">{apt.hora}</span>
                    </div>
                  </div>
                  {/* Patient */}
                  <div className="mb-3 flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      {/* Name */}
                      <div className="mb-1 flex items-center gap-2">
                        <User className="h-4 w-4 shrink-0 text-gray-400" />
                        <span className="truncate font-bold text-gray-900">{apt.paciente}</span>
                      </div>

                      {/* Phone */}
                      <div className="mb-1 flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                        <span className="text-xs text-gray-600">{apt.telefono}</span>
                      </div>

                      {/* Mail */}
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                        <span className="truncate text-xs text-gray-600">{apt.email}</span>
                      </div>
                    </div>
                  </div>
                  {/* reason */}
                  <div className="rounded-lg border border-purple-200 bg-linear-to-r from-purple-50 to-pink-50 p-3">
                    <div className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                      <div>
                        <p className="mb-1 text-xs font-semibold text-purple-900">
                          Motivo de consulta
                        </p>
                        <p className="text-sm font-medium text-gray-700">{apt.motivo}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-linear-to-r from-blue-500 to-purple-600 opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        ) : selectedDate ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <CalendarIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p className="mb-1 font-semibold text-gray-900">No hay citas programadas</p>
            <p className="text-sm text-gray-500">Este día está libre</p>
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <p className="mb-1 font-semibold text-gray-900">Selecciona un día</p>
            <p className="text-sm text-gray-500">Haz clic en una fecha del calendario</p>
          </div>
        )}
      </div>
    </div>
  );
}
