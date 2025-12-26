import PatientHistory from '@/components/sections/patient/history/PatientHistory';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';
import { redirect } from 'next/navigation';

export default async function PatientHistoryPage() {
  // Get current User info
  const currentUser = await getCurrentUser();

  if (currentUser?.hasRecord === false) {
    redirect('/patient/clinical-record');
  }
  // Get current User info
  const role = currentUser?.role;
  return (
    <div>
      <PatientHistory role={role} currentUser={currentUser} />
    </div>
  );
}
