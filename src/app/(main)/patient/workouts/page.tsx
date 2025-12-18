import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import PatientWorkouts from '@/components/sections/patient/workouts/PatientWorkouts';
export const runtime = 'nodejs';

export default async function PatientWorkoutsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;

  return (
    <div>
      <PatientWorkouts role={role} currentUser={currentUser} />
    </div>
  );
}
