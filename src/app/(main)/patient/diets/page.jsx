import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import PatientDiets from '@/components/sections/patient/PatientDiets';
export const runtime = 'nodejs';

export default async function PatientDietsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <PatientDiets role={role} currentUser={currentUser} />
    </div>
  );
}
