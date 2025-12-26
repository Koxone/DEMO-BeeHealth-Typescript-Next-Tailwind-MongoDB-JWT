import ServerRoleGuard from '@/components/sections/auth/ServerRoleGuard';

export default function DoctorLayout({ children }) {
  return <ServerRoleGuard allowedRoles={['doctor']}>{children}</ServerRoleGuard>;
}
