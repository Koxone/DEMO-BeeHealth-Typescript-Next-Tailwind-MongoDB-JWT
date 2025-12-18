import EmployeeDashboard from '@/components/sections/employee/dashboard/EmployeeDashboard';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export const runtime = 'nodejs';

export default async function DoctorDashboardPage() {
  // Get current User info
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <EmployeeDashboard currentUser={currentUser} />
    </div>
  );
}
