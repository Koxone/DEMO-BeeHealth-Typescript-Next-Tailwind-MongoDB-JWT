import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User, { IUser } from '@/models/User';

type PatientsResponse = {
  patients: IUser[];
};

// @route    GET /api/users/patients
// @desc     Get all Users with role 'patient'
// @access   Private
export async function GET() {
  try {
    await connectDB();

    const patients = await User.find({ role: 'patient' }).select('-password');

    return NextResponse.json<PatientsResponse>({ patients }, { status: 200 });
  } catch (error) {
    console.error('Error fetching patients:', error);

    return NextResponse.json({ error: 'Error fetching patients' }, { status: 500 });
  }
}
