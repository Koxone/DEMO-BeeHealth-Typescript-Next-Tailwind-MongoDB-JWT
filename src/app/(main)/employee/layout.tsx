import ServerRoleGuard from '@/presentation/providers/ServerRoleGuard';

export default function EmployeeLayout({ children }) {
  return <ServerRoleGuard allowedRoles={['employee']}>{children}</ServerRoleGuard>;
}
