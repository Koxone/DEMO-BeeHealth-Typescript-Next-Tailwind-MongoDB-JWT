import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export default async function ServerRoleGuard({ allowedRoles = [], children }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/auth/login');
  }

  const role = currentUser.role?.toLowerCase().trim();

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    if (role === 'patient') redirect('/patient/dashboard');
    if (role === 'medic') redirect('/doctor/dashboard');
    if (role === 'employee') redirect('/employee/dashboard');
    redirect('/');
  }

  return children;
}
