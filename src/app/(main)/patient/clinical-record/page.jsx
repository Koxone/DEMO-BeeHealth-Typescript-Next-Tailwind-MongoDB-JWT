import CreateClinicalRecord from '@/components/sections/patient/clinical-record/CreateClinicalRecord';
import React from 'react';

import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function PatientNewClinicalRecord() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  const specialty = currentUser?.specialty;

  return (
    <div className="h-screen overflow-hidden pb-40">
      <CreateClinicalRecord currentUser={currentUser} />
    </div>
  );
}
