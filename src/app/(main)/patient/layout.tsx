import ServerRoleGuard from '@/components/sections/auth/ServerRoleGuard';

export default function PatientLayout({ children }) {
  return <ServerRoleGuard allowedRoles={['patient']}>{children}</ServerRoleGuard>;
}
