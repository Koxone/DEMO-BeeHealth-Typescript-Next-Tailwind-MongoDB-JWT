import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    PATCH /api/users/patients/edit
// @desc     Edit user details
// @access   Private
export async function PATCH(req) {
  try {
    await connectDB();

    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const {
      userId,
      phone,
      email,
      fullName,
      initialWeight,
      initialSize,
      currentWeight,
      currentSize,
    } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const updateData = {};
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email;
    if (fullName !== undefined) updateData.fullName = fullName;
    if (initialWeight !== undefined) updateData.initialWeight = initialWeight;
    if (initialSize !== undefined) updateData.initialSize = initialSize;
    if (currentWeight !== undefined) updateData.currentWeight = currentWeight;
    if (currentSize !== undefined) updateData.currentSize = currentSize;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error editing user details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
