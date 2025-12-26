import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import PatientDiets from '@/components/sections/patient/PatientDiets';
export const runtime = 'nodejs';
import { redirect } from 'next/navigation';

export default async function PatientDietsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;

  if (currentUser?.hasRecord === false) {
    redirect('/patient/clinical-record');
  }
  return (
    <div>
      <PatientDiets role={role} currentUser={currentUser} />
    </div>
  );
}
