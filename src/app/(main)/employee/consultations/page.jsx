import EmployeeConsults from '@/components/sections/employee/consultations/EmployeeConsults';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function EmployeeConsultationsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;

  return (
    <div className="h-screen overflow-hidden pb-40">
      <EmployeeConsults role={role} />
    </div>
  );
}
