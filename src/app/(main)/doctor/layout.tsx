import ServerRoleGuard from '@/presentation/providers/ServerRoleGuard';

export default function DoctorLayout({ children }) {
  return <ServerRoleGuard allowedRoles={['doctor']}>{children}</ServerRoleGuard>;
}
