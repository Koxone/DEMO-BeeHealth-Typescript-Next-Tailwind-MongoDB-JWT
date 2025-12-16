import { User } from 'lucide-react';
import React from 'react';

function DoctorName({ diet }) {
  return (
    <div className="bg-beehealth-body-main flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-gray-300">
      <div className="rounded-lg bg-green-50 p-2">
        <User className="h-5 w-5 text-green-600" />
      </div>
      <div>
        <p className="text-xs tracking-wide text-gray-500 uppercase">Doctor</p>
        <p className="text-sm font-semibold text-gray-900">Dr. {diet.doctor.fullName}</p>
      </div>
    </div>
  );
}

export default DoctorName;
