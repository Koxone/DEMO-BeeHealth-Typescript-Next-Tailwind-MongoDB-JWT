import SharedUserProfile from '@/components/shared/profile/SharedUserProfile';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function PatientProfilePage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <SharedUserProfile role={role} currentUser={currentUser} />
    </div>
  );
}
