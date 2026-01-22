import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import PatientWorkouts from '@/components/sections/patient/workouts/PatientWorkouts';
export const runtime = 'nodejs';
import { redirect } from 'next/navigation';

export default async function PatientWorkoutsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();

  if (currentUser?.hasRecord === false) {
    redirect('/patient/clinical-record');
  }

  return (
    <div>
      <PatientWorkouts />
    </div>
  );
}
