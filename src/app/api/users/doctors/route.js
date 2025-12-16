import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

// @route    GET /api/users/doctors
// @desc     Get all Users with role 'doctor'
// @access   Private
export async function GET() {
  try {
    await connectDB();

    const users = await User.find({ role: 'doctor' }, '-password').sort({ createdAt: -1 });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
}
