import PatientNewAppointment from '@/components/sections/patient/new-appointment/NewAppointment';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function PatientNewAppointmentPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="h-screen overflow-hidden">
      <PatientNewAppointment role={role} />
    </div>
  );
}
