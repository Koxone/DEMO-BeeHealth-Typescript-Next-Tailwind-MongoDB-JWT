import DoctorDashboard from '@/components/sections/doctor/dashboard/DoctorDashboard';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export const runtime = 'nodejs';

export default async function DoctorDashboardPage() {
  // Get current User info
  const currentUser = await getCurrentUser();

  return (
    <div>
      <DoctorDashboard currentUser={currentUser} />
    </div>
  );
}
