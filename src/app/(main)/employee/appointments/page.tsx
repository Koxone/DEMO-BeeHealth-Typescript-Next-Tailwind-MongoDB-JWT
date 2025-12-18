import EmployeeAppointments from '@/components/sections/employee/appointments/EmployeeAppointments';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export const runtime = 'nodejs';

interface SerializedPatient {
  id: string;
  fullName: string;
  phone: string;
  email: string;
}

export default async function EmployeeAppointmentsPage() {
  // Get current user
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('Unauthorized');
  }

  const role = currentUser.role as 'admin' | 'employee' | 'doctor';

  // Connect DB
  await connectDB();

  // Fetch patients
  const patients = await User.find({ role: 'patient', isActive: true }, 'fullName phone email')
    .sort({ createdAt: -1 })
    .lean();

  // Serialize patients
  const serializedPatients: SerializedPatient[] = patients.map((p: any) => ({
    id: p._id.toString(),
    fullName: p.fullName,
    phone: p.phone,
    email: p.email,
  }));

  return (
    <div>
      <EmployeeAppointments role={role} patients={serializedPatients} />
    </div>
  );
}
