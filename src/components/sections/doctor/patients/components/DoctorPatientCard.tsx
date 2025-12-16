import { Phone, Mail, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';
import { CurrentUserData } from '@/types/user/user.types';

interface DoctorPatientCardProps {
  patient: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar?: string;
    lastVisit?: string | Date | null;
  };
  currentUser: CurrentUserData | null;
  role?: string;
}

export default function DoctorPatientCard({ patient }: DoctorPatientCardProps) {
  return (
    <Link href={`/doctor/patients/${patient._id}`}>
      <div className="bg-beehealth-body-main rounded-xl border-2 border-gray-200 p-4 transition hover:border-blue-300">
        <div className="flex items-center gap-4">
          {/* Patient Avatar */}
          <img
            src={patient?.avatar || '/oochel.jpg'}
            alt=""
            className="border-beehealth-green-primary-dark h-12 w-12 scale-95 transform-gpu rounded-full border object-cover transition-all duration-100 ease-in-out hover:scale-100"
          />

          <div className="flex-1">
            {/* Patient Name */}
            <h3 className="mb-2 font-semibold text-gray-900 capitalize">{patient?.fullName}</h3>

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
                  <span>
                    Última Cita:{' '}
                    {patient?.lastVisit
                      ? new Date(patient.lastVisit).toLocaleDateString('es-MX')
                      : 'Sin Registro'}
                  </span>{' '}
                </div>

                <div className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700">
                  <Eye className="h-4 w-4" />
                  Ver Detalles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
