import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import DoctorWorkouts from '@/components/sections/doctor/workouts/DoctorWorkouts';

export const runtime = 'nodejs';

export default async function DoctorWorkoutsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div>
      <DoctorWorkouts role={role} />
    </div>
  );
}
