import ServerRoleGuard from '@/presentation/providers/ServerRoleGuard';

export default function PatientLayout({ children }) {
  return <ServerRoleGuard allowedRoles={['patient']}>{children}</ServerRoleGuard>;
}
