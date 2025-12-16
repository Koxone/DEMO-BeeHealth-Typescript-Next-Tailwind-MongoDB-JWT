import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import DoctorDiets from '@/components/sections/doctor/diets/DoctorDiets';
export const runtime = 'nodejs';

export default async function DoctorDietsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;

  return (
    <div>
      <DoctorDiets role={role} />
    </div>
  );
}
