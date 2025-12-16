import EmployeeAppointments from '@/components/sections/employee/appointments/EmployeeAppointments';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export default async function EmployeeAppointmentsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;

  // Get Patients
  await connectDB();

  let query = { role: 'patient', isActive: true };

  // Specialty Filter
  if (currentUser.role === 'doctor') {
    query.specialty = currentUser.specialty;
  }

  const patients = await User.find(query, '-password -resetToken').sort({ createdAt: -1 }).lean();

  const serializedPatients = patients.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));

  return (
    <div className="h-screen overflow-hidden pb-40">
      <EmployeeAppointments role={role} patients={serializedPatients} />
    </div>
  );
}
