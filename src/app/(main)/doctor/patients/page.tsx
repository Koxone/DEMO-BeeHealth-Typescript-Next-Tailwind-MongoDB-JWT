import DoctorPatients from '@/components/sections/doctor/patients/DoctorPatients';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function DoctorPatientsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role as 'doctor' | 'patient' | 'employee' | 'admin';

  return (
    <div>
      <DoctorPatients currentUser={currentUser} role={role} />
    </div>
  );
}
