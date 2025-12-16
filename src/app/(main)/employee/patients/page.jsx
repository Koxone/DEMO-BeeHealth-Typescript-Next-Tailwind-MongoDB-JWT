import EmployeePatients from '@/components/sections/employee/patients/EmployeePatients';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function EmployeePatientsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;

  return (
    <div>
      <EmployeePatients currentUser={currentUser} role={role} />
    </div>
  );
}
