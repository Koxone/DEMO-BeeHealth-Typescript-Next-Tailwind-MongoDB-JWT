import EmployeeAppointments from '@/components/sections/employee/appointments/EmployeeAppointments';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export const runtime = 'nodejs';

export default async function EmployeeAppointmentsPage() {
  // Get current user
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('Unauthorized');
  }

  const role = currentUser.role as 'admin' | 'employee' | 'doctor';

  return (
    <div>
      <EmployeeAppointments role={role} />
    </div>
  );
}
