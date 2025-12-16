import PatientHistory from '@/components/sections/patient/history/PatientHistory';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function PatientHistoryPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="h-screen overflow-hidden">
      <PatientHistory role={role} currentUser={currentUser} />
    </div>
  );
}
