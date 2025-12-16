import DoctorCalendar from '@/components/sections/doctor/calendar/DoctorCalendar';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function DoctorCalendarPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div>
      <DoctorCalendar currentUser={currentUser} role={role} />
    </div>
  );
}
