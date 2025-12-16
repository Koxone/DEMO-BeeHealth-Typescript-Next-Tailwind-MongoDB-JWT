import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// @route PATCH /api/users/specialty
// @desc Update user specialty
// @access Public (for signup flow)
export async function PATCH(req) {
  try {
    await connectDB();
    const { userId, specialty } = await req.json();

    if (!userId || !specialty) {
      return NextResponse.json({ error: 'Missing userId or specialty' }, { status: 400 });
    }

    const allowed = ['weight', 'dental', 'stetic'];
    if (!allowed.includes(specialty)) {
      return NextResponse.json({ error: 'Invalid specialty' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { specialty },
      { new: true, select: '-password' }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Specialty updated', user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating specialty' }, { status: 500 });
  }
}
