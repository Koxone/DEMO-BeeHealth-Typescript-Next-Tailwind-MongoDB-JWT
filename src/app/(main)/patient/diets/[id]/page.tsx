import PatientDietDetail from '@/components/sections/patient/diets/[id]/PatientDietDetail';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function PatientDietDetailPage({ params }) {
  const resolvedParams = await params;
  // Get current User info
  const currentUser = await getCurrentUser();
  return (
    <div>
      <PatientDietDetail params={resolvedParams} />
    </div>
  );
}
