import ServerRoleGuard from '@/components/sections/auth/ServerRoleGuard';

export default function EmployeeLayout({ children }) {
  return <ServerRoleGuard allowedRoles={['employee']}>{children}</ServerRoleGuard>;
}
