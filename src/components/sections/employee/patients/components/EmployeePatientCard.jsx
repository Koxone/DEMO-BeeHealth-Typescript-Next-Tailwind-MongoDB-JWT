import { Phone, Mail, Calendar, Eye } from 'lucide-react';

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join('');

export default function EmployeePatientCard({ patient, currentUser, role }) {
  return (
    <div className="bg-beehealth-body-main rounded-xl border-2 border-gray-200 p-4 transition hover:border-blue-300">
      <div className="flex items-center gap-4">
        {/* Patient Avatar */}
        {patient?.avatar ? (
          <img
            src={patient.avatar}
            alt={patient.fullName}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500 font-semibold text-white capitalize">
            {getInitials(patient?.fullName)}
          </div>
        )}

        <div className="flex-1">
          {/* Patient Name */}
          <h3 className="mb-2 font-semibold text-gray-900">{patient?.fullName}</h3>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-3">
            {/* Patient Phone */}
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{patient?.phone}</span>
            </div>

            {/* Patient Email */}
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span className="truncate">{patient.email}</span>
            </div>
            <div className="flex items-center justify-between">
              {/* Last Appointment */}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Última Cita: {patient?.lastVisit || 'Sin Registro'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
