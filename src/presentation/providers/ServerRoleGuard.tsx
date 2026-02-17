import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { JwtTokenService } from '@/infrastructure/services/auth/JwtTokenService';
import { MongooseUserRepository } from '@/infrastructure/repositories/user/MongooseUserRepository';
import { GetAuthenticatedUser } from '@/application/use-cases/auth/GetAuthenticatedUser';

type Props = {
  allowedRoles?: string[];
  children: React.ReactNode;
};

export default async function ServerRoleGuard({ allowedRoles = [], children }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const tokenService = new JwtTokenService();
  const payload = tokenService.verify(token);

  if (!payload) {
    redirect('/auth/login');
  }

  const { id } = payload;

  const useCase = new GetAuthenticatedUser(new MongooseUserRepository());
  const user = await useCase.execute(id);

  const role = user.getRole();

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    if (role === 'patient') redirect('/patient/dashboard');
    if (role === 'doctor') redirect('/doctor/dashboard');
    if (role === 'employee') redirect('/employee/dashboard');
    redirect('/');
  }

  return children;
}
