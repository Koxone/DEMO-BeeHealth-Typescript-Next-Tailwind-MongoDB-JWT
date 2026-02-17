import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Enums and Types
import { UserRole } from '@/domain/enums/';

interface TokenPayload {
  role: UserRole;
}

/**
 * Redirects the authenticated user to the correct dashboard
 * based on the role stored in the refresh token.
 * Roles include: 'patient', 'doctor', 'employee', as defined
 * in the UserRole enum.
 *
 * @remarks
 * This function performs a server-side redirect and never returns.
 */
export default async function AuthRedirectViewRoute() {
  const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

  switch (payload.role) {
    case UserRole.PATIENT:
      redirect('/patient/dashboard');
    case UserRole.DOCTOR:
      redirect('/doctor/dashboard');
    case UserRole.EMPLOYEE:
      redirect('/employee/dashboard');
    default:
      redirect('/');
  }
}
