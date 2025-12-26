import PatientNewAppointment from '@/components/sections/patient/new-appointment/NewAppointment';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { redirect } from 'next/navigation';
export const runtime = 'nodejs';

export default async function PatientNewAppointmentPage() {
  // Get current User info
  const currentUser = await getCurrentUser();

  if (currentUser?.hasRecord === false) {
    redirect('/patient/clinical-record');
  }
  return (
    <div>
      <PatientNewAppointment />
    </div>
  );
}
