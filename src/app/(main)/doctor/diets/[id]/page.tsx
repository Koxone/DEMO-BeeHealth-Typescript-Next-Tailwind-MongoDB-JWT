import DoctorDietDetail from '@/components/sections/doctor/diets/[id]/DoctorDietDetail';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function DoctorDietsIDPage({ params }) {
  // Get current User info
  const currentUser = await getCurrentUser();
  const specialty = currentUser?.specialty;
  const newParams = await params;

  return (
    <div>
      <DoctorDietDetail params={newParams} specialty={specialty} />
    </div>
  );
}
