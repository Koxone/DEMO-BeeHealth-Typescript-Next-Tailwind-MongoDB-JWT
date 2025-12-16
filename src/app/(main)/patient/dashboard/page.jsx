import PatientDashboard from '@/components/sections/patient/dashboard/PatientDashboard';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { redirect } from 'next/navigation';

export const runtime = 'nodejs';

export default async function DoctorDashboardPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;

  if (currentUser?.hasRecord === false) {
    redirect('/patient/clinical-record');
  }
  return (
    <div className="h-screen overflow-hidden">
      <PatientDashboard currentUser={currentUser} />
    </div>
  );
}
